/* Captions on/off: the CC button in the control bar shows or hides the English captions
   (captions.vtt). On by default; the choice is remembered on this device. */
(function () {
  var vid = document.getElementById('vid');
  var btn = document.getElementById('ccBtn');
  if (!vid || !btn || !vid.textTracks || !vid.textTracks.length) { if (btn) { btn.hidden = true; } return; }
  var KEY = 'mc1-video-captions';
  var on = true;
  try { on = localStorage.getItem(KEY) !== 'off'; } catch (e) {}
  function apply() {
    for (var i = 0; i < vid.textTracks.length; i++) { vid.textTracks[i].mode = on ? 'showing' : 'hidden'; }
    btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', on ? 'Captions on. Tap to turn off' : 'Captions off. Tap to turn on');
    btn.classList.toggle('is-on', on);
  }
  btn.addEventListener('click', function () {
    on = !on; apply();
    try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (e) {}
  });
  /* the track loads after the page; set its mode again once it is ready */
  vid.addEventListener('loadedmetadata', apply);
  var tr = vid.querySelector('track'); if (tr) { tr.addEventListener('load', apply); }
  apply();
})();
