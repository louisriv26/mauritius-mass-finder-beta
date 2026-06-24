import {state,setState} from './state.js';
import {$,$$,rowKey,nextDelta,distKm,rowLat,rowLon,mauritiusNow} from './utils.js';
import {renderDetailSheet} from './render.js';
import {stateUrl} from './search.js';
let lockedScrollY=0;
export function focusablesIn(el){return $$('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])').filter(x=>el&&el.contains(x)&&!x.disabled&&x.getAttribute('aria-hidden')!=='true')}
export let lastFocusedBeforeDetail=null;

export function lockPageScroll(){
  if(document.body.classList.contains('scrollLocked'))return;
  lockedScrollY=window.scrollY||document.documentElement.scrollTop||0;
  document.body.style.position='fixed';
  document.body.style.top=`-${lockedScrollY}px`;
  document.body.style.left='0';
  document.body.style.right='0';
  document.body.style.width='100%';
  document.body.classList.add('scrollLocked');
}
export function unlockPageScroll(){
  if(!document.body.classList.contains('scrollLocked'))return;
  document.body.classList.remove('scrollLocked');
  document.body.style.position='';
  document.body.style.top='';
  document.body.style.left='';
  document.body.style.right='';
  document.body.style.width='';
  window.scrollTo(0,lockedScrollY||0);
}
export function activateSheetBackdrop(){
  const backdrop=$('#sheetBackdrop');
  if(!backdrop)return;
  backdrop.style.removeProperty('pointer-events');
  backdrop.style.removeProperty('opacity');
}
export function deactivateSheetBackdrop(){
  const backdrop=$('#sheetBackdrop');
  if(!backdrop)return;
  backdrop.style.pointerEvents='none';
  backdrop.style.opacity='0';
}
export function openDetailSheet(r,trigger=document.activeElement){
  setState({detailRow:r,modal:'detail'},{render:false}); lastFocusedBeforeDetail=trigger;
  renderDetailSheet(r);
  activateSheetBackdrop();
  lockPageScroll();
  document.body.classList.add('detailOpen','modalOpen');
  $('#detailSheet')?.setAttribute('aria-hidden','false');
  $('#appRoot')?.setAttribute('inert','');
  history.replaceState(null,'',stateUrl({row:rowKey(r)}));
  setTimeout(()=>($('#closeDetail')||focusablesIn($('#detailSheet'))[0])?.focus(),0);
}
export function closeDetailSheet(){
  document.body.classList.remove('detailOpen','modalOpen');
  deactivateSheetBackdrop();
  $('#detailSheet')?.setAttribute('aria-hidden','true');
  if(state.modal==='detail')setState({modal:null,detailRow:null},{render:false});
  $('#appRoot')?.removeAttribute('inert');
  unlockPageScroll();
  if(lastFocusedBeforeDetail&&lastFocusedBeforeDetail.focus)lastFocusedBeforeDetail.focus();
}
export function trapDetailFocus(e){if(e.key!=='Tab'||state.modal!=='detail')return; const f=focusablesIn($('#detailSheet')); if(!f.length)return; const first=f[0],last=f[f.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()} else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
export function openHashRowIfNeeded(){
  if(!location.hash)return; const p=new URLSearchParams(location.hash.slice(1)); const row=p.get('row'); if(!row||state.detailRow)return;
  const r=state.rows.find(x=>rowKey(x)===row); if(r){r._delta=nextDelta(r); r._dist=state.location?distKm(state.location.lat,state.location.lon,rowLat(r),rowLon(r)):null; openDetailSheet(r,null)}
}
export let lastFocusedBeforeSheet=null;
export function openModal(name,trigger=document.activeElement){if(name!=='filters')return; lastFocusedBeforeSheet=trigger; setState({modal:'filters'},{render:false}); activateSheetBackdrop(); lockPageScroll(); document.body.classList.add('filtersOpen','modalOpen'); $('#filterSheet')?.setAttribute('aria-hidden','false'); $('#openFilters')?.setAttribute('aria-expanded','true'); $('#appRoot')?.setAttribute('inert',''); setTimeout(()=>{const target=$('#filterSheet')?.querySelector('#closeFilters')||focusablesIn($('#filterSheet'))[0]; target?.focus()},0)}
export function closeModal(name='filters'){if(name!=='filters'&&state.modal!==name)return; document.body.classList.remove('filtersOpen','modalOpen'); deactivateSheetBackdrop(); unlockPageScroll(); setState({modal:null},{render:false}); $('#filterSheet')?.setAttribute('aria-hidden','true'); $('#openFilters')?.setAttribute('aria-expanded','false'); $('#appRoot')?.removeAttribute('inert'); if(lastFocusedBeforeSheet&&lastFocusedBeforeSheet.focus)lastFocusedBeforeSheet.focus()}
export function openFilters(e){openModal('filters',e?.currentTarget||document.activeElement)}
export function closeFilters(){closeModal('filters')}
export function trapSheetFocus(e){if(e.key!=='Tab'||state.modal!=='filters')return; const f=focusablesIn($('#filterSheet')); if(!f.length)return; const first=f[0],last=f[f.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()} else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
export function bindSheetDrag(){const sheet=$('#filterSheet'), grab=sheet?.querySelector('.grab'); if(!sheet||!grab)return; let startY=0,startX=0,dragging=false; grab.addEventListener('pointerdown',e=>{if(state.modal!=='filters')return; startY=e.clientY;startX=e.clientX;dragging=true; grab.setPointerCapture?.(e.pointerId)}); grab.addEventListener('pointerup',e=>{if(!dragging)return; const dy=e.clientY-startY,dx=Math.abs(e.clientX-startX); dragging=false; if(dy>60&&dy>dx*1.4)closeFilters()}); grab.addEventListener('pointercancel',()=>{dragging=false})}
