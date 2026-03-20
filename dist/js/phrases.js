class PhrasesModule{constructor(e){this.app=e,this.el=null,this.phrases=[],this.index=0,this.revealed=!1}init(e){if(this.el=e,typeof CINEMA_DATA=="undefined"||!CINEMA_DATA.length)return;const i=CINEMA_DATA.map(t=>{var r;return{english:t.transcript,turkish:((r=t.options.find(s=>s.isCorrect))==null?void 0:r.text)||"\u2014",film:t.film||"",year:t.year||"",emoji:t.category==="Spor"?"\u26BD":t.category==="Aksiyon"?"\u{1F3AC}":t.category==="Bilim Kurgu"?"\u{1F680}":t.category==="M\xFCzikal"?"\u{1F3B5}":"\u{1F3AC}"}});this.phrases=this._shuffle(i),this.index=0,this._render()}_shuffle(e){const i=[...e];for(let t=i.length-1;t>0;t--){const r=Math.floor(Math.random()*(t+1));[i[t],i[r]]=[i[r],i[t]]}return i}_render(){this.el.innerHTML=`
      <div id="phrases-root" style="
        position:fixed;inset:0;z-index:200;background:#0f0f1a;
        display:flex;flex-direction:column;overflow:hidden;font-family:'Segoe UI',system-ui,sans-serif;
      ">
        <!-- Header -->
        <div style="position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:16px 16px 0;">
          <button id="phr-exit" style="
            background:rgba(255,255,255,0.1);backdrop-filter:blur(8px);
            border:none;border-radius:12px;padding:8px 14px;
            color:#fff;font-weight:700;font-size:0.8rem;cursor:pointer;
          ">\u2190 Geri</button>
          <div style="text-align:center;">
            <div style="color:#fff;font-weight:900;font-size:0.95rem;">\u{1F4AC} \u0130fadeler</div>
            <div id="phr-counter" style="color:rgba(255,255,255,0.45);font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;"></div>
          </div>
          <div style="width:60px;"></div>
        </div>

        <!-- Progress bar -->
        <div style="margin:10px 16px 0;height:3px;border-radius:3px;background:rgba(255,255,255,0.1);overflow:hidden;">
          <div id="phr-progress" style="height:100%;border-radius:3px;background:linear-gradient(90deg,#a78bfa,#ec4899);transition:width 0.4s;"></div>
        </div>

        <!-- Card area -->
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 16px;gap:16px;">

          <!-- Main card -->
          <div id="phr-card" style="width:100%;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);cursor:pointer;" onclick="window.phrasesMod._handleTap()">
            <!-- English side -->
            <div id="phr-top" style="
              position:relative;display:flex;flex-direction:column;
              align-items:center;justify-content:center;
              padding:36px 24px;gap:12px;min-height:180px;
            ">
              <!-- Film badge -->
              <div id="phr-film" style="
                background:rgba(0,0,0,0.3);border-radius:20px;
                padding:5px 14px;font-size:0.7rem;font-weight:700;
                color:rgba(255,255,255,0.85);letter-spacing:0.5px;
              "></div>

              <!-- English text -->
              <div id="phr-english" style="
                color:#fff;font-weight:900;text-align:center;line-height:1.35;
                font-size:1.35rem;text-shadow:0 2px 12px rgba(0,0,0,0.4);
              "></div>

              <!-- Tap hint -->
              <div id="phr-hint" style="
                color:rgba(255,255,255,0.5);font-size:0.72rem;font-weight:700;
              ">\u{1F446} T\xFCrk\xE7esini g\xF6rmek i\xE7in dokun</div>
            </div>

            <!-- Turkish reveal -->
            <div id="phr-bottom" style="
              background:rgba(255,255,255,0.97);
              display:none;flex-direction:column;
              align-items:center;justify-content:center;
              padding:24px;gap:6px;
            ">
              <div style="color:#94a3b8;font-size:0.65rem;font-weight:900;text-transform:uppercase;letter-spacing:1.5px;">T\xFCrk\xE7esi</div>
              <div id="phr-turkish" style="
                color:#1e293b;font-weight:900;text-align:center;
                font-size:1.2rem;line-height:1.4;
              "></div>
            </div>
          </div>

          <!-- Action buttons (shown after reveal) -->
          <div id="phr-actions" style="width:100%;display:none;flex-direction:row;gap:10px;">
            <button id="phr-speak" onclick="window.phrasesMod._speak()" style="
              background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.15);
              border-radius:14px;padding:14px 18px;color:#fff;font-size:1rem;cursor:pointer;
            ">\u{1F50A}</button>
            <button id="phr-next" onclick="window.phrasesMod._next()" style="
              flex:1;background:linear-gradient(135deg,#a78bfa,#ec4899);
              border:none;border-radius:14px;padding:14px;
              color:#fff;font-weight:900;font-size:0.95rem;cursor:pointer;
              box-shadow:0 6px 20px rgba(167,139,250,0.35);
            ">Sonraki \u2192</button>
          </div>

          <!-- Dot indicators -->
          <div id="phr-dots" style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center;max-width:280px;"></div>
        </div>
      </div>
    `,this.el.querySelector("#phr-exit").onclick=()=>this._exit(),this._updateCard()}_updateCard(){const e=this.phrases[this.index];if(!e){this._showDone();return}this.revealed=!1;const i=this.index/this.phrases.length*100;this.el.querySelector("#phr-counter").textContent=`${this.index+1} / ${this.phrases.length}`,this.el.querySelector("#phr-progress").style.width=`${i}%`,this.el.querySelector("#phr-english").textContent=`"${e.english}"`,this.el.querySelector("#phr-film").textContent=e.film?`\u{1F3AC} ${e.film}${e.year?" \xB7 "+e.year:""}`:"\u{1F3AC}",this.el.querySelector("#phr-turkish").textContent=e.turkish,this.el.querySelector("#phr-bottom").style.display="none",this.el.querySelector("#phr-hint").style.display="block",this.el.querySelector("#phr-actions").style.display="none";const t=["linear-gradient(135deg,#667eea,#764ba2)","linear-gradient(135deg,#f093fb,#f5576c)","linear-gradient(135deg,#4facfe,#00f2fe)","linear-gradient(135deg,#43e97b,#38f9d7)","linear-gradient(135deg,#fa709a,#fee140)","linear-gradient(135deg,#a18cd1,#fbc2eb)","linear-gradient(135deg,#fd7043,#ff8a65)","linear-gradient(135deg,#667eea,#ec4899)"];this.el.querySelector("#phr-top").style.background=t[this.index%t.length],this._renderDots(),this._speak()}_handleTap(){this.revealed||(this.revealed=!0,this.el.querySelector("#phr-bottom").style.display="flex",this.el.querySelector("#phr-hint").style.display="none",this.el.querySelector("#phr-actions").style.display="flex")}_speak(){const e=this.phrases[this.index];if(!e||typeof speechSynthesis=="undefined")return;speechSynthesis.cancel();const i=new SpeechSynthesisUtterance(e.english);i.lang="en-US",i.rate=.85;const r=speechSynthesis.getVoices().find(s=>s.lang.startsWith("en"));r&&(i.voice=r),speechSynthesis.speak(i)}_next(){this.index+1>=this.phrases.length?this._showDone():(this.index++,this._updateCard())}_renderDots(){const e=this.el.querySelector("#phr-dots");e.innerHTML=this.phrases.map((i,t)=>`<div style="
        width:6px;height:6px;border-radius:50%;
        background:${t<this.index?"#a78bfa":t===this.index?"#ec4899":"rgba(255,255,255,0.15)"};
        transform:${t===this.index?"scale(1.5)":"scale(1)"};
        transition:all 0.3s;
      "></div>`).join("")}_showDone(){const e=this.el.querySelector("#phrases-root");e&&(e.innerHTML=`
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:32px;text-align:center;">
        <div style="font-size:5rem;">\u{1F389}</div>
        <div style="color:#fff;font-size:2rem;font-weight:900;">Tebrikler!</div>
        <div style="color:rgba(255,255,255,0.6);font-size:1rem;font-weight:600;">
          ${this.phrases.length} film al\u0131nt\u0131s\u0131n\u0131 tamamlad\u0131n!
        </div>
        <button onclick="window.phrasesMod._exit()" style="
          background:linear-gradient(135deg,#a78bfa,#ec4899);border:none;
          border-radius:20px;padding:16px 36px;color:#fff;font-weight:900;font-size:1rem;
          cursor:pointer;box-shadow:0 8px 24px rgba(167,139,250,0.4);
        ">Ana Men\xFCye D\xF6n</button>
      </div>
    `)}_exit(){typeof speechSynthesis!="undefined"&&speechSynthesis.cancel();const e=window._app||window.app;if(e&&e.navigate)e.navigate("home");else{const i=document.querySelector('[data-action="navigate"][data-target="home"]');i&&i.click()}}}(function(){const n=()=>{const i=document.getElementById("phrases-mount-point");if(i&&(!window.phrasesMod||window.phrasesMod.el!==i)){const t=window._app||window.app;window.phrasesMod=new PhrasesModule(t),window.phrasesMod.init(i)}};new MutationObserver(()=>n()).observe(document.body,{childList:!0,subtree:!0}),setTimeout(n,1e3)})();
