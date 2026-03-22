/* English Rhapsody — boot.js
   Inline script blocks extracted from index.html for CSP compliance.
   Loaded via <script src="js/boot.js" defer></script> */

/* ── 0. Capacitor native plugin kaydı ── */
(function () {
  if (window.Capacitor && typeof window.Capacitor.registerPlugin === 'function') {
    window.Capacitor.Plugins = window.Capacitor.Plugins || {};
    window.Capacitor.Plugins.NativeSpeech = window.Capacitor.registerPlugin('NativeSpeech');
  }
})();

/* ── 1. Lazy Script Loader ── */
(function () {
  var LAZY = {
    quantum: ['js/quantum.js'],
    bridge:  ['js/bridge-data.js'],
    nexus:   ['js/phrasal_verbs_ext.js', 'js/phrasal_verbs_ext2.js'],
    phrases: ['js/phrasal_verbs_ext.js', 'js/phrasal_verbs_ext2.js'],
  };

  var loaded = new Set();
  var pending = {};

  function loadScript(src) {
    if (loaded.has(src)) return Promise.resolve();
    if (pending[src]) return pending[src];
    pending[src] = new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { loaded.add(src); delete pending[src]; resolve(); };
      s.onerror = function () { loaded.add(src); delete pending[src]; resolve(); };
      document.head.appendChild(s);
    });
    return pending[src];
  }

  function ensureScripts(target) {
    var srcs = LAZY[target];
    if (!srcs) return Promise.resolve();
    return srcs.reduce(function (chain, src) {
      return chain.then(function () { return loadScript(src); });
    }, Promise.resolve());
  }

  function allLoaded(target) {
    var srcs = LAZY[target];
    return !srcs || srcs.every(function (s) { return loaded.has(s); });
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-target]');
    if (!el) return;
    var target = el.dataset.target;
    if (!target || !LAZY[target] || allLoaded(target)) return;

    e.stopImmediatePropagation();
    e.preventDefault();

    document.querySelectorAll('.modes-drawer.open').forEach(function (d) { d.classList.remove('open'); });
    document.querySelectorAll('.modes-drawer-backdrop.open').forEach(function (d) { d.classList.remove('open'); });

    ensureScripts(target).then(function () {
      if (window._app && window._app.navigate) {
        window._app.navigate(target);
      } else {
        el.click();
      }
    });
  }, true);

  window.addEventListener('load', function () {
    setTimeout(function () {
      var seen = new Set();
      Object.values(LAZY).forEach(function (srcs) {
        srcs.forEach(function (src) {
          if (seen.has(src) || loaded.has(src)) return;
          seen.add(src);
          var link = document.createElement('link');
          link.rel = 'prefetch';
          link.as = 'script';
          link.href = src;
          document.head.appendChild(link);
        });
      });
    }, 3000);
  });
})();

/* ── 2. Mobile nav behavior ── */
(function(){
  var MODE_VIEWS=new Set(['learn','reading','speak','bridge','nexus','quantum','conversations','leaderboard','placement','cinema']);
  var HIDE_MS=2000;

  function setup(){
    var app=window._app||window.app;
    if(!app||!app._showMobileNav){setTimeout(setup,150);return;}

    app._navLocked=false;

    app._showMobileNav=function(){
      var nav=document.getElementById('mobile-nav');
      var tab=document.getElementById('sidebar-tab');
      if(!nav)return;
      var inMode=MODE_VIEWS.has(app.session&&app.session.view)||!!document.getElementById('cinema-mount-point');
      if(inMode&&app._navLocked)return;
      nav.classList.remove('nav-hidden');
      if(tab)tab.classList.remove('visible');
      clearTimeout(app._navHideTimer);
      if(inMode){
        app._navHideTimer=setTimeout(function(){
          if(MODE_VIEWS.has(app.session&&app.session.view)||!!document.getElementById('cinema-mount-point')){
            nav.classList.add('nav-hidden');
            if(tab)tab.classList.add('visible');
            app._navLocked=true;
          }
        },HIDE_MS);
      } else {
        app._navLocked=false;
      }
    };

    var lastTap=0;
    document.addEventListener('touchend',function(e){
      if(e.target.closest('.mobile-nav,#mobile-nav,.m-nav-item'))return;
      var now=Date.now();
      if(now-lastTap<320){
        var nav=document.getElementById('mobile-nav');
        if(nav&&nav.classList.contains('nav-hidden')){
          // Modlardayken double-tap → sadece NAVIGASYON sheet açılsın, mobile nav açılmasın
          if(document.body.classList.contains('er-in-mode')){lastTap=0;return;}
          app._navLocked=false;
          app._showMobileNav();
        }
        lastTap=0;
      } else {
        lastTap=now;
      }
    },{passive:true});
  }

  window.addEventListener('load',setup);
})();

