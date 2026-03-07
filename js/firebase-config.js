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
  apiKey:            "BURAYA_API_KEY",
  authDomain:        "BURAYA_AUTH_DOMAIN",
  projectId:         "BURAYA_PROJECT_ID",
  storageBucket:     "BURAYA_STORAGE_BUCKET",
  messagingSenderId: "BURAYA_MESSAGING_SENDER_ID",
  appId:             "BURAYA_APP_ID",
};

// Config doldurmadan önce placeholder kontrolü
window._firebaseConfigured = !firebaseConfig.apiKey.includes('BURAYA');
