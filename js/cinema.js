/**
 * RHAPSODY CINEMA — v4.0
 * Full-screen video → sequential phrase questions (2 Turkish choices)
 * No subtitle on/off, no timer — clean VoScreen-style UX
 */
class CinemaModule {
  constructor(app) {
    this.app = app;
    this.el = null;
    this.video = null;
    this.clips = [];
    this.currentIndex = 0;
    this.canAnswer = false;
    this.endWatcher = null;
  }

  init(el) {
    this.el = el;
    if (typeof CINEMA_DATA === 'undefined' || !CINEMA_DATA.length) return;
    this.clips = this._shuffle([...CINEMA_DATA]);
    this._render();
  }

  _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  _render() {
    this.el.innerHTML = `
      <div id="cine-root" style="
        position:fixed;inset:0;z-index:200;background:#000;
        display:flex;flex-direction:column;overflow:hidden;
      ">
        <!-- Video fills entire screen -->
        <video id="cine-video" playsinline style="
          position:absolute;inset:0;width:100%;height:100%;
          object-fit:cover;background:#000;
        "></video>

        <!-- Dark gradient overlays -->
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.35) 0%,transparent 30%,transparent 55%,rgba(0,0,0,0.75) 100%);pointer-events:none;"></div>

        <!-- Top bar -->
        <div style="position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:16px 16px 0;">
          <button id="cine-exit" style="
            background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);
            border:none;border-radius:12px;padding:8px 14px;
            color:#fff;font-weight:700;font-size:0.8rem;cursor:pointer;
          ">← Geri</button>
          <div id="cine-film-badge" style="
            background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);
            border:1px solid rgba(255,255,255,0.15);border-radius:20px;
            padding:5px 14px;color:rgba(255,255,255,0.85);
            font-size:0.7rem;font-weight:700;letter-spacing:0.5px;
          "></div>
          <div id="cine-counter" style="
            color:rgba(255,255,255,0.6);font-size:0.75rem;font-weight:700;
          "></div>
        </div>

        <!-- Tap-to-play prompt -->
        <div id="cine-tap" style="
          position:absolute;inset:0;z-index:15;
          display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;
          cursor:pointer;
        ">
          <div style="
            width:70px;height:70px;border-radius:50%;
            background:rgba(255,255,255,0.2);backdrop-filter:blur(8px);
            border:2px solid rgba(255,255,255,0.4);
            display:flex;align-items:center;justify-content:center;font-size:1.8rem;
          ">▶</div>
          <div style="color:#fff;font-size:0.8rem;font-weight:700;letter-spacing:1px;">OYNATMAK İÇİN DOKUN</div>
        </div>

        <!-- Subtitle bar (shows transcript while playing) -->
        <div id="cine-subtitle" style="
          position:absolute;z-index:10;
          bottom:24px;left:0;right:0;
          text-align:center;padding:0 20px;
          transition:bottom 0.4s ease;
          display:none;
        ">
          <span style="
            background:rgba(0,0,0,0.72);padding:8px 16px;border-radius:10px;
            color:#fff;font-size:0.95rem;font-weight:600;line-height:1.5;
            display:inline-block;max-width:90%;
          " id="cine-subtitle-text"></span>
        </div>

        <!-- Question panel (overlaid at bottom) -->
        <div id="cine-question" style="
          position:absolute;z-index:20;bottom:0;left:0;right:0;
          padding:20px 16px 28px;
          background:linear-gradient(transparent,rgba(0,0,0,0.92) 25%);
          display:none;flex-direction:column;gap:12px;
          transform:translateY(100%);transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        ">
          <!-- Progress dots -->
          <div id="cine-qdots" style="display:flex;justify-content:center;gap:6px;margin-bottom:2px;"></div>
          <!-- Transcript -->
          <div id="cine-qtranscript" style="
            text-align:center;color:rgba(255,255,255,0.9);
            font-size:1rem;font-weight:700;line-height:1.4;
            background:rgba(255,255,255,0.08);border-radius:12px;padding:10px 14px;
          "></div>
          <!-- Question label -->
          <div style="text-align:center;color:rgba(255,255,255,0.5);font-size:0.7rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
            Türkçesi nedir?
          </div>
          <!-- Choice buttons -->
          <div id="cine-choices" style="display:flex;flex-direction:column;gap:8px;"></div>
        </div>

        <!-- XP popup -->
        <div id="cine-xp" style="
          position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);
          z-index:30;width:110px;height:110px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-size:2.2rem;font-weight:900;
        "></div>
      </div>
    `;

    this.video = this.el.querySelector('#cine-video');
    this.el.querySelector('#cine-exit').onclick = () => this._exit();
    this.el.querySelector('#cine-tap').onclick = () => this._playAfterTap();
    this._loadClip();
  }