/* ── 3. Nexus intro scroll lock ── */
(function(){
  if(window.innerWidth > 768) return;
  var obs = new MutationObserver(function() {
    var shell = document.querySelector('.nexus-shell');
    if(!shell) return;
    var isIntro = !!shell.querySelector('.nexus-mode-selector');
    var isSynth = !!shell.querySelector('.synth-game-container');
    var isNetwork = !!shell.querySelector('#nexus-board');
    shell.classList.toggle('nexus-intro-lock', isIntro);
    shell.classList.toggle('nexus-synth-lock', isSynth);
    shell.classList.toggle('nexus-network-lock', isNetwork);
  });
  window.addEventListener('load', function() {
    obs.observe(document.body, { childList:true, subtree:true });
  });
})();

/* ── 4. PWA Install Prompt — devre dışı ── */
window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); });

/* ── 5. Flashcard Game ── */
(function(){
  var fc = {
    queue:[], idx:0, know:0, dontKnow:0, flipped:false,

    init: function(){
      var app = window._app || window.app;
      var mastery = (app && app.state && app.state.get('mastery')) || {};
      var words = (typeof WORDS !== 'undefined' ? WORDS : (window.WORDS || []));
      var srs   = (typeof SRS   !== 'undefined' ? SRS   : window.SRS) || null;
      var due = (srs && words.length) ? srs.getDue(words, mastery) : words;
      var pool = due.length >= 5 ? due : words;
      this.queue = pool.slice().sort(function(){ return Math.random()-.5; }).slice(0,20);
      this.idx = 0; this.know = 0; this.dontKnow = 0; this.flipped = false;
      this._render();
      this._bindEvents();
    },

    _render: function(){
      var w = this.queue[this.idx];
      if(!w){ this._showResult(); return; }
      if(this.idx > 0 && this.idx % 10 === 0 && window.innerWidth > 768){
        this._showQuiz(); return;
      }
      var card = document.getElementById('fc-card');
      if(!card) return;
      card.classList.remove('is-flipped','fc-out-up','fc-out-down','fc-glow-yes','fc-glow-no');
      this.flipped = false;
      document.getElementById('fc-icon').textContent = w.icon || '\uD83D\uDCDA';
      document.getElementById('fc-en').textContent   = w.en;
      document.getElementById('fc-ipa').textContent  = w.ipa || '';
      document.getElementById('fc-tr').textContent   = w.tr;
      document.getElementById('fc-ex').textContent   = w.ex || '';
      var exTrEl = document.getElementById('fc-ex-tr');
      if(exTrEl){ var exTrVal = (typeof EX_TR !== 'undefined' && w.id ? EX_TR[w.id] : null) || w.ex_tr || ''; exTrEl.textContent = exTrVal ? '(' + exTrVal + ')' : ''; }
      document.getElementById('fc-lvl').textContent  = w.level || '';
      var total = this.queue.length;
      document.getElementById('fc-counter').textContent = (this.idx+1) + ' / ' + total;
      document.getElementById('fc-prog').style.width = (this.idx / total * 100) + '%';
    },

    _showQuiz: function(){
      var stage = document.getElementById('fc-stage');
      if(!stage) return;
      var w = this.queue[this.idx];
      var wrongs = this.queue.filter(function(x){ return x.en !== w.en; });
      var wrong = wrongs[Math.floor(Math.random() * wrongs.length)] || {en: 'unknown', tr: '?'};
      var choices = [w, wrong].sort(function(){ return Math.random() - 0.5; });
      var self = this;
      var total = this.queue.length;
      document.getElementById('fc-counter').textContent = (this.idx+1) + ' / ' + total;
      document.getElementById('fc-prog').style.width = (this.idx / total * 100) + '%';

      var wrap = document.querySelector('.fc-card-wrap');
      var existing = document.getElementById('fc-quiz-overlay');
      if(existing) existing.remove();
      var overlay = document.createElement('div');
      overlay.id = 'fc-quiz-overlay';
      overlay.className = 'fc-quiz-overlay';

      var quizWrap = document.createElement('div');
      quizWrap.className = 'fc-quiz-wrap';

      var label = document.createElement('div');
      label.className = 'fc-quiz-label';
      label.textContent = '\uD83E\uDDE9 H\u0131zl\u0131 Quiz';
      quizWrap.appendChild(label);

      var question = document.createElement('div');
      question.className = 'fc-quiz-question';
      var qStrong = document.createElement('strong');
      qStrong.textContent = w.tr;
      question.appendChild(document.createTextNode('\u201C'));
      question.appendChild(qStrong);
      question.appendChild(document.createTextNode('\u201D \u0130ngilizce nedir?'));
      quizWrap.appendChild(question);

      var choicesDiv = document.createElement('div');
      choicesDiv.className = 'fc-quiz-choices';
      choices.forEach(function(c){
        var btn = document.createElement('button');
        btn.className = 'fc-quiz-btn';
        btn.dataset.correct = (c.en === w.en ? '1' : '0');
        btn.textContent = c.en;
        choicesDiv.appendChild(btn);
      });
      quizWrap.appendChild(choicesDiv);
      overlay.appendChild(quizWrap);

      wrap.parentNode.insertBefore(overlay, wrap);
      wrap.style.display = 'none';
      document.querySelector('.fc-lbl-row') && (document.querySelector('.fc-lbl-row').style.display = 'none');
      document.querySelector('.fc-btns') && (document.querySelector('.fc-btns').style.display = 'none');

      overlay.querySelectorAll('.fc-quiz-btn').forEach(function(btn){
        btn.addEventListener('click', function(){
          var correct = btn.dataset.correct === '1';
          overlay.querySelectorAll('.fc-quiz-btn').forEach(function(b){
            b.disabled = true;
            if(b.dataset.correct === '1') b.classList.add('fc-quiz-correct');
            else b.classList.add('fc-quiz-wrong');
          });
          setTimeout(function(){
            overlay.remove();
            wrap.style.display = '';
            document.querySelector('.fc-lbl-row') && (document.querySelector('.fc-lbl-row').style.display = '');
            document.querySelector('.fc-btns') && (document.querySelector('.fc-btns').style.display = '');
            if(correct){ self.know++; } else { self.dontKnow++; }
            self.idx++;
            self._render();
          }, 900);
        });
      });
    },

    _flip: function(){
      var card = document.getElementById('fc-card');
      if(!card) return;
      this.flipped = !this.flipped;
      card.classList.toggle('is-flipped', this.flipped);
    },

    _answer: function(know){
      if(!this.flipped){ this._flip(); return; }
      var word = this.queue[this.idx];
      var _app2 = window._app || window.app;
      var _srs2 = (typeof SRS !== 'undefined' ? SRS : window.SRS) || null;
      if(_srs2 && _app2){
        var mastery = _app2.state.get('mastery') || {};
        mastery = _srs2.update(mastery, word.id || word.en, know);
        _app2.state.set('mastery', mastery);
      }
      if(know) this.know++; else this.dontKnow++;
      var card = document.getElementById('fc-card');
      card.classList.add(know ? 'fc-out-up' : 'fc-out-down');
      var self = this;
      setTimeout(function(){
        self.idx++;
        self._render();
      }, 320);
    },

    _showResult: function(){
      var stage = document.getElementById('fc-stage');
      if(!stage) return;
      var total = this.know + this.dontKnow;
      var pct = total > 0 ? Math.round(this.know / total * 100) : 0;
      var icon = pct >= 80 ? '\uD83C\uDF1F' : pct >= 50 ? '\uD83D\uDCAA' : '\uD83D\uDCDA';

      stage.textContent = '';

      var result = document.createElement('div');
      result.className = 'fc-result';

      var resIcon = document.createElement('div');
      resIcon.className = 'fc-res-icon';
      resIcon.textContent = icon;
      result.appendChild(resIcon);

      var resTitle = document.createElement('div');
      resTitle.className = 'fc-res-title';
      resTitle.textContent = 'Oturum Tamamland\u0131';
      result.appendChild(resTitle);

      var resPct = document.createElement('div');
      resPct.className = 'fc-res-pct';
      resPct.textContent = pct + '%';
      result.appendChild(resPct);

      var resStats = document.createElement('div');
      resStats.className = 'fc-res-stats';
      var know = document.createElement('span');
      know.className = 'fc-res-know';
      know.textContent = '\u2713 ' + this.know + ' Bildim';
      var dont = document.createElement('span');
      dont.className = 'fc-res-dont';
      dont.textContent = '\u2717 ' + this.dontKnow + ' Bilmedim';
      resStats.appendChild(know);
      resStats.appendChild(dont);
      result.appendChild(resStats);

      var resBtns = document.createElement('div');
      resBtns.className = 'fc-res-btns';
      var again = document.createElement('button');
      again.className = 'fc-res-again';
      again.textContent = 'Tekrar Ba\u015flat';
      again.onclick = function(){ window._flashcards.init(); };
      var home = document.createElement('button');
      home.className = 'fc-res-home';
      home.textContent = 'Ana Men\u00FC';
      home.onclick  = function(){ window._app && window._app.navigate('home'); };
      resBtns.appendChild(again);
      resBtns.appendChild(home);
      result.appendChild(resBtns);

      stage.appendChild(result);
    },

    _bindEvents: function(){
      var card = document.getElementById('fc-card');
      var noBtn = document.getElementById('fc-no-btn');
      var yesBtn = document.getElementById('fc-yes-btn');
      if(!card) return;
      var self = this;

      noBtn.onclick  = function(){ self._answer(false); };
      yesBtn.onclick = function(){ self._answer(true); };

      var startY = 0, startX = 0, touchMoved = false, lastTouchEnd = 0;

      card.addEventListener('touchstart', function(e){
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
        touchMoved = false;
      }, {passive:true});

      card.addEventListener('touchmove', function(e){
        var dy = e.touches[0].clientY - startY;
        var dx = e.touches[0].clientX - startX;
        if(Math.abs(dy) > 12 || Math.abs(dx) > 12) touchMoved = true;
        if(Math.abs(dy) > 30 && self.flipped){
          card.classList.toggle('fc-glow-yes', dy < -30);
          card.classList.toggle('fc-glow-no',  dy > 30);
        }
      }, {passive:true});

      card.addEventListener('touchend', function(e){
        var dy = e.changedTouches[0].clientY - startY;
        card.classList.remove('fc-glow-yes','fc-glow-no');
        lastTouchEnd = Date.now();
        if(!touchMoved){
          self._flip();
        } else if(Math.abs(dy) >= 60 && self.flipped){
          self._answer(dy < 0);
        }
      }, {passive:true});

      card.addEventListener('click', function(){
        if(Date.now() - lastTouchEnd < 500) return;
        self._flip();
      });
    }
  };

  window._flashcards = fc;

  var obs = new MutationObserver(function(){
    if(document.querySelector('.fc-wrapper') && document.getElementById('fc-card')){
      window._flashcards.init();
      obs.disconnect();
      var obs2 = new MutationObserver(function(){
        if(document.querySelector('.fc-wrapper') && document.getElementById('fc-card')){
          window._flashcards.init();
        }
      });
      obs2.observe(document.getElementById('main-content'), {childList:true});
    }
  });
  window.addEventListener('load', function(){
    obs.observe(document.getElementById('main-content'), {childList:true});
  });
})();

