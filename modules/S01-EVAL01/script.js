/* ====================================================================
   AAI-E-MC1-S01-EVAL01  Section Check - First Contact
   Item bank: 20 items = 10 concept slots x 2 parallel forms (A, B).
   Each attempt shows 10 items from one form; forms alternate by attempt.
   Pass = 7 of 10 (70%). Unlimited attempts. Feedback after every answer.
   Mapped PC range on every item: "PC 1.1 to 1.5" (workbook text; no PC
   definitions invented). Non-compensatory: not flagged in workbook.
   Language: English only in this build (Gujarati pending).
   All names, notes and AI outputs are fictional demonstration data.
   ==================================================================== */
const SCHEMA = 'AAI-E-MC1-S01-EVAL01';
const PC = 'PC 1.1 to 1.5';
const PASS = 7, TOTAL = 10;

const GLOSS = {
  'AI tool': 'A computer program that writes or answers when you type a request.',
  'approved': 'Allowed by your institute or college for you to use.',
  'account': 'Your own login for a tool. Only you should use it.',
  'personal details': 'Facts about a person, like phone number, address, ID number, health or password.',
  'confidential': 'Private. Only certain people are allowed to see it.',
  'syllabus': 'The official list of topics for your course.'
};

const CONCEPTS = {
  tool:   {name:'Use the right tool and account', review:'Set-up lab (LAB01)'},
  task:   {name:'Start with a small task', review:'First Contact video (VID02)'},
  privacy:{name:'Keep private details out', review:'Set-up lab (LAB01), privacy step'},
  check:  {name:'Check before you use it', review:'First Contact video (VID02), checking part'}
};

