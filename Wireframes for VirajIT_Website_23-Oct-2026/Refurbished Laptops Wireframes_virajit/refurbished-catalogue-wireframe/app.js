const products=window.catalogueProducts||[];
const groups={brand:new Set(),warranty:new Set(),processor:new Set(),ram:new Set(),storage:new Set(),screen:new Set()};
const budgetOptions=[['under25','Under ₹25,000'],['25to40','₹25,000 – ₹40,000'],['above40','Above ₹40,000']];
const state={groups,budget:'',sort:'recommended'};
const qs=new URLSearchParams(location.search);
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const formatMoney=n=>'₹'+Number(n).toLocaleString('en-IN');
const unique=key=>[...new Set(products.map(p=>p[key]))].sort((a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true}));
const budgetMatch=(p,b)=>!b||(b==='under25'&&p.price<25000)||(b==='25to40'&&p.price>=25000&&p.price<=40000)||(b==='above40'&&p.price>40000);
function readUrl(){for(const key of Object.keys(groups)){const raw=qs.get(key);if(raw)raw.split(',').filter(v=>unique(key).includes(v)).forEach(v=>groups[key].add(v))}state.budget=budgetOptions.some(([k])=>k===qs.get('budget'))?qs.get('budget'):'';state.sort=['recommended','price-asc','price-desc','newest'].includes(qs.get('sort'))?qs.get('sort'):'recommended'}
function writeUrl(){const params=new URLSearchParams();for(const [key,set] of Object.entries(groups))if(set.size)params.set(key,[...set].join(','));if(state.budget)params.set('budget',state.budget);if(state.sort!=='recommended')params.set('sort',state.sort);history.replaceState(null,'',location.pathname+(params.size?'?'+params:'')+location.hash)}
function filterMarkup(){const multi=(key,title,open)=>{const opts=unique(key).map(v=>`<label><input type="checkbox" data-group="${key}" value="${escapeHtml(v)}"><span>${escapeHtml(v)}</span><span>${products.filter(p=>p[key]===v).length}</span></label>`).join('');return open?`<div class="filter-group"><h3>${title}</h3><div class="filter-options">${opts}</div></div>`:`<details class="filter-group"><summary>${title}</summary><div class="filter-options">${opts}</div></details>`};const budget=budgetOptions.map(([v,label])=>`<label><input type="radio" name="BUDGET_NAME" data-group="budget" value="${v}"><span>${label}</span></label>`).join('');return multi('brand','Brand',true)+`<div class="filter-group"><h3>Price</h3><div class="filter-options"><label><input type="radio" name="BUDGET_NAME" data-group="budget" value=""><span>All prices</span></label>${budget}</div></div>`+multi('warranty','Warranty',true)+multi('processor','Processor',false)+multi('ram','RAM',false)+multi('storage','Storage',false)+multi('screen','Screen Size',false)}
function setupControls(){document.querySelector('#desktop-filter-controls').innerHTML=filterMarkup().replaceAll('BUDGET_NAME','desktop-budget');document.querySelector('#mobile-filter-controls').innerHTML=filterMarkup().replaceAll('BUDGET_NAME','mobile-budget');for(const root of [document.querySelector('#desktop-filter-controls'),document.querySelector('#mobile-filter-controls')])root.addEventListener('change',e=>{const el=e.target;if(!el.matches('input[data-group]'))return;const key=el.dataset.group;if(key==='budget')state.budget=el.value;else{el.checked?groups[key].add(el.value):groups[key].delete(el.value)}render()});document.querySelector('#brand-shortcuts').innerHTML=unique('brand').map(v=>`<button type="button" class="chip" data-shortcut-brand="${escapeHtml(v)}">${escapeHtml(v)}</button>`).join('');document.querySelector('#budget-shortcuts').innerHTML=budgetOptions.map(([v,label])=>`<button type="button" class="chip" data-shortcut-budget="${v}">${label}</button>`).join('');document.querySelector('#brand-shortcuts').addEventListener('click',e=>{const el=e.target.closest('[data-shortcut-brand]');if(!el)return;const v=el.dataset.shortcutBrand;groups.brand.has(v)?groups.brand.delete(v):groups.brand.add(v);render();document.querySelector('#catalogue').scrollIntoView({block:'start'})});document.querySelector('#budget-shortcuts').addEventListener('click',e=>{const el=e.target.closest('[data-shortcut-budget]');if(!el)return;state.budget=state.budget===el.dataset.shortcutBudget?'':el.dataset.shortcutBudget;render();document.querySelector('#catalogue').scrollIntoView({block:'start'})});for(const id of ['sort-desktop','sort-mobile'])document.getElementById(id).addEventListener('change',e=>{state.sort=e.target.value;render()})}
function syncControls(){document.querySelectorAll('input[data-group]').forEach(el=>{const key=el.dataset.group;el.checked=key==='budget'?state.budget===el.value:groups[key].has(el.value)});for(const id of ['sort-desktop','sort-mobile'])document.getElementById(id).value=state.sort;document.querySelectorAll('[data-shortcut-brand]').forEach(el=>{const on=groups.brand.has(el.dataset.shortcutBrand);el.classList.toggle('active',on);el.setAttribute('aria-pressed',String(on))});document.querySelectorAll('[data-shortcut-budget]').forEach(el=>{const on=state.budget===el.dataset.shortcutBudget;el.classList.toggle('active',on);el.setAttribute('aria-pressed',String(on))});const count=Object.values(groups).reduce((n,s)=>n+s.size,0)+(state.budget?1:0);document.querySelector('#mobile-filter-count').textContent=count?`(${count})`:''}
function filtered(){let out=products.filter(p=>budgetMatch(p,state.budget)&&Object.entries(groups).every(([key,set])=>!set.size||set.has(p[key])));if(state.sort==='price-asc')out.sort((a,b)=>a.price-b.price||a.rank-b.rank);else if(state.sort==='price-desc')out.sort((a,b)=>b.price-a.price||a.rank-b.rank);else if(state.sort==='newest')out.sort((a,b)=>b.added-a.added);else out.sort((a,b)=>(a.stock==='In stock'?0:1)-(b.stock==='In stock'?0:1)||a.rank-b.rank);return out}
function card(p){
  const href='product.html?id='+encodeURIComponent(p.id)+'&return='+encodeURIComponent('index.html'+location.search+'#catalogue');
  const origPrice = Math.round(p.price * 1.85);
  const discountPct = Math.round(((origPrice - p.price) / origPrice) * 100);
  const title = `Refurbished ${escapeHtml(p.brand.toUpperCase())} ${escapeHtml(p.model)} | ${escapeHtml(p.cpu)} | ${escapeHtml(p.screen)}`;
  const imgSrc = '../../Homepage Wireframes_virajIT/homepage-photos/ref-laptop-card-ref.png';
  return `<article class="product-card-modern">
    <div class="card-img-wrap">
      <img src="${imgSrc}" alt="${title}" loading="lazy" />
    </div>
    <a class="card-title-link" href="${href}">
      <h3 class="card-title">${title}</h3>
    </a>
    <div class="card-bubbles">
      <span class="spec-bubble">${escapeHtml(p.cpu)}</span>
      <span class="spec-bubble">${escapeHtml(p.ram.includes('RAM') ? p.ram : p.ram + ' RAM')}</span>
      <span class="spec-bubble">${escapeHtml(p.storage)}</span>
    </div>
    <div class="card-price-row">
      <span class="current-price">₹ ${Number(p.price).toLocaleString('en-IN')}</span>
      <span class="original-price">₹ ${Number(origPrice).toLocaleString('en-IN')}</span>
      <span class="discount-tag">${discountPct}% off</span>
    </div>
    <div class="card-warranty-row">
      <span class="warranty-check">✓ Warranty Included</span>
    </div>
    <a class="card-btn-view-details" href="${href}">View Details</a>
  </article>`;
}
function renderActive(){const items=[];for(const [key,set] of Object.entries(groups))for(const v of set)items.push(`<button type="button" class="active-filter" data-remove-group="${key}" data-remove-value="${escapeHtml(v)}">${escapeHtml(v)} <span aria-hidden="true">×</span></button>`);if(state.budget){const label=budgetOptions.find(([v])=>v===state.budget)?.[1];items.push(`<button type="button" class="active-filter" data-remove-group="budget">${label} <span aria-hidden="true">×</span></button>`)}document.querySelector('#active-filters').innerHTML=items.join('')}
function render(){syncControls();const out=filtered();document.querySelector('#result-count').textContent=`Showing ${out.length} of ${products.length} sample laptops`;document.querySelector('#product-grid').innerHTML=out.map(card).join('');document.querySelector('#empty-state').hidden=out.length>0;renderActive();writeUrl()}
function clearAll(){for(const s of Object.values(groups))s.clear();state.budget='';render()}
let returnFocus=null;function openDrawer(){returnFocus=document.activeElement;document.querySelector('#drawer-backdrop').hidden=false;document.querySelector('#filter-drawer').hidden=false;document.body.classList.add('drawer-open');document.querySelector('#close-filters').focus()}
function closeDrawer(){document.querySelector('#drawer-backdrop').hidden=true;document.querySelector('#filter-drawer').hidden=true;document.body.classList.remove('drawer-open');returnFocus?.focus()}
function init(){readUrl();setupControls();render();document.querySelector('#clear-desktop').onclick=clearAll;document.querySelector('#clear-mobile').onclick=clearAll;document.querySelector('#reset-empty').onclick=clearAll;document.querySelector('#active-filters').addEventListener('click',e=>{const el=e.target.closest('[data-remove-group]');if(!el)return;if(el.dataset.removeGroup==='budget')state.budget='';else groups[el.dataset.removeGroup].delete(el.dataset.removeValue);render()});document.querySelector('#open-filters').onclick=openDrawer;document.querySelector('#close-filters').onclick=closeDrawer;document.querySelector('#apply-filters').onclick=closeDrawer;document.querySelector('#drawer-backdrop').onclick=closeDrawer;document.addEventListener('keydown',e=>{const d=document.querySelector('#filter-drawer');if(d.hidden)return;if(e.key==='Escape')closeDrawer();if(e.key==='Tab'){const f=[...d.querySelectorAll('button,input,summary')].filter(x=>x.offsetParent!==null);if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});window.addEventListener('popstate',()=>{for(const s of Object.values(groups))s.clear();const p=new URLSearchParams(location.search);for(const key of Object.keys(groups)){const raw=p.get(key);if(raw)raw.split(',').filter(v=>unique(key).includes(v)).forEach(v=>groups[key].add(v))}state.budget=p.get('budget')||'';state.sort=p.get('sort')||'recommended';render()})}
init();
