const numInputS = document.getElementById('num');
const generateBtnS = document.getElementById('generate');
const printBtnS = document.getElementById('print');
const resultS = document.getElementById('result');

function genSquares(){
  const n = parseInt(numInputS.value,10);
  if(Number.isNaN(n) || n<1 || n>100){
    resultS.innerHTML = `<div class="card" style="padding:16px;color:#b91c1c;background:#fff7f7;border-radius:10px">Enter a number between 1 and 100.</div>`;
    return;
  }
  const wrap = document.createElement('div');
  wrap.className='table-wrap';
  const card = document.createElement('div');
  card.className='table-card';
  const title = document.createElement('h2');
  title.textContent = `Squares up to ${n}`;
  card.appendChild(title);
  for(let i=1;i<=n;i++){
    const r=document.createElement('div');r.className='mul-row';
    const left=document.createElement('div');left.className='mul-left';left.textContent=`${i}²`;
    const right=document.createElement('div');right.className='mul-right';right.textContent=i*i;
    r.appendChild(left);r.appendChild(right);card.appendChild(r);

    // steps: show multiplication steps for clarity
    const steps = document.createElement('div');steps.className='steps';
    const s1 = document.createElement('div');s1.className='step';
    s1.innerHTML = `<span class="muted">Step:</span> ${i} × ${i} = ${i*i}`;
    steps.appendChild(s1);
    card.appendChild(steps);
  }
  wrap.appendChild(card);resultS.innerHTML='';resultS.appendChild(wrap);
}

generateBtnS.addEventListener('click',genSquares);
numInputS.addEventListener('keyup',e=>{ if(e.key==='Enter') genSquares(); });
printBtnS.addEventListener('click',()=>{ if(!numInputS.value) return alert('Enter a number first'); window.print(); });

// auto-read ?n= query param
(() => {
  try{
    const p = new URLSearchParams(location.search);
    const n = p.get('n');
    if(n){ numInputS.value = n; genSquares(); }
  }catch(e){/*ignore*/}
})();
