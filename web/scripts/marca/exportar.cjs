// Saca los PNG de la marca a partir de los SVG de public/marca (que genera generar.py).
//   PW=<carpeta con node_modules/playwright-core> node web/scripts/marca/exportar.cjs
// Usa Chromium; el hueco del chromium cambia con el entorno (ver CLAUDE.md).
const path = require('path');
const fs = require('fs');
const { chromium } = require(path.join(process.env.PW, 'node_modules/playwright-core'));

const RAIZ = path.resolve(__dirname, '../..');
const MARCA = path.join(RAIZ, 'public/marca');
const FUENTES = path.join(RAIZ, 'public/fonts');
const NEGRO = '#0B0B0B', CREMA = '#F2EFE8';
const url = (f) => 'file://' + f;

(async () => {
  const ejecutable = fs.readdirSync('/opt/pw-browsers').filter((d) => d.startsWith('chromium-'))[0];
  const b = await chromium.launch({
    executablePath: `/opt/pw-browsers/${ejecutable}/chrome-linux64/chrome`,
    args: ['--no-sandbox', '--allow-file-access-from-files'],
  });

  // Una hoja HTML -> PNG (`fondo` null = transparente). Se escribe una página temporal en
  // disco porque setContent no deja leer archivos file:// desde about:blank.
  const tmp = path.join(require('os').tmpdir(), 'marca-export.html');
  const hoja = async (salida, cuerpo, ancho, alto, fondo) => {
    fs.writeFileSync(tmp, `<!doctype html><meta charset=utf-8><style>
      @font-face{font-family:Plex;font-weight:400;src:url('${url(FUENTES)}/ibm-plex-mono-400-latin.woff2') format('woff2')}
      html,body{margin:0;background:${fondo || 'transparent'}}
      body{width:${ancho}px;height:${alto}px;display:grid;place-items:center;overflow:hidden}
      </style>${cuerpo}`);
    const p = await b.newPage({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1 });
    await p.goto(url(tmp));
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: salida, omitBackground: !fondo });
    await p.close();
    console.log('✓', path.relative(RAIZ, salida), ancho + '×' + alto);
  };

  const img = (f, w) => `<img src="${url(path.join(MARCA, f))}" width="${w}" style="display:block">`;

  // medidas de cada SVG (su viewBox), para no fijar proporciones a mano
  const medidas = (f) => {
    const v = fs.readFileSync(path.join(MARCA, f), 'utf8').match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
    return { w: v[2], h: v[3] };
  };
  const alto = (f, ancho) => Math.round(ancho * medidas(f).h / medidas(f).w);

  // --- firma sobre transparente (punto rojo)
  await hoja(path.join(MARCA, 'wm-negro.png'), img('wordmark.svg', 2400), 2400, alto('wordmark.svg', 2400), null);
  await hoja(path.join(MARCA, 'wm-crema.png'), img('wordmark-crema.svg', 2400), 2400, alto('wordmark-crema.svg', 2400), null);
  // --- monograma sobre transparente (punto rojo)
  await hoja(path.join(MARCA, 'mono-negro.png'), img('monograma.svg', 1200), 1200, alto('monograma.svg', 1200), null);
  await hoja(path.join(MARCA, 'mono-crema.png'), img('monograma-crema.svg', 1200), 1200, alto('monograma-crema.svg', 1200), null);

  // --- avatares: monograma + nombre en mono, sobre carbón y sobre papel
  const avatar = (svgFile, color, nombre) => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:70px;margin-top:20px">
      ${img(svgFile, 820)}
      <span style="font:400 56px Plex,monospace;letter-spacing:.22em;color:${color};margin-top:-60px">${nombre}</span>
    </div>`;
  await hoja(path.join(MARCA, 'avatar-carbon.png'), avatar('monograma-crema.svg', CREMA, 'kiko.lareo'), 1440, 1440, NEGRO);
  await hoja(path.join(MARCA, 'avatar-crema.png'), avatar('monograma.svg', NEGRO, 'kiko.lareo'), 1440, 1440, CREMA);

  // mismo monograma pero SIN el aire de los SVG (viewBox recortado a la tinta): así se centra y se
  // controla cuánto ocupa en los cuadrados pequeños
  const ajustado = (f, w) => {
    let t = fs.readFileSync(path.join(MARCA, f), 'utf8');
    const [x, y, vw, vh] = t.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
    t = t.replace(/viewBox="[^"]+"/, `viewBox="${x + 250} ${y + 250} ${vw - 500} ${vh - 500}" width="${w}"`);
    return `<div style="display:block">${t}</div>`;
  };

  // --- avatares solo con el monograma (sin el nombre), centrado en el cuadrado
  await hoja(path.join(MARCA, 'avatar-kl-carbon.png'), ajustado('monograma-crema.svg', 880), 1440, 1440, NEGRO);
  await hoja(path.join(MARCA, 'avatar-kl-crema.png'), ajustado('monograma.svg', 880), 1440, 1440, CREMA);

  // --- favicon y icono de Apple: monograma grande sobre carbón, sin texto
  await hoja(path.join(RAIZ, 'public/favicon.png'), ajustado('monograma-crema.svg', 720), 1024, 1024, NEGRO);
  // iconos pequeños de pestaña: monograma casi a sangre, para que se lea a 16-32 px
  await hoja(path.join(RAIZ, 'public/favicon-32.png'), ajustado('monograma-crema.svg', 28), 32, 32, NEGRO);
  await hoja(path.join(RAIZ, 'public/favicon-48.png'), ajustado('monograma-crema.svg', 42), 48, 48, NEGRO);
  await hoja(path.join(RAIZ, 'public/apple-touch-icon.png'), ajustado('monograma-crema.svg', 240), 360, 360, NEGRO);

  // --- firma EXPRESIVA: el mismo dibujo con desgaste controlado (rugosidad en el borde y
  // grano suelto). Solo para portadas y piezas que pidan energía; en la web va la limpia.
  const svgTxt = (f) => fs.readFileSync(path.join(MARCA, f), 'utf8');
  const dsDe = (f) => [...svgTxt(f).matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  const vb = svgTxt('wordmark.svg').match(/viewBox="([^"]+)"/)[1];
  const expresiva = (color) => {
    const [d1, d2] = dsDe('wordmark.svg');   // letras, punto
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="2400" style="display:block">
      <defs><filter id="d" x="-3%" y="-8%" width="106%" height="116%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="3" seed="4" result="ruido"/>
        <feDisplacementMap in="SourceGraphic" in2="ruido" scale="15" xChannelSelector="R" yChannelSelector="G" result="borde"/>
        <feTurbulence type="fractalNoise" baseFrequency="0.16" numOctaves="2" seed="11" result="grano"/>
        <feColorMatrix in="grano" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  16 0 0 0 -3.5" result="huecos"/>
        <feComposite in="borde" in2="huecos" operator="in"/>
      </filter></defs>
      <g filter="url(#d)"><path fill="${color}" fill-rule="evenodd" d="${d1}"/><path fill="#FF4A32" fill-rule="evenodd" d="${d2}"/></g></svg>`;
  };
  const altoExp = alto('wordmark.svg', 2400);
  await hoja(path.join(MARCA, 'wm-expresivo-negro.png'), expresiva(NEGRO), 2400, altoExp, null);
  await hoja(path.join(MARCA, 'wm-expresivo-crema.png'), expresiva(CREMA), 2400, altoExp, null);

  await b.close();
})();
