import {DAYS,NEAR_RADIUS_KM,DAY_FR,DAY_EN} from './constants.js';
import {state,setState,setFilters,DEFAULT_FILTERS} from './state.js';
import {
  $,$$,tr,norm,normaliseSearchText,bool,mins,
  rowActive,rowMass,rowLat,rowLon,siteName,visibleSiteName,
  dayName,mauritiusNow,todayName,
  parseMassTime,isSundayEligible,countsForSundayContext,massGraceMinutes,
  dateSerial,isRuleValidForDate,dateContextFor,isValidForDateContext,
  nextDelta,getNextOccurrence,isPastMass,
  distKm,isExactCoordinate,confidenceScore,
  semanticReplaceNormalized,hasAnyPhrase,isNearIntentText,isEveningIntentText,
  isEnglishIntentText,isFirstFridayIntentText,stripStopwords,
  rowIsEnglish,rowIsFirstFriday,
  storageGet,storageSet,rowKey,
  toast
} from './utils.js';
import {requestLocation,locationRequestInFlight} from './geo.js';
export function parseExactTimeRaw(q){const raw=String(q||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); const m=raw.match(/\b(\d{1,2})\s*(?::|h)\s*(\d{2})\s*(am|pm)?\b|\b(\d{1,2})\s*h\b|\b(\d{1,2})\s*(am|pm)\b/); if(!m)return null; let h=+(m[1]||m[4]||m[5]), min=m[2]?+m[2]:0, ap=m[3]||m[6]||''; if(ap==='pm'&&h<12)h+=12; if(ap==='am'&&h===12)h=0; return h<24&&min<60?{minutes:h*60+min,label:`${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}`}:null}
export function normalizeUrlDayValue(raw){
  const key=normaliseSearchText(decodeURIComponent(String(raw||''))).replace(/\s+/g,' ').trim();
  const map={
    today:'__today','aujourd hui':'__today',aujourdhui:'__today',
    tomorrow:'__tomorrow',demain:'__tomorrow',
    monday:'Lundi',lundi:'Lundi',
    tuesday:'Mardi',mardi:'Mardi',
    wednesday:'Mercredi',mercredi:'Mercredi',
    thursday:'Jeudi',jeudi:'Jeudi',
    friday:'Vendredi',vendredi:'Vendredi',
    saturday:'Samedi',samedi:'Samedi',
    sunday:'Dimanche',dimanche:'Dimanche'
  };
  return map[key]||'';
}
export function normalizeUrlTimeValue(raw){
  const value=String(raw||'').trim();
  if(!value)return {kind:'none'};
  const low=normaliseSearchText(value);
  if(low==='evening')return {kind:'bucket',value:'afternoon'};
  if(low==='soir'||low==='soiree')return {kind:'bucket',value:'afternoon'};
  if(['morning','matin'].includes(low))return {kind:'bucket',value:'morning'};
  if(['afternoon','apres midi','apres-midi'].includes(low))return {kind:'bucket',value:'afternoon'};
  const exact=parseExactTimeRaw(value);
  if(exact)return {kind:'exact',value:exact.label,minutes:exact.minutes};
  return {kind:'invalid'};
}
export function appendExactTimeToQuery(q,label){
  const base=String(q||'').trim();
  const existing=parseExactTimeRaw(base);
  if(existing)return base;
  return (base?base+' ':'')+label;
}
export function parseUserIntent(q){
  const raw=String(q||'');
  const exactRaw=parseExactTimeRaw(raw);
  const n=normaliseSearchText(raw);
  const p={raw:raw,tokens:n.split(' ').filter(Boolean),chips:[]};
  if(!n&&!exactRaw)return p;
  const chip=(k,label)=>{if(!p.chips.some(c=>c.k===k&&c.label===label))p.chips.push({k,label})};
  const dayMap={
    monday:'Lundi',lundi:'Lundi',
    tuesday:'Mardi',mardi:'Mardi',
    wednesday:'Mercredi',mercredi:'Mercredi',
    thursday:'Jeudi',jeudi:'Jeudi',
    friday:'Vendredi',vendredi:'Vendredi',
    saturday:'Samedi',samedi:'Samedi',
    sunday:'Dimanche',dimanche:'Dimanche'
  };
  for(const [word,day] of Object.entries(dayMap)){
    if(new RegExp('\\b'+word+'\\b').test(n)){p.day=day; chip('day',dayName(day)); break}
  }
  if(/\b(today|aujourd hui)\b/.test(n)){p.day='today'; p.chips=p.chips.filter(c=>c.k!=='day'); chip('day',tr('today'))}
  if(/\b(tomorrow|demain)\b/.test(n)){p.day='tomorrow'; p.chips=p.chips.filter(c=>c.k!=='day'); chip('day',tr('tomorrow'))}
  if(/\b(maintenant|now)\b/.test(n)){p.now=true; chip('time',tr('nextUseful'))}
  if(isEnglishIntentText(n)){p.lang='EN'; chip('lang',state.lang==='fr'?'Messe en anglais':'English Mass')}
  if(isFirstFridayIntentText(n)){p.firstFriday=true; chip('rule',state.lang==='fr'?'Premier vendredi':'First Friday')}
  if(isEveningIntentText(n)){p.time='afternoon'; chip('time',tr('afternoon')); if(/\b(saturday|samedi)\b/.test(n)){p.saturdayEvening=true;p.saturdayAnticipated=true} if(/\b(sunday|dimanche)\b/.test(n))p.sundayEvening=true}
  else if(/\b(morning|matin)\b/.test(n)){p.time='morning'; chip('time',tr('morning'))}
  else if(/\b(afternoon|apres midi)\b/.test(n)){p.time='afternoon'; chip('time',tr('afternoon')); if(/\b(saturday|samedi)\b/.test(n))p.saturdayAnticipated=true; if(/\b(sunday|dimanche)\b/.test(n))p.sundayEvening=true}
  if(exactRaw){p.exact=exactRaw.minutes;p.exactLabel=exactRaw.label;chip('time',exactRaw.label)}
  if(isNearIntentText(n)){p.near=true;chip('near',tr('quickNear'))}
  const removePhrases=[
    'today','aujourd hui','tomorrow','demain','maintenant','now',
    'monday','lundi','tuesday','mardi','wednesday','mercredi','thursday','jeudi','friday','vendredi','saturday','samedi','sunday','dimanche',
    'evening','soir','soiree','soirée','tonight','ce soir','morning','matin','afternoon','apres midi','après-midi',
    'english mass','mass in english','messe en anglais','messe anglais','messe anglaise','english','anglais',
    'first friday','1st friday','premier vendredi','1er vendredi','messe 1er vendredi',
    'near me','nearby','nearby mass','mass nearby','closest','close to me','mass close to me','around me','near','pres de moi','près de moi','proche de moi','proche','a proximite','à proximité','aux alentours','autour de moi',
    'mass','messe','church','eglise','église'
  ];
  let clean=semanticReplaceNormalized(n,removePhrases)
    .replace(/\b\d{1,2}(?:h|:)?\d{0,2}\s*(pm|am)?\b/g,' ')
    .replace(/\s+/g,' ').trim();
  clean=stripStopwords(clean);
  p.place=clean; if(clean) chip('place',clean);
  return p
}
export function parseQuery(q){return parseUserIntent(q)}
export function matchesText(r,p){
  if(p&&p.lang==='EN'&&!rowIsEnglish(r))return false;
  if(p&&p.firstFriday&&!rowIsFirstFriday(r))return false;
  if(!p.place)return true;
  const hay=normaliseSearchText([r.search_text,r.region,r.town,r.parish_name,r.parish_label,r.site_name,r.maps_query].join(' '));
  return p.place.split(' ').filter(Boolean).every(t=>hay.includes(t))
}
export function matchesTime(r,b,p={}){
  const m=mins(r.time_24h); if(!b)return true;
  if(b==='morning')return m<720;
  if(b==='afternoon')return m>=720;
  if(b==='evening')return m>=720;
  return true
}
export function matchesExact(r,ex,tolerance=15){if(ex==null)return true; return Math.abs(mins(r.time_24h)-ex)<=tolerance}
export function effectiveDayMode(){
  const p=state.parsed||{};
  if(p.day==='today')return 'today';
  if(p.day==='tomorrow')return 'tomorrow';
  if(p.day==='Dimanche')return 'sunday_obligation';
  if(DAYS.includes(p.day))return 'calendar';
  if(state.filters.dayMode==='today')return 'today';
  if(state.filters.dayMode==='tomorrow')return 'tomorrow';
  if(state.filters.day==='Dimanche'&&state.filters.dayMode==='sunday_obligation')return 'sunday_obligation';
  if(state.filters.dayMode)return state.filters.dayMode;
  return ''
}
export function effectiveDay(){
  const p=state.parsed||{};
  if(p.day==='today')return todayName(0);
  if(p.day==='tomorrow')return todayName(1);
  if(DAYS.includes(p.day))return p.day;
  if(state.filters.dayMode==='today')return todayName(0);
  if(state.filters.dayMode==='tomorrow')return todayName(1);
  if(state.filters.day)return state.filters.day;
  return ''
}
export function cleanVisibleQuery(q){
  let s=normaliseSearchText(q);
  s=semanticReplaceNormalized(s,['mass','messe','church','eglise','église']);
  s=stripStopwords(s);
  return s.replace(/\s+/g,' ').trim()
}
export function removeQueryIntent(q,k){
  if(k==='near')return preservedVisibleQueryWithoutNear(q);
  let s=String(q||'');
  if(k==='day')s=semanticReplaceNormalized(s,['today','aujourd hui','maintenant','now','tomorrow','demain','monday','lundi','tuesday','mardi','wednesday','mercredi','thursday','jeudi','friday','vendredi','saturday','samedi','sunday','dimanche']);
  if(k==='time')s=semanticReplaceNormalized(s,['evening','soir','soiree','soirée','tonight','ce soir','morning','matin','afternoon','apres midi','après-midi']).replace(/\b\d{1,2}(?:h|:)?\d{0,2}\s*(pm|am)?\b/gi,' ');
  if(k==='lang')s=semanticReplaceNormalized(s,['english mass','mass in english','messe en anglais','messe anglais','messe anglaise','english','anglais']);
  if(k==='rule')s=semanticReplaceNormalized(s,['first friday','1st friday','premier vendredi','1er vendredi','messe 1er vendredi']);
  return cleanVisibleQuery(s)
}
export function resetFilters(options={}){setState({filters:{...DEFAULT_FILTERS}},options)}
export function isDayFilterActive(value){
  const day=effectiveDay(), mode=effectiveDayMode();
  if(!value)return !day;
  if(value==='__today')return mode==='today';
  if(value==='__tomorrow')return mode==='tomorrow';
  if(value==='Dimanche')return day==='Dimanche'&&(mode==='sunday_obligation'||mode==='calendar');
  return day===value&&mode!=='today'&&mode!=='tomorrow';
}
export function isTimeFilterActive(value){return (value||'')===(effectiveTime()||'')}
export function applyFilter(key,value,options={url:true}){
  const nextFilters={...state.filters};
  const patch={mode:'search'};
  if(key==='day'){
    if(value&&isDayFilterActive(value))value='';
    if(value==='__today'){nextFilters.day='';nextFilters.dayMode='today'}
    else if(value==='__tomorrow'){nextFilters.day='';nextFilters.dayMode='tomorrow'}
    else {nextFilters.day=value||'';nextFilters.dayMode=value==='Dimanche'?'sunday_obligation':(value?'calendar':'')}
    if(value)nextFilters.siteUid='';
    if(!value)patch.query=removeQueryIntent(state.query,'day');
  } else if(key==='time'){
    if(value&&isTimeFilterActive(value))value='';
    nextFilters.time=value||'';
    nextFilters.siteUid='';
    if(!value)patch.query=removeQueryIntent(state.query,'time');
  } else if(key==='region'){
    if(value&&nextFilters.region===value)value='';
    nextFilters.region=value||'';
    nextFilters.siteUid='';
  } else if(key in nextFilters){
    nextFilters[key]=value||'';
    if(key!=='siteUid'&&key!=='type')nextFilters.siteUid='';
  }
  setState({...patch,filters:nextFilters},options);
}
export function toggleQuickDay(value){
  if(isDayFilterActive(value))clearIntent('day',{url:true});
  else applyFilter('day',value,{url:true});
}
export function toggleQuickTime(value){
  if(isTimeFilterActive(value))clearIntent('time',{url:true});
  else applyFilter('time',value,{url:true});
}
export function toggleNearMode(){
  if(state.near){clearIntent('near',{url:true});return}
  setState({mode:'near',near:true,nearExpanded:false,nearScope:''},{url:true});
  if(!state.location)requestLocation();
}
export function clearIntent(k,options={url:true}){
  const nextFilters={...state.filters};
  const patch={};
  if(k==='near'){patch.near=false;patch.nearExpanded=false;patch.nearScope='';patch.query=removeQueryIntent(state.query,'near');if(state.mode==='near')patch.mode='home'}
  if(k==='site'){nextFilters.siteUid=''}
  if(k==='region'){nextFilters.region=''}
  if(k==='type'){nextFilters.type='mass'}
  if(k==='day'){nextFilters.day='';nextFilters.dayMode='';patch.query=removeQueryIntent(state.query,'day')}
  if(k==='time'){nextFilters.time='';patch.query=removeQueryIntent(state.query,'time')}
  if(k==='lang'){patch.query=removeQueryIntent(state.query,'lang')}
  if(k==='rule'){patch.query=removeQueryIntent(state.query,'rule')}
  if(k==='place')patch.query='';
  patch.filters=nextFilters;
  setState(patch,options);
}
export function clearFilter(key,options={url:true}){return clearIntent(key,options)}
export function clearAllFilters(options={}){return setState({query:'',filters:{...DEFAULT_FILTERS},near:false,nearExpanded:false,nearScope:'',mode:'home'},options)}
export function effectiveTime(){const p=state.parsed||{}; if(p.exact!=null)return ''; if(p.time)return p.time; return state.filters.time||''}
export function effectiveType(){return state.filters.type||'mass'}
export function removeNearIntentFromQuery(q){
  let s=String(q||'');
  const nearPhrases=[
    'near me now','near me','nearby mass','mass nearby','nearby','closest mass','mass closest to me','close to me','mass close to me','around me','mass around me',
    'près de moi maintenant','pres de moi maintenant','près de moi','pres de moi','proche de moi maintenant','proche de moi','messe proche maintenant',
    'à proximité maintenant','a proximite maintenant','à proximité','a proximite','aux alentours','autour de moi','messe autour de moi'
  ];
  s=semanticReplaceNormalized(s,nearPhrases);
  s=s.replace(/\b(nearby|closest)\b/gi,' ');
  // Preserve explicit place searches such as “Mass near Curepipe” / “messe près de Curepipe”.
  s=s.replace(/\b(near|près|pres|proche|proximite|proximité|around|autour)\s+(me|moi)\b/gi,' ');
  s=s.replace(/\s+/g,' ').trim();
  return cleanVisibleQuery(s);
}
export function preservedVisibleQueryWithoutNear(q){
  const parsed=parseUserIntent(q);
  const parts=[];
  if(parsed.lang==='EN')parts.push(state.lang==='fr'?'messe en anglais':'English Mass');
  if(parsed.firstFriday)parts.push(state.lang==='fr'?'premier vendredi':'first friday');
  if(parsed.time==='morning')parts.push(state.lang==='fr'?'matin':'morning');
  else if(parsed.time==='afternoon')parts.push(state.lang==='fr'?'après-midi':'afternoon');
  if(parsed.exactLabel)parts.push(parsed.exactLabel);
  if(parsed.day==='today')parts.push(state.lang==='fr'?'aujourd’hui':'today');
  else if(parsed.day==='tomorrow')parts.push(state.lang==='fr'?'demain':'tomorrow');
  else if(DAYS.includes(parsed.day))parts.push(state.lang==='fr'?DAY_FR[parsed.day]:DAY_EN[parsed.day]);
  const place=removeNearIntentFromQuery(parsed.place||'');
  if(place)parts.push(place);
  return parts.join(' ').replace(/\s+/g,' ').trim();
}
export function currentContextLabel(){
  if(state.mode==='near')return tr('showingNear');
  if(state.mode==='saved')return tr('showingSaved');
  const p=state.parsed||{}; const day=effectiveDay(); const mode=effectiveDayMode();
  if(day===todayName(0)&&(mode==='calendar'||mode==='today'))return tr('showingToday');
  if(day===todayName(1)&&(mode==='calendar'||mode==='tomorrow'))return tr('showingTomorrow');
  if(day==='Dimanche'&&mode==='sunday_obligation')return tr('showingSunday');
  if(state.query||state.filters.region||state.filters.time||state.filters.siteUid)return tr('showingSearch');
  return '';
}
export function annotateRowForRanking(r,now=mauritiusNow(),st=state){
  const occurrence=getNextOccurrence(r,now);
  r._nextOccurrence=occurrence;
  r._delta=occurrence?Math.round((occurrence-now)/60000):999999;
  r._inProgress=r._delta<0&&!isPastMass(r,now);
  r._past=isPastMass(r,now);
  r._sundayContext=countsForSundayContext(r,now);
  r._actionable=rowMass(r)&&!r._past&&r._delta<999999;
  const loc=st&&st.location;
  r._dist=loc?distKm(loc.lat,loc.lon,rowLat(r),rowLon(r)):null;
  return r;
}
export function rankGroup(r){return r._inProgress?1:0}
export function nearActionGroup(r,now=mauritiusNow()){
  const delta=Number.isFinite(r._delta)?r._delta:999999;
  if(r._inProgress||delta<=30)return 0;
  if(delta<=120)return 1;
  const occ=r._nextOccurrence;
  if(occ instanceof Date&&!Number.isNaN(+occ)){
    const diff=dateSerial(occ)-dateSerial(now);
    if(diff===0)return 2;
    if(diff===1)return 3;
  }
  return 4;
}
export function effectiveNearDistance(r){
  const d=(r._dist??9999);
  let penalty=0;
  const score=confidenceScore(r);
  if(score!=null&&score<70)penalty+=1.5;
  if(!isExactCoordinate(r))penalty+=0.5;
  return d+Math.min(2.0,penalty);
}
export function nearTieDistance(a,b){
  const real=(a._dist??9999)-(b._dist??9999);
  if(Math.abs(real)>0.25)return real;
  return effectiveNearDistance(a)-effectiveNearDistance(b);
}
export function rankResults(arr,{near=false,now=mauritiusNow()}={}){
  return arr.sort((a,b)=> near
    ? ((nearActionGroup(a,now)-nearActionGroup(b,now))||nearTieDistance(a,b)||(Math.max(0,a._delta)-Math.max(0,b._delta))||siteName(a).localeCompare(siteName(b)))
    : ((rankGroup(a)-rankGroup(b))||(Math.max(0,a._delta)-Math.max(0,b._delta))||siteName(a).localeCompare(siteName(b)))
  );
}
export function nearScopeNotice(scope=state.nearScope){
  if(scope==='20')return state.lang==='fr'?'Aucune messe trouvée à moins de 12 km. Affichage des résultats à moins de 20 km.':'No nearby Mass found within 12 km. Showing results within 20 km.';
  if(scope==='all')return state.lang==='fr'?'Aucune messe trouvée à moins de 20 km. Affichage des prochaines messes disponibles.':'No nearby Mass found within 20 km. Showing the next available Masses.';
  return '';
}
export function nearRecommendationLabel(r,scope=state.nearScope,now=mauritiusNow()){
  if(!r)return '';
  if(scope==='20')return state.lang==='fr'?'Aucune messe à moins de 12 km — recherche élargie':'No Mass within 12 km — expanded search';
  if(scope==='all')return state.lang==='fr'?'Aucune messe à moins de 20 km — affichage des prochaines messes disponibles':'No Mass within 20 km — showing next available Masses';
  const g=nearActionGroup(r,now);
  if(g===0)return state.lang==='fr'?'Messe la plus proche qui commence bientôt':'Nearest Mass starting soon';
  if(g===1||g===2)return state.lang==='fr'?'Messe la plus proche aujourd’hui':'Closest Mass today';
  if(g===3)return state.lang==='fr'?'Messe la plus proche demain':'Closest Mass tomorrow';
  return state.lang==='fr'?'Aucune messe proche bientôt — affichage de l’option la plus proche plus tard':'No nearby Mass soon — showing nearest later option';
}
export function _effectiveDayModeFor(st,p){
  p=p||{};
  if(p.day==='today')return 'today';
  if(p.day==='tomorrow')return 'tomorrow';
  if(p.day==='Dimanche')return 'sunday_obligation';
  if(DAYS.includes(p.day))return 'calendar';
  if(st.filters.dayMode==='today')return 'today';
  if(st.filters.dayMode==='tomorrow')return 'tomorrow';
  if(st.filters.day==='Dimanche'&&st.filters.dayMode==='sunday_obligation')return 'sunday_obligation';
  if(st.filters.dayMode)return st.filters.dayMode;
  return ''
}
export function _effectiveDayFor(st,p,now=mauritiusNow()){
  p=p||{};
  if(p.day==='today')return todayName(0,now);
  if(p.day==='tomorrow')return todayName(1,now);
  if(DAYS.includes(p.day))return p.day;
  if(st.filters.dayMode==='today')return todayName(0,now);
  if(st.filters.dayMode==='tomorrow')return todayName(1,now);
  if(st.filters.day)return st.filters.day;
  return ''
}
export function _effectiveTimeFor(st,p){
  p=p||{};
  if(p.exact!=null)return '';
  if(p.time)return p.time;
  return st.filters.time||''
}
export function _effectiveTypeFor(st){return st.filters.type||'mass'}
export function getNextMass(rows,now=mauritiusNow(),st=state){const arr=(rows||[]).filter(rowActive).filter(r=>st.filters?.type==='all'||rowMass(r)).map(r=>annotateRowForRanking(r,now,st)).filter(r=>r._actionable); return rankResults(arr,{near:!!st.near,now})[0]||null}
export function applyFilters(rows,st=state,now=mauritiusNow()){
  if(st&&st.near&&!st.location)return [];
  const p=st.parsed||parseUserIntent(st.query||'');
  const day=_effectiveDayFor(st,p,now);
  const dayMode=_effectiveDayModeFor(st,p);
  const sundayMode=day==='Dimanche'&&dayMode==='sunday_obligation';
  const time=_effectiveTimeFor(st,p);
  const dateCtx=dateContextFor(p,now,st);
  const todayOnly=(_effectiveDayModeFor(st,p)==='today');
  const nowM=now.getHours()*60+now.getMinutes();
  let arr=(rows||[]).filter(rowActive);
  if(_effectiveTypeFor(st)==='mass')arr=arr.filter(rowMass);
  if(day)arr=arr.filter(r=>sundayMode?isSundayEligible(r):r.day_of_week===day);
  if(dateCtx)arr=arr.filter(r=>isValidForDateContext(r,dateCtx));
  if(todayOnly)arr=arr.filter(r=>r.day_of_week!==todayName(0,now)||parseMassTime(r)+massGraceMinutes(r)>=nowM);
  const pForTime={...p};
  if(time)arr=arr.filter(r=>matchesTime(r,time,pForTime));
  if(st.filters.region)arr=arr.filter(r=>r.region===st.filters.region);
  if(st.filters.siteUid)arr=arr.filter(r=>r.site_uid===st.filters.siteUid);
  const textMatched=arr.filter(r=>matchesText(r,p));
  if(p.exact!=null){
    const exactClose=textMatched.filter(r=>matchesExact(r,p.exact,15));
    const nearbyWithin45=textMatched.filter(r=>matchesExact(r,p.exact,45));
    if(st)st.exactTimeStatus={requested:p.exact,directCount:exactClose.length,nearbyWithin45Count:nearbyWithin45.length,noDirectMatch:exactClose.length===0};
    // Exact-time queries must never silently widen the requested time window.
    arr=exactClose;
  } else {
    if(st)st.exactTimeStatus=null;
    arr=textMatched;
  }
  if(st.mode==='saved')arr=arr.filter(r=>st.saved.has(r.site_uid));
  arr.forEach(r=>annotateRowForRanking(r,now,st));
  if(st.near&&st.location){
    const withDistance=arr.filter(r=>r._dist!=null);
    const within12=withDistance.filter(r=>r._dist<=NEAR_RADIUS_KM);
    const within20=withDistance.filter(r=>r._dist<=20);
    if(within12.length){arr=within12; st.nearScope='12'}
    else if(within20.length){arr=within20; st.nearScope='20'}
    else {st.nearScope='all'}
  } else if(st){st.nearScope=''}
  return rankResults(arr,{near:st.near,now});
}
export function getVisibleResults(st=state,now=mauritiusNow()){
  const parsed=parseUserIntent(st.query||'');
  const shadow={...st,parsed};
  const results=applyFilters(shadow.rows,shadow,now);
  return {parsed,results,nearScope:shadow.nearScope||'',exactTimeStatus:shadow.exactTimeStatus||null};
}
export function applySearchAndFilters(){
  const now=mauritiusNow();
  const visible=getVisibleResults(state,now);
  state.parsed=visible.parsed;
  state.results=visible.results;
  state.nearScope=visible.nearScope||'';
  state.exactTimeStatus=visible.exactTimeStatus||null;
  state.next=getNextMass(visible.results,now,state);
}
export function compute(){return applySearchAndFilters()}
export function buildStateParams(extra={},st=state){
  const p=new URLSearchParams();
  const parsedUrl=parseUserIntent(st.query||'');
  const resolvedDayMode=_effectiveDayModeFor(st,parsedUrl);
  const resolvedDay=_effectiveDayFor(st,parsedUrl);
  const resolvedTime=_effectiveTimeFor(st,parsedUrl);
  const resolvedExact=parsedUrl&&parsedUrl.exactLabel;
  if(st.query)p.set('q',st.query);
  if(resolvedDayMode==='today')p.set('day','today');
  else if(resolvedDayMode==='tomorrow')p.set('day','tomorrow');
  else if(resolvedDay==='Dimanche'&&resolvedDayMode==='sunday_obligation')p.set('day','sunday');
  else if(resolvedDay)p.set('day',resolvedDay);
  if(resolvedDayMode&&resolvedDayMode!=='today'&&resolvedDayMode!=='tomorrow'&&!(resolvedDay==='Dimanche'&&resolvedDayMode==='sunday_obligation'))p.set('dayMode',resolvedDayMode);
  if(resolvedExact)p.set('time',resolvedExact);
  else if(resolvedTime)p.set('time',resolvedTime);
  if(st.filters.region)p.set('region',st.filters.region);
  if(_effectiveTypeFor(st)==='all')p.set('type','all');
  if(st.near)p.set('near','1');
  if(st.mode&&st.mode!=='home'&&st.mode!=='saved')p.set('mode',st.mode);
  if(st.lang)p.set('lang',st.lang);
  if(st.filters.siteUid)p.set('site',st.filters.siteUid);
  const selectedSite=st.filters.siteUid&&st.rows?st.rows.find(r=>r.site_uid===st.filters.siteUid):null;
  if(selectedSite&&selectedSite.parish_uid)p.set('parish',selectedSite.parish_uid);
  Object.entries(extra).forEach(([k,v])=>{if(v!==undefined&&v!==null&&v!=='')p.set(k,String(v))});
  return p;
}
export function encodeStateToUrl(st=state,extra={}){const base=location.origin+location.pathname; const p=buildStateParams(extra,st); return base+(p.toString()?'#'+p.toString():'')}
export function stateUrl(extra={}){return encodeStateToUrl(state,extra)}
export function restoreStateFromUrl(hash){
  if(!hash||hash.length<2)return null;
  try{
    const p=new URLSearchParams(hash.slice(1));
    const nextFilters={...DEFAULT_FILTERS};
    let q=p.get('q')||'';
    const rawDay=p.get('day')||'';
    const normalizedDay=normalizeUrlDayValue(rawDay);
    if(normalizedDay==='__today'){nextFilters.day='';nextFilters.dayMode='today'}
    else if(normalizedDay==='__tomorrow'){nextFilters.day='';nextFilters.dayMode='tomorrow'}
    else if(normalizedDay==='Dimanche'){nextFilters.day='Dimanche';nextFilters.dayMode='sunday_obligation'}
    else if(DAYS.includes(normalizedDay)){nextFilters.day=normalizedDay;nextFilters.dayMode='calendar'}
    const dm=p.get('dayMode')||''; if(['today','tomorrow','calendar','sunday_obligation',''].includes(dm)&&!nextFilters.dayMode)nextFilters.dayMode=dm;
    const tmInfo=normalizeUrlTimeValue(p.get('time')||'');
    if(tmInfo.kind==='bucket')nextFilters.time=tmInfo.value;
    else if(tmInfo.kind==='exact')q=appendExactTimeToQuery(q,tmInfo.value);
    nextFilters.region=p.get('region')||''; nextFilters.type=p.get('type')==='all'?'all':'mass'; nextFilters.siteUid=p.get('site')||'';
    const qParsed=parseUserIntent(q);
    let mode=p.get('mode')||((q||nextFilters.day||nextFilters.dayMode||nextFilters.time||nextFilters.region||nextFilters.siteUid)?'search':'home');
    const near=p.get('near')==='1'||mode==='near'||!!qParsed.near;
    if(!['home','search','near','saved','more'].includes(mode))mode='search';
    if(mode==='saved')mode='home';
    if(near)mode='near';
    const lang=p.get('lang');
    const patch={query:q,filters:nextFilters,near,mode};
    if(lang==='en'||lang==='fr')patch.lang=lang;
    return patch;
  }catch(e){toast(tr('invalidLink')); return null}
}
export function showSite(r){const nextFilters={...state.filters,siteUid:r.site_uid}; setState({mode:'search',query:'',filters:nextFilters,near:false},{url:false}); const input=$('#searchInput');if(input)input.value='';history.replaceState(null,'',stateUrl({site:r.site_uid}));document.getElementById('resultsHead')?.scrollIntoView({behavior:'smooth',block:'start'})}
export function toggleSave(r){const saved=new Set(state.saved); if(saved.has(r.site_uid))saved.delete(r.site_uid);else saved.add(r.site_uid); storageSet('mmf_my_churches',JSON.stringify([...saved])); setState({saved})}
