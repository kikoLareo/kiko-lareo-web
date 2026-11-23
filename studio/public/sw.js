// Service worker de Kiko Studio: abre la app sin conexión y rápido.
// Los datos (/api) van siempre a la red: nunca se sirven desde caché.
const VERSION = "ks-v1";
const BASE = ["/", "/index.html", "/manifest.webmanifest", "/icono-192.png", "/icono-512.png", "/apple-touch-icon.png", "/favicon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin && url.pathname.startsWith("/api/")) return;
  // La página: primero la red (para coger actualizaciones), si no hay, la copia guardada.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then((r) => { const c = r.clone(); caches.open(VERSION).then((x) => x.put("/index.html", c)); return r; })
      .catch(() => caches.match("/index.html")));
    return;
  }
  // Tipografías y archivos propios: la copia guardada y se refresca por detrás.
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(VERSION).then(async (c) => {
      const guardado = await c.match(req);
      const red = fetch(req).then((r) => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => guardado);
      return guardado || red;
    }));
  }
});