  _exit() {
    if (this.endWatcher) { clearInterval(this.endWatcher); this.endWatcher = null; }
    if (this.video) { this.video.pause(); this.video.src = ''; }
    // Navigate back via app
    const app = window._app || window.app;
    if (app && app.navigate) app.navigate('home');
    else {
      const btn = document.querySelector('[data-action="navigate"][data-target="home"]');
      if (btn) btn.click();
    }
  }

  _loadClip() {
    if (!this.clips.length) return;
    const entry = this.clips[this.currentIndex % this.clips.length];
    const v = this.video;

    // Reset UI
    this._hideQuestion();
    this.el.querySelector('#cine-tap').style.display = 'none';
    this.el.querySelector('#cine-subtitle').style.display = 'none';

    const badge = this.el.querySelector('#cine-film-badge');
    badge.textContent = entry.film ? `🎬 ${entry.film}${entry.year ? ' · ' + entry.year : ''}` : '🎬 Rhapsody Cinema';

    const counter = this.el.querySelector('#cine-counter');
    counter.textContent = `${(this.currentIndex % this.clips.length) + 1} / ${this.clips.length}`;

    if (this.endWatcher) { clearInterval(this.endWatcher); this.endWatcher = null; }

    v.src = entry.url;
    v.load();

    const startTime = entry.start || 0;
    const endTime = entry.end;

    if (startTime > 0) {
      v.addEventListener('loadedmetadata', () => { v.currentTime = startTime; }, { once: true });
    }

    v.play().then(() => {
      this._showSubtitle(entry.transcript);
      this._watchEnd(endTime, entry);
    }).catch(() => {
      const tap = this.el.querySelector('#cine-tap');
      tap.style.display = 'flex';
      this._pendingEntry = entry;
    });
  }

  _playAfterTap() {
    const tap = this.el.querySelector('#cine-tap');
    tap.style.display = 'none';
    const entry = this._pendingEntry;
    const v = this.video;

    const doPlay = () => {
      v.play().then(() => {
        this._showSubtitle(entry.transcript);
        this._watchEnd(entry.end, entry);
      }).catch(() => {
        tap.style.display = 'flex';
      });
    };

    if (v.readyState >= 3) doPlay();
    else v.addEventListener('canplay', doPlay, { once: true });
  }

  _showSubtitle(text) {
    const sub = this.el.querySelector('#cine-subtitle');
    this.el.querySelector('#cine-subtitle-text').textContent = `"${text}"`;
    sub.style.display = 'block';
    sub.style.bottom = '24px';
  }

  _watchEnd(endTime, entry) {
    const v = this.video;
    if (this.endWatcher) clearInterval(this.endWatcher);

    const trigger = () => {
      if (this.endWatcher) { clearInterval(this.endWatcher); this.endWatcher = null; }
      v.pause();
      this._startQuestions(entry);
    };

    v.addEventListener('ended', trigger, { once: true });
    this.endWatcher = setInterval(() => {
      if (!v) return;
      if (v.currentTime >= endTime) trigger();
    }, 100);
  }

  _startQuestions(entry) {
    // Build questions: transcript = question, options[] = answers
    const correct = entry.options.find(o => o.isCorrect);
    const wrongs = entry.options.filter(o => !o.isCorrect);
    if (!correct) { this._nextClip(); return; }

    this._questionQueue = [{
      phrase: entry.transcript,
      correct: correct.text,
      wrongs: wrongs.map(w => w.text),
    }];
    this._qIdx = 0;
    this._qPoints = entry.points || 10;
    this._showQuestion(entry);
  }

