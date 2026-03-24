/* ── Friends / Social System v2 ── */
(function(){
  'use strict';

  var db, uid, myName, myAvatar;

  function ready(){
    if(!window.authManager || !window.authManager.isLoggedIn) return false;
    db       = window.authManager._db;
    uid      = window.authManager.uid;
    myName   = window.authManager.displayName || 'Kullanıcı';
    myAvatar = '🦊';
    return !!(db && uid);
  }

  /* ── Friend code ── */
  function myCode(){ return uid ? uid.slice(0,7).toUpperCase() : '?'; }

  /* ── Register own code ── */
  function registerCode(){
    if(!ready()) return;
    db.collection('friendCodes').doc(myCode())
      .set({ uid: uid }, { merge: true })
      .catch(function(e){ console.warn('[FR] code reg:', e); });
  }

  /* ── Add friend by code (one-way follow) ── */
  function addFriend(code, cb){
    if(!ready()) return cb(null, 'Giriş yapılmamış');
    code = (code||'').trim().toUpperCase();
    if(!code)             return cb(null, 'Kod boş');
    if(code === myCode()) return cb(null, 'Bu senin kendi kodun 😄');
    db.collection('friendCodes').doc(code).get()
      .then(function(snap){
        if(!snap.exists) return cb(null, 'Kullanıcı bulunamadı');
        var friendUid = snap.data().uid;
        // Check already friend
        return db.collection('users').doc(uid).collection('friends').doc(friendUid).get()
          .then(function(fs){
            if(fs.exists) return cb(null, 'Zaten arkadaşsınız 😊');
            return db.collection('users').doc(uid).collection('friends').doc(friendUid)
              .set({ uid: friendUid, addedAt: Date.now() })
              .then(function(){ cb(friendUid, null); });
          });
      })
      .catch(function(e){ cb(null, e.message||'Bir hata oluştu'); });
  }

  /* ── Remove friend ── */
  function removeFriend(friendUid, cb){
    if(!ready()) return;
    db.collection('users').doc(uid).collection('friends').doc(friendUid)
      .delete().then(function(){ cb && cb(); }).catch(function(e){ cb && cb(e); });
  }

  /* ── Load friend list ── */
  function loadFriends(cb){
    if(!ready()) return cb([]);
    db.collection('users').doc(uid).collection('friends').get()
      .then(function(snap){
        var list = [];
        snap.forEach(function(d){ list.push(d.data()); });
        cb(list);
      }).catch(function(){ cb([]); });
  }

  /* ── Send challenge ── */
  function sendChallenge(friendUid, friendName, cb){
    if(!ready()) return cb && cb('Giriş yapılmamış');
    var data = {
      fromUid:    uid,
      fromName:   myName,
      fromAvatar: myAvatar,
      fromCode:   myCode(),
      type:       'quiz',
      sentAt:     Date.now(),
      status:     'pending'
    };
    db.collection('users').doc(friendUid).collection('challenges').doc(uid)
      .set(data)
      .then(function(){ cb && cb(null); })
      .catch(function(e){ cb && cb(e.message||'Hata'); });
  }

  /* ── Load incoming challenges ── */
  function loadChallenges(cb){
    if(!ready()) return cb([]);
    db.collection('users').doc(uid).collection('challenges').get()
      .then(function(snap){
        var list = [];
        snap.forEach(function(d){ list.push(Object.assign({ _id: d.id }, d.data())); });
        cb(list);
      }).catch(function(){ cb([]); });
  }

  /* ── Delete challenge ── */
  function deleteChallenge(challengeId, cb){
    if(!ready()) return;
    db.collection('users').doc(uid).collection('challenges').doc(challengeId)
      .delete().then(function(){ cb && cb(); }).catch(function(){ cb && cb(); });
  }

  /* ── Week string ── */
  function _thisWeek(){
    var d = new Date(), jan = new Date(d.getFullYear(), 0, 1);
    var wk = Math.ceil((((d - jan) / 86400000) + jan.getDay() + 1) / 7);
    return d.getFullYear() + '-W' + (wk < 10 ? '0' : '') + wk;
  }

  /* ── Leaderboard scores ── */
  function loadFriendScores(friendUids, period, cb){
    if(!db) return cb([]);
    var lbm = window.leaderboardManager;
    var periodId = (lbm && lbm._periodId)
      ? lbm._periodId(period||'weekly')
      : ((period||'weekly') + '_' + _thisWeek());

    var allUids = friendUids.slice();
    if(allUids.indexOf(uid) < 0) allUids.push(uid);

    Promise.all(allUids.map(function(fuid){
      return db.collection('leaderboards').doc(periodId)
        .collection('users').doc(fuid).get()
        .then(function(s){ return s.exists ? s.data() : null; })
        .catch(function(){ return null; });
    })).then(function(results){
      var data = results.filter(Boolean);
      data.sort(function(a,b){ return (b.xp||0) - (a.xp||0); });
      cb(data);
    });
  }

  /* ═══════════════════════════════════════
     UI
  ═══════════════════════════════════════ */

  var _activePeriod = 'weekly'; /* weekly | monthly */

  /* ── Tab (with badge) ── */
  function injectTab(){
    var tabs = document.querySelector('.lb-tabs');
    if(!tabs) return;
    if(tabs.querySelector('[data-period="friends"]')) return;
    var btn = document.createElement('button');
    btn.className = 'lb-tab';
    btn.setAttribute('data-period', 'friends');
    btn.innerHTML = '👫 Arkadaşlar<span class="fr-tab-badge" id="fr-tab-badge" style="display:none">0</span>';
    tabs.appendChild(btn);
    _updateBadge();
  }

  function _updateBadge(){
    loadChallenges(function(list){
      var cnt = list.length;
      var badge = document.getElementById('fr-tab-badge');
      if(!badge) return;
      if(cnt > 0){
        badge.textContent = cnt;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    });
  }

  /* ── Render full panel ── */
  function renderFriendsPanel(){
    var root = document.getElementById('leaderboard-root');
    if(!root) return;

    root.querySelectorAll(':scope > *:not(#fr-panel)').forEach(function(el){
      el.style.display = 'none';
    });
    var old = document.getElementById('fr-panel');
    if(old) old.parentNode.removeChild(old);

    var code  = myCode();
    var panel = document.createElement('div');
    panel.id        = 'fr-panel';
    panel.className = 'fr-panel';

    panel.innerHTML =
      /* ── Code & Share ── */
      '<div class="fr-code-section">' +
        '<div class="fr-section-label">Arkadaş Kodun</div>' +
        '<div class="fr-code-row">' +
          '<span class="fr-code-val">' + code + '</span>' +
          '<button class="fr-icon-btn" id="fr-copy-btn" title="Kopyala">📋</button>' +
          '<button class="fr-icon-btn" id="fr-share-btn" title="Paylaş">🔗</button>' +
        '</div>' +
        '<div class="fr-code-hint">Bu kodu arkadaşlarınla paylaşarak onları ekleyebilirler</div>' +
      '</div>' +

      /* ── Incoming challenges ── */
      '<div class="fr-challenges-section" id="fr-challenges-section" style="display:none">' +
        '<div class="fr-section-label fr-challenge-label">⚔️ Gelen Meydan Okumalar</div>' +
        '<div id="fr-challenges-list"></div>' +
      '</div>' +

      /* ── Add friend ── */
      '<div class="fr-add-section">' +
        '<div class="fr-section-label">Arkadaş Ekle</div>' +
        '<div class="fr-add-row">' +
          '<input class="fr-add-input" id="fr-add-input" maxlength="7"' +
            ' placeholder="Kod gir (örn: A3F2B1C)" autocomplete="off" />' +
          '<button class="fr-add-btn" id="fr-add-btn">Ekle</button>' +
        '</div>' +
        '<div class="fr-add-msg" id="fr-add-msg"></div>' +
      '</div>' +

      /* ── Period toggle + Leaderboard ── */
      '<div class="fr-board-section">' +
        '<div class="fr-board-header">' +
          '<div class="fr-section-label" style="margin:0">Sıralama</div>' +
          '<div class="fr-period-tabs">' +
            '<button class="fr-period-tab fr-period-active" data-p="weekly">Haftalık</button>' +
            '<button class="fr-period-tab" data-p="monthly">Aylık</button>' +
          '</div>' +
          '<button class="fr-refresh-btn" id="fr-refresh-btn" title="Yenile">↻</button>' +
        '</div>' +
        '<div class="fr-board-list" id="fr-board-list"><div class="fr-loading">Yükleniyor…</div></div>' +
      '</div>';

    root.appendChild(panel);

    /* Copy */
    document.getElementById('fr-copy-btn').addEventListener('click', function(){
      var btn = this;
      var txt = 'English Rhapsody arkadaş kodum: ' + code + '\nUygulama: https://englishrhapsody-78866.web.app';
      if(navigator.clipboard){
        navigator.clipboard.writeText(txt).catch(function(){});
      } else {
        var ta = document.createElement('textarea');
        ta.value = txt; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy');
        document.body.removeChild(ta);
      }
      btn.textContent = '✅';
      setTimeout(function(){ btn.textContent = '📋'; }, 1500);
    });

    /* Native Share */
    document.getElementById('fr-share-btn').addEventListener('click', function(){
      var shareData = {
        title: 'English Rhapsody',
        text: 'Benimle English Rhapsody\'de yarış! Arkadaş kodum: ' + code,
        url: 'https://englishrhapsody-78866.web.app'
      };
      if(navigator.share){
        navigator.share(shareData).catch(function(){});
      } else {
        /* Fallback: copy */
        document.getElementById('fr-copy-btn').click();
      }
    });

    /* Add friend */
    document.getElementById('fr-add-btn').addEventListener('click', _doAddFriend);
    document.getElementById('fr-add-input').addEventListener('keydown', function(e){
      if(e.key === 'Enter') _doAddFriend();
    });

    /* Period tabs */
    panel.querySelectorAll('.fr-period-tab').forEach(function(tab){
      tab.addEventListener('click', function(){
        panel.querySelectorAll('.fr-period-tab').forEach(function(t){ t.classList.remove('fr-period-active'); });
        tab.classList.add('fr-period-active');
        _activePeriod = tab.getAttribute('data-p');
        _refreshBoard();
      });
    });

    /* Refresh */
    document.getElementById('fr-refresh-btn').addEventListener('click', function(){
      var btn = this;
      btn.classList.add('fr-spinning');
      _refreshAll(function(){ btn.classList.remove('fr-spinning'); });
    });

    _refreshAll(null);
  }

  function _doAddFriend(){
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
  }

  function _refreshAll(done){
    var pending = 2;
    function finish(){ if(--pending === 0 && done) done(); }
    _refreshChallenges(finish);
    _refreshBoard(finish);
  }

  /* ── Challenges ── */
  function _refreshChallenges(done){
    loadChallenges(function(list){
      _renderChallenges(list);
      _updateBadge();
      done && done();
    });
  }

  function _renderChallenges(list){
    var sec = document.getElementById('fr-challenges-section');
    var lst = document.getElementById('fr-challenges-list');
    if(!sec || !lst) return;
    if(!list.length){ sec.style.display = 'none'; return; }
    sec.style.display = 'block';
    var html = '';
    list.forEach(function(c){
      html +=
        '<div class="fr-challenge-row" data-cid="' + c._id + '">' +
          '<div class="fr-challenge-icon">⚔️</div>' +
          '<div class="fr-challenge-info">' +
            '<div class="fr-challenge-name">' + (c.fromName||'Biri') + ' seni quiz\'e davet etti!</div>' +
            '<div class="fr-challenge-sub">Kod: ' + (c.fromCode||'?') + ' · Kim daha iyi öğrenir? 🎯</div>' +
          '</div>' +
          '<div class="fr-challenge-btns">' +
            '<button class="fr-ch-accept" data-cid="' + c._id + '">Kabul Et</button>' +
            '<button class="fr-ch-decline" data-cid="' + c._id + '">Geç</button>' +
          '</div>' +
        '</div>';
    });
    lst.innerHTML = html;

    lst.querySelectorAll('.fr-ch-accept').forEach(function(btn){
      btn.addEventListener('click', function(){
        var cid = btn.getAttribute('data-cid');
        deleteChallenge(cid, function(){
          _refreshChallenges(null);
        });
        if(window._app && window._app.navigate) window._app.navigate('learn');
      });
    });
    lst.querySelectorAll('.fr-ch-decline').forEach(function(btn){
      btn.addEventListener('click', function(){
        var cid = btn.getAttribute('data-cid');
        deleteChallenge(cid, function(){ _refreshChallenges(null); });
      });
    });
  }

  /* ── Board ── */
  function _refreshBoard(done){
    loadFriends(function(list){
      var friendUids = list.map(function(f){ return f.uid; });
      loadFriendScores(friendUids, _activePeriod, function(scores){
        _renderBoard(scores, friendUids);
        done && done();
      });
    });
  }

  function _renderBoard(scores, friendUids){
    var listEl = document.getElementById('fr-board-list');
    if(!listEl) return;
    if(!scores.length){
      listEl.innerHTML = '<div class="fr-empty">Henüz arkadaş yok.<br>Kodunu paylaş ve başla! 👫</div>';
      return;
    }
    var medals = ['🥇','🥈','🥉'];
    var html   = '';
    scores.forEach(function(s, i){
      var isMe     = (s.uid === uid);
      var isFriend = (friendUids.indexOf(s.uid) >= 0);
      var rank     = medals[i] || ((i+1)+'.');
      var streak   = s.streak ? '🔥' + s.streak : '';
      html +=
        '<div class="fr-row' + (isMe ? ' fr-row-me' : '') + '">' +
          '<div class="fr-rank">' + rank + '</div>' +
          '<div class="fr-avatar">' + (s.avatar||'🦊') + '</div>' +
          '<div class="fr-info">' +
            '<div class="fr-name">' + _esc(s.name||'Misafir') +
              (isMe ? ' <span class="fr-you">sen</span>' : '') +
            '</div>' +
            '<div class="fr-xp">⚡ ' + (s.xp||0) + ' XP · Lv ' + (s.level||1) +
              (streak ? ' · ' + streak : '') +
            '</div>' +
          '</div>' +
          '<div class="fr-row-actions">' +
            (isFriend && !isMe
              ? '<button class="fr-challenge-btn" data-fuid="' + s.uid + '" data-fname="' + _esc(s.name||'Arkadaş') + '" title="Meydan oku">⚔️</button>' +
                '<button class="fr-rm-btn" data-fuid="' + s.uid + '" title="Kaldır">✕</button>'
              : '') +
          '</div>' +
        '</div>';
    });
    listEl.innerHTML = html;

    /* Challenge buttons */
    listEl.querySelectorAll('.fr-challenge-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        var fuid  = btn.getAttribute('data-fuid');
        var fname = btn.getAttribute('data-fname');
        btn.disabled    = true;
        btn.textContent = '⏳';
        sendChallenge(fuid, fname, function(err){
          if(err){
            btn.textContent = '⚔️';
            btn.disabled    = false;
          } else {
            btn.textContent = '✅';
            setTimeout(function(){
              btn.textContent = '⚔️';
              btn.disabled    = false;
            }, 2000);
          }
        });
      });
    });

    /* Remove buttons */
    listEl.querySelectorAll('.fr-rm-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        btn.disabled = true;
        removeFriend(btn.getAttribute('data-fuid'), function(){ _refreshBoard(null); });
      });
    });
  }

  function _esc(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── Hide panel ── */
  function hideFriendsPanel(){
    var panel = document.getElementById('fr-panel');
    if(panel) panel.parentNode && panel.parentNode.removeChild(panel);
    var root = document.getElementById('leaderboard-root');
    if(root) root.querySelectorAll(':scope > *').forEach(function(el){ el.style.display = ''; });
  }

  /* ── Tab delegation ── */
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
      /* Poll badge every 60s */
      setInterval(_updateBadge, 60000);

      var obs = new MutationObserver(function(){
        if(document.querySelector('.lb-tabs')){ injectTab(); _updateBadge(); }
      });
      var mc = document.getElementById('main-content');
      if(mc) obs.observe(mc, { childList: true, subtree: true });
      if(document.querySelector('.lb-tabs')){ injectTab(); _updateBadge(); }
    }
  };

})();
