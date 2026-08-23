// DriftGuard notes — progressive enhancement, no external deps.
(function () {
  "use strict";

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reading progress bar ---------- */
  var bar = document.createElement("div");
  bar.className = "progressbar";
  bar.setAttribute("role", "progressbar");
  bar.setAttribute("aria-label", "Reading progress");
  bar.innerHTML = '<span class="progressbar-fill"></span>';
  document.body.appendChild(bar);
  var fill = bar.firstChild;

  /* ---------- Back-to-top button ---------- */
  var top = document.createElement("button");
  top.className = "backtop";
  top.setAttribute("aria-label", "Back to top");
  top.innerHTML = "&#8593;";
  document.body.appendChild(top);
  /* ─── Pointer position tracker ─── */
  var pointer = { x: 0, y: 0 };
  window.addEventListener('pointermove', function (e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });


  /* ---------- Scroll handler (rAF-throttled) ---------- */
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docH > 0 ? (y / docH) * 100 : 0;
    if (bar.style.opacity !== "1") bar.style.opacity = "1";
    fill.style.width = pct + "%";
    bar.setAttribute("aria-valuenow", Math.round(pct));
    top.classList.toggle("show", y > 480);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  });

  /* ---------- Build consistent per-subject nav (single source of truth) ---------- */
  function buildNav(){
    var path=location.pathname.replace(/\\/g,"/");
    var subj = path.indexOf("machine-learning-site")>-1?"ml":
               path.indexOf("ethical-hacking-site")>-1?"eh":
               path.indexOf("renewable-energy-site")>-1?"res":
               path.indexOf("industrial-safety-site")>-1?"ise":null;
    if(!subj) return;
    var NAVS={
      ml:[["index.html","Home"],["m1-1.html","M1 · Paradigms"],["m2-1.html","M2 · Supervised"],["m3-1.html","M3 · NN &amp; SVM"],["m4-1.html","M4 · Unsupervised"],["m5-1.html","M5 · Classification"],["m-t1.html","Exam Techniques"],["papers.html","Papers"]],
      eh:[["index.html","Home"],["m1-1.html","M1 · Basics"],["m1-2.html","M1 · Hackers"],["m1-3.html","M1 · Pentest"],["m2-1.html","M2 · Recon"],["m2-2.html","M2 · Attacks"],["m2-3.html","M2 · Social Eng."],["m3-1.html","M3 · Vuln/Attacks"],["m4-1.html","M4 · Net/Sys"],["m5-1.html","M5 · Tracks"],["m-t1.html","Exam Techniques"],["papers.html","Papers"]],
      res:[["index.html","Home"],["m1-1.html","M1 · Resources"],["m1-2.html","M1 · Solar Thermal"],["m1-3.html","M1 · Solar PV"],["m2-1.html","M2 · OTEC"],["m2-2.html","M2 · Tidal"],["m3-1.html","M3 · Wind"],["m4-1.html","M4 · Biomass"],["m5-1.html","M5 · Hydro/Fuel"],["m-t1.html","Exam Techniques"],["papers.html","Papers"]],
      ise:[["index.html","Home"],["m1-1.html","M1 · Intro"],["m2-1.html","M2 · PPE"],["m3-1.html","M3 · Construction"],["m4-1.html","M4 · Machines"],["m5-1.html","M5 · Hazards"],["m-t1.html","Exam Techniques"],["papers.html","Papers"]]
    };
    var items=NAVS[subj]; if(!items) return;
    var file=path.split("/").pop().split("?")[0];
    var activeHref;
    if(file==="index.html") activeHref="index.html";
    else if(file==="papers.html") activeHref="papers.html";
    else if(file==="m-t1.html") activeHref="m-t1.html";
    else { var mm=file.match(/^m(\d)-/); activeHref = mm ? ("m"+mm[1]+"-1.html") : null; }
    var topbar=document.querySelector(".topbar-inner");
    var nav=document.querySelector(".topnav");
    if(!nav && topbar){ nav=document.createElement("nav"); nav.className="topnav"; topbar.appendChild(nav); }
    if(!document.querySelector(".navtoggle") && topbar){
      var tog=document.createElement("button"); tog.className="navtoggle"; tog.setAttribute("aria-label","Menu"); tog.textContent="Menu"; topbar.appendChild(tog);
    }
    if(!nav) return;
    var modLinks=items.slice(1).map(function(it){
      return '<a href="'+it[0]+'"'+(it[0]===activeHref?' class="active"':'')+'>'+it[1]+'</a>';
    }).join("");
    nav.innerHTML='<span class="navhead">Browse</span>'+
      '<a href="index.html" class="home'+(activeHref==="index.html"?' active':'')+'">Home</a>'+
      '<a href="../index.html" class="allsubj">All subjects</a>'+
      '<div class="moddd"><button class="moddd-btn'+(activeHref!=="index.html"?' active':'')+'" type="button" aria-haspopup="true" aria-expanded="false">Modules <span class="caret">&#9662;</span></button><div class="moddd-panel">'+modLinks+'</div></div>';
  }
  buildNav();
  /* ---------- Desktop Modules dropdown ---------- */
  var moddd=document.querySelector(".moddd");
  var modBtn=document.querySelector(".moddd-btn");
  function openModdd(){ if(moddd){moddd.classList.add("open"); if(modBtn)modBtn.setAttribute("aria-expanded","true");} }
  function closeModdd(){ if(moddd){moddd.classList.remove("open"); if(modBtn)modBtn.setAttribute("aria-expanded","false");} }
  if(moddd && modBtn){
    modBtn.addEventListener("click",function(e){ e.stopPropagation(); var o=moddd.classList.toggle("open"); modBtn.setAttribute("aria-expanded",o?"true":"false"); });
    moddd.addEventListener("mouseenter",openModdd);
    moddd.addEventListener("mouseleave",closeModdd);
    document.addEventListener("click",function(e){ if(moddd.classList.contains("open") && !moddd.contains(e.target)) closeModdd(); });
    document.addEventListener("keydown",function(e){ if(e.key==="Escape") closeModdd(); });
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".navtoggle");
  var nav = document.querySelector(".topnav");
  function closeNav() { if (nav) nav.classList.remove("open"); var m=document.querySelector(".moddd"); if(m) m.classList.remove("open"); var b=document.querySelector(".moddd-btn"); if(b) b.setAttribute("aria-expanded","false"); }
  if (toggle && nav) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") &&
          !nav.contains(e.target) && e.target !== toggle) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---------- Smooth in-page anchor scrolling with header offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href").slice(1);
      if (!id) return;
      var el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      closeNav();
      var offset = (document.querySelector(".topbar") || { offsetHeight: 0 }).offsetHeight + 8;
      var topY = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: topY, behavior: prefersReduced ? "auto" : "smooth" });
      history.replaceState(null, "", "#" + id);
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    });
  });

  /* ---------- Live search / filter for the question bank ---------- */
  var search = document.querySelector(".qsearch");
  if (search) {
    var clear = document.querySelector(".qsearch-clear");
    var papers = document.querySelectorAll(".qpaper");
    function normalize(s) { return s.toLowerCase(); }
    function runFilter() {
      var q = normalize(search.value.trim());
      var count = 0;
      papers.forEach(function (paper) {
        var items = paper.querySelectorAll(".q");
        var shown = 0;
        items.forEach(function (item) {
          var hit = !q || normalize(item.textContent).indexOf(q) !== -1;
          item.classList.toggle("hidden", !hit);
          if (hit) shown++;
        });
        paper.classList.toggle("hidden", shown === 0);
        count += shown;
      });
      var status = document.querySelector(".qsearch-status");
      if (status) status.textContent = q
        ? count + " matching question" + (count === 1 ? "" : "s")
        : "";
      if (clear) clear.style.display = q ? "block" : "none";
    }
    search.addEventListener("input", runFilter);
    if (clear) clear.addEventListener("click", function () {
      search.value = ""; runFilter(); search.focus();
    });
  }

  /* ---------- Question-bank answer toggles ---------- */
  document.querySelectorAll(".ans-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var ans = document.getElementById(btn.getAttribute("aria-controls"));
      if (!ans) return;
      var show = ans.hasAttribute("hidden");
      if (show) ans.removeAttribute("hidden"); else ans.setAttribute("hidden", "");
      btn.textContent = show ? "Hide answer ▲" : "Show answer ▼";
      btn.setAttribute("aria-expanded", show ? "true" : "false");
    });
  });

  /* ---------- Theme toggle (light → dark → amoled → light) ---------- */
  (function () {
    var root = document.documentElement;
    var order = ["light", "dark", "amoled"];
    var icons = { light: "☀", dark: "☾", amoled: "⬤" };
    var labels = { light: "Light", dark: "Dark", amoled: "Amoled" };
    function read() {
      try { var c = document.cookie.match(/(^|; )theme=(dark|light|amoled)(;|$)/); if (c) return c[2]; } catch (e) {}
      try { var ls = localStorage.getItem("theme"); if (ls === "dark" || ls === "light" || ls === "amoled") return ls; } catch (e) {}
      return null;
    }
    function write(v) {
      try { document.cookie = "theme=" + v + ";path=/;max-age=31536000;samesite=lax"; } catch (e) {}
      try { localStorage.setItem("theme", v); } catch (e) {}
    }
    var saved = read();
    if (saved) root.setAttribute("data-theme", saved);
    function makeBtn() {
      var bar = document.querySelector(".topbar-inner") || document.querySelector(".topbar");
      if (!bar) return;
      var btn = document.createElement("button");
      btn.className = "theme-toggle";
      btn.type = "button";
      btn.setAttribute("aria-label", "Toggle theme (light/dark/amoled)");
      function paint() {
        var cur = root.getAttribute("data-theme") || "light";
        btn.innerHTML = '<span class="ic">' + icons[cur] + '</span> <span class="lbl">' + labels[cur] + "</span>";
      }
      btn.addEventListener("click", function () {
        var cur = root.getAttribute("data-theme") || "light";
        var idx = order.indexOf(cur);
        var next = order[(idx + 1) % order.length];
        root.setAttribute("data-theme", next);
        write(next);
        paint();
      });
      paint();
      bar.appendChild(btn);
    }
    makeBtn();
  })();


  /* ---------- Restructure brand into mark + name + subject (no HTML edits needed) ---------- */
  (function () {
    var b = document.querySelector(".brand");
    if (b && !b.querySelector(".mark")) {
      var txt = b.textContent.trim();
      var parts = txt.split(/\s*\/\s*/);
      var name = parts[0] || "Study Notes";
      var subj = parts.slice(1).join(" / ");
      b.innerHTML = '<span class="mark"></span><span class="name">' + name + '</span>' +
        (subj ? '<span class="sep">/</span><span class="subj">' + subj + '</span>' : '');
    }
  })();

  /* ---------- Motion layer (tasteful micro-animations, Trend 6) ---------- */
  (function () {
    var root = document.documentElement;
    if (prefersReduced) return;            // reduced-motion: keep everything static
    root.classList.add("motion");

    // Scroll-reveal: fade + rise once when scrolled into view
    var revealEls = [].slice.call(document.querySelectorAll(".section,.card,.scard,.stat,.qbox,.def,.tablewrap"));
    if ("IntersectionObserver" in window && revealEls.length) {
      revealEls.forEach(function (el, i) {
        el.style.setProperty("--rv-delay", (Math.min(i, 10) * 35) + "ms");
        el.classList.add("rv");
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("rv-in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
      revealEls.forEach(function (el) { io.observe(el); });
    }

    // Click ripple on primary CTA buttons
    document.querySelectorAll(".cta a").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        if (typeof e.clientX !== "number") return;
        var r = btn.getBoundingClientRect();
        var d = Math.max(r.width, r.height);
        var s = document.createElement("span");
        s.className = "ripple";
        s.style.width = s.style.height = d + "px";
        s.style.left = (e.clientX - r.left - d / 2) + "px";
        s.style.top = (e.clientY - r.top - d / 2) + "px";
        btn.appendChild(s);
        setTimeout(function () { s.remove(); }, 650);
      });
    });

    // Removed: page-transition fade broke the back button.
    // (DOM modifications before navigation prevent bfcache restore.)
    // Links navigate immediately — fast, reliable, back-button-safe.
  })();

  /* ---------- Math typesetting (KaTeX, vendored locally — offline, no CDN) ---------- */
  (function () {
    function loadMath() {
      if (window.katex && window.renderMathInElement) {
        try {
          renderMathInElement(document.body, {
            delimiters: [
              { left: "\\(", right: "\\)", display: false },
              { left: "\\[", right: "\\]", display: true }
            ],
            ignoredClasses: ["no-katex"],
            throwOnError: false
          });
        } catch (e) {}
        return true;
      }
      return false;
    }
    function ensureKatex(cb) {
      if (window.katex) return cb();
      var css = document.createElement("link");
      css.rel = "stylesheet"; css.href = "assets/vendor/katex/dist/katex.min.css";
      document.head.appendChild(css);
      var s = document.createElement("script");
      s.src = "assets/vendor/katex/dist/katex.min.js";
      s.onload = function () {
        var r = document.createElement("script");
        r.src = "assets/vendor/katex/dist/contrib/auto-render.min.js";
        r.onload = cb; document.head.appendChild(r);
      };
      document.head.appendChild(s);
    }
    ensureKatex(function () { loadMath(); });
    // Re-scan after fonts/layout settle (covers late-injected content)
    window.addEventListener("load", function () { loadMath(); });
  })();

  /* ─── Card pointer-warp effect ─── */
  document.querySelectorAll('.mcard').forEach(function (card) {
    var raf = 0;
    function update() {
      var rect = card.getBoundingClientRect();
      var mx = (pointer.x - rect.left) / rect.width - 0.5;
      var my = (pointer.y - rect.top) / rect.height - 0.5;
      card.style.setProperty('--mx', mx.toFixed(3));
      card.style.setProperty('--my', my.toFixed(3));
      raf = 0;
    }
    function onEnter() {
      card.classList.add('warp');
      if (!raf) raf = requestAnimationFrame(update);
    }
    function onLeave() {
      card.classList.remove('warp');
      card.style.setProperty('--mx','0');
      card.style.setProperty('--my','0');
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
    function onMove() {
      if (card.classList.contains('warp') && !raf) raf = requestAnimationFrame(update);
    }
    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointerleave', onLeave);
    card.addEventListener('pointermove', onMove);
  });

})();
