/* ================================================================
   ENGLISH RHAPSODY — Firebase Remote Config Manager
   Uygulama ayarlarini Firebase console'dan uzaktan yonet

   Firebase Console → Remote Config → Asagidaki parametreleri ekle:
     dailyXPGoal                Number   100
     maxStreakBonus              Number   50
     speakingDifficulty         String   "easy"
     feature_speaking_ai        Boolean  false
     feature_notifications      Boolean  true
     xp_per_level               Number   500
     speaking_auto_advance_score Number  80
     feature_nexus_mode         Boolean  true
     feature_convo_mode         Boolean  true
     feature_confetti           Boolean  true
   ================================================================ */

class RemoteConfigManager {
  constructor() {
    this._rc = null;

    // Local defaults — Remote Config'den cekilemediginde fallback
    this._defaults = {
      dailyXPGoal:                 100,
      maxStreakBonus:               50,
      speakingDifficulty:          'easy',
      feature_speaking_ai:         false,
      feature_notifications:       true,
      xp_per_level:                500,
      speaking_auto_advance_score: 80,
      feature_nexus_mode:          true,
      feature_convo_mode:          true,
      feature_confetti:            true,
    };
  }

  async init() {
    if (!window._firebaseConfigured) {
      this._applyFlags(this._defaults);
      return;
    }
    try {
      this._rc = firebase.remoteConfig();
      this._rc.settings = {
        minimumFetchIntervalMillis: 3_600_000,
        fetchTimeoutMillis:         10_000,
      };
      this._rc.defaultConfig = {
        dailyXPGoal:                 String(this._defaults.dailyXPGoal),
        maxStreakBonus:               String(this._defaults.maxStreakBonus),
        speakingDifficulty:          this._defaults.speakingDifficulty,
        feature_speaking_ai:         String(this._defaults.feature_speaking_ai),
        feature_notifications:       String(this._defaults.feature_notifications),
        xp_per_level:                String(this._defaults.xp_per_level),
        speaking_auto_advance_score: String(this._defaults.speaking_auto_advance_score),
        feature_nexus_mode:          String(this._defaults.feature_nexus_mode),
        feature_convo_mode:          String(this._defaults.feature_convo_mode),
        feature_confetti:            String(this._defaults.feature_confetti),
      };
      await this._rc.fetchAndActivate();
      console.info('[RemoteConfig] Initialized');
    } catch (e) {
      console.warn('[RemoteConfig] Fetch basarisiz, defaults kullaniliyor:', e.message);
    }
    this._applyFlags(this._buildFlags());
  }

  // ── Internal ───────────────────────────────────────────────

  _raw(key) {
    if (!this._rc) return String(this._defaults[key] ?? '');
    try {
      const v = this._rc.getValue(key).asString();
      return v !== '' ? v : String(this._defaults[key] ?? '');
    } catch {
      return String(this._defaults[key] ?? '');
    }
  }

  _bool(key) {
    const v = this._raw(key).toLowerCase();
    return v === 'true' || v === '1';
  }

  _buildFlags() {
    return {
      dailyXPGoal:                 Number(this._raw('dailyXPGoal'))                 || this._defaults.dailyXPGoal,
      maxStreakBonus:               Number(this._raw('maxStreakBonus'))               || this._defaults.maxStreakBonus,
      speakingDifficulty:          this._raw('speakingDifficulty')                  || this._defaults.speakingDifficulty,
      feature_speaking_ai:         this._bool('feature_speaking_ai'),
      feature_notifications:       this._bool('feature_notifications'),
      xp_per_level:                Number(this._raw('xp_per_level'))                || this._defaults.xp_per_level,
      speaking_auto_advance_score: Number(this._raw('speaking_auto_advance_score')) || this._defaults.speaking_auto_advance_score,
      feature_nexus_mode:          this._bool('feature_nexus_mode'),
      feature_convo_mode:          this._bool('feature_convo_mode'),
      feature_confetti:            this._bool('feature_confetti'),
    };
  }

  _applyFlags(flags) {
    window.remoteFlags = Object.assign({}, flags);
  }

  // ── Public Getters ─────────────────────────────────────────

  get dailyXPGoal()               { return window.remoteFlags?.dailyXPGoal                ?? this._defaults.dailyXPGoal; }
  get maxStreakBonus()             { return window.remoteFlags?.maxStreakBonus              ?? this._defaults.maxStreakBonus; }
  get speakingDifficulty()        { return window.remoteFlags?.speakingDifficulty          ?? this._defaults.speakingDifficulty; }
  get xpPerLevel()                { return window.remoteFlags?.xp_per_level               ?? this._defaults.xp_per_level; }
  get speakingAutoAdvanceScore()  { return window.remoteFlags?.speaking_auto_advance_score ?? this._defaults.speaking_auto_advance_score; }

  feature(flag) {
    return window.remoteFlags?.[flag] ?? this._defaults[flag] ?? true;
  }
}

// Defaults hemen yaz — init() bitmeden remoteFlags erisebilir olsun
window.remoteFlags = {
  dailyXPGoal:                 100,
  maxStreakBonus:               50,
  speakingDifficulty:          'easy',
  feature_speaking_ai:         false,
  feature_notifications:       true,
  xp_per_level:                500,
  speaking_auto_advance_score: 80,
  feature_nexus_mode:          true,
  feature_convo_mode:          true,
  feature_confetti:            true,
};

window.remoteConfigManager = new RemoteConfigManager();