/* type: mcq | spot | order. diff: E/M/H. recall: direct-recall item flag. */
const ITEMS = [
 // Slot 1  approved tool  (scenario, easy)
 {slot:1,form:'A',lane:'ITI',type:'mcq',diff:'E',recall:false,concept:'tool',
  stem:'Ravi is an ITI trainee. His institute has given trainees one {approved} {AI tool}. A friend sends Ravi a link to a different free AI app.',
  ask:'Ravi wants help to write a workshop inventory list. What should he do?',
  options:[
   {t:'Use the approved tool with his own institute account.',ok:true},
   {t:'Use the friend\u2019s app, because it is free.',why:'Free does not mean allowed. The institute has not approved this app.'},
   {t:'Use both apps and keep the longer answer.',why:'A longer answer is not always better. The second app is still not approved.'},
   {t:'Use the friend\u2019s app, but sign up with a new email.',why:'A new email does not make the app approved.'}],
  explain:'Your institute has checked the approved tool. Using it with your own account keeps your work safe and allowed.'},
 {slot:1,form:'B',lane:'HE',type:'mcq',diff:'E',recall:false,concept:'tool',
  stem:'Meera is a first-year college student. Her college has {approved} one {AI tool} for students. A classmate says another website gives faster answers.',
  ask:'Meera wants help to plan her study week. What should she do?',
  options:[
   {t:'Use the college-approved tool with her own student account.',ok:true},
   {t:'Try the faster website once, then decide.',why:'Even one try sends her request to a tool the college has not approved.'},
   {t:'Use the faster website, but only for study plans.',why:'The type of task does not change the rule. Use the approved tool.'},
   {t:'Ask the classmate to type her request on his account.',why:'Use your own permitted account, not someone else\u2019s.'}],
  explain:'Use the tool your college approved, with your own account. Speed is not the reason to choose a tool.'},

 // Slot 2  AI is a helper  (direct recall, easy)
 {slot:2,form:'A',lane:'Both',type:'mcq',diff:'E',recall:true,concept:'task',
  stem:'', ask:'Which sentence about an {AI tool} is true?',
  options:[
   {t:'It can help with a task, but you must check what it gives you.',ok:true},
   {t:'It knows the correct answer to every question.',why:'AI tools make mistakes. An answer can sound sure and still be wrong.'},
   {t:'It means you do not need your trainer or teacher.',why:'AI does not replace your trainer, your teacher or your own skill. It only helps.'},
   {t:'Only people who are good with computers can use it.',why:'You do not need special computer skills. You can start with a small, simple task.'}],
  explain:'An AI tool is a helper. You stay in charge of the work.'},
 {slot:2,form:'B',lane:'Both',type:'mcq',diff:'E',recall:true,concept:'task',
  stem:'', ask:'What is the best way to think about an {AI tool} when you start?',
  options:[
   {t:'As a helper for small tasks. You still decide and check.',ok:true},
   {t:'As an expert whose answers are final.',why:'AI answers are not final. You decide what to keep and what to fix.'},
   {t:'As a tool only for technical experts.',why:'Anyone can start with a small, everyday task. No technical skill is needed.'},
   {t:'As a way to finish work without reading it.',why:'You must always read and check what AI gives you.'}],
  explain:'Think of AI as a practical helper. You decide, and you check.'},

 // Slot 3  safe first setup  (scenario, medium)
 {slot:3,form:'A',lane:'HE',type:'mcq',diff:'M',recall:false,concept:'tool',
  stem:'Sameer used the {approved} {AI tool} for the first time on a shared computer in the college lab. He has finished his work.',
  ask:'What should Sameer do next?',
  options:[
   {t:'Sign out of his account before he leaves.',ok:true},
   {t:'Stay signed in, so it is faster next time.',why:'The next person on this computer could open his account.'},
   {t:'Save his password in the browser for next time.',why:'A saved password on a shared computer lets other people sign in as him.'},
   {t:'Close only the tab. The account will sign out by itself.',why:'Closing a tab often does not sign you out. Use the sign-out option.'}],
  explain:'On a shared computer, always sign out. This protects your account and your work.'},
 {slot:3,form:'B',lane:'ITI',type:'mcq',diff:'M',recall:false,concept:'tool',
  stem:'Aditi is an ITI trainee in the fitter trade. She is setting up the {approved} {AI tool} for the first time. It shows an optional box: \u201cTell us about yourself.\u201d',
  ask:'What should Aditi do?',
  options:[
   {t:'Leave it empty, or write only something general like \u201cITI trainee\u201d.',ok:true},
   {t:'Write her full name, date of birth and batch number, so answers fit her.',why:'The tool does not need these details to help with simple tasks.'},
   {t:'Skip set-up and use a classmate\u2019s account that is ready.',why:'Use your own permitted account, not a classmate\u2019s.'},
   {t:'Add her phone number, in case she forgets her login.',why:'Never put your phone number into an AI tool. Ask your institute for login help.'}],
  explain:'Optional means you can skip it. If you write anything, keep it general. Keep {personal details} out.'},

 // Slot 4  choose a small routine task  (scenario, easy)
 {slot:4,form:'A',lane:'ITI',type:'mcq',diff:'E',recall:false,concept:'task',
  stem:'Joseph is an ITI trainee. He is trying the {approved} {AI tool} for the first time.',
  ask:'Which task is a good one to start with?',
  options:[
   {t:'Turn his rough notes into a neat checklist for tomorrow\u2019s practical.',ok:true},
   {t:'Decide if a machine is safe to use after a repair.',why:'Safety decisions need your instructor and proper trade checks. Do not leave them to AI.'},
   {t:'Write his record book entry and submit it without reading it.',why:'Never submit AI work without reading and checking it.'},
   {t:'Work out the marks for the whole batch.',why:'Marks are private records. Do not put them into an AI tool.'}],
  explain:'Start small and ordinary. A checklist from your own notes is easy to check.'},
 {slot:4,form:'B',lane:'HE',type:'mcq',diff:'E',recall:false,concept:'task',
  stem:'Neha is a first-year student. She is trying the {approved} {AI tool} for the first time.',
  ask:'Which task is a good one to start with?',
  options:[
   {t:'Make a simple five-day study plan from her own list of topics.',ok:true},
   {t:'Write her full assignment and submit it without reading it.',why:'Never submit AI work without reading and checking it.'},
   {t:'Write a leave letter that includes her health details.',why:'Health information is personal. Do not put it into an AI tool.'},
   {t:'Check her classmates\u2019 answers and give them marks.',why:'Marking is the teacher\u2019s job, and classmates\u2019 work is not hers to share.'}],
  explain:'Start small and ordinary. A study plan from your own topics is easy to check.'},

 // Slot 5  identify the problem in a request  (identify-the-problem, medium)
 {slot:5,form:'A',lane:'HE',type:'mcq',diff:'M',recall:false,concept:'privacy',
  stem:'Pooja types this request into the approved AI tool:',
  quote:'Write a polite email to my class group. Remind them to send the event notes by Friday. My college login password is ________ so you can send it for me.',
  ask:'What is the problem with this request?',
  options:[
   {t:'It shares her password. A password must never go into an AI tool.',ok:true},
   {t:'It is too short to get a useful email.',why:'The request is clear enough. Length is not the problem.'},
   {t:'It should not ask for a polite email.',why:'Asking for a polite tone is helpful. That part is fine.'},
   {t:'It should not say the deadline.',why:'The deadline is needed in the email. That part is fine.'}],
  explain:'Give the tool only what the task needs. A password is never needed. Keep it private.'},
 {slot:5,form:'B',lane:'ITI',type:'mcq',diff:'M',recall:false,concept:'privacy',
  stem:'Karan types this request into the approved AI tool:',
  quote:'Write a short reminder for my batch about Friday\u2019s welding practical. Tell them to bring safety goggles and record books. My Aadhaar number is ____________ for reference.',
  ask:'What is the problem with this request?',
  options:[
   {t:'It includes his Aadhaar number, which the tool does not need.',ok:true},
   {t:'It is too short to get a useful reminder.',why:'The request is clear enough. Length is not the problem.'},
   {t:'It should not mention safety goggles.',why:'Safety items are useful in a reminder. That part is fine.'},
   {t:'It should not say which day the practical is.',why:'The day is needed for the reminder. That part is fine.'}],
  explain:'Give the tool only what the task needs. ID numbers are {personal details}. Keep them out.'},

 // Slot 6  safe vs unsafe information  (scenario, medium)
 {slot:6,form:'A',lane:'ITI',type:'mcq',diff:'M',recall:false,concept:'privacy',
  stem:'Nikhil wants the AI tool to help him write a tool issue list for the workshop.',
  ask:'Which detail is safe to type in?',
  options:[
   {t:'\u201cTwo drill bits are broken. One vernier caliper is missing.\u201d',ok:true},
   {t:'The names and phone numbers of trainees who used the tools.',why:'Other people\u2019s names and phone numbers are personal details. Keep them out.'},
   {t:'The lock code for the store room.',why:'Lock codes are {confidential}. They must stay private.'},
   {t:'A photo of the instructor\u2019s attendance register.',why:'Attendance registers are institute records. Do not share them.'}],
  explain:'Share only what the task needs. Here, that is the tools and their problems.'},
 {slot:6,form:'B',lane:'HE',type:'mcq',diff:'M',recall:false,concept:'privacy',
  stem:'Fatima wants the AI tool to help her make a project checklist.',
  ask:'Which detail is safe to type in?',
  options:[
   {t:'The list of project tasks and the due date.',ok:true},
   {t:'Her group members\u2019 marks from the last test.',why:'Marks are private records. Keep them out.'},
   {t:'Her student ID and password.',why:'IDs and passwords are personal details. Never type them into an AI tool.'},
   {t:'A college budget file marked \u201cConfidential\u201d.',why:'Confidential files must not go into an AI tool.'}],
  explain:'Share only what the task needs. Here, that is the tasks and the due date.'},

 // Slot 7  spot the error in an AI output  (error spotting, hard)
 {slot:7,form:'A',lane:'HE',type:'spot',diff:'H',recall:false,concept:'check',
  stem:'Riya asked the AI tool to write a message from her notes.',
  ask:'Compare the AI answer with her notes. Which line has a mistake?',
  notes:'Science club meeting: Thursday, 4 pm, Room 12. Bring project drafts.',
  options:[
   {t:'The science club will meet this Tuesday.',ok:true},
   {t:'The meeting starts at 4 pm.',why:'This line matches the notes: 4 pm.'},
   {t:'It will be in Room 12.',why:'This line matches the notes: Room 12.'},
   {t:'Please bring your project drafts.',why:'This line matches the notes: project drafts.'}],
  explain:'The notes say Thursday. The AI wrote Tuesday. AI can change small details, so check days, times and places.'},
 {slot:7,form:'B',lane:'ITI',type:'spot',diff:'H',recall:false,concept:'check',
  stem:'Harish asked the AI tool to write a reminder from his notes.',
  ask:'Compare the AI answer with his notes. Which line has a mistake?',
  notes:'Fitter practical: Monday, 9 am, Workshop 2. Bring files and record book.',
  options:[
   {t:'The fitter practical is on Monday.',why:'This line matches the notes: Monday.'},
   {t:'It starts at 9 am.',why:'This line matches the notes: 9 am.'},
   {t:'Please come to Workshop 4.',ok:true},
   {t:'Bring your files and record book.',why:'This line matches the notes: files and record book.'}],
  explain:'The notes say Workshop 2. The AI wrote Workshop 4. AI can change small details, so check days, times and places.'},

 // Slot 8  ordering the safe workflow  (ordering, medium)
 {slot:8,form:'A',lane:'ITI',type:'order',diff:'M',recall:false,concept:'check',
  stem:'Harpreet wants AI help to make a tool issue list for the instructor.',
  ask:'Tap the steps in the right order.',
  steps:['Open the approved AI tool with the institute account.',
         'Ask for a neat list. Give only the tool names and problems.',
         'Read the list and compare it with the workshop notes.',
         'Fix any mistakes. Then give it to the instructor.'],
  explain:'Use the approved tool, ask with only the details needed, check, and only then use it.'},
 {slot:8,form:'B',lane:'HE',type:'order',diff:'M',recall:false,concept:'check',
  stem:'Sneha wants AI help to write an email to her class group about a college event.',
  ask:'Tap the steps in the right order.',
  steps:['Open the approved AI tool with the college account.',
         'Ask for a short email. Give only the event details.',
         'Check the date, time and place against the notice.',
         'Correct the draft. Then send it.'],
  explain:'Use the approved tool, ask with only the details needed, check, and only then send.'},

 // Slot 9  next best action after output  (next-best-action, hard)
 {slot:9,form:'A',lane:'HE',type:'mcq',diff:'H',recall:false,concept:'check',
  stem:'The AI tool gives Divya a study plan. One topic in the plan is not in her {syllabus}.',
  ask:'What should Divya do?',
  options:[
   {t:'Change or remove that topic using her syllabus. Then use the plan.',ok:true},
   {t:'Follow the plan. The AI may know the syllabus better.',why:'Her syllabus is the source to trust. The AI does not know her course.'},
   {t:'Delete the whole plan and stop using AI.',why:'One mistake does not make the whole plan useless. Fix it, then use it.'},
   {t:'Add more topics so the plan looks complete.',why:'More topics do not fix the wrong one. Check against the syllabus.'}],
  explain:'Check the answer against a trusted source, fix what is wrong, then use it.'},
 {slot:9,form:'B',lane:'ITI',type:'mcq',diff:'H',recall:false,concept:'check',
  stem:'The AI tool gives Imran a neat inventory list for the workshop. It looks good. His instructor needs it in 10 minutes.',
  ask:'What should Imran do?',
  options:[
   {t:'Quickly compare the list with his own count. Then send it.',ok:true},
   {t:'Send it now, because it looks neat.',why:'Neat does not mean correct. A quick check can catch a wrong number.'},
   {t:'Ask the AI tool \u201cIs this correct?\u201d and send it if it says yes.',why:'The AI cannot check against his count. Only Imran can.'},
   {t:'Send it, and tell the instructor that AI made it.',why:'Saying AI made it does not fix mistakes. Check it first.'}],
  explain:'Even when time is short, check the answer against your own information before you use it.'},

 // Slot 10  checking habit  (direct recall, easy)
 {slot:10,form:'A',lane:'Both',type:'mcq',diff:'E',recall:true,concept:'check',
  stem:'', ask:'Before you copy, send or act on an AI answer, what should you do?',
  options:[
   {t:'Read it and check it against your notes or what you know.',ok:true},
   {t:'Trust it if it sounds confident.',why:'AI can sound confident and still be wrong.'},
   {t:'Check only the spelling.',why:'Spelling matters, but names, dates and facts can also be wrong.'},
   {t:'Ask a friend to send it for you.',why:'Someone else sending it does not check it. You must read it first.'}],
  explain:'Always read and check an AI answer before you use it.'},
 {slot:10,form:'B',lane:'Both',type:'mcq',diff:'E',recall:true,concept:'check',
  stem:'', ask:'Which sentence about AI answers is true?',
  options:[
   {t:'An AI answer can sound correct and still be wrong.',ok:true},
   {t:'A long answer is always a correct answer.',why:'Length does not show correctness. Long answers can have mistakes too.'},
   {t:'Answers from an approved tool never have mistakes.',why:'Approved means allowed to use. It does not mean always correct.'},
   {t:'Only the numbers in an AI answer need checking.',why:'Names, dates, places and facts can also be wrong.'}],
  explain:'Every AI answer needs checking, even from an approved tool.'}
];
ITEMS.forEach(it=>{ it.id = SCHEMA+'-Q'+String(it.slot).padStart(2,'0')+it.form; it.pc = PC; it.lang='EN'; });

