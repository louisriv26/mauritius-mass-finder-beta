import {initApp,state,setState,DEFAULT_FILTERS} from './modules/state.js';
import {
  $,$$,storageGet,storageSet,storageRemove,tr,esc,
  visibleSiteName,siteName,dayName,
  rowKey,rowMass,rowActive,mauritiusNow,getMauritiusNow,
  distKm,rowLat,rowLon,nextDelta,
  mapsUrl,reportUrl,toast,
  updateSwipeAffordance,markSwipeHintSeen
} from './modules/utils.js';
import {
  parseUserIntent,removeQueryIntent,removeNearIntentFromQuery,
  applyFilter,clearFilter,clearAllFilters,
  toggleQuickDay,toggleQuickTime,toggleNearMode,
  isDayFilterActive,isTimeFilterActive,
  effectiveDay,effectiveDayMode,effectiveTime,effectiveType,
  stateUrl,encodeStateToUrl,restoreStateFromUrl,
  showSite,toggleSave,
  getVisibleResults,matchesExact,getNextMass
} from './modules/search.js';
import {
  render,renderDetailSheet,renderInstallOnboarding,
  openMoreSection,handleInstallAction,
  savedGroups,activeFilterCount
} from './modules/render.js';
import {
  openDetailSheet,closeDetailSheet,openFilters,closeFilters,
  openModal,closeModal,trapSheetFocus,trapDetailFocus,
  bindSheetDrag,openHashRowIfNeeded,
  deactivateSheetBackdrop
} from './modules/sheets.js';
import {requestLocation,initGeo,locationRequestInFlight} from './modules/geo.js';
import {registerSW,checkUpdate,forceUpdate,manualCheckUpdate} from './modules/sw-bridge.js';
import {CACHE_NAME,APP_VERSION} from './modules/constants.js';

initApp(render, stateUrl);

function clearNearFailureState(){
  setState({near:false,nearExpanded:false,nearScope:'',mode:'home',query:removeQueryIntent(state.query,'near')},{url:true});
  toast(tr('locationDenied'));
}
initGeo(clearNearFailureState);

