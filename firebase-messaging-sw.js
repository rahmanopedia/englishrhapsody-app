/* ================================================================
   ENGLISH RHAPSODY — Firebase Messaging Service Worker
   Arka plan push notification handler
   Dosya konumu: proje koku (index.html ile ayni dizin)
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

// Uygulama kapali/arka plandayken gelen bildirimler
messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || payload.data?.title || 'English Rhapsody';
  const body  = payload.notification?.body  || payload.data?.body  || '';

  self.registration.showNotification(title, {
    body,
    icon:    '/icons/icon-192.png',
    badge:   '/icons/icon-72.png',
    vibrate: [200, 100, 200],
    data:    payload.data || {},
    actions: [
      { action: 'open',    title: 'Uygulamayi Ac' },
      { action: 'dismiss', title: 'Kapat' },
    ],
  });
});

// Bildirime tiklama
self.addEventListener('notificationclick', e => {
  e.notification.close();
  if (e.action === 'dismiss') return;
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length) return list[0].focus();
      return clients.openWindow('/');
    })
  );
});
