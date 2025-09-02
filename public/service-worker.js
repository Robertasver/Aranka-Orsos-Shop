const CACHE = "aranka-cache-v2";
const ASSETS = [
  "/",
  "/leaf-bg.png",
  "/og-default.jpg",
  "/manifest.webmanifest"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map(k => k !== CACHE ? caches.delete(k) : null)))
  );
  self.clients.claim();
});
self.addEventListener("fetch", (e) => {
  // Normalize any accidental '/build/' paths to root
  /* BUILD PATH REWRITE */
  const reqUrl = new URL(e.request.url);
  if (reqUrl.pathname.startsWith('/build/')) {
    const fixed = new URL(reqUrl.pathname.replace(/^\/build\//, '/'), reqUrl.origin);
    e.respondWith(fetch(fixed.href, { cache: 'no-store' }));
    return;
  }

  const url = new URL(e.request.url);
  if (url.pathname.startsWith("/begravelse") || url.pathname.startsWith("/bestselger") ||
      url.pathname.startsWith("/bryllups-buketter") || url.pathname.startsWith("/bursdags-buketter") ||
      url.pathname.startsWith("/dekorasjoner") || url.pathname.startsWith("/rosebuketter")) {
    // Cache images/videos after first view
    e.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const cached = await cache.match(e.request);
        if (cached) return cached;
        const res = await fetch(e.request);
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      })
    );
    return;
  }
  // App shell: network-first fallback to cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
