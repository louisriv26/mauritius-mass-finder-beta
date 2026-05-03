
const CACHE_NAME='mmf-v24-24-5';
const CORE=['./','index.html','styles.css','app.js','version.json','manifest.json','data/masses.json','fallback-data.js','icon.svg'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)).catch(()=>{}));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME&&k.startsWith('mmf-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url); if(url.pathname.endsWith('/version.json')||url.pathname.endsWith('/data/masses.json')){event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));return res}).catch(()=>caches.match(req)));return} event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy));return res}).catch(()=>caches.match('index.html'))));});
