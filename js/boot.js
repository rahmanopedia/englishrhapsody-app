/* English Rhapsody — boot.js
   Inline script blocks extracted from index.html for CSP compliance.
   Loaded via <script src="js/boot.js" defer></script> */

/* ── 0. NativeSpeech Capacitor plugin kaydı ── */
(function () {
  if (window.Capacitor && typeof window.Capacitor.registerPlugin === 'function') {
    window.Capacitor.Plugins = window.Capacitor.Plugins || {};
    window.Capacitor.Plugins.NativeSpeech = window.Capacitor.registerPlugin('NativeSpeech');
  }
})();

/* ── 1. Lazy Script Loader ── */
(function () {
  var LAZY = {
    quantum:      ['js/quantum.js?v=6'],
    bridge:       ['js/bridge-data.js'],
    nexus:        ['js/phrasal_verbs_ext.js', 'js/phrasal_verbs_ext2.js', 'js/phrasal_verbs_ext3.js'],
    grammar:      ['js/grammar_data.js', 'js/grammar.js'],
    learn:        ['js/ex-tr-data.js'],
    cinema:       ['js/video-data.js', 'js/cinema.js'],
    translate:    ['js/translate-data.js','js/translate-data2.js','js/translate-data3.js','js/translate-data4.js','js/translate-data5.js','js/translate-data6.js','js/translate-data7.js','js/translate.js'],
    reading:      ['js/stories-data.js'],
    speak:        ['js/stories-data.js', 'js/conversations.js', 'js/speak-sentences.js'],
    conversations:['js/conversations.js', 'js/speak-sentences.js'],
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

  // pointerdown: tıklamadan önce script yüklemeyi başlat (300ms kazanç)
  document.addEventListener('pointerdown', function (e) {
    var el = e.target.closest('[data-target]');
    if (!el) return;
    var target = el.dataset.target;
    if (!target || !LAZY[target] || allLoaded(target)) return;
    ensureScripts(target);
  }, { passive: true, capture: true });

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-target]');
    if (!el) return;
    var target = el.dataset.target;
    if (!target || !LAZY[target] || allLoaded(target)) return;

    e.stopImmediatePropagation();
    e.preventDefault();

    document.querySelectorAll('.modes-drawer.open').forEach(function (d) { d.classList.remove('open'); });
    document.querySelectorAll('.modes-drawer-backdrop.open').forEach(function (d) { d.classList.remove('open'); });

    // Hemen görsel feedback — script yüklenmeyi bekleme
    document.querySelectorAll('.nav-item.active, .m-nav-item.active').forEach(function (n) { n.classList.remove('active'); });
    el.classList.add('active');

    ensureScripts(target).then(function () {
      if (window._app && window._app.navigate) {
        window._app.navigate(target);
      } else {
        el.click();
      }
    });
  }, true);

  // pointerenter: nav item'ın üzerine gelince scripti yüklemeye başla
  document.addEventListener('pointerenter', function (e) {
    var el = e.target.closest('[data-target]');
    if (!el) return;
    var target = el.dataset.target;
    if (!target || !LAZY[target] || allLoaded(target)) return;
    ensureScripts(target);
  }, { capture: true });

  window.addEventListener('load', function () {
    // Prefetch: 800ms sonra sadece sık kullanılan modları tarayıcıya bildir
    // (tüm modları değil — yavaş bağlantılarda gereksiz bant genişliği tüketimini önler)
    var PREFETCH_MODES = ['reading', 'speak', 'quantum', 'translate', 'grammar'];
    setTimeout(function () {
      var seen = new Set();
      PREFETCH_MODES.forEach(function (mode) {
        var srcs = LAZY[mode];
        if (!srcs) return;
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
    }, 800);

    // Idle: tarayıcı boşta iken en çok kullanılan modları sessizce yükle
    var idleTargets = ['reading', 'speak', 'quantum', 'learn', 'cinema', 'bridge'];
    var idleFn = function () {
      var target = idleTargets.shift();
      if (!target) return;
      if (!allLoaded(target)) ensureScripts(target);
      if (idleTargets.length) {
        if (window.requestIdleCallback) requestIdleCallback(idleFn, { timeout: 5000 });
        else setTimeout(idleFn, 2000);
      }
    };
    if (window.requestIdleCallback) requestIdleCallback(idleFn, { timeout: 4000 });
    else setTimeout(idleFn, 4000);
  });
})();


/* ── 2. Mobile nav behavior ── */
(function(){
  var MODE_VIEWS=new Set(['learn','reading','speak','bridge','nexus','quantum','conversations','leaderboard','placement','cinema','translate','grammar','flashcards','rival']);
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
    obs.observe(document.getElementById('main-content') || document.body, { childList:true, subtree:true });
  });
})();

/* ── 4. PWA Install Prompt — devre dışı ── */
window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); });

/* ── 4b. Translate Mode — navigate patch ── */
(function () {
  var _tm = null;

  function patch() {
    var app = window._app || window.app;
    if (!app || !app.navigate || app.__translatePatched) return;
    app.__translatePatched = true;

    var _orig = app.navigate.bind(app);
    app.navigate = function (target) {
      _orig(target); // core handles template cloning + nav active state
      if (target !== 'translate') return;

      // Destroy previous instance
      if (_tm && _tm.destroy) { _tm.destroy(); _tm = null; }

      function startMode() {
        var el = document.getElementById('translate-root');
        if (!el) return;
        _tm = new window._TranslateMode(app);
        _tm.init(el);
      }

      if (window._TranslateMode) {
        startMode();
      } else {
        app._translateModeReady = function () {
          delete app._translateModeReady;
          startMode();
        };
      }
    };
  }

  if (window._app) { patch(); }
  else {
    var _t = setInterval(function () {
      if (window._app && window._app.navigate) { clearInterval(_t); patch(); }
    }, 50);
  }
})();

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
              app.addXP(xp, 'easy', 'story');
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