/* ── 6. Back button + page transition animation ── */
(function(){
  var lastView = 'home';
  var isPopping = false;

  window.addEventListener('load', function(){
    history.replaceState({view:'home'}, '');

    var main = document.getElementById('main-content');
    if(!main) return;

    var obs = new MutationObserver(function(){
      if(isPopping) return;
      var app = window._app;
      var view = (app && app.session && app.session.view) || 'home';
      if(view === lastView) return;
      lastView = view;
      if(view === 'home'){
        history.replaceState({view:'home'}, '');
      } else {
        history.pushState({view:view}, '');
      }
    });
    obs.observe(main, {childList:true});
  });

  window.addEventListener('popstate', function(e){
    isPopping = true;
    var target = (e.state && e.state.view) || 'home';
    lastView = target;

    document.body.classList.add('navigating-back');
    setTimeout(function(){ document.body.classList.remove('navigating-back'); }, 350);

    var app = window._app;
    if(app && app.navigate) app.navigate(target);
    setTimeout(function(){ isPopping = false; }, 150);
  });
})();

/* ── 7. Haptic feedback ── */
(function(){
  if(!navigator.vibrate || window.innerWidth > 768) return;
  var obs = new MutationObserver(function(mutations){
    for(var m of mutations){
      if(m.type !== 'attributes') continue;
      var el = m.target, old = m.oldValue || '', cur = el.className || '';
      var addedCorrect = (cur.includes('correct') || cur.includes('solved') || cur.includes('success')) &&
                         !old.includes('correct') && !old.includes('solved') && !old.includes('success');
      var addedWrong   = (cur.includes('wrong') || (cur.includes('error') && !cur.includes('error-'))) &&
                         !old.includes('wrong') && !old.includes('error');
      if(addedCorrect) navigator.vibrate(40);
      if(addedWrong)   navigator.vibrate([80,50,80]);
    }
  });
  window.addEventListener('load', function(){
    obs.observe(document.body, { subtree:true, attributes:true, attributeOldValue:true, attributeFilter:['class'] });
  });
})();

