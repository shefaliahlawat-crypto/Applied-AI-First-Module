/* ==========================================================================
   Interactive video — pauses at set timestamps to show a multiple-choice
   checkpoint. The learner retries until correct, then continues watching.
   Seeking past an unanswered checkpoint stops at that checkpoint.
   ========================================================================== */

(function(){
  var CHECKPOINTS = [
    {
      time: 90,
      title: 'Spot an added fact',
      question: 'Sameer notices that AI has added a detail that was not in the company report. What should he do?',
      options: [
        'Keep it if it sounds believable',
        'Check the original source and remove or correct it',
        'Ask AI to make the sentence more professional',
        'Use it because AI generated it confidently'
      ],
      correct: 1,
      retry: 'Not quite. A detail that sounds confident is not proof that it is true. Try again.',
      feedback: 'Correct. If AI adds a fact that is not in the source, do not assume it is true. Check the source, then correct or remove the detail.'
    },
    {
      time: 138,
      title: 'Before you use it',
      question: 'Before using an AI answer, what should you check?',
      options: [
        'Only spelling',
        'Only whether it sounds professional',
        'Important facts against the source',
        'Nothing if AI sounds confident'
      ],
      correct: 2,
      retry: 'Not quite. Think about what the video said to check, then try again.',
      feedback: 'Correct. AI can help with wording and organisation, but important facts still need to be checked against the source.'
    }
  ];
  var LETTERS = ['A', 'B', 'C', 'D'];

  var vid = document.getElementById('vid');
  var bigPlay = document.getElementById('bigPlay');
  var quiz = document.getElementById('quiz');
  var quizKicker = document.getElementById('quizKicker');
  var quizTime = document.getElementById('quizTime');
  var quizQ = document.getElementById('quizQ');
  var quizOpts = document.getElementById('quizOpts');
  var quizResult = document.getElementById('quizResult');
  var quizRetry = document.getElementById('quizRetry');
  var quizContinue = document.getElementById('quizContinue');
  var playBtn = document.getElementById('playBtn');
  var scrub = document.getElementById('scrub');
  var scrubTrack = document.getElementById('scrubTrack');
  var scrubFill = document.getElementById('scrubFill');
  var timeLabel = document.getElementById('timeLabel');
  var cpList = document.getElementById('cpList');

  var active = null;

  function fmt(s){
    s = Math.max(0, Math.floor(s || 0));
    var m = Math.floor(s / 60);
    var r = s % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  /* checkpoint markers on the scrub bar + cards below the player */
  CHECKPOINTS.forEach(function(cp, i){
    cp.done = false;
    cp.mark = document.createElement('span');
    cp.mark.className = 'mark';
    scrubTrack.appendChild(cp.mark);

    cp.card = document.createElement('div');
    cp.card.className = 'cp';
    cp.card.innerHTML = '<span class="num">' + (i + 1) + '</span><div><b></b><span class="when"></span></div>';
    cp.card.querySelector('b').textContent = cp.title;
    cp.card.querySelector('.when').textContent = 'Pauses at ' + fmt(cp.time);
    cpList.appendChild(cp.card);
  });

  function nextOpen(){
    for (var i = 0; i < CHECKPOINTS.length; i++) {
      if (!CHECKPOINTS[i].done) return CHECKPOINTS[i];
    }
    return null;
  }

  vid.addEventListener('loadedmetadata', function(){
    var dur = vid.duration || 0;
    CHECKPOINTS.forEach(function(cp){
      if (dur > 0) cp.mark.style.left = Math.min(cp.time / dur * 100, 100) + '%';
    });
    timeLabel.textContent = fmt(0) + ' / ' + fmt(dur);
  });

  function toggle(){
    if (active) return;
    if (vid.paused) { vid.play(); } else { vid.pause(); }
  }
  playBtn.addEventListener('click', toggle);
  bigPlay.addEventListener('click', toggle);
  vid.addEventListener('click', toggle);

  vid.addEventListener('play', function(){
    playBtn.classList.add('is-playing');
    playBtn.setAttribute('aria-label', 'Pause');
    bigPlay.hidden = true;
  });
  vid.addEventListener('pause', function(){
    playBtn.classList.remove('is-playing');
    playBtn.setAttribute('aria-label', 'Play');
    if (!active) bigPlay.hidden = false;
  });
  vid.addEventListener('ended', function(){ bigPlay.hidden = false; if (window.SAA_DONE) window.SAA_DONE(); });

  vid.addEventListener('timeupdate', function(){
    var dur = vid.duration || 0;
    if (dur > 0) scrubFill.style.width = (vid.currentTime / dur * 100) + '%';
    timeLabel.textContent = fmt(vid.currentTime) + ' / ' + fmt(dur);

    var cp = nextOpen();
    if (cp && !active && vid.currentTime >= cp.time) {
      vid.pause();
      vid.currentTime = cp.time;
      openQuiz(cp);
    }
  });

  /* click to seek; can't skip past a checkpoint that hasn't been answered */
  scrub.addEventListener('click', function(e){
    if (active || !vid.duration) return;
    var rect = scrubTrack.getBoundingClientRect();
    var t = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * vid.duration;
    var cp = nextOpen();
    if (cp && t > cp.time) t = cp.time;
    vid.currentTime = t;
  });

  function openQuiz(cp){
    active = cp;
    var n = CHECKPOINTS.indexOf(cp) + 1;
    quizKicker.textContent = 'Checkpoint ' + n + ' of ' + CHECKPOINTS.length;
    quizTime.textContent = fmt(cp.time);
    quizQ.textContent = cp.question;
    renderOptions(cp);
    bigPlay.hidden = true;
    quiz.hidden = false;
    var first = quizOpts.querySelector('.opt');
    if (first) first.focus();
  }

  function renderOptions(cp){
    quizResult.textContent = '';
    quizResult.className = 'feedback';
    quizRetry.hidden = true;
    quizContinue.disabled = true;
    quizOpts.innerHTML = '';

    cp.options.forEach(function(label, idx){
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt';
      btn.innerHTML = '<span class="letter">' + LETTERS[idx] + '</span><span class="label"></span>';
      btn.querySelector('.label').textContent = label;
      btn.addEventListener('click', function(){ answer(cp, idx); });
      li.appendChild(btn);
      quizOpts.appendChild(li);
    });
  }

  function answer(cp, idx){
    var buttons = quizOpts.querySelectorAll('.opt');
    Array.prototype.forEach.call(buttons, function(b, i){
      b.disabled = true;
      if (i !== idx && i !== cp.correct) b.classList.add('is-dim');
    });

    if (idx === cp.correct) {
      buttons[idx].classList.add('is-correct');
      quizResult.textContent = cp.feedback;
      quizResult.className = 'feedback ok';
      quizContinue.disabled = false;
      quizContinue.focus();
      cp.done = true;
      cp.mark.classList.add('is-done');
      cp.card.classList.add('is-done');
    } else {
      buttons[idx].classList.add('is-wrong');
      Array.prototype.forEach.call(buttons, function(b, i){
        if (i !== idx) b.classList.add('is-dim');
      });
      quizResult.textContent = cp.retry;
      quizResult.className = 'feedback bad';
      quizRetry.hidden = false;
      quizRetry.focus();
    }
  }

  quizRetry.addEventListener('click', function(){
    renderOptions(active);
    var first = quizOpts.querySelector('.opt');
    if (first) first.focus();
  });

  quizContinue.addEventListener('click', function(){
    quiz.hidden = true;
    active = null;
    vid.play();
  });
})();
