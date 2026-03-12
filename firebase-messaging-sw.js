/* ================================================================
   ENGLISH RHAPSODY — Firebase Messaging Service Worker
   Background push notification handler
   Location: project root (same directory as index.html)
   ================================================================ */

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            'AIzaSyAF97SX_GlK7QMNhvhD5eFvS5a8FdApo_A',
  authDomain:        'englishrhapsody-78866.firebaseapp.com',
  projectId:         'englishrhapsody-78866',
  storageBucket:     'englishrhapsody-78866.firebasestorage.app',
  messagingSenderId: '94842633226',
  appId:             '1:94842633226:web:26f0f89fdf558b918eb3f3',
});

const messaging = firebase.messaging();

// Handle background messages (app closed or in background)
messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || payload.data?.title || 'English Rhapsody';
  const body  = payload.notification?.body  || payload.data?.body  || '';
  const url   = payload.data?.url || '/';

  self.registration.showNotification(title, {
    body,
    icon:    '/icons/icon-192.png',
    badge:   '/icons/icon-72.png',
    vibrate: [200, 100, 200],
    data:    Object.assign({ url }, payload.data || {}),
    actions: [
      { action: 'open',    title: 'Uygulamay\u0131 A\u00E7' },
      { action: 'dismiss', title: 'Kapat' },
    ],
  });
});

// Handle notification click
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'dismiss') return;

  const url = e.notification.data?.url || '/';

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      // Focus existing tab if open
      const existing = list.find(c => c.url.startsWith(self.location.origin));
      if (existing) {
        existing.focus();
        if (url !== '/') existing.navigate(url);
        return;
      }
      return clients.openWindow(url);
    })
  );
});