/* ── 8. Pinch-zoom prevention in game screens ── */
(function(){
  if(window.innerWidth > 768) return;
  var SEL = '.nexus-shell,.quantum-shell,.synesthesia-wrapper,.bridge-workspace,.cinema-wrapper';
  document.addEventListener('touchmove', function(e){
    if(e.touches.length < 2) return;
    var el = e.target;
    while(el){
      if(el.matches && el.matches(SEL)){ e.preventDefault(); return; }
      el = el.parentElement;
    }
  }, { passive: false });
})();

/* ── 9. Stats Drawer open/close ── */
(function(){
  function openStatsDrawer() {
    document.getElementById('stats-drawer').classList.add('open');
    document.getElementById('stats-drawer-backdrop').classList.add('open');
  }
  function closeStatsDrawer() {
    document.getElementById('stats-drawer').classList.remove('open');
    document.getElementById('stats-drawer-backdrop').classList.remove('open');
  }
  document.addEventListener('click', function(e) {
    if(e.target.closest('#m-stats-btn')) {
      var isOpen = document.getElementById('stats-drawer').classList.contains('open');
      isOpen ? closeStatsDrawer() : openStatsDrawer();
      return;
    }
    if(e.target.closest('#stats-drawer-backdrop')) { closeStatsDrawer(); return; }
    if(e.target.closest('#stats-drawer .modes-drawer-item')) { closeStatsDrawer(); }
  });
  var sy = 0;
  document.getElementById('stats-drawer') && document.addEventListener('touchstart', function(e) {
    var d = document.getElementById('stats-drawer');
    if(d && d.classList.contains('open')) sy = e.touches[0].clientY;
  }, {passive:true});
  document.addEventListener('touchend', function(e) {
    var d = document.getElementById('stats-drawer');
    if(d && d.classList.contains('open') && e.changedTouches[0].clientY - sy > 60) closeStatsDrawer();
  }, {passive:true});
})();

