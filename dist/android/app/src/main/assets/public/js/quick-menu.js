(function(){const m=[{icon:"\u{1F3E0}",label:"Ana Merkez",target:"home"},{icon:"\u{1F300}",label:"Sinestezi",target:"learn"},{icon:"\u{1F4D6}",label:"Okuma",target:"reading"},{icon:"\u{1F399}\uFE0F",label:"Konu\u015Fma",target:"speak"},{icon:"\u2728",label:"Nexus",target:"nexus"},{icon:"\u{1F3AC}",label:"Sinema",target:"cinema"},{icon:"\u{1F309}",label:"K\xF6pr\xFC",target:"bridge"},{icon:"\u{1F4AC}",label:"\u0130fadeler",target:"phrases"}];window.showQuickMenu=function(r){if(document.getElementById("qm-overlay"))return;const e=document.createElement("div");e.id="qm-overlay",e.style.cssText=["position:fixed;inset:0;z-index:9999;","background:rgba(0,0,0,0.65);","backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);","display:flex;align-items:flex-end;","animation:qm-fade-in 0.22s ease both;"].join("");const n=document.createElement("div");n.id="qm-sheet",n.style.cssText=["width:100%;","background:linear-gradient(170deg,#13131f 0%,#0a0a14 100%);","border-radius:26px 26px 0 0;","padding:0 14px calc(18px + env(safe-area-inset-bottom,0px));","border-top:1px solid rgba(255,255,255,0.1);","box-shadow:0 -12px 50px rgba(0,0,0,0.7);","animation:qm-slide-up 0.3s cubic-bezier(0.34,1.15,0.64,1) both;"].join(""),n.innerHTML=`
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
        ${m.map(t=>`
          <button class="qm-nav-btn" data-qm-target="${t.target}">
            <span class="qm-icon">${t.icon}</span>
            <span class="qm-lbl">${t.label}</span>
          </button>
        `).join("")}
      </div>

      <button id="qm-close-btn">\u2715 &nbsp; Kapat</button>
    `,e.appendChild(n),r.appendChild(e);function o(){e.style.animation="qm-fade-out 0.18s ease forwards",n.style.animation="qm-slide-dn 0.18s ease forwards",setTimeout(()=>e.remove(),200)}e.addEventListener("click",t=>{t.target===e&&o()}),n.querySelector("#qm-close-btn").addEventListener("click",o);function s(t){const i=window._app||window.app;if(i&&i.navigate)i.navigate(t);else{const a=document.querySelector(`[data-action="navigate"][data-target="${t}"], .nav-item[data-target="${t}"]`);a&&a.click()}}n.querySelectorAll(".qm-nav-btn").forEach(t=>{t.addEventListener("click",function(){const i=this.dataset.qmTarget;if(o(),document.fullscreenElement||document.webkitFullscreenElement){const a=()=>{document.removeEventListener("fullscreenchange",a),document.removeEventListener("webkitfullscreenchange",a),setTimeout(()=>s(i),50)};document.addEventListener("fullscreenchange",a),document.addEventListener("webkitfullscreenchange",a);const c=setTimeout(()=>{document.removeEventListener("fullscreenchange",a),document.removeEventListener("webkitfullscreenchange",a),s(i)},600),l=()=>{clearTimeout(c),document.removeEventListener("fullscreenchange",l),document.removeEventListener("webkitfullscreenchange",l)};document.addEventListener("fullscreenchange",l),document.addEventListener("webkitfullscreenchange",l);const d=document.exitFullscreen||document.webkitExitFullscreen;d&&d.call(document).catch(()=>{clearTimeout(c),s(i)})}else setTimeout(()=>s(i),50)})})},window.attachQuickMenuTrigger=function(r){let e=0;r.addEventListener("touchend",function(n){const o=Date.now();o-e<320&&(n.preventDefault(),window.showQuickMenu(r)),e=o},{passive:!1}),r.addEventListener("dblclick",function(){window.showQuickMenu(r)})}})();
