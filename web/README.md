# Kiko Lareo® — Web con gestor de contenidos

Versión definitiva de la web: [Astro](https://astro.build) (generador estático,
mismo diseño que el prototipo de Claude Design) + [Decap CMS](https://decapcms.org)
como panel de administración con login en `/admin`.

> Esta carpeta (`web/`) sustituye a `site/` (la primera versión estática sin gestor,
> que queda como referencia).

## Qué hace el gestor

Entras en `tudominio.com/admin`, te logueas, y tienes tres apartados:

- **Fotos** — subes una foto, eliges categoría (deportes / eventos / moda / comida)
  y fecha. Las más recientes de cada categoría aparecen automáticamente en la
  portada, y todas en la página de su categoría. Si le rellenas la "Historia",
  la foto se convierte en tarjeta que gira (HISTORIA ↻).
- **Proyectos** — das de alta un proyecto (ficha, historia, galería, vídeo) y se
  genera sola su página en `/proyectos/<nombre>`, su tarjeta en la página de la
  categoría y el enlace "VER PROYECTO" en la portada.
- **Páginas** — textos de la portada, foto del hero, reel, sobre mí, servicios,
  clientes, email y redes sociales.

Cada vez que publicas algo, el hosting reconstruye la web automáticamente
(tarda ~1 minuto en verse online).

## Páginas que se generan

- `/` — portada (se alimenta sola de las últimas fotos y proyectos)
- `/deportes`, `/eventos`, `/moda`, `/comida` — una por categoría, con sus
  proyectos y su galería completa
- `/proyectos/<slug>` — una por cada proyecto dado de alta
- `/admin` — el panel

## Desarrollo en local

```bash
cd web
npm install
npm run dev        # web en http://localhost:4321
```

Para probar el panel en local (sin login):

```bash
npx decap-server   # en otra terminal, desde web/
# y abre http://localhost:4321/admin/
```

## Publicar en Netlify (gratis)

1. Sube este repositorio a GitHub.
2. En [netlify.com](https://netlify.com): "Add new site → Import from Git" y
   elige el repositorio. El `netlify.toml` de la raíz ya configura el build
   (carpeta `web/`, comando `npm run build`).
3. Para activar el login del panel: en el sitio de Netlify, **Identity → Enable
   Identity**, luego **Identity → Services → Enable Git Gateway**, y en
   **Identity → Invitations** invítate con tu email. En "Registration" elige
   *Invite only* para que nadie más pueda registrarse.
4. Entra en `tu-sitio.netlify.app/admin` con ese email y a publicar.

Cuando tengas dominio propio, se añade en Netlify (Domain settings) y actualiza
`site` en `astro.config.mjs`.

## SEO local (A Coruña / Galicia)

La web ya lleva incorporado:

- **Título y descripción únicos por página**, orientados a las búsquedas locales
  ("fotógrafo deportivo A Coruña", "fotógrafo de eventos Galicia"…). Los de las
  categorías se editan en `src/lib/categorias.ts`; el de la portada y el de cada
  proyecto, desde el panel.
- **Datos estructurados (schema.org)**: ficha de negocio local con dirección y
  coordenadas de A Coruña, área de servicio (A Coruña, Galicia, España), migas de
  pan y ficha de cada proyecto con su localidad.
- **Sitemap** (`/sitemap-index.xml`) y **robots.txt** generados automáticamente.
- **Open Graph / Twitter cards** para que los enlaces se vean bien al compartir.
- Campos SEO en el panel: descripción de la web, imagen al compartir, teléfono,
  localidad y descripción de cada proyecto, y texto alternativo de cada foto.

Lo que hay que hacer fuera del código (por orden de impacto):

1. **Dominio propio** (ej. `kikolareo.com`) — imprescindible para posicionar.
   Al tenerlo, actualiza `site` en `astro.config.mjs`.
2. **Perfil de Empresa de Google** ([business.google.com](https://business.google.com)):
   date de alta como "Fotógrafo" en A Coruña con el mismo nombre, email y teléfono
   que la web. Es EL factor número uno para salir en el mapa y en "fotógrafos cerca
   de mí".
3. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)):
   verifica el dominio y envía el sitemap. Te dirá con qué búsquedas te encuentran.
4. **Constancia en el contenido**: cada proyecto nuevo con su localidad y 2 párrafos
   de texto es una página más que puede posicionar ("fotógrafo festival A Coruña").
   Rellena siempre el texto alternativo de las fotos.
5. **Enlaces locales**: pide a clientes (festival, restaurantes, clubes) que enlacen
   tu web desde las suyas, y enlaza la web desde tus perfiles de redes.

## Pendiente

- URLs reales de redes sociales (Páginas → Portada y textos generales → Redes).
- Fotos y vídeos reales (los huecos punteados desaparecen al subirlas).
- El formulario de contacto abre el cliente de correo; si prefieres recibirlo
  sin que el visitante abra su email, se puede pasar a Netlify Forms.
