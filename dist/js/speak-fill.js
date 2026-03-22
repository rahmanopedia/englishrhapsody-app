class SpeakFillMode{constructor(){this.el=null,this.items=[],this.pool=[],this.idx=0,this.status="idle",this.liveText="",this.filledWords=[],this._rec=null,this._audioCtx=null,this._analyser=null,this._stream=null,this._animFrame=null,this._ttsTimers=[],this._gen=0,this._isSupported=!!(window.SpeechRecognition||window.webkitSpeechRecognition),this._level="A1",this.correct=0,this.total=0,this.streak=0}_sentenceLevel(s,t){const i={A1:1,A2:2,B1:3,B2:4,C1:5,C2:6},n=s.split(/\s+/),l=n.length,r=n.reduce((a,h)=>a+h.replace(/[^a-z]/gi,"").length,0)/l,e=i[t]||3,o=l*.5+r*.3+e*2.2;return o<7?"A1":o<11?"A2":o<15?"B1":o<19?"B2":o<23?"C1":"C2"}_buildItems(){const s=[];if(typeof WORDS!="undefined"){const t=typeof EX_TR!="undefined"?EX_TR:{};for(const i of WORDS){if(!i.ex)continue;const n=i.ex.trim();if(n.split(/\s+/).length<4)continue;const l=t[i.id]||i.ex_tr||"";l&&s.push({sentence:n,tr:l,word:i.en||"",level:this._sentenceLevel(n,i.level||"B1")})}}this.items=s}_setLevel(s){this._level=s,this.idx=0,this.correct=0,this.total=0,this.streak=0,this.pool=this.items.filter(t=>t.level===s),this.pool.length<5&&(this.pool=this.items)}get _cur(){return this.pool[this.idx]||null}_tokenize(s){return s.split(/\s+/).map(t=>{const i=t.match(/[.,!?;:]+$/)?t.match(/[.,!?;:]+$/)[0]:"",n=t.replace(/[.,!?;:]+$/,"");return{raw:t,clean:n,punc:i}}).filter(t=>t.clean.length>0)}init(s){this.el=s,this._buildItems(),this._setLevel("A1"),this._render(),this._initOrientation()}_initOrientation(){try{screen.orientation&&screen.orientation.unlock&&screen.orientation.unlock()}catch(s){}}destroy(){this.el&&(this.el.innerHTML="")}_render(){if(!this.el)return;const s=this._cur;if(!s){this.el.innerHTML='<p class="sfm-empty">Veri y\xFCkleniyor\u2026</p>';return}const t=this._tokenize(s.sentence);this.filledWords=new Array(t.length).fill(!1);const i=["A1","A2","B1","B2","C1","C2"],n={A1:{color:"#10b981",label:"Ba\u015Flang\u0131\xE7"},A2:{color:"#06b6d4",label:"Temel"},B1:{color:"#3b82f6",label:"Orta Alt\u0131"},B2:{color:"#8b5cf6",label:"Orta \xDCst\xFC"},C1:{color:"#f59e0b",label:"\u0130leri"},C2:{color:"#ef4444",label:"Ustala\u015Fm\u0131\u015F"}},l=n[this._level],r=Math.round(this.idx/Math.max(1,this.pool.length)*100),e=Array.from({length:18},(c,f)=>`<div class="sfm-bar" id="sfb${f}"></div>`).join(""),o=t.map((c,f)=>`<span class="sfm-word-slot" id="sfm-slot-${f}">
        <span class="sfm-slot-fill" id="sfm-fill-${f}"></span>
        <span class="sfm-slot-dashes">${this._dashes(c.clean.length)}</span>${c.punc?`<span class="sfm-slot-punc">${c.punc}</span>`:""}
      </span>`).join(" "),h=[...t].sort(()=>Math.random()-.5).map(c=>`<span class="sfm-chip" data-word="${this._esc(c.clean)}">${this._esc(c.clean)}</span>`).join("");this.el.innerHTML=`
<div class="sfm-wrap">

  <!-- Seviye se\xE7imi -->
  <div class="sfm-levels">
    ${i.map(c=>`
      <button class="sfm-lvl-btn${this._level===c?" sfm-lvl-on":""}"
        data-lv="${c}"
        style="${this._level===c?`background:${n[c].color}22;border-color:${n[c].color}66;color:${n[c].color}`:""}">
        ${c}
      </button>`).join("")}
  </div>

  <!-- Seviye etiketi + istatistik -->
  <div class="sfm-topbar">
    <div class="sfm-stats">
      <span class="sfm-level-pill" style="background:${l.color}20;color:${l.color};border-color:${l.color}44">
        ${this._level} \u2014 ${l.label}
      </span>
      <span class="sfm-stat-chip">\u{1F525} <strong>${this.streak}</strong></span>
      <span class="sfm-stat-chip">\u2705 <strong>${this.correct}/${this.total}</strong></span>
      <span class="sfm-stat-chip"><strong>${this.idx+1}</strong><em>/${this.pool.length}</em></span>
    </div>
    <div class="sfm-prog-track">
      <div class="sfm-prog-fill" style="width:${r}%;background:${l.color}"></div>
    </div>
  </div>

  <!-- Ana kart -->
  <div class="sfm-card" id="sfm-card">

    <!-- T\xFCrk\xE7e c\xFCmle \u2014 b\xFCy\xFCk, belirgin -->
    <div class="sfm-tr-sentence">${this._esc(s.tr)}</div>

    <!-- Kelime bankas\u0131 -->
    <div class="sfm-bank" id="sfm-bank">${h}</div>

    <!-- Ay\u0131r\u0131c\u0131 -->
    <div class="sfm-divider"></div>

    <!-- Tire bo\u015Fluklar\u0131 -->
    <div class="sfm-blanks-area" id="sfm-blanks">${o}</div>

    <!-- Canl\u0131 sesli yaz\u0131m -->
    <div class="sfm-live" id="sfm-live"></div>

  </div>

  <!-- Mikrofon b\xF6l\xFCm\xFC -->
  <div class="sfm-mic-section">
    <div class="sfm-wave">${e}</div>
    <div class="sfm-mic-outer">
      <div class="sfm-ring sfm-ring-1" id="sfmr1"></div>
      <div class="sfm-ring sfm-ring-2" id="sfmr2"></div>
      <button class="sfm-mic-btn" id="sfm-mic" ${this._isSupported?"":"disabled"}>
        <span id="sfm-mic-ico">${this._micSvg(30)}</span>
      </button>
    </div>
    <div class="sfm-status" id="sfm-status">
      ${this._isSupported?"Mikrofona bas, \u0130ngilizce c\xFCmleyi s\xF6yle":"\u26A0\uFE0F Chrome / Edge gereklidir"}
    </div>
  </div>

  <!-- Sonu\xE7 -->
  <div class="sfm-result" id="sfm-result" style="display:none">
    <div class="sfm-result-msg" id="sfm-result-msg"></div>
    <div class="sfm-result-btns">
      <button class="sfm-rbtn sfm-rbtn-ghost"   id="sfm-retry">\u{1F504} Tekrar</button>
      <button class="sfm-rbtn sfm-rbtn-primary" id="sfm-next">Sonraki \u2192</button>
    </div>
  </div>

  <!-- Navigasyon -->
  <div class="sfm-nav">
    <button class="sfm-nav-btn" id="sfm-prev" ${this.idx===0?"disabled":""}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="sfm-skip-btn" id="sfm-skip">Ge\xE7</button>
    <button class="sfm-nav-btn" id="sfm-fwd">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>

</div>`,this._bind()}_dashes(s){const t=Math.max(2,s);return'<span class="sfm-dash"></span>'.repeat(t)}_bind(){var t,i,n,l,r,e;const s=o=>this.el.querySelector(o);(t=s("#sfm-mic"))==null||t.addEventListener("click",()=>this._toggleRec()),(i=s("#sfm-retry"))==null||i.addEventListener("click",()=>this._reset()),(n=s("#sfm-next"))==null||n.addEventListener("click",()=>this._advance()),(l=s("#sfm-skip"))==null||l.addEventListener("click",()=>this._advance()),(r=s("#sfm-prev"))==null||r.addEventListener("click",()=>this._go(this.idx-1)),(e=s("#sfm-fwd"))==null||e.addEventListener("click",()=>this._advance()),this.el.querySelectorAll(".sfm-lvl-btn").forEach(o=>o.addEventListener("click",()=>{this._stopAll(),this._setLevel(o.dataset.lv),this._render()}))}_advance(){this._stopAll(),this._go((this.idx+1)%this.pool.length)}_go(s){this._stopAll(),this.idx=Math.max(0,Math.min(s,this.pool.length-1)),this.status="idle",this.liveText="",this._render()}_reset(){var e;this._stopAll(),this.status="idle",this.liveText="";const s=this._cur;if(!s)return;const t=this._tokenize(s.sentence);this.filledWords=new Array(t.length).fill(!1),t.forEach((o,a)=>this._clearSlot(a)),(e=this.el)==null||e.querySelectorAll(".sfm-chip").forEach(o=>o.classList.remove("sfm-chip-used","sfm-chip-ok","sfm-chip-auto"));const i=o=>{var a;return(a=this.el)==null?void 0:a.querySelector(o)},n=i("#sfm-live");n&&(n.textContent="");const l=i("#sfm-result");l&&(l.style.display="none");const r=i("#sfm-card");r&&r.classList.remove("sfm-card-done"),this._setMicUI("idle"),this._setStatus("Mikrofona bas, \u0130ngilizce c\xFCmleyi s\xF6yle")}_toggleRec(){this.status==="recording"?this._stopRec():(this._reset(),this._startRec())}async _startRec(){const s=window.SpeechRecognition||window.webkitSpeechRecognition;if(!s)return;this.status="recording",this.liveText="",this._setMicUI("recording"),this._setStatus('<span class="sfm-dot"></span> Dinleniyor\u2026');const t=new s;this._rec=t,t.lang="en-US",t.continuous=!1,t.interimResults=!0,t.maxAlternatives=1,t.start(),this._startWave(),t.onresult=i=>{var e;let n="",l="";for(let o=i.resultIndex;o<i.results.length;o++){const a=i.results[o][0].transcript;i.results[o].isFinal?l+=a:n+=a}this.liveText=(l||n).trim(),this._matchAndFill(this.liveText);const r=(e=this.el)==null?void 0:e.querySelector("#sfm-live");r&&(r.innerHTML=this.liveText?`<span class="sfm-live-txt">"${this._esc(this.liveText)}"</span>`:"")},t.onend=()=>{if(this._stopAll(),this.status!=="done"){if(!this.liveText.trim()){this.status="idle",this._setMicUI("idle"),this._setStatus("Ses alg\u0131lanamad\u0131, tekrar dene.");return}this.status="processing",this._setMicUI("processing"),this._setStatus("De\u011Ferlendiriliyor\u2026"),setTimeout(()=>this._finalize(),300)}},t.onerror=i=>{this._stopAll(),this.status="idle",this._setMicUI("idle"),this._setStatus(i.error==="no-speech"?"Ses alg\u0131lanamad\u0131. Tekrar dene.":"\u26A0\uFE0F Bir hata olu\u015Ftu.")}}_stopRec(){var s;try{(s=this._rec)==null||s.stop()}catch(t){}this._stopAll()}_stopAll(){var s;if(this._rec){try{this._rec.stop()}catch(t){}this._rec=null}if(this._animFrame&&(cancelAnimationFrame(this._animFrame),this._animFrame=null),this._audioCtx){try{this._audioCtx.close()}catch(t){}this._audioCtx=null}this._stream&&(this._stream.getTracks().forEach(t=>t.stop()),this._stream=null),this._ttsTimers.forEach(t=>clearTimeout(t)),this._ttsTimers=[],this._gen++,(s=window.speechSynthesis)==null||s.cancel(),this._analyser=null,this._resetBars()}_norm(s){return s.toLowerCase().replace(/[^a-z\s']/g,"").replace(/\s+/g," ").trim()}_matchAndFill(s){const t=this._cur;if(!t)return;const i=this._tokenize(t.sentence),n=this._norm(s).split(" ").filter(Boolean);let l=0;i.forEach((r,e)=>{if(l>=n.length)return;const o=this._norm(r.clean);o&&(this._wordMatch(n[l],o)?(this.filledWords[e]||(this.filledWords[e]=!0,this._fillSlot(e,r.clean,r.punc,"pop")),l++):l+1<n.length&&this._wordMatch(n[l+1],o)&&(this.filledWords[e]||(this.filledWords[e]=!0,this._fillSlot(e,r.clean,r.punc,"pop")),l+=2))})}_wordMatch(s,t){if(!s||!t)return!1;if(s===t)return!0;if(Math.abs(s.length-t.length)>3)return!1;const i=t.length<=4?1:t.length<=7?2:3;return this._lev(s,t)<=i}_lev(s,t){const i=s.length,n=t.length,l=Array.from({length:i+1},(r,e)=>Array.from({length:n+1},(o,a)=>e||a));for(let r=1;r<=i;r++)for(let e=1;e<=n;e++)l[r][e]=s[r-1]===t[e-1]?l[r-1][e-1]:1+Math.min(l[r-1][e],l[r][e-1],l[r-1][e-1]);return l[i][n]}_fillSlot(s,t,i,n){var e,o;const l=(e=this.el)==null?void 0:e.querySelector(`#sfm-fill-${s}`),r=(o=this.el)==null?void 0:o.querySelector(`#sfm-slot-${s} .sfm-slot-dashes`);l&&(l.textContent=t,l.className=`sfm-slot-fill sfm-slot-filled${n==="pop"?" sfm-slot-pop":""}`,r&&(r.style.display="none"),this._markChip(t,"ok"))}_fillSlotAuto(s,t,i){var r,e;const n=(r=this.el)==null?void 0:r.querySelector(`#sfm-fill-${s}`),l=(e=this.el)==null?void 0:e.querySelector(`#sfm-slot-${s} .sfm-slot-dashes`);n&&(n.textContent=t,n.className="sfm-slot-fill sfm-slot-auto",l&&(l.style.display="none"),this._markChip(t,"auto"))}_clearSlot(s){var n,l;const t=(n=this.el)==null?void 0:n.querySelector(`#sfm-fill-${s}`),i=(l=this.el)==null?void 0:l.querySelector(`#sfm-slot-${s} .sfm-slot-dashes`);t&&(t.textContent="",t.className="sfm-slot-fill"),i&&(i.style.display="")}_markChip(s,t){var n;const i=(n=this.el)==null?void 0:n.querySelectorAll(".sfm-chip:not(.sfm-chip-used)");if(i){for(const l of i)if(l.dataset.word.toLowerCase()===s.toLowerCase()){l.classList.add("sfm-chip-used",t==="auto"?"sfm-chip-auto":"sfm-chip-ok");break}}}_finalize(){var c,f,u;const s=this._cur;if(!s)return;const t=this._tokenize(s.sentence),n=this.filledWords.filter(Boolean).length/t.length;this.total++,n>=.6?(this.correct++,this.streak++):this.streak=0;const r=n>=.9?10:n>=.6?5:2,e=window._app||window.app;e&&typeof e.addXP=="function"&&e.addXP(r,"medium","speak-fill"),this.status="done",this._setMicUI("idle"),this._setStatus("");const o=(c=this.el)==null?void 0:c.querySelector("#sfm-result-msg");if(o){const p=Math.round(n*100),m=n>=.8?"#34d399":n>=.5?"#f59e0b":"#f87171",_=n>=.8?"Harika!":n>=.5?"\u0130yi gidiyor!":"Daha fazla pratik yap!";o.innerHTML=`
        <span class="sfm-res-label" style="color:${m}">${_}</span>
        <span class="sfm-res-pct" style="color:${m}">${p}% do\u011Fru</span>
        <span class="sfm-xp">+${r} XP</span>`}const a=(f=this.el)==null?void 0:f.querySelector("#sfm-result");a&&(a.style.display="",a.classList.add("sfm-result-anim"));const h=(u=this.el)==null?void 0:u.querySelector("#sfm-card");h&&h.classList.add("sfm-card-done"),this._autoFillWithTTS(t)}_autoFillWithTTS(s){if(!window.speechSynthesis){this._autoFillFallback(s);return}const t=this._cur;if(!t)return;const i=this._gen,n=new SpeechSynthesisUtterance(t.sentence);n.lang="en-US",n.rate=.88,n.onboundary=r=>{if(this._gen!==i||r.name!=="word")return;const o=t.sentence.substring(0,r.charIndex+r.charLength).trim().split(/\s+/).length-1;o<s.length&&!this.filledWords[o]&&(this.filledWords[o]=!0,this._fillSlotAuto(o,s[o].clean,s[o].punc))},n.onend=()=>{this._gen===i&&s.forEach((r,e)=>{this.filledWords[e]||(this.filledWords[e]=!0,this._fillSlotAuto(e,r.clean,r.punc))})},n.onerror=()=>{this._gen===i&&this._autoFillFallback(s,i)},window.speechSynthesis.speak(n);const l=380;s.forEach((r,e)=>{this.filledWords[e]||this._ttsTimers.push(setTimeout(()=>{this._gen===i&&(this.filledWords[e]||(this.filledWords[e]=!0,this._fillSlotAuto(e,r.clean,r.punc)))},e*l+200))})}_autoFillFallback(s,t){const i=t!=null?t:this._gen,n=380;s.forEach((l,r)=>{this.filledWords[r]||this._ttsTimers.push(setTimeout(()=>{this._gen===i&&(this.filledWords[r]=!0,this._fillSlotAuto(r,l.clean,l.punc))},r*n+100))})}_setMicUI(s){const t=e=>{var o;return(o=this.el)==null?void 0:o.querySelector(e)},i=t("#sfm-mic"),n=t("#sfm-mic-ico"),l=t("#sfmr1"),r=t("#sfmr2");if(i){i.classList.remove("sfm-mic-rec","sfm-mic-proc"),[l,r].forEach(e=>e==null?void 0:e.classList.remove("sfm-ring-on")),s==="recording"?(i.classList.add("sfm-mic-rec"),l==null||l.classList.add("sfm-ring-on"),r==null||r.classList.add("sfm-ring-on"),n&&(n.innerHTML=this._stopSvg()),i.disabled=!1):s==="processing"?(i.classList.add("sfm-mic-proc"),n&&(n.innerHTML='<div class="sfm-spinner"></div>'),i.disabled=!0):(n&&(n.innerHTML=this._micSvg(30)),i.disabled=!this._isSupported);for(let e=0;e<18;e++){const o=t(`#sfb${e}`);o&&(o.style.background=s==="recording"?"linear-gradient(to top,#06b6d4,#67e8f9)":"rgba(255,255,255,0.1)",o.style.boxShadow=s==="recording"?"0 0 5px rgba(6,182,212,0.5)":"none")}}}_setStatus(s){var i;const t=(i=this.el)==null?void 0:i.querySelector("#sfm-status");t&&(t.innerHTML=s)}_startWave(){const s=()=>{var t;if(this.status==="recording"){for(let i=0;i<18;i++){const n=(t=this.el)==null?void 0:t.querySelector(`#sfb${i}`);n&&(n.style.height=`${4+Math.random()*36}px`)}this._animFrame=requestAnimationFrame(s)}};s()}_resetBars(){var s;for(let t=0;t<18;t++){const i=(s=this.el)==null?void 0:s.querySelector(`#sfb${t}`);i&&(i.style.height="4px",i.style.background="rgba(255,255,255,0.1)",i.style.boxShadow="none")}}_micSvg(s=30){return`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`}_stopSvg(){return`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="white"/>
    </svg>`}_esc(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}(function(){let d=null,s=null;function t(e){if(!e||document.fullscreenElement||document.webkitFullscreenElement)return;const o=document.documentElement,a=o.requestFullscreen||o.webkitRequestFullscreen;a&&a.call(o).catch(()=>{})}function i(e){if(s!==e){s=e;try{screen.orientation&&screen.orientation.unlock&&screen.orientation.unlock()}catch(o){}t(e),d&&window.removeEventListener("resize",d),d=()=>t(e),window.addEventListener("resize",d,{passive:!0}),window.attachQuickMenuTrigger&&window.attachQuickMenuTrigger(e)}}function n(){d&&(window.removeEventListener("resize",d),d=null),s=null;try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("portrait").catch(()=>{})}catch(e){}}function l(){const e=window._app;if(!e||!e.navigate||e.__speakPatched)return;e.__speakPatched=!0;const o=e.navigate.bind(e);e.navigate=function(a){if(o(a),a==="speak"){const h=document.querySelector(".speak-container");h&&i(h)}else s&&n()}}if(window._app)l();else{const e=setInterval(()=>{window._app&&(clearInterval(e),l())},50)}window._speakShowPicker=function(){const e=document.getElementById("spk-picker"),o=document.getElementById("spk-pane-v2"),a=document.getElementById("spk-pane-fill");e&&(e.style.display=""),o&&(o.style.display="none"),a&&(a.style.display="none"),s&&t(s)},window._speakSwitchTab=function(e){const o=document.getElementById("spk-picker"),a=document.getElementById("spk-pane-v2"),h=document.getElementById("spk-pane-fill");if(o&&(o.style.display="none"),a&&(a.style.display=e==="v2"?"":"none"),h&&(h.style.display=e==="fill"?"":"none"),e==="fill"){const c=document.getElementById("speak-fill-point");c&&!window.speakFillMod&&(window.speakFillMod=new SpeakFillMode,window.speakFillMod.init(c))}s&&t(s)},new MutationObserver(()=>{const e=document.getElementById("speak-mount-point");e&&e.offsetParent!==null&&(!window.speakV2Mod||window.speakV2Mod.el!==e)&&(window.speakV2Mod=new(window.SpeakV2Module||(()=>{})),window.speakV2Mod.init&&window.speakV2Mod.init(e))}).observe(document.body,{childList:!0,subtree:!0})})();