/* ── 11. Story enhancements: bottom nav + reading time ── */
(function(){
  function addReadingTime(wrapper) {
    var meta = wrapper.querySelector('.story-meta');
    if(!meta || meta.querySelector('.rw-read-time')) return;
    var text = (wrapper.querySelector('.story-text') || {}).textContent || '';
    var words = text.trim().split(/\s+/).filter(Boolean).length;
    if(!words) return;
    var mins = Math.max(1, Math.round(words / 180));
    var chip = document.createElement('span');
    chip.className = 'rw-read-time';
    chip.style.cssText = 'font-size:.72rem;color:var(--text-3);font-weight:500;display:flex;align-items:center;gap:3px;';
    chip.innerHTML = '⏱ ' + mins + ' dk';
    meta.appendChild(chip);
  }

  function addBottomNav(wrapper) {
    if(wrapper.querySelector('.story-nav-btns-bottom')) return;
    var btns = wrapper.querySelector('.story-nav .story-nav-btns');
    var content = wrapper.querySelector('.story-content-box');
    if(!btns || !content) return;
    var bottom = document.createElement('div');
    bottom.className = 'story-nav-btns-bottom';
    bottom.innerHTML = btns.innerHTML;
    content.after(bottom);
  }

  function enhance() {
    var wrapper = document.querySelector('.story-wrapper');
    if(!wrapper) return;
    addReadingTime(wrapper);
    addBottomNav(wrapper);
  }

  var obs = new MutationObserver(function(muts) {
    for(var m of muts) {
      if(m.addedNodes.length) { enhance(); break; }
    }
  });
  window.addEventListener('load', function() {
    enhance();
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
    if(document.getElementById('story-area')) { bodyObs.disconnect(); attachObserver(); }
  });
  window.addEventListener('load', function() {
    attachObserver();
    if(!document.getElementById('story-area')) {
      bodyObs.observe(document.body, { childList: true, subtree: true });
    }
  });
})();

