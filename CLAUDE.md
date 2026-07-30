# Kiko Lareo — Web de portfolio (fotógrafo y videógrafo)

Portfolio one-page + panel de administración para Kiko Lareo, fotógrafo y
videógrafo en A Coruña (Galicia). Él publica el contenido, no es programador:
**explícale las cosas sin jerga y en español, con pasos concretos.**

- **Producción:** https://kikolareo.com (Netlify; `kikolareo.es` → 301 al .com)
- **Repo:** github.com/kikoLareo/kiko-lareo-web · **Idioma de web, contenido y commits: español.**
- **Estado y hoja de ruta:** ver `ROADMAP.md` (fases hechas/pendientes, decisiones, descartes).
  Si vas a planificar o retomar trabajo, lee ROADMAP.md, no hace falta releer todo el código.

## Stack

- **Astro 5** estático + **Decap CMS** en `/admin` (backend git-gateway + Netlify Identity).
- El proyecto vive en `web/` (el `netlify.toml` de la raíz apunta ahí: base `web`, build `npm run build`, publish `dist`).
- Sin framework de UI ni librerías de animación: todo HTML/CSS/JS a mano. No añadir dependencias sin motivo.

## Comandos (siempre desde `web/`)

```
npm ci           # instalar
npm run build    # compila a web/dist  (verifica aquí antes de commitear)
npm run dev      # servidor local
npm run fotos -- <categoria> <carpeta> [fecha]   # volcado por lotes (scripts/subir-fotos.mjs)
```

## Mapa de archivos (salta directo, no explores a ciegas)

- `web/src/pages/index.astro` — **portada** (hero, selección de proyectos, categorías, manifiesto, reel, sobre mí, "qué aporto", clientes, contacto). Se alimenta sola del contenido.
- `web/src/pages/[categoria].astro` — páginas `/deportes /eventos /moda /hosteleria /naturaleza` (listado de proyectos + galería de fotos).
- `web/src/pages/proyectos/[slug].astro` — **caso de estudio** por proyecto (reto→idea→ejecución→historia→resultado, código de archivo, barra de progreso, embeds).
- `web/src/pages/gracias.astro` — confirmación del formulario (noindex, fuera del sitemap).
- `web/src/pages/404.astro`, `web/src/pages/robots.txt.ts`
- `web/src/layouts/Base.astro` — `<head>` (SEO, OG, favicon, JSON-LD), redirect de tokens de Netlify Identity a `/admin`, script de las tarjetas flip, enlace "saltar al contenido".
- `web/src/components/` — `Nav.astro`, `Slot.astro` (hueco imagen/vídeo/placeholder), `FlipCard.astro` (tarjeta HISTORIA ↻).
- `web/src/lib/categorias.ts` — las **5 categorías fijas** (id, orden, layout portada, SEO por categoría). Añadir/renombrar categoría se hace AQUÍ + en el enum de `content.config.ts` + en los dos selectores de `config.yml`.
- `web/src/lib/archivo.ts` — `codigoArchivo()` (genera `KL—001` por orden cronológico) y `ACENTOS` (5 colores de proyecto con contraste comprobado).
- `web/src/lib/seo.ts` — JSON-LD: LocalBusiness (geo A Coruña), Person, migas.
- `web/src/styles/global.css` — **todos los estilos** (un solo archivo). Empieza con los tokens `:root`.
- `web/public/admin/config.yml` — configuración del panel Decap. **Rutas relativas a la RAÍZ del repo → llevan prefijo `web/`.** Previews desactivadas.
- `web/public/marca/` — paquete de logo (wordmark + monograma KL., PNG y SVG, negro/crema, avatares). Favicon en `web/public/favicon.png` + `apple-touch-icon.png`.
- `site/`, `project/`, `chats/` — referencia del diseño original. **No tocar.**

## Modelo de contenido (colecciones; esquema en `content.config.ts`, panel en `config.yml`)

