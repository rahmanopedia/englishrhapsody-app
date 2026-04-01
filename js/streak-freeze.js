/* ── Streak Freeze — 1 günlük seri koruması ────────────────────────────────
   Kullanıcı 1 gün kaçırırsa seriyi sıfırlamaz, "freeze" kullanılır.
   Her 7 günde bir otomatik yeni freeze kredisi kazanılır (max 1 stok).

   State keys (localStorage):
     er_sf_credits : number  — mevcut freeze kredisi (0 veya 1)
     er_sf_used_on : string  — son kullanılan tarih (YYYY-MM-DD)
     er_sf_earned  : string  — son kredi kazanılan tarih
   ─────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var KEY_CREDITS = 'er_sf_credits';
  var KEY_USED    = 'er_sf_used_on';
  var KEY_EARNED  = 'er_sf_earned';
  var MAX_CREDITS = 1;

  function today() {
    return new Date().toISOString().split('T')[0];
  }

  function diffDays(a, b) {
    return Math.round((new Date(b) - new Date(a)) / 86400000);
  }

  function getCredits() {
    return parseInt(localStorage.getItem(KEY_CREDITS) || '0', 10);
  }

  function setCredits(n) {
    localStorage.setItem(KEY_CREDITS, String(Math.max(0, Math.min(MAX_CREDITS, n))));
  }

  /* ── 7 günde bir kredi kazan ── */
  function maybeEarnCredit() {
    var earned = localStorage.getItem(KEY_EARNED);
    var td     = today();
    if (!earned) {
      localStorage.setItem(KEY_EARNED, td);
      if (getCredits() < MAX_CREDITS) setCredits(getCredits() + 1);
      return;
    }
    if (diffDays(earned, td) >= 7) {
      localStorage.setItem(KEY_EARNED, td);
      if (getCredits() < MAX_CREDITS) {
        setCredits(getCredits() + 1);
        _showEarnedToast();
      }
    }
  }

  function _showEarnedToast() {
    setTimeout(function () {
      typeof UI !== 'undefined' && UI.toast('🛡️ Streak Freeze kredisi kazandın! Bir günlük yokluğuna karşı korunuyorsun.', 5000);
    }, 3000);
  }

  /* ── Seriyi kontrol et ve gerekirse freeze uygula ── */
  function checkAndProtect() {
    var app = window._app || window.app;
    if (!app || !app.state) return;

    var streak    = app.state.get('streak') || 0;
    var lastActive = app.state.get('lastActive') || '';
    if (!lastActive || !streak) return;

    var td   = today();
    var diff = diffDays(lastActive, td);

    /* 1 gün kaçırılmış + freeze kredisi var + bugün henüz kullanılmamış */
    if (diff === 1 && getCredits() > 0 && localStorage.getItem(KEY_USED) !== td) {
      var usedOn = localStorage.getItem(KEY_USED);
      /* Dünü zaten kurtardıysak tekrar uygulama */
      if (usedOn && diffDays(usedOn, td) < 1) return;

      setCredits(getCredits() - 1);
      localStorage.setItem(KEY_USED, td);

      /* State'e lastActive'i bugün olarak güncelle — streak kırılmasın */
      var yesterday = lastActive;
      app.state.set('lastActive', yesterday); // bugünkü ders yoksa dokunma
      _showFreezeSavedToast(streak, getCredits());
    }
  }

  function _showFreezeSavedToast(streak, remaining) {
    setTimeout(function () {
      typeof UI !== 'undefined' && UI.toast(
        '🛡️ Streak Freeze kullanıldı! ' + streak + ' günlük serin korundu. Kalan kredi: ' + remaining,
        6000
      );
    }, 2500);
  }

  /* ── UI: Freeze rozet göster (header'a) ── */
  function renderBadge() {
    var existing = document.getElementById('sf-badge');
    if (existing) existing.remove();
    var credits = getCredits();
    if (credits <= 0) return;

    var streakEl = document.querySelector('.stat-chip.streak');
    if (!streakEl) return;

    var badge = document.createElement('span');
    badge.id  = 'sf-badge';
    badge.title = 'Streak Freeze: 1 günlük seri koruması aktif';
    badge.style.cssText = 'font-size:12px;cursor:default;margin-left:2px;opacity:.85';
    badge.textContent = '🛡️';
    streakEl.appendChild(badge);
  }

  /* ── Başlatıcı ── */
  function init() {
    maybeEarnCredit();
    checkAndProtect();
    renderBadge();
  }

  /* app hazır olunca başlat */
  var _t = setInterval(function () {
    var app = window._app || window.app;
    if (!app || !app.state) return;
    clearInterval(_t);
    setTimeout(init, 2000);
  }, 200);

  window.StreakFreeze = {
    getCredits : getCredits,
    checkAndProtect : checkAndProtect,
    renderBadge : renderBadge
  };
})();
