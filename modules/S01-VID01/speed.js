/* Playback speed: a small menu in the control bar. The choice is remembered on this device. */
(function () {
  var vid = document.getElementById('vid');
  var sel = document.getElementById('speedSel');
  if (!vid || !sel) { return; }
  var KEY = 'mc1-video-speed-v2';   /* 0.75x is this video's normal speed */
  function apply(r) { vid.playbackRate = r; vid.defaultPlaybackRate = r; }
  try { var saved = localStorage.getItem(KEY); if (saved && sel.querySelector('option[value="' + saved + '"]')) { sel.value = saved; } } catch (e) {}
  apply(parseFloat(sel.value));
  sel.addEventListener('change', function () {
    apply(parseFloat(sel.value));
    try { localStorage.setItem(KEY, sel.value); } catch (e) {}
  });
  /* some browsers reset the rate when the video reloads its data */
  vid.addEventListener('loadedmetadata', function () { apply(parseFloat(sel.value)); });
  vid.addEventListener('play', function () { if (vid.playbackRate !== parseFloat(sel.value)) { apply(parseFloat(sel.value)); } });
})();
