class NexusMode{constructor(e){this.app=e,this.root=null,this.allPhrasals=[],this.allVerbs=new Set,this.allParticles=new Set,this.constellations=[],this.queue=[],this.current=null,this.score=0,this.combo=0,this.locked=!1,this.mode=null,this._netRaf=null,this.cipherVerbs=[],this.cipherParticles=[],this.cipherVerbIdx=0,this.cipherParticleIdx=0,this.synthSelected={verb:null,particle:null,verbId:null,particleId:null},this.synthHintTimer=null,this._loadData(),this._resizeHandler=()=>{this.mode==="network"&&this.current&&this._positionNodes()},window.addEventListener("resize",this._resizeHandler)}_loadData(){let e={},s=new Set,t=new Set;if(typeof PHRASE_DICT!="undefined"){for(const[i,r]of Object.entries(PHRASE_DICT))if(r.type==="Phrasal Verb"){const a=i.split(" "),o=a[0],c=a.slice(1).join(" ");s.add(o),t.add(c);let l={phrase:i,verb:o,particle:c,tr:r.tr,ex:r.ex};this.allPhrasals.push(l),e[o]||(e[o]=[]),e[o].push(l)}}this.allVerbs=Array.from(s),this.allParticles=Array.from(t),this.constellations=Object.keys(e).filter(i=>e[i].length>=2).map(i=>{let r=e[i];return r.length>5&&(r.sort(()=>.5-Math.random()),r=r.slice(0,5)),{verb:i,tasks:r}})}init(e){this.root=e,this._showIntro(),window._nexusDelegateAttached||(window._nexusDelegateAttached=!0,document.addEventListener("click",s=>{if(!window.nexusMod)return;if(s.target.closest(".nexus-start-network-btn")){window.nexusMod.startNetwork();return}if(s.target.closest(".nexus-start-cipher-btn")){window.nexusMod.startCipher();return}if(s.target.closest(".nexus-start-synthesis-btn")){window.nexusMod.startSynthesis();return}const a=s.target.closest(".nexus-clear-slot-btn");if(a){window.nexusMod.clearSynthSlot(a.dataset.slotType);return}const o=s.target.closest(".nexus-select-orb-btn");if(o){window.nexusMod.selectSynthOrb(o.dataset.orbType,o.dataset.orbWord,o.dataset.orbId);return}const c=s.target.closest(".nexus-core-speak-btn");if(c){window.nexusMod.playVerbAudio(c.dataset.verb);return}const l=s.target.closest(".nexus-particle-answer-btn");if(l){window.nexusMod.checkNetworkAnswer(l.dataset.particle,l);return}const n=s.target.closest(".nexus-scroll-dial-btn");if(n){window.nexusMod.scrollDial(n.dataset.dialType,parseInt(n.dataset.dialDir));return}if(s.target.closest(".nexus-check-cipher-btn")){window.nexusMod.checkCipher();return}if(s.target.closest(".nexus-restart-btn")){window.nexusMod.init(window.nexusMod.root);return}}))}destroy(){window.removeEventListener("resize",this._resizeHandler),this._clearSynthTimer(),this._stopNetCanvas(),this.root&&(this.root.innerHTML="")}_clearSynthTimer(){this.synthHintTimer&&(clearTimeout(this.synthHintTimer),this.synthHintTimer=null)}_showIntro(){this.root.innerHTML=`
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
    `,this._createStars(50)}_createStars(e){const s=document.getElementById("nexus-stars");if(!s)return;let t="";for(let i=0;i<e;i++){const r=Math.random()*100,a=Math.random()*100,o=Math.random()*3+2;t+=`<div class="nexus-star" style="left:${r}%; top:${a}%; width:2px; height:2px; --dur:${o}s"></div>`}s.innerHTML=t}startSynthesis(){this.mode="synthesis";const s=[...this.allPhrasals.filter(t=>t.ex)].sort(()=>.5-Math.random());if(this.queue=s.slice(0,10),this.queue.length===0){typeof UI!="undefined"&&UI.toast&&UI.toast("Sentezlenecek kelime bulunamad\u0131!");return}this.score=0,this.combo=0,this.currentIndex=0,this.nextSynthesisWord()}nextSynthesisWord(){if(this._clearSynthTimer(),this.currentIndex>=this.queue.length){this._showResults("Sentez D\xF6ng\xFCs\xFC Tamamland\u0131");return}this.current=this.queue[this.currentIndex],this.locked=!1,this.synthSelected={verb:null,particle:null,verbId:null,particleId:null};let e=[this.current.verb],s=this.allVerbs.filter(r=>r!==this.current.verb).sort(()=>.5-Math.random()).slice(0,3);e.push(...s),e.sort(()=>.5-Math.random());let t=[this.current.particle],i=this.allParticles.filter(r=>r!==this.current.particle).sort(()=>.5-Math.random()).slice(0,3);t.push(...i),t.sort(()=>.5-Math.random()),this.currentSynthPool={verbs:e,parts:t},this._renderSynthesis(),this.synthHintTimer=setTimeout(()=>{this.mode==="synthesis"&&!this.locked&&!this.synthSelected.verb&&this._autoFillVerb()},1e4)}_autoFillVerb(){const e=this.current.verb,s=this.currentSynthPool.verbs.indexOf(e);if(s!==-1){const t=`sorb-v-${s}`;this.selectSynthOrb("verb",e,t,!0),typeof UI!="undefined"&&UI.toast&&UI.toast("Sistem yard\u0131m\u0131: Fiil senkronize edildi.")}}_renderSynthesis(){const e=new RegExp(`\\b${this.current.phrase.replace(/ /g,"\\s+")}\\b`,"gi");let s=this.current.ex.replace(e,'<span class="synth-blank"></span>');if(s===this.current.ex){const t=new RegExp(`\\b${this.current.verb}[a-z]*\\b`,"gi"),i=new RegExp(`\\b${this.current.particle}\\b`,"gi");s=s.replace(t,"___").replace(i,"___")}this.root.innerHTML=`
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge">SENTEZ MODU</span></h1>
        <p class="nexus-subtitle">F\xFCzyon A\u015Famas\u0131 ${this.currentIndex+1} / ${this.queue.length}</p>
      </div>
      
      <div class="synth-game-container animate-in">
         <div style="font-size:1.1rem; color:var(--text-3); margin-bottom:10px; font-weight:700;">HEDEF ANLAM: <span style="color:var(--cyan)">${this.current.tr}</span></div>
         <div class="synth-sentence" id="synth-sentence">"${s}"</div>
         
         <div class="synth-reactor" id="synth-reactor">
            <div class="synth-slot nexus-clear-slot-btn" id="slot-verb" data-slot-type="verb">F\u0130\u0130L</div>
            <div class="synth-plus">+</div>
            <div class="synth-slot nexus-clear-slot-btn" id="slot-particle" data-slot-type="particle">EDAT</div>
         </div>

         <div class="synth-pool">
            ${this.currentSynthPool.verbs.map((t,i)=>`<div class="synth-orb verb nexus-select-orb-btn" id="sorb-v-${i}" data-orb-type="verb" data-orb-word="${t.replace(/"/g,"&quot;")}" data-orb-id="sorb-v-${i}">${t}</div>`).join("")}
            ${this.currentSynthPool.parts.map((t,i)=>`<div class="synth-orb particle nexus-select-orb-btn" id="sorb-p-${i}" data-orb-type="particle" data-orb-word="${t.replace(/"/g,"&quot;")}" data-orb-id="sorb-p-${i}">${t}</div>`).join("")}
         </div>
      </div>

      <div class="nexus-hud">
        <div class="nexus-stat">\u2B50 <span id="nx-score">${this.score}</span> XP</div>
        <div class="nexus-stat">\u{1F525} <span id="nx-combo">${this.combo}</span></div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `,this._createStars(30)}selectSynthOrb(e,s,t,i=!1){if(this.locked||this.synthSelected[e]!==null)return;!i&&e==="verb"&&this._clearSynthTimer(),this.app.audio&&this.app.audio.play("tick"),this.synthSelected[e]=s,this.synthSelected[e+"Id"]=t;const r=document.getElementById(t);r&&r.classList.add("used");const a=document.getElementById(`slot-${e}`);a&&(a.innerText=s,a.classList.add("filled",e)),this.synthSelected.verb&&this.synthSelected.particle&&(this.locked=!0,this._clearSynthTimer(),setTimeout(()=>this.checkSynthesis(),400))}clearSynthSlot(e){if(this.locked||!this.synthSelected[e])return;this.app.audio&&this.app.audio.play("pop");const s=this.synthSelected[e+"Id"],t=document.getElementById(s);t&&t.classList.remove("used"),this.synthSelected[e]=null,this.synthSelected[e+"Id"]=null;const i=document.getElementById(`slot-${e}`);i&&(i.innerText=e==="verb"?"F\u0130\u0130L":"EDAT",i.classList.remove("filled",e))}checkSynthesis(){var a,o;const e=this.synthSelected.verb===this.current.verb,s=this.synthSelected.particle===this.current.particle,t=document.getElementById("slot-verb"),i=document.getElementById("slot-particle"),r=document.getElementById("synth-reactor");if(e&&s){this.app.audio&&this.app.audio.play("correct"),t&&t.classList.add("success"),i&&i.classList.add("success"),r&&(r.style.borderColor="#10b981",r.style.background="radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 80%)");const c=document.getElementById("synth-sentence");if(c){c.textContent="";const n=document.createTextNode('"'+this.current.ex+'"');c.appendChild(n);const d=document.createElement("div");d.style.cssText="color:#ec4899; margin-top:20px; font-size:1.5rem; font-weight:800; letter-spacing:3px;",d.textContent="F\xDCZYON BA\u015EARILI!",c.appendChild(d),c.style.color="#10b981"}this.app.speakWord&&this.app.speakWord(this.current.ex);const l=(o=(a=window.remoteFlags)==null?void 0:a.xp_nexus_base)!=null?o:15;this.score+=l*3+this.combo*10,this.combo++,this._updateHUD(),setTimeout(()=>{this.currentIndex++,this.nextSynthesisWord()},3500)}else this.app.audio&&this.app.audio.play("error"),t&&t.classList.add("error"),i&&i.classList.add("error"),this.combo=0,this._updateHUD(),setTimeout(()=>{if(t&&t.classList.remove("error"),i&&i.classList.remove("error"),this.synthSelected.verbId){const c=document.getElementById(this.synthSelected.verbId);c&&c.classList.remove("used")}if(this.synthSelected.particleId){const c=document.getElementById(this.synthSelected.particleId);c&&c.classList.remove("used")}this.synthSelected={verb:null,particle:null,verbId:null,particleId:null},t&&(t.innerText="F\u0130\u0130L",t.classList.remove("filled","verb")),i&&(i.innerText="EDAT",i.classList.remove("filled","particle")),this.locked=!1},800)}startNetwork(){this.mode="network";const e=[...this.constellations].sort(()=>.5-Math.random());if(this.queue=e.slice(0,5),this.queue.length===0){typeof UI!="undefined"&&UI.toast&&UI.toast("Tak\u0131my\u0131ld\u0131z\u0131 olu\u015Fturacak yeterli kelime bulunamad\u0131!");return}this.score=0,this.combo=0,this.currentIndex=0,this.nextNetworkWord()}nextNetworkWord(){if(this.currentIndex>=this.queue.length){this._showResults("A\u011F B\xFCt\xFCnle\u015Ftirildi");return}this.current=this.queue[this.currentIndex],this.locked=!1,this._renderNetwork()}_renderNetwork(){this.currentTasks=[...this.current.tasks].sort(()=>.5-Math.random()),this.currentTaskIndex=0;let e=this.currentTasks.map(t=>t.particle),s=this.allParticles.filter(t=>!e.includes(t));s.sort(()=>.5-Math.random()),e=[...e,...s.slice(0,3)],e.sort(()=>.5-Math.random()),this.root.innerHTML=`
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
        ${e.map((t,i)=>{const r=t.length<=4?"0.95rem":t.length<=7?"0.78rem":"0.65rem";return`<div class="nexus-particle-node nexus-particle-answer-btn" id="particle-${i}" style="font-size:${r}" data-particle="${t.replace(/"/g,"&quot;")}">${t}</div>`}).join("")}
      </div>

      <div class="nexus-hud">
        <div class="nexus-stat">\u2B50 <span id="nx-score">${this.score}</span> XP</div>
        <div class="nexus-stat">\u{1F525} <span id="nx-combo">${this.combo}</span></div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `,setTimeout(()=>this._positionNodes(),30),this._createStars(40),this.app.audio&&this.app.audio.play("pop")}_positionNodes(){const e=document.getElementById("nexus-board"),s=document.getElementById("nexus-core");if(!e||!s)return;const t=e.getBoundingClientRect(),i=t.width/2,r=t.height/2,o=window.innerWidth<=480?74:90,c=o/2+12,l=Math.max(r,c+Math.min(t.width,t.height)*.38);s.style.left=`${i-s.offsetWidth/2}px`,s.style.top=`${l-s.offsetHeight/2}px`;const n=document.querySelectorAll(".nexus-particle-node"),d=o/2,h=i-d-4,p=Math.min(t.width,t.height)*.38,u=Math.max(p,window.innerWidth<600?100:150),m=Math.min(u,l-c,h);n.forEach((x,b)=>{const v=b/n.length*Math.PI*2-Math.PI/2,f=i+Math.cos(v)*m-x.offsetWidth/2,y=l+Math.sin(v)*m-x.offsetHeight/2;x.style.left=`${f}px`,x.style.top=`${y}px`,setTimeout(()=>x.classList.add("appeared"),80+b*80)}),this._redrawLines(),this._startNetCanvas()}_redrawLines(e=null){const s=document.getElementById("nexus-core"),t=document.getElementById("nexus-svg");if(!s||!t)return;t.innerHTML="";const i=s.getBoundingClientRect(),r=document.getElementById("nexus-board").getBoundingClientRect(),a=i.left+i.width/2-r.left,o=i.top+i.height/2-r.top;document.querySelectorAll(".nexus-particle-node").forEach(c=>{const l=c.getBoundingClientRect(),n=l.left+l.width/2-r.left,d=l.top+l.height/2-r.top,h=c.classList.contains("solved"),p=h&&c===e,u=document.createElementNS("http://www.w3.org/2000/svg","path");if(p){u.setAttribute("d",`M ${n} ${d} L ${a} ${o}`);const m=Math.round(Math.sqrt((n-a)**2+(d-o)**2));u.style.setProperty("--line-len",m),u.setAttribute("class","nexus-line snap-line")}else h?(u.setAttribute("d",`M ${a} ${o} L ${n} ${d}`),u.setAttribute("class","nexus-line correct-line")):(u.setAttribute("d",`M ${a} ${o} L ${n} ${d}`),u.setAttribute("class","nexus-line ambient-line"));t.appendChild(u)})}_drawLineTo(e){this._redrawLines(e)}checkNetworkAnswer(e,s){var i,r;if(this.locked||s.classList.contains("solved"))return;const t=this.currentTasks[this.currentTaskIndex];if(e===t.particle){this.locked=!0,s.classList.add("solved"),this._drawLineTo(s);const a=document.getElementById("nexus-core");a&&(a.classList.add("just-solved"),setTimeout(()=>a.classList.remove("just-solved"),900)),this.app.audio&&this.app.audio.play("correct"),this.app.speakWord&&this.app.speakWord(t.phrase);const o=(r=(i=window.remoteFlags)==null?void 0:i.xp_nexus_base)!=null?r:15;this.score+=o*2+this.combo*5,this.combo++,this._updateHUD();const c=document.getElementById("nx-q"),l=document.getElementById("nx-feedback");c&&(c.style.display="none"),l&&(l.style.display="flex",document.getElementById("nx-phrase-res").innerText=t.phrase,document.getElementById("nx-ex-res").innerText=`"${t.ex}"`),this.currentTaskIndex++,setTimeout(()=>{if(this.currentTaskIndex>=this.currentTasks.length)this._completeConstellation();else{c&&(c.style.display="block",c.innerText=this.currentTasks[this.currentTaskIndex].tr),l&&(l.style.display="none");const n=document.querySelector(".nexus-task-progress");n&&(n.innerText=`D\xFC\u011F\xFCm ${this.currentTaskIndex+1} / ${this.currentTasks.length}`),this.locked=!1}},2500)}else s.classList.add("wrong"),this.app.audio&&this.app.audio.play("error"),this.combo=0,this._updateHUD(),setTimeout(()=>{s.classList.remove("wrong")},800)}_completeConstellation(){var r,a;this.app.audio&&this.app.audio.play("level_up");const e=document.getElementById("nexus-core");if(e&&e.classList.add("constellation-complete-glow"),document.querySelectorAll(".correct-line, .snap-line").forEach(o=>o.classList.add("pulse-line")),e){const o=e.getBoundingClientRect(),c=o.left+o.width/2,l=o.top+o.height/2;document.querySelectorAll(".nexus-particle-node:not(.solved)").forEach((n,d)=>{const h=n.getBoundingClientRect(),p=c-(h.left+h.width/2),u=l-(h.top+h.height/2);n.style.transition=`transform 0.55s ${.08*d}s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ${.08*d+.1}s ease`,n.style.transform=`translate(${p}px, ${u}px) scale(0)`,n.style.opacity="0",n.style.pointerEvents="none"})}const s=(a=(r=window.remoteFlags)==null?void 0:r.xp_nexus_base)!=null?a:15;this.score+=s*7,this._updateHUD();const t=document.getElementById("nx-q"),i=document.getElementById("nx-feedback");t&&(t.style.display="none"),i&&(i.style.display="flex",i.innerHTML=`
            <div style="font-size:2.5rem; margin-bottom:10px; filter: drop-shadow(0 0 10px #8b5cf6);">\u{1F30C}</div>
            <div class="nexus-phrase-result" style="color:#8b5cf6">A\u011F Tamamland\u0131!</div>
            <div class="nexus-example-text" style="color:#fff">+100 XP A\u011F Bonusu</div>
          `),setTimeout(()=>{this.currentIndex++,this.nextNetworkWord()},3500)}_startNetCanvas(){this._stopNetCanvas();const e=document.getElementById("nexus-net-canvas");if(!e)return;const s=e.getContext("2d"),t=document.getElementById("nexus-board");t&&(e.width=t.offsetWidth,e.height=t.offsetHeight);const i=[];for(let a=0;a<22;a++)i.push({x:Math.random()*e.width,y:Math.random()*e.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.4+.4,a:Math.random()*.35+.08});const r=()=>{if(!e.isConnected){this._stopNetCanvas();return}s.clearRect(0,0,e.width,e.height);const a=e.width/2,o=e.height/2,c=Math.min(e.width,e.height)*.46,l=s.createRadialGradient(a,o,0,a,o,c);l.addColorStop(0,"rgba(139,92,246,0.13)"),l.addColorStop(1,"rgba(139,92,246,0)"),s.fillStyle=l,s.fillRect(0,0,e.width,e.height),i.forEach(n=>{n.x+=n.vx,n.y+=n.vy,n.x<0&&(n.x=e.width),n.x>e.width&&(n.x=0),n.y<0&&(n.y=e.height),n.y>e.height&&(n.y=0),s.beginPath(),s.arc(n.x,n.y,n.r,0,Math.PI*2),s.fillStyle=`rgba(167,139,250,${n.a})`,s.fill()}),this._netRaf=requestAnimationFrame(r)};r()}_stopNetCanvas(){this._netRaf&&(cancelAnimationFrame(this._netRaf),this._netRaf=null)}startCipher(){this.mode="cipher";const s=[...this.allPhrasals.filter(t=>t.ex)].sort(()=>.5-Math.random());if(this.queue=s.slice(0,10),this.queue.length===0){typeof UI!="undefined"&&UI.toast&&UI.toast("\u015Eifrelenecek kelime bulunamad\u0131!");return}this.score=0,this.combo=0,this.currentIndex=0,this.nextCipherWord()}nextCipherWord(){if(this.currentIndex>=this.queue.length){this._showResults("T\xFCm \u015Eifreler K\u0131r\u0131ld\u0131");return}this.current=this.queue[this.currentIndex],this.locked=!1,this.cipherVerbs=[this.current.verb];let e=this.allVerbs.filter(t=>t!==this.current.verb).sort(()=>.5-Math.random()).slice(0,4);this.cipherVerbs.push(...e),this.cipherVerbs.sort(()=>.5-Math.random()),this.cipherVerbIdx=Math.floor(Math.random()*this.cipherVerbs.length),this.cipherParticles=[this.current.particle];let s=this.allParticles.filter(t=>t!==this.current.particle).sort(()=>.5-Math.random()).slice(0,4);this.cipherParticles.push(...s),this.cipherParticles.sort(()=>.5-Math.random()),this.cipherParticleIdx=Math.floor(Math.random()*this.cipherParticles.length),this._renderCipher()}_renderCipher(){let e=this.current.ex;const s=new RegExp(this.current.phrase.replace(/ /g,"\\s+"),"gi");if(e=e.replace(s,'<span class="cipher-blank">[ ? ]</span>'),!e.includes("cipher-blank")){const t=new RegExp(`\\b${this.current.verb}[a-z]*\\b`,"gi"),i=new RegExp(`\\b${this.current.particle}\\b`,"gi");e=e.replace(t,"___").replace(i,"___")}this.root.innerHTML=`
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
    `,this._createStars(40)}scrollDial(e,s){if(!this.locked)if(this.app.audio&&this.app.audio.play("tick"),e==="verb"){this.cipherVerbIdx+=s,this.cipherVerbIdx<0&&(this.cipherVerbIdx=this.cipherVerbs.length-1),this.cipherVerbIdx>=this.cipherVerbs.length&&(this.cipherVerbIdx=0);const t=document.getElementById("cipher-w-verb");t.innerText=this.cipherVerbs[this.cipherVerbIdx],t.classList.add("glow"),setTimeout(()=>t.classList.remove("glow"),200)}else{this.cipherParticleIdx+=s,this.cipherParticleIdx<0&&(this.cipherParticleIdx=this.cipherParticles.length-1),this.cipherParticleIdx>=this.cipherParticles.length&&(this.cipherParticleIdx=0);const t=document.getElementById("cipher-w-particle");t.innerText=this.cipherParticles[this.cipherParticleIdx],t.classList.add("glow"),setTimeout(()=>t.classList.remove("glow"),200)}}checkCipher(){var o,c;if(this.locked)return;const e=this.cipherVerbs[this.cipherVerbIdx],s=this.cipherParticles[this.cipherParticleIdx],t=e===this.current.verb,i=s===this.current.particle,r=document.getElementById("cipher-w-verb"),a=document.getElementById("cipher-w-particle");if(t&&i){this.locked=!0,this.app.audio&&this.app.audio.play("correct"),r.classList.add("correct"),a.classList.add("correct");const l=document.getElementById("cipher-sentence");l.textContent="";const n=document.createTextNode('"'+this.current.ex+'"');l.appendChild(n);const d=document.createElement("div");d.style.cssText="color:#10b981; margin-top:15px; font-size:1.3rem; font-weight:800; text-transform:uppercase; letter-spacing:2px;",d.textContent="\u{1F510} \u015E\u0130FRE KIRILDI!",l.appendChild(d),l.style.borderColor="#10b981",l.style.background="rgba(16, 185, 129, 0.15)",l.style.transform="scale(1.05)",this.app.speakWord&&this.app.speakWord(this.current.ex);const h=(c=(o=window.remoteFlags)==null?void 0:o.xp_nexus_base)!=null?c:15;this.score+=h*2+this.combo*5,this.combo++,this._updateHUD(),setTimeout(()=>{this.currentIndex++,this.nextCipherWord()},3500)}else this.app.audio&&this.app.audio.play("error"),t||(r.classList.add("wrong"),setTimeout(()=>r.classList.remove("wrong"),500)),i||(a.classList.add("wrong"),setTimeout(()=>a.classList.remove("wrong"),500)),this.combo=0,this._updateHUD()}playVerbAudio(e){this.app.speakWord&&this.app.speakWord(e);const s=document.getElementById("nexus-core");s&&(s.classList.add("active"),setTimeout(()=>s.classList.remove("active"),300))}_updateHUD(){const e=document.getElementById("nx-score"),s=document.getElementById("nx-combo");e&&(e.innerText=this.score),s&&(s.innerText=this.combo)}_showResults(e){var i,r,a;const s=(r=(i=window.remoteFlags)==null?void 0:i.multiplier_medium)!=null?r:1.5,t=Math.round(this.score*s);this.app.addXP&&this.score>0&&this.app.addXP(this.score,"medium","nexus"),(a=window.analyticsManager)==null||a.lessonComplete("nexus",this.score),this.root.innerHTML=`
      <div class="nexus-header">
        <h1 class="nexus-title">NEXUS <span class="v5-badge">BA\u015EARILI</span></h1>
      </div>
      <div class="nexus-game-area" style="text-align:center;">
        <div style="font-size:4.5rem; margin-bottom:15px; text-shadow: 0 0 20px var(--cyan);">\u{1F3C6}</div>
        <h2 style="color:#fff; font-size:2.2rem; margin-bottom:10px; font-weight:800;">${e}!</h2>
        <p style="color:var(--text-2); font-size:1.2rem; margin-bottom:30px;">Kazan\u0131lan Toplam XP: <strong style="color:var(--cyan)">+${t}</strong></p>
        <div style="display:flex; gap:15px; justify-content:center;">
           <button class="btn btn-primary nexus-intro-btn nexus-restart-btn">MOD SE\xC7\u0130M\u0130</button>
           <button class="btn btn-ghost" style="padding: 16px 30px; font-size: 1.1rem;" data-action="navigate" data-target="home">ANA MERKEZ</button>
        </div>
      </div>
      <div class="nexus-bg-stars" id="nexus-stars"></div>
    `,this._createStars(100),typeof confetti=="function"&&confetti({particleCount:200,spread:90,origin:{y:.6},colors:["#00d4ff","#7c3aed","#ec4899","#10b981"]})}}
