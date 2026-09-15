# Roadmap — kikolareo.com

Estado del rediseño "KL / Visual Archive → Una idea, muchas formas".
Última actualización: 15/09/2026. Los cambios se desarrollan en ramas y se
publican al fusionar a `main` (Netlify despliega automáticamente).

---

## ✅ Hecho

- **Cumplimiento legal y privacidad** (jul 2026): páginas /aviso-legal y
  /privacidad (LSSI + RGPD, con apartado de cookies), casilla de
  consentimiento obligatoria en el formulario, enlaces en los pies, datos
  identificativos editables en el panel (paginas → Datos legales).
  ⚠️ Pendiente de Kiko: rellenar su NIF (obligatorio) en el panel.
  No hace falta banner de cookies (la web no usa cookies de seguimiento).
- **Tipografías alojadas en la web** (jul 2026): Bricolage + IBM Plex Mono
  servidas desde /fonts/ (woff2, OFL); fuera Google Fonts. Sin peticiones
  a Google, más rápido y sin enviar IP del visitante fuera de la UE.
- **Logo y favicon** (jul 2026): wordmark KIKO LAREO® + monograma KL. (con
  cuadrado rojo) en /public/marca/ (PNG negro/crema + SVG + avatares);
  favicon y apple-touch-icon montados.
- **Índice del proyecto**: CLAUDE.md en la raíz (se carga solo en cada
  sesión) + este ROADMAP.md.
- **Extras post-Fase 4** (17/07/2026): categoría nueva **Naturaleza** (05,
  con página /naturaleza y SEO propio, para fotos personales de costa y
  paisaje); **clips de vídeo subibles** (MP4) en la colección de fotos y en
  las galerías de proyecto — se pueden mezclar fotos y clips — y campo
  "vídeo subido" en el vídeo principal del proyecto (la URL de
  YouTube/Vimeo queda para piezas largas); arreglo del primer proyecto
  real (URL corta /proyectos/coimbra-se-puso-la-bufanda, descripción SEO
  y embed de Instagram) y pista en el panel para que los títulos sean
  cortos; retirado un RAW (.cr3) subido por error a la biblioteca.
