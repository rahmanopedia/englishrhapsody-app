/* ================================================================
   ENGLISH RHAPSODY — Notification Manager
   FCM Web Push + client-side smart reminder system
   ================================================================ */

class NotificationsManager {
  constructor() {
    this._messaging = null;
    this._token     = null;
    this._supported = typeof Notification !== 'undefined'
                   && 'serviceWorker' in navigator
                   && 'PushManager'   in window;

    this._defaultPrefs = {
      enabled:          true,
      dailyReminder:    true,
      streakReminder:   true,
      xpReminder:       true,
      speakingReminder: true,
    };
  }

  // ── Init ───────────────────────────────────────────────────

  async init() {
    if (!window._firebaseConfigured || !this._supported) return;
    try {
      this._messaging = firebase.messaging();
      this._messaging.onMessage(payload => this._handleForeground(payload));
      console.info('[Notifications] Initialized');
    } catch (e) {
      console.warn('[Notifications] Init error:', e.message);
      this._messaging = null;
    }
  }

  // ── Permission & Token ─────────────────────────────────────

  async requestPermission() {
    if (!this._messaging || !this._supported) return false;

    if (window.remoteFlags?.feature_notifications === false) {
      console.info('[Notifications] Disabled by Remote Config');
      return false;
    }

    const vapidKey = window._vapidKey;
    if (!vapidKey || vapidKey === 'YOUR_VAPID_PUBLIC_KEY_HERE') {
      console.warn('[Notifications] VAPID key missing');
      return false;
    }

    let swReg;
    try {
      swReg = await navigator.serviceWorker.getRegistration('/');
      if (!swReg) {
        swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      }
    } catch (e) {
      console.warn('[Notifications] SW registration error:', e.message);
      return false;
    }

    try {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') {
        console.info('[Notifications] Permission denied:', perm);
        return false;
      }
      this._token = await this._messaging.getToken({
        vapidKey,
        serviceWorkerRegistration: swReg,
      });
      if (this._token) {
        await this._saveToken(this._token);
        await this._ensurePrefs();
        console.info('[Notifications] Token saved');
        return true;
      }
      return false;
    } catch (e) {
      console.warn('[Notifications] Token error:', e.message);
      return false;
    }
  }

  async _saveToken(token) {
    const db  = window.authManager?._db;
    const uid = window.authManager?.uid;
    if (!db || !uid) return;
    try {
      await db.doc(`users/${uid}/meta/profile`).set(
        {
          fcmToken:     token,
          fcmUpdatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          fcmPlatform:  'web',
        },
        { merge: true }
      );
    } catch (e) {
      console.warn('[Notifications] Token save error:', e.message);
    }
  }

  // ── Notification Preferences ───────────────────────────────

  async _ensurePrefs() {
    const db  = window.authManager?._db;
    const uid = window.authManager?.uid;
    if (!db || !uid) return;
    try {
      const snap = await db.doc(`users/${uid}/meta/profile`).get();
      if (!snap.exists || !snap.data().notificationPrefs) {
        await db.doc(`users/${uid}/meta/profile`).set(
          { notificationPrefs: this._defaultPrefs },
          { merge: true }
        );
      }
    } catch (e) {
      console.warn('[Notifications] Prefs init error:', e.message);
    }
  }

  async saveNotificationPrefs(prefs) {
    const db  = window.authManager?._db;
    const uid = window.authManager?.uid;
    if (!db || !uid) return;
    try {
      const merged = Object.assign({}, this._defaultPrefs, prefs);
      await db.doc(`users/${uid}/meta/profile`).set(
        { notificationPrefs: merged },
        { merge: true }
      );
      console.info('[Notifications] Prefs saved');
    } catch (e) {
      console.warn('[Notifications] Prefs save error:', e.message);
    }
  }

  async getNotificationPrefs() {
    const db  = window.authManager?._db;
    const uid = window.authManager?.uid;
    if (!db || !uid) return Object.assign({}, this._defaultPrefs);
    try {
      const snap = await db.doc(`users/${uid}/meta/profile`).get();
      if (snap.exists && snap.data().notificationPrefs) {
        return Object.assign({}, this._defaultPrefs, snap.data().notificationPrefs);
      }
      return Object.assign({}, this._defaultPrefs);
    } catch (e) {
      return Object.assign({}, this._defaultPrefs);
    }
  }

  // ── User Eligibility Data ──────────────────────────────────

  /**
   * Updates Firestore with current user activity state.
   * Cloud Functions use these fields for scheduling decisions.
   * Called on login and after each study session.
   */
  async updateUserData() {
    const db  = window.authManager?._db;
    const uid = window.authManager?.uid;
    if (!db || !uid || !window.app) return;
    try {
      const todayKey   = new Date().toISOString().split('T')[0];
      const history    = window.app.state?.get('history') || {};
      const xpToday    = history[todayKey] || 0;
      const streak     = window.app.state?.get('streak')     || 0;
      const lastActive = window.app.state?.get('lastActive') || '';

      await db.doc(`users/${uid}/meta/profile`).set(
        {
          lastActive,
          streak,
          xpToday,
          xpGoal:    window.remoteFlags?.dailyXPGoal ?? 100,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    } catch (e) {
      console.warn('[Notifications] updateUserData error:', e.message);
    }
  }

  /**
   * Call this after user completes a speaking session.
   * Updates lastSpeakingAt so Cloud Function can schedule speaking reminders.
   */
  async onSpeakingComplete() {
    const db  = window.authManager?._db;
    const uid = window.authManager?.uid;
    if (!db || !uid) return;
    try {
      await db.doc(`users/${uid}/meta/profile`).set(
        { lastSpeakingAt: firebase.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );
      localStorage.setItem('er_last_speaking', String(Date.now()));
    } catch (e) {
      console.warn('[Notifications] onSpeakingComplete error:', e.message);
    }
  }

  // ── Client-Side Smart Reminders ────────────────────────────

  /**
   * Called after login. Updates Firestore eligibility data and
   * shows in-app reminders. Real push notifications are sent
   * by the Cloud Function (functions/index.js) on a schedule.
   */
  runDailyChecks() {
    if (!window.app) return;
    if (window.remoteFlags?.feature_notifications === false) return;

    this.updateUserData();

    this._checkStreakWarning();
    this._checkDailyGoal();
    this._checkSpeakingReminder();
    this._checkSRSDue();
  }

  _checkStreakWarning() {
    if (window.remoteFlags?.streak_warning_enabled === false) return;
    const streak     = window.app.state?.get('streak')     || 0;
    const lastActive = window.app.state?.get('lastActive') || '';
    if (!streak || !lastActive) return;

    const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
    if (lastActive === yesterday) {
      setTimeout(() => {
        if (typeof UI !== 'undefined') {
          UI.toast(`\uD83D\uDD25 ${streak} \u0261\u00FCnl\u00FCk serin risk alt\u0131nda! Bug\u00FCn \u00E7al\u0131\u015Fmay\u0131 unutma.`, 8000);
        }
      }, 5000);
    }
  }

  _checkDailyGoal() {
    if (window.remoteFlags?.xp_reminder_enabled === false) return;
    const goal     = window.remoteFlags?.dailyXPGoal ?? 100;
    const hist     = window.app.state?.get('history') || {};
    const todayKey = new Date().toISOString().split('T')[0];
    const todayXP  = hist[todayKey] || 0;
    if (todayXP === 0) {
      setTimeout(() => {
        if (typeof UI !== 'undefined') {
          UI.toast(`\u26A1 Bug\u00FCnk\u00FC hedefin: ${goal} XP. Hadi ba\u015Fla!`, 6000);
        }
      }, 10000);
    }
  }

  _checkSpeakingReminder() {
    const inactiveDays = window.remoteFlags?.speaking_inactive_days ?? 3;
    const lastSpeaking = Number(localStorage.getItem('er_last_speaking') || 0);
    const inactiveMs   = inactiveDays * 86_400_000;
    if (lastSpeaking && Date.now() - lastSpeaking < inactiveMs) return;

    setTimeout(() => {
      if (typeof UI !== 'undefined') {
        UI.toast('\uD83C\uDFA4 Bug\u00FCn konu\u015Fma pratiği yapal\u0131m!', 5000);
      }
    }, 15000);
  }

  _checkSRSDue() {
    if (!window.app || !window.WORDS || !window.SRS) return;
    const mastery = window.app.state?.get('mastery') || {};
    const due     = window.SRS.getDue(window.WORDS, mastery) || [];
    if (due.length >= 5) {
      setTimeout(() => {
        if (typeof UI !== 'undefined') {
          UI.toast(`📚 ${due.length} kelimen tekrar zamanı geldi! Sinestezi Lab'ı aç.`, 7000);
        }
      }, 8000);
    }
  }

  // ── Foreground Handler ─────────────────────────────────────

  _handleForeground(payload) {
    console.info('[Notifications] Foreground message:', payload);
    const title = payload.notification?.title || payload.data?.title || '';
    const body  = payload.notification?.body  || payload.data?.body  || '';
    if (title && typeof UI !== 'undefined') {
      UI.toast(`${title}${body ? ': ' + body : ''}`, 7000);
    }
  }
}

window.notificationsManager = new NotificationsManager();
