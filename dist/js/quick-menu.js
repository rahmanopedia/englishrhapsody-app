/* ── Quick Navigation Menu ──────────────────────────────────────────
   Fullscreen modlarda çift dokunuşta altta açılan navigasyon menüsü.
   Kullanım: window.showQuickMenu(containerEl)
   ------------------------------------------------------------------ */
(function () {
  const NAV = [
    { icon: '🏠', label: 'Ana Merkez',  target: 'home' },
    { icon: '🌀', label: 'Sinestezi',   target: 'learn' },
    { icon: '📖', label: 'Okuma',       target: 'reading' },
    { icon: '🎙️', label: 'Konuşma',    target: 'speak' },
    { icon: '✨', label: 'Nexus',       target: 'nexus' },
    { icon: '🎬', label: 'Sinema',      target: 'cinema' },
    { icon: '🌉', label: 'Köprü',       target: 'bridge' },
    { icon: '💬', label: 'İfadeler',    target: 'phrases' },
  ];

  window.showQuickMenu = function (container) {
    if (document.getElementById('qm-overlay')) return;

    /* ── Overlay ── */
    const overlay = document.createElement('div');
    overlay.id = 'qm-overlay';
    overlay.style.cssText = [
      'position:fixed;inset:0;z-index:9999;',
      'background:rgba(0,0,0,0.65);',
      'backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);',
      'display:flex;align-items:flex-end;',
      'animation:qm-fade-in 0.22s ease both;',
    ].join('');

    /* ── Sheet ── */
    const sheet = document.createElement('div');
    sheet.id = 'qm-sheet';
    sheet.style.cssText = [
      'width:100%;',
      'background:linear-gradient(170deg,#13131f 0%,#0a0a14 100%);',
      'border-radius:26px 26px 0 0;',
      'padding:0 14px calc(18px + env(safe-area-inset-bottom,0px));',
      'border-top:1px solid rgba(255,255,255,0.1);',
      'box-shadow:0 -12px 50px rgba(0,0,0,0.7);',
      'animation:qm-slide-up 0.3s cubic-bezier(0.34,1.15,0.64,1) both;',
    ].join('');

    sheet.innerHTML = `
      <style>
        @keyframes qm-fade-in  { from{opacity:0} to{opacity:1} }
        @keyframes qm-slide-up { from{transform:translateY(110%)} to{transform:translateY(0)} }
        @keyframes qm-fade-out { from{opacity:1} to{opacity:0} }
        @keyframes qm-slide-dn { from{transform:translateY(0)} to{transform:translateY(110%)} }
        .qm-nav-btn {
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.09);
          border-radius:18px;
          padding:13px 4px 11px;
          color:#fff;
          font-size:0.67rem;
          font-weight:700;
          cursor:pointer;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:5px;
          transition:all 0.15s ease;
          font-family:inherit;
          letter-spacing:0.2px;
        }
        .qm-nav-btn:hover  { transform:scale(1.07); background:rgba(255,255,255,0.13) !important; border-color:rgba(255,255,255,0.2) !important; }
        .qm-nav-btn:active { transform:scale(0.94); }
        .qm-nav-btn .qm-icon { font-size:1.55rem; line-height:1; }
        .qm-nav-btn .qm-lbl  { opacity:0.82; line-height:1.25; text-align:center; }
        #qm-close-btn {
          width:100%;
          padding:13px;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:16px;
          color:rgba(255,255,255,0.45);
          font-size:0.82rem;
          font-weight:700;
          cursor:pointer;
          font-family:inherit;
          transition:all 0.15s;
          margin-top:10px;
        }
        #qm-close-btn:hover  { background:rgba(255,255,255,0.09); color:rgba(255,255,255,0.7); }
        #qm-close-btn:active { transform:scale(0.97); }
      </style>

      <!-- Handle -->
      <div style="width:42px;height:4px;border-radius:2px;background:rgba(255,255,255,0.18);margin:14px auto 16px;"></div>

      <!-- Title -->
      <div style="color:rgba(255,255,255,0.35);font-size:0.62rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;margin-bottom:13px;text-align:center;">
        NAVIGASYON
      </div>

      <!-- Nav grid -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:0;">
        ${NAV.map(n => `
          <button class="qm-nav-btn" data-qm-target="${n.target}">
            <span class="qm-icon">${n.icon}</span>
            <span class="qm-lbl">${n.label}</span>
          </button>
        `).join('')}
      </div>

      <button id="qm-close-btn">✕ &nbsp; Kapat</button>
    `;

    overlay.appendChild(sheet);
    const _mountTarget = document.fullscreenElement || document.webkitFullscreenElement || document.body;
    _mountTarget.appendChild(overlay);

    /* ── Kapat ── */
    function close() {
      overlay.style.animation = 'qm-fade-out 0.18s ease forwards';
      sheet.style.animation   = 'qm-slide-dn 0.18s ease forwards';
      setTimeout(() => overlay.remove(), 200);
    }

    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    sheet.querySelector('#qm-close-btn').addEventListener('click', close);

    /* ── Navigasyon ── */
    function doNavigate(target) {
      const app = window._app || window.app;
      if (app && app.navigate) {
        app.navigate(target);
      } else {
        const el = document.querySelector(`[data-action="navigate"][data-target="${target}"], .nav-item[data-target="${target}"]`);
        if (el) el.click();
      }
    }

    sheet.querySelectorAll('.qm-nav-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const target = this.dataset.qmTarget;
        close();
        setTimeout(() => doNavigate(target), 50);
      });
    });
  };

  /* ── Fullscreen sidebar block ──
     Sadece bir moddayken (home değil) sidebar'ı bloke et.
     Ana Merkez'de fullscreen olsa bile sidebar serbestçe açılabilir. ── */
  (function () {
    let _inFs   = false;
    let _inMode = false;

    function _exitFs() {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit && (document.fullscreenElement || document.webkitFullscreenElement)) {
        exit.call(document).catch(() => {});
      }
    }

    function _checkFs() {
      const wasFs = _inFs;
      _inFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      if (wasFs && !_inFs) {
        document.body.classList.remove('sidebar-closed');
      }
      /* Ana merkezdeysek fullscreen açık kalmasın */
      if (_inFs && !_inMode) _exitFs();
    }

    document.addEventListener('fullscreenchange', _checkFs);
    document.addEventListener('webkitfullscreenchange', _checkFs);

    /* CSS enjeksiyonu: mobilde modlarda sidebar + sidebar-tab gizle */
    const _style = document.createElement('style');
    _style.textContent = [
      /* sidebar/nav gizle */
      'body.er-in-mode .sidebar,body.er-in-mode #sidebar-tab,body.er-in-mode #mobile-nav{display:none !important;}',
      /* fullscreen'de header'ı gizle ve grid'in ilk satırını çöktür */
      ':fullscreen header.app-header,:-webkit-full-screen header.app-header{display:none!important;}',
      ':fullscreen .layout,:-webkit-full-screen .layout{grid-template-rows:0 1fr!important;}',
      /* main-content padding kaldır, scroll koru */
      ':fullscreen #main-content,:-webkit-full-screen #main-content{padding:0!important;overflow-y:auto!important;height:100dvh!important;}',
      /* animate-in transform'u sıfırla — position:fixed'ın viewport'a göre çalışması için */
      ':fullscreen #main-content>.animate-in,:-webkit-full-screen #main-content>.animate-in{animation:none!important;transform:none!important;}',
      /* cinema topbar'ı gizle — #cine-root kendi UI'ını gösteriyor */
      ':fullscreen .cinema-topbar,:-webkit-full-screen .cinema-topbar{display:none!important;}',
    ].join('');
    document.head.appendChild(_style);

    function _setMode(val) {
      _inMode = val;
      document.body.classList.toggle('er-in-mode', val);
    }

    /* Fullscreen aç + quick menu trigger kur */
    const _FS_PAGES = new Set(['analytics', 'leaderboard']);

    function _enterFs() {
      if (document.fullscreenElement || document.webkitFullscreenElement) return;
      const req = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen;
      if (req) req.call(document.documentElement).catch(() => {});
    }

    function _setupFsPage(target) {
      if (!_FS_PAGES.has(target)) return;
      _enterFs();
      /* Container biraz sonra DOM'a ekleniyor, kısa bekleyip trigger kur */
      setTimeout(() => {
        const selectors = {
          analytics:   '.an-page',
          leaderboard: '#leaderboard-root',
        };
        const el = document.querySelector(selectors[target]);
        if (el && window.attachQuickMenuTrigger) window.attachQuickMenuTrigger(el);
      }, 300);
    }

    /* app.navigate patch'i: hangi görünümde olduğumuzu takip et */
    function _patchNav() {
      const app = window._app;
      if (!app || !app.navigate || app.__qmSbPatched) return;
      app.__qmSbPatched = true;
      const _orig = app.navigate.bind(app);
      app.navigate = function (target) {
        _setMode(target !== 'home');
        if (!_inMode) {
          document.body.classList.remove('sidebar-closed');
          /* Önce portre kilitle (API fullscreen ister), sonra fullscreen'den çık */
          try {
            if (screen.orientation && screen.orientation.lock) {
              screen.orientation.lock('portrait')
                .then(function () { _exitFs(); setTimeout(_exitFs, 300); })
                .catch(function () { _exitFs(); setTimeout(_exitFs, 300); });
            } else {
              _exitFs();
              setTimeout(_exitFs, 300);
            }
          } catch(e) {
            _exitFs();
            setTimeout(_exitFs, 300);
          }
        }
        _orig(target);
        _setupFsPage(target);
      };
    }

    if (window._app) { _patchNav(); }
    else { const _t = setInterval(() => { if (window._app) { clearInterval(_t); _patchNav(); } }, 50); }

    /* Sadece bir moddayken sidebar açılmasını engelle (desktop) */
    new MutationObserver(function () {
      if (_inFs && _inMode && !document.body.classList.contains('sidebar-closed')) {
        document.body.classList.add('sidebar-closed');
      }
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });

    /* Mobile: moddayken #sidebar-tab touch/click'ini yakala ve bloke et */
    function _blockSbTab(e) {
      if (_inMode && e.target.closest && e.target.closest('#sidebar-tab')) {
        e.stopImmediatePropagation();
        if (e.cancelable) e.preventDefault();
      }
    }
    document.addEventListener('touchstart', _blockSbTab, { capture: true, passive: false });
    document.addEventListener('click',      _blockSbTab, { capture: true });

  })();

  /* ── Double-tap helper ── */
  window.attachQuickMenuTrigger = function (container) {
    /* Mobile: touch double-tap */
    let lastTap = 0;
    container.addEventListener('touchend', function (e) {
      const now = Date.now();
      if (now - lastTap < 320) {
        e.preventDefault();
        window.showQuickMenu(container);
      }
      lastTap = now;
    }, { passive: false });

    /* Desktop: dblclick */
    container.addEventListener('dblclick', function () {
      window.showQuickMenu(container);
    });
  };
})();