- **Fase 4 — Contacto y conversión** (17/07/2026): contacto como
  mini-brief con Netlify Forms ("¿Qué quieres hacer?" + "¿En qué punto
  está?" + "Cuéntamelo como te salga" + VAMOS A DARLE FORMA →), con
  honeypot antispam y página /gracias (noindex, fuera del sitemap);
  redirect de tokens de Netlify Identity a /admin (recuperación de
  contraseña del panel, pendiente desde la sesión inicial); enlace
  "saltar al contenido" y foco accesible en las opciones del brief.
  ⚠️ Pendiente de Kiko: activar la notificación por email de los envíos
  en Netlify (Site → Forms → Form notifications).
- **Fase 3 — Proyectos como casos de estudio** (17/07/2026): página de
  proyecto en secuencia EL RETO → LA IDEA → LA EJECUCIÓN → historia →
  EL RESULTADO (campos opcionales: vacíos, la página funciona como antes);
  código de archivo en la cabecera y en el nav; transición cinematográfica
  tarjeta→proyecto con view transitions nativas (cross-document, sin
  librerías); barra de progreso IDEA━FORMA━RESULTADO; color de acento por
  proyecto (lista cerrada de 5); "SIGUIENTE HISTORIA →" y fórmula de pies
  de foto en el panel. Ajustes de identidad de la misma fecha: hero partido
  con máscara, titular del hero editable (KIKO LAREO®), categoría
  Comida→Hostelería (URL incluida) y retirada de fechas/cifras sin respaldo.
- **Fase 2 — Portada editorial** (17/07/2026): hero con titular
  "HISTORIAS CON LUZ" en tres estilos (fondo / tarjeta / **letras-máscara**,
  elegible desde el panel), Selección de proyectos con código de archivo
  autogenerado y casilla "Destacado", menú como índice editorial numerado,
  manifiesto con tipografía que se revela al hacer scroll, sección
  "PUEDO ENTRAR EN UN PROYECTO PARA…" (editable, con la lista antigua de
  servicios como respaldo) y pie vivo "¿ACABAMOS? O EMPEZAMOS ALGO.".
- **Fase 1 — Sistema visual base** (fusionada en `main`, 17/07/2026):
  tipografías Bricolage Grotesque + IBM Plex Mono, paleta del manual
  (negro carbón, blanco papel, rojo flash, gris técnico), botones editoriales
  texto + flecha con línea roja, línea roja en cabecera, firma gráfica en el
  pie, foco de teclado visible y "reducir movimiento" respetado.
- Web desplegada en Netlify con dominio kikolareo.com, panel Decap CMS
  operativo, SEO por categoría, sitemap, robots, JSON-LD y página 404.
- Redirects 301 de kikolareo.es → kikolareo.com confirmados.

## ✔️ Decisiones tomadas

1. **Frase de portada** (17/07/2026): se sigue con **"HISTORIAS CON LUZ"**.
   "UNA IDEA. MUCHAS FORMAS." queda en reserva para cuando haya ~6 casos de
   estudio publicados (ver Fase 6).
2. **Entregas a clientes** (17/07/2026): se usa **Pixieset** para las
   galerías privadas. La sección "Entregas" propia queda aparcada.
3. **Despliegue**: mientras la web no esté anunciada se puede desplegar
   directamente a `main` para probar en producción.

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

---

# ✅ Plan del 15/09 — HECHO (pendiente de que Kiko lo pruebe)

Los pasos 1 a 4 están implementados, compilados y probados en navegador
(escritorio 1400 px y móvil 390 px): 0 errores de JS, 0 scroll lateral, y
el panel abierto de verdad con la receta de `CLAUDE.md`.

- **Panel en el móvil**: sueltas las dos reglas `min-width: 800px` de Decap
  (estilos en `public/admin/index.html`). Medido: el ancho ya no salta a
  800 px y no desborda nada.
- **Encender/apagar secciones**: `secciones` en `paginas` (8 casillas, todas
  encendidas por defecto). Apagar no borra.
- **Orden de campos del proyecto**: las fotos suben del píxel 3140 al 822.
  El formulario NO es más corto (4067 px, antes 3427) porque se añadieron
  dos campos; lo que cambia es que lo que más se usa está arriba.
  `ejecucion` lleva `minimize_collapsed` (de 515 px a 137 px).
- **Acreditaciones**: campo `acreditacion` {imagen, pie} en proyectos, con
  aviso en el panel de tapar el QR/código de barras. Se pinta como un pase
  girado junto al código de archivo. Probado con una imagen temporal.
- **Índice /archivo**: campo `tipo` (5 valores, ver `src/lib/tipos.ts`) y
  página filtrable. Los 9 proyectos existentes ya llevan tipo asignado.
  Enlace añadido al menú de portada.
- **Visor a pantalla completa**: en galerías de proyecto y de categoría.
  Teclado (Escape, flechas), pie de foto, contador, y foco devuelto al
  cerrar. Entra por `[data-visor]`; las tarjetas que giran quedan fuera.

⚠️ **Trampa encontrada y corregida, no repetirla**: `.visor` y
`.archivo-item` fijan `display`, que gana al atributo `hidden`. Sin
`.visor[hidden]{display:none}` el visor cerrado tapaba TODA la web y se
tragaba cualquier clic. Si se añade otro elemento que se oculte con
`hidden`, hay que apagar su `display` a mano.

**Paso 5 (clientes como pestañas de archivador) sigue aparcado**: con los
clientes de hoy quedaría flojo.

---

# 🔨 Plan de trabajo acordado (15/09/2026)

Salido de dos referencias que pasó Kiko (cestclair.me y MERCE des BENZ) y
de una petición suya: **el panel tiene que ser cómodo, y sobre todo en el
móvil**. Orden pensado para que lo primero que se note sea su comodidad
diaria, no un efecto visual.

## Paso 1 — El panel cómodo (PRIORIDAD)

Lo más importante para Kiko: hoy publica desde el móvil y el panel no
está pensado para eso.

### 1.1 Encender y apagar secciones desde el panel
Casillas en `paginas/general.json` para mostrar u ocultar cada bloque de
la portada sin tocar código ni borrar contenido: manifiesto, reel, sobre
mí, "qué aporto", clientes, marquesina. Apagar ≠ borrar: el texto se
queda guardado por si lo vuelve a encender.
- Campos nuevos en `content.config.ts` (booleanos con `default: true`,
  para que nada cambie de golpe) **y** en `config.yml` con `hint:`.
- La portada comprueba la casilla antes de pintar cada sección.
- Riesgo bajo. Se puede hacer entero de una vez.

### 1.2 Formularios más cortos
Las fichas de proyecto tienen ~20 campos seguidos; en el móvil es un
scroll eterno. Agrupar los que casi nunca se tocan (SEO, color, entrega,
servicios) dentro de un bloque plegable del panel, dejando arriba lo que
se usa siempre: título, categoría, fecha, fotos, vídeo.
- Solo toca `config.yml`. No cambia ningún dato ya guardado.

### 1.3 El panel en el móvil — CAUSA LOCALIZADA (15/09/2026)
Ya **se puede abrir y probar el panel aquí**, sin el login de Netlify:
receta completa en `CLAUDE.md`, apartado "Probar el PANEL de Decap sin
login". Eso cambia el punto de partida: el intento anterior falló porque
se iba a ciegas, no porque la idea fuera mala.

**Lo medido con pantalla de móvil (390 px):**
- La lista de entradas se ve bien.
- Al abrir una ficha, el ancho **salta a 800 px** y el teléfono lo encoge
  todo. Causa: `min-width: 800px` en `EditorContainer` y `ToolbarContainer`.
- La ficha de proyecto mide 3427 px de alto, unas 5,7 pantallas, dentro de
  un panel con scroll propio. 22 campos.

**Arreglo probado y verificado en el panel abierto** (la ficha sigue
abriéndose y ya no desborda nada):
```css
@media (max-width: 799px) {
  [class*="EditorContainer"], [class*="ToolbarContainer"] { min-width: 0 !important; }
  [class*="ToolbarContainer"] { height: auto !important; flex-wrap: wrap !important;
    gap: 6px !important; padding: 6px 8px !important; }
  [class*="ToolbarSectionMain"],
  [class*="ToolbarSubSectionFirst"], [class*="ToolbarSubSectionLast"] { flex-wrap: wrap !important; }
  [class*="ControlPaneContainer"] { padding-left: 12px !important; padding-right: 12px !important; }
}
```
⚠️ Las clases de Decap son de emotion y llevan hash
(`css-hn3jn7-EditorContainer`): usar SIEMPRE `[class*="..."]`, nunca el
hash entero, o al actualizar Decap deja de aplicar.
⚠️ Sigue haciendo falta que Kiko lo confirme en su iPhone: aquí se prueba
en Chromium emulando el móvil, y Safari real no es idéntico.

Pendiente después, ya con banco de pruebas: barra de guardar fija abajo y
cabecera más corta (hoy ocupa tres filas).

## Paso 2 — Las acreditaciones

Idea de Kiko y la mejor del lote: escanear las acreditaciones físicas de
prensa y enseñarlas en la ficha del proyecto donde se usaron. No es un
adorno prestado de otra web: es su oficio y encaja con la marca "archivo".

- Campo nuevo opcional en **proyectos**: `acreditacion` {imagen, dorso?,
  pie?}. Si está vacío, la ficha funciona igual que hoy.
- Se pinta como un pase escaneado, ligeramente girado, junto al código de
  archivo del proyecto (KL—00X). Sin librerías: CSS.
- Más adelante, si se juntan varias: una pared de acreditaciones en
  "Sobre mí".
- ⚠️ **Aviso a Kiko antes de subir ninguna:** taparle el código de barras
  o el QR si lo lleva, y revisar que no aparezcan datos personales que no
  quiera públicos (DNI, teléfono, número de licencia).

## Paso 3 — El índice de archivo (lo que permite crecer)

El problema real: hoy todo se ordena **por tema** (deportes, eventos,
moda, hostelería, naturaleza). Eso vale mientras todo sean fotos y
vídeos. Un logo no es "deportes"; un moodboard no es "hostelería".

Solución: separar dos ejes que hoy van juntos.
- **Tema** (lo de ahora): se conserva tal cual, es lo que posiciona en
  Google como fotógrafo en A Coruña. No se toca.
- **Tipo de trabajo** (nuevo): campo `tipo` en proyectos, lista cerrada —
  fotografía / vídeo / identidad / dirección de arte / documento de imagen.

Con eso, una página `/archivo` que lista todo el trabajo con una fila de
filtros arriba y una línea en monoespaciada bajo cada miniatura
(cliente a la izquierda, tipo a la derecha), como en MERCE des BENZ.

Esto **absorbe la Fase 6** ("[POR IDEA] [POR FORMATO] [POR CLIENTE]"): es
la misma idea, mejor definida.
⚠️ Con 9 proyectos un filtro se ve vacío. Se monta igualmente porque es
lo que deja subir logos y moodboards sin romper nada, pero el efecto no
llegará hasta que haya material.

## Paso 4 — Visor a pantalla completa

Hoy pulsas una foto de una galería y no pasa nada. Con 17 fotos ya se
nota; con 100 será un problema.
- Al pulsar, la foto se abre grande sobre fondo negro, con ANTERIOR,
  SIGUIENTE, su pie de foto y cierre con Escape o tocando fuera.
- Teclado y lector de pantalla incluidos; respeta "reducir movimiento".
- Sin librerías. Lo más barato del plan y lo que más se agradece.

## Paso 5 — Clientes como pestañas de archivador

De cestclair.me: la lista de clientes como pestañas de carpeta, cada
marca en la suya. Muy de archivo, muy suyo.
**Aparcado a propósito**: con los clientes de hoy quedaría flojo. Se
retoma cuando haya más.

## ❌ Lo que NO se copia de las referencias

- **Las ventanas de navegador flotando sobre un atardecer** (MERCE des
  BENZ): eso no es su web, es el anuncio de su web. Copiarlo es el error
  clásico de mirar una referencia.
- **La estética oscura y pesada con capas de movimiento**: es la moda de
  2026, pero cada capa de efecto es peso, y en una web de fotos cada
  segundo de carga se come una foto. Sigue valiendo la regla: ante la
  duda, gana la fotografía.

---

> **Decisión (contenido primero):** antes de la Fase 5, el dueño carga la
> web de contenido real (proyectos como Coimbra, fotos por categoría,
> naturaleza). La Fase 5 se retoma cuando haya 3-4 casos reales publicados
> — luce poco con la web casi vacía. Analítica: pendiente de que el dueño
> elija herramienta y pase el ID (ver conversación).

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
- **Confirmar que el panel del móvil volvió a funcionar** tras revertir
  los estilos (15/09/2026). Sin esa confirmación no se toca el punto 1.3.
- **Dos vídeos sin publicar**: llegaron en `.mov` y en MP4 con códec H.265,
  que no se ve en Chrome ni Firefox. Ya hay herramienta para convertirlos
  (ffmpeg vía `pip install imageio-ffmpeg`), pero falta saber **a qué
  proyecto va cada uno**.
- **Preguntas sin responder** de la carga de contenido: cliente de las
  fotos del libro y del DeporLocura de Djalminha, y si montó ese vídeo;
  fecha del Cabrio Fest; si la foto de playa es Riazor u Orzán y cómo se
  titula; URL del vídeo de Turismo de A Coruña.
- **Decisión abierta**: renombrar la categoría "Naturaleza". Acumula 12
  fotos y muchas son urbanas de A Coruña, no de naturaleza.

## 🌐 Pendientes externos

- Google Search Console: verificar dominio y enviar el sitemap.
- Perfil de Empresa de Google como fotógrafo en A Coruña.
- Cuenta en Pixieset/Pic-Time si se confirma para entregas.