/* ---------- helpers ---------- */
const $ = s=>document.querySelector(s);
const screen = $('#screen'), sheet=$('#sheet'), sheetCard=$('#sheetCard'), pop=$('#pop'), live=$('#live'), dotsEl=$('#dots'), speakBtn=$('#speak');
const esc = s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const plain = s=>String(s||'').replace(/[{}]/g,'');
const rich = s=>esc(s||'').replace(/\{([^}]+)\}/g,(m,w)=>{
  const key = Object.keys(GLOSS).find(k=>k.toLowerCase()===w.toLowerCase());
  return key ? `<button type="button" class="term" data-term="${esc(key)}" aria-label="${esc(w)}, show meaning">${esc(w)}</button>` : esc(w);
});
const shuffle = a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const ICON = {
  check:'<svg class="i" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  checkDraw:'<svg class="i draw" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  x:'<svg class="i" viewBox="0 0 24 24"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>',
  info:'<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg>',
  list:'<svg class="i" viewBox="0 0 24 24"><path d="M9 7h10M9 12h10M9 17h10M5 7h.01M5 12h.01M5 17h.01"/></svg>',
  target:'<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/></svg>',
  repeat:'<svg class="i" viewBox="0 0 24 24"><path d="M4.5 12a7.5 7.5 0 0 1 13-5l2 2M19.5 12a7.5 7.5 0 0 1-13 5l-2-2"/><path d="M19.5 5v4h-4M4.5 19v-4h4"/></svg>',
  book:'<svg class="i" viewBox="0 0 24 24"><path d="M4.5 5.5c2.5-1 5-1 7.5.5v13c-2.5-1.5-5-1.5-7.5-.5zM19.5 5.5c-2.5-1-5-1-7.5.5v13c2.5-1.5 5-1.5 7.5-.5z"/></svg>',
  undo:'<svg class="i" viewBox="0 0 24 24" style="width:18px;height:18px"><path d="M9 7L5 11l4 4"/><path d="M5 11h9a5 5 0 0 1 0 10h-2"/></svg>',
  speaker:'<svg class="i" viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6"/></svg>'
};
const store = {
  get(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v);}catch(e){return d;}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
};
const KEY = 'aaie-mc1-s01-eval01';

