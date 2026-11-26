#!/usr/bin/env python3
"""Genera la identidad (firma `kiko.lareo` y monograma `kl.`) como VECTORES.

Es el diseño de la lámina de identidad v3.1 que mandó el dueño (propuesta A), que solo
existía como imagen. El monograma se reconstruye con sus medidas (rectas y diagonales); la
firma se vectoriza de la portada del PDF (curvas suaves). El punto es SIEMPRE redondo y rojo.

Entradas (fuente-lamina/, en grises y ya recortadas):
  kl-lamina.png           monograma, 576×557
  kikolareo-lamina.png    firma, 2231×388

Salida:
  public/marca/wordmark[-crema].svg            firma con el punto rojo (la oficial)
  public/marca/wordmark-un-color[-crema].svg   firma toda de un color (para sellos, bordados…)
  public/marca/wordmark-apilado[-crema].svg    «kiko.» sobre «lareo», para la portada
  public/marca/monograma[-crema].svg           kl + punto rojo
  public/marca/monograma-solo[-crema].svg      kl sin punto
  src/components/Firma.astro                   firma en línea de la cabecera
  src/components/FirmaApilada.astro            la firma apilada de la portada (con foto dentro o lisa)
Los PNG (transparentes, favicon, avatares) los saca `exportar.cjs` con Chromium.

Uso (necesita potracer + numpy con el MISMO python que usa pip, y ffmpeg):
  python3.13 -m pip install --target /tmp/pylib potracer numpy
  PYLIB=/tmp/pylib python3.13 web/scripts/marca/generar.py
  PW=<carpeta con node_modules/playwright-core> node web/scripts/marca/exportar.cjs
"""
import os, sys, subprocess
from pathlib import Path

sys.path.insert(0, os.environ.get('PYLIB', '/tmp/pylib'))
import numpy as np
import potrace

AQUI = Path(__file__).resolve().parent
FUENTE = AQUI / 'fuente-lamina'
RAIZ = AQUI.parent.parent
SALIDA = RAIZ / 'public/marca'
COMPONENTES = RAIZ / 'src/components'
NEGRO, CREMA, ROJO = '#0B0B0B', '#F2EFE8', '#FF4A32'
ALTO_MONO, ALTO_FIRMA = 721.0, 768.0


def leer(png):
    """PNG en grises -> matriz 0..255 (con ffmpeg, para no depender de Pillow)."""
    dim = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries',
                          'stream=width,height', '-of', 'csv=p=0', str(png)],
                         capture_output=True, text=True).stdout.strip().split(',')
    w, h = int(dim[0]), int(dim[1])
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(png), '-f', 'rawvideo', '-pix_fmt', 'gray', '-'],
                         capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.uint8).reshape(h, w).astype(float)


def caja(a, k):
    """Media en ventana (2k+1)² con un acumulado: suaviza sin depender de scipy."""
    c = np.pad(np.cumsum(np.cumsum(np.pad(a, ((k, k), (k, k)), mode='edge'), 0), 1), ((1, 0), (1, 0)))
    n = 2 * k + 1
    return (c[n:, n:] - c[:-n, n:] - c[n:, :-n] + c[:-n, :-n]) / (n * n)


def num(v):
    return ('%.1f' % v).rstrip('0').rstrip('.')


# ----------------------------------------------------------------- trazado
def curvas(mascara, **opc):
    # potracer traza lo que NO es verdadero en la matriz: se le pasa la máscara invertida
    return list(potrace.Bitmap(~mascara).trace(**opc))


def poligono(curva):
    pts = [(curva.start_point.x, curva.start_point.y)]
    for s in curva.segments:
        pts.append((s.end_point.x, s.end_point.y))
    return pts


def rdp(pts, tol):
    """Douglas-Peucker sobre un contorno cerrado."""
    def r(p):
        if len(p) < 3: return p
        (x1, y1), (x2, y2) = p[0], p[-1]
        dx, dy = x2 - x1, y2 - y1
        n = (dx * dx + dy * dy) ** .5 or 1e-9
        d = [abs(dy * (x - x1) - dx * (y - y1)) / n for x, y in p[1:-1]]
        i = int(np.argmax(d)) + 1
        if d[i - 1] > tol:
            return r(p[:i + 1])[:-1] + r(p[i:])
        return [p[0], p[-1]]
    # parte el contorno en dos mitades por los puntos más alejados entre sí
    a = pts[:-1] if pts[0] == pts[-1] else pts
    j = max(range(len(a)), key=lambda i: (a[i][0] - a[0][0]) ** 2 + (a[i][1] - a[0][1]) ** 2)
    m1 = r(a[:j + 1]); m2 = r(a[j:] + [a[0]])
    return m1[:-1] + m2[:-1]


