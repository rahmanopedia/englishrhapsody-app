/**
 * RHAPSODY CINEMA — v5.0
 * Kids-app style UX: loading overlay, subtitle highlight, dim overlay,
 * score/streak header, result banner, replay/next buttons, progress bar, done screen.
 */
class CinemaModule {
  constructor(app) {
    this.app = app;
    this.el = null;
    this.video = null;
    this.clips = [];
    this.clipIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.selected = null;
    this.phase = 'idle'; // idle | loading | playing | question | result | done
    this.syncTimer = null;
    this.subtitleShown = false;
    this._currentEntry = null;
    this._qIdx = 0;
    this._questions = [];
  }

  init(el) {
    this.el = el;
    if (typeof CINEMA_DATA === 'undefined' || !CINEMA_DATA.length) return;
    this.clips = this._shuffle([...CINEMA_DATA]);
    this._render();
    this._loadClip();
  }

  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  _render() {
    this.el.innerHTML = `
      <div id="cine-root" style="
        position:fixed;inset:0;z-index:200;background:#000;
        display:flex;flex-direction:column;overflow:hidden;
      ">
        <!-- Video — tam ekran arkaplan -->
        <video id="cine-video" playsinline style="
          position:absolute;inset:0;width:100%;height:100%;
          object-fit:cover;background:#000;
        "></video>

        <!-- Genel gradyan -->
        <div style="
          position:absolute;inset:0;pointer-events:none;
          background:linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,transparent 25%,transparent 55%,rgba(0,0,0,0.7) 100%);
        "></div>

        <!-- Yukleniyor overlay -->
        <div id="cine-loader" style="
          position:absolute;inset:0;z-index:25;
          background:#000;
          display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;
        ">
          <div id="cine-spinner" style="
            width:40px;height:40px;border-radius:50%;
            border:3px solid rgba(245,158,11,0.3);
            border-top-color:#f59e0b;
            animation:cine-spin 0.8s linear infinite;
          "></div>
          <div style="color:rgba(245,158,11,0.7);font-size:0.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
            Sahne yukleniyor...
          </div>
        </div>

        <!-- Karistirma (soru paneli acikken) -->
        <div id="cine-dim" style="
          position:absolute;inset:0;z-index:10;
          background:rgba(0,0,0,0.55);
          display:none;pointer-events:none;
          transition:opacity 0.3s ease;
        "></div>

        <!-- Kaynak etiketi (sol ust) -->
        <div id="cine-source" style="
          position:absolute;top:68px;left:12px;z-index:15;
          background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);
          border-radius:10px;padding:5px 10px;
          color:rgba(255,255,255,0.8);font-size:0.7rem;font-weight:700;
          letter-spacing:0.3px;display:none;
        "></div>

        <!-- Altyazi -->
        <div id="cine-subtitle" style="
          position:absolute;left:0;right:0;z-index:15;
          bottom:24px;
          text-align:center;padding:0 20px 0;
          pointer-events:none;
          display:none;
        ">
          <div id="cine-subtitle-inner" style="
            display:inline-block;max-width:92%;
            padding:8px 16px;border-radius:12px;
            font-size:1rem;font-weight:700;line-height:1.5;
            background:rgba(0,0,0,0.75);
          "></div>
        </div>

        <!-- Sonuc banner (merkez) -->
        <div id="cine-result-banner" style="
          position:absolute;z-index:25;
          top:28%;left:50%;transform:translateX(-50%);
          text-align:center;pointer-events:none;
          display:none;
        "></div>

        <!-- Soru paneli (alttan kayar) -->
        <div id="cine-question" style="
          position:absolute;z-index:20;bottom:0;left:0;right:0;
          padding:20px 16px max(24px,env(safe-area-inset-bottom));
          background:linear-gradient(to top, rgba(8,8,18,0.98) 75%, transparent 100%);
          display:none;flex-direction:column;gap:12px;
          transform:translateY(100%);transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        ">
          <!-- Phrase soru -->
          <div id="cine-phrase" style="
            text-align:center;font-size:1rem;font-weight:700;
            color:rgba(255,255,255,0.9);line-height:1.4;
          "></div>
          <!-- Soru etiketi -->
          <div style="text-align:center;color:rgba(255,255,255,0.4);font-size:0.65rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-top:-6px;">
            Turkce karsiligi nedir?
          </div>
          <!-- Secenekler -->
          <div id="cine-choices" style="display:flex;flex-direction:column;gap:8px;"></div>
          <!-- Aksiyon butonlari (cevaptan sonra) -->
          <div id="cine-actions" style="display:none;flex-direction:row;gap:8px;margin-top:2px;"></div>
          <!-- Progress bar -->
          <div id="cine-progress" style="display:flex;gap:4px;padding-top:4px;"></div>
        </div>

        <!-- Bitis ekrani -->
        <div id="cine-done" style="
          position:absolute;inset:0;z-index:30;
          background:#030712;
          display:none;flex-direction:column;align-items:center;justify-content:center;
          text-align:center;padding:32px;gap:20px;
        ">
          <div style="font-size:5rem;">🎬</div>
          <div id="cine-done-title" style="
            font-size:2.5rem;font-weight:900;color:#fff;line-height:1.1;
          ">Harika!</div>
          <div id="cine-done-sub" style="
            color:#f59e0b;font-weight:700;font-size:1.1rem;
          "></div>
          <div id="cine-done-score" style="
            background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);
            border-radius:20px;padding:14px 32px;
            font-size:2rem;font-weight:900;color:#f59e0b;
          "></div>
          <button id="cine-done-exit" style="
            background:#f59e0b;color:#030712;
            border:none;border-radius:40px;padding:16px 40px;
            font-size:1rem;font-weight:900;cursor:pointer;
            box-shadow:0 0 30px rgba(245,158,11,0.4);
          ">Ana Menuye Don</button>
        </div>

        <!-- Header -->
        <div style="
          position:absolute;top:0;left:0;right:0;z-index:20;
          display:flex;align-items:center;justify-content:space-between;
          padding:14px 14px 0;
          background:linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
        ">
          <button id="cine-exit" style="
            width:40px;height:40px;border-radius:14px;
            background:rgba(0,0,0,0.45);backdrop-filter:blur(8px);
            border:none;color:rgba(255,255,255,0.75);font-size:1.1rem;cursor:pointer;
            display:flex;align-items:center;justify-content:center;
          ">&#8592;</button>
          <div style="text-align:center;">
            <div style="color:#fff;font-weight:900;font-size:1.05rem;letter-spacing:0.5px;">
              🎬 Cinema Mode
            </div>
            <div id="cine-counter" style="
              color:#f59e0b;font-size:0.65rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
            "></div>
          </div>
          <div id="cine-score-badge" style="
            display:flex;align-items:center;gap:6px;
            background:rgba(245,158,11,0.2);
            border:1px solid rgba(245,158,11,0.3);
            border-radius:14px;padding:6px 12px;
            backdrop-filter:blur(8px);
          ">
            <span style="font-size:0.85rem;">&#11088;</span>
            <span id="cine-score-val" style="color:#f59e0b;font-weight:900;font-size:0.85rem;">0</span>
            <span id="cine-streak-val" style="color:#fb923c;font-weight:900;font-size:0.7rem;display:none;"></span>
          </div>
        </div>

        <!-- Dokun & oyna -->
        <div id="cine-tap" style="
          position:absolute;inset:0;z-index:16;
          display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;
          cursor:pointer;
        ">
          <div style="
            width:72px;height:72px;border-radius:50%;
            background:rgba(255,255,255,0.18);backdrop-filter:blur(8px);
            border:2px solid rgba(255,255,255,0.4);
            display:flex;align-items:center;justify-content:center;font-size:1.9rem;
          ">&#9654;</div>
          <div style="color:#fff;font-size:0.8rem;font-weight:700;letter-spacing:1px;">OYNATMAK ICIN DOKUN</div>
        </div>

      </div>
      <style>
        @keyframes cine-spin { to { transform: rotate(360deg); } }
        @keyframes cine-pop {
          0%   { transform: translateX(-50%) scale(0); opacity:1; }
          50%  { transform: translateX(-50%) scale(1.15); opacity:1; }
          100% { transform: translateX(-50%) translateY(-30px) scale(1); opacity:0; }
        }
      </style>
    `;

    this.video = this.el.querySelector('#cine-video');
    this._preloader = document.createElement('video');
    this._preloader.preload = 'auto';
    this._preloader.muted = true;
    this._preloader.style.display = 'none';
    document.body.appendChild(this._preloader);

    this.el.querySelector('#cine-exit').onclick = () => this._exit();
    this.el.querySelector('#cine-tap').onclick = () => this._playAfterTap();
    this.el.querySelector('#cine-done-exit').onclick = () => this._exit();

    this.video.addEventListener('canplay', () => {
      if (this.phase === 'loading') this._startPlaying();
    });
    this.video.addEventListener('ended', () => {
      this._clearSync();
      if (this.phase === 'playing') this._showQuestion();
    });
    this.video.addEventListener('error', () => {
      this._clearSync();
      if (this.phase === 'playing' || this.phase === 'loading') this._showQuestion();
    });
  }

