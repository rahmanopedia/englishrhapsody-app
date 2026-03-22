class BridgeModule{constructor(t){this.app=t,this.el=null,this.collection=JSON.parse(localStorage.getItem("bridge_collection")||"[]"),this.bridgeCount=parseInt(localStorage.getItem("bridge_count")||"0"),this.streakData=JSON.parse(localStorage.getItem("bridge_streak")||'{"count":0,"lastDate":""}'),this.currentData=null,this.activeCategory=null,this.BRIDGE_META={direct:{label:"Do\u011Frudan",color:"#94a3b8",desc:"Birebir e\u015Fle\u015Fme"},transform:{label:"D\xF6n\xFC\u015F\xFCm",color:"#a78bfa",desc:"K\xFClt\xFCrel de\u011Fi\u015Fim"},multiply:{label:"\xC7o\u011Falma",color:"#34d399",desc:"\xC7oklu anlam"},disappear:{label:"Kaybolu\u015F",color:"#f87171",desc:"Kay\u0131p anlam"},emerge:{label:"T\xFCreme",color:"#22d3ee",desc:"Yeni anlam"}},this.EXAMPLES=["Can\u0131m s\u0131k\u0131ld\u0131","Kafam \xE7ok kar\u0131\u015F\u0131k","\u0130\u015Fler \xE7ok yo\u011Fun gidiyor","\xDCst\xFCmden b\xFCy\xFCk bir y\xFCk kalkt\u0131"]}init(t){this.el=t,this._render(),this._initOrientation()}_initOrientation(){try{screen.orientation&&screen.orientation.unlock&&screen.orientation.unlock()}catch(e){}const t=()=>{if(!document.fullscreenElement&&!document.webkitFullscreenElement&&this.el){const e=this.el.requestFullscreen||this.el.webkitRequestFullscreen;e&&e.call(this.el).catch(()=>{})}};t(),this._orientHandler=()=>t(),window.addEventListener("resize",this._orientHandler,{passive:!0}),window.attachQuickMenuTrigger&&window.attachQuickMenuTrigger(this.el)}destroy(){if(this._orientHandler&&(window.removeEventListener("resize",this._orientHandler),this._orientHandler=null),document.fullscreenElement||document.webkitFullscreenElement){const t=document.exitFullscreen||document.webkitExitFullscreen;t&&t.call(document).catch(()=>{})}try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("portrait").catch(()=>{})}catch(t){}this.el&&(this.el.innerHTML="")}_render(){const t=Object.entries(this.BRIDGE_META).map(([r,a])=>`
      <div class="bridge-legend-item" title="${a.desc}">
        <div class="bridge-legend-dot" style="background:${a.color}"></div>
        <span>${a.label}</span>
      </div>
    `).join(""),e=(window.BRIDGE_CATEGORIES||[]).map(r=>`
      <button class="bridge-cat-chip ${this.activeCategory===r.id?"active":""}" data-cat="${r.id}">
        ${r.icon} ${r.label}
      </button>
    `).join(""),i=this.EXAMPLES.map(r=>`<button class="bridge-example-pill" data-ex="${r}">${r}</button>`).join("");this.el.innerHTML=`
      <div class="bridge-wrap">
        <div class="bridge-header">
          <div class="bridge-logo-area">
            <div class="bridge-logo-circle">K</div>
            <div class="bridge-title-block">
              <h1 style="margin:0; font-size:1.4rem;">K\xD6PR\xDC</h1>
              <p style="margin:0; font-size:0.7rem; color:var(--text-3); text-transform:uppercase;">Ak\u0131ll\u0131 Ke\u015Fif Modu</p>
            </div>
          </div>
          <div class="bridge-stat-group">
            <div class="bridge-stat-item" id="b-stat-count">\u2728 ${this.bridgeCount}</div>
            <div class="bridge-stat-item" id="b-stat-streak">\u{1F525} ${this.streakData.count}</div>
            <button class="bridge-trigger-btn" style="width:40px; height:40px; font-size:1.2rem;" id="b-quiz-btn">\u{1F3AF}</button>
          </div>
        </div>

        <div class="bridge-legend">${t}</div>

        <div class="bridge-workspace">
          <div class="bridge-panel">
            <div style="font-size:0.7rem; font-weight:800; color:var(--br-tr); margin-bottom:10px;">G\u0130R\u0130\u015E VEYA KE\u015E\u0130F</div>
            <textarea class="bridge-textarea" id="b-text" placeholder="Bir ifade yaz veya oka bas!"></textarea>
            <div class="bridge-examples">${i}</div>
          </div>
          <div class="bridge-trigger-col" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;">
            <button class="bridge-trigger-btn" id="b-trigger" title="Yeni \u0130fade Ke\u015Ffet">\u2794</button>
            <span style="font-size:0.6rem; color:var(--text-3); font-weight:700;">KE\u015EFET</span>
          </div>
          <div class="bridge-panel">
            <div style="font-size:0.7rem; font-weight:800; color:var(--cyan); margin-bottom:10px;">\u0130NG\u0130L\u0130ZCE K\xD6PR\xDC</div>
            <div id="b-placeholder" style="color:var(--text-3); font-size:0.9rem; margin-top:20px; text-align:center;">
              Analiz i\xE7in butona bas\u0131n.
            </div>
            <div id="b-result" style="display:none"></div>
          </div>
        </div>

        <div class="bridge-cat-filter-bar">
          <button class="bridge-cat-chip ${this.activeCategory?"":"active"}" data-cat="">Hepsi</button>
          ${e}
        </div>

        <div id="b-cards-area"></div>
        <div id="b-insight-area"></div>
        
        <div id="b-actions-area" style="display:none; gap:12px; margin-top:20px;">
          <button class="bridge-cat-chip active" style="flex:1; background:var(--cyan); color:#000;" id="b-save-btn">Koleksiyona Ekle</button>
          <button class="bridge-cat-chip active" style="flex:1; background:var(--violet);" id="b-shadow-btn">G\xF6lgeleme Yap</button>
        </div>

        <div class="bridge-collection-section">
          <h3 style="font-size:1rem; margin-bottom:15px; border-left:4px solid var(--violet); padding-left:10px;">KOLEKS\u0130YONUM</h3>
          <div class="bridge-collection-grid" id="b-coll-grid"></div>
        </div>
      </div>
    `,this._bindEvents(),this._renderCollection()}_bindEvents(){const t=this.el.querySelector("#b-trigger"),e=this.el.querySelector("#b-text");t.addEventListener("click",()=>{this._smartDiscovery()}),e.addEventListener("keydown",i=>{if((i.ctrlKey||i.metaKey)&&i.key==="Enter"){const r=e.value.trim();r&&this._analyze(r)}}),this.el.querySelectorAll(".bridge-example-pill").forEach(i=>{i.addEventListener("click",()=>{e.value=i.dataset.ex,this._analyze(i.dataset.ex)})}),this.el.querySelectorAll(".bridge-cat-chip").forEach(i=>{i.addEventListener("click",()=>{this.activeCategory=i.dataset.cat||null,this.el.querySelectorAll(".bridge-cat-chip").forEach(r=>r.classList.remove("active")),i.classList.add("active")})}),this.el.querySelector("#b-quiz-btn").addEventListener("click",()=>this._showQuiz()),this.el.querySelector("#b-save-btn").addEventListener("click",()=>this._saveToColl()),this.el.querySelector("#b-shadow-btn").addEventListener("click",()=>this._startShadowing())}_smartDiscovery(){var r;if(!window.BRIDGE_DATA)return;const t=(r=this.app.state)!=null&&r.get?this.app.state.get("level"):1;let e=window.BRIDGE_DATA;this.activeCategory&&(e=e.filter(a=>a.category===this.activeCategory)),t<10?e=e.filter(a=>a.register==="neutral"||a.bridges.some(n=>n.bridge_type==="direct")):t<20&&(e=e.filter(a=>a.register==="informal"||a.bridges.some(n=>n.bridge_type==="transform"))),e.length||(e=window.BRIDGE_DATA);const i=e[Math.floor(Math.random()*e.length)];this.el.querySelector("#b-text").value=i.tr,window.analyticsManager&&window.analyticsManager._log("discovery_bridge",{tr:i.tr,level:t,category:i.category}),this._analyze(i.tr)}_analyze(t){if(!t||typeof findBridgeMatch!="function")return;const e=findBridgeMatch(t);e?(this.currentData={originalTR:t,...e.entry},this._renderResult(),this.bridgeCount++,localStorage.setItem("bridge_count",this.bridgeCount),this.el.querySelector("#b-stat-count").textContent=`\u2728 ${this.bridgeCount}`,this._updateStreak()):UI.toast("Bu ifade hen\xFCz veritaban\u0131nda yok.")}_renderResult(){const t=this.currentData,e=this.el.querySelector("#b-result"),i=this.el.querySelector("#b-placeholder"),r=this.el.querySelector("#b-actions-area");i.style.display="none",e.style.display="block",r.style.display="flex",e.innerHTML=`
      <div class="bridge-result-card-inner">
        <div class="bridge-primary-en">"${t.english_primary}"</div>
        <div style="display:flex; justify-content:center; gap:10px; margin-bottom:15px;">
          <span class="bridge-cat-chip" style="font-size:0.6rem; padding:4px 10px;">${t.register||"neutral"}</span>
          <button class="bridge-example-pill" id="b-speak-main">\u{1F50A} Dinle</button>
        </div>
      </div>
    `,e.querySelector("#b-speak-main").addEventListener("click",()=>this._speak(t.english_primary)),this._renderCards(t.bridges||[]),this._renderInsight(t.cultural_insight,t.fluency_tip)}_renderCards(t){const e=this.el.querySelector("#b-cards-area");e.innerHTML=t.map(i=>{var r,a;return`
      <div class="bridge-card-row">
        <div style="text-align:right;">
          <div style="font-weight:800; font-size:1rem;">${i.tr_fragment}</div>
          <div style="font-size:0.7rem; color:var(--text-3);">${i.tr_gloss||""}</div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <div class="bridge-legend-dot" style="background:${((r=this.BRIDGE_META[i.bridge_type])==null?void 0:r.color)||"#fff"}"></div>
          <div style="font-size:0.6rem; margin-top:4px;">${((a=this.BRIDGE_META[i.bridge_type])==null?void 0:a.label)||""}</div>
        </div>
        <div style="text-align:left;">
          <div style="font-weight:800; font-size:1rem; color:var(--cyan);">${i.en_fragment}</div>
          <div style="font-size:0.7rem; color:var(--text-3);">${i.explanation||""}</div>
        </div>
      </div>
    `}).join("")}_renderInsight(t,e){const i=this.el.querySelector("#b-insight-area");if(!t&&!e){i.innerHTML="";return}i.innerHTML=`
      <div class="bridge-coach-insight">
        <div class="bridge-coach-avatar">\u{1F9E0}</div>
        <div style="flex:1;">
          <div class="coach-name">K\xD6PR\xDC KO\xC7U</div>
          <div style="font-size:0.95rem; margin:8px 0; line-height:1.5;">${t||""}</div>
          ${e?`<div style="background:rgba(245,158,11,0.1); border-left:3px solid var(--amber); padding:8px 12px; border-radius:4px; font-size:0.85rem; color:var(--amber);"><strong>PRO-TIP:</strong> ${e}</div>`:""}
        </div>
      </div>
    `}_renderCollection(){const t=this.el.querySelector("#b-coll-grid");if(!this.collection.length){t.innerHTML='<p style="color:var(--text-3); font-size:0.8rem;">Hen\xFCz bir k\xF6pr\xFC kaydetmedin.</p>';return}t.innerHTML=this.collection.slice(0,8).map(e=>`
      <div class="bridge-cat-chip" style="text-align:left; padding:12px; height:auto; display:block; margin-bottom:8px; border-color:rgba(255,255,255,0.05);" data-tr="${e.originalTR}">
        <div style="font-size:0.85rem; font-weight:700;">${e.originalTR}</div>
        <div style="font-size:0.75rem; color:var(--cyan); margin-top:4px;">${e.english_primary}</div>
      </div>
    `).join(""),t.querySelectorAll(".bridge-cat-chip").forEach(e=>{e.addEventListener("click",()=>{this.el.querySelector("#b-text").value=e.dataset.tr,this._analyze(e.dataset.tr)})})}_saveToColl(){!this.currentData||this.collection.some(t=>t.originalTR===this.currentData.originalTR)||(this.collection.unshift(this.currentData),localStorage.setItem("bridge_collection",JSON.stringify(this.collection)),UI.toast("Koleksiyona eklendi!"),this._renderCollection())}_speak(t){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const e=new SpeechSynthesisUtterance(t);e.lang="en-US",e.rate=.85,window.speechSynthesis.speak(e)}_updateStreak(){const t=new Date().toDateString(),e=new Date(Date.now()-864e5).toDateString();this.streakData.lastDate!==t&&(this.streakData.count=this.streakData.lastDate===e?this.streakData.count+1:1,this.streakData.lastDate=t,localStorage.setItem("bridge_streak",JSON.stringify(this.streakData)),this.el.querySelector("#b-stat-streak").textContent=`\u{1F525} ${this.streakData.count}`)}_startShadowing(){if(!this.currentData)return;const t=this.currentData.english_primary,e=document.createElement("div");e.style="position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px;",e.innerHTML=`<div class="bridge-panel" style="max-width:400px; text-align:center; padding:40px;">
      <h3>G\xF6lgeleme</h3>
      <p style="font-size:1.5rem; font-weight:900; color:var(--cyan);">"${t}"</p>
      <div id="sh-stat" style="margin:20px 0;">Ba\u015Fl\u0131yor...</div>
      <button class="bridge-cat-chip active" id="sh-close">Kapat</button>
    </div>`,document.body.appendChild(e),e.querySelector("#sh-close").onclick=()=>{window.speechSynthesis.cancel(),e.remove()};let i=0;const r=()=>{i>=3||!e.isConnected||(i++,e.querySelector("#sh-stat").textContent=`Tekrar ${i}/3 - Dinle ve S\xF6yle`,this._speak(t),setTimeout(r,4e3))};r()}_showQuiz(){if(!window.BRIDGE_DATA)return;const t=[...window.BRIDGE_DATA].sort(()=>.5-Math.random()).slice(0,5);let e=0,i=0;const r=document.createElement("div");r.style="position:fixed; inset:0; background:rgba(0,0,0,0.95); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px;",document.body.appendChild(r);const a=()=>{if(e>=t.length){r.innerHTML=`<div class="bridge-panel" style="text-align:center; padding:40px;"><h2>Bitti!</h2><p style="font-size:2rem;">${i}/${t.length}</p><button class="bridge-cat-chip active" id="bq-close-btn">Kapat</button></div>`,r.querySelector("#bq-close-btn").addEventListener("click",()=>r.remove()),this.app.addXP(i*20,"medium");return}const n=t[e],l=[n.english_primary,...window.BRIDGE_DATA.filter(s=>s.id!==n.id).sort(()=>.5-Math.random()).slice(0,2).map(s=>s.english_primary)].sort();r.innerHTML=`<div class="bridge-panel" style="max-width:500px; width:100%;">
        <div style="margin-bottom:20px;">Soru ${e+1}/5</div>
        <h3 style="margin-bottom:20px;">"${n.tr}" kar\u015F\u0131l\u0131\u011F\u0131 nedir?</h3>
        ${l.map(s=>`<button class="bridge-cat-chip active" style="display:block; width:100%; margin-bottom:10px; background:var(--bg-elevated);" data-o="${s}">${s}</button>`).join("")}
      </div>`,r.querySelectorAll("button[data-o]").forEach(s=>{s.onclick=()=>{s.dataset.o===n.english_primary?(i++,s.style.background="var(--green)"):s.style.background="var(--rose)",setTimeout(()=>{e++,a()},800)}})};a()}}window.BridgeModule=BridgeModule;