def a_plomo(pts, umbral):
    """Endereza: los lados casi verticales u horizontales pasan a serlo del todo."""
    p = [list(v) for v in pts]
    n = len(p)
    for _ in range(2):
        for i in range(n):
            a, b = p[i], p[(i + 1) % n]
            if abs(a[0] - b[0]) < umbral: a[0] = b[0] = (a[0] + b[0]) / 2
            if abs(a[1] - b[1]) < umbral: a[1] = b[1] = (a[1] + b[1]) / 2
    # quita los vértices que han quedado en línea
    sal = []
    for i in range(n):
        a, b, c = p[i - 1], p[i], p[(i + 1) % n]
        if abs((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0])) > 1e-6:
            sal.append(tuple(b))
    return sal


def d_poligono(pts, esc, ox, oy):
    return 'M' + 'L'.join('%s %s' % (num((x - ox) * esc), num((y - oy) * esc)) for x, y in pts) + 'Z'


def d_curva(curva, esc, ox, oy):
    f = lambda pt: '%s %s' % (num((pt.x - ox) * esc), num((pt.y - oy) * esc))
    d = 'M' + f(curva.start_point)
    for s in curva.segments:
        d += ('L' + f(s.c) + 'L' + f(s.end_point)) if s.is_corner else ('C' + f(s.c1) + ' ' + f(s.c2) + ' ' + f(s.end_point))
    return d + 'Z'


def circulo(cx, cy, r):
    k = 0.5522847498 * r
    seg = [(cx + r, cy), (cx + r, cy + k, cx + k, cy + r, cx, cy + r), (cx - k, cy + r, cx - r, cy + k, cx - r, cy),
           (cx - r, cy - k, cx - k, cy - r, cx, cy - r), (cx + k, cy - r, cx + r, cy - k, cx + r, cy)]
    d = 'M' + ' '.join(num(v) for v in seg[0])
    for s in seg[1:]: d += 'C' + ' '.join(num(v) for v in s)
    return d + 'Z'


def svg(caja_vb, partes, aire=0.0, titulo='Kiko Lareo'):
    x, y, w, h = caja_vb
    vb = '%s %s %s %s' % (num(x - aire), num(y - aire), num(w + 2 * aire), num(h + 2 * aire))
    cuerpo = ''.join('<path fill="%s"%s d="%s"/>' % (c, ' fill-rule="evenodd"' if eo else '', d) for c, d, eo in partes)
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s" role="img" aria-label="%s"><title>%s</title>%s</svg>\n'
            % (vb, titulo, titulo, cuerpo))


# ----------------------------------------------------------------- monograma
# Medidas del `kl` de la lámina, limpias. El original es una imagen rugosa (esquinas mordidas,
# una rendija donde la pata toca la l), así que no se autotraza: se construye con sus medidas.
# Unidades: px del recorte de la lámina (746 de ancho × 713,3 de alto). Reglas de la forma:
# palos rectos; las dos diagonales del brazo paralelas entre sí (pendiente 1,14) y las dos de la
# pata también (1,278); el brazo toca la l en un punto, que cierra el triángulo del hueco.
K_ANCHO = 194.4          # palo de la k
L_X0, L_X1 = 544.4, 742.4  # palo de la l
ALTO = 713.3
BRAZO_Y = 199.0          # cara superior del brazo
PEND_BRAZO, PEND_PATA = 1.14, 1.278
PUNTA_X = 359.0          # vértice del hueco (hacia la izquierda)
PUNTA_Y = 411.9
PUNTA_BRAZO_X = 528.0    # el brazo NO toca la l: queda una rendija de ~16 como en la lámina
EXTERIOR = [
    (0, 0), (K_ANCHO, 0),
    (K_ANCHO, 349.8),
    (K_ANCHO + (349.8 - BRAZO_Y) / PEND_BRAZO, BRAZO_Y),            # el brazo sube hacia la derecha
    (PUNTA_BRAZO_X, BRAZO_Y),                                        # cara superior del brazo
    (PUNTA_X, PUNTA_Y),                                              # vértice del hueco
    (L_X0, PUNTA_Y + PEND_PATA * (L_X0 - PUNTA_X)),                  # la pata baja y se une a la l
    (L_X0, 0), (L_X1, 0), (L_X1, ALTO),
    (352.0, ALTO),                                                   # pie de la pata
    (352.0 - (ALTO - 513.2) / PEND_PATA, 513.2),                     # la pata sube hacia el palo de la k
    (195.4, 513.2), (195.4, ALTO), (0, ALTO),
]


