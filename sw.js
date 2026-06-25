const CACHE_NAME='mmf-beta-v27-3-10';
const CORE=['./','index.html','styles.css','app.js','config.js','version.json','manifest.json','data/masses.json','fallback-data.js','recover.html','icon.svg','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-192.png','icons/icon-maskable-512.png','modules/constants.js','modules/translations.js','modules/state.js','modules/utils.js','modules/geo.js','modules/search.js','modules/render.js','modules/sheets.js','modules/sw-bridge.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)));});
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
