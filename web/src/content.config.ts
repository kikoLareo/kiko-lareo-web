import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categoria = z.enum(['deportes', 'eventos', 'moda', 'comida']);

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
    cliente: z.string(),
    anio: z.coerce.string(),
    servicios: z.string(),
    entrega: z.string(),
    titular: z.string(), // titular de la historia; los saltos de línea se respetan
    localidad: z.string().optional(), // dónde se hizo (SEO local): "A Coruña", "Santiago"…
    descripcion_seo: z.string().optional(), // meta description propia; si falta se genera
    portada: z.string().optional(),
    galeria: z
      .array(
        z.object({
          etiqueta: z.string(),
          imagen: z.string().optional(),
        })
      )
      .default([]),
    video: z
      .object({
        titulo: z.string().default('AFTERMOVIE'),
        etiqueta: z.string().default('90 SEG · 4K'),
        imagen: z.string().optional(),
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
    // 'fondo': foto a sangre completa con el logotipo encima;
    // 'tarjeta': foto centrada sobre el crema (diseño original)
    hero_estilo: z.enum(['fondo', 'tarjeta']).default('fondo'),
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
    servicios: z.array(z.object({ nombre: z.string(), tag: z.string() })),
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
