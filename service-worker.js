// Basic service worker for offline-first app shell caching
const CACHE_NAME = 'asperia-billing-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  // icons
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-256.png',
  './icons/icon-384.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE_NAME ? caches.delete(k) : null)))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).catch(() => cached))
  );
});
