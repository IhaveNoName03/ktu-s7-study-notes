/* ===========================================================================
   Theme Registry — FMHY-style comprehensive color system
   Each theme defines: brand, bg, bgAlt, bgElv, text, button, customBlock,
   selection, and home colors for both light and dark modes.
   Amoled is a dark-mode modifier (pure black backgrounds).
   =========================================================================== */

const ThemeRegistry = {
  /* ── Swiss Red (default) ── */
  swiss: {
    displayName: "Swiss Red",
    light: {
      brand: { 1: "#e0241b", 2: "#b01a13", 3: "#ff8a82", soft: "#fdecea" },
      bg: "#f4f5f7",
      bgAlt: "#f8f9fa",
      bgElv: "#ffffff",
      text: { 1: "#111418", 2: "#3a4149", 3: "#6b7480" },
      button: {
        brand: { bg: "#e0241b", border: "#e0241b", text: "#ffffff", hoverBg: "#b01a13", hoverBorder: "#b01a13", hoverText: "#ffffff", activeBg: "#8c1510", activeBorder: "#8c1510", activeText: "#ffffff" },
        alt: { bg: "#e3e6ea", text: "#111418", hoverBg: "#d1d5da", hoverText: "#111418" }
      },
      customBlock: {
        info: { bg: "#e8f4f8", border: "#0b5fd6", text: "#0b5fd6", textDeep: "#0a4a9e" },
        tip: { bg: "#e8f8e8", border: "#1e8449", text: "#1e8449", textDeep: "#145a32" },
        warning: { bg: "#fff8e1", border: "#d4a017", text: "#92630a", textDeep: "#5c3d06" },
        danger: { bg: "#fdecea", border: "#e0241b", text: "#b01a13", textDeep: "#8c1510" }
      },
      selection: { bg: "#0b5fd6" },
      home: { heroNameColor: "#e0241b", heroNameBackground: "#e0241b", heroImageBackground: "linear-gradient(-45deg, #e0241b 50%, #0b5fd6 50%)", heroImageFilter: "blur(44px)" }
    },
    dark: {
      brand: { 1: "#E0241B", 2: "#ff8a82", 3: "#ff8a82", soft: "#2a1413" },
      bg: "#0E0F12",
      bgAlt: "#16191F",
      bgElv: "#1b1f26",
      text: { 1: "#EDEFF2", 2: "#B7BEC7", 3: "#8A929C" },
      button: {
        brand: { bg: "#E0241B", border: "#E0241B", text: "#ffffff", hoverBg: "#ff8a82", hoverBorder: "#ff8a82", hoverText: "#ffffff", activeBg: "#b01a13", activeBorder: "#b01a13", activeText: "#ffffff" },
        alt: { bg: "#2a2f37", text: "#EDEFF2", hoverBg: "#3a4149", hoverText: "#EDEFF2" }
      },
      customBlock: {
        info: { bg: "#0d1b2a", border: "#0b5fd6", text: "#5a9fd6", textDeep: "#8abce6" },
        tip: { bg: "#0d2a0d", border: "#1e8449", text: "#5ab87a", textDeep: "#8cd9a8" },
        warning: { bg: "#2a2a0d", border: "#d4a017", text: "#e6c04a", textDeep: "#f0d88a" },
        danger: { bg: "#2a0d0d", border: "#E0241B", text: "#ff8a82", textDeep: "#ffb3b0" }
      },
      selection: { bg: "#0b5fd6" },
      home: { heroNameColor: "#E0241B", heroNameBackground: "#E0241B", heroImageBackground: "linear-gradient(-45deg, #E0241B 50%, #0b5fd6 50%)", heroImageFilter: "blur(44px)" }
    },
    amoled: {
      brand: { 1: "#ff3b30", 2: "#ff8a80", 3: "#ff8a80", soft: "#1a0808" },
      bg: "#000000",
      bgAlt: "#0a0a0a",
      bgElv: "#111111",
      text: { 1: "#e8e8e8", 2: "#b0b0b0", 3: "#7a7a7a" },
      button: {
        brand: { bg: "#ff3b30", border: "#ff3b30", text: "#ffffff", hoverBg: "#ff8a80", hoverBorder: "#ff8a80", hoverText: "#ffffff", activeBg: "#cc2d24", activeBorder: "#cc2d24", activeText: "#ffffff" },
        alt: { bg: "#1a1a1a", text: "#e8e8e8", hoverBg: "#2a2a2a", hoverText: "#e8e8e8" }
      },
      customBlock: {
        info: { bg: "#000000", border: "#4da6ff", text: "#4da6ff", textDeep: "#8abce6" },
        tip: { bg: "#000000", border: "#3dd68c", text: "#3dd68c", textDeep: "#8cd9a8" },
        warning: { bg: "#000000", border: "#f9b44e", text: "#f9b44e", textDeep: "#f0d88a" },
        danger: { bg: "#000000", border: "#ff3b30", text: "#ff8a80", textDeep: "#ffb3b0" }
      },
      selection: { bg: "#4da6ff" },
      home: { heroNameColor: "#ff3b30", heroNameBackground: "#ff3b30", heroImageBackground: "linear-gradient(-45deg, #ff3b30 50%, #4da6ff 50%)", heroImageFilter: "blur(44px)" }
    }
  },

  /* ── Catppuccin Mocha ── */
  catppuccin: {
    displayName: "Catppuccin",
    light: {
      brand: { 1: "#ea76cb", 2: "#dd7878", 3: "#ad82dfff", soft: "#f2d5cf" },
      bg: "#eff1f5",
      bgAlt: "#e6e9ef",
      bgElv: "#dce0e8",
      text: { 1: "#4c4f69", 2: "#6c6f85", 3: "#9ca0b0" },
      button: {
        brand: { bg: "#ea76cb", border: "#ea76cb", text: "#ffffff", hoverBg: "#dd7878", hoverBorder: "#dd7878", hoverText: "#ffffff", activeBg: "#c06060", activeBorder: "#c06060", activeText: "#ffffff" },
        alt: { bg: "#ccd0da", text: "#4c4f69", hoverBg: "#bcc0cc", hoverText: "#4c4f69" }
      },
      customBlock: {
        info: { bg: "#e8f4f8", border: "#0b5fd6", text: "#0b5fd6", textDeep: "#0a4a9e" },
        tip: { bg: "#e8f8e8", border: "#1e8449", text: "#1e8449", textDeep: "#145a32" },
        warning: { bg: "#fff8e1", border: "#d4a017", text: "#92630a", textDeep: "#5c3d06" },
        danger: { bg: "#fdecea", border: "#e0241b", text: "#b01a13", textDeep: "#8c1510" }
      },
      selection: { bg: "#ea76cb" },
      home: { heroNameColor: "#ea76cb", heroNameBackground: "#ea76cb", heroImageBackground: "linear-gradient(-45deg, #ea76cb 50%, #dd7878 50%)", heroImageFilter: "blur(44px)" }
    },
    dark: {
      brand: { 1: "#f5c2e7", 2: "#f38ba8", 3: "#cba6f7", soft: "#45475a" },
      bg: "#1e1e2e",
      bgAlt: "#181825",
      bgElv: "#11111b",
      text: { 1: "#cdd6f4", 2: "#a6adc8", 3: "#6c7086" },
      button: {
        brand: { bg: "#f5c2e7", border: "#f5c2e7", text: "#1e1e2e", hoverBg: "#f38ba8", hoverBorder: "#f38ba8", hoverText: "#1e1e2e", activeBg: "#e06c75", activeBorder: "#e06c75", activeText: "#1e1e2e" },
        alt: { bg: "#313244", text: "#cdd6f4", hoverBg: "#45475a", hoverText: "#cdd6f4" }
      },
      customBlock: {
        info: { bg: "#1e1e2e", border: "#89b4fa", text: "#89b4fa", textDeep: "#b4d0fb" },
        tip: { bg: "#1e1e2e", border: "#a6e3a1", text: "#a6e3a1", textDeep: "#c8f0c8" },
        warning: { bg: "#1e1e2e", border: "#f9e2af", text: "#f9e2af", textDeep: "#fcefc8" },
        danger: { bg: "#1e1e2e", border: "#f38ba8", text: "#f38ba8", textDeep: "#f9c7d0" }
      },
      selection: { bg: "#f5c2e7" },
      home: { heroNameColor: "#f5c2e7", heroNameBackground: "#f5c2e7", heroImageBackground: "linear-gradient(-45deg, #f5c2e7 50%, #f38ba8 50%)", heroImageFilter: "blur(44px)" }
    },
    amoled: {
      brand: { 1: "#f5c2e7", 2: "#f38ba8", 3: "#cba6f7", soft: "#181825" },
      bg: "#000000",
      bgAlt: "#11111b",
      bgElv: "#181825",
      text: { 1: "#cdd6f4", 2: "#a6adc8", 3: "#6c7086" },
      button: {
        brand: { bg: "#f5c2e7", border: "#f5c2e7", text: "#000000", hoverBg: "#f38ba8", hoverBorder: "#f38ba8", hoverText: "#000000", activeBg: "#e06c75", activeBorder: "#e06c75", activeText: "#000000" },
        alt: { bg: "#1e1e2e", text: "#cdd6f4", hoverBg: "#313244", hoverText: "#cdd6f4" }
      },
      customBlock: {
        info: { bg: "#000000", border: "#89b4fa", text: "#89b4fa", textDeep: "#b4d0fb" },
        tip: { bg: "#000000", border: "#a6e3a1", text: "#a6e3a1", textDeep: "#c8f0c8" },
        warning: { bg: "#000000", border: "#f9e2af", text: "#f9e2af", textDeep: "#fcefc8" },
        danger: { bg: "#000000", border: "#f38ba8", text: "#f38ba8", textDeep: "#f9c7d0" }
      },
      selection: { bg: "#f5c2e7" },
      home: { heroNameColor: "#f5c2e7", heroNameBackground: "#f5c2e7", heroImageBackground: "linear-gradient(-45deg, #f5c2e7 50%, #f38ba8 50%)", heroImageFilter: "blur(44px)" }
    }
  },

  /* ── Gruvbox ── */
  gruvbox: {
    displayName: "Gruvbox",
    light: {
      brand: { 1: "#af3a03", 2: "#9d0006", 3: "#fe8019", soft: "#fbe6c7" },
      bg: "#fbf1c7",
      bgAlt: "#f9f5d7",
      bgElv: "#f2e5bc",
      text: { 1: "#3c3836", 2: "#504945", 3: "#928374" },
      button: {
        brand: { bg: "#af3a03", border: "#af3a03", text: "#ffffff", hoverBg: "#9d0006", hoverBorder: "#9d0006", hoverText: "#ffffff", activeBg: "#7a0005", activeBorder: "#7a0005", activeText: "#ffffff" },
        alt: { bg: "#ebdbb2", text: "#3c3836", hoverBg: "#d5c4a1", hoverText: "#3c3836" }
      },
      customBlock: {
        info: { bg: "#e8f4f8", border: "#0b5fd6", text: "#0b5fd6", textDeep: "#0a4a9e" },
        tip: { bg: "#e8f8e8", border: "#1e8449", text: "#1e8449", textDeep: "#145a32" },
        warning: { bg: "#fff8e1", border: "#d4a017", text: "#92630a", textDeep: "#5c3d06" },
        danger: { bg: "#fdecea", border: "#e0241b", text: "#b01a13", textDeep: "#8c1510" }
      },
      selection: { bg: "#af3a03" },
      home: { heroNameColor: "#af3a03", heroNameBackground: "#af3a03", heroImageBackground: "linear-gradient(-45deg, #af3a03 50%, #9d0006 50%)", heroImageFilter: "blur(44px)" }
    },
    dark: {
      brand: { 1: "#fe8019", 2: "#fb4934", 3: "#d3869b", soft: "#504945" },
      bg: "#282828",
      bgAlt: "#1d2021",
      bgElv: "#32302f",
      text: { 1: "#ebdbb2", 2: "#d5c4a1", 3: "#a89984" },
      button: {
        brand: { bg: "#fe8019", border: "#fe8019", text: "#282828", hoverBg: "#fb4934", hoverBorder: "#fb4934", hoverText: "#282828", activeBg: "#cc372b", activeBorder: "#cc372b", activeText: "#282828" },
        alt: { bg: "#3c3836", text: "#ebdbb2", hoverBg: "#504945", hoverText: "#ebdbb2" }
      },
      customBlock: {
        info: { bg: "#282828", border: "#83a598", text: "#83a598", textDeep: "#b8c8b8" },
        tip: { bg: "#282828", border: "#b8bb26", text: "#b8bb26", textDeep: "#d4d66a" },
        warning: { bg: "#282828", border: "#fabd2f", text: "#fabd2f", textDeep: "#fcd97a" },
        danger: { bg: "#282828", border: "#fb4934", text: "#fb4934", textDeep: "#ff8a82" }
      },
      selection: { bg: "#fe8019" },
      home: { heroNameColor: "#fe8019", heroNameBackground: "#fe8019", heroImageBackground: "linear-gradient(-45deg, #fe8019 50%, #fb4934 50%)", heroImageFilter: "blur(44px)" }
    },
    amoled: {
      brand: { 1: "#fe8019", 2: "#fb4934", 3: "#d3869b", soft: "#1d2021" },
      bg: "#000000",
      bgAlt: "#1d2021",
      bgElv: "#282828",
      text: { 1: "#ebdbb2", 2: "#d5c4a1", 3: "#a89984" },
      button: {
        brand: { bg: "#fe8019", border: "#fe8019", text: "#000000", hoverBg: "#fb4934", hoverBorder: "#fb4934", hoverText: "#000000", activeBg: "#cc372b", activeBorder: "#cc372b", activeText: "#000000" },
        alt: { bg: "#32302f", text: "#ebdbb2", hoverBg: "#504945", hoverText: "#ebdbb2" }
      },
      customBlock: {
        info: { bg: "#000000", border: "#83a598", text: "#83a598", textDeep: "#b8c8b8" },
        tip: { bg: "#000000", border: "#b8bb26", text: "#b8bb26", textDeep: "#d4d66a" },
        warning: { bg: "#000000", border: "#fabd2f", text: "#fabd2f", textDeep: "#fcd97a" },
        danger: { bg: "#000000", border: "#fb4934", text: "#fb4934", textDeep: "#ff8a82" }
      },
      selection: { bg: "#fe8019" },
      home: { heroNameColor: "#fe8019", heroNameBackground: "#fe8019", heroImageBackground: "linear-gradient(-45deg, #fe8019 50%, #fb4934 50%)", heroImageFilter: "blur(44px)" }
    }
  },

  /* ── Tokyo Night ── */
  tokyo: {
    displayName: "Tokyo Night",
    light: {
      brand: { 1: "#8c4351", 2: "#965027", 3: "#7aa2f7", soft: "#d5d6db" },
      bg: "#d5d6db",
      bgAlt: "#cbccd1",
      bgElv: "#d5d6db",
      text: { 1: "#343b58", 2: "#565f89", 3: "#9699a3" },
      button: {
        brand: { bg: "#8c4351", border: "#8c4351", text: "#ffffff", hoverBg: "#965027", hoverBorder: "#965027", hoverText: "#ffffff", activeBg: "#6e3440", activeBorder: "#6e3440", activeText: "#ffffff" },
        alt: { bg: "#9699a3", text: "#343b58", hoverBg: "#7a7d8c", hoverText: "#343b58" }
      },
      customBlock: {
        info: { bg: "#e8f4f8", border: "#0b5fd6", text: "#0b5fd6", textDeep: "#0a4a9e" },
        tip: { bg: "#e8f8e8", border: "#1e8449", text: "#1e8449", textDeep: "#145a32" },
        warning: { bg: "#fff8e1", border: "#d4a017", text: "#92630a", textDeep: "#5c3d06" },
        danger: { bg: "#fdecea", border: "#e0241b", text: "#b01a13", textDeep: "#8c1510" }
      },
      selection: { bg: "#7aa2f7" },
      home: { heroNameColor: "#7aa2f7", heroNameBackground: "#7aa2f7", heroImageBackground: "linear-gradient(-45deg, #7aa2f7 50%, #bb9af7 50%)", heroImageFilter: "blur(44px)" }
    },
    dark: {
      brand: { 1: "#7aa2f7", 2: "#bb9af7", 3: "#565f89", soft: "#24283b" },
      bg: "#1a1b26",
      bgAlt: "#16161e",
      bgElv: "#24283b",
      text: { 1: "#c0caf5", 2: "#a9b1d6", 3: "#565f89" },
      button: {
        brand: { bg: "#7aa2f7", border: "#7aa2f7", text: "#1a1b26", hoverBg: "#bb9af7", hoverBorder: "#bb9af7", hoverText: "#1a1b26", activeBg: "#5a82d7", activeBorder: "#5a82d7", activeText: "#1a1b26" },
        alt: { bg: "#24283b", text: "#c0caf5", hoverBg: "#2f3550", hoverText: "#c0caf5" }
      },
      customBlock: {
        info: { bg: "#1a1b26", border: "#7aa2f7", text: "#7aa2f7", textDeep: "#a8c4fa" },
        tip: { bg: "#1a1b26", border: "#9ece6a", text: "#9ece6a", textDeep: "#c0e09a" },
        warning: { bg: "#1a1b26", border: "#e0af68", text: "#e0af68", textDeep: "#f0d098" },
        danger: { bg: "#1a1b26", border: "#f7768e", text: "#f7768e", textDeep: "#faabb8" }
      },
      selection: { bg: "#7aa2f7" },
      home: { heroNameColor: "#7aa2f7", heroNameBackground: "#7aa2f7", heroImageBackground: "linear-gradient(-45deg, #7aa2f7 50%, #bb9af7 50%)", heroImageFilter: "blur(44px)" }
    },
    amoled: {
      brand: { 1: "#7aa2f7", 2: "#bb9af7", 3: "#565f89", soft: "#16161e" },
      bg: "#000000",
      bgAlt: "#16161e",
      bgElv: "#1a1b26",
      text: { 1: "#c0caf5", 2: "#a9b1d6", 3: "#565f89" },
      button: {
        brand: { bg: "#7aa2f7", border: "#7aa2f7", text: "#000000", hoverBg: "#bb9af7", hoverBorder: "#bb9af7", hoverText: "#000000", activeBg: "#5a82d7", activeBorder: "#5a82d7", activeText: "#000000" },
        alt: { bg: "#24283b", text: "#c0caf5", hoverBg: "#2f3550", hoverText: "#c0caf5" }
      },
      customBlock: {
        info: { bg: "#000000", border: "#7aa2f7", text: "#7aa2f7", textDeep: "#a8c4fa" },
        tip: { bg: "#000000", border: "#9ece6a", text: "#9ece6a", textDeep: "#c0e09a" },
        warning: { bg: "#000000", border: "#e0af68", text: "#e0af68", textDeep: "#f0d098" },
        danger: { bg: "#000000", border: "#f7768e", text: "#f7768e", textDeep: "#faabb8" }
      },
      selection: { bg: "#7aa2f7" },
      home: { heroNameColor: "#7aa2f7", heroNameBackground: "#7aa2f7", heroImageBackground: "linear-gradient(-45deg, #7aa2f7 50%, #bb9af7 50%)", heroImageFilter: "blur(44px)" }
    }
  },

  /* ── Nord ── */
  nord: {
    displayName: "Nord",
    light: {
      brand: { 1: "#88C0D0", 2: "#BF616A", 3: "#5E81AC", soft: "#E5E9F0" },
      bg: "#ECEFF4",
      bgAlt: "#E5E9F0",
      bgElv: "#D8DEE9",
      text: { 1: "#2E3440", 2: "#3B4252", 3: "#4C566A" },
      button: {
        brand: { bg: "#88C0D0", border: "#88C0D0", text: "#2E3440", hoverBg: "#5E81AC", hoverBorder: "#5E81AC", hoverText: "#ffffff", activeBg: "#4C6A7A", activeBorder: "#4C6A7A", activeText: "#ffffff" },
        alt: { bg: "#D8DEE9", text: "#2E3440", hoverBg: "#C8CED8", hoverText: "#2E3440" }
      },
      customBlock: {
        info: { bg: "#E5E9F0", border: "#5E81AC", text: "#5E81AC", textDeep: "#3B4252" },
        tip: { bg: "#E5E9F0", border: "#A3BE8C", text: "#A3BE8C", textDeep: "#6A8E5A" },
        warning: { bg: "#E5E9F0", border: "#EBCB8B", text: "#D08770", textDeep: "#B48EAD" },
        danger: { bg: "#E5E9F0", border: "#BF616A", text: "#BF616A", textDeep: "#8C4A50" }
      },
      selection: { bg: "#88C0D0" },
      home: { heroNameColor: "#88C0D0", heroNameBackground: "#88C0D0", heroImageBackground: "linear-gradient(-45deg, #88C0D0 50%, #BF616A 50%)", heroImageFilter: "blur(44px)" }
    },
    dark: {
      brand: { 1: "#88C0D0", 2: "#BF616A", 3: "#5E81AC", soft: "#3B4252" },
      bg: "#2E3440",
      bgAlt: "#3B4252",
      bgElv: "#434C5E",
      text: { 1: "#ECEFF4", 2: "#D8DEE9", 3: "#7B88A1" },
      button: {
        brand: { bg: "#88C0D0", border: "#88C0D0", text: "#2E3440", hoverBg: "#5E81AC", hoverBorder: "#5E81AC", hoverText: "#ffffff", activeBg: "#4C6A7A", activeBorder: "#4C6A7A", activeText: "#ffffff" },
        alt: { bg: "#434C5E", text: "#ECEFF4", hoverBg: "#4C566A", hoverText: "#ECEFF4" }
      },
      customBlock: {
        info: { bg: "#2E3440", border: "#88C0D0", text: "#88C0D0", textDeep: "#b0d8e8" },
        tip: { bg: "#2E3440", border: "#A3BE8C", text: "#A3BE8C", textDeep: "#c8dcc8" },
        warning: { bg: "#2E3440", border: "#EBCB8B", text: "#EBCB8B", textDeep: "#f0dcc0" },
        danger: { bg: "#2E3440", border: "#BF616A", text: "#BF616A", textDeep: "#d8a0a5" }
      },
      selection: { bg: "#88C0D0" },
      home: { heroNameColor: "#88C0D0", heroNameBackground: "#88C0D0", heroImageBackground: "linear-gradient(-45deg, #88C0D0 50%, #BF616A 50%)", heroImageFilter: "blur(44px)" }
    },
    amoled: {
      brand: { 1: "#88C0D0", 2: "#BF616A", 3: "#5E81AC", soft: "#2E3440" },
      bg: "#000000",
      bgAlt: "#2E3440",
      bgElv: "#3B4252",
      text: { 1: "#ECEFF4", 2: "#D8DEE9", 3: "#7B88A1" },
      button: {
        brand: { bg: "#88C0D0", border: "#88C0D0", text: "#000000", hoverBg: "#5E81AC", hoverBorder: "#5E81AC", hoverText: "#ffffff", activeBg: "#4C6A7A", activeBorder: "#4C6A7A", activeText: "#ffffff" },
        alt: { bg: "#434C5E", text: "#ECEFF4", hoverBg: "#4C566A", hoverText: "#ECEFF4" }
      },
      customBlock: {
        info: { bg: "#000000", border: "#88C0D0", text: "#88C0D0", textDeep: "#b0d8e8" },
        tip: { bg: "#000000", border: "#A3BE8C", text: "#A3BE8C", textDeep: "#c8dcc8" },
        warning: { bg: "#000000", border: "#EBCB8B", text: "#EBCB8B", textDeep: "#f0dcc0" },
        danger: { bg: "#000000", border: "#BF616A", text: "#BF616A", textDeep: "#d8a0a5" }
      },
      selection: { bg: "#88C0D0" },
      home: { heroNameColor: "#88C0D0", heroNameBackground: "#88C0D0", heroImageBackground: "linear-gradient(-45deg, #88C0D0 50%, #BF616A 50%)", heroImageFilter: "blur(44px)" }
    }
  },

  /* ── Solarized ── */
  solarized: {
    displayName: "Solarized",
    light: {
      brand: { 1: "#268bd2", 2: "#dc322f", 3: "#859900", soft: "#eee8d5" },
      bg: "#fdf6e3",
      bgAlt: "#eee8d5",
      bgElv: "#eee8d5",
      text: { 1: "#073642", 2: "#586e75", 3: "#93a1a1" },
      button: {
        brand: { bg: "#268bd2", border: "#268bd2", text: "#ffffff", hoverBg: "#1a6fb0", hoverBorder: "#1a6fb0", hoverText: "#ffffff", activeBg: "#145a8c", activeBorder: "#145a8c", activeText: "#ffffff" },
        alt: { bg: "#eee8d5", text: "#073642", hoverBg: "#d5c4a1", hoverText: "#073642" }
      },
      customBlock: {
        info: { bg: "#e8f4f8", border: "#268bd2", text: "#268bd2", textDeep: "#1a6fb0" },
        tip: { bg: "#e8f8e8", border: "#859900", text: "#859900", textDeep: "#657000" },
        warning: { bg: "#fff8e1", border: "#b58900", text: "#b58900", textDeep: "#8a6a00" },
        danger: { bg: "#fdecea", border: "#dc322f", text: "#dc322f", textDeep: "#b02826" }
      },
      selection: { bg: "#268bd2" },
      home: { heroNameColor: "#268bd2", heroNameBackground: "#268bd2", heroImageBackground: "linear-gradient(-45deg, #268bd2 50%, #dc322f 50%)", heroImageFilter: "blur(44px)" }
    },
    dark: {
      brand: { 1: "#268bd2", 2: "#dc322f", 3: "#859900", soft: "#073642" },
      bg: "#002b36",
      bgAlt: "#073642",
      bgElv: "#073642",
      text: { 1: "#fdf6e3", 2: "#93a1a1", 3: "#657b83" },
      button: {
        brand: { bg: "#268bd2", border: "#268bd2", text: "#002b36", hoverBg: "#1a6fb0", hoverBorder: "#1a6fb0", hoverText: "#002b36", activeBg: "#145a8c", activeBorder: "#145a8c", activeText: "#002b36" },
        alt: { bg: "#073642", text: "#fdf6e3", hoverBg: "#0a4a5c", hoverText: "#fdf6e3" }
      },
      customBlock: {
        info: { bg: "#002b36", border: "#268bd2", text: "#268bd2", textDeep: "#5a9fd6" },
        tip: { bg: "#002b36", border: "#859900", text: "#859900", textDeep: "#a5c000" },
        warning: { bg: "#002b36", border: "#b58900", text: "#b58900", textDeep: "#d4a017" },
        danger: { bg: "#002b36", border: "#dc322f", text: "#dc322f", textDeep: "#ff6b6b" }
      },
      selection: { bg: "#268bd2" },
      home: { heroNameColor: "#268bd2", heroNameBackground: "#268bd2", heroImageBackground: "linear-gradient(-45deg, #268bd2 50%, #dc322f 50%)", heroImageFilter: "blur(44px)" }
    },
    amoled: {
      brand: { 1: "#268bd2", 2: "#dc322f", 3: "#859900", soft: "#073642" },
      bg: "#000000",
      bgAlt: "#073642",
      bgElv: "#002b36",
      text: { 1: "#fdf6e3", 2: "#93a1a1", 3: "#657b83" },
      button: {
        brand: { bg: "#268bd2", border: "#268bd2", text: "#000000", hoverBg: "#1a6fb0", hoverBorder: "#1a6fb0", hoverText: "#000000", activeBg: "#145a8c", activeBorder: "#145a8c", activeText: "#000000" },
        alt: { bg: "#073642", text: "#fdf6e3", hoverBg: "#0a4a5c", hoverText: "#fdf6e3" }
      },
      customBlock: {
        info: { bg: "#000000", border: "#268bd2", text: "#268bd2", textDeep: "#5a9fd6" },
        tip: { bg: "#000000", border: "#859900", text: "#859900", textDeep: "#a5c000" },
        warning: { bg: "#000000", border: "#b58900", text: "#b58900", textDeep: "#d4a017" },
        danger: { bg: "#000000", border: "#dc322f", text: "#dc322f", textDeep: "#ff6b6b" }
      },
      selection: { bg: "#268bd2" },
      home: { heroNameColor: "#268bd2", heroNameBackground: "#268bd2", heroImageBackground: "linear-gradient(-45deg, #268bd2 50%, #dc322f 50%)", heroImageFilter: "blur(44px)" }
    }
  }
};
