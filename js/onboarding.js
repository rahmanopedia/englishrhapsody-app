/* ── Onboarding — İlk kullanıcı hoşgeldin modalı ──────────────────────────
   Kullanıcı uygulamaya ilk kez girdiğinde (auth sonrası, cefrLevel yoksa)
   seviye testine yönlendirme yapar.                                        */
(function () {
  'use strict';

  var STORAGE_KEY = 'er_onboarding_done';

  function isDone() {
    return !!localStorage.getItem(STORAGE_KEY);
  }

  function markDone() {
    localStorage.setItem(STORAGE_KEY, '1');
  }

  function show() {
    if (document.getElementById('er-onboard-overlay')) return;

    var el = document.createElement('div');
    el.id = 'er-onboard-overlay';
    el.style.cssText = [
      'position:fixed;inset:0;z-index:999990',
      'background:rgba(7,10,15,0.92)',
      'display:flex;align-items:center;justify-content:center',
      'font-family:system-ui,sans-serif',
      'animation:erObIn .35s ease'
    ].join(';');

    el.innerHTML = [
      '<style>',
      '@keyframes erObIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}',
      '.er-ob-card{background:#0d0d1a;border:1px solid rgba(124,58,237,.35);border-radius:20px;',
      'padding:32px 28px 28px;max-width:380px;width:calc(100% - 32px);text-align:center}',
      '.er-ob-emoji{font-size:3rem;margin-bottom:12px}',
      '.er-ob-title{font-size:1.25rem;font-weight:800;color:#fff;margin-bottom:8px}',
      '.er-ob-sub{font-size:13px;color:#888;line-height:1.6;margin-bottom:24px}',
      '.er-ob-btn{display:block;width:100%;padding:13px;border:none;border-radius:12px;',
      'font-size:14px;font-weight:700;cursor:pointer;margin-bottom:10px}',
      '.er-ob-primary{background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff}',
      '.er-ob-skip{background:none;border:1px solid rgba(255,255,255,.1);color:#666;font-size:12px}',
      '</style>',
      '<div class="er-ob-card">',
      '<div class="er-ob-emoji">👋</div>',
      '<div class="er-ob-title">Hoş Geldin!</div>',
      '<div class="er-ob-sub">',
      'English Rhapsody\'ye ilk kez giriyorsun.<br>',
      'Seviyeni belirleyelim — 2 dakikalık placement testi ile sana özel içerik hazırlayalım.',
      '</div>',
      '<button class="er-ob-btn er-ob-primary" id="er-ob-test">🎯 Seviye Testine Başla</button>',
      '<button class="er-ob-btn er-ob-skip"    id="er-ob-skip">Şimdi değil, kendim seçerim</button>',
      '</div>'
    ].join('');

    document.body.appendChild(el);

    el.querySelector('#er-ob-test').addEventListener('click', function () {
      markDone();
      el.remove();
      var app = window._app || window.app;
      if (app && app.navigate) app.navigate('placement');
    });

    el.querySelector('#er-ob-skip').addEventListener('click', function () {
      markDone();
      el.remove();
    });
  }

  /* Tetikleyici: auth başarıyla tamamlanınca + cefrLevel tanımsızsa */
  function tryShow() {
    if (isDone()) return;

    var app  = window._app || window.app;
    var auth = window.authManager;
    if (!app || !auth || !auth.isLoggedIn) return;

    var cefr = app.state && app.state.get('cefrLevel');
    if (cefr) { markDone(); return; }   // zaten seviye var

    setTimeout(show, 1500);             // 1.5 sn bekle, uygulama yerleşsin
  }

  /* auth değişimini dinle */
  var _interval = setInterval(function () {
    var auth = window.authManager;
    if (!auth) return;
    clearInterval(_interval);

    var fb = window.firebase;
    var fbAuth = fb && fb.auth && fb.auth();
    if (fbAuth) {
      fbAuth.onAuthStateChanged(function (user) {
        if (user) setTimeout(tryShow, 2000);
      });
    }
  }, 300);

  window.Onboarding = { show: show, markDone: markDone };
})();
