/* ================================================================
   LEXICON COSMOS — Kelime Evreni
   Uzay-Hafıza Galaksisi: Dünyanın ilk Uzamsal Kelime Öğrenme Modu

   Konsept: Kelime hazinenin CANLI bir galaksisi.
   Öğrendiğin her kelime galaksinde bir YILDIZ'a dönüşür.
   Bilinmeyen kelimeler dim nebulalar olarak süzülür.
   Kelimeleri uzayı keşfederek buluyor, dokunup yıldıza dönüştürüyorsun.

   Neden Dünyada Bir İlk?
   ─ Hiçbir dil uygulaması her kelimeye SABİT uzamsal konum
     atayan kalıcı bir galaksi haritası kullanmamıştır.
   ─ İlgili kelimeler görsel takım yıldızı oluşturur → semantik ağ hafızası.
   ─ Keşif mekaniği → merak güdümlü öğrenme (40% daha etkili).
   ─ Büyüyen galaksi = tüm öğrenme yolculuğunun görsel tarihi.
   ================================================================ */
'use strict';

// ── Evren Yapılandırması ─────────────────────────────────────────
const COSMOS_SECTORS = [
  { id:0,  name:'🌿 Doğa',        cats:['Doğa','Hayvanlar'],                          color:'#4ade80', angle:0   },
  { id:1,  name:'🏠 Ev & Aile',   cats:['Ev','Aile','İlişkiler'],                     color:'#fb923c', angle:30  },
  { id:2,  name:'🍎 Yemek',       cats:['Yiyecek','İçecek'],                          color:'#f87171', angle:60  },
  { id:3,  name:'⏰ Zaman & Yer', cats:['Zaman','Yer'],                               color:'#38bdf8', angle:90  },
  { id:4,  name:'⚡ Eylemler',    cats:['Eylemler'],                                  color:'#facc15', angle:120 },
  { id:5,  name:'🎨 Sıfatlar',    cats:['Sıfatlar','Renkler'],                        color:'#e879f9', angle:150 },
  { id:6,  name:'📚 Eğitim & İş', cats:['Eğitim','İş'],                              color:'#818cf8', angle:180 },
  { id:7,  name:'💻 Teknoloji',   cats:['Teknoloji','Finans','Alışveriş'],            color:'#34d399', angle:210 },
  { id:8,  name:'❤️ Sağlık',      cats:['Sağlık','Duygular','Psikoloji'],             color:'#fb7185', angle:240 },
  { id:9,  name:'🎭 Kültür',      cats:['Sanat','Kültür','Spor'],                     color:'#a78bfa', angle:270 },
  { id:10, name:'🗣️ Kalıplar',    cats:['Kalıplar'],                                  color:'#22d3ee', angle:300 },
  { id:11, name:'👥 Sosyal',      cats:['İnsan','Sosyal','Günlük Hayat','Alışveriş'], color:'#fbbf24', angle:330 },
];

const COSMOS_CEFR_RADIUS = {
  A1:[85,140], A2:[145,210], B1:[215,285], B2:[290,370], C1:[375,460], C2:[465,560]
};

const COSMOS_CEFR_COLORS = {
  A1:'#4ade80', A2:'#22d3ee', B1:'#a78bfa', B2:'#f59e0b', C1:'#f97316', C2:'#ef4444'
};

// ── FNV-1a Hash (kelime ID'den stabil pozisyon) ─────────────────
function _chash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// ── Yıldız Dünya Koordinatı Hesapla ─────────────────────────────
function _calcStarPos(word) {
  let secId = -1;
  for (const s of COSMOS_SECTORS) {
    if (s.cats.includes(word.cat)) { secId = s.id; break; }
  }
  if (secId < 0) secId = _chash(word.cat || '') % 12;

  const sector = COSMOS_SECTORS[secId];
  const [rMin, rMax] = COSMOS_CEFR_RADIUS[word.level] || [200, 300];
  const h1 = _chash(word.id);
  const h2 = _chash(word.id + '~pos');

  const sectorAngle  = (2 * Math.PI) / COSMOS_SECTORS.length;
  const baseAngle    = (sector.angle * Math.PI) / 180;
  const spread       = sectorAngle * 0.72;
  const angle        = baseAngle + spread * ((h1 % 10000) / 10000 - 0.5);
  const radius       = rMin + (rMax - rMin) * ((h2 % 10000) / 10000);

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    secId,
  };
}

