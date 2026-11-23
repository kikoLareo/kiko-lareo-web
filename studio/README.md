# Kiko Studio

App privada de gestión (trabajos, clientes, tareas, calendario, facturas y cobros).
Es un **proyecto de Netlify aparte** (`kiko-studio`), con carpeta base `studio/`.
La web del portfolio (`web/`) no depende de esto.

- `public/index.html` — la app entera (HTML/CSS/JS a mano, sin framework).
- `public/manifest.webmanifest` + `public/sw.js` — se instala en el móvil como app y abre sin conexión.
- `netlify/functions/api.mjs` — guarda los datos en Netlify Blobs (store `kiko-studio`). Pide la clave de la variable `KS_CLAVE`.
- Los datos NO viven en el repo. Copia automática diaria en el store (`copias/AAAA-MM-DD`) y botón de copia en Ajustes.

Probar en local: servir `public/` no basta (necesita `/api`); usar `netlify dev` desde `studio/`.
