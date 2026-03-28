class CinemaModule{constructor(e){this.app=e,this.el=null,this.video=null,this.clips=[],this.clipIndex=0,this.score=0,this.streak=0,this.selected=null,this.phase="idle",this.syncTimer=null,this.subtitleShown=!1,this._currentEntry=null,this._qIdx=0,this._questions=[]}init(e){this.el=e,!(typeof CINEMA_DATA=="undefined"||!CINEMA_DATA.length)&&(this.clips=this._shuffle([...CINEMA_DATA]),this._render(),this._loadClip(),this._initOrientation())}_shuffle(e){const t=[...e];for(let n=t.length-1;n>0;n--){const i=Math.floor(Math.random()*(n+1));[t[n],t[i]]=[t[i],t[n]]}return t}_render(){this.el.innerHTML=`
      <div id="cine-root" style="
        position:fixed;inset:0;z-index:200;background:#000;
        display:flex;flex-direction:column;overflow:hidden;
      ">
        <!-- Video \u2014 tam ekran arkaplan -->
        <video id="cine-video" playsinline style="
          position:absolute;inset:0;width:100%;height:100%;
          object-fit:cover;background:#000;
        "></video>

        <!-- Genel gradyan -->
        <div style="
          position:absolute;inset:0;pointer-events:none;
          background:linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,transparent 25%,transparent 55%,rgba(0,0,0,0.7) 100%);
        "></div>

        <!-- Yukleniyor overlay -->
        <div id="cine-loader" style="
          position:absolute;inset:0;z-index:25;
          background:#000;
          display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;
        ">
          <div id="cine-spinner" style="
            width:40px;height:40px;border-radius:50%;
            border:3px solid rgba(245,158,11,0.3);
            border-top-color:#f59e0b;
            animation:cine-spin 0.8s linear infinite;
          "></div>
          <div style="color:rgba(245,158,11,0.7);font-size:0.7rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
            Sahne yukleniyor...
          </div>
        </div>

        <!-- Karistirma (soru paneli acikken) -->
        <div id="cine-dim" style="
          position:absolute;inset:0;z-index:10;
          background:rgba(0,0,0,0.55);
          display:none;pointer-events:none;
          transition:opacity 0.3s ease;
        "></div>

        <!-- Kaynak etiketi (sol ust) -->
        <div id="cine-source" style="
          position:absolute;top:68px;left:12px;z-index:15;
          background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);
          border-radius:10px;padding:5px 10px;
          color:rgba(255,255,255,0.8);font-size:0.7rem;font-weight:700;
          letter-spacing:0.3px;display:none;
        "></div>

        <!-- CEFR rozeti (sol ust, kayna\u011F\u0131n yan\u0131na) -->
        <div id="cine-cefr-badge" style="
          position:absolute;top:68px;right:12px;z-index:15;
          background:rgba(124,58,237,0.85);backdrop-filter:blur(8px);
          border-radius:8px;padding:4px 9px;
          color:#fff;font-size:0.68rem;font-weight:900;
          letter-spacing:0.8px;display:none;
        "></div>

        <!-- Altyazi -->
        <div id="cine-subtitle" style="
          position:absolute;left:0;right:0;z-index:15;
          bottom:24px;
          text-align:center;padding:0 20px 0;
          pointer-events:none;
          display:none;
        ">
          <div id="cine-subtitle-inner" style="
            display:inline-block;max-width:92%;
            padding:8px 16px;border-radius:12px;
            font-size:1rem;font-weight:700;line-height:1.5;
            background:rgba(0,0,0,0.75);
          "></div>
        </div>

        <!-- Sonuc banner (merkez) -->
        <div id="cine-result-banner" style="
          position:absolute;z-index:25;
          top:28%;left:50%;transform:translateX(-50%);
          text-align:center;pointer-events:none;
          display:none;
        "></div>

        <!-- Soru paneli (alttan kayar) -->
        <div id="cine-question" style="
          position:absolute;z-index:20;bottom:0;left:0;right:0;
          padding:20px 16px max(24px,env(safe-area-inset-bottom));
          background:linear-gradient(to top, rgba(8,8,18,0.98) 75%, transparent 100%);
          display:none;flex-direction:column;gap:12px;
          transform:translateY(100%);transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        ">
          <!-- Phrase soru -->
          <div id="cine-phrase" style="
            text-align:center;font-size:1rem;font-weight:700;
            color:rgba(255,255,255,0.9);line-height:1.4;
          "></div>
          <!-- Soru etiketi -->
          <div style="text-align:center;color:rgba(255,255,255,0.4);font-size:0.65rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-top:-6px;">
            Turkce karsiligi nedir?
          </div>
          <!-- Secenekler -->
          <div id="cine-choices" style="display:flex;flex-direction:column;gap:8px;"></div>
          <!-- Aksiyon butonlari (cevaptan sonra) -->
          <div id="cine-actions" style="display:none;flex-direction:row;gap:8px;margin-top:2px;"></div>
          <!-- Progress bar -->
          <div id="cine-progress" style="display:flex;gap:4px;padding-top:4px;"></div>
        </div>

        <!-- Bitis ekrani -->
        <div id="cine-done" style="
          position:absolute;inset:0;z-index:30;
          background:#030712;
          display:none;flex-direction:column;align-items:center;justify-content:center;
          text-align:center;padding:32px;gap:20px;
        ">
          <div style="font-size:5rem;">\u{1F3AC}</div>
          <div id="cine-done-title" style="
            font-size:2.5rem;font-weight:900;color:#fff;line-height:1.1;
          ">Harika!</div>
          <div id="cine-done-sub" style="
            color:#f59e0b;font-weight:700;font-size:1.1rem;
          "></div>
          <div id="cine-done-score" style="
            background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);
            border-radius:20px;padding:14px 32px;
            font-size:2rem;font-weight:900;color:#f59e0b;
          "></div>
          <button id="cine-done-exit" style="
            background:#f59e0b;color:#030712;
            border:none;border-radius:40px;padding:16px 40px;
            font-size:1rem;font-weight:900;cursor:pointer;
            box-shadow:0 0 30px rgba(245,158,11,0.4);
          ">Ana Menuye Don</button>
        </div>

        <!-- Header -->
        <div id="cine-exit-wrap" style="
          position:absolute;top:0;left:0;right:0;z-index:20;
          display:flex;align-items:center;justify-content:space-between;
          padding:14px 14px 0;
          background:linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
        ">
          <button id="cine-exit" style="
            width:40px;height:40px;border-radius:14px;
            background:rgba(0,0,0,0.45);backdrop-filter:blur(8px);
            border:none;color:rgba(255,255,255,0.75);font-size:1.1rem;cursor:pointer;
            display:flex;align-items:center;justify-content:center;
          ">&#8592;</button>
          <div style="text-align:center;">
            <div style="color:#fff;font-weight:900;font-size:1.05rem;letter-spacing:0.5px;">
              \u{1F3AC} Cinema Mode
            </div>
            <div id="cine-counter" style="
              color:#f59e0b;font-size:0.65rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
            "></div>
          </div>
          <div id="cine-score-badge" style="
            display:flex;align-items:center;gap:6px;
            background:rgba(245,158,11,0.2);
            border:1px solid rgba(245,158,11,0.3);
            border-radius:14px;padding:6px 12px;
            backdrop-filter:blur(8px);
          ">
            <span style="font-size:0.85rem;">&#11088;</span>
            <span id="cine-score-val" style="color:#f59e0b;font-weight:900;font-size:0.85rem;">0</span>
            <span id="cine-streak-val" style="color:#fb923c;font-weight:900;font-size:0.7rem;display:none;"></span>
          </div>
        </div>

        <!-- Dokun & oyna -->
        <div id="cine-tap" style="
          position:absolute;inset:0;z-index:16;
          display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;
          cursor:pointer;
        ">
          <div style="
            width:72px;height:72px;border-radius:50%;
            background:rgba(255,255,255,0.18);backdrop-filter:blur(8px);
            border:2px solid rgba(255,255,255,0.4);
            display:flex;align-items:center;justify-content:center;font-size:1.9rem;
          ">&#9654;</div>
          <div style="color:#fff;font-size:0.8rem;font-weight:700;letter-spacing:1px;">OYNATMAK ICIN DOKUN</div>
        </div>

      </div>
      <style>
        @keyframes cine-spin { to { transform: rotate(360deg); } }
        @keyframes cine-pop {
          0%   { transform: translateX(-50%) scale(0); opacity:1; }
          50%  { transform: translateX(-50%) scale(1.15); opacity:1; }
          100% { transform: translateX(-50%) translateY(-30px) scale(1); opacity:0; }
        }
      </style>
    `,this.video=this.el.querySelector("#cine-video"),this._preloader=document.createElement("video"),this._preloader.preload="auto",this._preloader.muted=!0,this._preloader.style.display="none",document.body.appendChild(this._preloader),this.el.querySelector("#cine-exit").onclick=()=>this._exit(),this.el.querySelector("#cine-tap").onclick=()=>this._playAfterTap(),this.el.querySelector("#cine-done-exit").onclick=()=>this._exit(),this.video.addEventListener("canplay",()=>{this.phase==="loading"&&this._startPlaying()}),this.video.addEventListener("ended",()=>{this._clearSync(),this.phase==="playing"&&this._showQuestion()}),this.video.addEventListener("error",()=>{this._clearSync(),(this.phase==="playing"||this.phase==="loading")&&this._showQuestion()})}_loadClip(){if(!this.clips.length)return;const e=this.clips[this.clipIndex%this.clips.length];this._currentEntry=e,this.selected=null,this.subtitleShown=!1,this._qIdx=0,this._questions=[],this._lastSegIdx=-1,this.phase="loading",this._setLoader(!0),this._setDim(!1),this._setSubtitle(!1),this._hideQuestion(),this._hideDone(),this._hideTap(),this._hideResultBanner();const t=this.el.querySelector("#cine-counter");t.textContent=`Sahne ${this.clipIndex%this.clips.length+1} / ${this.clips.length}`;const n=this.el.querySelector("#cine-source");e.film?(n.textContent=`\u{1F3AC} ${e.film}${e.year?" \xB7 "+e.year:""}`,n.style.display="block"):n.style.display="none";const i=this.el.querySelector("#cine-cefr-badge");i&&(e.cefr?(i.textContent=e.cefr,i.style.display="inline-block"):i.style.display="none"),this._clearSync(),this.video.src=e.url,this.video.load();const s=e.start||0;s>0&&this.video.addEventListener("loadedmetadata",()=>{this.video.currentTime=s},{once:!0}),this.video.play().catch(()=>{this._setLoader(!1),this._showTap(),this._pendingEntry=e})}_startPlaying(){this._setLoader(!1),this.phase="playing";const e=this._currentEntry;this._startSyncTimer(e),this._preloadNext()}_preloadNext(){const e=(this.clipIndex+1)%this.clips.length;if(e===this.clipIndex)return;const t=this.clips[e].url;this._preloader&&this._preloader.src!==t&&(this._preloader.src=t,this._preloader.load())}_startSyncTimer(e){this._clearSync();const t=e.segments||null,n=e.end,i=this.video;this.syncTimer=setInterval(()=>{if(!i)return;const s=i.currentTime;if(t&&t.length){let r=-1;for(let o=t.length-1;o>=0;o--)if(s>=t[o].start){r=o;break}r!==this._lastSegIdx&&(this._lastSegIdx=r,r>=0?this._showSubtitle(t[r].text,null):this._setSubtitle(!1))}else this.subtitleShown||(this.subtitleShown=!0,this._showSubtitle(e.transcript,null));s>=n&&(this._clearSync(),i.pause(),this.phase==="playing"&&this._showQuestion())},100)}_clearSync(){this.syncTimer&&(clearInterval(this.syncTimer),this.syncTimer=null)}_showSubtitle(e,t){const n=this.el.querySelector("#cine-subtitle"),i=this.el.querySelector("#cine-subtitle-inner");if(n.style.display="block",t){const s=e.toLowerCase().indexOf(t.toLowerCase());if(s!==-1){const r=this._esc(e.slice(0,s)),o=this._esc(e.slice(s,s+t.length)),l=this._esc(e.slice(s+t.length));i.innerHTML=`${r}<span style="background:#f59e0b;color:#1a1a1a;border-radius:6px;padding:1px 5px;margin:0 1px;">${o}</span>${l}`}else i.textContent=e}else i.style.color="#fff",i.textContent=e}_esc(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}_buildQuestions(e){if(e.questions&&e.questions.length)return e.questions.map(i=>({phrase:i.phrase,correct:i.correct,wrong:i.wrong}));const t=e.options&&e.options.find(i=>i.isCorrect),n=e.options&&e.options.find(i=>!i.isCorrect);return t?[{phrase:e.transcript,correct:t.text,wrong:n?n.text:"\u2014"}]:[]}_showQuestion(){const e=this._currentEntry;if(!e)return;if(this._questions.length||(this._questions=this._buildQuestions(e),this._qIdx=0),this._qIdx>=this._questions.length){this._nextClip();return}this.phase="question",this.selected=null;const t=this._questions[this._qIdx],n=Math.random()<.5?[{text:t.correct,isRight:!0},{text:t.wrong,isRight:!1}]:[{text:t.wrong,isRight:!1},{text:t.correct,isRight:!0}];this._showSubtitle(e.transcript,t.phrase),this._setDim(!0);const i=this.el.querySelector("#cine-phrase"),s=this._questions.length>1?`<span style="color:rgba(245,158,11,0.6);font-size:0.65rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;display:block;text-align:center;margin-bottom:4px;">${this._qIdx+1} / ${this._questions.length}</span>`:"";i.innerHTML=`${s}<span style="color:#fbbf24;">"${this._esc(t.phrase)}"</span> ne demek?`;const r=this.el.querySelector("#cine-choices");r.innerHTML=n.map((l,a)=>`
      <button class="cine-choice-btn" data-idx="${a}" data-right="${l.isRight}" style="
        width:100%;padding:14px 16px;border-radius:14px;
        background:rgba(255,255,255,0.08);
        border:1.5px solid rgba(255,255,255,0.18);
        color:rgba(255,255,255,0.9);font-size:0.92rem;font-weight:700;
        text-align:left;cursor:pointer;
        display:flex;align-items:center;justify-content:space-between;
        transition:background 0.18s,border-color 0.18s;line-height:1.4;
      ">
        <span>${this._esc(l.text)}</span>
        <span class="cine-btn-icon" style="font-size:1.1rem;"></span>
      </button>
    `).join(""),r.querySelectorAll(".cine-choice-btn").forEach(l=>{l.onclick=()=>this._checkAnswer(l,t.correct)}),this.el.querySelector("#cine-actions").style.display="none",this._renderProgress();const o=this.el.querySelector("#cine-question");o.style.display="flex",requestAnimationFrame(()=>requestAnimationFrame(()=>{o.style.transform="translateY(0)"}))}_playSound(e){try{const t=new(window.AudioContext||window.webkitAudioContext);if(e==="correct")[[523.25,0,.12],[783.99,.13,.22]].forEach(([n,i,s])=>{const r=t.createOscillator(),o=t.createGain();r.connect(o),o.connect(t.destination),r.type="sine",r.frequency.setValueAtTime(n,t.currentTime+i),o.gain.setValueAtTime(.35,t.currentTime+i),o.gain.exponentialRampToValueAtTime(.001,t.currentTime+s),r.start(t.currentTime+i),r.stop(t.currentTime+s)});else{const n=t.createOscillator(),i=t.createGain();n.connect(i),i.connect(t.destination),n.type="sawtooth",n.frequency.setValueAtTime(220,t.currentTime),n.frequency.exponentialRampToValueAtTime(110,t.currentTime+.25),i.gain.setValueAtTime(.25,t.currentTime),i.gain.exponentialRampToValueAtTime(.001,t.currentTime+.25),n.start(t.currentTime),n.stop(t.currentTime+.25)}}catch(t){}}_checkAnswer(e,t){var l;if(this.selected)return;this.selected=e.dataset.right==="true"?"correct":"wrong",this.phase="result";const n=e.dataset.right==="true";this.el.querySelectorAll(".cine-choice-btn").forEach(a=>{a.style.pointerEvents="none";const d=a.querySelector(".cine-btn-icon");a.dataset.right==="true"?(a.style.background="rgba(52,211,153,0.18)",a.style.borderColor="#34d399",a.style.color="#34d399",d.textContent="\u2713"):a===e&&(a.style.background="rgba(248,113,113,0.18)",a.style.borderColor="#f87171",a.style.color="#f87171",d.textContent="\u2717")});const s=((l=window.remoteFlags)==null?void 0:l.xp_cinema_correct)||10;n?(this._playSound("correct"),this.score+=s+this.streak*2,this.streak++,this._updateScoreBadge(),this._showResultBanner(!0,null)):(this._playSound("wrong"),this.streak=0,this._updateScoreBadge(),this._showResultBanner(!1,t));const r=window._app||window.app;n&&r&&r.addXP&&r.addXP(s+Math.min(2*(this.streak-1),10),"medium","cinema");const o=this._qIdx+1<this._questions.length;this._showActionButtons(o)}_showResultBanner(e,t){const n=this.el.querySelector("#cine-result-banner");e?n.innerHTML=`
        <div style="animation:cine-pop 1.6s forwards;">
          <div style="font-size:3.5rem;">&#10024;</div>
          <div style="font-size:1.8rem;font-weight:900;color:#34d399;
            text-shadow:0 2px 12px rgba(0,0,0,0.9);">Harika!</div>
        </div>
      `:n.innerHTML=`
        <div>
          <div style="font-size:2.8rem;">&#128543;</div>
          <div style="font-size:1.2rem;font-weight:900;color:#f87171;
            text-shadow:0 2px 12px rgba(0,0,0,0.9);">Dogrusu:</div>
          <div style="font-size:1.1rem;font-weight:900;color:#fbbf24;
            text-shadow:0 2px 12px rgba(0,0,0,0.9);max-width:260px;line-height:1.3;margin-top:4px;">
            ${this._esc(t)}
          </div>
        </div>
      `,n.style.display="block"}_hideResultBanner(){const e=this.el.querySelector("#cine-result-banner");e&&(e.style.display="none",e.innerHTML="")}_showActionButtons(e){const t=this.el.querySelector("#cine-actions"),n=e?"Sonraki Soru &#10095;":"Sonraki Sahne &#10095;";t.innerHTML=`
      <button id="cine-replay" style="
        flex:1;padding:12px 0;border-radius:14px;
        background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);
        color:rgba(255,255,255,0.5);font-size:0.82rem;font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:6px;
      ">&#8635; Tekrar Izle</button>
      <button id="cine-next" style="
        flex:1;padding:12px 0;border-radius:14px;
        background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);
        color:#fff;font-size:0.82rem;font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:6px;
      ">${n}</button>
    `,t.style.display="flex",t.querySelector("#cine-replay").onclick=()=>this._replayClip(),t.querySelector("#cine-next").onclick=()=>{e?(this._qIdx++,this._hideResultBanner(),this._showQuestion()):this._nextClip()}}_replayClip(){this._clearSync(),this._hideResultBanner(),this._setDim(!1),this._hideQuestion(),this._setSubtitle(!1),this.subtitleShown=!1,this.selected=null,this._qIdx=0,this._questions=[],this._lastSegIdx=-1,this.phase="loading",this._setLoader(!0),this.video.currentTime=this._currentEntry.start||0,this.video.play().then(()=>{this._startPlaying()}).catch(()=>{this._setLoader(!1),this._showTap(),this._pendingEntry=this._currentEntry})}_renderProgress(){const e=this.el.querySelector("#cine-progress");e.innerHTML=this.clips.map((t,n)=>{let i;return n<this.clipIndex?i="#34d399":n===this.clipIndex?i="#f59e0b":i="rgba(255,255,255,0.12)",`<div style="flex:1;height:3px;border-radius:4px;background:${i};transition:background 0.3s;"></div>`}).join("")}_updateScoreBadge(){this.el.querySelector("#cine-score-val").textContent=this.score;const e=this.el.querySelector("#cine-streak-val");this.streak>=2?(e.textContent=`x${this.streak}`,e.style.display="inline"):e.style.display="none"}_hideQuestion(){const e=this.el.querySelector("#cine-question");e&&(e.style.transform="translateY(100%)",setTimeout(()=>{e.style.display="none"},400))}_hideDone(){const e=this.el.querySelector("#cine-done");e&&(e.style.display="none")}_showTap(){const e=this.el.querySelector("#cine-tap");e&&(e.style.display="flex")}_hideTap(){const e=this.el.querySelector("#cine-tap");e&&(e.style.display="none")}_setLoader(e){const t=this.el.querySelector("#cine-loader");t&&(t.style.display=e?"flex":"none")}_setDim(e){const t=this.el.querySelector("#cine-dim");t&&(t.style.display=e?"block":"none")}_setSubtitle(e){const t=this.el.querySelector("#cine-subtitle");t&&(t.style.display=e?"block":"none")}_playAfterTap(){this._hideTap();const e=this._pendingEntry,t=this.video,n=()=>{t.play().then(()=>this._startPlaying()).catch(()=>this._showTap())};t.readyState>=3?n():t.addEventListener("canplay",n,{once:!0})}_nextClip(){if(this._clearSync(),this._hideResultBanner(),this.clipIndex++,this.clipIndex>=this.clips.length){this._showDone();return}setTimeout(()=>this._loadClip(),400)}_showDone(){this.phase="done",this._setLoader(!1),this._setDim(!1),this._hideQuestion();const e=this.el.querySelector("#cine-done");e.querySelector("#cine-done-sub").textContent=`${this.clips.length} sahneden gectiniz!`,e.querySelector("#cine-done-score").textContent=`${this.score} puan`,e.style.display="flex"}_initOrientation(){try{screen.orientation&&screen.orientation.unlock&&screen.orientation.unlock()}catch(n){}const e=()=>{if(this.el&&this.el.querySelector("#cine-root")&&!document.fullscreenElement&&!document.webkitFullscreenElement){const i=document.documentElement,s=i.requestFullscreen||i.webkitRequestFullscreen;s&&s.call(i).catch(()=>{})}};e(),this._onOrientChange=()=>e(),window.addEventListener("resize",this._onOrientChange,{passive:!0});const t=this.el&&this.el.querySelector("#cine-root");t&&window.attachQuickMenuTrigger&&window.attachQuickMenuTrigger(t)}_exit(){this._clearSync(),this.video&&(this.video.pause(),this.video.src=""),this._preloader&&(this._preloader.src="",this._preloader.remove(),this._preloader=null),this._onOrientChange&&(window.removeEventListener("resize",this._onOrientChange),this._onOrientChange=null);try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("portrait").catch(()=>{})}catch(t){}const e=window._app||window.app;if(e&&e.navigate)e.navigate("home");else{const t=document.querySelector('[data-action="navigate"][data-target="home"]');t&&t.click()}}}(function(){const c=()=>{const e=document.getElementById("cinema-mount-point");if(e&&(!window.cinemaMod||window.cinemaMod.el!==e)){const t=window._app||window.app;window.cinemaMod=new CinemaModule(t),window.cinemaMod.init(e),t&&t._showMobileNav&&t._showMobileNav()}};document.addEventListener("click",function(e){e.target.closest('[data-target="cinema"]')&&setTimeout(c,80)},!0),document.body?new MutationObserver(c).observe(document.body,{childList:!0,subtree:!0}):document.addEventListener("DOMContentLoaded",function(){new MutationObserver(c).observe(document.body,{childList:!0,subtree:!0})})})();
