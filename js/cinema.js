/**
 * RHAPSODY CINEMA — Bağımsız Modül (v1.2)
 * Kendi kendini tetikleyen (Auto-hook) versiyon
 */
class CinemaModule {
  constructor(app) {
    this.app = app;
    this.el = null;
    this.player = null;
    this.currentIndex = 0;
    this.timer = 15;
    this.timerInterval = null;
    this.isSubtitleOn = false;
    this.canAnswer = false;
  }

  init(el) {
    console.log("🎬 Cinema başlatılıyor...");
    this.el = el;
    this._render();
    this._loadYouTubeAPI();
  }

  _loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      this._initPlayer();
    } else {
      if (!document.getElementById('yt-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-api-script';
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      const checkAPI = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkAPI);
          this._initPlayer();
        }
      }, 200);
    }
  }

  _initPlayer() {
    if (this.player) { try { this.player.destroy(); } catch(e) {} }
    this.player = new YT.Player('cinema-player', {
      height: '100%', width: '100%',
      playerVars: { 'autoplay': 1, 'controls': 0, 'rel': 0, 'modestbranding': 1, 'fs': 0, 'iv_load_policy': 3, 'enablejsapi': 1 },
      events: {
        'onReady': () => this._nextVideo(),
        'onStateChange': (e) => this._onPlayerStateChange(e)
      }
    });
  }

  _render() {
    if (!this.el) return;
    this.el.innerHTML = `
      <div class="cinema-wrap">
        <div class="cinema-video-box">
          <div id="cinema-player"></div>
          <div id="cinema-overlay" class="cinema-overlay" style="display:none">
            <div class="cinema-timer-ring" id="cinema-timer">15</div>
            <div id="cinema-decision-box" class="cinema-decision-buttons">
              <button class="cinema-btn" id="btn-sub-off">🚫 Altyazı Kapalı</button>
              <button class="cinema-btn" id="btn-sub-on">📝 Altyazı Açık</button>
            </div>
          </div>
          <div id="cinema-points" class="cinema-points-popup">+8</div>
        </div>
        <div id="cinema-quiz" class="cinema-quiz-area" style="display:none"></div>
        <div class="cinema-info" style="text-align:center; color:var(--text-3); font-size:0.8rem; margin-top:20px; text-transform:uppercase; letter-spacing:1px;">
          RHAPSODY CINEMA — SAHNEYİ DİNLE VE ANLA
        </div>
      </div>
    `;
    this.el.querySelector('#btn-sub-off').onclick = () => this._startQuiz(false);
    this.el.querySelector('#btn-sub-on').onclick = () => this._startQuiz(true);
  }

  _nextVideo() {
    if (typeof CINEMA_DATA === 'undefined') return;
    this.currentIndex = Math.floor(Math.random() * CINEMA_DATA.length);
    const video = CINEMA_DATA[this.currentIndex];
    if (this.player && this.player.loadVideoById) {
      this.player.loadVideoById({ videoId: video.videoId, startSeconds: video.start, endSeconds: video.end });
    }
    this.el.querySelector('#cinema-overlay').style.display = 'none';
    this.el.querySelector('#cinema-quiz').style.display = 'none';
    this.canAnswer = false;
  }

  _onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      const video = CINEMA_DATA[this.currentIndex];
      const checkEnd = setInterval(() => {
        if (!this.player || !this.player.getCurrentTime) { clearInterval(checkEnd); return; }
        if (this.player.getCurrentTime() >= video.end) {
          clearInterval(checkEnd);
          this.player.pauseVideo();
          this._showDecisionOverlay();
        }
      }, 200);
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
    const video = CINEMA_DATA[this.currentIndex];
    const quizArea = this.el.querySelector('#cinema-quiz');
    const overlay = this.el.querySelector('#cinema-overlay');
    const timerEl = this.el.querySelector('#cinema-timer');
    this.isSubtitleOn = subtitle;
    this.el.querySelector('#cinema-decision-box').style.display = 'none';
    timerEl.style.display = 'flex';
    if (subtitle) {
      const subDiv = document.createElement('div');
      subDiv.className = 'cinema-sub-text';
      subDiv.style = 'font-size:1.2rem; font-weight:800; color:#fff; text-align:center; padding:20px; background:rgba(0,0,0,0.5); border-radius:10px; margin-top:20px;';
      subDiv.textContent = `"${video.transcript}"`;
      overlay.appendChild(subDiv);
    }
    quizArea.style.display = 'grid';
    quizArea.innerHTML = video.options.map((opt, i) => `<div class="cinema-option-card" onclick="cinemaMod._checkAnswer(${i})">${opt.text}</div>`).join('');
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
    const video = CINEMA_DATA[this.currentIndex];
    const cards = this.el.querySelectorAll('.cinema-option-card');
    const pointsPopup = this.el.querySelector('#cinema-points');
    let correctIndex = video.options.findIndex(o => o.isCorrect);
    cards.forEach((card, i) => {
      if (i === correctIndex) card.classList.add('correct');
      else if (i === index) card.classList.add('wrong');
    });
    if (index === correctIndex) {
      let earned = this.isSubtitleOn ? Math.round(video.points / 2) : video.points;
      pointsPopup.textContent = `+${earned}`;
      pointsPopup.classList.add('show');
      const app = window._app || window.app;
      if (app && app.addXP) app.addXP(earned, "medium", "cinema");
    }
    setTimeout(() => { pointsPopup.classList.remove('show'); this._nextVideo(); }, 2500);
  }
}

// ── OTOMATİK BAĞLANTI (OBSERVER) ──
// Sayfa değişimlerini izler ve Cinema mount point'i gördüğü an başlatır.
(function() {
  const initPlugin = () => {
    const mount = document.getElementById('cinema-mount-point');
    if (mount && (!window.cinemaMod || window.cinemaMod.el !== mount)) {
      const app = window._app || window.app;
      window.cinemaMod = new CinemaModule(app);
      window.cinemaMod.init(mount);
    }
  };

  // DOM değişimlerini izle
  const observer = new MutationObserver(() => initPlugin());
  observer.observe(document.body, { childList: true, subtree: true });
  
  // İlk yükleme için deneme
  setTimeout(initPlugin, 1000);
})();
