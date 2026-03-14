window._splashStart = Date.now();
window._splashAnimDone = new Promise(function(resolve){ window._splashAnimResolve = resolve; });

/* ── Matrix rain ─────────────────────────────────────────── */
(function spMatrix(){
  var canvas = document.getElementById('sp-matrix');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var FS    = 14;
  var CHARS = 'ENGLISHRAPSODYenglishrapsody0123456789' +
              '♪♫♩♬♭♯@#$%*<>[]{}' +
              'アイウエオカキクケコサシスセナニヌネハヒフヘホ';

  var W, H, numCols, drops, speeds, hues;

  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    numCols = Math.ceil(W / FS) + 1;
    drops  = new Array(numCols);
    speeds = new Array(numCols);
    hues   = new Array(numCols);
    for (var i = 0; i < numCols; i++) {
      drops[i]  = -Math.floor(Math.random() * (H / FS));
      speeds[i] =  0.25 + Math.random() * 0.65;
      hues[i]   = Math.random() < 0.65 ? 0 : 1; /* 0=cyan 1=purple */
    }
    ctx.fillStyle = '#07131e';
    ctx.fillRect(0, 0, W, H);
  }

  init();
  window.addEventListener('resize', init);

  function draw() {
    /* Semi-transparent overlay creates natural trail fade */
    ctx.fillStyle = 'rgba(7,19,30,0.085)';
    ctx.fillRect(0, 0, W, H);

    ctx.font = FS + 'px "Courier New",monospace';
    ctx.textBaseline = 'top';

    for (var i = 0; i < numCols; i++) {
      if (drops[i] < 0) { drops[i] += speeds[i]; continue; }

      var x = i * FS;
      var y = Math.floor(drops[i]) * FS;

      if (y <= H) {
        var ch = CHARS[Math.floor(Math.random() * CHARS.length)];

        /* Head: bright near-white with color glow */
        ctx.shadowColor = hues[i] === 0 ? '#00d4ff' : '#a78bfa';
        ctx.shadowBlur  = 16;
        ctx.fillStyle   = '#e8ffff';
        ctx.fillText(ch, x, y);

        /* Second char: strong color */
        if (y + FS <= H) {
          ctx.shadowBlur = 7;
          ctx.fillStyle  = hues[i] === 0 ? '#00d4ff' : '#c084fc';
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y + FS);
        }

        ctx.shadowBlur = 0;
      }

      drops[i] += speeds[i];

      if (drops[i] * FS > H + FS * 4 && Math.random() > 0.972) {
        drops[i] = -Math.floor(Math.random() * 22);
        hues[i]  = Math.random() < 0.65 ? 0 : 1;
        speeds[i] = 0.25 + Math.random() * 0.65;
      }
    }
  }

  var raf, last = 0, TICK = 1000 / 30;
  function loop(ts) {
    raf = requestAnimationFrame(loop);
    if (ts - last < TICK) return;
    last = ts;
    draw();
  }
  raf = requestAnimationFrame(loop);

  /* Cleanup when splash element is removed from DOM */
  var obs = new MutationObserver(function(){
    if (!document.getElementById('sp-matrix')) {
      cancelAnimationFrame(raf);
      obs.disconnect();
    }
  });
  obs.observe(document.body, { childList: true });
})();

/* ── Terminal animation ──────────────────────────────────── */
(function spTerminal(){
  var lines = [
    { t:'> system_boot --target=linguistics --arch=neural', cls:'sp-cmd' },
    { t:'[OK] core_kernel: initialized',                   cls:'sp-ok'  },
    { t:'> load_module: synesthesia_lab.bin',              cls:'sp-cmd' },
    { t:'[OK] spectral_colors_mapped',                     cls:'sp-ok'  },
    { t:'> init_xp_engine --daily_goal=100',               cls:'sp-cmd' },
    { t:'[OK] streak_counter: active',                     cls:'sp-ok'  },
    { t:'> calibrate_cefr [A1..C2]',                       cls:'sp-cmd' },
    { t:'[DONE] 976 vocabulary vectors loaded.',           cls:'sp-info'},
    { t:'> status()',                                      cls:'sp-cmd' },
    { t:'All systems nominal. Environment ready.',         cls:'sp-info'},
  ];

  var body = document.getElementById('sp-term-body');
  var fill = document.getElementById('sp-bar-fill');
  var pct  = document.getElementById('sp-pct');

  var currentLine = 0;

  function processNext() {
    if (currentLine >= lines.length) return;

    var line = lines[currentLine];
    var el = document.createElement('div');
    el.className = 'sp-term-line ' + line.cls;
    if (body) body.appendChild(el);

    var j = 0;
    var speed = line.cls === 'sp-ok' ? 12 : 20;

    var iv = setInterval(function(){
      el.textContent = line.t.slice(0, ++j);
      if (body) body.scrollTop = body.scrollHeight;

      if (j >= line.t.length) {
        clearInterval(iv);
        currentLine++;

        var p = Math.round((currentLine / lines.length) * 100);
        if (fill) fill.style.width = p + '%';
        if (pct)  pct.textContent  = p + '%';

        if (currentLine === lines.length) {
          var cur = document.createElement('span');
          cur.className   = 'sp-cursor';
          cur.textContent = '▮';
          if (body) body.appendChild(cur);
          if (window._splashAnimResolve) window._splashAnimResolve();
        } else {
          setTimeout(processNext, 150 + Math.random() * 300);
        }
      }
    }, speed);
  }

  setTimeout(processNext, 600);
})();
