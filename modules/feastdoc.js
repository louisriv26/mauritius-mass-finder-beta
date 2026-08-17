import {state,setState} from './state.js';
import {$,tr,esc,norm} from './utils.js';

let loadingId=null;

export function feastDocInfo(feast){return (feast&&feast.doc)||null}

export async function ensureFeastDocLoaded(docId){
  if(!docId)return null;
  if(state.feastDoc&&state.feastDoc.id===docId)return state.feastDoc;
  if(loadingId===docId)return null;
  loadingId=docId;
  setState({feastDocLoadFailed:false},{render:false});
  try{
    const docRes=await fetch(`data/feast-doc-${docId}.json`,{cache:'no-cache'});
    if(!docRes.ok)throw new Error('feast doc fetch failed');
    const doc=await docRes.json();
    let index={};
    try{
      const idxRes=await fetch(`data/feast-doc-${docId}.index.json`,{cache:'no-cache'});
      if(idxRes.ok)index=await idxRes.json();
    }catch(e){}
    setState({feastDoc:doc,feastDocIndex:index,feastDocLoadFailed:false},{render:false});
    return doc;
  }catch(e){
    setState({feastDocLoadFailed:true},{render:false});
    return null;
  }finally{
    if(loadingId===docId)loadingId=null;
  }
}

export async function openFeastDocFor(feast,siteUid){
  const docId=feastDocInfo(feast);
  if(!docId)return;
  await ensureFeastDocLoaded(docId);
  const idx=state.feastDocIndex||{};
  const key=siteUid?idx[siteUid]:null;
  setState({mode:'more',moreSection:'feastdoc',feastDocHighlight:key||null,feastDocQuery:''});
  setTimeout(()=>{
    const panel=$('#morePanel');
    if(panel)panel.scrollIntoView({behavior:'smooth',block:'start'});
    if(key){
      const el=document.querySelector(`[data-fdoc-key="${CSS.escape(key)}"]`);
      if(el)setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'center'}),150);
    }else{
      $('.morePanelContent')?.focus({preventScroll:true});
    }
  },0);
}

export function renderFeastDocSection(){
  const doc=state.feastDoc;
  if(!doc){
    const msg=state.feastDocLoadFailed?tr('feastDocLoadFailed'):tr('feastDocLoading');
    return `<div class="empty"><h3>${esc(msg)}</h3></div>`;
  }
  const totalSites=doc.regions.reduce((n,r)=>n+r.sites.length,0);
  const blank=doc.regions.reduce((n,r)=>n+r.sites.filter(s=>!s.d14&&!s.d15).length,0);
  const label=state.lang==='fr'?doc.label_fr:doc.label_en;
  const header=`<div class="feastDocHeader">
    <h3>${esc(label)}</h3>
    <p class="meta">${esc(tr('feastDocPublished',{date:doc.source_published_at}))}</p>
    <p class="meta">${esc(tr('feastDocCount',{blank,total:totalSites}))}</p>
    <a class="btn" target="_blank" rel="noopener" href="${esc(doc.source_url)}">${esc(tr('feastDocOriginalPdf'))}</a>
    ${state.lang==='en'?`<p class="feastDocFrNote">${esc(tr('feastDocFrenchOnly'))}</p>`:''}
  </div>`;
  const colHead=`<div class="feastDocColHead"><span></span><span>${esc(doc.columns[0]||'')}</span><span>${esc(doc.columns[1]||'')}</span></div>`;
  const q=norm(state.feastDocQuery||'');
  const searchBox=`<input type="search" id="feastDocSearch" class="feastDocSearch" placeholder="${esc(tr('feastDocSearchPh'))}" value="${esc(state.feastDocQuery||'')}">`;
  const body=doc.regions.map(region=>{
    const sites=region.sites.filter(s=>!q||norm(s.label).includes(q));
    if(!sites.length)return '';
    const rows=sites.map(s=>{
      const key=`${region.name}|${s.label}`;
      const hl=state.feastDocHighlight===key;
      const d14=s.d14?esc(s.d14):`<span class="feastDocBlank">${esc(tr('feastDocNotPublished'))}</span>`;
      const d15=s.d15?esc(s.d15):`<span class="feastDocBlank">${esc(tr('feastDocNotPublished'))}</span>`;
      return `<div class="feastDocRow${hl?' feastDocRowHighlight':''}" data-fdoc-key="${esc(key)}"><div class="feastDocSite">${esc(s.label)}</div><div class="feastDocCell">${d14}</div><div class="feastDocCell">${d15}</div></div>`;
    }).join('');
    return `<details class="feastDocRegion" open><summary>${esc(region.name)}</summary>${rows}</details>`;
  }).join('');
  return header+searchBox+colHead+`<div class="feastDocBody">${body||`<p class="meta">${esc(tr('feastDocNoMatch'))}</p>`}</div>`;
}

let feastDocSearchTimer=null;
document.addEventListener('input',e=>{
  if(!e.target||e.target.id!=='feastDocSearch')return;
  clearTimeout(feastDocSearchTimer);
  const val=e.target.value;
  feastDocSearchTimer=setTimeout(()=>setState({feastDocQuery:val}),150);
});