- **fotos** (`.md`): `titulo`, `categoria`, `fecha`, `imagen?`, `clip?` (MP4 corto), `alt?`, `historia?` {titulo, meta, texto, proyecto?}. Alimentan portada y galería de categoría. Con `historia` → tarjeta flip.
- **proyectos** (`.md`): `titulo`, `categoria`, `fecha`, `destacado` (portada), `cliente`, `anio`, `servicios`, `entrega`, `titular`, `reto?`, `idea?`, `ejecucion[]`, `color` (rojo/azul/verde/violeta/mostaza), `localidad?`, `descripcion_seo?`, `portada?`, `galeria[]` {etiqueta, imagen?, clip?}, `video?` {titulo, etiqueta, archivo? (MP4), url? (embed), imagen?}. El cuerpo md es la historia.
- **paginas/general.json** (singleton): textos globales — hero (`hero_titular`, `hero_estilo` fondo/tarjeta/letras, `hero_imagen`), `manifiesto`, `aportes[]`, `aportes_cierre`, `cierre`, `sobre_mi`, `clientes[]`, `redes[]`, `reel`, `email`, `telefono`, `seo`, `direccion`, `marquesina`, `localizacion`.

**Regla de oro:** cualquier campo nuevo se añade EN LOS DOS sitios — `content.config.ts` (zod) y `config.yml` (Decap, con `hint:` en español). Si no, o rompe el build o el dueño no lo ve.

## Sistema de marca (tokens en `:root` de global.css)

- Colores: `--kl-black #0B0B0B` (negro carbón), `--kl-paper #F2EFE8` (blanco papel), `--kl-red #FF4A32` (rojo flash, SOLO acento), `--kl-gray #9B9B95`. Alias: `--negro --crema --rojo --gris`.
- Tipografías: `--display` Bricolage Grotesque (400/600/800, titulares y cuerpo), `--mono` IBM Plex Mono (400/500/600, metadatos/códigos). No añadir una tercera.
- Titulares en mayúsculas, line-height ~0.9, letter-spacing negativo. Rojo como señal (números, líneas, estado activo), nunca como fondo dominante.
- Toda animación respeta `prefers-reduced-motion` y no bloquea la carga. Ante la duda, gana la fotografía.

## Despliegue — IMPORTANTE

- Cada push a `main` debería desplegar en Netlify solo, **pero el webhook se salta pushes de forma intermitente** (los commits del panel de Decap sí despliegan; los pushes de código a veces no).
- Tras cada push a `main`, **avisar al dueño de que confirme/pulse "Trigger deploy" en Netlify** si no aparece el commit nuevo. No dar por publicado algo solo porque el push funcionó.
- Rama de trabajo de esta línea: `claude/project-context-review-m4mzmq`. El panel commitea directo a `main`: `git fetch/merge origin main` antes de trabajar.

## Ver cambios de verdad (recipe de captura)

No hay salida a servicios externos como instagram.com (los embeds no cargan en pruebas). Para ver el render:
```
cd web && npm run build
cd dist && python3 -m http.server 4321 &     # 'serve' puede fallar; usar python
# Playwright: chromium en /opt/pw-browsers/chromium-1194/chrome-linux/chrome
# (playwright-core se instala en el scratchpad, no en el proyecto)
```

## Gotchas aprendidos

- **Slugs:** el `slug` de proyecto sale del `titulo`; títulos largos → URLs kilométricas malas para SEO. El panel avisa de usar títulos cortos. Corregir renombrando el `.md`.
- **Peso:** vídeos subidos y fotos viven en el repo. Fotos en JPG (no PNG de 1–2 MB); clips MP4 H.264 < ~20 MB. Piezas largas → URL de YouTube/Vimeo, no subir. Nunca subir RAW (.cr3).
- **Embeds verticales** (Instagram/TikTok): marco estrecho centrado (`.embed-vertical`) + script que ajusta alto por postMessage. Horizontales (YT/Vimeo) → 16:9.
- **Entregas a clientes:** se usa Pixieset (externo), no se suben al repo.
- **Sin datos inventados:** el dueño lleva <1 año; no poner años de experiencia, "desde 20XX" ni nº de proyectos falsos.