/* ── 14. Shuffle Anti-Repeat Patch ── */
(function(){
  function patch(app) {
    if (!app._buildShuffleOrder || app._shufflePatched) return;
    app._shufflePatched = true;
    var orig = app._buildShuffleOrder.bind(app);
    app._buildShuffleOrder = function() {
      var currentStoryIdx = (app._getStoryIndex ? app._getStoryIndex() : null);
      orig();
      if (currentStoryIdx === null) return;
      var level = app.state.get('readingLevel');
      var order = app.state.get('readingOrder') || {};
      var arr = order[level];
      if (!arr || arr.length <= 1) return;
      if (arr[0] === currentStoryIdx) {
        var swapPos = 1 + Math.floor(Math.random() * (arr.length - 1));
        var tmp = arr[0]; arr[0] = arr[swapPos]; arr[swapPos] = tmp;
        order[level] = arr;
        app.state.set('readingOrder', order);
      }
    };
  }
  function tryPatch() {
    var app = window._app || window.app;
    if (app && app._buildShuffleOrder) { patch(app); return true; }
    return false;
  }
  if (!tryPatch()) {
    var _t = setInterval(function(){ if(tryPatch()) clearInterval(_t); }, 100);
  }
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

/* ── 14. CEFR seviyesine göre okuma ve konuşma zorluğunu otomatik set et ── */
(function() {
  var READING_MAP = {A1:'Kolay', A2:'Kolay', B1:'Orta', B2:'Orta', C1:'İleri', C2:'İleri'};
  var SPEAK_MAP   = {A1:'easy',  A2:'easy',  B1:'medium', B2:'medium', C1:'hard', C2:'hard'};
  function applyDefaults(target) {
    var app = window._app;
    if (!app || !app.state) return;
    var cefr = app.state.get('cefrLevel');
    if (!cefr) return;
    if (target === 'reading') app.state.set('readingLevel', READING_MAP[cefr] || 'Orta');
    if (target === 'speak')   app.state.set('speakDiff',    SPEAK_MAP[cefr]  || 'medium');
  }
  function patch() {
    var app = window._app;
    if (!app || !app.navigate || app.__cefrNavPatched) return;
    app.__cefrNavPatched = true;
    var orig = app.navigate.bind(app);
    app.navigate = function(target) {
      applyDefaults(target);
      orig(target);
      if (target === 'grammar') {
        var root = document.getElementById('grammar-root');
        if (root && typeof GrammarMode !== 'undefined') {
          if (window.grammarMod && window.grammarMod.destroy) window.grammarMod.destroy();
          window.grammarMod = new GrammarMode(window._app);
          window.grammarMod.init(root);
        }
      }
    };

    // Live CEFR sync: patch state.set so readingLevel/speakDiff
    // update immediately whenever cefrLevel is changed.
    if (!app.state.__cefrStatePatched) {
      app.state.__cefrStatePatched = true;
      var origSet = app.state.set.bind(app.state);
      app.state.set = function(key, val, sync) {
        origSet(key, val, sync);
        if (key === 'cefrLevel' && val) {
          origSet('readingLevel', READING_MAP[val] || 'Orta');
          origSet('speakDiff',    SPEAK_MAP[val]   || 'medium');
        }
      };
    }
  }
  if (window._app) {
    patch();
  } else {
    var t = setInterval(function() { if (window._app) { clearInterval(t); patch(); } }, 100);
  }
})();

// ── Placement Test: ilk girişte seviye belirle ────────────────────────────
(function() {
  function maybeShowPlacementTest(app) {
    if (window._isGuest) return; // misafire seviye testi gösterme
    if (!window.authManager || !window.authManager.isLoggedIn) return; // giriş yapmamış
    if (typeof PlacementTest === 'undefined') return;
    var cefrLevel = app.state.get('cefrLevel');
    if (cefrLevel) return; // zaten belirlenmiş

    var container = document.getElementById('pt-container');
    if (!container) return;
    container.style.display = 'block';

    var test = new PlacementTest();
    test.show(container, function(level) {
      app.state.set('cefrLevel', level);
      container.style.display = 'none';
      container.innerHTML = '';
    });
  }

  // App, WORDS ve auth hazır olana kadar bekle
  function waitAndCheck() {
    var app = window._app;
    if (!app || typeof WORDS === 'undefined') {
      setTimeout(waitAndCheck, 300);
      return;
    }
    if (!window.authManager || !window.authManager._ready) {
      setTimeout(waitAndCheck, 200);
      return;
    }
    maybeShowPlacementTest(app);
  }

  waitAndCheck();
})();

/* ── 15. Offline / Online detection banner ── */
(function(){
  var banner = document.getElementById('offline-banner');
  if(!banner) return;

  var OFFLINE_HTML = [
    '<span>📡 İnternet bağlantısı yok</span>',
    '<span style="font-size:11px;opacity:.7;margin-left:8px">',
    '· Çevrimdışı çalışanlar: Sinestezi, Phantom, Flashcard, Okuma, Gramer',
    '</span>'
  ].join('');

  function update(){
    if(navigator.onLine){
      banner.classList.remove('visible');
      banner.innerHTML = '';
    } else {
      banner.innerHTML = OFFLINE_HTML;
      banner.classList.add('visible');
    }
  }
  window.addEventListener('online',  update);
  window.addEventListener('offline', update);
  update();
})();

/* ── 16. Keyboard viewport adjustment ── */
(function(){
  if(!window.visualViewport || window.innerWidth > 768) return;
  var root = document.documentElement;
  var lastKb = 0;
  function onViewportResize(){
    var kb = Math.max(0, window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop);
    var rounded = Math.round(kb);
    if(rounded === lastKb) return;
    lastKb = rounded;
    root.style.setProperty('--kb-height', rounded + 'px');
  }
  window.visualViewport.addEventListener('resize', onViewportResize);
  window.visualViewport.addEventListener('scroll', onViewportResize);
})();

/* ── 17. Context menu prevention on game elements ── */
(function(){
  if(window.innerWidth > 768) return;
  var SEL = '.nexus-shell,.quantum-shell,.synesthesia-wrapper,.bridge-workspace,.cinema-wrapper,.arena-shell,.fc-card-wrap';
  document.addEventListener('contextmenu', function(e){
    var el = e.target;
    while(el){
      if(el.matches && el.matches(SEL)){ e.preventDefault(); return; }
      el = el.parentElement;
    }
  });
})();

/* ── 18. SRS Görünürlüğü ── */
(function(){
  function getDue(){
    try {
      var mastery = window._app && window._app.state && window._app.state.get('mastery');
      if(!mastery || !window.SRS || !window.WORDS) return 0;
      return window.SRS.getDue(window.WORDS, mastery).length;
    } catch(e){ return 0; }
  }

  function updateBadges(){
    var n = getDue();
    // Modes drawer badge (Sinestezi button)
    var b = document.getElementById('srs-drawer-badge');
    if(b){ b.textContent = n > 99 ? '99+' : String(n); b.style.display = n > 0 ? '' : 'none'; }
    // Sidebar badge (desktop) — already has ac-due-badge, also update it if needed
    var b2 = document.getElementById('ac-due-badge');
    if(b2 && n > 0 && b2.style.display === 'none'){ b2.textContent = n > 99 ? '99+' : String(n); b2.style.display = ''; }
  }

  function injectSynthChip(){
    var picker = document.querySelector('.synth-session-picker');
    if(!picker || picker.querySelector('.srs-due-chip')) return;
    var n = getDue();
    var chip = document.createElement('div');
    chip.className = 'srs-due-chip';
    if(n > 0){
      chip.innerHTML = '📅 <strong>' + n + '</strong> kelime tekrara düştü — oturum başlayınca önce bunlar gelir';
      chip.style.background = 'rgba(0,212,255,0.07)';
      chip.style.borderColor = 'rgba(0,212,255,0.25)';
      chip.style.color = 'var(--cyan)';
    } else {
      chip.innerHTML = '✅ Tüm kelimeler güncel — yeni kelimeler sırada';
      chip.style.background = 'rgba(16,185,129,0.07)';
      chip.style.borderColor = 'rgba(16,185,129,0.25)';
      chip.style.color = '#10b981';
    }
    picker.insertBefore(chip, picker.firstChild);
  }

  function injectHomeCard(){
    var main = document.getElementById('main-content');
    if(!main) return;
    var existing = document.getElementById('srs-home-card');
    if(existing) { existing.parentNode && existing.parentNode.removeChild(existing); }
    var n = getDue();
    if(n < 1) return;
    // Only inject if home view is visible
    var app = window._app;
    if(!app || !app.session || app.session.view !== 'home') return;
    // Find a good anchor — the first child of main-content
    var first = main.firstElementChild;
    if(!first) return;
    var card = document.createElement('div');
    card.id = 'srs-home-card';
    card.className = 'srs-home-card';
    card.innerHTML =
      '<div class="srs-home-icon">📅</div>' +
      '<div class="srs-home-text">' +
        '<strong>' + n + ' kelime</strong> bugün tekrara düştü' +
      '</div>' +
      '<button class="srs-home-btn" id="srs-home-go">Başla →</button>' +
      '<button class="srs-home-x" id="srs-home-x">✕</button>';
    main.insertBefore(card, first);
    document.getElementById('srs-home-go').addEventListener('click', function(){
      card.parentNode && card.parentNode.removeChild(card);
      if(window._app && window._app.navigate) window._app.navigate('learn');
    });
    document.getElementById('srs-home-x').addEventListener('click', function(){
      card.parentNode && card.parentNode.removeChild(card);
    });
  }

  function init(){
    updateBadges();
    setInterval(updateBadges, 60000);

    var _obsTimer = null;
    var obs = new MutationObserver(function(){
      clearTimeout(_obsTimer);
      _obsTimer = setTimeout(function(){
        injectSynthChip();
        injectHomeCard();
        updateBadges();
      }, 250);
    });
    var mc = document.getElementById('main-content');
    if(mc) obs.observe(mc, { childList: true, subtree: true });
  }

  // Wait for app + WORDS to be ready
  function waitReady(){
    if(window._app && window.WORDS && window.SRS){ init(); }
    else { setTimeout(waitReady, 400); }
  }
  window.addEventListener('load', function(){ setTimeout(waitReady, 800); });
})();

/* ── 19. Günün Yolu (Daily Learning Path) ── */
(function(){
  var PATHS = {
    A1: [{t:'learn',   l:'Kelime Öğren', i:'🌀'}, {t:'bridge',  l:'Çeviri Yap',    i:'🌉'}, {t:'speak',   l:'Konuş',     i:'🎙️'}],
    A2: [{t:'learn',   l:'Kelime Öğren', i:'🌀'}, {t:'reading', l:'Metin Oku',      i:'📖'}, {t:'speak',   l:'Konuş',     i:'🎙️'}],
    B1: [{t:'learn',   l:'Kelime Öğren', i:'🌀'}, {t:'reading', l:'Metin Oku',      i:'📖'}, {t:'quantum', l:'Cümle Kur', i:'⚛️'}, {t:'speak', l:'Konuş', i:'🎙️'}],
    B2: [{t:'learn',   l:'Kelime Öğren', i:'🌀'}, {t:'reading', l:'Metin Oku',      i:'📖'}, {t:'quantum', l:'Cümle Kur', i:'⚛️'}, {t:'speak', l:'Konuş', i:'🎙️'}],
    C1: [{t:'learn',   l:'Kelime Öğren', i:'🌀'}, {t:'nexus',   l:'Phrasal Verbs',  i:'✨'}, {t:'reading', l:'Metin Oku', i:'📖'}, {t:'speak', l:'Konuş', i:'🎙️'}],
    C2: [{t:'learn',   l:'Kelime Öğren', i:'🌀'}, {t:'nexus',   l:'Phrasal Verbs',  i:'✨'}, {t:'reading', l:'Metin Oku', i:'📖'}, {t:'speak', l:'Konuş', i:'🎙️'}]
  };

  var TODAY = new Date().toISOString().split('T')[0];
  var SKEY  = 'er_path_' + TODAY;

  function getVisited(){ try{ return JSON.parse(localStorage.getItem(SKEY)||'[]'); }catch(e){ return []; } }
  function saveVisit(t){ var v=getVisited(); if(v.indexOf(t)<0){ v.push(t); localStorage.setItem(SKEY,JSON.stringify(v)); } }

  function getSteps(){
    var app = window._app;
    var lvl = (app && app.state && app.state.get('cefrLevel')) || 'B1';
    var steps = (PATHS[lvl] || PATHS['B1']).slice();
    try {
      var m = app && app.state && app.state.get('mastery');
      if(m && window.SRS && window.WORDS){
        var due = window.SRS.getDue(window.WORDS, m).length;
        if(due >= 5) steps[0] = {t:'learn', l:'Tekrar ('+due+')', i:'📅'};
      }
    }catch(e){}
    return steps;
  }

  function renderCard(){
    var col = document.querySelector('.home-col-main');
    if(!col) return;

    var old = document.getElementById('dp-card');
    if(old) old.parentNode && old.parentNode.removeChild(old);

    var steps   = getSteps();
    var visited = getVisited();
    var doneCount = 0;
    for(var i=0;i<steps.length;i++){ if(visited.indexOf(steps[i].t)>=0) doneCount++; }
    var allDone = doneCount === steps.length;
    var nextIdx = -1;
    for(var j=0;j<steps.length;j++){ if(visited.indexOf(steps[j].t)<0){ nextIdx=j; break; } }

    var card = document.createElement('div');
    card.id = 'dp-card';
    card.className = 'home-card-new dp-card';

    var hdr = '<div class="dp-hdr">' +
      '<span class="dp-title">🗺️ Günün Yolu</span>' +
      (allDone
        ? '<span class="dp-badge-done">✅ Tamamlandı!</span>'
        : '<span class="dp-badge-prog">'+doneCount+' / '+steps.length+'</span>') +
      '</div>';

    var bar = '';
    if(!allDone){
      var pct = Math.round(doneCount/steps.length*100);
      bar = '<div class="dp-bar"><div class="dp-bar-fill" style="width:'+pct+'%"></div></div>';
    }

    var stepsHtml = '<div class="dp-steps">';
    for(var k=0;k<steps.length;k++){
      var s   = steps[k];
      var done = visited.indexOf(s.t) >= 0;
      var act  = (k === nextIdx);
      var cls  = 'dp-step' + (done?' dp-done':'') + (act?' dp-active':'');
      stepsHtml +=
        '<button class="'+cls+'" data-dp-target="'+s.t+'">' +
          '<div class="dp-num">'+(done?'✓':(k+1))+'</div>' +
          '<div class="dp-s-icon">'+s.i+'</div>' +
          '<div class="dp-s-label">'+s.l+'</div>' +
        '</button>' +
        (k < steps.length-1 ? '<div class="dp-arr'+(done?' dp-arr-done':'')+'">&rsaquo;</div>' : '');
    }
    stepsHtml += '</div>';

    if(allDone){
      stepsHtml += '<div class="dp-congrats">Harika! Bugünün tüm adımlarını tamamladın 🎉</div>';
    }

    card.innerHTML = hdr + bar + stepsHtml;

    // Insert before 3rd card ("Günlük Görevler") or append
    var cards = col.querySelectorAll(':scope > .home-card-new');
    if(cards.length >= 2 && cards[1].nextSibling){
      col.insertBefore(card, cards[1].nextSibling);
    } else {
      col.appendChild(card);
    }

    // Click handlers
    card.querySelectorAll('[data-dp-target]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var tgt = btn.getAttribute('data-dp-target');
        if(tgt && window._app && window._app.navigate) window._app.navigate(tgt);
      });
    });
  }

  // Patch navigate: track visits + refresh card on home
  function patchNav(){
    var app = window._app;
    if(!app || !app.navigate || app.__dpPatched) return;
    app.__dpPatched = true;
    var _orig = app.navigate.bind(app);
    app.navigate = function(tgt){
      _orig(tgt);
      var trackable = {learn:1, speak:1, reading:1, quantum:1, bridge:1, nexus:1};
      if(trackable[tgt]) setTimeout(function(){ saveVisit(tgt); renderCard(); }, 200);
      if(tgt === 'home')  setTimeout(renderCard, 150);
    };
  }

  // MutationObserver: inject when home-col-main appears
  var _obs = new MutationObserver(function(){
    var col = document.querySelector('.home-col-main');
    if(col && !document.getElementById('dp-card')) renderCard();
  });

  window.addEventListener('load', function(){
    var mc = document.getElementById('main-content');
    if(mc) _obs.observe(mc, {childList:true, subtree:true});
    setTimeout(function(){
      patchNav();
      renderCard();
    }, 1000);
  });
})();