/* ---------- state ---------- */
let S = {attempts:store.get(KEY+':attempts',0), passedEver:store.get(KEY+':passed',false), queue:[], i:0, results:[], form:'A'};

function buildQueue(form){
  const pick = slot=>ITEMS.find(x=>x.slot===slot && x.form===form);
  // clusters keep difficulty equivalent; order inside each cluster is random
  const order = [...shuffle([2,1]), 4, ...shuffle([3,6,5]), ...shuffle([8,7,9]), 10];
  return order.map(pick);
}

/* ---------- speech (read aloud) ---------- */
const canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
let speaking=false;
function speak(text){
  if(!canSpeak) return;
  window.speechSynthesis.cancel();
  if(speaking){speaking=false;speakBtn.setAttribute('aria-pressed','false');return;}
  const u = new SpeechSynthesisUtterance(text);
  u.lang='en-IN'; u.rate=0.9;
  const v = window.speechSynthesis.getVoices().find(v=>/en[-_]IN/i.test(v.lang));
  if(v) u.voice=v;
  u.onend=u.onerror=()=>{speaking=false;speakBtn.setAttribute('aria-pressed','false');};
  speaking=true; speakBtn.setAttribute('aria-pressed','true');
  window.speechSynthesis.speak(u);
}
function stopSpeak(){ if(canSpeak){window.speechSynthesis.cancel();} speaking=false; speakBtn.setAttribute('aria-pressed','false'); }
let speakText='';
speakBtn.addEventListener('click',()=>speak(speakText));

