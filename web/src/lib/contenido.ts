// Qué contenido se puede VER en la web. Regla del dueño (09/11/2026): no se
// publica nada a medias. Un proyecto sin fotos es un recuadro gris para el
// visitante, así que se queda en borrador hasta que esté completo.
//
// TODAS las páginas leen los proyectos y las fotos por aquí, nunca con
// getCollection directo: si no, un borrador se colaría en la portada, en
// /trabajo, en el siguiente-proyecto o en el sitemap.
//
// Un proyecto es visible si NO está marcado como borrador Y tiene portada.
// La segunda condición es una red de seguridad: si alguien desmarca el
// borrador sin haber subido todavía la foto, no sale en la web, y el aviso
// del compilador dice cuál es.
import { getCollection, type CollectionEntry } from 'astro:content';

type Proyecto = CollectionEntry<'proyectos'>;
type Foto = CollectionEntry<'fotos'>;

const yaAvisado = new Set<string>();
const avisa = (clave: string, texto: string) => {
  if (yaAvisado.has(clave)) return;
  yaAvisado.add(clave);
  console.warn(`\n⚠  ${texto}\n`);
};

const masReciente = (a: { data: { fecha: Date } }, b: { data: { fecha: Date } }) =>
  b.data.fecha.getTime() - a.data.fecha.getTime();

/** Proyectos publicados, del más reciente al más antiguo. */
export async function proyectosVisibles(categoria?: string): Promise<Proyecto[]> {
  const todos = await getCollection('proyectos');
  const visibles = todos.filter((p) => {
    if (p.data.borrador) return false;
    if (!p.data.portada) {
      avisa(
        `sin-portada:${p.id}`,
        `"${p.data.titulo}" NO se publica: no está en borrador pero no tiene foto de portada. ` +
          `Sube la portada o vuelve a marcarlo como borrador.`
      );
      return false;
    }
    return true;
  });
  return visibles
    .filter((p) => !categoria || p.data.categoria === categoria)
    .sort(masReciente);
}

/** Fotos sueltas que de verdad tienen foto (o clip), de la más reciente a la más antigua. */
export async function fotosVisibles(categoria?: string): Promise<Foto[]> {
  const todas = await getCollection('fotos');
  return todas
    .filter((f) => {
      if (f.data.imagen || f.data.clip) return true;
      avisa(`foto-vacia:${f.id}`, `La foto "${f.data.titulo}" NO se publica: no tiene imagen ni clip.`);
      return false;
    })
    .filter((f) => !categoria || f.data.categoria === categoria)
    .sort(masReciente);
}
