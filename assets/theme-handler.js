/* ===========================================================================
   Theme Handler — FMHY-style theme system
   - Multiple named themes (Swiss, Catppuccin, Gruvbox, Tokyo, Nord, Solarized)
   - Light/Dark/Amoled variants per theme
   - Inline CSS variables (no FOUC)
   - Circular reveal animation (visual only, theme applies immediately)
   - System preference detection
   =========================================================================== */

(function() {
  var STORAGE_THEME = "theme-name";
  var STORAGE_MODE = "theme-mode";
  var STORAGE_AMOLED = "theme-amoled";

  var root = document.documentElement;
  var themeBtn = null;
  var themePanel = null;
  var lightBtn, darkBtn, amoledBtn;

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

    Object.keys(colors).forEach(function(key) {
      root.style.setProperty("--" + key, colors[key]);
    });

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
      var modeBtns = themePanel.querySelectorAll(".theme-mode-btn");
      modeBtns.forEach(function(b) { b.classList.remove("active"); });
      if (prefs.mode === "light") lightBtn.classList.add("active");
      else if (!prefs.amoled) darkBtn.classList.add("active");
      if (prefs.amoled && prefs.mode === "dark") amoledBtn.classList.add("active");
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

    var modeRow = document.createElement("div");
    modeRow.className = "theme-mode-row";
    lightBtn = document.createElement("button");
    lightBtn.className = "theme-mode-btn";
    lightBtn.type = "button";
    lightBtn.textContent = "Light";
    darkBtn = document.createElement("button");
    darkBtn.className = "theme-mode-btn";
    darkBtn.type = "button";
    darkBtn.textContent = "Dark";
    amoledBtn = document.createElement("button");
    amoledBtn.className = "theme-mode-btn";
    amoledBtn.type = "button";
    amoledBtn.textContent = "Amoled";
    modeRow.appendChild(lightBtn);
    modeRow.appendChild(darkBtn);
    modeRow.appendChild(amoledBtn);
    panel.appendChild(modeRow);

    var div = document.createElement("div");
    div.className = "theme-divider";
    panel.appendChild(div);

    Object.keys(ThemeRegistry).forEach(function(key) {
      var item = document.createElement("button");
      item.className = "theme-item";
      item.type = "button";
      item.setAttribute("data-theme", key);
      item.innerHTML = '<span class="theme-dot" style="background:' + ThemeRegistry[key].light.accent + '"></span><span class="theme-name">' + ThemeRegistry[key].displayName + '</span>';
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

    lightBtn.addEventListener("click", function(e) { e.stopPropagation(); setMode("light"); });
    darkBtn.addEventListener("click", function(e) { e.stopPropagation(); setMode("dark"); });
    amoledBtn.addEventListener("click", function(e) { e.stopPropagation(); toggleAmoled(); });

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
