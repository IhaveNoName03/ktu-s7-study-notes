/* ===========================================================================
   Theme Registry - multiple named themes with light/dark/amoled variants
   Each theme defines colors for: background, text, accent, surfaces, borders
   =========================================================================== */

const ThemeRegistry = {
  /* Swiss monochrome + red (default) */
  swiss: {
    displayName: "Swiss Red",
    description: "Clean monochrome with Swiss red accent",
    light: {
      bg: "#f4f5f7",
      paper: "#ffffff",
      surface: "#f8f9fa",
      ink: "#111418",
      "ink-2": "#3a4149",
      muted: "#6b7480",
      line: "#e3e6ea",
      accent: "#e0241b",
      "accent-ink": "#b01a13",
      "accent-soft": "#fdecea",
      topbar: "rgba(255,255,255,.82)"
    },
    dark: {
      bg: "#0E0F12",
      paper: "#16191F",
      surface: "#1b1f26",
      ink: "#EDEFF2",
      "ink-2": "#B7BEC7",
      muted: "#8A929C",
      line: "#2a2f37",
      accent: "#E0241B",
      "accent-ink": "#ff8a82",
      "accent-soft": "#2a1413",
      topbar: "rgba(18,20,25,.82)"
    },
    amoled: {
      bg: "#000000",
      paper: "#0a0a0a",
      surface: "#111111",
      ink: "#e8e8e8",
      "ink-2": "#b0b0b0",
      muted: "#7a7a7a",
      line: "#1a1a1a",
      accent: "#ff3b30",
      "accent-ink": "#ff8a80",
      "accent-soft": "#1a0808",
      topbar: "rgba(0,0,0,.85)"
    }
  },

  /* Catppuccin Mocha */
  catppuccin: {
    displayName: "Catppuccin",
    description: "Soothing pastel theme",
    light: {
      bg: "#eff1f5",
      paper: "#e6e9ef",
      surface: "#dce0e8",
      ink: "#4c4f69",
      "ink-2": "#6c6f85",
      muted: "#9ca0b0",
      line: "#ccd0da",
      accent: "#ea76cb",
      "accent-ink": "#dd7878",
      "accent-soft": "#f2d5cf",
      topbar: "rgba(239,241,245,.82)"
    },
    dark: {
      bg: "#1e1e2e",
      paper: "#181825",
      surface: "#11111b",
      ink: "#cdd6f4",
      "ink-2": "#a6adc8",
      muted: "#6c7086",
      line: "#313244",
      accent: "#f5c2e7",
      "accent-ink": "#f38ba8",
      "accent-soft": "#45475a",
      topbar: "rgba(30,30,46,.82)"
    },
    amoled: {
      bg: "#000000",
      paper: "#11111b",
      surface: "#181825",
      ink: "#cdd6f4",
      "ink-2": "#a6adc8",
      muted: "#6c7086",
      line: "#1e1e2e",
      accent: "#f5c2e7",
      "accent-ink": "#f38ba8",
      "accent-soft": "#181825",
      topbar: "rgba(0,0,0,.85)"
    }
  },

  /* Gruvbox */
  gruvbox: {
    displayName: "Gruvbox",
    description: "Retro groove warmth",
    light: {
      bg: "#fbf1c7",
      paper: "#f9f5d7",
      surface: "#f2e5bc",
      ink: "#3c3836",
      "ink-2": "#504945",
      muted: "#928374",
      line: "#ebdbb2",
      accent: "#af3a03",
      "accent-ink": "#9d0006",
      "accent-soft": "#fbe6c7",
      topbar: "rgba(251,241,199,.82)"
    },
    dark: {
      bg: "#282828",
      paper: "#1d2021",
      surface: "#32302f",
      ink: "#ebdbb2",
      "ink-2": "#d5c4a1",
      muted: "#a89984",
      line: "#3c3836",
      accent: "#fe8019",
      "accent-ink": "#fb4934",
      "accent-soft": "#504945",
      topbar: "rgba(40,40,40,.82)"
    },
    amoled: {
      bg: "#000000",
      paper: "#1d2021",
      surface: "#282828",
      ink: "#ebdbb2",
      "ink-2": "#d5c4a1",
      muted: "#a89984",
      line: "#32302f",
      accent: "#fe8019",
      "accent-ink": "#fb4934",
      "accent-soft": "#1d2021",
      topbar: "rgba(0,0,0,.85)"
    }
  },

  /* Tokyo Night */
  tokyo: {
    displayName: "Tokyo Night",
    description: "Neon-lit midnight",
    light: {
      bg: "#d5d6db",
      paper: "#cbccd1",
      surface: "#d5d6db",
      ink: "#343b58",
      "ink-2": "#565f89",
      muted: "#9699a3",
      line: "#9699a3",
      accent: "#8c4351",
      "accent-ink": "#8c4351",
      "accent-soft": "#d5d6db",
      topbar: "rgba(213,214,219,.82)"
    },
    dark: {
      bg: "#1a1b26",
      paper: "#16161e",
      surface: "#24283b",
      ink: "#c0caf5",
      "ink-2": "#a9b1d6",
      muted: "#565f89",
      line: "#24283b",
      accent: "#7aa2f7",
      "accent-ink": "#bb9af7",
      "accent-soft": "#24283b",
      topbar: "rgba(26,27,38,.82)"
    },
    amoled: {
      bg: "#000000",
      paper: "#16161e",
      surface: "#1a1b26",
      ink: "#c0caf5",
      "ink-2": "#a9b1d6",
      muted: "#565f89",
      line: "#24283b",
      accent: "#7aa2f7",
      "accent-ink": "#bb9af7",
      "accent-soft": "#16161e",
      topbar: "rgba(0,0,0,.85)"
    }
  },

  /* Nord */
  nord: {
    displayName: "Nord",
    description: "Arctic, north-bluish",
    light: {
      bg: "#ECEFF4",
      paper: "#E5E9F0",
      surface: "#D8DEE9",
      ink: "#2E3440",
      "ink-2": "#3B4252",
      muted: "#4C566A",
      line: "#D8DEE9",
      accent: "#88C0D0",
      "accent-ink": "#BF616A",
      "accent-soft": "#E5E9F0",
      topbar: "rgba(236,239,244,.82)"
    },
    dark: {
      bg: "#2E3440",
      paper: "#3B4252",
      surface: "#434C5E",
      ink: "#ECEFF4",
      "ink-2": "#D8DEE9",
      muted: "#7B88A1",
      line: "#434C5E",
      accent: "#88C0D0",
      "accent-ink": "#BF616A",
      "accent-soft": "#3B4252",
      topbar: "rgba(46,52,64,.82)"
    },
    amoled: {
      bg: "#000000",
      paper: "#2E3440",
      surface: "#3B4252",
      ink: "#ECEFF4",
      "ink-2": "#D8DEE9",
      muted: "#7B88A1",
      line: "#434C5E",
      accent: "#88C0D0",
      "accent-ink": "#BF616A",
      "accent-soft": "#2E3440",
      topbar: "rgba(0,0,0,.85)"
    }
  },

  /* Solarized */
  solarized: {
    displayName: "Solarized",
    description: "Precision colors for machines and people",
    light: {
      bg: "#fdf6e3",
      paper: "#eee8d5",
      surface: "#eee8d5",
      ink: "#073642",
      "ink-2": "#586e75",
      muted: "#93a1a1",
      line: "#eee8d5",
      accent: "#268bd2",
      "accent-ink": "#dc322f",
      "accent-soft": "#eee8d5",
      topbar: "rgba(253,246,227,.82)"
    },
    dark: {
      bg: "#002b36",
      paper: "#073642",
      surface: "#073642",
      ink: "#fdf6e3",
      "ink-2": "#93a1a1",
      muted: "#657b83",
      line: "#073642",
      accent: "#268bd2",
      "accent-ink": "#dc322f",
      "accent-soft": "#073642",
      topbar: "rgba(0,43,54,.82)"
    },
    amoled: {
      bg: "#000000",
      paper: "#073642",
      surface: "#002b36",
      ink: "#fdf6e3",
      "ink-2": "#93a1a1",
      muted: "#657b83",
      line: "#073642",
      accent: "#268bd2",
      "accent-ink": "#dc322f",
      "accent-soft": "#073642",
      topbar: "rgba(0,0,0,.85)"
    }
  }
};
