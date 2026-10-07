/* ==========================================================================
   Course glue, loaded last by every module in modules/<CODE>/.
   1. Close: a "Close" pill in the header returns to the course page,
      opened on the section this module belongs to.
   2. Next lock: Next (and dots / arrow keys) cannot move on while the
      visible screen still has a task left — an activity not finished, a
      box not filled in, a question not answered. Pressing a locked Next
      points at what is left instead of moving on.
   Builds on saa-kit.js (data-required kits, data-saa-locked) and extends
   it to every kit and every answer box on the screen.
   ========================================================================== */
(function (win, doc) {
  'use strict';
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }

  var m = location.pathname.match(/modules\/(S\d+)-/);
  var HOME = '../../index.html' + (m ? '#' + m[1] : '');
  function goHome() { location.href = HOME; }
  win.SAA_HOME = goHome;
  win.SAA_TODO = function () { return todo(); };

  /* ---------- styles ---------- */
  var css = doc.createElement('style');
  css.textContent =
    '.course-close{display:inline-flex;align-items:center;gap:8px;margin-left:auto;padding:9px 16px;min-height:38px;' +
    'border-radius:999px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.14);color:#AEB6D4;' +
    'font:600 12px/1 "Instrument Sans",system-ui,sans-serif;cursor:pointer;flex:0 0 auto;position:relative;z-index:5}' +
    '.course-close:hover{color:#F6F4EF;border-color:rgba(255,255,255,0.3)}' +
    '.course-close svg{width:13px;height:13px}' +
    '.saa-vo + .course-close-hd{margin-left:10px}' +
    '.course-close-float{position:fixed;top:14px;right:14px;z-index:10001;margin:0;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);background:rgba(8,13,36,0.6)}' +
    '.course-locked{opacity:.45!important;filter:saturate(.4);box-shadow:none!important;cursor:not-allowed!important}' +
    '.course-todo{outline:2px solid #FFC168!important;outline-offset:3px;transition:outline-color .3s}' +
    '@keyframes course-shake{0%,100%{transform:none}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}' +
    '.course-shake{animation:course-shake .3s ease 2}';
  doc.head.appendChild(css);

  /* ---------- 1. Close ---------- */
  function closeBtn(cls) {
    var b = doc.createElement('button');
    b.type = 'button'; b.className = 'course-close ' + cls; b.setAttribute('aria-label', 'Close and go back to the course');
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>Close';
    b.addEventListener('click', goHome);
    return b;
  }
  /* keeps Close as the last item of the header (other scripts add buttons there later),
     and floats a second one over the start screen while it is showing */
  function addClose() {
    /* a module that already has its own Close: point it at the course page */
    var own = doc.querySelector('header [data-close], header .ghost-pill, header .saa-ghost-pill, #topbar [data-close]');
    if (own) {
      if (!own.hasAttribute('data-course-home')) {
        own.setAttribute('data-course-home', '');
        own.addEventListener('click', function (e) { e.preventDefault(); e.stopImmediatePropagation(); goHome(); }, true);
      }
      return;
    }
    var h = null;
    ['.saa-header', 'header.top', 'header.bar', '.top > .narr', 'header.masthead', '.app > header', 'body > header'].some(function (s) { h = doc.querySelector(s); return h; });
    var b = doc.querySelector('.course-close-hd');
    if (h && h.offsetParent !== null) {
      if (!b) {
        b = closeBtn('course-close-hd');
        if (getComputedStyle(h).display.indexOf('flex') === -1) { h.style.display = 'flex'; h.style.alignItems = 'center'; }
      }
      if (h.lastElementChild !== b) { h.appendChild(b); }
    } else if (!b) {
      doc.body.appendChild(closeBtn('course-close-hd course-close-float'));
    }
    var start = doc.querySelector('.saa-start, #start.start');
    var f = doc.querySelector('.course-close-start');
    var cs = start && getComputedStyle(start);
    var showing = !!start && !/\b(gone|hide|hidden|done)\b/.test(start.className) && cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.1;
    if (showing && !f) { f = closeBtn('course-close-start course-close-float'); doc.body.appendChild(f); }
    if (f) { f.style.display = showing ? '' : 'none'; }
  }

  /* ---------- 2. Next lock ---------- */
  var NAV = '[data-next], #primary, #deck-next, #navNext, #nav-next, #nextBtn, #next-btn, #next, .btn-next, .nav-btn.primary, .nav-circle.primary, footer .btn-primary, .foot .btn-primary';
  var JUMP = '.deck-dots, .page-dots, .seg-bar, .segs, .fpe-dots, .progress, .deck-progress, .footer-progress, .journey, [data-goto]';
  /* boxes that are never "the task": chat composers, search, anything marked optional */
  var SKIP = '[readonly], [disabled], [data-optional], [type=search], .composer *, .chat-input, .saa-header *, header *, .modal:not(.open) *, [aria-hidden=true] *';

  function vis(e) {
    if (!e || e.offsetParent === null) { return false; }
    var r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2) { return false; }
    for (var n = e; n && n !== doc.body; n = n.parentElement) {
      var cs = getComputedStyle(n);
      if (cs.visibility === 'hidden' || cs.opacity === '0' || n.getAttribute('aria-hidden') === 'true' || n.hasAttribute('inert')) { return false; }
    }
    return true;
  }
  function isNav(e) { return e.matches && e.matches(NAV); }

  /* what is still to do on the visible screen (first item, or null) */
  function todo() {
    var kit = $$('.saa-kit:not(.is-done):not([data-optional]), [data-saa-locked]').filter(vis)[0];
    if (kit) { return kit; }
    var box = $$('textarea, input[type=text], input:not([type])').filter(function (f) {
      return !f.matches(SKIP) && !f.value.trim() && vis(f);
    })[0];
    if (box) { return box; }
    var seen = {};
    var radio = $$('input[type=radio]').filter(function (r) {
      if (!r.name || seen[r.name] || r.matches(SKIP) || !vis(r.closest('label') || r)) { return false; }
      seen[r.name] = 1;
      return !$$('input[type=radio]').some(function (x) { return x.name === r.name && x.checked; });
    })[0];
    if (radio) { return radio.closest('fieldset, .options, [role=radiogroup]') || radio.closest('label') || radio; }
    var sel = $$('select').filter(function (s) { return !s.matches(SKIP) && !s.value && vis(s); })[0];
    return sel || null;
  }

  function paint() {
    var left = !!todo();
    $$(NAV).forEach(function (b) {
      if (b.classList.contains('course-locked') === left) { return; }
      b.classList.toggle('course-locked', left);
      if (left) { b.setAttribute('aria-disabled', 'true'); b.title = 'Finish this step to continue'; }
      else { if (!b.disabled) { b.removeAttribute('aria-disabled'); } b.removeAttribute('title'); }
    });
  }

  function point(t) {
    t.classList.remove('course-shake'); void t.offsetWidth;
    t.classList.add('course-shake', 'course-todo');
    setTimeout(function () { t.classList.remove('course-shake', 'course-todo'); }, 1800);
    try { t.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {}
    if (t.matches('textarea, input, select')) { try { t.focus({ preventScroll: true }); } catch (e) { t.focus(); } }
  }

  /* runs before the module's own handlers (window, capture phase) */
  win.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest(NAV + ',' + JUMP);
    if (!b || !vis(b)) { return; }
    var t = todo(); if (!t) { return; }
    if (!isNav(b)) {
      /* a dot / step: going back is fine, only block clicks that would move forward */
      var items = $$('button, [role=tab], a, li, span', b.closest(JUMP));
      var cur = items.filter(function (x) { return /\b(active|current|on|is-active|is-current)\b/.test(x.className) || x.getAttribute('aria-current') || x.getAttribute('aria-selected') === 'true'; })[0];
      var target = e.target.closest('button, [role=tab], a, li, span');
      if (cur && target && items.indexOf(target) !== -1 && items.indexOf(target) <= items.indexOf(cur)) { return; }
    }
    e.preventDefault(); e.stopImmediatePropagation();
    point(t);
  }, true);

  win.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'PageDown') { return; }
    var a = doc.activeElement;
    if (a && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.getAttribute('role') === 'slider')) { return; }
    if (todo()) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);

  ['input', 'change', 'click', 'saa:done'].forEach(function (ev) {
    doc.addEventListener(ev, function () { setTimeout(paint, 0); }, true);
  });
  setInterval(function () { paint(); addClose(); }, 400);

  function init() { addClose(); paint(); }
  if (doc.readyState === 'loading') { doc.addEventListener('DOMContentLoaded', init); } else { init(); }
})(window, document);
