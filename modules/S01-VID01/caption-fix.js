/* ==========================================================================
   Caption fix — the video's subtitles are burned in and misspell Sameer as
   "Samira" (once) and "Samir" (four times). On those frames this paints over
   the name and redraws "Sameer" in the caption's own font and colours.

   Positions and frame ranges were measured from video.mp4 (1920x1080, 30fps).
   If the video is re-exported, these numbers must be re-measured.

   The patch only draws the video into a canvas (never reads pixels back), so
   it also works when index.html is opened straight from disk.
   ========================================================================== */

(function(){
  var FPS = 30;
  var FONT_PX = 69;                 /* Lora 69px matches the caption type */
  var CAP_H = 51;                   /* cap height of that type, in video px */
  var WHITE = '#FFFFFF';
  var MINT = 'rgb(103,231,200)';    /* the karaoke highlight colour */

  /* x/y = top-left of the wrong name's ink, w = its ink width (video px).
     frames = inclusive range the wrong name is on screen.
     mint   = inclusive range the name is highlighted.
     fade   = per-frame text opacity from `frames[0]` while the caption fades in. */
  var PATCHES = [
    { x: 278,  y: 880, w: 218, frames: [1286, 1344], mint: [1286, 1293],
      fade: [.02,.05,.10,.14,.19,.23,.27,.33,.38,.44,.50,.55,.60,.65,.70,.75,.80,.85,.91,.95] },
    { x: 1103, y: 880, w: 183, frames: [1628, 1688], mint: [1670, 1680] },
    { x: 318,  y: 880, w: 183, frames: [2028, 2079], mint: [2028, 2031] },
    { x: 327,  y: 912, w: 183, frames: [2202, 2262], mint: [2203, 2213] },
    { x: 563,  y: 880, w: 183, frames: [2354, 2427], mint: [2364, 2375] }
  ];

  var vid = document.getElementById('vid');
  var canvas = document.getElementById('capfix');
  var ctx = canvas.getContext('2d');
  var shown = null;

  function patchFor(frame){
    for (var i = 0; i < PATCHES.length; i++) {
      var p = PATCHES[i];
      if (frame >= p.frames[0] && frame <= p.frames[1]) return p;
    }
    return null;
  }

  function draw(p, frame){
    var pad = 11;
    var x0 = p.x - pad, x1 = p.x + p.w + pad;
    var y0 = p.y - 14, y1 = p.y + CAP_H + 12;
    var w = x1 - x0, h = y1 - y0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* 1. erase the name: stretch the caption background just left and just
          right of the word across it, cross-fading between the two */
    ctx.drawImage(vid, x0 - 3, y0, 3, h, x0, y0, w, h);
    var grad = ctx.createLinearGradient(x0, 0, x1, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,1)');
    var tmp = draw.tmp || (draw.tmp = document.createElement('canvas'));
    tmp.width = w; tmp.height = h;
    var t = tmp.getContext('2d');
    t.drawImage(vid, x1, y0, 3, h, 0, 0, w, h);
    t.globalCompositeOperation = 'destination-in';
    t.fillStyle = grad;
    t.translate(-x0, 0);
    t.fillRect(x0, 0, w, h);
    ctx.drawImage(tmp, x0, y0);

    /* 2. write "Sameer", tightened to fit where the old name was */
    var i = frame - p.frames[0];
    var alpha = p.fade && i < p.fade.length ? p.fade[i] : 1;
    var mint = frame >= p.mint[0] && frame <= p.mint[1];

    ctx.save();
    ctx.font = FONT_PX + 'px Lora, Georgia, serif';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '-2px';
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'center';
    ctx.globalAlpha = alpha;
    ctx.fillStyle = mint ? MINT : WHITE;
    var natural = ctx.measureText('Sameer').width;
    var scale = Math.min(1, (p.w + 8) / natural);
    ctx.translate(p.x + p.w / 2, p.y + CAP_H);
    ctx.scale(scale, 1);
    ctx.fillText('Sameer', 0, 0);
    ctx.restore();
  }

  function render(mediaTime){
    var frame = Math.floor(mediaTime * FPS + 0.01);
    var p = patchFor(frame);
    if (p) {
      draw(p, frame);
      shown = p;
    } else if (shown) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shown = null;
    }
  }

  /* frame-accurate where supported, otherwise every animation frame */
  if ('requestVideoFrameCallback' in vid) {
    var onFrame = function(now, meta){
      render(meta.mediaTime);
      vid.requestVideoFrameCallback(onFrame);
    };
    vid.requestVideoFrameCallback(onFrame);
  } else {
    var loop = function(){
      render(vid.currentTime);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
  vid.addEventListener('seeking', function(){ ctx.clearRect(0, 0, canvas.width, canvas.height); shown = null; });
  vid.addEventListener('seeked', function(){ render(vid.currentTime); });

  /* redraw once the caption font arrives, so the first patch isn't in the fallback */
  if (document.fonts && document.fonts.load) {
    document.fonts.load(FONT_PX + 'px Lora').then(function(){ shown = null; render(vid.currentTime); });
  }
})();
