/* ================================================================
   ENGLISH RHAPSODY — Firebase Cloud Messaging Manager
   Push notification ve on plan mesaj yonetimi

   KURULUM:
   1. Firebase Console → Project Settings → Cloud Messaging
   2. "Web Push certificates" → "Generate key pair"
   3. Olusturulan VAPID public key'i firebase-config.js icinde
      window._vapidKey = '...' satirina yaz
   4. firebase-messaging-sw.js proje kokunde olmali
   ================================================================ */

class NotificationsManager {
  constructor() {
    this._messaging = null;
    this._token     = null;
    // Tarayici destegi kontrolu
    this._supported = typeof Notification !== 'undefined'
                   && 'serviceWorker' in navigator
                   && 'PushManager' in window;
  }

  // ── Init ───────────────────────────────────────────────────

  async init() {
    if (!window._firebaseConfigured || !this._supported) return;
    try {
      this._messaging = firebase.messaging();
      this._messaging.onMessage(payload => this._handleForeground(payload));
      console.info('[Notifications] Initialized');
    } catch (e) {
      // messaging() desteklenmeyen tarayicilarda (Safari <16 vb.) sessizce gecebilir
      console.warn('[Notifications] Init error:', e.message);
      this._messaging = null;
    }
  }

  // ── Permission & Token ─────────────────────────────────────

  /**
   * Bildirim izni iste, FCM token al ve Firestore'a kaydet.
   * Kullanici aksiyonuna (buton click vb.) baglanarak cagrilmali.
   * @returns {Promise<boolean>} basarili mi
   */
  async requestPermission() {
    if (!this._messaging || !this._supported) return false;

    // feature_notifications flag kontrolu
    if (window.remoteFlags && window.remoteFlags.feature_notifications === false) {
      console.info('[Notifications] feature_notifications disabled by Remote Config');
      return false;
    }

    // VAPID key kontrolu — placeholder ise skip et
    const vapidKey = window._vapidKey;
    if (!vapidKey || vapidKey === 'YOUR_VAPID_PUBLIC_KEY_HERE') {
      console.warn('[Notifications] VAPID key ayarlanmamis. firebase-config.js dosyasini guncelle.');
      return false;
    }

    // Service Worker kayitli mi kontrol et
    let swReg;
    try {
      swReg = await navigator.serviceWorker.getRegistration('/');
      if (!swReg) {
        swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      }
    } catch (e) {
      console.warn('[Notifications] Service Worker kayit hatasi:', e.message);
      return false;
    }

    try {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') {
        console.info('[Notifications] Izin verilmedi:', perm);
        return false;
      }
      this._token = await this._messaging.getToken({
        vapidKey,
        serviceWorkerRegistration: swReg,
      });
      if (this._token) {
        await this._saveToken(this._token);
        console.info('[Notifications] Token alindi ve kaydedildi');
        return true;
      }
      return false;
    } catch (e) {
      console.warn('[Notifications] Token hatasi:', e.message);
      return false;
    }
  }

  async _saveToken(token) {
    const db  = window.authManager?._db;
    const uid = window.authManager?.uid;
    if (!db || !uid) return;
    try {
      // profile doc'a merge ederek kaydet — mevcut alanlari silme
      await db.doc(`users/${uid}/meta/profile`).set(
        {
          fcmToken:       token,
          fcmUpdatedAt:   firebase.firestore.FieldValue.serverTimestamp(),
          fcmPlatform:    'web',
        },
        { merge: true }
      );
    } catch (e) {
      console.warn('[Notifications] Token Firestore kayit hatasi:', e.message);
    }
  }

  // ── Local Uyarilar ─────────────────────────────────────────

  /**
   * Login sonrasi cagrilir.
   * feature_notifications=false ise hicbir toast gostermez.
   */
  runDailyChecks() {
    if (!window.app) return;
    if (window.remoteFlags && window.remoteFlags.feature_notifications === false) return;
    this._checkStreakWarning();
    this._checkDailyGoal();
  }

  _checkStreakWarning() {
    const streak     = window.app.state?.get('streak') || 0;
    const lastActive = window.app.state?.get('lastActive') || '';
    if (!streak || !lastActive) return;

    const yesterday = new Date(Date.now() - 86_400_000).toDateString();
    if (lastActive === yesterday) {
      setTimeout(() => {
        if (typeof UI !== 'undefined') {
          UI.toast(`Streakini korumak icin bugun calis! ${streak} gunluk serin risk altinda.`, 8000);
        }
      }, 5000);
    }
  }

  _checkDailyGoal() {
    const goal     = window.remoteFlags?.dailyXPGoal ?? 100;
    const hist     = window.app.state?.get('history') || {};
    const todayKey = new Date().toISOString().split('T')[0];
    const todayXP  = hist[todayKey] || 0;
    if (todayXP === 0) {
      setTimeout(() => {
        if (typeof UI !== 'undefined') {
          UI.toast(`Bugun hedefin: ${goal} XP. Hadi basla!`, 6000);
        }
      }, 10000);
    }
  }

  // ── Foreground Handler ─────────────────────────────────────

  _handleForeground(payload) {
    const title = payload.notification?.title || payload.data?.title || '';
    const body  = payload.notification?.body  || payload.data?.body  || '';
    if (title && typeof UI !== 'undefined') {
      UI.toast(`${title}${body ? ': ' + body : ''}`, 7000);
    }
  }
}

window.notificationsManager = new NotificationsManager();
