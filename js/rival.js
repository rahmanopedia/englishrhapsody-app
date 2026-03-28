/* js/rival.js — Online Rival Mode (Firestore real-time) */
'use strict';

(function () {

const Q_COUNT        = 10;
const TIMER_SEC      = 15;
const QUEUE_TTL_MS   = 120_000;
const SEARCH_MAX_MS  = 90_000;
const CIRCUM         = 119.4; // 2π × 19

/* ── Helpers ─────────────────────────────────────── */

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
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ── Question builders ───────────────────────────── */

function _buildTranslate(level, n) {
  if (typeof TRANSLATE_DATA === 'undefined' || !TRANSLATE_DATA.length) return [];
  const pool = _sh(level === 'ALL'
    ? [...TRANSLATE_DATA]
    : TRANSLATE_DATA.filter(s => s.level === level));
  if (pool.length < 4) return [];

  return pool.slice(0, n).map(s => {
    const wrongs = pool.filter(x => x.en !== s.en).slice(0, 8)
      .map(x => x.en).filter(Boolean);
    const dist = _sh(wrongs).slice(0, 3);
    while (dist.length < 3 && wrongs.length > dist.length) dist.push(wrongs[dist.length]);
    return {
      prompt: s.tr,
      correct: s.en,
      choices: _sh([s.en, ...dist.slice(0, 3)]),
      meta: s.level || ''
    };
  });
}

function _buildCinema(n) {
  if (typeof CINEMA_DATA === 'undefined' || !CINEMA_DATA.length) return [];
  const qs = [];
  for (const clip of _sh([...CINEMA_DATA])) {
    if (qs.length >= n * 2) break;
    if (clip.options && clip.options.length >= 2) {
      const cor = clip.options.find(o => o.isCorrect);
      if (!cor) continue;
      const wrongs = clip.options.filter(o => !o.isCorrect).map(o => o.text);
      qs.push({
        prompt: clip.transcript || '',
        correct: cor.text,
        choices: _sh([cor.text, ...wrongs.slice(0, 3)]),
        meta: [clip.film, clip.year].filter(Boolean).join(' · ')
      });
    }
  }
  return _sh(qs).slice(0, n);
}

/* ── RivalMode ───────────────────────────────────── */

class RivalMode {
  constructor(app) {
    this.app        = app;
    this.el         = null;
    this._matchId   = null;
    this._role      = null;   // 'host' | 'guest'
    this._matchData = null;
    this._unsub     = null;
    this._unsubQ    = null;
    this._qIdx      = 0;
    this._score     = 0;
    this._timer     = null;
    this._timerVal  = TIMER_SEC;
    this._answered  = false;
    this._phase     = 'lobby';
    this._searchTmr = null;
    this._mode      = 'translate';
    this._level     = 'ALL';
  }

  init(el) {
    this.el = el;
    this._renderLobby();
  }

  destroy() {
    this._clearTimer();
    if (this._unsub)     { this._unsub();     this._unsub     = null; }
    if (this._unsubQ)    { this._unsubQ();    this._unsubQ    = null; }
    if (this._searchTmr) { clearTimeout(this._searchTmr); this._searchTmr = null; }
    this._leaveQueue();
    window.rivalMod = null;
  }

  _db()   { return window.authManager && window.authManager._db; }
  _uid()  { return window.authManager && window.authManager.uid; }
  _name() { return (window.authManager && window.authManager.displayName) || 'Kullanıcı'; }

  /* ── Lobby ─────────────────────────────────────── */

  _renderLobby() {
    this._phase = 'lobby';
    const ok = !!(window.authManager && window.authManager.isLoggedIn);

    this.el.innerHTML = `
      <div class="rv-lobby">
        <div class="rv-lb-topbar">
          <button class="rv-back-btn" id="rv-back">← Geri</button>
        </div>
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
                <span>🎬</span><strong>Sinema</strong><small>Film diyaloğu</small>
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
            <div class="rv-match-info">
              <span>⏱ ${TIMER_SEC} sn/soru</span>
              <span>❓ ${Q_COUNT} soru</span>
              <span>🏆 Kazanana +50 XP</span>
            </div>
            <button class="rv-btn-primary rv-find-btn" id="rv-find">⚔️ Rakip Bul</button>
          </div>
        `}
      </div>`;

    this.el.querySelector('#rv-back').addEventListener('click', () => {
      this.destroy();
      this.app.navigate('home');
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
        const sec = this.el.querySelector('#rv-lv-sec');
        if (sec) sec.style.display = this._mode === 'cinema' ? 'none' : '';
        if (this._mode === 'cinema') this._level = 'ALL';
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

  /* ── Matchmaking ───────────────────────────────── */

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
      const snap = await db.collection('rival_queue')
        .where('mode_level', '==', key)
        .limit(20)
        .get();

      const now = Date.now();
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

  async _createMatch(mode, level, hostId, hostName, guestId, guestName, guestQueueId) {
    const db = this._db();
    const questions = mode === 'cinema'
      ? _buildCinema(Q_COUNT)
      : _buildTranslate(level, Q_COUNT);

    if (questions.length < Q_COUNT) {
      typeof UI !== 'undefined' && UI.toast('Yeterli soru bulunamadı');
      this._renderLobby();
      return;
    }

    const matchRef = db.collection('rival_matches').doc();
    const matchId  = matchRef.id;
    const batch    = db.batch();

    batch.set(matchRef, {
      status: 'playing', mode, level,
      hostId, hostName, guestId, guestName,
      questions,
      hostScore: 0, guestScore: 0,
      hostQ: 0, guestQ: 0,
      hostDone: false, guestDone: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      expiresAt: new Date(Date.now() + 30 * 60000)
    });

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
    const uid = this._uid();
    const db  = this._db();
    if (!uid || !db) return;
    db.collection('rival_queue').doc(uid).delete().catch(() => {});
  }

  /* ── Waiting ───────────────────────────────────── */

  _renderWaiting() {
    this._phase = 'waiting';
    const mLabel = this._mode === 'translate' ? '🔄 Çeviri' : '🎬 Sinema';
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

  /* ── Countdown ─────────────────────────────────── */

  _renderCountdown() {
    const m   = this._matchData || {};
    const myN = this._name();
    const opN = this._role === 'host' ? (m.guestName || '…') : (m.hostName || '…');
    const ml  = m.mode === 'cinema' ? '🎬 Sinema' : '🔄 Çeviri';
    const lv  = m.level !== 'ALL' ? ' · ' + m.level : '';

    this.el.innerHTML = `
      <div class="rv-countdown">
        <div class="rv-cd-mode">${ml}${lv} · ${Q_COUNT} soru</div>
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
      </div>`;

    let n = 3;
    const tick = () => {
      const el = this.el.querySelector('#rv-cd-n');
      if (!el) return;
      if (n === 0) {
        el.textContent = '🏁';
        el.classList.add('rv-cd-go');
        setTimeout(() => this._startGame(), 600);
        return;
      }
      el.textContent = n--;
      el.classList.remove('rv-cd-pop');
      void el.offsetWidth;
      el.classList.add('rv-cd-pop');
      setTimeout(tick, 1000);
    };
    setTimeout(tick, 700);
  }

  /* ── Game ──────────────────────────────────────── */

  _startGame() {
    this._phase = 'playing';
    this._qIdx  = 0;
    this._score = 0;
    this._renderArena();
  }

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
      </div>`;

    this._showQ();
  }

  _showQ() {
    const q = this._matchData && this._matchData.questions && this._matchData.questions[this._qIdx];
    if (!q) { this._finishMatch(); return; }

    this._answered = false;
    this._timerVal = TIMER_SEC;

    const zone = this.el.querySelector('#rv-qz');
    const qc   = this.el.querySelector('#rv-qc');
    if (!zone) return;
    if (qc) qc.textContent = (this._qIdx + 1) + '/' + Q_COUNT;

    zone.innerHTML = `
      <div class="rv-q animate-in">
        ${q.meta ? `<div class="rv-q-meta">${_esc(q.meta)}</div>` : ''}
        <div class="rv-q-prompt">${_esc(q.prompt)}</div>
        <p class="rv-q-cue">Doğru çeviriyi seç</p>
        <div class="rv-q-choices">
          ${q.choices.map((c, i) => `
            <button class="rv-choice" data-val="${_esc(c)}">
              <span class="rv-ch-letter">${'ABCD'[i]}</span>
              <span class="rv-ch-text">${_esc(c)}</span>
            </button>`).join('')}
        </div>
      </div>`;

    zone.querySelectorAll('.rv-choice').forEach(btn => {
      btn.addEventListener('click', () => this._pick(btn.dataset.val, q.correct));
    });

    this._startTimer(q.correct);
  }

  _startTimer(correct) {
    this._clearTimer();
    this._timerVal = TIMER_SEC;
    this._timer = setInterval(() => {
      this._timerVal--;
      const num  = this.el.querySelector('#rv-tmr');
      const ring = this.el.querySelector('#rv-ring');
      if (num) {
        num.textContent = this._timerVal;
        num.className = 'rv-timer-num' +
          (this._timerVal <= 3 ? ' rv-t-danger' : this._timerVal <= 6 ? ' rv-t-warn' : '');
      }
      if (ring) {
        const offset = CIRCUM * (1 - this._timerVal / TIMER_SEC);
        ring.style.strokeDashoffset = offset;
        ring.className = 'rv-tr-fill' +
          (this._timerVal <= 3 ? ' rv-t-danger' : this._timerVal <= 6 ? ' rv-t-warn' : '');
      }
      if (this._timerVal <= 0) {
        this._clearTimer();
        if (!this._answered) this._pick(null, correct);
      }
    }, 1000);
  }

  _clearTimer() {
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
  }

  async _pick(chosen, correct) {
    if (this._answered) return;
    this._answered = true;
    this._clearTimer();

    const ok = chosen !== null && chosen === correct;
    if (ok) this._score += 10;

    this.el.querySelectorAll('.rv-choice').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.val === correct) btn.classList.add('rv-ch-correct');
      else if (btn.dataset.val === chosen) btn.classList.add('rv-ch-wrong');
    });

    const nextQ = this._qIdx + 1;
    const done  = nextQ >= Q_COUNT;
    const upd   = this._role === 'host'
      ? Object.assign({ hostScore: this._score, hostQ: nextQ }, done ? { hostDone: true } : {})
      : Object.assign({ guestScore: this._score, guestQ: nextQ }, done ? { guestDone: true } : {});
    const db = this._db();
    if (db && this._matchId)
      db.collection('rival_matches').doc(this._matchId).update(upd).catch(() => {});

    const myS = this.el.querySelector('#rv-my-s');
    const pdY = this.el.querySelector('#rv-pd-y');
    if (myS) myS.textContent = this._score;
    if (pdY) pdY.style.width = this._pct(this._score) + '%';

    await new Promise(r => setTimeout(r, ok ? 700 : 1100));
    this._qIdx++;
    if (this._qIdx >= Q_COUNT) this._finishMatch();
    else this._showQ();
  }

  _onLive(data) {
    const opS = this._role === 'host' ? (data.guestScore || 0) : (data.hostScore || 0);
    const el  = this.el.querySelector('#rv-op-s');
    const bar = this.el.querySelector('#rv-pd-o');
    if (el)  el.textContent  = opS;
    if (bar) bar.style.width = this._pct(opS) + '%';
  }

  _pct(score) {
    return Math.min(100, Math.round(score / (Q_COUNT * 10) * 100));
  }

  /* ── Finish ────────────────────────────────────── */

  async _finishMatch() {
    if (this._phase === 'result') return;
    this._phase = 'result';
    this._clearTimer();

    await new Promise(r => setTimeout(r, 1800));

    const db = this._db();
    let fin = this._matchData;
    if (db && this._matchId) {
      try {
        const s = await db.collection('rival_matches').doc(this._matchId).get();
        fin = s.data() || fin;
      } catch (e) {}
    }

    const myS  = this._score;
    const opS  = this._role === 'host' ? (fin && fin.guestScore || 0) : (fin && fin.hostScore || 0);
    const opN  = this._role === 'host' ? (fin && fin.guestName) : (fin && fin.hostName);
    const win  = myS > opS;
    const tie  = myS === opS;

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
    const myN = this._name();
    const xp  = win ? 50 : tie ? 20 : 5;
    const icon  = win ? '🏆' : tie ? '🤝' : '💪';
    const label = win ? 'KAZANDIN!' : tie ? 'BERABERE!' : 'KAYBETTİN';
    const cls   = win ? 'rv-win' : tie ? 'rv-tie' : 'rv-lose';

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
            <div class="rv-rd-score">${myS}<small>/${Q_COUNT*10}</small></div>
            ${win ? '<div class="rv-rd-crown">👑</div>' : ''}
          </div>
          <div class="rv-rd-vs">VS</div>
          <div class="rv-rd-side ${!win && !tie ? 'rv-rd-winner' : ''}">
            <div class="rv-rd-av rv-av-opp">${(opN?opN[0]:'?').toUpperCase()}</div>
            <div class="rv-rd-name">${_esc(opN || 'Rakip')}</div>
            <div class="rv-rd-score">${opS}<small>/${Q_COUNT*10}</small></div>
            ${!win && !tie ? '<div class="rv-rd-crown">👑</div>' : ''}
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
      this.destroy();
      this.app.navigate('home');
    });
  }
}

window.RivalMode = RivalMode;

})();
