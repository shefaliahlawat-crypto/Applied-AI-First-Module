/* ==========================================================================
   Volume control for the video modules (modules/*-VID*). Loaded by each
   video's index.html; adds a speaker button to the control bar.

   A <video> cannot play louder than volume 1, so the sound is routed through
   the Web Audio API: video → gain → limiter (stops loud parts
   from crackling) → speakers. Each video is first brought up to a normal
   speaking level (data-boost), then the learner can set 0–200% on top; the
   choice is remembered on this device.

   Web Audio only works for media from the same origin as the page; opened
   straight from disk (file://) it would play silence, so there it falls back
   to the normal 0–100% volume.
   ========================================================================== */
(function (win, doc) {
  'use strict';
  var vid = doc.getElementById('vid');
  var bar = doc.querySelector('.controls');
  if (!vid || !bar) { return; }

  var AC = win.AudioContext || win.webkitAudioContext;
  var CAN_BOOST = !!AC && /^https?:$/.test(location.protocol);
  var MAX = CAN_BOOST ? 200 : 100;
  var STEP = 10;
  var DEFAULT = 100;
  /* each video's index.html sets data-boost on <video>: the gain that brings its
     speech up to a normal level (measured: about -19 dB RMS). 100% = that level. */
  var BASE = CAN_BOOST ? (parseFloat(vid.getAttribute('data-boost')) || 1) : 1;
  var KEY = 'mc1-video-volume-v2';

  var level = DEFAULT;
  try { var saved = parseInt(localStorage.getItem(KEY), 10); if (saved >= 0 && saved <= MAX) { level = saved; } } catch (e) {}
  var lastHeard = level || DEFAULT;   /* what unmute goes back to */

  /* ---------- audio graph (built on the first play: browsers need a tap first) ---------- */
  var ctx = null, gain = null;
  function boost() {
    if (!CAN_BOOST) { return; }
    if (!ctx) {
      try {
        ctx = new AC();
        var src = ctx.createMediaElementSource(vid);
        gain = ctx.createGain();
        var comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -6; comp.knee.value = 4; comp.ratio.value = 12;
        comp.attack.value = 0.002; comp.release.value = 0.2;
        src.connect(gain); gain.connect(comp); comp.connect(ctx.destination);
      } catch (e) { ctx = null; gain = null; CAN_BOOST = false; MAX = 100; level = Math.min(level, 100); render(); }
    }
    if (ctx && ctx.state === 'suspended') { ctx.resume(); }
    apply();
  }

  function apply() {
    if (gain) {
      vid.volume = 1;
      gain.gain.setTargetAtTime(BASE * level / 100, ctx.currentTime, 0.02);
    } else {
      vid.volume = Math.min(level, 100) / 100;
    }
    vid.muted = level === 0;
  }

  /* ---------- UI ---------- */
  var ICON_ON = '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none"/><path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a7.5 7.5 0 0 1 0 11"/>';
  var ICON_LOW = '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none"/><path d="M15.5 9a4 4 0 0 1 0 6"/>';
  var ICON_OFF = '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>';

  var wrap = doc.createElement('div');
  wrap.className = 'vol';
  wrap.innerHTML =
    '<button type="button" class="vol-btn" aria-haspopup="true" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"></svg>' +
      '<span class="vol-pct"></span>' +
    '</button>' +
    '<div class="vol-pop" hidden role="group" aria-label="Volume">' +
      '<button type="button" class="vol-step" data-d="-1" aria-label="Quieter">−</button>' +
      '<input type="range" class="vol-range" min="0" step="' + STEP + '" aria-label="Volume">' +
      '<button type="button" class="vol-step" data-d="1" aria-label="Louder">+</button>' +
      '<button type="button" class="vol-mute"></button>' +
    '</div>';

  /* sit just before the speed menu (or at the end of the bar) */
  var anchor = bar.querySelector('#ccBtn') || bar.querySelector('.speed');
  bar.insertBefore(wrap, anchor || null);

  var btn = wrap.querySelector('.vol-btn');
  var svg = btn.querySelector('svg');
  var pct = btn.querySelector('.vol-pct');
  var pop = wrap.querySelector('.vol-pop');
  var range = wrap.querySelector('.vol-range');
  var muteBtn = wrap.querySelector('.vol-mute');

  function render() {
    range.max = MAX;
    range.value = level;
    range.style.setProperty('--fill', (level / MAX * 100) + '%');
    range.setAttribute('aria-valuetext', level + '%');
    svg.innerHTML = level === 0 ? ICON_OFF : (level <= 60 ? ICON_LOW : ICON_ON);
    pct.textContent = level + '%';
    btn.setAttribute('aria-label', 'Volume ' + level + '%. Tap to change');
    btn.classList.toggle('is-boost', level > 100);
    muteBtn.textContent = level === 0 ? 'Sound on' : 'Mute';
    wrap.querySelectorAll('.vol-step').forEach(function (b) {
      b.disabled = b.getAttribute('data-d') === '1' ? level >= MAX : level <= 0;
    });
  }

  function set(v) {
    level = Math.max(0, Math.min(MAX, Math.round(v / STEP) * STEP));
    if (level > 0) { lastHeard = level; }
    try { localStorage.setItem(KEY, String(level)); } catch (e) {}
    render();
    boost();
  }

  function open(on) {
    pop.hidden = !on;
    btn.setAttribute('aria-expanded', String(on));
  }

  btn.addEventListener('click', function () { open(pop.hidden); boost(); });
  range.addEventListener('input', function () { set(+range.value); });
  wrap.querySelectorAll('.vol-step').forEach(function (b) {
    b.addEventListener('click', function () { set(level + STEP * +b.getAttribute('data-d')); });
  });
  muteBtn.addEventListener('click', function () { set(level === 0 ? lastHeard : 0); });
  doc.addEventListener('click', function (e) { if (!wrap.contains(e.target)) { open(false); } });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { open(false); btn.focus(); } });

  vid.addEventListener('play', boost);
  render();
  apply();

  /* ---------- styles (same tokens as the player's control bar) ---------- */
  var css = doc.createElement('style');
  css.textContent =
    '.vol{position:relative;flex:0 0 auto;display:inline-flex}' +
    '.vol-btn{display:inline-flex;align-items:center;gap:6px;min-height:34px;padding:6px 11px 6px 9px;border-radius:999px;cursor:pointer;' +
      'font:600 12.5px var(--font,system-ui);color:var(--text,#DCE1F2);background:rgba(255,255,255,0.06);border:1px solid var(--line-2,rgba(255,255,255,.14))}' +
    '.vol-btn svg{width:18px;height:18px;flex:0 0 auto}' +
    '.vol-btn.is-boost{color:#241300;background:linear-gradient(135deg,var(--amber-2,#FFC168),var(--amber,#F3AB31));border-color:transparent}' +
    '.vol-btn:hover{border-color:var(--blue-line,rgba(91,118,255,.35))}' +
    '.vol-pct{font-variant-numeric:tabular-nums;min-width:3.2ch;text-align:right}' +
    '.vol-pop{position:absolute;right:0;bottom:calc(100% + 10px);z-index:30;display:flex;align-items:center;gap:8px;padding:10px 12px;' +
      'background:#121D55;border:1px solid var(--line-2,rgba(255,255,255,.14));border-radius:14px;box-shadow:0 18px 40px rgba(0,0,0,.45)}' +
    '.vol-pop[hidden]{display:none}' +
    '.vol-step{width:34px;height:34px;flex:0 0 auto;border-radius:50%;cursor:pointer;font:700 18px/1 var(--font,system-ui);color:var(--ivory,#F6F4EF);' +
      'background:rgba(255,255,255,0.06);border:1px solid var(--line-2,rgba(255,255,255,.14));padding:0}' +
    '.vol-step:disabled{opacity:.35;cursor:not-allowed}' +
    '.vol-range{-webkit-appearance:none;appearance:none;width:150px;height:6px;border-radius:3px;cursor:pointer;margin:0;' +
      'background:linear-gradient(90deg,var(--amber,#F3AB31) var(--fill,75%),rgba(255,255,255,0.16) var(--fill,75%))}' +
    '.vol-range::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#fff;border:0;box-shadow:0 1px 4px rgba(0,0,0,.4)}' +
    '.vol-range::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#fff;border:0;box-shadow:0 1px 4px rgba(0,0,0,.4)}' +
    '.vol-mute{flex:0 0 auto;min-height:34px;padding:6px 12px;border-radius:999px;cursor:pointer;font:600 12px var(--font,system-ui);' +
      'color:var(--muted,#AEB6D4);background:none;border:1px solid var(--line-2,rgba(255,255,255,.14));white-space:nowrap}' +
    '.vol-btn:focus-visible,.vol-step:focus-visible,.vol-range:focus-visible,.vol-mute:focus-visible{outline:2px solid var(--amber-2,#FFC168);outline-offset:2px}' +
    '@media (max-width:560px){.vol-pct{display:none}.vol-btn{padding:6px 8px}.vol-range{width:110px}.vol-mute{display:none}}';
  doc.head.appendChild(css);
})(window, document);
