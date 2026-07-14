# Kiko Lareo® — Web

Implementación de la web diseñada en Claude Design (ver `../project/Kiko Lareo Web.dc.html`).
HTML/CSS/JS estático, sin dependencias ni build: se puede subir tal cual a cualquier
hosting (GitHub Pages, Netlify, Vercel, un FTP…).

## Estructura

- `index.html` — portada one-page: nav fijo, hero, marquesina, 4 categorías con
  tarjetas que giran ("HISTORIA ↻"), reel, sobre mí, servicios, clientes y contacto.
- `proyecto-festival-norte.html` — subpágina del proyecto Festival Norte.
- `css/styles.css` — todos los estilos (identidad: crema `#F3EEE3` + negro `#141414`,
  tipografías Unbounded / Archivo / Space Mono de Google Fonts).
- `js/main.js` — giro de tarjetas y envío del formulario (abre el correo).
- `img/` — carpeta para tus fotos y vídeos.

## Cómo poner tus fotos

Cada hueco es un `<div class="slot">` con una etiqueta que dice qué foto va ahí.
Para rellenarlo:

```html
<!-- Antes -->
<div class="slot"><span>Deportes — acción principal</span></div>

<!-- Después -->
<div class="slot filled"><img src="img/deportes-sprint.jpg" alt="Sprint final, Copa Galicia"></div>
```

Lo mismo con vídeo (`<video>` en lugar de `<img>`). En los bloques de reel y
aftermovie, quita también el `<div class="play-overlay">…</div>` cuando incrustes
el vídeo real con controles.

## Cómo crear una página de proyecto nueva

1. Copia `proyecto-plantilla.html` y renómbrala, p. ej. `proyecto-copa-galicia.html`
   (minúsculas y guiones, sin espacios ni tildes — será parte de la URL).
2. Abre el archivo y sustituye todos los textos marcados con `⟨ ⟩`: título, ficha
   (cliente, año, servicios, entrega), historia y el enlace de "siguiente proyecto".
3. Rellena los huecos de imagen como se explica arriba.
4. Enlázala desde la portada: en `index.html`, en la cabecera de la categoría que
   toque, añade o cambia el enlace del lateral, p. ej.:

   ```html
   <a href="proyecto-copa-galicia.html" class="cat-aside link">VER PROYECTO: COPA GALICIA →</a>
   ```

   También puedes enlazarla desde la trasera de una tarjeta (como hace Eventos con
   Festival Norte) añadiendo dentro de `.flip-back`:

   ```html
   <a href="proyecto-copa-galicia.html" class="project-link">VER PROYECTO →</a>
   ```

5. Opcional: encadena los proyectos actualizando el bloque "SIGUIENTE PROYECTO"
   del proyecto anterior para que apunte al nuevo.

## Pendiente de decidir

- URLs reales de redes sociales (ahora apuntan a `#`).
- Backend del formulario de contacto (ahora abre el cliente de correo con el
  mensaje redactado; fácil de cambiar a Formspree / Netlify Forms).
- Logos reales de clientes.
