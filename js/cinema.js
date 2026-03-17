/**
 * RHAPSODY CINEMA — Bağımsız Modül (v4.0)
 * HTML5 Video + YouTube IFrame API desteği.
 * type:"video"   → HTML5 <video> (Archive.org / CC)
 * type:"youtube" → YouTube IFrame API (fair use, 15 sn kesit)
 */
class CinemaModule {
  constructor(app) {
    this.app = app;
    this.el = null;
    this.video = null;
    this.ytPlayer = null;
    this.ytReady = false;
    this.currentIndex = 0;
    this.timer = 15;
    this.timerInterval = null;
    this.isSubtitleOn = false;
    this.canAnswer = false;
    this.endWatcher = null;
    this._pendingEndTime = null;
    this._pendingEntry = null;
  }

  init(el) {
    console.log("🎬 Cinema başlatılıyor...");
    this.el = el;
    this._loadYouTubeAPI();
    this._render();
  }

  _loadYouTubeAPI() {
    if (window.YT && window.YT.Player) { this.ytReady = true; return; }
    if (document.getElementById('yt-iframe-api')) return;
    const tag = document.createElement('script');
    tag.id = 'yt-iframe-api';
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
      this.ytReady = true;
      if (this._pendingEntry) {
        this._loadYouTubeEntry(this._pendingEntry);
        this._pendingEntry = null;
      }
    };
  }

  _render() {
    if (!this.el) return;
    this.el.innerHTML = `
      <div class="cinema-wrap">
        <div class="cinema-video-box">
          <video id="cinema-video" playsinline style="width:100%;height:100%;object-fit:cover;background:#000;display:block;"></video>
          <div id="cinema-yt-container" style="position:absolute;inset:0;display:none;"><div id="cinema-yt-player" style="width:100%;height:100%;"></div></div>
          <div id="cinema-loading" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#000;gap:12px;">
            <div style="color:var(--text-3);font-size:0.75rem;letter-spacing:2px;">YÜKLENİYOR</div>
            <div style="width:40px;height:2px;background:var(--cyan);animation:cinema-load 1.2s ease-in-out infinite alternate;border-radius:2px;"></div>
          </div>
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

    this.el.querySelector('#cinema-overlay').style.display = 'none';
    this.el.querySelector('#cinema-quiz').style.display = 'none';
    this.el.querySelector('#cinema-play-prompt').style.display = 'none';
    this.el.querySelector('#cinema-loading').style.display = 'flex';
    this.el.querySelector('#cinema-video-info').style.display = 'none';
    this.canAnswer = false;

    const isYT = entry.type === 'youtube';
    this.el.querySelector('#cinema-video').style.display = isYT ? 'none' : 'block';
    this.el.querySelector('#cinema-yt-container').style.display = isYT ? 'block' : 'none';

    if (isYT) {
      this._showInfo(entry);
      if (this.ytReady) {
        this._loadYouTubeEntry(entry);
      } else {
        this._pendingEntry = entry;
      }
    } else {
      this._loadHTML5Entry(entry);
    }
  }

  /* ── HTML5 video ── */
  _loadHTML5Entry(entry) {
    const v = this.video;
    v.src = entry.url;
    v.load();
    v.addEventListener('loadedmetadata', () => { v.currentTime = entry.start; }, { once: true });
    v.addEventListener('seeked', () => {
      this._showInfo(entry);
      this._playVideo(entry.end);
    }, { once: true });
    v.addEventListener('error', () => {
      this.el.querySelector('#cinema-loading').innerHTML =
        '<div style="color:var(--rose);font-size:0.8rem;text-align:center;padding:20px;">Video yüklenemedi. Bağlantınızı kontrol edin.</div>';
    }, { once: true });
  }

  _playVideo(endTime) {
    const v = this.video;
    const loading = this.el.querySelector('#cinema-loading');
    v.play().then(() => {
      loading.style.display = 'none';
      this._watchEndHTML5(endTime);
    }).catch(() => {
      loading.style.display = 'none';
      this.el.querySelector('#cinema-play-prompt').style.display = 'flex';
      this._pendingEndTime = endTime;
    });
  }

  _playAfterInteraction() {
    const entry = CINEMA_DATA[this.currentIndex];
    this.el.querySelector('#cinema-play-prompt').style.display = 'none';
    if (entry.type === 'youtube') {
      if (this.ytPlayer) { this.ytPlayer.playVideo(); this._watchEndYT(entry.end); }
    } else {
      this.video.play().then(() => { this._watchEndHTML5(this._pendingEndTime); });
    }
  }

  _watchEndHTML5(endTime) {
    const v = this.video;
    if (this.endWatcher) clearInterval(this.endWatcher);
    this.endWatcher = setInterval(() => {
      if (!v || v.paused) return;
      if (v.currentTime >= endTime) {
        clearInterval(this.endWatcher); this.endWatcher = null;
        v.pause();
        this._showDecisionOverlay();
      }
    }, 100);
  }

  /* ── YouTube IFrame ── */
  _loadYouTubeEntry(entry) {
    const loading = this.el.querySelector('#cinema-loading');
    const container = this.el.querySelector('#cinema-yt-player');

    // Destroy previous player if exists
    if (this.ytPlayer) {
      try { this.ytPlayer.destroy(); } catch(e) {}
      this.ytPlayer = null;
      container.innerHTML = '';
    }

    this.ytPlayer = new YT.Player(container, {
      width: '100%',
      height: '100%',
      videoId: entry.videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        start: entry.start,
        end: entry.end,
        playsinline: 1
      },
      events: {
        onReady: (e) => {
          loading.style.display = 'none';
          e.target.playVideo();
          this._watchEndYT(entry.end);
        },
        onError: () => {
          loading.innerHTML = '<div style="color:var(--rose);font-size:0.8rem;text-align:center;padding:20px;">Video yüklenemedi.</div>';
        },
        onStateChange: (e) => {
          // YT.PlayerState.PLAYING = 1, PAUSED = 2
          if (e.data === 1) {
            // Player started, make sure end watcher is running
          }
        }
      }
    });
  }

  _watchEndYT(endTime) {
    if (this.endWatcher) clearInterval(this.endWatcher);
    this.endWatcher = setInterval(() => {
      if (!this.ytPlayer) return;
      try {
        const state = this.ytPlayer.getPlayerState();
        const cur = this.ytPlayer.getCurrentTime();
        if (state === 1 && cur >= endTime) {
          clearInterval(this.endWatcher); this.endWatcher = null;
          this.ytPlayer.pauseVideo();
          this._showDecisionOverlay();
        }
        // Also trigger if YouTube auto-ended (state 0)
        if (state === 0) {
          clearInterval(this.endWatcher); this.endWatcher = null;
          this._showDecisionOverlay();
        }
      } catch(e) {}
    }, 200);
  }

  /* ── Shared UI ── */
  _showInfo(entry) {
    const info = this.el.querySelector('#cinema-video-info');
    if (entry.film) {
      const license = entry.type === 'youtube' ? 'Fair Use — Eğitim' : 'Public Domain / CC';
      info.textContent = `🎬 ${entry.film}${entry.year ? ' (' + entry.year + ')' : ''} · ${license}`;
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
