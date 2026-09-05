import {APP_VERSION,CACHE_NAME,BUILD_ID} from './constants.js';
import {$,storageGet,storageRemove,tr,toast} from './utils.js';
function dismissKey(buildId){return 'mmf_update_dismissed_'+buildId;}
// location.replace() to a URL identical to the current one is a NO-OP - it does not
// reload. So after a successful update, when there is no query string to drop, the old
// page simply stayed put with the update banner still showing: exactly the symptom the
// update was meant to clear. Drop a query string when there is one, otherwise reload.
function reloadToApp(){
  const target=location.origin+location.pathname+location.hash;
  if(location.href===target)location.reload();
  else location.replace(target);
}
let _updating=false;
export async function forceUpdate(){
  // Repeated taps used to arm a second timer and a second controllerchange listener.
  if(_updating)return;
  _updating=true;
  const banner=$('#updateBanner');
  const latestBuildId=(banner&&banner.dataset.latestBuildId)||BUILD_ID;
  storageRemove(dismissKey(latestBuildId));
  const showFallback=()=>{
    const link=location.origin+location.pathname.replace(/[^/]*$/,'')+'recover.html';
    const el=$('#updateText');
    if(el)el.innerHTML=tr('updateFallback')+' <a href="'+link+'">'+tr('recoverLink')+'</a>';
  };
  if(!navigator.serviceWorker){_updating=false;showFallback();return}

  // The reload is driven by the EVENT, not by this function still being on the stack.
  // Previously a controllerchange arriving after the 6s deadline set a local flag that
  // nothing then read, because forceUpdate() had already returned - so the update
  // completed successfully and the page never reloaded, leaving the banner up. On a slow
  // connection that is now MORE likely, because install re-downloads every CORE asset.
  let settled=false;
  const onController=()=>{
    if(settled)return; settled=true;
    clearTimeout(hintTimer); clearTimeout(giveUpTimer);
    reloadToApp();
  };
  navigator.serviceWorker.addEventListener('controllerchange',onController,{once:true});

  // 6s: tell the user it is slow, but do NOT stop waiting - the reload can still happen.
  const hintTimer=setTimeout(showFallback,6000);
  // 60s: genuinely give up, and leave the app able to try again.
  const giveUpTimer=setTimeout(()=>{
    if(settled)return; settled=true;
    navigator.serviceWorker.removeEventListener('controllerchange',onController);
    _updating=false; showFallback();
  },60000);

  try{
    const reg=await navigator.serviceWorker.getRegistration();
    if(!reg){clearTimeout(hintTimer);clearTimeout(giveUpTimer);navigator.serviceWorker.removeEventListener('controllerchange',onController);_updating=false;showFallback();return}
    // A worker that is still INSTALLING may not have its message handler running yet, so
    // a SKIP_WAITING posted to it can simply be dropped. It then sits in `waiting`
    // forever, no controllerchange ever fires, and the user waits out the whole give-up
    // timeout for an update that had actually downloaded fine. Wait for `installed`.
    // reg.update() can also resolve before the new worker appears, so arm updatefound
    // BEFORE calling it rather than only inspecting reg afterwards.
    const tellToSkip=w=>{
      if(!w||w.__mmfSkipArmed)return;
      w.__mmfSkipArmed=true;
      const post=()=>{try{w.postMessage({type:'SKIP_WAITING'})}catch(e){}};
      if(w.state==='installing')w.addEventListener('statechange',()=>{if(w.state==='installed')post()});
      else post();
    };
    reg.addEventListener('updatefound',()=>tellToSkip(reg.installing));
    await reg.update();
    const worker=reg.installing||reg.waiting;
    tellToSkip(worker);
    // If the worker was already active and controlling, no controllerchange will ever
    // fire; nothing to swap in, so reload straight away rather than waiting out the 60s.
    if(!worker&&reg.active&&navigator.serviceWorker.controller===reg.active){
      if(!settled){settled=true;clearTimeout(hintTimer);clearTimeout(giveUpTimer);
        navigator.serviceWorker.removeEventListener('controllerchange',onController);
        reloadToApp();}
    }
  }catch(e){
    // Errors were previously swallowed silently, so a rejected update looked identical
    // to one still in progress.
    if(!settled){settled=true;clearTimeout(hintTimer);clearTimeout(giveUpTimer);
      navigator.serviceWorker.removeEventListener('controllerchange',onController);
      _updating=false;showFallback();}
  }
}
export async function checkUpdate(){try{const res=await fetch('version.json?ts='+Date.now(),{cache:'no-store'});const v=await res.json();const bid=v.build_id||v.version;const isNew=(v.version&&v.version!==APP_VERSION)||(v.build_id&&v.build_id!==BUILD_ID);if(isNew&&!storageGet(dismissKey(bid))){const banner=$('#updateBanner');banner.dataset.latestVersion=v.version;banner.dataset.latestBuildId=bid;banner.classList.add('show')}}catch(e){}}
export async function manualCheckUpdate(){try{const res=await fetch('version.json?ts='+Date.now(),{cache:'no-store'});const v=await res.json();const bid=v.build_id||v.version;const isNew=(v.version&&v.version!==APP_VERSION)||(v.build_id&&v.build_id!==BUILD_ID);if(isNew){const banner=$('#updateBanner');banner.dataset.latestVersion=v.version;banner.dataset.latestBuildId=bid;banner.classList.add('show');storageRemove(dismissKey(bid));forceUpdate()}else{toast(tr('checkUpToDate'))}}catch(e){toast(tr('checkFailed'))}}
export async function registerSW(){if(!('serviceWorker'in navigator))return;try{await navigator.serviceWorker.register('sw.js',{updateViaCache:'none'})}catch(e){}}