  _loadClip() {
    if (!this.clips.length) return;
    const entry = this.clips[this.clipIndex % this.clips.length];
    this._currentEntry = entry;
    this.selected = null;
    this.subtitleShown = false;
    this._qIdx = 0;
    this._questions = [];
    this._lastSegIdx = -1;
    this.phase = 'loading';

    // Reset UI
    this._setLoader(true);
    this._setDim(false);
    this._setSubtitle(false);
    this._hideQuestion();
    this._hideDone();
    this._hideTap();
    this._hideResultBanner();

    // Header
    const counter = this.el.querySelector('#cine-counter');
    counter.textContent = `Sahne ${(this.clipIndex % this.clips.length) + 1} / ${this.clips.length}`;

    // Source badge
    const src = this.el.querySelector('#cine-source');
    if (entry.film) {
      src.textContent = `\uD83C\uDFAC ${entry.film}${entry.year ? ' \u00B7 ' + entry.year : ''}`;
      src.style.display = 'block';
    } else {
      src.style.display = 'none';
    }

    this._clearSync();
    this.video.src = entry.url;
    this.video.load();

    const startTime = entry.start || 0;
    if (startTime > 0) {
      this.video.addEventListener('loadedmetadata', () => {
        this.video.currentTime = startTime;
      }, { once: true });
    }

    this.video.play().catch(() => {
      this._setLoader(false);
      this._showTap();
      this._pendingEntry = entry;
    });
  }

