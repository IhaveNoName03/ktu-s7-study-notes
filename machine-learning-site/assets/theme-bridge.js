/* ===========================================================================
   theme-bridge.js — cross-page theme memory that also works on file://

   WHY THIS EXISTS
   Opened over file://, Chrome/Edge give every single .html file its OWN
   localStorage partition and block cookies entirely. So a choice made on
   index.html is invisible to ethical-hacking-site/m1-1.html, and the theme
   silently falls back to prefers-color-scheme (usually dark).

   HOW IT WORKS
   Every page loads this ONE shared file from the site root. Because all pages
   share the same script URL, we can use it as a rendezvous point:

     • sessionStorage / localStorage  – fast path when the browser does share them
     • window.name                    – survives same-tab navigation on file://
     • document.cookie                – works on http(s)
     • location.hash handoff          – survives BRAND-NEW tabs: outgoing links
       get #t=<theme>&m=<mode> appended, which the next page reads and strips

   The hash handoff is the piece that makes a fresh tab inherit the choice,
   because it rides in the URL rather than in any storage partition.
   =========================================================================== */
(function () {
  "use strict";

  var K_THEME = "theme-name", K_MODE = "theme-mode", WN = "s7theme:";
  var MODES = ["light", "dark", "amoled"];
  var THEMES = ["swiss", "catppuccin", "gruvbox", "nord", "solarized", "tokyo"];

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }

  function ckGet(k) {
    try {
      var m = document.cookie.match(new RegExp("(?:^|; )" + k + "=([^;]*)"));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }
  function ckSet(k, v) {
    try { document.cookie = k + "=" + encodeURIComponent(v) + ";path=/;max-age=31536000;samesite=lax"; } catch (e) {}
  }

  function wnGet() {
    try {
      if (window.name && window.name.indexOf(WN) === 0)
        return JSON.parse(window.name.slice(WN.length));
    } catch (e) {}
    return null;
  }
  function wnSet(t, m) {
    try { window.name = WN + JSON.stringify({ t: t, m: m }); } catch (e) {}
  }

  /* ---- hash handoff: the only channel that crosses file:// partitions ---- */
  function hashGet() {
    try {
      var h = location.hash || "";
      var t = (h.match(/[#&]t=([a-z]+)/) || [])[1];
      var m = (h.match(/[#&]m=([a-z]+)/) || [])[1];
      if (t || m) return { t: t, m: m };
    } catch (e) {}
    return null;
  }
  function hashStrip() {
    try {
      if (!/[#&][tm]=/.test(location.hash)) return;
      var clean = location.hash.replace(/[#&]t=[a-z]+/g, "").replace(/[#&]m=[a-z]+/g, "");
      clean = clean.replace(/^#&/, "#");
      if (clean === "#" || clean === "") {
        history.replaceState(null, "", location.pathname + location.search);
      } else {
        history.replaceState(null, "", location.pathname + location.search + clean);
      }
    } catch (e) {}
  }

  function valid(t, m) {
    return {
      t: THEMES.indexOf(t) > -1 ? t : null,
      m: MODES.indexOf(m) > -1 ? m : null
    };
  }

  /* Resolve preferences from every channel, most-explicit first. */
  function resolve() {
    var order = [hashGet(), { t: ssGet(K_THEME), m: ssGet(K_MODE) },
                 { t: lsGet(K_THEME), m: lsGet(K_MODE) },
                 { t: ckGet(K_THEME), m: ckGet(K_MODE) }, wnGet()];
    var theme = null, mode = null;
    for (var i = 0; i < order.length; i++) {
      var o = order[i]; if (!o) continue;
      var v = valid(o.t, o.m);
      if (!theme && v.t) theme = v.t;
      if (!mode && v.m) mode = v.m;
      if (theme && mode) break;
    }
    return { theme: theme, mode: mode };
  }

  /* Write to every channel so whichever one survives carries the choice. */
  function persist(theme, mode) {
    var v = valid(theme, mode);
    if (!v.t || !v.m) return;
    ssSet(K_THEME, v.t); ssSet(K_MODE, v.m);
    lsSet(K_THEME, v.t); lsSet(K_MODE, v.m);
    ckSet(K_THEME, v.t); ckSet(K_MODE, v.m);
    wnSet(v.t, v.m);
    decorateLinks(v.t, v.m);
  }

  /* Append #t=..&m=.. to same-site links so a NEW TAB inherits the theme. */
  function decorateLinks(theme, mode) {
    var frag = "t=" + theme + "&m=" + mode;
    var links = document.querySelectorAll('a[href$=".html"], a[href*=".html#"], a[href*=".html?"]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i], href = a.getAttribute("href");
      if (!href || /^(?:https?:)?\/\//i.test(href) || href.indexOf("mailto:") === 0) continue;
      var base = href.split("#")[0];
      a.setAttribute("href", base + "#" + frag);
    }
  }

  window.ThemeBridge = {
    resolve: resolve,
    persist: persist,
    decorateLinks: decorateLinks,
    stripHash: hashStrip
  };

  /* Seed storage from the hash immediately, before the handler reads anything. */
  var r = resolve();
  if (r.theme && r.mode) {
    ssSet(K_THEME, r.theme); ssSet(K_MODE, r.mode);
    lsSet(K_THEME, r.theme); lsSet(K_MODE, r.mode);
    ckSet(K_THEME, r.theme); ckSet(K_MODE, r.mode);
    wnSet(r.theme, r.mode);
  }
})();
