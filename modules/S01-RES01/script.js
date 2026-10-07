(function () {
  'use strict';
  /* lane: 'both' | 'iti' | 'he'  ·  min: minutes, used by the time filter and the picker (null = varies)
     opt: optional extra, listed after the core cards in its section */
  var SECTIONS = [
    { id: 's1', short: 'Prompt better', title: 'Prompt better', intro: 'How to ask AI clearly for what you need. Start with the 10-minute guide.' },
    { id: 's2', short: 'Check before you trust', title: 'Check before you trust', intro: 'In Watch It Get It Wrong you caught an AI making things up. These show what kinds of mistakes to expect and how to check for them.' },
    { id: 's3', short: 'Keep information safe', title: 'Keep your information safe', intro: 'The course asks you never to type personal or confidential details into an AI tool. These explain why.' },
    { id: 's4', short: 'How AI works', title: 'How AI works', intro: 'Why AI answers the way it does. Start with the short reads, then pick one course if you want more.' }
  ];

  var RES = [
    /* ---------- Section 1 ---------- */
    { id: 'openai-prompting', sec: 's1', lane: 'both', min: 10,
      title: 'Prompting fundamentals', org: 'OpenAI Academy (OpenAI)', url: 'https://openai.com/academy/prompting/',
      format: 'Short guide', level: 'Beginner', time: 'About 10 min', access: 'Free. No account needed.',
      adds: 'A simple three-step formula for writing your own prompts, with a practice activity.',
      take: ['Three steps for a good prompt: describe the task, give the background, and say what the answer should look like (tone, format, length).', 'A practice activity shows the same prompt written three ways: okay, better and best.', 'Ask for options, say what matters most (accuracy, creativity or speed), and keep prompts specific but simple.'],
      tryit: 'Rewrite your Watch It Get It Wrong prompt using the three steps, then compare the two answers.' },
    { id: 'anthropic-prompting', sec: 's1', lane: 'both', min: 10,
      title: 'Best practices for prompt engineering', org: 'Anthropic (Claude blog)', url: 'https://claude.com/blog/best-practices-for-prompt-engineering',
      format: 'Article', level: 'Beginner to intermediate', time: 'About 10 min', access: 'Free. No account needed.',
      adds: 'Quick fixes for the most common problems with AI answers.',
      take: ['Tell the AI it may say "I don\'t know". This reduces made-up answers.', 'A troubleshooting table: generic answer, off-topic answer, inconsistent format, made-up facts, and the fix for each.', 'Longer prompts are not always better, and you do not need every technique at once.', 'Start with one example, and add more only if needed.'],
      note: 'The section on prefilling is for developers. You can skip it.',
      tryit: 'Add "If you don\'t know, say so" to your next prompt and see what changes.' },
    { id: 'openai-college', sec: 's1', lane: 'he', min: 45,
      title: 'AI for College Students', org: 'OpenAI Academy (OpenAI)', url: 'https://academy.openai.com/pages/courses',
      format: 'Course', level: 'Beginner', time: 'About 45 min', access: 'Free. Needs a ChatGPT account.',
      adds: 'How to use AI for study, group work and career preparation without letting it do your thinking.',
      take: ['Study planning, group work, writing and career preparation.', 'Deciding what information to share with the AI, and reviewing its answers instead of simply accepting them.', 'Preparing applications and interviews within your institution\'s rules.'],
      note: 'Find "AI for College Students" in the course list. It needs a ChatGPT account: check that your institute allows it before you sign up, and use only an account you are permitted to use.',
      warn: true,
      tryit: 'Pick one study task this week and write down what you will check before you use the AI\'s answer.' },
    { id: 'openai-reasoning', sec: 's1', lane: 'both', min: 15, opt: true,
      title: 'Reasoning best practices', org: 'OpenAI (developer documentation)', url: 'https://developers.openai.com/api/docs/guides/reasoning-best-practices',
      format: 'Developer documentation', level: 'Advanced', time: 'About 15 min', access: 'Free. No account needed.',
      adds: 'How newer reasoning models differ, and why some old prompting tricks no longer help.',
      take: ['Reasoning models work like a senior co-worker: give them the goal, not every step.', 'Asking them to "think step by step" is unnecessary and can sometimes hurt.', 'Try without examples first, and be specific about what a good answer looks like.'],
      note: 'Written for developers. Read only the section on how to prompt reasoning models; skip the customer quotes and cost tips.',
      tryit: 'In your next prompt, state the goal and what a good answer looks like, without listing every step.' },

    /* ---------- Section 2 ---------- */
    { id: 'unt', sec: 's2', lane: 'both', min: 15,
      title: 'Evaluating AI Outputs', org: 'University of North Texas Libraries', url: 'https://guides.library.unt.edu/c.php?g=1536486&p=11517576',
      format: 'Online guide with activities', level: 'Beginner', time: '10 to 15 min', access: 'Free. No account needed.',
      adds: 'A 15-minute guide that corrects common beliefs about AI answers.',
      take: ['Polished writing is not proof that an answer is correct.', 'Asking again gives you a different answer, not necessarily a better one.', 'Some AI tools search the web and others do not, so check which one you are using.', 'Six questions to ask: is it accurate, who is the authority, what is the evidence, is it biased, is it relevant, and what is verified versus guessed?'],
      note: 'Some library links on the site are for UNT students only. The guide itself is open.',
      tryit: 'Run the six questions on the first AI answer from Watch It Get It Wrong.' },
    { id: 'umd', sec: 's2', lane: 'both', min: 15,
      title: 'AI and Information Literacy', org: 'University of Maryland Libraries', url: 'https://lib.guides.umd.edu/AI',
      format: 'Online guide with short videos', level: 'Beginner to intermediate', time: 'About 15 min for the fact-checking page', access: 'Free. No account needed. Licensed CC BY-NC 4.0.',
      adds: 'A step-by-step method, called lateral reading, for checking any AI answer, and how to spot bias.',
      take: ['Break the answer into separate claims, then check each one in other reliable sources.', 'If the AI names a source, open it and confirm it exists and says what the AI claims.', 'Ask what your question assumed and what the AI assumed.', 'AI can leave out whole viewpoints. Asked for art history, it often gives only European art.'],
      note: 'The full guide takes 1 to 2 hours. The fact-checking page is enough to start.',
      tryit: 'Pick one claim from an AI answer and find it in two other reliable sources.' },
    { id: 'usask', sec: 's2', lane: 'he', min: 15,
      title: 'Using AI: the ACCURATE-LE checklist', org: 'University of Saskatchewan Library', url: 'https://libguides.usask.ca/gen_ai/evaluating',
      format: 'Online checklist (web page)', level: 'Intermediate', time: 'About 15 min', access: 'Free. No account needed.',
      adds: 'A printable before, during and after checklist, including when and how to say you used AI.',
      take: ['Check that links work and that the page says what the AI claims.', 'Remove names, addresses and birth dates before pasting anything into an AI tool.', 'Say clearly when and how you used AI, and check whether you are allowed to use it for the task.', 'Check the answer against your task requirements so nothing important is missing.'],
      note: 'Written for university students. Some sections cover research ethics and journal rules. A printable poster version is linked at the bottom of the page.',
      tryit: 'Print the checklist, or save it on your phone, and use it on your next AI-assisted assignment.' },
    { id: 'openai-responsible', sec: 's2', lane: 'both', min: 10,
      title: 'Responsible and safe use', org: 'OpenAI Academy (OpenAI)', url: 'https://openai.com/academy/responsible-and-safe-use/',
      format: 'Short guide', level: 'Beginner', time: 'About 10 min', access: 'Free. No account needed.',
      adds: 'Clear rules for using AI responsibly at your institute or workplace.',
      take: ['Your institute\'s or employer\'s AI rules come first.', 'Double-check important facts, and watch for bias in answers.', 'Ask a qualified expert before acting on health, legal or money advice.', 'If you are asked to show how you used AI, keep the chat link. Get permission before sharing anyone else\'s voice or data.'],
      tryit: 'Find your institute\'s or workplace\'s AI rules and note one thing they allow and one they don\'t.' },

    /* ---------- Section 3 ---------- */
    { id: 'certin', sec: 's3', lane: 'both', min: 5,
      title: 'CERT-In advisory on AI applications', org: 'IndiaAI (Ministry of Electronics and IT, Government of India)', url: 'https://indiaai.gov.in/news/cert-in-issues-advisory-on-security-implications-to-minimize-threats-from-ai-applications',
      format: 'News summary', level: 'Beginner', time: 'About 5 min', access: 'Free. No account needed.',
      adds: 'An Indian government view: how scammers misuse AI apps, from CERT-In, India\'s national cyber security agency.',
      take: ['Fake websites and apps can pretend to be popular AI tools, to spread malware.', 'AI tools can be used to collect people\'s personal information from the internet without their permission.', 'Check the website address and the app publisher before you use any AI tool.'],
      note: 'This advisory dates from 2023. CERT-In has issued newer AI advisories since; ask your facilitator for the latest.',
      tryit: 'Before you install any AI app, check that the website address and the publisher are the official ones.' },
    { id: 'csa', sec: 's3', lane: 'both', min: 10,
      title: 'Safe and Secure Use of Generative AI for Individuals', org: 'Cyber Security Agency of Singapore and IMDA (government advisory)', url: 'https://www.imda.gov.sg/assets/ad9b8b71-35d0-4539-b3dd-15e8aa8781b2.pdf',
      format: 'Advisory (2-page PDF)', level: 'Beginner', time: 'About 10 min', access: 'Free. No account needed.',
      adds: 'Practical steps for what to keep out of AI tools, and how to spot risky AI apps.',
      take: ['Even casual chats can reveal a lot about you over time. If an AI tool is hacked, that information could be used for scams.', 'Keep out your full name, address, ID numbers, and financial or medical records. Never enter workplace data without permission.', 'Be careful with unofficial AI apps and browser extensions, especially ones that ask for camera or location access they do not need.', 'Use AI to support your thinking, not replace it.'],
      note: 'Written for Singapore. Where it mentions the NRIC (national ID card), think of your Aadhaar number.',
      tryit: 'Write down three things you will never type into an AI tool.' },
    { id: 'stanford', sec: 's3', lane: 'both', min: 8,
      title: 'Be Careful What You Tell Your AI Chatbot', org: 'Stanford Institute for Human-Centered AI (HAI)', url: 'https://hai.stanford.edu/news/be-careful-what-you-tell-your-ai-chatbot',
      format: 'News article', level: 'Beginner to intermediate', time: 'About 8 min', access: 'Free. No account needed.',
      adds: 'Compares what six major AI companies do with your chats.',
      take: ['The six companies studied use people\'s chats to train their AI by default.', 'Some keep chats indefinitely, and some let people read them.', 'Files you upload can be collected too.', 'Even a harmless question, like asking for heart-healthy recipes, can reveal something sensitive about you.'],
      note: 'Published October 2025 and focused on US companies. Company policies may have changed since.',
      tryit: 'Open your AI tool\'s settings and check whether your chats are used for training.' },

    /* ---------- Section 4 ---------- */
    { id: 'openai-models', sec: 's4', lane: 'both', min: 10,
      title: 'How ChatGPT and our foundation models are developed', org: 'OpenAI Help Center', url: 'https://help.openai.com/en/articles/7842364-how-chatgpt-and-our-foundation-models-are-developed',
      format: 'Help article', level: 'Beginner', time: 'About 10 min', access: 'Free. No account needed.',
      adds: 'Where an AI model\'s knowledge comes from, and the steps used to build it.',
      take: ['Models learn from public information on the internet, information from partner organisations, and information from users, trainers and researchers.', 'Building a model has stages: preparing the data, pre-training, post-training, and ongoing checks after release.', 'It explains how to stop your chats from being used to improve the models.'],
      note: 'Written by OpenAI about its own models.',
      tryit: 'Find the setting that stops your chats being used to improve the model.' },
    { id: 'hallucinate', sec: 's4', lane: 'both', min: 10,
      title: 'Why language models hallucinate', org: 'OpenAI', url: 'https://openai.com/index/why-language-models-hallucinate/',
      format: 'Blog article', level: 'Intermediate', time: 'About 10 min', access: 'Free. No account needed.',
      adds: 'Explains why AI makes things up, using a comparison every student knows. This is the "why" behind Watch It Get It Wrong.',
      take: ['Like a student guessing on a hard exam question, AI guesses when it is unsure.', 'Training and testing reward a lucky guess more than an honest "I don\'t know".', 'During training the model sees only fluent text, so false statements can sound just as natural as true ones.', 'AI can be built to admit uncertainty, but the problem is not fully solved.'],
      note: 'Published September 2025. Read the blog article; the research paper linked inside it is highly technical.',
      tryit: 'Ask an AI something it can\'t know, like your own timetable, and see whether it admits it.' },
    { id: 'yuva', sec: 's4', lane: 'both', min: 270,
      title: 'YUVA AI for ALL', org: 'IndiaAI Mission, Ministry of Electronics and IT, Government of India', url: 'https://youtube.com/playlist?list=PL7GY38cluZJHAhoGmwP3ao3TXIZT5HwkU',
      format: 'Video course, 6 modules', level: 'Beginner', time: 'About 4.5 hours, in parts', access: 'Free. No account needed.',
      adds: 'A full tour of AI from the Government of India: how it works, its uses in study and work, ethics, and safe use.',
      take: ['Built for people with no technical background.', 'Covers what AI is, how it works, and how it is changing study and work.', 'Includes a module on using AI tools safely and responsibly, with Indian examples.'],
      note: 'Watch one module at a time. You don\'t need to finish it in one sitting.',
      tryit: 'Watch module 1 and note one Indian example of AI at work.' },
    { id: 'soar', sec: 's4', lane: 'iti', min: null,
      title: 'SOAR: Skilling for AI Readiness', org: 'Skill India Digital Hub (MSDE and NCVET, Government of India)', url: 'https://www.skillindiadigital.gov.in/',
      format: 'Online courses, self-paced', level: 'Beginner', time: 'Varies by course', access: 'Free. Needs a Skill India Digital account.',
      adds: 'Government AI courses aligned to NSQF, including AI for jobs and workplace productivity. A good next step for ITI learners.',
      take: ['Self-paced online courses aligned to the NSQF.', 'Covers foundational AI literacy, AI for jobs, workplace productivity and uses in specific sectors.', 'Completed courses can give you a digital certificate on Skill India Digital.'],
      note: 'Sign in and search for SOAR. Course names and lengths vary, so check them before you start.',
      tryit: 'Find one SOAR course that matches your trade or field and note how long it takes.' },
    { id: 'claude-capabilities', sec: 's4', lane: 'both', min: 210,
      title: 'AI capabilities and limitations', org: 'Anthropic Academy (Anthropic)', url: 'https://academy.claude.com/courses/ai-capabilities-and-limitations',
      format: 'Course', level: 'Beginner', time: 'About 3.5 hours', access: 'Free. Sign in only to save your progress.',
      adds: 'Why AI behaves the way it does, so you can predict where it will go wrong.',
      take: ['AI writes one word-piece at a time, which is why it can sound right while being wrong.', 'What it knows well, and why it is weaker on rare, recent or local topics.', 'Why a new chat forgets the last one.', 'How to recognise which kind of unexpected answer you got, and respond with a targeted fix.'],
      tryit: 'After one lesson, predict where an AI answer might go wrong before you read it.' },
    { id: 'ai-fluency', sec: 's4', lane: 'both', min: 240, opt: true,
      title: 'AI Fluency: Framework and foundations', org: 'Anthropic Academy (Anthropic)', url: 'https://academy.claude.com/courses/ai-fluency-framework-foundations',
      format: 'Course, 14 lessons', level: 'Beginner to intermediate', time: 'About 4 hours', access: 'Free. Sign in only to save your progress.',
      adds: 'A framework for deciding what to hand to AI and how to check its work.',
      take: ['Four habits for working with AI: Delegation, Description, Discernment and Diligence.', 'Deciding which tasks to hand to AI and which to keep.', 'Taking responsibility for AI-assisted work and being open about using it.'],
      note: 'Take this after the capabilities course if you want the bigger picture.',
      tryit: 'Pick one task and decide: hand it to AI, do it yourself, or share it?' },
    { id: 'tracing', sec: 's4', lane: 'both', min: 15, opt: true,
      title: 'Tracing the thoughts of a large language model', org: 'Anthropic (research)', url: 'https://www.anthropic.com/news/tracing-thoughts-language-model',
      format: 'Research article with video', level: 'Advanced', time: 'About 15 min', access: 'Free. No account needed.',
      adds: 'What researchers see when they look inside an AI model while it works.',
      take: ['Although it writes one word at a time, the AI can plan ahead, for example choosing a rhyming word before writing a line of a poem.', 'When given a wrong hint, it sometimes builds a convincing argument to agree with the user.', 'The explanation an AI gives for its answer may not match how it actually reached that answer.'],
      note: 'The simple picture still holds: AI predicts likely text. This shows the inside is more complex, and researchers can explain only a small part of it.',
      tryit: 'Ask an AI how it got an answer, and remember its explanation may not match what happened inside.' }
  ];

  var LANE_LABEL = { both: 'ITI and higher education', iti: 'Good for ITI', he: 'Good for higher education' };
  var printing = false;
  var STORE = 'fc-res-explored', NOTES = 'fc-res-notes', SOUND = 'fc-res-sound';
  function load(k, f) { try { var v = localStorage.getItem(k); return v === null ? f : JSON.parse(v); } catch (e) { return f; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function icon(id, cls) { var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('class', cls || 'ic'); s.setAttribute('aria-hidden', 'true'); var u = document.createElementNS('http://www.w3.org/2000/svg', 'use'); u.setAttribute('href', '#' + id); s.appendChild(u); return s; }
  function shortTime(r) { if (r.min == null) return 'Varies'; if (r.min < 60) return r.min + ' min'; var h = r.min / 60; return (Math.round(h * 2) / 2) + ' hr'; }

  /* ---------- sound (off unless turned on) ---------- */
  var soundOn = load(SOUND, false), ctx = null;
  function tone(f, s, d, g, f2) {
    try {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      var t = ctx.currentTime + s, o = ctx.createOscillator(), a = ctx.createGain();
      o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d * .75);
      a.gain.setValueAtTime(.0001, t); a.gain.exponentialRampToValueAtTime(g, t + .008); a.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(a); a.connect(ctx.destination); o.start(t); o.stop(t + d + .02);
    } catch (e) {}
  }
  function play(k) { if (!soundOn) return; if (k === 'tap') tone(1250, 0, .06, .05, 620); if (k === 'chime') { tone(880, 0, .35, .1); tone(1318.5, .09, .45, .1); } }
  var soundBtn = $('sound-toggle');
  function paintSound() { soundBtn.setAttribute('aria-pressed', String(soundOn)); soundBtn.setAttribute('aria-label', soundOn ? 'Sound on. Turn sound off' : 'Sound off. Turn sound on'); }
  soundBtn.addEventListener('click', function () { soundOn = !soundOn; save(SOUND, soundOn); paintSound(); play('tap'); });
  paintSound();

  /* ---------- render ---------- */
  var explored = load(STORE, []); if (!Array.isArray(explored)) explored = [];
  var notes = load(NOTES, {}); if (!notes || typeof notes !== 'object') notes = {};
  $('total-n').textContent = RES.length; $('prog-t').textContent = RES.length;

  var tabs = $('tabs');
  SECTIONS.forEach(function (s, i) {
    var li = el('li'), a = el('a'); a.href = '#' + s.id; a.dataset.sec = s.id;
    a.appendChild(el('span', 'n', String(i + 1))); a.appendChild(document.createTextNode(s.short));
    li.appendChild(a); tabs.appendChild(li);
  });

  function card(r) {
    var d = el('details', 'res card'); d.id = 'res-' + r.id; d.dataset.lane = r.lane; d.dataset.min = r.min == null ? '' : r.min;
    var s = el('summary');
    s.appendChild(el('span', 'org', r.org));
    s.appendChild(el('h3', '', r.title));
    var chips = el('span', 'chips');
    var lv = el('span', 'mini'); lv.appendChild(icon('i-level')); lv.appendChild(document.createTextNode(r.level)); chips.appendChild(lv);
    var tm = el('span', 'mini'); tm.appendChild(icon('i-clock')); tm.appendChild(document.createTextNode(shortTime(r))); chips.appendChild(tm);
    if (r.lane !== 'both') chips.appendChild(el('span', 'mini lane', LANE_LABEL[r.lane]));
    var pk = el('span', 'mini pick', 'Picked for you'); pk.hidden = true; chips.appendChild(pk);
    var sn = el('span', 'mini seen'); sn.appendChild(icon('i-check')); sn.appendChild(document.createTextNode('Explored')); chips.appendChild(sn);
    s.appendChild(chips);
    var tg = el('span', 'toggle'); tg.appendChild(el('span', 't-open', 'Show details')); tg.appendChild(el('span', 't-close', 'Hide details')); tg.appendChild(icon('i-chev')); s.appendChild(tg);
    d.appendChild(s);

    var b = el('div', 'res-body');
    var meta = el('ul', 'meta');
    [['Format', r.format], ['Level', r.level], ['Time', r.time], ['Access', r.access]].forEach(function (m) { var li = el('li'); li.appendChild(el('span', 'k', m[0])); li.appendChild(el('span', '', m[1])); meta.appendChild(li); });
    b.appendChild(meta);
    var adds = el('p', 'adds'); adds.appendChild(el('b', '', 'What this adds: ')); adds.appendChild(document.createTextNode(r.adds)); b.appendChild(adds);
    var cols = el('div', 'res-cols');
    var take = el('div', 'take'); take.appendChild(el('h4', '', 'Key takeaways')); var ul = el('ul'); r.take.forEach(function (t) { ul.appendChild(el('li', '', t)); }); take.appendChild(ul); cols.appendChild(take);
    var side = el('div', 'side');
    var tr = el('div', 'callout task'); tr.appendChild(icon('i-spark')); var trd = el('div'); trd.appendChild(el('b', '', 'Try it now. ')); trd.appendChild(document.createTextNode(r.tryit)); tr.appendChild(trd); side.appendChild(tr);
    if (r.note) { var nt = el('div', 'callout warn'); nt.appendChild(icon(r.warn ? 'i-alert' : 'i-info')); var ntd = el('div'); ntd.appendChild(el('b', '', 'Good to know. ')); ntd.appendChild(document.createTextNode(r.note)); nt.appendChild(ntd); side.appendChild(nt); }
    cols.appendChild(side); b.appendChild(cols);
    var act = el('div', 'res-actions');
    var nf = el('div', 'note-field'); var lab = el('label'); lab.htmlFor = 'note-' + r.id; lab.appendChild(document.createTextNode('One thing I\'ll try')); lab.appendChild(el('span', '', 'optional, saved to My AI toolkit'));
    var inp = el('input'); inp.type = 'text'; inp.id = 'note-' + r.id; inp.placeholder = 'For example: ' + r.tryit.charAt(0).toLowerCase() + r.tryit.slice(1, 60) + (r.tryit.length > 60 ? '…' : '');
    inp.value = notes[r.id] || ''; inp.maxLength = 200;
    var sv = el('span', 'saved'); sv.setAttribute('aria-live', 'polite');
    var tmr = 0;
    inp.addEventListener('input', function () { clearTimeout(tmr); tmr = setTimeout(function () { var v = inp.value.trim(); if (v) notes[r.id] = v; else delete notes[r.id]; save(NOTES, notes); paintToolkit(); sv.textContent = v ? 'Saved to My AI toolkit' : ''; }, 400); });
    nf.appendChild(lab); nf.appendChild(inp); nf.appendChild(sv);
    var a = el('a', 'open-link'); a.href = r.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.appendChild(document.createTextNode('Open the resource')); a.appendChild(icon('i-ext')); a.appendChild(el('span', 'sr', '(opens in a new tab)'));
    a.querySelector('.sr').style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)';
    act.appendChild(nf); act.appendChild(a); b.appendChild(act);
    d.appendChild(b);
    d.addEventListener('toggle', function () { if (d.open && !printing) { markExplored(r.id); play('tap'); } });
    return d;
  }

  var host = $('sections');
  SECTIONS.forEach(function (s, i) {
    var sec = el('section', 'sec'); sec.id = s.id; sec.setAttribute('aria-labelledby', s.id + '-h');
    var head = el('div', 'sec-head'); head.appendChild(el('span', 'num', String(i + 1)));
    var ht = el('div'); ht.appendChild(el('div', 'eyebrow', 'Section ' + (i + 1))); var h2 = el('h2', '', s.title); h2.id = s.id + '-h'; ht.appendChild(h2); ht.appendChild(el('p', 'sub', s.intro)); head.appendChild(ht);
    sec.appendChild(head);
    var list = el('div', 'res-list');
    var core = RES.filter(function (r) { return r.sec === s.id && !r.opt; }), opt = RES.filter(function (r) { return r.sec === s.id && r.opt; });
    core.forEach(function (r) { list.appendChild(card(r)); });
    if (opt.length) { list.appendChild(el('div', 'sub-label', 'Optional, if you want to go deeper')); opt.forEach(function (r) { list.appendChild(card(r)); }); }
    var empty = el('p', 'empty-sec', 'No resources in this section match the filter. Choose All to see them.'); empty.hidden = true; list.appendChild(empty);
    sec.appendChild(list); host.appendChild(sec);
  });
  var cards = Array.prototype.slice.call(document.querySelectorAll('details.res'));

  /* ---------- progress: cards opened (R1) ---------- */
  function paintProgress() {
    var n = RES.filter(function (r) { return explored.indexOf(r.id) > -1; }).length;
    cards.forEach(function (c) { c.classList.toggle('is-seen', explored.indexOf(c.id.slice(4)) > -1); });
    $('prog-fill').style.width = (n / RES.length * 100) + '%'; $('prog-n').textContent = n;
    $('prog').classList.toggle('done', n === RES.length);
    return n;
  }
  function markExplored(id) { if (explored.indexOf(id) > -1) return; explored.push(id); save(STORE, explored); if (paintProgress() === RES.length) play('chime'); }
  paintProgress();

  /* ---------- filters (E-R2) ---------- */
  var filter = 'all';
  function matches(c, f) {
    if (f === 'all') return true;
    if (f === 'quick') return c.dataset.min !== '' && Number(c.dataset.min) <= 15;
    return c.dataset.lane === 'both' || c.dataset.lane === f;
  }
  function applyFilter() {
    cards.forEach(function (c) { c.hidden = !matches(c, filter); });
    document.querySelectorAll('.sec').forEach(function (sec) {
      var vis = sec.querySelectorAll('details.res:not([hidden])').length;
      sec.querySelector('.empty-sec').hidden = vis > 0;
      var lbl = sec.querySelector('.sub-label');
      if (lbl) lbl.hidden = !Array.prototype.some.call(sec.querySelectorAll('details.res'), function (c) { var r = RES.filter(function (x) { return 'res-' + x.id === c.id; })[0]; return r.opt && !c.hidden; });
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll('#filters .chip'), function (b, _, all) {
    b.addEventListener('click', function () {
      filter = b.dataset.f;
      Array.prototype.forEach.call(document.querySelectorAll('#filters .chip'), function (x) { x.setAttribute('aria-checked', String(x === b)); });
      applyFilter(); play('tap');
    });
  });

  /* ---------- start-here picker (E-R1) ---------- */
  var answers = {};
  Array.prototype.forEach.call(document.querySelectorAll('#router [data-q]'), function (group) {
    Array.prototype.forEach.call(group.querySelectorAll('.chip'), function (b) {
      b.addEventListener('click', function () {
        answers[group.dataset.q] = b.dataset.v;
        Array.prototype.forEach.call(group.querySelectorAll('.chip'), function (x) { x.setAttribute('aria-checked', String(x === b)); });
        $('router-status').textContent = ''; play('tap');
      });
    });
  });
  function pick() {
    var limit = Number(answers.time), ln = answers.lane;
    var inSec = RES.filter(function (r) { return r.sec === answers.goal && (r.lane === 'both' || r.lane === ln); });
    var fits = function (r) { return r.min == null ? limit >= 999 : r.min <= limit; };
    var chosen = inSec.filter(function (r) { return !r.opt && fits(r); });
    if (chosen.length < 2) chosen = chosen.concat(inSec.filter(function (r) { return r.opt && fits(r); }));
    if (limit >= 999) chosen.sort(function (a, b) { return (b.min || 300) - (a.min || 300); });
    if (ln === 'iti') chosen.sort(function (a, b) { return (b.lane === 'iti') - (a.lane === 'iti'); });
    if (!chosen.length) chosen = inSec.slice().sort(function (a, b) { return (a.min || 999) - (b.min || 999); }).slice(0, 1);
    return chosen.slice(0, 3);
  }
  $('show-picks').addEventListener('click', function () {
    var miss = ['goal', 'time', 'lane'].filter(function (k) { return !answers[k]; });
    if (miss.length) { $('router-status').textContent = 'Answer all three questions first.'; return; }
    var picks = pick();
    cards.forEach(function (c) { c.classList.remove('picked'); c.querySelector('.mini.pick').hidden = true; });
    var box = $('picks'); box.innerHTML = '';
    box.appendChild(el('span', 'ph', 'Picked for you: start with ' + (picks.length > 1 ? 'these' : 'this')));
    picks.forEach(function (r, i) {
      var c = $('res-' + r.id); c.classList.add('picked'); c.querySelector('.mini.pick').hidden = false;
      var a = el('a'); a.href = '#res-' + r.id; a.appendChild(el('span', 'num', String(i + 1))); a.appendChild(document.createTextNode(r.title)); a.appendChild(el('span', '', shortTime(r) + ' · ' + r.org.split(' (')[0].split(',')[0]));
      a.addEventListener('click', function (e) { e.preventDefault(); if (filter !== 'all') document.querySelector('#filters [data-f="all"]').click(); c.open = true; c.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); c.querySelector('summary').focus({ preventScroll: true }); });
      box.appendChild(a);
    });
    box.hidden = false; play('chime');
  });

  /* ---------- tabs: current section, sticky state ---------- */
  var toolbar = $('toolbar');
  var links = Array.prototype.slice.call(document.querySelectorAll('.tabs a'));
  var secEls = links.map(function (a) { return $(a.dataset.sec); });
  function onScroll() {
    var line = toolbar.getBoundingClientRect().bottom + innerHeight * 0.25, cur = null;
    secEls.forEach(function (s) { if (s.getBoundingClientRect().top <= line) cur = s.id; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = secEls[secEls.length - 1].id;
    links.forEach(function (a) { if (a.dataset.sec === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    toolbar.classList.toggle('stuck', toolbar.getBoundingClientRect().top <= 0 && scrollY > 0);
  }
  var ticking = false;
  addEventListener('scroll', function () { if (ticking) return; ticking = true; requestAnimationFrame(function () { ticking = false; onScroll(); }); }, { passive: true });
  onScroll();
  links.forEach(function (a) { a.addEventListener('click', function () { play('tap'); var s = $(a.dataset.sec); s.classList.remove('flash'); void s.offsetWidth; s.classList.add('flash'); }); });

  /* ---------- toolkit (E-R4) ---------- */
  var drawer = $('toolkit');
  function paintToolkit() {
    var list = $('toolkit-list'); list.innerHTML = '';
    var ids = RES.filter(function (r) { return notes[r.id]; });
    ids.forEach(function (r) { var li = el('li'); li.appendChild(el('small', '', r.title)); li.appendChild(document.createTextNode(notes[r.id])); list.appendChild(li); });
    $('toolkit-empty').hidden = ids.length > 0; $('toolkit-n').textContent = ids.length;
    $('toolkit-download').disabled = !ids.length; $('toolkit-clear').disabled = !ids.length;
  }
  paintToolkit();
  var lastFocus = null;
  function openDrawer() { lastFocus = document.activeElement; drawer.hidden = false; $('toolkit-close').focus(); }
  function closeDrawer() { drawer.hidden = true; if (lastFocus) lastFocus.focus(); }
  $('toolkit-open').addEventListener('click', openDrawer);
  $('toolkit-close').addEventListener('click', closeDrawer);
  drawer.addEventListener('click', function (e) { if (e.target === drawer) closeDrawer(); });
  drawer.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
    if (e.key !== 'Tab') return;
    var f = drawer.querySelectorAll('button:not([disabled])'), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  $('toolkit-download').addEventListener('click', function () {
    var lines = ['My AI toolkit', 'Resources: First Contact', ''];
    RES.forEach(function (r) { if (notes[r.id]) lines.push('- ' + r.title + ': ' + notes[r.id]); });
    var url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/plain' }));
    var a = document.createElement('a'); a.href = url; a.download = 'my-ai-toolkit.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 8000);
  });
  $('toolkit-clear').addEventListener('click', function () {
    notes = {}; save(NOTES, notes);
    Array.prototype.forEach.call(document.querySelectorAll('.note-field input'), function (i) { i.value = ''; });
    Array.prototype.forEach.call(document.querySelectorAll('.saved'), function (s) { s.textContent = ''; });
    paintToolkit(); $('toolkit-close').focus();
  });

  addEventListener('beforeprint', function () { printing = true; cards.forEach(function (c) { c.open = true; }); });
  addEventListener('afterprint', function () { setTimeout(function () { printing = false; }, 0); });
})();
