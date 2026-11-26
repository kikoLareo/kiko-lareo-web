import { openSync, readSync, closeSync } from 'node:fs';
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

/**
 * Ancho y alto de una imagen local subida (lee solo la cabecera del JPG).
 * Sirve para decidir en la compilación cómo enseñarla (apaisada o vertical) sin
 * recortarla. Si no se puede leer, devuelve undefined.
 */
export function dimensiones(src?: string | null): { w: number; h: number } | undefined {
  if (!src || !src.startsWith('/')) return undefined;
  try {
    const fd = openSync(`public${src}`, 'r');
    const buf = Buffer.alloc(65536);
    const n = readSync(fd, buf, 0, buf.length, 0);
    closeSync(fd);
    if (buf[0] !== 0xff || buf[1] !== 0xd8) return undefined;
    let i = 2;
    while (i + 9 < n) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  } catch {
    /* sin dimensiones: se enseña como vertical */
  }
  return undefined;
}
