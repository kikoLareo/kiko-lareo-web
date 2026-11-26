// Tipo de trabajo de cada proyecto. Es un EJE DISTINTO de la categoría:
//
//   categoría = de qué va el trabajo (deportes, eventos, moda…) → SEO
//   tipo      = qué es el trabajo (una foto, un vídeo, un logo…)  → /archivo
//
// La categoría sola solo funciona mientras todo sean fotos y vídeos: un
// logo no es "deportes" y un moodboard no es "hostelería". Este eje es el
// que deja crecer el archivo sin romper las páginas de categoría.
//
// Para añadir un tipo nuevo hay que tocar TRES sitios:
//   1) esta lista
//   2) el enum `tipo` de content.config.ts
//   3) el selector `tipo` de public/admin/config.yml
export interface Tipo {
  id: 'fotografia' | 'video' | 'identidad' | 'direccion-arte' | 'documento';
  titulo: string;
  /** Etiqueta corta en monoespaciada, bajo cada miniatura del archivo */
  corto: string;
}

export const TIPOS: Tipo[] = [
  { id: 'fotografia', titulo: 'Fotografía', corto: 'FOTO' },
  { id: 'video', titulo: 'Vídeo', corto: 'VÍDEO' },
  { id: 'identidad', titulo: 'Identidad', corto: 'IDENTIDAD' },
  { id: 'direccion-arte', titulo: 'Dirección de arte', corto: 'DIR. ARTE' },
  { id: 'documento', titulo: 'Documento de imagen', corto: 'DOCUMENTO' },
];

export const tipoDe = (id: string): Tipo => TIPOS.find((t) => t.id === id) ?? TIPOS[0];

// Formato = el PESO del trabajo, otro eje más (lo decide el dueño en el panel):
//   proyecto → encargo con caso de estudio (reto, idea, ejecución)
//   sesión   → reportaje: fotos y una explicación corta
export interface Formato {
  id: 'proyecto' | 'sesion';
  titulo: string;
  plural: string;
  corto: string;
}

export const FORMATOS: Formato[] = [
  { id: 'proyecto', titulo: 'Proyecto', plural: 'Proyectos', corto: 'PROYECTO' },
  { id: 'sesion', titulo: 'Sesión', plural: 'Sesiones', corto: 'SESIÓN' },
];

export const formatoDe = (id: string): Formato => FORMATOS.find((f) => f.id === id) ?? FORMATOS[0];
