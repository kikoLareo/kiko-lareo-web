// API privada de Kiko Studio.
// Guarda los datos en Netlify Blobs (una entrada por colección) y solo
// responde si la petición trae una sesión firmada con la clave KS_CLAVE,
// que vive en las variables de entorno de Netlify (nunca en el código).
import { getStore } from "@netlify/blobs";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const COLS = ["clientes", "trabajos", "tareas", "eventos", "facturas", "cobros", "bandeja", "ajustes"];
const ID_OK = /^[A-Za-z0-9_-]{1,80}$/;
const UN_ANIO = 365 * 24 * 60 * 60 * 1000;

const store = () => getStore({ name: "kiko-studio", consistency: "strong" });
const json = (datos, status = 200) =>
  Response.json(datos, { status, headers: { "cache-control": "no-store", "x-robots-tag": "noindex" } });

const clave = () => Netlify.env.get("KS_CLAVE") || "";
const llave = () => createHash("sha256").update("kiko-studio|" + clave()).digest();
const firmar = (exp) => createHmac("sha256", llave()).update(String(exp)).digest("base64url");
const nuevoToken = () => { const exp = Date.now() + UN_ANIO; return exp + "." + firmar(exp); };
const resumen = (s) => createHash("sha256").update(String(s)).digest();

function sesionValida(req) {
  const t = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!t || !clave()) return false;
  const [exp, firma] = t.split(".");
  if (!exp || !firma || !(+exp > Date.now())) return false;
  const a = Buffer.from(firma), b = Buffer.from(firmar(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}

async function leerTodo(s) {
  const out = {};
  await Promise.all(COLS.map(async (c) => { out[c] = (await s.get(c, { type: "json" })) || {}; }));
  return out;
}

// Una copia completa al día, antes del primer cambio. Nunca se borran solas.
async function copiaDelDia(s) {
  const clave = "copias/" + new Date().toISOString().slice(0, 10);
  if (await s.getMetadata(clave)) return;
  await s.setJSON(clave, await leerTodo(s));
}

export default async (req) => {
  const ruta = new URL(req.url).pathname.replace(/^\/api\/?/, "");

  if (ruta === "login" && req.method === "POST") {
    if (!clave()) return json({ error: "sin_clave" }, 503);
    let cuerpo = {};
    try { cuerpo = await req.json(); } catch { return json({ error: "peticion" }, 400); }
    await new Promise((r) => setTimeout(r, 500)); // frena los intentos a lo bruto
    if (!timingSafeEqual(resumen(cuerpo.clave || ""), resumen(clave()))) return json({ error: "clave" }, 401);
    return json({ token: nuevoToken() });
  }

  if (!sesionValida(req)) return json({ error: "sesion" }, 401);
  const s = store();

  if (ruta === "datos" && req.method === "GET") return json(await leerTodo(s));

  if (ruta === "lote" && req.method === "POST") {
    let cuerpo;
    try { cuerpo = await req.json(); } catch { return json({ error: "peticion" }, 400); }
    const ops = Array.isArray(cuerpo.ops) ? cuerpo.ops : [];
    if (!ops.length) return json({ ok: true });
    if (ops.length > 1000) return json({ error: "demasiadas" }, 400);
    const porCol = {};
    for (const o of ops) {
      if (!o || !COLS.includes(o.col) || typeof o.id !== "string" || !ID_OK.test(o.id)) return json({ error: "op" }, 400);
      if (o.data !== null && (typeof o.data !== "object" || Array.isArray(o.data))) return json({ error: "op" }, 400);
      (porCol[o.col] ||= []).push(o);
    }
    await copiaDelDia(s);
    for (const [col, lista] of Object.entries(porCol)) {
      const mapa = (await s.get(col, { type: "json" })) || {};
      for (const o of lista) { if (o.data === null) delete mapa[o.id]; else mapa[o.id] = o.data; }
      await s.setJSON(col, mapa);
    }
    return json({ ok: true });
  }

  if (ruta === "copia" && req.method === "POST") {
    let cuerpo;
    try { cuerpo = await req.json(); } catch { return json({ error: "peticion" }, 400); }
    await copiaDelDia(s);
    let n = 0;
    for (const col of COLS) {
      const nuevos = cuerpo[col];
      if (!nuevos || typeof nuevos !== "object" || Array.isArray(nuevos)) continue;
      const mapa = (await s.get(col, { type: "json" })) || {};
      for (const [id, doc] of Object.entries(nuevos)) {
        if (ID_OK.test(id) && doc && typeof doc === "object" && !Array.isArray(doc)) { mapa[id] = doc; n++; }
      }
      await s.setJSON(col, mapa);
    }
    return json({ ok: true, registros: n });
  }

  return json({ error: "no_existe" }, 404);
};

export const config = { path: "/api/*" };