/* ---------- glossary popover ---------- */
document.addEventListener('click',e=>{
  const t = e.target.closest('.term');
  if(t){ e.preventDefault(); e.stopPropagation(); showPop(t); return; }
  if(!e.target.closest('#pop')) pop.hidden=true;
},true);
document.addEventListener('keydown',e=>{ if(e.key==='Escape') pop.hidden=true; });
function showPop(t){
  const k=t.dataset.term; pop.innerHTML=`<b>${esc(k)}</b>${esc(GLOSS[k])}`; pop.hidden=false;
  const r=t.getBoundingClientRect(), pw=pop.offsetWidth, ph=pop.offsetHeight;
  let x=Math.min(Math.max(10,r.left), innerWidth-pw-10), y=r.bottom+8;
  if(y+ph>innerHeight-10) y=r.top-ph-8;
  pop.style.left=x+'px'; pop.style.top=y+'px';
  live.textContent = k+': '+GLOSS[k];
}

/* ---------- progress dots ---------- */
function dots(){
  $('#ttl').innerHTML = (S.inQ && S.queue.length) ? `Question ${S.i+1} <span class="of">of ${TOTAL}</span>` : 'Section check: First Contact';
  if(!S.inQ || !S.queue.length){dotsEl.classList.remove('on');return;}
  dotsEl.classList.add('on'); $('#fill').style.width = ((S.i+1)/TOTAL*100)+'%';
}

/* ---------- screens ---------- */
function intro(){
  S.inQ=false; S.queue=[]; dots(); hideSheet();
  const n = S.attempts+1;
  speakBtn.hidden=!canSpeak;
  speakText = 'Section check. First Contact. Ten questions about using an AI tool safely. Get seven right to pass. You can try as many times as you need. There is no time limit.';
  screen.innerHTML = `
  <section class="screen intro" aria-labelledby="h">
    <h1 id="h" tabindex="-1">Check what you learned in First Contact</h1>
    <p class="lead">Ten short questions about using an AI tool safely for everyday tasks.</p>
    <ul class="facts">
      <li>${ICON.list}<span>10 questions, one at a time</span></li>
      <li>${ICON.target}<span>Get 7 right to pass</span></li>
      <li>${ICON.repeat}<span>Try as many times as you need</span></li>
    </ul>
    <div class="help">${ICON.info}<span>Tap a <button type="button" class="term" data-term="AI tool" aria-label="dotted word example, show meaning">dotted word</button> to see its meaning. ${canSpeak?'Tap the speaker at the top to hear the question.':''}</span></div>
    ${S.attempts>0?`<p class="again">This is try ${n}. You will see new examples this time.</p>`:''}
    <div class="actions"><button class="btn btn-gold" id="go" type="button">${S.attempts>0?'Start again':'Start the check'}</button></div>
  </section>`;
  $('#go').onclick=start;
  $('#h').focus({preventScroll:true});
}

function start(){
  S.attempts++; store.set(KEY+':attempts',S.attempts);
  S.form = (S.attempts % 2 === 1) ? 'A' : 'B';
  S.queue = buildQueue(S.form); S.i=0; S.results=[]; S.inQ=true;
  question();
}

