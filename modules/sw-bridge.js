import {APP_VERSION,CACHE_NAME} from './constants.js';
import {$,storageGet,storageRemove,tr,toast} from './utils.js';
export async function forceUpdate(){
  const banner=$('#updateBanner');
  const latest=(banner&&banner.dataset.latestVersion)||APP_VERSION;
  storageRemove('mmf_update_dismissed_'+latest);
  let controlled=false;
  try{
    if(navigator.serviceWorker){
      const reg=await navigator.serviceWorker.getRegistration();
      if(reg){
        await reg.update();
        const worker=reg.installing||reg.waiting;
        if(worker)worker.postMessage({type:'SKIP_WAITING'});
        await new Promise(resolve=>{
          const t=setTimeout(()=>{
            // controllerchange didn't fire — SW update stalled (common on iOS when precache fails)
            // Show recovery link and stop — do NOT reload or we'll loop forever
            const link=location.origin+location.pathname.replace(/[^/]*$/,'')+'recover.html';
            const el=$('#updateText');
            if(el)el.innerHTML=tr('updateFallback')+' <a href="'+link+'">'+tr('recoverLink')+'</a>';
            resolve();
          },6000);
          navigator.serviceWorker.addEventListener('controllerchange',()=>{clearTimeout(t);controlled=true;resolve()},{once:true});
        });
      }
    }
  }catch(e){}
  // Only reload if the new SW actually took control — otherwise we'd loop on iOS
  if(!controlled)return;
  location.replace(location.origin+location.pathname+location.hash);
}
export async function checkUpdate(){try{const res=await fetch('version.json?ts='+Date.now(),{cache:'no-store'});const v=await res.json(); if(v.version&&v.version!==APP_VERSION&&!storageGet('mmf_update_dismissed_'+v.version)){const banner=$('#updateBanner'); banner.dataset.latestVersion=v.version; banner.classList.add('show')}}catch(e){}}
export async function registerSW(){if(!('serviceWorker'in navigator))return; try{await navigator.serviceWorker.register('sw.js',{updateViaCache:'none'})}catch(e){}}