  _startPlaying() {
    this._setLoader(false);
    this.phase = 'playing';
    const entry = this._currentEntry;
    this._startSyncTimer(entry);
    this._preloadNext();
  }

  _preloadNext() {
    const nextIndex = (this.clipIndex + 1) % this.clips.length;
    if (nextIndex === this.clipIndex) return;
    const nextUrl = this.clips[nextIndex].url;
    if (this._preloader && this._preloader.src !== nextUrl) {
      this._preloader.src = nextUrl;
      this._preloader.load();
    }
  }

  _startSyncTimer(entry) {
    this._clearSync();
    const segments = entry.segments || null;
    const endTime = entry.end;
    const v = this.video;

    this.syncTimer = setInterval(() => {
      if (!v) return;
      const t = v.currentTime;

      // Segment bazli altyazi senkronizasyonu
      if (segments && segments.length) {
        // Simdi hangi segment gosterilemeli?
        let segIdx = -1;
        for (let i = segments.length - 1; i >= 0; i--) {
          if (t >= segments[i].start) { segIdx = i; break; }
        }
        if (segIdx !== this._lastSegIdx) {
          this._lastSegIdx = segIdx;
          if (segIdx >= 0) {
            this._showSubtitle(segments[segIdx].text, null);
          } else {
            this._setSubtitle(false);
          }
        }
      } else if (!this.subtitleShown) {
        // Segment yoksa tum transcript'i goster
        this.subtitleShown = true;
        this._showSubtitle(entry.transcript, null);
      }

      if (t >= endTime) {
        this._clearSync();
        v.pause();
        if (this.phase === 'playing') this._showQuestion();
      }
    }, 100);
  }

