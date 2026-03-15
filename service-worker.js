/* English Rhapsody — Service Worker | Cache-first strategy */
'use strict';

const CACHE_NAME  = 'er-v9';
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
  '/js/app.js',
  '/js/data.js',
  '/js/auth.js',
  '/js/storage.js',
  '/js/analytics.js',
  '/js/bridge-data.js',
  '/js/bridge.js',
  '/js/conversations.js',
  '/js/firebase-config.js',
  '/js/leaderboard.js',
  '/js/nexus.js',
  '/js/notification-settings.js',
  '/js/notifications.js',
  '/js/phantom.js',
  '/js/phrasal_verbs_ext.js',
  '/js/phrasal_verbs_ext2.js',
  '/js/quantum.js',
  '/js/reading-engine.js',
  '/js/remote-config.js',
  '/js/splash.js',
  '/js/stories-data.js',
  '/js/sw-register.js',
  '/firebase-messaging-sw.js',
];

// Install: cache static assets
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
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache validation helper — checks status, type, and content-type header
function shouldCache(response, url) {
  if (!response || response.status !== 200) return false;
  if (response.type !== 'basic') return false;
  const ct = response.headers.get('content-type') || '';
  if (url.endsWith('.js') && !ct.includes('javascript') && !ct.includes('text/')) return false;
  if (url.endsWith('.css') && !ct.includes('css') && !ct.includes('text/')) return false;
  if (url.endsWith('.html') && !ct.includes('html')) return false;
  return true;
}

// Fetch: HTML/JS/CSS → network-first (her zaman güncel), diğerleri → cache-first
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension')) return;

  const url = event.request.url;
  const isCore = url.includes('.html') || url.includes('.js') || url.includes('.css');

  if (isCore) {
    // Network-first: önce ağdan al, başarısız olursa cache'den sun
    event.respondWith(
      fetch(event.request).then(response => {
        if (shouldCache(response, url)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request).then(c => c || caches.match('/index.html')))
    );
  } else {
    // Cache-first: resim, font vb.
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (shouldCache(response, url)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
  }
});
