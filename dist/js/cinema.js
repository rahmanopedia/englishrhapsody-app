class CinemaModule{constructor(e){this.app=e,this.el=null,this.video=null,this.clips=[],this.currentIndex=0,this.canAnswer=!1,this.endWatcher=null}init(e){this.el=e,!(typeof CINEMA_DATA=="undefined"||!CINEMA_DATA.length)&&(this.clips=this._shuffle([...CINEMA_DATA]),this._render())}_shuffle(e){for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}return e}_render(){this.el.innerHTML=`
      <div id="cine-root" style="
        position:fixed;inset:0;z-index:200;background:#000;
        display:flex;flex-direction:column;overflow:hidden;
      ">
        <!-- Video fills entire screen -->
        <video id="cine-video" playsinline style="
          position:absolute;inset:0;width:100%;height:100%;
          object-fit:cover;background:#000;
        "></video>

        <!-- Dark gradient overlays -->
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.35) 0%,transparent 30%,transparent 55%,rgba(0,0,0,0.75) 100%);pointer-events:none;"></div>

        <!-- Top bar -->
        <div style="position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:16px 16px 0;">
          <button id="cine-exit" style="
            background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);
            border:none;border-radius:12px;padding:8px 14px;
            color:#fff;font-weight:700;font-size:0.8rem;cursor:pointer;
          ">\u2190 Geri</button>
          <div id="cine-film-badge" style="
            background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);
            border:1px solid rgba(255,255,255,0.15);border-radius:20px;
            padding:5px 14px;color:rgba(255,255,255,0.85);
            font-size:0.7rem;font-weight:700;letter-spacing:0.5px;
          "></div>
          <div id="cine-counter" style="
            color:rgba(255,255,255,0.6);font-size:0.75rem;font-weight:700;
          "></div>
        </div>

        <!-- Tap-to-play prompt -->
        <div id="cine-tap" style="
          position:absolute;inset:0;z-index:15;
          display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;
          cursor:pointer;
        ">
          <div style="
            width:70px;height:70px;border-radius:50%;
            background:rgba(255,255,255,0.2);backdrop-filter:blur(8px);
            border:2px solid rgba(255,255,255,0.4);
            display:flex;align-items:center;justify-content:center;font-size:1.8rem;
          ">\u25B6</div>
          <div style="color:#fff;font-size:0.8rem;font-weight:700;letter-spacing:1px;">OYNATMAK \u0130\xC7\u0130N DOKUN</div>
        </div>

        <!-- Subtitle bar (shows transcript while playing) -->
        <div id="cine-subtitle" style="
          position:absolute;z-index:10;
          bottom:24px;left:0;right:0;
          text-align:center;padding:0 20px;
          transition:bottom 0.4s ease;
          display:none;
        ">
          <span style="
            background:rgba(0,0,0,0.72);padding:8px 16px;border-radius:10px;
            color:#fff;font-size:0.95rem;font-weight:600;line-height:1.5;
            display:inline-block;max-width:90%;
          " id="cine-subtitle-text"></span>
        </div>

        <!-- Question panel (overlaid at bottom) -->
        <div id="cine-question" style="
          position:absolute;z-index:20;bottom:0;left:0;right:0;
          padding:20px 16px 28px;
          background:linear-gradient(transparent,rgba(0,0,0,0.92) 25%);
          display:none;flex-direction:column;gap:12px;
          transform:translateY(100%);transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        ">
          <!-- Progress dots -->
          <div id="cine-qdots" style="display:flex;justify-content:center;gap:6px;margin-bottom:2px;"></div>
          <!-- Transcript -->
          <div id="cine-qtranscript" style="
            text-align:center;color:rgba(255,255,255,0.9);
            font-size:1rem;font-weight:700;line-height:1.4;
            background:rgba(255,255,255,0.08);border-radius:12px;padding:10px 14px;
          "></div>
          <!-- Question label -->
          <div style="text-align:center;color:rgba(255,255,255,0.5);font-size:0.7rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
            T\xFCrk\xE7esi nedir?
          </div>
          <!-- Choice buttons -->
          <div id="cine-choices" style="display:flex;flex-direction:column;gap:8px;"></div>
        </div>

        <!-- XP popup -->
        <div id="cine-xp" style="
          position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);
          z-index:30;width:110px;height:110px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-size:2.2rem;font-weight:900;
        "></div>
      </div>
    `,this.video=this.el.querySelector("#cine-video"),this.el.querySelector("#cine-exit").onclick=()=>this._exit(),this.el.querySelector("#cine-tap").onclick=()=>this._playAfterTap(),this._loadClip()}_exit(){this.endWatcher&&(clearInterval(this.endWatcher),this.endWatcher=null),this.video&&(this.video.pause(),this.video.src="");const e=window._app||window.app;if(e&&e.navigate)e.navigate("home");else{const t=document.querySelector('[data-action="navigate"][data-target="home"]');t&&t.click()}}_loadClip(){if(!this.clips.length)return;const e=this.clips[this.currentIndex%this.clips.length],t=this.video;this._hideQuestion(),this.el.querySelector("#cine-tap").style.display="none",this.el.querySelector("#cine-subtitle").style.display="none";const i=this.el.querySelector("#cine-film-badge");i.textContent=e.film?`\u{1F3AC} ${e.film}${e.year?" \xB7 "+e.year:""}`:"\u{1F3AC} Rhapsody Cinema";const s=this.el.querySelector("#cine-counter");s.textContent=`${this.currentIndex%this.clips.length+1} / ${this.clips.length}`,this.endWatcher&&(clearInterval(this.endWatcher),this.endWatcher=null),t.src=e.url,t.load();const n=e.start||0,o=e.end;n>0&&t.addEventListener("loadedmetadata",()=>{t.currentTime=n},{once:!0}),t.play().then(()=>{this._showSubtitle(e.transcript),this._watchEnd(o,e)}).catch(()=>{const l=this.el.querySelector("#cine-tap");l.style.display="flex",this._pendingEntry=e})}_playAfterTap(){const e=this.el.querySelector("#cine-tap");e.style.display="none";const t=this._pendingEntry,i=this.video,s=()=>{i.play().then(()=>{this._showSubtitle(t.transcript),this._watchEnd(t.end,t)}).catch(()=>{e.style.display="flex"})};i.readyState>=3?s():i.addEventListener("canplay",s,{once:!0})}_showSubtitle(e){const t=this.el.querySelector("#cine-subtitle");this.el.querySelector("#cine-subtitle-text").textContent=`"${e}"`,t.style.display="block",t.style.bottom="24px"}_watchEnd(e,t){const i=this.video;this.endWatcher&&clearInterval(this.endWatcher);const s=()=>{this.endWatcher&&(clearInterval(this.endWatcher),this.endWatcher=null),i.pause(),this._startQuestions(t)};i.addEventListener("ended",s,{once:!0}),this.endWatcher=setInterval(()=>{i&&i.currentTime>=e&&s()},100)}_startQuestions(e){const t=e.options.find(s=>s.isCorrect),i=e.options.filter(s=>!s.isCorrect);if(!t){this._nextClip();return}this._questionQueue=[{phrase:e.transcript,correct:t.text,wrongs:i.map(s=>s.text)}],this._qIdx=0,this._qPoints=e.points||10,this._showQuestion(e)}_showQuestion(e){const t=this._questionQueue[this._qIdx],i=this.el.querySelector("#cine-subtitle");i.style.bottom="260px";const s=this.el.querySelector("#cine-qdots");s.innerHTML=this._questionQueue.map((r,c)=>`<div style="width:7px;height:7px;border-radius:50%;background:${c===this._qIdx?"#fff":"rgba(255,255,255,0.3)"};transition:background 0.3s;"></div>`).join(""),this.el.querySelector("#cine-qtranscript").textContent=`"${t.phrase}"`;const n=t.wrongs[Math.floor(Math.random()*t.wrongs.length)]||"\u2014",o=Math.random()<.5?[{text:t.correct,isRight:!0},{text:n,isRight:!1}]:[{text:n,isRight:!1},{text:t.correct,isRight:!0}],l=this.el.querySelector("#cine-choices");l.innerHTML=o.map((r,c)=>`
      <button class="cine-choice-btn" data-idx="${c}" data-right="${r.isRight}" style="
        width:100%;padding:14px 16px;border-radius:14px;border:none;
        background:rgba(255,255,255,0.12);backdrop-filter:blur(8px);
        color:#fff;font-size:0.92rem;font-weight:700;text-align:left;cursor:pointer;
        border:1.5px solid rgba(255,255,255,0.18);
        transition:all 0.18s ease;line-height:1.4;
      ">${r.text}</button>
    `).join(""),l.querySelectorAll(".cine-choice-btn").forEach(r=>{r.onclick=()=>this._checkAnswer(r,e)}),this.canAnswer=!0;const d=this.el.querySelector("#cine-question");d.style.display="flex",requestAnimationFrame(()=>{requestAnimationFrame(()=>{d.style.transform="translateY(0)"})})}_checkAnswer(e,t){if(!this.canAnswer)return;this.canAnswer=!1;const i=e.dataset.right==="true";if(this.el.querySelectorAll(".cine-choice-btn").forEach(n=>{n.style.pointerEvents="none",n.dataset.right==="true"?(n.style.background="rgba(34,197,94,0.85)",n.style.borderColor="#22c55e",n.style.color="#fff"):n===e&&(n.style.background="rgba(239,68,68,0.8)",n.style.borderColor="#ef4444")}),i){const n=Math.round(this._qPoints);this._showXP(`+${n}`,"#22c55e");const o=window._app||window.app;o&&o.addXP&&o.addXP(n,"medium","cinema")}else this._showXP(`\u2212${Math.round(this._qPoints/4)}`,"#ef4444");setTimeout(()=>{this._qIdx++,this._qIdx<this._questionQueue.length?(this._showQuestion(t),this.canAnswer=!0):this._nextClip()},1500)}_showXP(e,t){const i=this.el.querySelector("#cine-xp");i.textContent=e,i.style.background=t,i.style.boxShadow=`0 0 40px ${t}`,i.style.color="#fff",i.style.transform="translate(-50%,-50%) scale(1.1)",i.style.transition="transform 0.25s, opacity 0.4s",setTimeout(()=>{i.style.transform="translate(-50%,-150%) scale(1)",i.style.opacity="0",setTimeout(()=>{i.style.transform="translate(-50%,-50%) scale(0)",i.style.opacity="1"},500)},800)}_hideQuestion(){const e=this.el.querySelector("#cine-question");e&&(e.style.transform="translateY(100%)",setTimeout(()=>{e.style.display="none"},400))}_nextClip(){this.currentIndex++,this.currentIndex>=this.clips.length&&(this.clips=this._shuffle([...CINEMA_DATA]),this.currentIndex=0),setTimeout(()=>this._loadClip(),600)}}(function(){const a=()=>{const e=document.getElementById("cinema-mount-point");if(e&&(!window.cinemaMod||window.cinemaMod.el!==e)){const t=window._app||window.app;window.cinemaMod=new CinemaModule(t),window.cinemaMod.init(e)}};document.addEventListener("click",function(e){e.target.closest('[data-target="cinema"]')&&setTimeout(a,80)},!0),document.body?new MutationObserver(a).observe(document.body,{childList:!0,subtree:!0}):document.addEventListener("DOMContentLoaded",function(){new MutationObserver(a).observe(document.body,{childList:!0,subtree:!0})})})();
