/* ===========================================================================
   Theme Handler — one menu: Appearance (light/dark/amoled) + Accent (palette)

   PERSISTENCE NOTE
   Opened over file:// many browsers give every single file its own opaque
   storage origin, so localStorage does NOT carry between pages — that is why
   a choice appeared to stick to one page only. We therefore persist to THREE
   places and read whichever is available:
     1. localStorage   — survives restarts (http/https, and file:// in Chrome)
     2. cookie         — survives restarts when served over http(s)
     3. window.name    — survives same-tab navigation on ANY protocol,
                         including file://, so double-clicked pages stay in sync
   =========================================================================== */
(function () {
  var K_THEME = "theme-name";
  var K_MODE  = "theme-mode";
  var WN_TAG  = "s7theme:";

  var root = document.documentElement;
  var btn = null, panel = null;

  /* ---------- storage helpers ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function ckGet(k) {
    try {
      var m = document.cookie.match(new RegExp("(?:^|; )" + k + "=([^;]*)"));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }
  function ckSet(k, v) {
    try { document.cookie = k + "=" + encodeURIComponent(v) + ";path=/;max-age=31536000;samesite=lax"; } catch (e) {}
  }

  /* window.name travels with the tab across file:// navigations */
  function wnGet() {
    try {
      if (window.name && window.name.indexOf(WN_TAG) === 0)
        return JSON.parse(window.name.slice(WN_TAG.length));
    } catch (e) {}
    return null;
  }
  function wnSet(theme, mode) {
    try { window.name = WN_TAG + JSON.stringify({ t: theme, m: mode }); } catch (e) {}
  }

  var MODES = ["light", "dark", "amoled"];

  function read() {
    /* Prefer the cross-page bridge (handles file:// partitioning + new tabs). */
    var br = null;
    try { if (window.ThemeBridge) br = window.ThemeBridge.resolve(); } catch (e) {}
    var wn = wnGet();
    var theme = (br && br.theme) || lsGet(K_THEME) || ckGet(K_THEME) || (wn && wn.t);
    var mode  = (br && br.mode)  || lsGet(K_MODE)  || ckGet(K_MODE)  || (wn && wn.m);

    if (!theme || !ThemeRegistry[theme]) theme = "swiss";
    if (MODES.indexOf(mode) === -1) {
      try {
        mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      } catch (e) { mode = "light"; }
    }
    return { theme: theme, mode: mode };
  }

  function write(theme, mode) {
    lsSet(K_THEME, theme); lsSet(K_MODE, mode);
    ckSet(K_THEME, theme); ckSet(K_MODE, mode);
    wnSet(theme, mode);
    try { if (window.ThemeBridge) window.ThemeBridge.persist(theme, mode); } catch (e) {}
  }

  /* ---------- apply palette ---------- */

  /* Relative luminance of a #rgb / #rrggbb colour, 0 (black) .. 1 (white).
     Used to pick readable text on accent-filled surfaces. */
  function luminance(hex) {
    if (!hex) return 0;
    var h = String(hex).trim().replace(/^#/, "");
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length < 6) return 0;
    var r = parseInt(h.slice(0, 2), 16),
        g = parseInt(h.slice(2, 4), 16),
        b = parseInt(h.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return 0;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  }

  function palette(themeName, mode) {
    var t = ThemeRegistry[themeName] || ThemeRegistry.swiss;
    return t[mode] || t.dark || t.light;
  }

  function apply(themeName, mode) {
    var c = palette(themeName, mode);
    var S = function (k, v) { if (v) root.style.setProperty(k, v); };

    S("--bg", c.bg); S("--bg-alt", c.bgAlt); S("--bg-elv", c.bgElv);
    S("--paper", c.bgElv); S("--surface", c.bgAlt); S("--footer-bg", c.bg);

    if (c.text)  { S("--ink", c.text[1]); S("--ink-2", c.text[2]); S("--muted", c.text[3]); }
    if (c.brand) { S("--accent", c.brand[1]); S("--accent-ink", c.brand[2]); S("--accent-soft", c.brand.soft); }
    if (c.button) {
      S("--btn-brand-bg", c.button.brand.bg); S("--btn-brand-border", c.button.brand.border);
      S("--btn-brand-text", c.button.brand.text);
      S("--btn-alt-bg", c.button.alt.bg); S("--btn-alt-text", c.button.alt.text);
    }
    if (c.customBlock) {
      ["info", "tip", "warning", "danger"].forEach(function (k) {
        var bl = c.customBlock[k]; if (!bl) return;
        S("--block-" + k + "-bg", bl.bg);
        S("--block-" + k + "-border", bl.border);
        S("--block-" + k + "-text", bl.text);
      });
    }
    if (c.selection) S("--selection-bg", c.selection.bg);

    var ink = (c.text && c.text[1]) || "#111418";
    S("--line", "color-mix(in srgb, " + ink + " 14%, " + c.bg + ")");
    S("--topbar-bg", "color-mix(in srgb, " + c.bgElv + " 88%, transparent)");

    /* Readable text colour for anything filled with --accent.
       Pale accents (Catppuccin pink, Nord frost) need dark text; strong
       accents (Swiss red) need white. Computed from accent luminance. */
    var acc = (c.brand && c.brand[1]) || "#E0241B";
    S("--on-accent", luminance(acc) > 0.6 ? (c.bg || "#111418") : "#ffffff");

    root.setAttribute("data-theme", themeName);
    root.setAttribute("data-mode", mode);
    if (mode === "amoled") root.setAttribute("data-amoled", "true");
    else root.removeAttribute("data-amoled");
  }

  /* ---------- circular reveal ---------- */
  /* ── Radial reveal driven by the View Transitions API ──────────────────
     The browser snapshots the page BEFORE and AFTER the switch, then we
     animate a clip-path circle on one of those snapshots. Because the new
     theme lives inside the snapshot, the colours are revealed *as the circle
     grows* instead of flipping instantly underneath an overlay.

     While the reveal runs, `.theme-vt` kills every CSS transition: otherwise
     the page's own background/colour transitions animate a second time under
     the snapshot and the two drift out of sync. The clip is a Web Animations
     animation on a pseudo-element, so `transition:none` cannot touch it.

     Falls back to an instant switch when View Transitions are unavailable
     (Firefox/Safari) or the user prefers reduced motion.                     */
  var VT_DURATION = 520;
  var VT_EASING = "cubic-bezier(.4,0,.2,1)";

  function canVT() {
    try {
      return typeof document !== "undefined" &&
             "startViewTransition" in document &&
             window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    } catch (e) { return false; }
  }

  /* Is the target palette darker than the one on screen now? */
  function goingDarker(nextTheme, nextMode) {
    try {
      var now = luminance(getComputedStyle(document.documentElement)
                  .getPropertyValue("--bg").trim() || "#ffffff");
      return luminance(palette(nextTheme, nextMode).bg) < now;
    } catch (e) { return false; }
  }

  /* commit = the function that actually swaps the palette */
  function revealSwitch(nextTheme, nextMode, commit) {
    if (!canVT()) { commit(); return; }

    var origin = btn ? btn.getBoundingClientRect() : null;
    var cx = origin ? origin.left + origin.width / 2 : innerWidth / 2;
    var cy = origin ? origin.top + origin.height / 2 : innerHeight / 2;
    var far = Math.hypot(Math.max(cx, innerWidth - cx),
                         Math.max(cy, innerHeight - cy)) + 30;

    var grow = ["circle(0px at " + cx + "px " + cy + "px)",
                "circle(" + far + "px at " + cx + "px " + cy + "px)"];

    /* Getting darker: shrink the OLD (lighter) snapshot away to uncover the
       new dark one. Getting lighter: grow the NEW (lighter) snapshot on top. */
    var darker = goingDarker(nextTheme, nextMode);
    var root = document.documentElement;

    root.classList.add("theme-vt");
    root.setAttribute("data-vt", darker ? "darker" : "lighter");

    var vt;
    try { vt = document.startViewTransition(function () { commit(); }); }
    catch (e) { root.classList.remove("theme-vt"); commit(); return; }

    function cleanup() {
      root.classList.remove("theme-vt");
      root.removeAttribute("data-vt");
    }
    vt.finished.then(cleanup, cleanup);

    vt.ready.then(function () {
      root.animate(
        { clipPath: darker ? grow.slice().reverse() : grow },
        { duration: VT_DURATION, easing: VT_EASING, fill: "forwards",
          pseudoElement: "::view-transition-" + (darker ? "old" : "new") + "(root)" }
      );
    }, function () { /* transition aborted — palette already committed */ });
  }

  function setTheme(name) {
    var p = read();
    revealSwitch(name, p.mode, function () {
      apply(name, p.mode); write(name, p.mode); paint();
    });
  }
  function setMode(mode) {
    var p = read();
    revealSwitch(p.theme, mode, function () {
      apply(p.theme, mode); write(p.theme, mode); paint();
    });
  }

  var MODE_META = {
    light:  { label: "Light",  ic: "\u2600\uFE0E" },
    dark:   { label: "Dark",   ic: "\u263E" },
    amoled: { label: "Amoled", ic: "\u2B24" }
  };

  function paint() {
    var p = read();
    if (btn) {
      btn.innerHTML = '<span class="ic">' + MODE_META[p.mode].ic + '</span>' +
                      '<span class="lbl">' + ThemeRegistry[p.theme].displayName + '</span>' +
                      '<span class="caret">\u25BE</span>';
    }
    if (!panel) return;
    panel.querySelectorAll(".theme-mode-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-mode") === p.mode);
    });
    panel.querySelectorAll(".theme-item").forEach(function (i) {
      i.classList.toggle("active", i.getAttribute("data-theme") === p.theme);
    });
  }

  /* ---------- one dropdown: Appearance + Accent ---------- */
  function build() {
    var bar = document.querySelector(".topbar-inner") || document.querySelector(".topbar");
    if (!bar) return;

    /* remove any stale/duplicate control from older builds */
    bar.querySelectorAll(".theme-dd, .theme-toggle").forEach(function (n) {
      if (!n.closest || !n.closest(".theme-dd") || n.classList.contains("theme-dd")) n.remove();
    });

    var wrap = document.createElement("div"); wrap.className = "theme-dd";

    btn = document.createElement("button");
    btn.className = "theme-toggle"; btn.type = "button";
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Theme and appearance");

    panel = document.createElement("div"); panel.className = "theme-panel";

    /* — Appearance — */
    var l1 = document.createElement("div");
    l1.className = "theme-grouplabel"; l1.textContent = "Appearance";
    panel.appendChild(l1);

    var row = document.createElement("div"); row.className = "theme-mode-row";
    MODES.forEach(function (m) {
      var b = document.createElement("button");
      b.className = "theme-mode-btn"; b.type = "button";
      b.setAttribute("data-mode", m);
      b.innerHTML = '<span class="ic">' + MODE_META[m].ic + '</span>' + MODE_META[m].label;
      b.addEventListener("click", function (e) { e.stopPropagation(); setMode(m); });
      row.appendChild(b);
    });
    panel.appendChild(row);

    panel.appendChild(Object.assign(document.createElement("div"), { className: "theme-divider" }));

    /* — Accent — */
    var l2 = document.createElement("div");
    l2.className = "theme-grouplabel"; l2.textContent = "Accent";
    panel.appendChild(l2);

    var list = document.createElement("div"); list.className = "theme-list";
    Object.keys(ThemeRegistry).forEach(function (key) {
      var it = document.createElement("button");
      it.className = "theme-item"; it.type = "button";
      it.setAttribute("data-theme", key);
      it.innerHTML = '<span class="theme-dot" style="background:' +
                     ThemeRegistry[key].light.brand[1] + '"></span>' +
                     '<span class="theme-name">' + ThemeRegistry[key].displayName + '</span>' +
                     '<span class="theme-check">\u2713</span>';
      it.addEventListener("click", function (e) { e.stopPropagation(); setTheme(key); });
      list.appendChild(it);
    });
    panel.appendChild(list);

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = panel.classList.toggle("show");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) {
        panel.classList.remove("show"); btn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { panel.classList.remove("show"); btn.setAttribute("aria-expanded", "false"); }
    });

    wrap.appendChild(btn); wrap.appendChild(panel); bar.appendChild(wrap);
    paint();
  }

  function init() {
    var p = read(); apply(p.theme, p.mode); write(p.theme, p.mode); build();
    /* Tidy the handoff fragment out of the address bar, then tag outgoing
       links so a brand-new tab inherits the same theme. */
    try {
      if (window.ThemeBridge) {
        window.ThemeBridge.decorateLinks(p.theme, p.mode);
        window.ThemeBridge.stripHash();
      }
    } catch (e) {}
  }

  window.ThemeAPI = {
    setTheme: setTheme, setMode: setMode, getPrefs: read,
    getThemes: function () {
      return Object.keys(ThemeRegistry).map(function (k) {
        return { name: k, displayName: ThemeRegistry[k].displayName };
      });
    }
  };

  /* paint palette before first frame, then build the control */
  var p0 = read(); apply(p0.theme, p0.mode);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
