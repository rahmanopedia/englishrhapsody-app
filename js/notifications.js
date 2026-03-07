/* ================================================================
   ENGLISH RHAPSODY — Firebase Cloud Messaging Manager
   Push notification ve on plan mesaj yonetimi

   KURULUM:
   1. Firebase Console → Project Settings → Cloud Messaging
   2. "Web Push certificates" → "Generate key pair"
   3. Olusturulan VAPID public key'i asagidaki VAPID_KEY'e yaz
   4. firebase-messaging-sw.js proje kokunde olmali (index.html ile ayni dizin)
   ================================================================ */

const VAPID_KEY = 'YOUR_VAPID_PUBLIC_KEY_HERE'; // Firebase Console'dan al

class NotificationsManager {
  constructor() {
    this._messaging  = null;
    this._token      = null;
    this._supported  = typeof Notification !== 'undefined'
                    && 'serviceWorker' in navigator
                    && 'PushManager' in window;
  }

  // ── Init ───────────────────────────────────────────────────

  async init() {
    if (!window._firebaseConfigured || !this._supported) return;
    try {
      this._messaging = firebase.messaging();
      // On planda gelen mesajlari toast ile goster
      this._messaging.onMessage(payload => this._handleForeground(payload));
      console.info('[Notifications] Initialized');
    } catch (e) {
      console.warn('[Notifications] Init error:', e);
    }
  }

  // ── Permission & Token ─────────────────────────────────────

  /**
   * Bildirim izni iste ve FCM token'i Firestore'a kaydet
   * Login sonrasi kullanici kabul ederse cagrilabilir
   * @returns {Promise<boolean>}
   */
  async requestPermission() {
    if (!this._messaging || !this._supported) return false;
    if (VAPID_KEY === 'YOUR_VAPID_PUBLIC_KEY_HERE') {
      console.warn('[Notifications] VAPID_KEY ayarlanmamis. notifications.js dosyasini guncelle.');
      return false;
    }
    try {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') return false;
      this._token = await this._messaging.getToken({ vapidKey: VAPID_KEY });
      if (this._token) await this._saveToken(this._token);
      console.info('[Notifications] Token alindi');
      return true;
    } catch (e) {
      console.warn('[Notifications] Permission error:', e);
      return false;
    }
  }

  async _saveToken(token) {
    const db  = window.authManager?._db;
    const uid = window.authManager?.uid;
    if (!db || !uid) return;
    try {
      await db.doc(`users/${uid}/meta/fcm`).set({
        token,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        platform:  'web',
      });
    } catch (e) {
      console.warn('[Notifications] Token kayit hatasi:', e);
    }
  }

  // ── Local Uyarilar ─────────────────────────────────────────

  /** Login sonrasi streak ve gunluk hedef kontrolu yap */
  runDailyChecks() {
    if (!window.app) return;
    this._checkStreakWarning();
    this._checkDailyGoal();
  }

  _checkStreakWarning() {
    const streak     = window.app.state?.get('streak') || 0;
    const lastActive = window.app.state?.get('lastActive') || '';
    if (!streak || !lastActive) return;

    const yesterday = new Date(Date.now() - 86_400_000).toDateString();
    if (lastActive === yesterday) {
      // Bugun calisilmamis, streak risk altinda
      setTimeout(() => {
        if (typeof UI !== 'undefined') {
          UI.toast(`Streakini korumak icin bugun calis! Serin risk altinda: ${streak} gun`, 8000);
        }
      }, 5000);
    }
  }

  _checkDailyGoal() {
    const goal     = window.remoteConfigManager?.dailyXPGoal ?? 100;
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
    if (typeof UI !== 'undefined') {
      UI.toast(`${title}${body ? ': ' + body : ''}`, 7000);
    }
  }
}

window.notificationsManager = new NotificationsManager();
