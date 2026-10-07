/* Applied AI · Module 1 hub.
   `ready: true` → the tile opens modules/<code>/index.html.
   To add a segment: unzip it into modules/<code>/ and flip its flag. */

const SECTIONS = [
  { id: 'S01', name: 'First Contact',
    about: 'Meet your AI tool. Send your first questions and see what it does well and where it goes wrong.' },
  { id: 'S02', name: 'Framing and Refining',
    about: 'Learn to ask clearly, then fix a weak answer step by step until it is useful.' },
  { id: 'S03', name: 'Check Before You Use',
    about: 'AI can sound sure and still be wrong. Learn to check every fact before you use it.' },
  { id: 'S04', name: 'Checkpoint', gate: true,
    about: 'Show what you learned. Do a real task with AI, check it, and hand in your work.' },
];

const SEGMENTS = [
  ['S01-VID01',  'Why You Are Not Behind', 'video', true],
  ['S01-VID02',  'Your First Prompt, On Screen', 'video'],
  ['S01-READ01', 'What This Tool Actually Is', 'read', true],
  ['S01-CARD01', 'Ten Starter Prompts', 'card', true],
  ['S01-LAB01',  'Set Up and Send Ten Prompts', 'lab', true],
  ['S01-LAB02',  'Watch It Get It Wrong', 'lab', true],
  ['S01-BOT01',  'Practice Bot', 'bot', true],
  ['S01-COMM01', 'Peer Exchange', 'comm'],
  ['S01-EVAL01', 'Section Check', 'eval', true],
  ['S01-RES01',  'Resources', 'res', true],
  ['S01-FAC01',  'Facilitator Kit', 'fac'],

  ['S02-VID01',  'The Four Things Every Request Needs', 'video'],
  ['S02-VID02',  'Bad to Usable in Six Turns', 'video'],
  ['S02-READ01', 'Framing and the Five Refinement Moves', 'read', true],
  ['S02-CARD01', 'Request Builder and Refinement Card', 'card', true],
  ['S02-LAB01',  'Rewrite Five Weak Requests', 'lab', true],
  ['S02-LAB02',  'Your Own Task, Framed and Refined', 'lab', true],
  ['S02-BOT01',  'Practice Bot', 'bot', true],
  ['S02-COMM01', 'Peer Exchange', 'comm', true],
  ['S02-EVAL01', 'Section Check', 'eval', true],
  ['S02-RES01',  'Resources', 'res', true],
  ['S02-FAC01',  'Facilitator Kit', 'fac', true],

  ['S03-VID01',  'It Will Lie to You Confidently', 'video'],
  ['S03-VID02',  'Mark It Before You Send It', 'video'],
  ['S03-READ01', 'Marking, Separating and Correcting', 'read', true],
  ['S03-CARD01', 'Marking Card', 'card', true],
  ['S03-LAB01',  'Find the Planted Errors', 'lab', true],
  ['S03-LAB02',  'Correct It, Then Finish It', 'lab', true],
  ['S03-BOT01',  'Practice Bot', 'bot', true],
  ['S03-RULE01', 'Rulebook Section', 'rule', true],
  ['S03-COMM01', 'Peer Exchange', 'comm', true],
  ['S03-EVAL01', 'Section Check', 'eval', true],
  ['S03-RES01',  'Resources', 'res', true],
  ['S03-FAC01',  'Facilitator Kit', 'fac', true],

  ['S04-CHAL01', 'Checkpoint 1: Use It and Check It', 'chal', true],
  ['S04-FORM01', 'Portfolio Submission', 'form', true],
].map(([code, title, type, ready]) => ({ code, title, type, ready: !!ready }));

const TYPES = {
  video: ['Video', '<path d="M8 5.5v13l11-6.5z"/>'],
  read:  ['Reading', '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>'],
  card:  ['Prompt Card', '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10h10M7 14h6"/>'],
  lab:   ['Lab Task', '<path d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 15h9"/>'],
  bot:   ['Practice Bot', '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9.5 17h5"/>'],
  comm:  ['Peer Exchange', '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M15 20a4.5 4.5 0 0 1 6-4.2"/>'],
  eval:  ['Evaluation', '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.5 2.5L16 9.5"/>'],
  res:   ['Resources', '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'],
  fac:   ['Facilitator Kit', '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>'],
  rule:  ['Rulebook', '<path d="M5 4h11a3 3 0 0 1 3 3v14H8a3 3 0 0 1-3-3z"/><path d="M5 18a3 3 0 0 1 3-3h11M10 4v6l2-1.5 2 1.5V4"/>'],
  chal:  ['Challenge Day', '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>'],
  form:  ['Submission', '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>'],
};

const svg = (inner) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const ARROW = svg('<path d="M5 12h14M13 6l6 6-6 6"/>');

const stepsEl = document.getElementById('steps');
const gridEl = document.getElementById('grid');

