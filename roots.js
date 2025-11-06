const numInputR = document.getElementById('num');
const generateBtnR = document.getElementById('generate');
const printBtnR = document.getElementById('print');
const resultR = document.getElementById('result');
const rootType = document.getElementById('root-type');

function computeRoot(){
  const n = parseFloat(numInputR.value);
  if(Number.isNaN(n) || n<1 || n>10000){
    resultR.innerHTML = `<div class="card" style="padding:16px;color:#b91c1c;background:#fff7f7;border-radius:10px">Enter a number between 1 and 10000.</div>`;
    return;
  }
  const type = rootType.value;
  const wrap = document.createElement('div');
  wrap.className='table-wrap';
  const card = document.createElement('div');
  card.className='table-card';
  const title = document.createElement('h2');
  title.textContent = `${type==='sqrt'?'Square root':'Cube root'} of ${n}`;
  card.appendChild(title);
  const row=document.createElement('div');row.className='mul-row';
  const left=document.createElement('div');left.className='mul-left';left.textContent=type==='sqrt'?`√${n}`:`∛${n}`;
  const right=document.createElement('div');right.className='mul-right';
  const v = type==='sqrt'?Math.sqrt(n):Math.cbrt(n);
  right.textContent = Number.isInteger(v)?v:v.toFixed(6);
  row.appendChild(left);row.appendChild(right);card.appendChild(row);
  // show iterative steps using Newton-Raphson
  const steps = document.createElement('div');steps.className='steps';
  const iters = document.createElement('div');iters.className='step';
  iters.innerHTML = `<span class="muted">Method:</span> Newton-Raphson iterations`;
  steps.appendChild(iters);

  const traceList = document.createElement('div');
  traceList.className = 'step';
  // Newton-Raphson for sqrt: x_{k+1} = (x_k + n/x_k)/2
  // for cbrt: x_{k+1} = (2*x_k + n/(x_k*x_k))/3
  function newtonTrace(n, type, maxIter=6){
    const out = [];
    let x = type==='sqrt'?Math.max(1, n/2):Math.max(1, Math.cbrt(n));
    for(let k=1;k<=maxIter;k++){
      let next;
      if(type==='sqrt') next = (x + n/x)/2;
      else next = (2*x + n/(x*x))/3;
      out.push({k, x, next, diff: Math.abs(next-x)});
      if(Math.abs(next-x) < 1e-9) break;
      x = next;
    }
    return out;
  }

  const trace = newtonTrace(n, type);
  const lines = trace.map(t => `iter ${t.k}: x=${t.x.toFixed(8)} → next=${t.next.toFixed(8)} (Δ=${t.diff.toExponential(2)})`);
  traceList.innerHTML = `<pre style="margin:0;font-family:inherit">${lines.join('\n')}</pre>`;
  steps.appendChild(traceList);

  // final note
  const note = document.createElement('div');note.className='step';
  note.innerHTML = `<span class="muted">Result:</span> ${Number.isInteger(v)?v:v.toFixed(6)}`;
  steps.appendChild(note);

  card.appendChild(steps);
  wrap.appendChild(card);resultR.innerHTML='';resultR.appendChild(wrap);
}

generateBtnR.addEventListener('click',computeRoot);
numInputR.addEventListener('keyup',e=>{ if(e.key==='Enter') computeRoot(); });
printBtnR.addEventListener('click',()=>{ if(!numInputR.value) return alert('Enter a number first'); window.print(); });

// auto-read ?n= and ?t= query params
(() => {
  try{
    const p = new URLSearchParams(location.search);
    const n = p.get('n');
    const t = p.get('t');
    if(t && (t==='cbrt' || t==='sqrt')) rootType.value = t;
    if(n){ numInputR.value = n; computeRoot(); }
  }catch(e){/*ignore*/}
})();
