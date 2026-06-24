import {APP_VERSION,CACHE_NAME,BUILD_ID} from './constants.js';
import {$,storageGet,storageRemove,tr,toast} from './utils.js';
function dismissKey(buildId){return 'mmf_update_dismissed_'+buildId;}
export async function forceUpdate(){
  const banner=$('#updateBanner');
  const latestBuildId=(banner&&banner.dataset.latestBuildId)||BUILD_ID;
  storageRemove(dismissKey(latestBuildId));
  let controlled=false;
  try{
    if(navigator.serviceWorker){
      const reg=await navigator.serviceWorker.getRegistration();
      if(reg){
        // Arm controllerchange listener BEFORE reg.update() and BEFORE SKIP_WAITING
        const controllerPromise=new Promise(resolve=>{
          const t=setTimeout(()=>{
            const link=location.origin+location.pathname.replace(/[^/]*$/,'')+'recover.html';
            const el=$('#updateText');
            if(el)el.innerHTML=tr('updateFallback')+' <a href="'+link+'">'+tr('recoverLink')+'</a>';
            resolve();
          },6000);
          navigator.serviceWorker.addEventListener('controllerchange',()=>{clearTimeout(t);controlled=true;resolve()},{once:true});
        });
        await reg.update();
        const worker=reg.installing||reg.waiting;
        if(worker)worker.postMessage({type:'SKIP_WAITING'});
        await controllerPromise;
      }
    }
  }catch(e){}
  if(!controlled)return;
  location.replace(location.origin+location.pathname+location.hash);
}
export async function checkUpdate(){try{const res=await fetch('version.json?ts='+Date.now(),{cache:'no-store'});const v=await res.json();const bid=v.build_id||v.version;const isNew=(v.version&&v.version!==APP_VERSION)||(v.build_id&&v.build_id!==BUILD_ID);if(isNew&&!storageGet(dismissKey(bid))){const banner=$('#updateBanner');banner.dataset.latestVersion=v.version;banner.dataset.latestBuildId=bid;banner.classList.add('show')}}catch(e){}}
export async function manualCheckUpdate(){try{const res=await fetch('version.json?ts='+Date.now(),{cache:'no-store'});const v=await res.json();const bid=v.build_id||v.version;const isNew=(v.version&&v.version!==APP_VERSION)||(v.build_id&&v.build_id!==BUILD_ID);if(isNew){const banner=$('#updateBanner');banner.dataset.latestVersion=v.version;banner.dataset.latestBuildId=bid;banner.classList.add('show');storageRemove(dismissKey(bid));forceUpdate()}else{toast(tr('checkUpToDate'))}}catch(e){toast(tr('checkUpToDate'))}}
export async function registerSW(){if(!('serviceWorker'in navigator))return;try{await navigator.serviceWorker.register('sw.js',{updateViaCache:'none'})}catch(e){}}
