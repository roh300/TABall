const numInput = document.getElementById('num');
const generateBtn = document.getElementById('generate');
const printBtn = document.getElementById('print');
const result = document.getElementById('result');
const chips = document.getElementById('chips');
// nav search support (if nav search exists on this page)
const navSearchForm = document.getElementById('nav-search-form');
const navSearchInput = document.getElementById('nav-search');

// Create quick chips 2..12
for(let i=2;i<=12;i++){
  const c = document.createElement('button');
  c.className='chip';
  c.type='button';
  c.textContent = i;
  c.addEventListener('click',()=>{
    numInput.value = i; generateTable();
  });
  chips.appendChild(c);
}

function validate(n){
  if(Number.isNaN(n)) return false;
  if(n<2 || n>100) return false;
  return true;
}

function generateTable(){
  const n = parseInt(numInput.value,10);
  if(!validate(n)){
    result.innerHTML = `<div class="card" style="padding:16px;color:#b91c1c;background:#fff7f7;border-radius:10px">Please enter a number between 2 and 100.</div>`;
    return;
  }

  // create card
  const wrap = document.createElement('div');
  wrap.className = 'table-wrap';

  const card = document.createElement('div');
  card.className = 'table-card';

  const title = document.createElement('h2');
  title.textContent = `Table of ${n}`;
  card.appendChild(title);

  // add rows 1..10
  for(let i=1;i<=10;i++){
    const row = document.createElement('div');
    row.className='mul-row';
    const left = document.createElement('div');
    left.className='mul-left';
    left.textContent = `${n} × ${i}`;
    const right = document.createElement('div');
    right.className='mul-right';
    right.textContent = n * i;
    row.appendChild(left);
    row.appendChild(right);
    card.appendChild(row);
  }

  wrap.appendChild(card);

  // offer additional small multiples layout (3-up) for print preview
  const multi = document.createElement('div');
  multi.className='table-wrap';
  for(let col=0;col<2;col++){
    const ccard = card.cloneNode(true);
    multi.appendChild(ccard);
  }

  // show
  result.innerHTML = '';
  result.appendChild(wrap);

  // smooth scroll
  setTimeout(()=>wrap.scrollIntoView({behavior:'smooth'}),80);
}

generateBtn.addEventListener('click',generateTable);
numInput.addEventListener('keyup',e=>{ if(e.key==='Enter') generateTable(); });

printBtn.addEventListener('click',()=>{
  // ensure table exists
  const n = parseInt(numInput.value,10);
  if(!validate(n)){
    alert('Please enter a valid number between 2 and 100 before printing.');
    return;
  }
  // open print dialog
  window.print();
});

  // simple search parsing and redirect
  if(navSearchForm){
    navSearchForm.addEventListener('submit',e=>{
      e.preventDefault();
      const q = (navSearchInput.value||'').trim().toLowerCase();
      if(!q) return;
      // patterns: 'squares 5', 'cubes 10', 'roots 25', 'sqrt 25', 'cuberoot 27'
      const parts = q.split(/\s+/);
      const cmd = parts[0];
      const arg = parts[1];
      if(cmd.startsWith('squa')){
        const url = arg?`squares.html?n=${encodeURIComponent(arg)}`:'squares.html';
        location.href = url; return;
      }
      if(cmd.startsWith('cube')){
        const url = arg?`cubes.html?n=${encodeURIComponent(arg)}`:'cubes.html';
        location.href = url; return;
      }
      if(cmd.startsWith('root') || cmd==='sqrt' || cmd==='cuberoot' || cmd==='cbrt'){
        const url = arg?`roots.html?n=${encodeURIComponent(arg)}&t=${cmd.includes('cube')||cmd==='cbrt'?'cbrt':'sqrt'}`:'roots.html';
        location.href = url; return;
      }
      // fallback: try tables
      if(!Number.isNaN(Number(cmd))){
        location.href = `index.html?n=${encodeURIComponent(cmd)}`; return;
      }
      // otherwise open tables
      location.href = 'index.html';
    });
  }

// generate initial table
generateTable();