  _showQuestion(entry) {
    const q = this._questionQueue[this._qIdx];

    // Move subtitle up
    const sub = this.el.querySelector('#cine-subtitle');
    sub.style.bottom = '260px';

    // Render dots
    const dots = this.el.querySelector('#cine-qdots');
    dots.innerHTML = this._questionQueue.map((_, i) =>
      `<div style="width:7px;height:7px;border-radius:50%;background:${i === this._qIdx ? '#fff' : 'rgba(255,255,255,0.3)'};transition:background 0.3s;"></div>`
    ).join('');

    // Transcript
    this.el.querySelector('#cine-qtranscript').textContent = `"${q.phrase}"`;

    // Choices: 1 correct + 1 random wrong, shuffled
    const wrong = q.wrongs[Math.floor(Math.random() * q.wrongs.length)] || '—';
    const opts = Math.random() < 0.5
      ? [{ text: q.correct, isRight: true }, { text: wrong, isRight: false }]
      : [{ text: wrong, isRight: false }, { text: q.correct, isRight: true }];

    const choicesEl = this.el.querySelector('#cine-choices');
    choicesEl.innerHTML = opts.map((opt, i) => `
      <button class="cine-choice-btn" data-idx="${i}" data-right="${opt.isRight}" style="
        width:100%;padding:14px 16px;border-radius:14px;border:none;
        background:rgba(255,255,255,0.12);backdrop-filter:blur(8px);
        color:#fff;font-size:0.92rem;font-weight:700;text-align:left;cursor:pointer;
        border:1.5px solid rgba(255,255,255,0.18);
        transition:all 0.18s ease;line-height:1.4;
      ">${opt.text}</button>
    `).join('');

    choicesEl.querySelectorAll('.cine-choice-btn').forEach(btn => {
      btn.onclick = () => this._checkAnswer(btn, entry);
    });

    this.canAnswer = true;

    // Animate panel in
    const panel = this.el.querySelector('#cine-question');
    panel.style.display = 'flex';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.transform = 'translateY(0)';
      });
    });
  }

  _checkAnswer(btn, entry) {
    if (!this.canAnswer) return;
    this.canAnswer = false;

    const isRight = btn.dataset.right === 'true';
    const allBtns = this.el.querySelectorAll('.cine-choice-btn');

    allBtns.forEach(b => {
      b.style.pointerEvents = 'none';
      if (b.dataset.right === 'true') {
        b.style.background = 'rgba(34,197,94,0.85)';
        b.style.borderColor = '#22c55e';
        b.style.color = '#fff';
      } else if (b === btn) {
        b.style.background = 'rgba(239,68,68,0.8)';
        b.style.borderColor = '#ef4444';
      }
    });

    if (isRight) {
      const earned = Math.round(this._qPoints);
      this._showXP(`+${earned}`, '#22c55e');
      const app = window._app || window.app;
      if (app && app.addXP) app.addXP(earned, 'medium', 'cinema');
    } else {
      this._showXP(`−${Math.round(this._qPoints / 4)}`, '#ef4444');
    }

    setTimeout(() => {
      this._qIdx++;
      if (this._qIdx < this._questionQueue.length) {
        this._showQuestion(entry);
        this.canAnswer = true;
      } else {
        this._nextClip();
      }
    }, 1500);
  }

  _showXP(text, color) {
    const xp = this.el.querySelector('#cine-xp');
    xp.textContent = text;
    xp.style.background = color;
    xp.style.boxShadow = `0 0 40px ${color}`;
    xp.style.color = '#fff';
    xp.style.transform = 'translate(-50%,-50%) scale(1.1)';
    xp.style.transition = 'transform 0.25s, opacity 0.4s';
    setTimeout(() => {
      xp.style.transform = 'translate(-50%,-150%) scale(1)';
      xp.style.opacity = '0';
      setTimeout(() => {
        xp.style.transform = 'translate(-50%,-50%) scale(0)';
        xp.style.opacity = '1';
      }, 500);
    }, 800);
  }

  _hideQuestion() {
    const panel = this.el.querySelector('#cine-question');
    if (panel) {
      panel.style.transform = 'translateY(100%)';
      setTimeout(() => { panel.style.display = 'none'; }, 400);
    }
  }

  _nextClip() {
    this.currentIndex++;
    if (this.currentIndex >= this.clips.length) {
      // Re-shuffle and restart
      this.clips = this._shuffle([...CINEMA_DATA]);
      this.currentIndex = 0;
    }
    setTimeout(() => this._loadClip(), 600);
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
  const observer = new MutationObserver(() => initPlugin());
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(initPlugin, 1000);
})();
