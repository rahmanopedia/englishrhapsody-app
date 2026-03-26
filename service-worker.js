/* English Rhapsody — Service Worker | Network-First */
'use strict';


const CACHE_NAME  = 'er-v75';
const STATIC_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/styles.css',
  '/css/themes.css',
  '/css/revolution.css',
  '/css/nexus.css',
  '/css/phantom.css',
  '/css/dictionary.css',
  '/css/bridge.css',
  '/css/reading.css',
  '/css/cinema.css',
  '/css/speak-v2.css',
  '/css/speak-fill.css',
  '/css/writing.css',
  '/js/app.js',
  '/js/data.js',
  '/js/ex-tr-data.js',
  '/js/auth.js',
  '/js/storage.js',
  '/js/analytics.js',
  '/js/firebase-config.js',
  '/js/leaderboard.js',
  '/js/quick-menu.js',
  '/js/nexus.js',
  '/js/notification-settings.js',
  '/js/notifications.js',
  '/js/phantom.js',
  '/js/reading-engine.js',
  '/js/remote-config.js',
  '/js/splash.js',
  '/js/sw-register.js',
  '/js/cinema.js',
  '/js/video-data.js',
  '/js/phrases.js',
  '/js/speak-v2.js',
  '/js/speak-fill.js',
  '/js/conversations.js',
  '/js/bridge.js',
  /* boot.js intentionally excluded — always network-first */
  '/firebase-messaging-sw.js',
];

// Install: cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME && k !== 'pwa-meta-v1').map(k => caches.delete(k))))
    ).then(() => self.clients.claim())
  );
});

// Cache validation helper
function shouldCache(response, url) {
  if (!response || response.status !== 200) return false;
  if (response.type !== 'basic') return false;
  const ct = response.headers.get('content-type') || '';
  if (url.endsWith('.js') && !ct.includes('javascript') && !ct.includes('text/')) return false;
  if (url.endsWith('.css') && !ct.includes('css') && !ct.includes('text/')) return false;
  if (url.endsWith('.html') && !ct.includes('html')) return false;
  return true;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) return;

  const url = event.request.url;
  const isHTML  = url.includes('.html') || url.endsWith('/');
  const isAsset = url.includes('.js') || url.includes('.css') || url.includes('.png') || url.includes('.woff');

  if (isHTML) {
    // HTML — network-first: her zaman güncel göster
    event.respondWith(
      fetch(new Request(event.request, { cache: 'no-cache' }))
        .then(response => {
          if (shouldCache(response, url)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(c => c || caches.match('/index.html')))
    );
  } else if (isAsset) {
    // boot.js — her zaman network-first (kritik PWA mantığı içeriyor)
    const isBootJs = url.includes('/js/boot.js');
    if (isBootJs) {
      event.respondWith(
        fetch(new Request(event.request, { cache: 'no-cache' })).then(response => {
          if (shouldCache(response, url)) {
            caches.open(CACHE_NAME).then(c => c.put(event.request, response.clone()));
          }
          return response;
        }).catch(() => caches.match(event.request))
      );
      return;
    }

    // JS/CSS/images — network-first + HTTP cache bypass:
    // cache:'no-cache' → tarayıcı HTTP cache'ini atlayıp sunucuya gider,
    // ETag/If-Modified-Since ile 304 fast-path veya yeni içerik döner.
    event.respondWith(
      fetch(new Request(event.request, { cache: 'no-cache' })).then(response => {
        if (shouldCache(response, url)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
  } else {
    // Diğer (Firebase, API) — network-first
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
