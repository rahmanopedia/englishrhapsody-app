window._splashStart = Date.now();
(function(){
  var lines = [
    { t:'> ldc archieve/scripts/load_curriculum', cls:'sp-cmd' },
    { t:'[OK]',                                   cls:'sp-ok'  },
    { t:'> init_ling_proc [mode: advanced]',       cls:'sp-cmd' },
    { t:'[OK] 42 models ready',                    cls:'sp-ok'  },
    { t:'> start English_Rhapsody_Env',            cls:'sp-cmd' },
    { t:'Environment initialized in 112ms.',       cls:'sp-info'},
    { t:'> status()',                              cls:'sp-cmd' },
    { t:'All systems nominal. Pre-load complete.', cls:'sp-info'},
  ];
  var delays = [0, 480, 700, 1180, 1420, 1880, 2180, 2700];
  var body = document.getElementById('sp-term-body');
  var fill = document.getElementById('sp-bar-fill');
  var pct  = document.getElementById('sp-pct');

  lines.forEach(function(line, i){
    setTimeout(function(){
      if(!body) return;
      var el = document.createElement('div');
      el.className = 'sp-term-line ' + line.cls;
      body.appendChild(el);
      var j = 0, speed = line.cls==='sp-ok'?18:24;
      var iv = setInterval(function(){
        el.textContent = line.t.slice(0, ++j);
        body.scrollTop = 9999;
        if(j >= line.t.length){
          clearInterval(iv);
          if(i === lines.length-1){
            var cur = document.createElement('span');
            cur.className = 'sp-cursor';
            cur.textContent = '▮';
            body.appendChild(cur);
          }
        }
      }, speed);
      var p = Math.round(((i+1)/lines.length)*88);
      if(fill) fill.style.width = p+'%';
      if(pct)  pct.textContent  = p+'%';
    }, delays[i]);
  });
})();
