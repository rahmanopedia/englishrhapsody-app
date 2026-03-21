"use strict";const PH_MODES={phantom:{label:"\u{1F32B}\uFE0F Phantom",desc:"1.2s t\xFCm\xFC birden \xB7 Zor",imprintMs:1200,xp:40,allAtOnce:!0}},PH_CEFR_LEVELS=["A1","A2","B1","B2","C1","C2"],_wait=g=>new Promise(t=>setTimeout(t,g));class PhantomMode{constructor(t){this.app=t,this.root=null,this.mode="phantom",this.sessLen=10,this.cefrFilter=[],this.queue=[],this.idx=0,this.score=0,this.combo=0,this.phase="intro",this.typed=[],this.word=null,this.aborted=!1,this.hintsLeft=3,this.errorCount=0,this.perfectWords=0,this.missedWords=[],this._kbHandler=null,this._coolTimer=null,this._neuralRaf=null,this._coolLevel=0}init(t){var s;this.root=t,this.root.addEventListener("click",e=>this._onClick(e)),(s=window.analyticsManager)==null||s.lessonStart("phantom"),this._showIntro()}_onClick(e){const t=e.target.closest("[data-ph-action]");if(!t)return;switch(t.dataset.phAction){case"set-len":this._setLen(+t.dataset.len,t);break;case"start-session":this._startSession();break;case"nav-learn":this.app.navigate("learn");break;case"confirm-exit":this._confirmExit();break;case"hint":this._hint(t.dataset.hint);break;case"skip-word":this._skipWord();break;case"type-char":this._typeChar(t.dataset.char);break;case"backspace":this._backspace();break;case"speak":this.app.speakWord(t.dataset.word);break;}}destroy(){this.aborted=!0,this._stopCool(),this._stopNeural(),this._kbHandler&&document.removeEventListener("keydown",this._kbHandler),this._kbHandler=null,window.phantomMod=null}_showIntro(){this.phase="intro",this.root.innerHTML=`
      <div class="ph-intro">

        <div class="ph-intro-logo">
          <div class="ph-ghost-orb">
            <div class="ph-ghost-ring"></div>
            <div class="ph-ghost-ring ph-ring2"></div>
            <div class="ph-ghost-ring ph-ring3"></div>
            <canvas class="ph-orb-canvas" id="ph-orb-canvas" width="88" height="88"></canvas>
            <span class="ph-ghost-glyph">\u{1F32B}\uFE0F</span>
          </div>
          <h1 class="ph-title">PHANTOM <span class="ph-title-ink">INK</span>
            <span class="ph-v2-badge">v2.0</span>
          </h1>
          <p class="ph-tagline">G\xF6r\xFCnmez M\xFCrekkep Haf\u0131zas\u0131 \xB7 Temporal Recall Sistemi</p>
        </div>

        <div class="ph-how">
          <div class="ph-how-step">
            <span class="ph-step-num">1</span>
            <span>Kelime <strong>alt\u0131n \u0131\u015F\u0131kla</strong> harf harf yan\u0131p s\xF6ner \u2014 sesini de duyars\u0131n.</span>
          </div>
          <div class="ph-how-step">
            <span class="ph-step-num">2</span>
            <span>I\u015F\u0131k <strong>s\xF6ner</strong>. Sadece bo\u015F slotlar kal\u0131r. Hi\xE7bir \u015Fey g\xF6r\xFCnmez.</span>
          </div>
          <div class="ph-how-step">
            <span class="ph-step-num">3</span>
            <span>Kelimeyi <strong>haf\u0131zandan yaz</strong> \u2014 her do\u011Fru harf kristal gibi patlar.</span>
          </div>
          <div class="ph-how-step">
            <span class="ph-step-num ph-step-hint">\u{1F4A1}</span>
            <span>3 <strong>ipucu hakk\u0131n</strong> var. \u0130pucu kullanmak XP'i yar\u0131ya indirir.</span>
          </div>
        </div>

        <div class="ph-config">

          <div class="ph-config-row">
            <span class="ph-config-label">Kelime Say\u0131s\u0131</span>
            <div class="ph-len-btns">
              ${[5,10,20].map(t=>`<button class="ph-len-btn ${t===10?"active":""}"
                         data-ph-action="set-len" data-len="${t}">${t}</button>`).join("")}
            </div>
          </div>


        </div>

        <button class="ph-start-btn" data-ph-action="start-session">
          <span class="ph-start-icon">\u{1F32B}\uFE0F</span> BA\u015ELAT \u2014 I\u015EI\u011EI S\xD6ND\xDCR
        </button>

        <button class="ph-back-btn" data-ph-action="nav-learn">\u2190 Ana Merkez</button>
      </div>`,this._animOrbCanvas()}_animOrbCanvas(){const t=document.getElementById("ph-orb-canvas");if(!t)return;const s=t.getContext("2d");let e=0;const a=()=>{if(document.getElementById("ph-orb-canvas")){s.clearRect(0,0,88,88);for(let i=0;i<6;i++){const o=e*.6+i*Math.PI*2/6,n=28+6*Math.sin(e*1.2+i),h=44+Math.cos(o)*n,d=44+Math.sin(o)*n,m=s.createRadialGradient(h,d,0,h,d,6);m.addColorStop(0,"rgba(167,139,250,0.7)"),m.addColorStop(1,"rgba(167,139,250,0)"),s.fillStyle=m,s.beginPath(),s.arc(h,d,6,0,Math.PI*2),s.fill()}e+=.03,requestAnimationFrame(a)}};requestAnimationFrame(a)}_setMode(t,s){this.mode=t,document.querySelectorAll(".ph-mode-btn").forEach(e=>e.classList.remove("active")),s.classList.add("active")}_setLen(t,s){this.sessLen=t,document.querySelectorAll(".ph-len-btn").forEach(e=>e.classList.remove("active")),s.classList.add("active")}_startSession(){const t=this.app.state.get("mastery")||{},s=Date.now();let e=WORDS.filter(n=>!(!n.en||!n.tr||this.cefrFilter.length&&!this.cefrFilter.includes(n.level)));const a=e.filter(n=>{const h=t[n.id];return h&&h.score>0&&h.score<5&&(h.nextReview||0)<=s}),i=e.filter(n=>!t[n.id]||t[n.id].score===0),o=e.filter(n=>{const h=t[n.id];return h&&h.score>=5});e=[...a,...i,...o];for(let n=e.length-1;n>0;n--){const h=Math.floor(Math.random()*(n+1));[e[n],e[h]]=[e[h],e[n]]}if(this.queue=e.slice(0,this.sessLen),this.idx=0,this.score=0,this.combo=0,this.hintsLeft=3,this.perfectWords=0,this.missedWords=[],!this.queue.length){UI.toast("Bu filtrelerle kelime bulunamad\u0131!");return}this._renderChamber(),this._nextWord()}_renderChamber(){this.root.innerHTML=`
      <div class="ph-chamber" id="ph-chamber">

        <canvas class="ph-neural-canvas" id="ph-neural-canvas"></canvas>

        <div class="ph-screen-flash" id="ph-flash"></div>

        <div class="ph-topbar">
          <button class="ph-exit" data-ph-action="confirm-exit">\u2190 \xC7\u0131k</button>
          <div class="ph-progress-wrap">
            <span class="ph-counter" id="ph-counter">1/${this.queue.length}</span>
            <div class="ph-prog-track">
              <div class="ph-prog-fill" id="ph-prog-fill" style="width:0%"></div>
            </div>
          </div>
          <div class="ph-topbar-right">
            <span class="ph-combo" id="ph-combo" style="display:none">\u{1F525}\xD7<span id="ph-combo-val">1</span></span>
            <span class="ph-score-chip" id="ph-score">0 XP</span>
          </div>
        </div>

        <div class="ph-word-info" id="ph-word-info" style="opacity:0"></div>

        <div class="ph-stage" id="ph-stage">
          <div class="ph-fog" id="ph-fog"></div>

          <div class="ph-letters-wrap" id="ph-letters-wrap">
            <div class="ph-letters" id="ph-letters"></div>
          </div>

          <div class="ph-status" id="ph-status"></div>

          <div class="ph-meta" id="ph-meta" style="opacity:0">
            <div class="ph-translation" id="ph-translation"></div>
            <div class="ph-ipa" id="ph-ipa"></div>
            <div class="ph-example" id="ph-example"></div>
            
            <div class="ph-syns" id="ph-syns"></div>
          </div>
        </div>

        <div class="ph-hint-row" id="ph-hint-row">
          <button class="ph-hint-btn" id="ph-hint-first" data-ph-action="hint" data-hint="first" title="\u0130lk harfi g\xF6ster">
            \u{1F4A1} \u0130lk Harf
          </button>
          <button class="ph-hint-btn" id="ph-hint-mid" data-ph-action="hint" data-hint="mid" title="Orta harfi g\xF6ster">
            \u{1F4A1} Orta
          </button>
          <button class="ph-hint-btn" id="ph-hint-all" data-ph-action="hint" data-hint="all" title="Hepsini g\xF6ster (-50% XP)">
            \u{1F4A1} T\xFCm\xFC <span class="ph-hint-penalty">\u221250%</span>
          </button>
          <span class="ph-hints-left" id="ph-hints-left">\u{1F4A1} ${this.hintsLeft} hak</span>
        </div>

        <div class="ph-footer">
          <span class="ph-mode-label">${PH_MODES[this.mode].label}</span>
          <button class="ph-skip" data-ph-action="skip-word">Bilmiyorum \u23ED</button>
        </div>

        <div class="ph-vkb" id="ph-vkb" style="display:none"></div>

      </div>`,this._bindKeys(),this._setupNeural(),this._checkMobile()}_bindKeys(){this._kbHandler&&document.removeEventListener("keydown",this._kbHandler),this._kbHandler=t=>{if(!this.aborted){if(t.key==="Escape"){t.preventDefault(),this._confirmExit();return}if(this.phase==="recall"){if(t.key==="Backspace"){t.preventDefault(),this._backspace();return}if(t.key===" "){t.preventDefault(),this._typeChar(" ");return}t.key.length===1&&/[a-zA-Z]/.test(t.key)&&(t.preventDefault(),this._typeChar(t.key.toLowerCase()))}}},document.addEventListener("keydown",this._kbHandler)}_checkMobile(){const t=document.getElementById("ph-vkb");t&&(window.innerWidth<=820||"ontouchstart"in window)&&(t.style.display="flex",t._tsBound||(t._tsBound=!0,t.addEventListener("touchstart",e=>e.stopPropagation(),{passive:!1})),this._buildVKB(t))}_buildVKB(t){const s=["qwertyuiop","asdfghjkl","zxcvbnm"];t.innerHTML=s.map(e=>`<div class="ph-vkb-row">${e.split("").map(a=>`<button class="ph-key" id="phk-${a}" data-ph-action="type-char" data-char="${a}">${a.toUpperCase()}</button>`).join("")}</div>`).join("")+`<div class="ph-vkb-row">
       <button class="ph-key ph-key-space" data-ph-action="type-char" data-char=" ">SPACE</button>
       <button class="ph-key ph-key-bs" data-ph-action="backspace">\u232B</button>
     </div>`}_vkbFlash(t,s){const e=document.getElementById(`phk-${t}`);e&&(e.classList.remove("ph-key-ok","ph-key-err"),e.classList.add(s?"ph-key-ok":"ph-key-err"),setTimeout(()=>e.classList.remove("ph-key-ok","ph-key-err"),600))}_setupNeural(){const t=document.getElementById("ph-neural-canvas");t&&(t.width=t.offsetWidth||window.innerWidth,t.height=t.offsetHeight||window.innerHeight,this._neuralCanvas=t,this._neuralCtx=t.getContext("2d"),this._neuralLines=Array.from({length:12},()=>({x:Math.random()*t.width,y:Math.random()*t.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,len:40+Math.random()*80,alpha:0})),this._neuralActive=!1)}_startNeural(){this._neuralActive=!0;const t=()=>{if(!this._neuralActive||!this._neuralCtx)return;const s=this._neuralCtx,e=this._neuralCanvas.width,a=this._neuralCanvas.height;s.clearRect(0,0,e,a);for(const i of this._neuralLines){i.x+=i.vx,i.y+=i.vy,(i.x<0||i.x>e)&&(i.vx*=-1),(i.y<0||i.y>a)&&(i.vy*=-1),i.alpha=Math.min(.12,i.alpha+.003);const o=Math.atan2(i.vy,i.vx);s.save(),s.globalAlpha=i.alpha,s.strokeStyle="#a78bfa",s.lineWidth=.8,s.beginPath(),s.moveTo(i.x,i.y),s.lineTo(i.x+Math.cos(o)*i.len,i.y+Math.sin(o)*i.len),s.stroke(),s.fillStyle="#a78bfa",s.beginPath(),s.arc(i.x,i.y,1.5,0,Math.PI*2),s.fill(),s.restore()}this._neuralRaf=requestAnimationFrame(t)};this._neuralRaf=requestAnimationFrame(t)}_stopNeural(){this._neuralActive=!1,this._neuralRaf&&(cancelAnimationFrame(this._neuralRaf),this._neuralRaf=null),this._neuralCtx&&this._neuralCanvas&&this._neuralCtx.clearRect(0,0,this._neuralCanvas.width,this._neuralCanvas.height)}_startCool(){this._coolLevel=0,this._coolTimer=setInterval(()=>{if(this.phase!=="recall")return;this._coolLevel=Math.min(1,this._coolLevel+.015);const t=Math.max(.06,.2-this._coolLevel*.14);document.querySelectorAll(".ph-letter.ph-faded").forEach(s=>{s.style.borderColor=`rgba(167,139,250,${t})`})},400)}_stopCool(){this._coolTimer&&(clearInterval(this._coolTimer),this._coolTimer=null),this._coolLevel=0}async _nextWord(){if(!this.aborted){if(this.idx>=this.queue.length){this._showResult();return}this.word=this.queue[this.idx],this.typed=[],this.errorCount=0,this.phase="imprint",this._stopCool(),this._stopNeural(),this._updateTopbar(),this._setHintBtnsVisible(!1),this._showWordInfo(this.word),this._buildLetters(this.word.en),await this._showMeta(this.word),!this.aborted&&(await this._runImprint(this.word.en),!this.aborted&&this._enterRecall())}}_updateTopbar(){const t=this.idx+1,s=this.queue.length,e=document.getElementById("ph-counter"),a=document.getElementById("ph-prog-fill"),i=document.getElementById("ph-score"),o=document.getElementById("ph-combo"),n=document.getElementById("ph-combo-val");if(e&&(e.textContent=`${t}/${s}`),a&&(a.style.width=`${(t-1)/s*100}%`),i&&(i.textContent=`${this.score} XP`),o){const h=this.combo>=2;o.style.display=h?"inline-flex":"none",h&&n&&(n.textContent=this.combo)}}_showWordInfo(t){const s=document.getElementById("ph-word-info");s&&(s.innerHTML=`<span class="ph-word-icon">${t.icon||"\u{1F4DD}"}</span>
       <span class="ph-cefr" data-level="${t.level}">${t.level}</span>
       <span class="ph-cat">${t.cat}</span>`,s.style.opacity="1",s.style.transition="opacity 0.4s")}_buildLetters(t){const s=document.getElementById("ph-letters");if(!s)return;const e=document.getElementById("ph-letters-wrap"),a=((e==null?void 0:e.offsetWidth)||window.innerWidth)-24,i=t.length,o=(t.match(/ /g)||[]).length,n=i-o,h=o*18,d=i<=8?7:i<=12?5:4,m=Math.max(0,i-1)*d,p=(a-m-h)/Math.max(1,n),r=Math.max(22,Math.min(54,Math.floor(p))),l=Math.round(r*1.38),c=Math.max(13,Math.round(r*.62)),f=r<=28?6:r<=38?8:10;s.style.setProperty("--slot-w",r+"px"),s.style.setProperty("--slot-h",l+"px"),s.style.setProperty("--slot-fs",c+"px"),s.style.setProperty("--slot-gap",d+"px"),s.style.setProperty("--slot-r",f+"px"),s.innerHTML=t.split("").map((u,v)=>u===" "?`<span class="ph-letter ph-letter-space ph-faded" id="phl-${v}" data-c=" "></span>`:`<span class="ph-letter ph-faded" id="phl-${v}" data-c="${u}">${u}</span>`).join("")}async _showMeta(t){var n;const s=document.getElementById("ph-meta"),e=document.getElementById("ph-translation"),a=document.getElementById("ph-ipa"),i=document.getElementById("ph-example"),o=document.getElementById("ph-syns");await _wait(180),!this.aborted&&(e&&(e.textContent=t.tr),a&&(a.textContent=t.ipa||""),i&&(i.textContent=t.ex?`"${t.ex}"`:""),o&&(o.textContent=(n=t.syns)!=null&&n.length?`\u2248 ${t.syns.join(", ")}`:""),s&&(s.style.opacity="1"),setTimeout(()=>{this.aborted||this.app.speakWord(t.en)},280))}async _runImprint(t){const s=PH_MODES[this.mode],e=document.getElementById("ph-status");if(s.allAtOnce){if(e&&(e.textContent="\u{1F441} \u0130zle \u2014 hepsini g\xF6r",e.className="ph-status ph-status-watch"),t.split("").forEach((n,h)=>this._litLetter(h)),await _wait(s.imprintMs),this.aborted)return;const o=document.querySelectorAll(".ph-letter");o.forEach(n=>n.classList.add("ph-fading-out")),await _wait(500),o.forEach(n=>{n.classList.remove("ph-lit","ph-fading-out"),n.classList.add("ph-faded")})}else{e&&(e.textContent="\u{1F441} Her harfi haf\u0131zana i\u015Fle",e.className="ph-status ph-status-watch");for(let o=0;o<t.length;o++){if(this.aborted||(this._litLetter(o),await _wait(s.imprintMs),this.aborted))return;const n=document.getElementById(`phl-${o}`);n&&(n.classList.remove("ph-lit"),n.classList.add("ph-faded")),await _wait(60)}}if(this.aborted)return;const a=document.getElementById("ph-meta"),i=document.getElementById("ph-word-info");a&&(a.style.opacity="0"),i&&(i.style.opacity="0")}_litLetter(t){const s=document.getElementById(`phl-${t}`);s&&(s.classList.remove("ph-faded"),s.classList.add("ph-lit"))}_enterRecall(){if(this.aborted)return;this.phase="recall",this.typed=[];const t=document.getElementById("ph-status"),s=document.getElementById("ph-fog");t&&(t.textContent="\u{1F58A} \u015Eimdi yaz\u2026",t.className="ph-status ph-status-write"),s&&s.classList.add("ph-fog-active"),this._updateCursor(),this._setHintBtnsVisible(!0),this._startCool(),this._startNeural()}_updateCursor(){if(!this.word)return;const t=this.word.en.length,s=this.typed.length;for(let e=0;e<t;e++){const a=document.getElementById(`phl-${e}`);a&&(e<s?a.classList.remove("ph-cursor"):a.classList.toggle("ph-cursor",e===s))}}_setHintBtnsVisible(t){const s=document.getElementById("ph-hint-row");s&&(s.style.display=t?"flex":"none")}_hint(t){var d,m;if(this.phase!=="recall"||!this.word||this.hintsLeft<=0)return;this.hintsLeft--,this._hintUsed=!0;const s=document.getElementById("ph-hints-left");s&&(s.textContent=`\u{1F4A1} ${this.hintsLeft} hak`);const e=3-this.hintsLeft,a=[1,.75,.5,.25][Math.min(e,3)],i=(m=(d=window.remoteFlags)==null?void 0:d.xp_phantom_base)!=null?m:20,o=Math.round(i*a),n=this.word.en.toLowerCase(),h=this.typed.length;if(t==="first"){const p=h;p<n.length&&this._revealLetter(p,"hint")}else if(t==="mid"){const p=Math.floor(n.length/2);this._revealLetter(p,"hint")}else if(t==="all")for(let p=0;p<n.length;p++)p>=h&&this._revealLetter(p,"hint");UI.toast(`\u{1F4A1} \u0130pucu kullan\u0131ld\u0131 \u2014 bu kelimeden +${o} XP (tam: ${i} XP)`),this.hintsLeft<=0&&document.querySelectorAll(".ph-hint-btn").forEach(p=>p.disabled=!0)}_revealLetter(t,s){const e=document.getElementById(`phl-${t}`);!e||e.classList.contains("ph-crystal")||(e.classList.remove("ph-faded","ph-cursor"),e.classList.add("ph-hint-glow"),e.style.opacity="1",e.textContent=this.word.en[t])}_typeChar(t){if(this.phase!=="recall"||!this.word)return;const s=this.word.en.toLowerCase(),e=this.typed.length;if(e>=s.length)return;const a=document.getElementById(`phl-${e}`);if(a&&a.classList.contains("ph-hint-glow")){this.typed.push(s[e]),a.classList.remove("ph-hint-glow","ph-cursor"),a.classList.add("ph-crystal"),a.style.opacity="1",this.app.audio.play("pop"),this._updateCursor(),this.typed.length===s.length&&this._onWordComplete(!0);return}const i=s[e]===t;if(this._vkbFlash(t,i),i){for(this.typed.push(t),a&&(a.classList.remove("ph-faded","ph-cursor","ph-hint-glow"),a.classList.add("ph-crystal"),a.style.opacity="1",a.textContent=t===" "?"":t),this.app.audio.play("pop");this.typed.length<s.length&&s[this.typed.length]===" ";){const o=document.getElementById(`phl-${this.typed.length}`);o&&(o.classList.remove("ph-faded","ph-cursor"),o.classList.add("ph-crystal")),this.typed.push(" ")}this._updateCursor(),this.typed.length===s.length&&this._onWordComplete(!0)}else this.errorCount++,a&&(a.classList.add("ph-error"),setTimeout(()=>a.classList.remove("ph-error"),320)),this.errorCount%3===0&&this._flashScreen("red"),this.app.audio.play("error")}_backspace(){if(this.phase!=="recall"||!this.typed.length)return;this.typed.pop();const t=this.typed.length,s=document.getElementById(`phl-${t}`);s&&(s.classList.remove("ph-crystal","ph-hint-glow"),s.classList.add("ph-faded","ph-cursor"),s.style.removeProperty("color"),s.style.removeProperty("border-color"),s.style.removeProperty("box-shadow"),s.textContent=this.word.en[t]),this._updateCursor()}_skipWord(){this.phase!=="recall"&&this.phase!=="imprint"||(this.missedWords.push(this.word),this.combo=0,this._onWordComplete(!1))}_flashScreen(t){const s=document.getElementById("ph-flash");s&&(s.className=`ph-screen-flash ph-flash-${t} ph-flash-active`,setTimeout(()=>{s.className="ph-screen-flash"},500))}async _waveCrystal(t){for(let s=this.typed.length;s<t.length;s++){const e=document.getElementById(`phl-${s}`);e&&(e.classList.remove("ph-faded","ph-hint-glow","ph-cursor"),e.classList.add("ph-crystal"),e.style.opacity="1",e.textContent=t[s]===" "?"":t[s],t[s]!==" "&&await _wait(55))}}_showComboFlame(t){const s=document.getElementById("ph-combo");s&&(s.classList.add("ph-combo-burst"),setTimeout(()=>s.classList.remove("ph-combo-burst"),700),t>=3?this._flashScreen("gold"):t>=2&&this._flashScreen("violet"))}async _onWordComplete(t){var p,r;if(this.aborted)return;this.phase="feedback",this._stopCool(),this._stopNeural();const s=PH_MODES[this.mode],e=this.word,a=document.getElementById("ph-fog"),i=document.getElementById("ph-status"),o=this.app.state.get("mastery")||{},n=o[e.id]||{};if(t){this.combo++;const l=3-this.hintsLeft,c=this.errorCount===0&&l===0,f={xp:(r=(p=window.remoteFlags)==null?void 0:p.xp_phantom_base)!=null?r:20},u=this.combo>=10?3:this.combo>=5?2:1,v=[1,.75,.5,.25][Math.min(l,3)],y=Math.round(f.xp*u*v);if(this.score+=y,c&&this.perfectWords++,this._hintUsed=!1,o[e.id]={...n,score:Math.min(5,(n.score||0)+(c?2:1)),interval:(n.interval||1)*(c?2:1.5),nextReview:Date.now()+(n.interval||1)*864e5},this.app.addXP(y,"easy"),this.app.state.set("mastery",o),await this._waveCrystal(e.en),this.aborted)return;if(i){const b=["\u2728 S\xFCper!","\u{1F48E} Harika!","\u26A1 M\xFCkemmel!","\u{1F31F} \u0130nan\u0131lmaz!"],_=u>=3?"\u{1F525} EFSANE KOMBO!":u>=2?"\u26A1 KOMBO!\xD72":"",w=c?" \u2726 Hatas\u0131z!":"";i.textContent=`${_||b[Math.min(this.combo-1,b.length-1)]}${w} +${y} XP`,i.className="ph-status ph-status-success"}a&&a.classList.remove("ph-fog-active"),this._flashScreen("green"),u>=2&&this._showComboFlame(u),this._updateTopbar(),window.confetti&&c&&confetti({particleCount:45,spread:60,origin:{y:.5},colors:["#a78bfa","#22d3ee","#f5d770"]})}else{this._hintUsed=!1,this.combo=0,this.missedWords.push(e),o[e.id]={...n,score:Math.max(0,(n.score||0)-1),interval:1,nextReview:Date.now()+36e5},this.app.state.set("mastery",o);for(let l=0;l<e.en.length;l++){const c=document.getElementById(`phl-${l}`);c&&(c.classList.remove("ph-faded","ph-cursor","ph-crystal","ph-hint-glow"),c.classList.add("ph-reveal"),c.style.opacity="1",c.textContent=e.en[l])}i&&(i.textContent=`\u{1F480} Cevap: ${e.en}`,i.className="ph-status ph-status-fail"),a&&a.classList.remove("ph-fog-active"),this._flashScreen("red"),this._updateTopbar()}this._setHintBtnsVisible(!1);const h=document.getElementById("ph-meta"),d=document.getElementById("ph-translation"),m=document.getElementById("ph-example");d&&(d.textContent=e.tr),m&&(m.textContent=e.ex?`"${e.ex}"`:""),h&&(h.style.opacity="1"),await _wait(t?1300:2100),!this.aborted&&(this.idx++,this._nextWord())}_confirmExit(){if(this.phase==="intro"||this.phase==="result"){this.app.navigate("learn");return}confirm("Oturumdan \xE7\u0131kmak istiyor musun? \u0130lerleme kaydedildi.")&&this.app.navigate("learn")}_showResult(){var p;this.phase="result",this._kbHandler&&document.removeEventListener("keydown",this._kbHandler);const t=this.app.state.get("mastery")||{},s=this.queue.length,e=this.queue.filter(r=>{var l;return(((l=t[r.id])==null?void 0:l.score)||0)>=1}).length,a=s>0?Math.round(e/s*100):0;(p=window.analyticsManager)==null||p.lessonComplete("phantom",a);const i=a>=90?{icon:"\u{1F31F}",label:"EFSANE",cls:"grade-gold",msg:"Muhte\u015Fem bir haf\u0131za!"}:a>=70?{icon:"\u{1F48E}",label:"HAR\u0130KA",cls:"grade-blue",msg:"\xC7ok g\xFC\xE7l\xFC performans!"}:a>=50?{icon:"\u26A1",label:"\u0130Y\u0130",cls:"grade-violet",msg:"\u0130yi ilerliyorsun!"}:{icon:"\u{1F4AA}",label:"DEVAM ET",cls:"grade-gray",msg:"Pratik seni m\xFCkemmelle\u015Ftirir."},o=this.score;this.root.innerHTML=`
      <div class="ph-result">

        <div class="ph-result-grade ${i.cls}">
          <div class="ph-grade-icon">${i.icon}</div>
          <div class="ph-grade-label">${i.label}</div>
        </div>

        <div class="ph-result-header">
          <h2 class="ph-result-title">Oturum Tamamland\u0131</h2>
          <p class="ph-result-msg">${i.msg}</p>
        </div>

        <div class="ph-result-stats">
          <div class="ph-rs ph-rs-xp">
            <span class="ph-rs-val" id="ph-rs-xp-val">0</span>
            <span class="ph-rs-lbl">XP Kazan\u0131ld\u0131</span>
          </div>
          <div class="ph-rs">
            <span class="ph-rs-val">${e}/${s}</span>
            <span class="ph-rs-lbl">Do\u011Fru</span>
          </div>
          <div class="ph-rs">
            <span class="ph-rs-val ${a>=80?"ph-rs-green":""}">${a}%</span>
            <span class="ph-rs-lbl">Ba\u015Far\u0131</span>
          </div>
          <div class="ph-rs">
            <span class="ph-rs-val ph-rs-gold">${this.perfectWords}</span>
            <span class="ph-rs-lbl">Hatas\u0131z \u2726</span>
          </div>
        </div>

        ${this.missedWords.length?`
        <div class="ph-missed-block">
          <div class="ph-missed-title">\u{1F4CC} \xC7al\u0131\u015Fman Gereken Kelimeler</div>
          <div class="ph-missed-list">
            ${[...new Set(this.missedWords.map(r=>r.id))].map(r=>{const l=this.missedWords.find(c=>c.id===r);return`<div class="ph-missed-item">
                <span class="ph-mi-icon">${l.icon||"\u{1F4DD}"}</span>
                <span class="ph-mi-en">${l.en}</span>
                <span class="ph-mi-tr">${l.tr}</span>
                <button class="ph-mi-listen" data-ph-action="speak" data-word="${l.en}">\u{1F50A}</button>
              </div>`}).join("")}
          </div>
        </div>`:""}

        <div class="ph-result-words">
          <div class="ph-rw-title">T\xFCm Kelimeler</div>
          ${this.queue.map(r=>{var f;const l=(((f=t[r.id])==null?void 0:f.score)||0)>=1,c=this.perfectWords>0&&l&&!this.missedWords.find(u=>u.id===r.id);return`<div class="ph-rw ${l?"ph-rw-ok":"ph-rw-miss"}">
              <span class="ph-rw-icon">${r.icon||"\u{1F4DD}"}</span>
              <span class="ph-rw-en">${r.en}</span>
              <span class="ph-rw-tr">${r.tr}</span>
              <span class="ph-rw-mark">${l?c?"\u2726":"\u2713":"\u2717"}</span>
            </div>`}).join("")}
        </div>

        <div class="ph-result-acts">
          <button class="ph-start-btn" data-ph-action="start-session">\u{1F504} Yeniden Oyna</button>
          <button class="ph-back-btn" data-ph-action="nav-learn">\u2190 Ana Merkez</button>
        </div>

      </div>`;let n=0;const h=Math.max(1,Math.floor(o/40)),d=document.getElementById("ph-rs-xp-val"),m=setInterval(()=>{n=Math.min(o,n+h),d&&(d.textContent=n),n>=o&&clearInterval(m)},25);window.confetti&&a>=70&&confetti({particleCount:130,spread:85,origin:{y:.35}})}}
