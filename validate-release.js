const fs = require('fs');
const path = require('path');
const root = __dirname;
function read(p){ return fs.readFileSync(path.join(root,p),'utf8'); }
function pass(name, ok, detail=''){ console.log((ok?'PASS':'FAIL')+' — '+name+(detail?' — '+detail:'')); if(!ok) process.exitCode=1; }
const db=JSON.parse(read('data/masses.json'));
const rows=db.rows||[];
const app=read('app.js');
const sw=read('service-worker.js');
const manifest=JSON.parse(read('manifest.json'));
const version=JSON.parse(read('version.json'));
function count(fn){return rows.filter(fn).length}
const keys=new Set(); let dup=0; for(const r of rows){ const k=[r.parish_uid,r.site_uid,r.day_of_week,r.time_24h,r.service_type,r.special_rule].join('|'); if(keys.has(k)) dup++; keys.add(k);}
pass('row count', rows.length===383, String(rows.length));
pass('parish count', new Set(rows.map(r=>r.parish_uid)).size===47);
pass('site count', new Set(rows.map(r=>r.site_uid)).size===117);
pass('Mass rows', count(r=>r.is_mass_only_visible)===378, String(count(r=>r.is_mass_only_visible)));
pass('other/ambiguous rows', count(r=>!r.is_mass_only_visible)===5, String(count(r=>!r.is_mass_only_visible)));
pass('duplicate technical keys', dup===0, String(dup));
pass('valid day/time', rows.every(r=>['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'].includes(r.day_of_week) && /^\d{2}:\d{2}$/.test(r.time_24h)));
pass('coordinates present', rows.every(r=>Number.isFinite(Number(r.latitude)) && Number.isFinite(Number(r.longitude))));
pass('v17.2 version constant', app.includes("APP_VERSION = '17.2'"));
pass('service worker cache v17.2', sw.includes('mmf-v17.2-public-release-hardening'));
pass('manifest icons', Array.isArray(manifest.icons) && manifest.icons.some(i=>i.sizes==='192x192') && manifest.icons.some(i=>i.sizes==='512x512') && manifest.icons.some(i=>String(i.purpose).includes('maskable')));
pass('version.json v17.2', String(version.version)==='17.2');
pass('Sunday obligation quick filter label', app.includes('Sunday obligation') && app.includes('Messe du dimanche'));
pass('Vigil data model fields', rows.every(r=>'calendar_day' in r && 'obligation_day' in r && 'is_vigil' in r && 'vigil_label_en' in r && 'vigil_label_fr' in r));
pass('explicit Vigil rows marked', count(r=>r.is_vigil)===78, String(count(r=>r.is_vigil)));
pass('no inferred vigil rows', count(r=>r.vigil_status==='inferred')===0);
pass('no non-vigil Saturday marked Sunday obligation', rows.every(r=>!(r.day_of_week==='Samedi' && r.obligation_day==='Sunday' && !r.is_vigil)));

pass('Notre-Dame stopwords preserved', app.includes("const SEARCH_STOPWORDS = new Set(['de','du','des','la','le','l','les']);"));
pass('Sunday/weekday badge labels', app.includes('sundayMassBadge') && app.includes('weekdayMassBadge') && app.includes('otherCelebrationBadge'));
