// ── Security Logger — Sadece olay kuyruğu & Firestore gönderimi ──────────
(function(){
  'use strict';

  /* ── Kuyruk — security.js tarafından doldurulur ─────────────── */
  window._secQueue = window._secQueue || [];

  /* ── Firestore'a gönder ──────────────────────────────────────── */
  function db(){ return window.firebase && window.firebase.firestore && window.firebase.firestore(); }

  function flushQueue(){
    var q = window._secQueue || [];
    if(!q.length) return;
    window._secQueue = [];
    var d   = db();
    var auth = window.authManager;
    if(!d) return;
    q.forEach(function(ev){
      try {
        d.collection('security_events').add({
          type:   ev.type,
          detail: ev.detail || '',
          uid:    (auth && auth.uid)   || 'anonymous',
          email:  (auth && auth.email) || 'anonymous',
          ts:     window.firebase.firestore.FieldValue.serverTimestamp(),
          ua:     ev.ua  || navigator.userAgent.slice(0,200),
          url:    ev.url || location.pathname
        });
      } catch(ex){}
    });
  }

  setInterval(function(){
    if(window.authManager && window.authManager.isLoggedIn) flushQueue();
  }, 10000);

})();
