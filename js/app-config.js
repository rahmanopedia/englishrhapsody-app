// ── App Config — Duyurular, Feature Flags, Bakım Modu ────────────────────
(function(){
  'use strict';

  var ADMIN_EMAIL = 'rahman.eraydin@gmail.com';
  var _currentUser = null;   // Firebase Auth mevcut kullanıcı
  var _authReady   = false;  // Auth durumu belli oldu mu

  function _se(s){
    return String(s==null?'':s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── Duyuru banner'ı ──────────────────────────────────────── */
  function showBanner(message, type){
    if(document.getElementById('ac-banner')) return;
    var colors = { info:'#4488ff', warning:'#ff9900', success:'#4ade80', error:'#ff4444' };
    var bgs    = { info:'rgba(68,136,255,0.12)', warning:'rgba(255,153,0,0.12)', success:'rgba(74,222,128,0.12)', error:'rgba(255,68,68,0.12)' };
    var icons  = { info:'📢', warning:'⚠️', success:'✅', error:'❌' };
    var color  = colors[type] || colors.info;
    var bg     = bgs[type]    || bgs.info;
    var icon   = icons[type]  || icons.info;
    var el = document.createElement('div');
    el.id  = 'ac-banner';
    el.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99970;background:'+bg
      +';border-bottom:2px solid '+color+';padding:10px 16px;display:flex;align-items:center;gap:10px'
      +';font-family:system-ui,sans-serif;backdrop-filter:blur(10px);animation:acSlideDown 0.3s ease';
    el.innerHTML = '<style>@keyframes acSlideDown{from{transform:translateY(-100%)}to{transform:translateY(0)}}</style>'
      +'<span style="font-size:1.1rem">'+icon+'</span>'
      +'<span style="flex:1;font-size:13px;color:'+color+';line-height:1.4">'+_se(message)+'</span>'
      +'<button onclick="document.getElementById(\'ac-banner\').remove()" style="background:none;border:none;color:'+color+';font-size:1.1rem;cursor:pointer;padding:0;line-height:1;opacity:0.7">✕</button>';
    document.body.prepend(el);
  }

  /* ── Bakım ekranı göster ──────────────────────────────────── */
  function showMaintenanceOverlay(message){
    if(document.getElementById('ac-maintenance')) return;
    var el = document.createElement('div');
    el.id  = 'ac-maintenance';
    el.style.cssText = 'position:fixed;inset:0;z-index:999999;background:#07070f;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif';
    el.innerHTML =
      '<div style="text-align:center;padding:40px;max-width:420px;user-select:none">'
      +'<div id="ac-maint-icon" style="font-size:4rem;margin-bottom:20px;cursor:default">🔧</div>'
      +'<div style="font-size:1.3rem;font-weight:800;color:#fff;margin-bottom:14px">Bakım Modu</div>'
      +'<div style="font-size:14px;color:#555;line-height:1.7">'+_se(message)+'</div>'
      +'</div>';
    document.body.appendChild(el);

    /* Gizli bypass: ikona hızlı 7 klik → giriş formu */
    var _clicks = 0, _timer = null;
    el.querySelector('#ac-maint-icon').addEventListener('click', function(){
      _clicks++;
      clearTimeout(_timer);
      if(_clicks >= 10){
        _clicks = 0;
        showAdminLoginForm(el);
        return;
      }
      _timer = setTimeout(function(){ _clicks = 0; }, 2000);
    });
  }

  /* ── Gizli admin giriş formu (bakım ekranı üstünde) ─────── */
  function showAdminLoginForm(maintEl){
    if(document.getElementById('ac-login-form')) return;

    var fbAuth = window.firebase && window.firebase.auth && window.firebase.auth();
    if(!fbAuth) return;

    var form = document.createElement('div');
    form.id  = 'ac-login-form';
    form.style.cssText = 'position:fixed;inset:0;z-index:1000000;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif';
    form.innerHTML =
      '<div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:28px 28px 24px;max-width:340px;width:100%">'
      +'<div style="text-align:center;margin-bottom:20px">'
      +'<div style="font-size:2rem;margin-bottom:8px">🔐</div>'
      +'<div style="font-size:15px;font-weight:700;color:#fff">Yönetici Girişi</div>'
      +'</div>'
      +'<input id="ac-li-email" type="email" placeholder="E-posta" autocomplete="email" style="width:100%;box-sizing:border-box;background:#13131f;border:1px solid rgba(255,255,255,0.12);border-radius:10px;color:#fff;padding:11px 14px;font-size:14px;margin-bottom:10px;outline:none">'
      +'<input id="ac-li-pass"  type="password" placeholder="Şifre" autocomplete="current-password" style="width:100%;box-sizing:border-box;background:#13131f;border:1px solid rgba(255,255,255,0.12);border-radius:10px;color:#fff;padding:11px 14px;font-size:14px;margin-bottom:14px;outline:none">'
      +'<div id="ac-li-err" style="font-size:12px;color:#ff6b6b;min-height:16px;margin-bottom:10px;text-align:center"></div>'
      +'<button id="ac-li-btn" style="width:100%;padding:11px;background:rgba(124,58,237,0.3);border:1px solid rgba(124,58,237,0.6);border-radius:10px;color:#c4b5fd;font-size:14px;font-weight:600;cursor:pointer">Giriş Yap</button>'
      +'<button id="ac-li-cancel" style="width:100%;padding:8px;margin-top:8px;background:none;border:none;color:#444;font-size:12px;cursor:pointer">İptal</button>'
      +'</div>';

    document.body.appendChild(form);

    var emailEl  = form.querySelector('#ac-li-email');
    var passEl   = form.querySelector('#ac-li-pass');
    var errEl    = form.querySelector('#ac-li-err');
    var loginBtn = form.querySelector('#ac-li-btn');

    form.querySelector('#ac-li-cancel').onclick = function(){ form.remove(); };

    function doLogin(){
      var email = emailEl.value.trim();
      var pass  = passEl.value;
      if(!email || !pass){ errEl.textContent = 'E-posta ve şifre gerekli.'; return; }

      loginBtn.textContent = 'Giriş yapılıyor…';
      loginBtn.disabled    = true;
      errEl.textContent    = '';

      fbAuth.signInWithEmailAndPassword(email, pass)
        .then(function(cred){
          if(cred.user.email === ADMIN_EMAIL){
            /* Admin — bakım ekranını kaldır, paneli aç */
            form.remove();
            if(maintEl && maintEl.parentNode) maintEl.remove();
            if(window.AdminPanel) window.AdminPanel.open('control');
          } else {
            /* Admin değil — çıkış yaptır, hata göster */
            fbAuth.signOut();
            errEl.textContent = 'Bu hesapla giriş yapamazsınız.';
            loginBtn.textContent = 'Giriş Yap';
            loginBtn.disabled    = false;
            passEl.value = '';
          }
        })
        .catch(function(err){
          var msg = 'Giriş başarısız.';
          if(err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') msg = 'E-posta veya şifre hatalı.';
          else if(err.code === 'auth/user-not-found') msg = 'Bu e-posta ile kayıtlı kullanıcı yok.';
          else if(err.code === 'auth/too-many-requests') msg = 'Çok fazla deneme. Lütfen bekleyin.';
          errEl.textContent    = msg;
          loginBtn.textContent = 'Giriş Yap';
          loginBtn.disabled    = false;
          passEl.value = '';
        });
    }

    loginBtn.onclick = doLogin;
    passEl.addEventListener('keydown', function(e){ if(e.key==='Enter') doLogin(); });
    setTimeout(function(){ emailEl.focus(); }, 100);
  }

  /* ── Bakım modunu uygula (admin muaf) ────────────────────── */
  function applyMaintenance(active, message){
    var isAdmin = _currentUser && _currentUser.email === ADMIN_EMAIL;

    if(!active){
      /* Bakım modu kapandı — ekranı kaldır */
      var existing = document.getElementById('ac-maintenance');
      if(existing) existing.remove();
      return;
    }

    /* Bakım modu açık — admin görmesin */
    if(isAdmin) return;

    /* Auth henüz belli değilse bekle (max 4s), sonra göster */
    if(!_authReady){
      setTimeout(function(){
        if(!(_currentUser && _currentUser.email === ADMIN_EMAIL)){
          showMaintenanceOverlay(message);
        }
      }, 4000);
      return;
    }

    showMaintenanceOverlay(message);
  }

  /* ── Firebase başladığında başlat ────────────────────────── */
  var _tries = 0;
  var _check = setInterval(function(){
    _tries++;
    if(_tries > 40){ clearInterval(_check); return; }

    var fb = window.firebase;
    var db = fb && fb.firestore && fb.firestore();
    var fbAuth = fb && fb.auth && fb.auth();
    if(!db) return;

    clearInterval(_check);

    /* Auth durumunu takip et */
    if(fbAuth){
      fbAuth.onAuthStateChanged(function(user){
        _currentUser = user;
        _authReady   = true;
      });
    } else {
      _authReady = true;
    }

    /* ── Flags: gerçek zamanlı onSnapshot ── */
    db.collection('app_config').doc('flags').onSnapshot(function(doc){
      if(!doc.exists) return;
      var data = doc.data();
      if(window.remoteFlags) Object.assign(window.remoteFlags, data);
      var msg = data.maintenanceMessage || 'Kısa bir süre içinde geri döneceğiz. Anlayışınız için teşekkürler.';
      applyMaintenance(!!data.maintenanceMode, msg);
    }, function(err){
      console.warn('[AppConfig] flags snapshot hatası:', err && err.message);
    });

    /* ── Duyuru: gerçek zamanlı onSnapshot ── */
    db.collection('app_config').doc('announcement').onSnapshot(function(doc){
      if(!doc.exists) return;
      var data = doc.data();
      var old = document.getElementById('ac-banner');
      if(old) old.remove();
      if(data.active && data.message){
        showBanner(data.message, data.type || 'info');
      }
    }, function(err){
      console.warn('[AppConfig] announcement snapshot hatası:', err && err.message);
    });

  }, 500);

  window.AppConfig = { showBanner: showBanner };

})();
