# Roadmap — kikolareo.com

Estado del rediseño "KL / Visual Archive → Una idea, muchas formas".
Última actualización: 17/07/2026. Los cambios se desarrollan en ramas y se
publican al fusionar a `main` (Netlify despliega automáticamente).

---

## ✅ Hecho

- **Fase 1 — Sistema visual base** (PR #1, pendiente de fusionar):
  tipografías Bricolage Grotesque + IBM Plex Mono, paleta del manual
  (negro carbón, blanco papel, rojo flash, gris técnico), botones editoriales
  texto + flecha con línea roja, línea roja en cabecera, firma gráfica en el
  pie, foco de teclado visible y "reducir movimiento" respetado.
- Web desplegada en Netlify con dominio kikolareo.com, panel Decap CMS
  operativo, SEO por categoría, sitemap, robots, JSON-LD y página 404.
- Redirects 301 de kikolareo.es → kikolareo.com confirmados.

## 🔴 Decisiones pendientes (las toma Kiko)

1. **Frase de portada / posicionamiento**: ¿"HISTORIAS CON LUZ" (lo que hoy
   se puede demostrar) o "UNA IDEA. MUCHAS FORMAS." (hacia dónde va la
   marca)? Acordado: se puede empezar con la primera y cambiar cuando haya
   ~6 casos de estudio publicados. El resto de la web se construye
   compatible con ambas.
2. **Entregas a clientes**: recomendación de usar Pixieset/Pic-Time para las
   galerías privadas; opcionalmente una sección "Entregas" en la web con
   páginas ocultas que enlacen a Drive/Vimeo. Sin decidir.

## 🧭 Principios acordados (no se negocian sin hablarlo)

- **Las páginas de categoría y su SEO se conservan** (`/deportes`, `/eventos`,
  `/moda`, `/comida`): la narrativa puede ser "una idea, muchas formas", pero
  las URLs y títulos siguen diciendo "fotógrafo y videógrafo en A Coruña".
- **El discurso va medio paso por delante del portfolio, nunca tres**: nada
  de presentarse como estudio/agencia hasta tener casos que lo respalden.
- **Los códigos de archivo y las selecciones de portada se generan solos**:
  Kiko nunca mantiene numeraciones ni listas a mano.
- **Toda animación**: explica el posicionamiento, funciona (o degrada bien)
  en móvil, respeta "reducir movimiento" y no penaliza la carga.
- Cualquier campo nuevo de contenido se añade en `content.config.ts` Y en
  `public/admin/config.yml`, con `hint` en español.

## 📅 Fases pendientes

### Fase 2 — Portada editorial
- Hero tipográfico: letras gigantes como máscara con contenido que rota
  dentro (FOTO → VÍDEO → EVENTO → CAMPAÑA), versión CSS ligera, sin
  librerías pesadas. *(La versión "morphing" completo de letras queda
  descartada por coste/fragilidad.)*
- Bloque "Selección de proyectos" (4–6) con casilla "Destacado" en el panel;
  sin marcar nada, salen los más recientes.
- Menú como índice editorial (01 PROYECTOS / 02 FORMA DE TRABAJAR / …).
- Sección "PUEDO ENTRAR EN UN PROYECTO PARA… PENSARLO / DARLE FORMA /
  PRODUCIRLO / HACER QUE SE VEA" en lugar de la lista cerrada de servicios,
  con la frase de cierre sobre reunir al equipo necesario.
- Pie vivo: "¿ACABAMOS? O EMPEZAMOS ALGO." con cambio de color al pasar.
- Un momento de tipografía cinética máximo ("NO EMPIEZO POR LA CÁMARA /
  EMPIEZO POR LA IDEA" al hacer scroll).

### Fase 3 — Proyectos como casos de estudio
- Página de proyecto como secuencia: EL RETO → LA IDEA → LA EJECUCIÓN
  (CONCEPTO ↓ GUIÓN ↓ LOCALIZACIONES ↓ PRODUCCIÓN ↓ PIEZAS) → EL RESULTADO.
- Apertura con código de archivo autogenerado ([ KL—031 ]), categoría,
  cliente, lugar, fecha y hora (campos nuevos opcionales en el panel).
- Transición continua tarjeta → proyecto con las view transitions nativas
  de Astro (la imagen crece hasta ser la cabecera).
- Barra de progreso de scroll: IDEA ━ FORMA ━ RESULTADO.
- Color de acento por proyecto, elegido de una lista cerrada de 4–5 colores
  con contraste verificado (nunca selector libre).
- Enlace "SIGUIENTE HISTORIA →" y pies de foto "lugar + hora + contexto".
- Prioridad de contenido: montar los casos reales primero
  (Estrella Galicia, HC Liceo, presentación de fichajes…).

### Fase 4 — Contacto y conversión
- Contacto como mini-brief con Netlify Forms: "¿Qué quieres hacer?" +
  "¿En qué punto está?" + campo libre "Cuéntamelo como te salga" +
  botón "VAMOS A DARLE FORMA →".
- Pasada completa de accesibilidad (alt útiles, contraste sobre foto,
  jerarquía idéntica en móvil).
- Arreglo pendiente: redirect de tokens de Netlify Identity a `/admin`
  (recuperación de contraseña del panel).

### Fase 5 — "Ideas en busca de marca"
- Nueva colección en el panel (título + concepto breve), claramente
  etiquetada como ideas conceptuales.
- Presentación v1: palabras flotando despacio y 3–4 combinaciones escritas
  por Kiko que se revelan al tocar/pasar el cursor
  (EL MAR + DATOS + GASTRONOMÍA = UN MENÚ QUE CAMBIA CON LA COSTA).
  *(El combinador libre de conceptos queda descartado: genera mezclas sin
  sentido.)*
- Cierre: "LAS IDEAS NO TIENEN QUE ESTAR TERMINADAS PARA EMPEZAR A HABLAR."
  + "CUÉNTAME LA TUYA →".

### Fase 6 — Cuando haya archivo suficiente (6+ proyectos)
- Selector de vistas [ POR IDEA ] [ POR FORMATO ] [ POR CLIENTE ] con
  reordenación animada de tarjetas.
- Tarjetas que se transforman al interactuar (la imagen invade, el título
  cambia por la idea central; en móvil: primer toque transforma, segundo abre).
- Selector "¿QUÉ QUIERES CONSEGUIR?" orientado al objetivo del cliente,
  con proyectos relacionados por opción.
- Portada "UNA IDEA. MUCHAS FORMAS." si se confirma el cambio de frase.

## 🗄️ Aparcado / descartado (y por qué)

- **Mesa de ideas interactiva con piezas arrastrables**: la pieza más cara
  del documento y fricción para la mayoría de visitantes; el selector de
  vistas + tarjetas transmite lo mismo por una décima parte del coste.
- **Morphing completo de letras del hero** (la I → línea de tiempo, etc.):
  semanas de trabajo frágil; se hace la versión máscara.
- **Cursor contextual con verbos** (VER IDEA / REPRODUCE / HABLEMOS):
  invisible en móvil; al final de todo, si sobra tiempo.
- **Monograma KL vivo**: depende de que primero se diseñe el logo/monograma
  (proyecto de identidad aparte); anotado como dependencia.
- **Modo claro/oscuro con interruptor**: descartado; en su lugar, partitura
  de secciones claras (blanco papel) y oscuras (negro carbón) controlada
  por el diseño.
- **Subir entregas de clientes (fotos/vídeos pesados) al repositorio**:
  inviable por peso, privacidad y descargas; ver decisión pendiente nº 2.

## 📋 Pendientes de contenido (Kiko, desde el panel)

- URLs reales de redes (Instagram, Vimeo, YouTube, TikTok) — hoy vacías.
- Teléfono de contacto.
- Clientes reales (hoy hay placeholders).
- Fotos y vídeos reales en los huecos; material de los casos de estudio.

## 🌐 Pendientes externos

- Google Search Console: verificar dominio y enviar el sitemap.
- Perfil de Empresa de Google como fotógrafo en A Coruña.
- Cuenta en Pixieset/Pic-Time si se confirma para entregas.
