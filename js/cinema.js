/**
 * RHAPSODY CINEMA — Gelişmiş Video Modülü
 * Voscreen Tarzı Öğrenme Deneyimi
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
    this.apiReady = false;
  }

  init(el) {
    console.log("[Cinema] Başlatılıyor...");
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
      }, 300);
    }
  }

  _initPlayer() {
    console.log("[Cinema] Player kuruluyor...");
    const playerContainer = document.getElementById('cinema-player');
    if (!playerContainer) return;

    // Eğer zaten bir player varsa temizle
    if (this.player) { try { this.player.destroy(); } catch(e) {} }

    this.player = new YT.Player('cinema-player', {
      height: '100%', width: '100%',
      playerVars: { 
        'autoplay': 1, 'controls': 0, 'rel': 0, 'showinfo': 0, 'modestbranding': 1, 'fs': 0, 'iv_load_policy': 3, 'disablekb': 1, 'enablejsapi': 1
      },
      events: {
        'onReady': () => {
          console.log("[Cinema] Player hazır.");
          this._nextVideo();
        },
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

    const offBtn = this.el.querySelector('#btn-sub-off');
    const onBtn = this.el.querySelector('#btn-sub-on');
    if (offBtn) offBtn.onclick = () => this._startQuiz(false);
    if (onBtn) onBtn.onclick = () => this._startQuiz(true);
  }

  _nextVideo() {
    const dataPool = (typeof CINEMA_DATA !== 'undefined') ? CINEMA_DATA : [];
    if (!dataPool.length) return;

    this.currentIndex = Math.floor(Math.random() * dataPool.length);
    const video = dataPool[this.currentIndex];
    
    if (this.player && this.player.loadVideoById) {
      this.player.loadVideoById({
        videoId: video.videoId,
        startSeconds: video.start,
        endSeconds: video.end
      });
      console.log("[Cinema] Video yüklendi:", video.videoId);
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
    if (!overlay) return;

    const oldSub = overlay.querySelector('.cinema-sub-text');
    if (oldSub) oldSub.remove();

    overlay.style.display = 'flex';
    if (decisionBox) decisionBox.style.display = 'flex';
    if (timerEl) timerEl.style.display = 'none';
  }

  _startQuiz(subtitle) {
    const video = CINEMA_DATA[this.currentIndex];
    const quizArea = this.el.querySelector('#cinema-quiz');
    const overlay = this.el.querySelector('#cinema-overlay');
    const decisionBox = this.el.querySelector('#cinema-decision-box');
    const timerEl = this.el.querySelector('#cinema-timer');

    this.isSubtitleOn = subtitle;
    if (decisionBox) decisionBox.style.display = 'none';
    if (timerEl) timerEl.style.display = 'flex';
    
    if (subtitle) {
      const subDiv = document.createElement('div');
      subDiv.className = 'cinema-sub-text';
      subDiv.style = 'font-size:1.2rem; font-weight:800; color:#fff; text-align:center; padding:20px; background:rgba(0,0,0,0.5); border-radius:10px; margin-top:20px;';
      subDiv.textContent = `"${video.transcript}"`;
      overlay.appendChild(subDiv);
    }

    quizArea.style.display = 'grid';
    quizArea.innerHTML = video.options.map((opt, i) => `
      <div class="cinema-option-card" onclick="window.cinemaMod._checkAnswer(${i})">${opt.text}</div>
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
      if (this.app && this.app.addXP) this.app.addXP(earned, "medium", "cinema");
      if (this.app && this.app.audio) this.app.audio.play("success");
    } else {
      if (this.app && this.app.audio) this.app.audio.play("pop");
    }

    setTimeout(() => {
      pointsPopup.classList.remove('show');
      this._nextVideo();
    }, 2500);
  }
}

// ── GLOBAL REGISTRATION ──
(function() {
  const checkApp = setInterval(() => {
    const appInstance = window._app || window.app;
    if (appInstance) {
      clearInterval(checkApp);
      window.cinemaMod = new CinemaModule(appInstance);
      
      // Navigate fonksiyonuna cinema desteği enjekte et
      appInstance._initCinema = function() {
        const mount = document.getElementById('cinema-mount-point');
        if (mount) window.cinemaMod.init(mount);
      };
      
      console.log("[Cinema] Enjeksiyon başarılı.");
    }
  }, 200);
})();

window.CinemaModule = CinemaModule;
