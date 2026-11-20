// API de «Día de partido»: guarda personas, departamentos, partidos y tareas
// en Netlify Blobs (una entrada por documento: "coleccion/id").
// Los datos NO van en el repositorio: se cargan desde la propia web.
//
// Claves (variables de entorno del proyecto en Netlify):
//   CLAVE_EQUIPO   → permite VER todo (la que se comparte con el equipo)
//   CLAVE_EDICION  → permite ver y CAMBIAR (solo quien organiza)
import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";

const COLECCIONES = ["personas", "departamentos", "partidos", "tareas"] as const;
type Col = (typeof COLECCIONES)[number];
const ID_OK = /^[A-Za-z0-9_-]{1,80}$/;

const almacen = () => getStore({ name: "dia-de-partido", consistency: "strong" });

function rol(req: Request): "editor" | "lector" | null {
  const clave = req.headers.get("x-clave") || "";
  const edicion = Netlify.env.get("CLAVE_EDICION");
  const equipo = Netlify.env.get("CLAVE_EQUIPO");
  if (edicion && clave === edicion) return "editor";
  if (equipo && clave === equipo) return "lector";
  return null;
}

async function leerTodo() {
  const s = almacen();
  const res: Record<string, unknown[]> = {};
  for (const col of COLECCIONES) {
    const { blobs } = await s.list({ prefix: `${col}/` });
    const docs = await Promise.all(
      blobs.map(async (b) => {
        const d = await s.get(b.key, { type: "json" });
        return d ? { ...d, id: b.key.slice(col.length + 1) } : null;
      }),
    );
    res[col] = docs.filter(Boolean);
  }
  return res;
}

type Escritura = { op: "set" | "update" | "delete"; col: string; id: string; data?: Record<string, unknown> };

async function aplicar(w: Escritura) {
  if (!COLECCIONES.includes(w.col as Col) || !ID_OK.test(w.id)) throw new Error("ruta no válida");
  const s = almacen();
  const key = `${w.col}/${w.id}`;
  if (w.op === "delete") return s.delete(key);
  if (!w.data || typeof w.data !== "object" || Array.isArray(w.data)) throw new Error("datos no válidos");
  const { id: _ignorado, ...data } = w.data as Record<string, unknown>;
  if (w.op === "set") return s.setJSON(key, data);
  if (w.op === "update") {
    const actual = (await s.get(key, { type: "json" })) || {};
    return s.setJSON(key, { ...actual, ...data });
  }
  throw new Error("operación no válida");
}

export default async (req: Request, _context: Context) => {
  const quien = rol(req);
  if (!quien) return Response.json({ error: "clave" }, { status: 401 });
  const ruta = new URL(req.url).pathname;

  try {
    if (req.method === "GET" && ruta === "/api/datos") {
      const datos = await leerTodo();
      return Response.json({ rol: quien, ...datos }, { headers: { "cache-control": "no-store" } });
    }
    if (req.method === "POST" && ruta === "/api/escribir") {
      if (quien !== "editor") return Response.json({ error: "solo-lectura" }, { status: 403 });
      const cuerpo = await req.json();
      const lista: Escritura[] = Array.isArray(cuerpo?.escrituras) ? cuerpo.escrituras : [];
      if (!lista.length || lista.length > 200) return Response.json({ error: "vacío" }, { status: 400 });
      for (const w of lista) await aplicar(w);
      return Response.json({ ok: true });
    }
    return Response.json({ error: "no encontrado" }, { status: 404 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: String((e as Error).message || e) }, { status: 400 });
  }
};

export const config: Config = { path: ["/api/datos", "/api/escribir"] };
