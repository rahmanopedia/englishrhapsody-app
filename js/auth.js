/* ================================================================
   ENGLISH RHAPSODY — Auth & Cloud Sync Manager
   Firebase Authentication + Firestore ile kullanici yonetimi
   ================================================================ */

class AuthManager {
  constructor() {
    this._user       = null;
    this._db         = null;
    this._auth       = null;
    this._syncTimer  = null;
    this._ready      = false;
    this._cloudReady = false; // true yalnızca bu oturumda buluttan başarılı okuma yapıldıktan sonra
  }

  // ── Baslat ────────────────────────────────────────────────

  async init() {
    if (!window._firebaseConfigured) {
      console.info('[Auth] Firebase yapilandirilmamis — misafir modu');
      setTimeout(() => {
        if (typeof UI !== 'undefined') UI.toast('⚙️ Firebase config eksik — misafir modunda calisıyor');
      }, 2500);
      return false;
    }
    try {
      firebase.initializeApp(firebaseConfig);
      this._auth = firebase.auth();
      this._db   = firebase.firestore();
      this._auth.languageCode = 'tr';

      return new Promise((resolve) => {
        this._auth.onAuthStateChanged(async (user) => {
          if (user) {
            this._user = user;
            await this._onLogin(user);
          } else {
            this._user = null;
            this._showAuthModal();
          }
          this._ready = true;
          resolve(true);
        });
      });
    } catch (e) {
      console.error('[Auth] Init error:', e);
      return false;
    }
  }

  get user()        { return this._user; }
  get uid()         { return this._user ? this._user.uid : null; }
  get email()       { return this._user ? this._user.email : null; }
  get displayName() {
    if (!this._user) return 'Kullanici';
    return this._user.displayName || this._user.email.split('@')[0];
  }
  get isLoggedIn()  { return !!this._user; }

  // ── Login / Signup / Logout ────────────────────────────────

  async login(email, pass, remember) {
    const persistence = remember
      ? firebase.auth.Auth.Persistence.LOCAL   // tarayıcı kapansa da kalır
      : firebase.auth.Auth.Persistence.SESSION; // sekme kapanınca çıkış
    await this._auth.setPersistence(persistence);
    const cred = await this._auth.signInWithEmailAndPassword(email, pass);
    return cred.user;
  }

  async signup(email, pass, name) {
    const cred = await this._auth.createUserWithEmailAndPassword(email, pass);
    if (name) await cred.user.updateProfile({ displayName: name });
    await this._initUserDoc(cred.user);
    return cred.user;
  }

  async resetPassword(email) {
    await this._auth.sendPasswordResetEmail(email);
  }

  async logout() {
    try {
      if (window.app) await this.saveToCloud(window.app.state._state, true);
      await this._auth.signOut();
    } catch (e) {
      console.warn('[Auth] logout error:', e);
    }
    this._cloudReady = false;
    this._user = null;

    // Header butonunu gizle
    const btn = document.getElementById('auth-user-btn');
    if (btn) btn.style.display = 'none';

    // Modalı login ekranına sıfırla
    const panel  = document.getElementById('auth-account-panel');
    const tabs   = document.querySelector('.auth-tabs');
    const fLogin = document.getElementById('auth-form-login');
    const fReg   = document.getElementById('auth-form-signup');
    const fReset = document.getElementById('auth-form-reset');
    if (panel)  panel.style.display  = 'none';
    if (tabs)   tabs.style.display   = 'flex';
    if (fLogin) fLogin.style.display = 'flex';
    if (fReg)   fReg.style.display   = 'none';
    if (fReset) fReset.style.display = 'none';

    // Tab aktifliğini sıfırla
    const tLogin  = document.getElementById('auth-tab-login');
    const tSignup = document.getElementById('auth-tab-signup');
    if (tLogin)  tLogin.classList.add('active');
    if (tSignup) tSignup.classList.remove('active');

    authUI._clearError();
    this._showAuthModal();
  }

  // ── Firestore Veri ────────────────────────────────────────

