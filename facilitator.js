/* Facilitator guide: renders facilitator-data.js (window.FG) into section blocks.
   Each activity is a <details> row; the Facilitator Kit is starred and comes first. */

const ICONS = {
  'Video': '<path d="M8 5.5v13l11-6.5z"/>',
  'Reading': '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
  'Prompt Card': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10h10M7 14h6"/>',
  'Lab Task': '<path d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 15h9"/>',
  'Practice Bot': '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9.5 17h5"/>',
  'Peer Exchange': '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M15 20a4.5 4.5 0 0 1 6-4.2"/>',
  'Evaluation': '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.5 2.5L16 9.5"/>',
  'Resources': '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  'Facilitator Kit': '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  'Rulebook': '<path d="M5 4h11a3 3 0 0 1 3 3v14H8a3 3 0 0 1-3-3z"/><path d="M5 18a3 3 0 0 1 3-3h11M10 4v6l2-1.5 2 1.5V4"/>',
  'Challenge Day': '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  'Submission': '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
};
const svg = (inner) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const CHEV = svg('<path d="m6 9 6 6 6-6"/>');
const ARROW = svg('<path d="M5 12h14M13 6l6 6-6 6"/>');
const FLAG = svg('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>');
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const list = (arr, cls) => (arr && arr.length) ? `<ul class="fg-list ${cls || ''}">${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
const box = (title, inner) => inner ? `<div class="fg-box"><h3>${title}</h3>${inner}</div>` : '';

function item(a) {
  const kit = a.type === 'Facilitator Kit';
  const later = !a.ready;
  const meta = [
    a.duration ? `<span class="fg-pill">${esc(a.duration)}</span>` : '',
    later ? '<span class="fg-pill later">Not yet available</span>' : '',
    kit ? '<span class="fg-kit-tag"><span class="fg-stars" aria-hidden="true">★★★</span>Start here</span>' : '',
  ].join('');

  const facts = [
    a.output ? `<span class="fg-fact"><b>Learners produce:</b> ${esc(a.output)}</span>` : '',
    a.pass ? `<span class="fg-fact"><b>To pass:</b> ${esc(a.pass)}</span>` : '',
  ].join('');

  const kitParts = kit ? [
    box('Session plan', a.session_flow && a.session_flow.length ? `<ol class="fg-steps">${a.session_flow.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>` : ''),
    box('When the AI gives a wrong answer in class', a.wrong_answer_protocol && a.wrong_answer_protocol.length ? `<ol class="fg-steps">${a.wrong_answer_protocol.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>` : ''),
  ].join('') : '';
  const qa = kit && a.learner_questions && a.learner_questions.length
    ? box('Questions learners often ask', `<div class="fg-qa">${a.learner_questions.map((q) => `<div><b>${esc(q.q)}</b><span>${esc(q.a)}</span></div>`).join('')}</div>`)
    : '';
  const run = a.run_steps && a.run_steps.length
    ? box('How to run it', `<ol class="fg-steps">${a.run_steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`)
    : '';

  const body = `
    ${a.why ? `<p class="fg-why"><b>Why it happens:</b> ${esc(a.why)}</p>` : ''}
    <div class="fg-grid">
      ${box(kit ? 'What this kit gives you' : 'Learners will learn', list(a.learn))}
      ${box(kit ? 'After using it, you can' : 'After this, learners can', list(a.perform, 'do'))}
    </div>
    ${facts ? `<div class="fg-facts">${facts}</div>` : ''}
    ${kitParts ? `<div class="fg-grid">${kitParts}</div>` : ''}
    ${qa}${run}
    <div class="fg-grid">
      ${box('Before the session', list(a.prep))}
      ${box('Watch for', list(a.watch, 'warn'))}
    </div>
    ${a.ready ? `<a class="fg-open" href="modules/${a.code}/index.html" target="_blank" rel="noopener">Open this activity ${ARROW}</a>` : ''}`;

  return `<details class="fg-item${kit ? ' kit' : ''}${later ? ' later' : ''}" id="a-${a.code}"${kit && !later ? ' open' : ''}>
    <summary>
      <span class="fg-ic">${svg(ICONS[a.type] || ICONS.Reading)}</span>
      <span class="fg-name"><span class="fg-type">${esc(a.type)}</span><h3>${esc(a.title)}</h3></span>
      <span class="fg-meta">${meta}</span>
      <span class="fg-chev">${CHEV}</span>
    </summary>
    <div class="fg-body">${body}</div>
  </details>`;
}

function section(s, i) {
  const acts = FG.activities.filter((a) => a.code.startsWith(s.id));
  /* the Facilitator Kit leads its section */
  acts.sort((x, y) => (y.type === 'Facilitator Kit') - (x.type === 'Facilitator Kit'));
  return `<section class="fg-sec" id="${s.id}">
    <div class="fg-sec-head">
      <span class="fg-sec-num">${s.gate ? FLAG : i + 1}</span>
      <h2>${esc(s.name)}</h2>
      <p class="fg-sec-about">${esc(s.about)}</p>
    </div>
    <div class="fg-sec-goals">
      ${box('Why this section', `<p>${esc(s.why)}</p>`)}
      ${box('By the end, learners can', list(s.outcomes, 'do'))}
    </div>
    <div class="fg-items">${acts.map(item).join('')}</div>
  </section>`;
}

document.getElementById('fgNav').innerHTML = FG.sections.map((s, i) =>
  `<a class="fg-chip" href="#${s.id}"><span class="num">${s.gate ? FLAG : i + 1}</span>${esc(s.name)}</a>`).join('');
document.getElementById('fgMain').innerHTML = FG.sections.map(section).join('');

const all = () => document.querySelectorAll('.fg-item');
document.getElementById('expandAll').addEventListener('click', () => all().forEach((d) => { d.open = true; }));
document.getElementById('collapseAll').addEventListener('click', () => all().forEach((d) => { d.open = false; }));
window.addEventListener('beforeprint', () => all().forEach((d) => { d.open = true; }));