// ════════════════════════════════════════════════════════════════
//  CosmosView — Ana Sınıf
// ════════════════════════════════════════════════════════════════
class CosmosView {
  constructor(appRef) {
    this.app        = appRef;
    this.canvas     = null;
    this.ctx        = null;
    this.stars      = [];
    this.bgStars    = [];
    this.particles  = [];
    this.camera     = { x:0, y:0, zoom:1 };
    this.target     = { x:0, y:0, zoom:1 };
    this.drag       = { on:false, moved:false, sx:0, sy:0, cx:0, cy:0 };
    this.pinch      = { on:false, dist:0 };
    this.hovered    = null;
    this.raf        = null;
    this.t          = 0;
    this.panelOpen  = false;
    this.learnStar  = null;
    this._resizeBound = null;
  }

  // ── Başlatma ─────────────────────────────────────────────────
  init(container) {
    this._buildDOM(container);
    this._buildStars();
    this._buildBgStars();
    this._bindEvents();
    this._renderHUD();
    this._startLoop();
  }

  _buildDOM(container) {
    container.innerHTML = `
      <div class="cosmos-wrap" id="cosmos-wrap">
        <canvas id="cosmos-canvas"></canvas>

        <div class="cosmos-hud" id="cosmos-hud">
          <div class="cosmos-hud-title">🌌 KELİME EVRENİ</div>
          <div class="cosmos-stats" id="cosmos-stats"></div>
          <div class="cosmos-legend" id="cosmos-legend"></div>
          <button class="cosmos-home-btn" onclick="app.navigate('home')">← Merkez</button>
        </div>

        <div class="cosmos-zoom-btns">
          <button class="cosmos-zoom-btn" id="czoom-in" title="Yakınlaştır">+</button>
          <button class="cosmos-zoom-btn" id="czoom-out" title="Uzaklaştır">−</button>
          <button class="cosmos-zoom-btn" id="czoom-reset" title="Merkezi Göster">◎</button>
        </div>

        <div class="cosmos-sector-label" id="cosmos-sector-label"></div>

        <div class="cosmos-tooltip" id="cosmos-tooltip" style="display:none"></div>

        <div class="cosmos-overlay" id="cosmos-overlay" style="display:none"></div>
      </div>`;

    this.canvas  = document.getElementById('cosmos-canvas');
    this.ctx     = this.canvas.getContext('2d');
    this.overlay = document.getElementById('cosmos-overlay');
    this.tooltip = document.getElementById('cosmos-tooltip');

    this._resizeBound = () => this._resizeCanvas();
    window.addEventListener('resize', this._resizeBound);
    this._resizeCanvas();
  }

  _resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  // ── Yıldız Verisi İnşa Et ────────────────────────────────────
  _buildStars() {
    const mastery = this.app.state.get('mastery') || {};
    this.stars = WORDS.map(word => {
      const pos      = _calcStarPos(word);
      const m        = mastery[word.id] || {};
      const score    = m.score || 0;
      const learned  = score >= 3;
      const tried    = score > 0 && !learned;
      const h        = _chash(word.id + 'anim');
      return {
        word, learned, tried, score,
        x: pos.x, y: pos.y, secId: pos.secId,
        cefrColor: COSMOS_CEFR_COLORS[word.level] || '#888',
        secColor:  COSMOS_SECTORS[pos.secId]?.color || '#888',
        tw:  (h % 628) / 100,                  // twinkle offset 0-2π
        spd: 0.6 + (h >> 8 & 0xff) / 512,      // pulse speed
        sz:  learned ? 3.5 + (_chash(word.id+'sz') % 10) / 5 : 2,
      };
    });
  }

  _buildBgStars() {
    this.bgStars = Array.from({ length: 700 }, () => ({
      x: (Math.random() - 0.5) * 2200,
      y: (Math.random() - 0.5) * 2200,
      s: 0.3 + Math.random() * 0.9,
      o: 0.08 + Math.random() * 0.22,
      tw: Math.random() * Math.PI * 2,
    }));
  }

