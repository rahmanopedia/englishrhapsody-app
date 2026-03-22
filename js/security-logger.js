// ── Security Logger + Admin Panel ──────────────────────────
(function(){

  var ADMIN_EMAIL = 'rahman.eraydin@gmail.com';

  var EVENT_LABELS = {
    bot_attempt:            { icon: '🤖', label: 'Bot Girişimi',         color: '#ff4444' },
    devtools_opened:        { icon: '🔧', label: 'DevTools Açıldı',      color: '#ff9900' },
    screen_capture_attempt: { icon: '📸', label: 'Ekran Kaydı Denemesi', color: '#ff6b6b' },
    iframe_attempt:         { icon: '🖼️',  label: 'iFrame Girişimi',      color: '#cc44ff' },
    copy_attempt:           { icon: '📋', label: 'Kopyalama Denemesi',   color: '#4488ff' }
  };

  // ── Firestore'a olayları gönder ──────────────────────────
  function flushQueue(){
    var q = window._secQueue || [];
    if(!q.length) return;
    window._secQueue = [];
    var db   = window.firebase && window.firebase.firestore && window.firebase.firestore();
    var auth = window.authManager;
    if(!db) return;
    q.forEach(function(ev){
      try {
        db.collection('security_events').add({
          type:   ev.type,
          detail: ev.detail || '',
          uid:    (auth && auth.uid)   || 'anonymous',
          email:  (auth && auth.email) || 'anonymous',
          ts:     window.firebase.firestore.FieldValue.serverTimestamp(),
          ua:     ev.ua,
          url:    ev.url
        });
      } catch(ex){}
    });
  }

  setInterval(function(){
    if(window.authManager && window.authManager.isLoggedIn) flushQueue();
  }, 3000);
  setInterval(flushQueue, 30000);

  // ── Admin mi? ────────────────────────────────────────────
  function isAdmin(){
    return window.authManager && window.authManager.email === ADMIN_EMAIL;
  }

  // ── Admin panel modalı ───────────────────────────────────
  function buildAdminPanel(){
    if(document.getElementById('sec-admin-modal')) return;

    // Modal HTML
    var modal = document.createElement('div');
    modal.id = 'sec-admin-modal';
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:99990;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);overflow-y:auto;padding:20px';
    modal.innerHTML =
      '<div style="max-width:680px;margin:0 auto;background:var(--bg-surface,#1a1a2e);border:1px solid rgba(255,255,255,0.1);border-radius:20px;overflow:hidden">'
      + '<div style="display:flex;align-items:center;padding:22px 24px;border-bottom:1px solid rgba(255,255,255,0.08)">'
      + '<span style="font-size:1.5rem;margin-right:10px">🛡️</span>'
      + '<div><h2 style="font-size:1.1rem;font-weight:700;color:#fff;margin:0">Güvenlik Paneli</h2>'
      + '<p style="color:#666;font-size:12px;margin:2px 0 0">Son 100 güvenlik olayı</p></div>'
      + '<div style="margin-left:auto;display:flex;gap:8px">'
      + '<button id="sec-refresh" style="padding:7px 14px;background:rgba(255,255,255,0.08);border:none;border-radius:8px;color:#ccc;font-size:12px;cursor:pointer">🔄 Yenile</button>'
      + '<button id="sec-close-btn" style="padding:7px 14px;background:rgba(255,255,255,0.08);border:none;border-radius:8px;color:#ccc;font-size:12px;cursor:pointer">✕ Kapat</button>'
      + '</div></div>'
      + '<div id="sec-summary" style="padding:16px 24px 0;display:flex;flex-wrap:wrap;gap:8px"></div>'
      + '<div id="sec-list" style="padding:14px 24px 24px"></div>'
      + '</div>';

    document.body.appendChild(modal);

    modal.querySelector('#sec-close-btn').addEventListener('click', function(){ modal.style.display = 'none'; });
    modal.querySelector('#sec-refresh').addEventListener('click', loadEvents);
    modal.addEventListener('click', function(e){ if(e.target === modal) modal.style.display = 'none'; });
  }

  function loadEvents(){
    var modal = document.getElementById('sec-admin-modal');
    if(!modal) return;
    var summary = modal.querySelector('#sec-summary');
    var list    = modal.querySelector('#sec-list');
    var db = window.firebase && window.firebase.firestore && window.firebase.firestore();
    if(!db){ list.innerHTML = '<p style="color:#888;font-size:13px">Bağlantı yok.</p>'; return; }

    list.innerHTML = '<p style="color:#888;font-size:13px;text-align:center;padding:20px">Yükleniyor...</p>';

    db.collection('security_events').orderBy('ts','desc').limit(100).get()
      .then(function(snap){
        if(snap.empty){
          summary.innerHTML = '';
          list.innerHTML = '<p style="color:#4caf50;text-align:center;padding:30px;font-size:14px">✅ Şu an için güvenlik olayı yok.</p>';
          return;
        }

        // Sayaçlar
        var counts = {};
        snap.forEach(function(d){ var t = d.data().type; counts[t] = (counts[t]||0)+1; });
        summary.innerHTML = Object.keys(counts).map(function(t){
          var m = EVENT_LABELS[t] || { icon:'⚠️', label:t, color:'#aaa' };
          return '<div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 14px;text-align:center;min-width:110px">'
            + '<div style="font-size:1.4rem">' + m.icon + '</div>'
            + '<div style="font-size:1.3rem;font-weight:800;color:' + m.color + '">' + counts[t] + '</div>'
            + '<div style="font-size:10px;color:#888;margin-top:2px">' + m.label + '</div>'
            + '</div>';
        }).join('');

        // Liste
        var rows = '';
        snap.forEach(function(doc){
          var d  = doc.data();
          var m  = EVENT_LABELS[d.type] || { icon:'⚠️', label: d.type, color:'#aaa' };
          var ts = d.ts ? new Date(d.ts.toMillis()).toLocaleString('tr-TR') : '—';
          rows += '<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-left:3px solid ' + m.color + ';border-radius:10px;padding:11px 13px;margin-bottom:7px">'
            + '<div style="display:flex;align-items:center;gap:7px;margin-bottom:4px">'
            + '<span>' + m.icon + '</span>'
            + '<span style="font-weight:700;color:' + m.color + ';font-size:12px">' + m.label + '</span>'
            + '<span style="margin-left:auto;color:#555;font-size:11px">' + ts + '</span>'
            + '</div>'
            + '<div style="font-size:11px;color:#999">👤 ' + (d.email || d.uid || '?') + '</div>'
            + (d.detail ? '<div style="font-size:10px;color:#666;margin-top:2px;word-break:break-all">' + String(d.detail).slice(0,150) + '</div>' : '')
            + '<div style="font-size:10px;color:#444;margin-top:2px">' + String(d.ua||'').slice(0,90) + '</div>'
            + '</div>';
        });
        list.innerHTML = rows;
      })
      .catch(function(err){
        list.innerHTML = '<p style="color:#ff4444;padding:20px;font-size:13px">Hata: ' + err.message + '</p>';
      });
  }

  function openAdminPanel(){
    var modal = document.getElementById('sec-admin-modal');
    if(!modal) return;
    modal.style.display = 'block';
    loadEvents();
  }

  // ── Admin butonu ─────────────────────────────────────────
  function addAdminButton(){
    if(document.getElementById('sec-admin-btn')) return;
    var btn = document.createElement('button');
    btn.id = 'sec-admin-btn';
    btn.title = 'Güvenlik Paneli';
    btn.textContent = '🛡️';
    btn.style.cssText = 'position:fixed;bottom:80px;right:16px;z-index:9999;width:44px;height:44px;border-radius:50%;background:rgba(124,58,237,0.85);border:none;font-size:1.2rem;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.4);backdrop-filter:blur(4px)';
    btn.addEventListener('click', openAdminPanel);
    document.body.appendChild(btn);
  }

  // ── Admin hazır olunca kur ───────────────────────────────
  var _ready = false;
  var _check = setInterval(function(){
    if(_ready) return;
    if(!window.authManager) return;
    if(window.authManager.isLoggedIn){
      _ready = true;
      clearInterval(_check);
      if(isAdmin()){
        buildAdminPanel();
        addAdminButton();
      }
    }
  }, 1500);

})();
