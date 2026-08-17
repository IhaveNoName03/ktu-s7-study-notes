# KTU S7 Study Notes

An offline, self-contained study textbook for four KTU (S7) subjects:

| Subject | Code | Folder |
|---|---|---|
| Ethical Hacking | CCT 401 | `ethical-hacking-site/` |
| Renewable Energy Systems | EET 435 | `renewable-energy-site/` |
| Industrial Safety Engineering | MCN 401 | `industrial-safety-site/` |
| Machine Learning | CST 413 | `machine-learning-site/` |

Each subject is a complete mini-site: module pages, an exam-techniques page, and a question bank —
all in Swiss typographic style, no external dependencies (no CDN), works fully offline.

## How to use

- **On a laptop:** double-click `index.html` (this file) — it opens the interactive landing page that links to every subject.
- **On a phone:** this repo is served by GitHub Pages — open the published URL and bookmark it.

## Structure

```
index.html                      interactive landing page (all subjects)
ethical-hacking-site/           self-contained subject site
renewable-energy-site/
industrial-safety-site/
machine-learning-site/
```

Each subject folder has its own `assets/styles.css` and `assets/app.js` (shared style), so the
sites are fully portable.

> Built as a personal study companion. Content is transcribed from KTU class notes and syllabi.