/* ── 9e. Guest Quantum Limit (3 cümle) ────────────────────────── */
(function () {
  var LIMIT = 3;
  var _lastMod = null;

  function _isGuest() {
    return window._isGuest && !(window.authManager && window.authManager.isLoggedIn);
  }

  function _showPaywall() {
    var mod = window.quantumMod || window._qmode;
    var root = mod && mod.root;
    if (!root || root.querySelector('#quantum-paywall')) return;
    root.innerHTML = '<div id="quantum-paywall" style="' +
      'display:flex;flex-direction:column;align-items:center;' +
      'justify-content:center;text-align:center;padding:32px;gap:14px;' +
      'min-height:100%;width:100%;box-sizing:border-box;">' +
      '<div style="font-size:3.2rem;margin-bottom:4px;">⚛️</div>' +
      '<div style="font-size:1.35rem;font-weight:900;color:#fff;line-height:1.3;">3 cümleyi tamamladın!</div>' +
      '<div style="color:#94a3b8;font-size:0.875rem;line-height:1.7;max-width:280px;">Sınırsız oynamak ve ilerlemeyi kaydetmek<br>için ücretsiz hesap oluştur.</div>' +
      '<button id="qp-register" style="background:#f59e0b;color:#1c1917;border:none;border-radius:40px;padding:14px 0;font-size:0.95rem;font-weight:900;cursor:pointer;width:100%;max-width:280px;margin-top:6px;">Ücretsiz Kayıt Ol</button>' +
      '<button id="qp-back" style="background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);border-radius:40px;padding:11px 0;font-size:0.85rem;font-weight:700;cursor:pointer;width:100%;max-width:280px;">Ana Menüye Dön</button>' +
      '</div>';
    root.querySelector('#qp-register').onclick = function () {
      var modal = document.getElementById('auth-modal');
      if (modal) modal.style.display = 'flex';
    };
    root.querySelector('#qp-back').onclick = function () {
      var a = window._app || window.app;
      if (a && a.navigate) a.navigate('home');
    };
  }

  /* quantum.js'deki _qSentenceDone hook'u — her cümle/soru tamamlanınca çağrılır */
  window._qSentenceDone = function (qm) {
    if (!_isGuest()) return;
    window._guestQuantumSentences = (window._guestQuantumSentences || 0) + 1;
    if (window._guestQuantumSentences >= LIMIT) {
      _showPaywall();
    }
  };

  /* startGame: limit dolmuşsa direk paywall göster */
  function patchMod(mod) {
    if (!mod || mod === _lastMod) return;
    _lastMod = mod;
    var _origStart = mod.startGame.bind(mod);
    mod.startGame = function (type) {
      if (_isGuest() && (window._guestQuantumSentences || 0) >= LIMIT) {
        _showPaywall(); return;
      }
      _origStart(type);
    };
  }

  var _qtTimer = setInterval(function () {
    if (window.authManager && window.authManager.isLoggedIn && !window._isGuest) { clearInterval(_qtTimer); return; }
    if (window.quantumMod && window.quantumMod !== _lastMod) patchMod(window.quantumMod);
  }, 300);
})();

