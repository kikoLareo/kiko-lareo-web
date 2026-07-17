# Roadmap — kikolareo.com

Estado del rediseño "KL / Visual Archive → Una idea, muchas formas".
Última actualización: 17/07/2026. Los cambios se desarrollan en ramas y se
publican al fusionar a `main` (Netlify despliega automáticamente).

---

## ✅ Hecho

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

> Prioridad de contenido tras la Fase 3: montar los casos reales
> (Estrella Galicia, HC Liceo, presentación de fichajes…) con su reto,
> idea, pasos y fotos desde el panel.

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
