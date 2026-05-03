const CACHE='mmf-v24-24-0';
const SHELL=['./','index.html','app.js','config.js','manifest.json','icon.svg','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-192.png','icons/icon-maskable-512.png','version.json','fallback-data.js'];
const DATA_PATHS=['/data/masses.json','/data/masses.csv','/fallback-data.js'];
async function cacheShellFresh(){
  const cache = await caches.open(CACHE);
  await Promise.all(SHELL.map(async path => {
    try{
      const req = new Request(path + (path.includes('?') ? '&' : '?') + 'v=24.24.0', {cache:'reload'});
      const res = await fetch(req);
      if(res && res.ok) await cache.put(path, res.clone());
    }catch(_e){}
  }));
}
self.addEventListener('install', e => e.waitUntil(cacheShellFresh().then(()=>self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && /^mmf-/i.test(k)).map(k => caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message', e => { if(e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting(); });
function pathKey(url){ return url.origin + url.pathname; }
function noStoreFetch(req){ return fetch(req, {cache:'no-store'}); }
self.addEventListener('fetch', e => {
  if(!e.request || e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if(url.origin !== location.origin) return;
  if(url.pathname.endsWith('/version.json') || url.searchParams.has('mmf_refresh') || url.searchParams.has('mmf_nocache')){
    e.respondWith(noStoreFetch(e.request).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
    return;
  }
  if(DATA_PATHS.some(p => url.pathname.endsWith(p))){
    e.respondWith(noStoreFetch(e.request).then(res => {
      const clone = res.clone(); caches.open(CACHE).then(c => c.put(pathKey(url), clone)).catch(()=>{}); return res;
    }).catch(()=>caches.match(pathKey(url))));
    return;
  }
  if(url.pathname.endsWith('/index.html') || url.pathname === '/' || url.pathname.endsWith('/app.js') || url.pathname.endsWith('/config.js') || url.pathname.endsWith('/fallback-data.js')){
    e.respondWith(noStoreFetch(e.request).then(res => {
      const clone = res.clone(); caches.open(CACHE).then(c => c.put(e.request, clone)).catch(()=>{}); return res;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
    const clone = res.clone(); caches.open(CACHE).then(c => c.put(e.request, clone)).catch(()=>{}); return res;
  }).catch(()=>caches.match('index.html'))));
});
