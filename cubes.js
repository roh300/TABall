const numInputC = document.getElementById('num');
const generateBtnC = document.getElementById('generate');
const printBtnC = document.getElementById('print');
const resultC = document.getElementById('result');

function genCubes(){
  const n = parseInt(numInputC.value,10);
  if(Number.isNaN(n) || n<1 || n>100){
    resultC.innerHTML = `<div class="card" style="padding:16px;color:#b91c1c;background:#fff7f7;border-radius:10px">Enter a number between 1 and 100.</div>`;
    return;
  }
  const wrap = document.createElement('div');
  wrap.className='table-wrap';
  const card = document.createElement('div');
  card.className='table-card';
  const title = document.createElement('h2');
  title.textContent = `Cubes up to ${n}`;
  card.appendChild(title);
  for(let i=1;i<=n;i++){
    const r=document.createElement('div');r.className='mul-row';
    const left=document.createElement('div');left.className='mul-left';left.textContent=`${i}³`;
    const right=document.createElement('div');right.className='mul-right';right.textContent=i*i*i;
    r.appendChild(left);r.appendChild(right);card.appendChild(r);

    // steps: show repeated multiplication and expanded form
    const steps = document.createElement('div');steps.className='steps';
    const s1 = document.createElement('div');s1.className='step';
    s1.innerHTML = `<span class="muted">Step:</span> ${i} × ${i} × ${i} = ${i*i*i}`;
    const s2 = document.createElement('div');s2.className='step';
    s2.innerHTML = `<span class="muted">Expanded:</span> (${i}×${i}) × ${i} = ${i*i} × ${i} = ${i*i*i}`;
    steps.appendChild(s1);steps.appendChild(s2);
    card.appendChild(steps);
  }
  wrap.appendChild(card);resultC.innerHTML='';resultC.appendChild(wrap);
}

generateBtnC.addEventListener('click',genCubes);
numInputC.addEventListener('keyup',e=>{ if(e.key==='Enter') genCubes(); });
printBtnC.addEventListener('click',()=>{ if(!numInputC.value) return alert('Enter a number first'); window.print(); });

// auto-read ?n= query param
(() => {
  try{
    const p = new URLSearchParams(location.search);
    const n = p.get('n');
    if(n){ numInputC.value = n; genCubes(); }
  }catch(e){/*ignore*/}
})();
