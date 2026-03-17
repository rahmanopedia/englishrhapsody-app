/**
 * RHAPSODY CINEMA — Bağımsız Modül (v3.1)
 * HTML5 Video — YouTube IFrame kaldırıldı, reklam yok.
 * Kaynak: Archive.org kamu malı + Blender Foundation CC-BY filmler.
 */
class CinemaModule {
  constructor(app) {
    this.app = app;
    this.el = null;
    this.video = null;
    this.currentIndex = 0;
    this.timer = 15;
    this.timerInterval = null;
    this.isSubtitleOn = false;
    this.canAnswer = false;
    this.endWatcher = null;
    this._pendingEndTime = null;
  }

  init(el) {
    console.log("🎬 Cinema başlatılıyor...");
    this.el = el;
    this._render();
  }

  _render() {
    if (!this.el) return;
    this.el.innerHTML = `
      <div class="cinema-wrap">
        <div class="cinema-video-box">
          <video id="cinema-video" playsinline style="width:100%;height:100%;object-fit:cover;background:#000;display:block;"></video>
          <div id="cinema-loading" style="display:none;"></div>
          <div id="cinema-play-prompt" style="position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);cursor:pointer;gap:12px;">
            <div style="width:60px;height:60px;border-radius:50%;background:var(--cyan);display:flex;align-items:center;justify-content:center;font-size:1.6rem;">▶</div>
            <div style="color:#fff;font-size:0.8rem;letter-spacing:1px;">OYNATMAK İÇİN DOKUN</div>
          </div>
          <div id="cinema-overlay" class="cinema-overlay" style="display:none">
            <div class="cinema-timer-ring" id="cinema-timer">15</div>
            <div id="cinema-decision-box" class="cinema-decision-buttons">
              <button class="cinema-btn" id="btn-sub-off">🚫 Altyazı Kapalı</button>
              <button class="cinema-btn" id="btn-sub-on">📝 Altyazı Açık</button>
            </div>
          </div>
          <div id="cinema-points" class="cinema-points-popup">+8</div>
        </div>
        <div id="cinema-video-info" style="display:none;text-align:center;font-size:0.72rem;color:var(--text-3);margin-top:8px;letter-spacing:0.5px;"></div>
        <div id="cinema-quiz" class="cinema-quiz-area" style="display:none"></div>
        <div class="cinema-info" style="text-align:center;color:var(--text-3);font-size:0.8rem;margin-top:20px;text-transform:uppercase;letter-spacing:1px;">
          RHAPSODY CINEMA — SAHNEYİ DİNLE VE ANLA
        </div>
      </div>
      <style>
        @keyframes cinema-load {
          from { transform: scaleX(0.3); opacity:0.4; }
          to   { transform: scaleX(1);   opacity:1;   }
        }
      </style>
    `;

    this.video = this.el.querySelector('#cinema-video');
    this.el.querySelector('#btn-sub-off').onclick = () => this._startQuiz(false);
    this.el.querySelector('#btn-sub-on').onclick = () => this._startQuiz(true);
    this.el.querySelector('#cinema-play-prompt').onclick = () => this._playAfterInteraction();
    this._nextVideo();
  }

  _nextVideo() {
    if (typeof CINEMA_DATA === 'undefined' || !CINEMA_DATA.length) return;
    if (this.endWatcher) { clearInterval(this.endWatcher); this.endWatcher = null; }
    if (this.timerInterval) { clearInterval(this.timerInterval); this.timerInterval = null; }

    this.currentIndex = Math.floor(Math.random() * CINEMA_DATA.length);
    const entry = CINEMA_DATA[this.currentIndex];
    const v = this.video;

    this.el.querySelector('#cinema-overlay').style.display = 'none';
    this.el.querySelector('#cinema-quiz').style.display = 'none';
    this.el.querySelector('#cinema-play-prompt').style.display = 'none';
    this.el.querySelector('#cinema-video-info').style.display = 'none';
    this.canAnswer = false;

    this._showInfo(entry);

    v.preload = 'auto';
    v.src = entry.url;
    v.load();

    if (entry.start === 0) {
      this._tryPlay(v, entry.end);
    } else {
      v.addEventListener('loadedmetadata', () => {
        v.currentTime = entry.start;
        this._tryPlay(v, entry.end);
      }, { once: true });
    }
  }