/* ── 9d. Guest Nexus Limit (her mod 3 hak) ───────────────────── */
(function () {
  var LIMIT = 3;
  var _lastMod = null;

  function _isGuest() {
    return window._isGuest && !(window.authManager && window.authManager.isLoggedIn);
  }

  function _showPaywall(mod) {
    var root = mod.root;
    if (!root) return;
    if (root.querySelector('#nexus-paywall')) return;

    var div = document.createElement('div');
    div.id = 'nexus-paywall';
    div.style.cssText = [
      'position:absolute;inset:0;z-index:50;',
      'background:rgba(3,7,18,0.95);backdrop-filter:blur(4px);',
      'display:flex;flex-direction:column;align-items:center;',
      'justify-content:center;text-align:center;padding:32px;gap:14px;'
    ].join('');
    div.innerHTML = [
      '<div style="font-size:3.2rem;margin-bottom:4px;">🧠</div>',
      '<div style="font-size:1.35rem;font-weight:900;color:#fff;line-height:1.3;">',
        'Hakkın doldu!',
      '</div>',
      '<div style="color:#94a3b8;font-size:0.875rem;line-height:1.7;max-width:280px;">',
        'Sınırsız kullanmak ve ilerlemeyi kaydetmek<br>için ücretsiz hesap oluştur.',
      '</div>',
      '<button id="np-register" style="',
        'background:#f59e0b;color:#1c1917;',
        'border:none;border-radius:40px;',
        'padding:14px 0;font-size:0.95rem;font-weight:900;',
        'cursor:pointer;width:100%;max-width:280px;margin-top:6px;',
      '">Ücretsiz Kayıt Ol</button>',
      '<button id="np-back" style="',
        'background:rgba(255,255,255,0.05);color:#94a3b8;',
        'border:1px solid rgba(255,255,255,0.1);border-radius:40px;',
        'padding:11px 0;font-size:0.85rem;font-weight:700;',
        'cursor:pointer;width:100%;max-width:280px;',
      '">Ana Menüye Dön</button>',
    ].join('');

    if (!['relative','absolute','fixed'].includes(root.style.position)) {
      root.style.position = 'relative';
    }
    root.appendChild(div);

    div.querySelector('#np-register').onclick = function () {
      div.remove();
      var modal = document.getElementById('auth-modal');
      if (modal) modal.style.display = 'flex';
    };
    div.querySelector('#np-back').onclick = function () {
      div.remove();
      var app = window._app || window.app;
      if (app && app.navigate) app.navigate('home');
    };
  }

  function _guard(mod, key, counterKey) {
    var _orig = mod[key].bind(mod);
    mod[key] = function () {
      if (!_isGuest()) { _orig(); return; }
      if ((window._guestNexus = window._guestNexus || {})[counterKey] >= LIMIT) {
        _showPaywall(mod); return;
      }
      window._guestNexus[counterKey] = (window._guestNexus[counterKey] || 0) + 1;
      _orig();
    };
  }

  function patchMod(mod) {
    if (!mod || mod === _lastMod) return;
    _lastMod = mod;
    _guard(mod, 'startNetwork',   'network');
    _guard(mod, 'startCipher',    'cipher');
    _guard(mod, 'startSynthesis', 'synthesis');
  }

  var _nxTimer = setInterval(function () {
    if (window.authManager && window.authManager.isLoggedIn && !window._isGuest) { clearInterval(_nxTimer); return; }
    if (window.nexusMod && window.nexusMod !== _lastMod) patchMod(window.nexusMod);
  }, 300);
})();

/* ── 9f. Guest Translate Limit (3 soru) ──────────────────────── */
(function () {
  var LIMIT = 3;

  function _isGuest() {
    return window._isGuest && !(window.authManager && window.authManager.isLoggedIn);
  }

  /* translate.js'deki _trQuestionDone hook'u — her soru gösterilmeden önce çağrılır.
     true dönerse _renderQuestion abort eder (4. soru hiç render edilmez). */
  window._trQuestionDone = function (instance) {
    if (!_isGuest()) return false;
    var count = (window._guestTranslateQ = (window._guestTranslateQ || 0) + 1);
    if (count > LIMIT) {
      var root = instance && instance._el;
      if (root && !root.querySelector('#translate-paywall')) {
        root.innerHTML = '<div id="translate-paywall" style="' +
          'display:flex;flex-direction:column;align-items:center;' +
          'justify-content:center;text-align:center;padding:32px;gap:14px;' +
          'min-height:100%;width:100%;box-sizing:border-box;">' +
          '<div style="font-size:3.2rem;margin-bottom:4px;">🔤</div>' +
          '<div style="font-size:1.35rem;font-weight:900;color:#fff;line-height:1.3;">3 soruyu tamamladın!</div>' +
          '<div style="color:#94a3b8;font-size:0.875rem;line-height:1.7;max-width:280px;">Sınırsız çeviri pratiği yapmak<br>için ücretsiz hesap oluştur.</div>' +
          '<button id="tp-register" style="background:#f59e0b;color:#1c1917;border:none;border-radius:40px;padding:14px 0;font-size:0.95rem;font-weight:900;cursor:pointer;width:100%;max-width:280px;margin-top:6px;">Ücretsiz Kayıt Ol</button>' +
          '<button id="tp-back" style="background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);border-radius:40px;padding:11px 0;font-size:0.85rem;font-weight:700;cursor:pointer;width:100%;max-width:280px;">Ana Menüye Dön</button>' +
          '</div>';
        root.querySelector('#tp-register').onclick = function () {
          var modal = document.getElementById('auth-modal');
          if (modal) modal.style.display = 'flex';
        };
        root.querySelector('#tp-back').onclick = function () {
          var a = window._app || window.app;
          if (a && a.navigate) a.navigate('home');
        };
      }
      return true; // abort _renderQuestion
    }
    return false;
  };
})();

