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

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".navtoggle");
  var nav = document.querySelector(".topnav");
  function closeNav() { if (nav) nav.classList.remove("open"); }
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

  /* ---------- Theme toggle (light/dark) — persists across pages & sites ---------- */
  (function () {
    var root = document.documentElement;
    function read() {
      try {
        var c = document.cookie.match(/(^|; )theme=(dark|light)(;|$)/);
        if (c) return c[2];
      } catch (e) {}
      try { var ls = localStorage.getItem("theme"); if (ls === "dark" || ls === "light") return ls; } catch (e) {}
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
      btn.setAttribute("aria-label", "Toggle dark theme");
      function paint() {
        var dark = root.getAttribute("data-theme") === "dark";
        btn.innerHTML = '<span class="ic">' + (dark ? "\u263E" : "\u2600") + '</span> ' + '<span class="lbl">' + (dark ? "Dark" : "Light") + "</span>";
      }
      btn.addEventListener("click", function () {
        var dark = root.getAttribute("data-theme") === "dark";
        var next = dark ? "light" : "dark";
        root.setAttribute("data-theme", next);
        write(next);
        paint();
      });
      paint();
      bar.appendChild(btn);
    }
    makeBtn();
  })();

})();
