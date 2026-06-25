import {DAYS,DAY_EN,DAY_FR,NEAR_RADIUS_KM,APP_VERSION} from './constants.js';
import {T} from './translations.js';
import {state} from './state.js';
export const $=s=>document.querySelector(s); export const $$=s=>[...document.querySelectorAll(s)];
export function storageGet(key,fallback=null){try{const v=localStorage.getItem(key);return v==null?fallback:v}catch(e){return fallback}}
export function storageSet(key,value){try{localStorage.setItem(key,value);return true}catch(e){return false}}
export function storageRemove(key){try{localStorage.removeItem(key);return true}catch(e){return false}}
export function tr(k,v={}){return String((T[state.lang]&&T[state.lang][k])||T.en[k]||k).replace(/\{(\w+)\}/g,(_,x)=>v[x]??'')}
export function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
export function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[œŒ]/g,'oe').toLowerCase().replace(/[’'`´-]/g,' ').replace(/\b(st)\b/g,'saint').replace(/\b(ste)\b/g,'sainte').replace(/\b(nd)\b/g,'notre dame').replace(/[^a-z0-9]+/g,' ').trim()}
export function normaliseSearchText(text){return normaliseCommonTypos(norm(text))}
export function normaliseCommonTypos(s){return String(s||'').replace(/\bcurpipe\b/g,'curepipe').replace(/\bcurepype\b/g,'curepipe').replace(/\bquatrebornes\b/g,'quatre bornes').replace(/\bportlouis\b/g,'port louis').replace(/\bbeaubassin\b/g,'beau bassin').replace(/\brosehill\b/g,'rose hill').replace(/\bmahebourg\b/g,'mahebourg').replace(/\bmaheburg\b/g,'mahebourg').replace(/\bgrandbaie\b/g,'grand baie').replace(/\bgrandgaube\b/g,'grand gaube').replace(/\bflac\b/g,'flacq')}
export function bool(v){return v===true||String(v).toLowerCase()==='true'}
export function mins(t){const m=String(t||'').match(/(\d{1,2}):(\d{2})/);return m?+m[1]*60+ +m[2]:9999}
export function rowActive(r){return bool(r.is_active)!==false}
export function rowMass(r){return bool(r.is_mass_only_visible)||String(r.mass_category||r.service_type).toLowerCase()==='mass'}
export function rowLat(r){const x=parseFloat(r.latitude);return Number.isFinite(x)?x:null}
export function rowLon(r){const x=parseFloat(r.longitude);return Number.isFinite(x)?x:null}
export function rawSiteName(r){return r.site_name||r.display_site_label||r.parish_label||r.parish_name||''}
export function siteName(r){return rawSiteName(r)}
export function visibleSiteName(r){
  const base=rawSiteName(r); if(!base)return '';
  const same=(state.rows||[]).filter(x=>norm(rawSiteName(x))===norm(base));
  const distinct=new Set(same.map(x=>String(x.site_uid||[x.region,x.town,x.parish_name,rawSiteName(x)].join('|'))));
  if(distinct.size<=1)return base;
  const town=String(r.town||'').trim();
  const parish=String(r.parish_label||r.parish_name||'').trim();
  const region=String(r.region||'').trim();
  const sameTownCount=new Set(same.filter(x=>norm(String(x.town||''))===norm(town)).map(x=>String(x.site_uid||x.parish_uid||x.parish_name||''))).size;
  let suffix='';
  if(town&&sameTownCount<=1)suffix=town;
  else suffix=[town,parish&&norm(parish)!==norm(base)?parish:'',region].filter(Boolean).slice(0,2).join(' · ');
  return suffix?`${base} — ${suffix}`:base;
}
export function dayName(d){return (state.lang==='fr'?DAY_FR:DAY_EN)[d]||d}
export function getMauritiusNow(base=new Date()){return new Date(base.toLocaleString('en-US',{timeZone:'Indian/Mauritius'}))}
export function mauritiusNow(base=new Date()){return getMauritiusNow(base)}
export function todayName(offset=0,base=mauritiusNow()){const d=new Date(base);d.setDate(d.getDate()+offset);return DAYS[d.getDay()]}
export function parseMassTime(row){return mins(row&&row.time_24h)}
export function isSaturdayEveningMass(row){return row&&row.day_of_week==='Samedi'&&parseMassTime(row)>=900}
export function isSundayEligible(r){return r.day_of_week==='Dimanche'||isSaturdayEveningMass(r)}
export function countsForSundayContext(row,now=mauritiusNow()){return isSundayEligible(row)}
export function massGraceMinutes(row){
  if(!rowMass(row))return 0;
  return (row.day_of_week==='Dimanche'||row.day_of_week==='Samedi')?60:45;
}
export function minutesSinceStart(row,now=mauritiusNow()){
  if(!row||row.day_of_week!==todayName(0,now))return null;
  return now.getHours()*60+now.getMinutes()-parseMassTime(row);
}
export function isInProgressMass(row,now=mauritiusNow()){
  const elapsed=minutesSinceStart(row,now);
  return elapsed!=null&&elapsed>0&&elapsed<=massGraceMinutes(row);
}
export function dateSerial(d){return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000)}
export function weekOfMonth(d){return Math.floor((d.getDate()-1)/7)+1}
export function isLastWeekdayOfMonth(d){const x=new Date(d);x.setDate(x.getDate()+7);return x.getMonth()!==d.getMonth()}
export function isOccurrenceRuleCandidate(t){
  t=norm(t||''); if(!t)return false;
  if(/adoration|exposition|celebration|celebration de la parole|messe ou celebration|prayer|chapelet|rosary/.test(t))return false;
  if(/english|anglais/.test(t)&&!(/only/.test(t)||/except/.test(t)))return false;
  return /first|second|third|fourth|last|except|every two weeks|fortnight|1st|2nd|3rd|4th|premier|deuxieme|troisieme|quatrieme|dernier/.test(t);
}
export function occurrenceText(r){
  if(r.occurrence_rule)return String(r.occurrence_rule||'').trim();
  const sr=String(r.special_rule||'').trim();
  return isOccurrenceRuleCandidate(sr)?sr:'';
}
export function hasCalendarRule(r){return !!occurrenceText(r)}
export function isRuleValidForDate(r,d){
  const t=norm(occurrenceText(r));
  if(!t)return true;
  if(/every two weeks|fortnight/.test(t))return false;
  const wom=weekOfMonth(d), last=isLastWeekdayOfMonth(d);
  if(/except first|sauf.*premier/.test(t))return wom!==1;
  const allowed=[];
  if(/first|1st|premier/.test(t))allowed.push(1);
  if(/second|2nd|deuxieme/.test(t))allowed.push(2);
  if(/third|3rd|troisieme/.test(t))allowed.push(3);
  if(/fourth|4th|quatrieme/.test(t))allowed.push(4);
  if(allowed.length)return allowed.includes(wom);
  if(/last|dernier/.test(t))return last;
  return true;
}
export function addDays(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x}
export function dateContextFor(p,now=mauritiusNow(),st=state){
  p=p||{};
  const mode=(st&&st.filters&&st.filters.dayMode)||'';
  if(p.day==='today')return {date:addDays(now,0),label:'today'};
  if(p.day==='tomorrow')return {date:addDays(now,1),label:'tomorrow'};
  if(DAYS.includes(p.day))return null;
  if(mode==='today')return {date:addDays(now,0),label:'today'};
  if(mode==='tomorrow')return {date:addDays(now,1),label:'tomorrow'};
  return null;
}
export function isValidForDateContext(r,ctx){return !ctx||isRuleValidForDate(r,ctx.date)}
export function nextDelta(r,now=mauritiusNow()){
  const targetDay=DAYS.indexOf(r.day_of_week); if(targetDay<0)return 999999;
  const rowM=mins(r.time_24h), nowM=now.getHours()*60+now.getMinutes();
  for(let add=0;add<=56;add++){
    const d=new Date(now); d.setDate(d.getDate()+add);
    if(d.getDay()!==targetDay)continue;
    if(add===0&&rowM<nowM){
      const elapsed=nowM-rowM;
      if(elapsed<=massGraceMinutes(r)&&isRuleValidForDate(r,d))return -elapsed;
      continue;
    }
    if(!isRuleValidForDate(r,d))continue;
    return add*1440+rowM-nowM;
  }
  return 999999;
}
export function getNextOccurrence(row,now=mauritiusNow()){const delta=nextDelta(row,now); if(delta>=999999)return null; const d=new Date(now); d.setMinutes(d.getMinutes()+delta); return d}
export function isPastMass(row,now=mauritiusNow()){
  const elapsed=minutesSinceStart(row,now);
  return elapsed!=null&&elapsed>massGraceMinutes(row);
}
export function rel(delta,now=mauritiusNow()){
  if(delta>=999999)return '';
  if(delta<0)return tr('startedAgo',{n:Math.abs(delta)});
  if(delta<=1)return tr('now');
  const target=new Date(now); target.setMinutes(target.getMinutes()+delta);
  const dayDiff=dateSerial(target)-dateSerial(now);
  if(dayDiff===0){if(delta<60)return tr('inM',{n:delta}); const h=Math.floor(delta/60),m=delta%60; return m===0?(state.lang==='fr'?`dans ${h}h`:`in ${h}h`):tr('inH',{h,m});}
  if(dayDiff===1)return tr('tomorrowRel');
  return dayName(DAYS[target.getDay()])
}
export function distKm(a,b,c,d){if([a,b,c,d].some(x=>!Number.isFinite(+x)))return null; const R=6371,rad=x=>x*Math.PI/180; const dLat=rad(c-a),dLon=rad(d-b); const A=Math.sin(dLat/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(A))}
export function isExactCoordinate(r){return ['exact_door','exact_building','exact_compound'].includes(String(r.coordinate_precision||''));}
export function distanceLabel(r,d=null){const val=d??(state.location?distKm(state.location.lat,state.location.lon,rowLat(r),rowLon(r)):null); if(val==null)return ''; const key=(isExactCoordinate(r)?'exact':'approx'); return tr(key,{d:val.toFixed(val<10?1:0)})}
export function semanticReplaceNormalized(text,patterns){
  let s=' '+normaliseSearchText(text)+' ';
  (patterns||[]).sort((a,b)=>b.length-a.length).forEach(p=>{
    const q=' '+normaliseSearchText(p)+' ';
    if(!q.trim())return;
    s=s.split(q).join(' ');
  });
  return s.replace(/\s+/g,' ').trim();
}
export function hasAnyPhrase(n,phrases){
  const s=' '+normaliseSearchText(n)+' ';
  return phrases.some(p=>s.includes(' '+normaliseSearchText(p)+' '));
}
export function isEnglishIntentText(n){return hasAnyPhrase(n,['english mass','mass in english','messe en anglais','messe anglais','messe anglaise','english','anglais'])}
export function isFirstFridayIntentText(n){return hasAnyPhrase(n,['first friday','1st friday','premier vendredi','1er vendredi','messe 1er vendredi'])}
export function isNearIntentText(n){
  const s=' '+normaliseSearchText(n)+' ';
  if(hasAnyPhrase(s,['near me','nearby mass','mass nearby','nearby','closest mass','mass closest to me','around me','close to me','mass close to me','pres de moi','près de moi','proche de moi','a proximite','à proximité','aux alentours','autour de moi']))return true;
  // French users often say “messe proche maintenant”; treat “proche” as current-location intent only when no explicit place remains.
  if(/\b(proche|proximite|proximité)\b/.test(s)&&/\b(messe|mass|maintenant|now)\b/.test(s)&&!/(curepipe|port louis|quatre bornes|rose hill|vacoas|floreal|floréal|mahebourg|mahébourg|grand baie|beau bassin|moka|goodlands|triolet|souillac|flic en flac|bambous|riviere|rivière|plaines|wilhems)\b/.test(s))return true;
  // Do not treat “Mass near Curepipe” as current-location Near Me; that is a place search.
  return false;
}
export function isEveningIntentText(n){return hasAnyPhrase(n,['evening','soir','soiree','soirée','tonight','ce soir'])}
export function rowIsEnglish(r){const txt=normaliseSearchText([r.language_code,r.language,r.special_rule,r.notes,r.qualifier,r.search_text].join(' ')); return /\ben\b/.test(String(r.language_code||'').toLowerCase())||txt.includes('english')||txt.includes('anglais')}
export function rowIsFirstFriday(r){
  const txt=normaliseSearchText([r.occurrence_rule,r.special_rule].filter(Boolean).join(' '));
  if(!txt)return false;
  if(txt.includes('except first friday')||txt.includes('sauf premier vendredi')||txt.includes('sauf 1er vendredi'))return false;
  return txt.includes('first friday')||txt.includes('premier vendredi')||txt.includes('1er vendredi')
}

export function stripStopwords(text){const stop=/\b(this|in|at|on|for|to|i|want|need|find|show|get|please|me|a|an|the|mass|masses|church|churches|du|de|des|le|la|les|l|au|aux|d|en|ce|cet|cette|dans|pour|je|veux|cherche|trouver|montre|moi|une|un|messe|messes|eglise|eglises|near|nearby|closest|close|around|pres|près|now|maintenant|proche|proximite|proximité|autour|anglais|english)\b/g;return String(text||'').replace(stop,' ').replace(/\s+/g,' ').trim()}
export function mapsUrl(r){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(r.maps_query||[siteName(r),r.town,r.parish_name,'Mauritius'].filter(Boolean).join(', '))}
export function sourceBadge(r){const dt=r.last_verified||r.last_checked||''; return dt?`${tr('verified')} ${dt.slice(0,7)}`:''}
export function massBadge(r){if(!rowMass(r))return tr('otherCelebration'); if(r.day_of_week==='Dimanche')return tr('sundayMass'); if(countsForSundayContext(r)&&r.day_of_week==='Samedi')return tr('satEve'); return tr('weekdayMass')}
export function languageBadge(r){const code=String(r.language_code||r.language||'').toLowerCase(); if(code==='en'||code==='english') return state.lang==='fr'?'Messe en anglais':'English Mass'; return ''}
export function _ruleLang(){return (state&&state.lang)==='fr'?'fr':'en'}
export function _ruleLabel(en,fr){return _ruleLang()==='fr'?fr:en}
export function ruleKind(raw){
  const t=norm(raw||'');
  if(!t)return '';
  if(/except first friday|sauf.*premier.*vendredi/.test(t))return 'except_first_friday';
  if(/first friday only|1st friday only|premier.*vendredi.*seulement/.test(t))return 'first_friday_only';
  if(/second friday only|2nd friday only|deuxieme.*vendredi.*seulement/.test(t))return 'second_friday_only';
  if(/third friday only|3rd friday only|troisieme.*vendredi.*seulement/.test(t))return 'third_friday_only';
  if(/fourth friday only|4th friday only|quatrieme.*vendredi.*seulement/.test(t))return 'fourth_friday_only';
  if(/last friday only|dernier.*vendredi.*seulement/.test(t))return 'last_friday_only';
  if(/english.*except first sunday|anglais.*sauf.*premier.*dimanche/.test(t))return 'english_except_first_sunday';
  if(/except first sunday|sauf.*premier.*dimanche/.test(t))return 'except_first_sunday';
  if(/first sunday only|1st sunday only|premier.*dimanche.*seulement/.test(t))return 'first_sunday_only';
  if(/second sunday only|2nd sunday only|deuxieme.*dimanche.*seulement/.test(t))return 'second_sunday_only';
  if(/third sunday only|3rd sunday only|troisieme.*dimanche.*seulement/.test(t))return 'third_sunday_only';
  if(/fourth sunday only|4th sunday only|quatrieme.*dimanche.*seulement/.test(t))return 'fourth_sunday_only';
  if(/third and fourth wednesday only|3rd and 4th wednesday|troisieme.*quatrieme.*mercredi/.test(t))return 'third_fourth_wednesday_only';
  if(/third saturday only|3rd saturday only|troisieme.*samedi.*seulement/.test(t))return 'third_saturday_only';
  if(/first tuesday only|1st tuesday only|premier.*mardi.*seulement/.test(t))return 'first_tuesday_only';
  if(/every two weeks|every other week|fortnight|toutes les deux semaines|une semaine sur deux/.test(t))return 'every_two_weeks';
  if(/monthly|once a month|mensuel|une fois par mois/.test(t))return 'monthly';
  if(/english.*second sunday|second sunday.*english|anglais.*deuxieme.*dimanche|deuxieme.*dimanche.*anglais/.test(t))return 'english_second_sunday';
  if(/english.*third saturday|third saturday.*english|anglais.*troisieme.*samedi|troisieme.*samedi.*anglais/.test(t))return 'english_third_saturday';
  if(/english.*first sunday|first sunday.*english|anglais.*premier.*dimanche|premier.*dimanche.*anglais/.test(t))return 'english_first_sunday';
  if(/^english mass$|^messe en anglais$/.test(t))return 'english_mass';
  if(/sick mass|messe des malades/.test(t))return 'sick_mass';
  if(/messe ou celebration|mass or celebration/.test(t))return 'messe_ou_celebration';
  if(/celebration de la parole|celebration of the word/.test(t))return 'celebration_word';
  if(/celebration by laity|celebration.*laity|celebration par des laics/.test(t))return 'celebration_laity';
  if(/celebration at chapelle du montmartre/.test(t))return 'celebration_montmartre';
  if(/temps de priere|prayer time/.test(t))return 'prayer_time';
  if(/adoration.*followed by mass|adoration.*suivi.*messe/.test(t))return 'adoration_followed_by_mass';
  if(/adoration.*exposition|exposition.*adoration/.test(t))return 'adoration_exposition';
  if(/exposition.*saint sacrement|exposition.*blessed sacrament|exposition du st sacrement|exposition du saint-sacrement/.test(t))return 'exposition_blessed_sacrament';
  if(/exposition/.test(t))return 'exposition';
  if(/adoration only|adoration uniquement/.test(t))return 'adoration_only';
  if(/adoration/.test(t))return 'adoration';
  if(/not a mass|other celebration|autre celebration|pas une messe/.test(t))return 'other_celebration';
  return '';
}
export function localizedRuleText(raw){
  const kind=ruleKind(raw);
  if(kind==='except_first_friday')return _ruleLabel('Every Friday except the first Friday of the month','Tous les vendredis sauf le premier vendredi du mois');
  if(kind==='first_friday_only')return _ruleLabel('First Friday of the month only','Premier vendredi du mois seulement');
  if(kind==='second_friday_only')return _ruleLabel('Second Friday of the month only','Deuxième vendredi du mois seulement');
  if(kind==='third_friday_only')return _ruleLabel('Third Friday of the month only','Troisième vendredi du mois seulement');
  if(kind==='fourth_friday_only')return _ruleLabel('Fourth Friday of the month only','Quatrième vendredi du mois seulement');
  if(kind==='last_friday_only')return _ruleLabel('Last Friday of the month only','Dernier vendredi du mois seulement');
  if(kind==='except_first_sunday')return _ruleLabel('Every Sunday except the first Sunday of the month','Tous les dimanches sauf le premier dimanche du mois');
  if(kind==='first_sunday_only')return _ruleLabel('First Sunday of the month only','Premier dimanche du mois seulement');
  if(kind==='second_sunday_only')return _ruleLabel('Second Sunday of the month only','Deuxième dimanche du mois seulement');
  if(kind==='third_sunday_only')return _ruleLabel('Third Sunday of the month only','Troisième dimanche du mois seulement');
  if(kind==='fourth_sunday_only')return _ruleLabel('Fourth Sunday of the month only','Quatrième dimanche du mois seulement');
  if(kind==='third_fourth_wednesday_only')return _ruleLabel('Third and fourth Wednesday of the month only','Troisième et quatrième mercredi du mois seulement');
  if(kind==='third_saturday_only')return _ruleLabel('Third Saturday of the month only','Troisième samedi du mois seulement');
  if(kind==='first_tuesday_only')return _ruleLabel('First Tuesday of the month only','Premier mardi du mois seulement');
  if(kind==='every_two_weeks')return _ruleLabel('Every two weeks','Toutes les deux semaines');
  if(kind==='monthly')return _ruleLabel('Once a month','Une fois par mois');
  if(kind==='english_first_sunday')return _ruleLabel('English Mass on the first Sunday of the month','Messe en anglais le premier dimanche du mois');
  if(kind==='english_except_first_sunday')return _ruleLabel('English Mass except on the first Sunday of the month','Messe en anglais sauf le premier dimanche du mois');
  if(kind==='english_second_sunday')return _ruleLabel('English Mass on the second Sunday of the month','Messe en anglais le deuxième dimanche du mois');
  if(kind==='english_third_saturday')return _ruleLabel('English Mass on the third Saturday of the month','Messe en anglais le troisième samedi du mois');
  if(kind==='english_mass')return _ruleLabel('English Mass','Messe en anglais');
  if(kind==='sick_mass')return _ruleLabel('Mass for the sick','Messe des malades');
  if(kind==='messe_ou_celebration')return _ruleLabel('Ambiguous: Mass or celebration','Ambigu : messe ou célébration');
  if(kind==='celebration_word')return _ruleLabel('Celebration of the Word — not a Mass','Célébration de la Parole — pas une messe');
  if(kind==='celebration_laity')return _ruleLabel('Celebration led by laity — not a Mass','Célébration par des laïcs — pas une messe');
  if(kind==='celebration_montmartre')return _ruleLabel('Celebration at Chapelle du Montmartre — not a Mass','Célébration à la chapelle du Montmartre — pas une messe');
  if(kind==='prayer_time')return _ruleLabel('Prayer time — not a Mass','Temps de prière — pas une messe');
  if(kind==='exposition_blessed_sacrament')return _ruleLabel('Exposition of the Blessed Sacrament','Exposition du Saint-Sacrement');
  if(kind==='exposition')return _ruleLabel('Exposition','Exposition');
  if(kind==='adoration_followed_by_mass')return _ruleLabel('Adoration followed by Mass','Adoration suivie de la messe');
  if(kind==='adoration_exposition')return _ruleLabel('Adoration / exposition','Adoration / exposition');
  if(kind==='adoration_only')return _ruleLabel('Adoration only — not a Mass','Adoration seulement — pas une messe');
  if(kind==='adoration')return _ruleLabel('Adoration','Adoration');
  if(kind==='other_celebration')return _ruleLabel('Other celebration — not a Mass','Autre célébration — pas une messe');
  const text=String(raw||'').trim();
  if(_ruleLang()==='fr' && /[A-Za-z]/.test(text) && !/[À-ÿ]/.test(text))return 'Condition particulière — voir la source';
  return text;
}
export function ruleText(r){
  const langKind=ruleKind(r.language_rule);
  if(['english_first_sunday','english_second_sunday','english_third_saturday','english_except_first_sunday'].includes(langKind))return localizedRuleText(r.language_rule);
  const parts=[]; const occ=occurrenceText(r); if(occ)parts.push(occ);
  [r.qualifier,r.special_rule,r.language_rule].filter(Boolean).forEach(x=>{x=String(x).trim(); if(!x)return; if(occ&&norm(x)===norm(occ))return; parts.push(x)});
  const seen=new Set();
  return parts.map(localizedRuleText).filter(x=>{let k=norm(x).replace(/english mass|messe en anglais|english|anglais/g,'').replace(/only|of the month|du mois|every|chaque|tous les|sauf|premier|first|le|la|les/g,'').replace(/sick mass/g,'').replace(/\s+/g,' ').trim(); if(!k)k=norm(x); for(const old of seen){if(k===old||k.includes(old)||old.includes(k))return false} seen.add(k); return true}).join(' · ')
}
export function confidenceScore(r){const n=parseInt(r.confidence_score||r.coordinate_confidence||'',10); return Number.isFinite(n)?n:null}
export function precisionLabel(r){return isExactCoordinate(r)?tr('exactLocation'):tr('approxLocation')}
export function trustLine(r){const dateStr=r.last_verified||r.last_checked||(r.source_last_batch_reconciled_at?r.source_last_batch_reconciled_at.substring(0,7):''); const isRowVerified=!!(r.last_verified||r.last_checked); const v=sourceBadge(r)||(dateStr?(isRowVerified?tr('verified')+' '+dateStr:tr('batchReconciled')+' '+dateStr):tr('batchReconciled')); const score=confidenceScore(r); const conf=score!=null?(score<70?tr('confidenceLow'):tr('confidenceOk',{score})):''; return [v,tr('sourceAvailable'),precisionLabel(r),conf].filter(Boolean).join(' · ')}
export function warningBanner(r){const rule=ruleText(r), occ=occurrenceText(r), kind=ruleKind(occ), langKind=ruleKind(r.language_rule); if(!rowMass(r))return `<div class="ruleBanner danger">${esc(tr('notMassWarning'))}${rule?' · '+esc(rule):''}</div>`; if(['english_first_sunday','english_second_sunday','english_third_saturday','english_except_first_sunday'].includes(langKind))return `<div class="ruleBanner">${esc(localizedRuleText(r.language_rule))}</div>`; if(occ){const label=(kind&&kind.startsWith('except_'))?tr('exceptWhen',{rule:localizedRuleText(occ)}):tr('onlyWhen',{rule:localizedRuleText(occ)}); return `<div class="ruleBanner">${esc(label)}</div>`} if(rule)return `<div class="ruleBanner">${esc(rule)}</div>`; return ''}
export function rowKey(r){return String(r.id||r.row_id||r.uid||[r.site_uid,r.day_of_week,r.time_24h,r.special_rule||'',r.qualifier||''].join('|'))}
export function reportEmail(){return (window.MMF_CONFIG&&window.MMF_CONFIG.REPORT_EMAIL)||(window.MASS_FINDER_CONFIG&&window.MASS_FINDER_CONFIG.REPORT_EMAIL)||'mauritiusmassfinder@gmail.com'}
export function reportUrl(r){
  const subject=tr('reportSubject')+(r?' — '+siteName(r):'');
  const lines=[tr('reportBody')];
  if(r){
    lines.push('');
    lines.push('Church/site: '+siteName(r));
    lines.push('Parish: '+(r.parish_label||r.parish_name||''));
    lines.push('Town/region: '+[r.town,r.region].filter(Boolean).join(' / '));
    lines.push('Day/time: '+dayName(r.day_of_week)+' '+(r.time_24h||''));
    {const rt=ruleText(r); if(rt)lines.push('Rule/qualifier: '+rt);}
    if(r.source_url)lines.push('Source: '+r.source_url);
  }
  lines.push('');
  lines.push('App version: '+APP_VERSION);
  return 'mailto:'+String(reportEmail()).replace(/[^A-Za-z0-9@._+%-]/g,'')+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
}
export function sourceLabel(r){
  const direct=(state.lang==='fr'?r.source_label_fr:r.source_label_en)||'';
  if(direct)return direct;
  const site=(r.site_name||'').trim();
  const parish=(r.parish_label||r.parish_name||'').trim();
  const sourcePage=(r.source_page_label||parish).trim();
  if(sourcePage&&site&&norm(sourcePage)!==norm(site))return tr('sourceParishPage',{parish:sourcePage});
  return tr('source');
}
export function scheduleScopeLabel(r){return tr('parishSchedule')}
export function toast(msg){const t=$('#toast'); if(!t)return; t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),1800)}
export function markSwipeHintSeen(){
  storageSet('mmf_swipe_hint_seen','1');
  document.body.classList.add('quickHintSeen');
}
export function updateSwipeAffordance(){
  const row=$('#quickRow'), scroller=$('#quickScroller'), hint=$('#swipeHint'); if(!row||!scroller||!hint)return;
  const overflow=row.scrollWidth>row.clientWidth+4; const atEnd=row.scrollLeft+row.clientWidth>=row.scrollWidth-6; const seen=storageGet('mmf_swipe_hint_seen')==='1';
  scroller.classList.toggle('hasOverflow',overflow&&!atEnd&&!seen);
  document.body.classList.toggle('quickHintSeen',seen||!overflow);
  hint.textContent=(!seen&&overflow)?tr('swipeHint'):'';
}