/* ── 9b. Guest Cinema Limit (3 klip) ─────────────────────────── */
(function () {
  var LIMIT = 3;
  var _lastMod = null;

  function _isGuest() {
    return window._isGuest && !(window.authManager && window.authManager.isLoggedIn);
  }

  function _showPaywall(mod) {
    var root = mod.el && mod.el.querySelector('#cine-root');
    if (!root) return;
    var existing = root.querySelector('#cinema-paywall');
    if (existing) return; // zaten gösteriliyor

    // Video'yu durdur
    if (mod.video) { try { mod.video.pause(); } catch(e) {} }
    if (mod._clearSync) mod._clearSync();

    var div = document.createElement('div');
    div.id = 'cinema-paywall';
    div.style.cssText = [
      'position:absolute;inset:0;z-index:50;',
      'background:rgba(3,7,18,0.95);backdrop-filter:blur(4px);',
      'display:flex;flex-direction:column;align-items:center;',
      'justify-content:center;text-align:center;padding:32px;gap:14px;'
    ].join('');
    div.innerHTML = [
      '<div style="font-size:3.2rem;margin-bottom:4px;">🎬</div>',
      '<div style="font-size:1.35rem;font-weight:900;color:#fff;line-height:1.3;">',
        '3 video izledin!',
      '</div>',
      '<div style="color:#94a3b8;font-size:0.875rem;line-height:1.7;max-width:280px;">',
        'Tüm videoları izlemek ve ilerlemeyi kaydetmek<br>için ücretsiz hesap oluştur.',
      '</div>',
      '<button id="cp-register" style="',
        'background:#f59e0b;color:#1c1917;',
        'border:none;border-radius:40px;',
        'padding:14px 0;font-size:0.95rem;font-weight:900;',
        'cursor:pointer;width:100%;max-width:280px;margin-top:6px;',
      '">Ücretsiz Kayıt Ol</button>',
      '<button id="cp-back" style="',
        'background:rgba(255,255,255,0.05);color:#94a3b8;',
        'border:1px solid rgba(255,255,255,0.1);border-radius:40px;',
        'padding:11px 0;font-size:0.85rem;font-weight:700;',
        'cursor:pointer;width:100%;max-width:280px;',
      '">Ana Menüye Dön</button>',
    ].join('');
    root.appendChild(div);

    div.querySelector('#cp-register').onclick = function () {
      if (mod._exit) mod._exit();
      var modal = document.getElementById('auth-modal');
      if (modal) modal.style.display = 'flex';
    };
    div.querySelector('#cp-back').onclick = function () {
      if (mod._exit) mod._exit();
    };
  }

  function patchMod(mod) {
    if (!mod || mod === _lastMod) return;
    _lastMod = mod;

    /* _loadClip: ilk açılışta session zaten tüketildiyse paywall göster */
    var _origLoad = mod._loadClip.bind(mod);
    mod._loadClip = function () {
      if (_isGuest() && (window._guestCinemaUsed || mod.clipIndex >= LIMIT)) {
        window._guestCinemaUsed = true;
        _showPaywall(mod);
        return;
      }
      _origLoad();
    };

    /* _nextClip: klip bitti, sıradakine geçerken kontrol et */
    var _origNext = mod._nextClip.bind(mod);
    mod._nextClip = function () {
      if (_isGuest() && mod.clipIndex + 1 >= LIMIT) {
        window._guestCinemaUsed = true;
        mod.clipIndex++;          // sayacı ilerlet (UI tutarlılığı)
        _showPaywall(mod);
        return;
      }
      _origNext();
    };
  }

  /* Yeni cinemaMod instance'ını yakala */
  var _cmTimer = setInterval(function () {
    if (window.authManager && window.authManager.isLoggedIn && !window._isGuest) { clearInterval(_cmTimer); return; }
    if (window.cinemaMod && window.cinemaMod !== _lastMod) patchMod(window.cinemaMod);
  }, 300);
})();

/* ── 9c. Guest Bridge Limit (3 keşfet) ───────────────────────── */
(function () {
  var LIMIT = 3;
  var _lastMod = null;

  function _isGuest() {
    return window._isGuest && !(window.authManager && window.authManager.isLoggedIn);
  }

  function _showPaywall(mod) {
    var root = mod.el;
    if (!root) return;
    if (root.querySelector('#bridge-paywall')) return;

    var div = document.createElement('div');
    div.id = 'bridge-paywall';
    div.style.cssText = [
      'position:absolute;inset:0;z-index:50;',
      'background:rgba(3,7,18,0.95);backdrop-filter:blur(4px);',
      'display:flex;flex-direction:column;align-items:center;',
      'justify-content:center;text-align:center;padding:32px;gap:14px;'
    ].join('');
    div.innerHTML = [
      '<div style="font-size:3.2rem;margin-bottom:4px;">🌉</div>',
      '<div style="font-size:1.35rem;font-weight:900;color:#fff;line-height:1.3;">',
        '3 keşif hakkın doldu!',
      '</div>',
      '<div style="color:#94a3b8;font-size:0.875rem;line-height:1.7;max-width:280px;">',
        'Sınırsız keşfetmek ve ilerlemeyi kaydetmek<br>için ücretsiz hesap oluştur.',
      '</div>',
      '<button id="bp-register" style="',
        'background:#f59e0b;color:#1c1917;',
        'border:none;border-radius:40px;',
        'padding:14px 0;font-size:0.95rem;font-weight:900;',
        'cursor:pointer;width:100%;max-width:280px;margin-top:6px;',
      '">Ücretsiz Kayıt Ol</button>',
      '<button id="bp-back" style="',
        'background:rgba(255,255,255,0.05);color:#94a3b8;',
        'border:1px solid rgba(255,255,255,0.1);border-radius:40px;',
        'padding:11px 0;font-size:0.85rem;font-weight:700;',
        'cursor:pointer;width:100%;max-width:280px;',
      '">Ana Menüye Dön</button>',
    ].join('');

    // position:relative gerekli
    if (root.style.position !== 'relative' && root.style.position !== 'absolute') {
      root.style.position = 'relative';
    }
    root.appendChild(div);

    div.querySelector('#bp-register').onclick = function () {
      div.remove();
      var modal = document.getElementById('auth-modal');
      if (modal) modal.style.display = 'flex';
    };
    div.querySelector('#bp-back').onclick = function () {
      div.remove();
      var app = window._app || window.app;
      if (app && app.navigate) app.navigate('home');
    };
  }

  function patchMod(mod) {
    if (!mod || mod === _lastMod) return;
    _lastMod = mod;
    window._guestBridgeUsed = window._guestBridgeUsed || 0;

    var _origDiscover = mod._smartDiscovery.bind(mod);
    mod._smartDiscovery = function () {
      if (!_isGuest()) { _origDiscover(); return; }
      if (window._guestBridgeUsed >= LIMIT) {
        _showPaywall(mod);
        return;
      }
      window._guestBridgeUsed++;
      _origDiscover();
    };
  }

  var _brTimer = setInterval(function () {
    if (window.authManager && window.authManager.isLoggedIn && !window._isGuest) { clearInterval(_brTimer); return; }
    if (window.bridgeMod && window.bridgeMod !== _lastMod) patchMod(window.bridgeMod);
  }, 300);
})();