function question(){
  hideSheet(); stopSpeak(); dots();
  const it = S.queue[S.i];
  let body='';
  if(it.type==='mcq' || it.type==='spot'){
    const opts = it.type==='spot' ? it.options.map((o,k)=>({...o,k})) : shuffle(it.options.map((o,k)=>({...o,k})));
    it._shown = opts;
    body = `
      ${it.type==='spot'?`<div class="notes"><span class="tag">Notes (fictional example)</span>${esc(it.notes)}</div>`:''}
      <fieldset class="opts" id="opts">
        <legend class="sr">${it.type==='spot'?'AI answer, choose the line with a mistake':'Choose one answer'}</legend>
        ${it.type==='spot'?'<span class="tag" aria-hidden="true">AI answer (fictional example)</span>':''}
        ${opts.map((o,n)=>`<label class="opt" data-k="${o.k}">
            <input type="radio" name="a" value="${o.k}">
            ${it.type==='spot'?`<span class="ln">${n+1}</span>`:''}
            <span class="mark" aria-hidden="true"></span><span>${rich(o.t)}</span></label>`).join('')}
      </fieldset>`;
  } else {
    let sh; do { sh = shuffle(it.steps.map((t,k)=>({t,k}))); } while(sh.every((s,n)=>s.k===n));
    it._shown = sh;
    body = `
      <div class="opts" id="opts" role="group" aria-label="Steps. Tap them in order.">
        ${sh.map(s=>`<button type="button" class="opt step" data-k="${s.k}" aria-label="${esc(s.t)}. Not placed."><span class="num" aria-hidden="true"></span><span>${esc(s.t)}</span></button>`).join('')}
      </div>
      <div><button type="button" class="reset" id="reset" disabled>${ICON.undo}Start over</button></div>`;
  }
  speakText = [plain(it.stem), it.quote?('The request says: '+it.quote.replace(/_+/g,'blank')):'', it.notes?('Notes: '+it.notes):'', plain(it.ask),
    ...(it.type==='order'? it.steps.map(s=>s): it._shown.map((o,n)=>'Option '+(n+1)+'. '+plain(o.t)))].filter(Boolean).join(' ');

  screen.innerHTML = `
  <section class="screen q" aria-labelledby="stem">
    <div class="q-grid"><div class="q-left">
      <h2 class="stem" id="stem" tabindex="-1">${it.stem?rich(it.stem)+' ':''}<span class="ask">${rich(it.ask)}</span></h2>
      ${it.quote?`<div class="quote"><span class="tag">Request (fictional example)</span>${esc(it.quote)}</div>`:''}
      <div class="actions" id="actA"></div>
    </div><div class="q-right">${body}</div></div>
    <div class="actions" id="actB"><button class="btn btn-gold" id="checkBtn" type="button" disabled>Check answer</button></div>
  </section>`;
  // in landscape two-column mode, move the button to the left column
  placeCheck();
  const btn = $('#checkBtn');
  if(it.type==='order'){
    let picked=[];
    const steps=[...screen.querySelectorAll('.step')];
    const sync=()=>{
      steps.forEach(b=>{const p=picked.indexOf(+b.dataset.k);b.classList.toggle('placed',p>-1);b.querySelector('.num').textContent=p>-1?p+1:'';
        b.setAttribute('aria-label',b.textContent.trim().replace(/^\d+/,'')+(p>-1?'. Placed as step '+(p+1)+'.':'. Not placed.'));});
      $('#reset').disabled=!picked.length; btn.disabled=picked.length!==it.steps.length;
    };
    steps.forEach(b=>b.onclick=()=>{ if(b.classList.contains('locked'))return; const k=+b.dataset.k,p=picked.indexOf(k);
      if(p>-1) picked.splice(p,1); else picked.push(k); sync(); live.textContent=p>-1?'Removed.':'Step '+picked.length+' placed.'; });
    $('#reset').onclick=()=>{picked=[];sync();};
    btn.onclick=()=>grade(it,picked);
  } else {
    screen.querySelectorAll('input[name=a]').forEach(r=>r.onchange=()=>{
      screen.querySelectorAll('.opt').forEach(l=>l.classList.toggle('sel',l.contains(r)&&r.checked));
      btn.disabled=false;
    });
    btn.onclick=()=>{const v=screen.querySelector('input[name=a]:checked'); if(v) grade(it,+v.value);};
  }
  $('#stem').focus({preventScroll:true});
}

const wide = matchMedia('(min-width:700px) and (min-height:780px)');
const twoCol = matchMedia('(orientation:landscape) and (max-height:520px)');
function placeCheck(){
  const b=$('#checkBtn'); if(!b) return;
  (twoCol.matches? $('#actA') : $('#actB')).appendChild(b);
  $('#actB').style.display = twoCol.matches?'none':'';
}
twoCol.addEventListener && twoCol.addEventListener('change',placeCheck);