  _tryPlay(v, endTime) {
    v.play().then(() => {
      this._watchEnd(endTime);
    }).catch(() => {
      this.el.querySelector('#cinema-play-prompt').style.display = 'flex';
      this._pendingEndTime = endTime;
    });
  }

  _playAfterInteraction() {
    this.el.querySelector('#cinema-play-prompt').style.display = 'none';
    const v = this.video;
    const doPlay = () => {
      v.play().then(() => {
        this._watchEnd(this._pendingEndTime);
      }).catch(() => {
        this.el.querySelector('#cinema-play-prompt').style.display = 'flex';
      });
    };
    if (v.readyState >= 3) {
      doPlay();
    } else {
      v.addEventListener('canplay', doPlay, { once: true });
    }
  }

  _watchEnd(endTime) {
    const v = this.video;
    if (this.endWatcher) clearInterval(this.endWatcher);

    const trigger = () => {
      if (this.endWatcher) { clearInterval(this.endWatcher); this.endWatcher = null; }
      v.pause();
      this._showDecisionOverlay();
    };

    v.addEventListener('ended', trigger, { once: true });

    this.endWatcher = setInterval(() => {
      if (!v) return;
      if (v.currentTime >= endTime) trigger();
    }, 100);
  }

  _showInfo(entry) {
    const info = this.el.querySelector('#cinema-video-info');
    if (entry.film) {
      info.textContent = `🎬 ${entry.film}${entry.year ? ' (' + entry.year + ')' : ''} · CC BY / Public Domain`;
      info.style.display = 'block';
    }
  }

  _showDecisionOverlay() {
    const overlay = this.el.querySelector('#cinema-overlay');
    const oldSub = overlay.querySelector('.cinema-sub-text');
    if (oldSub) oldSub.remove();
    overlay.style.display = 'flex';
    this.el.querySelector('#cinema-decision-box').style.display = 'flex';
    this.el.querySelector('#cinema-timer').style.display = 'none';
  }

  _startQuiz(subtitle) {
    const entry = CINEMA_DATA[this.currentIndex];
    const quizArea = this.el.querySelector('#cinema-quiz');
    const overlay = this.el.querySelector('#cinema-overlay');
    const timerEl = this.el.querySelector('#cinema-timer');
    this.isSubtitleOn = subtitle;
    this.el.querySelector('#cinema-decision-box').style.display = 'none';
    timerEl.style.display = 'flex';
    if (subtitle) {
      const subDiv = document.createElement('div');
      subDiv.className = 'cinema-sub-text';
      subDiv.style = 'font-size:1.2rem;font-weight:800;color:#fff;text-align:center;padding:20px;background:rgba(0,0,0,0.5);border-radius:10px;margin-top:20px;';
      subDiv.textContent = `"${entry.transcript}"`;
      overlay.appendChild(subDiv);
    }
    quizArea.style.display = 'grid';
    quizArea.innerHTML = entry.options.map((opt, i) =>
      `<div class="cinema-option-card" onclick="cinemaMod._checkAnswer(${i})">${opt.text}</div>`
    ).join('');
    this.timer = 15;
    timerEl.textContent = this.timer;
    this.canAnswer = true;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timer--;
      timerEl.textContent = this.timer;
      if (this.timer <= 0) { clearInterval(this.timerInterval); this._checkAnswer(-1); }
    }, 1000);
  }

  _checkAnswer(index) {
    if (!this.canAnswer) return;
    this.canAnswer = false;
    clearInterval(this.timerInterval);
    const entry = CINEMA_DATA[this.currentIndex];
    const cards = this.el.querySelectorAll('.cinema-option-card');
    const pointsPopup = this.el.querySelector('#cinema-points');
    const correctIndex = entry.options.findIndex(o => o.isCorrect);
    cards.forEach((card, i) => {
      if (i === correctIndex) card.classList.add('correct');
      else if (i === index) card.classList.add('wrong');
    });
    if (index === correctIndex) {
      const earned = this.isSubtitleOn ? Math.round(entry.points / 2) : entry.points;
      pointsPopup.textContent = `+${earned}`;
      pointsPopup.classList.add('show');
      const app = window._app || window.app;
      if (app && app.addXP) app.addXP(earned, 'medium', 'cinema');
    }
    setTimeout(() => { pointsPopup.classList.remove('show'); this._nextVideo(); }, 2500);
  }
}

// ── OTOMATİK BAĞLANTI ──
(function() {
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