/* ── 9. Guest Mode ────────────────────────────────────────────── */
(function () {

  /* ── Misafir girişi butonu ── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#auth-guest-btn');
    if (!btn) return;
    e.preventDefault();

    window._isGuest = true;

    // Auth modal'ı kapat
    var modal = document.getElementById('auth-modal');
    if (modal) modal.style.display = 'none';

    // Guest banner'ı göster + body sınıfı ekle
    var banner = document.getElementById('guest-banner');
    if (banner) banner.style.display = 'flex';
    document.body.classList.add('guest-mode');

    // Misafir girişinde direkt ana ekrana git
    var app = window._app || window.app;
    if (app) {
      app.navigate('home');
    } else {
      // App henüz hazır değil — bekle
      var _wait = setInterval(function () {
        var a = window._app || window.app;
        if (!a) return;
        clearInterval(_wait);
        a.navigate('home');
      }, 100);
    }
  });

  /* ── "Kayıt Ol" butonu (banner) ── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#gb-register-btn');
    if (!btn) return;
    e.preventDefault();
    // Auth modal'ı aç
    var modal = document.getElementById('auth-modal');
    if (modal) modal.style.display = 'flex';
  });

  /* ── Kullanıcı giriş yaparsa banner'ı gizle ── */
  setInterval(function () {
    if (!window._isGuest) return;
    if (window.authManager && window.authManager.isLoggedIn) {
      window._isGuest = false;
      var banner = document.getElementById('guest-banner');
      if (banner) banner.style.display = 'none';
      document.body.classList.remove('guest-mode');
    }
  }, 2000);

  /* ── XP limitleri ── */
  var GUEST_SOFT_XP = 100;   // toast uyarısı
  var GUEST_HARD_XP = 250;   // sert paywall
  var LEARN_MODES = new Set(['learn','speak','reading','bridge','nexus','quantum',
                              'translate','grammar','cinema','flashcards','conversations']);
  var _softShown = false;

  function _guestXP() {
    var a = window._app || window.app;
    return (a && a.state && a.state.get && a.state.get('xp')) || 0;
  }

  function _hardLimit() {
    return window._guestXpGrace ? GUEST_HARD_XP + window._guestXpGrace : GUEST_HARD_XP;
  }

  /* Paywall overlay */
  function _showGuestXpPaywall() {
    if (document.getElementById('guest-xp-paywall')) {
      document.getElementById('guest-xp-paywall').style.display = 'flex';
      return;
    }
    var canDismiss = !window._guestPaywallDismissed;
    var div = document.createElement('div');
    div.id = 'guest-xp-paywall';
    div.style.cssText = [
      'position:fixed;inset:0;z-index:9200;',
      'background:rgba(3,7,18,0.96);backdrop-filter:blur(6px);',
      'display:flex;flex-direction:column;align-items:center;',
      'justify-content:center;text-align:center;padding:32px;gap:14px;'
    ].join('');
    div.innerHTML = [
      '<div style="font-size:3rem;margin-bottom:4px;">🏆</div>',
      '<div style="font-size:1.4rem;font-weight:900;color:#f1f5f9;line-height:1.3;max-width:300px;">',
        'Harika gidiyorsun!',
      '</div>',
      '<div style="color:#94a3b8;font-size:0.88rem;line-height:1.7;max-width:300px;">',
        'İlerlemeyi <strong style="color:#c4b5fd;">kaydetmek</strong> ve tüm modlara<br>',
        'sınırsız erişmek için ücretsiz hesap oluştur.',
      '</div>',
      '<button id="gxp-register" style="',
        'background:linear-gradient(135deg,#6366f1,#4f46e5);',
        'color:#fff;border:none;border-radius:40px;',
        'padding:14px 0;font-size:0.95rem;font-weight:800;',
        'cursor:pointer;width:100%;max-width:300px;margin-top:8px;',
        'box-shadow:0 4px 20px rgba(99,102,241,0.4);',
      '">Ücretsiz Kayıt Ol</button>',
      canDismiss ? [
        '<button id="gxp-dismiss" style="',
          'background:transparent;color:#475569;',
          'border:none;padding:10px;font-size:0.82rem;',
          'cursor:pointer;text-decoration:underline;',
        '">Şimdi değil, devam et</button>',
      ].join('') : '',
    ].join('');
    document.body.appendChild(div);

    div.querySelector('#gxp-register').onclick = function () {
      div.style.display = 'none';
      var modal = document.getElementById('auth-modal');
      if (modal) modal.style.display = 'flex';
    };

    var dismissBtn = div.querySelector('#gxp-dismiss');
    if (dismissBtn) {
      dismissBtn.onclick = function () {
        window._guestPaywallDismissed = true;
        window._guestXpGrace = (window._guestXpGrace || 0) + 150; // 150 XP daha
        div.style.display = 'none';
      };
    }
  }

  /* navigate() yamasını: rival, leaderboard + XP limiti */
  function patchGuestNav() {
    var app = window._app || window.app;
    if (!app || !app.navigate || app.__guestNavPatched) return;
    app.__guestNavPatched = true;

    var _orig = app.navigate.bind(app);
    app.navigate = function (target) {
      var stillGuest = window._isGuest && !(window.authManager && window.authManager.isLoggedIn);
      if (!stillGuest) { _orig(target); return; }

      // Rival & leaderboard tamamen kapalı
      if (target === 'rival' || target === 'leaderboard') {
        if (typeof UI !== 'undefined' && UI.toast) {
          UI.toast('Bu özellik için giriş yapman gerekiyor!');
        }
        var modal = document.getElementById('auth-modal');
        if (modal) modal.style.display = 'flex';
        return;
      }

      // XP sert limiti: öğrenme moduna geçişi engelle
      if (LEARN_MODES.has(target) && _guestXP() >= _hardLimit()) {
        _showGuestXpPaywall();
        return;
      }

      _orig(target);
    };
  }

  if (window._app) {
    patchGuestNav();
  } else {
    var _t = setInterval(function () {
      if (window._app && window._app.navigate) { clearInterval(_t); patchGuestNav(); }
    }, 50);
  }

  /* XP yumuşak uyarı — eşik geçilince bir kez toast */
  setInterval(function () {
    if (_softShown) return;
    if (!window._isGuest) return;
    if (!(window.authManager && !window.authManager.isLoggedIn)) return;
    if (_guestXP() >= GUEST_SOFT_XP) {
      _softShown = true;
      if (typeof UI !== 'undefined' && UI.toast) {
        UI.toast('💡 İlerlemeyi kaydetmek için hesap oluştur!', 4000);
      }
    }
  }, 3000);

  /* ── İlk adım kartı: home'a geçince XP = 0 ise göster ── */
  function checkFirstStepCard() {
    var card = document.getElementById('first-step-card');
    if (!card) return;
    var app = window._app || window.app;
    var xp = app && app.state && app.state.get && (app.state.get('xp') || 0);
    card.style.display = (xp === 0) ? 'block' : 'none';
  }

  function patchHomeNav() {
    var app = window._app || window.app;
    if (!app || !app.navigate || app.__homeCardPatched) return;
    app.__homeCardPatched = true;

    var _orig2 = app.navigate.bind(app);
    app.navigate = function (target) {
      _orig2(target);
      if (target === 'home') {
        setTimeout(checkFirstStepCard, 200);
      }
    };
  }

  window.addEventListener('load', function () {
    setTimeout(function () {
      patchHomeNav();
      checkFirstStepCard();
    }, 1200);
  });

  // MutationObserver: home template klonlandığında kartı güncelle
  var _homeObsTimer = null;
  var _homeObs = new MutationObserver(function () {
    clearTimeout(_homeObsTimer);
    _homeObsTimer = setTimeout(function () {
      if (document.getElementById('first-step-card')) checkFirstStepCard();
    }, 250);
  });
  window.addEventListener('load', function () {
    var mc = document.getElementById('main-content');
    if (mc) _homeObs.observe(mc, { childList: true, subtree: true });
  });

  /* ── PlacementTest entegrasyonu: navigate('placement') ── */
  function patchPlacementNav() {
    var app = window._app || window.app;
    if (!app || !app.navigate || app.__placementNavPatched) return;
    app.__placementNavPatched = true;

    var _origPl = app.navigate.bind(app);
    app.navigate = function (target) {
      _origPl(target);  // tpl-placement template'ini klonla
      if (target !== 'placement') return;

      // Yeni PlacementTest sınıfını başlat
      var container = document.getElementById('placement-root');
      if (!container) return;
      if (typeof PlacementTest === 'undefined') return;

      var test = new PlacementTest();
      test.show(container, function (cefrLevel) {
        var a = window._app || window.app;
        if (a && a._placementFinish) {
          a._placementFinish(cefrLevel, 'balanced');
        } else if (a) {
          a.state && a.state.update({ onboarded: true, cefrLevel: cefrLevel }, true);
          a.navigate('home');
        }
      });
    };
  }

  if (window._app) {
    patchPlacementNav();
  } else {
    var _tpl = setInterval(function () {
      if (window._app && window._app.navigate) { clearInterval(_tpl); patchPlacementNav(); }
    }, 50);
  }

})();

