// Optimización de imágenes subidas desde el panel (viven en /public/img).
// En Netlify se sirven a través de su Image CDN: redimensionadas al ancho
// necesario, en WebP y comprimidas → mucho menos peso sin tocar el original.
// En local (build de pruebas) se sirve el original, para poder verlas.

const enNetlify = process.env.NETLIFY === 'true';

export function optim(src?: string | null, ancho = 1400): string | undefined {
  if (!src) return src ?? undefined;
  // Solo imágenes locales subidas; no tocar remotas ni ya optimizadas
  if (!enNetlify || !src.startsWith('/') || src.startsWith('/.netlify')) return src;
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${ancho}&fm=webp&q=72`;
}
