(function(){

  // ── Olay kuyruğu (Firestore hazır olmadan önce biriktir) ──
  window._secQueue = window._secQueue || [];
  function secLog(type, detail){
    window._secQueue.push({ type: type, detail: detail || '', ts: Date.now(), ua: navigator.userAgent.slice(0, 150), url: location.pathname });
  }

  // ── Bot / Headless tarayıcı tespiti ──
  var isBot = !!(
    navigator.webdriver ||
    window.callPhantom ||
    window._phantom ||
    window.__nightmare ||
    window.domAutomation ||
    window.domAutomationController ||
    /HeadlessChrome|PhantomJS|Selenium|WebDriver|Puppeteer/i.test(navigator.userAgent)
  );
  if(isBot){
    secLog('bot_attempt', navigator.userAgent.slice(0,200));
    document.documentElement.innerHTML = '<body style="background:#000;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;text-align:center"><div><h1>⛔ Erişim Engellendi</h1><p>Otomatik araçlarla erişim yasaktır.</p></div></body>';
    return;
  }

  // ── Ekran kaydı API'sini engelle ──
  try {
    if(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia){
      navigator.mediaDevices.getDisplayMedia = function(){
        secLog('screen_capture_attempt');
        return Promise.reject(new DOMException('Screen capture is not permitted.','NotAllowedError'));
      };
    }
  } catch(ex){}

  // ── Konsol uyarısı ──
  setTimeout(function(){
    console.log('%c⛔ DUR!', 'color:#ff4444;font-size:52px;font-weight:900;');
    console.log('%cBu konsolu kullanmak güvenlik ihlali sayılır.\nHesabınız kalıcı olarak kapatılabilir.', 'color:#ff4444;font-size:16px;font-weight:600;line-height:1.6');
    console.log('%c© 2026 English Rhapsody — Tüm hakları saklıdır.', 'color:#888;font-size:12px;');
  }, 1000);

  // ── Sağ tık engelle ──
  document.addEventListener('contextmenu', function(e){ e.preventDefault(); });

  // ── Mobil uzun basma engeli ──
  document.addEventListener('touchstart', function(e){
    if(e.touches.length > 1) e.preventDefault();
  }, { passive: false });
  var touchTimer;
  document.addEventListener('touchstart', function(){ touchTimer = setTimeout(function(){ /* uzun basma sessizce iptal */ }, 500); });
  document.addEventListener('touchend',   function(){ clearTimeout(touchTimer); });
  document.addEventListener('touchmove',  function(){ clearTimeout(touchTimer); });

  // ── Kopyalama & kesme engelle ──
  function blockCopy(e){
    var t = e.target.tagName;
    if(t === 'INPUT' || t === 'TEXTAREA') return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if(e.clipboardData) e.clipboardData.setData('text/plain', '');
  }
  document.addEventListener('copy',  blockCopy, true);
  document.addEventListener('cut',   blockCopy, true);
  document.addEventListener('paste', function(e){
    // Uygulama dışından yapıştırmayı engelleme (input hariç)
    var t = e.target.tagName;
    if(t !== 'INPUT' && t !== 'TEXTAREA') e.preventDefault();
  }, true);

  // ── Klavye kısayollarını engelle ──
  document.addEventListener('keydown', function(e){
    var k = e.key ? e.key.toLowerCase() : '';
    // Ekran görüntüsü
    if(e.key === 'PrintScreen'){ e.preventDefault(); e.stopPropagation(); showOverlay(); setTimeout(hideOverlayIfSafe, 1500); }
    // Kopyala / kes / tümünü seç
    if(e.ctrlKey && (k==='c'||k==='x'||k==='a')){ e.preventDefault(); e.stopPropagation(); }
    // Meta (Mac)
    if(e.metaKey && (k==='c'||k==='x'||k==='a')){ e.preventDefault(); e.stopPropagation(); }
    // Shift + ok tuşları ile seçim
    if(e.shiftKey && ['arrowleft','arrowright','arrowup','arrowdown','home','end'].indexOf(k) !== -1){
      var t = e.target.tagName;
      if(t !== 'INPUT' && t !== 'TEXTAREA') e.preventDefault();
    }
    // DevTools / kaynak görüntüleme
    if(e.ctrlKey && e.shiftKey && 'ijcs'.indexOf(k) !== -1){ e.preventDefault(); }
    if(e.ctrlKey && 'usp'.indexOf(k) !== -1){ e.preventDefault(); }
    if(e.key === 'F12'){ e.preventDefault(); }
    // Sayfa yenileme (cache'li kaynağa erişimi zorlaştırır)
    if(e.ctrlKey && (k==='r'||k==='f5')){ e.preventDefault(); }
    if(e.key === 'F5'){ e.preventDefault(); }
  }, true);

  // PrintScreen bırakılınca panoyu temizle
  document.addEventListener('keyup', function(e){
    if(e.key === 'PrintScreen'){
      navigator.clipboard && navigator.clipboard.writeText('').catch(function(){});
      try { navigator.clipboard.write([new ClipboardItem({'image/png': new Blob([],{type:'image/png'})})]); } catch(ex){}
    }
  }, true);

  // ── Sürükle & seçim engelle ──
  document.addEventListener('dragstart', function(e){ e.preventDefault(); });
  document.addEventListener('selectstart', function(e){
    var t = e.target.tagName;
    if(t === 'INPUT' || t === 'TEXTAREA') return;
    e.preventDefault();
  });

  // ── Siyah koruma overlay ──
  var overlay = document.createElement('div');
  overlay.id = 'security-overlay';
  overlay.style.cssText = 'display:none;position:fixed;inset:0;z-index:2147483647;background:#000;pointer-events:all';

  function showOverlay(){ overlay.style.display = 'block'; document.documentElement.style.visibility = 'hidden'; }
  function hideOverlay(){ overlay.style.display = 'none'; document.documentElement.style.visibility = ''; }
  function hideOverlayIfSafe(){
    var wDiff = window.outerWidth - window.innerWidth;
    var hDiff = window.outerHeight - window.innerHeight;
    if(wDiff <= 160 && hDiff <= 160 && document.hasFocus()) hideOverlay();
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.body.appendChild(overlay);

    // ── ToS modal ──
    var tosModal = document.getElementById('tos-modal');
    function openTos(){ if(tosModal) tosModal.style.display = 'flex'; }
    function closeTos(){ if(tosModal) tosModal.style.display = 'none'; }
    document.querySelectorAll('.sf-copyright, .sp-copyright').forEach(function(el){
      el.addEventListener('click', openTos);
    });
    if(tosModal) tosModal.addEventListener('click', function(e){ if(e.target === tosModal) closeTos(); });
    document.querySelectorAll('.tos-close, .tos-accept-btn').forEach(function(el){
      el.addEventListener('click', closeTos);
    });
  });

  // ── DevTools tespiti: pencere boyutu yöntemi ──
  var devtoolsOpen = false;
  setInterval(function(){
    var wDiff = window.outerWidth  - window.innerWidth;
    var hDiff = window.outerHeight - window.innerHeight;
    var open  = wDiff > 160 || hDiff > 160;
    if(open && !devtoolsOpen){ devtoolsOpen = true; secLog('devtools_opened'); showOverlay(); }
    else if(!open && devtoolsOpen){ devtoolsOpen = false; hideOverlay(); }
  }, 300);

  // ── Pencere tamamen gizlenince (sekme değiştirme, minimize) ──
  window.addEventListener('focus', function(){ hideOverlayIfSafe(); });

  // ── Mobil: visibilitychange ──
  document.addEventListener('visibilitychange', function(){
    if(document.visibilityState === 'hidden') showOverlay();
    else setTimeout(hideOverlayIfSafe, 800);
  });

  // ── Yazdırma engeli ──
  window.addEventListener('beforeprint', function(e){ e.preventDefault(); showOverlay(); });
  window.addEventListener('afterprint',  function(){ hideOverlay(); });

  // ── iframe içinden çalışıyorsa sayfayı kapat ──
  try {
    if(window.self !== window.top){
      secLog('iframe_attempt', document.referrer.slice(0,200));
      window.top.location = window.self.location;
    }
  } catch(ex){ secLog('iframe_attempt','cross-origin'); document.body.innerHTML = ''; }

})();
