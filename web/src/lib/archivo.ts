import type { CollectionEntry } from 'astro:content';

type Proyecto = CollectionEntry<'proyectos'>;

// Código de archivo ([ KL—001 ]): posición cronológica del proyecto entre
// todos los publicados. Se calcula solo; Kiko nunca lo escribe a mano.
export function codigoArchivo(proyecto: Proyecto, todos: Proyecto[]): string {
  const cronologicos = [...todos].sort(
    (a, b) => a.data.fecha.getTime() - b.data.fecha.getTime()
  );
  const n = cronologicos.findIndex((p) => p.id === proyecto.id) + 1;
  return `KL—${String(n).padStart(3, '0')}`;
}

// Colores de acento por proyecto: lista cerrada con el contraste comprobado
// sobre blanco papel y negro carbón. El panel solo ofrece estos.
export const ACENTOS: Record<string, string> = {
  rojo: '#FF4A32',
  azul: '#2643E9',
  verde: '#0F7B3E',
  violeta: '#6B2FD8',
  mostaza: '#B87E00',
};