/* ── 10. Exercise cloze mini popup ── */
(function(){
  var _audioCtx = null;
  function ctx() {
    if(!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return _audioCtx;
  }
  function playChime() {
    try {
      var c = ctx(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(880, c.currentTime);
      o.frequency.setValueAtTime(1320, c.currentTime + 0.08);
      g.gain.setValueAtTime(0.35, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.5);
      o.start(c.currentTime); o.stop(c.currentTime + 0.5);
    } catch(e){}
  }
  function playBuzz() {
    try {
      var c = ctx(), o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(140, c.currentTime);
      g.gain.setValueAtTime(0.3, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.38);
      o.start(c.currentTime); o.stop(c.currentTime + 0.38);
    } catch(e){}
  }

  function closePopup() {
    var p = document.getElementById('cloze-mini-popup');
    if(p) p.remove();
  }

  function getWrongOption(correctAnswer) {
    var pool = Array.from(document.querySelectorAll('.cloze-opt[data-word]'))
      .map(function(b){ return b.dataset.word; })
      .filter(function(w){ return w && w !== correctAnswer; });
    if(!pool.length) {
      pool = Array.from(document.querySelectorAll('.cloze-blank:not(.filled)'))
        .map(function(b){ return b.dataset.answer; })
        .filter(function(w){ return w && w !== correctAnswer; });
    }
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }

  function showChoices(blank) {
    if(blank.classList.contains('filled')) return;
    closePopup();

    document.querySelectorAll('.cloze-blank').forEach(function(b){ b.classList.remove('active'); });
    blank.classList.add('active');

    var answer = blank.dataset.answer;
    var wrong = getWrongOption(answer);
    if(!wrong) wrong = answer === 'the' ? 'a' : 'the';

    var choices = [answer, wrong].sort(function(){ return Math.random() - 0.5; });

    var popup = document.createElement('div');
    popup.id = 'cloze-mini-popup';
    popup.className = 'cloze-mini-popup';

    choices.forEach(function(word) {
      var btn = document.createElement('button');
      btn.className = 'cloze-mini-btn';
      btn.textContent = word;
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        if(word === answer) {
          btn.classList.add('correct');
          playChime();
          setTimeout(function() {
            blank.textContent = answer;
            blank.classList.add('filled');
            blank.classList.remove('active');
            closePopup();
            var app = window._app || window.app;
            if(app && app.addXP) {
              var xp = (window.remoteFlags && window.remoteFlags.xp_reading_correct) || 10;
              app.addXP(xp, 'easy');
            }
            if(app && app._checkStoryDone) app._checkStoryDone();
          }, 220);
        } else {
          btn.classList.add('wrong');
          playBuzz();
          blank.classList.add('error');
          setTimeout(function() {
            blank.classList.remove('error', 'active');
            closePopup();
          }, 700);
        }
      });
      popup.appendChild(btn);
    });

    var rect = blank.getBoundingClientRect();
    var popW = 220;
    var left = Math.max(8, Math.min(rect.left + rect.width / 2 - popW / 2, window.innerWidth - popW - 8));
    var top = rect.bottom + 8;
    if(top + 56 > window.innerHeight) top = rect.top - 64;
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';

    document.body.appendChild(popup);

    setTimeout(function() {
      document.addEventListener('click', function handler(e) {
        if(!popup.contains(e.target) && e.target !== blank) {
          closePopup();
          blank.classList.remove('active');
          document.removeEventListener('click', handler);
        }
      });
    }, 50);
  }

  document.addEventListener('click', function(e) {
    var blank = e.target.closest('.cloze-blank');
    if(!blank) return;
    e.stopPropagation();
    showChoices(blank);
  }, true);
})();

