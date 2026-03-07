/* ================================================================
   ENGLISH RHAPSODY — Firebase Remote Config Manager
   Uygulama ayarlarini Firebase console'dan uzaktan yonet

   KURULUM:
   Firebase Console → Remote Config → Asagidaki key'leri ekle:
     dailyXPGoal         (Number)  ornek: 100
     maxStreakBonus      (Number)  ornek: 50
     speakingDifficulty  (String)  ornek: "medium"
     featureFlags        (JSON)    ornek: {"nexusMode":true,"readingLab":true}
   ================================================================ */

class RemoteConfigManager {
  constructor() {
    this._rc = null;
    this._defaults = {
      dailyXPGoal:        100,
      maxStreakBonus:     50,
      speakingDifficulty: 'medium',
      featureFlags: JSON.stringify({
        nexusMode:   true,
        readingLab:  true,
        speakingLab: true,
      }),
    };
  }

  async init() {
    if (!window._firebaseConfigured) return;
    try {
      this._rc = firebase.remoteConfig();
      this._rc.settings = {
        minimumFetchIntervalMillis: 3_600_000, // 1 saat
        fetchTimeoutMillis:         10_000,
      };
      this._rc.defaultConfig = this._defaults;
      await this._rc.fetchAndActivate();
      console.info('[RemoteConfig] Initialized');
    } catch (e) {
      console.warn('[RemoteConfig] Init error (defaults kullaniliyor):', e);
    }
  }

  // ── Getters ────────────────────────────────────────────────

  _raw(key) {
    if (!this._rc) return this._defaults[key];
    try {
      const v = this._rc.getValue(key).asString();
      return v !== '' ? v : this._defaults[key];
    } catch {
      return this._defaults[key];
    }
  }

  get dailyXPGoal()        { return Number(this._raw('dailyXPGoal'))   || 100; }
  get maxStreakBonus()      { return Number(this._raw('maxStreakBonus')) || 50; }
  get speakingDifficulty() { return this._raw('speakingDifficulty'); }

  /**
   * Feature flag deger
   * @param {string} flag - ornek: 'nexusMode'
   * @returns {boolean}
   */
  feature(flag) {
    try {
      const flags = JSON.parse(this._raw('featureFlags'));
      return flags[flag] ?? true;
    } catch {
      return true;
    }
  }
}

window.remoteConfigManager = new RemoteConfigManager();
