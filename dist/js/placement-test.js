class PlacementTest{constructor(){this._LEVELS=["A1","A2","B1","B2","C1","C2"],this._COLORS={A1:"#10b981",A2:"#06b6d4",B1:"#3b82f6",B2:"#8b5cf6",C1:"#f59e0b",C2:"#ef4444"},this._LABELS={A1:"Ba\u015Flang\u0131\xE7",A2:"Temel",B1:"Orta Alt\u0131",B2:"Orta \xDCst\xFC",C1:"\u0130leri",C2:"Ustala\u015Fm\u0131\u015F"},this._DESCS={A1:"Temel kelimeler ve g\xFCnl\xFCk ifadelerle ba\u015Fl\u0131yorsun.",A2:"Basit konular ve yayg\u0131n c\xFCmlelerle \xE7al\u0131\u015F\u0131yorsun.",B1:"G\xFCnl\xFCk ileti\u015Fimde rahat edebiliyorsun.",B2:"Karma\u015F\u0131k konular ve soyut fikirlerle ba\u015Fa \xE7\u0131kabiliyorsun.",C1:"Ak\u0131c\u0131 ve spontane ileti\u015Fim kurabiliyorsun.",C2:"Neredeyse anadil d\xFCzeyinde \u0130ngilizce biliyorsun."},this._byLevel={},this._container=null,this._onComplete=null,this._levelIdx=1,this._stageWords=[],this._questionIdx=0,this._stageCorrect=0,this._totalAsked=0,this._PER_STAGE=3}show(t,e){this._container=t,this._onComplete=e,this._buildIndex(),this._renderWelcome()}_buildIndex(){if(typeof WORDS!="undefined"){for(const t of this._LEVELS)this._byLevel[t]=[];for(const t of WORDS)t.level&&t.tr&&t.en&&this._byLevel[t.level]&&this._byLevel[t.level].push(t)}}_renderWelcome(){this._html(`
      <div class="pt-card">
        <div class="pt-emoji">\u{1F3AF}</div>
        <h2 class="pt-title">Seviyeni Belirleyelim</h2>
        <p class="pt-desc">
          Sana en uygun i\xE7erikleri sunmak i\xE7in k\u0131sa bir kelime testi yapaca\u011F\u0131z.<br>
          <strong>~2 dakika</strong> s\xFCrer, uygulamam\u0131zdaki ger\xE7ek kelimelerden olu\u015Fur.
        </p>
        <button class="pt-btn pt-btn-primary" id="pt-start">Teste Ba\u015Fla</button>
        <div class="pt-skip-label">Test yapmadan devam et:</div>
        <div class="pt-skip-row">
          <button class="pt-btn pt-btn-level" id="pt-skip-a1">
            <span class="pt-skip-badge" style="background:#10b98120;color:#10b981;border-color:#10b98140">A1</span>
            Yeni Ba\u015Flayan
          </button>
          <button class="pt-btn pt-btn-level" id="pt-skip-b1">
            <span class="pt-skip-badge" style="background:#3b82f620;color:#3b82f6;border-color:#3b82f640">B1</span>
            Orta Seviye
          </button>
        </div>
      </div>
    `),this._on("pt-start",()=>this._beginTest()),this._on("pt-skip-a1",()=>this._finish("A1",!0)),this._on("pt-skip-b1",()=>this._finish("B1",!0))}_beginTest(){this._levelIdx=1,this._totalAsked=0,this._startStage()}_startStage(t=0){if(t>=this._LEVELS.length){this._finish("A1");return}const e=this._LEVELS[this._levelIdx],s=[...this._byLevel[e]||[]].sort(()=>Math.random()-.5);if(s.length<this._PER_STAGE){this._levelIdx<this._LEVELS.length-1?(this._levelIdx++,this._startStage(t+1)):this._finish("C2");return}this._stageWords=s.slice(0,this._PER_STAGE),this._stageCorrect=0,this._questionIdx=0,this._showLevelTransition(e,()=>this._askQuestion())}_showLevelTransition(t,e){const s=this._COLORS[t];this._html(`
      <div class="pt-card pt-card-transition">
        <div class="pt-level-pill" style="color:${s};border-color:${s}40;background:${s}12">
          ${t}
        </div>
        <p class="pt-transition-label">${this._LABELS[t]} seviye sorular\u0131 geliyor\u2026</p>
      </div>
    `),setTimeout(e,900)}_askQuestion(){const t=this._stageWords[this._questionIdx];if(!t){this._evaluateStage();return}const e=this._LEVELS[this._levelIdx],s=this._COLORS[e];let a=[...this._byLevel[e].filter(i=>i.en!==t.en)].sort(()=>Math.random()-.5).slice(0,3);if(a.length<3&&typeof WORDS!="undefined"){const i=new Set([t.en,...a.map(o=>o.en)]),r=WORDS.filter(o=>o.tr&&o.en&&!i.has(o.en)).sort(()=>Math.random()-.5).slice(0,3-a.length);a=[...a,...r]}const l=[...a.map(i=>i.tr),t.tr].sort(()=>Math.random()-.5),d=this._LEVELS.length*this._PER_STAGE,c=this._totalAsked+this._questionIdx+1,h=Math.min(Math.round(c/d*100),100);this._html(`
      <div class="pt-card">
        <div class="pt-progress-bar">
          <div class="pt-progress-fill" style="width:${h}%;background:${s}"></div>
        </div>
        <div class="pt-q-meta">
          <span class="pt-q-level" style="color:${s}">${e}</span>
          <span class="pt-q-num">${c}. soru</span>
        </div>
        <div class="pt-word-block">
          <div class="pt-word-en">${t.en}</div>
          ${t.ipa?`<div class="pt-word-ipa">${t.ipa}</div>`:""}
          <div class="pt-word-cat">${t.cat||""} ${t.icon||""}</div>
        </div>
        <p class="pt-q-label">Bu kelimenin T\xFCrk\xE7e anlam\u0131 hangisi?</p>
        <div class="pt-options">
          ${l.map((i,r)=>`
            <button class="pt-opt" data-tr="${this._esc(i)}" data-correct="${i===t.tr?"1":"0"}">
              <span class="pt-opt-letter">${"ABCD"[r]}</span>
              <span class="pt-opt-text">${i}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `),this._container.querySelectorAll(".pt-opt").forEach(i=>{i.addEventListener("click",()=>this._handleAnswer(i,t))})}_handleAnswer(t,e){var a;const s=t.dataset.correct==="1";this._container.querySelectorAll(".pt-opt").forEach(l=>{l.disabled=!0,l.dataset.correct==="1"?l.classList.add("pt-opt-correct"):l===t&&!s&&l.classList.add("pt-opt-wrong")});const n=document.createElement("div");n.className="pt-example",n.innerHTML=`<em>${e.ex||""}</em>`,(a=this._container.querySelector(".pt-options"))==null||a.after(n),s&&this._stageCorrect++,this._questionIdx++,setTimeout(()=>{this._questionIdx>=this._PER_STAGE?(this._totalAsked+=this._PER_STAGE,this._evaluateStage()):this._askQuestion()},1e3)}_evaluateStage(){const t=this._stageCorrect>=2;this._advanceStage(t)}_advanceStage(t){t?this._levelIdx>=this._LEVELS.length-1?this._finish("C2"):(this._levelIdx++,this._startStage()):this._levelIdx===0?this._finish("A1"):this._finish(this._LEVELS[this._levelIdx-1])}_finish(t,e=!1){const s=this._COLORS[t],n=this._LABELS[t],a=this._DESCS[t];this._html(`
      <div class="pt-card pt-card-result">
        <div class="pt-result-emoji">${e?"\u{1F4DA}":"\u{1F389}"}</div>
        <h2 class="pt-title">${e?"Tamam!":"Seviyeni Bulduk!"}</h2>
        <div class="pt-result-badge" style="color:${s};border-color:${s}40;background:${s}12">
          ${t} \u2014 ${n}
        </div>
        <p class="pt-result-desc">${a}</p>
        <p class="pt-result-note">\u0130stedi\u011Fin zaman Ayarlar'dan seviyeni de\u011Fi\u015Ftirebilirsin.</p>
        <button class="pt-btn pt-btn-primary" id="pt-confirm" style="background:${s}">
          Uygulamay\u0131 A\xE7 \u2192
        </button>
      </div>
    `),this._on("pt-confirm",()=>{this._onComplete&&this._onComplete(t)})}_html(t){this._container.innerHTML=`<div class="pt-overlay">${t}</div>`}_on(t,e){const s=document.getElementById(t);s&&s.addEventListener("click",e)}_esc(t){return String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}}