async function shareUrl(url,title,text){try{if(navigator.share){await navigator.share({title,text,url});toast(tr('shared'))}else{await navigator.clipboard.writeText(`${text}\n${url}`);toast(tr('copied'))}}catch(e){}}
async function shareResult(r){const text=`${tr('shareMassIntro')}: ${visibleSiteName(r)} — ${dayName(r.day_of_week)} ${r.time_24h}`; await shareUrl(stateUrl({row:rowKey(r)}),visibleSiteName(r),text)}
async function shareCurrentView(){const title=tr('shareAppTitle'); const text=tr('shareAppText'); await shareUrl(encodeStateToUrl(state),title,text)}
async function shareApp(){await shareCurrentView()}
function restoreStateFromHash(){
  const restored=restoreStateFromUrl(location.hash);
  if(!restored)return;
  setState(restored,{render:false});
  if(restored.near&&!state.location){requestLocation();return;}
  render();
}
function setLang(l){storageSet('mmf_language',l); setState({lang:l},{url:true}); if(state.detailRow)renderDetailSheet(state.detailRow)}
function loadSavedChurches(){
  try{
    const raw=storageGet('mmf_my_churches','[]');
    const parsed=JSON.parse(raw);
    if(Array.isArray(parsed))return new Set(parsed.filter(Boolean));
  }catch(e){storageRemove('mmf_my_churches')}
  return new Set();
}
function applyRows(json){const rows=(json&&json.rows)||json||[]; if(Array.isArray(rows)&&rows.length){setState({rows:rows.filter(rowActive)},{render:false}); return true} return false}
async function loadData(){
  setState({saved:loadSavedChurches()},{render:false});
  let rendered=false;
  try{
    if(window.caches){
      const cached=await caches.match('data/masses.json');
      if(cached){
        const json=await cached.clone().json();
        rendered=applyRows(json);
        if(rendered){setState({dataStale:true,dataSource:'cache'},{render:false});render();openHashRowIfNeeded();const bf=document.getElementById('bootFallback');if(bf)bf.hidden=true;}
      }
    }
  }catch(e){}
  if(!rendered){
    try{
      rendered=applyRows(window.MMF_FALLBACK_DATA||{});
      if(rendered){setState({dataStale:true,dataSource:'fallback'},{render:false});render();openHashRowIfNeeded();const bf=document.getElementById('bootFallback');if(bf)bf.hidden=true;}
    }catch(e){}
  }
  try{
    let res=await fetch('data/masses.json',{cache:'no-cache'});
    if(!res.ok)throw new Error('fetch');
    let json=await res.clone().json();
    if(window.caches){try{const c=await caches.open(CACHE_NAME); await c.put('data/masses.json',res.clone())}catch(_){}}
    applyRows(json);
    setState({dataStale:false,dataSource:'network',loadError:''},{render:false});
    render();
    openHashRowIfNeeded();
    const bf=document.getElementById('bootFallback');if(bf)bf.hidden=true;
  }catch(e){
    if(rendered)setState({dataStale:true},{render:true});
    else setState({loadError:String(e),dataStale:false});
  }
}
function handleDelegatedAction(e){
  const installAction=e.target.closest('[data-install-action]'); if(installAction){e.preventDefault(); handleInstallAction(installAction.dataset.installAction); return}
  const chip=e.target.closest('[data-chip]'); if(chip){e.preventDefault(); clearFilter(chip.dataset.chip); return}
  const filter=e.target.closest('[data-filter]'); if(filter){e.preventDefault(); applyFilter(filter.dataset.filter,filter.dataset.value); return}
  const detailBtn=e.target.closest('[data-row-key]'); if(detailBtn){e.preventDefault(); const k=detailBtn.dataset.rowKey; const r=state.results.find(x=>x.id===k||(x.id==null&&rowKey(x)===k)); if(r)openDetailSheet(r,detailBtn); return}
  const saveBtn=e.target.closest('[data-save-key]'); if(saveBtn){e.preventDefault(); const k=saveBtn.dataset.saveKey; const r=state.results.find(x=>x.id===k||(x.id==null&&rowKey(x)===k)); if(r)toggleSave(r); return}
  const showSiteBtn=e.target.closest('[data-show-site]'); if(showSiteBtn){e.preventDefault(); const g=savedGroups()[+showSiteBtn.dataset.showSite]; if(g)showSite(g.first); return}
  const unsaveBtn=e.target.closest('[data-unsave-site]'); if(unsaveBtn){e.preventDefault(); const g=savedGroups()[+unsaveBtn.dataset.unsaveSite]; if(g)toggleSave(g.first); return}
  const nextAction=e.target.closest('[data-next-action]'); if(nextAction){e.preventDefault(); const a=nextAction.dataset.nextAction; if(a==='locate')requestLocation(); if(a==='share'&&state.next)shareResult(state.next); if(a==='save'&&state.next)toggleSave(state.next); return}
  const detailAction=e.target.closest('[data-detail-action]'); if(detailAction){e.preventDefault(); const r=state.detailRow; if(!r)return; const a=detailAction.dataset.detailAction; if(a==='share')shareResult(r); if(a==='save')toggleSave(r); if(a==='all-times'){closeDetailSheet();showSite(r)} return}
  const more=e.target.closest('[data-more-section]'); if(more){e.preventDefault(); openMoreSection(more.dataset.moreSection,false); return}
  const footer=e.target.closest('[data-footer-target]'); if(footer){e.preventDefault(); openMoreSection(footer.dataset.footerTarget); return}
  const share=e.target.closest('[data-share-app]'); if(share){e.preventDefault(); shareApp(); return}
  const appAction=e.target.closest('[data-app-action]'); if(appAction){e.preventDefault(); if(appAction.dataset.appAction==='checkUpdate')manualCheckUpdate(); return}
}
function installDelegatedActions(){document.addEventListener('click',handleDelegatedAction)}
function runSearchDiagnostics(){const tests=['àprès-midi Curepipe','matin Curepipe','soir Curepipe','messe après-midi Curepipe','messe matin Curepipe','messe soir Curepipe','afternoon Curepipe','morning Curepipe','evening Curepipe','messe du soir Curepipe','evening Mass Curepipe','messe demain','messe aujourd’hui','messe samedi soir','18h','18:00','6pm','sacre coeur','saint jean','st jean','église','eglise']; const now=getMauritiusNow(new Date('2026-05-07T05:00:00+04:00')); return tests.map(q=>{const st={...state,query:q,filters:{...DEFAULT_FILTERS},mode:'search',near:false}; const out=getVisibleResults(st,now); return {query:q,count:out.results.length,top:out.results[0]?visibleSiteName(out.results[0]):null,pass:out.results.length>0}})}
function runDateDiagnostics(testNow){const now=getMauritiusNow(testNow?new Date(testNow):new Date()); const next=getNextMass(state.rows,now,state); return {now:now.toISOString(),next:next?{site:visibleSiteName(next),day:next.day_of_week,time:next.time_24h,delta:next._delta}:null,pass:!!next}}
function runRankingDiagnostics(){return {top:state.results.slice(0,5).map(r=>({site:visibleSiteName(r),day:r.day_of_week,time:r.time_24h,delta:r._delta,dist:r._dist??null})),pass:true}}
function runStateDiagnostics(){return {mode:state.mode,query:state.query,filters:{...state.filters},near:state.near,modal:state.modal,results:state.results.length,pass:true}}
function runDeepLinkDiagnostics(){
  const hashes=['#q=curepipe&time=afternoon&lang=fr','#q=curepipe&time=afternoon&lang=en','#q=messe%20du%20soir%20Curepipe&lang=fr','#q=evening%20Mass%20Curepipe&lang=en','#day=tomorrow&time=morning&lang=fr','#day=sunday&time=afternoon&lang=en','#mode=saved&lang=fr','#type=all&q=adoration&lang=fr','#bad=%E0%A4%A','#'];
  const cases=hashes.map(hash=>{const restored=restoreStateFromUrl(hash);return {hash,restored,pass:hash==='#'||!!restored}});
  const url=encodeStateToUrl(state); const restored=restoreStateFromUrl(url.includes('#')?url.slice(url.indexOf('#')):'');
  return {url,restored,cases,pass:cases.every(x=>x.pass)&&(!!restored||!url.includes('#'))}
}
window.MMFDiagnostics={runSearchDiagnostics,runDateDiagnostics,runRankingDiagnostics,runStateDiagnostics,runDeepLinkDiagnostics,activeFilterCount,isDayFilterActive,isTimeFilterActive,parseUserIntent,removeQueryIntent,removeNearIntentFromQuery,getVisibleResults,matchesExact};
let searchDebounceTimer=null;
function resetInteractionState(){
  try{
    document.body.classList.remove('modalOpen','scrollLocked','filtersOpen','detailOpen');
    const appRoot=$('#appRoot'); if(appRoot){appRoot.removeAttribute('inert'); appRoot.removeAttribute('aria-hidden')}
    deactivateSheetBackdrop();
    const filter=$('#filterSheet'); if(filter){filter.setAttribute('aria-hidden','true')}
    const detail=$('#detailSheet'); if(detail){detail.setAttribute('aria-hidden','true')}
  }catch(e){console.warn('MMF interaction reset failed',e)}
}
function showInitFailure(e){
  try{
    console.error('MMF init failed',e);
    document.body.classList.remove('modalOpen','scrollLocked','filtersOpen','detailOpen');
    const bf=document.getElementById('bootFallback');if(bf)bf.hidden=false;
    const root=$('#results')||document.body;
    const msg=(state&&state.lang==='fr')?'Problème de chargement de l’application. Veuillez actualiser.':'App loading problem. Please refresh.';
    root.innerHTML=`<div class="empty error"><h3>${esc(msg)}</h3></div>`;
  }catch(_){}
}
function bind(){
  setState({lang:storageGet('mmf_language')||((navigator.language||'').toLowerCase().startsWith('fr')?'fr':'en')},{render:false});
  restoreStateFromHash();
  $('#searchInput').addEventListener('input',e=>{
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer=setTimeout(()=>{
      setState({query:e.target.value||''},{url:true});
      if(state.parsed&&state.parsed.near&&!state.near)toggleNearMode();
    },200);
  });
  $('#clearSearch').addEventListener('click',()=>{
    clearAllFilters();
    setState({query:'',mode:'home'},{url:true,syncInput:true});
  });
  $('#langEn').addEventListener('click',()=>setLang('en'));
  $('#langFr').addEventListener('click',()=>setLang('fr'));
  $('#openFilters').addEventListener('click',e=>openFilters(e));
  $('#closeFilters').addEventListener('click',()=>closeFilters());
  $('#applyFilters').addEventListener('click',()=>closeFilters());
  $('#closeDetail').addEventListener('click',()=>closeDetailSheet());
  $('#sheetBackdrop').addEventListener('click',()=>{
    if(state.modal==='detail')closeDetailSheet();
    else if(state.modal==='filters')closeFilters();
  });
  $$('.navBtn[data-nav]').forEach(btn=>btn.addEventListener('click',()=>{
    const nav=btn.dataset.nav;
    if(nav==='home'){clearAllFilters();setState({query:'',mode:'home'},{url:true,syncInput:true});}
    else if(nav==='saved'){if(state.mode==='saved')clearAllFilters();else setState({mode:'saved'},{url:true})}
    else if(nav==='near')toggleNearMode();
    else if(nav==='more')setState({mode:'more'},{url:true});
  }));
  $$('.pill[data-action]').forEach(btn=>btn.addEventListener('click',()=>{
    const a=btn.dataset.action;
    if(a==='today'||a==='tomorrow')toggleQuickDay(a);
    else if(a==='morning'||a==='afternoon'||a==='evening')toggleQuickTime(a);
    else if(a==='near')toggleNearMode();
    else if(a==='saved'){if(state.mode==='saved')clearAllFilters();else setState({mode:'saved'},{url:true})}
  }));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if(state.modal==='detail')closeDetailSheet();
      else if(state.modal==='filters')closeFilters();
    }
    trapSheetFocus(e);
    trapDetailFocus(e);
  });
  window.addEventListener('popstate',()=>restoreStateFromHash());
  $('#updateRefresh').addEventListener('click',()=>forceUpdate());
  $('#updateDismiss').addEventListener('click',()=>{
    const banner=$('#updateBanner');
    if(banner){storageSet('mmf_update_dismissed_'+(banner.dataset.latestBuildId||banner.dataset.latestVersion||APP_VERSION),'1');banner.classList.remove('show')}
  });
  $('#updateHelp').addEventListener('click',()=>openMoreSection('updateHelp'));
}
document.addEventListener('DOMContentLoaded',()=>{try{resetInteractionState();installDelegatedActions();bind();bindSheetDrag();renderInstallOnboarding();loadData();registerSW();checkUpdate();setInterval(checkUpdate,30*60*1000)}catch(e){showInitFailure(e)}});