def monograma():
    esc = ALTO_MONO / ALTO
    d = d_poligono(EXTERIOR, esc, 0, 0)
    return d, (L_X1) * esc, (L_X1 - L_X0) * esc


def escribe_monograma(letras, ancho, palo):
    SALIDA.mkdir(parents=True, exist_ok=True)
    caja_solo = (0, 0, ancho, ALTO_MONO)
    for suf, col in (('', NEGRO), ('-crema', CREMA)):
        (SALIDA / f'monograma-solo{suf}.svg').write_text(
            svg(caja_solo, [(col, letras, True)], aire=250), encoding='utf-8')
    # con el punto: redondo, asentado en la base (con el mismo rebase que las letras redondas)
    diam = 260.0; hueco = 0.27 * palo        # punto pegado a la l: separación = 27 % del palo
    cx = ancho + hueco + diam / 2; r = diam / 2; cy = ALTO_MONO - (r - 14)
    punto = circulo(cx, cy, r)
    caja_p = (0, 0, cx + r, ALTO_MONO + 14)
    for suf, col in (('', NEGRO), ('-crema', CREMA)):
        (SALIDA / f'monograma{suf}.svg').write_text(
            svg(caja_p, [(col, letras, True), (ROJO, punto, False)], aire=250), encoding='utf-8')
    print('monograma: ancho %.0f, palo de la l %.0f, punto %.0f' % (ancho, palo, diam))


