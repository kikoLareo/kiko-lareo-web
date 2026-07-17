import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categoria = z.enum(['deportes', 'eventos', 'moda', 'hosteleria', 'naturaleza']);

// Fotos sueltas: alimentan la portada (últimas por categoría) y la galería
// de cada página de categoría. Si llevan "historia", se muestran como
// tarjeta que gira (HISTORIA ↻).
const fotos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fotos' }),
  schema: z.object({
    titulo: z.string(),
    categoria,
    fecha: z.coerce.date(),
    imagen: z.string().optional(),
    // Clip de vídeo corto (MP4). Si está, se muestra en vez de la imagen
    // (y la imagen, si la hay, hace de fotograma de espera).
    clip: z.string().optional(),
    alt: z.string().optional(),
    historia: z
      .object({
        titulo: z.string(),
        meta: z.string().optional(),
        texto: z.string(),
        proyecto: z.string().optional(), // slug de un proyecto para enlazar
      })
      .optional(),
  }),
});

// Proyectos: cada entrada genera su subpágina en /proyectos/<slug> y
// aparece listada en su página de categoría. El cuerpo markdown es la
// historia del proyecto.
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    titulo: z.string(),
    categoria,
    fecha: z.coerce.date(),
    // Los destacados llenan la "Selección de proyectos" de portada;
    // si no hay ninguno marcado, salen los más recientes.
    destacado: z.boolean().default(false),
    cliente: z.string(),
    anio: z.coerce.string(),
    servicios: z.string(),
    entrega: z.string(),
    titular: z.string(), // titular de la historia; los saltos de línea se respetan
    // Caso de estudio (opcionales: si se dejan vacíos, la página del
    // proyecto funciona como siempre, solo con la historia y la galería)
    reto: z.string().optional(), // qué había que resolver
    idea: z.string().optional(), // cómo se decidió contarlo
    ejecucion: z.array(z.string()).default([]), // pasos del trabajo, en orden
    // Color de acento del proyecto (lista cerrada, contraste comprobado)
    color: z.enum(['rojo', 'azul', 'verde', 'violeta', 'mostaza']).default('rojo'),
    localidad: z.string().optional(), // dónde se hizo (SEO local): "A Coruña", "Santiago"…
    descripcion_seo: z.string().optional(), // meta description propia; si falta se genera
    portada: z.string().optional(),
    // Galería mixta: cada pieza puede ser una foto, un clip de vídeo
    // subido (MP4 corto) o ambos (la imagen hace de fotograma de espera)
    galeria: z
      .array(
        z.object({
          etiqueta: z.string(),
          imagen: z.string().optional(),
          clip: z.string().optional(),
        })
      )
      .default([]),
    video: z
      .object({
        titulo: z.string().default('AFTERMOVIE'),
        etiqueta: z.string().default('90 SEG · 4K'),
        imagen: z.string().optional(),
        // archivo: MP4 subido al panel; url: embed de YouTube/Vimeo
        // (para piezas largas). Si están los dos, gana el archivo.
        archivo: z.string().optional(),
        url: z.string().optional(),
      })
      .optional(),
  }),
});

// Textos generales de la web (portada, sobre mí, servicios, clientes, contacto).
const paginas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/paginas' }),
  schema: z.object({
    claim_izquierda: z.string(),
    claim_derecha: z.string(),
    marquesina: z.string(),
    hero_imagen: z.string().optional(),
    // 'fondo': foto a sangre completa con el titular encima;
    // 'tarjeta': foto centrada sobre el blanco papel (diseño original);
    // 'letras': la foto se ve DENTRO de las letras gigantes (máscara)
    hero_estilo: z.enum(['fondo', 'tarjeta', 'letras']).default('fondo'),
    // Titular gigante del hero. El nombre no caduca; una frase, encasilla.
    hero_titular: z.string().default('KIKO\nLAREO®'),
    reel: z.object({
      titulo: z.string(),
      etiqueta: z.string(),
      imagen: z.string().optional(),
    }),
    sobre_mi: z.object({
      retrato: z.string().optional(),
      parrafos: z.array(z.string()),
      stats: z.array(z.object({ linea1: z.string(), linea2: z.string() })),
    }),
    // Manifiesto: el momento de tipografía cinética de la portada
    manifiesto: z
      .object({ antes: z.string(), despues: z.string() })
      .default({
        antes: 'NO EMPIEZO POR LA CÁMARA.',
        despues: 'EMPIEZO POR LA HISTORIA.',
      }),
    // "Puedo entrar en un proyecto para…": sustituye a la lista cerrada
    // de servicios sin etiquetar a Kiko como estudio o agencia.
    aportes: z
      .array(z.object({ titulo: z.string(), texto: z.string() }))
      .default([]),
    aportes_cierre: z.string().default(''),
    // Cierre del pie: "¿ACABAMOS?\nO EMPEZAMOS ALGO."
    cierre: z.string().default('¿ACABAMOS?\nO EMPEZAMOS ALGO.'),
    // Se mantiene por compatibilidad con contenido antiguo (ya no se muestra)
    servicios: z.array(z.object({ nombre: z.string(), tag: z.string() })).default([]),
    clientes: z.array(z.string()),
    email: z.string(),
    telefono: z.string().optional(),
    localizacion: z.string(),
    redes: z.array(z.object({ nombre: z.string(), url: z.string() })),
    seo: z.object({
      descripcion: z.string(),
      imagen_compartir: z.string().optional(),
    }),
    direccion: z.object({
      ciudad: z.string(),
      region: z.string(),
      pais: z.string(),
      lat: z.coerce.number().optional(),
      lng: z.coerce.number().optional(),
    }),
  }),
});

export const collections = { fotos, proyectos, paginas };