  async _onLogin(user) {
    this._updateHeaderUser(user);
    const result = await this._loadCloudSafe();
    if (!result.ok) {
      // Firestore'a ulaşılamadı — buluta YAZMA, mevcut (local) state korunsun
      console.warn('[Auth] Bulut okunamadı; bu oturumda buluta yazılmayacak.');
      setTimeout(() => {
        if (typeof UI !== 'undefined') UI.toast('⚠️ Bulut verisi yüklenemedi — veriler korunuyor, internet bağlantınızı kontrol edin');
      }, 1000);
    } else {
      this._cloudReady = true; // Başarılı okuma — artık yazmaya izin var
      if (result.data && window.app) {
        // Bulut kazanır — localStorage silinse bile veri kaybolmaz
        delete result.data._updatedAt;
        window.app.state._state = Object.assign(window.app.state._defaults(), result.data);
        window.app.state.save();
      }
      // result.data === null → yeni kullanıcı, lokal state doğru, kaydetmeye izin var
    }
    this._hideAuthModal();
    if (window.app) window.app._syncUIFromState();
  }

  async _loadCloudSafe() {
    if (!this.uid || !this._db) return { ok: false };
    try {
      const snap = await this._db.doc('users/' + this.uid + '/data/state').get();
      return { ok: true, data: snap.exists ? snap.data() : null };
    } catch (e) {
      console.warn('[Auth] Load error:', e);
      return { ok: false };
    }
  }