# ----------------------------------------------------------------- firma
def firma():
    g = leer(FUENTE / 'kikolareo-lamina.png') / 255.0
    g = caja(caja(g, 1), 1)                          # quita el diente del borde antes de trazar
    m = g > 0.5
    cs = curvas(m, turdsize=30, alphamax=1.05, opticurve=True, opttolerance=0.45)
    ys, xs = np.where(m)
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
    esc = ALTO_FIRMA / (y1 - y0)

    def caja_de(c):
        pts = [(c.start_point.x, c.start_point.y)] + [(s.end_point.x, s.end_point.y) for s in c.segments]
        a = np.array(pts); return a[:, 0].min(), a[:, 1].min(), a[:, 0].max(), a[:, 1].max()
    # el punto del nombre: la mancha redonda más baja de la franja central
    cand = []
    for c in cs:
        bx0, by0, bx1, by1 = caja_de(c)
        w, h = bx1 - bx0, by1 - by0
        if 0.8 < w / h < 1.25 and w * esc < 330 and w * esc > 120 and 0.3 * (x1 - x0) < (bx0 + bx1) / 2 < 0.62 * (x1 - x0) + x0:
            cand.append((by1, c))
    punto = max(cand, key=lambda t: t[0])[1] if cand else None
    resto = [c for c in cs if c is not punto]
    letras = ''.join(d_curva(c, esc, x0, y0) for c in resto)
    dpunto = d_curva(punto, esc, x0, y0) if punto is not None else ''
    ancho = (x1 - x0) * esc
    caja_f = (0, 0, ancho, ALTO_FIRMA)
    for suf, col in (('', NEGRO), ('-crema', CREMA)):
        (SALIDA / f'wordmark{suf}.svg').write_text(
            svg(caja_f, [(col, letras, True), (ROJO, dpunto, True)], aire=250), encoding='utf-8')
        (SALIDA / f'wordmark-un-color{suf}.svg').write_text(
            svg(caja_f, [(col, letras + dpunto, True)], aire=250), encoding='utf-8')

    # ---- apilada: «kiko.» (con el punto) sobre «lareo», alineadas a la izquierda
    corte = caja_de(punto)[0]                          # lo que queda a la izquierda del punto es «kiko»
    l1 = [c for c in resto if (caja_de(c)[0] + caja_de(c)[2]) / 2 < corte]
    l2 = [c for c in resto if c not in l1]
    ax = min(caja_de(c)[0] for c in l1 + [punto]); bx = min(caja_de(c)[0] for c in l2)
    ancho1 = (max(caja_de(c)[2] for c in l1 + [punto]) - ax) * esc
    ancho2 = (max(caja_de(c)[2] for c in l2) - bx) * esc
    entre = 0.16 * ALTO_FIRMA                           # aire entre las dos líneas
    d1 = ''.join(d_curva(c, esc, ax, y0) for c in l1)
    d2 = ''.join(d_curva(c, esc, bx, y0 - (ALTO_FIRMA + entre) / esc) for c in l2)
    dp = d_curva(punto, esc, ax, y0)
    ancho_a, alto_a = max(ancho1, ancho2), 2 * ALTO_FIRMA + entre
    for suf, col in (('', NEGRO), ('-crema', CREMA)):
        (SALIDA / f'wordmark-apilado{suf}.svg').write_text(
            svg((0, 0, ancho_a, alto_a), [(col, d1 + d2, True), (ROJO, dp, True)], aire=250), encoding='utf-8')
    print('firma: %d curvas, punto %s, ancho %.0f; apilada %.0f×%.0f' % (
        len(cs), 'encontrado' if punto is not None else 'NO ENCONTRADO', ancho, ancho_a, alto_a))

    # ---- componentes de Astro
    vb = '0 0 %s %s' % (num(ancho), num(ALTO_FIRMA))
    (COMPONENTES / 'Firma.astro').write_text('''---
// La firma kiko.lareo como contornos vectoriales (identidad v3.1, diseño del dueño).
// GENERADO por web/scripts/marca/generar.py: no lo edites a mano, vuelve a generarlo.
// Las letras toman el color del texto que las rodea (currentColor), así que cambian solas
// con el tono claro / oscuro; el punto es siempre el rojo de la marca.
interface Props { class?: string }
const { class: clase = '' } = Astro.props;
---
<svg class={`firma ${clase}`.trim()} viewBox="%s" role="img" aria-label="Kiko Lareo" focusable="false"><path fill="currentColor" fill-rule="evenodd" d="%s"/><path class="firma-punto" fill-rule="evenodd" d="%s"/></svg>
''' % (vb, letras, dpunto), encoding='utf-8')

    vba = '0 0 %s %s' % (num(ancho_a), num(alto_a))
    (COMPONENTES / 'FirmaApilada.astro').write_text('''---
// La firma apilada de la portada: «kiko.» sobre «lareo» (identidad v3.1, diseño del dueño).
// GENERADO por web/scripts/marca/generar.py: no lo edites a mano, vuelve a generarlo.
// Sin `foto`, las letras toman el color del texto (currentColor). Con `foto`, la foto va DENTRO
// de las letras (el gris las oscurece un poco para que ganen contraste sobre el papel).
// El punto es siempre el rojo de la marca.
interface Props { class?: string; foto?: string }
const { class: clase = '', foto } = Astro.props;
---
<svg class={`firma-apilada ${clase}`.trim()} viewBox="%s" role="img" aria-label="Kiko Lareo" focusable="false" preserveAspectRatio="xMinYMax meet">
  {foto ? (
    <>
      <defs><clipPath id="firma-letras"><path fill-rule="evenodd" d="%s"/></clipPath></defs>
      <g clip-path="url(#firma-letras)">
        <rect width="%s" height="%s" fill="#A9A59C" />
        <image href={foto} width="%s" height="%s" preserveAspectRatio="xMidYMid slice" style="mix-blend-mode:multiply" />
      </g>
    </>
  ) : (
    <path fill="currentColor" fill-rule="evenodd" d="%s" />
  )}
  <path class="firma-punto" fill-rule="evenodd" d="%s" />
</svg>
''' % (vba, d1 + d2, num(ancho_a), num(alto_a), num(ancho_a), num(alto_a), d1 + d2, dp), encoding='utf-8')


if __name__ == '__main__':
    escribe_monograma(*monograma())
    firma()
