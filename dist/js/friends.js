/* ── Friends / Social System ── */
(function(){
  'use strict';

  var db, uid;

  function ready(){
    if(!window.authManager || !window.authManager.isLoggedIn) return false;
    db  = window.authManager._db;
    uid = window.authManager.uid;
    return !!(db && uid);
  }

  /* ── Friend code: first 7 chars of UID (uppercase) ── */
  function myCode(){ return uid ? uid.slice(0,7).toUpperCase() : '?'; }

  /* ── Register own code in Firestore ── */
  function registerCode(){
    if(!ready()) return;
    db.collection('friendCodes').doc(myCode())
      .set({ uid: uid }, { merge: true })
      .catch(function(e){ console.warn('[FR] registerCode:', e); });
  }

  /* ── Add friend by code ── */
  function addFriend(code, cb){
    if(!ready()) return cb(null, 'Giriş yapılmamış');
    code = (code||'').trim().toUpperCase();
    if(!code)           return cb(null, 'Kod boş');
    if(code === myCode()) return cb(null, 'Bu senin kendi kodun 😄');
    db.collection('friendCodes').doc(code).get()
      .then(function(snap){
        if(!snap.exists) return cb(null, 'Kullanıcı bulunamadı');
        var friendUid = snap.data().uid;
        return db.collection('users').doc(uid)
          .collection('friends').doc(friendUid)
          .set({ uid: friendUid, addedAt: Date.now() })
          .then(function(){ cb(friendUid, null); });
      })
      .catch(function(e){ cb(null, e.message||'Bir hata oluştu'); });
  }

  /* ── Remove friend ── */
  function removeFriend(friendUid, cb){
    if(!ready()) return;
    db.collection('users').doc(uid).collection('friends').doc(friendUid)
      .delete()
      .then(function(){ cb && cb(); })
      .catch(function(e){ cb && cb(e); });
  }

  /* ── Load friend list from Firestore ── */
  function loadFriends(cb){
    if(!ready()) return cb([]);
    db.collection('users').doc(uid).collection('friends').get()
      .then(function(snap){
        var list = [];
        snap.forEach(function(d){ list.push(d.data()); });
        cb(list);
      })
      .catch(function(){ cb([]); });
  }

  /* ── Get current ISO week string ── */
  function _thisWeek(){
    var d   = new Date();
    var jan = new Date(d.getFullYear(), 0, 1);
    var wk  = Math.ceil((((d - jan) / 86400000) + jan.getDay() + 1) / 7);
    return d.getFullYear() + '-W' + (wk < 10 ? '0' : '') + wk;
  }

  /* ── Load leaderboard scores for friends + self ── */
  function loadFriendScores(friendUids, cb){
    if(!db) return cb([]);
    var lbm = window.leaderboardManager;
    var periodId = (lbm && lbm._periodId)
      ? lbm._periodId('weekly')
      : ('weekly_' + _thisWeek());

    var allUids = friendUids.slice();
    if(allUids.indexOf(uid) < 0) allUids.push(uid);

    var promises = allUids.map(function(fuid){
      return db.collection('leaderboards').doc(periodId)
        .collection('users').doc(fuid).get()
        .then(function(s){ return s.exists ? s.data() : null; })
        .catch(function(){ return null; });
    });

    Promise.all(promises).then(function(results){
      var data = results.filter(Boolean);
      data.sort(function(a,b){ return (b.xp||0) - (a.xp||0); });
      cb(data);
    });
  }

  /* ══════════════════════════════════════════════
     UI
  ══════════════════════════════════════════════ */

  function injectTab(){
    var tabs = document.querySelector('.lb-tabs');
    if(!tabs) return;
    if(tabs.querySelector('[data-period="friends"]')) return; /* already in DOM */
    var btn = document.createElement('button');
    btn.className = 'lb-tab';
    btn.setAttribute('data-period', 'friends');
    btn.textContent = '👫 Arkadaşlar';
    tabs.appendChild(btn);
  }

  function renderFriendsPanel(){
    var root = document.getElementById('leaderboard-root');
    if(!root) return;

    /* hide existing lb content */
    root.querySelectorAll(':scope > *:not(#fr-panel)').forEach(function(el){
      el.style.display = 'none';
    });

    var existing = document.getElementById('fr-panel');
    if(existing) return; /* already rendered */

    var code  = myCode();
    var panel = document.createElement('div');
    panel.id        = 'fr-panel';
    panel.className = 'fr-panel';
    panel.innerHTML =
      '<div class="fr-code-section">' +
        '<div class="fr-section-label">Arkadaş Kodun</div>' +
        '<div class="fr-code-row">' +
          '<span class="fr-code-val" id="fr-my-code">' + code + '</span>' +
          '<button class="fr-copy-btn" id="fr-copy-btn" title="Kopyala">📋</button>' +
        '</div>' +
        '<div class="fr-code-hint">Bu kodu arkadaşlarınla paylaş</div>' +
      '</div>' +
      '<div class="fr-add-section">' +
        '<div class="fr-section-label">Arkadaş Ekle</div>' +
        '<div class="fr-add-row">' +
          '<input class="fr-add-input" id="fr-add-input" maxlength="7"' +
            ' placeholder="Kod gir (örn: A3F2B1C)" autocomplete="off" />' +
          '<button class="fr-add-btn" id="fr-add-btn">Ekle</button>' +
        '</div>' +
        '<div class="fr-add-msg" id="fr-add-msg"></div>' +
      '</div>' +
      '<div class="fr-board-section">' +
        '<div class="fr-section-label">Haftalık Sıralama</div>' +
        '<div class="fr-board-list" id="fr-board-list">' +
          '<div class="fr-loading">Yükleniyor…</div>' +
        '</div>' +
      '</div>';

    root.appendChild(panel);

    /* Copy button */
    document.getElementById('fr-copy-btn').addEventListener('click', function(){
      var btn = this;
      if(navigator.clipboard){
        navigator.clipboard.writeText(code).catch(function(){});
      } else {
        var ta = document.createElement('textarea');
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      btn.textContent = '✅';
      setTimeout(function(){ btn.textContent = '📋'; }, 1400);
    });

    /* Add friend */
    document.getElementById('fr-add-btn').addEventListener('click', function(){
      var val = (document.getElementById('fr-add-input').value || '').trim();
      var msg = document.getElementById('fr-add-msg');
      if(msg){ msg.textContent = ''; msg.className = 'fr-add-msg'; }
      addFriend(val, function(fuid, err){
        if(msg){
          msg.textContent = err || '✅ Arkadaş eklendi!';
          msg.className   = 'fr-add-msg ' + (err ? 'fr-msg-err' : 'fr-msg-ok');
        }
        if(!err){
          var inp = document.getElementById('fr-add-input');
          if(inp) inp.value = '';
          _refreshBoard();
        }
      });
    });

    /* Enter key on input */
    document.getElementById('fr-add-input').addEventListener('keydown', function(e){
      if(e.key === 'Enter') document.getElementById('fr-add-btn').click();
    });

    _refreshBoard();
  }

  function _refreshBoard(){
    loadFriends(function(list){
      var friendUids = list.map(function(f){ return f.uid; });
      loadFriendScores(friendUids, function(scores){
        _renderBoard(scores, friendUids);
      });
    });
  }

  function _renderBoard(scores, friendUids){
    var listEl = document.getElementById('fr-board-list');
    if(!listEl) return;
    if(!scores.length){
      listEl.innerHTML =
        '<div class="fr-empty">Henüz arkadaş yok.<br>Kodunu paylaş ve ekle! 👫</div>';
      return;
    }
    var medals = ['🥇','🥈','🥉'];
    var html = '';
    scores.forEach(function(s, i){
      var isMe     = (s.uid === uid);
      var isFriend = (friendUids.indexOf(s.uid) >= 0);
      var rank     = medals[i] || ((i + 1) + '.');
      html +=
        '<div class="fr-row' + (isMe ? ' fr-row-me' : '') + '">' +
          '<div class="fr-rank">' + rank + '</div>' +
          '<div class="fr-avatar">' + (s.avatar || '🦊') + '</div>' +
          '<div class="fr-info">' +
            '<div class="fr-name">' + (s.name || 'Misafir') +
              (isMe ? ' <span class="fr-you">(sen)</span>' : '') +
            '</div>' +
            '<div class="fr-xp">⚡ ' + (s.xp || 0) + ' XP · Lv ' + (s.level || 1) + '</div>' +
          '</div>' +
          (isFriend && !isMe
            ? '<button class="fr-rm-btn" data-fuid="' + s.uid + '" title="Arkadaşı kaldır">✕</button>'
            : '') +
        '</div>';
    });
    listEl.innerHTML = html;

    listEl.querySelectorAll('.fr-rm-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        var fuid = btn.getAttribute('data-fuid');
        btn.disabled = true;
        removeFriend(fuid, function(){ _refreshBoard(); });
      });
    });
  }

  function hideFriendsPanel(){
    var panel = document.getElementById('fr-panel');
    if(panel) panel.parentNode && panel.parentNode.removeChild(panel);
    var root = document.getElementById('leaderboard-root');
    if(root){
      root.querySelectorAll(':scope > *').forEach(function(el){
        el.style.display = '';
      });
    }
  }

  /* ── Tab click delegation (capture phase, before lb's own handler) ── */
  var _delegated = false;
  function attachDelegate(){
    if(_delegated) return;
    _delegated = true;
    document.addEventListener('click', function(e){
      var tab = e.target && e.target.closest && e.target.closest('.lb-tab[data-period]');
      if(!tab) return;
      var period = tab.getAttribute('data-period');
      if(period === 'friends'){
        e.stopImmediatePropagation();
        document.querySelectorAll('.lb-tab').forEach(function(t){ t.classList.remove('active'); });
        tab.classList.add('active');
        renderFriendsPanel();
      } else {
        hideFriendsPanel();
      }
    }, true);
  }

  /* ── Init ── */
  window.FriendsManager = {
    init: function(){
      if(!ready()){
        setTimeout(function(){ window.FriendsManager.init(); }, 900);
        return;
      }
      registerCode();
      attachDelegate();

      var obs = new MutationObserver(function(){
        if(document.querySelector('.lb-tabs')) injectTab();
      });
      var mc = document.getElementById('main-content');
      if(mc) obs.observe(mc, { childList: true, subtree: true });
      /* inject immediately if leaderboard is already open */
      if(document.querySelector('.lb-tabs')) injectTab();
    }
  };

})();
