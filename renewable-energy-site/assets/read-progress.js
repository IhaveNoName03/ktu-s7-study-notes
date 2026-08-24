
/* ===========================================================================
   read-progress.js — per-device "mark as read" tracking
   ---------------------------------------------------------------------------
   Adds a small toggle at the end of every module page, and shows a tick on the
   subject index for pages already marked. Purely local (localStorage) — there
   is no backend, so progress does NOT sync between your laptop and phone.

   Key is scoped per subject folder so the four subjects never collide.
   =========================================================================== */
(function () {
  "use strict";

  var KEY = "s7-read";

  function subject() {
    var parts = location.pathname.split("/").filter(Boolean);
    /* .../<subject-folder>/<page>.html  -> the folder */
    return parts.length >= 2 ? parts[parts.length - 2] : "root";
  }
  function page() {
    var f = location.pathname.split("/").pop() || "index.html";
    return f.replace(/\.html$/, "");
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
    catch (e) { return {}; }
  }
  function save(o) {
    try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
  }

  function isRead(subj, pg) {
    var d = load();
    return !!(d[subj] && d[subj][pg]);
  }
  function setRead(subj, pg, on) {
    var d = load();
    if (!d[subj]) d[subj] = {};
    if (on) d[subj][pg] = 1; else delete d[subj][pg];
    if (!Object.keys(d[subj]).length) delete d[subj];
    save(d);
  }

  /* ── Module page: a toggle after the content ──────────────────────────── */
  function mountToggle() {
    var wrap = document.querySelector(".wrap");
    if (!wrap) return;
    var pg = page();
    if (pg === "index") return;                 // handled by the index below

    var subj = subject();
    var bar = document.createElement("div");
    bar.className = "readmark";

    function paint() {
      var on = isRead(subj, pg);
      bar.innerHTML =
        '<button type="button" class="readmark-btn' + (on ? " on" : "") + '"' +
        ' aria-pressed="' + (on ? "true" : "false") + '">' +
        '<span class="readmark-box" aria-hidden="true">' + (on ? "\u2713" : "") + "</span>" +
        (on ? "Marked as revised" : "Mark as revised") +
        "</button>";
      bar.querySelector("button").addEventListener("click", function () {
        setRead(subj, pg, !isRead(subj, pg));
        paint();
      });
    }
    paint();

    /* .pagenav is not always a DIRECT child of .wrap (2 pages nest it), and
       insertBefore throws if the reference node has a different parent. Insert
       relative to the nav's own parent, or just append. */
    var nav = wrap.querySelector(".pagenav");
    if (nav && nav.parentNode) nav.parentNode.insertBefore(bar, nav);
    else wrap.appendChild(bar);
  }

  /* ── Subject index: tick the cards already read, plus a count ─────────── */
  function mountIndex() {
    if (page() !== "index") return;
    var cards = document.querySelectorAll(".mcard[href]");
    if (!cards.length) return;

    var subj = subject();
    var done = 0, total = 0;

    cards.forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("#")[0];
      if (!/\.html$/.test(href)) return;
      var pg = href.replace(/\.html$/, "");
      if (pg === "index") return;
      total++;
      if (isRead(subj, pg)) {
        done++;
        a.classList.add("is-read");
        if (!a.querySelector(".readtick")) {
          var t = document.createElement("span");
          t.className = "readtick";
          t.setAttribute("aria-label", "revised");
          t.textContent = "\u2713";
          a.appendChild(t);
        }
      }
    });

    if (!total) return;
    /* Subject index pages use .masthead (not .hero); fall back through the
       plausible hosts so the count lands somewhere sensible on every layout. */
    var host = document.querySelector(".hero .meta-row")
            || document.querySelector(".masthead .meta-row")
            || document.querySelector(".masthead")
            || document.querySelector(".hero");
    if (!host) return;
    var chip = document.createElement("span");
    chip.className = "chip readcount";
    chip.textContent = done + " of " + total + " revised";
    host.appendChild(chip);
  }

  function init() { mountToggle(); mountIndex(); }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
