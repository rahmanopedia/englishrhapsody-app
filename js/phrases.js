/**
 * RHAPSODY İFADELER — v1.0
 * Film alıntılarını kart çevirerek öğret (İngilizce → Türkçe)
 */
class PhrasesModule {
  constructor(app) {
    this.app = app;
    this.el = null;
    this.phrases = [];
    this.index = 0;
    this.revealed = false;
  }

  init(el) {
    this.el = el;
    if (typeof CINEMA_DATA === 'undefined' || !CINEMA_DATA.length) return;

    // Collect all phrases from CINEMA_DATA
    const raw = CINEMA_DATA.map(entry => ({
      english: entry.transcript,
      turkish: entry.options.find(o => o.isCorrect)?.text || '—',
      film: entry.film || '',
      year: entry.year || '',
      emoji: entry.category === 'Spor' ? '⚽' :
             entry.category === 'Aksiyon' ? '🎬' :
             entry.category === 'Bilim Kurgu' ? '🚀' :
             entry.category === 'Müzikal' ? '🎵' : '🎬',
    }));

    this.phrases = this._shuffle(raw);
    this.index = 0;
    this._render();
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
      <div id="phrases-root" style="
        position:fixed;inset:0;z-index:200;background:#0f0f1a;
        display:flex;flex-direction:column;overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif;
      ">
        <!-- Header -->
        <div style="position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:16px 16px 0;">
          <button id="phr-exit" style="
            background:rgba(255,255,255,0.1);backdrop-filter:blur(8px);
            border:none;border-radius:12px;padding:8px 14px;
            color:#fff;font-weight:700;font-size:0.8rem;cursor:pointer;
          ">← Geri</button>
          <div style="text-align:center;">
            <div style="color:#fff;font-weight:900;font-size:0.95rem;">💬 İfadeler</div>
            <div id="phr-counter" style="color:rgba(255,255,255,0.45);font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;"></div>
          </div>
          <div style="width:60px;"></div>
        </div>

        <!-- Progress bar -->
        <div style="margin:10px 16px 0;height:3px;border-radius:3px;background:rgba(255,255,255,0.1);overflow:hidden;">
          <div id="phr-progress" style="height:100%;border-radius:3px;background:linear-gradient(90deg,#a78bfa,#ec4899);transition:width 0.4s;"></div>
        </div>

        <!-- Card area -->
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 16px;gap:16px;">

          <!-- Main card -->
          <div id="phr-card" style="width:100%;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);cursor:pointer;" onclick="window.phrasesMod._handleTap()">
            <!-- English side -->
            <div id="phr-top" style="
              position:relative;display:flex;flex-direction:column;
              align-items:center;justify-content:center;
              padding:36px 24px;gap:12px;min-height:180px;
            ">
              <!-- Film badge -->
              <div id="phr-film" style="
                background:rgba(0,0,0,0.3);border-radius:20px;
                padding:5px 14px;font-size:0.7rem;font-weight:700;
                color:rgba(255,255,255,0.85);letter-spacing:0.5px;
              "></div>

              <!-- English text -->
              <div id="phr-english" style="
                color:#fff;font-weight:900;text-align:center;line-height:1.35;
                font-size:1.35rem;text-shadow:0 2px 12px rgba(0,0,0,0.4);
              "></div>

              <!-- Tap hint -->
              <div id="phr-hint" style="
                color:rgba(255,255,255,0.5);font-size:0.72rem;font-weight:700;
              ">👆 Türkçesini görmek için dokun</div>
            </div>

            <!-- Turkish reveal -->
            <div id="phr-bottom" style="
              background:rgba(255,255,255,0.97);
              display:none;flex-direction:column;
              align-items:center;justify-content:center;
              padding:24px;gap:6px;
            ">
              <div style="color:#94a3b8;font-size:0.65rem;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;">Türkçesi</div>
              <div id="phr-turkish" style="
                color:#1e293b;font-weight:900;text-align:center;
                font-size:1.2rem;line-height:1.4;
              "></div>
            </div>
          </div>

          <!-- Action buttons (shown after reveal) -->
          <div id="phr-actions" style="width:100%;display:none;flex-direction:row;gap:10px;">
            <button id="phr-speak" onclick="window.phrasesMod._speak()" style="
              background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.15);
              border-radius:14px;padding:14px 18px;color:#fff;font-size:1rem;cursor:pointer;
            ">🔊</button>
            <button id="phr-next" onclick="window.phrasesMod._next()" style="
              flex:1;background:linear-gradient(135deg,#a78bfa,#ec4899);
              border:none;border-radius:14px;padding:14px;
              color:#fff;font-weight:900;font-size:0.95rem;cursor:pointer;
              box-shadow:0 6px 20px rgba(167,139,250,0.35);
            ">Sonraki →</button>
          </div>

          <!-- Dot indicators -->
          <div id="phr-dots" style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center;max-width:280px;"></div>
        </div>
      </div>
    `;

    this.el.querySelector('#phr-exit').onclick = () => this._exit();
    this._updateCard();
  }

  _updateCard() {
    const p = this.phrases[this.index];
    if (!p) { this._showDone(); return; }

    this.revealed = false;
    const progress = (this.index / this.phrases.length) * 100;

    this.el.querySelector('#phr-counter').textContent = `${this.index + 1} / ${this.phrases.length}`;
    this.el.querySelector('#phr-progress').style.width = `${progress}%`;
    this.el.querySelector('#phr-english').textContent = `"${p.english}"`;
    this.el.querySelector('#phr-film').textContent = p.film ? `🎬 ${p.film}${p.year ? ' · ' + p.year : ''}` : '🎬';
    this.el.querySelector('#phr-turkish').textContent = p.turkish;

    // Show/hide bottom
    this.el.querySelector('#phr-bottom').style.display = 'none';
    this.el.querySelector('#phr-hint').style.display = 'block';
    this.el.querySelector('#phr-actions').style.display = 'none';

    // Card gradient
    const GRADIENTS = [
      'linear-gradient(135deg,#667eea,#764ba2)',
      'linear-gradient(135deg,#f093fb,#f5576c)',
      'linear-gradient(135deg,#4facfe,#00f2fe)',
      'linear-gradient(135deg,#43e97b,#38f9d7)',
      'linear-gradient(135deg,#fa709a,#fee140)',
      'linear-gradient(135deg,#a18cd1,#fbc2eb)',
      'linear-gradient(135deg,#fd7043,#ff8a65)',
      'linear-gradient(135deg,#667eea,#ec4899)',
    ];
    this.el.querySelector('#phr-top').style.background = GRADIENTS[this.index % GRADIENTS.length];

    // Dots
    this._renderDots();

    // Auto-speak
    this._speak();
  }

  _handleTap() {
    if (this.revealed) return;
    this.revealed = true;
    this.el.querySelector('#phr-bottom').style.display = 'flex';
    this.el.querySelector('#phr-hint').style.display = 'none';
    this.el.querySelector('#phr-actions').style.display = 'flex';
  }

  _speak() {
    const p = this.phrases[this.index];
    if (!p) return;
    if (typeof speechSynthesis === 'undefined') return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(p.english);
    utt.lang = 'en-US';
    utt.rate = 0.85;
    const voices = speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en'));
    if (enVoice) utt.voice = enVoice;
    speechSynthesis.speak(utt);
  }

  _next() {
    if (this.index + 1 >= this.phrases.length) {
      this._showDone();
    } else {
      this.index++;
      this._updateCard();
    }
  }

  _renderDots() {
    const dots = this.el.querySelector('#phr-dots');
    dots.innerHTML = this.phrases.map((_, i) =>
      `<div style="
        width:6px;height:6px;border-radius:50%;
        background:${i < this.index ? '#a78bfa' : i === this.index ? '#ec4899' : 'rgba(255,255,255,0.15)'};
        transform:${i === this.index ? 'scale(1.5)' : 'scale(1)'};
        transition:all 0.3s;
      "></div>`
    ).join('');
  }

  _showDone() {
    const root = this.el.querySelector('#phrases-root');
    if (!root) return;
    root.innerHTML = `
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:32px;text-align:center;">
        <div style="font-size:5rem;">🎉</div>
        <div style="color:#fff;font-size:2rem;font-weight:900;">Tebrikler!</div>
        <div style="color:rgba(255,255,255,0.6);font-size:1rem;font-weight:600;">
          ${this.phrases.length} film alıntısını tamamladın!
        </div>
        <button onclick="window.phrasesMod._exit()" style="
          background:linear-gradient(135deg,#a78bfa,#ec4899);border:none;
          border-radius:20px;padding:16px 36px;color:#fff;font-weight:900;font-size:1rem;
          cursor:pointer;box-shadow:0 8px 24px rgba(167,139,250,0.4);
        ">Ana Menüye Dön</button>
      </div>
    `;
  }

  _exit() {
    if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
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
    const mount = document.getElementById('phrases-mount-point');
    if (mount && (!window.phrasesMod || window.phrasesMod.el !== mount)) {
      const app = window._app || window.app;
      window.phrasesMod = new PhrasesModule(app);
      window.phrasesMod.init(mount);
    }
  };
  const observer = new MutationObserver(() => initPlugin());
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(initPlugin, 1000);
})();
