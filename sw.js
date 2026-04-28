const CACHE='mmf-v24-7';
const SHELL=['./','index.html','app.js','config.js','manifest.json','icon.svg','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-192.png','icons/icon-maskable-512.png','version.json','fallback-data.js'];
const DATA_PATHS=['/data/masses.json','/data/masses.csv','/fallback-data.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE && k.startsWith('mmf-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING') self.skipWaiting();});
function pathKey(url){ return url.origin + url.pathname; }
self.addEventListener('fetch',e=>{
  if(e.request && e.request.url && e.request.url.includes('version.json')){
    e.respondWith(fetch(e.request, {cache:'no-store'}).catch(()=>caches.match(e.request)));
    return;
  }
  const url=new URL(e.request.url);
  if(url.pathname.endsWith('/version.json')){
    e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match('version.json'))); return;
  }
  if(DATA_PATHS.some(p=>url.pathname.endsWith(p))){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(res=>{
      const clone=res.clone(); caches.open(CACHE).then(c=>c.put(pathKey(url), clone)).catch(()=>{}); return res;
    }).catch(()=>caches.match(pathKey(url)))); return;
  }
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(res=>{
    if(e.request.method==='GET' && url.origin===location.origin){ const clone=res.clone(); caches.open(CACHE).then(cache=>cache.put(e.request,clone)).catch(()=>{}); }
    return res;
  }).catch(()=>caches.match('index.html'))));
});
