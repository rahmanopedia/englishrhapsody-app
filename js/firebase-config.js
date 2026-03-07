/* ================================================================
   ENGLISH RHAPSODY — Firebase Yapılandırması
   
   KURULUM:
   1. https://console.firebase.google.com adresine git
   2. Yeni proje oluştur (örn. "english-rhapsody")
   3. Authentication → Sign-in method → Email/Password → Etkinleştir
   4. Firestore Database → Create database → Production mode → Başlat
   5. Firestore → Rules sekmesi → şu kuralı yapıştır:
      
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /users/{userId}/{document=**} {
            allow read, write: if request.auth != null && request.auth.uid == userId;
          }
        }
      }
   
   6. Project Settings (⚙️) → Your apps → </> Web uygulaması ekle
   7. Aşağıdaki firebaseConfig nesnesini kendi bilgilerinle doldur
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
