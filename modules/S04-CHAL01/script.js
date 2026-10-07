/* ============================================================
   Swift AI Academy | AAI-E-MC1-S04-CHAL01
   Checkpoint 1: Use It, and Check It  (Challenge Day, CHAL, 1.00 h)
   Mapped PCs: All PCs in this micro-credential
   Non-compensatory: All gates in this unit apply
   ------------------------------------------------------------
   One file, no build step, no network calls. Work is saved on
   this device only (localStorage), so a refresh never loses it.
   The answer key below is encoded so it is not readable at a
   glance. It is NOT secure. For live delivery, keep this device
   with the assessor between candidates.
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- configuration ---------------- */
  var CONFIG = {
    schema: 'AAI-E-MC1-S04-CHAL01',
    title: 'Checkpoint 1: Use It, and Check It',
    module: 'Use an approved AI tool to complete a routine task and check the result before using it',
    section: '1.4 Checkpoint Assessment',
    pcs: 'All PCs in this micro-credential',
    gates: 'All gates in this unit apply',
    readSec: 5 * 60,       // 0:00 to 5:00 read
    workEndSec: 25 * 60,   // 5:00 to 25:00 make and check
    totalSec: 30 * 60,     // 25:00 to 30:00 submit evidence
    wordLimit: 80,
    passPct: 70,           // PROPOSED: mirrors the 70 percent mastery standard used for EVAL. Confirm before release.
    storageKey: 'saa-mc1-chal01-v1'
  };

  var WEIGHTS = { task: 20, request: 20, checking: 25, correction: 25, evidence: 10 };

  var STEP_NAMES = ['Read', 'Check the draft', 'Ask the AI', 'Improve', 'Finish', 'Submit'];

  /* ---------------- icons (single line, 1.75 stroke) ---------------- */
  var P = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.2 9.2a2.9 2.9 0 0 1 5.6 1c0 1.9-2.8 2.6-2.8 2.6M12 16.6h.01"/>',
    right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    doc: '<path d="M14 3H6.5A2.5 2.5 0 0 0 4 5.5v13A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    play: '<path d="M7 5l12 7-12 7z"/>',
    offline: '<path d="M3 3l18 18M8.6 16.4a5 5 0 0 1 6.8 0M5.2 12.9a10 10 0 0 1 4.3-2.4M18.8 12.9a10 10 0 0 0-1.7-1.3M2 9a15 15 0 0 1 4-2.6M22 9a15 15 0 0 0-8.4-3.9M12 20h.01"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    print: '<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15.4-6.4L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.4 6.4L3 16M3 21v-5h5"/>',
    pen: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    book: '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5c.8 0 1.5-.7 1.5-1.5z"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    gate: '<path d="M4 21V8l8-5 8 5v13"/><path d="M9 21v-7h6v7"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>'
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (P[name] || '') + '</svg>';
  }

  /* ---------------- task variants (fictional practice data) ----------------
     Every variant follows the same pattern so difficulty is controlled:
     7 draft lines, 1 planted claim that is not in the fact sheet,
     1 harmless line, 1 fact left out, 89 to 100 words, target 80 or fewer. */
  var ITI_ORG = 'Government ITI Sundarpur';
  var HE_ORG = 'Sardar Nagar College';

  var VARIANTS = {
    'ITI-A': {
      lane: 'iti', letter: 'A', org: ITI_ORG,
      title: 'Tool room stock check notice',
      scenario: 'You are a trainee in the Fitter trade, 2nd year, Batch B. Your instructor, Ms. Kavita Rao, needs a short notice for the batch WhatsApp group.',
      job: 'Make a short notice about the tool room stock check.',
      standard: ['Correct date, time and place', 'What to bring and what to wear', 'What to do about a missing tool', '80 words or fewer', 'Polite and easy to read', 'Only facts from the fact sheet'],
      facts: [
        ['What', 'Stock check of hand tools'],
        ['Who', 'Fitter trade, 2nd year, Batch B'],
        ['Date', 'Saturday, 14 November 2026'],
        ['Time', '10:00 am to 12:30 pm'],
        ['Place', 'Tool Room 2'],
        ['Bring', 'Tool issue record book and a pen'],
        ['Wear', 'Uniform and safety shoes'],
        ['Missing tool', 'Tell the store keeper, Mr. Anil Verma, before Friday, 13 November, 5:00 pm'],
        ['Questions', 'Ms. Kavita Rao, Instructor']
      ],
      author: 'Rohan',
      draft: [
        'Dear trainees of Batch B, a stock check of hand tools will be held in Tool Room 2.',
        'It is on Saturday, 14 November 2026, from 10:00 am to 12:30 pm.',
        'Please bring your tool issue record book and a pen.',
        'If any tool is missing, tell the store keeper, Mr. Anil Verma, before Friday, 13 November, 5:00 pm.',
        'Any trainee with a missing tool will pay a fine of \u20B9500 at the ITI office.',
        'Kindly note that this is very important and everybody must attend on time without fail.',
        'For any questions, please contact Ms. Kavita Rao, Instructor.'
      ],
      offline: {
        ask: 'Notice: Tool Room Stock Check\n\nDear Batch B trainees,\n\nA stock check of hand tools will be held in Tool Room 2 on Saturday, 14 November 2026, from 10:00 am to 12:30 pm.\n\n- Bring your tool issue record book and a pen.\n- If a tool is missing, inform the store keeper, Mr. Anil Verma, before Friday, 13 November, 5:00 pm.\n- Any trainee with a missing tool will pay a fine of \u20B9500.\n\nFor questions, contact Ms. Kavita Rao, Instructor.',
        improve: 'Tool Room Stock Check: Batch B\n\nDate: Saturday, 14 November 2026\nTime: 10:00 am to 12:30 pm\nPlace: Tool Room 2\n\n- Bring your tool issue record book and a pen.\n- Wear your uniform and safety shoes.\n- Missing tool? Tell the store keeper, Mr. Anil Verma, before Friday, 13 November, 5:00 pm. A fine of \u20B9500 applies for missing tools.\n\nQuestions: Ms. Kavita Rao, Instructor.'
      }
    },
    'ITI-B': {
      lane: 'iti', letter: 'B', org: ITI_ORG,
      title: 'Industrial visit notice',
      scenario: 'You are a trainee in the Electrician trade, 1st year, Batch A. Your instructor, Mr. Suresh Patil, needs a short notice for the batch WhatsApp group.',
      job: 'Make a short notice about the industrial visit.',
      standard: ['Correct date, bus time and return time', 'What to bring and what to wear', 'The photo rule and the consent form', '80 words or fewer', 'Polite and easy to read', 'Only facts from the fact sheet'],
      facts: [
        ['What', 'Industrial visit to Nirmal Motor Works'],
        ['Who', 'Electrician trade, 1st year, Batch A'],
        ['Date', 'Thursday, 19 November 2026'],
        ['Bus leaves', 'ITI main gate at 8:30 am'],
        ['Back at ITI', 'By 3:00 pm'],
        ['Bring', 'ITI ID card, notebook, pen and lunch box'],
        ['Wear', 'Uniform and safety shoes'],
        ['Rule', 'No photos inside the factory'],
        ['Consent form', 'Give it to Mr. Suresh Patil by Tuesday, 17 November'],
        ['Questions', 'Mr. Suresh Patil, Instructor']
      ],
      author: 'Deepak',
      draft: [
        'Hello Batch A, we are going on an industrial visit to Nirmal Motor Works on Thursday, 19 November 2026.',
        'The bus will leave from the ITI main gate at 8:30 am, and we will be back by 3:00 pm.',
        'Please bring your ITI ID card, notebook, pen and lunch box.',
        'The company will give a visit certificate to every trainee at the end of the day.',
        'Wear your uniform and safety shoes. Photos are not allowed inside the factory.',
        'This visit is a great chance to learn.',
        'For any questions, please contact Mr. Suresh Patil, Instructor.'
      ],
      offline: {
        ask: 'Industrial Visit: Batch A\n\nDear trainees,\n\nWe will visit Nirmal Motor Works on Thursday, 19 November 2026. The bus leaves the ITI main gate at 8:30 am and returns by 3:00 pm.\n\n- Bring your ITI ID card, notebook, pen and lunch box.\n- Wear your uniform and safety shoes.\n- No photos inside the factory.\n- Every trainee will get a visit certificate from the company.\n\nFor questions, contact Mr. Suresh Patil, Instructor.',
        improve: 'Industrial Visit: Batch A\n\nDate: Thursday, 19 November 2026\nBus: ITI main gate, 8:30 am. Back by 3:00 pm.\n\n- Bring: ITI ID card, notebook, pen, lunch box.\n- Wear: uniform and safety shoes.\n- No photos inside the factory.\n- Give your consent form to Mr. Suresh Patil by Tuesday, 17 November.\n- You will get a visit certificate at the end of the day.\n\nQuestions: Mr. Suresh Patil, Instructor.'
      }
    },
    'ITI-C': {
      lane: 'iti', letter: 'C', org: ITI_ORG,
      title: 'Practical class change notice',
      scenario: 'You are a trainee in the Turner trade, 2nd year, Batch C. Your instructor, Ms. Farzana Khan, needs a short notice for the batch WhatsApp group.',
      job: 'Make a short notice about the change in the practical class.',
      standard: ['Correct dates, times and rooms', 'What to bring and what to wear', 'Where the practical class moves to', '80 words or fewer', 'Polite and easy to read', 'Only facts from the fact sheet'],
      facts: [
        ['What', 'Machine shop closed for maintenance'],
        ['Who', 'Turner trade, 2nd year, Batch C'],
        ['Closed on', 'Wednesday, 18 November 2026. No practical class that day.'],
        ['Instead', 'Theory class in Room 12 at 9:30 am'],
        ['Bring', 'Drawing book and calculator'],
        ['Make-up practical', 'Saturday, 21 November 2026, 9:30 am, Machine Shop'],
        ['Wear on Saturday', 'Uniform and safety shoes'],
        ['Questions', 'Ms. Farzana Khan, Instructor']
      ],
      author: 'Vikram',
      draft: [
        'Dear Batch C, the machine shop will be closed for maintenance on Wednesday, 18 November 2026.',
        'There will be no practical class on that day.',
        'Instead, please come to Room 12 at 9:30 am for a theory class.',
        'The practical class will happen on Saturday, 21 November 2026, at 9:30 am in the Machine Shop.',
        'Attendance in the Saturday class will be counted double in your record.',
        'Please wear your uniform and safety shoes on Saturday, and ask Ms. Farzana Khan if you have any questions.',
        'We hope everyone will understand and cooperate with this change.'
      ],
      offline: {
        ask: 'Notice: Change in Practical Class, Batch C\n\nThe machine shop is closed for maintenance on Wednesday, 18 November 2026. There is no practical class that day.\n\n- Theory class: Room 12, 9:30 am.\n- Make-up practical: Saturday, 21 November 2026, 9:30 am, Machine Shop.\n- Saturday attendance will be counted double.\n- Wear uniform and safety shoes on Saturday.\n\nQuestions: Ms. Farzana Khan, Instructor.',
        improve: 'Batch C: Practical Class Change\n\nWednesday, 18 November 2026: Machine shop closed. No practical.\nTheory class instead: Room 12, 9:30 am. Bring your drawing book and calculator.\n\nSaturday, 21 November 2026: Practical class, 9:30 am, Machine Shop. Wear uniform and safety shoes. Attendance on Saturday counts double.\n\nQuestions: Ms. Farzana Khan, Instructor.'
      }
    },
    'HE-A': {
      lane: 'he', letter: 'A', org: HE_ORG,
      title: 'Library orientation notice',
      scenario: 'You are a first-year student in Section A. Your class representative asks you to write a short notice for the class WhatsApp group.',
      job: 'Make a short notice about the library orientation.',
      standard: ['Correct date, time and place', 'What to bring', 'When to return the library card form', '80 words or fewer', 'Polite and easy to read', 'Only facts from the fact sheet'],
      facts: [
        ['What', 'Library orientation session'],
        ['Who', 'First-year students, Section A'],
        ['Date', 'Monday, 16 November 2026'],
        ['Time', '11:00 am to 12:00 pm'],
        ['Place', 'Seminar Hall 2'],
        ['Bring', 'College ID card'],
        ['At the session', 'Library card forms will be given out'],
        ['Form last date', 'Return it to the library counter by Friday, 20 November 2026'],
        ['Questions', 'Ms. Neha Joshi, Librarian']
      ],
      author: 'Aarti',
      draft: [
        'Dear friends of Section A, there is a library orientation session for all first-year students.',
        'It will be on Monday, 16 November 2026, from 11:00 am to 12:00 pm in Seminar Hall 2.',
        'Please bring your college ID card.',
        'Library card forms will be given out at the session.',
        'Students who miss this session cannot borrow library books for the whole semester.',
        'It will be a very useful session for all of us, so please do come on time.',
        'For any questions, please contact Ms. Neha Joshi, our Librarian.'
      ],
      offline: {
        ask: 'Library Orientation: Section A\n\nDear classmates,\n\nThere is a library orientation session for first-year students on Monday, 16 November 2026, from 11:00 am to 12:00 pm in Seminar Hall 2.\n\n- Bring your college ID card.\n- Library card forms will be given at the session.\n- If you miss the session, you cannot borrow books this semester.\n\nFor questions, contact Ms. Neha Joshi, Librarian.',
        improve: 'Library Orientation: Section A\n\nDate: Monday, 16 November 2026\nTime: 11:00 am to 12:00 pm\nPlace: Seminar Hall 2\n\n- Bring your college ID card.\n- Collect your library card form at the session and return it to the library counter by Friday, 20 November 2026.\n- Students who miss the session cannot borrow books this semester.\n\nQuestions: Ms. Neha Joshi, Librarian.'
      }
    },
    'HE-B': {
      lane: 'he', letter: 'B', org: HE_ORG,
      title: 'Tree plantation drive notice',
      scenario: 'You are a first-year student and a volunteer in the college NSS unit. The NSS coordinator asks you to write a short notice for the volunteers\u2019 WhatsApp group.',
      job: 'Make a short notice about the tree plantation drive.',
      standard: ['Correct date, time and meeting place', 'What to bring and what to wear', 'How and when to register', '80 words or fewer', 'Polite and easy to read', 'Only facts from the fact sheet'],
      facts: [
        ['What', 'Campus tree plantation drive'],
        ['Who', 'First-year NSS volunteers'],
        ['Date', 'Saturday, 21 November 2026'],
        ['Time', '7:30 am to 10:00 am'],
        ['Meet at', 'College main gate'],
        ['Bring', 'Water bottle and cap'],
        ['Wear', 'Comfortable shoes'],
        ['Register', 'Give your name to your class coordinator by Thursday, 19 November'],
        ['Questions', 'Prof. Imran Shaikh, NSS Coordinator']
      ],
      author: 'Sneha',
      draft: [
        'Dear NSS volunteers, this is to inform you that our college is holding a tree plantation drive on our campus.',
        'It is on Saturday, 21 November 2026, from 7:30 am to 10:00 am.',
        'We will meet at the college main gate.',
        'Every volunteer will get 2 extra marks in internal assessment for joining.',
        'Please bring a water bottle and a cap, and wear comfortable shoes.',
        'Let us all come together and make our campus green and beautiful for everyone.',
        'For any questions, please contact Prof. Imran Shaikh, NSS Coordinator.'
      ],
      offline: {
        ask: 'Tree Plantation Drive: NSS\n\nDear volunteers,\n\nJoin our campus tree plantation drive on Saturday, 21 November 2026, from 7:30 am to 10:00 am. We will meet at the college main gate.\n\n- Bring a water bottle and a cap.\n- Wear comfortable shoes.\n- Every volunteer gets 2 extra marks in internal assessment.\n\nFor questions, contact Prof. Imran Shaikh, NSS Coordinator.',
        improve: 'NSS Tree Plantation Drive\n\nDate: Saturday, 21 November 2026\nTime: 7:30 am to 10:00 am\nMeet at: College main gate\n\n- Bring a water bottle and a cap. Wear comfortable shoes.\n- Register: give your name to your class coordinator by Thursday, 19 November.\n- Volunteers get 2 extra marks in internal assessment.\n\nQuestions: Prof. Imran Shaikh, NSS Coordinator.'
      }
    },
    'HE-C': {
      lane: 'he', letter: 'C', org: HE_ORG,
      title: 'Assignment reminder',
      scenario: 'You are a first-year student in Section B. Your Environmental Studies teacher asks you to write a short reminder for the class WhatsApp group.',
      job: 'Make a short reminder about the assignment.',
      standard: ['Correct topic, length and cover page', 'Correct last date and time', 'Where to submit', '80 words or fewer', 'Polite and easy to read', 'Only facts from the fact sheet'],
      facts: [
        ['Subject', 'Environmental Studies assignment'],
        ['Who', 'First-year students, Section B'],
        ['Topic', 'Water use in our college'],
        ['Length', '4 to 5 handwritten pages'],
        ['Cover page', 'Your name, roll number and section'],
        ['Last date', 'Friday, 20 November 2026, 4:00 pm'],
        ['Submit at', 'Department office, Room 104'],
        ['Questions', 'Dr. Meera Iyer, Subject teacher']
      ],
      author: 'Karan',
      draft: [
        'Dear Section B, this is a friendly reminder about our Environmental Studies assignment that is due soon.',
        'The topic is \u201CWater use in our college\u201D.',
        'It must be 4 to 5 handwritten pages, with a cover page showing your name, roll number and section.',
        'The last date is Friday, 20 November 2026, at 4:00 pm.',
        'Late assignments will lose 5 marks for every day after the last date.',
        'Please do your best work and make sure you submit it on time.',
        'For any questions, please ask Dr. Meera Iyer.'
      ],
      offline: {
        ask: 'Reminder: Environmental Studies Assignment\n\nDear Section B,\n\n- Topic: Water use in our college\n- Length: 4 to 5 handwritten pages\n- Cover page: name, roll number and section\n- Last date: Friday, 20 November 2026, 4:00 pm\n- Late assignments lose 5 marks for each day.\n\nFor questions, ask Dr. Meera Iyer.',
        improve: 'Reminder: EVS Assignment, Section B\n\nTopic: Water use in our college\nLength: 4 to 5 handwritten pages, with a cover page (name, roll number, section)\nSubmit at: Department office, Room 104\nLast date: Friday, 20 November 2026, 4:00 pm\nLate submissions lose 5 marks per day.\n\nQuestions: Dr. Meera Iyer.'
      }
    }
  };

  /* ---------------- assessor-only key (encoded) ---------------- */
  var KEY = (function (blob) {
    try {
      var b64 = blob.split('').reverse().join('');
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    } catch (e) { return {}; }
  })('==Qf91lIlNWamZ2bgQnbl1GdyFGclRmIgwiI0ATMisFI6IyckJ3bXdmbpN3cp1mIgwiI0ATMg02bvJFIsU2YpZmZvBCduVWb0JXYwVGRgoDdhBCdp1mY1NlIgojIn5WazNXatJCIs0lIy9mZgM3ayFWbiACLiIXZwBycrJXYtJCIsIycrJXYtBSNiACLiU2cvxmIbBiOiMHZy92ViFmZiACLi4Se0xWYuVGcgknbhBCZkFGI09mbg8GRg4SZulGbgUGa0BSZ29WblJlIgojIu9Wa0NWYiACLi4Cbhl2YpZmZvByck5WdvNHI0FGa0BSZsVncgEGIkVGZkFGIJFEIlhGVg4Se0xWYuVGcgUGdhxGIhBCd19mYhByZulGa09mbgMXehNHI0VWZoNHI0NWYmBSZoRlIgojI5h2diACLi4SZ0FGZgQ3chxGIlhGdgIXZ0ZWYgkXYkBSeyVmdlBicvZGIztmch1GI1ASZz9GbgwGbpdHIzRnbl1mbnl2czFGIlRXYMJCI6ISbpFGbjJCIsQDI6IiYhZmIgwSXis2biACLiwWYyRXdl5mIgwiIiFmZiACLis2biACLis2biACLis2biACLis2bisFI6Iycl5WasJyegojID1SRIJCIs0XXiIXZi1WZ29mbgkTMiACLiIXZ0NXanVmcisFI6IyckJ3bXdmbpN3cp1mIgwiIyVmYtVmdv5EI5EDIskXYkNnc1hGVgknYgI3b0FmbpRmcv92YgM3chx2YgIXdvlHIvRHIl1WYuBic19WegUmdpdGI6IXZ0NXanVmUiAiOicmbpN3cp1mIgwSXiQnbl12czV2czFGIsFmbyVGdulmIgwiIztmch1GIyICIsIycrJXYtBSYyRHelJyWgojIzRmcvdlYhZmIgwiIuM3ayFWbgknbhBSZzlWbvJHcgQ3buBybEBiLl5WasBSZoRHIlZ3btVmUiAiOi42bpR3YhJCIsIiLsFWZyByck5WdvNHI0FGa0BSZzlWbvJHcgEGIkVGZkFGIJFEIlhGVg4ycrJXYtBCd19mYhByZulGa09mbgMXehNHI0VWZoNHI0NWYmBSZoRlIgojI5h2diACLi4yZulmbp9magI3bmBCduVWbzNXZzNXYgwWYuJXZ05Wag4WagM3ayFWbgEmc0hXZgIDI0V2ZgwGbpdHIyVWZ05Wds9mdgknclZXRiAiOi0Wahx2YiACLzAiOiIWYmJCIs0lIr9mIgwiIsFmc0VXZuJCIsIyavJCIsIiYhZmIgwiIr9mIgwiIr9mIgwiIr9mIbBiOiMXZulGbisHI6IiQtUESiACL91lIyVmYtVmdv5GIwIjIgwiIyVGduV3bjJyWgojIzRmcvd1Zul2czlWbiACLiYjMwIDIyVmYtVmdv5EIwIDIskXYklmcGBSeiBiclRnb192YgknchJnYpxGIlhGdg8GdgQXag4mc1RXZyBiOlRXYkBCdzFGbg0mcvZkIgojIn5WazNXatJCIs0lIyVGdzVWblNHIzlGa0JCIsIiclR3cl1WZzBSZs9Ga3JCIsIydvJncvJGI09mbuF2YisFI6IyckJ3bXJWYmJCIsIiL5RHbh5WZwBSeuFGIkRWYgQ3buBybEBiLl5WasBSZoRHIlZ3btVmUiAiOi42bpR3YhJCIsIiLsFWajlmZm9GIzRmb192cgQXYoRHIlxWdyBSYgQWZkRWYgkUQgUGaUBiLuFmYgcmbpd3byJ3biBSYgQXdvJWYgcmbphGdv5GIzlXYzBCdlVGazBCdjFmZgUGaUJCI6ISeodnIgwiIuIXZ0NXZtV2cgUGbvh2dgUGa0BicvZGIzt2bvJGI5JXYyJWasBydvJncvJGI09mbuF2Yg42bpN3clNHIzlGa0ByczlWbg8Ga3Byc05WZkVHdTJCI6ISbpFGbjJCIsQDI6IiYhZmIgwSXis2biACLiwWYyRXdl5mIgwiIiFmZiACLis2biACLis2biACLis2biACLis2bisFI6Iycl5WasJyegojIB1SRIJCIs0XXiI3b0FGb1NGbhNmIgwiIn5Wa3FmckJyWgojIzRmcvd1Zul2czlWbiACLiI3b0FGb1NGbhNGIk5WYgs2bvJGIn5Wa3FmckBiOn5WayJkIgojIn5WazNXatJCIs0lIlxmY19GZisFI6IyckJ3bXJWYmJCIsIiLkVGduV3bjBycpBSZj5WYk5WZ0RXYgc3boBCd19mYhByZulGa0lnbhBSehNHI09mbg8GRg4SZulGbgUGa0BSZ29WblJlIgojIu9Wa0NWYiACLi4Cbhl2YpZmZvByck5WdvNHI0FGa0BSZsVncgEGIkVGZkFGIJFEIlhGVg4SZj5WYk5WZ0RXYgUGbiV3bkBCd19mYhByZulGa09mbgMXehNHI0VWZoNHI0NWYmBSZoRlIgojI5h2diACLi4CZy92YlJHIyV3b5BibpBSZsJWdvRGIkVGduV3bjBSZiBCbsl2dgM3chx2YgkXYkJXd0F2UgUGa0BibpBSZj5WYk5WZ0RXQiAiOi0Wahx2YiACL0AiOiIWYmJCIs0lIsFmc0VXZuJCIsIyavJCIsIiYhZmIgwiIr9mIgwiIr9mIgwiIr9mIgwiIr9mIbBiOiMXZulGbisHI6IyQtkEVJJCIs0XXiQnblNnbvNmIbBiOiMHZy92Vn5WazNXatJCIsIiclJWblZ3bOByNxACL5FGZzVWdUBSeiBCbpRXYQBCazVmc1NFIuIXTg8GdgQXagUmdpdGI60mcvZGI05WZz52bDJCI6IyZul2czlWbiACLdJSZ0F2YpZWa0JXZjJyWgojIzRmcvdlYhZmIgwiIuUGdhNWamlGdyV2YgEGIlNXat9mcwBCdv5GIvREIuUmbpxGIlhGdgUmdv1WZSJCI6IibvlGdjFmIgwiIuwWYlJHIzRmb192cgQXYoRHIlNXat9mcwBSYgQWZkRWYgkUQgUGaUBiLlRXYjlmZpRnclNGIhBCd19mYhByZulGa09mbgMXehNHI0VWZoNHI0NWYmBSZoRlIgojI5h2diACLi4SehRGIlhGdgY2bgQmblBSZoRHI0FGIlVmbpFmc0BSeyVmdlByb0BSZ0F2YpZWa0JXZjBCdpNXa2BSYgUmdpdGIsxWa3BSeuFGct92YgUGaUJCI6ISbpFGbjJCIsMDI6IiYhZmIgwSXis2biACLiwWYyRXdl5mIgwiIr9mIgwiIiFmZiACLis2biACLis2biACLis2bisFI6Iycl5WasJyegojIC1SSUlkIgwSfdJSZvh2cisFI6IyckJ3bXdmbpN3cp1mIgwiIzV2boNHI5RXZmF2cgQmbhBSby9mZp5WdgojchV2ViAiOicmbpN3cp1mIgwSXiY2bgUmbpZmIgwiIwATNiACLiADM1krgiLyWgojIzRmcvdlYhZmIgwiIuQnb19WbhBicvBSZulmZgknbhBCZkFGI09mbg8GRg4SZulGbgUGa0BSZ29WblJlIgojIu9Wa0NWYiACLi4Cbhl2YpZmZvByck5WdvNHI0FGa0BSZsVncgEGIkVGZkFGIJFEIlhGVg4SZulmZgEGI0V3biFGIn5WaoR3buByc5F2cgQXZlh2cgQ3YhZGIlhGViAiOikHa3JCIsIiLlNWamZ2bgkEVJBSZoRHI0FGIwATN5Ko4gY2bgUmbpZGIhBSehBHIsxWa3BCbv9GdgcmbpN3cp1GIhBCa0l2dgUWZulWYyRHI55WQiAiOi0Wahx2YiACL0AiOiIWYmJCIs0lIr9mIgwiIsFmc0VXZuJCIsIiYhZmIgwiIr9mIgwiIr9mIgwiIr9mIgwiIr9mIbBiOiMXZulGbisHI6ISQtkEVJJye');

  /* ---------------- rubric ---------------- */
  var CRITERIA = [
    { id: 'task', name: 'Task completion', anchors: [
      'No usable notice was produced.',
      'One key fact is missing or wrong, or the notice is well over 80 words.',
      'All key facts are correct. One small issue with length or wording.',
      'Every fact from the fact sheet is there and correct. 80 words or fewer. Clear and polite.'
    ] },
    { id: 'request', name: 'Request quality: framing and refining', anchors: [
      'No request recorded, or the AI tool was not used.',
      'The request is vague (for example \u201Cwrite a notice\u201D), or the follow-up is general (\u201Cmake it better\u201D).',
      'The first request is clear and has most parts. The follow-up asks for a specific change.',
      'The first request gives a role, context, task and format, and gives the AI the facts. The follow-up names a specific fix and the answer improves.'
    ] },
    { id: 'checking', name: 'Checking process', anchors: [
      'No checking recorded.',
      'Some lines checked, but the planted line was marked as matching, or many lines were left unmarked.',
      'The planted line was flagged. One correct line was wrongly flagged, or one line was left unmarked.',
      'Every line marked. The planted line flagged. No correct line flagged as wrong. The final was checked against the fact sheet.'
    ] },
    { id: 'correction', name: 'Correction quality', anchors: [
      'The planted claim is still in the final notice.',
      'The planted claim was removed without a reason, or softened but still there in meaning.',
      'The planted claim was removed with a reason. One small fact issue remains.',
      'The planted claim was removed and the reason says it is not in the fact sheet. The missing fact was added. No new errors.'
    ] },
    { id: 'evidence', name: 'Evidence submission', anchors: [
      'Nothing usable was submitted.',
      'Two or more items are missing. Changes are hard to trace.',
      'One item is thin, but the record still shows what the AI produced and what the learner changed.',
      'Both requests, both AI answers, the final notice and the change note are present and readable.'
    ] }
  ];
  var LEVEL_NAMES = ['Not shown', 'Developing', 'Meets', 'Strong'];

  /* ---------------- state ---------------- */
  function blank() {
    return {
      v: 1,
      screen: 'setup',
      setup: { learnerId: '', assessor: '', centre: '', lane: 'iti', variant: '', tool: '', mode: 'online', pin: '' },
      attempt: 1, prevVariants: [],
      step: 1, maxStep: 1,
      startedAt: null, pausedAt: null, pausedTotal: 0, fired: {}, locked: false,
      confBefore: null, confAfter: null,
      marks: [], missing: { ans: null, text: '' },
      req1: { mode: 'builder', role: '', context: '', task: '', format: '', extra: '', free: '', facts: false, draft: false },
      ans1: '', req2: '', ans2: '', finalText: '', finalSeeded: false, showDiff: false,
      ticks: [],
      note: { removed: '', removedWhy: '', added: '', addedWhy: '' },
      offline: { ask: false, improve: false },
      log: [], obs: [],
      submittedAt: null, elapsedAtSubmit: null, autoSubmitted: false,
      scoring: { levels: {}, gate: { detected: null, corrected: null, others: null }, independent: null, notes: '', moderation: '', decision: null, decidedAt: null },
      aTab: 'evidence'
    };
  }

  var S = load();
  var assessorOpen = false;     // session only: assessor view needs the PIN after any reload
  var pinCallback = null;
  var saveTimer = null;

  function load() {
    try {
      var raw = localStorage.getItem(CONFIG.storageKey);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && o.v === 1) return merge(blank(), o);
      }
    } catch (e) { /* storage blocked or empty: start fresh */ }
    return blank();
  }
  function merge(base, o) {
    Object.keys(o).forEach(function (k) {
      if (o[k] && typeof o[k] === 'object' && !Array.isArray(o[k]) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
        base[k] = merge(base[k], o[k]);
      } else { base[k] = o[k]; }
    });
    return base;
  }
  function save() {
    try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(S)); } catch (e) { /* ignore */ }
  }
  function saveSoon() { clearTimeout(saveTimer); saveTimer = setTimeout(save, 300); }

  function getPath(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, S);
  }
  function setPath(path, val) {
    var parts = path.split('.');
    var o = S;
    for (var i = 0; i < parts.length - 1; i++) {
      if (o[parts[i]] == null) o[parts[i]] = /^\d+$/.test(parts[i + 1]) ? [] : {};
      o = o[parts[i]];
    }
    o[parts[parts.length - 1]] = val;
  }

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function V() { return VARIANTS[S.setup.variant]; }
  function K() { return KEY[S.setup.variant] || {}; }
  function tool() { return S.setup.tool || 'the approved AI tool'; }
  function words(t) { var m = String(t || '').trim().match(/\S+/g); return m ? m.length : 0; }
  function mmss(sec) {
    sec = Math.max(0, Math.ceil(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }
  function clock(ts) {
    if (!ts) return '';
    var d = new Date(ts);
    return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  function hasAny(text, list) {
    var t = String(text || '').toLowerCase();
    return (list || []).some(function (w) { return t.indexOf(String(w).toLowerCase()) !== -1; });
  }
  function laneLabel(l) { return l === 'iti' ? 'ITI trade lane' : 'Higher education lane'; }

  function elapsed() {
    if (!S.startedAt) return 0;
    var now = Date.now();
    var paused = S.pausedTotal + (S.pausedAt ? now - S.pausedAt : 0);
    return Math.max(0, (now - S.startedAt - paused) / 1000);
  }
  function log(msg) {
    S.log.push({ t: Date.now(), e: Math.round(elapsed()), msg: msg });
  }

  function req1Text() {
    var r = S.req1, v = V(), out = [];
    if (r.mode === 'free') {
      if (r.free.trim()) out.push(r.free.trim());
    } else {
      if (r.role.trim()) out.push('You are ' + r.role.trim().replace(/\.$/, '') + '.');
      if (r.context.trim()) out.push('Context: ' + r.context.trim());
      if (r.task.trim()) out.push('Task: ' + r.task.trim());
      if (r.format.trim()) out.push('Format: ' + r.format.trim());
      if (r.extra.trim()) out.push(r.extra.trim());
    }
    var text = out.join('\n');
    if (r.facts) text += '\n\nFact sheet:\n' + v.facts.map(function (f) { return '- ' + f[0] + ': ' + f[1]; }).join('\n');
    if (r.draft) text += '\n\nDraft to improve:\n' + v.draft.join(' ');
    return text.trim();
  }
  function req1Typed() {
    var r = S.req1;
    return r.mode === 'free' ? r.free.trim() : [r.role, r.context, r.task, r.format, r.extra].join('').trim();
  }

  /* word-level diff for "what I changed" */
  function diffHtml(a, b) {
    var norm = function (t) { return /^\s+$/.test(t) ? (t.indexOf('\n') !== -1 ? '\n' : ' ') : t; };
    var A = (String(a || '').match(/\S+|\s+/g) || []).map(norm);
    var B = (String(b || '').match(/\S+|\s+/g) || []).map(norm);
    var n = A.length, m = B.length;
    if (n * m > 400000) return esc(b);
    var dp = [];
    for (var i = 0; i <= n; i++) { dp.push(new Uint16Array(m + 1)); }
    for (i = n - 1; i >= 0; i--) {
      for (var j = m - 1; j >= 0; j--) {
        dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    var ops = []; i = 0; j = 0;
    while (i < n && j < m) {
      if (A[i] === B[j]) { ops.push(['=', A[i]]); i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) { ops.push(['-', A[i]]); i++; }
      else { ops.push(['+', B[j]]); j++; }
    }
    while (i < n) { ops.push(['-', A[i++]]); }
    while (j < m) { ops.push(['+', B[j++]]); }
    var html = '', cur = null, buf = '';
    var flush = function () {
      if (!buf) return;
      if (cur === '-') html += /^\s+$/.test(buf) ? '' : '<del>' + esc(buf) + '</del>';
      else if (cur === '+') html += /^\s+$/.test(buf) ? esc(buf) : '<ins>' + esc(buf) + '</ins>';
      else html += esc(buf);
      buf = '';
    };
    ops.forEach(function (op) {
      if (op[0] !== cur) { flush(); cur = op[0]; }
      buf += op[1];
    });
    flush();
    return html;
  }

  async function copyText(t) {
    try { await navigator.clipboard.writeText(t); return true; }
    catch (e) {
      var ta = document.createElement('textarea');
      ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
      ta.remove(); return ok;
    }
  }

  function toast(msg, ic) {
    var wrap = document.getElementById('toasts');
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = icon(ic || 'info') + '<span>' + esc(msg) + '</span>';
    wrap.appendChild(el);
    setTimeout(function () { el.remove(); }, 6000);
  }

  /* ---------------- modal / sheet ---------------- */
  var modalReturnFocus = null;
  function openModal(html, opts) {
    opts = opts || {};
    modalReturnFocus = document.activeElement;
    var ov = document.getElementById('overlay');
    ov.innerHTML = '<div class="modal-back" data-sticky="' + (opts.sticky ? '1' : '') + '"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">' + html + '</div></div>';
    var f = ov.querySelector('[autofocus], input, textarea, button');
    if (f) f.focus();
  }
  function openSheet(html) {
    modalReturnFocus = document.activeElement;
    var ov = document.getElementById('overlay');
    ov.innerHTML = '<div class="sheet-back" data-close-on-back="1"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="sheet-grip"></div>' + html + '</div></div>';
    var f = ov.querySelector('button');
    if (f) f.focus();
  }
  function closeModal() {
    document.getElementById('overlay').innerHTML = '';
    if (modalReturnFocus && document.body.contains(modalReturnFocus)) modalReturnFocus.focus();
  }

  function askPin(reason, cb) {
    pinCallback = cb;
    openModal(
      '<h2 id="modal-title">Assessor only</h2>' +
      '<p class="small" style="margin-top:8px">' + esc(reason) + '</p>' +
      '<label class="field" style="margin-top:16px"><span class="field-label">Assessor PIN</span>' +
      '<input class="input pin-input" id="pin-in" type="password" inputmode="numeric" maxlength="4" autocomplete="off" autofocus></label>' +
      '<div class="err" id="pin-err" role="alert"></div>' +
      '<div class="actions"><button class="btn btn-ghost" data-action="modal-close">Cancel</button>' +
      '<button class="btn btn-primary" data-action="pin-ok">Unlock</button></div>'
    );
  }
  function checkPin() {
    var el = document.getElementById('pin-in');
    if (!el) return;
    if (el.value === S.setup.pin) {
      var cb = pinCallback; pinCallback = null; closeModal(); if (cb) cb();
    } else {
      document.getElementById('pin-err').textContent = 'That PIN is not correct. Try again.';
      el.value = ''; el.focus();
    }
  }

  /* ---------------- screens ---------------- */
  function render() {
    var fk = focusKey();
    renderTop();
    var app = document.getElementById('app');
    var html = '';
    if (S.screen === 'setup') html = viewSetup();
    else if (S.screen === 'welcome') html = viewWelcome();
    else if (S.screen === 'work') html = viewWork();
    else if (S.screen === 'handover') html = viewHandover();
    else if (S.screen === 'assessor') html = assessorOpen ? viewAssessor() : viewHandover();
    else if (S.screen === 'result') html = viewResult();
    app.innerHTML = html;
    restoreFocus(fk);
    if (S.screen === 'work') updateTimer();
  }

  function focusKey() {
    var a = document.activeElement;
    if (!a || !a.getAttribute) return null;
    if (a.getAttribute('data-action')) return '[data-action="' + a.getAttribute('data-action') + '"]' + (a.getAttribute('data-arg') != null ? '[data-arg="' + a.getAttribute('data-arg') + '"]' : '');
    if (a.getAttribute('data-bind')) return '[data-bind="' + a.getAttribute('data-bind') + '"]';
    return null;
  }
  function restoreFocus(sel) {
    if (!sel) return;
    try { var el = document.querySelector('#app ' + sel); if (el) el.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
  }

  function renderTop() {
    var r = document.getElementById('topbar-right');
    var h = '';
    if (S.screen === 'work') {
      h += '<div class="timer" id="timer" aria-label="Time left">' +
        '<svg class="timer-ring" viewBox="0 0 26 26" aria-hidden="true"><circle class="track" cx="13" cy="13" r="10.5"/><circle class="bar" id="timer-bar" cx="13" cy="13" r="10.5" stroke-dasharray="65.97" stroke-dashoffset="0"/></svg>' +
        '<div class="timer-text"><span class="timer-time" id="timer-time">--:--</span><span class="timer-label" id="timer-label"></span></div></div>';
    }
    if (S.screen === 'welcome' || S.screen === 'work' || S.screen === 'handover' || S.screen === 'result') {
      h += '<button class="icon-btn" data-action="assessor-menu" aria-label="Assessor options">' + icon('lock') + '</button>';
    }
    if (S.screen === 'assessor' && assessorOpen) {
      h += '<button class="btn btn-ghost btn-sm" data-action="assessor-lock">' + icon('lock') + 'Lock</button>';
    }
    r.innerHTML = h;
  }

  /* ----- setup (assessor) ----- */
  function viewSetup() {
    var s = S.setup;
    var lane = s.lane;
    var opts = ['A', 'B', 'C'].map(function (l) {
      var id = (lane === 'iti' ? 'ITI-' : 'HE-') + l;
      var used = S.prevVariants.indexOf(id) !== -1;
      return '<option value="' + id + '"' + (s.variant === id ? ' selected' : '') + (used ? ' disabled' : '') + '>Variant ' + l + ': ' + esc(VARIANTS[id].title) + (used ? ' (used before)' : '') + '</option>';
    }).join('');
    var reassess = S.attempt > 1 ? '<div class="notice warn" style="margin-top:16px">' + icon('refresh') + '<span>Reassessment, attempt ' + S.attempt + '. Variants used before are blocked. Use a new variant on a later day, never a corrected copy.</span></div>' : '';
    return '' +
      '<div class="layout"><div style="max-width:880px;width:100%;margin:0 auto">' +
      '<div class="card">' +
      '<div class="eyebrow"><span>Assessor set-up</span></div>' +
      '<h1>Set up Checkpoint 1</h1>' +
      '<p class="lead">Do this before the learner sits down. Then hand over the device.</p>' + reassess +
      '<hr class="divider">' +
      '<div class="field-row">' +
      fieldInput('setup.learnerId', 'Learner ID or roll number', 'Used only in the assessment record.', s.learnerId) +
      fieldInput('setup.assessor', 'Assessor name', 'As it should appear on the record.', s.assessor) +
      '</div>' +
      '<div class="field-row" style="margin-top:16px">' +
      fieldInput('setup.centre', 'Centre and batch', 'Optional.', s.centre) +
      fieldInput('setup.tool', 'Approved AI tool', 'The tool named in the learner\u2019s Rulebook, R1.', s.tool) +
      '</div>' +
      '<div class="field-row" style="margin-top:20px">' +
      '<div><span class="field-label">Context lane</span><span class="field-help">Same standard, different context.</span>' +
      '<div class="seg" role="group" aria-label="Context lane" style="margin-top:8px">' +
      '<button data-action="set-lane" data-arg="iti" aria-pressed="' + (lane === 'iti') + '">ITI trade</button>' +
      '<button data-action="set-lane" data-arg="he" aria-pressed="' + (lane === 'he') + '">Higher education</button></div></div>' +
      '<div><span class="field-label">AI tool access</span><span class="field-help">Use the offline pack only if the tool cannot be reached.</span>' +
      '<div class="seg" role="group" aria-label="AI tool access" style="margin-top:8px">' +
      '<button data-action="set-mode" data-arg="online" aria-pressed="' + (s.mode === 'online') + '">Online</button>' +
      '<button data-action="set-mode" data-arg="offline" aria-pressed="' + (s.mode === 'offline') + '">Offline pack</button></div></div>' +
      '</div>' +
      '<div class="field-row" style="margin-top:20px">' +
      '<label class="field"><span class="field-label">Task variant</span><span class="field-help">All three are equivalent. Pick one the learner has not seen.</span>' +
      '<select class="select" data-bind="setup.variant" data-rerender="1">' + opts + '</select></label>' +
      '<label class="field"><span class="field-label">Assessor PIN</span><span class="field-help">4 digits. Opens the assessor view and the answer key.</span>' +
      '<input class="input" data-bind="setup.pin" type="password" inputmode="numeric" maxlength="4" autocomplete="off" value="' + esc(s.pin) + '"></label>' +
      '</div>' +
      '<hr class="divider">' +
      assessorGuide() +
      '<div class="meta-row" style="margin-top:24px">' +
      '<span class="small" id="setup-why">' + esc(setupProblem() || 'Ready. The learner will see the rules first.') + '</span>' +
      '<button class="btn btn-primary" data-action="setup-done"' + (setupProblem() ? ' disabled' : '') + '>Hand over to the learner' + icon('right') + '</button>' +
      '</div>' +
      '</div></div></div>';
  }
  function fieldInput(bind, label, help, val) {
    return '<label class="field"><span class="field-label">' + esc(label) + '</span>' + (help ? '<span class="field-help">' + esc(help) + '</span>' : '') +
      '<input class="input" data-bind="' + bind + '" value="' + esc(val) + '" autocomplete="off"></label>';
  }
  function setupProblem() {
    var s = S.setup;
    if (!s.learnerId.trim()) return 'Add the learner ID.';
    if (!s.assessor.trim()) return 'Add the assessor name.';
    if (!s.tool.trim()) return 'Add the approved AI tool.';
    if (!VARIANTS[s.variant]) return 'Choose a task variant.';
    if (!/^\d{4}$/.test(s.pin)) return 'Set a 4-digit PIN.';
    return '';
  }
  function assessorGuide() {
    return '' +
      '<details class="more"><summary>Read before you start: assessor instructions' + icon('chev') + '</summary><div class="inner"><ul>' +
      '<li>Open the approved AI tool on this device and check that it works. Close all other apps.</li>' +
      '<li>The clock runs for 30 minutes: 5 to read, 20 to make and check, 5 to submit. The app keeps the time. Do not change it.</li>' +
      '<li>Watch, but do not help. Do not read the task aloud, point at the screen or react to answers.</li>' +
      '<li>If the learner asks about the task, say: \u201CI cannot help with the task. Do what you think is right.\u201D You may answer questions about the rules, the device or the time.</li>' +
      '<li>Never say how many mistakes there are, or where.</li>' +
      '<li>If the AI tool fails: open the lock button, pause the clock, try once to reconnect. If it still fails, switch to the offline pack. The learner still writes every request. You fill each AI answer from the pack. The standard does not change.</li>' +
      '<li>After submission, open the assessor view with your PIN. Read the evidence, score each criterion and decide the gate. Keep the answer key away from learners.</li>' +
      '</ul></div></details>' +
      '<details class="more"><summary>How the variants are kept equal' + icon('chev') + '</summary><div class="inner"><ul>' +
      '<li>All six variants (three per lane) use the same pattern: a fact sheet, and a 7-line draft made with AI by a batch-mate or classmate.</li>' +
      '<li>Each draft has exactly one planted claim that sounds official but is not in the fact sheet, one harmless line, and one fact left out.</li>' +
      '<li>Each draft is about 90 to 100 words. The target is 80 words or fewer, so the learner must use the AI to shorten and complete it.</li>' +
      '<li>No task needs trade or subject knowledge. All names, places and figures are fictional.</li>' +
      '</ul></div></details>';
  }

  /* ----- welcome (learner) ----- */
  function viewWelcome() {
    var conf = confScale('confBefore', 'Before you start: how sure do you feel about checking AI work?');
    return '' +
      '<div class="opening">' +
      '<span class="ghost-num" aria-hidden="true">01</span>' +
      '<span class="kicker">Checkpoint 1</span>' +
      '<h1>Use it, and check it</h1>' +
      '<p class="lead">You will use AI to make one short notice. Then you will check it, before anyone reads it.</p>' +
      '<div class="phase-strip" aria-label="Your 30 minutes">' +
      '<div><div class="bar"></div><b>5 min</b><span>Read</span></div>' +
      '<div><div class="bar mid"></div><b>20 min</b><span>Make and check</span></div>' +
      '<div><div class="bar"></div><b>5 min</b><span>Submit</span></div>' +
      '</div>' +
      '<div class="rules">' +
      '<div class="rule-box"><h3>' + icon('check') + 'You can use</h3><ul>' +
      '<li>' + esc(tool()) + '</li>' +
      '<li>The fact sheet on this screen</li>' +
      '<li>Your Personal AI Rulebook, sections R1 and R3</li>' +
      '</ul></div>' +
      '<div class="rule-box no"><h3>' + icon('x') + 'Please do not</h3><ul>' +
      '<li>Ask other people for help</li>' +
      '<li>Open other apps or websites</li>' +
      '<li>Type personal details into the AI: phone numbers, Aadhaar, passwords or marks</li>' +
      '</ul></div>' +
      '</div>' +
      '<div class="calm-note">' + icon('info') + '<p>Your assessor will watch, but will not help. That is normal in a checkpoint. You have done every part of this before. Your work saves by itself.</p></div>' +
      conf +
      '<button class="btn btn-primary" data-action="start" style="margin-top:8px">Start my 30 minutes' + icon('right') + '</button>' +
      '</div>';
  }
  function confScale(key, q) {
    var labels = ['Not sure', 'A little sure', 'Quite sure', 'Very sure'];
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:100%">' +
      '<p class="small" id="lbl-' + key + '">' + esc(q) + ' <span style="opacity:.8">(optional)</span></p>' +
      '<div class="scale" role="group" aria-labelledby="lbl-' + key + '">' +
      labels.map(function (l, i) {
        return '<button data-action="conf" data-arg="' + key + ':' + (i + 1) + '" aria-pressed="' + (S[key] === i + 1) + '"><i style="width:' + (10 + i * 10) + 'px"></i>' + l + '</button>';
      }).join('') + '</div></div>';
  }

  /* ----- work (learner) ----- */
  function viewWork() {
    var body;
    switch (S.step) {
      case 1: body = stepRead(); break;
      case 2: body = stepCheck(); break;
      case 3: body = stepAsk(); break;
      case 4: body = stepImprove(); break;
      case 5: body = stepFinish(); break;
      default: body = stepSubmit();
    }
    var rail = S.step <= 5 ? '<aside class="rail" aria-label="Fact sheet">' + factsCard(false) + '</aside>' : '';
    var lockBanner = (S.locked && S.step >= 2 && S.step <= 5) ? '<div class="notice warn" style="margin-bottom:16px">' + icon('clock') + '<span>Work time is over. You can look, but not change. Go to Submit.</span></div>' : '';
    return '<div class="layout' + (rail ? ' with-rail' : '') + '"><div class="work">' + lockBanner + body + '</div>' + rail + '</div>' + footbar();
  }

  function factsCard(inSheet) {
    var v = V();
    return '<div class="' + (inSheet ? '' : 'card ') + 'facts">' +
      '<div class="facts-head"><h3' + (inSheet ? ' id="modal-title"' : '') + '>' + icon('shield') + 'Fact sheet</h3><span class="label-fiction">Fictional</span></div>' +
      '<p class="small" style="margin:-6px 0 12px">' + esc(v.org) + '</p>' +
      '<dl>' + v.facts.map(function (f) { return '<div class="fact"><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl>' +
      '<p class="trust">' + icon('check') + '<span>This is the true information. Use it to check.</span></p>' +
      (inSheet ? '<button class="btn btn-ghost btn-block" style="margin-top:16px" data-action="modal-close">Close</button>' : '') +
      '</div>';
  }

  function head(step, title, sub) {
    return '<div class="eyebrow"><span>Step ' + step + ' of 6</span></div><h2>' + esc(title) + '</h2>' + (sub ? '<p class="lead" style="font-size:16px">' + sub + '</p>' : '');
  }

  function stepRead() {
    var v = V();
    return '' +
      '<div class="card">' + head(1, 'Read your task') +
      '<p class="task-scenario" style="margin-top:16px">' + esc(v.scenario) + '</p>' +
      '<div class="task-job">' + icon('target') + '<div><b>' + esc(v.job) + '</b><div class="small">Use ' + esc(tool()) + ' to help you.</div></div></div>' +
      '<h3 style="margin-top:24px">A good notice has</h3>' +
      '<ul class="standard">' + v.standard.map(function (s) { return '<li>' + icon('check') + '<span>' + esc(s) + '</span></li>'; }).join('') + '</ul>' +
      '</div>' +
      '<div class="card">' +
      '<div class="meta-row" style="margin-top:0"><h3>' + esc(v.author) + '\u2019s draft</h3><span class="label-fiction">Fictional</span></div>' +
      '<div class="draft-paper"><div class="draft-from"><span class="avatar" aria-hidden="true">' + esc(v.author.charAt(0)) + '</span>' + esc(v.author) + ' started this notice with an AI tool yesterday. It is not finished.</div>' +
      esc(v.draft.join(' ')) + '</div>' +
      '<p class="small" style="margin-top:12px">' + words(v.draft.join(' ')) + ' words</p>' +
      '</div>';
  }

  function stepCheck() {
    var v = V(), locked = S.locked;
    var done = S.marks.filter(function (m) { return m && m.mark; }).length;
    var rows = v.draft.map(function (line, i) {
      var m = S.marks[i] || {};
      var cls = (m.mark ? ' m-' + m.mark : '') + (m.fix === 'remove' ? ' m-remove' : '');
      var mk = function (code, label, ic) {
        return '<button class="mark" data-m="' + code + '" data-action="mark" data-arg="' + i + ':' + code + '" aria-pressed="' + (m.mark === code) + '"' + (locked ? ' disabled' : '') + '>' + icon(ic) + label + '</button>';
      };
      var fix = '';
      if (m.mark === 'wrong' || m.mark === 'missing') {
        fix = '<div class="fix-box"><span class="small">What will you do with this line?</span><div class="chips">' +
          '<button class="chip" data-action="fix" data-arg="' + i + ':remove" aria-pressed="' + (m.fix === 'remove') + '"' + (locked ? ' disabled' : '') + '>' + icon('trash') + 'Remove it</button>' +
          '<button class="chip" data-action="fix" data-arg="' + i + ':change" aria-pressed="' + (m.fix === 'change') + '"' + (locked ? ' disabled' : '') + '>' + icon('pen') + 'Change it</button></div>' +
          (m.fix === 'change' ? '<label class="field" style="margin-top:8px"><span class="sr-only">Change it to</span><input class="input" data-bind="marks.' + i + '.fixText" placeholder="Change it to\u2026" value="' + esc(m.fixText || '') + '"' + (locked ? ' disabled' : '') + '></label>' : '') +
          '</div>';
      }
      return '<li class="check-row' + cls + '"><div class="check-text"><span>' + esc(line) + '</span></div>' +
        '<div class="marks" role="group" aria-label="Line ' + (i + 1) + '">' +
        mk('ok', 'Matches', 'check') + mk('wrong', 'Wrong', 'x') + mk('missing', 'Not in fact sheet', 'question') +
        '</div>' + fix + '</li>';
    }).join('');
    var miss = S.missing;
    return '' +
      '<div class="card">' + head(2, 'Check the draft', esc(V().author) + ' used AI for this draft. Mark each line. Use the fact sheet.') +
      '<div class="progress-line" style="margin-top:16px"><span>' + done + ' of ' + v.draft.length + ' lines marked</span><span class="track"><i style="width:' + Math.round(done / v.draft.length * 100) + '%"></i></span></div>' +
      '<ol class="check-list">' + rows + '</ol>' +
      '</div>' +
      '<div class="card">' +
      '<h3 id="lbl-missing">Is anything from the fact sheet missing in the draft?</h3>' +
      '<div class="seg" role="group" aria-labelledby="lbl-missing" style="margin-top:12px">' +
      '<button data-action="missing" data-arg="yes" aria-pressed="' + (miss.ans === 'yes') + '"' + (locked ? ' disabled' : '') + '>Yes</button>' +
      '<button data-action="missing" data-arg="no" aria-pressed="' + (miss.ans === 'no') + '"' + (locked ? ' disabled' : '') + '>No</button></div>' +
      (miss.ans === 'yes' ? '<label class="field" style="margin-top:12px"><span class="field-label">What is missing?</span><input class="input" data-bind="missing.text" value="' + esc(miss.text) + '"' + (locked ? ' disabled' : '') + '></label>' : '') +
      '</div>';
  }

  function stepAsk() {
    var r = S.req1, locked = S.locked, v = V();
    var dis = locked ? ' disabled' : '';
    var fields = r.mode === 'free'
      ? '<label class="field"><span class="field-label">Your request</span><span class="field-help">Write it your own way.</span><textarea class="textarea" data-bind="req1.free"' + dis + '>' + esc(r.free) + '</textarea></label>'
      : '<div class="b-fields">' +
        bField('req1.role', 'Role', 'Who should the AI act as?', r.role, dis) +
        bField('req1.context', 'Context', 'Who is it for, and why?', r.context, dis) +
        bField('req1.task', 'Task', 'What should the AI make?', r.task, dis) +
        bField('req1.format', 'Format', 'How should it look? How long?', r.format, dis) +
        '<div class="span-2">' + bField('req1.extra', 'Anything else', 'Optional.', r.extra, dis) + '</div></div>';
    return '' +
      '<div class="card">' + head(3, 'Ask the AI', 'Write your request. Copy it into ' + esc(tool()) + '. Paste the answer back here.') +
      '<div class="how-row" aria-hidden="true">' +
      howStep(1, 'Write') + arrow() + howStep(2, 'Copy') + arrow() + howStep(3, 'Paste in ' + tool()) + arrow() + howStep(4, 'Copy the answer') + arrow() + howStep(5, 'Paste below') +
      '</div>' +
      '<div class="builder">' +
      '<div>' +
      '<div class="meta-row" style="margin:0 0 12px"><span class="retrieval">' + icon('book') + 'From 1.2: Role, Context, Task, Format</span>' +
      '<div class="seg" role="group" aria-label="How to write"><button data-action="req-mode" data-arg="builder" aria-pressed="' + (r.mode !== 'free') + '"' + dis + '>4 parts</button><button data-action="req-mode" data-arg="free" aria-pressed="' + (r.mode === 'free') + '"' + dis + '>My own way</button></div></div>' +
      fields +
      '<div style="margin-top:16px"><span class="field-label">Give the AI your source</span><span class="field-help">Tap to add it to your request.</span>' +
      '<div class="chips" style="margin-top:8px">' +
      '<button class="chip" data-action="attach" data-arg="facts" aria-pressed="' + r.facts + '"' + dis + '>' + icon('shield') + 'Fact sheet</button>' +
      '<button class="chip" data-action="attach" data-arg="draft" aria-pressed="' + r.draft + '"' + dis + '>' + icon('doc') + esc(v.author) + '\u2019s draft</button>' +
      '</div></div>' +
      '</div>' +
      '<div><span class="field-label">Your request</span>' +
      '<div class="preview" data-live="preview1" style="margin-top:8px">' + previewReq1() + '</div>' +
      '<div class="meta-row"><button class="btn btn-blue btn-sm" data-action="copy-req1">' + icon('copy') + 'Copy request</button><span class="count" data-live="req1-words">' + words(req1Text()) + ' words</span></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      answerCard('ans1', 'ask', 'Paste the AI answer', S.ans1);
  }
  function bField(bind, label, help, val, dis) {
    return '<label class="field"><span class="field-label">' + label + '</span><span class="field-help">' + help + '</span><input class="input" data-bind="' + bind + '" value="' + esc(val) + '"' + dis + '></label>';
  }
  function howStep(n, t) { return '<span class="how-step"><b>' + n + '</b>' + esc(t) + '</span>'; }
  function arrow() { return '<span class="how-arrow">' + icon('right') + '</span>'; }

  function previewReq1() {
    var r = S.req1, v = V(), parts = [];
    if (r.mode === 'free') {
      parts.push(r.free.trim() ? esc(r.free.trim()) : '<span class="ph">Your request will appear here.</span>');
    } else {
      var any = false;
      var line = function (pre, val, post) { if (val.trim()) { any = true; parts.push(pre + '<u>' + esc(val.trim().replace(/\.$/, '')) + '</u>' + (post || '')); } };
      line('You are ', r.role, '.');
      line('Context: ', r.context);
      line('Task: ', r.task);
      line('Format: ', r.format);
      if (r.extra.trim()) { any = true; parts.push(esc(r.extra.trim())); }
      if (!any) parts.push('<span class="ph">Fill in the parts. Your request will appear here.</span>');
    }
    var html = parts.join('\n');
    if (r.facts) html += '<span class="attach">+ Fact sheet (' + v.facts.length + ' lines)</span>';
    if (r.draft) html += '<span class="attach">+ ' + esc(v.author) + '\u2019s draft (' + v.draft.length + ' lines)</span>';
    return html;
  }

  function answerCard(bind, stage, title, val) {
    var dis = S.locked ? ' disabled' : '';
    var offline = S.setup.mode === 'offline';
    var help = offline
      ? '<div class="notice" style="margin-top:12px">' + icon('offline') + '<span>The AI tool is offline for this checkpoint. When your request is ready, your assessor will add the AI answer.</span></div>' +
        '<button class="btn btn-ghost btn-sm" style="margin-top:12px" data-action="offline-fill" data-arg="' + stage + '"' + dis + '>' + icon('lock') + 'Assessor: add the AI answer</button>'
      : '<button class="btn-text" data-action="tool-problem">AI tool not working?</button>';
    return '<div class="card answer-box">' +
      '<label class="field"><span class="field-label">' + esc(title) + '</span><span class="field-help">Paste exactly what ' + esc(tool()) + ' gave you. Do not fix it here.</span>' +
      '<textarea class="textarea" data-bind="' + bind + '"' + dis + ' placeholder="Paste here">' + esc(val) + '</textarea></label>' +
      '<div class="meta-row"><span class="count" data-live="' + bind + '-words">' + words(val) + ' words</span></div>' +
      help + '</div>';
  }

  function stepImprove() {
    var dis = S.locked ? ' disabled' : '';
    var starters = [
      ['shorter', 'Make it shorter'], ['add', 'Add something'], ['remove', 'Remove something'], ['simple', 'Use simpler words'], ['format', 'Change the format']
    ];
    return '' +
      '<div class="card">' + head(4, 'Ask for one improvement', 'Read the AI answer. What should be better? Ask for it clearly.') +
      '<div style="margin-top:16px"><span class="field-label">The AI answer</span>' +
      '<div class="answer-read" style="margin-top:8px">' + (S.ans1.trim() ? esc(S.ans1) : '<span class="ph">No answer yet. Go back to step 3.</span>') + '</div>' +
      '<div class="meta-row"><span class="count ' + (words(S.ans1) > CONFIG.wordLimit ? 'over' : 'ok') + '">' + words(S.ans1) + ' words</span></div></div>' +
      '<hr class="divider">' +
      '<span class="field-label">Start with</span><span class="field-help">Tap one or more. Then finish the sentence.</span>' +
      '<div class="chips" style="margin-top:8px">' + starters.map(function (s) { return '<button class="chip" data-action="starter" data-arg="' + s[0] + '"' + dis + '>' + esc(s[1]) + '</button>'; }).join('') + '</div>' +
      '<label class="field" style="margin-top:16px"><span class="field-label">Your follow-up request</span><span class="field-help">Say exactly what to change.</span>' +
      '<textarea class="textarea" id="req2" data-bind="req2"' + dis + '>' + esc(S.req2) + '</textarea></label>' +
      '<div class="meta-row"><button class="btn btn-blue btn-sm" data-action="copy-req2">' + icon('copy') + 'Copy request</button><span class="count" data-live="req2-words">' + words(S.req2) + ' words</span></div>' +
      '</div>' +
      answerCard('ans2', 'improve', 'Paste the new AI answer', S.ans2);
  }

  function stepFinish() {
    var v = V(), dis = S.locked ? ' disabled' : '';
    if (!S.finalSeeded && S.ans2.trim()) { S.finalText = S.ans2; S.finalSeeded = true; saveSoon(); }
    var w = words(S.finalText);
    return '' +
      '<div class="card">' + head(5, 'Finish your notice', 'This is the version people will read. Make your fixes here.') +
      '<label class="field" style="margin-top:16px"><span class="field-label">Final notice</span>' +
      '<textarea class="textarea" style="min-height:240px" data-bind="finalText"' + dis + '>' + esc(S.finalText) + '</textarea></label>' +
      '<div class="meta-row"><span class="count ' + (w > CONFIG.wordLimit ? 'over' : 'ok') + '" data-live="final-words">' + w + ' of ' + CONFIG.wordLimit + ' words</span>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
      '<button class="btn btn-ghost btn-sm" data-action="reset-final"' + dis + '>' + icon('refresh') + 'Start again from the AI answer</button>' +
      '<button class="btn btn-blue btn-sm" data-action="toggle-diff" aria-pressed="' + S.showDiff + '">' + icon('eye') + (S.showDiff ? 'Hide my changes' : 'Show my changes') + '</button></div></div>' +
      '<div data-live="diff-wrap"' + (S.showDiff ? '' : ' class="hidden"') + ' style="margin-top:16px">' +
      '<div class="diff" data-live="diff">' + diffHtml(S.ans2, S.finalText) + '</div>' +
      '<div class="diff-legend"><span><del>removed</del> from the AI answer</span><span><ins>added</ins> by you</span></div></div>' +
      '</div>' +
      '<div class="card">' +
      '<h3>Check your notice against the standard</h3><p class="small" style="margin-top:4px">Tick each one only after you have checked it.</p>' +
      '<ul class="ticks" style="margin-top:12px">' + v.standard.map(function (s, i) {
        var on = !!S.ticks[i];
        return '<li><button class="tick" data-action="tick" data-arg="' + i + '" aria-pressed="' + on + '"' + dis + '><span class="box">' + icon('check') + '</span>' + esc(s) + '</button></li>';
      }).join('') + '</ul>' +
      '</div>';
  }

  function stepSubmit() {
    var n = S.note;
    return '' +
      '<div class="card">' + head(6, 'Say what you changed', 'Short answers are fine. This shows your thinking.') +
      '<div class="starter" style="margin-top:16px">' +
      tArea('note.removed', 'I removed or fixed\u2026', n.removed) + tArea('note.removedWhy', 'Because\u2026', n.removedWhy) +
      '</div><div class="starter" style="margin-top:16px">' +
      tArea('note.added', 'I added\u2026', n.added) + tArea('note.addedWhy', 'Because\u2026', n.addedWhy) +
      '</div></div>' +
      '<div class="card" style="text-align:center">' + confScale('confAfter', 'How sure are you that your notice has no mistakes?') + '</div>' +
      '<div class="card">' +
      '<details class="more"><summary>See everything you will submit' + icon('chev') + '</summary><div class="inner stack">' +
      evBlock('Your first request', req1Text()) + evBlock('AI answer 1', S.ans1) + evBlock('Your follow-up request', S.req2) + evBlock('AI answer 2', S.ans2) + evBlock('Your final notice', S.finalText) +
      '</div></details></div>';
  }
  function tArea(bind, label, val) {
    return '<label class="field"><span class="field-label">' + esc(label) + '</span><textarea class="textarea" style="min-height:90px" data-bind="' + bind + '">' + esc(val) + '</textarea></label>';
  }
  function evBlock(title, text) {
    return '<div class="ev-block"><h3>' + esc(title) + '</h3><div class="ev-text' + (String(text || '').trim() ? '' : ' empty') + '">' + (String(text || '').trim() ? esc(text) : 'Nothing recorded.') + '</div></div>';
  }

  function canNext() {
    switch (S.step) {
      case 3:
        if (!req1Typed()) return 'Write your request first.';
        if (!S.ans1.trim()) return 'Paste the AI answer to go on.';
        return '';
      case 4:
        if (!S.req2.trim()) return 'Write your follow-up request.';
        if (!S.ans2.trim()) return 'Paste the new AI answer to go on.';
        return '';
      case 5:
        if (!S.finalText.trim()) return 'Your final notice is empty.';
        return '';
      default: return '';
    }
  }

  function footbar() {
    var dots = STEP_NAMES.map(function (_, i) {
      var n = i + 1;
      return '<i class="' + (n === S.step ? 'now' : (n < S.step ? 'done' : '')) + '"></i>';
    }).join('');
    var why = canNext();
    var next;
    if (S.step === 6) {
      next = '<button class="btn btn-primary" data-action="submit">' + icon('send') + 'Submit my work</button>';
    } else {
      var label = S.step === 1 ? 'I have read it' : 'Next';
      if (S.locked) label = 'Next';
      next = '<button class="btn btn-primary" data-action="next" data-live="next-btn" aria-disabled="' + (!!why && !S.locked) + '">' + label + icon('right') + '</button>';
    }
    var back = S.step > 1 ? '<button class="btn btn-ghost" data-action="back" aria-label="Back">' + icon('left') + '<span class="hide-sm">Back</span></button>' : '';
    var fs = S.step <= 5 ? '<button class="btn btn-blue btn-sm fs-btn" data-action="open-facts">' + icon('shield') + 'Fact sheet</button>' : '';
    return '<nav class="footbar" aria-label="Steps">' +
      '<div class="steps"><div class="dots" aria-hidden="true">' + dots + '</div>' + fs + '<span class="step-label">Step ' + S.step + ' of 6: <b>' + STEP_NAMES[S.step - 1] + '</b></span></div>' +
      '<div class="foot-actions"><span class="why-disabled" data-live="why">' + esc(S.locked ? '' : why) + '</span>' + back + next + '</div>' +
      '</nav>';
  }

  /* live updates while typing (no full re-render, so focus stays put) */
  function liveUpdate(bind) {
    var q = function (k) { return document.querySelector('[data-live="' + k + '"]'); };
    if (bind.indexOf('req1.') === 0) {
      var p = q('preview1'); if (p) p.innerHTML = previewReq1();
      var rw = q('req1-words'); if (rw) rw.textContent = words(req1Text()) + ' words';
    }
    if (bind === 'ans1' || bind === 'ans2') { var aw = q(bind + '-words'); if (aw) aw.textContent = words(getPath(bind)) + ' words'; }
    if (bind === 'req2') { var r2 = q('req2-words'); if (r2) r2.textContent = words(S.req2) + ' words'; }
    if (bind === 'finalText') {
      var fw = q('final-words');
      if (fw) { var w = words(S.finalText); fw.textContent = w + ' of ' + CONFIG.wordLimit + ' words'; fw.className = 'count ' + (w > CONFIG.wordLimit ? 'over' : 'ok'); }
      var d = q('diff'); if (d && S.showDiff) d.innerHTML = diffHtml(S.ans2, S.finalText);
    }
    if (bind.indexOf('setup.') === 0) {
      var sw = document.getElementById('setup-why');
      var prob = setupProblem();
      if (sw) sw.textContent = prob || 'Ready. The learner will see the rules first.';
      var b = document.querySelector('[data-action="setup-done"]'); if (b) b.disabled = !!prob;
    }
    var nb = q('next-btn');
    if (nb) { var why = canNext(); nb.setAttribute('aria-disabled', String(!!why && !S.locked)); var wy = q('why'); if (wy) wy.textContent = S.locked ? '' : why; }
  }

  /* ---------------- timer ---------------- */
  function updateTimer() {
    var e = elapsed();
    var label, rem, total, low;
    if (S.step === 1 && e < CONFIG.readSec && !S.locked) {
      label = 'Reading time'; rem = CONFIG.readSec - e; total = CONFIG.readSec; low = rem <= 60;
    } else if (e < CONFIG.workEndSec && !S.locked) {
      label = 'Make and check'; rem = CONFIG.workEndSec - e; total = CONFIG.workEndSec - CONFIG.readSec; low = rem <= 300;
    } else {
      label = 'Time to submit'; rem = CONFIG.totalSec - e; total = CONFIG.totalSec - CONFIG.workEndSec; low = rem <= 120;
    }
    if (S.pausedAt) label = 'Paused by assessor';
    var t = document.getElementById('timer-time'), l = document.getElementById('timer-label'), bar = document.getElementById('timer-bar'), box = document.getElementById('timer');
    if (!t) return;
    t.textContent = mmss(rem);
    l.textContent = label;
    var frac = Math.max(0, Math.min(1, rem / total));
    bar.setAttribute('stroke-dashoffset', String(65.97 * (1 - frac)));
    box.classList.toggle('is-low', !!low && !S.pausedAt);
    box.classList.toggle('is-paused', !!S.pausedAt);
    box.setAttribute('aria-label', label + ': ' + Math.ceil(rem / 60) + ' minutes left');
  }

  function tick() {
    if (S.screen !== 'work' || !S.startedAt) return;
    var e = elapsed(), f = S.fired;
    if (e >= CONFIG.readSec && !f.read) {
      f.read = true;
      if (S.step === 1) { goStep(2); toast('Reading time is over. Your 20 minutes to make and check have started.', 'clock'); }
      save();
    }
    if (e >= CONFIG.workEndSec - 300 && !f.w5 && !S.locked && S.step < 6) { f.w5 = true; toast('5 minutes left to finish and check your notice.', 'clock'); save(); }
    if (e >= CONFIG.workEndSec - 60 && !f.w1 && !S.locked && S.step < 6) { f.w1 = true; toast('1 minute left. Your work saves by itself.', 'clock'); save(); }
    if (e >= CONFIG.workEndSec && !f.lock) {
      f.lock = true; S.locked = true; log('Work time ended at 25:00. Steps 2 to 5 locked.');
      if (S.step < 6) {
        S.step = 6; S.maxStep = 6; save(); render(); window.scrollTo(0, 0);
        openModal('<h2 id="modal-title">Time to submit</h2><p class="lead" style="font-size:16px">Your notice is saved. Now write what you changed, and submit. You have 5 minutes.</p><div class="actions"><button class="btn btn-primary" data-action="modal-close">OK</button></div>');
      } else { save(); render(); }
    }
    if (e >= CONFIG.totalSec - 120 && !f.s2) { f.s2 = true; toast('2 minutes left to submit.', 'clock'); save(); }
    if (e >= CONFIG.totalSec && !f.end) { f.end = true; closeModal(); submit(true); return; }
    updateTimer();
  }

  function goStep(n) {
    S.step = Math.max(1, Math.min(6, n));
    S.maxStep = Math.max(S.maxStep, S.step);
    save(); render();
    window.scrollTo({ top: 0, behavior: 'auto' });
    var app = document.getElementById('app'); if (app) app.focus({ preventScroll: true });
  }

  function submit(auto) {
    S.submittedAt = Date.now();
    S.elapsedAtSubmit = Math.round(elapsed());
    S.autoSubmitted = !!auto;
    log(auto ? 'Auto-submitted when the 30 minutes ended.' : 'Submitted by the learner.');
    S.screen = 'handover';
    save(); render(); window.scrollTo(0, 0);
  }

  /* ----- handover ----- */
  function viewHandover() {
    return '<div class="center-stage">' +
      '<div class="badge-wrap" style="width:56px;height:56px"><div class="badge-ring" style="border-width:1.5px"></div><div class="badge quiet">' + icon('check') + '</div></div>' +
      '<h1 style="font-size:clamp(28px,4vw,40px)">Your work is submitted</h1>' +
      '<p class="lead" style="margin:0 auto">Please give this device to your assessor now. Thank you.</p>' +
      '<p class="small">' + (S.autoSubmitted ? 'Submitted when the time ended. ' : '') + 'Time used: ' + mmss(S.elapsedAtSubmit || 0) + '</p>' +
      '<button class="btn btn-primary" data-action="open-assessor">' + icon('lock') + 'Open assessor view</button>' +
      '</div>';
  }

  /* ----- assessor view ----- */
  function signals() {
    var k = K(), v = V();
    var fabMark = (S.marks[k.fab] || {}).mark || null;
    var flagged = fabMark === 'wrong' || fabMark === 'missing';
    var noteMentions = hasAny(S.note.removed + ' ' + S.note.removedWhy, k.fabWords);
    var inFinal = hasAny(S.finalText, k.fabWords);
    var missingAdded = hasAny(S.finalText, k.missingWords);
    var falseFlags = 0, unmarked = 0;
    (k.lines || []).forEach(function (t, i) {
      var m = (S.marks[i] || {}).mark;
      if (!m) unmarked++;
      if (t === 'ok' && (m === 'wrong' || m === 'missing')) falseFlags++;
    });
    var pausedMs = S.log.filter(function (x) { return /^Clock paused/.test(x.msg); }).length;
    return { fabMark: fabMark, flagged: flagged, noteMentions: noteMentions, inFinal: inFinal, missingAdded: missingAdded, falseFlags: falseFlags, unmarked: unmarked, finalWords: words(S.finalText), pauses: pausedMs, total: v.draft.length };
  }

  function viewAssessor() {
    var v = V(), s = S.setup;
    var tabs = [['evidence', 'Evidence'], ['score', 'Score'], ['finish', 'Decide']];
    var body = S.aTab === 'score' ? aScore() : (S.aTab === 'finish' ? aFinish() : aEvidence());
    return '<div class="card tight" style="margin-bottom:16px">' +
      '<div class="eyebrow"><span>Assessor view</span></div>' +
      '<h1 style="font-size:clamp(24px,3vw,32px)">Checkpoint 1: score and record</h1>' +
      '<p class="small" style="margin-top:8px">Learner ' + esc(s.learnerId) + ' \u2022 ' + laneLabel(v.lane) + ', variant ' + v.letter + ': ' + esc(v.title) + ' \u2022 Attempt ' + S.attempt + ' \u2022 ' + (s.mode === 'offline' ? 'Offline pack' : 'Online') + '</p>' +
      '<div class="tabs" role="tablist" style="margin-top:16px">' + tabs.map(function (t) {
        return '<button role="tab" aria-selected="' + (S.aTab === t[0]) + '" data-action="a-tab" data-arg="' + t[0] + '">' + t[1] + '</button>';
      }).join('') + '</div></div>' + body;
  }

  function dot(kind) { return '<span class="dot ' + kind + '">' + icon(kind === 'y' ? 'check' : (kind === 'n' ? 'x' : 'info')) + '</span>'; }
  function markPill(m) {
    if (m === 'ok') return '<span class="pill ok">Matches</span>';
    if (m === 'wrong') return '<span class="pill bad">Wrong</span>';
    if (m === 'missing') return '<span class="pill bad">Not in fact sheet</span>';
    return '<span class="pill">Not marked</span>';
  }

  function aEvidence() {
    var k = K(), v = V(), g = signals();
    var key = '<div class="key-card"><span class="tag">' + icon('lock') + 'ANSWER KEY: ASSESSOR ONLY</span>' +
      '<p class="small" style="margin-top:10px">Planted claim, draft line ' + (k.fab + 1) + '</p>' +
      '<p class="key-quote">' + esc(k.claim) + '</p>' +
      '<p style="margin-top:12px;font-size:14.5px"><b style="color:var(--ivory)">Why it is a fabrication:</b> ' + esc(k.why) + '</p>' +
      '<p style="margin-top:6px;font-size:14.5px"><b style="color:var(--ivory)">Correct action:</b> ' + esc(k.action) + '</p>' +
      '<p style="margin-top:6px;font-size:14.5px"><b style="color:var(--ivory)">Fact left out of the draft:</b> ' + esc(k.missing) + '</p></div>';

    var sig = '<div class="card tight"><h3 style="margin-bottom:8px">What the record suggests</h3><p class="small" style="margin-bottom:8px">Keyword checks only. Confirm every one by reading the evidence.</p>' +
      '<div class="signal">' + dot(g.flagged ? 'y' : 'n') + '<span>Planted line marked as ' + markPill(g.fabMark) + '</span></div>' +
      '<div class="signal">' + dot(g.noteMentions ? 'y' : 'q') + '<span>Change note mentions the planted claim: ' + (g.noteMentions ? 'yes' : 'no') + '</span></div>' +
      '<div class="signal">' + dot(g.inFinal ? 'n' : 'y') + '<span>Planted claim found in the final notice: ' + (g.inFinal ? 'yes' : 'no') + '</span></div>' +
      '<div class="signal">' + dot(g.missingAdded ? 'y' : 'n') + '<span>Missing fact appears in the final notice: ' + (g.missingAdded ? 'yes' : 'no') + '</span></div>' +
      '<div class="signal">' + dot(g.finalWords <= CONFIG.wordLimit ? 'y' : 'n') + '<span>Final notice: ' + g.finalWords + ' words (limit ' + CONFIG.wordLimit + ')</span></div>' +
      '<div class="signal">' + dot(g.falseFlags === 0 ? 'y' : 'n') + '<span>Correct lines flagged as wrong: ' + g.falseFlags + '. Lines not marked: ' + g.unmarked + ' of ' + g.total + '</span></div>' +
      '<div class="signal">' + dot('q') + '<span>Confidence before: ' + confWord(S.confBefore) + '. After: ' + confWord(S.confAfter) + '</span></div>' +
      '</div>';

    var table = '<div class="card tight"><h3 style="margin-bottom:12px">Draft check</h3><div class="table-scroll"><table class="ev-table"><thead><tr><th>#</th><th>Draft line</th><th>Key</th><th>Learner</th><th>Fix</th></tr></thead><tbody>' +
      v.draft.map(function (line, i) {
        var t = (k.lines || [])[i], m = S.marks[i] || {};
        var keyPill = t === 'fab' ? '<span class="pill bad">Planted</span>' : (t === 'neutral' ? '<span class="pill blue">Harmless, any mark</span>' : '<span class="pill ok">Correct</span>');
        var fix = m.fix === 'remove' ? 'Remove' : (m.fix === 'change' ? 'Change to: ' + esc(m.fixText || '') : '');
        return '<tr><td>' + (i + 1) + '</td><td>' + esc(line) + '</td><td>' + keyPill + '</td><td>' + markPill(m.mark) + '</td><td>' + fix + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<p class="small" style="margin-top:12px">Anything missing? ' + (S.missing.ans ? esc(S.missing.ans) : 'not answered') + (S.missing.text ? ': ' + esc(S.missing.text) : '') + '</p></div>';

    var flow = '<div class="card tight">' +
      '<div class="grid-2">' + evBlock('Request 1', req1Text()) + evBlock('AI answer 1' + (S.offline.ask ? ' (offline pack)' : ''), S.ans1) + '</div>' +
      '<div class="grid-2" style="margin-top:24px">' + evBlock('Request 2 (refinement)', S.req2) + evBlock('AI answer 2' + (S.offline.improve ? ' (offline pack)' : ''), S.ans2) + '</div>' +
      '<div class="ev-block" style="margin-top:24px"><h3>Final notice: what the learner changed</h3><div class="diff">' + diffHtml(S.ans2, S.finalText) + '</div>' +
      '<div class="diff-legend"><span><del>removed</del> from AI answer 2</span><span><ins>added</ins> by the learner</span></div></div>' +
      '<div class="grid-2" style="margin-top:24px">' + evBlock('I removed or fixed / because', (S.note.removed || '') + (S.note.removedWhy ? '\nBecause: ' + S.note.removedWhy : '')) +
      evBlock('I added / because', (S.note.added || '') + (S.note.addedWhy ? '\nBecause: ' + S.note.addedWhy : '')) + '</div>' +
      '<div class="ev-block" style="margin-top:24px"><h3>Self-check ticks</h3><div class="chips">' + v.standard.map(function (st, i) { return '<span class="pill ' + (S.ticks[i] ? 'ok' : '') + '">' + (S.ticks[i] ? '\u2713 ' : '') + esc(st) + '</span>'; }).join('') + '</div></div>' +
      '</div>';

    var timeline = '<div class="card tight"><h3 style="margin-bottom:8px">Time log and observation</h3>' +
      '<p class="small">Started ' + clock(S.startedAt) + '. Submitted ' + clock(S.submittedAt) + '. Active time ' + mmss(S.elapsedAtSubmit || 0) + '.</p>' +
      '<ul style="margin:12px 0 0;padding-left:18px;font-size:14px">' + S.log.map(function (x) { return '<li>' + mmss(x.e) + ': ' + esc(x.msg) + '</li>'; }).join('') +
      S.obs.map(function (x) { return '<li>' + mmss(x.e) + ': Observation: ' + esc(x.msg) + '</li>'; }).join('') + '</ul></div>';

    return '<div class="grid-2" style="align-items:start">' + key + sig + '</div>' + '<div style="height:16px"></div>' + table + flow + timeline;
  }
  function confWord(n) { return n ? ['Not sure', 'A little sure', 'Quite sure', 'Very sure'][n - 1] : 'not given'; }

  function score() {
    var lv = S.scoring.levels, all = true, pct = 0;
    CRITERIA.forEach(function (c) {
      if (lv[c.id] == null) all = false; else pct += (lv[c.id] / 3) * WEIGHTS[c.id];
    });
    var g = S.scoring.gate;
    var gatesSet = g.detected && g.corrected && g.others;
    var gatesMet = g.detected === 'yes' && g.corrected === 'yes' && g.others !== 'no';
    var decision = null;
    if (S.scoring.independent === 'no') decision = 'invalid';
    else if (all && gatesSet && S.scoring.independent === 'yes') decision = (gatesMet && pct >= CONFIG.passPct) ? 'competent' : 'notyet';
    return { all: all, pct: Math.round(pct * 10) / 10, gatesSet: !!gatesSet, gatesMet: gatesMet, decision: decision };
  }
  function decisionText(d) {
    return d === 'competent' ? 'Competent' : (d === 'notyet' ? 'Not yet competent' : (d === 'invalid' ? 'Attempt not valid: reassess' : 'Not decided yet'));
  }

  function yn(path, val, opts) {
    opts = opts || ['yes', 'no'];
    var names = { yes: 'Yes', no: 'No', na: 'Not assessed here' };
    return '<div class="seg" role="group">' + opts.map(function (o) {
      return '<button data-action="a-set" data-arg="' + path + ':' + o + '" aria-pressed="' + (val === o) + '">' + names[o] + '</button>';
    }).join('') + '</div>';
  }

  function aScore() {
    var lv = S.scoring.levels, g = S.scoring.gate, sc = score(), sg = signals();
    var crits = CRITERIA.map(function (c) {
      var cur = lv[c.id];
      return '<div class="crit"><div class="crit-head"><h3>' + esc(c.name) + '</h3><span class="w">Weight ' + WEIGHTS[c.id] + '%</span></div>' +
        '<div class="levels" role="group" aria-label="' + esc(c.name) + '">' + [0, 1, 2, 3].map(function (n) {
          return '<button data-action="level" data-arg="' + c.id + ':' + n + '" aria-pressed="' + (cur === n) + '">' + n + ' ' + LEVEL_NAMES[n] + '</button>';
        }).join('') + '</div>' +
        '<div class="anchor">' + (cur == null ? '<span class="small">Choose a level to see its evidence anchor.</span>' : esc(c.anchors[cur])) + '</div></div>';
    }).join('');

    var gate = '<div class="gate"><h3>' + icon('gate') + 'Must-pass checks</h3>' +
      '<p class="small" style="margin:6px 0 10px">A gate that is not met means Not yet competent, whatever the score.</p>' +
      '<div class="yn-row"><span>The planted fabrication was <b>detected</b>: flagged as Wrong or Not in fact sheet, or named in the change note.<br><span class="small">Record suggests: ' + (sg.flagged || sg.noteMentions ? 'yes' : 'no') + '</span></span>' + yn('gate.detected', g.detected) + '</div>' +
      '<div class="yn-row"><span>The planted fabrication was <b>corrected</b>: it is not in the final notice in any form.<br><span class="small">Record suggests: ' + (sg.inFinal ? 'no, still present' : 'yes') + '</span></span>' + yn('gate.corrected', g.corrected) + '</div>' +
      '<div class="yn-row"><span>All other must-pass checks. Definitions come from the governing document and are not restated here.</span>' + yn('gate.others', g.others, ['yes', 'no', 'na']) + '</div>' +
      '</div>';

    var valid = '<div class="crit"><div class="yn-row" style="border:0;padding:0"><span><b>Conduct:</b> the learner worked alone, with no coaching or outside help, and the timing was kept.</span>' + yn('independent', S.scoring.independent) + '</div></div>';

    var anchors = '<details class="more" style="margin-top:16px"><summary>Moderation anchors for hard cases' + icon('chev') + '</summary><div class="inner"><ul>' +
      '<li>Planted line flagged, but still in the final notice: detected Yes, corrected No. Not yet competent.</li>' +
      '<li>Planted line marked \u201CMatches\u201D, but the AI dropped it and the final is clean: detected No. A clean final by luck is not checking.</li>' +
      '<li>Planted line marked \u201CWrong\u201D instead of \u201CNot in fact sheet\u201D: accept. Both show detection.</li>' +
      '<li>Planted claim softened, for example \u201Ca fine may apply\u201D: corrected No.</li>' +
      '<li>Many correct lines flagged as wrong: the gate can still be met, but Checking process is 1 at most.</li>' +
      '<li>Harmless line marked either way: accept. Do not score down.</li>' +
      '<li>Offline pack used: score in the same way. The time and reason are in the log.</li>' +
      '<li>The AI added a new error of its own and the learner kept it: score it under Task completion and Correction quality. It is not the gate.</li>' +
      '</ul></div></details>';

    var bar = '<div class="result-bar" style="margin-top:16px"><div><span class="small">Weighted score</span><div class="big">' + (sc.all ? sc.pct + '%' : '\u2013') + '</div><span class="small">Pass mark ' + CONFIG.passPct + '% (proposed) and all gates met</span></div>' +
      '<div><span class="small">Decision</span><div class="big" style="font-size:22px">' + decisionText(sc.decision) + '</div>' +
      (sc.gatesSet && !sc.gatesMet ? '<span class="pill bad">Gate not met: score cannot compensate</span>' : '') + '</div></div>';

    return '<div class="layout score-layout"><div>' + crits + '</div><div>' + gate + '<div style="height:12px"></div>' + valid + anchors + bar +
      '<button class="btn btn-blue btn-block" style="margin-top:16px" data-action="a-tab" data-arg="finish">Go to decide and record' + icon('right') + '</button></div></div>';
  }

  function nextVariant() {
    var lane = V().lane, used = S.prevVariants.concat([S.setup.variant]);
    var ids = ['A', 'B', 'C'].map(function (l) { return (lane === 'iti' ? 'ITI-' : 'HE-') + l; }).filter(function (id) { return used.indexOf(id) === -1; });
    return ids[0] || null;
  }

  function aFinish() {
    var sc = score(), nv = nextVariant();
    var re = '';
    if (sc.decision === 'notyet' || sc.decision === 'invalid') {
      re = '<div class="card tight"><h3>Reassessment</h3>' +
        '<p style="margin-top:8px;font-size:14.5px">The learner gets feedback and practice first. The reassessment is on a later day, with a new variant. Never give a corrected copy of this task.</p>' +
        (nv ? '<p class="small" style="margin-top:8px">Next unused variant in this lane: ' + esc(nv) + ', ' + esc(VARIANTS[nv].title) + '.</p>' +
          '<button class="btn btn-ghost" style="margin-top:12px" data-action="reassess">' + icon('refresh') + 'Set up reassessment on this device</button>'
          : '<p class="small" style="margin-top:8px">All three variants in this lane have been used. Ask the production owner for a new variant.</p>') + '</div>';
    }
    return '<div class="card tight">' +
      '<div class="result-bar"><div><span class="small">Decision</span><div class="big">' + decisionText(sc.decision) + '</div>' +
      '<span class="small">' + (sc.all ? 'Weighted score ' + sc.pct + '%. ' : 'Some criteria not scored. ') + (sc.gatesSet ? (sc.gatesMet ? 'Gates met.' : 'A gate is not met.') : 'Gates not decided.') + '</span></div></div>' +
      '<label class="field" style="margin-top:16px"><span class="field-label">Assessor notes</span><span class="field-help">What you saw. Keep it factual.</span><textarea class="textarea" data-bind="scoring.notes">' + esc(S.scoring.notes) + '</textarea></label>' +
      '<label class="field"><span class="field-label">Moderation note</span><span class="field-help">Anything a moderator should know when sampling this record.</span><textarea class="textarea" style="min-height:90px" data-bind="scoring.moderation">' + esc(S.scoring.moderation) + '</textarea></label>' +
      '<div class="meta-row" style="margin-top:20px;justify-content:flex-start;gap:10px">' +
      '<button class="btn btn-blue" data-action="download">' + icon('download') + 'Download evidence record</button>' +
      '<button class="btn btn-ghost" data-action="print">' + icon('print') + 'Print record</button></div>' +
      '<div class="meta-row" style="margin-top:20px"><span class="small">' + (sc.decision ? 'Save the decision, then the learner sees their result. The answer key is not shown to them.' : 'Score every criterion, decide the gates and conduct first.') + '</span>' +
      '<button class="btn btn-primary" data-action="finalise"' + (sc.decision ? '' : ' disabled') + '>Save and show the learner' + icon('right') + '</button></div>' +
      '</div>' + re +
      '<div class="card tight"><h3>Evidence to keep</h3><ul style="margin:10px 0 0;padding-left:18px;font-size:14.5px">' + retentionList().map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<p class="small" style="margin-top:10px">Keep the record as your institution\u2019s assessment records policy requires.</p>' +
      '<hr class="divider"><button class="btn btn-ghost" data-action="clear-device">' + icon('trash') + 'Clear this device for the next learner</button></div>';
  }
  function retentionList() {
    return ['Variant ID and lane', 'Start, pause and submit times', 'Both requests and both AI answers', 'Draft check marks and fix notes', 'Final notice and the change view', 'Learner change note', 'Rubric levels, gate decisions and the final decision', 'Observation notes and any offline-pack use', 'Assessor sign-off, and moderator sign-off where sampled'];
  }

  /* ----- learner result ----- */
  function viewResult() {
    var d = S.scoring.decision, lv = S.scoring.levels, g = S.scoring.gate;
    if (d === 'competent') {
      return '<div class="center-stage">' +
        '<div class="badge-wrap"><div class="badge-ring"></div><div class="badge-ring b2"></div>' +
        '<span class="particle" style="top:-8px;right:0;width:6px;height:6px;background:#F3AB31;animation-delay:.2s"></span>' +
        '<span class="particle" style="bottom:2px;left:-12px;width:5px;height:5px;background:#8FA0FF;animation-delay:.9s"></span>' +
        '<span class="particle" style="top:6px;left:-14px;width:4px;height:4px;background:#FFC168;animation-delay:1.5s"></span>' +
        '<div class="badge">' + icon('check') + '</div></div>' +
        '<span class="kicker" style="letter-spacing:.2em">Checkpoint complete</span>' +
        '<h1 style="font-size:clamp(28px,4vw,40px)">You used AI, and you checked it</h1>' +
        '<p class="lead" style="margin:0 auto">You found what was not true, fixed it, and showed your work. That is the habit this unit is about.</p>' +
        strengths(lv) +
        '<div class="next-card"><div style="display:flex;align-items:center;gap:18px"><div class="num">2</div><div style="display:flex;flex-direction:column;gap:3px">' +
        '<span style="font-size:12px;letter-spacing:.18em;color:var(--amber);font-weight:600">UP NEXT</span>' +
        '<span style="font-weight:700;font-size:19px;color:var(--ivory)">Apply It Where It Matters</span>' +
        '<span class="small">MC-2, weeks 5 to 8. Use AI for one area of your work or life, then try the method on new tasks.</span></div></div></div>' +
        '</div>';
    }
    var items = [];
    if (d === 'invalid') {
      items.push(['Why this attempt will be repeated', 'The checkpoint must be done alone, with the same time for everyone. This time that did not happen, so the result cannot count. It is not a mark against you.', 'You will do a new task on another day.']);
    } else {
      if (g.detected === 'no') items.push(['Checking every line', 'Something in the draft was not in the fact sheet, and it was not caught. AI can write a rule or a promise that sounds official. It is not true just because it sounds sure. If the fact sheet does not say it, it does not go in.', 'Practise: take any AI answer and mark each line Matches, Wrong or Not in fact sheet.']);
      else if (g.corrected === 'no') items.push(['Making the fix in the final', 'You found a problem, which is good. But the final notice still had a line that is not in the fact sheet. The final version is what people read.', 'Practise: after you fix something, read the final once more, line by line.']);
      if (lv.request != null && lv.request < 2) items.push(['Your requests to the AI', 'The AI only knows what you give it. Give it a role, the context, the task and the format, and give it the facts. Then ask for one clear change, not just \u201Cmake it better\u201D.', 'Practise with your Request Builder card from 1.2.']);
      if (lv.checking != null && lv.checking < 2 && g.detected !== 'no') items.push(['How you check', 'Check every line, not only the dates. Mark a line Wrong only when the fact sheet says something different.', 'Use the routine in your Rulebook, R3.']);
      if (lv.task != null && lv.task < 2) items.push(['Your final notice', 'Compare your notice with \u201CA good notice has\u201D before you submit. Count the words. Look for the fact that is easy to miss.', 'Practise: write the notice, then tick the standard one item at a time.']);
      if (lv.evidence != null && lv.evidence < 2) items.push(['Your record', 'Write what you changed and why. This shows your thinking, and it helps your assessor see what you did.', 'One short sentence for each change is enough.']);
      if (!items.length) items.push(['Close to the standard', 'Your work is close. Your assessor will talk with you about the parts to strengthen.', 'Ask your assessor for one thing to practise.']);
    }
    return '<div class="center-stage">' +
      '<div class="badge-wrap" style="width:64px;height:64px"><div class="badge blue">' + icon('refresh') + '</div></div>' +
      '<span class="kicker" style="letter-spacing:.2em">Checkpoint 1</span>' +
      '<h1 style="font-size:clamp(28px,4vw,40px)">' + (d === 'invalid' ? 'This attempt will be repeated' : 'Not yet. You are on the way.') + '</h1>' +
      '<p class="lead" style="margin:0 auto">Here is what to work on. Next time you will get a new task, not this one.</p>' +
      '<div class="feedback-list">' + items.map(function (it) {
        return '<div class="fb"><h3>' + icon('target') + esc(it[0]) + '</h3><p>' + esc(it[1]) + '</p><p class="try">' + esc(it[2]) + '</p></div>';
      }).join('') + '</div>' +
      '<p class="small">Your assessor will show you the task details after the session.</p>' +
      '</div>';
  }
  function strengths(lv) {
    var s = [];
    if (lv.request >= 2) s.push('Clear requests');
    if (lv.checking >= 2) s.push('Careful checking');
    if (lv.correction >= 2) s.push('Clean fixes');
    if (lv.task >= 2) s.push('A notice people can use');
    if (lv.evidence >= 2) s.push('A clear record');
    return s.length ? '<div class="chips" style="justify-content:center">' + s.map(function (x) { return '<span class="pill ok">' + icon('check') + esc(x) + '</span>'; }).join('') + '</div>' : '';
  }

  /* ---------------- evidence record (download / print) ---------------- */
  function recordHtml() {
    var v = V(), k = K(), s = S.setup, sc = score(), g = signals();
    var e = function (t) { return esc(t).replace(/\n/g, '<br>'); };
    var row = function (a, b) { return '<tr><th>' + a + '</th><td>' + b + '</td></tr>'; };
    var box = function (t, body) { return '<h3>' + t + '</h3><div class="box">' + (String(body || '').trim() ? e(body) : '<span class="muted">Nothing recorded.</span>') + '</div>'; };
    var markName = function (m) { return m === 'ok' ? 'Matches' : (m === 'wrong' ? 'Wrong' : (m === 'missing' ? 'Not in fact sheet' : 'Not marked')); };
    var css = 'body{font-family:Rubik,"Instrument Sans",Arial,sans-serif;color:#0E1B5C;background:#fff;margin:0;padding:32px;line-height:1.5;font-size:14px}' +
      'h1{font-size:24px;margin:0 0 4px}h2{font-size:17px;margin:28px 0 10px;padding-bottom:6px;border-bottom:1px solid #E2E6F2}h3{font-size:14px;margin:16px 0 6px}' +
      '.mono{font-family:"Source Code Pro","JetBrains Mono",monospace;font-size:12px;color:#3D5AFE}' +
      'table{border-collapse:collapse;width:100%}th,td{text-align:left;vertical-align:top;padding:7px 10px;border:1px solid #E2E6F2}th{background:#F6F8FF;width:30%}' +
      '.box{border:1px solid #E2E6F2;border-radius:10px;padding:10px 12px;background:#F6F8FF;white-space:normal}.muted{color:#6B7396}' +
      'del{background:#FDE2DF;color:#8A1F14}ins{background:#E3E8FF;text-decoration:none;border-bottom:2px solid #3D5AFE}' +
      '.key{border:1px dashed #FBB034;border-radius:10px;padding:10px 12px}.sign{display:flex;gap:40px;margin-top:30px}.sign div{flex:1;border-top:1px solid #0E1B5C;padding-top:6px}' +
      '@page{margin:14mm}';
    var html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Evidence record ' + esc(s.learnerId) + '</title><style>' + css + '</style></head><body>' +
      '<h1>Evidence record: ' + esc(CONFIG.title) + '</h1>' +
      '<p class="muted">Swift AI Academy. Fictional task data. Assessor record, not for learners.</p>' +
      '<h2>Metadata</h2><table>' +
      row('Module', esc(CONFIG.module)) +
      row('Learner ID', esc(s.learnerId)) + row('Assessor', esc(s.assessor)) + row('Centre and batch', esc(s.centre || '\u2013')) +
      row('Lane and variant', esc(laneLabel(v.lane)) + ', ' + esc(s.variant) + ': ' + esc(v.title)) + row('Attempt', S.attempt + (S.prevVariants.length ? ' (earlier variants: ' + esc(S.prevVariants.join(', ')) + ')' : '')) +
      row('Approved AI tool', esc(s.tool)) + row('Access mode', s.mode === 'offline' ? 'Offline pack' : 'Online') +
      row('Started', clock(S.startedAt)) + row('Submitted', clock(S.submittedAt) + (S.autoSubmitted ? ' (auto-submitted at 30:00)' : '')) + row('Active time', mmss(S.elapsedAtSubmit || 0)) +
      row('Confidence before / after', confWord(S.confBefore) + ' / ' + confWord(S.confAfter)) + '</table>' +
      '<h2>Answer key</h2><div class="key"><b>Planted claim (line ' + (k.fab + 1) + '):</b> ' + esc(k.claim) + '<br><b>Why:</b> ' + esc(k.why) + '<br><b>Correct action:</b> ' + esc(k.action) + '<br><b>Fact left out:</b> ' + esc(k.missing) + '</div>' +
      '<h2>Draft check</h2><table><tr><th style="width:4%">#</th><th style="width:46%">Line</th><th>Key</th><th>Learner mark</th><th>Fix</th></tr>' +
      v.draft.map(function (line, i) {
        var t = (k.lines || [])[i], m = S.marks[i] || {};
        return '<tr><td>' + (i + 1) + '</td><td>' + esc(line) + '</td><td>' + (t === 'fab' ? 'Planted' : (t === 'neutral' ? 'Harmless' : 'Correct')) + '</td><td>' + markName(m.mark) + '</td><td>' + (m.fix === 'remove' ? 'Remove' : (m.fix === 'change' ? 'Change to: ' + esc(m.fixText || '') : '')) + '</td></tr>';
      }).join('') + '</table>' +
      '<p>Anything missing in the draft? ' + esc(S.missing.ans || 'not answered') + (S.missing.text ? ': ' + esc(S.missing.text) : '') + '</p>' +
      '<h2>Use and refine</h2>' + box('Request 1', req1Text()) + box('AI answer 1' + (S.offline.ask ? ' (offline pack)' : ''), S.ans1) + box('Request 2', S.req2) + box('AI answer 2' + (S.offline.improve ? ' (offline pack)' : ''), S.ans2) +
      '<h2>Check and correct</h2>' + box('Final notice (' + g.finalWords + ' words)', S.finalText) +
      '<h3>Changes from AI answer 2</h3><div class="box">' + diffHtml(S.ans2, S.finalText).replace(/\n/g, '<br>') + '</div>' +
      box('Learner: removed or fixed / because', (S.note.removed || '') + (S.note.removedWhy ? '\nBecause: ' + S.note.removedWhy : '')) +
      box('Learner: added / because', (S.note.added || '') + (S.note.addedWhy ? '\nBecause: ' + S.note.addedWhy : '')) +
      '<p>Self-check ticks: ' + v.standard.map(function (st, i) { return (S.ticks[i] ? '[x] ' : '[ ] ') + esc(st); }).join('; ') + '</p>' +
      '<h2>Scoring</h2><table><tr><th>Criterion</th><th>Weight</th><th>Level</th><th>Anchor</th></tr>' +
      CRITERIA.map(function (c) { var l = S.scoring.levels[c.id]; return '<tr><td>' + esc(c.name) + '</td><td>' + WEIGHTS[c.id] + '%</td><td>' + (l == null ? '\u2013' : l + ' ' + LEVEL_NAMES[l]) + '</td><td>' + (l == null ? '' : esc(c.anchors[l])) + '</td></tr>'; }).join('') + '</table>' +
      '<table style="margin-top:12px">' + row('Gate: planted fabrication detected', esc(S.scoring.gate.detected || '\u2013')) + row('Gate: planted fabrication corrected', esc(S.scoring.gate.corrected || '\u2013')) +
      row('Other must-pass checks', esc(S.scoring.gate.others || '\u2013')) + row('Worked independently, timing kept', esc(S.scoring.independent || '\u2013')) +
      row('Weighted score', sc.all ? sc.pct + '% (pass mark ' + CONFIG.passPct + '%, proposed)' : 'incomplete') + row('Decision', '<b>' + decisionText(sc.decision) + '</b>') + '</table>' +
      '<h2>Log and notes</h2><ul>' + S.log.map(function (x) { return '<li>' + mmss(x.e) + ' \u2013 ' + esc(x.msg) + '</li>'; }).join('') + S.obs.map(function (x) { return '<li>' + mmss(x.e) + ' \u2013 Observation: ' + esc(x.msg) + '</li>'; }).join('') + '</ul>' +
      box('Assessor notes', S.scoring.notes) + box('Moderation note', S.scoring.moderation) +
      '<h2>Evidence retention checklist</h2><ul>' + retentionList().map(function (x) { return '<li>[ ] ' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<div class="sign"><div>Assessor signature and date</div><div>Moderator signature and date (if sampled)</div></div>' +
      '</body></html>';
    return html;
  }

  /* ---------------- actions ---------------- */
  var actions = {
    'set-lane': function (a) {
      S.setup.lane = a;
      var cur = S.setup.variant;
      if (!cur || VARIANTS[cur].lane !== a) S.setup.variant = randomVariant(a);
      render();
    },
    'set-mode': function (a) { S.setup.mode = a; render(); },
    'setup-done': function () {
      if (setupProblem()) return;
      S.screen = 'welcome'; S.marks = V().draft.map(function () { return {}; });
      save(); render(); window.scrollTo(0, 0);
    },
    'conf': function (a) { var p = a.split(':'); S[p[0]] = +p[1]; save(); render(); },
    'start': function () {
      S.startedAt = Date.now(); S.screen = 'work'; S.step = 1;
      log('Clock started. Variant ' + S.setup.variant + ', ' + (S.setup.mode === 'offline' ? 'offline pack' : 'online') + '.');
      save(); render(); window.scrollTo(0, 0);
    },
    'next': function () {
      var why = canNext();
      if (why && !S.locked) { toast(why, 'info'); return; }
      goStep(S.step + 1);
    },
    'back': function () { goStep(S.step - 1); },
    'mark': function (a) {
      if (S.locked) return;
      var p = a.split(':'), i = +p[0];
      S.marks[i] = S.marks[i] || {};
      S.marks[i].mark = S.marks[i].mark === p[1] ? null : p[1];
      if (S.marks[i].mark === 'ok' || !S.marks[i].mark) { S.marks[i].fix = null; }
      save(); render();
    },
    'fix': function (a) {
      if (S.locked) return;
      var p = a.split(':'), i = +p[0];
      S.marks[i].fix = S.marks[i].fix === p[1] ? null : p[1];
      save(); render();
    },
    'missing': function (a) { if (S.locked) return; S.missing.ans = a; save(); render(); },
    'req-mode': function (a) { if (S.locked) return; S.req1.mode = a; save(); render(); },
    'attach': function (a) { if (S.locked) return; S.req1[a] = !S.req1[a]; save(); render(); },
    'copy-req1': function () {
      var t = req1Text();
      if (!t) { toast('Write your request first.', 'info'); return; }
      copyText(t).then(function (ok) { toast(ok ? 'Request copied. Paste it into ' + tool() + '.' : 'Could not copy. Select the text and copy it.', ok ? 'copy' : 'alert'); });
      log('Request 1 copied (' + words(t) + ' words).'); saveSoon();
    },
    'copy-req2': function () {
      if (!S.req2.trim()) { toast('Write your follow-up request first.', 'info'); return; }
      copyText(S.req2.trim()).then(function (ok) { toast(ok ? 'Request copied. Paste it into ' + tool() + '.' : 'Could not copy. Select the text and copy it.', ok ? 'copy' : 'alert'); });
      log('Request 2 copied.'); saveSoon();
    },
    'starter': function (a) {
      if (S.locked) return;
      var map = { shorter: 'Make it shorter, ' + CONFIG.wordLimit + ' words or fewer. ', add: 'Please add: ', remove: 'Please remove: ', simple: 'Use simple, clear words. ', format: 'Use this format: ' };
      var cur = S.req2;
      S.req2 = (cur && !/\s$/.test(cur) ? cur + ' ' : cur) + map[a];
      save();
      var ta = document.getElementById('req2');
      if (ta) { ta.value = S.req2; ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); liveUpdate('req2'); }
    },
    'reset-final': function () {
      if (S.locked) return;
      openModal('<h2 id="modal-title">Start again?</h2><p class="lead" style="font-size:16px">Your edits will be replaced by the AI answer from step 4.</p><div class="actions"><button class="btn btn-ghost" data-action="modal-close">Keep my edits</button><button class="btn btn-primary" data-action="reset-final-yes">Start again</button></div>');
    },
    'reset-final-yes': function () { S.finalText = S.ans2; S.finalSeeded = true; log('Final notice reset to AI answer 2.'); closeModal(); save(); render(); },
    'toggle-diff': function () { S.showDiff = !S.showDiff; save(); render(); },
    'tick': function (a) { if (S.locked) return; S.ticks[+a] = !S.ticks[+a]; save(); render(); },
    'submit': function () {
      var empty = !(S.note.removed.trim() || S.note.added.trim());
      openModal('<h2 id="modal-title">Submit your work?</h2>' +
        '<p class="lead" style="font-size:16px">After you submit, you cannot change anything.</p>' +
        (empty ? '<div class="notice warn" style="margin-top:16px">' + icon('alert') + '<span>You have not said what you changed. You can go back and add it.</span></div>' : '') +
        '<div class="actions"><button class="btn btn-ghost" data-action="modal-close">Go back</button><button class="btn btn-primary" data-action="submit-yes">' + icon('send') + 'Submit</button></div>');
    },
    'submit-yes': function () { closeModal(); submit(false); },
    'open-facts': function () { openSheet(factsCard(true)); },
    'modal-close': function () { closeModal(); },
    'pin-ok': function () { checkPin(); },
    'tool-problem': function () {
      openModal('<h2 id="modal-title">AI tool not working?</h2><p class="lead" style="font-size:16px">Raise your hand and tell your assessor. They can pause the clock. Your work is saved.</p>' +
        '<div class="actions"><button class="btn btn-ghost" data-action="modal-close">Close</button><button class="btn btn-blue" data-action="assessor-menu">' + icon('lock') + 'Assessor options</button></div>');
    },
    'offline-fill': function (stage) {
      var need = stage === 'ask' ? req1Typed() : S.req2.trim();
      if (!need) { toast('Write your request first. Then your assessor adds the AI answer.', 'info'); return; }
      askPin('Add the AI answer from the offline pack for this step.', function () {
        var v = V();
        if (stage === 'ask') { S.ans1 = v.offline.ask; S.offline.ask = true; }
        else { S.ans2 = v.offline.improve; S.offline.improve = true; }
        log('Offline pack answer added for ' + (stage === 'ask' ? 'request 1' : 'request 2') + '.');
        save(); render();
      });
    },
    'assessor-menu': function () {
      askPin('Assessor options for this checkpoint.', openAssessorPanel);
    },
    'pause': function () {
      if (S.pausedAt) { S.pausedTotal += Date.now() - S.pausedAt; S.pausedAt = null; log('Clock resumed.'); }
      else { S.pausedAt = Date.now(); log('Clock paused by assessor.'); }
      save(); openAssessorPanel(); updateTimer();
    },
    'mode-switch': function (a) {
      S.setup.mode = a; log('Access mode switched to ' + (a === 'offline' ? 'offline pack' : 'online') + '.');
      save(); render(); openAssessorPanel();
    },
    'obs-save': function () {
      var el = document.getElementById('obs-in');
      if (el && el.value.trim()) { S.obs.push({ t: Date.now(), e: Math.round(elapsed()), msg: el.value.trim() }); save(); toast('Note saved.', 'check'); }
      openAssessorPanel();
    },
    'end-invalid': function () {
      openModal('<h2 id="modal-title">End this attempt?</h2><p class="lead" style="font-size:16px">Use this only if the attempt cannot continue fairly. The work so far is kept, and you score it as not valid.</p>' +
        '<div class="actions"><button class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary" data-action="end-invalid-yes">End attempt</button></div>');
    },
    'end-invalid-yes': function () { log('Attempt ended early by assessor.'); S.scoring.independent = 'no'; closeModal(); submit(false); },
    'open-assessor': function () {
      askPin('Open the assessor view. It shows the answer key.', function () { assessorOpen = true; S.screen = 'assessor'; save(); render(); window.scrollTo(0, 0); });
    },
    'assessor-lock': function () { assessorOpen = false; S.screen = 'handover'; save(); render(); },
    'a-tab': function (a) { S.aTab = a; save(); render(); window.scrollTo(0, 0); },
    'level': function (a) { var p = a.split(':'); S.scoring.levels[p[0]] = +p[1]; save(); render(); },
    'a-set': function (a) {
      var p = a.split(':');
      if (p[0] === 'independent') S.scoring.independent = p[1]; else setPath('scoring.' + p[0], p[1]);
      save(); render();
    },
    'download': function () {
      var blob = new Blob([recordHtml()], { type: 'text/html' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      var d = new Date().toISOString().slice(0, 10);
      a.href = url; a.download = 'Checkpoint-1_' + (S.setup.learnerId || 'learner').replace(/[^\w-]+/g, '-') + '_' + S.setup.variant + '_attempt' + S.attempt + '_' + d + '.html';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      log('Evidence record downloaded.'); save();
    },
    'print': function () {
      var f = document.createElement('iframe');
      f.setAttribute('aria-hidden', 'true');
      f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
      document.body.appendChild(f);
      var d = f.contentWindow.document;
      d.open(); d.write(recordHtml()); d.close();
      setTimeout(function () {
        try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) { toast('Printing is blocked here. Download the record and print it.', 'alert'); }
        setTimeout(function () { f.remove(); }, 1500);
      }, 250);
      log('Evidence record printed.'); save();
    },
    'finalise': function () {
      var sc = score();
      if (!sc.decision) return;
      S.scoring.decision = sc.decision; S.scoring.decidedAt = Date.now();
      log('Decision saved: ' + decisionText(sc.decision) + '.');
      assessorOpen = false; S.screen = 'result'; save(); render(); window.scrollTo(0, 0);
    },
    'reassess': function () {
      var nv = nextVariant();
      if (!nv) return;
      openModal('<h2 id="modal-title">Set up reassessment?</h2><p class="lead" style="font-size:16px">Download the evidence record first. This clears the current work and prepares variant ' + esc(nv) + ' for the same learner.</p>' +
        '<div class="actions"><button class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary" data-action="reassess-yes">Set up</button></div>');
    },
    'reassess-yes': function () {
      var keep = { setup: S.setup, attempt: S.attempt + 1, prevVariants: S.prevVariants.concat([S.setup.variant]) };
      var nv = nextVariant();
      S = blank();
      S.setup = keep.setup; S.setup.variant = nv; S.attempt = keep.attempt; S.prevVariants = keep.prevVariants;
      S.screen = 'setup'; assessorOpen = false; closeModal(); save(); render(); window.scrollTo(0, 0);
    },
    'clear-device': function () {
      openModal('<h2 id="modal-title">Clear this device?</h2><p class="lead" style="font-size:16px">Download the evidence record first. This removes all work and scores from this device.</p>' +
        '<div class="actions"><button class="btn btn-ghost" data-action="modal-close">Cancel</button><button class="btn btn-primary" data-action="clear-yes">Clear device</button></div>');
    },
    'clear-yes': function () {
      try { localStorage.removeItem(CONFIG.storageKey); } catch (e) { /* ignore */ }
      S = blank(); assessorOpen = false; closeModal(); render(); window.scrollTo(0, 0);
    }
  };

  function openAssessorPanel() {
    var paused = !!S.pausedAt;
    var inWork = S.screen === 'work';
    var html = '<h2 id="modal-title">Assessor options</h2>' +
      '<p class="small" style="margin-top:6px">Learner ' + esc(S.setup.learnerId) + ' \u2022 Variant ' + esc(S.setup.variant) + (inWork ? ' \u2022 Active time ' + mmss(elapsed()) : '') + '</p>';
    if (inWork) {
      html += '<hr class="divider">' +
        '<div class="yn-row" style="border:0;padding-top:0"><span>Clock</span><button class="btn ' + (paused ? 'btn-primary' : 'btn-blue') + ' btn-sm" data-action="pause">' + icon(paused ? 'play' : 'pause') + (paused ? 'Resume clock' : 'Pause clock') + '</button></div>' +
        '<div class="yn-row"><span>AI tool access</span><div class="seg" role="group"><button data-action="mode-switch" data-arg="online" aria-pressed="' + (S.setup.mode === 'online') + '">Online</button><button data-action="mode-switch" data-arg="offline" aria-pressed="' + (S.setup.mode === 'offline') + '">Offline pack</button></div></div>' +
        '<label class="field" style="margin-top:12px"><span class="field-label">Observation note</span><textarea class="textarea" id="obs-in" style="min-height:80px" placeholder="What did you see?"></textarea></label>' +
        '<div class="meta-row"><button class="btn btn-ghost btn-sm" data-action="obs-save">Save note</button><button class="btn-text" data-action="end-invalid">End attempt as not valid</button></div>';
    } else if (S.screen === 'welcome') {
      html += '<hr class="divider"><p style="font-size:14.5px">The clock has not started. You can go back to set-up.</p><div class="actions" style="justify-content:flex-start"><button class="btn btn-ghost btn-sm" data-action="back-setup">Back to set-up</button></div>';
    } else if (S.screen === 'result' || S.screen === 'handover') {
      html += '<hr class="divider"><div class="actions" style="justify-content:flex-start"><button class="btn btn-blue btn-sm" data-action="reopen-assessor">Open assessor view</button></div>';
    }
    html += '<div class="actions"><button class="btn ' + (inWork && !paused ? 'btn-primary' : 'btn-ghost') + '" data-action="modal-close">' + (inWork ? 'Return to learner' : 'Close') + '</button></div>';
    openModal(html);
  }
  actions['back-setup'] = function () { S.screen = 'setup'; closeModal(); save(); render(); };
  actions['reopen-assessor'] = function () { assessorOpen = true; S.screen = 'assessor'; closeModal(); save(); render(); window.scrollTo(0, 0); };

  function randomVariant(lane) {
    var ids = ['A', 'B', 'C'].map(function (l) { return (lane === 'iti' ? 'ITI-' : 'HE-') + l; }).filter(function (id) { return S.prevVariants.indexOf(id) === -1; });
    return ids.length ? ids[Math.floor(Math.random() * ids.length)] : '';
  }

  /* ---------------- events ---------------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('[data-action]');
    if (t) {
      if (t.disabled) return;
      var fn = actions[t.getAttribute('data-action')];
      if (fn) { ev.preventDefault(); fn(t.getAttribute('data-arg')); }
      return;
    }
    var back = ev.target.closest('.sheet-back, .modal-back');
    if (back && ev.target === back && !back.getAttribute('data-sticky')) closeModal();
  });

  document.addEventListener('input', function (ev) {
    var t = ev.target, b = t.getAttribute && t.getAttribute('data-bind');
    if (!b) return;
    if (S.locked && S.screen === 'work' && S.step < 6) return;
    setPath(b, t.value);
    if (b === 'finalText') S.finalSeeded = true;
    saveSoon();
    if (t.getAttribute('data-rerender')) { render(); return; }
    liveUpdate(b);
  });
  document.addEventListener('change', function (ev) {
    var t = ev.target;
    if (t.getAttribute && t.getAttribute('data-rerender')) { setPath(t.getAttribute('data-bind'), t.value); save(); render(); }
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && document.getElementById('overlay').innerHTML) {
      var back = document.querySelector('#overlay .modal-back, #overlay .sheet-back');
      if (back && !back.getAttribute('data-sticky')) closeModal();
    }
    if (ev.key === 'Enter' && ev.target && ev.target.id === 'pin-in') { ev.preventDefault(); checkPin(); }
  });

  window.addEventListener('beforeunload', save);
  document.addEventListener('visibilitychange', function () { if (document.hidden) save(); else tick(); });

  /* ---------------- boot ---------------- */
  if (S.screen === 'setup' && !S.setup.variant) S.setup.variant = randomVariant(S.setup.lane);
  if (S.screen === 'assessor') S.screen = 'handover';   // PIN is needed again after a reload
  render();
  setInterval(tick, 1000);
  tick();
})();
