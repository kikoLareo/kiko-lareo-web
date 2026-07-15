#!/usr/bin/env node
/**
 * Volcado de fotos por lotes.
 *
 * Uso (desde la carpeta web/):
 *   npm run fotos -- <categoria> <carpeta-con-fotos> [fecha]
 *
 * Ejemplos:
 *   npm run fotos -- deportes ~/Desktop/copa-galicia
 *   npm run fotos -- eventos ~/Fotos/festival 2026-08-01
 *
 * Copia todas las imágenes de la carpeta a public/img/uploads/ y crea una
 * entrada de contenido por foto (título tomado del nombre del archivo,
 * editable después desde el panel /admin). Luego solo queda:
 *   git add -A && git commit -m "Fotos <evento>" && git push
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CATEGORIAS = ['deportes', 'eventos', 'moda', 'comida'];
const EXTENSIONES = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [categoria, carpeta, fechaArg] = process.argv.slice(2);

function fallo(msg) {
  console.error(`\n✗ ${msg}\n`);
  console.error('Uso: npm run fotos -- <categoria> <carpeta-con-fotos> [fecha AAAA-MM-DD]');
  console.error(`Categorías: ${CATEGORIAS.join(', ')}\n`);
  process.exit(1);
}

if (!categoria || !CATEGORIAS.includes(categoria)) fallo(`Categoría no válida: "${categoria ?? ''}"`);
if (!carpeta || !fs.existsSync(carpeta) || !fs.statSync(carpeta).isDirectory()) {
  fallo(`No encuentro la carpeta: "${carpeta ?? ''}"`);
}
const fecha = fechaArg ?? new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) fallo(`Fecha no válida: "${fechaArg}" (formato AAAA-MM-DD)`);

const dirUploads = path.join(raiz, 'public', 'img', 'uploads');
const dirFotos = path.join(raiz, 'src', 'content', 'fotos');
fs.mkdirSync(dirUploads, { recursive: true });
fs.mkdirSync(dirFotos, { recursive: true });

// nombre de archivo → slug apto para URL y título legible
const slugify = (s) =>
  s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'foto';

const humanizar = (s) => {
  const limpio = s.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return limpio ? limpio[0].toUpperCase() + limpio.slice(1) : 'Foto';
};

// evita pisar archivos ya existentes añadiendo -2, -3…
function rutaLibre(dir, base, ext) {
  let nombre = `${base}${ext}`;
  let n = 2;
  while (fs.existsSync(path.join(dir, nombre))) nombre = `${base}-${n++}${ext}`;
  return nombre;
}

const archivos = fs.readdirSync(carpeta)
  .filter((f) => EXTENSIONES.includes(path.extname(f).toLowerCase()))
  .sort();

if (!archivos.length) fallo(`No hay imágenes (${EXTENSIONES.join(' ')}) en ${carpeta}`);

console.log(`\nVolcando ${archivos.length} foto(s) → categoría "${categoria}", fecha ${fecha}\n`);

for (const archivo of archivos) {
  const ext = path.extname(archivo).toLowerCase();
  const base = slugify(path.basename(archivo, ext));

  const nombreImagen = rutaLibre(dirUploads, base, ext);
  fs.copyFileSync(path.join(carpeta, archivo), path.join(dirUploads, nombreImagen));

  const nombreEntrada = rutaLibre(dirFotos, `${fecha}-${path.basename(nombreImagen, ext)}`, '.md');
  const titulo = humanizar(path.basename(archivo, ext)).replace(/"/g, "'");
  fs.writeFileSync(
    path.join(dirFotos, nombreEntrada),
    `---\ntitulo: "${titulo}"\ncategoria: ${categoria}\nfecha: ${fecha}\nimagen: /img/uploads/${nombreImagen}\n---\n`
  );
  console.log(`  ✓ ${archivo} → ${nombreEntrada}`);
}

console.log(`\nListo. Para publicarlas:\n  git add -A && git commit -m "Fotos ${categoria} ${fecha}" && git push\n`);
console.log('Títulos, textos alternativos e historias se pueden retocar después en /admin (colección Fotos).\n');
