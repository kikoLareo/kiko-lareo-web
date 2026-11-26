#!/usr/bin/env python3
"""Genera la firma kiko.lareo y el monograma kl. como CONTORNOS vectoriales.

Parte de Bricolage Grotesque 800 (la tipografía de la propia web), así que
no hay ninguna fuente en el resultado: son solo trazados. Reglas (identidad
v3.1, nov 2026): firma en minúsculas, un solo color, el punto como seña.

Salida:
  src/components/Firma.astro      firma en línea para la cabecera (currentColor)
  public/marca/*.svg              firma y monograma sueltos (negro / crema)

Uso (necesita fontTools + brotli, con el MISMO python que usa pip):
  python3.13 -m pip install --target /tmp/pylib fonttools brotli
  PYTHONPATH=/tmp/pylib python3.13 web/scripts/marca/generar.py
Los PNG (transparentes, favicon, avatares) los saca `exportar.cjs` con Chromium:
  PW=<carpeta con node_modules/playwright-core> node web/scripts/marca/exportar.cjs
"""
import sys, os, json
from pathlib import Path

sys.path.insert(0, os.environ.get('PYLIB', '/tmp/pylib'))
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

RAIZ = Path(__file__).resolve().parents[2]            # web/
FUENTE = RAIZ / 'public/fonts/bricolage-grotesque-800-latin.woff2'
NEGRO, CREMA, ROJO = '#0B0B0B', '#F2EFE8', '#FF4A32'

F = TTFont(str(FUENTE))
CMAP, GSET = F.getBestCmap(), F.getGlyphSet()

def tinta(ch):
    bp = BoundsPen(GSET); GSET[CMAP[ord(ch)]].draw(bp); return bp.bounds   # xmin, ymin, xmax, ymax
def avance(ch): return F['hmtx'][CMAP[ord(ch)]][0]
def num(v): return ('%.1f' % v).rstrip('0').rstrip('.')

def trazo(ch, x):
    pen = SVGPathPen(GSET, ntos=num)
    GSET[CMAP[ord(ch)]].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))   # eje Y hacia abajo, base en y=0
    return pen.getCommands()

def circulo(cx, cy, r):
    k = 0.5522847498 * r
    seg = [(cx+r, cy), (cx+r, cy+k, cx+k, cy+r, cx, cy+r), (cx-k, cy+r, cx-r, cy+k, cx-r, cy),
           (cx-r, cy-k, cx-k, cy-r, cx, cy-r), (cx+k, cy-r, cx+r, cy-k, cx+r, cy)]
    d = 'M' + ' '.join(num(v) for v in seg[0])
    for s in seg[1:]: d += 'C' + ' '.join(num(v) for v in s)
    return d + 'Z'

class Dibujo:
    """Una composición: letras + punto, con su caja de tinta."""
    def __init__(self, bloques, track, punto, hueco):
        self.punto = punto
        partes, x = [], 0
        def letras(txt):
            nonlocal x
            for ch in txt:
                partes.append((ch, x)); x += avance(ch) + track
        self.dpunto = None
        xs, xe = [], []
        for i, b in enumerate(bloques):
            if i > 0:                       # el punto entre dos bloques, o al final
                ch, xo = partes[-1]
                izq = xo + tinta(ch)[2] + hueco
                self.cx = izq + punto / 2
                x = izq + punto + hueco - tinta(b[0])[0]
                xs.append(izq); xe.append(izq + punto)
            letras(b)
        if len(bloques) == 1:               # monograma: el punto va detrás
            ch, xo = partes[-1]
            izq = xo + tinta(ch)[2] + hueco
            self.cx = izq + punto / 2
            xs.append(izq); xe.append(izq + punto)
        r = punto / 2
        self.dpunto = circulo(self.cx, -(r - 14), r)       # asienta en la base con el mismo rebase que las redondas
        self.dletras = ''.join(trazo(c, xx) for c, xx in partes)
        xs += [xx + tinta(c)[0] for c, xx in partes]; xe += [xx + tinta(c)[2] for c, xx in partes]
        y0 = -max(tinta(c)[3] for c, _ in partes); y1 = -min(tinta(c)[1] for c, _ in partes)
        self.caja = (min(xs), y0, max(xe) - min(xs), y1 - y0)

    def viewbox(self, aire=0):
        x, y, w, h = self.caja
        return '%s %s %s %s' % (num(x-aire), num(y-aire), num(w+2*aire), num(h+2*aire))

FIRMA = Dibujo(['kiko', 'lareo'], track=-26, punto=250, hueco=26)
MONO = Dibujo(['kl'], track=-30, punto=250, hueco=26)

def svg(dib, relleno, relleno_punto=None, aire=0, titulo='Kiko Lareo', extra=''):
    rp = relleno_punto or relleno
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s" role="img" aria-label="%s">'
            '<title>%s</title>'
            '<path fill="%s" d="%s"/><path fill="%s" d="%s"/></svg>\n') % (
        dib.viewbox(aire), titulo, titulo, relleno, dib.dletras, rp, dib.dpunto)

def main():
    marca = RAIZ / 'public/marca'
    # --- firma
    (marca / 'wordmark.svg').write_text(svg(FIRMA, NEGRO, aire=FIRMA.punto), encoding='utf-8')
    (marca / 'wordmark-crema.svg').write_text(svg(FIRMA, CREMA, aire=FIRMA.punto), encoding='utf-8')
    # --- monograma: letras en el color de la firma, punto en rojo
    (marca / 'monograma.svg').write_text(svg(MONO, NEGRO, ROJO, aire=MONO.punto), encoding='utf-8')
    (marca / 'monograma-crema.svg').write_text(svg(MONO, CREMA, ROJO, aire=MONO.punto), encoding='utf-8')
    # --- componente de la cabecera: currentColor, caja ajustada a la tinta (sin aire)
    comp = RAIZ / 'src/components/Firma.astro'
    comp.write_text('''---
// La firma kiko.lareo como contornos vectoriales (identidad v3.1, nov 2026).
// GENERADO por web/scripts/marca/generar.py a partir de Bricolage Grotesque 800:
// no lo edites a mano, vuelve a generarlo. Toma el color del texto que la rodea
// (currentColor), así que cambia solo con el tono claro / oscuro.
interface Props { class?: string }
const { class: clase = '' } = Astro.props;
---
<svg class={`firma ${clase}`.trim()} viewBox="%s" role="img" aria-label="Kiko Lareo" fill="currentColor" focusable="false"><path d="%s"/><path d="%s"/></svg>
''' % (FIRMA.viewbox(), FIRMA.dletras, FIRMA.dpunto), encoding='utf-8')
    print('firma  caja', [round(v) for v in FIRMA.caja], ' proporción %.2f:1' % (FIRMA.caja[2]/FIRMA.caja[3]))
    print('mono   caja', [round(v) for v in MONO.caja], ' proporción %.2f:1' % (MONO.caja[2]/MONO.caja[3]))

if __name__ == '__main__':
    main()
