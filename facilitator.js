/* Facilitator guide: renders facilitator-data.js (window.FG).
   Everything opens on click: the module-wide toolkit panels, each activity, and inside each
   activity the "How to run it / Engagement / Assessment / Prepare & support" panels.
   Only activities that are ready are shown; the Facilitator Kit is starred and leads its section. */

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
const PANEL_ICONS = {
  run: '<path d="M8 5.5v13l11-6.5z"/>',
  engage: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.7A8 8 0 1 1 21 12z"/>',
  assess: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.5 2.5L16 9.5"/>',
  prep: '<path d="M9 4h6M9 4a2 2 0 0 0-2 2v0h10v0a2 2 0 0 0-2-2M5 6h14v15H5z"/><path d="m9 13 2 2 4-4"/>',
  kit: '<path d="M4 6h16M4 12h16M4 18h10"/>',
  support: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/>',
  time: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
const svg = (inner) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const CHEV = svg('<path d="m6 9 6 6 6-6"/>');
const ARROW = svg('<path d="M5 12h14M13 6l6 6-6 6"/>');
const FLAG = svg('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>');
const TARGET = svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>');
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const has = (x) => Array.isArray(x) ? x.length > 0 : !!x;
const list = (arr, cls) => has(arr) ? `<ul class="fg-list ${cls || ''}">${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
const steps = (arr) => has(arr) ? `<ol class="fg-steps">${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>` : '';
const box = (title, inner) => inner ? `<div class="fg-box"><h3>${title}</h3>${inner}</div>` : '';
const qa = (arr, qk = 'q', ak = 'a') => has(arr) ? `<div class="fg-qa">${arr.map((x) => `<div><b>${esc(x[qk])}</b><span>${esc(x[ak])}</span></div>`).join('')}</div>` : '';
const rows = (pairs) => pairs.filter((p) => p[1]).map(([k, v]) => `<div class="fg-row"><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('');

/* a closed-by-default panel inside an activity (or in the toolkit) */
function panel(icon, title, inner, cls) {
  if (!inner) return '';
  return `<details class="fg-panel ${cls || ''}"><summary><span class="fg-p-ic">${svg(PANEL_ICONS[icon])}</span><span class="fg-p-t">${title}</span><span class="fg-p-chev">${CHEV}</span></summary><div class="fg-p-body">${inner}</div></details>`;
}

function runPanel(a) {
  const r = a.run || {};
  const body = `<dl class="fg-dl">${rows([['Open', r.open], ['Explain', r.explain], ['Lead discussion', r.discuss], ['Pairs / breakout rooms', r.breakout], ['Close', r.close]])}</dl>`
    + (has(a.run_steps) ? box('Step by step', steps(a.run_steps)) : '');
  return panel('run', 'How to run it', (r.open || has(a.run_steps)) ? body : '');
}
function engagePanel(a) {
  const e = a.engage; if (!e) return '';
  const body = `<div class="fg-grid">
      ${box('Prompts to get started', list(e.prompts))}
      ${box('Discussion questions', list(e.discussion))}
    </div>
    <dl class="fg-dl">${rows([['Quick poll', e.poll], ['Peer review', e.peer], ['Quieter learners', e.quiet]])}</dl>
    ${has(e.quiz) ? box('Quick quiz', qa(e.quiz)) : ''}`;
  return panel('engage', 'Engagement ideas', body);
}
function assessPanel(a) {
  const s = a.assess || {};
  const facts = `<dl class="fg-dl">${rows([['Learners produce', a.output], ['To pass', a.pass], ['Feedback reaches learners', s.returned]])}</dl>`;
  const rubric = has(s.rubric) ? `<div class="fg-box"><h3>Rubric</h3><table class="fg-rubric"><tbody>${s.rubric.map((r) => `<tr><th>${esc(r.level)}</th><td>${esc(r.looks_like)}</td></tr>`).join('')}</tbody></table></div>` : '';
  const body = facts
    + `<div class="fg-grid">${box('What to look for', list(s.criteria, 'do'))}${box('Feedback you can give', list(s.feedback_examples))}</div>`
    + rubric
    + (has(s.answer_key) ? `<details class="fg-panel fg-sub"><summary><span class="fg-p-t">Answer key</span><span class="fg-p-chev">${CHEV}</span></summary><div class="fg-p-body">${qa(s.answer_key)}</div></details>` : '');
  return panel('assess', 'Assessment & feedback', (a.output || a.pass || has(s.criteria)) ? body : '');
}
function prepPanel(a) {
  const sup = has(a.support) ? box('If something goes wrong', qa(a.support, 'issue', 'fix')) : '';
  const body = `<div class="fg-grid">${box('Before the session', list(a.prep))}${box('Watch for', list(a.watch, 'warn'))}</div>${sup}`;
  return panel('prep', 'Prepare & support', (has(a.prep) || has(a.watch) || sup) ? body : '');
}
function kitPanels(a) {
  if (a.type !== 'Facilitator Kit') return '';
  return panel('kit', 'Session plan', steps(a.session_flow))
    + panel('support', 'When the AI gives a wrong answer in class', steps(a.wrong_answer_protocol))
    + panel('support', 'Questions learners often ask', qa(a.learner_questions));
}

function item(a) {
  const kit = a.type === 'Facilitator Kit';
  const meta = [
    a.duration ? `<span class="fg-pill">${esc(a.duration)}</span>` : '',
    kit ? '<span class="fg-kit-tag"><span class="fg-stars" aria-hidden="true">★★★</span>Start here</span>' : '',
  ].join('');
  const body = `
    ${a.objective ? `<p class="fg-obj"><span class="fg-obj-ic">${TARGET}</span><span><b>${kit ? 'Your objective' : 'Learning objective'}</b>${esc(a.objective)}</span></p>` : ''}
    ${a.why ? `<p class="fg-why"><b>Why it happens:</b> ${esc(a.why)}</p>` : ''}
    <div class="fg-grid">
      ${box(kit ? 'What this kit gives you' : 'Learners will learn', list(a.learn))}
      ${box(kit ? 'After using it, you can' : 'Outcomes: after this, learners can', list(a.perform, 'do'))}
    </div>
    <div class="fg-panels">
      ${kitPanels(a)}${runPanel(a)}${engagePanel(a)}${assessPanel(a)}${prepPanel(a)}
    </div>
    <a class="fg-open" href="modules/${a.code}/index.html" target="_blank" rel="noopener">Open this activity ${ARROW}</a>`;

  return `<details class="fg-item${kit ? ' kit' : ''}" id="a-${a.code}">
    <summary>
      <span class="fg-ic">${svg(ICONS[a.type] || ICONS.Reading)}</span>
      <span class="fg-name"><span class="fg-type">${esc(a.type)}</span><h3>${esc(a.title)}</h3>${a.objective ? `<span class="fg-sum-obj">${esc(a.objective.replace(/^By the end,\s*/i, '').replace(/^./, (c) => c.toUpperCase()))}</span>` : ''}</span>
      <span class="fg-meta">${meta}</span>
      <span class="fg-chev">${CHEV}</span>
    </summary>
    <div class="fg-body">${body}</div>
  </details>`;
}

function section(s, i) {
  /* only activities that are ready; the Facilitator Kit leads its section */
  const acts = FG.activities.filter((a) => a.code.startsWith(s.id) && a.ready);
  acts.sort((x, y) => (y.type === 'Facilitator Kit') - (x.type === 'Facilitator Kit'));
  return `<section class="fg-sec" id="${s.id}">
    <div class="fg-sec-head">
      <span class="fg-sec-num">${s.gate ? FLAG : i + 1}</span>
      <h2>${esc(s.name)}</h2>
      <p class="fg-sec-about">${esc(s.about)}</p>
    </div>
    <details class="fg-panel fg-sec-goals-wrap"><summary><span class="fg-p-ic">${TARGET}</span><span class="fg-p-t">Why this section, and its outcomes</span><span class="fg-p-chev">${CHEV}</span></summary>
      <div class="fg-p-body"><div class="fg-grid">
        ${box('Why this section', `<p>${esc(s.why)}</p>`)}
        ${box('By the end, learners can', list(s.outcomes, 'do'))}
      </div></div>
    </details>
    <div class="fg-items">${acts.map(item).join('')}</div>
  </section>`;
}

/* ---------- module-wide toolkit: three panels under the title ---------- */
const CK_KEY = 'mc1-fac-prep';
function readChecks() { try { return JSON.parse(localStorage.getItem(CK_KEY)) || {}; } catch (e) { return {}; } }
function toolkit() {
  const t = FG.toolkit; if (!t) return '';
  const ck = readChecks();
  const prep = (t.prep || []).map((g, gi) => `<div class="fg-box"><h3>${esc(g.group)}</h3><ul class="fg-check">${g.items.map((x, ii) => {
    const id = `ck-${gi}-${ii}`;
    return `<li><label><input type="checkbox" data-ck="${id}"${ck[id] ? ' checked' : ''}><span>${esc(x)}</span></label></li>`;
  }).join('')}</ul></div>`).join('');
  const s = t.support || {};
  const support = `
    ${box('Common technical problems', qa(s.tech, 'issue', 'fix'))}
    <div class="fg-grid">${box('Accommodations', list(s.accommodations))}${box('Learners who fall behind', steps(s.behind))}</div>
    ${box('FAQs', qa(s.faqs))}`;
  const fb = has(t.feedback) ? `<table class="fg-table"><thead><tr><th>What</th><th>When</th><th>How</th></tr></thead><tbody>${t.feedback.map((r) => `<tr><td>${esc(r.what)}</td><td>${esc(r.when)}</td><td>${esc(r.how)}</td></tr>`).join('')}</tbody></table>` : '';
  return `<div class="fg-toolkit">
    ${panel('prep', 'Preparation checklist', `<p class="fg-note">Tick items as you go — your ticks are saved on this device. <button type="button" class="fg-link" id="ckReset">Clear ticks</button></p><div class="fg-grid fg-grid-3">${prep}</div>`, 'tk')}
    ${panel('support', 'Learner support', support, 'tk')}
    ${panel('time', 'Feedback timetable', fb, 'tk')}
  </div>`;
}

document.getElementById('fgToolkit').innerHTML = toolkit();
document.getElementById('fgNav').innerHTML = FG.sections.map((s, i) =>
  `<a class="fg-chip" href="#${s.id}"><span class="num">${s.gate ? FLAG : i + 1}</span>${esc(s.name)}</a>`).join('');
document.getElementById('fgMain').innerHTML = FG.sections.map(section).join('');

document.addEventListener('change', (e) => {
  const c = e.target.closest('[data-ck]'); if (!c) return;
  const ck = readChecks(); ck[c.dataset.ck] = c.checked;
  try { localStorage.setItem(CK_KEY, JSON.stringify(ck)); } catch (err) {}
});
const reset = document.getElementById('ckReset');
if (reset) reset.addEventListener('click', () => {
  try { localStorage.removeItem(CK_KEY); } catch (err) {}
  document.querySelectorAll('[data-ck]').forEach((c) => { c.checked = false; });
});

const all = () => document.querySelectorAll('#fgMain details');
document.getElementById('expandAll').addEventListener('click', () => all().forEach((d) => { d.open = true; }));
document.getElementById('collapseAll').addEventListener('click', () => all().forEach((d) => { d.open = false; }));
window.addEventListener('beforeprint', () => document.querySelectorAll('details').forEach((d) => { d.open = true; }));
