import {APP_VERSION} from './constants.js';
import {state,setState} from './state.js';
import {
  $,$$,tr,esc,
  storageGet,storageSet,
  mauritiusNow,dayName,todayName,
  rowMass,rowActive,siteName,visibleSiteName,
  isSundayEligible,countsForSundayContext,
  getNextOccurrence,dateSerial,
  distanceLabel,mapsUrl,reportUrl,rowKey,
  massBadge,languageBadge,trustLine,warningBanner,
  rel,ruleText,sourceLabel,
  confidenceScore,precisionLabel,
  toast,markSwipeHintSeen,updateSwipeAffordance
} from './utils.js';
import {
  compute,
  effectiveDay,effectiveDayMode,effectiveTime,effectiveType,
  isDayFilterActive,isTimeFilterActive,
  nearScopeNotice,nearRecommendationLabel,
  stateUrl,currentContextLabel,
  annotateRowForRanking,rankResults
} from './search.js';
import {locationRequestInFlight} from './geo.js';
let deferredInstallPrompt=null;
let installPromptDismissedUntilSession=0;
let firstVisitSeenSession=false;
let standaloneWelcomeDismissedSession=false;
window.addEventListener('beforeinstallprompt',e=>{
  try{e.preventDefault();deferredInstallPrompt=e;renderInstallOnboarding()}catch(_){}}
);
export function isStandaloneMode(){
  try{return !!(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true}catch(e){return false}
}
export function ua(){return navigator.userAgent||''}
export function isIOSDevice(){return /iPad|iPhone|iPod/.test(ua())||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)}
export function isAndroidDevice(){return /Android/i.test(ua())}
export function isMobileDevice(){return isIOSDevice()||isAndroidDevice()||(/Mobi|Mobile/i.test(ua()))||(window.matchMedia&&window.matchMedia('(max-width: 760px)').matches)}
export function isLikelySafariOnIOS(){return isIOSDevice()&&/Safari/i.test(ua())&&!/(CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|Instagram|FBAN|FBAV|Line|WhatsApp)/i.test(ua())}
export function isLikelyInAppBrowser(){return /(Instagram|FBAN|FBAV|Line|WhatsApp|Messenger|Twitter|LinkedInApp|GSA)/i.test(ua())}
export function installInstructionsHtml(){
  const iosWarn=isIOSDevice()&&!isLikelySafariOnIOS()?`<p class="installWarning">${esc(tr('openSafariFirst'))}</p>`:'';
  const nativeBtn=deferredInstallPrompt&&!isStandaloneMode()?`<p><button class="btn primary" type="button" data-install-action="native">${esc(tr('installNow'))}</button></p>`:'';
  return `<div class="guideText installGuide">${iosWarn}${nativeBtn}<details open><summary>${esc(tr('iphoneInstallTitle'))}</summary><ol><li>${esc(tr('iphoneInstallStep1'))}</li><li>${esc(tr('iphoneInstallStep2'))}</li><li>${esc(tr('iphoneInstallStep3'))}</li><li>${esc(tr('iphoneInstallStep4'))}</li></ol></details><details open><summary>${esc(tr('androidInstallTitle'))}</summary><ol><li>${esc(tr('androidInstallStep1'))}</li><li>${esc(tr('androidInstallStep2'))}</li><li>${esc(tr('androidInstallStep3'))}</li><li>${esc(tr('androidInstallStep4'))}</li></ol></details><p>${esc(tr('browserUseNote'))}</p></div>`;
}
export function removeInstallCard(){const c=$('#installOnboarding'); if(c)c.remove()}
export function shouldShowFirstVisitInstallCard(){
  if(isStandaloneMode()||!isMobileDevice())return false;
  const storedUntil=Number(storageGet('mmf_install_prompt_dismissed_until','0')||0);
  const until=Math.max(storedUntil,installPromptDismissedUntilSession||0);
  if(until&&Date.now()<until)return false;
  if(!storageGet('mmf_first_visit_seen')&&!firstVisitSeenSession)return true;
  return !!(until&&Date.now()>=until);
}
export function installCardHtml(kind){
  const isWelcome=kind==='standalone';
  const title=isWelcome?tr('firstStandaloneTitle'):tr('installPromptTitle');
  const body=isWelcome?tr('firstStandaloneBody'):tr('installPromptBody');
  const primary=isWelcome?tr('start'):tr('howInstall');
  const secondary=isWelcome?tr('seeHowUse'):tr('later');
  const primaryAction=isWelcome?'welcome-start':'how';
  const secondaryAction=isWelcome?'welcome-help':'later';
  const extra=isWelcome?'':`<div class="installQuickSteps"><p>${esc(tr('installPromptIphoneShort'))}</p><p>${esc(tr('installPromptAndroidShort'))}</p></div>`;
  return `<section class="installOnboardingCard ${isWelcome?'installed':'browser'}" id="installOnboarding" data-install-kind="${kind}" role="region" aria-live="polite" aria-label="${esc(title)}"><div><div class="eyebrow">${esc(isWelcome?tr('installedUseNote'):tr('installTab'))}</div><h2>${esc(title)}</h2><p>${esc(body)}</p>${extra}</div><div class="actions"><button class="btn primary" type="button" data-install-action="${primaryAction}">${esc(primary)}</button><button class="btn" type="button" data-install-action="${secondaryAction}">${esc(secondary)}</button></div></section>`;
}
export function renderInstallOnboarding(){
  const host=$('#appRoot'), hero=$('#hero'); if(!host||!hero)return;
  const existing=$('#installOnboarding');
  let kind='';
  if(existing&&existing.dataset.installKind==='browser'&&!isStandaloneMode()&&installPromptDismissedUntilSession<Date.now())kind='browser';
  else if(existing&&existing.dataset.installKind==='standalone'&&isStandaloneMode()&&!standaloneWelcomeDismissedSession)kind='standalone';
  else if(isStandaloneMode()&&!storageGet('mmf_first_standalone_seen')&&!standaloneWelcomeDismissedSession)kind='standalone';
  else if(shouldShowFirstVisitInstallCard())kind='browser';
  if(!kind){if(existing)existing.remove();return}
  if(!existing){hero.insertAdjacentHTML('afterend',installCardHtml(kind)); if(kind==='browser'){firstVisitSeenSession=true;storageSet('mmf_first_visit_seen',String(Date.now()))} return}
  existing.outerHTML=installCardHtml(kind);
}
export async function handleInstallAction(action){
  if(action==='later'){
    installPromptDismissedUntilSession=Date.now()+14*24*60*60*1000;
    storageSet('mmf_install_prompt_dismissed_until',String(installPromptDismissedUntilSession));
    removeInstallCard();
    return;
  }
  if(action==='how'){
    firstVisitSeenSession=true;
    storageSet('mmf_install_help_opened',String(Date.now()));
    removeInstallCard();
    openMoreSection('install');
    return;
  }
  if(action==='welcome-start'){
    standaloneWelcomeDismissedSession=true;
    storageSet('mmf_first_standalone_seen',String(Date.now()));
    removeInstallCard();
    return;
  }
  if(action==='welcome-help'){
    standaloneWelcomeDismissedSession=true;
    storageSet('mmf_first_standalone_seen',String(Date.now()));
    removeInstallCard();
    openMoreSection('help');
    return;
  }
  if(action==='native'){
    if(!deferredInstallPrompt)return openMoreSection('install');
    try{deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice}catch(_){ }
    deferredInstallPrompt=null;
    installPromptDismissedUntilSession=Date.now()+14*24*60*60*1000;
    storageSet('mmf_install_prompt_dismissed_until',String(installPromptDismissedUntilSession));
    removeInstallCard();
  }
}
export function openMoreSection(section='help',shouldScroll=true){
  const moreSection=(section||'help').replace(/^#/,'').replace('Section','').replace('howToUpdate','update');
  setState({mode:'more',moreSection});
  const panel=$('#morePanel');
  if(shouldScroll&&panel){setTimeout(()=>{panel.scrollIntoView({behavior:'smooth',block:'start'}); $('.morePanelContent')?.focus({preventScroll:true})},0)}
}
export function renderFooter(){const f=$('#appFooter'); if(!f)return; f.innerHTML=`<span>${esc(tr('version'))} ${APP_VERSION}</span><span aria-hidden="true">•</span><button type="button" data-footer-target="help">${esc(tr('helpTitle'))}</button><span aria-hidden="true">•</span><button type="button" data-footer-target="install">${esc(tr('installTab'))}</button><span aria-hidden="true">•</span><button type="button" data-footer-target="about">${esc(tr('about'))}</button><span aria-hidden="true">•</span><button type="button" data-footer-target="update">${esc(tr('howUpdate'))}</button><span aria-hidden="true">•</span><button type="button" data-footer-target="report">${esc(tr('reportIssue'))}</button>`;}
export function openUpdateHelp(){openMoreSection('update')}
export function moreSectionContent(){
  const sections={
    help:{id:'helpSection',title:tr('helpTitle'),body:tr('helpHtml')},
    install:{id:'installSection',title:tr('installTab'),body:installInstructionsHtml()},
    about:{id:'aboutSection',title:tr('aboutTitle'),body:`<div class="guideText">${tr('aboutHtml')}</div>`},
    update:{id:'howToUpdateSection',title:tr('updateGuideTitle'),body:`<div class="guideText">${tr('updateGuideHtml')}</div>`},
    report:{id:'reportSection',title:tr('reportIssue'),body:`<div class="guideText"><p>${esc(tr('trustText'))}</p><p><a class="btn primary" href="${esc(reportUrl(null))}">${esc(tr('reportIssue'))}</a></p></div>`}
  };
  return sections[state.moreSection]||sections.help;
}
export function renderMore(){
  const box=$('#morePanel');
  if(state.mode!=='more'){box.hidden=true;box.innerHTML='';return}
  const section=moreSectionContent();
  box.hidden=false;
  box.innerHTML=`<section class="panel morePanelContent" tabindex="-1" aria-labelledby="${esc(section.id)}"><h2>${esc(tr('moreTitle'))}</h2><div class="moreTabs" role="tablist" aria-label="${esc(tr('moreTitle'))}"><button type="button" data-more-section="help" class="tag ${state.moreSection==='help'?'active':''}">${esc(tr('helpTitle'))}</button><button type="button" data-more-section="install" class="tag ${state.moreSection==='install'?'active':''}">${esc(tr('installTab'))}</button><button type="button" data-more-section="about" class="tag ${state.moreSection==='about'?'active':''}">${esc(tr('about'))}</button><button type="button" data-more-section="update" class="tag ${state.moreSection==='update'?'active':''}">${esc(tr('howUpdate'))}</button><button type="button" data-more-section="report" class="tag ${state.moreSection==='report'?'active':''}">${esc(tr('reportIssue'))}</button></div><h3 id="${esc(section.id)}">${esc(section.title)}</h3>${section.body}<h3>${esc(tr('trustTitle'))}</h3><p>${esc(tr('trustText'))}</p><p>${esc(tr('version'))}: ${APP_VERSION}</p><button class="btn primary" data-share-app="1">${esc(tr('share'))}</button></section>`;
}
export function renderNext(){
  const root=$('#modeHero');
  if(state.mode==='more'){root.innerHTML='';return}
  if(state.mode==='saved'){root.innerHTML=`<section class="nextCard"><div class="eyebrow">${esc(tr('savedTitle'))}</div><div class="siteName">${esc(tr('savedSub'))}</div></section>`;return}
  if(state.mode==='near'&&!state.location){root.innerHTML=`<section class="nextCard"><div class="eyebrow">${esc(tr('nearTitle'))}</div><div class="siteName">${esc(tr('locationAsk'))}</div><div class="meta">${esc(tr('locationNotEnabled'))}</div><div class="actions"><button class="btn primary" data-next-action="locate">${esc(tr('nearUse'))}</button></div></section>`;return}
  const r=state.next; if(!r){root.innerHTML='';return}
  const dist=r._dist!=null?distanceLabel(r,r._dist):'';
  const nearMeta=state.near?nearRecommendationLabel(r,state.nearScope):'';
  root.innerHTML=`<section class="nextCard"><div class="nextTop"><div><div class="eyebrow">${esc(state.near?tr('nearTitle'):tr('nextUseful'))}</div>${state.near?`<div class="meta">${esc(nearMeta||tr('sortedHintNear'))}</div>`:''}<div class="nextTime">${esc(r.time_24h)}</div><div class="relative">${esc(rel(r._delta))}${dist?' · '+esc(dist):''}</div></div><div style="font-size:26px">⛪</div></div><div class="siteName">${esc(visibleSiteName(r))}</div><div class="meta">${esc([r.town,r.parish_label||r.parish_name,r.region].filter(Boolean).join(' · '))}</div><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(r))}">${esc(tr('directions'))}</a><button class="btn" data-next-action="share">${esc(tr('share'))}</button><button class="btn" data-next-action="save">${esc(state.saved.has(r.site_uid)?tr('saved'):tr('save'))} ${state.saved.has(r.site_uid)?'★':'☆'}</button></div></section>`;
}

export function renderCard(r,i){
  const dist=r._dist!=null?distanceLabel(r,r._dist):'';
  const lang=languageBadge(r);
  const trust=trustLine(r);
  return `<article class="card">${warningBanner(r)}<div class="cardTop"><div><div class="cardTitle">${esc(visibleSiteName(r))}</div><div class="meta">${esc([r.town,r.parish_label||r.parish_name,r.region].filter(Boolean).join(' · '))}</div></div><div class="timeBox"><div class="time">${esc(r.time_24h)}</div><div class="relative">${esc(rel(r._delta))}</div></div></div><div class="trustStrip">${esc(trust)}</div><div class="badges"><span class="badge mass">${esc(dayName(r.day_of_week))}</span><span class="badge ${rowMass(r)?'ok':'warn'}">${esc(massBadge(r))}</span>${lang?`<span class="badge lang">${esc(lang)}</span>`:''}${dist?`<span class="badge">${esc(dist)}</span>`:''}</div><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(r))}">${esc(tr('directions'))}</a><button class="btn" data-detail-row="${i}">${esc(tr('details'))}</button><button class="btn" data-save="${i}">${esc(state.saved.has(r.site_uid)?tr('saved'):tr('save'))} ${state.saved.has(r.site_uid)?'★':'☆'}</button></div></article>`
}
export function renderDetailSheet(r){
  const root=$('#detailSheetBody'); if(!root||!r)return;
  const rule=ruleText(r), dist=r._dist!=null?distanceLabel(r,r._dist):'';
  const sLabel=sourceLabel(r);
  const sValue=norm(sLabel)===norm(tr('source'))?'':`<strong>${esc(sLabel)}</strong>`;
  const sourceRow=r.source_url?`<a class="detailActionRow" target="_blank" rel="noopener" href="${esc(r.source_url)}"><span>${esc(tr('source'))}</span>${sValue}</a>`:`<div class="detailActionRow inert"><span>${esc(tr('source'))}</span><strong>${esc(tr('sourceAvailable'))}</strong></div>`;
  root.innerHTML=`${warningBanner(r)}<div class="detailSummary"><div class="time">${esc(r.time_24h)}</div><div><div class="cardTitle">${esc(visibleSiteName(r))}</div><div class="meta">${esc([r.town,r.parish_label||r.parish_name,r.region].filter(Boolean).join(' · '))}</div><div class="relative">${esc(dayName(r.day_of_week))} · ${esc(rel(r._delta))}${dist?' · '+esc(dist):''}</div></div></div><div class="trustStrip">${esc(trustLine(r))}</div><div class="detailGrid"><div><b>${esc(tr('site'))}</b><br>${esc(visibleSiteName(r))}</div><div><b>${esc(tr('parish'))}</b><br>${esc(r.parish_label||r.parish_name||'')}</div>${r.town?`<div><b>${esc(tr('town'))}</b><br>${esc(r.town)}</div>`:''}${rule?`<div><b>${esc(tr('rule'))}</b><br>${esc(rule)}</div>`:''}</div><div class="detailActionList">${sourceRow}<button class="detailActionRow" data-detail-action="all-times" type="button"><span>${esc(tr('allTimes'))}</span><strong>${esc(visibleSiteName(r))}</strong></button><a class="detailActionRow" href="${esc(reportUrl(r))}"><span>${esc(tr('reportIssue'))}</span><strong>${esc(visibleSiteName(r))} · ${esc(r.day_of_week||'')} ${esc(r.time_24h||'')}</strong></a></div><div class="actions detailActions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(r))}">${esc(tr('directions'))}</a><button class="btn" data-detail-action="share" type="button">${esc(tr('share'))}</button><button class="btn" data-detail-action="save" type="button">${esc(state.saved.has(r.site_uid)?tr('saved'):tr('save'))} ${state.saved.has(r.site_uid)?'★':'☆'}</button></div>`;
}
export function renderSavedCard(group,i){
  const r=group.next; const dist=r&&r._dist!=null?distanceLabel(r,r._dist):'';
  const count=group.rows.length;
  const upcoming=group.rows.filter(rowMass).filter(r=>!r._past).slice(0,3).map(x=>`${dayName(x.day_of_week)} ${x.time_24h}`).join(' · ');
  return `<article class="card savedChurch"><div class="cardTop"><div><div class="cardTitle">${esc(visibleSiteName(group.first))}</div><div class="meta">${esc([group.first.town,group.first.parish_label||group.first.parish_name,group.first.region].filter(Boolean).join(' · '))}</div></div>${r?`<div class="timeBox"><div class="time">${esc(r.time_24h)}</div><div class="relative">${esc(rel(r._delta))}</div></div>`:''}</div>${r?`<div class="trustStrip">${esc(trustLine(r))}</div>`:''}<div class="badges">${r?`<span class="badge mass">${esc(dayName(r.day_of_week))}</span><span class="badge ok">${esc(tr('nextMass'))}</span>${languageBadge(r)?`<span class="badge lang">${esc(languageBadge(r))}</span>`:''}`:''}${dist?`<span class="badge">${esc(dist)}</span>`:''}<span class="badge">${count} ${esc(tr('allTimes'))}</span></div>${upcoming?`<div class="savedTimes">${esc(upcoming)}</div>`:''}<div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(group.first))}">${esc(tr('directions'))}</a><button class="btn" data-show-site="${i}">${esc(tr('allTimes'))}</button><button class="btn" data-unsave-site="${i}">${esc(tr('saved'))} ★</button></div></article>`
}
export function savedGroups(){
  const now=mauritiusNow(); const map=new Map();
  state.rows.filter(rowActive).filter(r=>state.saved.has(r.site_uid)).forEach(r=>{
    annotateRowForRanking(r,now);
    const key=r.site_uid; if(!map.has(key))map.set(key,{first:r,rows:[],next:null});
    const g=map.get(key); g.rows.push(r); if(r._actionable&&(!g.next||r._delta<g.next._delta))g.next=r;
  });
  return [...map.values()].map(g=>{rankResults(g.rows,{near:false}); return g}).sort((a,b)=>(a.next?._delta??999999)-(b.next?._delta??999999)||siteName(a.first).localeCompare(siteName(b.first)))
}

export function dateGroupLabel(r,now=mauritiusNow()){
  const cached=(r._nextOccurrence instanceof Date&&!Number.isNaN(+r._nextOccurrence))?r._nextOccurrence:null;
  const occ=cached||getNextOccurrence(r,now);
  if(!occ)return dayName(r.day_of_week);
  const diff=dateSerial(occ)-dateSerial(now);
  if(diff===0){
    if(+occ<+now&&!r._inProgress)return tr('earlierToday');
    return tr('todayRel');
  }
  if(diff===1)return tr('tomorrowRel');
  return dayName(DAYS[occ.getDay()]);
}
export function renderCardsWithDateSeparators(arr,limit=60){
  const now=mauritiusNow();
  let last='';
  return arr.slice(0,limit).map((r,i)=>{
    const label=dateGroupLabel(r,now);
    const sep=label!==last?`<div class="dateSep">${esc(label)}</div>`:'';
    last=label;
    return sep+renderCard(r,i);
  }).join('');
}
export function renderResults(){
  const root=$('#results'); const head=$('#resultCount'); const ctx=$('#contextLabel'); if(ctx)ctx.textContent=currentContextLabel();
  if(state.mode==='more'){root.innerHTML='';head.textContent='';return}
  if(state.loadError&&!state.rows.length){head.textContent='';root.className='';root.innerHTML=`<div class="empty error"><h3>${esc(tr('error'))}</h3><p>${esc(tr('loadDataError'))}</p></div>`;return}
  if(state.near&&!state.location){head.textContent='';root.className='';root.innerHTML=`<div class="empty"><h3>${esc(tr('nearTitle'))}</h3><p>${esc(tr('locationAsk'))}</p><button class="btn primary" type="button" data-next-action="locate">${esc(tr('nearUse'))}</button></div>`;return}
  if(state.mode==='saved'){
    const groups=savedGroups(); const n=groups.length; head.innerHTML=`<b>${n}</b> ${esc(n===1?tr('result'):tr('results'))} ${esc(tr('shown'))}<span class="sortHint"> · ${esc(state.near?tr('sortedHintNear'):tr('sortedHint'))}</span>`;
    if(!n){root.className=''; root.innerHTML=`<div class="empty"><h3>${esc(tr('noSaved'))}</h3><p>${esc(tr('noSavedText'))}</p></div>`; return}
    root.className='resultsGrid'; root.innerHTML=groups.map(renderSavedCard).join('');
    return
  }
  const arr=state.results; const n=arr.length; head.innerHTML=`<b>${n}</b> ${esc(n===1?tr('result'):tr('results'))} ${esc(tr('shown'))}<span class="sortHint"> · ${esc(state.near?tr('sortedHintNear'):tr('sortedHint'))}</span>`;
  if(!n){
    const exactStatus=state.exactTimeStatus;
    const exactNoMatch=!!(exactStatus&&exactStatus.noDirectMatch);
    const title=exactNoMatch?tr('noExactTimeMatch',{time:String(Math.floor(exactStatus.requested/60)).padStart(2,'0')+':'+String(exactStatus.requested%60).padStart(2,'0')}):tr('noResults');
    const text=exactNoMatch?tr('noExactTimeMatchText'):tr('noResultsText');
    root.className=''; root.innerHTML=`<div class="empty"><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`; return
  }
  root.className='resultsGrid'; const capped=arr.length>60; const sundayNote=(effectiveDay()==='Dimanche'&&effectiveDayMode()==='sunday_obligation'&&arr.some(isSundayEligible))?`<div class="resultNotice">${esc(tr('sundayExplain'))}</div>`:''; const nearNotice=state.near&&state.location?nearScopeNotice(state.nearScope):''; const nearNote=nearNotice?`<div class="resultNotice ${state.nearScope==='all'?'warn':''}">${esc(nearNotice)}</div>`:''; const capNote=capped?`<div class="resultNotice warn">${esc(tr('resultCap',{n:arr.length}))}</div>`:''; const upcoming=arr.filter(r=>!r._inProgress);const underway=arr.filter(r=>r._inProgress);const underwayHtml=underway.length?`<div class="sectionSep">${esc(tr('sectionUnderway'))}</div>`+renderCardsWithDateSeparators(underway,60):'';root.innerHTML=nearNote+sundayNote+capNote+renderCardsWithDateSeparators(upcoming,60)+underwayHtml;
}
export function renderChips(){const root=$('#intentChips'); if(!root)return; const chips=[...(state.parsed.chips||[])].filter(c=>c.k!=='near'||state.near||locationRequestInFlight); const has=k=>chips.some(c=>c.k===k); if(state.near&&!has('near'))chips.unshift({k:'near',label:tr('quickNear')}); const day=effectiveDay(),mode=effectiveDayMode(),time=effectiveTime(); if(day&&!has('day'))chips.push({k:'day',label:mode==='today'?tr('today'):mode==='tomorrow'?tr('tomorrow'):mode==='sunday_obligation'?tr('sunday'):dayName(day)}); if(time&&!has('time'))chips.push({k:'time',label:tr(time)||time}); if(state.filters.region)chips.push({k:'region',label:state.filters.region}); if(effectiveType()==='all')chips.push({k:'type',label:tr('includeOther')}); if(state.filters.siteUid)chips.push({k:'site',label:tr('allTimes')}); root.innerHTML=chips.map(c=>`<span class="intentChip">${esc(c.label)}<button type="button" aria-label="Remove ${esc(c.label)}" data-chip="${esc(c.k)}">×</button></span>`).join('')}

export function renderStatic(){
  document.documentElement.lang=state.lang;
  $('#appTitle').innerHTML=esc(tr('title')).replace('\n','<br>');
  $('#appSubtitle').textContent=tr('subtitle');
  $('#searchLabel').textContent=tr('search');
  const skip=$('#skipToResults'); if(skip)skip.textContent=tr('skipResults');
  $('#searchInput').placeholder=tr('searchPh');
  const sh=$('#searchHint'); if(sh) sh.textContent=tr('searchHint');
  $('#clearSearch').textContent=tr('clear');
  $('#heroCount').textContent=`${state.rows.length} ${state.lang==='fr'?'horaires':'schedules'} · ${new Set(state.rows.map(r=>r.parish_uid)).size} ${state.lang==='fr'?'paroisses':'parishes'}`;
  $$('[data-t]').forEach(el=>el.textContent=tr(el.dataset.t));
  $('#filterTitle').textContent=tr('filters');
  $('#dayLabel').textContent=tr('day');
  $('#timeLabel').textContent=tr('time');
  $('#regionLabel').textContent=tr('region');
  $('#typeLabel').textContent=tr('type');
  $('#applyFilters').textContent=tr('showResults');
  $('#updateTitle').textContent=tr('updateTitle');
  $('#updateText').textContent=tr('updateText');
  $('#updateRefresh').textContent=tr('refresh');
  $('#updateDismiss').textContent=tr('later');
  $('#updateHelp')&&($('#updateHelp').textContent=tr('troubleUpdating'));
  $('#filterSheet')?.setAttribute('aria-label',tr('filterSheetLabel'));
  $('#detailSheet')?.setAttribute('aria-label',tr('detailSheetLabel'));
  $('#bottomNav')?.setAttribute('aria-label',tr('bottomNavLabel'));
  $('#closeFilters')?.setAttribute('aria-label',state.lang==='fr'?'Fermer les filtres':'Close filters');
  $('#closeDetail')?.setAttribute('aria-label',state.lang==='fr'?'Fermer les détails':'Close details');
  $('#langEn').classList.toggle('active',state.lang==='en');
  $('#langFr').classList.toggle('active',state.lang==='fr');
  updateSwipeAffordance();
}
export function renderTags(){
  const weekdayOrder=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
  const days=[['',tr('anyDay')],['__today',tr('today')],['__tomorrow',tr('tomorrow')],...weekdayOrder.map(d=>[d,dayName(d)])];
  const times=[['',tr('allDay')],['morning',tr('morning')],['afternoon',tr('afternoon')]];
  const regs=[['',tr('allRegions')],...[...new Set(state.rows.map(r=>r.region).filter(Boolean))].sort().map(x=>[x,x])];
  const types=[['mass',tr('massesOnly')],['all',tr('includeOther')]];
  const currentTime=effectiveTime(),currentType=effectiveType();
  const isActive=(key,v,val)=>{ if(key==='day')return isDayFilterActive(v); if(key==='time')return v===currentTime; if(key==='type')return v===currentType; return v===val};
  const build=(id,arr,val,key)=>{const el=$(id); if(!el)return; el.innerHTML=arr.map(([v,l])=>`<button class="tag ${isActive(key,v,val)?'active':''}" data-filter="${key}" data-value="${esc(v)}" type="button" aria-pressed="${isActive(key,v,val)?'true':'false'}">${esc(l)}</button>`).join('')};
  build('#dayTags',days,state.filters.day,'day'); build('#timeTags',times,state.filters.time,'time'); build('#regionTags',regs,state.filters.region,'region'); build('#typeTags',types,state.filters.type,'type');
}
export function activeFilterCount(){
  let n=0;
  if(effectiveDay())n++;
  if(state.parsed&&state.parsed.exact!=null)n++;
  else if(effectiveTime())n++;
  if(state.filters.region)n++;
  if(effectiveType()==='all')n++;
  if(state.filters.siteUid)n++;
  if(state.near)n++;
  return n;
}
export function updateFilterButton(){
  const btn=$('#openFilters'), badge=$('#filterCount'); if(!btn)return;
  const n=activeFilterCount();
  btn.classList.toggle('hasActiveFilters',n>0);
  btn.setAttribute('aria-label',n>0?`${tr('filters')} (${n})`:tr('filters'));
  if(badge){badge.textContent=n>0?String(n):''; badge.hidden=!n;}
}
export function renderDataNotice(){
  const el=$('#dataNotice'); if(!el)return;
  const show=!!state.dataStale&&!state.loadError;
  el.hidden=!show;
  el.textContent=show?tr('staleDataNotice'):'';
}
export function renderNav(){
  const day=effectiveDay(),mode=effectiveDayMode(),time=effectiveTime();
  $$('[data-nav]').forEach(b=>{
    const isActive=b.dataset.nav===state.mode || (state.mode==='home'&&b.dataset.nav==='home');
    b.classList.toggle('active',isActive);
    if(isActive)b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current');
  });
  $$('.pill').forEach(p=>{
    const active=(p.dataset.action==='near'&&state.near)||(p.dataset.action==='saved'&&state.mode==='saved')||(p.dataset.action==='morning'&&time==='morning')||(p.dataset.action==='afternoon'&&time==='afternoon')||(p.dataset.action==='today'&&mode==='today')||(p.dataset.action==='tomorrow'&&mode==='tomorrow')||(p.dataset.action==='sunday'&&day==='Dimanche'&&mode==='sunday_obligation');
    p.classList.toggle('active',!!active);
    if(['today','tomorrow','morning','afternoon','near','saved','sunday'].includes(p.dataset.action||''))p.setAttribute('aria-pressed',active?'true':'false');
  });
  updateFilterButton();
}
export function render(){compute(); renderStatic(); renderChips(); renderTags(); renderNav(); renderDataNotice(); renderNext(); renderResults(); renderMore(); renderFooter(); renderInstallOnboarding(); $('#resultsHead').hidden=state.mode==='more'; $('#searchBox').classList.toggle('hasText',!!state.query);}
