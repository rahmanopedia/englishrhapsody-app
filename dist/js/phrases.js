const PTH_GENRES={Aksiyon:{cls:"action",icon:"\u2694\uFE0F",label:"Aksiyon"},"Bilim Kurgu":{cls:"scifi",icon:"\u{1F680}",label:"Bilim Kurgu"},Komedi:{cls:"comedy",icon:"\u{1F604}",label:"Komedi"},Drama:{cls:"drama",icon:"\u{1F3AD}",label:"Drama"},Romantik:{cls:"romance",icon:"\u{1F495}",label:"Romantik"},M\u00FCzikal:{cls:"musical",icon:"\u{1F3B5}",label:"M\xFCzikal"},Gerilim:{cls:"thriller",icon:"\u{1F52A}",label:"Gerilim"},Spor:{cls:"sport",icon:"\u26BD",label:"Spor"},Animasyon:{cls:"anim",icon:"\u2728",label:"Animasyon"},"Daily Life":{cls:"comedy",icon:"\u{1F3E0}",label:"G\xFCnl\xFCk Hayat"},Work:{cls:"drama",icon:"\u{1F4BC}",label:"\u0130\u015F Hayat\u0131"},"Food & Drink":{cls:"comedy",icon:"\u{1F37D}\uFE0F",label:"Yemek & \u0130\xE7ecek"},Travel:{cls:"scifi",icon:"\u2708\uFE0F",label:"Seyahat"},Shopping:{cls:"musical",icon:"\u{1F6CD}\uFE0F",label:"Al\u0131\u015Fveri\u015F"},Health:{cls:"thriller",icon:"\u2764\uFE0F",label:"Sa\u011Fl\u0131k"},Education:{cls:"default",icon:"\u{1F4DA}",label:"E\u011Fitim"},Sports:{cls:"sport",icon:"\u26BD",label:"Spor"},Technology:{cls:"scifi",icon:"\u{1F4BB}",label:"Teknoloji"},Nature:{cls:"thriller",icon:"\u{1F33F}",label:"Do\u011Fa"}},PTH_DEFAULT_GENRE={cls:"default",icon:"\u{1F3AC}",label:"Film"},MASTERY_COLORS=["pth-m0","pth-m1","pth-m2","pth-m3"];class PhrasesModule{constructor(t){this.app=t,this.el=null,this.data=[],this.idx=0,this.mode="cinema",this.revealed=!1;try{this.mastery=JSON.parse(localStorage.getItem("pth-mastery")||"{}")}catch(e){this.mastery={}}try{this.favorites=new Set(JSON.parse(localStorage.getItem("pth-favs")||"[]"))}catch(e){this.favorites=new Set}this.session={correct:0,wrong:0},this._txStart=0,this._tyStart=0,this._blankMeta=null,this._speakTimer=null}init(t){if(this.el=t,typeof CINEMA_DATA=="undefined"||!CINEMA_DATA.length){t.innerHTML='<div style="color:#fff;padding:60px 20px;text-align:center;font-size:1.1rem">Veri y\xFCkleniyor\u2026</div>';return}this._loadData(),this._render()}_loadData(){const t=[];let e=0;for(const s of CINEMA_DATA){const i=PTH_GENRES[s.category]||PTH_DEFAULT_GENRE,a=s.film||"Rhapsody Cinema",o=s.year||"";if(Array.isArray(s.questions))for(const n of s.questions)n.phrase&&n.correct&&t.push({id:`p${e++}`,en:n.phrase.trim(),tr:n.correct.trim(),wrong:n.wrong?[n.wrong.trim()]:[],film:a,year:o,genre:i});if(Array.isArray(s.options)){const n=s.options.find(l=>l.isCorrect);s.transcript&&n&&t.push({id:`p${e++}`,en:s.transcript.trim(),tr:n.text.trim(),wrong:s.options.filter(l=>!l.isCorrect).map(l=>l.text),film:a,year:o,genre:i})}}this.data=this._shuffle(t.filter(s=>s.en&&s.tr))}_shuffle(t){const e=[...t];for(let s=e.length-1;s>0;s--){const i=Math.floor(Math.random()*(s+1));[e[s],e[i]]=[e[i],e[s]]}return e}_render(){this.el.innerHTML=`
      <div class="pth-root" id="pth-root">

        <!-- Atmospheric Background -->
        <div class="pth-atm" id="pth-atm">
          <div class="pth-orb pth-orb-a"></div>
          <div class="pth-orb pth-orb-b"></div>
          <div class="pth-orb pth-orb-c"></div>
        </div>

        <!-- Top Bar -->
        <div class="pth-topbar">
          <button class="pth-exit-btn" id="pth-exit" aria-label="Geri">\u2039</button>
          <div class="pth-topbar-mid">
            <div class="pth-logo-line">\u{1F3AC} Phrase Theater</div>
            <div class="pth-counter" id="pth-counter"></div>
          </div>
          <button class="pth-fav-btn" id="pth-fav" aria-label="Favorilere ekle">\u2661</button>
        </div>

        <!-- Mode Tabs -->
        <div class="pth-tabs">
          <button class="pth-tab active" data-mode="cinema">\u{1F3AC} Sinema</button>
          <button class="pth-tab" data-mode="fillblank">\u270F\uFE0F Bo\u015Fluk</button>
          <button class="pth-tab" data-mode="multichoice">\u{1F3AF} Se\xE7im</button>
        </div>

        <!-- Progress -->
        <div class="pth-prog-track">
          <div class="pth-prog-fill" id="pth-prog" style="width:0%"></div>
        </div>

        <!-- Card Stage -->
        <div class="pth-stage">
          <div class="pth-card-wrap" id="pth-wrap"></div>
        </div>

        <!-- Bottom Nav -->
        <div class="pth-nav">
          <button class="pth-nav-btn" id="pth-prev" aria-label="\xD6nceki">\u2190</button>
          <div class="pth-dots-row" id="pth-dots"></div>
          <button class="pth-nav-btn" id="pth-next-btn" aria-label="Sonraki">\u2192</button>
        </div>

      </div>`,this._bindShell(),this._drawCard()}_bindShell(){const t=s=>this.el.querySelector(s);t("#pth-exit").onclick=()=>this._exit(),t("#pth-fav").onclick=()=>this._toggleFav(),this.el.querySelectorAll(".pth-tab").forEach(s=>{s.onclick=()=>{this.el.querySelectorAll(".pth-tab").forEach(i=>i.classList.remove("active")),s.classList.add("active"),this.mode=s.dataset.mode,this.revealed=!1,this._drawCard()}}),t("#pth-prev").onclick=()=>this._go(-1),t("#pth-next-btn").onclick=()=>this._go(1);const e=t("#pth-root");e.addEventListener("touchstart",s=>{this._txStart=s.touches[0].clientX,this._tyStart=s.touches[0].clientY},{passive:!0}),e.addEventListener("touchend",s=>{const i=s.changedTouches[0].clientX-this._txStart,a=s.changedTouches[0].clientY-this._tyStart;Math.abs(i)>Math.abs(a)&&Math.abs(i)>52&&this._go(i<0?1:-1)},{passive:!0})}_setAtmosphere(){const t=this.data[this.idx],e=this.el.querySelector("#pth-atm");!e||!t||(e.className=`pth-atm pth-g-${t.genre.cls}`)}_drawCard(t="in"){var a;const e=this.data[this.idx];if(!e){this._showDone();return}this._setAtmosphere(),this._updateTopbar(),this._renderDots();const s=(a=this.el)==null?void 0:a.querySelector("#pth-wrap");if(!s)return;s.innerHTML="";const i=document.createElement("div");i.className="pth-card",this.mode==="cinema"?i.innerHTML=this._cinemaTpl(e):this.mode==="fillblank"?i.innerHTML=this._fillBlankTpl(e):i.innerHTML=this._multiChoiceTpl(e),s.appendChild(i),requestAnimationFrame(()=>i.classList.add("pth-card-in")),this._bindCard(i,e),this.mode==="cinema"&&(clearTimeout(this._speakTimer),this._speakTimer=setTimeout(()=>this._speak(e.en),320))}_animOut(t,e){const s=this.el.querySelector(".pth-card");if(!s){e();return}s.classList.add(t>0?"pth-card-out-l":"pth-card-out-r"),setTimeout(e,260)}_go(t){const e=this.idx+t;e<0||e>=this.data.length||this._animOut(t,()=>{this.idx=e,this.revealed=!1,this._drawCard(t)})}_updateTopbar(){const t=this.data[this.idx],e=this.el.querySelector("#pth-counter"),s=this.el.querySelector("#pth-fav"),i=this.el.querySelector("#pth-prog"),a=this.el.querySelector("#pth-prev"),o=this.el.querySelector("#pth-next-btn");if(e&&(e.textContent=`${this.idx+1} / ${this.data.length}`),s&&t){const n=this.favorites.has(t.id);s.textContent=n?"\u2665":"\u2661",s.classList.toggle("is-fav",n)}i&&this.data.length>0&&(i.style.width=`${this.idx/Math.max(1,this.data.length-1)*100}%`),a&&(a.disabled=this.idx===0),o&&(o.disabled=this.idx>=this.data.length-1)}_renderDots(){const t=this.el.querySelector("#pth-dots");if(!t)return;const e=this.data.length,s=9,i=Math.floor(s/2);let a=Math.max(0,Math.min(this.idx-i,e-s));const o=Math.min(e,a+s);t.innerHTML=Array.from({length:o-a},(n,l)=>{var v;const h=a+l,d=Math.min(3,this.mastery[(v=this.data[h])==null?void 0:v.id]||0);return`<div class="pth-dot ${h===this.idx?"cur":MASTERY_COLORS[d]}"></div>`}).join("")}_cinemaTpl(t){return`
      <div class="pth-genre-badge">${t.genre.icon} ${t.genre.label}</div>

      <div class="pth-quote-zone" id="pth-quote-zone">
        <div class="pth-qm pth-qm-open">&ldquo;</div>
        <div class="pth-quote-en">${this._esc(t.en)}</div>
        <div class="pth-qm pth-qm-close">&rdquo;</div>

        <div class="pth-film-credit">
          <div class="pth-film-glow"></div>
          <span class="pth-film-name">${this._esc(t.film)}</span>
          ${t.year?`<span class="pth-film-year">${t.year}</span>`:""}
        </div>

        <div class="pth-tap-hint" id="pth-tap-hint">
          <div class="pth-tap-pulse"></div>
          T\xFCrk\xE7esini g\xF6rmek i\xE7in dokun
        </div>
      </div>

      <div class="pth-tr-panel" id="pth-tr-panel">
        <div class="pth-tr-lbl">T\xFCrk\xE7esi</div>
        <div class="pth-tr-text">${this._esc(t.tr)}</div>
      </div>

      <div class="pth-cine-ctrl" id="pth-cine-ctrl">
        <button class="pth-btn-no"    id="pth-btn-no">\u{1F615} Bilmiyorum</button>
        <button class="pth-btn-audio" id="pth-btn-audio">\u{1F50A}</button>
        <button class="pth-btn-know"  id="pth-btn-know">\u2713 Biliyorum</button>
      </div>`}_bindCard(t,e){var i,a,o,n,l,h,d;const s=r=>t.querySelector(r);this.mode==="cinema"?(s("#pth-quote-zone").onclick=()=>this._reveal(),(i=s("#pth-btn-no"))==null||i.addEventListener("click",r=>{r.stopPropagation(),this._rate(!1)}),(a=s("#pth-btn-know"))==null||a.addEventListener("click",r=>{r.stopPropagation(),this._rate(!0)}),(o=s("#pth-btn-audio"))==null||o.addEventListener("click",r=>{r.stopPropagation(),this._speak(e.en,s("#pth-btn-audio"))})):this.mode==="fillblank"?(t.querySelectorAll(".pth-chip").forEach(r=>{r.addEventListener("click",()=>this._fillChip(r,t))}),(n=s("#pth-fb-check"))==null||n.addEventListener("click",()=>this._checkFill(t,e)),(l=s("#pth-fb-skip"))==null||l.addEventListener("click",()=>this._go(1)),(h=s("#pth-sm-audio"))==null||h.addEventListener("click",()=>this._speak(e.en))):(t.querySelectorAll(".pth-mc-opt").forEach(r=>{r.addEventListener("click",()=>this._pickMC(r,t,e))}),(d=s("#pth-mc-audio"))==null||d.addEventListener("click",()=>this._speak(e.en)))}_reveal(){if(this.revealed)return;this.revealed=!0;const t=this.el.querySelector("#pth-tap-hint"),e=this.el.querySelector("#pth-tr-panel"),s=this.el.querySelector("#pth-cine-ctrl");t&&(t.style.display="none"),e&&(e.style.display="flex",requestAnimationFrame(()=>e.classList.add("pth-tr-show"))),s&&(s.style.display="flex",requestAnimationFrame(()=>s.classList.add("pth-ctrl-show")))}_rate(t){var i;const e=this.data[this.idx];if(!e)return;const s=this.mastery[e.id]||0;t?(this.mastery[e.id]=Math.min(3,s+1),this.session.correct++,(i=this.app)!=null&&i.addXP&&this.app.addXP(5,"easy","phrases")):(this.mastery[e.id]=Math.max(0,s-1),this.session.wrong++),this._saveMastery(),this._go(1)}_fillBlankTpl(t){const s=t.en.split(/(\s+)/).filter(c=>/\S/.test(c)),i=Math.min(Math.max(1,Math.floor(s.length/4)),3),o=s.map((c,p)=>({w:c.replace(/[^a-zA-Z']/g,""),i:p})).filter(c=>c.w.length>=4).sort((c,p)=>p.w.length-c.w.length).slice(0,i).map(c=>c.i),n=o.map(c=>s[c].replace(/[^a-zA-Z']/g,""));this._blankMeta={answers:n,indices:o,filled:new Array(i).fill(null)};let l=0;const h=s.map((c,p)=>{const f=o.indexOf(p);if(f!==-1){const m="\xB7".repeat(c.replace(/[^a-zA-Z']/g,"").length);return`<span class="pth-blank" data-pos="${f}" data-idx="${p}">${m}</span>`}return`<span class="pth-static-word">${this._esc(c)}</span>`}).join(" "),d=n.slice(),r=this._wrongWords(d,4),v=this._shuffle([...d,...r]);return`
      <div class="pth-fb-head">
        <div class="pth-genre-badge">${t.genre.icon} ${t.genre.label}</div>
        <span class="pth-fb-filmname">${this._esc(t.film)}</span>
      </div>

      <div class="pth-fb-tr-box">
        <div class="pth-fb-tr-lbl">T\xFCrk\xE7esi</div>
        <div class="pth-fb-tr-txt">${this._esc(t.tr)}</div>
      </div>

      <div class="pth-fb-phrase" id="pth-phrase">${h}</div>

      <div class="pth-chips" id="pth-chips">
        ${v.map(c=>`<button class="pth-chip">${this._esc(c)}</button>`).join("")}
      </div>

      <div class="pth-fb-foot">
        <button class="pth-fb-skip" id="pth-fb-skip">Ge\xE7 \u2192</button>
        <button class="pth-sm-audio" id="pth-sm-audio">\u{1F50A}</button>
        <button class="pth-fb-check" id="pth-fb-check" disabled>Kontrol Et</button>
      </div>`}_fillChip(t,e){if(t.classList.contains("used"))return;const s=[...e.querySelectorAll(".pth-blank")].filter(l=>!l.dataset.filled);if(!s.length)return;const i=s[0],a=parseInt(i.dataset.pos);this._blankMeta.filled[a]=t.textContent,i.textContent=t.textContent,i.dataset.filled="1",i.classList.add("filled"),t.classList.add("used");const o=[...e.querySelectorAll(".pth-blank")].every(l=>l.dataset.filled),n=e.querySelector("#pth-fb-check");n&&(n.disabled=!o)}_checkFill(t,e){var n;const s=t.querySelector("#pth-fb-check");if((s==null?void 0:s.textContent)==="Sonraki \u2192"){this._go(1);return}const{answers:i,filled:a}=this._blankMeta;let o=!0;if(t.querySelectorAll(".pth-blank").forEach(l=>{const h=parseInt(l.dataset.pos),d=(a[h]||"").toLowerCase().replace(/[^a-z']/g,""),r=(i[h]||"").toLowerCase();d===r?l.classList.add("correct"):(l.classList.add("wrong"),l.textContent=i[h]+" \u2713",o=!1)}),o){this.session.correct++;const l=this.mastery[e.id]||0;this.mastery[e.id]=Math.min(3,l+1),(n=this.app)!=null&&n.addXP&&this.app.addXP(8,"easy","phrases")}else this.session.wrong++;this._saveMastery(),s&&(s.textContent="Sonraki \u2192",s.disabled=!1)}_wrongWords(t,e){const s=new Set(t.map(a=>a.toLowerCase())),i=[];for(const a of this.data){if(i.length>=e*4)break;for(const o of a.en.split(/\s+/)){const n=o.replace(/[^a-zA-Z']/g,"");n.length>=4&&!s.has(n.toLowerCase())&&(i.push(n),s.add(n.toLowerCase()))}}return this._shuffle(i).slice(0,e)}_multiChoiceTpl(t){const e=this._mcOptions(t);return`
      <div class="pth-mc-head">
        <div class="pth-genre-badge">${t.genre.icon} ${t.genre.label}</div>
        <button class="pth-sm-audio" id="pth-mc-audio">\u{1F50A}</button>
      </div>

      <div class="pth-mc-quote-box">
        <div class="pth-mc-qm">&ldquo;</div>
        <div class="pth-mc-en">${this._esc(t.en)}</div>
        <div class="pth-mc-film">${this._esc(t.film)}${t.year?" \xB7 "+t.year:""}</div>
      </div>

      <div class="pth-mc-label">Do\u011Fru T\xFCrk\xE7e kar\u015F\u0131l\u0131\u011F\u0131 se\xE7</div>

      <div class="pth-mc-opts">
        ${e.map((s,i)=>`
          <button class="pth-mc-opt" data-correct="${s.correct}">
            <span class="pth-opt-key">${"ABCD"[i]}</span>
            <span class="pth-opt-txt">${this._esc(s.text)}</span>
          </button>`).join("")}
      </div>`}_mcOptions(t){const e=new Set([t.tr.toLowerCase()]),s=[];for(const i of t.wrong||[])i&&!e.has(i.toLowerCase())&&(s.push({text:i,correct:!1}),e.add(i.toLowerCase()));if(s.length<3)for(const i of this._shuffle([...this.data])){if(i.id===t.id)continue;const a=i.tr.toLowerCase();if(e.has(a)||(s.push({text:i.tr,correct:!1}),e.add(a)),s.length>=3)break}return this._shuffle([{text:t.tr,correct:!0},...s.slice(0,3)])}_pickMC(t,e,s){var a;const i=t.dataset.correct==="true";e.querySelectorAll(".pth-mc-opt").forEach(o=>{o.disabled=!0,o.dataset.correct==="true"?o.classList.add("opt-correct"):o===t&&!i&&o.classList.add("opt-wrong")}),i?(this.session.correct++,this.mastery[s.id]=Math.min(3,(this.mastery[s.id]||0)+1),(a=this.app)!=null&&a.addXP&&this.app.addXP(5,"easy","phrases")):this.session.wrong++,this._saveMastery(),setTimeout(()=>this._go(1),1100)}_toggleFav(){const t=this.data[this.idx];if(!t)return;const e=this.el.querySelector("#pth-fav");this.favorites.has(t.id)?this.favorites.delete(t.id):(this.favorites.add(t.id),e==null||e.classList.add("pth-fav-pop"),setTimeout(()=>e==null?void 0:e.classList.remove("pth-fav-pop"),450)),localStorage.setItem("pth-favs",JSON.stringify([...this.favorites])),this._updateTopbar()}_speak(t,e){if(!t||typeof speechSynthesis=="undefined")return;speechSynthesis.cancel();const s=new SpeechSynthesisUtterance(t);s.lang="en-US",s.rate=.87;const i=speechSynthesis.getVoices(),a=i.find(o=>o.lang.startsWith("en-")&&!o.name.includes("Google"))||i.find(o=>o.lang.startsWith("en"));a&&(s.voice=a),e&&(e.classList.add("playing"),s.onend=()=>e.classList.remove("playing")),speechSynthesis.speak(s)}_showDone(){const{correct:t,wrong:e}=this.session,s=t+e,i=s>0?Math.round(t/s*100):0,a=Object.values(this.mastery).filter(h=>h>=3).length,o=i>=80?"\u{1F3C6}":i>=50?"\u2B50":"\u{1F4AA}",n=i>=80?"Muhte\u015Fem!":i>=50?"Harika \u0130\u015F!":"Devam Et!",l=this.el.querySelector("#pth-root");l&&(l.innerHTML=`
      <div class="pth-atm pth-g-musical">
        <div class="pth-orb pth-orb-a"></div>
        <div class="pth-orb pth-orb-b"></div>
      </div>
      <div class="pth-done-root">
        <div class="pth-done-content">
          <div class="pth-done-icon">${o}</div>
          <div class="pth-done-title">${n}</div>
          <div class="pth-done-sub">${this.data.length} ifadenin tamam\u0131 gezildi</div>

          <div class="pth-done-stats">
            <div class="pth-ds">
              <div class="pth-ds-val" style="color:#34d399">${t}</div>
              <div class="pth-ds-lbl">Do\u011Fru</div>
            </div>
            <div class="pth-ds">
              <div class="pth-ds-val" style="color:#f87171">${e}</div>
              <div class="pth-ds-lbl">Yanl\u0131\u015F</div>
            </div>
            <div class="pth-ds">
              <div class="pth-ds-val" style="color:#f59e0b">${i}%</div>
              <div class="pth-ds-lbl">Ba\u015Far\u0131</div>
            </div>
            <div class="pth-ds">
              <div class="pth-ds-val" style="color:#a78bfa">${a}</div>
              <div class="pth-ds-lbl">\xD6\u011Frenildi</div>
            </div>
          </div>

          <div class="pth-done-btns">
            <button class="pth-done-primary" id="pth-done-retry">\u{1F504} Tekrar Oyna</button>
            <button class="pth-done-ghost"   id="pth-done-home">\u2190 Ana Men\xFCye D\xF6n</button>
          </div>
        </div>
      </div>`,l.querySelector("#pth-done-retry").onclick=()=>{this.idx=0,this.revealed=!1,this.session={correct:0,wrong:0},this.data=this._shuffle(this.data),this._render()},l.querySelector("#pth-done-home").onclick=()=>this._exit())}_saveMastery(){localStorage.setItem("pth-mastery",JSON.stringify(this.mastery))}_esc(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}_exit(){typeof speechSynthesis!="undefined"&&speechSynthesis.cancel();const t=window._app||window.app;if(t!=null&&t.navigate)t.navigate("home");else{const e=document.querySelector('[data-action="navigate"][data-target="home"]');e&&e.click()}}}(function(){const u=()=>{const t=document.getElementById("phrases-mount-point");t&&(!window.phrasesMod||window.phrasesMod.el!==t)&&(window.phrasesMod=new PhrasesModule(window._app||window.app),window.phrasesMod.init(t))};new MutationObserver(u).observe(document.body,{childList:!0,subtree:!0}),setTimeout(u,800)})();
