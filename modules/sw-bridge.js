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
  const setText=html=>{const el=$('#updateText');if(el)el.innerHTML=html;};
  const withRecover=msg=>{
    const link=location.origin+location.pathname.replace(/[^/]*$/,'')+'recover.html';
    return msg+' <a href="'+link+'">'+tr('recoverLink')+'</a>';
  };
  const showWorking =()=>setText(tr('updateStillWorking'));
  const showFallback=()=>setText(withRecover(tr('updateFallback')));
  const showFailed  =()=>setText(withRecover(tr('updateInstallFailed')));
  if(!navigator.serviceWorker){_updating=false;showFallback();return}

  // The reload is driven by the EVENT, not by this function still being on the stack.
  // Previously a controllerchange arriving after the 6s deadline set a local flag that
  // nothing then read, because forceUpdate() had already returned - so the update
  // completed successfully and the page never reloaded, leaving the banner up.
  let settled=false,poll=null,hintTimer=null,giveUpTimer=null;
  function finish(fn){
    if(settled)return; settled=true;
    clearTimeout(hintTimer);clearTimeout(giveUpTimer);clearInterval(poll);
    navigator.serviceWorker.removeEventListener('controllerchange',onController);
    fn();
  }
  const onController=()=>finish(reloadToApp);
  navigator.serviceWorker.addEventListener('controllerchange',onController);

  // 6s: say it is still working. It must NOT offer to "repair" here - that used to appear
  // while a perfectly healthy install was still running, which invited the user to throw a
  // good install away. (The whole precache is only ~116 KB gzipped, so 6s is rarely a real
  // failure; it is just not fast enough to stay silent about.)
  hintTimer=setTimeout(showWorking,6000);
  // 60s: genuinely give up, and leave the app able to try again.
  giveUpTimer=setTimeout(()=>finish(()=>{_updating=false;showFallback()}),60000);

  try{
    const reg=await navigator.serviceWorker.getRegistration();
    if(!reg){finish(()=>{_updating=false;showFallback()});return}
    const wasControlling=navigator.serviceWorker.controller;
    // A worker that is still INSTALLING may not have its message handler running yet, so
    // a SKIP_WAITING posted to it can simply be dropped. It then sits in `waiting`
    // forever, no controllerchange ever fires, and the user waits out the whole give-up
    // timeout for an update that had actually downloaded fine. Wait for `installed`.
    // reg.update() can also resolve before the new worker appears, so arm updatefound
    // BEFORE calling it rather than only inspecting reg afterwards.
    const watch=w=>{
      if(!w||w.__mmfSkipArmed)return;
      w.__mmfSkipArmed=true;
      const post=()=>{try{w.postMessage({type:'SKIP_WAITING'})}catch(e){}};
      // `redundant` means the install failed outright. Nothing further will EVER happen to
      // this worker, so stop presenting it as a download still in progress - that silence
      // was indistinguishable from a slow connection, to the user and to us.
      const failed=()=>finish(()=>{_updating=false;showFailed()});
      if(w.state==='installing')w.addEventListener('statechange',()=>{
        if(w.state==='installed')post();
        else if(w.state==='redundant')failed();
      });
      else if(w.state==='redundant')failed();
      else post();
    };
    reg.addEventListener('updatefound',()=>watch(reg.installing));
    // update() REJECTS when the new worker fails to install, and it can win the race against
    // the `redundant` statechange above. Letting that fall through to the generic catch
    // reported a failed download as "taking too long", which is simply untrue.
    try{await reg.update()}
    catch(e){finish(()=>{_updating=false;showFailed()});return}
    watch(reg.installing||reg.waiting);

    // Do NOT depend on controllerchange alone. iOS in particular does not reliably fire it
    // for a worker that called skipWaiting() while the app runs standalone from the Home
    // Screen: the update installs and activates, this page is simply never told, and the
    // banner sits there until the give-up timeout. That is exactly the symptom reported
    // from a real phone, and exactly what Repair then cleared. So watch the registration
    // itself too - once a NEW worker has reached `activated`, reloading is what hands this
    // page over to it. Only when we started out controlled, so that an uncontrolled page
    // cannot mistake the worker it is merely about to acquire for a freshly installed one.
    if(wasControlling)poll=setInterval(()=>{
      const a=reg.active;
      if(a&&a!==wasControlling&&a.state==='activated')finish(reloadToApp);
    },400);

    // If the worker was already active and controlling, no controllerchange will ever
    // fire; nothing to swap in, so reload straight away rather than waiting out the 60s.
    if(!reg.installing&&!reg.waiting&&reg.active&&navigator.serviceWorker.controller===reg.active)
      finish(reloadToApp);
  }catch(e){
    // Errors were previously swallowed silently, so a rejected update looked identical
    // to one still in progress.
    finish(()=>{_updating=false;showFallback()});
  }
}
export async function checkUpdate(){try{const res=await fetch('version.json?ts='+Date.now(),{cache:'no-store'});const v=await res.json();const bid=v.build_id||v.version;const isNew=(v.version&&v.version!==APP_VERSION)||(v.build_id&&v.build_id!==BUILD_ID);if(isNew&&!storageGet(dismissKey(bid))){const banner=$('#updateBanner');banner.dataset.latestVersion=v.version;banner.dataset.latestBuildId=bid;banner.classList.add('show')}}catch(e){}}
export async function manualCheckUpdate(){try{const res=await fetch('version.json?ts='+Date.now(),{cache:'no-store'});const v=await res.json();const bid=v.build_id||v.version;const isNew=(v.version&&v.version!==APP_VERSION)||(v.build_id&&v.build_id!==BUILD_ID);if(isNew){const banner=$('#updateBanner');banner.dataset.latestVersion=v.version;banner.dataset.latestBuildId=bid;banner.classList.add('show');storageRemove(dismissKey(bid));forceUpdate()}else{toast(tr('checkUpToDate'))}}catch(e){toast(tr('checkFailed'))}}
export async function registerSW(){if(!('serviceWorker'in navigator))return;try{await navigator.serviceWorker.register('sw.js',{updateViaCache:'none'})}catch(e){}}