/* ── Mode Stats & sessionsToday Reset ── */
(function() {
  function renderModeStats() {
    var grid = document.getElementById('an-mode-stats-grid');
    if (!grid || !window._app) return;
    var st = window._app.state;
    var ms = st.get('modeStats') || {};
    var totalXP = st.get('xp') || 0;

    var modes = [
      { key:'nexus',   xpKey:'nexusXP',   icon:'🌌', label:'Nexus (Phrasal)' },
      { key:'cinema',  xpKey:'cinemaXP',  icon:'🎬', label:'Cinema' },
      { key:'grammar', xpKey:'grammarXP', icon:'🧩', label:'Gramer' },
    ];

    // Phantom uses main XP (synth mode), read from state
    var phantomSessions = st.get('sessions') || 0;
    var speaking = st.get('speakTotal') || 0;
    var reading = Object.keys(st.get('readDone') || {}).length;

    var html = modes.map(function(m) {
      var count = ms[m.key] || 0;
      var xp    = ms[m.xpKey] || 0;
      return '<div class=an-stat-card>' +
        '<div class=an-stat-icon>' + m.icon + '</div>' +
        '<div class=an-stat-val>' + count + '</div>' +
        '<div class=an-stat-lbl>' + m.label + '</div>' +
        '<div class=an-stat-sub>+' + xp + ' XP</div>' +
      '</div>';
    }).join('');

    html += '<div class=an-stat-card>' +
      '<div class=an-stat-icon>🎙️</div>' +
      '<div class=an-stat-val>' + speaking + '</div>' +
      '<div class=an-stat-lbl>Konuşma</div>' +
      '<div class=an-stat-sub>Telaffuz denemesi</div>' +
    '</div>';

    html += '<div class=an-stat-card>' +
      '<div class=an-stat-icon>📖</div>' +
      '<div class=an-stat-val>' + reading + '</div>' +
      '<div class=an-stat-lbl>Okuma</div>' +
      '<div class=an-stat-sub>Tamamlanan hikaye</div>' +
    '</div>';

    grid.innerHTML = html;
  }

  // Patch _initAnalytics to also call renderModeStats
  function patchAnalytics() {
    if (!window._app || !window._app._initAnalytics) return;
    var orig = window._app._initAnalytics.bind(window._app);
    window._app._initAnalytics = function() {
      orig();
      renderModeStats();
    };
  }

  // sessionsToday midnight reset: check on app start
  function checkSessionsReset() {
    if (!window._app) return;
    var st = window._app.state;
    var lastActive = st.get('lastActive') || '';
    var today = new Date().toISOString().split('T')[0];
    if (lastActive && lastActive !== today) {
      st.update({ sessionsToday: 0 });
    }
  }

  if (window._app) {
    patchAnalytics();
    checkSessionsReset();
  } else {
    var _waitApp = setInterval(function() {
      if (window._app) {
        clearInterval(_waitApp);
        patchAnalytics();
        checkSessionsReset();
      }
    }, 100);
  }
})();
