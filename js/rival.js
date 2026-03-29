/* js/rival.js — Online Rival Mode (Firestore real-time) */
'use strict';

(function () {

const Q_COUNT           = 10;
const TIMER_SEC         = 15;
const CINEMA_CLIP_COUNT = 5;
const CINEMA_Q_SEC      = 8;
const QUEUE_TTL_MS      = 120_000;
const SEARCH_MAX_MS     = 90_000;
const CIRCUM            = 119.4;

/* ── Helpers ──────────────────────────────────────── */

function _sh(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function _esc(s) {
  return String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function _colorWord(str) {
  const colors = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#c77dff','#ff9a3c','#00c9a7','#ff6b9d','#f0a500','#56cfe1'];
  return [...String(str||'')].map((ch, i) =>
    ch === ' ' ? ' ' : `<span style="color:${colors[i % colors.length]}">${_esc(ch)}</span>`
  ).join('');
}

/* ── Question builders ────────────────────────────── */

function _buildTranslate(level, n) {
  if (typeof TRANSLATE_DATA === 'undefined' || !TRANSLATE_DATA.length) return [];
  const pool = _sh(level === 'ALL'
    ? [...TRANSLATE_DATA]
    : TRANSLATE_DATA.filter(s => s.level === level));
  if (pool.length < 4) return [];
  return pool.slice(0, n).map(s => {
    const wrongs = _sh(pool.filter(x => x.en !== s.en).map(x => x.en).filter(Boolean));
    return {
      prompt: s.tr, correct: s.en,
      choices: _sh([s.en, ...wrongs.slice(0, 3)]),
      meta: s.level || ''
    };
  });
}

function _buildCinemaClips(n) {
  if (typeof CINEMA_DATA === 'undefined' || !CINEMA_DATA.length) return [];
  const ansPool = [];
  for (const clip of CINEMA_DATA)
    for (const q of (clip.questions || []))
      if (q.correct) ansPool.push(q.correct);

  const pool = _sh([...CINEMA_DATA]).slice(0, n);
  return pool.map(clip => {
    const qs = (clip.questions || [])
      .filter(q => q.phrase && q.correct && q.wrong)
      .map(q => {
        const dist = _sh(ansPool.filter(a => a !== q.correct && a !== q.wrong));
        return {
          phrase:  q.phrase,
          correct: q.correct,
          choices: _sh([q.correct, q.wrong, ...dist.slice(0, 2)])
        };
      });
    return {
      url: clip.url || '', start: clip.start || 0, end: clip.end || 10,
      film: clip.film || '', cefr: clip.cefr || '',
      questions: qs
    };
  });
}

function _buildSynesthesia(level, n) {
  if (typeof WORDS === 'undefined' || !WORDS.length) return [];
  const pool = _sh(WORDS.filter(w => w.en && w.tr && (level === 'ALL' || w.level === level)));
  if (pool.length < 4) return [];
  return pool.slice(0, n).map(w => ({
    prompt: w.tr, correct: w.en, meta: (w.icon||'') + ' ' + (w.level||'')
  }));
}

function _buildPhantom(level, n) {
  if (typeof WORDS === 'undefined' || !WORDS.length) return [];
  const pool = _sh(WORDS.filter(w => w.en && w.tr && (level === 'ALL' || w.level === level)));
  if (pool.length < 4) return [];
  return pool.slice(0, n).map(w => ({
    prompt: w.en, correct: w.en, tr: w.tr,
    meta: (w.icon||'') + ' ' + (w.level||''), phantom: true
  }));
}

/* ── RivalMode ────────────────────────────────────── */

class RivalMode {
  constructor(app) {
    this.app         = app;
    this.el          = null;
    this._matchId    = null;
    this._role       = null;
    this._matchData  = null;
    this._unsub      = null;
    this._unsubQ     = null;
    this._qIdx       = 0;
    this._clipIdx    = 0;
    this._cinemaQIdx = 0;
    this._score      = 0;
    this._maxScore   = Q_COUNT * 10;
    this._timer      = null;
    this._timerVal   = TIMER_SEC;
    this._answered   = false;
    this._phase      = 'lobby';
    this._searchTmr  = null;
    this._mode        = 'translate';
    this._level       = 'ALL';
    this._vid         = null;
    this._preloaderVid = null;
    this._bufTimeout  = null;
    this._kbHandler   = null;
    this._typed       = [];
  }

  init(el) {
    this.el = el;
    el.classList.add('rv-fullscreen');
    this._enterFullscreen();
    this._renderLobby();
  }

  destroy() {
    this._clearTimer();
    this._unbindTypingKeys();
    if (this._vid) { try { this._vid.pause(); this._vid.src = ''; } catch(e){} this._vid = null; }
    if (this._preloaderVid) { try { this._preloaderVid.src = ''; this._preloaderVid.remove(); } catch(e){} this._preloaderVid = null; }
    if (this._bufTimeout) { clearTimeout(this._bufTimeout); this._bufTimeout = null; }
    if (this._unsub)     { this._unsub();     this._unsub     = null; }
    if (this._unsubQ)    { this._unsubQ();    this._unsubQ    = null; }
    if (this._searchTmr) { clearTimeout(this._searchTmr); this._searchTmr = null; }
    this._leaveQueue();
    if (this.el) this.el.classList.remove('rv-fullscreen');
    this._exitFullscreen();
    window.rivalMod = null;
  }

  _enterFullscreen() {
    try {
      const el = document.documentElement;
      const fn = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen;
      if (fn) fn.call(el).catch(() => {});
    } catch(e) {}
    try {
      if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
    } catch(e) {}
  }

  _exitFullscreen() {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        const fn = document.exitFullscreen || document.webkitExitFullscreen;
        if (fn) fn.call(document).catch(() => {});
      }
    } catch(e) {}
    try {
      if (screen.orientation && screen.orientation.lock)
        screen.orientation.lock('portrait').catch(() => {});
    } catch(e) {}
  }

  _db()   { return window.authManager && window.authManager._db; }
  _uid()  { return window.authManager && window.authManager.uid; }
  _name() { return (window.authManager && window.authManager.displayName) || 'Kullanıcı'; }

  /* ── Lobby ────────────────────────────────────────── */

  _renderLobby() {
    this._phase = 'lobby';
    const ok = !!(window.authManager && window.authManager.isLoggedIn);
    this.el.innerHTML = `
      <div class="rv-lobby">
        <div class="rv-lb-topbar"><button class="rv-back-btn" id="rv-back">← Geri</button></div>
        <div class="rv-lb-hero">
          <div class="rv-lb-icon">⚔️</div>
          <h1 class="rv-lb-title">RİVAL MODU</h1>
          <p class="rv-lb-sub">Gerçek zamanlı rakip karşılaşması</p>
        </div>
        ${!ok ? `
          <div class="rv-login-wall">
            <div class="rv-lw-icon">🔒</div>
            <p class="rv-lw-text">Oynamak için giriş yapman gerekiyor.</p>
            <button class="rv-btn-primary" id="rv-login">Giriş Yap</button>
          </div>
        ` : `
          <div class="rv-lb-form">
            <label class="rv-form-label">Oyun Modu</label>
            <div class="rv-mode-grid">
              <button class="rv-mode-card active" data-rv-mode="translate">
                <span>🔄</span><strong>Çeviri</strong><small>TR → EN cümle</small>
              </button>
              <button class="rv-mode-card" data-rv-mode="cinema">
                <span>🎬</span><strong>Sinema</strong><small>5 video · Hız Puanı</small>
              </button>
              <button class="rv-mode-card" data-rv-mode="synesthesia">
                <span>🎨</span><strong>Sinestezi</strong><small>TR → EN yazım</small>
              </button>
              <button class="rv-mode-card" data-rv-mode="phantom">
                <span>👻</span><strong>Phantom</strong><small>Kelimeyi ezberle</small>
              </button>
            </div>
            <div id="rv-lv-sec">
              <label class="rv-form-label">Seviye</label>
              <div class="rv-level-row">
                ${['A1','A2','B1','B2','C1','C2','ALL'].map(l =>
                  `<button class="rv-lv-btn${l==='ALL'?' active':''}" data-rv-lv="${l}">${l==='ALL'?'Tümü':l}</button>`
                ).join('')}
              </div>
            </div>
            <div class="rv-match-info" id="rv-minfo">
              <span>⏱ ${TIMER_SEC} sn/soru</span>
              <span>❓ ${Q_COUNT} soru</span>
              <span>🏆 Kazanana +50 XP</span>
            </div>
            <button class="rv-btn-primary rv-find-btn" id="rv-find">⚔️ Rakip Bul</button>
          </div>
        `}
      </div>`;

    this.el.querySelector('#rv-back').addEventListener('click', () => {
      this.destroy(); this.app.navigate('home');
    });
    if (!ok) {
      const lb = this.el.querySelector('#rv-login');
      if (lb) lb.addEventListener('click', () => window.authUI && window.authUI.open());
      return;
    }
    this.el.querySelectorAll('[data-rv-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.el.querySelectorAll('[data-rv-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._mode = btn.dataset.rvMode;
        const sec  = this.el.querySelector('#rv-lv-sec');
        const info = this.el.querySelector('#rv-minfo');
        if (this._mode === 'cinema') {
          if (sec)  sec.style.display = 'none';
          this._level = 'ALL';
          if (info) info.innerHTML = `<span>⏱ ${CINEMA_Q_SEC} sn/soru</span><span>🎬 ${CINEMA_CLIP_COUNT} klip</span><span>⚡ Hız Puanı</span><span>🏆 Kazanana +50 XP</span>`;
        } else if (this._mode === 'synesthesia') {
          if (sec)  sec.style.display = '';
          if (info) info.innerHTML = `<span>⏱ ${TIMER_SEC} sn/soru</span><span>❓ ${Q_COUNT} soru</span><span>🎨 Renkli Yazım</span><span>🏆 Kazanana +50 XP</span>`;
        } else if (this._mode === 'phantom') {
          if (sec)  sec.style.display = '';
          if (info) info.innerHTML = `<span>⏱ ${TIMER_SEC} sn/soru</span><span>❓ ${Q_COUNT} soru</span><span>👻 1.2 sn Flash</span><span>🏆 Kazanana +50 XP</span>`;
        } else {
          if (sec)  sec.style.display = '';
          if (info) info.innerHTML = `<span>⏱ ${TIMER_SEC} sn/soru</span><span>❓ ${Q_COUNT} soru</span><span>🏆 Kazanana +50 XP</span>`;
        }
      });
    });
    this.el.querySelectorAll('[data-rv-lv]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.el.querySelectorAll('[data-rv-lv]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._level = btn.dataset.rvLv;
      });
    });
    this.el.querySelector('#rv-find').addEventListener('click', () => this._startSearch());
  }

  /* ── Matchmaking ──────────────────────────────────── */

  async _startSearch() {
    const db = this._db();
    if (!db) { typeof UI !== 'undefined' && UI.toast('Firebase bağlantısı yok'); return; }
    const uid   = this._uid();
    const name  = this._name();
    const mode  = this._mode;
    const level = mode === 'cinema' ? 'ALL' : this._level;
    const key   = mode + '_' + level;
    this._renderWaiting();
    try {
      const snap = await db.collection('rival_queue').where('mode_level','==',key).limit(20).get();
      const now  = Date.now();
      const pool = snap.docs.filter(d => {
        const da = d.data();
        return d.id !== uid && !da.matchId &&
          (now - ((da.createdAt && da.createdAt.toMillis && da.createdAt.toMillis()) || 0)) < QUEUE_TTL_MS;
      });
      if (pool.length > 0) {
        const oppDoc  = pool[Math.floor(Math.random() * pool.length)];
        const oppData = oppDoc.data();
        await this._createMatch(mode, level, uid, name, oppData.uid, oppData.name, oppDoc.id);
      } else {
        await db.collection('rival_queue').doc(uid).set({
          uid, name, mode_level: key, mode, level, matchId: null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        this._unsubQ = db.collection('rival_queue').doc(uid).onSnapshot(snap => {
          const data = snap.data();
          if (data && data.matchId && this._phase === 'waiting') {
            this._phase = 'joining';
            if (this._unsubQ) { this._unsubQ(); this._unsubQ = null; }
            this._joinMatch(data.matchId, 'guest');
          }
        });
        this._searchTmr = setTimeout(() => {
          if (this._phase === 'waiting') {
            this._leaveQueue();
            if (this._unsubQ) { this._unsubQ(); this._unsubQ = null; }
            this._renderLobby();
            typeof UI !== 'undefined' && UI.toast('Rakip bulunamadı, tekrar dene 🔍');
          }
        }, SEARCH_MAX_MS);
      }
    } catch (e) {
      console.error('[Rival] search error:', e);
      typeof UI !== 'undefined' && UI.toast('Hata: ' + (e.message || 'bilinmeyen'));
      this._renderLobby();
    }
  }

  async _ensureData(mode) {
    const srcs = mode === 'cinema'
      ? ['js/video-data.js']
      : (mode === 'synesthesia' || mode === 'phantom')
      ? [] // WORDS loaded at startup via data.js
      : ['js/translate-data.js','js/translate-data2.js','js/translate-data3.js',
         'js/translate-data4.js','js/translate-data5.js','js/translate-data6.js'];
    for (const src of srcs) {
      await new Promise(resolve => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src; s.onload = resolve; s.onerror = resolve;
        document.head.appendChild(s);
      });
    }
  }

  async _createMatch(mode, level, hostId, hostName, guestId, guestName, guestQueueId) {
    const db  = this._db();
    await this._ensureData(mode);
    const matchRef = db.collection('rival_matches').doc();
    const matchId  = matchRef.id;
    const batch    = db.batch();
    const ts       = firebase.firestore.FieldValue.serverTimestamp();

    if (mode === 'cinema') {
      const clips = _buildCinemaClips(CINEMA_CLIP_COUNT);
      if (clips.length < CINEMA_CLIP_COUNT) {
        typeof UI !== 'undefined' && UI.toast('Yeterli klip bulunamadı');
        this._renderLobby(); return;
      }
      const maxScore = clips.reduce((s, c) => s + (c.questions || []).length, 0) * 10;
      batch.set(matchRef, {
        status:'playing', mode, level,
        hostId, hostName, guestId, guestName,
        cinemaClips: clips, questions: [], maxScore,
        hostScore:0, guestScore:0, hostClip:0, guestClip:0,
        hostDone:false, guestDone:false,
        createdAt: ts, expiresAt: new Date(Date.now() + 30*60000)
      });
    } else if (mode === 'synesthesia') {
      const questions = _buildSynesthesia(level, Q_COUNT);
      if (questions.length < Q_COUNT) {
        typeof UI !== 'undefined' && UI.toast('Yeterli soru bulunamadı');
        this._renderLobby(); return;
      }
      batch.set(matchRef, {
        status:'playing', mode, level,
        hostId, hostName, guestId, guestName,
        questions, maxScore: Q_COUNT * 10,
        hostScore:0, guestScore:0, hostQ:0, guestQ:0,
        hostDone:false, guestDone:false,
        createdAt: ts, expiresAt: new Date(Date.now() + 30*60000)
      });
    } else if (mode === 'phantom') {
      const questions = _buildPhantom(level, Q_COUNT);
      if (questions.length < Q_COUNT) {
        typeof UI !== 'undefined' && UI.toast('Yeterli soru bulunamadı');
        this._renderLobby(); return;
      }
      batch.set(matchRef, {
        status:'playing', mode, level,
        hostId, hostName, guestId, guestName,
        questions, maxScore: Q_COUNT * 10,
        hostScore:0, guestScore:0, hostQ:0, guestQ:0,
        hostDone:false, guestDone:false,
        createdAt: ts, expiresAt: new Date(Date.now() + 30*60000)
      });
    } else {
      const questions = _buildTranslate(level, Q_COUNT);
      if (questions.length < Q_COUNT) {
        typeof UI !== 'undefined' && UI.toast('Yeterli soru bulunamadı');
        this._renderLobby(); return;
      }
      batch.set(matchRef, {
        status:'playing', mode, level,
        hostId, hostName, guestId, guestName,
        questions, maxScore: Q_COUNT * 10,
        hostScore:0, guestScore:0, hostQ:0, guestQ:0,
        hostDone:false, guestDone:false,
        createdAt: ts, expiresAt: new Date(Date.now() + 30*60000)
      });
    }

    batch.update(db.collection('rival_queue').doc(guestQueueId), { matchId });
    batch.delete(db.collection('rival_queue').doc(hostId));
    await batch.commit();
    this._role    = 'host';
    this._matchId = matchId;
    await this._joinMatch(matchId, 'host');
  }

  async _joinMatch(matchId, role) {
    this._matchId = matchId;
    this._role    = role;
    this._qIdx    = 0;
    this._score   = 0;
    this._leaveQueue();
    if (this._unsubQ)    { this._unsubQ();    this._unsubQ    = null; }
    if (this._searchTmr) { clearTimeout(this._searchTmr); this._searchTmr = null; }
    this.el.innerHTML = '<div class="rv-connecting">🔗 Bağlanılıyor…</div>';
    const db = this._db();
    try {
      const snap = await db.collection('rival_matches').doc(matchId).get();
      this._matchData = snap.data();
    } catch (e) {
      typeof UI !== 'undefined' && UI.toast('Maç verisi alınamadı');
      this._renderLobby(); return;
    }
    if (!this._matchData) {
      typeof UI !== 'undefined' && UI.toast('Maç bulunamadı');
      this._renderLobby(); return;
    }
    this._maxScore = this._matchData.maxScore || Q_COUNT * 10;
    this._unsub = db.collection('rival_matches').doc(matchId).onSnapshot(snap => {
      const data = snap.data();
      if (!data) return;
      this._matchData = data;
      if (this._phase === 'playing') this._onLive(data);
    });
    this._phase = 'countdown';
    this._renderCountdown();
  }

  _leaveQueue() {
    const uid = this._uid(); const db = this._db();
    if (!uid || !db) return;
    db.collection('rival_queue').doc(uid).delete().catch(() => {});
  }

  /* ── Waiting ──────────────────────────────────────── */

  _renderWaiting() {
    this._phase = 'waiting';
    const mLabel = this._mode === 'cinema' ? '🎬 Sinema' : this._mode === 'synesthesia' ? '🎨 Sinestezi' : this._mode === 'phantom' ? '👻 Phantom' : '🔄 Çeviri';
    const lvText = this._mode === 'cinema' ? '' : ' · ' + this._level;
    this.el.innerHTML = `
      <div class="rv-waiting">
        <button class="rv-back-btn" id="rv-cancel">← İptal</button>
        <div class="rv-wait-anim">
          <div class="rv-pulse-ring rv-pr-1"></div>
          <div class="rv-pulse-ring rv-pr-2"></div>
          <div class="rv-pulse-ring rv-pr-3"></div>
          <div class="rv-wait-icon">⚔️</div>
        </div>
        <h2 class="rv-wait-title">Rakip Aranıyor…</h2>
        <p class="rv-wait-mode">${mLabel}${lvText}</p>
        <div class="rv-wait-dots"><span></span><span></span><span></span></div>
      </div>`;
    this.el.querySelector('#rv-cancel').addEventListener('click', () => {
      this._leaveQueue();
      if (this._unsubQ)    { this._unsubQ();    this._unsubQ    = null; }
      if (this._searchTmr) { clearTimeout(this._searchTmr); this._searchTmr = null; }
      this._renderLobby();
    });
  }

  /* ── Countdown ────────────────────────────────────── */

  _renderCountdown() {
    const m       = this._matchData || {};
    const myN     = this._name();
    const opN     = this._role === 'host' ? (m.guestName || '…') : (m.hostName || '…');
    const isCinema = m.mode === 'cinema';
    const ml      = m.mode === 'cinema' ? '🎬 Sinema' : m.mode === 'synesthesia' ? '🎨 Sinestezi' : m.mode === 'phantom' ? '👻 Phantom' : '🔄 Çeviri';
    const lv      = m.level !== 'ALL' ? ' · ' + m.level : '';
    const cnt     = isCinema ? CINEMA_CLIP_COUNT + ' klip' : Q_COUNT + ' soru';

    this.el.innerHTML = `
      <div class="rv-countdown">
        <div class="rv-cd-mode">${ml}${lv} · ${cnt}</div>
        <div class="rv-cd-players">
          <div class="rv-cd-player">
            <div class="rv-cd-avatar rv-av-you">${(myN[0]||'?').toUpperCase()}</div>
            <div class="rv-cd-name">${_esc(myN)}</div>
            <div class="rv-cd-badge">SEN</div>
          </div>
          <div class="rv-cd-vsbox">
            <div class="rv-cd-vs">VS</div>
            <div class="rv-cd-num" id="rv-cd-n">3</div>
          </div>
          <div class="rv-cd-player">
            <div class="rv-cd-avatar rv-av-opp">${(opN[0]||'?').toUpperCase()}</div>
            <div class="rv-cd-name">${_esc(opN)}</div>
            <div class="rv-cd-badge">RAKİP</div>
          </div>
        </div>
        ${isCinema ? '<div class="rv-cd-hint">🎬 Videoyu izle · soruyu yanıtla · hızlı cevap daha fazla puan!</div>' : m.mode === 'phantom' ? '<div class="rv-cd-hint">👻 Kelimeyi 1.2 saniye ezberle, sonra Türkçe anlamını seç!</div>' : m.mode === 'synesthesia' ? '<div class="rv-cd-hint">🎨 Türkçe kelimeyi gör, doğru İngilizce yazımı seç!</div>' : ''}
      </div>`;

    let n = 3;
    const tick = () => {
      const el = this.el.querySelector('#rv-cd-n');
      if (!el) return;
      if (n === 0) { el.textContent = '🏁'; el.classList.add('rv-cd-go'); setTimeout(() => this._startGame(), 600); return; }
      el.textContent = n--;
      el.classList.remove('rv-cd-pop'); void el.offsetWidth; el.classList.add('rv-cd-pop');
      setTimeout(tick, 1000);
    };
    setTimeout(tick, 700);
  }

  /* ── Game fork ────────────────────────────────────── */

  _startGame() {
    this._phase = 'playing';
    this._score = 0;
    const m = this._matchData || {};
    if (m.mode === 'cinema') {
      this._clipIdx = 0; this._cinemaQIdx = 0;
      this._renderCinemaArena();
    } else {
      this._qIdx = 0;
      this._renderArena();
    }
  }

  /* ── Translate Arena ──────────────────────────────── */

  _renderArena() {
    const m   = this._matchData || {};
    const myN = this._name();
    const opN = (this._role === 'host' ? m.guestName : m.hostName) || 'Rakip';
    this.el.innerHTML = `
      <div class="rv-arena">
        <div class="rv-scorebar">
          <div class="rv-sb-you">
            <div class="rv-sb-name">${_esc(myN)}</div>
            <div class="rv-sb-score" id="rv-my-s">0</div>
          </div>
          <div class="rv-sb-center">
            <div class="rv-timer-wrap">
              <svg class="rv-timer-svg" viewBox="0 0 44 44">
                <circle class="rv-tr-bg"   cx="22" cy="22" r="19"/>
                <circle class="rv-tr-fill" id="rv-ring" cx="22" cy="22" r="19"
                  stroke-dasharray="${CIRCUM} ${CIRCUM}" stroke-dashoffset="0"/>
              </svg>
              <span class="rv-timer-num" id="rv-tmr">${TIMER_SEC}</span>
            </div>
            <div class="rv-qcount" id="rv-qc">1/${Q_COUNT}</div>
          </div>
          <div class="rv-sb-opp">
            <div class="rv-sb-name">${_esc(opN)}</div>
            <div class="rv-sb-score" id="rv-op-s">0</div>
          </div>
        </div>
        <div class="rv-progress-duel">
          <div class="rv-pd-you" id="rv-pd-y" style="width:0%"></div>
          <div class="rv-pd-opp" id="rv-pd-o" style="width:0%"></div>
        </div>
        <div class="rv-question-zone" id="rv-qz"></div>
        <div class="rv-vkb" id="rv-vkb"></div>
      </div>`;
    this._showQ();
  }

  _showQ() {
    const q = this._matchData && this._matchData.questions && this._matchData.questions[this._qIdx];
    if (!q) { this._finishMatch(); return; }
    this._answered = false; this._timerVal = TIMER_SEC;
    const zone = this.el.querySelector('#rv-qz');
    const qc   = this.el.querySelector('#rv-qc');
    if (!zone) return;
    if (qc) qc.textContent = (this._qIdx + 1) + '/' + Q_COUNT;
    const mode = (this._matchData && this._matchData.mode) || 'translate';
    if (mode === 'synesthesia' || mode === 'phantom') { this._showTypingQ(q, zone); return; }
    zone.innerHTML = `
      <div class="rv-q animate-in">
        ${q.meta ? `<div class="rv-q-meta">${_esc(q.meta)}</div>` : ''}
        <div class="rv-q-prompt">${_esc(q.prompt)}</div>
        <p class="rv-q-cue">Doğru çeviriyi seç</p>
        <div class="rv-q-choices">
          ${q.choices.map((c,i) => `
            <button class="rv-choice" data-val="${_esc(c)}">
              <span class="rv-ch-letter">${'ABCD'[i]}</span>
              <span class="rv-ch-text">${_esc(c)}</span>
            </button>`).join('')}
        </div>
      </div>`;
    zone.querySelectorAll('.rv-choice').forEach(btn =>
      btn.addEventListener('click', () => this._pick(btn.dataset.val, q.correct)));
    this._startTimer(q.correct);
  }

  _showTypingQ(q, zone) {
    const LCOLORS = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#c77dff','#ff9a3c','#00c9a7','#ff6b9d','#f0a500','#56cfe1'];
    this._typed = [];
    const word = q.correct;
    const isPhantom = !!q.phantom;

    const slots = word.split('').map((ch, i) =>
      ch === ' '
        ? `<span class="rv-ls rv-ls-space" data-idx="${i}"></span>`
        : `<span class="rv-ls rv-ls-empty" data-idx="${i}" style="--lc:${LCOLORS[i % LCOLORS.length]}"></span>`
    ).join('');

    const promptHtml = isPhantom
      ? `<div class="rv-phantom-flash" id="rv-ph-word">${_esc(q.prompt)}</div>
         <div class="rv-ph-sub" id="rv-ph-sub">${_esc(q.tr||'')}</div>
         <div class="rv-ph-bar-wrap"><div class="rv-ph-bar" id="rv-ph-bar"></div></div>`
      : `<div class="rv-q-prompt rv-syn-prompt">${_colorWord(q.prompt)}</div>
         <p class="rv-q-cue">İngilizce yazımını yaz</p>`;

    zone.innerHTML = `
      <div class="rv-q rv-q-typing animate-in">
        ${q.meta ? `<div class="rv-q-meta">${_esc(q.meta)}</div>` : ''}
        ${promptHtml}
        <div class="rv-letters-wrap ${isPhantom ? 'rv-ph-hide' : ''}" id="rv-letters">
          <div class="rv-ls-row">${slots}</div>
        </div>
        <div class="rv-type-status" id="rv-type-status"></div>
      </div>`;

    if (isPhantom) {
      const bar = zone.querySelector('#rv-ph-bar');
      if (bar) requestAnimationFrame(() => { bar.style.transition = 'width 1200ms linear'; bar.style.width = '0%'; });
      setTimeout(() => {
        const we = zone.querySelector('#rv-ph-word');
        const se = zone.querySelector('#rv-ph-sub');
        const lw = zone.querySelector('#rv-letters');
        if (we) we.classList.add('rv-ph-fade');
        if (se) se.classList.add('rv-ph-fade');
        if (lw) lw.classList.remove('rv-ph-hide');
        this._updateTypingCursor();
        this._startTimer(word);
        this._bindTypingKeys();
        this._showTypingVKB(true);
      }, 1200);
    } else {
      this._updateTypingCursor();
      this._startTimer(word);
      this._bindTypingKeys();
      this._showTypingVKB(true);
    }
  }

  _updateTypingCursor() {
    const pos = this._typed.length;
    const q = this._matchData && this._matchData.questions && this._matchData.questions[this._qIdx];
    const word = q ? q.correct : '';
    this.el.querySelectorAll('.rv-ls').forEach((slot, i) => {
      slot.classList.remove('rv-ls-cursor');
      if (i === pos && word[i] !== ' ') slot.classList.add('rv-ls-cursor');
    });
  }

  _typeRivalChar(ch) {
    if (this._answered) return;
    const q = this._matchData && this._matchData.questions && this._matchData.questions[this._qIdx];
    if (!q) return;
    const word = q.correct;
    const wLow = word.toLowerCase();
    const pos  = this._typed.length;
    if (pos >= word.length) return;
    const slot = this.el.querySelector(`[data-idx="${pos}"]`);
    if (ch.toLowerCase() === wLow[pos]) {
      this._typed.push(ch.toLowerCase());
      if (slot) { slot.classList.remove('rv-ls-empty','rv-ls-cursor'); slot.classList.add('rv-ls-done'); slot.textContent = word[pos]; }
      while (this._typed.length < word.length && wLow[this._typed.length] === ' ') {
        const sp = this.el.querySelector(`[data-idx="${this._typed.length}"]`);
        if (sp) sp.classList.add('rv-ls-done');
        this._typed.push(' ');
      }
      if (this._typed.length >= word.length) {
        this._unbindTypingKeys(); this._showTypingVKB(false);
        this._pick(word, word);
      } else {
        this._updateTypingCursor();
      }
    } else {
      if (slot) { slot.classList.add('rv-ls-error'); setTimeout(() => slot && slot.classList.remove('rv-ls-error'), 280); }
    }
  }

  _backspaceRival() {
    if (this._answered) return;
    const q = this._matchData && this._matchData.questions && this._matchData.questions[this._qIdx];
    if (!q || !this._typed.length) return;
    const word = q.correct;
    while (this._typed.length > 0 && word[this._typed.length - 1] === ' ') {
      const sp = this.el.querySelector(`[data-idx="${this._typed.length - 1}"]`);
      if (sp) sp.classList.remove('rv-ls-done');
      this._typed.pop();
    }
    if (!this._typed.length) return;
    const pos  = this._typed.length - 1;
    const slot = this.el.querySelector(`[data-idx="${pos}"]`);
    if (slot) { slot.classList.remove('rv-ls-done'); slot.textContent = ''; }
    this._typed.pop();
    this._updateTypingCursor();
  }

  _bindTypingKeys() {
    this._unbindTypingKeys();
    this._kbHandler = e => {
      if (this._answered) return;
      if (e.key === 'Backspace') { e.preventDefault(); this._backspaceRival(); }
      else if (e.key.length === 1 && /[a-zA-Z'-]/.test(e.key)) { e.preventDefault(); this._typeRivalChar(e.key); }
    };
    document.addEventListener('keydown', this._kbHandler);
  }

  _unbindTypingKeys() {
    if (this._kbHandler) { document.removeEventListener('keydown', this._kbHandler); this._kbHandler = null; }
  }

  _showTypingVKB(show) {
    const vkb = this.el && this.el.querySelector('#rv-vkb');
    if (!vkb) return;
    vkb.style.display = show ? 'flex' : 'none';
    if (!show || vkb._rvBuilt) return;
    vkb._rvBuilt = true;
    vkb.innerHTML = ['qwertyuiop','asdfghjkl','zxcvbnm'].map(row =>
      `<div class="rv-vkb-row">${row.split('').map(c =>
        `<button class="rv-vkb-key" data-char="${c}">${c.toUpperCase()}</button>`).join('')}</div>`
    ).join('') + '<div class="rv-vkb-row"><button class="rv-vkb-key rv-vkb-bs" data-bs="1">⌫</button></div>';
    vkb.addEventListener('click', e => {
      const btn = e.target.closest('.rv-vkb-key');
      if (!btn) return;
      if (btn.dataset.bs) { this._backspaceRival(); return; }
      if (btn.dataset.char) this._typeRivalChar(btn.dataset.char);
    });
  }

  _startTimer(correct) {
    this._clearTimer(); this._timerVal = TIMER_SEC;
    this._timer = setInterval(() => {
      this._timerVal--;
      const num  = this.el.querySelector('#rv-tmr');
      const ring = this.el.querySelector('#rv-ring');
      if (num) {
        num.textContent = this._timerVal;
        num.className = 'rv-timer-num' + (this._timerVal<=3?' rv-t-danger':this._timerVal<=6?' rv-t-warn':'');
      }
      if (ring) {
        ring.style.strokeDashoffset = CIRCUM * (1 - this._timerVal / TIMER_SEC);
        ring.className = 'rv-tr-fill' + (this._timerVal<=3?' rv-t-danger':this._timerVal<=6?' rv-t-warn':'');
      }
      if (this._timerVal <= 0) { this._clearTimer(); if (!this._answered) this._pick(null, correct); }
    }, 1000);
  }

  _clearTimer() { if (this._timer) { clearInterval(this._timer); this._timer = null; } }

  async _pick(chosen, correct) {
    if (this._answered) return;
    this._answered = true; this._clearTimer();
    this._unbindTypingKeys();
    this._showTypingVKB(false);
    const ok = chosen !== null && chosen === correct;
    if (ok) this._score += 10;
    this.el.querySelectorAll('.rv-choice').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.val === correct)      btn.classList.add('rv-ch-correct');
      else if (btn.dataset.val === chosen)  btn.classList.add('rv-ch-wrong');
    });
    const stEl = this.el.querySelector('#rv-type-status');
    if (stEl) { stEl.textContent = ok ? '✓ Doğru!' : `✗  ${correct}`; stEl.className = 'rv-type-status ' + (ok ? 'rv-ts-ok' : 'rv-ts-wrong'); }
    const nextQ = this._qIdx + 1;
    const done  = nextQ >= Q_COUNT;
    const upd   = this._role === 'host'
      ? Object.assign({ hostScore: this._score, hostQ: nextQ }, done ? { hostDone: true } : {})
      : Object.assign({ guestScore: this._score, guestQ: nextQ }, done ? { guestDone: true } : {});
    const db = this._db();
    if (db && this._matchId) db.collection('rival_matches').doc(this._matchId).update(upd).catch(()=>{});
    const myS = this.el.querySelector('#rv-my-s'); const pdY = this.el.querySelector('#rv-pd-y');
    if (myS) myS.textContent = this._score;
    if (pdY) pdY.style.width = this._pct(this._score) + '%';
    await new Promise(r => setTimeout(r, ok ? 700 : 1100));
    this._qIdx++;
    if (this._qIdx >= Q_COUNT) this._finishMatch(); else this._showQ();
  }

  /* ── Cinema Arena ─────────────────────────────────── */

  _renderCinemaArena() {
    const m   = this._matchData || {};
    const myN = this._name();
    const opN = (this._role === 'host' ? m.guestName : m.hostName) || 'Rakip';
    this.el.innerHTML = `
      <div class="rv-cinema-arena" id="rv-ca">
        <video class="rv-cv" id="rv-vid" playsinline webkit-playsinline preload="auto"></video>
        <div class="rv-cv-overlay"></div>

        <div class="rv-cv-loader" id="rv-cv-loader">
          <div class="rv-cvl-spinner"></div>
          <div class="rv-cvl-label">🎬 Klip <span id="rv-cvl-n">1</span>/${CINEMA_CLIP_COUNT} yükleniyor…</div>
          <div class="rv-cvl-bar-wrap"><div class="rv-cvl-bar" id="rv-cvl-bar" style="width:0%"></div></div>
        </div>
        <div class="rv-cv-buf" id="rv-cv-buf">
          <div class="rv-cvb-ring"></div>
        </div>
        <div class="rv-fs-hud">
          <div class="rv-scorebar rv-scorebar-fs">
            <div class="rv-sb-you">
              <div class="rv-sb-name">${_esc(myN)}</div>
              <div class="rv-sb-score" id="rv-my-s">0</div>
            </div>
            <div class="rv-sb-center">
              <div class="rv-clip-ctr" id="rv-clip-ctr">1/${CINEMA_CLIP_COUNT}</div>
              <div class="rv-speed-tag">⚡ Hız Puanı</div>
            </div>
            <div class="rv-sb-opp">
              <div class="rv-sb-name">${_esc(opN)}</div>
              <div class="rv-sb-score" id="rv-op-s">0</div>
            </div>
          </div>
          <div class="rv-progress-duel">
            <div class="rv-pd-you" id="rv-pd-y" style="width:0%"></div>
            <div class="rv-pd-opp" id="rv-pd-o" style="width:0%"></div>
          </div>
        </div>
        <div class="rv-clip-info" id="rv-clip-info">
          <div class="rv-ci-badge">🎬 KLİP <span id="rv-ci-n">1</span>/${CINEMA_CLIP_COUNT}</div>
          <div class="rv-ci-film" id="rv-ci-film"></div>
          <div class="rv-ci-cue">İzle ve yanıtlamaya hazırlan!</div>
        </div>
        <div class="rv-cq-panel" id="rv-cqp">
          <div class="rv-cq-header">
            <span class="rv-cq-clip-lbl" id="rv-cq-lbl">Klip 1/${CINEMA_CLIP_COUNT}</span>
            <span class="rv-cq-q-lbl" id="rv-cq-qlbl"></span>
          </div>
          <div class="rv-cq-speed-wrap">
            <div class="rv-cq-speed-bar"><div class="rv-cq-speed-fill" id="rv-sq-fill" style="width:100%"></div></div>
            <span class="rv-cq-speed-num" id="rv-sq-num">${CINEMA_Q_SEC}</span>
          </div>
          <div class="rv-cq-phrase" id="rv-cq-phrase"></div>
          <p class="rv-cq-cue">Türkçe karşılığını seç</p>
          <div class="rv-cq-choices" id="rv-cq-choices"></div>
        </div>
      </div>`;
    this._playClip(0);
  }

  _playClip(clipIdx) {
    const m     = this._matchData || {};
    const clips = m.cinemaClips || [];
    if (clipIdx >= clips.length || clipIdx >= CINEMA_CLIP_COUNT) { this._finishMatch(); return; }

    const clip = clips[clipIdx];
    this._clipIdx    = clipIdx;
    this._cinemaQIdx = 0;

    // Update counters & labels
    const ctr = this.el.querySelector('#rv-clip-ctr');
    const ciN = this.el.querySelector('#rv-ci-n');
    const ciF = this.el.querySelector('#rv-ci-film');
    const lbl = this.el.querySelector('#rv-cq-lbl');
    const cvlN = this.el.querySelector('#rv-cvl-n');
    if (ctr)  ctr.textContent  = (clipIdx + 1) + '/' + CINEMA_CLIP_COUNT;
    if (ciN)  ciN.textContent  = clipIdx + 1;
    if (ciF)  ciF.textContent  = [clip.film, clip.cefr].filter(Boolean).join(' · ');
    if (lbl)  lbl.textContent  = 'Klip ' + (clipIdx + 1) + '/' + CINEMA_CLIP_COUNT;
    if (cvlN) cvlN.textContent = clipIdx + 1;

    // Hide question panel + clip info, show loader
    const info   = this.el.querySelector('#rv-clip-info');
    const panel  = this.el.querySelector('#rv-cqp');
    const loader = this.el.querySelector('#rv-cv-loader');
    const bar    = this.el.querySelector('#rv-cvl-bar');
    if (info)   info.classList.remove('rv-ci-in');
    if (panel)  panel.classList.remove('rv-cqp-in');
    if (loader) loader.classList.add('rv-cvl-show');
    if (bar)    bar.style.width = '0%';
    this._showVidBuf(false);

    // Cancel any previous buffer timeout
    if (this._bufTimeout) { clearTimeout(this._bufTimeout); this._bufTimeout = null; }

    const vid = this.el.querySelector('#rv-vid');
    if (!vid) return;
    this._vid = vid;
    vid.onwaiting = () => this._showVidBuf(true);
    vid.onplaying = () => this._showVidBuf(false);

    // Animate loader bar using buffered ranges
    const barTick = setInterval(() => {
      try {
        if (vid.buffered.length && vid.duration > 0) {
          const pct = (vid.buffered.end(vid.buffered.length - 1) / vid.duration) * 100;
          if (bar) bar.style.width = Math.min(96, pct) + '%';
        }
      } catch(e) {}
    }, 250);

    const doPlay = () => {
      clearInterval(barTick);
      if (bar) bar.style.width = '100%';
      if (loader) { setTimeout(() => loader.classList.remove('rv-cvl-show'), 200); }
      if (info)   { setTimeout(() => info.classList.add('rv-ci-in'), 200); }
      vid.currentTime = clip.start;
      vid.ontimeupdate = () => {
        if (vid.currentTime >= clip.end - 0.15) {
          vid.pause();
          vid.ontimeupdate = null;
          vid.onwaiting = null;
          vid.onplaying = null;
          this._showVidBuf(false);
          if (info) info.classList.remove('rv-ci-in');
          setTimeout(() => this._showCinemaQ(clipIdx, 0), 500);
        }
      };
      const p = vid.play();
      if (p) p.catch(() => this._showVidPlayBtn(vid, doPlay));
    };

    const onReady = () => {
      clearInterval(barTick);
      if (this._bufTimeout) { clearTimeout(this._bufTimeout); this._bufTimeout = null; }
      doPlay();
    };

    // Change src only if different (preserves browser cache on same url)
    if (vid.src !== clip.url) { vid.src = clip.url; vid.load(); }
    else { vid.load(); }

    if (vid.readyState >= 4) {
      onReady();
    } else {
      vid.addEventListener('canplaythrough', onReady, { once: true });
      // Fallback: start after 12 s regardless (slow network)
      this._bufTimeout = setTimeout(() => {
        vid.removeEventListener('canplaythrough', onReady);
        clearInterval(barTick);
        doPlay();
      }, 12000);
    }
  }

  _showVidBuf(show) {
    const el = this.el && this.el.querySelector('#rv-cv-buf');
    if (el) el.classList.toggle('rv-cvb-show', show);
  }

  _showVidPlayBtn(vid, onPlay) {
    const arena = this.el.querySelector('#rv-ca');
    if (!arena || arena.querySelector('.rv-vid-play-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'rv-vid-play-btn';
    btn.innerHTML = '▶ Videoyu Başlat';
    btn.onclick = () => { btn.remove(); onPlay(); };
    arena.appendChild(btn);
  }

  _preloadNextClip(clipIdx) {
    const m     = this._matchData || {};
    const clips = m.cinemaClips || [];
    if (clipIdx >= clips.length || clipIdx >= CINEMA_CLIP_COUNT) return;
    const clip = clips[clipIdx];
    if (!clip || !clip.url) return;
    // Already preloading this clip?
    if (this._preloaderVid && this._preloaderVid._rvClipIdx === clipIdx) return;
    // Clean up old preloader
    if (this._preloaderVid) {
      try { this._preloaderVid.src = ''; this._preloaderVid.remove(); } catch(e) {}
      this._preloaderVid = null;
    }
    const pv = document.createElement('video');
    pv._rvClipIdx = clipIdx;
    pv.preload    = 'auto';
    pv.muted      = true;
    pv.src        = clip.url;
    pv.style.cssText = 'position:fixed;width:1px;height:1px;top:-9999px;left:-9999px;opacity:0;pointer-events:none;';
    document.body.appendChild(pv);
    pv.load();
    this._preloaderVid = pv;
  }

  _showCinemaQ(clipIdx, qIdx) {
    const m     = this._matchData || {};
    const clips = m.cinemaClips || [];
    const clip  = clips[clipIdx];
    if (!clip) { this._finishMatch(); return; }

    const qs = clip.questions || [];
    if (qIdx >= qs.length) {
      const nextClip = clipIdx + 1;
      const panel = this.el.querySelector('#rv-cqp');
      if (panel) panel.classList.remove('rv-cqp-in');
      if (nextClip >= CINEMA_CLIP_COUNT || nextClip >= clips.length) this._finishMatch();
      else setTimeout(() => this._playClip(nextClip), 700);
      return;
    }

    const q = qs[qIdx];
    this._cinemaQIdx = qIdx;

    // İlk soruda bir sonraki klibi arka planda yükle
    if (qIdx === 0) this._preloadNextClip(clipIdx + 1);

    const panel = this.el.querySelector('#rv-cqp');
    if (panel) { panel.classList.remove('rv-cqp-in'); void panel.offsetWidth; panel.classList.add('rv-cqp-in'); }

    const qlbl     = this.el.querySelector('#rv-cq-qlbl');
    const phraseEl = this.el.querySelector('#rv-cq-phrase');
    const choicesEl = this.el.querySelector('#rv-cq-choices');
    if (qlbl)     qlbl.textContent     = 'Soru ' + (qIdx + 1) + '/' + qs.length;
    if (phraseEl) phraseEl.textContent = q.phrase;
    if (choicesEl) {
      choicesEl.innerHTML = q.choices.map((c, i) => `
        <button class="rv-choice" data-val="${_esc(c)}">
          <span class="rv-ch-letter">${'ABCD'[i]}</span>
          <span class="rv-ch-text">${_esc(c)}</span>
        </button>`).join('');
      choicesEl.querySelectorAll('.rv-choice').forEach(btn =>
        btn.addEventListener('click', () => this._pickCinema(btn.dataset.val, q.correct)));
    }
    this._answered = false; this._timerVal = CINEMA_Q_SEC;
    this._startCinemaTimer(q.correct);
  }

  _startCinemaTimer(correct) {
    this._clearTimer();
    const fill = this.el.querySelector('#rv-sq-fill');
    const num  = this.el.querySelector('#rv-sq-num');
    if (fill) fill.style.width = '100%';
    if (num)  num.textContent = CINEMA_Q_SEC;

    this._timer = setInterval(() => {
      this._timerVal--;
      const t = Math.max(0, this._timerVal);
      const cls = t <= 2 ? ' rv-t-danger' : t <= 4 ? ' rv-t-warn' : '';
      if (num)  { num.textContent = t; num.className = 'rv-cq-speed-num' + cls; }
      if (fill) { fill.style.width = (t / CINEMA_Q_SEC * 100) + '%'; fill.className = 'rv-cq-speed-fill' + cls; }
      if (this._timerVal <= 0) { this._clearTimer(); if (!this._answered) this._pickCinema(null, correct); }
    }, 1000);
  }

  async _pickCinema(chosen, correct) {
    if (this._answered) return;
    this._answered = true; this._clearTimer();

    const ok  = chosen !== null && chosen === correct;
    const pts = ok ? Math.max(1, Math.round(10 * Math.max(0, this._timerVal) / CINEMA_Q_SEC)) : 0;
    if (ok) this._score += pts;

    this.el.querySelectorAll('.rv-choice').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.val === correct)     btn.classList.add('rv-ch-correct');
      else if (btn.dataset.val === chosen) btn.classList.add('rv-ch-wrong');
    });

    if (ok && pts > 0) {
      const panel = this.el.querySelector('#rv-cqp');
      if (panel) {
        const bonus = document.createElement('div');
        bonus.className = 'rv-speed-bonus' + (pts >= 8 ? ' rv-sb-great' : pts >= 5 ? ' rv-sb-good' : '');
        bonus.textContent = '+' + pts + ' ⚡';
        panel.appendChild(bonus);
        setTimeout(() => bonus.remove(), 1100);
      }
    }

    const clips   = (this._matchData && this._matchData.cinemaClips) || [];
    const clip    = clips[this._clipIdx] || {};
    const nextQ   = this._cinemaQIdx + 1;
    const clipDone = nextQ >= (clip.questions || []).length;
    const allDone  = clipDone && (this._clipIdx + 1 >= Math.min(CINEMA_CLIP_COUNT, clips.length));
    const db = this._db();
    if (db && this._matchId) {
      const upd = this._role === 'host'
        ? Object.assign({ hostScore: this._score, hostClip: this._clipIdx }, allDone ? { hostDone: true } : {})
        : Object.assign({ guestScore: this._score, guestClip: this._clipIdx }, allDone ? { guestDone: true } : {});
      db.collection('rival_matches').doc(this._matchId).update(upd).catch(() => {});
    }

    const myS = this.el.querySelector('#rv-my-s'); const pdY = this.el.querySelector('#rv-pd-y');
    if (myS) myS.textContent = this._score;
    if (pdY) pdY.style.width  = this._pct(this._score) + '%';

    await new Promise(r => setTimeout(r, ok ? 600 : 1000));
    this._showCinemaQ(this._clipIdx, nextQ);
  }

  /* ── Live sync ────────────────────────────────────── */

  _onLive(data) {
    const opS = this._role === 'host' ? (data.guestScore || 0) : (data.hostScore || 0);
    const el  = this.el.querySelector('#rv-op-s');
    const bar = this.el.querySelector('#rv-pd-o');
    if (el)  el.textContent  = opS;
    if (bar) bar.style.width = this._pct(opS) + '%';
  }

  _pct(score) {
    return Math.min(100, Math.round(score / (this._maxScore || Q_COUNT * 10) * 100));
  }

  /* ── Finish ───────────────────────────────────────── */

  async _finishMatch() {
    if (this._phase === 'result') return;
    this._phase = 'result'; this._clearTimer();
    if (this._vid) { try { this._vid.pause(); } catch(e){} }

    await new Promise(r => setTimeout(r, 1800));

    const db = this._db();
    let fin = this._matchData;
    if (db && this._matchId) {
      try { const s = await db.collection('rival_matches').doc(this._matchId).get(); fin = s.data() || fin; } catch(e){}
    }

    const myS = this._score;
    const opS = this._role === 'host' ? (fin && fin.guestScore || 0) : (fin && fin.hostScore || 0);
    const opN = this._role === 'host' ? (fin && fin.guestName) : (fin && fin.hostName);
    const win = myS > opS; const tie = myS === opS;

    if (win)      this.app.addXP(50, 'hard',   'rival');
    else if (tie) this.app.addXP(20, 'medium', 'rival');
    else          this.app.addXP(5,  'easy',   'rival');

    if (db && this._matchId) {
      const upd = this._role === 'host' ? { hostDone: true, status: 'finished' } : { guestDone: true };
      db.collection('rival_matches').doc(this._matchId).update(upd).catch(() => {});
    }
    this._renderResult(myS, opS, opN, win, tie);
  }

  _renderResult(myS, opS, opN, win, tie) {
    const myN  = this._name();
    const xp   = win ? 50 : tie ? 20 : 5;
    const icon  = win ? '🏆' : tie ? '🤝' : '💪';
    const label = win ? 'KAZANDIN!' : tie ? 'BERABERE!' : 'KAYBETTİN';
    const cls   = win ? 'rv-win' : tie ? 'rv-tie' : 'rv-lose';
    const maxS  = this._maxScore;

    this.el.innerHTML = `
      <div class="rv-result ${cls}">
        <div class="rv-res-badge">
          <div class="rv-res-icon">${icon}</div>
          <div class="rv-res-lbl">${label}</div>
        </div>
        <div class="rv-res-duel">
          <div class="rv-rd-side ${win ? 'rv-rd-winner' : ''}">
            <div class="rv-rd-av rv-av-you">${(myN[0]||'?').toUpperCase()}</div>
            <div class="rv-rd-name">${_esc(myN)}</div>
            <div class="rv-rd-score">${myS}<small>/${maxS}</small></div>
            ${win ? '<div class="rv-rd-crown">👑</div>' : ''}
          </div>
          <div class="rv-rd-vs">VS</div>
          <div class="rv-rd-side ${!win&&!tie ? 'rv-rd-winner' : ''}">
            <div class="rv-rd-av rv-av-opp">${(opN?opN[0]:'?').toUpperCase()}</div>
            <div class="rv-rd-name">${_esc(opN || 'Rakip')}</div>
            <div class="rv-rd-score">${opS}<small>/${maxS}</small></div>
            ${!win&&!tie ? '<div class="rv-rd-crown">👑</div>' : ''}
          </div>
        </div>
        <div class="rv-xp-pill">+${xp} XP${win ? ' 🎉' : ''}</div>
        <div class="rv-res-btns">
          <button class="rv-btn-primary" id="rv-again">⚔️ Tekrar Oyna</button>
          <button class="rv-btn-ghost"   id="rv-home">Ana Menüye Dön</button>
        </div>
      </div>`;

    this.el.querySelector('#rv-again').addEventListener('click', () => this._renderLobby());
    this.el.querySelector('#rv-home').addEventListener('click', () => {
      this.destroy(); this.app.navigate('home');
    });
  }
}

window.RivalMode = RivalMode;

})();
