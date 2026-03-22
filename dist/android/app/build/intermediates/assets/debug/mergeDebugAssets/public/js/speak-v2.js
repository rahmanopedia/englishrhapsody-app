class SpeakV2Module{constructor(){this.el=null,this.level="easy",this.idx=0,this.status="idle",this.result=null,this.liveTranscript="",this.isSpeaking=!1,this.speechRate=1,this.shuffleMode=!1,this.autoAdvance=!1,this.shadowMode=!1,this.sessionScores=[],this.streak=0,this.sessionCount=0,this._lowScoreMap={},this._recordStart=0,this._audioUrl=null,this._audioEl=null,this._mediaRecorder=null,this._audioChunks=[],this._shadowTimer=null,this._autoTimer=null,this._recognition=null,this._audioCtx=null,this._analyser=null,this._stream=null,this._animFrame=null,this._isSupported=!!(window.SpeechRecognition||window.webkitSpeechRecognition)}get _levelConfig(){return{easy:{label:"Beginner",color:"#10b981",glow:"rgba(16,185,129,0.4)"},medium:{label:"Intermediate",color:"#06b6d4",glow:"rgba(6,182,212,0.4)"},hard:{label:"Advanced",color:"#7c3aed",glow:"rgba(124,58,237,0.4)"}}}get _sentences(){try{return SPEAK_CHALLENGES[this.level]||[]}catch(s){return[]}}get _currentSentence(){return this._sentences[this.idx]||""}get _avgScore(){return this.sessionScores.length?Math.round(this.sessionScores.reduce((s,t)=>s+t,0)/this.sessionScores.length):null}async init(s){this.el=s,typeof SPEAK_CHALLENGES=="undefined"&&await this._loadData(),this._render()}_loadData(){return new Promise(s=>{const t=document.createElement("script");t.src="js/stories-data.js",t.onload=s,t.onerror=s,document.head.appendChild(t)})}_render(){if(!this.el)return;const s=this._levelConfig,t=s[this.level],e=2*Math.PI*28;this.el.innerHTML=`
      <div class="sv2-wrap">

        <div class="sv2-levels">
          ${["easy","medium","hard"].map(i=>`
            <button class="sv2-level-btn${i===this.level?" active":""}" data-level="${i}">
              ${s[i].label}
            </button>`).join("")}
        </div>

        <div class="sv2-settings">
          <button class="sv2-toggle${this.shuffleMode?" on":""}" id="sv2-t-shuffle">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
            Kar\u0131\u015Ft\u0131r
          </button>
          <button class="sv2-toggle${this.autoAdvance?" on":""}" id="sv2-t-auto">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Otomatik
          </button>
          <button class="sv2-toggle${this.shadowMode?" on":""}" id="sv2-t-shadow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            G\xF6lge
          </button>
        </div>

        <div class="sv2-stats">
          <span class="sv2-stat">\u{1F525} <strong id="sv2-streak-num">${this.streak}</strong> seri</span>
          <span class="sv2-stat-sep">\xB7</span>
          <span class="sv2-stat">\u{1F4CA} <strong id="sv2-avg-num">${this._avgScore!==null?this._avgScore+"%":"\u2014"}</strong></span>
          <span class="sv2-stat-sep">\xB7</span>
          <span class="sv2-stat">\u2705 <strong id="sv2-count-num">${this.sessionCount}</strong> c\xFCmle</span>
        </div>

        <div class="sv2-card" id="sv2-card">
          <p class="sv2-sentence" id="sv2-sentence">"${this._esc(this._currentSentence)}"</p>
          <p class="sv2-live" id="sv2-live"></p>
        </div>

        <div class="sv2-nav">
          <button class="sv2-nav-btn" id="sv2-prev"${this.idx===0&&!this.shuffleMode?" disabled":""}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span class="sv2-counter">
            C\xFCmle <strong id="sv2-idx-num" style="color:${t.color}">${this.idx+1}</strong>
            / <span style="color:#f1f5f9">1000</span>
          </span>
          <button class="sv2-nav-btn" id="sv2-next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div class="sv2-audio-btns">
          <button class="sv2-audio-btn sv2-btn-play" id="sv2-play">
            <span class="sv2-aico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></span>
            <small>Play</small>
          </button>
          <button class="sv2-audio-btn sv2-btn-slow" id="sv2-slow">
            <span class="sv2-aico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
            <small>Yava\u015F</small>
          </button>
          <button class="sv2-audio-btn sv2-btn-repeat" id="sv2-repeat">
            <span class="sv2-aico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg></span>
            <small>Tekrar</small>
          </button>
        </div>

        <div class="sv2-mic-section">
          ${this._isSupported?"":`<div class="sv2-unsupported">\u26A0\uFE0F Ses tan\u0131ma Chrome veya Edge'de \xE7al\u0131\u015F\u0131r.</div>`}

          <div class="sv2-mic-wrap" id="sv2-mic-wrap">
            <div class="sv2-ring" id="sv2-r1"></div>
            <div class="sv2-ring" id="sv2-r2"></div>
            <div class="sv2-ring" id="sv2-r3"></div>
            <button class="sv2-mic-btn" id="sv2-mic"${this._isSupported?"":" disabled"}>
              <span id="sv2-mic-icon">${this._micIconSvg(32)}</span>
            </button>
          </div>

          <div class="sv2-waveform" id="sv2-waveform">
            ${Array.from({length:20},(i,n)=>`<div class="sv2-bar" id="sv2-b${n}"></div>`).join("")}
          </div>

          <div class="sv2-status" id="sv2-status">Mikrofona dokun ve c\xFCmleyi s\xF6yle</div>

          <div class="sv2-score-panel" id="sv2-score-panel">
            <!-- Accuracy ring + label + XP -->
            <div class="sv2-score-card">
              <div class="sv2-ring-wrap">
                <svg width="72" height="72" viewBox="0 0 72 72" style="display:block">
                  <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4"/>
                  <circle id="sv2-arc" cx="36" cy="36" r="28" fill="none" stroke="#10b981" stroke-width="4"
                    stroke-linecap="round" stroke-dasharray="${e}" stroke-dashoffset="${e}"
                    style="transform:rotate(-90deg);transform-origin:36px 36px;transition:stroke-dashoffset 1s ease-out,stroke 0.3s"/>
                </svg>
                <div class="sv2-ring-center">
                  <span class="sv2-score-num" id="sv2-score-num">0</span>
                  <span class="sv2-score-pct">%</span>
                </div>
              </div>
              <div class="sv2-score-info">
                <div class="sv2-score-top">
                  <p class="sv2-score-label" id="sv2-score-label"></p>
                  <span class="sv2-xp-badge" id="sv2-xp-badge"></span>
                </div>
                <p class="sv2-score-said" id="sv2-score-said"></p>
              </div>
            </div>

            <!-- Fluency + WPM metrics -->
            <div class="sv2-metrics" id="sv2-metrics"></div>

            <!-- Word breakdown -->
            <div class="sv2-word-breakdown" id="sv2-word-breakdown"></div>

            <!-- Playback -->
            <button class="sv2-playback-btn" id="sv2-playback" style="display:none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              Sesi Dinle
            </button>

            <!-- Sentence history from localStorage -->
            <div class="sv2-sent-hist" id="sv2-sent-hist"></div>

            <!-- Session dots -->
            <div class="sv2-hist" id="sv2-hist"></div>

            <div class="sv2-result-btns">
              <button class="sv2-rbtn sv2-rbtn-ghost" id="sv2-try-again">Tekrar Dene</button>
              <button class="sv2-rbtn sv2-rbtn-primary" id="sv2-next-score">Sonraki \u2192</button>
            </div>
          </div>
        </div>

      </div>
    `,this._applyLevelStyle(),this._bindEvents()}_applyLevelStyle(){var e;const s=this._levelConfig[this.level],t=(e=this.el)==null?void 0:e.querySelector("#sv2-card");t&&(t.style.boxShadow=`0 0 40px ${s.glow.replace("0.4","0.12")}, inset 0 1px 0 rgba(255,255,255,0.06)`)}_bindEvents(){var t,e,i,n,o,a,r,l,d,u,y;if(!this.el)return;const s=v=>this.el.querySelector(v);this.el.querySelectorAll(".sv2-level-btn").forEach(v=>v.addEventListener("click",()=>this._setLevel(v.dataset.level))),(t=s("#sv2-t-shuffle"))==null||t.addEventListener("click",()=>{this.shuffleMode=!this.shuffleMode,s("#sv2-t-shuffle").classList.toggle("on",this.shuffleMode)}),(e=s("#sv2-t-auto"))==null||e.addEventListener("click",()=>{this.autoAdvance=!this.autoAdvance,s("#sv2-t-auto").classList.toggle("on",this.autoAdvance)}),(i=s("#sv2-t-shadow"))==null||i.addEventListener("click",()=>{this.shadowMode=!this.shadowMode,s("#sv2-t-shadow").classList.toggle("on",this.shadowMode),this.shadowMode&&this.status==="idle"&&this._startShadow()}),(n=s("#sv2-prev"))==null||n.addEventListener("click",()=>this._prev()),(o=s("#sv2-next"))==null||o.addEventListener("click",()=>this._next()),(a=s("#sv2-play"))==null||a.addEventListener("click",()=>this._speak(1)),(r=s("#sv2-slow"))==null||r.addEventListener("click",()=>{this.speechRate=.6,this._speak(.6)}),(l=s("#sv2-repeat"))==null||l.addEventListener("click",()=>this._speak(this.speechRate)),(d=s("#sv2-mic"))==null||d.addEventListener("click",()=>this._toggleRecord()),(u=s("#sv2-try-again"))==null||u.addEventListener("click",()=>this._reset()),(y=s("#sv2-next-score"))==null||y.addEventListener("click",()=>this._next())}_setLevel(s){var t;this._clearTimers(),this._stopAll(),(t=window.speechSynthesis)==null||t.cancel(),this.level=s,this.idx=0,this.status="idle",this.result=null,this.liveTranscript="",this._audioUrl=null,this._audioEl=null,this.sessionScores=[],this.streak=0,this.sessionCount=0,this._lowScoreMap={},this._render()}_prev(){var s;this._clearTimers(),this._stopAll(),(s=window.speechSynthesis)==null||s.cancel(),this.idx=Math.max(0,this.idx-1),this.status="idle",this.result=null,this.liveTranscript="",this._audioUrl=null,this._audioEl=null,this._updateSentenceUI()}_next(){var s;this._clearTimers(),this._stopAll(),(s=window.speechSynthesis)==null||s.cancel(),this.idx=this.shuffleMode?this._shuffleNextIdx():Math.min(this.idx+1,this._sentences.length-1),this.status="idle",this.result=null,this.liveTranscript="",this._audioUrl=null,this._audioEl=null,this._updateSentenceUI(),this.shadowMode&&this._startShadow()}_shuffleNextIdx(){const s=this._sentences.length;if(s<=1)return 0;const t=Object.entries(this._lowScoreMap).filter(([i,n])=>Number(i)!==this.idx&&n<60).map(([i])=>Number(i));if(t.length&&Math.random()<.4)return t[Math.floor(Math.random()*t.length)];let e;do e=Math.floor(Math.random()*s);while(e===this.idx);return e}_updateSentenceUI(){const s=this._levelConfig[this.level],t=r=>{var l;return(l=this.el)==null?void 0:l.querySelector(r)},e=t("#sv2-sentence");e&&(e.textContent=`"${this._currentSentence}"`);const i=t("#sv2-idx-num");i&&(i.textContent=this.idx+1,i.style.color=s.color);const n=t("#sv2-prev");n&&(n.disabled=this.idx===0&&!this.shuffleMode);const o=t("#sv2-live");o&&(o.textContent="");const a=t("#sv2-score-panel");a&&a.classList.remove("visible"),this._applyLevelStyle(),this._updateMicState(),this._setStatusText("idle")}_startShadow(){this._shadowTimer&&(clearTimeout(this._shadowTimer),this._shadowTimer=null),this._setStatusText("shadow"),this._speak(1,()=>{this._shadowTimer=setTimeout(()=>{this._shadowTimer=null,this.status==="idle"&&this._startRecording()},600)})}_speak(s,t){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const e=new SpeechSynthesisUtterance(this._currentSentence);e.lang="en-US",e.rate=s,e.onstart=()=>{this.isSpeaking=!0},e.onend=()=>{this.isSpeaking=!1,t&&t()},e.onerror=()=>{this.isSpeaking=!1},window.speechSynthesis.speak(e)}_toggleRecord(){this.status==="recording"?this._stopRecording():(this._reset(),this._startRecording())}async _startRecording(){const s=window.SpeechRecognition||window.webkitSpeechRecognition;if(!s)return;this.result=null,this.liveTranscript="",this._audioChunks=[],this.status="recording",this._updateMicState(),this._setStatusText("recording");const t=new s;this._recognition=t,t.lang="en-US",t.continuous=!1,t.interimResults=!0,t.maxAlternatives=1,this._recordStart=Date.now(),t.start(),this._startWaveform(),t.onresult=e=>{var a;let i="",n="";for(let r=e.resultIndex;r<e.results.length;r++){const l=e.results[r][0].transcript;e.results[r].isFinal?n+=l:i+=l}this.liveTranscript=n||i;const o=(a=this.el)==null?void 0:a.querySelector("#sv2-live");o&&this.liveTranscript&&(o.textContent=`"${this.liveTranscript}"`)},t.onend=()=>{const e=Date.now()-this._recordStart;this.status="processing",this._stopAll(),this._updateMicState(),this._setStatusText("processing"),setTimeout(()=>{const i=this.liveTranscript.trim();if(!i){this.status="idle",this._updateMicState(),this._setStatusText("idle");return}const n=this._score(this._currentSentence,i),o=this._calcWPM(i,e),a=this._calcFluency(n.score,o,this._currentSentence,i);this.result={transcript:i,wpm:o,fluency:a,...n},this.status="done",this.sessionScores.push(n.score),this.sessionScores.length>20&&this.sessionScores.shift(),this.sessionCount++,this.streak=n.score>=50?this.streak+1:0;const r=this._lowScoreMap[this.idx];(r===void 0||n.score<r)&&(this._lowScoreMap[this.idx]=n.score);const l=this._awardXP(n.score);this.result.xp=l,this._saveToHistory({score:n.score,wpm:o,fluency:a,date:new Date().toLocaleDateString("tr-TR",{day:"numeric",month:"short"})}),this._updateMicState(),this._setStatusText("done"),this._updateStats(),this._showScore(),this.autoAdvance&&n.score>=80&&(this._autoTimer=setTimeout(()=>this._next(),2e3))},400)},t.onerror=e=>{this._stopAll(),this.status=e.error==="no-speech"?"idle":"error",this._updateMicState(),this._setStatusText(this.status)}}_stopRecording(){var s;try{(s=this._recognition)==null||s.stop()}catch(t){}this._stopAll()}_stopAll(){if(this._recognition){try{this._recognition.stop()}catch(s){}this._recognition=null}if(this._animFrame&&(cancelAnimationFrame(this._animFrame),this._animFrame=null),this._mediaRecorder&&this._mediaRecorder.state!=="inactive"){const s=this._mediaRecorder;s.onstop=()=>{this._audioChunks.length&&(this._audioUrl&&URL.revokeObjectURL(this._audioUrl),this._audioUrl=URL.createObjectURL(new Blob(this._audioChunks,{type:s.mimeType||"audio/webm"})))};try{s.stop()}catch(t){}}if(this._mediaRecorder=null,this._audioCtx){try{this._audioCtx.close()}catch(s){}this._audioCtx=null}this._stream&&(this._stream.getTracks().forEach(s=>s.stop()),this._stream=null),this._analyser=null,this._resetBars()}_clearTimers(){this._shadowTimer&&(clearTimeout(this._shadowTimer),this._shadowTimer=null),this._autoTimer&&(clearTimeout(this._autoTimer),this._autoTimer=null)}_resetBars(){var s;for(let t=0;t<20;t++){const e=(s=this.el)==null?void 0:s.querySelector(`#sv2-b${t}`);e&&(e.style.height="4px",e.style.background="rgba(255,255,255,0.1)",e.style.boxShadow="none")}}_startWaveform(){const s=()=>{var t;if(this.status==="recording"){for(let e=0;e<20;e++){const i=(t=this.el)==null?void 0:t.querySelector(`#sv2-b${e}`);i&&(i.style.height=`${4+Math.random()*36}px`)}this._animFrame=requestAnimationFrame(s)}};s()}_normalizeNums(s){const t=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"],e=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","twenty one","twenty two","twenty three","twenty four","twenty five","twenty six","twenty seven","twenty eight","twenty nine","thirty","thirty one","thirty two","thirty three","thirty four","thirty five","thirty six","thirty seven","thirty eight","thirty nine","forty","forty one","forty two","forty three","forty four","forty five","forty six","forty seven","forty eight","forty nine","fifty","fifty one","fifty two","fifty three","fifty four","fifty five","fifty six","fifty seven","fifty eight","fifty nine","sixty","sixty one","sixty two","sixty three","sixty four","sixty five","sixty six","sixty seven","sixty eight","sixty nine","seventy","seventy one","seventy two","seventy three","seventy four","seventy five","seventy six","seventy seven","seventy eight","seventy nine","eighty","eighty one","eighty two","eighty three","eighty four","eighty five","eighty six","eighty seven","eighty eight","eighty nine","ninety","ninety one","ninety two","ninety three","ninety four","ninety five","ninety six","ninety seven","ninety eight","ninety nine","one hundred"],i=["","first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth"];return s=s.replace(/\b(\d{1,2}):00\b/g,(n,o)=>(t[+o]||o)+" o'clock"),s=s.replace(/\b(\d{1,2}):(\d{2})\b/g,(n,o,a)=>(t[+o]||o)+" "+(e[+a]||a)),s=s.replace(/\b(\d+)(st|nd|rd|th)\b/gi,(n,o)=>i[+o]||n),s=s.replace(/\b(\d+)\b/g,n=>e[+n]!==void 0?e[+n]:n),s}_score(s,t){const e=r=>this._normalizeNums(r.toLowerCase()).replace(/[^a-z\s']/g,"").replace(/\s+/g," ").trim(),i=e(s).split(" "),n=e(t).split(" "),o=i.map((r,l)=>({word:r,correct:n[l]===r}));return{score:Math.round(o.filter(r=>r.correct).length/i.length*100),words:o}}_calcWPM(s,t){if(t<500)return 0;const e=s.trim().split(/\s+/).length,i=t/6e4;return Math.round(e/i)}_calcFluency(s,t,e,i){const n=e.trim().split(/\s+/).length,o=i.trim().split(/\s+/).length,a=Math.min(1,o/n)*100,l=Math.max(0,100-Math.abs(t-105)*1.4);return Math.round(s*.55+a*.25+l*.2)}_awardXP(s){let t=s>=80?10:s>=60?6:s>=40?3:1;this.streak>0&&this.streak%5===0&&(t+=3);const e=window._app||window.app;return e&&typeof e.addXP=="function"&&e.addXP(t,"medium","speak"),t}_histKey(){return`sv2_${this.level}_${this.idx}`}_saveToHistory(s){try{const t=this._loadFromHistory();t.push({...s,ts:Date.now()}),t.length>10&&t.splice(0,t.length-10),localStorage.setItem(this._histKey(),JSON.stringify(t))}catch(t){}}_loadFromHistory(){try{return JSON.parse(localStorage.getItem(this._histKey())||"[]")}catch(s){return[]}}_updateStats(){const s=n=>{var o;return(o=this.el)==null?void 0:o.querySelector(n)},t=s("#sv2-streak-num");t&&(t.textContent=this.streak);const e=s("#sv2-avg-num");e&&(e.textContent=this._avgScore!==null?this._avgScore+"%":"\u2014");const i=s("#sv2-count-num");i&&(i.textContent=this.sessionCount)}_updateMicState(){var o,a,r;const s=(o=this.el)==null?void 0:o.querySelector("#sv2-mic"),t=(a=this.el)==null?void 0:a.querySelector("#sv2-mic-icon");if(!s||!t)return;const e=this.el.querySelector("#sv2-r1"),i=this.el.querySelector("#sv2-r2"),n=this.el.querySelector("#sv2-r3");s.classList.remove("sv2-recording","sv2-processing"),[e,i,n].forEach(l=>l==null?void 0:l.classList.remove("sv2-ring-a1","sv2-ring-a2","sv2-ring-a3")),this.status==="recording"?(s.classList.add("sv2-recording"),e==null||e.classList.add("sv2-ring-a1"),i==null||i.classList.add("sv2-ring-a2"),n==null||n.classList.add("sv2-ring-a3"),t.innerHTML=this._micOffSvg(),s.disabled=!1):this.status==="processing"?(s.classList.add("sv2-processing"),t.innerHTML='<div class="sv2-spinner"></div>',s.disabled=!0):(t.innerHTML=this._micIconSvg(32),s.disabled=!this._isSupported);for(let l=0;l<20;l++){const d=(r=this.el)==null?void 0:r.querySelector(`#sv2-b${l}`);d&&(d.style.background=this.status==="recording"?"linear-gradient(to top,#7c3aed,#a78bfa)":"rgba(255,255,255,0.1)",d.style.boxShadow=this.status==="recording"?"0 0 4px rgba(124,58,237,0.6)":"none")}}_setStatusText(s){var o;const t=(o=this.el)==null?void 0:o.querySelector("#sv2-status");if(!t)return;const e={idle:["sv2-s-idle","Mikrofona dokun ve c\xFCmleyi s\xF6yle"],shadow:["sv2-s-shadow","\u{1F442} Dinle ve hemen arkas\u0131ndan tekrar et\u2026"],recording:["sv2-s-rec",'<span class="sv2-dot"></span> Dinleniyor\u2026 net konu\u015F'],processing:["sv2-s-proc","Ses analiz ediliyor\u2026"],error:["sv2-s-err","\u26A0\uFE0F Ses al\u0131namad\u0131. Tekrar dene."],done:["sv2-s-done",""]},[i,n]=e[s]||e.idle;t.className=`sv2-status ${i}`,t.innerHTML=n}_showScore(){var M;if(!this.result)return;const s=(M=this.el)==null?void 0:M.querySelector("#sv2-score-panel");if(!s)return;const{score:t,words:e,transcript:i,xp:n,wpm:o,fluency:a}=this.result,r=t>=80?"#10b981":t>=50?"#f59e0b":"#ef4444",l=t>=80?"M\xFCkemmel! \u{1F389}":t>=50?"\u0130yi gidiyor!":"Pratik yapmaya devam et!",d=2*Math.PI*28,u=s.querySelector("#sv2-arc");u&&(u.style.stroke=r,u.style.filter=`drop-shadow(0 0 6px ${r})`,u.style.strokeDashoffset=d-t/100*d);const y=s.querySelector("#sv2-score-num");y&&(y.textContent=t,y.style.color=r);const v=s.querySelector("#sv2-score-label");v&&(v.textContent=l,v.style.color=r);const _=s.querySelector("#sv2-xp-badge");_&&(_.textContent=`+${n} XP`,_.style.display="inline-block");const w=s.querySelector("#sv2-score-said");w&&(w.innerHTML=`S\xF6yledin: <em>"${this._esc(i)}"</em>`);const b=s.querySelector("#sv2-metrics");if(b&&o>0){const h=o>=80&&o<=140?"#10b981":o>=60?"#f59e0b":"#ef4444",c=o>=130?"\xC7ok h\u0131zl\u0131":o>=80?"\u0130yi tempo":o>=50?"Biraz yava\u015F":"\xC7ok yava\u015F",p=a>=80?"#10b981":a>=55?"#f59e0b":"#ef4444",T=a/100;b.innerHTML=`
        <div class="sv2-metric-row">
          <span class="sv2-metric-label">Ak\u0131c\u0131l\u0131k</span>
          <div class="sv2-metric-bar-wrap">
            <div class="sv2-metric-bar" style="width:${a}%;background:${p};box-shadow:0 0 6px ${p}66"></div>
          </div>
          <span class="sv2-metric-val" style="color:${p}">${a}%</span>
        </div>
        <div class="sv2-metric-row">
          <span class="sv2-metric-label">H\u0131z</span>
          <span class="sv2-metric-wpm" style="color:${h}">${o} <small>WPM</small></span>
          <span class="sv2-metric-tag" style="color:${h};border-color:${h}33">${c}</span>
        </div>
      `}const S=s.querySelector("#sv2-word-breakdown");S&&e&&(S.innerHTML=`
        <p class="sv2-bd-title">Kelime do\u011Frulu\u011Fu:</p>
        <div class="sv2-words">
          ${e.map(h=>`<span class="sv2-word ${h.correct?"ok":"no"}">${this._esc(h.word)}</span>`).join("")}
        </div>
      `);const m=s.querySelector("#sv2-playback");if(m){let h=0;const c=()=>{this._audioUrl?(m.style.display="flex",m.onclick=()=>{this._audioEl||(this._audioEl=new Audio,this._audioEl.src=this._audioUrl),this._audioEl.currentTime=0,this._audioEl.play().catch(()=>{})}):h++<15&&setTimeout(c,200)};setTimeout(c,300)}const f=s.querySelector("#sv2-sent-hist"),x=this._loadFromHistory();if(f&&x.length>1){const h=x.slice(0,-1).slice(-4);f.innerHTML=`
        <p class="sv2-sh-title">Bu c\xFCmle ge\xE7mi\u015Fi:</p>
        <div class="sv2-sh-list">
          ${h.map(c=>{const p=c.score>=80?"#10b981":c.score>=50?"#f59e0b":"#ef4444";return`<span class="sv2-sh-entry"><span class="sv2-sh-date">${c.date}</span><span class="sv2-sh-score" style="color:${p}">${c.score}%</span></span>`}).join("")}
        </div>
      `}else f&&(f.innerHTML="");const k=s.querySelector("#sv2-hist");if(k&&this.sessionScores.length>0){const h=this.sessionScores.slice(-5);k.innerHTML=`<div class="sv2-hist-dots">
        ${h.map(c=>{const p=c>=80?"#10b981":c>=50?"#f59e0b":"#ef4444";return`<span class="sv2-hist-dot" title="${c}%" style="background:${p}"></span>`}).join("")}
      </div>`}s.classList.add("visible")}_reset(){var e,i,n;this._clearTimers(),this._stopAll(),(e=window.speechSynthesis)==null||e.cancel(),this.status="idle",this.result=null,this.liveTranscript="",this._audioEl=null;const s=(i=this.el)==null?void 0:i.querySelector("#sv2-live");s&&(s.textContent="");const t=(n=this.el)==null?void 0:n.querySelector("#sv2-score-panel");t&&t.classList.remove("visible"),this._updateMicState(),this._setStatusText("idle")}_micIconSvg(s){return`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`}_micOffSvg(){return`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <line x1="1" y1="1" x2="23" y2="23"/>
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
      <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`}_esc(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}(function(){const g=()=>{const t=document.getElementById("speak-mount-point");t&&(!window.speakV2Mod||window.speakV2Mod.el!==t)&&(window.speakV2Mod=new SpeakV2Module,window.speakV2Mod.init(t))};new MutationObserver(()=>g()).observe(document.body,{childList:!0,subtree:!0}),setTimeout(g,800)})();
