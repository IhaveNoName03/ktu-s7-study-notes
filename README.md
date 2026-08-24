# KTU S7 Study Notes — Offline Textbook

> ### 🤖 This entire project is AI-generated. Vibecoded, start to finish.
>
> Every line of code and every page of study content was written by an AI agent from the
> student's own source material. **No human wrote this code. No human proofread every
> equation.**
>
> - Treat it as a **revision aid**, never as an authority.
> - Anything exam-critical — a formula, a numeric answer, a statutory clause, a date —
>   **check it against the official KTU syllabus, your textbook, or your lecturer.**
> - AI produces fluent, confident, plausible-sounding errors. This project has already
>   produced several; see [Content trust & limitations](#content-trust--limitations).
> - Not an official KTU publication. The student who gathered the sources is not the
>   author and is not responsible for errors.

A **self-contained, offline study textbook** for the four Semester 7 subjects of the
**Kerala Technological University (KTU)** B.Tech programme. Static HTML/CSS/JS only —
no backend, no build step, no network calls, no dependencies. Works from a USB stick,
a phone bookmark, or GitHub Pages, online or offline.

**Live:** https://ihavenoname03.github.io/ktu-s7-study-notes/

---

## Subjects

| # | Subject | KTU Code | Folder | Pages | Questions |
|---|---------|----------|--------|-------|-----------|
| 1 | Ethical Hacking | **CCT 401** | `ethical-hacking-site/` | 11 | 50 |
| 2 | Renewable Energy Systems | **EET 435** | `renewable-energy-site/` | 10 | 26 |
| 3 | Industrial Safety Engineering | **MCN 401** | `industrial-safety-site/` | 8 | 23 |
| 4 | Machine Learning | **CST 413** | `machine-learning-site/` | 12 | 53 |

**4 subjects · 20 modules · 41 content pages · 152 answered questions · 0 external
dependencies.**

Each subject follows the same shape: a subject index, module pages (`m1-1` … `m5-2`),
an exam-technique page (`m-t1`), a question bank (`papers.html`), and its own `assets/`.

---

## Features

| | |
|---|---|
| **Offline** | Service worker precaches all 46 pages — works with no signal, not just from a local folder |
| **Themes** | 6 palettes × light / dark / AMOLED, animated radial switch, persists across every page |
| **Search** | One box over 261 sections in all 41 pages, deep-linked and highlighted |
| **Maths** | 55 equation blocks in true KaTeX display style |
| **Mobile** | Verified 375–768 px, zero overflow; installable to the home screen |
| **Print** | Dedicated stylesheet — chrome stripped, answers expanded, no mid-equation breaks |
| **Revision** | Mark pages as revised; per-subject tick and count (per-device, no sync) |

**No dependencies, no network calls.** No CDN, no remote fonts, no analytics, no
telemetry. KaTeX is vendored locally. Double-click `index.html` and it runs off the disk.

**Themes.** Swiss Red, Catppuccin, Gruvbox, Tokyo Night, Nord, Solarized — each in
light / dark / AMOLED, from one dropdown. The choice follows you across pages *and*
subjects, persisted through a three-tier store (`localStorage` + cookie + a URL-fragment
bridge) because Chrome isolates storage per file on `file://`. Applied before first
paint, so there is no flash of the wrong colour. The radial switch animation uses the
View Transitions API: Chromium-only, and it falls back to an instant switch elsewhere
and for `prefers-reduced-motion`.

**Layout.** Each section keeps its number, title and label in a sticky left rail while
the prose holds a full-width measure beside it; the rail doubles as a position marker as
you scroll. Header, nav and footer are identical across all 41 content pages — verified
by comparing computed geometry, not by eye.

**Question banks.** Live filtering with expandable "Show answer" panels, laid out as
label/content rows that stack on a phone.

**Cross-subject search** needs to be *served* (GitHub Pages, or `python3 -m
http.server`). Opened by double-clicking a file, the browser blocks the index fetch and
only the four subject cards are filtered.

---

## How to use

**Laptop** — double-click `index.html`, pick a subject.
**Phone** — open the GitHub Pages link and bookmark it; tap **Menu** for full navigation.
**Revision** — open a subject's `papers.html`, search, then tap **Show answer**.
**Themes** — use the dropdown at the top right; your pick sticks until you change it.

---

## Repository structure

```
s7/
├── index.html                  # hub: links to all four subjects, with search
├── README.md
├── sw.js                       # service worker: full offline caching
├── manifest.json               # installable web app (icons, name, shortcuts)
├── favicon.svg                 # tab icon
├── icon-192.png / icon-512.png # home-screen / app icons
├── search-index.json           # generated: 261 sections for cross-subject search
├── build_search_index.py       # regenerates search-index.json
├── _validate.py                # dev: HTML well-formedness + dead-link checker
├── assets/                     # shared theme + read-progress scripts
│
├── ethical-hacking-site/       # CCT 401
├── renewable-energy-site/      # EET 435
├── industrial-safety-site/     # MCN 401
└── machine-learning-site/      # CST 413
```

Each subject folder is **fully self-contained** — its own `assets/styles.css`,
`layout.css`, `app.js`, theme scripts and vendored KaTeX. Shared code is duplicated per
folder on purpose, so a single subject can be copied onto a USB stick and still work.

---

## Where the content came from

The student supplied everything: KTU syllabus PDFs, clean and handwritten class notes,
past papers (one arrived as a WhatsApp photo), and owned textbooks. Clean PDFs were read
with PyMuPDF; handwritten scans were rendered to PNG and read with a vision model. The
AI then wrote every page from that material, mapped to the official KTU module list.

Verification was automated rather than eyeballed: headless-browser sweeps for contrast,
overflow, duplicate IDs, dead links and JS exceptions across every page × 18 theme/mode
combinations, plus vision checks on rendered screenshots.

---

## Content trust & limitations

**Read this before relying on any page.**

- **Handwritten-scan transcriptions are the weakest link.** Vision OCR misreads symbols
  and digits. Re-derive any numeric result before trusting it.
- **Fluent, confident errors are the characteristic AI failure** — and this project has
  already produced them. The clearest case: the Ethical Hacking index advertised a
  *"Module 5 — Cryptography & Tracking"* with ciphers, RSA, AES, hashing and PKI. The
  actual source PDF is titled *"Covering tracks and hiding"* and contains **zero**
  mentions of any of those; cryptography is not a module in CCT 401 at all. The AI had
  confidently described content it never wrote. Assume more such errors remain.
- **Other bugs automation caught that a read-through missed:** white slabs in dark mode
  from surfaces filled with the *light* ink colour, four "Show answer" buttons that
  silently did nothing, and every equation rendering in cramped inline style.
- **"Mark as revised" is per-device.** There is no backend, so progress does not sync
  between your laptop and your phone, and clearing site data resets it.
- **Syllabus drift.** Matches the S7 version supplied; a KTU revision could date a page.
- **Fonts** are local-only with system fallbacks, so the exact typeface varies by device.
- **The animated theme reveal is Chromium-only.** Firefox and Safari switch instantly.

---

## Dev / maintenance

```bash
# Validate every page: well-formed tags + no dead links
python3 _validate.py

# Rebuild the cross-subject search index (run after editing content)
python3 build_search_index.py

# Preview locally
python3 -m http.server 8000     # then open http://localhost:8000/
```

Nothing to install, nothing to compile. Edit the HTML and reload.

**Remember when deploying:**
- Bump `VERSION` in `sw.js`, or returning visitors keep serving the old cached bundle.
- Re-run `build_search_index.py` after content edits, or search results go stale.
- If you add a page, add it to the `PAGES` map in `sw.js` too, or it will not be
  precached for offline use.

---

## License & disclaimer

Personal study aid, provided **as-is, without warranty of any kind**. Content derives
from third-party syllabi, notes and textbooks; respective copyrights remain with their
owners. Generated by an AI agent — the student who compiled the sources is **not** the
author of these pages and is not liable for their accuracy.
