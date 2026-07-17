// Las 4 categorías fijas de la web. El contenido (fotos y proyectos) se
// gestiona desde el CMS; esto solo define su orden e identidad visual.
export interface Categoria {
  id: 'deportes' | 'eventos' | 'moda' | 'hosteleria';
  num: string;
  titulo: string;
  etiqueta: string;
  // Disposición de su rejilla en la portada (diseño original de Claude Design)
  grid: 'lead-left' | 'lead-right' | 'lead-center';
  cardPos: 0 | 1 | 2; // celda donde va la tarjeta con historia
  tall?: boolean;
  placeholders: [string, string, string];
  seo: { titulo: string; descripcion: string };
}

export const CATEGORIAS: Categoria[] = [
  {
    id: 'deportes',
    num: '01',
    titulo: 'DEPORTES',
    etiqueta: 'FOTO + VÍDEO',
    grid: 'lead-left',
    cardPos: 0,
    placeholders: ['Deportes — acción principal', 'Deportes — detalle', 'Deportes — ambiente'],
    seo: {
      titulo: 'Fotógrafo deportivo en A Coruña y Galicia — Kiko Lareo®',
      descripcion:
        'Fotografía y vídeo deportivo en A Coruña y toda Galicia: carreras, ciclismo, competiciones y clubes. Cobertura profesional de eventos deportivos por Kiko Lareo.',
    },
  },
  {
    id: 'eventos',
    num: '02',
    titulo: 'EVENTOS',
    etiqueta: 'FOTO + VÍDEO + AFTERMOVIE',
    grid: 'lead-right',
    cardPos: 2,
    placeholders: ['Eventos — público', 'Eventos — escenario', 'Eventos — momento clave'],
    seo: {
      titulo: 'Fotógrafo de eventos y conciertos en A Coruña — Kiko Lareo®',
      descripcion:
        'Fotografía y vídeo de eventos, festivales y conciertos en A Coruña y Galicia: foto, vídeo y aftermovie. Entrega rápida para redes sociales.',
    },
  },
  {
    id: 'moda',
    num: '03',
    titulo: 'MODA',
    etiqueta: 'EDITORIAL / LOOKBOOK',
    grid: 'lead-center',
    cardPos: 1,
    tall: true,
    placeholders: ['Moda — look 1', 'Moda — editorial principal', 'Moda — detalle'],
    seo: {
      titulo: 'Fotógrafo de moda y lookbooks en A Coruña — Kiko Lareo®',
      descripcion:
        'Fotografía editorial de moda en A Coruña y Galicia: lookbooks, campañas y dirección de arte para marcas y diseñadores.',
    },
  },
  {
    id: 'hosteleria',
    num: '04',
    titulo: 'HOSTELERÍA',
    etiqueta: 'RESTAURANTES / PRODUCTO',
    grid: 'lead-left',
    cardPos: 0,
    placeholders: ['Hostelería — plato estrella', 'Hostelería — sala / ambiente', 'Hostelería — proceso'],
    seo: {
      titulo: 'Fotógrafo gastronómico y de hostelería en Galicia — Kiko Lareo®',
      descripcion:
        'Fotografía para hostelería en A Coruña y Galicia: restaurantes, gastronomía, producto y contenido para redes sociales. Fotos que hacen que el plato se pida solo.',
    },
  },
];
