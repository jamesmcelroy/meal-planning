// Minimal service worker. Its only job is to make the site installable on
// iOS Home Screen; it deliberately does NOT cache Firestore data or app
// logic, so ratings/votes always reflect the live database rather than a
// stale offline copy.
const CACHE_NAME = "family-dinners-shell-v1";
const SHELL_FILES = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Network-first for everything so recipe/vote data is never stale.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