function grade(it,ans){
  stopSpeak();
  let ok, why='', rightText='';
  const opts=[...screen.querySelectorAll('.opt')];
  if(it.type==='order'){
    ok = ans.every((k,n)=>k===n);
    opts.forEach(b=>{b.classList.add('locked');b.disabled=true;const k=+b.dataset.k,p=ans.indexOf(k);
      b.classList.remove('placed'); b.classList.add(p===k?'right':'wrong');
      b.querySelector('.num').innerHTML = p===k?ICON.check:(p+1);
      b.querySelector('.num').style.cssText = p===k?'border:0;color:var(--ok)':'border-color:var(--no);color:var(--no)';});
    $('#reset').hidden=true;
    rightText = it.steps.map((s,n)=>(n+1)+'. '+s).join('<br>');
  } else {
    const chosen = it.options[ans], correct = it.options.find(o=>o.ok);
    ok = !!chosen.ok; why = chosen.why||'';
    rightText = esc(plain(correct.t));
    opts.forEach(l=>{
      const k=+l.dataset.k; l.classList.add('locked'); l.querySelector('input').disabled=true; l.classList.remove('sel');
      const m=l.querySelector('.mark');
      if(it.options[k].ok){l.classList.add('right');m.innerHTML=ICON.check;}
      else if(k===ans){l.classList.add('wrong');m.innerHTML=ICON.x;}
      else l.classList.add('dim');
    });
  }
  S.results.push({slot:it.slot,id:it.id,concept:it.concept,ok});
  $('#checkBtn').remove();
  const last = S.i===TOTAL-1;
  const c = CONCEPTS[it.concept];
  sheetCard.innerHTML = ok ? `
    <p class="fb-h ok" id="fbh" tabindex="-1">${ICON.checkDraw}Correct.</p>
    <p class="fb-p">${rich(it.explain)}</p>
    <div class="actions"><button class="btn btn-gold" id="next" type="button">${last?'See my result':'Next question'}</button></div>`
  : `
    <p class="fb-h no" id="fbh" tabindex="-1">${ICON.x}Not the best answer.</p>
    ${why?`<p class="fb-p"><strong>Why not:</strong> ${rich(why)}</p>`:''}
    <p class="fb-p"><strong>${it.type==='order'?'The right order:':'Better answer:'}</strong>${it.type==='order'?'<br>':' '}${rightText}</p>
    <p class="fb-p">${rich(it.explain)}</p>
    <p class="fb-review">${ICON.book}<span>Look again: ${esc(c.review)}</span></p>
    <div class="actions"><button class="btn btn-gold" id="next" type="button">${last?'See my result':'Next question'}</button></div>`;
  if(wide.matches){
    const d=document.createElement('div'); d.className='fb-inline'; d.setAttribute('role','region'); d.setAttribute('aria-label','Feedback');
    d.innerHTML=sheetCard.innerHTML; sheetCard.innerHTML=''; $('#actB').replaceWith(d);
  } else sheet.hidden=false;
  speakText = (ok?'Correct. ':'Not the best answer. '+(why?'Why not: '+plain(why)+' ':'')+(it.type==='order'?'The right order: '+it.steps.join(' '):'Better answer: '+plain(it.options.find(o=>o.ok).t))+' ')+plain(it.explain);
  $('#next').onclick=()=>{S.i++; if(S.i<TOTAL) question(); else result();};
  $('#fbh').focus({preventScroll:true});
}

function hideSheet(){ sheet.hidden=true; sheetCard.innerHTML=''; }

function result(){
  hideSheet(); stopSpeak(); S.inQ=false; dots();
  const score = S.results.filter(r=>r.ok).length, passed = score>=PASS;
  if(passed){ S.passedEver=true; store.set(KEY+':passed',true); }
  const rows = Object.entries(CONCEPTS).map(([k,c])=>{
    const rs=S.results.filter(r=>r.concept===k), good=rs.filter(r=>r.ok).length, all=good===rs.length;
    return `<li>${all?`<span style="color:var(--ok)">${ICON.check}</span>`:`<span style="color:var(--no)">${ICON.book}</span>`}
      <span>${esc(c.name)}${all?'':`<small>Look again: ${esc(c.review)}</small>`}</span>
      <span class="st ${all?'ok':'no'}">${good} of ${rs.length}</span></li>`;
  }).join('');
  speakText = passed ? `You passed. You got ${score} out of ${TOTAL}.` : `You got ${score} out of ${TOTAL}. You need ${PASS} to pass. Try again with new examples.`;
  screen.innerHTML = `
  <section class="screen result" aria-labelledby="rh">
    <div class="badge ${passed?'pass':'retry'}" aria-hidden="true">${passed?ICON.checkDraw:ICON.repeat}</div>
    <div style="display:grid;gap:6px">
      <h1 id="rh" tabindex="-1">${passed?'You passed the First Contact check':'Almost there. Try once more.'}</h1>
      <p class="score">You got <b>${score} of ${TOTAL}</b> correct. ${passed?'':`You need ${PASS} to pass.`}</p>
    </div>
    <ul class="concepts">${rows}</ul>
    <p class="saved" id="saved" hidden></p>
    <div class="actions">
      ${passed
        ? `<button class="btn btn-navy" id="cont" type="button">Continue</button><button class="btn btn-quiet" id="retake" type="button">Practise again</button>`
        : `<button class="btn btn-gold" id="retake" type="button">Try again with new examples</button>`}
    </div>
  </section>`;
  const payload = {source:SCHEMA, attempt:S.attempts, form:S.form, score, total:TOTAL, passMark:PASS, passed, items:S.results.map(r=>({id:r.id,correct:r.ok}))};
  try{ window.parent && window.parent!==window && window.parent.postMessage(payload,'*'); }catch(e){}
  $('#retake').onclick=intro;
  if($('#cont')) $('#cont').onclick=()=>{ const s=$('#saved'); s.hidden=false; s.textContent='Your result is saved. You can go to the next part of the course.'; try{window.parent!==window && window.parent.postMessage({...payload,action:'continue'},'*');}catch(e){} };
  $('#rh').focus({preventScroll:true});
  live.textContent = speakText;
}