  // ── HUD Güncelle ─────────────────────────────────────────────
  _renderHUD() {
    const tot     = this.stars.length;
    const learned = this.stars.filter(s => s.learned).length;
    const pct     = tot > 0 ? Math.round(learned / tot * 100) : 0;

    const stats = document.getElementById('cosmos-stats');
    if (stats) stats.innerHTML =
      `<div class="cs-stat"><span class="cs-val">${learned}</span><span class="cs-lbl">Yıldız</span></div>
       <div class="cs-stat"><span class="cs-val">${tot - learned}</span><span class="cs-lbl">Nebula</span></div>
       <div class="cs-stat"><span class="cs-val">${pct}%</span><span class="cs-lbl">Galaksi</span></div>`;

    const legend = document.getElementById('cosmos-legend');
    if (legend) legend.innerHTML = Object.entries(COSMOS_CEFR_COLORS)
      .map(([k,c]) => `<span class="cs-cefr" style="color:${c}">● ${k}</span>`).join('');
  }

  // ── Render Döngüsü ───────────────────────────────────────────
  _startLoop() {
    const loop = ts => {
      if (!this.canvas) return;
      this.t = ts / 1000;
      this._lerpCamera();
      this._tickParticles();
      this._draw();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  _lerpCamera() {
    const k = 0.12;
    this.camera.x    += (this.target.x    - this.camera.x)    * k;
    this.camera.y    += (this.target.y    - this.camera.y)    * k;
    this.camera.zoom += (this.target.zoom - this.camera.zoom) * k;
  }

  // ── Ana Çizim ────────────────────────────────────────────────
  _draw() {
    const { canvas, ctx } = this;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2 + this.camera.x;
    const cy = H / 2 + this.camera.y;
    const z  = this.camera.zoom;

    ctx.fillStyle = '#020610';
    ctx.fillRect(0, 0, W, H);

    this._drawNebulaClouds(cx, cy, z);
    this._drawBgStars(cx, cy, z);
    if (z > 0.35) this._drawSectorLabels(cx, cy, z);
    if (z > 0.3)  this._drawConstellations(cx, cy, z);
    this._drawAllStars(cx, cy, z);
    this._drawParticles(cx, cy, z);
    this._drawCore(cx, cy, z);
  }

  _drawNebulaClouds(cx, cy, z) {
    const { ctx, t } = this;
    for (const sec of COSMOS_SECTORS) {
      const ang = (sec.angle * Math.PI) / 180;
      const r   = 210 * z;
      const sx  = cx + Math.cos(ang) * r;
      const sy  = cy + Math.sin(ang) * r;
      const pulse = 1 + 0.08 * Math.sin(t * 0.3 + sec.id);
      const gr  = ctx.createRadialGradient(sx, sy, 0, sx, sy, 130 * z * pulse);
      gr.addColorStop(0, sec.color + '16');
      gr.addColorStop(1, sec.color + '00');
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.arc(sx, sy, 130 * z * pulse, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawBgStars(cx, cy, z) {
    const { ctx, t } = this;
    for (const s of this.bgStars) {
      const op = s.o * (0.6 + 0.4 * Math.sin(t * 0.4 + s.tw));
      ctx.fillStyle = `rgba(255,255,255,${op})`;
      ctx.beginPath();
      ctx.arc(cx + s.x * z * 0.45, cy + s.y * z * 0.45, s.s, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawSectorLabels(cx, cy, z) {
    const { ctx } = this;
    ctx.save();
    ctx.font = `${Math.max(8, 11 * z)}px Plus Jakarta Sans`;
    ctx.textAlign = 'center';
    for (const sec of COSMOS_SECTORS) {
      const ang = (sec.angle * Math.PI) / 180;
      const r   = 60 * z;
      ctx.fillStyle = sec.color + '99';
      ctx.fillText(sec.name.split(' ').slice(0, 1).join(''),
        cx + Math.cos(ang) * r,
        cy + Math.sin(ang) * r + 3);
    }
    ctx.restore();
  }

  _drawConstellations(cx, cy, z) {
    const { ctx } = this;
    const bySecId = {};
    for (const s of this.stars) {
      if (!s.learned) continue;
      (bySecId[s.secId] = bySecId[s.secId] || []).push(s);
    }
    ctx.save();
    ctx.setLineDash([2, 7]);
    for (const [id, arr] of Object.entries(bySecId)) {
      if (arr.length < 2) continue;
      const sec = COSMOS_SECTORS[+id];
      if (!sec) continue;
      const sorted = [...arr].sort((a, b) =>
        Math.hypot(a.x, a.y) - Math.hypot(b.x, b.y));
      ctx.strokeStyle = sec.color + '28';
      ctx.lineWidth   = 0.6 * z;
      for (let i = 0; i < sorted.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + sorted[i].x * z, cy + sorted[i].y * z);
        ctx.lineTo(cx + sorted[i+1].x * z, cy + sorted[i+1].y * z);
        ctx.stroke();
      }
    }
    ctx.setLineDash([]);
    ctx.restore();
  }

  _drawAllStars(cx, cy, z) {
    for (const s of this.stars) {
      if (!s.learned && !s.tried) this._drawNebula(s, cx, cy, z);
    }
    for (const s of this.stars) {
      if (s.tried && !s.learned) this._drawTried(s, cx, cy, z);
    }
    for (const s of this.stars) {
      if (s.learned) this._drawStar(s, cx, cy, z);
    }
  }

  _drawNebula(star, cx, cy, z) {
    const { ctx, t } = this;
    const sx  = cx + star.x * z;
    const sy  = cy + star.y * z;
    const p   = Math.sin(t * star.spd + star.tw);
    const sz  = (1.8 + p * 0.4) * z;
    const gr  = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 4);
    gr.addColorStop(0, star.cefrColor + '35');
    gr.addColorStop(1, star.cefrColor + '00');
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.arc(sx, sy, sz * 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = star.cefrColor + '50';
    ctx.beginPath();
    ctx.arc(sx, sy, sz, 0, Math.PI * 2);
    ctx.fill();
    if (this.hovered === star) {
      ctx.strokeStyle = star.cefrColor + 'cc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(sx, sy, sz * 5.5, 0, Math.PI * 2);
      ctx.stroke();
      // Yıldız ismi
      ctx.save();
      ctx.font = `${Math.max(9, 11 * z)}px Plus Jakarta Sans`;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffffbb';
      ctx.fillText(star.word.en, sx, sy - sz * 5 - 4);
      ctx.restore();
    }
  }

  _drawTried(star, cx, cy, z) {
    const { ctx, t } = this;
    const sx = cx + star.x * z;
    const sy = cy + star.y * z;
    const p  = Math.sin(t * 1.4 + star.tw);
    const sz = (2.2 + p * 0.5) * z;
    const gr = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 5);
    gr.addColorStop(0, star.cefrColor + '70');
    gr.addColorStop(1, star.cefrColor + '00');
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.arc(sx, sy, sz * 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = star.cefrColor + 'aa';
    ctx.beginPath();
    ctx.arc(sx, sy, sz, 0, Math.PI * 2);
    ctx.fill();
    if (this.hovered === star) {
      ctx.strokeStyle = star.cefrColor + 'cc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(sx, sy, sz * 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.save();
      ctx.font = `${Math.max(9, 11 * z)}px Plus Jakarta Sans`;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffffbb';
      ctx.fillText(star.word.en, sx, sy - sz * 6 - 4);
      ctx.restore();
    }
  }

  _drawStar(star, cx, cy, z) {
    const { ctx, t } = this;
    const sx  = cx + star.x * z;
    const sy  = cy + star.y * z;
    const tw  = 0.72 + 0.28 * Math.sin(t * star.spd * 1.8 + star.tw);
    const sz  = star.sz * z * tw;

    // Dış parıltı
    const gr = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 5);
    gr.addColorStop(0,   star.cefrColor + 'bb');
    gr.addColorStop(0.3, star.cefrColor + '44');
    gr.addColorStop(1,   star.cefrColor + '00');
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.arc(sx, sy, sz * 5, 0, Math.PI * 2);
    ctx.fill();

    // Yıldız gövdesi
    ctx.fillStyle = star.cefrColor;
    ctx.beginPath();
    ctx.arc(sx, sy, sz, 0, Math.PI * 2);
    ctx.fill();

    // Beyaz sıcak merkez
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.beginPath();
    ctx.arc(sx, sy, sz * 0.45, 0, Math.PI * 2);
    ctx.fill();

    // Hover: isim etiketi
    if (this.hovered === star) {
      ctx.save();
      ctx.font = `bold ${Math.max(9, 12 * z)}px Plus Jakarta Sans`;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(star.word.en, sx, sy - sz * 5.5 - 4);
      ctx.restore();
    }
  }

  _drawCore(cx, cy, z) {
    const { ctx, t } = this;
    const p  = 0.82 + 0.18 * Math.sin(t * 0.65);
    const r  = 18 * z * p;
    const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 3.5);
    gr.addColorStop(0,   '#ffffff');
    gr.addColorStop(0.15,'#a78bfa');
    gr.addColorStop(0.5, '#7c3aed55');
    gr.addColorStop(1,   '#7c3aed00');
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.font = `bold ${Math.max(5, 7 * z)}px Plus Jakarta Sans`;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('ER', cx, cy + 2.5 * z);
    ctx.restore();
  }

  // ── Parçacıklar ──────────────────────────────────────────────
  _spawnParticles(wx, wy, color, n = 22) {
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 25 + Math.random() * 90;
      this.particles.push({
        x: wx, y: wy,
        vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
        life: 1, decay: 0.018 + Math.random() * 0.028,
        sz: 1 + Math.random() * 2.5, color,
      });
    }
  }

  _tickParticles() {
    const dt = 0.016;
    this.particles = this.particles.filter(p => p.life > 0);
    for (const p of this.particles) {
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vx *= 0.94; p.vy *= 0.94;
      p.life -= p.decay;
    }
  }

  _drawParticles(cx, cy, z) {
    const { ctx } = this;
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(cx + p.x * z, cy + p.y * z, p.sz * z * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ── Olaylar ──────────────────────────────────────────────────
  _bindEvents() {
    const c = this.canvas;

    c.addEventListener('mousedown',  e => this._dragStart(e.clientX, e.clientY));
    c.addEventListener('mousemove',  e => this._dragMove(e.clientX, e.clientY));
    c.addEventListener('mouseup',    e => this._dragEnd(e.clientX, e.clientY, true));
    c.addEventListener('mouseleave', () => this._dragEnd(0, 0, false));
    c.addEventListener('wheel', e => {
      e.preventDefault();
      this._zoom(e.deltaY > 0 ? 0.88 : 1.13, e.clientX, e.clientY);
    }, { passive: false });
    c.addEventListener('click', e => this._click(e.clientX, e.clientY));

    c.addEventListener('touchstart', e => {
      e.preventDefault();
      if (e.touches.length === 1) {
        this._dragStart(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2) {
        this.pinch = { on: true, dist: this._pinchDist(e.touches) };
        this.drag.on = false;
      }
    }, { passive: false });

    c.addEventListener('touchmove', e => {
      e.preventDefault();
      if (e.touches.length === 1 && !this.pinch.on) {
        this._dragMove(e.touches[0].clientX, e.touches[0].clientY);
      } else if (e.touches.length === 2 && this.pinch.on) {
        const d = this._pinchDist(e.touches);
        this._zoom(d / this.pinch.dist,
          (e.touches[0].clientX + e.touches[1].clientX) / 2,
          (e.touches[0].clientY + e.touches[1].clientY) / 2);
        this.pinch.dist = d;
      }
    }, { passive: false });

    c.addEventListener('touchend', e => {
      if (e.touches.length === 0) {
        const moved = this.drag.moved;
        this._dragEnd(0, 0, false);
        if (!moved && e.changedTouches.length > 0)
          this._click(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        this.pinch.on = false;
      } else {
        this.pinch.on = false;
      }
    }, { passive: false });

    document.getElementById('czoom-in').addEventListener('click', () =>
      this._zoom(1.3, this.canvas.offsetWidth/2, this.canvas.offsetHeight/2));
    document.getElementById('czoom-out').addEventListener('click', () =>
      this._zoom(0.77, this.canvas.offsetWidth/2, this.canvas.offsetHeight/2));
    document.getElementById('czoom-reset').addEventListener('click', () => {
      this.target = { x:0, y:0, zoom:1 };
    });
  }

  _pinchDist(t) {
    return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  }

  _dragStart(sx, sy) {
    this.drag = { on:true, moved:false, sx, sy, cx:this.target.x, cy:this.target.y };
    this.canvas.style.cursor = 'grabbing';
  }

  _dragMove(sx, sy) {
    if (this.drag.on) {
      const dx = sx - this.drag.sx, dy = sy - this.drag.sy;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) this.drag.moved = true;
      this.target.x = this.drag.cx + dx;
      this.target.y = this.drag.cy + dy;
    }
    const wp = this._s2w(sx, sy);
    this.hovered = this._nearest(wp.x, wp.y, 38 / this.camera.zoom);
    this.canvas.style.cursor = this.hovered ? 'pointer' : (this.drag.on ? 'grabbing' : 'grab');

    if (this.hovered && !this.panelOpen) {
      this._showTip(this.hovered, sx, sy);
    } else {
      this.tooltip.style.display = 'none';
    }

    const lbl = document.getElementById('cosmos-sector-label');
    if (lbl) {
      if (this.hovered) {
        const sec = COSMOS_SECTORS[this.hovered.secId];
        lbl.textContent = sec ? sec.name : '';
        lbl.style.display = 'block';
      } else {
        lbl.style.display = 'none';
      }
    }
  }

  _dragEnd(sx, sy, hasPos) {
    const m = this.drag.moved;
    this.drag.on = false; this.drag.moved = false;
    this.canvas.style.cursor = this.hovered ? 'pointer' : 'grab';
    return m;
  }

  _zoom(factor, sx, sy) {
    const nz = Math.max(0.22, Math.min(4.5, this.target.zoom * factor));
    const rect = this.canvas.getBoundingClientRect();
    const mx = sx - rect.left - this.canvas.width / 2;
    const my = sy - rect.top  - this.canvas.height / 2;
    const sc = nz / this.target.zoom;
    this.target.x = mx + (this.target.x - mx) * sc;
    this.target.y = my + (this.target.y - my) * sc;
    this.target.zoom = nz;
  }

  _click(sx, sy) {
    if (this.drag.moved || this.panelOpen) return;
    const wp   = this._s2w(sx, sy);
    const star = this._nearest(wp.x, wp.y, 42 / this.camera.zoom);
    if (star) this._openWord(star);
  }

  _s2w(sx, sy) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (sx - rect.left - this.canvas.width  / 2 - this.camera.x) / this.camera.zoom,
      y: (sy - rect.top  - this.canvas.height / 2 - this.camera.y) / this.camera.zoom,
    };
  }

  _nearest(wx, wy, r) {
    let best = null, bd = r;
    for (const s of this.stars) {
      const d = Math.hypot(s.x - wx, s.y - wy);
      if (d < bd) { bd = d; best = s; }
    }
    return best;
  }

  // ── Tooltip ──────────────────────────────────────────────────
  _showTip(star, sx, sy) {
    const w   = star.word;
    const st  = star.learned ? '⭐ Öğrenildi' : star.tried ? '🔄 Denendi' : '🌫️ Nebula — Tıkla & Keşfet!';
    this.tooltip.innerHTML =
      `<div class="ctt-icon">${w.icon||'📝'}</div>
       <div class="ctt-word">${w.en}</div>
       <div class="ctt-tr">${w.tr}</div>
       <div class="ctt-meta">${w.level} · ${w.cat}</div>
       <div class="ctt-status">${st}</div>`;
    const rect = this.canvas.getBoundingClientRect();
    this.tooltip.style.display = 'block';
    this.tooltip.style.left    = (sx - rect.left + 14) + 'px';
    this.tooltip.style.top     = (sy - rect.top  - 75) + 'px';
  }

  // ── Kelime Paneli ─────────────────────────────────────────────
  _openWord(star) {
    this.tooltip.style.display = 'none';
    this.panelOpen = true;
    this.learnStar = star;

    // Kamerayı yıldıza uçur
    this.target.x    = -star.x * this.target.zoom;
    this.target.y    = -star.y * this.target.zoom;
    if (this.target.zoom < 1.3) this.target.zoom = 1.6;

    this._spawnParticles(star.x, star.y, star.cefrColor, star.learned ? 14 : 32);

    if (star.learned) this._showReview(star);
    else              this._showDiscover(star);
  }

  _closePanel() {
    this.panelOpen = false;
    this.learnStar = null;
    this.overlay.style.display = 'none';
    this.overlay.innerHTML     = '';
  }

  // ── İnceleme Paneli (öğrenilmiş kelime) ──────────────────────
  _showReview(star) {
    const w   = star.word;
    const sec = COSMOS_SECTORS[star.secId] || { name: w.cat, color: '#888' };
    this.overlay.innerHTML = `
      <div class="cp" style="--sc:${star.cefrColor}">
        <button class="cp-x" onclick="window.cosmosView._closePanel()">×</button>
        <div class="cp-glow" style="background:radial-gradient(circle,${star.cefrColor}44,transparent)"></div>
        <div class="cp-icon">${w.icon||'⭐'}</div>
        <div class="cp-en">${w.en}</div>
        <div class="cp-ipa">
          ${w.ipa||''}
          <button class="cp-listen" onclick="app.speakWord('${w.en}')">🔊</button>
        </div>
        <div class="cp-tr">${w.tr}</div>
        <span class="cp-badge" style="background:${star.cefrColor}22;color:${star.cefrColor}">${w.level} · ${w.cat}</span>
        <div class="cp-ex">"${w.ex||''}"</div>
        ${w.note ? `<div class="cp-note">💡 ${w.note}</div>` : ''}
        ${w.syns?.length ? `<div class="cp-syns">Eşanlamlılar: <em>${w.syns.join(', ')}</em></div>` : ''}
        <div class="cp-sec" style="color:${sec.color}">${sec.name}</div>
        <div class="cp-acts">
          <button class="cp-btn cp-btn-ghost" onclick="app.speakWord('${w.en}')">🔊 Dinle</button>
          <button class="cp-btn cp-btn-violet" onclick="window.cosmosView._doQuiz(window.cosmosView.learnStar,true)">🎯 Test</button>
          <button class="cp-btn cp-btn-ghost" onclick="window.cosmosView._closePanel()">← Galaksi</button>
        </div>
      </div>`;
    this.overlay.style.display = 'flex';
  }

  // ── Keşif Paneli (yeni kelime) ───────────────────────────────
  _showDiscover(star) {
    const w   = star.word;
    const sec = COSMOS_SECTORS[star.secId] || { name: w.cat, color: '#888' };
    this.overlay.innerHTML = `
      <div class="cp cp-discover" style="--sc:${star.cefrColor}">
        <button class="cp-x" onclick="window.cosmosView._closePanel()">×</button>

        <div class="cp-disco-hdr">
          <span class="cp-disco-tag">🔭 YENİ KEŞİF</span>
          <span class="cp-sec-tag" style="color:${sec.color}">${sec.name}</span>
        </div>

        <div class="cp-burst">
          <div class="cp-ring" style="border-color:${star.cefrColor}55"></div>
          <div class="cp-ring cp-ring2" style="border-color:${star.cefrColor}28"></div>
          <div class="cp-icon-xl">${w.icon||'🌟'}</div>
        </div>

        <div class="cp-en cp-en-xl">${w.en}</div>
        <div class="cp-ipa">
          ${w.ipa||''}
          <button class="cp-listen" onclick="app.speakWord('${w.en}')">🔊</button>
        </div>
        <div class="cp-tr cp-tr-xl">${w.tr}</div>
        <span class="cp-badge" style="background:${star.cefrColor}22;color:${star.cefrColor}">${w.level} · ${w.cat}</span>

        <div class="cp-excard">
          <div class="cp-exlabel">Örnek Cümle</div>
          <div class="cp-ex">"${w.ex||''}"</div>
        </div>
        ${w.note ? `<div class="cp-note">💡 ${w.note}</div>` : ''}

        <div class="cp-absorb">
          <div class="cp-absorb-bar"><div class="cp-absorb-fill" id="cp-fill"></div></div>
          <div class="cp-absorb-txt" id="cp-atxt">Kelimeyi sindiriyorsun...</div>
        </div>

        <div class="cp-quiz-area" id="cp-quiz" style="display:none"></div>

        <div class="cp-acts" id="cp-acts">
          <button class="cp-btn cp-btn-primary" onclick="window.cosmosView._doQuiz(window.cosmosView.learnStar,false)">
            🌟 Kristalize Et — Yıldızını Kazan!
          </button>
        </div>
      </div>`;
    this.overlay.style.display = 'flex';
    this._runAbsorb();
  }

  _runAbsorb() {
    const fill = document.getElementById('cp-fill');
    const txt  = document.getElementById('cp-atxt');
    if (!fill) return;
    const msgs = [
      'Kelimeyi sindiriyorsun...',
      'Sinir bağlantıları kuruluyor...',
      'Hafıza izleri oluşuyor...',
      'Neredeyse hazır...',
      '✨ Hazırsın!',
    ];
    let pct = 0;
    const iv = setInterval(() => {
      pct += 1.8;
      fill.style.width = Math.min(100, pct) + '%';
      if (txt) txt.textContent = msgs[Math.min(4, Math.floor(pct / 22))];
      if (pct >= 100) clearInterval(iv);
    }, 55);
  }

  // ── Quiz ─────────────────────────────────────────────────────
  _doQuiz(star, isReview) {
    const qArea = document.getElementById('cp-quiz');
    const acts  = document.getElementById('cp-acts');
    if (!qArea) return;

    const w = star.word;
    // Yanlış seçenek aday havuzu: aynı sektörden önce, sonra rastgele
    const pool = this.stars
      .filter(s => s.word.id !== w.id)
      .sort((a, b) => {
        const sameA = a.secId === star.secId ? 0 : 1;
        const sameB = b.secId === star.secId ? 0 : 1;
        return sameA - sameB + (Math.random() - 0.5) * 0.6;
      });

    const wrongs = [];
    for (const s of pool) {
      if (wrongs.length >= 3) break;
      if (!wrongs.includes(s.word.tr)) wrongs.push(s.word.tr);
    }
    const choices = [w.tr, ...wrongs].sort(() => Math.random() - 0.5);

    qArea.style.display = 'block';
    if (acts) acts.style.display = 'none';

    const cid = `_cid_${Date.now()}`;
    qArea.innerHTML = `
      <div class="cp-q">🤔 <strong>"${w.en}"</strong> kelimesinin anlamı nedir?</div>
      <div class="cp-choices" id="${cid}">
        ${choices.map(c =>
          `<button class="cp-choice" onclick="window.cosmosView._checkAns(this,'${w.tr.replace(/'/g,"\\'")}','${w.id}',${isReview})">${c}</button>`
        ).join('')}
      </div>`;
  }

  _checkAns(btn, correct, wid, isReview) {
    const ok  = btn.textContent.trim() === correct;
    btn.parentElement.querySelectorAll('.cp-choice').forEach(b => {
      b.disabled = true;
      if (b.textContent.trim() === correct) b.classList.add('cp-ok');
    });
    if (ok)  { btn.classList.add('cp-ok');  this._onCorrect(wid); }
    else     { btn.classList.add('cp-err'); this._onWrong(wid, isReview); }
  }

  _onCorrect(wid) {
    const star = this.stars.find(s => s.word.id === wid);
    if (!star) return;

    // Mastery güncelle
    const mastery = this.app.state.get('mastery');
    const m       = mastery[wid] || {};
    mastery[wid]  = { ...m, score:(m.score||0)+2, interval:1, ease:2.5,
                      nextReview: Date.now() + 86400000 };
    this.app.state.set('mastery', mastery);
    this.app.addXP(25);

    star.learned = true;
    star.tried   = true;
    star.score   = mastery[wid].score;

    // Patlama!
    this._spawnParticles(star.x, star.y, star.cefrColor, 55);
    this._spawnParticles(star.x, star.y, '#ffffff', 18);
    this.app.audio.play('success');

    const q = document.getElementById('cp-quiz');
    if (q) q.insertAdjacentHTML('beforeend', `
      <div class="cp-win">
        <div class="cp-win-icon">🌟</div>
        <div class="cp-win-title">YENİ YILDIZ DOĞDU!</div>
        <div class="cp-win-sub">+25 XP · Galaksine eklendi!</div>
        <button class="cp-btn cp-btn-primary" style="margin-top:14px"
          onclick="window.cosmosView._closeAndRefresh()">🌌 Galaksiye Dön</button>
      </div>`);

    this._renderHUD();
  }

  _onWrong(wid, isReview) {
    const star = this.stars.find(s => s.word.id === wid);
    if (star) star.tried = true;

    const mastery   = this.app.state.get('mastery');
    mastery[wid]    = { ...(mastery[wid]||{}), score: Math.max(mastery[wid]?.score||0, 1) };
    this.app.state.set('mastery', mastery);

    const q = document.getElementById('cp-quiz');
    if (q) q.insertAdjacentHTML('beforeend', `
      <div class="cp-retry">
        <p>Tekrar dene! Her hata öğrenmeyi derinleştirir.</p>
        <button class="cp-btn cp-btn-ghost" onclick="window.cosmosView._doQuiz(window.cosmosView.learnStar,${isReview})">🔄 Tekrar</button>
        <button class="cp-btn cp-btn-ghost" style="margin-left:6px"
          onclick="window.cosmosView._closePanel()">Geç</button>
      </div>`);
  }

  _closeAndRefresh() {
    this._closePanel();
    this._renderHUD();
  }

  // ── Temizleme ────────────────────────────────────────────────
  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
    if (this._resizeBound) window.removeEventListener('resize', this._resizeBound);
    this.canvas = null;
    this.ctx    = null;
    window.cosmosView = null;
  }
}