  async _initUserDoc(user) {
    try {
      const ref  = this._db.doc('users/' + user.uid + '/meta/profile');
      const snap = await ref.get();
      if (!snap.exists) {
        await ref.set({
          email:     user.email,
          name:      user.displayName || '',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (e) { console.warn('[Auth] initUserDoc error:', e); }
  }

  async loadFromCloud() {
    if (!this.uid || !this._db) return null;
    try {
      const snap = await this._db.doc('users/' + this.uid + '/data/state').get();
      return snap.exists ? snap.data() : null;
    } catch (e) {
      console.warn('[Auth] Load error:', e);
      return null;
    }
  }

  async saveToCloud(stateObj, immediate) {
    if (!this.uid || !this._db) return;
    if (!this._cloudReady) return; // Buluttan başarılı okuma yapılmadan yazma yok
    const doSave = async () => {
      try {
        const ts = Date.now();
        localStorage.setItem('er_state_ts', String(ts));
        const payload = Object.assign({}, stateObj, { _updatedAt: ts });
        await this._db.doc('users/' + this.uid + '/data/state').set(payload);
      } catch (e) { console.warn('[Auth] Save error:', e); }
    };
    if (immediate) {
      clearTimeout(this._syncTimer);
      await doSave();
    } else {
      clearTimeout(this._syncTimer);
      this._syncTimer = setTimeout(doSave, 15000);
    }
  }

  // ── UI Yardimcilari ───────────────────────────────────────

  _showAuthModal() {
    const m = document.getElementById('auth-modal');
    if (m) m.style.display = 'flex';
  }

  _hideAuthModal() {
    const m = document.getElementById('auth-modal');
    if (m) m.style.display = 'none';
  }

  _updateHeaderUser(user) {
    const btn = document.getElementById('auth-user-btn');
    if (!btn) return;
    const name   = user.displayName || user.email.split('@')[0];
    const avatar = name[0].toUpperCase();
    btn.innerHTML = '<span class="auth-avatar">' + avatar + '</span>'
                  + '<span class="auth-name">' + name + '</span>';
    btn.style.display = 'flex';

    // Modal içi hesap paneli
    const panel = document.getElementById('auth-account-panel');
    const forms = document.getElementById('auth-form-login');
    const tabs  = document.querySelector('.auth-tabs');
    if (panel) {
      document.getElementById('auth-panel-avatar').textContent = avatar;
      document.getElementById('auth-panel-name').textContent   = name;
      document.getElementById('auth-panel-email').textContent  = user.email;
      panel.style.display = 'block';
    }
    if (forms)  forms.style.display  = 'none';
    if (tabs)   tabs.style.display   = 'none';
    var signup = document.getElementById('auth-form-signup');
    var reset  = document.getElementById('auth-form-reset');
    var tabs2  = document.getElementById('auth-tab-login');
    if (signup) signup.style.display = 'none';
    if (reset)  reset.style.display  = 'none';
  }
}

/* ── Auth Modal UI Controller ────────────────────────────── */

window.authUI = {
  open() {
    document.getElementById('auth-modal').style.display = 'flex';
  },

  close() {
    if (window.authManager && window.authManager.isLoggedIn) {
      document.getElementById('auth-modal').style.display = 'none';
    }
  },

  switchTab(tab) {
    ['login', 'signup'].forEach(function(t) {
      document.getElementById('auth-tab-' + t).classList.toggle('active', t === tab);
      document.getElementById('auth-form-' + t).style.display = (t === tab) ? 'flex' : 'none';
    });
    document.getElementById('auth-form-reset').style.display = 'none';
    authUI._clearError();
  },

  showReset() {
    document.getElementById('auth-form-login').style.display  = 'none';
    document.getElementById('auth-form-signup').style.display = 'none';
    document.getElementById('auth-form-reset').style.display  = 'flex';
    authUI._clearError();
  },

  async submitLogin() {
    const email    = document.getElementById('auth-email').value.trim();
    const pass     = document.getElementById('auth-pass').value;
    const remember = document.getElementById('auth-remember').checked;
    if (!email || !pass) return authUI._setError('E-posta ve şifre gerekli');
    authUI._setLoading(true, 'login-btn');
    try {
      await window.authManager.login(email, pass, remember);
    } catch (e) {
      authUI._setError(authUI._errMsg(e));
    } finally {
      authUI._setLoading(false, 'login-btn');
    }
  },

  async submitSignup() {
    const name  = document.getElementById('auth-name').value.trim();
    const email = document.getElementById('auth-email-reg').value.trim();
    const pass  = document.getElementById('auth-pass-reg').value;
    const pass2 = document.getElementById('auth-pass-reg2').value;
    if (!email || !pass) return authUI._setError('E-posta ve şifre gerekli');
    if (pass !== pass2)  return authUI._setError('Şifreler eşleşmiyor');
    if (pass.length < 6) return authUI._setError('Şifre en az 6 karakter olmalı');
    authUI._setLoading(true, 'signup-btn');
    try {
      await window.authManager.signup(email, pass, name);
    } catch (e) {
      authUI._setError(authUI._errMsg(e));
    } finally {
      authUI._setLoading(false, 'signup-btn');
    }
  },

  async submitReset() {
    const email = document.getElementById('auth-reset-email').value.trim();
    if (!email) return authUI._setError('E-posta adresi gerekli');
    authUI._setLoading(true, 'reset-btn');
    try {
      await window.authManager.resetPassword(email);
      authUI._setError('✅ Sıfırlama e-postası gönderildi! Gelen kutunuzu kontrol edin.', 'success');
    } catch (e) {
      authUI._setError(authUI._errMsg(e));
    } finally {
      authUI._setLoading(false, 'reset-btn');
    }
  },

  _setError(msg, type) {
    type = type || 'error';
    const el = document.getElementById('auth-error');
    if (!el) return;
    el.textContent = msg;
    el.className = 'auth-error-msg ' + type;
    el.style.display = msg ? 'block' : 'none';
  },

  _clearError() { authUI._setError(''); },

  _setLoading(on, btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = on;
    if (on) { btn.dataset.orig = btn.textContent; btn.textContent = '⏳ Lütfen bekle...'; }
    else    { btn.textContent = btn.dataset.orig || btn.textContent; }
  },

  _errMsg(e) {
    var map = {
      'auth/user-not-found':       'Bu e-posta ile kayıtlı kullanıcı bulunamadı',
      'auth/wrong-password':       'Şifre yanlış',
      'auth/email-already-in-use': 'Bu e-posta zaten kayıtlı',
      'auth/invalid-email':        'Geçersiz e-posta adresi',
      'auth/too-many-requests':    'Çok fazla deneme. Lütfen bekleyin',
      'auth/network-request-failed': 'Bağlantı hatası. İnterneti kontrol edin',
      'auth/weak-password':        'Şifre çok zayıf (en az 6 karakter)',
      'auth/invalid-credential':   'E-posta veya şifre hatalı',
    };
    return map[e.code] || e.message || 'Bir hata oluştu';
  },
};

window.authManager = new AuthManager();