/* Progress saved by shared/course.js in this browser: { CODE: 'started' | 'done' } */
function progress() { try { return JSON.parse(localStorage.getItem('mc1-progress')) || {}; } catch (e) { return {}; } }
const TICK = svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>');
/* learners only see what is ready: no Facilitator Kits, no videos or items still to come */
const visible = (s) => s.type !== 'fac' && s.ready;

function paintProgress() {
  const p = progress();
  const open = SEGMENTS.filter((s) => s.ready && visible(s));
  const done = open.filter((s) => p[s.code] === 'done').length;
  document.getElementById('progressN').textContent = `${done} of ${open.length} done`;
  document.getElementById('progressFill').style.width = (open.length ? done / open.length * 100 : 0) + '%';
  const bar = document.getElementById('progress');
  bar.setAttribute('aria-valuemax', open.length); bar.setAttribute('aria-valuenow', done);
  stepsEl.querySelectorAll('.step').forEach((b) => {
    const mine = open.filter((s) => s.code.startsWith(b.dataset.id));
    b.classList.toggle('complete', mine.length > 0 && mine.every((s) => p[s.code] === 'done'));
  });
}

/* Videos look like any other button; tapping one says "Coming soon" */
function tile(seg, gate) {
  const [label, icon] = TYPES[seg.type];
  const video = !seg.ready && seg.type === 'video';
  let tag = 'div', attrs = 'aria-disabled="true"', cls = ' soon', end = '<span class="soon-tag">Soon</span>';
  if (seg.ready) {
    const st = progress()[seg.code];
    tag = 'a'; attrs = `href="modules/${seg.code}/index.html"`;
    cls = st === 'done' ? ' done' : st === 'started' ? ' started' : '';
    end = st === 'done' ? `<span class="tile-tick" title="Done" aria-label="Done">${TICK}</span>` : `<span class="tile-go">${ARROW}</span>`;
  } else if (video) {
    tag = 'button'; attrs = 'type="button" data-coming-soon'; cls = ' video'; end = `<span class="tile-go">${ARROW}</span>`;
  }
  return `<${tag} class="tile${cls}${gate ? ' gate' : ''}" ${attrs}>
    <span class="tile-icon">${svg(icon)}</span>
    <div class="tile-text"><span class="tile-type">${label}${cls === ' started' ? '<em class="tile-state">In progress</em>' : ''}</span><h3>${seg.title}</h3></div>
    ${end}
  </${tag}>`;
}

let toastTimer = 0;
gridEl.addEventListener('click', (e) => {
  const t = e.target.closest('[data-coming-soon]');
  if (!t) return;
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast'; toast.className = 'toast'; toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
  }
  toast.innerHTML = `${svg(TYPES.video[1])}<span><b>Coming soon</b>${t.querySelector('h3').textContent}</span>`;
  toast.classList.add('show');
  t.classList.add('tapped');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.classList.remove('show'); t.classList.remove('tapped'); }, 2400);
});

function show(id) {
  const sec = SECTIONS.find((s) => s.id === id) || SECTIONS[0];
  /* Facilitator Kits are kept in modules/ for the facilitator version, not shown to learners */
  const segs = SEGMENTS.filter((s) => s.code.startsWith(sec.id) && visible(s));
  stepsEl.querySelectorAll('.step').forEach((b) =>
    b.setAttribute('aria-selected', String(b.dataset.id === sec.id)));
  document.getElementById('secTitle').textContent = sec.name;
  document.getElementById('secAbout').textContent = sec.about;
  document.getElementById('secCount').textContent = `${segs.length} activities`;
  gridEl.innerHTML = segs.map((s) => tile(s, sec.gate)).join('');
  paintProgress();
  gridEl.querySelectorAll('.tile').forEach((t, i) => (t.style.animationDelay = `${i * 30}ms`));
  try { localStorage.setItem('mc1-section', sec.id); } catch (e) {}
  if (location.hash !== '#' + sec.id) history.replaceState(null, '', '#' + sec.id);
}

stepsEl.setAttribute('role', 'tablist');
stepsEl.innerHTML = SECTIONS.map((s, i) =>
  `<button class="step" role="tab" data-id="${s.id}" aria-selected="false">
     <span class="step-num">${s.gate ? svg('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>') : i + 1}</span>
     <span class="step-name">${s.name}</span>
   </button>`).join('');
stepsEl.addEventListener('click', (e) => {
  const b = e.target.closest('.step');
  if (b) show(b.dataset.id);
});

let start = location.hash.slice(1);
if (!start) { try { start = localStorage.getItem('mc1-section'); } catch (e) {} }
show(start);
window.addEventListener('hashchange', () => show(location.hash.slice(1)));
/* coming back from a module (incl. the browser Back button): redraw with the latest progress */
window.addEventListener('pageshow', () => show(location.hash.slice(1)));
