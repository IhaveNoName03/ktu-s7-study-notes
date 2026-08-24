#!/usr/bin/env python3
"""build_search_index.py — generate search-index.json for cross-subject search.

Walks every module / papers page, pulls the section headings and a short text
snippet, and writes one JSON file the hub loads to search ALL 41 pages at once.

Run after editing content:   python3 build_search_index.py
"""
import os, re, json, html

BASE = os.path.dirname(os.path.abspath(__file__))
SUBJECTS = {
    "ethical-hacking-site":     ("Ethical Hacking",              "CCT 401"),
    "renewable-energy-site":    ("Renewable Energy Systems",     "EET 435"),
    "industrial-safety-site":   ("Industrial Safety Engineering","MCN 401"),
    "machine-learning-site":    ("Machine Learning",             "CST 413"),
}

def strip(markup: str) -> str:
    """markup -> plain text"""
    markup = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', ' ', markup, flags=re.S | re.I)
    markup = re.sub(r'<[^>]+>', ' ', markup)
    txt = html.unescape(markup)
    return re.sub(r'\s+', ' ', txt).strip()

records = []
for folder, (subject, code) in SUBJECTS.items():
    d = os.path.join(BASE, folder)
    for fn in sorted(os.listdir(d)):
        if not fn.endswith(".html") or fn == "index.html":
            continue
        src = open(os.path.join(d, fn), encoding="utf-8").read()

        h1 = re.search(r'<h1[^>]*>(.*?)</h1>', src, re.S)
        page_title = strip(h1.group(1)) if h1 else fn
        kicker = re.search(r'class="kicker"[^>]*>(.*?)</', src, re.S)
        module = strip(kicker.group(1)) if kicker else ""

        # one record per section so a hit can deep-link to the heading
        sections = re.findall(r'<div class="section".*?</div>\s*(?=<div class="section"|$)',
                              src, re.S)
        heads = re.findall(r'<div class="head">(.*?)</div>', src, re.S)
        body_txt = strip(src)

        entries = []
        for hm in re.finditer(r'<h2[^>]*>(.*?)</h2>', src, re.S):
            title = strip(hm.group(1))
            if not title:
                continue
            after = strip(src[hm.end():hm.end() + 900])
            entries.append((title, after[:260]))

        if not entries:
            entries = [(page_title, body_txt[:260])]

        for title, snippet in entries:
            records.append({
                "s": subject,          # subject name
                "c": code,             # KTU code
                "u": f"{folder}/{fn}", # url
                "p": page_title,       # page heading
                "m": module,           # module kicker
                "t": title,            # section heading
                "x": snippet,          # snippet
            })

out = os.path.join(BASE, "search-index.json")
with open(out, "w", encoding="utf-8") as fh:
    json.dump(records, fh, ensure_ascii=False, separators=(",", ":"))

size = os.path.getsize(out)
print(f"{len(records)} records -> search-index.json ({size/1024:.0f} KB)")
by = {}
for r in records:
    by[r["s"]] = by.get(r["s"], 0) + 1
for k, v in by.items():
    print(f"   {k}: {v}")
