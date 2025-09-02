// Lightweight service worker for SPA + static assets.
// IMPORTANT: do NOT try to cache Range (206) responses (video/audio streaming).

const CACHE = "aranka-cache-v3";

// Precache critical shell only (keep tiny).
const PRECACHE = ["/", "/index.html", "/manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== "GET") return;

  // Normalize any accidental '/build/' paths to root
  if (url.pathname.startsWith("/build/")) {
    const fixed = new URL(url.pathname.replace(/^\/build\//, "/"), url.origin);
    e.respondWith(fetch(fixed.href, { cache: "no-store" }));
    return;
  }

  // Bypass caching for range/media requests (videos/audio use 206 partial content)
  const isRange = req.headers.has("range");
  const pathname = url.pathname.toLowerCase();
  const isMedia =
    /\.(mp4|webm|mov|m4v|mp3|wav|ogg)$/.test(pathname);

  if (isRange || isMedia) {
    e.respondWith(fetch(req, { cache: "no-store" }));
    return;
  }

  // Network-first with cache fallback for other GETs (HTML/CSS/JS/images)
  e.respondWith(
    (async () => {
      try {
        const resp = await fetch(req);
        // Cache only successful full responses (not opaque, not partial)
        if (resp && resp.status === 200 && !isRange) {
          try {
            const cache = await caches.open(CACHE);
            cache.put(req, resp.clone());
          } catch {}
        }
        return resp;
      } catch (err) {
        const cache = await caches.open(CACHE);
        const cached = await cache.match(req);
        if (cached) return cached;
        throw err;
      }
    })()
  );
});