  _clearSync() {
    if (this.syncTimer) { clearInterval(this.syncTimer); this.syncTimer = null; }
  }

  _showSubtitle(text, highlight) {
    const sub = this.el.querySelector('#cine-subtitle');
    const inner = this.el.querySelector('#cine-subtitle-inner');
    sub.style.display = 'block';

    if (highlight) {
      const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
      if (idx !== -1) {
        const before = this._esc(text.slice(0, idx));
        const match = this._esc(text.slice(idx, idx + highlight.length));
        const after = this._esc(text.slice(idx + highlight.length));
        inner.innerHTML = `${before}<span style="background:#f59e0b;color:#1a1a1a;border-radius:6px;padding:1px 5px;margin:0 1px;">${match}</span>${after}`;
      } else {
        inner.textContent = text;
      }
    } else {
      inner.style.color = '#fff';
      inner.textContent = text;
    }
  }

  _esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  _buildQuestions(entry) {
    // Yeni format: entry.questions[]
    if (entry.questions && entry.questions.length) {
      return entry.questions.map(q => ({
        phrase: q.phrase,
        correct: q.correct,
        wrong: q.wrong,
      }));
    }
    // Eski format: entry.options[] ile tek soru
    const correct = entry.options && entry.options.find(o => o.isCorrect);
    const wrong = entry.options && entry.options.find(o => !o.isCorrect);
    if (!correct) return [];
    return [{ phrase: entry.transcript, correct: correct.text, wrong: wrong ? wrong.text : '—' }];
  }

