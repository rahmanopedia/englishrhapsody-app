/* ================================================================
   ENGLISH RHAPSODY — Firebase Yapilandirmasi
   ================================================================ */

const firebaseConfig = {
  apiKey:            "AIzaSyAF97SX_GlK7QMNhvhD5eFvS5a8FdApo_A",
  authDomain:        "englishrhapsody-78866.firebaseapp.com",
  projectId:         "englishrhapsody-78866",
  storageBucket:     "englishrhapsody-78866.firebasestorage.app",
  messagingSenderId: "94842633226",
  appId:             "1:94842633226:web:26f0f89fdf558b918eb3f3",
  measurementId:     "G-8NR909GK54",
};

window._firebaseConfigured = true;

/* ──────────────────────────────────────────────────────────────
   PLACEHOLDER ALANLARI — asagidaki degerleri Firebase Console'dan al

   App Check (reCAPTCHA v3):
     Firebase Console → App Check → Apps → Web → reCAPTCHA v3
     Google reCAPTCHA Admin → https://www.google.com/recaptcha/admin
     - Tip: reCAPTCHA v3   - Domain: deploy edilen domain
     index.html <head>'ine ekle:
       <script src="https://www.google.com/recaptcha/api.js?render=SITE_KEY"></script>

   VAPID Key (Web Push):
     Firebase Console → Project Settings → Cloud Messaging
     → Web Push certificates → Generate key pair
────────────────────────────────────────────────────────────── */

window._appCheckSiteKey = 'YOUR_RECAPTCHA_V3_SITE_KEY'; // App Check icin — placeholder ise devre disi
window._vapidKey        = 'YOUR_VAPID_PUBLIC_KEY_HERE';  // FCM Web Push icin — placeholder ise devre disi
