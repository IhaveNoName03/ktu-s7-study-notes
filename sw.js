/* ===========================================================================
   sw.js — offline service worker for the KTU S7 study notes
   ---------------------------------------------------------------------------
   WHY: "works offline" was only true for the local folder. Served from GitHub
   Pages, every visit needed the network, so the site was useless on a phone
   with no signal. This caches the whole site on first visit.

   STRATEGY
     HTML  → network-first, fall back to cache.  Always get fresh content when
             online; still readable when offline.
     ASSET → cache-first (css/js/fonts are versioned by CACHE name, so a bump
             of VERSION invalidates everything at once).

   Bump VERSION on every deploy or clients keep the old bundle forever.
   =========================================================================== */

const VERSION = "s7-v3";
const CORE = VERSION + "-core";

/* Everything needed to read any page with no network.
   Only the 4 KaTeX woff2 faces the pages actually request are precached;
   the other 56 font files load on demand and are cached opportunistically. */
const SUBJECTS = [
  "ethical-hacking-site",
  "renewable-energy-site",
  "industrial-safety-site",
  "machine-learning-site"
];

const PAGES = {
  "ethical-hacking-site":
    ["index", "m-t1", "m1-1", "m1-2", "m1-3", "m2-1", "m2-2", "m2-3", "m3-1", "m4-1", "m5-1", "papers"],
  "renewable-energy-site":
    ["index", "m-t1", "m1-1", "m1-2", "m1-3", "m2-1", "m2-2", "m3-1", "m4-1", "m5-1", "papers"],
  "industrial-safety-site":
    ["index", "m-t1", "m1-1", "m2-1", "m3-1", "m3-2", "m4-1", "m5-1", "papers"],
  "machine-learning-site":
    ["index", "m-t1", "m1-1", "m1-2", "m2-1", "m2-2", "m3-1", "m3-2", "m4-1", "m4-2", "m5-1", "m5-2", "papers"]
};

const FONTS = [
  "KaTeX_Main-Regular.woff2",
  "KaTeX_Math-Italic.woff2",
  "KaTeX_Size1-Regular.woff2",
  "KaTeX_Size2-Regular.woff2"
];

function buildList() {
  const out = ["./", "./index.html", "./manifest.json", "./favicon.svg",
               "./icon-192.png", "./icon-512.png", "./search-index.json",
               "./assets/theme-config.js",
               "./assets/theme-handler.js", "./assets/theme-bridge.js"];
  for (const s of SUBJECTS) {
    for (const p of PAGES[s]) out.push(`./${s}/${p}.html`);
    out.push(`./${s}/assets/styles.css`);
    out.push(`./${s}/assets/layout.css`);
    out.push(`./${s}/assets/app.js`);
    out.push(`./${s}/assets/read-progress.js`);
    out.push(`./${s}/assets/theme-config.js`);
    out.push(`./${s}/assets/theme-handler.js`);
    out.push(`./${s}/assets/theme-bridge.js`);
    out.push(`./${s}/assets/vendor/katex/dist/katex.min.css`);
    out.push(`./${s}/assets/vendor/katex/dist/katex.min.js`);
    out.push(`./${s}/assets/vendor/katex/dist/contrib/auto-render.min.js`);
    for (const f of FONTS) out.push(`./${s}/assets/vendor/katex/dist/fonts/${f}`);
  }
  return out;
}

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CORE);
    /* addAll() rejects the whole batch if ONE request 404s, which would leave
       the site with no cache at all. Add individually and tolerate misses. */
    await Promise.all(buildList().map((u) =>
      cache.add(new Request(u, { cache: "reload" })).catch(() => {})
    ));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CORE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // never touch third parties

  const isDoc = req.mode === "navigate" ||
                (req.headers.get("accept") || "").includes("text/html");

  if (isDoc) {
    /* network-first: fresh when online, cached copy when not */
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CORE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (err) {
        const hit = await caches.match(req, { ignoreSearch: true });
        return hit || caches.match("./index.html");
      }
    })());
    return;
  }

  /* assets: cache-first, then fill the cache on a miss */
  e.respondWith((async () => {
    const hit = await caches.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.status === 200 && fresh.type === "basic") {
        const cache = await caches.open(CORE);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (err) {
      return new Response("", { status: 504, statusText: "offline" });
    }
  })());
});