  _showQuestion() {
    const entry = this._currentEntry;
    if (!entry) return;

    // Sorulari ilk geliste olustur
    if (!this._questions.length) {
      this._questions = this._buildQuestions(entry);
      this._qIdx = 0;
    }

    if (this._qIdx >= this._questions.length) { this._nextClip(); return; }

    this.phase = 'question';
    this.selected = null;

    const q = this._questions[this._qIdx];
    const opts = Math.random() < 0.5
      ? [{ text: q.correct, isRight: true }, { text: q.wrong, isRight: false }]
      : [{ text: q.wrong, isRight: false }, { text: q.correct, isRight: true }];

    // Subtitle altta kalsin, phrase'i vurgula
    this._showSubtitle(entry.transcript, q.phrase);

    // Dim overlay
    this._setDim(true);

    // Soru sayaci + phrase
    const phraseEl = this.el.querySelector('#cine-phrase');
    const counter = this._questions.length > 1
      ? `<span style="color:rgba(245,158,11,0.6);font-size:0.65rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;display:block;text-align:center;margin-bottom:4px;">${this._qIdx + 1} / ${this._questions.length}</span>`
      : '';
    phraseEl.innerHTML = `${counter}<span style="color:#fbbf24;">"${this._esc(q.phrase)}"</span> ne demek?`;

    // Secenekler
    const choicesEl = this.el.querySelector('#cine-choices');
    choicesEl.innerHTML = opts.map((opt, i) => `
      <button class="cine-choice-btn" data-idx="${i}" data-right="${opt.isRight}" style="
        width:100%;padding:14px 16px;border-radius:14px;
        background:rgba(255,255,255,0.08);
        border:1.5px solid rgba(255,255,255,0.18);
        color:rgba(255,255,255,0.9);font-size:0.92rem;font-weight:700;
        text-align:left;cursor:pointer;
        display:flex;align-items:center;justify-content:space-between;
        transition:background 0.18s,border-color 0.18s;line-height:1.4;
      ">
        <span>${this._esc(opt.text)}</span>
        <span class="cine-btn-icon" style="font-size:1.1rem;"></span>
      </button>
    `).join('');

    choicesEl.querySelectorAll('.cine-choice-btn').forEach(btn => {
      btn.onclick = () => this._checkAnswer(btn, q.correct);
    });

    // Hide actions, show progress
    this.el.querySelector('#cine-actions').style.display = 'none';
    this._renderProgress();

    // Slide up panel
    const panel = this.el.querySelector('#cine-question');
    panel.style.display = 'flex';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      panel.style.transform = 'translateY(0)';
    }));
  }

  _checkAnswer(btn, correctText) {
    if (this.selected) return;
    this.selected = btn.dataset.right === 'true' ? 'correct' : 'wrong';
    this.phase = 'result';

    const isRight = btn.dataset.right === 'true';
    const allBtns = this.el.querySelectorAll('.cine-choice-btn');

    allBtns.forEach(b => {
      b.style.pointerEvents = 'none';
      const icon = b.querySelector('.cine-btn-icon');
      if (b.dataset.right === 'true') {
        b.style.background = 'rgba(52,211,153,0.18)';
        b.style.borderColor = '#34d399';
        b.style.color = '#34d399';
        icon.textContent = '\u2713';
      } else if (b === btn) {
        b.style.background = 'rgba(248,113,113,0.18)';
        b.style.borderColor = '#f87171';
        b.style.color = '#f87171';
        icon.textContent = '\u2717';
      }
    });

    if (isRight) {
      this.score += 10 + this.streak * 2;
      this.streak++;
      this._updateScoreBadge();
      this._showResultBanner(true, null);
    } else {
      this.streak = 0;
      this._updateScoreBadge();
      this._showResultBanner(false, correctText);
    }

    // XP feedback via app
    const app = window._app || window.app;
    if (isRight && app && app.addXP) app.addXP(10, 'medium', 'cinema');

    // Show action buttons
    const hasMore = this._qIdx + 1 < this._questions.length;
    this._showActionButtons(hasMore);
  }

  _showResultBanner(isRight, correctText) {
    const banner = this.el.querySelector('#cine-result-banner');
    if (isRight) {
      banner.innerHTML = `
        <div style="animation:cine-pop 1.6s forwards;">
          <div style="font-size:3.5rem;">&#10024;</div>
          <div style="font-size:1.8rem;font-weight:900;color:#34d399;
            text-shadow:0 2px 12px rgba(0,0,0,0.9);">Harika!</div>
        </div>
      `;
    } else {
      banner.innerHTML = `
        <div>
          <div style="font-size:2.8rem;">&#128543;</div>
          <div style="font-size:1.2rem;font-weight:900;color:#f87171;
            text-shadow:0 2px 12px rgba(0,0,0,0.9);">Dogrusu:</div>
          <div style="font-size:1.1rem;font-weight:900;color:#fbbf24;
            text-shadow:0 2px 12px rgba(0,0,0,0.9);max-width:260px;line-height:1.3;margin-top:4px;">
            ${this._esc(correctText)}
          </div>
        </div>
      `;
    }
    banner.style.display = 'block';
  }

  _hideResultBanner() {
    const banner = this.el.querySelector('#cine-result-banner');
    if (banner) { banner.style.display = 'none'; banner.innerHTML = ''; }
  }

  _showActionButtons(hasMoreQuestions) {
    const actions = this.el.querySelector('#cine-actions');
    const nextLabel = hasMoreQuestions ? 'Sonraki Soru &#10095;' : 'Sonraki Sahne &#10095;';
    actions.innerHTML = `
      <button id="cine-replay" style="
        flex:1;padding:12px 0;border-radius:14px;
        background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);
        color:rgba(255,255,255,0.5);font-size:0.82rem;font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:6px;
      ">&#8635; Tekrar Izle</button>
      <button id="cine-next" style="
        flex:1;padding:12px 0;border-radius:14px;
        background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);
        color:#fff;font-size:0.82rem;font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:6px;
      ">${nextLabel}</button>
    `;
    actions.style.display = 'flex';
    actions.querySelector('#cine-replay').onclick = () => this._replayClip();
    actions.querySelector('#cine-next').onclick = () => {
      if (hasMoreQuestions) {
        this._qIdx++;
        this._hideResultBanner();
        this._showQuestion();
      } else {
        this._nextClip();
      }
    };
  }

  _replayClip() {
    this._clearSync();
    this._hideResultBanner();
    this._setDim(false);
    this._hideQuestion();
    this._setSubtitle(false);
    this.subtitleShown = false;
    this.selected = null;
    this._qIdx = 0;
    this._questions = [];
    this._lastSegIdx = -1;
    this.phase = 'loading';
    this._setLoader(true);
    this.video.currentTime = this._currentEntry.start || 0;
    this.video.play().then(() => {
      this._startPlaying();
    }).catch(() => {
      this._setLoader(false);
      this._showTap();
      this._pendingEntry = this._currentEntry;
    });
  }

  _renderProgress() {
    const prog = this.el.querySelector('#cine-progress');
    prog.innerHTML = this.clips.map((_, i) => {
      let color;
      if (i < this.clipIndex) color = '#34d399';
      else if (i === this.clipIndex) color = '#f59e0b';
      else color = 'rgba(255,255,255,0.12)';
      return `<div style="flex:1;height:3px;border-radius:4px;background:${color};transition:background 0.3s;"></div>`;
    }).join('');
  }

  _updateScoreBadge() {
    this.el.querySelector('#cine-score-val').textContent = this.score;
    const streakEl = this.el.querySelector('#cine-streak-val');
    if (this.streak >= 2) {
      streakEl.textContent = `x${this.streak}`;
      streakEl.style.display = 'inline';
    } else {
      streakEl.style.display = 'none';
    }
  }

  _hideQuestion() {
    const panel = this.el.querySelector('#cine-question');
    if (!panel) return;
    panel.style.transform = 'translateY(100%)';
    setTimeout(() => { panel.style.display = 'none'; }, 400);
  }

  _hideDone() {
    const done = this.el.querySelector('#cine-done');
    if (done) done.style.display = 'none';
  }

  _showTap() {
    const tap = this.el.querySelector('#cine-tap');
    if (tap) tap.style.display = 'flex';
  }

  _hideTap() {
    const tap = this.el.querySelector('#cine-tap');
    if (tap) tap.style.display = 'none';
  }

  _setLoader(show) {
    const el = this.el.querySelector('#cine-loader');
    if (el) el.style.display = show ? 'flex' : 'none';
  }

  _setDim(show) {
    const el = this.el.querySelector('#cine-dim');
    if (el) el.style.display = show ? 'block' : 'none';
  }

  _setSubtitle(show) {
    const el = this.el.querySelector('#cine-subtitle');
    if (el) el.style.display = show ? 'block' : 'none';
  }

  _playAfterTap() {
    this._hideTap();
    const entry = this._pendingEntry;
    const v = this.video;
    const doPlay = () => {
      v.play().then(() => this._startPlaying()).catch(() => this._showTap());
    };
    if (v.readyState >= 3) doPlay();
    else v.addEventListener('canplay', doPlay, { once: true });
  }

  _nextClip() {
    this._clearSync();
    this._hideResultBanner();
    this.clipIndex++;
    if (this.clipIndex >= this.clips.length) {
      this._showDone();
      return;
    }
    setTimeout(() => this._loadClip(), 400);
  }

  _showDone() {
    this.phase = 'done';
    this._setLoader(false);
    this._setDim(false);
    this._hideQuestion();
    const done = this.el.querySelector('#cine-done');
    done.querySelector('#cine-done-sub').textContent = `${this.clips.length} sahneden gectiniz!`;
    done.querySelector('#cine-done-score').textContent = `${this.score} puan`;
    done.style.display = 'flex';
  }

  _exit() {
    this._clearSync();
    if (this.video) { this.video.pause(); this.video.src = ''; }
    if (this._preloader) { this._preloader.src = ''; this._preloader.remove(); this._preloader = null; }
    const app = window._app || window.app;
    if (app && app.navigate) app.navigate('home');
    else {
      const btn = document.querySelector('[data-action="navigate"][data-target="home"]');
      if (btn) btn.click();
    }
  }
}

// ── AUTO-INIT ──
(function () {
  const initPlugin = () => {
    const mount = document.getElementById('cinema-mount-point');
    if (mount && (!window.cinemaMod || window.cinemaMod.el !== mount)) {
      const app = window._app || window.app;
      window.cinemaMod = new CinemaModule(app);
      window.cinemaMod.init(mount);
    }
  };

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-target="cinema"]');
    if (btn) setTimeout(initPlugin, 80);
  }, true);

  if (document.body) {
    const observer = new MutationObserver(initPlugin);
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      const observer = new MutationObserver(initPlugin);
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
