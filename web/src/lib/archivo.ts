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

// Los mismos cinco colores, aclarados para leerse sobre el fondo oscuro. Los
// originales se eligieron contra el papel. Sobre negro carbón (#0B0B0B) el
// azul daba 2,9:1, el violeta 2,8:1 y el verde 3,7:1, por debajo del mínimo
// de 4,5:1 para texto pequeño. Con estos pasan los tres (7,3 / 7,3 / 8,3).
// El rojo (5,9) y la mostaza (5,6 → 9,2) ya pasaban, y el rojo no cambia.
export const ACENTOS_OSCURO: Record<string, string> = {
  rojo: '#FF4A32',
  azul: '#8196FF',
  verde: '#3DBE7A',
  violeta: '#A98BFF',
  mostaza: '#E0A83A',
};
