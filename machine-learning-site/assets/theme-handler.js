/* ===========================================================================
   Theme Handler — FMHY-style comprehensive color system
   Applies: brand, bg, bgAlt, bgElv, text, button, customBlock, selection, home
   Amoled = pure black modifier on dark mode
   =========================================================================== */

(function() {
  var STORAGE_THEME = "theme-name";
  var STORAGE_MODE = "theme-mode";
  var STORAGE_AMOLED = "theme-amoled";

  var root = document.documentElement;
  var themeBtn = null;
  var themePanel = null;

  function read() {
    var theme = localStorage.getItem(STORAGE_THEME) || "swiss";
    var mode = localStorage.getItem(STORAGE_MODE);
    var amoled = localStorage.getItem(STORAGE_AMOLED) === "true";
    if (!mode) {
      try {
        mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      } catch(e) { mode = "light"; }
    }
    return { theme: theme, mode: mode, amoled: amoled };
  }

  function write(theme, mode, amoled) {
    localStorage.setItem(STORAGE_THEME, theme);
    localStorage.setItem(STORAGE_MODE, mode);
    localStorage.setItem(STORAGE_AMOLED, amoled ? "true" : "false");
  }

  function apply(themeName, mode, amoled) {
    var theme = ThemeRegistry[themeName];
    if (!theme) theme = ThemeRegistry.swiss;
    var colors = theme.light;
    if (amoled && mode === "dark" && theme.amoled) {
      colors = theme.amoled;
    } else if (theme[mode]) {
      colors = theme[mode];
    }

    // Core colors
    root.style.setProperty("--bg", colors.bg);
    root.style.setProperty("--bg-alt", colors.bgAlt);
    root.style.setProperty("--bg-elv", colors.bgElv);
    root.style.setProperty("--paper", colors.bgElv);
    root.style.setProperty("--surface", colors.bgAlt);

    if (colors.text) {
      root.style.setProperty("--ink", colors.text[1] || "#111418");
      root.style.setProperty("--ink-2", colors.text[2] || "#3a4149");
      root.style.setProperty("--muted", colors.text[3] || "#6b7480");
    }

    // Brand/accent
    if (colors.brand) {
      root.style.setProperty("--accent", colors.brand[1] || "#e0241b");
      root.style.setProperty("--accent-ink", colors.brand[2] || "#b01a13");
      root.style.setProperty("--accent-soft", colors.brand.soft || "#fdecea");
    }

    // Button
    if (colors.button) {
      root.style.setProperty("--btn-brand-bg", colors.button.brand.bg);
      root.style.setProperty("--btn-brand-border", colors.button.brand.border);
      root.style.setProperty("--btn-brand-text", colors.button.brand.text);
      root.style.setProperty("--btn-alt-bg", colors.button.alt.bg);
      root.style.setProperty("--btn-alt-text", colors.button.alt.text);
    }

    // Custom block
    if (colors.customBlock) {
      if (colors.customBlock.info) {
        root.style.setProperty("--block-info-bg", colors.customBlock.info.bg);
        root.style.setProperty("--block-info-border", colors.customBlock.info.border);
        root.style.setProperty("--block-info-text", colors.customBlock.info.text);
      }
      if (colors.customBlock.tip) {
        root.style.setProperty("--block-tip-bg", colors.customBlock.tip.bg);
        root.style.setProperty("--block-tip-border", colors.customBlock.tip.border);
        root.style.setProperty("--block-tip-text", colors.customBlock.tip.text);
      }
      if (colors.customBlock.warning) {
        root.style.setProperty("--block-warning-bg", colors.customBlock.warning.bg);
        root.style.setProperty("--block-warning-border", colors.customBlock.warning.border);
        root.style.setProperty("--block-warning-text", colors.customBlock.warning.text);
      }
      if (colors.customBlock.danger) {
        root.style.setProperty("--block-danger-bg", colors.customBlock.danger.bg);
        root.style.setProperty("--block-danger-border", colors.customBlock.danger.border);
        root.style.setProperty("--block-danger-text", colors.customBlock.danger.text);
      }
    }

    // Selection
    if (colors.selection) {
      root.style.setProperty("--selection-bg", colors.selection.bg);
    }

    // Home
    if (colors.home) {
      root.style.setProperty("--hero-name-color", colors.home.heroNameColor);
      root.style.setProperty("--hero-name-bg", colors.home.heroNameBackground);
    }

    // Compute line color (mix of bg and ink)
    var ink = colors.text ? colors.text[1] : "#111418";
    root.style.setProperty("--line", "color-mix(in srgb, " + ink + " 12%, " + colors.bg + ")");

    // Compute topbar bg (translucent bg)
    root.style.setProperty("--topbar-bg", colors.bgElv.replace(")", ", .82)").replace("rgb", "rgba"));

    root.setAttribute("data-theme", themeName);
    root.setAttribute("data-mode", mode);
    if (amoled && mode === "dark") {
      root.setAttribute("data-amoled", "true");
    } else {
      root.removeAttribute("data-amoled");
    }
  }

  function showReveal(targetTheme) {
    var cur = localStorage.getItem(STORAGE_THEME) || "swiss";
    if (cur === targetTheme) return;
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    var rect = btn.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var ov = document.createElement("div");
    ov.className = "theme-reveal";
    ov.style.left = cx + "px";
    ov.style.top = cy + "px";
    ov.style.width = "8px";
    ov.style.height = "8px";
    var colors = ThemeRegistry[targetTheme] ? ThemeRegistry[targetTheme].light : {};
    ov.style.background = colors.bg || "#000000";
    document.body.appendChild(ov);
    requestAnimationFrame(function() { ov.classList.add("go"); });
    setTimeout(function() { ov.remove(); }, 500);
  }

  function updateUI() {
    var prefs = read();
    if (themeBtn) {
      var icon = prefs.mode === "light" ? "☀︎" : "☾";
      if (prefs.amoled && prefs.mode === "dark") icon = "⬤";
      themeBtn.innerHTML = '<span class="ic">' + icon + '</span> <span class="lbl">' + ThemeRegistry[prefs.theme].displayName + '</span>';
    }
    if (themePanel) {
      var items = themePanel.querySelectorAll(".theme-item");
      items.forEach(function(item) {
        item.classList.remove("active");
        if (item.getAttribute("data-theme") === prefs.theme) item.classList.add("active");
      });
    }
  }

  function setTheme(themeName) {
    var prefs = read();
    apply(themeName, prefs.mode, prefs.amoled);
    write(themeName, prefs.mode, prefs.amoled);
    showReveal(themeName);
    updateUI();
  }

  function setMode(mode) {
    var prefs = read();
    apply(prefs.theme, mode, prefs.amoled);
    write(prefs.theme, mode, prefs.amoled);
    updateUI();
  }

  function toggleMode() {
    var prefs = read();
    setMode(prefs.mode === "light" ? "dark" : "light");
  }

  function setAmoled(enabled) {
    var prefs = read();
    apply(prefs.theme, prefs.mode, enabled);
    write(prefs.theme, prefs.mode, enabled);
    updateUI();
  }

  function toggleAmoled() {
    var prefs = read();
    setAmoled(!prefs.amoled);
  }

  function buildDropdown() {
    var bar = document.querySelector(".topbar-inner") || document.querySelector(".topbar");
    if (!bar) return;

    var wrap = document.createElement("div");
    wrap.className = "theme-dd";

    var btn = document.createElement("button");
    btn.className = "theme-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Choose theme");
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    themeBtn = btn;

    var panel = document.createElement("div");
    panel.className = "theme-panel";
    themePanel = panel;

    Object.keys(ThemeRegistry).forEach(function(key) {
      var item = document.createElement("button");
      item.className = "theme-item";
      item.type = "button";
      item.setAttribute("data-theme", key);
      item.innerHTML = '<span class="theme-dot" style="background:' + ThemeRegistry[key].light.brand[1] + '"></span><span class="theme-name">' + ThemeRegistry[key].displayName + '</span>';
      item.addEventListener("click", function(e) {
        e.stopPropagation();
        setTheme(key);
        panel.classList.remove("show");
        btn.setAttribute("aria-expanded", "false");
      });
      panel.appendChild(item);
    });

    btn.addEventListener("click", function() {
      var open = panel.classList.toggle("show");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    wrap.appendChild(btn);
    wrap.appendChild(panel);
    bar.appendChild(wrap);

    document.addEventListener("click", function(e) {
      if (!wrap.contains(e.target)) {
        panel.classList.remove("show");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    updateUI();
  }

  function init() {
    var prefs = read();
    apply(prefs.theme, prefs.mode, prefs.amoled);
    buildDropdown();
  }

  window.ThemeAPI = {
    setTheme: setTheme,
    setMode: setMode,
    toggleMode: toggleMode,
    setAmoled: setAmoled,
    toggleAmoled: toggleAmoled,
    getThemes: function() { return Object.keys(ThemeRegistry).map(function(k) { return { name: k, displayName: ThemeRegistry[k].displayName }; }); },
    getPrefs: read
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