/* ── 11. Mobile story nav buttons reposition ── */
(function(){
  if(window.innerWidth > 768) return;
  function moveNavBtns() {
    var wrapper = document.querySelector('.story-wrapper');
    if(!wrapper) return;
    var btns = wrapper.querySelector('.story-nav .story-nav-btns');
    var content = wrapper.querySelector('.story-content-box');
    if(!btns || !content) return;
    if(wrapper.querySelector('.story-nav-btns-bottom')) return;
    var bottom = document.createElement('div');
    bottom.className = 'story-nav-btns-bottom';
    bottom.innerHTML = btns.innerHTML;
    content.after(bottom);
  }
  var obs = new MutationObserver(function(muts) {
    for(var m of muts) {
      if(m.addedNodes.length) { moveNavBtns(); break; }
    }
  });
  window.addEventListener('load', function() {
    moveNavBtns();
    var area = document.getElementById('story-area');
    if(area) obs.observe(area, { childList: true, subtree: true });
  });
})();

/* ── 12. Mobile story swipe gestures ── */
(function(){
  if(window.innerWidth > 768) return;
  var startX = 0, startY = 0;
  var SWIPE_MIN = 50, ANGLE_MAX = 35;

  document.addEventListener('touchstart', function(e) {
    var t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    if(!document.querySelector('.story-wrapper')) return;
    var t = e.changedTouches[0];
    var dx = t.clientX - startX;
    var dy = t.clientY - startY;
    if(Math.abs(dx) < SWIPE_MIN) return;
    if(Math.abs(dy) / Math.abs(dx) > Math.tan(ANGLE_MAX * Math.PI / 180)) return;
    if(dx < 0) {
      var btn = document.querySelector('[data-action="next-story"]');
      if(btn) btn.click();
    } else {
      var btn = document.querySelector('[data-action="prev-story"]');
      if(btn) btn.click();
    }
  }, { passive: true });
})();

