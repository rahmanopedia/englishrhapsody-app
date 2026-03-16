/**
 * RHAPSODY CINEMA — MODÜL MANTIĞI
 * YouTube IFrame Player API & App Integration
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
    this.el = el;
    this._render();
    this._loadYouTubeAPI();
  }

  _loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      this._initPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevReady) prevReady();
        this._initPlayer();
      };
    }
  }

  _initPlayer() {
    // Önceki player varsa temizle
    if (this.player) { try { this.player.destroy(); } catch(e) {} }

    this.player = new YT.Player('cinema-player', {
      height: '100%', width: '100%',
      playerVars: { 
        'autoplay': 1, 'controls': 0, 'rel': 0, 'showinfo': 0, 'modestbranding': 1, 'fs': 0, 'iv_load_policy': 3, 'disablekb': 1
      },
      events: {
        'onReady': () => this._nextVideo(),
        'onStateChange': (e) => this._onPlayerStateChange(e)
      }
    });
  }

  _render() {
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
    const dataPool = typeof CINEMA_DATA !== 'undefined' ? CINEMA_DATA : [];
    if (!dataPool.length) return;

    this.currentIndex = Math.floor(Math.random() * dataPool.length);
    const video = dataPool[this.currentIndex];
    
    if (this.player && this.player.loadVideoById) {
      this.player.loadVideoById({
        videoId: video.videoId,
        startSeconds: video.start,
        endSeconds: video.end
      });
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
    const decisionBox = this.el.querySelector('#cinema-decision-box');
    const timerEl = this.el.querySelector('#cinema-timer');
    const oldSub = overlay.querySelector('.cinema-sub-text');
    if (oldSub) oldSub.remove();

    overlay.style.display = 'flex';
    decisionBox.style.display = 'flex';
    timerEl.style.display = 'none';
  }

  _startQuiz(subtitle) {
    const video = CINEMA_DATA[this.currentIndex];
    const quizArea = this.el.querySelector('#cinema-quiz');
    const overlay = this.el.querySelector('#cinema-overlay');
    const decisionBox = this.el.querySelector('#cinema-decision-box');
    const timerEl = this.el.querySelector('#cinema-timer');

    this.isSubtitleOn = subtitle;
    decisionBox.style.display = 'none';
    timerEl.style.display = 'flex';
    
    if (subtitle) {
      const subDiv = document.createElement('div');
      subDiv.className = 'cinema-sub-text';
      subDiv.style = 'font-size:1.2rem; font-weight:800; color:#fff; text-align:center; padding:20px; background:rgba(0,0,0,0.5); border-radius:10px; margin-top:20px;';
      subDiv.textContent = `"${video.transcript}"`;
      overlay.appendChild(subDiv);
    }

    quizArea.style.display = 'grid';
    quizArea.innerHTML = video.options.map((opt, i) => `
      <div class="cinema-option-card" onclick="app.modules.cinema._checkAnswer(${i})">${opt.text}</div>
    `).join('');

    this.timer = 15;
    timerEl.textContent = this.timer;
    this.canAnswer = true;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timer--;
      timerEl.textContent = this.timer;
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this._checkAnswer(-1);
      }
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
      this.app.addXP(earned, "medium", "cinema");
      if (this.app.audio) this.app.audio.play("success");
    } else {
      if (this.app.audio) this.app.audio.play("pop");
    }

    setTimeout(() => {
      pointsPopup.classList.remove('show');
      this._nextVideo();
    }, 2500);
  }
}

// ── APP ENTEGRASYONU ──
// Bu kısım minify edilmiş app.js'e dokunmadan modülü sisteme dahil eder.
(function() {
  const checkApp = setInterval(() => {
    if (window._app || window.app) {
      const appInstance = window._app || window.app;
      appInstance.modules = appInstance.modules || {};
      appInstance.modules.cinema = new CinemaModule(appInstance);
      
      // Navigate fonksiyonuna cinema desteği ekle
      appInstance._initCinema = function() {
        const mount = document.getElementById('cinema-mount-point');
        if (mount) this.modules.cinema.init(mount);
      };
      
      clearInterval(checkApp);
      console.log("[Cinema] Entegre edildi.");
    }
  }, 500);
})();

window.CinemaModule = CinemaModule;
