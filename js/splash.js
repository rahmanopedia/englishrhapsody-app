window._splashStart = Date.now();
(function(){
  var lines = [
    { t:'> system_boot --target=linguistics --arch=neural', cls:'sp-cmd' },
    { t:'[OK] core_kernel: initialized',               cls:'sp-ok'  },
    { t:'> load_module: synesthesia_lab.bin',          cls:'sp-cmd' },
    { t:'[OK] spectral_colors_mapped',                 cls:'sp-ok'  },
    { t:'> init_xp_engine --daily_goal=100',           cls:'sp-cmd' },
    { t:'[OK] streak_counter: active',                 cls:'sp-ok'  },
    { t:'> calibrate_cefr [A1..C2]',                   cls:'sp-cmd' },
    { t:'[DONE] 976 vocabulary vectors loaded.',       cls:'sp-info'},
    { t:'> status()',                                  cls:'sp-cmd' },
    { t:'All systems nominal. Environment ready.',     cls:'sp-info'},
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
    if(body) body.appendChild(el);
    
    var j = 0;
    var speed = line.cls === 'sp-ok' ? 12 : 20;
    
    var iv = setInterval(function(){
      el.textContent = line.t.slice(0, ++j);
      if(body) body.scrollTop = body.scrollHeight;
      
      if(j >= line.t.length){
        clearInterval(iv);
        currentLine++;
        
        // Progress update
        var p = Math.round((currentLine / lines.length) * 100);
        if(fill) fill.style.width = p + '%';
        if(pct)  pct.textContent  = p + '%';
        
        if (currentLine === lines.length) {
          var cur = document.createElement('span');
          cur.className = 'sp-cursor';
          cur.textContent = '▮';
          if(body) body.appendChild(cur);
        } else {
          // Next line after random delay
          setTimeout(processNext, 150 + Math.random() * 300);
        }
      }
    }, speed);
  }

  // Start the sequence
  setTimeout(processNext, 600);
})();