/* ── 13. Mobile story word scroll tracking ── */
(function(){
  if(window.innerWidth > 768) return;
  var _obs = null;

  function scrollToWord(el) {
    var container = document.querySelector('.main-content');
    if(!container || !el) return;
    var cRect = container.getBoundingClientRect();
    var eRect = el.getBoundingClientRect();
    var elTop = eRect.top - cRect.top + container.scrollTop;
    var target = elTop - (container.clientHeight * 0.30);
    container.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }

  function attachObserver() {
    if(_obs) return;
    var storyArea = document.getElementById('story-area');
    if(!storyArea) return;
    _obs = new MutationObserver(function(mutations) {
      for(var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if(m.type === 'attributes' && m.attributeName === 'class') {
          var el = m.target;
          if(el.classList.contains('playing')) {
            scrollToWord(el);
            break;
          }
        }
      }
    });
    _obs.observe(storyArea, { subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  var bodyObs = new MutationObserver(function() {
    if(document.getElementById('story-area')) attachObserver();
  });
  window.addEventListener('load', function() {
    attachObserver();
    bodyObs.observe(document.body, { childList: true, subtree: true });
  });
})();

/* ── Event delegation for data-action attributes ── */
document.addEventListener('click', function(e) {
  var el = e.target.closest('[data-action]');
  if(!el) return;
  var act = el.dataset.action;

  if(act === 'speak-tab-v2')      { window._speakSwitchTab && window._speakSwitchTab('v2'); return; }
  if(act === 'speak-tab-fill')    { window._speakSwitchTab && window._speakSwitchTab('fill'); return; }
  if(act === 'speak-show-picker') { window._speakShowPicker && window._speakShowPicker(); return; }
  if(act === 'set-mode-balanced') { window._app && window._app.setLearningMode && window._app.setLearningMode('balanced', el); return; }
  if(act === 'set-mode-intensive'){ window._app && window._app.setLearningMode && window._app.setLearningMode('intensive', el); return; }
  if(act === 'set-mode-speaking') { window._app && window._app.setLearningMode && window._app.setLearningMode('speaking', el); return; }
  if(act === 'set-mode-grammar')  { window._app && window._app.setLearningMode && window._app.setLearningMode('grammar', el); return; }
  if(act === 'set-goal-general')  { window._app && window._app.setLearningGoal && window._app.setLearningGoal('general', el); return; }
  if(act === 'set-goal-travel')   { window._app && window._app.setLearningGoal && window._app.setLearningGoal('travel', el); return; }
  if(act === 'set-goal-business') { window._app && window._app.setLearningGoal && window._app.setLearningGoal('business', el); return; }
  if(act === 'set-goal-academic') { window._app && window._app.setLearningGoal && window._app.setLearningGoal('academic', el); return; }
  if(act === 'reset-user-data')   { window._app && window._app.resetUserData && window._app.resetUserData(); return; }
  if(act === 'close-reset-modal') { var m = document.getElementById('reset-confirm-modal'); if(m) m.style.display = 'none'; return; }
  if(act === 'do-reset-user-data'){ window._app && window._app._doResetUserData && window._app._doResetUserData(); return; }
  if(act === 'close-modal-backdrop') { if(e.target === el) el.style.display = 'none'; return; }
});
