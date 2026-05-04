
'use strict';
const APP_VERSION='26.0.8';
const NEAR_RADIUS_KM=12;
const DAYS=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const DAY_EN={Dimanche:'Sunday',Lundi:'Monday',Mardi:'Tuesday',Mercredi:'Wednesday',Jeudi:'Thursday',Vendredi:'Friday',Samedi:'Saturday'};
const DAY_FR={Dimanche:'Dimanche',Lundi:'Lundi',Mardi:'Mardi',Mercredi:'Mercredi',Jeudi:'Jeudi',Vendredi:'Vendredi',Samedi:'Samedi'};
const T={
 en:{title:'Mauritius\nMass Finder',subtitle:'Find a Mass quickly anywhere in Mauritius',search:'Search',searchPh:'evening Mass Curepipe, 18h, Saint Jean…',searchHint:'Try: evening Mass Curepipe',clear:'Clear',quickNext:'Next Mass',quickToday:'Today',quickTomorrow:'Tomorrow',quickNear:'Near me',quickEvening:'Evening',quickSunday:'Sunday',quickSaved:'My Churches',filters:'Filters',showResults:'Show results',day:'Day',time:'Time of day',region:'Region',type:'Type',anyDay:'Any day',today:'Today',tomorrow:'Tomorrow',sunday:'Sunday',allDay:'All day',morning:'Morning',afternoon:'Afternoon',evening:'Evening',allRegions:'All regions',massesOnly:'Masses only',includeOther:'Include other celebrations',nextMass:'Next Mass',nextUseful:'Next useful Mass',nearTitle:'Near Me',nearSub:'Within 12 km by default. Next Mass first, then distance',sortedHintNear:'Within 12 km: next Mass first, then distance',nearExpanded:'Showing farther results',expandNear:'Show farther',savedTitle:'My Churches',savedSub:'Your saved churches with their next Mass',noSaved:'No saved churches yet',noSavedText:'Tap Save on a Mass card to add a church here.',results:'results',result:'result',shown:'shown',directions:'Directions',share:'Share',save:'Save',saved:'Saved',source:'Source',sourceParishPage:'Source: parent parish page — {parish}',allTimes:'All times',verified:'Verified',todayRel:'Today',tomorrowRel:'Tomorrow',inM:'in {n} min',inH:'in {h}h {m}m',now:'now',weekdayMass:'Weekday Mass',sundayMass:'Sunday Mass',satEve:'Saturday evening Mass',otherCelebration:'Other celebration',approx:'~{d} km',exact:'{d} km',noResults:'No matching Mass found',noResultsText:'Try removing a filter, widening the place, or using a simpler search.',locationAsk:'Allow location access to sort nearby Masses.',locationDenied:'Location was not available. Results remain sorted by next Mass.',nearUse:'Use my location',moreTitle:'Help & app information',helpTitle:'How to use this app',helpHtml:'<p><b>Search naturally:</b> try “evening Mass Curepipe”, “messe du soir Quatre Bornes”, “18h”, or a church name.</p><p><b>Near Me:</b> location is used only on your device to sort nearby results.</p><p><b>Masses only:</b> the default view excludes other celebrations unless you include them in filters.</p>',trustTitle:'Trust note',trustText:'Mass times can change for feast days, funerals, cyclones, holidays or parish changes. Use the source link when timing is critical.',version:'Version',navHome:'Home',navSearch:'Search',navNear:'Near me',navSaved:'My Churches',navMore:'More',updateTitle:'New version available',updateText:'Update to get the latest version.',refresh:'Update now',later:'Later',copied:'Link copied',shared:'Ready to share',shareAppTitle:'Mauritius Mass Finder',shareMassIntro:'Mass time',howUpdate:'How to update',troubleUpdating:'Having trouble updating?',about:'About',aboutTitle:'About this app',aboutHtml:'<p><b>Purpose:</b> Mauritius Mass Finder helps people quickly find Catholic Mass times across Mauritius.</p><p><b>Data and trust:</b> the schedule is based on the maintained project database compiled from official diocesan parish information and project corrections. Parish schedules can still change at short notice.</p><p><b>Default view:</b> the app shows Masses only by default. Other celebrations, such as adoration or prayer services, are shown only when you choose to include them.</p><p><b>Corrections:</b> if a time looks wrong, use the source link or report it so the database can be corrected.</p>',updateGuideTitle:'How to update the app',updateGuideHtml:'<p>When a new version is available, a message will appear:</p><p><b>→ New version available</b></p><p>Tap <b>Update now</b> to load the latest version.</p><p><b>If nothing happens:</b></p><ol><li>Close the app completely</li><li>Reopen it</li></ol><p><b>If the problem continues:</b></p><ul><li>remove the app from your home screen</li><li>add it again from your browser</li></ul>',swipeHint:'Swipe to see more',showingToday:'Showing: Today',showingTomorrow:'Showing: Tomorrow',showingSunday:'Showing: Sunday Masses (including Saturday evening)',showingNear:'Showing: Near you',showingSaved:'Showing: My Churches',showingSearch:'Showing: Search results',showingSundayEvening:'Showing: Sunday evening',usingLocation:'Using your location',locationNotEnabled:'Location not enabled',sortedHint:'Sorted by time, then distance',updateFallback:'If nothing happens, close and reopen the app.',reportCorrection:'Report correction',reportGeneral:'Report a correction',reportFor:'Report this time',reportSubject:'Correction for Mauritius Mass Finder',reportBody:'Please check this Mass information:',resultCap:'Showing 60 of {n} — refine your search.',sundayExplain:'Includes Saturday evening Masses from 15:30 onward.',error:'Something went wrong'},
 fr:{title:'Trouver une\nMesse à Maurice',subtitle:'Trouvez rapidement une messe à Maurice',search:'Recherche',searchPh:'messe du soir Curepipe, 18h, Saint Jean…',searchHint:'Essayez : messe du soir Curepipe',clear:'Effacer',quickNext:'Prochaine messe',quickToday:'Aujourd’hui',quickTomorrow:'Demain',quickNear:'Près de moi',quickEvening:'Soir',quickSunday:'Dimanche',quickSaved:'Mes églises',filters:'Filtres',showResults:'Afficher les résultats',day:'Jour',time:'Moment',region:'Région',type:'Type',anyDay:'Tous les jours',today:'Aujourd’hui',tomorrow:'Demain',sunday:'Dimanche',allDay:'Toute la journée',morning:'Matin',afternoon:'Après-midi',evening:'Soir',allRegions:'Toutes les régions',massesOnly:'Messes uniquement',includeOther:'Inclure autres célébrations',nextMass:'Prochaine messe',nextUseful:'Prochaine messe utile',nearTitle:'Près de moi',nearSub:'Dans un rayon de 12 km par défaut. Prochaine messe d’abord, puis distance',sortedHintNear:'Dans un rayon de 12 km : prochaine messe d’abord, puis distance',nearExpanded:'Résultats plus éloignés affichés',expandNear:'Afficher plus loin',savedTitle:'Mes églises',savedSub:'Vos églises enregistrées avec leur prochaine messe',noSaved:'Aucune église enregistrée',noSavedText:'Appuyez sur Enregistrer sur une messe pour ajouter une église ici.',results:'résultats',result:'résultat',shown:'affichés',directions:'Itinéraire',share:'Partager',save:'Enregistrer',saved:'Enregistrée',source:'Source',sourceParishPage:'Source : page de la paroisse mère — {parish}',allTimes:'Tous les horaires',verified:'Vérifié',todayRel:'Aujourd’hui',tomorrowRel:'Demain',inM:'dans {n} min',inH:'dans {h}h {m}m',now:'maintenant',weekdayMass:'Messe de semaine',sundayMass:'Messe du dimanche',satEve:'Messe du samedi soir',otherCelebration:'Autre célébration',approx:'~{d} km',exact:'{d} km',noResults:'Aucune messe trouvée',noResultsText:'Essayez de retirer un filtre, d’élargir le lieu ou d’utiliser une recherche plus simple.',locationAsk:'Autorisez la localisation pour trier les messes proches.',locationDenied:'La localisation n’est pas disponible. Les résultats restent triés par prochaine messe.',nearUse:'Utiliser ma localisation',moreTitle:'Aide et informations',helpTitle:'Comment utiliser cette application',helpHtml:'<p><b>Recherchez naturellement :</b> essayez « messe du soir Curepipe », « 18h », ou le nom d’une église.</p><p><b>Près de moi :</b> la localisation est utilisée seulement sur votre appareil pour trier les résultats proches.</p><p><b>Messes uniquement :</b> l’affichage par défaut exclut les autres célébrations sauf si vous les incluez dans les filtres.</p>',trustTitle:'Note de confiance',trustText:'Les horaires peuvent changer en cas de fêtes, funérailles, cyclones, jours fériés ou changement paroissial. Utilisez le lien source lorsque l’horaire est important.',version:'Version',navHome:'Accueil',navSearch:'Recherche',navNear:'Près de moi',navSaved:'Mes églises',navMore:'Plus',updateTitle:'Nouvelle version disponible',updateText:'Actualisez pour obtenir la dernière version.',refresh:'Actualiser',later:'Plus tard',copied:'Lien copié',shared:'Prêt à partager',shareAppTitle:'Trouver une Messe à Maurice',shareMassIntro:'Horaire de messe',howUpdate:'Comment mettre à jour',troubleUpdating:'Problème de mise à jour ?',about:'À propos',aboutTitle:'À propos de cette application',aboutHtml:'<p><b>Objectif :</b> Trouver une Messe à Maurice aide à trouver rapidement les horaires des messes catholiques à Maurice.</p><p><b>Données et confiance :</b> les horaires viennent de la base de données du projet, établie à partir des informations paroissiales officielles du diocèse et des corrections vérifiées du projet. Les horaires peuvent toutefois changer à court terme.</p><p><b>Affichage par défaut :</b> l’application affiche uniquement les messes par défaut. Les autres célébrations, comme l’adoration ou les temps de prière, apparaissent seulement si vous choisissez de les inclure.</p><p><b>Corrections :</b> si un horaire semble incorrect, utilisez le lien source ou signalez-le afin que la base puisse être corrigée.</p>',updateGuideTitle:'Comment mettre à jour l’application',updateGuideHtml:'<p>Lorsqu’une nouvelle version est disponible, un message s’affiche :</p><p><b>→ Nouvelle version disponible</b></p><p>Appuyez sur <b>Actualiser</b> pour charger la dernière version.</p><p><b>Si cela ne fonctionne pas :</b></p><ol><li>Fermez complètement l’application</li><li>Rouvrez-la</li></ol><p><b>Si le problème persiste :</b></p><ul><li>supprimez l’application de votre écran d’accueil</li><li>ajoutez-la à nouveau depuis le navigateur</li></ul>',swipeHint:'Faites glisser pour voir plus',showingToday:'Affichage : Aujourd’hui',showingTomorrow:'Affichage : Demain',showingSunday:'Affichage : Messes du dimanche (y compris samedi soir)',showingNear:'Affichage : Près de vous',showingSaved:'Affichage : Mes églises',showingSearch:'Affichage : Résultats de recherche',showingSundayEvening:'Affichage : Dimanche soir',usingLocation:'Utilisation de votre position',locationNotEnabled:'Localisation non activée',sortedHint:'Trié par heure, puis distance',updateFallback:'Si rien ne se passe, fermez puis rouvrez l’application.',reportCorrection:'Signaler une correction',reportGeneral:'Signaler une correction',reportFor:'Signaler cet horaire',reportSubject:'Correction pour Trouver une Messe à Maurice',reportBody:'Merci de vérifier cette information de messe :',resultCap:'60 résultats affichés sur {n} — affinez votre recherche.',sundayExplain:'Inclut les messes du samedi soir à partir de 15h30.',error:'Une erreur est survenue'}
};
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const DEFAULT_FILTERS={day:'',dayMode:'',time:'',region:'',type:'mass',siteUid:''};
const state={query:'',parsed:{},filters:{...DEFAULT_FILTERS},location:null,near:false,nearExpanded:false,mode:'home',moreSection:'help',modal:null,saved:new Set(),lang:'en',rows:[],results:[],next:null,loadError:''};
function tr(k,v={}){return String((T[state.lang]&&T[state.lang][k])||T.en[k]||k).replace(/\{(\w+)\}/g,(_,x)=>v[x]??'')}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[œŒ]/g,'oe').toLowerCase().replace(/[’'`´-]/g,' ').replace(/\b(st)\b/g,'saint').replace(/\b(ste)\b/g,'sainte').replace(/\b(nd)\b/g,'notre dame').replace(/[^a-z0-9]+/g,' ').trim()}
function normaliseCommonTypos(s){return String(s||'').replace(/\bcurpipe\b/g,'curepipe').replace(/\bcurepype\b/g,'curepipe').replace(/\bquatrebornes\b/g,'quatre bornes').replace(/\bportlouis\b/g,'port louis').replace(/\bbeaubassin\b/g,'beau bassin').replace(/\brosehill\b/g,'rose hill').replace(/\bmahebourg\b/g,'mahebourg').replace(/\bmaheburg\b/g,'mahebourg').replace(/\bgrandbaie\b/g,'grand baie').replace(/\bgrandgaube\b/g,'grand gaube').replace(/\bflac\b/g,'flacq')}
function parseExactTimeRaw(q){const raw=String(q||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); const m=raw.match(/\b(\d{1,2})\s*(?::|h)\s*(\d{2})\s*(am|pm)?\b|\b(\d{1,2})\s*h\b|\b(\d{1,2})\s*(am|pm)\b/); if(!m)return null; let h=+(m[1]||m[4]||m[5]), min=m[2]?+m[2]:0, ap=m[3]||m[6]||''; if(ap==='pm'&&h<12)h+=12; if(ap==='am'&&h===12)h=0; return h<24&&min<60?{minutes:h*60+min,label:`${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}`}:null}
function bool(v){return v===true||String(v).toLowerCase()==='true'}
function mins(t){const m=String(t||'').match(/(\d{1,2}):(\d{2})/);return m?+m[1]*60+ +m[2]:9999}
function rowActive(r){return bool(r.is_active)!==false}
function rowMass(r){return bool(r.is_mass_only_visible)||String(r.mass_category||r.service_type).toLowerCase()==='mass'}
function rowLat(r){const x=parseFloat(r.latitude);return Number.isFinite(x)?x:null}
function rowLon(r){const x=parseFloat(r.longitude);return Number.isFinite(x)?x:null}
function siteName(r){return r.site_name||r.display_site_label||r.parish_label||r.parish_name||''}
function dayName(d){return (state.lang==='fr'?DAY_FR:DAY_EN)[d]||d}
function mauritiusNow(base=new Date()){return new Date(base.toLocaleString('en-US',{timeZone:'Indian/Mauritius'}))}
function todayName(offset=0,base=mauritiusNow()){const d=new Date(base);d.setDate(d.getDate()+offset);return DAYS[d.getDay()]}
function isSundayEligible(r){return r.day_of_week==='Dimanche'||(r.day_of_week==='Samedi'&&mins(r.time_24h)>=930)}
function nextDelta(r,now=mauritiusNow()){const targetDay=DAYS.indexOf(r.day_of_week); if(targetDay<0)return 999999; const nowDay=now.getDay(); let add=(targetDay-nowDay+7)%7; const rowM=mins(r.time_24h); const nowM=now.getHours()*60+now.getMinutes(); if(add===0&&rowM<nowM)add=7; return add*1440+rowM-nowM}
function rel(delta,now=mauritiusNow()){if(delta<=1)return tr('now'); const target=new Date(now); target.setMinutes(target.getMinutes()+delta); const key=d=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Indian/Mauritius',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(d).filter(x=>x.type!=='literal').map(x=>[x.type,x.value])); return `${p.year}-${p.month}-${p.day}`}; const serial=k=>{const a=k.split('-').map(Number); return Math.floor(Date.UTC(a[0],a[1]-1,a[2])/86400000)}; const dayDiff=serial(key(target))-serial(key(now)); if(dayDiff===0){if(delta<60)return tr('inM',{n:delta}); const h=Math.floor(delta/60),m=delta%60; return tr('inH',{h,m});} if(dayDiff===1)return tr('tomorrowRel'); if(delta<60)return tr('inM',{n:delta}); if(delta<1440){const h=Math.floor(delta/60),m=delta%60; return tr('inH',{h,m});} return dayName(DAYS[target.getDay()])}
function distKm(a,b,c,d){if([a,b,c,d].some(x=>!Number.isFinite(+x)))return null; const R=6371,rad=x=>x*Math.PI/180; const dLat=rad(c-a),dLon=rad(d-b); const A=Math.sin(dLat/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(A))}
function distanceLabel(r,d=null){const val=d??(state.location?distKm(state.location.lat,state.location.lon,rowLat(r),rowLon(r)):null); if(val==null)return ''; const key=(String(r.coordinate_precision||'').includes('exact')?'exact':'approx'); return tr(key,{d:val.toFixed(val<10?1:0)})}
function stripStopwords(text){const stop=/\b(du|de|des|le|la|les|l|a|au|aux|d)\b/g;return text.replace(stop,' ').replace(/\s+/g,' ').trim()}
function parseQuery(q){
  const exactRaw=parseExactTimeRaw(q); const n=normaliseCommonTypos(norm(q)); const p={raw:q,tokens:n.split(' ').filter(Boolean),chips:[]}; if(!n&&!exactRaw)return p;
  const chip=(k,label)=>p.chips.push({k,label});
  if(/\b(today|aujourd hui|maintenant|now)\b/.test(n)){p.day='today'; chip('day',tr('today'))}
  if(/\b(tomorrow|demain)\b/.test(n)){p.day='tomorrow'; chip('day',tr('tomorrow'))}
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
  if(/\b(evening|soir|soiree)\b/.test(n)){p.time='evening'; chip('time',tr('evening')); if(/\b(saturday|samedi)\b/.test(n))p.saturdayEvening=true; if(/\b(sunday|dimanche)\b/.test(n))p.sundayEvening=true}
  else if(/\b(morning|matin)\b/.test(n)){p.time='morning'; chip('time',tr('morning'))}
  else if(/\b(afternoon|apres midi)\b/.test(n)){p.time='afternoon'; chip('time',tr('afternoon'))}
  if(exactRaw){p.exact=exactRaw.minutes;chip('time',exactRaw.label)}
  if(/\b(near me|nearby|closest|pres de moi|proche de moi)\b/.test(n)){p.near=true;chip('near',tr('quickNear'))}
  let clean=n
    .replace(/\b(today|aujourd hui|maintenant|now|tomorrow|demain|monday|lundi|tuesday|mardi|wednesday|mercredi|thursday|jeudi|friday|vendredi|saturday|samedi|sunday|dimanche|evening|soir|soiree|morning|matin|afternoon|apres midi|mass|messe|church|eglise|near me|nearby|closest|pres de moi|proche de moi)\b/g,' ')
    .replace(/\b\d{1,2}(?:h|:)?\d{0,2}\s*(pm|am)?\b/g,' ')
    .replace(/\s+/g,' ').trim();
  clean=stripStopwords(clean);
  p.place=clean; if(clean) chip('place',clean); return p
}
function matchesText(r,p){if(!p.place)return true; const hay=norm([r.search_text,r.region,r.town,r.parish_name,r.parish_label,r.site_name,r.maps_query].join(' ')); return p.place.split(' ').every(t=>hay.includes(t))}
function matchesTime(r,b,p={}){const m=mins(r.time_24h); if(!b)return true; if(b==='morning')return m<720; if(b==='afternoon')return m>=720&&m<1020; if(b==='evening'){if((p.saturdayEvening||state.filters.day==='Samedi'||state.filters.dayMode==='sunday_obligation')&&r.day_of_week==='Samedi')return m>=930; return m>=1020;} return true}
function matchesExact(r,ex){if(ex==null)return true; return Math.abs(mins(r.time_24h)-ex)<=45}
function effectiveDayMode(){const p=state.parsed; if(state.filters.dayMode)return state.filters.dayMode; if(p.day==='today')return 'today'; if(p.day==='tomorrow')return 'tomorrow'; if(p.day==='Dimanche'&&p.sundayEvening)return 'calendar'; if(p.day==='Dimanche')return 'sunday_obligation'; if(DAYS.includes(p.day))return 'calendar'; return ''}
function effectiveDay(){const p=state.parsed; if(state.filters.day)return state.filters.day; if(p.day==='today')return todayName(0); if(p.day==='tomorrow')return todayName(1); if(DAYS.includes(p.day))return p.day; return ''}
function cleanVisibleQuery(q){return String(q||'').replace(/[’'`´]/g,' ').replace(/\b(mass|messe|church|eglise|église)\b/gi,' ').replace(/\b(du|de|des|le|la|les|l|à|a|au|aux|d)\b/gi,' ').replace(/\s+/g,' ').trim()}
function removeQueryIntent(q,k){let s=String(q||''); if(k==='day')s=s.replace(/\b(today|aujourd[’']?hui|aujourd hui|maintenant|now|tomorrow|demain|monday|lundi|tuesday|mardi|wednesday|mercredi|thursday|jeudi|friday|vendredi|saturday|samedi|sunday|dimanche)\b/gi,' '); if(k==='time')s=s.replace(/\b(evening|soir|soirée|soiree|morning|matin|afternoon|après-midi|apres midi)\b/gi,' ').replace(/\b\d{1,2}(?:h|:)?\d{0,2}\s*(pm|am)?\b/gi,' '); return cleanVisibleQuery(s)}
function resetFilters(){state.filters={...DEFAULT_FILTERS}}
function applyFilter(key,value){
  if(key==='day'){
    if(value==='__today'){state.filters.day=todayName(0);state.filters.dayMode='today'}
    else if(value==='__tomorrow'){state.filters.day=todayName(1);state.filters.dayMode='tomorrow'}
    else {state.filters.day=value||'';state.filters.dayMode=value==='Dimanche'?'sunday_obligation':(value?'calendar':'')}
    if(value)state.filters.siteUid='';
  } else if(key in state.filters){state.filters[key]=value||''; if(key!=='siteUid'&&key!=='type')state.filters.siteUid=''}
  state.mode='search';
}
function clearIntent(k){
  if(k==='near'){state.near=false;state.nearExpanded=false;if(state.mode==='near')state.mode='home'}
  if(k==='site'){state.filters.siteUid=''}
  if(k==='region'){state.filters.region=''}
  if(k==='type'){state.filters.type='mass'}
  if(k==='day'){state.filters.day='';state.filters.dayMode='';state.query=removeQueryIntent(state.query,'day')}
  if(k==='time'){state.filters.time='';state.query=removeQueryIntent(state.query,'time')}
  if(k==='place')state.query='';
  const input=$('#searchInput'); if(input)input.value=state.query;
}
function effectiveTime(){return state.filters.time||(state.parsed&&state.parsed.time)||''}
function effectiveType(){return state.filters.type||'mass'}

function currentContextLabel(){
  if(state.mode==='near')return tr('showingNear');
  if(state.mode==='saved')return tr('showingSaved');
  const p=state.parsed||{}; const day=effectiveDay(); const mode=effectiveDayMode();
  if(day==='Dimanche'&&(state.parsed||{}).sundayEvening)return tr('showingSundayEvening');
  if(day===todayName(0)&&(mode==='calendar'||mode==='today'))return tr('showingToday');
  if(day===todayName(1)&&(mode==='calendar'||mode==='tomorrow'))return tr('showingTomorrow');
  if(day==='Dimanche'&&mode==='sunday_obligation')return tr('showingSunday');
  if(state.query||state.filters.region||state.filters.time||state.filters.siteUid)return tr('showingSearch');
  return '';
}
function markSwipeHintSeen(){
  localStorage.setItem('mmf_swipe_hint_seen','1');
  document.body.classList.add('quickHintSeen');
}
function updateSwipeAffordance(){
  const row=$('#quickRow'), scroller=$('#quickScroller'), hint=$('#swipeHint'); if(!row||!scroller||!hint)return;
  const overflow=row.scrollWidth>row.clientWidth+4; const atEnd=row.scrollLeft+row.clientWidth>=row.scrollWidth-6; const seen=localStorage.getItem('mmf_swipe_hint_seen')==='1';
  scroller.classList.toggle('hasOverflow',overflow&&!atEnd&&!seen);
  document.body.classList.toggle('quickHintSeen',seen||!overflow);
  hint.textContent=(!seen&&overflow)?tr('swipeHint'):'';
}

function compute(){
  const now=mauritiusNow();
  const p=state.parsed=parseQuery(state.query); const day=effectiveDay(); const dayMode=effectiveDayMode(); const sundayMode=day==='Dimanche'&&dayMode==='sunday_obligation'; const time=effectiveTime();
  const todayOnly=(p.day==='today'||state.filters.dayMode==='today');
  const nowM=now.getHours()*60+now.getMinutes();
  let arr=state.rows.filter(rowActive);
  if(effectiveType()==='mass')arr=arr.filter(rowMass);
  if(day)arr=arr.filter(r=>sundayMode?isSundayEligible(r):r.day_of_week===day);
  if(todayOnly)arr=arr.filter(r=>r.day_of_week!==todayName(0,now)||mins(r.time_24h)>=nowM);
  if(time)arr=arr.filter(r=>matchesTime(r,time,p));
  if(state.filters.region)arr=arr.filter(r=>r.region===state.filters.region);
  if(state.filters.siteUid)arr=arr.filter(r=>r.site_uid===state.filters.siteUid);
  arr=arr.filter(r=>matchesText(r,p)&&matchesExact(r,p.exact));
  if(state.mode==='saved')arr=arr.filter(r=>state.saved.has(r.site_uid));
  arr.forEach(r=>{r._delta=nextDelta(r,now); r._dist=state.location?distKm(state.location.lat,state.location.lon,rowLat(r),rowLon(r)):null});
  if(state.near&&state.location&&!state.nearExpanded)arr=arr.filter(r=>r._dist==null||r._dist<=NEAR_RADIUS_KM);
  arr.sort((a,b)=> state.near ? ((a._delta-b._delta)||((a._dist??9999)-(b._dist??9999))||siteName(a).localeCompare(siteName(b))) : ((a._delta-b._delta)||siteName(a).localeCompare(siteName(b))));
  state.results=arr; state.next=arr.find(rowMass)||arr[0]||null;
}
function mapsUrl(r){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(r.maps_query||[siteName(r),r.town,r.parish_name,'Mauritius'].filter(Boolean).join(', '))}
function sourceBadge(r){const dt=r.last_verified||r.last_checked||''; return dt?`${tr('verified')} ${dt.slice(0,7)}`:''}
function massBadge(r){if(!rowMass(r))return tr('otherCelebration'); if(r.day_of_week==='Dimanche')return tr('sundayMass'); if(isSundayEligible(r)&&r.day_of_week==='Samedi')return tr('satEve'); return tr('weekdayMass')}
function languageBadge(r){const code=String(r.language_code||r.language||'').toLowerCase(); if(code==='en'||code==='english') return state.lang==='fr'?'Messe en anglais':'English Mass'; return ''}
async function shareRow(r){const url=mapsUrl(r); const text=`${tr('shareMassIntro')}: ${siteName(r)} — ${dayName(r.day_of_week)} ${r.time_24h}`; try{if(navigator.share){await navigator.share({title:siteName(r),text,url});toast(tr('shared'))}else{await navigator.clipboard.writeText(`${text}\n${url}`);toast(tr('copied'))}}catch(e){}}
async function shareApp(){const title=tr('shareAppTitle'); const text=tr('subtitle'); try{if(navigator.share){await navigator.share({title,text,url:location.href});toast(tr('shared'))}else{await navigator.clipboard.writeText(`${title}\n${text}\n${location.href}`);toast(tr('copied'))}}catch(e){}}
function reportEmail(){return (window.MMF_CONFIG&&window.MMF_CONFIG.REPORT_EMAIL)||(window.MASS_FINDER_CONFIG&&window.MASS_FINDER_CONFIG.REPORT_EMAIL)||'mauritiusmassfinder@gmail.com'}
function reportUrl(r){
  const subject=tr('reportSubject')+(r?' — '+siteName(r):'');
  const lines=[tr('reportBody')];
  if(r){
    lines.push('');
    lines.push('Church/site: '+siteName(r));
    lines.push('Parish: '+(r.parish_label||r.parish_name||''));
    lines.push('Town/region: '+[r.town,r.region].filter(Boolean).join(' / '));
    lines.push('Day/time: '+dayName(r.day_of_week)+' '+(r.time_24h||''));
    if(r.qualifier||r.special_rule)lines.push('Rule/qualifier: '+[r.qualifier,r.special_rule].filter(Boolean).join(' · '));
    if(r.source_url)lines.push('Source: '+r.source_url);
  }
  lines.push('');
  lines.push('App version: '+APP_VERSION);
  return 'mailto:'+String(reportEmail()).replace(/[^A-Za-z0-9@._+%-]/g,'')+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
}
function showSite(r){state.mode='search';state.query='';state.filters.siteUid=r.site_uid;state.near=false;const input=$('#searchInput');if(input)input.value='';render();document.getElementById('resultsHead')?.scrollIntoView({behavior:'smooth',block:'start'})}
function toggleSave(r){if(state.saved.has(r.site_uid))state.saved.delete(r.site_uid);else state.saved.add(r.site_uid); localStorage.setItem('mmf_my_churches',JSON.stringify([...state.saved])); render()}
function renderNext(){const root=$('#modeHero'); if(state.mode==='more'){root.innerHTML='';return} if(state.mode==='saved'){root.innerHTML=`<section class="nextCard"><div class="eyebrow">${esc(tr('savedTitle'))}</div><div class="siteName">${esc(tr('savedSub'))}</div></section>`;return} if(state.mode==='near'&&!state.location){root.innerHTML=`<section class="nextCard"><div class="eyebrow">${esc(tr('nearTitle'))}</div><div class="siteName">${esc(tr('locationAsk'))}</div><div class="meta">${esc(tr('locationNotEnabled'))}</div><div class="actions"><button class="btn primary" id="locBtn">${esc(tr('nearUse'))}</button></div></section>`; $('#locBtn')?.addEventListener('click',requestLocation);return} const r=state.next; if(!r){root.innerHTML='';return} const dist=r._dist!=null?distanceLabel(r,r._dist):''; root.innerHTML=`<section class="nextCard"><div class="nextTop"><div><div class="eyebrow">${esc(state.near?tr('nearTitle'):tr('nextUseful'))}</div>${state.near?`<div class="meta">${esc(state.location?(state.nearExpanded?tr('nearExpanded'):tr('sortedHintNear')):tr('locationNotEnabled'))}</div>`:''}<div class="nextTime">${esc(r.time_24h)}</div><div class="relative">${esc(rel(r._delta))}${dist?' · '+esc(dist):''}</div></div><div style="font-size:26px">⛪</div></div><div class="siteName">${esc(siteName(r))}</div><div class="meta">${esc([r.town,r.parish_label||r.parish_name,r.region].filter(Boolean).join(' · '))}</div><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(r))}">${esc(tr('directions'))}</a><button class="btn" id="nextShare">${esc(tr('share'))}</button><button class="btn" id="nextSave">${esc(state.saved.has(r.site_uid)?tr('saved'):tr('save'))} ${state.saved.has(r.site_uid)?'★':'☆'}</button>${state.near&&state.location&&!state.nearExpanded?`<button class="btn" id="expandNear">${esc(tr('expandNear'))}</button>`:''}</div></section>`; $('#expandNear')?.addEventListener('click',()=>{state.nearExpanded=true;render()}); $('#nextShare')?.addEventListener('click',()=>shareRow(r)); $('#nextSave')?.addEventListener('click',()=>toggleSave(r));}

function sourceLabel(r){
  const direct=(state.lang==='fr'?r.source_label_fr:r.source_label_en)||'';
  if(direct)return direct;
  const site=(r.site_name||'').trim();
  const parish=(r.parish_label||r.parish_name||'').trim();
  const sourcePage=(r.source_page_label||parish).trim();
  if(sourcePage&&site&&norm(sourcePage)!==norm(site))return tr('sourceParishPage',{parish:sourcePage});
  return tr('source');
}
function renderCard(r,i){const dist=r._dist!=null?distanceLabel(r,r._dist):''; const rule=[r.qualifier,r.special_rule].filter(Boolean).join(' · '); const ver=sourceBadge(r); const lang=languageBadge(r); return `<article class="card"><div class="cardTop"><div><div class="cardTitle">${esc(siteName(r))}</div><div class="meta">${esc([r.town,r.parish_label||r.parish_name,r.region].filter(Boolean).join(' · '))}</div></div><div class="timeBox"><div class="time">${esc(r.time_24h)}</div><div class="relative">${esc(rel(r._delta))}</div></div></div><div class="badges"><span class="badge mass">${esc(dayName(r.day_of_week))}</span><span class="badge ${rowMass(r)?'ok':'warn'}">${esc(massBadge(r))}</span>${lang?`<span class="badge lang">${esc(lang)}</span>`:''}${dist?`<span class="badge">${esc(dist)}</span>`:''}${ver?`<span class="badge">${esc(ver)}</span>`:''}${rule?`<span class="badge warn">${esc(rule)}</span>`:''}</div><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(r))}">${esc(tr('directions'))}</a><button class="btn" data-alltimes="${i}">${esc(tr('allTimes'))}</button><button class="btn" data-share="${i}">${esc(tr('share'))}</button><a class="btn" href="${esc(reportUrl(r))}">${esc(tr('reportFor'))}</a>${r.source_url?`<a class="btn" target="_blank" rel="noopener" href="${esc(r.source_url)}">${esc(sourceLabel(r))}</a>`:''}<button class="btn" data-save="${i}">${esc(state.saved.has(r.site_uid)?tr('saved'):tr('save'))} ${state.saved.has(r.site_uid)?'★':'☆'}</button></div></article>`}
function renderSavedCard(group,i){
  const r=group.next; const dist=r&&r._dist!=null?distanceLabel(r,r._dist):'';
  const count=group.rows.length;
  return `<article class="card savedChurch"><div class="cardTop"><div><div class="cardTitle">${esc(siteName(group.first))}</div><div class="meta">${esc([group.first.town,group.first.parish_label||group.first.parish_name,group.first.region].filter(Boolean).join(' · '))}</div></div>${r?`<div class="timeBox"><div class="time">${esc(r.time_24h)}</div><div class="relative">${esc(rel(r._delta))}</div></div>`:''}</div><div class="badges">${r?`<span class="badge mass">${esc(dayName(r.day_of_week))}</span><span class="badge ok">${esc(tr('nextMass'))}</span>${languageBadge(r)?`<span class="badge lang">${esc(languageBadge(r))}</span>`:''}`:''}${dist?`<span class="badge">${esc(dist)}</span>`:''}<span class="badge">${count} ${esc(tr('allTimes'))}</span></div><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(group.first))}">${esc(tr('directions'))}</a><button class="btn" data-show-site="${i}">${esc(tr('allTimes'))}</button><button class="btn" data-unsave-site="${i}">${esc(tr('saved'))} ★</button></div></article>`
}
function savedGroups(){
  const now=mauritiusNow(); const map=new Map();
  state.rows.filter(rowActive).filter(r=>state.saved.has(r.site_uid)).forEach(r=>{
    r._delta=nextDelta(r,now); r._dist=state.location?distKm(state.location.lat,state.location.lon,rowLat(r),rowLon(r)):null;
    const key=r.site_uid; if(!map.has(key))map.set(key,{first:r,rows:[],next:null});
    const g=map.get(key); g.rows.push(r); if(rowMass(r)&&(!g.next||r._delta<g.next._delta))g.next=r;
  });
  return [...map.values()].map(g=>{g.rows.sort((a,b)=>a._delta-b._delta); if(!g.next)g.next=g.rows[0]; return g}).sort((a,b)=>(a.next?._delta??999999)-(b.next?._delta??999999)||siteName(a.first).localeCompare(siteName(b.first)))
}
function renderResults(){
  const root=$('#results'); const head=$('#resultCount'); const ctx=$('#contextLabel'); if(ctx)ctx.textContent=currentContextLabel();
  if(state.mode==='more'){root.innerHTML='';head.textContent='';return}
  if(state.mode==='saved'){
    const groups=savedGroups(); const n=groups.length; head.innerHTML=`<b>${n}</b> ${esc(n===1?tr('result'):tr('results'))} ${esc(tr('shown'))}<span class="sortHint"> · ${esc(state.near?tr('sortedHintNear'):tr('sortedHint'))}</span>`;
    if(!n){root.className=''; root.innerHTML=`<div class="empty"><h3>${esc(tr('noSaved'))}</h3><p>${esc(tr('noSavedText'))}</p></div>`; return}
    root.className='resultsGrid'; root.innerHTML=groups.map(renderSavedCard).join('');
    $$('[data-show-site]').forEach(b=>b.addEventListener('click',()=>{const g=groups[+b.dataset.showSite]; state.mode='search'; state.query=''; state.filters.siteUid=g.first.site_uid; $('#searchInput').value=state.query; render()}));
    $$('[data-unsave-site]').forEach(b=>b.addEventListener('click',()=>{const g=groups[+b.dataset.unsaveSite]; state.saved.delete(g.first.site_uid); localStorage.setItem('mmf_my_churches',JSON.stringify([...state.saved])); render()}));
    return
  }
  const arr=state.results; const n=arr.length; head.innerHTML=`<b>${n}</b> ${esc(n===1?tr('result'):tr('results'))} ${esc(tr('shown'))}<span class="sortHint"> · ${esc(state.near?tr('sortedHintNear'):tr('sortedHint'))}</span>`;
  if(!n){root.className=''; root.innerHTML=`<div class="empty"><h3>${esc(tr('noResults'))}</h3><p>${esc(tr('noResultsText'))}</p>${state.near&&state.location&&!state.nearExpanded?`<button class="btn primary" id="emptyExpandNear">${esc(tr('expandNear'))}</button>`:''}</div>`; $('#emptyExpandNear')?.addEventListener('click',()=>{state.nearExpanded=true;render()}); return}
  root.className='resultsGrid'; const capped=arr.length>60; const sundayNote=(effectiveDay()==='Dimanche'&&effectiveDayMode()==='sunday_obligation'&&arr.some(isSundayEligible))?`<div class="resultNotice">${esc(tr('sundayExplain'))}</div>`:''; const capNote=capped?`<div class="resultNotice warn">${esc(tr('resultCap',{n:arr.length}))}</div>`:''; root.innerHTML=sundayNote+capNote+arr.slice(0,60).map(renderCard).join('');
  $$('[data-share]').forEach(b=>b.addEventListener('click',()=>shareRow(state.results[+b.dataset.share])));
  $$('[data-alltimes]').forEach(b=>b.addEventListener('click',()=>showSite(state.results[+b.dataset.alltimes])));
  $$('[data-save]').forEach(b=>b.addEventListener('click',()=>toggleSave(state.results[+b.dataset.save])))
}
function renderChips(){const root=$('#intentChips'); if(!root)return; const chips=[...(state.parsed.chips||[])]; const has=k=>chips.some(c=>c.k===k); if(state.near&&!has('near'))chips.unshift({k:'near',label:tr('quickNear')}); const day=effectiveDay(),mode=effectiveDayMode(),time=effectiveTime(); if(day&&!has('day'))chips.push({k:'day',label:mode==='today'?tr('today'):mode==='tomorrow'?tr('tomorrow'):mode==='sunday_obligation'?tr('sunday'):dayName(day)}); if(time&&!has('time'))chips.push({k:'time',label:tr(time)||time}); if(state.filters.region)chips.push({k:'region',label:state.filters.region}); if(effectiveType()==='all')chips.push({k:'type',label:tr('includeOther')}); if(state.filters.siteUid)chips.push({k:'site',label:tr('allTimes')}); root.innerHTML=chips.map(c=>`<span class="intentChip">${esc(c.label)}<button data-chip="${esc(c.k)}" type="button" aria-label="${esc((state.lang==='fr'?'Retirer ':'Remove ')+c.label)}">×</button></span>`).join(''); $$('[data-chip]').forEach(b=>b.addEventListener('click',()=>{clearIntent(b.dataset.chip); render()}));}
function moreSectionContent(){
  const sections={
    help:{id:'helpSection',title:tr('helpTitle'),body:tr('helpHtml')},
    about:{id:'aboutSection',title:tr('aboutTitle'),body:`<div class="guideText">${tr('aboutHtml')}</div>`},
    update:{id:'howToUpdateSection',title:tr('updateGuideTitle'),body:`<div class="guideText">${tr('updateGuideHtml')}</div>`},
    report:{id:'reportSection',title:tr('reportCorrection'),body:`<div class="guideText"><p>${esc(tr('trustText'))}</p><p><a class="btn primary" href="${esc(reportUrl(null))}">${esc(tr('reportGeneral'))}</a></p></div>`}
  };
  return sections[state.moreSection]||sections.help;
}
function renderMore(){
  const box=$('#morePanel');
  if(state.mode!=='more'){box.hidden=true;box.innerHTML='';return}
  const section=moreSectionContent();
  box.hidden=false;
  box.innerHTML=`<section class="panel morePanelContent" tabindex="-1" aria-labelledby="${esc(section.id)}"><h2>${esc(tr('moreTitle'))}</h2><div class="moreTabs" role="tablist" aria-label="${esc(tr('moreTitle'))}"><button type="button" data-more-section="help" class="tag ${state.moreSection==='help'?'active':''}">${esc(tr('helpTitle'))}</button><button type="button" data-more-section="about" class="tag ${state.moreSection==='about'?'active':''}">${esc(tr('about'))}</button><button type="button" data-more-section="update" class="tag ${state.moreSection==='update'?'active':''}">${esc(tr('howUpdate'))}</button><button type="button" data-more-section="report" class="tag ${state.moreSection==='report'?'active':''}">${esc(tr('reportCorrection'))}</button></div><h3 id="${esc(section.id)}">${esc(section.title)}</h3>${section.body}<h3>${esc(tr('trustTitle'))}</h3><p>${esc(tr('trustText'))}</p><p>${esc(tr('version'))}: ${APP_VERSION}</p><button class="btn primary" id="shareAppBtn">${esc(tr('share'))}</button></section>`;
  $$('[data-more-section]').forEach(b=>b.addEventListener('click',()=>openMoreSection(b.dataset.moreSection,false)));
  $('#shareAppBtn')?.addEventListener('click',shareApp)
}
function openMoreSection(section='help',shouldScroll=true){
  state.mode='more';
  state.moreSection=(section||'help').replace(/^#/,'').replace('Section','').replace('howToUpdate','update');
  render();
  const panel=$('#morePanel');
  if(shouldScroll&&panel){setTimeout(()=>{panel.scrollIntoView({behavior:'smooth',block:'start'}); $('.morePanelContent')?.focus({preventScroll:true})},0)}
}
function renderFooter(){const f=$('#appFooter'); if(!f)return; f.innerHTML=`<span>${esc(tr('version'))} ${APP_VERSION}</span><span aria-hidden="true">•</span><button type="button" data-footer-target="help">${esc(tr('helpTitle'))}</button><span aria-hidden="true">•</span><button type="button" data-footer-target="about">${esc(tr('about'))}</button><span aria-hidden="true">•</span><button type="button" id="footerUpdateHelp">${esc(tr('howUpdate'))}</button><span aria-hidden="true">•</span><button type="button" data-footer-target="report">${esc(tr('reportCorrection'))}</button>`; $$('[data-footer-target]').forEach(b=>b.addEventListener('click',()=>openMoreSection(b.dataset.footerTarget))); $('#footerUpdateHelp')?.addEventListener('click',openUpdateHelp)}
function openUpdateHelp(){openMoreSection('update')}

function renderStatic(){document.documentElement.lang=state.lang; $('#appTitle').innerHTML=esc(tr('title')).replace('\n','<br>'); $('#appSubtitle').textContent=tr('subtitle'); $('#searchLabel').textContent=tr('search'); $('#searchInput').placeholder=tr('searchPh'); const sh=$('#searchHint'); if(sh) sh.textContent=tr('searchHint'); $('#clearSearch').textContent=tr('clear'); $('#heroCount').textContent=`${state.rows.length} ${state.lang==='fr'?'horaires':'schedules'} · ${new Set(state.rows.map(r=>r.parish_uid)).size} ${state.lang==='fr'?'paroisses':'parishes'}`; $$('[data-t]').forEach(el=>el.textContent=tr(el.dataset.t)); $('#filterTitle').textContent=tr('filters'); $('#dayLabel').textContent=tr('day'); $('#timeLabel').textContent=tr('time'); $('#regionLabel').textContent=tr('region'); $('#typeLabel').textContent=tr('type'); $('#applyFilters').textContent=tr('showResults'); $('#updateTitle').textContent=tr('updateTitle'); $('#updateText').textContent=tr('updateText'); $('#updateRefresh').textContent=tr('refresh'); $('#updateDismiss').textContent=tr('later'); $('#updateHelp')&&($('#updateHelp').textContent=tr('troubleUpdating')); $('#langEn').classList.toggle('active',state.lang==='en'); $('#langFr').classList.toggle('active',state.lang==='fr'); updateSwipeAffordance();}
function renderTags(){const days=[['',tr('anyDay')],['__today',tr('today')],['__tomorrow',tr('tomorrow')],['Dimanche',tr('sunday')],['Samedi',dayName('Samedi')]]; const times=[['',tr('allDay')],['morning',tr('morning')],['afternoon',tr('afternoon')],['evening',tr('evening')]]; const regs=[['',tr('allRegions')],...[...new Set(state.rows.map(r=>r.region).filter(Boolean))].sort().map(x=>[x,x])]; const types=[['mass',tr('massesOnly')],['all',tr('includeOther')]]; const currentDay=effectiveDay(),currentDayMode=effectiveDayMode(),currentTime=effectiveTime(),currentType=effectiveType(); const isActive=(key,v,val)=>{ if(key==='day')return (v===''&&!currentDay)||((v==='__today'&&currentDayMode==='today')||(v==='__tomorrow'&&currentDayMode==='tomorrow')||(v==='Dimanche'&&currentDay==='Dimanche'&&currentDayMode==='sunday_obligation')||(v===currentDay&&v!=='Dimanche'&&v!==''&&currentDayMode!=='today'&&currentDayMode!=='tomorrow')); if(key==='time')return v===currentTime; if(key==='type')return v===currentType; return v===val}; const build=(id,arr,val,key)=>{const el=$(id); if(!el)return; el.innerHTML=arr.map(([v,l])=>`<button class="tag ${isActive(key,v,val)?'active':''}" data-filter="${key}" data-value="${esc(v)}" type="button" aria-pressed="${isActive(key,v,val)?'true':'false'}">${esc(l)}</button>`).join('')}; build('#dayTags',days,state.filters.day,'day'); build('#timeTags',times,state.filters.time,'time'); build('#regionTags',regs,state.filters.region,'region'); build('#typeTags',types,state.filters.type,'type'); $$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{applyFilter(b.dataset.filter,b.dataset.value); render()}))}
function renderNav(){const day=effectiveDay(),mode=effectiveDayMode(),time=effectiveTime(); $$('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===state.mode || (state.mode==='home'&&b.dataset.nav==='home'))); $$('.pill').forEach(p=>p.classList.toggle('active',(p.dataset.action==='near'&&state.near)||(p.dataset.action==='saved'&&state.mode==='saved')||(p.dataset.action==='evening'&&time==='evening')||(p.dataset.action==='today'&&day===todayName(0)&&mode==='today')||(p.dataset.action==='tomorrow'&&day===todayName(1)&&mode==='tomorrow')||(p.dataset.action==='sunday'&&day==='Dimanche'&&mode==='sunday_obligation')))}
function render(){compute(); renderStatic(); renderChips(); renderTags(); renderNav(); renderNext(); renderResults(); renderMore(); renderFooter(); $('#resultsHead').hidden=state.mode==='more'; $('#searchBox').classList.toggle('hasText',!!state.query);}
function setLang(l){state.lang=l;localStorage.setItem('mmf_language',l);render()}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),1800)}
function requestLocation(){if(!navigator.geolocation){toast(tr('locationDenied'));return} navigator.geolocation.getCurrentPosition(pos=>{state.location={lat:pos.coords.latitude,lon:pos.coords.longitude};state.near=true;state.mode='near';render()},()=>toast(tr('locationDenied')),{enableHighAccuracy:false,timeout:8000,maximumAge:0})}
let lastFocusedBeforeSheet=null;
function focusablesIn(el){return $$('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])').filter(x=>el&&el.contains(x)&&!x.disabled&&x.getAttribute('aria-hidden')!=='true')}
function openModal(name,trigger=document.activeElement){
  if(name!=='filters')return;
  lastFocusedBeforeSheet=trigger;
  state.modal='filters';
  document.body.classList.add('filtersOpen','modalOpen');
  $('#filterSheet')?.setAttribute('aria-hidden','false');
  $('#openFilters')?.setAttribute('aria-expanded','true');
  $('#appRoot')?.setAttribute('inert','');
  setTimeout(()=>{const target=$('#filterSheet')?.querySelector('#closeFilters')||focusablesIn($('#filterSheet'))[0]; target?.focus()},0)
}
function closeModal(name='filters'){
  if(name!=='filters'&&state.modal!==name)return;
  document.body.classList.remove('filtersOpen','modalOpen');
  state.modal=null;
  $('#filterSheet')?.setAttribute('aria-hidden','true');
  $('#openFilters')?.setAttribute('aria-expanded','false');
  $('#appRoot')?.removeAttribute('inert');
  if(lastFocusedBeforeSheet&&lastFocusedBeforeSheet.focus)lastFocusedBeforeSheet.focus();
}
function openFilters(e){openModal('filters',e?.currentTarget||document.activeElement)}
function closeFilters(){closeModal('filters')}
function trapSheetFocus(e){if(e.key!=='Tab'||state.modal!=='filters')return; const f=focusablesIn($('#filterSheet')); if(!f.length)return; const first=f[0],last=f[f.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()} else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
function bindSheetDrag(){const sheet=$('#filterSheet'), grab=sheet?.querySelector('.grab'); if(!sheet||!grab)return; let startY=0,startX=0,dragging=false; grab.addEventListener('pointerdown',e=>{if(state.modal!=='filters')return; startY=e.clientY;startX=e.clientX;dragging=true; grab.setPointerCapture?.(e.pointerId)}); grab.addEventListener('pointerup',e=>{if(!dragging)return; const dy=e.clientY-startY,dx=Math.abs(e.clientX-startX); dragging=false; if(dy>60&&dy>dx*1.4)closeFilters()}); grab.addEventListener('pointercancel',()=>{dragging=false})}
function applyRows(json){const rows=(json&&json.rows)||json||[]; if(Array.isArray(rows)&&rows.length){state.rows=rows.filter(rowActive); return true} return false}
async function loadData(){state.saved=new Set(JSON.parse(localStorage.getItem('mmf_my_churches')||'[]')); let rendered=false; try{if(window.caches){const cached=await caches.match('data/masses.json'); if(cached){const json=await cached.clone().json(); rendered=applyRows(json); if(rendered)render();}}}catch(e){} if(!rendered){try{rendered=applyRows(window.MMF_FALLBACK_DATA||{}); if(rendered)render();}catch(e){}} try{let res=await fetch('data/masses.json',{cache:'no-cache'}); if(!res.ok)throw new Error('fetch'); let json=await res.clone().json(); if(window.caches){try{const c=await caches.open('mmf-v26-0-8'); await c.put('data/masses.json',res.clone())}catch(_){}} applyRows(json); render(); }catch(e){if(!rendered){state.loadError=String(e); render();}}}

async function forceUpdate(){
  const banner=$('#updateBanner');
  const latest=(banner&&banner.dataset.latestVersion)||APP_VERSION;
  try{
    if(navigator.serviceWorker){
      const reg=await navigator.serviceWorker.getRegistration();
      if(reg&&reg.update)await reg.update();
    }
    if(window.caches){
      const keys=await caches.keys();
      await Promise.all(keys.filter(k=>k.startsWith('mmf-')).map(k=>caches.delete(k)));
    }
  }catch(e){}
  try{localStorage.removeItem('mmf_update_dismissed_'+latest)}catch(e){}
  setTimeout(()=>{const t=$('#updateText'); if(t)t.textContent=tr('updateFallback')},2000);
  const base=location.origin+location.pathname;
  location.replace(base+'?v='+encodeURIComponent(latest)+'&refresh='+Date.now()+location.hash);
}

async function checkUpdate(){try{const res=await fetch('version.json?ts='+Date.now(),{cache:'no-store'});const v=await res.json(); if(v.version&&v.version!==APP_VERSION&&!localStorage.getItem('mmf_update_dismissed_'+v.version)){const banner=$('#updateBanner'); banner.dataset.latestVersion=v.version; banner.classList.add('show')}}catch(e){}}
function bind(){state.lang=localStorage.getItem('mmf_language')||((navigator.language||'').toLowerCase().startsWith('fr')?'fr':'en'); $('#searchInput').addEventListener('input',e=>{state.query=e.target.value;state.filters.siteUid='';state.mode='search';state.near=!!parseQuery(state.query).near; if(state.near){state.mode='near';state.nearExpanded=false; if(!state.location) requestLocation();} render()}); $('#clearSearch').addEventListener('click',()=>{state.query='';$('#searchInput').value='';resetFilters();state.mode='home';state.near=false;state.nearExpanded=false;render()}); $('#langEn').addEventListener('click',()=>setLang('en')); $('#langFr').addEventListener('click',()=>setLang('fr')); $('#openFilters').addEventListener('click',openFilters); $('#closeFilters').addEventListener('click',closeFilters); $('#sheetBackdrop').addEventListener('click',closeFilters); $('#applyFilters').addEventListener('click',closeFilters); $$('.pill').forEach(p=>p.addEventListener('click',()=>{const a=p.dataset.action; if(a==='next'){state.mode='home';state.near=false;resetFilters();state.query='';$('#searchInput').value=''} if(a==='today'){applyFilter('day','__today')} if(a==='tomorrow'){applyFilter('day','__tomorrow')} if(a==='evening'){applyFilter('time','evening')} if(a==='near'){state.mode='near';state.near=true;state.nearExpanded=false;requestLocation()} if(a==='sunday'){applyFilter('day','Dimanche')} if(a==='saved'){state.mode='saved';state.near=false} render()})); $$('[data-nav]').forEach(b=>b.addEventListener('click',()=>{const n=b.dataset.nav;if(n==='near'){state.mode='near';state.near=true;state.nearExpanded=false;requestLocation()} else {state.mode=n; if(n==='more')state.moreSection='help'; if(n!=='near')state.near=false} render(); window.scrollTo({top:0,behavior:'smooth'})})); const quick=$('#quickRow'); if(quick){quick.addEventListener('scroll',()=>{markSwipeHintSeen();updateSwipeAffordance()},{passive:true}); quick.addEventListener('click',()=>{markSwipeHintSeen();updateSwipeAffordance()}); window.addEventListener('resize',updateSwipeAffordance)} $('#updateRefresh').addEventListener('click',forceUpdate); $('#updateHelp')?.addEventListener('click',openUpdateHelp); $('#updateDismiss').addEventListener('click',()=>{const banner=$('#updateBanner'); const latest=banner.dataset.latestVersion||APP_VERSION; banner.classList.remove('show');localStorage.setItem('mmf_update_dismissed_'+latest,'1')}); document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.modal==='filters')closeFilters(); trapSheetFocus(e)})}
async function registerSW(){if(!('serviceWorker'in navigator))return; try{await navigator.serviceWorker.register('sw.js')}catch(e){}}
document.addEventListener('DOMContentLoaded',()=>{bind();bindSheetDrag();loadData();registerSW();checkUpdate();setInterval(checkUpdate,30*60*1000)});
