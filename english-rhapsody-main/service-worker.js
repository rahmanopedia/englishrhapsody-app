const CACHE_NAME = 'english-rhapsody-v3';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './js/data.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use catch to prevent install failure on slow/blocked assets
      return cache.addAll(ASSETS).catch(err => console.log('Asset cache failed', err));
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Cache strategy: Cache-first for images, Network-falling-back-to-cache for scripts
  if (url.hostname === 'images.unsplash.com') {
    event.respondWith(
      caches.open('unsplash-images').then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
