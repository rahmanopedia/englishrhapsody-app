(function(){const f=[{icon:"\u{1F3E0}",label:"Ana Merkez",target:"home"},{icon:"\u{1F300}",label:"Sinestezi",target:"learn"},{icon:"\u{1F4D6}",label:"Okuma",target:"reading"},{icon:"\u{1F399}\uFE0F",label:"Konu\u015Fma",target:"speak"},{icon:"\u2728",label:"Nexus",target:"nexus"},{icon:"\u{1F3AC}",label:"Sinema",target:"cinema"},{icon:"\u{1F309}",label:"K\xF6pr\xFC",target:"bridge"},{icon:"\u{1F4AC}",label:"\u0130fadeler",target:"phrases"}];window.showQuickMenu=function(a){if(document.getElementById("qm-overlay"))return;const t=document.createElement("div");t.id="qm-overlay",t.style.cssText=["position:fixed;inset:0;z-index:9999;","background:rgba(0,0,0,0.65);","backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);","display:flex;align-items:flex-end;","animation:qm-fade-in 0.22s ease both;"].join("");const n=document.createElement("div");n.id="qm-sheet",n.style.cssText=["width:100%;","background:linear-gradient(170deg,#13131f 0%,#0a0a14 100%);","border-radius:26px 26px 0 0;","padding:0 14px calc(18px + env(safe-area-inset-bottom,0px));","border-top:1px solid rgba(255,255,255,0.1);","box-shadow:0 -12px 50px rgba(0,0,0,0.7);","animation:qm-slide-up 0.3s cubic-bezier(0.34,1.15,0.64,1) both;"].join(""),n.innerHTML=`
      <style>
        @keyframes qm-fade-in  { from{opacity:0} to{opacity:1} }
        @keyframes qm-slide-up { from{transform:translateY(110%)} to{transform:translateY(0)} }
        @keyframes qm-fade-out { from{opacity:1} to{opacity:0} }
        @keyframes qm-slide-dn { from{transform:translateY(0)} to{transform:translateY(110%)} }
        .qm-nav-btn {
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.09);
          border-radius:18px;
          padding:13px 4px 11px;
          color:#fff;
          font-size:0.67rem;
          font-weight:700;
          cursor:pointer;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:5px;
          transition:all 0.15s ease;
          font-family:inherit;
          letter-spacing:0.2px;
        }
        .qm-nav-btn:hover  { transform:scale(1.07); background:rgba(255,255,255,0.13) !important; border-color:rgba(255,255,255,0.2) !important; }
        .qm-nav-btn:active { transform:scale(0.94); }
        .qm-nav-btn .qm-icon { font-size:1.55rem; line-height:1; }
        .qm-nav-btn .qm-lbl  { opacity:0.82; line-height:1.25; text-align:center; }
        #qm-close-btn {
          width:100%;
          padding:13px;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:16px;
          color:rgba(255,255,255,0.45);
          font-size:0.82rem;
          font-weight:700;
          cursor:pointer;
          font-family:inherit;
          transition:all 0.15s;
          margin-top:10px;
        }
        #qm-close-btn:hover  { background:rgba(255,255,255,0.09); color:rgba(255,255,255,0.7); }
        #qm-close-btn:active { transform:scale(0.97); }
      </style>

      <!-- Handle -->
      <div style="width:42px;height:4px;border-radius:2px;background:rgba(255,255,255,0.18);margin:14px auto 16px;"></div>

      <!-- Title -->
      <div style="color:rgba(255,255,255,0.35);font-size:0.62rem;font-weight:800;letter-spacing:3px;text-transform:uppercase;margin-bottom:13px;text-align:center;">
        NAVIGASYON
      </div>

      <!-- Nav grid -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:0;">
        ${f.map(o=>`
          <button class="qm-nav-btn" data-qm-target="${o.target}">
            <span class="qm-icon">${o.icon}</span>
            <span class="qm-lbl">${o.label}</span>
          </button>
        `).join("")}
      </div>

      <button id="qm-close-btn">\u2715 &nbsp; Kapat</button>
    `,t.appendChild(n),(document.fullscreenElement||document.webkitFullscreenElement||document.body).appendChild(t);function r(){t.style.animation="qm-fade-out 0.18s ease forwards",n.style.animation="qm-slide-dn 0.18s ease forwards",setTimeout(()=>t.remove(),200)}t.addEventListener("click",o=>{o.target===t&&r()}),n.querySelector("#qm-close-btn").addEventListener("click",r);function c(o){const s=window._app||window.app;if(s&&s.navigate)s.navigate(o);else{const d=document.querySelector(`[data-action="navigate"][data-target="${o}"], .nav-item[data-target="${o}"]`);d&&d.click()}}n.querySelectorAll(".qm-nav-btn").forEach(o=>{o.addEventListener("click",function(){const s=this.dataset.qmTarget;r(),setTimeout(()=>c(s),50)})})},(function(){let a=!1,t=!1;function n(){const e=document.exitFullscreen||document.webkitExitFullscreen;e&&(document.fullscreenElement||document.webkitFullscreenElement)&&e.call(document).catch(()=>{})}function i(){const e=a;a=!!(document.fullscreenElement||document.webkitFullscreenElement),e&&!a&&document.body.classList.remove("sidebar-closed"),a&&!t&&n()}document.addEventListener("fullscreenchange",i),document.addEventListener("webkitfullscreenchange",i);const r=document.createElement("style");r.textContent=["body.er-in-mode .sidebar,body.er-in-mode #sidebar-tab,body.er-in-mode #mobile-nav{display:none !important;}",":fullscreen header.app-header,:-webkit-full-screen header.app-header{display:none!important;}",":fullscreen .layout,:-webkit-full-screen .layout{grid-template-rows:0 1fr!important;}",":fullscreen #main-content,:-webkit-full-screen #main-content{padding:0!important;overflow-y:auto!important;height:100dvh!important;}",":fullscreen #main-content>.animate-in,:-webkit-full-screen #main-content>.animate-in{animation:none!important;transform:none!important;}",":fullscreen .cinema-topbar,:-webkit-full-screen .cinema-topbar{display:none!important;}"].join(""),document.head.appendChild(r);function c(e){t=e,document.body.classList.toggle("er-in-mode",e)}const o=new Set(["analytics","leaderboard"]);function s(){if(document.fullscreenElement||document.webkitFullscreenElement)return;const e=document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen;e&&e.call(document.documentElement).catch(()=>{})}function d(e){o.has(e)&&(s(),setTimeout(()=>{const m={analytics:".an-page",leaderboard:"#leaderboard-root"},l=document.querySelector(m[e]);l&&window.attachQuickMenuTrigger&&window.attachQuickMenuTrigger(l)},300))}function b(){const e=window._app;if(!e||!e.navigate||e.__qmSbPatched)return;e.__qmSbPatched=!0;const m=e.navigate.bind(e);e.navigate=function(l){if(c(l!=="home"),!t){document.body.classList.remove("sidebar-closed");try{screen.orientation&&screen.orientation.lock?screen.orientation.lock("portrait").then(function(){n(),setTimeout(n,300)}).catch(function(){n(),setTimeout(n,300)}):(n(),setTimeout(n,300))}catch(h){n(),setTimeout(n,300)}}m(l),d(l)}}if(window._app)b();else{const e=setInterval(()=>{window._app&&(clearInterval(e),b())},50)}new MutationObserver(function(){a&&t&&!document.body.classList.contains("sidebar-closed")&&document.body.classList.add("sidebar-closed")}).observe(document.body,{attributes:!0,attributeFilter:["class"]});function p(e){t&&e.target.closest&&e.target.closest("#sidebar-tab")&&(e.stopImmediatePropagation(),e.cancelable&&e.preventDefault())}document.addEventListener("touchstart",p,{capture:!0,passive:!1}),document.addEventListener("click",p,{capture:!0})})();const g='button,a,input,select,textarea,label,[role="button"],[role="tab"],[role="option"],[tabindex]';function u(a){return!!(a&&a.closest&&a.closest(g))}window.attachQuickMenuTrigger=function(a){let t=0,n=null;a.addEventListener("touchend",function(i){if(u(i.target)){t=0;return}const r=Date.now(),c=r-t;if(c<320&&c>30){i.preventDefault(),window.showQuickMenu(a),t=0;return}t=r,n=i.target},{passive:!1}),a.addEventListener("dblclick",function(i){u(i.target)||window.showQuickMenu(a)})}})();
