# KTU S7 Study Notes — Offline Textbook

> **⚠️ AI-ASSISTED CONTENT — VERIFY BEFORE AN EXAM.**
> Every page here was produced by an AI agent from the student's collected source
> material (PDFs, past papers, handwritten scans, two reference textbooks). Treat it
> as study aid, **not** as an official KTU publication. Check anything exam-critical
> against the official syllabus and your own class notes. The student is not the
> author and is not responsible for errors.

A **self-contained, offline study textbook** for the four Semester 7 (S7) subjects of
the **Kerala Technological University (KTU)** B.Tech programme. Static HTML/CSS/JS only —
no backend, no build step, no network calls. Works from a USB stick, a phone bookmark,
or GitHub Pages, online or offline.

---

## Subjects

| # | Subject | KTU Code | Folder | Pages |
|---|---------|----------|--------|-------|
| 1 | Ethical Hacking | **CCT 401** | `ethical-hacking-site/` | 12 |
| 2 | Renewable Energy Systems | **EET 435** | `renewable-energy-site/` | 11 |
| 3 | Industrial Safety Engineering | **MCN 401** | `industrial-safety-site/` | 8 |
| 4 | Machine Learning | **CST 413** | `machine-learning-site/` | 13 |

- **4 subjects · 20 modules · ~44 HTML pages · 0 external dependencies.**

---

## Features

- **Works offline.** No CDN, no web fonts pulled over the network, no analytics.
  Double-click `index.html` and it runs.
- **Swiss-style design.** Dark hero, light reading body, a single red accent. Clean,
  text-forward, low decoration (per the student's explicit preference).
- **Light / Dark mode.** Toggle in the top bar. Choice is saved (cookie + `localStorage`)
  and **persists across every page and all four subjects** until you switch back. Applied
  *before first paint*, so there is no white flash on load.
- **Consistent navigation.** Every page in a subject shares the same nav (generated from a
  single source of truth in `app.js`), so the menu always shows the right items with the
  current page highlighted.
- **Equal desktop & mobile.** The header nav is a pill bar on desktop and a first-class
  dropdown menu on mobile — same items, same weight, not a lesser version.
- **Searchable question banks.** Each subject's `papers.html` has a live search box and
  expandable "Show answer" buttons. Answers render as compact two-column
  **label | content** cards for phone readability.
- **Responsive + accessible.** Mobile-friendly layouts, visible keyboard focus, and
  `prefers-reduced-motion` respected.

---

## How to use

**On a laptop**
- Double-click `index.html` to open the hub, then click a subject card.
- Each page has in-page navigation; the header jumps between modules.

**On a phone**
- Open the GitHub Pages URL (bookmark it) and browse like any site.
- Tap **Menu** (top-right) to open the full nav dropdown.

**Finding answers fast**
- Open a subject's `papers.html`, type in the search box, and tap **Show answer**.
- Questions are grouped by source (past papers, internals, unit-wise).

**Turning on dark mode**
- Click the **Light/Dark** toggle in the header. It stays on everywhere until you toggle
  it back. To reset if it ever gets stuck: clear the site cookie / `localStorage`
  (`theme` key) and reload.

---

## Repository structure

```
s7/
├── index.html              # live hub: Swiss-style landing, links to all 4 subjects
├── index-alt.html          # experimental alternate hub design (not the live one)
├── README.md               # this file
├── _validate.py            # dev tool: HTML well-formedness + dead-link checker
│
├── ethical-hacking-site/   # CCT 401  (index, m1-1…m5-1, m-t1, papers, assets/)
├── renewable-energy-site/  # EET 435  (same shape)
├── industrial-safety-site/ # MCN 401  (same shape)
└── machine-learning-site/  # CST 413  (index, m1-1…m5-2, m-t1, papers, assets/)
```

Each subject folder is **fully self-contained** (its own `assets/`), so you can copy a
single subject onto a USB stick and it works alone. Shared CSS/JS is duplicated per folder
on purpose, for portability.

---

## How it was built

1. **Sources gathered** — KTU syllabus PDFs, class notes (clean + handwritten scans),
   past-question papers (some as a WhatsApp photo), and two textbooks
   (Alpaydın *Introduction to ML*, Mitchell *Machine Learning*).
2. **Text extracted** — clean PDFs via PyMuPDF; handwritten scans rendered to PNG and
   read with a vision model, then transcribed by hand (this is why ML pages contain real
   worked examples despite illegible sources).
3. **Syllabus-mapped & deepened** — module pages follow the official KTU topic list;
   textbooks added rigorous derivations (SVM dual, kernel trick, PCA eigen-decomposition,
   bias–variance, Bayesian estimation).
4. **Styled & validated** — shared `assets/styles.css` + `assets/app.js` per site; a
   custom HTML-parser validator (`_validate.py`) checks well-formed tags and dead links;
   pages rendered headless at desktop + phone widths to confirm no overflow.
5. **Published** — committed and pushed to GitHub Pages. No token was ever written into
   the repo.

---

## Content trust & limitations

- **Highest risk: handwritten-scan transcriptions.** Vision OCR of handwriting can
  misread symbols/numbers — re-check any worked value before relying on it.
- **AI authorship** means confident-but-wrong statements are possible. This is study
  material, not a substitute for the textbook or lectures.
- **Syllabus drift.** Matches the S7 (2026) version supplied; a future KTU revision could
  leave a page partly out of date.
- **Fonts** are offline/local-only and fall back to system fonts (no CDN) — the design
  holds, but the exact typeface varies per device.

---

## Dev / maintenance

```bash
# Validate all pages (well-formed tags + no dead links)
python3 _validate.py

# Preview locally
python3 -m http.server 8000     # then open http://localhost:8000/
```

`index-alt.html` is an alternate hub design kept for reference; the live hub is
`index.html`.

## License & disclaimer

Personal study aid, provided **as-is, without warranty**. Content derives from
third-party syllabi, notes, and textbooks; respective copyrights remain with their
owners. The student who compiled the sources is **not** the author of these pages and is
not liable for their accuracy.
