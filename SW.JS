const CACHE_NAME = "june-training-app-v1";

const ASSETS = [
  "/JUNE-/",
  "/JUNE-/index.html",
  "/JUNE-/manifest.json",
  "/JUNE-/6월 교육과정 앱 아이콘.png",
  "/JUNE-/6월 교육과정 썸네일.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});