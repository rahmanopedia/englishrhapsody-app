class SpeakV2Module{constructor(){var s,t;this.el=null,this._userCefr="B1",this._pool=[],this.idx=0,this.status="idle",this.result=null,this.liveTranscript="",this.isSpeaking=!1,this.speechRate=1,this.shuffleMode=!1,this.autoAdvance=!1,this.shadowMode=!1,this.sessionScores=[],this.streak=0,this.sessionCount=0,this._lowScoreMap={},this._recordStart=0,this._shadowTimer=null,this._autoTimer=null,this._recognition=null,this._animFrame=null,this._gen=0,this._isSupported=!!(window.SpeechRecognition||window.webkitSpeechRecognition||(t=(s=window.Capacitor)==null?void 0:s.Plugins)!=null&&t.NativeSpeech)}get _levelConfig(){const s={A1:{label:"Ba\u015Flang\u0131\xE7",color:"#10b981",glow:"rgba(16,185,129,0.4)"},A2:{label:"Temel",color:"#06b6d4",glow:"rgba(6,182,212,0.4)"},B1:{label:"Orta Alt\u0131",color:"#3b82f6",glow:"rgba(59,130,246,0.4)"},B2:{label:"Orta \xDCst\xFC",color:"#8b5cf6",glow:"rgba(139,92,246,0.4)"},C1:{label:"\u0130leri",color:"#f59e0b",glow:"rgba(245,158,11,0.4)"},C2:{label:"Ustala\u015Fm\u0131\u015F",color:"#ef4444",glow:"rgba(239,68,68,0.4)"}};return s[this._userCefr]||s.B1}get _sentences(){return this._pool}get _currentSentence(){return this._pool[this.idx]||""}get _avgScore(){return this.sessionScores.length?Math.round(this.sessionScores.reduce((s,t)=>s+t,0)/this.sessionScores.length):null}_sentenceLevel(s,t){const e={A1:1,A2:2,B1:3,B2:4,C1:5,C2:6},i=s.split(/\s+/),r=i.length,o=i.reduce((n,c)=>n+c.replace(/[^a-z]/gi,"").length,0)/r,h=e[t]||3,a=r*.5+o*.3+h*2.2;return a<7?"A1":a<11?"A2":a<15?"B1":a<19?"B2":a<23?"C1":"C2"}_buildPool(s){if(typeof WORDS=="undefined")return;const t=["A1","A2","B1","B2","C1","C2"],e=t.indexOf(s),i=o=>WORDS.filter(h=>h.level===o&&h.ex&&h.ex.trim().split(/\s+/).length>=4).filter(h=>{const a=this._sentenceLevel(h.ex.trim(),h.level);return t.indexOf(a)<=e}).map(h=>h.ex.trim());let r=i(s);r.length<20&&(e>0&&(r=r.concat(i(t[e-1]))),e<t.length-1&&(r=r.concat(i(t[e+1])))),this._pool=[...new Set(r)].sort(()=>Math.random()-.5)}async init(s){var t,e;this.el=s,this._userCefr=((e=(t=window._app)==null?void 0:t.state)==null?void 0:e.get("cefrLevel"))||"B1",this._buildPool(this._userCefr),this._render()}_render(){if(!this.el)return;const s=this._levelConfig,t=2*Math.PI*28;this.el.innerHTML=`
      <div class="sv2-wrap">

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
          <span class="sv2-cefr-pill" style="background:${s.color}20;color:${s.color};border:1px solid ${s.color}44">${this._userCefr||"B1"} \u2014 ${s.label}</span>
          <span class="sv2-stat-sep">\xB7</span>
          <span class="sv2-stat">\u{1F525} <strong id="sv2-streak-num">${this.streak}</strong></span>
          <span class="sv2-stat-sep">\xB7</span>
          <span class="sv2-stat">\u{1F4CA} <strong id="sv2-avg-num">${this._avgScore!==null?this._avgScore+"%":"\u2014"}</strong></span>
          <span class="sv2-stat-sep">\xB7</span>
          <span class="sv2-stat">\u2705 <strong id="sv2-count-num">${this.sessionCount}</strong></span>
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
            C\xFCmle <strong id="sv2-idx-num" style="color:${s.color}">${this.idx+1}</strong>
            / <span style="color:#f1f5f9">${this._pool.length}</span>
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
            ${Array.from({length:20},(e,i)=>`<div class="sv2-bar" id="sv2-b${i}"></div>`).join("")}
          </div>

          <div class="sv2-status" id="sv2-status">Mikrofona dokun ve c\xFCmleyi s\xF6yle</div>

          <div class="sv2-score-panel" id="sv2-score-panel">
            <!-- Accuracy ring + label + XP -->
            <div class="sv2-score-card">
              <div class="sv2-ring-wrap">
                <svg width="72" height="72" viewBox="0 0 72 72" style="display:block">
                  <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4"/>
                  <circle id="sv2-arc" cx="36" cy="36" r="28" fill="none" stroke="#10b981" stroke-width="4"
                    stroke-linecap="round" stroke-dasharray="${t}" stroke-dashoffset="${t}"
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
    `,this._applyLevelStyle(),this._bindEvents()}_applyLevelStyle(){var e;const s=this._levelConfig,t=(e=this.el)==null?void 0:e.querySelector("#sv2-card");t&&(t.style.boxShadow=`0 0 40px ${s.glow.replace("0.4","0.12")}, inset 0 1px 0 rgba(255,255,255,0.06)`)}_bindEvents(){var t,e,i,r,o,h,a,n,c,l,d;if(!this.el)return;const s=v=>this.el.querySelector(v);(t=s("#sv2-t-shuffle"))==null||t.addEventListener("click",()=>{this.shuffleMode=!this.shuffleMode,s("#sv2-t-shuffle").classList.toggle("on",this.shuffleMode)}),(e=s("#sv2-t-auto"))==null||e.addEventListener("click",()=>{this.autoAdvance=!this.autoAdvance,s("#sv2-t-auto").classList.toggle("on",this.autoAdvance)}),(i=s("#sv2-t-shadow"))==null||i.addEventListener("click",()=>{this.shadowMode=!this.shadowMode,s("#sv2-t-shadow").classList.toggle("on",this.shadowMode),this.shadowMode&&this.status==="idle"&&this._startShadow()}),(r=s("#sv2-prev"))==null||r.addEventListener("click",()=>this._prev()),(o=s("#sv2-next"))==null||o.addEventListener("click",()=>this._next()),(h=s("#sv2-play"))==null||h.addEventListener("click",()=>this._speak(1)),(a=s("#sv2-slow"))==null||a.addEventListener("click",()=>{this.speechRate=.6,this._speak(.6)}),(n=s("#sv2-repeat"))==null||n.addEventListener("click",()=>this._speak(this.speechRate)),(c=s("#sv2-mic"))==null||c.addEventListener("click",()=>this._toggleRecord()),(l=s("#sv2-try-again"))==null||l.addEventListener("click",()=>this._reset()),(d=s("#sv2-next-score"))==null||d.addEventListener("click",()=>this._next())}_prev(){var s;this._clearTimers(),this._stopAll(),(s=window.speechSynthesis)==null||s.cancel(),this.idx=Math.max(0,this.idx-1),this.status="idle",this.result=null,this.liveTranscript="",this._audioUrl=null,this._audioEl=null,this._updateSentenceUI()}_next(){var s;this._clearTimers(),this._stopAll(),(s=window.speechSynthesis)==null||s.cancel(),this.idx=this.shuffleMode?this._shuffleNextIdx():Math.min(this.idx+1,this._sentences.length-1),this.status="idle",this.result=null,this.liveTranscript="",this._audioUrl=null,this._audioEl=null,this._updateSentenceUI(),this.shadowMode&&this._startShadow()}_shuffleNextIdx(){const s=this._sentences.length;if(s<=1)return 0;const t=Object.entries(this._lowScoreMap).filter(([i,r])=>Number(i)!==this.idx&&r<60).map(([i])=>Number(i));if(t.length&&Math.random()<.4)return t[Math.floor(Math.random()*t.length)];let e;do e=Math.floor(Math.random()*s);while(e===this.idx);return e}_updateSentenceUI(){const s=this._levelConfig,t=a=>{var n;return(n=this.el)==null?void 0:n.querySelector(a)},e=t("#sv2-sentence");e&&(e.textContent=`"${this._currentSentence}"`);const i=t("#sv2-idx-num");i&&(i.textContent=this.idx+1,i.style.color=s.color);const r=t("#sv2-prev");r&&(r.disabled=this.idx===0&&!this.shuffleMode);const o=t("#sv2-live");o&&(o.textContent="");const h=t("#sv2-score-panel");h&&h.classList.remove("visible"),this._applyLevelStyle(),this._updateMicState(),this._setStatusText("idle")}_startShadow(){this._shadowTimer&&(clearTimeout(this._shadowTimer),this._shadowTimer=null),this._setStatusText("shadow"),this._speak(1,()=>{this._shadowTimer=setTimeout(()=>{this._shadowTimer=null,this.status==="idle"&&this._startRecording()},600)})}_speak(s,t){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const e=new SpeechSynthesisUtterance(this._currentSentence);e.lang="en-US",e.rate=s,e.onstart=()=>{this.isSpeaking=!0},e.onend=()=>{this.isSpeaking=!1,t&&t()},e.onerror=()=>{this.isSpeaking=!1},window.speechSynthesis.speak(e)}_toggleRecord(){this.status==="recording"?this._stopRecording():(this._reset(),this._startRecording())}_startRecording(){var r,o,h;const s=(o=(r=window.Capacitor)==null?void 0:r.Plugins)==null?void 0:o.NativeSpeech,t=window.SpeechRecognition||window.webkitSpeechRecognition;if(!s&&!t)return;this._gen=(this._gen||0)+1;const e=this._gen;if(this.result=null,this.liveTranscript="",this.status="recording",this._recordStart=Date.now(),this._updateMicState(),this._setStatusText("recording"),s){s.removeAllListeners().catch(()=>{}),this._recognition={stop:()=>s.stop().catch(()=>{}),_native:!0};const a=n=>{var l;const c=(l=this.el)==null?void 0:l.querySelector("#sv2-status");c&&(c.className="sv2-status sv2-s-err",c.innerHTML=n)};Promise.all([s.addListener("partial",n=>{var l;if(this._gen!==e)return;this.liveTranscript=n.text;const c=(l=this.el)==null?void 0:l.querySelector("#sv2-live");c&&(c.textContent=`"${n.text}"`)}),s.addListener("result",n=>{var l;if(this._gen!==e)return;this.liveTranscript=n.text;const c=(l=this.el)==null?void 0:l.querySelector("#sv2-live");c&&(c.textContent=`"${n.text}"`)}),s.addListener("error",n=>{if(this._gen!==e)return;this._gen++,s.removeAllListeners(),this._cleanupRec(),a({"not-allowed":"\u26A0\uFE0F Mikrofon izni reddedildi.","no-speech":"Ses alg\u0131lanamad\u0131. Tekrar dene.",network:"\u26A0\uFE0F \u0130nternet ba\u011Flant\u0131s\u0131 gerekli.",busy:"\u26A0\uFE0F Mikrofon ba\u015Fka uygulama taraf\u0131ndan kullan\u0131l\u0131yor."}[n.code]||"\u26A0\uFE0F Hata: "+n.code)}),s.addListener("end",()=>{if(this._gen!==e)return;const n=e,c=Date.now()-this._recordStart,l=this.liveTranscript.trim();if(s.removeAllListeners(),this._cleanupRec(),!l){this._setStatusText("idle");return}this.status="processing",this._updateMicState(),this._setStatusText("processing"),setTimeout(()=>{if(this._gen!==n)return;const d=this._score(this._currentSentence,l),v=this._calcWPM(l,c),p=this._calcFluency(d.score,v,this._currentSentence,l);this.result={transcript:l,wpm:v,fluency:p,...d},this.status="done",this.sessionScores.push(d.score),this.sessionScores.length>20&&this.sessionScores.shift(),this.sessionCount++,this.streak=d.score>=60?this.streak+1:0;const g=this._lowScoreMap[this.idx];(g===void 0||d.score<g)&&(this._lowScoreMap[this.idx]=d.score);const _=this._awardXP(d.score);this.result.xp=_,this._saveToHistory({score:d.score,wpm:v,fluency:p,date:new Date().toLocaleDateString("tr-TR",{day:"numeric",month:"short"})}),this._updateMicState(),this._setStatusText("done"),this._updateStats(),this._showScore(),this.autoAdvance&&d.score>=80&&(this._autoTimer=setTimeout(()=>this._next(),2e3))},400)})]).then(()=>s.start().catch(n=>{this._gen++,s.removeAllListeners(),this._cleanupRec(),a("\u26A0\uFE0F Mikrofon ba\u015Flat\u0131lamad\u0131: "+n.message)}));return}const i=new t;this._recognition=i,i.lang="en-US",i.continuous=!1,i.interimResults=!0,i.maxAlternatives=1,i.onresult=a=>{var d;if(this._gen!==e)return;let n="",c="";for(let v=a.resultIndex;v<a.results.length;v++){const p=a.results[v][0].transcript;a.results[v].isFinal?c+=p:n+=p}this.liveTranscript=c||n;const l=(d=this.el)==null?void 0:d.querySelector("#sv2-live");l&&this.liveTranscript&&(l.textContent=`"${this.liveTranscript}"`)},i.onerror=a=>{var d;if(this._gen!==e)return;this._gen++,this._cleanupRec();const n={"not-allowed":"\u26A0\uFE0F Mikrofon izni gerekli. Adres \xE7ubu\u011Fundaki kilit ikonuna t\u0131kla \u2192 Mikrofon \u2192 \u0130zin ver.","no-speech":"Ses alg\u0131lanamad\u0131. Tekrar dene.","audio-capture":"\u26A0\uFE0F Mikrofon bulunamad\u0131 veya ba\u015Fka uygulama kullan\u0131yor.",network:"\u26A0\uFE0F \u0130nternet ba\u011Flant\u0131s\u0131 gerekli.",aborted:""},c=(d=this.el)==null?void 0:d.querySelector("#sv2-status"),l=n[a.error];c&&l!==void 0?(c.className="sv2-status sv2-s-err",c.innerHTML=l):c&&(c.className="sv2-status sv2-s-err",c.innerHTML="\u26A0\uFE0F Hata: "+a.error)},i.onend=()=>{if(this._gen!==e)return;const a=Date.now()-this._recordStart,n=this.liveTranscript.trim();if(this._cleanupRec(),!n){this._setStatusText("idle");return}this.status="processing",this._updateMicState(),this._setStatusText("processing");const c=this._gen;setTimeout(()=>{if(this._gen!==c)return;const l=this._score(this._currentSentence,n),d=this._calcWPM(n,a),v=this._calcFluency(l.score,d,this._currentSentence,n);this.result={transcript:n,wpm:d,fluency:v,...l},this.status="done",this.sessionScores.push(l.score),this.sessionScores.length>20&&this.sessionScores.shift(),this.sessionCount++,this.streak=l.score>=60?this.streak+1:0;const p=this._lowScoreMap[this.idx];(p===void 0||l.score<p)&&(this._lowScoreMap[this.idx]=l.score);const g=this._awardXP(l.score);this.result.xp=g,this._saveToHistory({score:l.score,wpm:d,fluency:v,date:new Date().toLocaleDateString("tr-TR",{day:"numeric",month:"short"})}),this._updateMicState(),this._setStatusText("done"),this._updateStats(),this._showScore(),this.autoAdvance&&l.score>=80&&(this._autoTimer=setTimeout(()=>this._next(),2e3))},400)};try{i.start()}catch(a){this._gen++,this._cleanupRec();const n=(h=this.el)==null?void 0:h.querySelector("#sv2-status");n&&(n.className="sv2-status sv2-s-err",n.innerHTML="\u26A0\uFE0F Mikrofon ba\u015Flat\u0131lamad\u0131: "+a.message);return}this._startWaveform()}_stopRecording(){if(this._recognition)try{this._recognition.stop()}catch(s){}}_cleanupRec(){if(this._recognition){try{this._recognition.stop()}catch(s){}this._recognition=null}this._animFrame&&(clearTimeout(this._animFrame),this._animFrame=null),this._resetBars(),this.status="idle",this._updateMicState()}_stopAll(){if(this._recognition){try{this._recognition.stop()}catch(s){}this._recognition=null}this._animFrame&&(clearTimeout(this._animFrame),this._animFrame=null),this._gen=(this._gen||0)+1,this._resetBars()}_clearTimers(){this._shadowTimer&&(clearTimeout(this._shadowTimer),this._shadowTimer=null),this._autoTimer&&(clearTimeout(this._autoTimer),this._autoTimer=null)}_resetBars(){var s;for(let t=0;t<20;t++){const e=(s=this.el)==null?void 0:s.querySelector(`#sv2-b${t}`);e&&(e.style.height="4px",e.style.background="rgba(255,255,255,0.1)",e.style.boxShadow="none")}}_startWaveform(){var e;const s=[];for(let i=0;i<20;i++){const r=(e=this.el)==null?void 0:e.querySelector(`#sv2-b${i}`);r&&s.push(r)}const t=()=>{if(this.status==="recording"){for(const i of s)i.style.height=`${4+Math.random()*36}px`;this._animFrame=setTimeout(t,100)}};t()}_normalizeNums(s){const t=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"],e=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","twenty one","twenty two","twenty three","twenty four","twenty five","twenty six","twenty seven","twenty eight","twenty nine","thirty","thirty one","thirty two","thirty three","thirty four","thirty five","thirty six","thirty seven","thirty eight","thirty nine","forty","forty one","forty two","forty three","forty four","forty five","forty six","forty seven","forty eight","forty nine","fifty","fifty one","fifty two","fifty three","fifty four","fifty five","fifty six","fifty seven","fifty eight","fifty nine","sixty","sixty one","sixty two","sixty three","sixty four","sixty five","sixty six","sixty seven","sixty eight","sixty nine","seventy","seventy one","seventy two","seventy three","seventy four","seventy five","seventy six","seventy seven","seventy eight","seventy nine","eighty","eighty one","eighty two","eighty three","eighty four","eighty five","eighty six","eighty seven","eighty eight","eighty nine","ninety","ninety one","ninety two","ninety three","ninety four","ninety five","ninety six","ninety seven","ninety eight","ninety nine","one hundred"],i=["","first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth"];return s=s.replace(/\b(\d{1,2}):00\b/g,(r,o)=>(t[+o]||o)+" o'clock"),s=s.replace(/\b(\d{1,2}):(\d{2})\b/g,(r,o,h)=>(t[+o]||o)+" "+(e[+h]||h)),s=s.replace(/\b(\d+)(st|nd|rd|th)\b/gi,(r,o)=>i[+o]||r),s=s.replace(/\b(\d+)\b/g,r=>e[+r]!==void 0?e[+r]:r),s}_score(s,t){const e=a=>this._normalizeNums(a.toLowerCase()).replace(/[^a-z\s']/g,"").replace(/\s+/g," ").trim(),i=e(s).split(" "),r=e(t).split(" "),o=i.map((a,n)=>({word:a,correct:r[n]===a}));return{score:Math.round(o.filter(a=>a.correct).length/i.length*100),words:o}}_calcWPM(s,t){if(t<500)return 0;const e=s.trim().split(/\s+/).length,i=t/6e4;return Math.round(e/i)}_calcFluency(s,t,e,i){const r=e.trim().split(/\s+/).length,o=i.trim().split(/\s+/).length,h=Math.min(1,o/r)*100,n=Math.max(0,100-Math.abs(t-105)*1.4);return Math.round(s*.55+h*.25+n*.2)}_awardXP(s){let t=s>=80?10:s>=60?6:s>=40?3:1;this.streak>0&&this.streak%5===0&&(t+=3);const e=window._app||window.app;return e&&typeof e.addXP=="function"&&e.addXP(t,"medium","speak"),t}_histKey(){return`sv2_${this._userCefr}_${this.idx}`}_saveToHistory(s){try{const t=this._loadFromHistory();t.push({...s,ts:Date.now()}),t.length>10&&t.splice(0,t.length-10),localStorage.setItem(this._histKey(),JSON.stringify(t))}catch(t){}}_loadFromHistory(){try{return JSON.parse(localStorage.getItem(this._histKey())||"[]")}catch(s){return[]}}_updateStats(){const s=r=>{var o;return(o=this.el)==null?void 0:o.querySelector(r)},t=s("#sv2-streak-num");t&&(t.textContent=this.streak);const e=s("#sv2-avg-num");e&&(e.textContent=this._avgScore!==null?this._avgScore+"%":"\u2014");const i=s("#sv2-count-num");i&&(i.textContent=this.sessionCount)}_updateMicState(){var o,h,a;const s=(o=this.el)==null?void 0:o.querySelector("#sv2-mic"),t=(h=this.el)==null?void 0:h.querySelector("#sv2-mic-icon");if(!s||!t)return;const e=this.el.querySelector("#sv2-r1"),i=this.el.querySelector("#sv2-r2"),r=this.el.querySelector("#sv2-r3");s.classList.remove("sv2-recording","sv2-processing"),[e,i,r].forEach(n=>n==null?void 0:n.classList.remove("sv2-ring-a1","sv2-ring-a2","sv2-ring-a3")),this.status==="recording"?(s.classList.add("sv2-recording"),e==null||e.classList.add("sv2-ring-a1"),i==null||i.classList.add("sv2-ring-a2"),r==null||r.classList.add("sv2-ring-a3"),t.innerHTML=this._micOffSvg(),s.disabled=!1):this.status==="processing"?(s.classList.add("sv2-processing"),t.innerHTML='<div class="sv2-spinner"></div>',s.disabled=!0):(t.innerHTML=this._micIconSvg(32),s.disabled=!this._isSupported);for(let n=0;n<20;n++){const c=(a=this.el)==null?void 0:a.querySelector(`#sv2-b${n}`);c&&(c.style.background=this.status==="recording"?"linear-gradient(to top,#7c3aed,#a78bfa)":"rgba(255,255,255,0.1)",c.style.boxShadow=this.status==="recording"?"0 0 4px rgba(124,58,237,0.6)":"none")}}_setStatusText(s){var o;const t=(o=this.el)==null?void 0:o.querySelector("#sv2-status");if(!t)return;const e={idle:["sv2-s-idle","Mikrofona dokun ve c\xFCmleyi s\xF6yle"],shadow:["sv2-s-shadow","\u{1F442} Dinle ve hemen arkas\u0131ndan tekrar et\u2026"],recording:["sv2-s-rec",'<span class="sv2-dot"></span> Dinleniyor\u2026 net konu\u015F'],processing:["sv2-s-proc","Ses analiz ediliyor\u2026"],error:["sv2-s-err","\u26A0\uFE0F Ses al\u0131namad\u0131. Tekrar dene."],done:["sv2-s-done",""]},[i,r]=e[s]||e.idle;t.className=`sv2-status ${i}`,t.innerHTML=r}_showScore(){var M;if(!this.result)return;const s=(M=this.el)==null?void 0:M.querySelector("#sv2-score-panel");if(!s)return;const{score:t,words:e,transcript:i,xp:r,wpm:o,fluency:h}=this.result,a=t>=80?"#10b981":t>=50?"#f59e0b":"#ef4444",n=t>=80?"M\xFCkemmel! \u{1F389}":t>=50?"\u0130yi gidiyor!":"Pratik yapmaya devam et!",c=2*Math.PI*28,l=s.querySelector("#sv2-arc");l&&(l.style.stroke=a,l.style.filter=`drop-shadow(0 0 6px ${a})`,l.style.strokeDashoffset=c-t/100*c);const d=s.querySelector("#sv2-score-num");d&&(d.textContent=t,d.style.color=a);const v=s.querySelector("#sv2-score-label");v&&(v.textContent=n,v.style.color=a);const p=s.querySelector("#sv2-xp-badge");p&&(p.textContent=`+${r} XP`,p.style.display="inline-block");const g=s.querySelector("#sv2-score-said");g&&(g.innerHTML=`S\xF6yledin: <em>"${this._esc(i)}"</em>`);const _=s.querySelector("#sv2-metrics");if(_&&o===0)_.innerHTML='<p class="sv2-retry-hint">Konu\u015Fma alg\u0131lanamad\u0131 \u2014 tekrar dene</p>';else if(_&&o>0){const f=o>=80&&o<=140?"#10b981":o>=60?"#f59e0b":"#ef4444",u=o>=130?"\xC7ok h\u0131zl\u0131":o>=80?"\u0130yi tempo":o>=50?"Biraz yava\u015F":"\xC7ok yava\u015F",y=h>=80?"#10b981":h>=55?"#f59e0b":"#ef4444",T=h/100;_.innerHTML=`
        <div class="sv2-metric-row">
          <span class="sv2-metric-label">Ak\u0131c\u0131l\u0131k</span>
          <div class="sv2-metric-bar-wrap">
            <div class="sv2-metric-bar" style="width:${h}%;background:${y};box-shadow:0 0 6px ${y}66"></div>
          </div>
          <span class="sv2-metric-val" style="color:${y}">${h}%</span>
        </div>
        <div class="sv2-metric-row">
          <span class="sv2-metric-label">H\u0131z</span>
          <span class="sv2-metric-wpm" style="color:${f}">${o} <small>WPM</small></span>
          <span class="sv2-metric-tag" style="color:${f};border-color:${f}33">${u}</span>
        </div>
      `}const S=s.querySelector("#sv2-word-breakdown");S&&e&&(S.innerHTML=`
        <p class="sv2-bd-title">Kelime do\u011Frulu\u011Fu:</p>
        <div class="sv2-words">
          ${e.map(f=>`<span class="sv2-word ${f.correct?"ok":"no"}">${this._esc(f.word)}</span>`).join("")}
        </div>
      `);const b=s.querySelector("#sv2-playback");if(b){let f=0;const u=()=>{this._audioUrl?(b.style.display="flex",b.onclick=()=>{this._audioEl||(this._audioEl=new Audio,this._audioEl.src=this._audioUrl),this._audioEl.currentTime=0,this._audioEl.play().catch(()=>{})}):f++<15&&setTimeout(u,200)};setTimeout(u,300)}const m=s.querySelector("#sv2-sent-hist"),x=this._loadFromHistory();if(m&&x.length>1){const f=x.slice(0,-1).slice(-4);m.innerHTML=`
        <p class="sv2-sh-title">Bu c\xFCmle ge\xE7mi\u015Fi:</p>
        <div class="sv2-sh-list">
          ${f.map(u=>{const y=u.score>=80?"#10b981":u.score>=50?"#f59e0b":"#ef4444";return`<span class="sv2-sh-entry"><span class="sv2-sh-date">${u.date}</span><span class="sv2-sh-score" style="color:${y}">${u.score}%</span></span>`}).join("")}
        </div>
      `}else m&&(m.innerHTML="");const k=s.querySelector("#sv2-hist");if(k&&this.sessionScores.length>0){const f=this.sessionScores.slice(-5);k.innerHTML=`<div class="sv2-hist-dots">
        ${f.map(u=>{const y=u>=80?"#10b981":u>=50?"#f59e0b":"#ef4444";return`<span class="sv2-hist-dot" title="${u}%" style="background:${y}"></span>`}).join("")}
      </div>`}s.classList.add("visible")}_reset(){var e,i,r;this._clearTimers(),this._stopAll(),(e=window.speechSynthesis)==null||e.cancel(),this.status="idle",this.result=null,this.liveTranscript="",this._audioEl=null;const s=(i=this.el)==null?void 0:i.querySelector("#sv2-live");s&&(s.textContent="");const t=(r=this.el)==null?void 0:r.querySelector("#sv2-score-panel");t&&t.classList.remove("visible"),this._updateMicState(),this._setStatusText("idle")}_micIconSvg(s){return`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`}_micOffSvg(){return`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <line x1="1" y1="1" x2="23" y2="23"/>
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
      <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
    </svg>`}_esc(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}}(function(){const w=()=>{const t=document.getElementById("speak-mount-point");t&&(!window.speakV2Mod||window.speakV2Mod.el!==t)&&(window.speakV2Mod=new SpeakV2Module,window.speakV2Mod.init(t))};new MutationObserver(()=>w()).observe(document.body,{childList:!0,subtree:!0}),setTimeout(w,800)})();
