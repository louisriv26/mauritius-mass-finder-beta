const CACHE_NAME='mmf-beta-v27-6-24';
// Everything the app needs to boot and run offline. Any one of these missing means a broken
// app, so a failure here must fail the whole install rather than leave a half-cached app
// that looks fine until it is actually used.
const CORE_REQUIRED=['./','index.html','styles.css','app.js','config.js','version.json','manifest.json','data/masses.json','fallback-data.js','recover.html','modules/constants.js','modules/translations.js','modules/state.js','modules/utils.js','modules/geo.js','modules/search.js','modules/render.js','modules/feastdoc.js','modules/sheets.js','modules/sw-bridge.js'];
// Home-screen icons. Worth having offline; never worth failing a release over.
const CORE_ICONS=['icon.svg','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-192.png','icons/icon-maskable-512.png'];
const CORE=CORE_REQUIRED.concat(CORE_ICONS);
// cache.addAll() is all-or-nothing. ONE dropped request on a mobile connection aborted the
// entire install, the new worker went straight to `redundant`, and the app - which only ever
// listened for `installed` - sat on its update banner waiting out a 60s timeout for an update
// that was never coming. Fetch each asset on its own, retry a few times, and let an icon fail
// by itself instead of taking the release down with it.
async function cachePut(c,u,tries){
  for(let i=0;i<tries;i++){
    try{
      const res=await fetch(new Request(u,{cache:'reload'}));
      if(res&&res.ok&&!res.redirected){await c.put(u,res);return true}
    }catch(e){}
    if(i<tries-1)await new Promise(r=>setTimeout(r,500*(i+1)));
  }
  return false;
}
self.addEventListener('install',event=>{event.waitUntil((async()=>{
  const c=await caches.open(CACHE_NAME);
  const got=await Promise.all(CORE_REQUIRED.map(u=>cachePut(c,u,3)));
  await Promise.all(CORE_ICONS.map(u=>cachePut(c,u,2)));
  const missing=CORE_REQUIRED.filter((u,i)=>!got[i]);
  if(missing.length){
    // A failed install leaves a HALF-POPULATED cache behind, and because the worker never
    // activates, its activate handler never runs to clean it up. The fetch handler uses the
    // global caches.match(), which searches every cache in the origin - so orphaned partial
    // caches are exactly how stale content starts being served (see the G4 note in the gate).
    // Found by deploying a deliberately broken build to beta and watching the install fail.
    await caches.delete(CACHE_NAME);
    throw new Error('precache failed: '+missing.join(' '));
  }
})());});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME&&k.startsWith('mmf-beta-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);
// Bypass: cache-busted version check, recovery navigation, or explicit bypass query
if(url.search.includes('ts=')||url.search.includes('recovered='))return;
// version.json: always network-first, cached fallback
if(url.pathname.endsWith('/version.json')){event.respondWith(fetch(req,{cache:'no-store'}).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));return res}).catch(()=>caches.match(req)));return}
// masses.json: network-first with cached fallback (ensures fresh schedule data on each online load)
if(url.pathname.endsWith('/data/masses.json')){event.respondWith(fetch(req,{cache:'no-store'}).then(res=>{if(!res||!res.ok)throw new Error('network');const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));return res}).catch(()=>caches.match(req).then(cached=>cached||new Response('',{status:503}))));return}
// All other GET requests: cache-first with network fallback
event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(!res||!res.ok||res.type==='opaqueredirect')return cached||new Response('',{status:404});const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));return res}).catch(()=>cached||new Response('',{status:408}))));});
