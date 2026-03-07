/* ================================================================
   ENGLISH RHAPSODY — Firebase Analytics Manager
   Kullanici etkinliklerini Firebase Analytics ile takip eder
   ================================================================ */

class AnalyticsManager {
  constructor() {
    this._analytics = null;
  }

  init() {
    if (!window._firebaseConfigured) return;
    try {
      this._analytics = firebase.analytics();
      console.info('[Analytics] Initialized');
    } catch (e) {
      console.warn('[Analytics] Init error:', e);
    }
  }

  // ── Core ───────────────────────────────────────────────────

  _log(eventName, params = {}) {
    if (!this._analytics) return;
    try {
      this._analytics.logEvent(eventName, params);
    } catch (e) {
      console.warn('[Analytics] logEvent error:', eventName, e);
    }
  }

  setUser(uid) {
    if (!this._analytics) return;
    try { this._analytics.setUserId(uid); } catch {}
  }

  // ── Events ─────────────────────────────────────────────────

  lessonStart(mode) {
    this._log('lesson_start', { mode });
  }

  lessonComplete(mode, score) {
    this._log('lesson_complete', { mode, score });
  }

  xpGain(amount, source = 'unknown') {
    this._log('xp_gain', {
      amount,
      source,
      total_xp: window.app?.state?.get('xp') ?? 0,
    });
  }

  levelUp(newLevel) {
    this._log('level_up', { level: newLevel });
  }

  streakUpdate(streak) {
    this._log('streak_update', { streak });
  }

  speakingAttempt(score, accent = 'en-US') {
    this._log('speaking_attempt', { score, accent });
  }

  screenView(screenName) {
    this._log('screen_view', { screen_name: screenName });
  }

  achievementUnlocked(id) {
    this._log('achievement_unlocked', { achievement_id: id });
  }
}

window.analyticsManager = new AnalyticsManager();