/* ---------- reviewer view: open with #review ---------- */
function review(){
  document.body.classList.add('scroll');
  $('#app').style.display='none';
  const counts = f=>{const xs=ITEMS.filter(i=>i.form===f);return {E:xs.filter(i=>i.diff==='E').length,M:xs.filter(i=>i.diff==='M').length,H:xs.filter(i=>i.diff==='H').length,R:xs.filter(i=>i.recall).length,ITI:xs.filter(i=>i.lane==='ITI').length,HE:xs.filter(i=>i.lane==='HE').length};};
  const a=counts('A'), b=counts('B');
  const fmt={mcq:'Scenario / next-best-action MCQ',spot:'Error spotting',order:'Ordering'};
  const answer = it=> it.type==='order' ? it.steps.map((s,n)=>(n+1)+'. '+s).join('<br>') : esc(plain(it.options.find(o=>o.ok).t));
  const distr = it=> it.type==='order' ? 'Any other order (all-or-nothing scoring). Steps shuffled; never shown already in order.' : it.options.filter(o=>!o.ok).map(o=>'\u2022 '+esc(plain(o.t))+' <em>'+esc(plain(o.why))+'</em>').join('<br>');
  const wrap = document.createElement('div'); wrap.className='rv';
  wrap.innerHTML = `
   <p class="mono">${SCHEMA} | Reviewer copy | v0.1 draft</p>
   <h1>Section Check: First Contact. Item bank and blueprint</h1>
   <p><a href="#" id="toLearner">Open learner view</a></p>
   <h2>Blueprint</h2>
   <ul>
    <li>Bank: 20 items = 10 concept slots x 2 parallel forms (A, B). Each attempt shows 10 items from one form. Odd attempts use Form A, even attempts Form B, so every retry shows different examples.</li>
    <li>Order: clusters fixed (start, task, privacy and setup, checking, closing recall); items shuffled inside each cluster; MCQ options shuffled each attempt.</li>
    <li>Pass mark: ${PASS} of ${TOTAL} (70 percent). Unlimited attempts. Feedback after every answer; wrong answers show why-not, the better answer, a short explanation and the asset to revisit.</li>
    <li>Mapped performance criteria on every item: <b>${PC}</b> (workbook text). No item-level PC split is claimed.</li>
    <li>Non-compensatory status: not flagged in workbook. No must-pass items are enforced.</li>
    <li>Form A: ${a.E} easy, ${a.M} medium, ${a.H} hard; ${a.R} recall (${a.R*10}%); ${a.ITI} ITI, ${a.HE} HE, ${10-a.ITI-a.HE} both. Form B: ${b.E} easy, ${b.M} medium, ${b.H} hard; ${b.R} recall (${b.R*10}%); ${b.ITI} ITI, ${b.HE} HE, ${10-b.ITI-b.HE} both.</li>
    <li>Language: English (ESL-adapted, short sentences, glossary tap-words, read-aloud in en-IN). Gujarati versions not yet produced.</li>
    <li>LMS result: on finish the page posts {source, attempt, form, score, total, passMark, passed, items[]} to the parent window.</li>
   </ul>
   <h2>Items</h2>
   <div class="wrap"><table>
    <thead><tr><th class="mono">Item ID</th><th>Form</th><th>Concept</th><th>Format</th><th>Diff.</th><th>Lane</th><th>Recall</th><th class="mono">PC range</th><th>Stem</th><th>Correct answer</th><th>Rationale</th><th>Distractor rationale</th><th>Language</th></tr></thead>
    <tbody>${ITEMS.slice().sort((x,y)=>x.slot-y.slot||x.form.localeCompare(y.form)).map(it=>`<tr>
      <td class="mono">${it.id}</td><td>${it.form}</td><td>${esc(CONCEPTS[it.concept].name)}</td><td>${fmt[it.type]}</td><td>${it.diff}</td><td>${it.lane}</td><td>${it.recall?'Yes':'No'}</td><td class="mono">${PC}</td>
      <td>${esc(plain(it.stem))} ${it.quote?'<br><em>Request: '+esc(it.quote)+'</em>':''}${it.notes?'<br><em>Notes: '+esc(it.notes)+'</em>':''}<br><b>${esc(plain(it.ask))}</b></td>
      <td>${answer(it)}</td><td>${esc(plain(it.explain))}</td><td>${distr(it)}</td><td>EN (GU pending)</td></tr>`).join('')}</tbody>
   </table></div>
   <h2>Change log</h2>
   <ul><li>v0.1 (07 Oct 2026): first English learner build and reviewer copy. Gujarati, LMS package format and post-pilot item analysis pending.</li></ul>`;
  document.body.appendChild(wrap);
  wrap.querySelector('#toLearner').onclick=e=>{e.preventDefault();location.hash='';location.reload();};
}

if(location.hash==='#review') review(); else intro();
