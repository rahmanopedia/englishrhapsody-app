class NexusMode{constructor(e){this.app=e,this.root=null,this.allPhrasals=[],this.allVerbs=new Set,this.allParticles=new Set,this.constellations=[],this.queue=[],this.current=null,this.score=0,this.combo=0,this.locked=!1,this.mode=null,this._netRaf=null,this.cipherVerbs=[],this.cipherParticles=[],this.cipherVerbIdx=0,this.cipherParticleIdx=0,this.synthSelected={verb:null,particle:null,verbId:null,particleId:null},this.synthHintTimer=null,this._loadData(),this._resizeHandler=()=>{this.mode==="network"&&this.current&&this._positionNodes()},window.addEventListener("resize",this._resizeHandler)}_loadData(){let e={},t=new Set,s=new Set;if(typeof PHRASE_DICT!="undefined"){for(const[i,n]of Object.entries(PHRASE_DICT))if(n.type==="Phrasal Verb"){const r=i.split(" "),a=r[0],l=r.slice(1).join(" ");t.add(a),s.add(l);let c={phrase:i,verb:a,particle:l,tr:n.tr,ex:n.ex};this.allPhrasals.push(c),e[a]||(e[a]=[]),e[a].push(c)}}this.allVerbs=Array.from(t),this.allParticles=Array.from(s),this.constellations=Object.keys(e).filter(i=>e[i].length>=2).map(i=>{let n=e[i];return n.length>5&&(n.sort(()=>.5-Math.random()),n=n.slice(0,5)),{verb:i,tasks:n}})}init(e){this.root=e,this._showIntro(),this._initOrientation(),window._nexusDelegateAttached||(window._nexusDelegateAttached=!0,document.addEventListener("click",t=>{if(!window.nexusMod)return;if(t.target.closest(".nexus-start-network-btn")){window.nexusMod.startNetwork();return}if(t.target.closest(".nexus-start-cipher-btn")){window.nexusMod.startCipher();return}if(t.target.closest(".nexus-start-synthesis-btn")){window.nexusMod.startSynthesis();return}const s=t.target.closest(".nexus-clear-slot-btn");if(s){window.nexusMod.clearSynthSlot(s.dataset.slotType);return}const i=t.target.closest(".nexus-select-orb-btn");if(i){window.nexusMod.selectSynthOrb(i.dataset.orbType,i.dataset.orbWord,i.dataset.orbId);return}const n=t.target.closest(".nexus-core-speak-btn");if(n){window.nexusMod.playVerbAudio(n.dataset.verb);return}const r=t.target.closest(".nexus-particle-answer-btn");if(r){window.nexusMod.checkNetworkAnswer(r.dataset.particle,r);return}const a=t.target.closest(".nexus-scroll-dial-btn");if(a){window.nexusMod.scrollDial(a.dataset.dialType,parseInt(a.dataset.dialDir));return}if(t.target.closest(".nexus-check-cipher-btn")){window.nexusMod.checkCipher();return}if(t.target.closest(".nexus-restart-btn")){window.nexusMod.init(window.nexusMod.root);return}}))}_initOrientation(){try{screen.orientation&&screen.orientation.unlock&&screen.orientation.unlock()}catch(t){}const e=()=>{if(!document.fullscreenElement&&!document.webkitFullscreenElement&&this.root){const t=this.root.requestFullscreen||this.root.webkitRequestFullscreen;t&&t.call(this.root).catch(()=>{})}};e(),this._orientHandler=()=>e(),window.addEventListener("resize",this._orientHandler,{passive:!0}),window.attachQuickMenuTrigger&&window.attachQuickMenuTrigger(this.root)}destroy(){if(window.removeEventListener("resize",this._resizeHandler),this._orientHandler&&(window.removeEventListener("resize",this._orientHandler),this._orientHandler=null),document.fullscreenElement||document.webkitFullscreenElement){const e=document.exitFullscreen||document.webkitExitFullscreen;e&&e.call(document).catch(()=>{})}try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("portrait").catch(()=>{})}catch(e){}this._clearSynthTimer(),this._stopNetCanvas(),this.root&&(this.root.innerHTML="")}_clearSynthTimer(){this.synthHintTimer&&(clearTimeout(this.synthHintTimer),this.synthHintTimer=null)}_showIntro(){this.root.innerHTML=`
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge">v5.0</span></h1>
        <p class="nexus-subtitle">Evrensel Dil \xD6\u011Frenim Merkezi</p>
      </div>
      
      <div class="nexus-mode-selector">
        <div class="nexus-mode-card nexus-start-network-btn" style="--card-color: #8b5cf6;">
          <div class="nm-icon">\u{1F30C}</div>
          <div class="nm-title">Semantik A\u011F</div>
          <div class="nm-desc">Merkez fiilin etraf\u0131na do\u011Fru edatlar\u0131 ba\u011Flayarak anlam haritalar\u0131 kur. G\xF6rsel haf\u0131zan\u0131 g\xFC\xE7lendir.</div>
        </div>

        <div class="nexus-mode-card nexus-start-cipher-btn" style="--card-color: #10b981;">
          <div class="nm-icon">\u{1F510}</div>
          <div class="nm-title">Kuantum \u015Eifre</div>
          <div class="nm-desc">Ba\u011Flama uygun fiil ve edat kombinasyonunu \xE7evirmeli \u015Fifre paneliyle (Cryptex) k\u0131rarak c\xFCmleyi \xE7\xF6z.</div>
        </div>

        <div class="nexus-mode-card nexus-start-synthesis-btn" style="--card-color: #ec4899;">
          <div class="nm-icon">\u{1F9EC}</div>
          <div class="nm-title">Kognitif Sentez</div>
          <div class="nm-desc">B\xF6l\xFCnm\xFC\u015F kelimeleri reakt\xF6rde birle\u015Ftirerek yeni anlamlar \xFCret. Yap\u0131land\u0131rmac\u0131 \xF6\u011Frenim.</div>
        </div>
      </div>
      
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `,this._createStars(50)}_createStars(e){const t=document.getElementById("nexus-stars");if(!t)return;let s="";for(let i=0;i<e;i++){const n=Math.random()*100,r=Math.random()*100,a=Math.random()*3+2;s+=`<div class="nexus-star" style="left:${n}%; top:${r}%; width:2px; height:2px; --dur:${a}s"></div>`}t.innerHTML=s}startSynthesis(){this.mode="synthesis";const e=[...this.allPhrasals.filter(t=>t.ex)].sort(()=>.5-Math.random());if(this.queue=e.slice(0,10),this.queue.length===0){typeof UI!="undefined"&&UI.toast&&UI.toast("Sentezlenecek kelime bulunamad\u0131!");return}this.score=0,this.combo=0,this.currentIndex=0,this.nextSynthesisWord()}nextSynthesisWord(){if(this._clearSynthTimer(),this.currentIndex>=this.queue.length){this._showResults("Sentez D\xF6ng\xFCs\xFC Tamamland\u0131");return}this.current=this.queue[this.currentIndex],this.locked=!1,this.synthSelected={verb:null,particle:null,verbId:null,particleId:null};let e=[this.current.verb],t=this.allVerbs.filter(n=>n!==this.current.verb).sort(()=>.5-Math.random()).slice(0,3);e.push(...t),e.sort(()=>.5-Math.random());let s=[this.current.particle],i=this.allParticles.filter(n=>n!==this.current.particle).sort(()=>.5-Math.random()).slice(0,3);s.push(...i),s.sort(()=>.5-Math.random()),this.currentSynthPool={verbs:e,parts:s},this._renderSynthesis(),this.synthHintTimer=setTimeout(()=>{this.mode==="synthesis"&&!this.locked&&!this.synthSelected.verb&&this._autoFillVerb()},1e4)}_autoFillVerb(){const e=this.current.verb,t=this.currentSynthPool.verbs.indexOf(e);if(t!==-1){const s=`sorb-v-${t}`;this.selectSynthOrb("verb",e,s,!0),typeof UI!="undefined"&&UI.toast&&UI.toast("Sistem yard\u0131m\u0131: Fiil senkronize edildi.")}}_renderSynthesis(){const e=new RegExp(`\\b${this.current.phrase.replace(/ /g,"\\s+")}\\b`,"gi");let t=this.current.ex.replace(e,'<span class="synth-blank"></span>');if(t===this.current.ex){const s=new RegExp(`\\b${this.current.verb}[a-z]*\\b`,"gi"),i=new RegExp(`\\b${this.current.particle}\\b`,"gi");t=t.replace(s,"___").replace(i,"___")}this.root.innerHTML=`
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge">SENTEZ MODU</span></h1>
        <p class="nexus-subtitle">F\xFCzyon A\u015Famas\u0131 ${this.currentIndex+1} / ${this.queue.length}</p>
      </div>
      
      <div class="synth-game-container animate-in">
         <div style="font-size:1.1rem; color:var(--text-3); margin-bottom:10px; font-weight:700;">HEDEF ANLAM: <span style="color:var(--cyan)">${this.current.tr}</span></div>
         <div class="synth-sentence" id="synth-sentence">"${t}"</div>
         
         <div class="synth-reactor" id="synth-reactor">
            <div class="synth-slot nexus-clear-slot-btn" id="slot-verb" data-slot-type="verb">F\u0130\u0130L</div>
            <div class="synth-plus">+</div>
            <div class="synth-slot nexus-clear-slot-btn" id="slot-particle" data-slot-type="particle">EDAT</div>
         </div>

         <div class="synth-pool">
            ${this.currentSynthPool.verbs.map((s,i)=>`<div class="synth-orb verb nexus-select-orb-btn" id="sorb-v-${i}" data-orb-type="verb" data-orb-word="${s.replace(/"/g,"&quot;")}" data-orb-id="sorb-v-${i}">${s}</div>`).join("")}
            ${this.currentSynthPool.parts.map((s,i)=>`<div class="synth-orb particle nexus-select-orb-btn" id="sorb-p-${i}" data-orb-type="particle" data-orb-word="${s.replace(/"/g,"&quot;")}" data-orb-id="sorb-p-${i}">${s}</div>`).join("")}
         </div>
      </div>

      <div class="nexus-hud">
        <div class="nexus-stat">\u2B50 <span id="nx-score">${this.score}</span> XP</div>
        <div class="nexus-stat">\u{1F525} <span id="nx-combo">${this.combo}</span></div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `,this._createStars(30)}selectSynthOrb(e,t,s,i=!1){if(this.locked||this.synthSelected[e]!==null)return;!i&&e==="verb"&&this._clearSynthTimer(),this.app.audio&&this.app.audio.play("tick"),this.synthSelected[e]=t,this.synthSelected[e+"Id"]=s;const n=document.getElementById(s);n&&n.classList.add("used");const r=document.getElementById(`slot-${e}`);r&&(r.innerText=t,r.classList.add("filled",e)),this.synthSelected.verb&&this.synthSelected.particle&&(this.locked=!0,this._clearSynthTimer(),setTimeout(()=>this.checkSynthesis(),400))}clearSynthSlot(e){if(this.locked||!this.synthSelected[e])return;this.app.audio&&this.app.audio.play("pop");const t=this.synthSelected[e+"Id"],s=document.getElementById(t);s&&s.classList.remove("used"),this.synthSelected[e]=null,this.synthSelected[e+"Id"]=null;const i=document.getElementById(`slot-${e}`);i&&(i.innerText=e==="verb"?"F\u0130\u0130L":"EDAT",i.classList.remove("filled",e))}checkSynthesis(){var e,t;const s=this.synthSelected.verb===this.current.verb,i=this.synthSelected.particle===this.current.particle,n=document.getElementById("slot-verb"),r=document.getElementById("slot-particle"),a=document.getElementById("synth-reactor");if(s&&i){this.app.audio&&this.app.audio.play("correct"),n&&n.classList.add("success"),r&&r.classList.add("success"),a&&(a.style.borderColor="#10b981",a.style.background="radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 80%)");const l=document.getElementById("synth-sentence");if(l){l.textContent="";const o=document.createTextNode('"'+this.current.ex+'"');l.appendChild(o);const d=document.createElement("div");d.style.cssText="color:#ec4899; margin-top:20px; font-size:1.5rem; font-weight:800; letter-spacing:3px;",d.textContent="F\xDCZYON BA\u015EARILI!",l.appendChild(d),l.style.color="#10b981"}this.app.speakWord&&this.app.speakWord(this.current.ex);const c=(t=(e=window.remoteFlags)==null?void 0:e.xp_nexus_base)!=null?t:15;this.score+=c*3+this.combo*10,this.combo++,this._updateHUD(),setTimeout(()=>{this.currentIndex++,this.nextSynthesisWord()},3500)}else this.app.audio&&this.app.audio.play("error"),n&&n.classList.add("error"),r&&r.classList.add("error"),this.combo=0,this._updateHUD(),setTimeout(()=>{if(n&&n.classList.remove("error"),r&&r.classList.remove("error"),this.synthSelected.verbId){const l=document.getElementById(this.synthSelected.verbId);l&&l.classList.remove("used")}if(this.synthSelected.particleId){const l=document.getElementById(this.synthSelected.particleId);l&&l.classList.remove("used")}this.synthSelected={verb:null,particle:null,verbId:null,particleId:null},n&&(n.innerText="F\u0130\u0130L",n.classList.remove("filled","verb")),r&&(r.innerText="EDAT",r.classList.remove("filled","particle")),this.locked=!1},800)}startNetwork(){this.mode="network";const e=[...this.constellations].sort(()=>.5-Math.random());if(this.queue=e.slice(0,5),this.queue.length===0){typeof UI!="undefined"&&UI.toast&&UI.toast("Tak\u0131my\u0131ld\u0131z\u0131 olu\u015Fturacak yeterli kelime bulunamad\u0131!");return}this.score=0,this.combo=0,this.currentIndex=0,this.nextNetworkWord()}nextNetworkWord(){if(this.currentIndex>=this.queue.length){this._showResults("A\u011F B\xFCt\xFCnle\u015Ftirildi");return}this.current=this.queue[this.currentIndex],this.locked=!1,this._renderNetwork()}_renderNetwork(){this.currentTasks=[...this.current.tasks].sort(()=>.5-Math.random()),this.currentTaskIndex=0;let e=this.currentTasks.map(s=>s.particle),t=this.allParticles.filter(s=>!e.includes(s));t.sort(()=>.5-Math.random()),e=[...e,...t.slice(0,3)],e.sort(()=>.5-Math.random()),this.root.innerHTML=`
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge" style="background:#8b5cf6">A\u011E MODU</span></h1>
        <p class="nexus-subtitle">Tak\u0131my\u0131ld\u0131z\u0131 ${this.currentIndex+1} / ${this.queue.length}</p>
      </div>

      <div class="nexus-display-container network-compact">
         <div class="nexus-task-progress">D\xFC\u011F\xFCm ${this.currentTaskIndex+1} / ${this.currentTasks.length}</div>
         <div class="nexus-question" id="nx-q">${this.currentTasks[0].tr}</div>
         <div class="nexus-feedback-area" id="nx-feedback" style="display:none;">
            <div class="nexus-phrase-result" id="nx-phrase-res"></div>
            <div class="nexus-example-text" id="nx-ex-res"></div>
         </div>
      </div>

      <div class="nexus-game-area" id="nexus-board">
        <canvas class="nexus-net-canvas" id="nexus-net-canvas"></canvas>
        <svg class="nexus-connection-line" id="nexus-svg"></svg>
        <div class="nexus-core-node nexus-core-speak-btn" id="nexus-core" data-verb="${this.current.verb.replace(/"/g,"&quot;")}">
          ${this.current.verb}
        </div>
        ${e.map((s,i)=>{const n=s.length<=4?"0.95rem":s.length<=7?"0.78rem":"0.65rem";return`<div class="nexus-particle-node nexus-particle-answer-btn" id="particle-${i}" style="font-size:${n}" data-particle="${s.replace(/"/g,"&quot;")}">${s}</div>`}).join("")}
      </div>

      <div class="nexus-hud">
        <div class="nexus-stat">\u2B50 <span id="nx-score">${this.score}</span> XP</div>
        <div class="nexus-stat">\u{1F525} <span id="nx-combo">${this.combo}</span></div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `,setTimeout(()=>this._positionNodes(),30),this._createStars(40),this.app.audio&&this.app.audio.play("pop")}_positionNodes(){const e=document.getElementById("nexus-board"),t=document.getElementById("nexus-core");if(!e||!t)return;const s=e.getBoundingClientRect(),i=s.width/2,n=s.height/2,r=window.innerWidth<=480?74:90,a=r/2+12,l=Math.max(n,a+Math.min(s.width,s.height)*.38);t.style.left=`${i-t.offsetWidth/2}px`,t.style.top=`${l-t.offsetHeight/2}px`;const c=document.querySelectorAll(".nexus-particle-node"),o=r/2,d=i-o-4,u=Math.min(s.width,s.height)*.38,x=Math.max(u,window.innerWidth<600?100:150),h=Math.min(x,l-a,d);c.forEach((p,m)=>{const v=m/c.length*Math.PI*2-Math.PI/2,b=i+Math.cos(v)*h-p.offsetWidth/2,y=l+Math.sin(v)*h-p.offsetHeight/2;p.style.left=`${b}px`,p.style.top=`${y}px`,setTimeout(()=>p.classList.add("appeared"),80+m*80)}),this._redrawLines(),this._startNetCanvas()}_redrawLines(e=null){const t=document.getElementById("nexus-core"),s=document.getElementById("nexus-svg");if(!t||!s)return;s.innerHTML="";const i=t.getBoundingClientRect(),n=document.getElementById("nexus-board").getBoundingClientRect(),r=i.left+i.width/2-n.left,a=i.top+i.height/2-n.top;document.querySelectorAll(".nexus-particle-node").forEach(l=>{const c=l.getBoundingClientRect(),o=c.left+c.width/2-n.left,d=c.top+c.height/2-n.top,u=l.classList.contains("solved"),x=u&&l===e,h=document.createElementNS("http://www.w3.org/2000/svg","path");if(x){h.setAttribute("d",`M ${o} ${d} L ${r} ${a}`);const p=Math.round(Math.sqrt((o-r)**2+(d-a)**2));h.style.setProperty("--line-len",p),h.setAttribute("class","nexus-line snap-line")}else u?(h.setAttribute("d",`M ${r} ${a} L ${o} ${d}`),h.setAttribute("class","nexus-line correct-line")):(h.setAttribute("d",`M ${r} ${a} L ${o} ${d}`),h.setAttribute("class","nexus-line ambient-line"));s.appendChild(h)})}_drawLineTo(e){this._redrawLines(e)}checkNetworkAnswer(e,t){var s,i;if(this.locked||t.classList.contains("solved"))return;const n=this.currentTasks[this.currentTaskIndex];if(e===n.particle){this.locked=!0,t.classList.add("solved"),this._drawLineTo(t);const r=document.getElementById("nexus-core");r&&(r.classList.add("just-solved"),setTimeout(()=>r.classList.remove("just-solved"),900)),this.app.audio&&this.app.audio.play("correct"),this.app.speakWord&&this.app.speakWord(n.phrase);const a=(i=(s=window.remoteFlags)==null?void 0:s.xp_nexus_base)!=null?i:15;this.score+=a*2+this.combo*5,this.combo++,this._updateHUD();const l=document.getElementById("nx-q"),c=document.getElementById("nx-feedback");l&&(l.style.display="none"),c&&(c.style.display="flex",document.getElementById("nx-phrase-res").innerText=n.phrase,document.getElementById("nx-ex-res").innerText=`"${n.ex}"`),this.currentTaskIndex++,setTimeout(()=>{if(this.currentTaskIndex>=this.currentTasks.length)this._completeConstellation();else{l&&(l.style.display="block",l.innerText=this.currentTasks[this.currentTaskIndex].tr),c&&(c.style.display="none");const o=document.querySelector(".nexus-task-progress");o&&(o.innerText=`D\xFC\u011F\xFCm ${this.currentTaskIndex+1} / ${this.currentTasks.length}`),this.locked=!1}},2500)}else t.classList.add("wrong"),this.app.audio&&this.app.audio.play("error"),this.combo=0,this._updateHUD(),setTimeout(()=>{t.classList.remove("wrong")},800)}_completeConstellation(){var e,t;this.app.audio&&this.app.audio.play("level_up");const s=document.getElementById("nexus-core");if(s&&s.classList.add("constellation-complete-glow"),document.querySelectorAll(".correct-line, .snap-line").forEach(a=>a.classList.add("pulse-line")),s){const a=s.getBoundingClientRect(),l=a.left+a.width/2,c=a.top+a.height/2;document.querySelectorAll(".nexus-particle-node:not(.solved)").forEach((o,d)=>{const u=o.getBoundingClientRect(),x=l-(u.left+u.width/2),h=c-(u.top+u.height/2);o.style.transition=`transform 0.55s ${.08*d}s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ${.08*d+.1}s ease`,o.style.transform=`translate(${x}px, ${h}px) scale(0)`,o.style.opacity="0",o.style.pointerEvents="none"})}const i=(t=(e=window.remoteFlags)==null?void 0:e.xp_nexus_base)!=null?t:15;this.score+=i*7,this._updateHUD();const n=document.getElementById("nx-q"),r=document.getElementById("nx-feedback");n&&(n.style.display="none"),r&&(r.style.display="flex",r.innerHTML=`
            <div style="font-size:2.5rem; margin-bottom:10px; filter: drop-shadow(0 0 10px #8b5cf6);">\u{1F30C}</div>
            <div class="nexus-phrase-result" style="color:#8b5cf6">A\u011F Tamamland\u0131!</div>
            <div class="nexus-example-text" style="color:#fff">+100 XP A\u011F Bonusu</div>
          `),setTimeout(()=>{this.currentIndex++,this.nextNetworkWord()},3500)}_startNetCanvas(){this._stopNetCanvas();const e=document.getElementById("nexus-net-canvas");if(!e)return;const t=e.getContext("2d"),s=document.getElementById("nexus-board");s&&(e.width=s.offsetWidth,e.height=s.offsetHeight);const i=[];for(let r=0;r<22;r++)i.push({x:Math.random()*e.width,y:Math.random()*e.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.4+.4,a:Math.random()*.35+.08});const n=()=>{if(!e.isConnected){this._stopNetCanvas();return}t.clearRect(0,0,e.width,e.height);const r=e.width/2,a=e.height/2,l=Math.min(e.width,e.height)*.46,c=t.createRadialGradient(r,a,0,r,a,l);c.addColorStop(0,"rgba(139,92,246,0.13)"),c.addColorStop(1,"rgba(139,92,246,0)"),t.fillStyle=c,t.fillRect(0,0,e.width,e.height),i.forEach(o=>{o.x+=o.vx,o.y+=o.vy,o.x<0&&(o.x=e.width),o.x>e.width&&(o.x=0),o.y<0&&(o.y=e.height),o.y>e.height&&(o.y=0),t.beginPath(),t.arc(o.x,o.y,o.r,0,Math.PI*2),t.fillStyle=`rgba(167,139,250,${o.a})`,t.fill()}),this._netRaf=requestAnimationFrame(n)};n()}_stopNetCanvas(){this._netRaf&&(cancelAnimationFrame(this._netRaf),this._netRaf=null)}startCipher(){this.mode="cipher";const e=[...this.allPhrasals.filter(t=>t.ex)].sort(()=>.5-Math.random());if(this.queue=e.slice(0,10),this.queue.length===0){typeof UI!="undefined"&&UI.toast&&UI.toast("\u015Eifrelenecek kelime bulunamad\u0131!");return}this.score=0,this.combo=0,this.currentIndex=0,this.nextCipherWord()}nextCipherWord(){if(this.currentIndex>=this.queue.length){this._showResults("T\xFCm \u015Eifreler K\u0131r\u0131ld\u0131");return}this.current=this.queue[this.currentIndex],this.locked=!1,this.cipherVerbs=[this.current.verb];let e=this.allVerbs.filter(s=>s!==this.current.verb).sort(()=>.5-Math.random()).slice(0,4);this.cipherVerbs.push(...e),this.cipherVerbs.sort(()=>.5-Math.random()),this.cipherVerbIdx=Math.floor(Math.random()*this.cipherVerbs.length),this.cipherParticles=[this.current.particle];let t=this.allParticles.filter(s=>s!==this.current.particle).sort(()=>.5-Math.random()).slice(0,4);this.cipherParticles.push(...t),this.cipherParticles.sort(()=>.5-Math.random()),this.cipherParticleIdx=Math.floor(Math.random()*this.cipherParticles.length),this._renderCipher()}_renderCipher(){let e=this.current.ex;const t=new RegExp(this.current.phrase.replace(/ /g,"\\s+"),"gi");if(e=e.replace(t,'<span class="cipher-blank">[ ? ]</span>'),!e.includes("cipher-blank")){const s=new RegExp(`\\b${this.current.verb}[a-z]*\\b`,"gi"),i=new RegExp(`\\b${this.current.particle}\\b`,"gi");e=e.replace(s,"___").replace(i,"___")}this.root.innerHTML=`
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge" style="background:#10b981">\u015E\u0130FRE MODU</span></h1>
        <p class="nexus-subtitle">Kilit ${this.currentIndex+1} / ${this.queue.length}</p>
      </div>
      
      <div class="cipher-sentence-box" id="cipher-sentence">
        "${e}"
        <div class="cipher-hint">Anlam\u0131: ${this.current.tr}</div>
      </div>

      <div class="cipher-lock-mechanism">
        <div class="cipher-dial">
          <button class="cipher-nav-btn nexus-scroll-dial-btn" data-dial-type="verb" data-dial-dir="-1">\u25B2</button>
          <div class="cipher-window" id="cipher-w-verb">${this.cipherVerbs[this.cipherVerbIdx]}</div>
          <button class="cipher-nav-btn nexus-scroll-dial-btn" data-dial-type="verb" data-dial-dir="1">\u25BC</button>
        </div>

        <div style="font-size:2.2rem; color:var(--text-3); font-weight:800;">+</div>

        <div class="cipher-dial">
          <button class="cipher-nav-btn nexus-scroll-dial-btn" data-dial-type="particle" data-dial-dir="-1">\u25B2</button>
          <div class="cipher-window" id="cipher-w-particle">${this.cipherParticles[this.cipherParticleIdx]}</div>
          <button class="cipher-nav-btn nexus-scroll-dial-btn" data-dial-type="particle" data-dial-dir="1">\u25BC</button>
        </div>
      </div>

      <button class="cipher-engage-btn nexus-check-cipher-btn" id="cipher-engage">\u015E\u0130FREY\u0130 \xC7\xD6Z</button>

      <div class="nexus-hud">
        <div class="nexus-stat">\u2B50 <span id="nx-score">${this.score}</span> XP</div>
        <div class="nexus-stat">\u{1F525} <span id="nx-combo">${this.combo}</span></div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `,this._createStars(40)}scrollDial(e,t){if(!this.locked)if(this.app.audio&&this.app.audio.play("tick"),e==="verb"){this.cipherVerbIdx+=t,this.cipherVerbIdx<0&&(this.cipherVerbIdx=this.cipherVerbs.length-1),this.cipherVerbIdx>=this.cipherVerbs.length&&(this.cipherVerbIdx=0);const s=document.getElementById("cipher-w-verb");s.innerText=this.cipherVerbs[this.cipherVerbIdx],s.classList.add("glow"),setTimeout(()=>s.classList.remove("glow"),200)}else{this.cipherParticleIdx+=t,this.cipherParticleIdx<0&&(this.cipherParticleIdx=this.cipherParticles.length-1),this.cipherParticleIdx>=this.cipherParticles.length&&(this.cipherParticleIdx=0);const s=document.getElementById("cipher-w-particle");s.innerText=this.cipherParticles[this.cipherParticleIdx],s.classList.add("glow"),setTimeout(()=>s.classList.remove("glow"),200)}}checkCipher(){var e,t;if(this.locked)return;const s=this.cipherVerbs[this.cipherVerbIdx],i=this.cipherParticles[this.cipherParticleIdx],n=s===this.current.verb,r=i===this.current.particle,a=document.getElementById("cipher-w-verb"),l=document.getElementById("cipher-w-particle");if(n&&r){this.locked=!0,this.app.audio&&this.app.audio.play("correct"),a.classList.add("correct"),l.classList.add("correct");const c=document.getElementById("cipher-sentence");c.textContent="";const o=document.createTextNode('"'+this.current.ex+'"');c.appendChild(o);const d=document.createElement("div");d.style.cssText="color:#10b981; margin-top:15px; font-size:1.3rem; font-weight:800; text-transform:uppercase; letter-spacing:2px;",d.textContent="\u{1F510} \u015E\u0130FRE KIRILDI!",c.appendChild(d),c.style.borderColor="#10b981",c.style.background="rgba(16, 185, 129, 0.15)",c.style.transform="scale(1.05)",this.app.speakWord&&this.app.speakWord(this.current.ex);const u=(t=(e=window.remoteFlags)==null?void 0:e.xp_nexus_base)!=null?t:15;this.score+=u*2+this.combo*5,this.combo++,this._updateHUD(),setTimeout(()=>{this.currentIndex++,this.nextCipherWord()},3500)}else this.app.audio&&this.app.audio.play("error"),n||(a.classList.add("wrong"),setTimeout(()=>a.classList.remove("wrong"),500)),r||(l.classList.add("wrong"),setTimeout(()=>l.classList.remove("wrong"),500)),this.combo=0,this._updateHUD()}playVerbAudio(e){this.app.speakWord&&this.app.speakWord(e);const t=document.getElementById("nexus-core");t&&(t.classList.add("active"),setTimeout(()=>t.classList.remove("active"),300))}_updateHUD(){const e=document.getElementById("nx-score"),t=document.getElementById("nx-combo");e&&(e.innerText=this.score),t&&(t.innerText=this.combo)}_showResults(e){var t,s,i;const n=(s=(t=window.remoteFlags)==null?void 0:t.multiplier_medium)!=null?s:1.5,r=Math.round(this.score*n);this.app.addXP&&this.score>0&&this.app.addXP(this.score,"medium","nexus"),(i=window.analyticsManager)==null||i.lessonComplete("nexus",this.score),this.root.innerHTML=`
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge">BA\u015EARILI</span></h1>
      </div>
      <div class="nexus-game-area" style="text-align:center;">
        <div style="font-size:4.5rem; margin-bottom:15px; text-shadow: 0 0 20px var(--cyan);">\u{1F3C6}</div>
        <h2 style="color:#fff; font-size:2.2rem; margin-bottom:10px; font-weight:800;">${e}!</h2>
        <p style="color:var(--text-2); font-size:1.2rem; margin-bottom:30px;">Kazan\u0131lan Toplam XP: <strong style="color:var(--cyan)">+${r}</strong></p>
        <div style="display:flex; gap:15px; justify-content:center;">
           <button class="btn btn-primary nexus-intro-btn nexus-restart-btn">MOD SE\xC7\u0130M\u0130</button>
           <button class="btn btn-ghost" style="padding: 16px 30px; font-size: 1.1rem;" data-action="navigate" data-target="home">ANA MERKEZ</button>
        </div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `,this._createStars(100),typeof confetti=="function"&&confetti({particleCount:200,spread:90,origin:{y:.6},colors:["#00d4ff","#7c3aed","#ec4899","#10b981"]})}}
