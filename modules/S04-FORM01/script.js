var TOTAL = 6;
var current = 0;
var pageLabels = ["Brief","Attach artifacts","Progress","Review","Submit","Receipt"];

function buildJump(){
  var sel = document.getElementById('jumpSelect');
  sel.innerHTML = '';
  pageLabels.forEach(function(label, i){
    var opt = document.createElement('option');
    opt.value = i;
    opt.textContent = (i+1) + '. ' + label;
    sel.appendChild(opt);
  });
}

function render(){
  document.querySelectorAll('.page').forEach(function(p){
    p.classList.toggle('active', parseInt(p.getAttribute('data-page')) === current);
  });
  document.getElementById('jumpSelect').value = current;
  document.getElementById('pageCount').textContent = (current+1) + ' / ' + TOTAL;
  document.getElementById('backBtn').disabled = (current === 0);
  document.getElementById('nextBtn').disabled = (current === TOTAL-1) || (current === 4);
  if(current === 2) updateGauge();
  if(current === 3) renderReview();
  window.scrollTo({top:0, behavior:'smooth'});
}

function changePage(delta){
  var next = current + delta;
  if(next < 0 || next > TOTAL-1) return;
  current = next;
  render();
}

/* ================= ARTIFACTS ================= */
var artifacts = [
  {id:'reading', title:'Reading notes', help:'Add your notes or a screenshot from the reading task.', types:['pdf','docx','jpg','png'], file:null,
   color:'var(--indigo)', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'},
  {id:'cardlab', title:'Card and both Labs', help:'Add screenshots of your finished Card and Lab tasks.', types:['pdf','docx','jpg','png'], file:null,
   color:'var(--amber)', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>'},
  {id:'bot', title:'Practice Bot mastery', help:'Add a screenshot showing all 4 rounds cleared.', types:['pdf','jpg','png'], file:null,
   color:'var(--teal)', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>'},
  {id:'rulebook', title:'My Rulebook page', help:'Add your finished Rulebook page, screenshot or scan.', types:['pdf','jpg','png'], file:null,
   color:'var(--purple)', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h6M8 11h8"/></svg>'},
  {id:'peer', title:'Peer Exchange answers', help:'Add your saved answers from the Peer Exchange activity.', types:['pdf','docx','jpg','png'], file:null,
   color:'var(--coral)', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6M17 14c2.8 0 5 2 5 6"/></svg>'},
  {id:'checkpoint', title:'Checkpoint 1 evidence', help:'Add the AI\u2019s answer and your corrected version from Checkpoint 1.', types:['pdf','docx','jpg','png'], file:null,
   color:'var(--emerald)', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18M5 4h11l-2 4 2 4H5"/></svg>'}
];

function renderArtifacts(){
  var list = document.getElementById('artifactList');
  list.innerHTML = '';
  artifacts.forEach(function(a){
    var row = document.createElement('div');
    row.className = 'artifact-row';
    row.id = 'row-' + a.id;
    row.innerHTML =
      '<div class="artifact-top"><span class="artifact-icon" style="background:'+a.color+';">'+a.icon+'</span><span class="artifact-title">'+a.title+'<span class="artifact-req">Required</span></span></div>'+
      '<div class="artifact-help">'+a.help+'</div>'+
      '<div class="attach-row">'+
        '<input class="attach-input" id="input-'+a.id+'" placeholder="Type a file name, e.g. rulebook-page.pdf">'+
        '<button class="attach-btn" onclick="attachFile(\''+a.id+'\')" id="btn-'+a.id+'" style="border-color:'+a.color+';color:'+a.color+';">'+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>'+
          'Attach</button>'+
      '</div>'+
      '<div class="file-types">Files allowed: .'+a.types.join(', .')+'</div>'+
      '<div id="filearea-'+a.id+'"></div>';
    list.appendChild(row);
  });
}

function attachFile(id){
  var a = artifacts.filter(function(x){return x.id===id;})[0];
  var input = document.getElementById('input-'+id);
  var val = input.value.trim();
  var area = document.getElementById('filearea-'+id);
  if(val === ''){ return; }
  var ext = val.split('.').pop().toLowerCase();
  if(a.types.indexOf(ext) === -1){
    area.innerHTML = '<div class="file-error"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>That file type is not accepted here. Please use: .'+a.types.join(', .')+'</div>';
    return;
  }
  var wasAttached = a.file !== null;
  a.file = val;
  input.value = '';
  var replaceNote = wasAttached ? ' <span style="color:var(--amber);">(replaced — previous version kept in audit trail)</span>' : '';
  area.innerHTML =
    '<div class="file-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'+
    '<span class="fname">'+val+replaceNote+'</span>'+
    '<span class="fremove" onclick="removeFile(\''+id+'\')">&times;</span></div>';
  document.getElementById('btn-'+id).innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>Replace';
}

function removeFile(id){
  var a = artifacts.filter(function(x){return x.id===id;})[0];
  a.file = null;
  document.getElementById('filearea-'+id).innerHTML = '';
  document.getElementById('btn-'+id).innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>Attach';
}

/* ================= PROGRESS GAUGE ================= */
function updateGauge(){
  var count = artifacts.filter(function(a){return a.file;}).length;
  var pct = Math.round((count/artifacts.length)*100);
  document.getElementById('gaugePct').textContent = pct + '%';
  document.getElementById('gaugeCount').textContent = count + ' of ' + artifacts.length + ' artifacts attached';
  document.getElementById('gaugeRing').style.background = 'conic-gradient(var(--emerald) ' + (pct*3.6) + 'deg, #E7ECF7 ' + (pct*3.6) + 'deg)';
  updateSubmitState();
}

/* ================= CONNECTIVITY SIM ================= */
var isOnline = true;
function toggleConnection(){
  isOnline = !isOnline;
  var dot = document.getElementById('connectDot');
  var label = document.getElementById('connectLabel');
  var note = document.getElementById('offlineNote');
  var btn = document.getElementById('connectBtn');
  if(isOnline){
    dot.classList.remove('offline');
    label.textContent = 'Connected — progress saves automatically';
    note.classList.remove('show');
    btn.textContent = 'Simulate connection loss';
  } else {
    dot.classList.add('offline');
    label.textContent = 'Offline — your progress is still saved here';
    note.classList.add('show');
    btn.textContent = 'Simulate reconnect';
  }
}

/* ================= REVIEW ================= */
function renderReview(){
  var list = document.getElementById('reviewList');
  list.innerHTML = '';
  artifacts.forEach(function(a){
    var row = document.createElement('div');
    row.className = 'review-row';
    row.innerHTML =
      '<span class="rleft"><span class="status-dot '+(a.file?'done':'pending')+'"></span><span class="rk">'+a.title+'</span></span>'+
      '<span class="rv">'+(a.file ? a.file : 'Not attached yet')+'<span class="redit" onclick="current=1;render();">Edit</span></span>';
    list.appendChild(row);
  });
}

/* ================= SUBMIT ================= */
function updateSubmitState(){
  var count = artifacts.filter(function(a){return a.file;}).length;
  var declared = document.getElementById('declareBox') ? document.getElementById('declareBox').checked : false;
  var ready = (count === artifacts.length && declared);
  var btn = document.getElementById('submitBtn');
  if(btn){
    btn.disabled = !ready;
    document.getElementById('submitHelp').textContent = ready
      ? 'Everything is ready. Submitting saves a new version in your record.'
      : 'Attach every required file and tick the declaration on the earlier pages. Then this button will unlock.';
  }
}

function doSubmit(){
  var count = artifacts.filter(function(a){return a.file;}).length;
  var type = document.getElementById('submissionType').value;
  var now = new Date();
  var idStr = 'M1-' + now.getFullYear() + String(now.getMonth()+1).padStart(2,'0') + String(now.getDate()).padStart(2,'0') + '-' + Math.floor(1000+Math.random()*9000);
  document.getElementById('receiptId').textContent = 'ID: ' + idStr;
  document.getElementById('receiptType').textContent = type;
  document.getElementById('receiptCount').textContent = count + ' of ' + artifacts.length;
  document.getElementById('receiptTime').textContent = now.toLocaleString();
  current = 5;
  render();
}

/* ================= INIT ================= */
document.addEventListener('DOMContentLoaded', function(){
  buildJump();
  renderArtifacts();
  render();
});