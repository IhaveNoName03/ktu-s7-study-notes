# KTU S7 Study Notes — Offline Textbook

> ### 🤖 This entire project is AI-generated. Vibecoded, start to finish.
>
> Every line of HTML, CSS and JavaScript here was written by an AI agent. So was every
> page of study content — derived from the student's own source material (syllabus PDFs,
> class notes, handwritten scans, past papers, owned textbooks), but **written by a
> machine, not by a human subject expert.**
>
> No human wrote this code. No human proofread every equation. The layout, the six
> colour themes, the animations, the question banks, the derivations — all of it came
> out of prompt-and-iterate sessions with an LLM.
>
> **What that means for you:**
> - Treat it as a **revision aid**, never as an authority.
> - AI produces confident, well-formatted, plausible-sounding errors. This document is
>   not exempt.
> - Anything exam-critical — a formula, a numeric answer, a statutory clause, a date —
>   **check against the official KTU syllabus, your textbook, or your lecturer.**
> - Highest-risk content is anything transcribed from handwritten scans by a vision
>   model, and any worked numeric result.
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

**Works completely offline.** No CDN, no remote fonts, no analytics, no telemetry.
Double-click `index.html` and it runs. KaTeX is vendored locally for maths.

**Six themes × three modes.** Swiss Red, Catppuccin, Gruvbox, Tokyo Night, Nord and
Solarized, each in light / dark / **AMOLED** (true black). Chosen from one dropdown in
the header.

**Theme choice follows you everywhere** — across pages and across all four subjects.
Persisted through a three-tier store (`localStorage` + cookie + a URL-fragment bridge),
which is what makes it survive `file://` browsing, where Chrome isolates storage per
file. Applied *before first paint*, so there is no flash of the wrong colour.

**Animated theme switching.** A radial reveal built on the View Transitions API — the
palette changes *as* the circle expands from the button, not before it. Chromium-only;
elsewhere it falls back to an instant switch, as it does for `prefers-reduced-motion`.

**Editorial rail layout.** Each section carries its number, title and label in a sticky
left rail while the prose keeps a full-width measure beside it — the rail doubles as a
live position marker as you scroll.

**Identical furniture on every page.** Header, navigation and footer are the same across
all 41 content pages (verified by comparing computed geometry, not by eye).

**Searchable question banks.** Live filtering plus expandable "Show answer" panels, with
answers laid out as label/content rows that stack on a phone.

**Real display maths.** All 55 equation blocks render in KaTeX display style — full-size
stacked fractions, sums and products with limits above and below.

**Phone-first, not phone-tolerated.** Verified across five viewports from 375 px to
768 px: zero horizontal overflow, the rail collapses to an inline heading, wide tables
and formulas scroll inside their own block.

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
├── index-alt.html              # experimental alternate hub (not live)
├── README.md
├── _validate.py                # dev: HTML well-formedness + dead-link checker
├── assets/                     # shared theme scripts for the hub
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

## How it was built

1. **Sources gathered** by the student — KTU syllabus PDFs, clean and handwritten class
   notes, past papers (one arrived as a WhatsApp photo), and owned textbooks.
2. **Text extracted** — clean PDFs with PyMuPDF; handwritten scans rendered to PNG and
   read with a vision model.
3. **Content written by the AI agent**, mapped to the official KTU module list and
   grounded strictly in the supplied material.
4. **Iterated by conversation.** The design went through several rejected directions —
   neomorphism, a bento grid, a full-width stack — before settling on the editorial rail.
   Much of the work was fixing what earlier passes got wrong.
5. **Verified by automation, not by vibes.** Headless browser sweeps for contrast,
   overflow, duplicate IDs, dead links, JS exceptions and theme correctness across every
   page × 18 theme/mode combinations, plus vision checks on rendered screenshots.

That verification caught real bugs an eyeball pass had missed: white slabs in dark mode
from surfaces filled with the *light* ink colour, four answer buttons that silently did
nothing because a panel shared its `id` with its wrapper, equations rendering in cramped
inline style, a theme setting that never persisted on `file://`, and — notably — an index
card advertising a **cryptography module that does not exist in CCT 401**.

That last one is the clearest illustration of why the warning at the top of this file
matters: the AI confidently described content it had never written.

---

## Content trust & limitations

- **Handwritten-scan transcriptions are the weakest link.** Vision OCR misreads symbols
  and digits. Re-derive any numeric result before trusting it.
- **AI authorship means fluent, confident errors are possible** — and have already been
  found and fixed here. Assume more remain.
- **Syllabus drift.** Matches the S7 version supplied; a KTU revision could date a page.
- **Fonts** are local-only with system fallbacks, so the exact typeface varies by device.
- **The animated theme reveal is Chromium-only.** Firefox and Safari switch instantly.

---

## Dev / maintenance

```bash
# Validate every page: well-formed tags + no dead links
python3 _validate.py

# Preview locally
python3 -m http.server 8000     # then open http://localhost:8000/
```

Nothing to install, nothing to compile. Edit the HTML and reload.

---

## License & disclaimer

Personal study aid, provided **as-is, without warranty of any kind**. Content derives
from third-party syllabi, notes and textbooks; respective copyrights remain with their
owners. Generated by an AI agent — the student who compiled the sources is **not** the
author of these pages and is not liable for their accuracy.
