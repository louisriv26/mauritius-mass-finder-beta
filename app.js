
'use strict';
const APP_VERSION='27.2.26';
const CACHE_NAME='mmf-v27-2-26';
const NEAR_RADIUS_KM=12;
const DAYS=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const DAY_EN={Dimanche:'Sunday',Lundi:'Monday',Mardi:'Tuesday',Mercredi:'Wednesday',Jeudi:'Thursday',Vendredi:'Friday',Samedi:'Saturday'};
const DAY_FR={Dimanche:'Dimanche',Lundi:'Lundi',Mardi:'Mardi',Mercredi:'Mercredi',Jeudi:'Jeudi',Vendredi:'Vendredi',Samedi:'Samedi'};
const T={
 en:{title:'Mauritius\nMass Finder',subtitle:'Find a Mass quickly anywhere in Mauritius',search:'Search',searchPh:'afternoon Mass Curepipe, 18h, Saint Jean…',searchHint:'Try: afternoon Mass Curepipe.',clear:'Clear',quickNext:'Next Mass',quickToday:'Today',quickTomorrow:'Tomorrow',quickMorning:'Morning',quickNear:'Near me',quickAfternoon:'Afternoon',quickEvening:'Afternoon',quickSunday:'Sunday',quickSaved:'My Churches',filters:'Filters',showResults:'Show results',day:'Day',time:'Time of day',region:'Region',type:'Type',anyDay:'Any day',today:'Today',tomorrow:'Tomorrow',sunday:'Sunday',allDay:'All day',morning:'Morning',afternoon:'Afternoon',evening:'Afternoon',earlierToday:'Earlier today',closing:'Close',filterSheetLabel:'Filters',detailSheetLabel:'Mass details',bottomNavLabel:'Main navigation',allRegions:'All regions',massesOnly:'Masses only',includeOther:'Include other celebrations',nextMass:'Next Mass',nextUseful:'Next useful Mass',nearTitle:'Near Me',nearSub:'Within 12 km by default. Results are grouped by urgency, then ranked by true distance',sortedHintNear:'Near Me: grouped by urgency, then nearest first within each group',nearExpanded:'No nearby Mass found within 12 km. Showing results within 20 km.',savedTitle:'My Churches',savedSub:'Your saved churches with their next Mass',noSaved:'No saved churches yet',noSavedText:'Tap Add to My Churches on a Mass card to save a church here.',results:'results',result:'result',shown:'shown',directions:'Directions',share:'Share',save:'Add to My Churches',saved:'In My Churches',source:'Source',sourceParishPage:'Parent parish page — {parish}',allTimes:'Parish schedule',verified:'Verified',todayRel:'Today',tomorrowRel:'Tomorrow',inM:'in {n} min',inH:'in {h}h {m}m',now:'now',startedAgo:'Started {n} min ago · in progress',weekdayMass:'Weekday Mass',sundayMass:'Sunday Mass',satEve:'Saturday Mass — generally treated as Sunday obligation from 15:00',otherCelebration:'Other celebration',approx:'~{d} km',exact:'{d} km',noResults:'No matching Mass found',noResultsText:'Try removing a filter, widening the place, or using a simpler search.',locationAsk:'Allow location access to sort nearby Masses.',locationDenied:'Location was not available. Results remain sorted by next Mass.',nearUse:'Use my location',moreTitle:'Help & app information',helpTitle:'How to use this app',helpHtml:'<div class="faq"><p><b>Quick tips:</b> try “morning Mass Curepipe”, “afternoon Mass Curepipe”, “Wednesday afternoon”, or “18:00”. A few words are enough.</p><details open><summary>Finding a Mass</summary><p>Search by town, parish, church name, weekday, time, or simple keywords such as “morning Curepipe”, “Wednesday afternoon”, “afternoon Mass Curepipe”, “Curepipe 18:00”, or “saint jean”. Morning means before 12:00. Afternoon means 12:00 onward. You can also type “evening Mass”; the app will search afternoon Masses.</p></details><details><summary>Using filters</summary><p>Filters help you narrow results quickly. You can filter by day, time of day, region, and type of celebration.</p><p><b>Examples:</b> Today + Afternoon; Tomorrow + Morning; Region + Afternoon; Masses only / Include other celebrations.</p><p><b>Tip:</b> use filters when you want to browse. Use search when you already know a place or time.</p></details><details><summary>Near Me</summary><p>Near Me uses your device location to rank upcoming Masses. Approximate distances are shown with “~”.</p></details><details><summary>My Churches</summary><p>Add to My Churches saves the church/site so you can find its next Mass quickly. It does not save one single Mass occurrence. Saved churches normally remain after app updates.</p></details><details><summary>Other celebrations</summary><p>The default view shows Masses only. Prayer services, adoration, or ambiguous celebrations appear only when you include other celebrations.</p></details><details><summary>Saturday / Sunday</summary><p>Saturday Masses from 3:00 pm are generally treated as Sunday obligation. The app therefore includes them in Sunday Mass searches and filters.</p></details><details><summary>Sources and reliability</summary><p>Use Source to check the official parish or context page. If an item looks wrong, use Report an issue.</p></details><details><summary>Updates and offline use</summary><p>Use the update banner when it appears. Saved churches are stored on your device and normally survive updates. Offline mode uses the last available app data.</p></details></div>',trustTitle:'Trust note',trustText:'Mass times can change for feast days, funerals, cyclones, holidays or parish changes. Use the source link when timing is critical.',version:'Version',navHome:'Home',navNear:'Near me',navSaved:'My Churches',navMore:'More',updateTitle:'New version available',updateText:'Update to get the latest version.',refresh:'Update now',later:'Later',copied:'Link copied',shared:'Ready to share',shareAppTitle:'Mauritius Mass Finder',shareMassIntro:'Mass time',howUpdate:'How to update',troubleUpdating:'Having trouble updating?',about:'About',aboutTitle:'About this app',aboutHtml:'<p><b>Purpose:</b> Mauritius Mass Finder helps people quickly find Catholic Mass times across Mauritius.</p><p><b>Data and trust:</b> the schedule is based on the maintained project database compiled from official diocesan parish information and project corrections. Church schedules can still change at short notice.</p><p><b>Default view:</b> the app shows Masses only by default. Other celebrations, such as adoration or prayer services, are shown only when you choose to include them.</p><p><b>Corrections:</b> if a time looks wrong, use the source link or Report an issue so the database can be corrected.</p>',updateGuideTitle:'How to update the app',updateGuideHtml:'<p>When a new version is available, a message will appear:</p><p><b>→ New version available</b></p><p>Tap <b>Update now</b> to load the latest version.</p><p><b>If nothing happens:</b></p><ol><li>Close the app completely</li><li>Reopen it</li></ol><p><b>If the problem continues:</b></p><ul><li>remove the app from your home screen</li><li>add it again from your browser</li></ul>',swipeHint:'Swipe to see more',showingToday:'Showing: Today',showingTomorrow:'Showing: Tomorrow',showingSunday:'Showing: Sunday Masses (including Saturday Masses from 3:00 pm)',showingNear:'Showing: Near you',showingSaved:'Showing: My Churches',showingSearch:'Showing: Search results',showingSundayEvening:'Showing: Sunday Masses',usingLocation:'Using your location',locationNotEnabled:'Location not enabled',sortedHint:'Sorted by time, then distance',updateFallback:'If nothing happens, close and reopen the app.',reportIssue:'Report an issue',reportSubject:'Correction for Mauritius Mass Finder',reportBody:'Please check this Mass information:',resultCap:'Showing 60 of {n} — refine your search.',sundayExplain:'Saturday Masses from 3:00 pm are generally treated as Sunday obligation.',details:'Details',hideDetails:'Hide details',trustStrip:'{verified} · {source} · {precision}',sourceAvailable:'Official source available',approxLocation:'Approx. location',exactLocation:'Exact location',confidenceLow:'Lower confidence — check source',confidenceOk:'Confidence {score}%',onlyWhen:'{rule}',exceptWhen:'{rule}',ruleFirstFridayOnly:'First Friday of the month only',ruleExceptFirstFriday:'Every Friday except the first Friday of the month',ruleFirstSundayOnly:'First Sunday of the month only',ruleExceptFirstSunday:'Every Sunday except the first Sunday of the month',ruleEnglishFirstSunday:'English Mass on the first Sunday of the month',ruleMesseOuCelebration:'Ambiguous: Mass or celebration',ruleExposition:'Exposition of the Blessed Sacrament',ruleAdoration:'Adoration',notMassWarning:'Other celebration — not a Mass',parishSchedule:'Parish schedule',churchSchedule:'Church schedule',detailTitle:'Mass details',close:'Close',rule:'Rule',parish:'Parish',site:'Church',town:'Town',shareThisView:'Share this view',linkReady:'Share link ready',invalidLink:'Shared link could not be fully restored',installTab:'Install the app',installPromptTitle:'Install the app in 30 seconds',installPromptBody:'Add Mauritius Mass Finder to your Home Screen so you can open it like a real app, without searching for the link.',installPromptIphoneShort:'On iPhone: open this page in Safari, tap Share, then choose “Add to Home Screen”.',installPromptAndroidShort:'On Android: open this page in Chrome, tap ⋮, then choose “Install app” or “Add to Home screen”.',howInstall:'See the steps',installNow:'Install now',firstStandaloneTitle:'The app is installed',firstStandaloneBody:'You can now open Mauritius Mass Finder directly from your Home Screen. To get started, search for a town, a church, or a Mass time.',start:'Start',seeHowUse:'See how to use the app',iphoneInstallTitle:'On iPhone',iphoneInstallStep1:'Open this page in Safari.',iphoneInstallStep2:'Tap the Share button.',iphoneInstallStep3:'Choose “Add to Home Screen”.',iphoneInstallStep4:'Tap “Add”.',androidInstallTitle:'On Android',androidInstallStep1:'Open this page in Chrome.',androidInstallStep2:'Tap ⋮.',androidInstallStep3:'Choose “Add to Home screen” or “Install app”.',androidInstallStep4:'Confirm.',openSafariFirst:'To install the app on iPhone, first open this link in Safari.',browserUseNote:'You can also use this app in your browser. For phone use, open the link on your phone and add it to your Home Screen.',installedUseNote:'Ready to use from your Home Screen.',shareAppText:'Find a Mass quickly anywhere in Mauritius. Open the link and add it to your Home Screen for app-like access.',loadDataError:'We could not load the latest Mass data. Please check your connection and try again.',skipResults:'Skip to results',staleDataNotice:'Showing saved data — connect to check for updates.',error:'Something went wrong'},
 fr:{title:'Trouver une\nMesse à Maurice',subtitle:'Trouvez rapidement une messe à Maurice',search:'Recherche',searchPh:'messe après-midi Curepipe, 18h, Saint Jean…',searchHint:'Essayez : messe après-midi Curepipe.',clear:'Effacer',quickNext:'Prochaine messe',quickToday:'Aujourd’hui',quickTomorrow:'Demain',quickMorning:'Matin',quickNear:'Près de moi',quickAfternoon:'Après-midi',quickEvening:'Après-midi',quickSunday:'Dimanche',quickSaved:'Mes églises',filters:'Filtres',showResults:'Afficher les résultats',day:'Jour',time:'Moment',region:'Région',type:'Type',anyDay:'Tous les jours',today:'Aujourd’hui',tomorrow:'Demain',sunday:'Dimanche',allDay:'Toute la journée',morning:'Matin',afternoon:'Après-midi',evening:'Après-midi',earlierToday:'Plus tôt aujourd’hui',closing:'Fermer',filterSheetLabel:'Filtres',detailSheetLabel:'Détails de la messe',bottomNavLabel:'Navigation principale',allRegions:'Toutes les régions',massesOnly:'Messes uniquement',includeOther:'Inclure autres célébrations',nextMass:'Prochaine messe',nextUseful:'Prochaine messe utile',nearTitle:'Près de moi',nearSub:'Dans un rayon de 12 km par défaut. Les résultats sont groupés par urgence, puis classés par vraie distance',sortedHintNear:'Près de moi : groupé par urgence, puis plus proche d’abord dans chaque groupe',nearExpanded:'Aucune messe trouvée à moins de 12 km. Affichage des résultats à moins de 20 km.',savedTitle:'Mes églises',savedSub:'Vos églises enregistrées avec leur prochaine messe',noSaved:'Aucune église enregistrée',noSavedText:'Appuyez sur Ajouter à Mes églises pour enregistrer une église ici.',results:'résultats',result:'résultat',shown:'affichés',directions:'Itinéraire',share:'Partager',save:'Ajouter à Mes églises',saved:'Dans Mes églises',source:'Source',sourceParishPage:'Page de la paroisse mère — {parish}',allTimes:'Horaires de la paroisse',verified:'Vérifié',todayRel:'Aujourd’hui',tomorrowRel:'Demain',inM:'dans {n} min',inH:'dans {h}h {m}m',now:'maintenant',startedAgo:'Commencée il y a {n} min · en cours',weekdayMass:'Messe de semaine',sundayMass:'Messe du dimanche',satEve:'Messe du samedi — généralement messe anticipée du dimanche à partir de 15h',otherCelebration:'Autre célébration',approx:'~{d} km',exact:'{d} km',noResults:'Aucune messe trouvée',noResultsText:'Essayez de retirer un filtre, d’élargir le lieu ou d’utiliser une recherche plus simple.',locationAsk:'Autorisez la localisation pour trier les messes proches.',locationDenied:'La localisation n’est pas disponible. Les résultats restent triés par prochaine messe.',nearUse:'Utiliser ma localisation',moreTitle:'Aide et informations',helpTitle:'Comment utiliser cette application',helpHtml:'<div class="faq"><p><b>Conseils rapides :</b> essayez « messe matin Curepipe », « messe après-midi Curepipe », « mercredi après-midi » ou « 18h ». Quelques mots suffisent.</p><details open><summary>Trouver une messe</summary><p>Recherchez par ville, paroisse, nom d’église, jour, heure ou mots simples comme « matin Curepipe », « mercredi après-midi », « messe après-midi Curepipe », « Curepipe 18h » ou « saint jean ». Matin signifie avant 12h. Après-midi signifie à partir de 12h. Vous pouvez aussi écrire « messe du soir » : l’application cherchera les messes de l’après-midi.</p></details><details><summary>Utiliser les filtres</summary><p>Les filtres vous aident à réduire rapidement les résultats. Vous pouvez filtrer par jour, moment de la journée, région et type de célébration.</p><p><b>Exemples :</b> Aujourd’hui + Après-midi ; Demain + Matin ; Région + Après-midi ; Messes uniquement / Inclure les autres célébrations.</p><p><b>Conseil :</b> utilisez les filtres pour parcourir les résultats. Utilisez la recherche si vous connaissez déjà un lieu ou un horaire.</p></details><details><summary>Près de moi</summary><p>Près de moi utilise la localisation de votre appareil pour classer les prochaines messes. Les distances approximatives sont affichées avec « ~ ».</p></details><details><summary>Mes églises</summary><p>Ajouter à Mes églises enregistre l’église ou le lieu pour retrouver rapidement sa prochaine messe. Cela n’enregistre pas une seule occurrence de messe. Les églises enregistrées restent normalement après les mises à jour.</p></details><details><summary>Autres célébrations</summary><p>Par défaut, l’application affiche uniquement les messes. Les temps de prière, adorations ou célébrations ambiguës apparaissent seulement si vous choisissez d’inclure les autres célébrations.</p></details><details><summary>Samedi / dimanche</summary><p>Les messes du samedi à partir de 15h sont généralement traitées comme messes anticipées du dimanche. L’application les inclut donc dans les recherches et filtres du dimanche.</p></details><details><summary>Sources et fiabilité</summary><p>Utilisez Source pour vérifier la page officielle ou la page de contexte de la paroisse. Si une information semble incorrecte, utilisez Signaler un problème.</p></details><details><summary>Mises à jour et mode hors ligne</summary><p>Utilisez la bannière de mise à jour lorsqu’elle apparaît. Les églises enregistrées sont stockées sur votre appareil et restent normalement après les mises à jour. Le mode hors ligne utilise les dernières données disponibles.</p></details></div>',trustTitle:'Note de confiance',trustText:'Les horaires peuvent changer en cas de fêtes, funérailles, cyclones, jours fériés ou changement paroissial. Utilisez le lien source lorsque l’horaire est important.',version:'Version',navHome:'Accueil',navNear:'Près de moi',navSaved:'Mes églises',navMore:'Plus',updateTitle:'Nouvelle version disponible',updateText:'Actualisez pour obtenir la dernière version.',refresh:'Actualiser',later:'Plus tard',copied:'Lien copié',shared:'Prêt à partager',shareAppTitle:'Trouver une Messe à Maurice',shareMassIntro:'Horaire de messe',howUpdate:'Comment mettre à jour',troubleUpdating:'Problème de mise à jour ?',about:'À propos',aboutTitle:'À propos de cette application',aboutHtml:'<p><b>Objectif :</b> Trouver une Messe à Maurice aide à trouver rapidement les horaires des messes catholiques à Maurice.</p><p><b>Données et confiance :</b> les horaires viennent de la base de données du projet, établie à partir des informations paroissiales officielles du diocèse et des corrections vérifiées du projet. Les horaires peuvent toutefois changer à court terme.</p><p><b>Affichage par défaut :</b> l’application affiche uniquement les messes par défaut. Les autres célébrations, comme l’adoration ou les temps de prière, apparaissent seulement si vous choisissez de les inclure.</p><p><b>Corrections :</b> si un horaire semble incorrect, utilisez le lien source ou Signaler un problème afin que la base puisse être corrigée.</p>',updateGuideTitle:'Comment mettre à jour l’application',updateGuideHtml:'<p>Lorsqu’une nouvelle version est disponible, un message s’affiche :</p><p><b>→ Nouvelle version disponible</b></p><p>Appuyez sur <b>Actualiser</b> pour charger la dernière version.</p><p><b>Si cela ne fonctionne pas :</b></p><ol><li>Fermez complètement l’application</li><li>Rouvrez-la</li></ol><p><b>Si le problème persiste :</b></p><ul><li>supprimez l’application de votre écran d’accueil</li><li>ajoutez-la à nouveau depuis le navigateur</li></ul>',swipeHint:'Faites glisser pour voir plus',showingToday:'Affichage : Aujourd’hui',showingTomorrow:'Affichage : Demain',showingSunday:'Affichage : Messes du dimanche (y compris les messes du samedi à partir de 15h)',showingNear:'Affichage : Près de vous',showingSaved:'Affichage : Mes églises',showingSearch:'Affichage : Résultats de recherche',showingSundayEvening:'Affichage : Messes du dimanche',usingLocation:'Utilisation de votre position',locationNotEnabled:'Localisation non activée',sortedHint:'Trié par heure, puis distance',updateFallback:'Si rien ne se passe, fermez puis rouvrez l’application.',reportIssue:'Signaler un problème',reportSubject:'Correction pour Trouver une Messe à Maurice',reportBody:'Merci de vérifier cette information de messe :',resultCap:'60 résultats affichés sur {n} — affinez votre recherche.',sundayExplain:'À Maurice, les messes du samedi à partir de 15h sont généralement des messes anticipées du dimanche.',details:'Détails',hideDetails:'Masquer les détails',trustStrip:'{verified} · {source} · {precision}',sourceAvailable:'Source officielle disponible',approxLocation:'Localisation approx.',exactLocation:'Localisation exacte',confidenceLow:'Confiance plus faible — vérifiez la source',confidenceOk:'Confiance {score}%',onlyWhen:'{rule}',exceptWhen:'{rule}',ruleFirstFridayOnly:'Premier vendredi du mois seulement',ruleExceptFirstFriday:'Tous les vendredis sauf le premier vendredi du mois',ruleFirstSundayOnly:'Premier dimanche du mois seulement',ruleExceptFirstSunday:'Tous les dimanches sauf le premier dimanche du mois',ruleEnglishFirstSunday:'Messe en anglais le premier dimanche du mois',ruleMesseOuCelebration:'Ambigu : messe ou célébration',ruleExposition:'Exposition du Saint-Sacrement',ruleAdoration:'Adoration',notMassWarning:'Autre célébration — pas une messe',parishSchedule:'Horaires de la paroisse',churchSchedule:'Horaires de cette église',detailTitle:'Détails de la messe',close:'Fermer',rule:'Condition',parish:'Paroisse',site:'Église',town:'Ville',shareThisView:'Partager cette vue',linkReady:'Lien de partage prêt',invalidLink:'Le lien partagé n’a pas pu être entièrement restauré',installTab:'Installer l’application',installPromptTitle:'Installer l’app en 30 secondes',installPromptBody:'Ajoutez Mauritius Mass Finder à votre écran d’accueil pour l’ouvrir comme une vraie app, sans devoir rechercher le lien.',installPromptIphoneShort:'Sur iPhone : ouvrez cette page dans Safari, appuyez sur Partager, puis choisissez « Ajouter à l’écran d’accueil ».',installPromptAndroidShort:'Sur Android : ouvrez cette page dans Chrome, appuyez sur ⋮, puis choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».',howInstall:'Voir les étapes',installNow:'Installer maintenant',firstStandaloneTitle:'L’app est installée',firstStandaloneBody:'Vous pouvez maintenant ouvrir Mauritius Mass Finder directement depuis votre écran d’accueil. Pour commencer, recherchez une ville, une église ou une heure de messe.',start:'Commencer',seeHowUse:'Voir comment utiliser l’app',iphoneInstallTitle:'Sur iPhone',iphoneInstallStep1:'Ouvrez cette page dans Safari.',iphoneInstallStep2:'Appuyez sur le bouton Partager.',iphoneInstallStep3:'Choisissez « Ajouter à l’écran d’accueil ».',iphoneInstallStep4:'Appuyez sur « Ajouter ».',androidInstallTitle:'Sur Android',androidInstallStep1:'Ouvrez cette page dans Chrome.',androidInstallStep2:'Appuyez sur ⋮.',androidInstallStep3:'Choisissez « Ajouter à l’écran d’accueil » ou « Installer l’application ».',androidInstallStep4:'Confirmez.',openSafariFirst:'Pour installer l’app sur iPhone, ouvrez d’abord ce lien dans Safari.',browserUseNote:'Vous pouvez aussi utiliser cette application dans votre navigateur. Pour l’utiliser sur téléphone, ouvrez le lien sur votre téléphone et ajoutez-la à l’écran d’accueil.',installedUseNote:'Prête à être utilisée depuis votre écran d’accueil.',shareAppText:'Trouvez rapidement une messe à Maurice. Ouvrez le lien et ajoutez-le à votre écran d’accueil pour l’utiliser comme une app.',loadDataError:'Impossible de charger les derniers horaires de messe. Vérifiez votre connexion puis réessayez.',skipResults:'Aller aux résultats',staleDataNotice:'Données enregistrées — connectez-vous pour vérifier les mises à jour.',error:'Une erreur est survenue'}
};
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
function storageGet(key,fallback=null){try{const v=localStorage.getItem(key);return v==null?fallback:v}catch(e){return fallback}}
function storageSet(key,value){try{localStorage.setItem(key,value);return true}catch(e){return false}}
function storageRemove(key){try{localStorage.removeItem(key);return true}catch(e){return false}}
const DEFAULT_FILTERS={day:'',dayMode:'',time:'',region:'',type:'mass',siteUid:''};
const state={query:'',parsed:{},filters:{...DEFAULT_FILTERS},location:null,near:false,nearExpanded:false,nearScope:'',mode:'home',moreSection:'help',modal:null,saved:new Set(),lang:'en',rows:[],results:[],next:null,loadError:'',dataStale:false,dataSource:'',detailRow:null};
function getState(){return state}
function setState(patch={},options={}){
  Object.entries(patch).forEach(([key,value])=>{
    if(key==='filters')state.filters={...state.filters,...value};
    else state[key]=value;
  });
  if(options.syncInput!==false&&Object.prototype.hasOwnProperty.call(patch,'query')){const input=$('#searchInput'); if(input)input.value=state.query||''}
  if(options.url)history.replaceState(null,'',stateUrl());
  if(options.render!==false)render();
}
function setFilters(patch={},options={}){setState({filters:patch},options)}
function setMode(mode,patch={},options={}){setState({mode,...patch},options)}
function tr(k,v={}){return String((T[state.lang]&&T[state.lang][k])||T.en[k]||k).replace(/\{(\w+)\}/g,(_,x)=>v[x]??'')}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[œŒ]/g,'oe').toLowerCase().replace(/[’'`´-]/g,' ').replace(/\b(st)\b/g,'saint').replace(/\b(ste)\b/g,'sainte').replace(/\b(nd)\b/g,'notre dame').replace(/[^a-z0-9]+/g,' ').trim()}
function normaliseSearchText(text){return normaliseCommonTypos(norm(text))}
function normaliseCommonTypos(s){return String(s||'').replace(/\bcurpipe\b/g,'curepipe').replace(/\bcurepype\b/g,'curepipe').replace(/\bquatrebornes\b/g,'quatre bornes').replace(/\bportlouis\b/g,'port louis').replace(/\bbeaubassin\b/g,'beau bassin').replace(/\brosehill\b/g,'rose hill').replace(/\bmahebourg\b/g,'mahebourg').replace(/\bmaheburg\b/g,'mahebourg').replace(/\bgrandbaie\b/g,'grand baie').replace(/\bgrandgaube\b/g,'grand gaube').replace(/\bflac\b/g,'flacq')}
function parseExactTimeRaw(q){const raw=String(q||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); const m=raw.match(/\b(\d{1,2})\s*(?::|h)\s*(\d{2})\s*(am|pm)?\b|\b(\d{1,2})\s*h\b|\b(\d{1,2})\s*(am|pm)\b/); if(!m)return null; let h=+(m[1]||m[4]||m[5]), min=m[2]?+m[2]:0, ap=m[3]||m[6]||''; if(ap==='pm'&&h<12)h+=12; if(ap==='am'&&h===12)h=0; return h<24&&min<60?{minutes:h*60+min,label:`${String(h).padStart(2,'0')}:${String(min).padStart(2,'0')}`}:null}
function bool(v){return v===true||String(v).toLowerCase()==='true'}
function mins(t){const m=String(t||'').match(/(\d{1,2}):(\d{2})/);return m?+m[1]*60+ +m[2]:9999}
function rowActive(r){return bool(r.is_active)!==false}
function rowMass(r){return bool(r.is_mass_only_visible)||String(r.mass_category||r.service_type).toLowerCase()==='mass'}
function rowLat(r){const x=parseFloat(r.latitude);return Number.isFinite(x)?x:null}
function rowLon(r){const x=parseFloat(r.longitude);return Number.isFinite(x)?x:null}
function rawSiteName(r){return r.site_name||r.display_site_label||r.parish_label||r.parish_name||''}
function siteName(r){return rawSiteName(r)}
function visibleSiteName(r){
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
function dayName(d){return (state.lang==='fr'?DAY_FR:DAY_EN)[d]||d}
function getMauritiusNow(base=new Date()){return new Date(base.toLocaleString('en-US',{timeZone:'Indian/Mauritius'}))}
function mauritiusNow(base=new Date()){return getMauritiusNow(base)}
function todayName(offset=0,base=mauritiusNow()){const d=new Date(base);d.setDate(d.getDate()+offset);return DAYS[d.getDay()]}
function normalizeUrlDayValue(raw){
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
function normalizeUrlTimeValue(raw){
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
function appendExactTimeToQuery(q,label){
  const base=String(q||'').trim();
  const existing=parseExactTimeRaw(base);
  if(existing)return base;
  return (base?base+' ':'')+label;
}
function parseMassTime(row){return mins(row&&row.time_24h)}
function isSaturdayEveningMass(row){return row&&row.day_of_week==='Samedi'&&parseMassTime(row)>=900}
function isSundayEligible(r){return r.day_of_week==='Dimanche'||isSaturdayEveningMass(r)}
function countsForSundayContext(row,now=mauritiusNow()){return isSundayEligible(row)}
function massGraceMinutes(row){
  if(!rowMass(row))return 0;
  return (row.day_of_week==='Dimanche'||row.day_of_week==='Samedi')?60:45;
}
function minutesSinceStart(row,now=mauritiusNow()){
  if(!row||row.day_of_week!==todayName(0,now))return null;
  return now.getHours()*60+now.getMinutes()-parseMassTime(row);
}
function isInProgressMass(row,now=mauritiusNow()){
  const elapsed=minutesSinceStart(row,now);
  return elapsed!=null&&elapsed>0&&elapsed<=massGraceMinutes(row);
}
function dateSerial(d){return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000)}
function weekOfMonth(d){return Math.floor((d.getDate()-1)/7)+1}
function isLastWeekdayOfMonth(d){const x=new Date(d);x.setDate(x.getDate()+7);return x.getMonth()!==d.getMonth()}
function isOccurrenceRuleCandidate(t){
  t=norm(t||''); if(!t)return false;
  if(/adoration|exposition|celebration|celebration de la parole|messe ou celebration|prayer|chapelet|rosary/.test(t))return false;
  if(/english|anglais/.test(t)&&!(/only/.test(t)||/except/.test(t)))return false;
  return /first|second|third|fourth|last|except|every two weeks|fortnight|1st|2nd|3rd|4th|premier|deuxieme|troisieme|quatrieme|dernier/.test(t);
}
function occurrenceText(r){
  if(r.occurrence_rule)return String(r.occurrence_rule||'').trim();
  const sr=String(r.special_rule||'').trim();
  return isOccurrenceRuleCandidate(sr)?sr:'';
}
function hasCalendarRule(r){return !!occurrenceText(r)}
function isRuleValidForDate(r,d){
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

function addDays(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x}
function dateContextFor(p,now=mauritiusNow(),st=state){
  p=p||{};
  const mode=(st&&st.filters&&st.filters.dayMode)||'';
  if(p.day==='today')return {date:addDays(now,0),label:'today'};
  if(p.day==='tomorrow')return {date:addDays(now,1),label:'tomorrow'};
  if(DAYS.includes(p.day))return null;
  if(mode==='today')return {date:addDays(now,0),label:'today'};
  if(mode==='tomorrow')return {date:addDays(now,1),label:'tomorrow'};
  return null;
}
function isValidForDateContext(r,ctx){return !ctx||isRuleValidForDate(r,ctx.date)}

function nextDelta(r,now=mauritiusNow()){
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
function getNextOccurrence(row,now=mauritiusNow()){const delta=nextDelta(row,now); if(delta>=999999)return null; const d=new Date(now); d.setMinutes(d.getMinutes()+delta); return d}
function isPastMass(row,now=mauritiusNow()){
  const elapsed=minutesSinceStart(row,now);
  return elapsed!=null&&elapsed>massGraceMinutes(row);
}
function getNextMass(rows,now=mauritiusNow(),st=state){const arr=(rows||[]).filter(rowActive).filter(r=>st.filters?.type==='all'||rowMass(r)).map(r=>annotateRowForRanking(r,now,st)).filter(r=>r._actionable); return rankResults(arr,{near:!!st.near,now})[0]||null}
function rel(delta,now=mauritiusNow()){
  if(delta>=999999)return '';
  if(delta<0)return tr('startedAgo',{n:Math.abs(delta)});
  if(delta<=1)return tr('now');
  const target=new Date(now); target.setMinutes(target.getMinutes()+delta);
  const dayDiff=dateSerial(target)-dateSerial(now);
  if(dayDiff===0){if(delta<60)return tr('inM',{n:delta}); const h=Math.floor(delta/60),m=delta%60; return tr('inH',{h,m});}
  if(dayDiff===1)return tr('tomorrowRel');
  if(delta<60)return tr('inM',{n:delta});
  if(delta<1440){const h=Math.floor(delta/60),m=delta%60; return tr('inH',{h,m});}
  return dayName(DAYS[target.getDay()])
}
function distKm(a,b,c,d){if([a,b,c,d].some(x=>!Number.isFinite(+x)))return null; const R=6371,rad=x=>x*Math.PI/180; const dLat=rad(c-a),dLon=rad(d-b); const A=Math.sin(dLat/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(A))}
function isExactCoordinate(r){return ['exact_door','exact_building','exact_compound'].includes(String(r.coordinate_precision||''));}
function distanceLabel(r,d=null){const val=d??(state.location?distKm(state.location.lat,state.location.lon,rowLat(r),rowLon(r)):null); if(val==null)return ''; const key=(isExactCoordinate(r)?'exact':'approx'); return tr(key,{d:val.toFixed(val<10?1:0)})}

function semanticReplaceNormalized(text,patterns){
  let s=' '+normaliseSearchText(text)+' ';
  (patterns||[]).sort((a,b)=>b.length-a.length).forEach(p=>{
    const q=' '+normaliseSearchText(p)+' ';
    if(!q.trim())return;
    s=s.split(q).join(' ');
  });
  return s.replace(/\s+/g,' ').trim();
}
function hasAnyPhrase(n,phrases){
  const s=' '+normaliseSearchText(n)+' ';
  return phrases.some(p=>s.includes(' '+normaliseSearchText(p)+' '));
}
function isEnglishIntentText(n){return hasAnyPhrase(n,['english mass','mass in english','messe en anglais','messe anglais','messe anglaise','english','anglais'])}
function isFirstFridayIntentText(n){return hasAnyPhrase(n,['first friday','1st friday','premier vendredi','1er vendredi','messe 1er vendredi'])}
function isNearIntentText(n){
  const s=' '+normaliseSearchText(n)+' ';
  if(hasAnyPhrase(s,['near me','nearby mass','mass nearby','nearby','closest mass','mass closest to me','around me','close to me','mass close to me','pres de moi','près de moi','proche de moi','a proximite','à proximité','aux alentours','autour de moi']))return true;
  // French users often say “messe proche maintenant”; treat “proche” as current-location intent only when no explicit place remains.
  if(/\b(proche|proximite|proximité)\b/.test(s)&&/\b(messe|mass|maintenant|now)\b/.test(s)&&!/(curepipe|port louis|quatre bornes|rose hill|vacoas|floreal|floréal|mahebourg|mahébourg|grand baie|beau bassin|moka|goodlands|triolet|souillac|flic en flac|bambous|riviere|rivière|plaines|wilhems)\b/.test(s))return true;
  // Do not treat “Mass near Curepipe” as current-location Near Me; that is a place search.
  return false;
}
function isEveningIntentText(n){return hasAnyPhrase(n,['evening','soir','soiree','soirée','tonight','ce soir'])}
function removeNearIntentFromQuery(q){
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
function preservedVisibleQueryWithoutNear(q){
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
function rowIsEnglish(r){const txt=normaliseSearchText([r.language_code,r.language,r.special_rule,r.notes,r.qualifier,r.search_text].join(' ')); return /\ben\b/.test(String(r.language_code||'').toLowerCase())||txt.includes('english')||txt.includes('anglais')}
function rowIsFirstFriday(r){
  const txt=normaliseSearchText([r.occurrence_rule,r.special_rule].filter(Boolean).join(' '));
  if(!txt)return false;
  if(txt.includes('except first friday')||txt.includes('sauf premier vendredi')||txt.includes('sauf 1er vendredi'))return false;
  return txt.includes('first friday')||txt.includes('premier vendredi')||txt.includes('1er vendredi')
}

function stripStopwords(text){const stop=/\b(this|in|at|on|for|to|i|want|need|find|show|get|please|me|a|an|the|mass|masses|church|churches|du|de|des|le|la|les|l|au|aux|d|en|ce|cet|cette|dans|pour|je|veux|cherche|trouver|montre|moi|une|un|messe|messes|eglise|eglises|near|nearby|closest|close|around|pres|près|now|maintenant|proche|proximite|proximité|autour|anglais|english)\b/g;return String(text||'').replace(stop,' ').replace(/\s+/g,' ').trim()}
function parseUserIntent(q){
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
function parseQuery(q){return parseUserIntent(q)}
function matchesText(r,p){
  if(p&&p.lang==='EN'&&!rowIsEnglish(r))return false;
  if(p&&p.firstFriday&&!rowIsFirstFriday(r))return false;
  if(!p.place)return true;
  const hay=normaliseSearchText([r.search_text,r.region,r.town,r.parish_name,r.parish_label,r.site_name,r.maps_query].join(' '));
  return p.place.split(' ').filter(Boolean).every(t=>hay.includes(t))
}
function matchesTime(r,b,p={}){
  const m=mins(r.time_24h); if(!b)return true;
  if(b==='morning')return m<720;
  if(b==='afternoon')return m>=720;
  if(b==='evening')return m>=720;
  return true
}
function matchesExact(r,ex,tolerance=15){if(ex==null)return true; return Math.abs(mins(r.time_24h)-ex)<=tolerance}
function effectiveDayMode(){
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
function effectiveDay(){
  const p=state.parsed||{};
  if(p.day==='today')return todayName(0);
  if(p.day==='tomorrow')return todayName(1);
  if(DAYS.includes(p.day))return p.day;
  if(state.filters.dayMode==='today')return todayName(0);
  if(state.filters.dayMode==='tomorrow')return todayName(1);
  if(state.filters.day)return state.filters.day;
  return ''
}
function cleanVisibleQuery(q){
  let s=normaliseSearchText(q);
  s=semanticReplaceNormalized(s,['mass','messe','church','eglise','église']);
  s=stripStopwords(s);
  return s.replace(/\s+/g,' ').trim()
}
function removeQueryIntent(q,k){
  if(k==='near')return preservedVisibleQueryWithoutNear(q);
  let s=String(q||'');
  if(k==='day')s=semanticReplaceNormalized(s,['today','aujourd hui','maintenant','now','tomorrow','demain','monday','lundi','tuesday','mardi','wednesday','mercredi','thursday','jeudi','friday','vendredi','saturday','samedi','sunday','dimanche']);
  if(k==='time')s=semanticReplaceNormalized(s,['evening','soir','soiree','soirée','tonight','ce soir','morning','matin','afternoon','apres midi','après-midi']).replace(/\b\d{1,2}(?:h|:)?\d{0,2}\s*(pm|am)?\b/gi,' ');
  if(k==='lang')s=semanticReplaceNormalized(s,['english mass','mass in english','messe en anglais','messe anglais','messe anglaise','english','anglais']);
  if(k==='rule')s=semanticReplaceNormalized(s,['first friday','1st friday','premier vendredi','1er vendredi','messe 1er vendredi']);
  return cleanVisibleQuery(s)
}
function resetFilters(options={}){setState({filters:{...DEFAULT_FILTERS}},options)}
function isDayFilterActive(value){
  const day=effectiveDay(), mode=effectiveDayMode();
  if(!value)return !day;
  if(value==='__today')return mode==='today';
  if(value==='__tomorrow')return mode==='tomorrow';
  if(value==='Dimanche')return day==='Dimanche'&&(mode==='sunday_obligation'||mode==='calendar');
  return day===value&&mode!=='today'&&mode!=='tomorrow';
}
function isTimeFilterActive(value){return (value||'')===(effectiveTime()||'')}
function applyFilter(key,value,options={url:true}){
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
function toggleQuickDay(value){
  if(isDayFilterActive(value))clearIntent('day',{url:true});
  else applyFilter('day',value,{url:true});
}
function toggleQuickTime(value){
  if(isTimeFilterActive(value))clearIntent('time',{url:true});
  else applyFilter('time',value,{url:true});
}
function toggleNearMode(){
  if(state.near){clearIntent('near',{url:true});return}
  setState({mode:'near',near:true,nearExpanded:false,nearScope:''},{url:true});
  if(!state.location)requestLocation();
}
function clearIntent(k,options={url:true}){
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
function clearFilter(key,options={url:true}){return clearIntent(key,options)}
function clearAllFilters(options={}){return setState({query:'',filters:{...DEFAULT_FILTERS},near:false,nearExpanded:false,nearScope:'',mode:'home'},options)}
function effectiveTime(){const p=state.parsed||{}; if(p.exact!=null)return ''; if(p.time)return p.time; return state.filters.time||''}
function effectiveType(){return state.filters.type||'mass'}

function currentContextLabel(){
  if(state.mode==='near')return tr('showingNear');
  if(state.mode==='saved')return tr('showingSaved');
  const p=state.parsed||{}; const day=effectiveDay(); const mode=effectiveDayMode();
  if(day===todayName(0)&&(mode==='calendar'||mode==='today'))return tr('showingToday');
  if(day===todayName(1)&&(mode==='calendar'||mode==='tomorrow'))return tr('showingTomorrow');
  if(day==='Dimanche'&&mode==='sunday_obligation')return tr('showingSunday');
  if(state.query||state.filters.region||state.filters.time||state.filters.siteUid)return tr('showingSearch');
  return '';
}
function markSwipeHintSeen(){
  storageSet('mmf_swipe_hint_seen','1');
  document.body.classList.add('quickHintSeen');
}
function updateSwipeAffordance(){
  const row=$('#quickRow'), scroller=$('#quickScroller'), hint=$('#swipeHint'); if(!row||!scroller||!hint)return;
  const overflow=row.scrollWidth>row.clientWidth+4; const atEnd=row.scrollLeft+row.clientWidth>=row.scrollWidth-6; const seen=storageGet('mmf_swipe_hint_seen')==='1';
  scroller.classList.toggle('hasOverflow',overflow&&!atEnd&&!seen);
  document.body.classList.toggle('quickHintSeen',seen||!overflow);
  hint.textContent=(!seen&&overflow)?tr('swipeHint'):'';
}

function annotateRowForRanking(r,now=mauritiusNow(),st=state){
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
function rankGroup(r){return r._inProgress?1:0}
function nearActionGroup(r,now=mauritiusNow()){
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
function effectiveNearDistance(r){
  const d=(r._dist??9999);
  let penalty=0;
  const score=confidenceScore(r);
  if(score!=null&&score<70)penalty+=1.5;
  if(!isExactCoordinate(r))penalty+=0.5;
  return d+Math.min(2.0,penalty);
}
function nearTieDistance(a,b){
  const real=(a._dist??9999)-(b._dist??9999);
  if(Math.abs(real)>0.25)return real;
  return effectiveNearDistance(a)-effectiveNearDistance(b);
}
function rankResults(arr,{near=false,now=mauritiusNow()}={}){
  return arr.sort((a,b)=> near
    ? ((nearActionGroup(a,now)-nearActionGroup(b,now))||nearTieDistance(a,b)||(Math.max(0,a._delta)-Math.max(0,b._delta))||siteName(a).localeCompare(siteName(b)))
    : ((rankGroup(a)-rankGroup(b))||(Math.max(0,a._delta)-Math.max(0,b._delta))||siteName(a).localeCompare(siteName(b)))
  );
}
function nearScopeNotice(scope=state.nearScope){
  if(scope==='20')return state.lang==='fr'?'Aucune messe trouvée à moins de 12 km. Affichage des résultats à moins de 20 km.':'No nearby Mass found within 12 km. Showing results within 20 km.';
  if(scope==='all')return state.lang==='fr'?'Aucune messe trouvée à moins de 20 km. Affichage des prochaines messes disponibles.':'No nearby Mass found within 20 km. Showing the next available Masses.';
  return '';
}
function nearRecommendationLabel(r,scope=state.nearScope,now=mauritiusNow()){
  if(!r)return '';
  if(scope==='20')return state.lang==='fr'?'Aucune messe à moins de 12 km — recherche élargie':'No Mass within 12 km — expanded search';
  if(scope==='all')return state.lang==='fr'?'Aucune messe à moins de 20 km — affichage des prochaines messes disponibles':'No Mass within 20 km — showing next available Masses';
  const g=nearActionGroup(r,now);
  if(g===0)return state.lang==='fr'?'Messe la plus proche qui commence bientôt':'Nearest Mass starting soon';
  if(g===1||g===2)return state.lang==='fr'?'Messe la plus proche aujourd’hui':'Closest Mass today';
  if(g===3)return state.lang==='fr'?'Messe la plus proche demain':'Closest Mass tomorrow';
  return state.lang==='fr'?'Aucune messe proche bientôt — affichage de l’option la plus proche plus tard':'No nearby Mass soon — showing nearest later option';
}
function _effectiveDayModeFor(st,p){
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
function _effectiveDayFor(st,p,now=mauritiusNow()){
  p=p||{};
  if(p.day==='today')return todayName(0,now);
  if(p.day==='tomorrow')return todayName(1,now);
  if(DAYS.includes(p.day))return p.day;
  if(st.filters.dayMode==='today')return todayName(0,now);
  if(st.filters.dayMode==='tomorrow')return todayName(1,now);
  if(st.filters.day)return st.filters.day;
  return ''
}
function _effectiveTimeFor(st,p){
  p=p||{};
  if(p.exact!=null)return '';
  if(p.time)return p.time;
  return st.filters.time||''
}
function _effectiveTypeFor(st){return st.filters.type||'mass'}
function applyFilters(rows,st=state,now=mauritiusNow()){
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
    arr=exactClose.length?exactClose:textMatched.filter(r=>matchesExact(r,p.exact,45));
  } else arr=textMatched;
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
function getVisibleResults(st=state,now=mauritiusNow()){
  const parsed=parseUserIntent(st.query||'');
  const shadow={...st,parsed};
  const results=applyFilters(shadow.rows,shadow,now);
  return {parsed,results,nearScope:shadow.nearScope||''};
}
function applySearchAndFilters(){
  const now=mauritiusNow();
  const visible=getVisibleResults(state,now);
  state.parsed=visible.parsed;
  state.results=visible.results;
  state.nearScope=visible.nearScope||'';
  state.next=getNextMass(visible.results,now,state);
}
function compute(){return applySearchAndFilters()}
function mapsUrl(r){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(r.maps_query||[siteName(r),r.town,r.parish_name,'Mauritius'].filter(Boolean).join(', '))}
function sourceBadge(r){const dt=r.last_verified||r.last_checked||''; return dt?`${tr('verified')} ${dt.slice(0,7)}`:''}
function massBadge(r){if(!rowMass(r))return tr('otherCelebration'); if(r.day_of_week==='Dimanche')return tr('sundayMass'); if(countsForSundayContext(r)&&r.day_of_week==='Samedi')return tr('satEve'); return tr('weekdayMass')}
function languageBadge(r){const code=String(r.language_code||r.language||'').toLowerCase(); if(code==='en'||code==='english') return state.lang==='fr'?'Messe en anglais':'English Mass'; return ''}

function _ruleLang(){return (state&&state.lang)==='fr'?'fr':'en'}
function _ruleLabel(en,fr){return _ruleLang()==='fr'?fr:en}
function ruleKind(raw){
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
function localizedRuleText(raw){
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
function ruleText(r){
  const langKind=ruleKind(r.language_rule);
  if(['english_first_sunday','english_second_sunday','english_third_saturday','english_except_first_sunday'].includes(langKind))return localizedRuleText(r.language_rule);
  const parts=[]; const occ=occurrenceText(r); if(occ)parts.push(occ);
  [r.qualifier,r.special_rule,r.language_rule].filter(Boolean).forEach(x=>{x=String(x).trim(); if(!x)return; if(occ&&norm(x)===norm(occ))return; parts.push(x)});
  const seen=new Set();
  return parts.map(localizedRuleText).filter(x=>{let k=norm(x).replace(/english mass|messe en anglais|english|anglais/g,'').replace(/only|of the month|du mois|every|chaque|tous les|sauf|premier|first|le|la|les/g,'').replace(/sick mass/g,'').replace(/\s+/g,' ').trim(); if(!k)k=norm(x); for(const old of seen){if(k===old||k.includes(old)||old.includes(k))return false} seen.add(k); return true}).join(' · ')
}
function confidenceScore(r){const n=parseInt(r.confidence_score||r.coordinate_confidence||'',10); return Number.isFinite(n)?n:null}
function precisionLabel(r){return isExactCoordinate(r)?tr('exactLocation'):tr('approxLocation')}
function trustLine(r){const v=sourceBadge(r)||tr('verified')+' '+(r.last_verified||r.last_checked||''); const score=confidenceScore(r); const conf=score!=null?(score<70?tr('confidenceLow'):tr('confidenceOk',{score})):''; return [v,tr('sourceAvailable'),precisionLabel(r),conf].filter(Boolean).join(' · ')}
function warningBanner(r){const rule=ruleText(r), occ=occurrenceText(r), kind=ruleKind(occ), langKind=ruleKind(r.language_rule); if(!rowMass(r))return `<div class="ruleBanner danger">${esc(tr('notMassWarning'))}${rule?' · '+esc(rule):''}</div>`; if(['english_first_sunday','english_second_sunday','english_third_saturday','english_except_first_sunday'].includes(langKind))return `<div class="ruleBanner">${esc(localizedRuleText(r.language_rule))}</div>`; if(occ){const label=(kind&&kind.startsWith('except_'))?tr('exceptWhen',{rule:localizedRuleText(occ)}):tr('onlyWhen',{rule:localizedRuleText(occ)}); return `<div class="ruleBanner">${esc(label)}</div>`} if(rule)return `<div class="ruleBanner">${esc(rule)}</div>`; return ''}
function rowKey(r){return String(r.id||r.row_id||r.uid||[r.site_uid,r.day_of_week,r.time_24h,r.special_rule||'',r.qualifier||''].join('|'))}
function buildStateParams(extra={},st=state){
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
function encodeStateToUrl(st=state,extra={}){const base=location.origin+location.pathname; const p=buildStateParams(extra,st); return base+(p.toString()?'#'+p.toString():'')}
function stateUrl(extra={}){return encodeStateToUrl(state,extra)}
function restoreStateFromUrl(hash){
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
function restoreStateFromHash(){
  const restored=restoreStateFromUrl(location.hash);
  if(!restored)return;
  setState(restored,{render:false});
  if(restored.near&&!state.location){
    requestLocation();
    return;
  }
  render();
}
async function shareUrl(url,title,text){try{if(navigator.share){await navigator.share({title,text,url});toast(tr('shared'))}else{await navigator.clipboard.writeText(`${text}
${url}`);toast(tr('copied'))}}catch(e){}}
async function shareResult(r){const text=`${tr('shareMassIntro')}: ${visibleSiteName(r)} — ${dayName(r.day_of_week)} ${r.time_24h}`; await shareUrl(stateUrl({row:rowKey(r)}),visibleSiteName(r),text)}
async function shareCurrentView(){const title=tr('shareAppTitle'); const text=tr('shareAppText'); await shareUrl(encodeStateToUrl(state),title,text)}
async function shareApp(){await shareCurrentView()}
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
    {const rt=ruleText(r); if(rt)lines.push('Rule/qualifier: '+rt);}
    if(r.source_url)lines.push('Source: '+r.source_url);
  }
  lines.push('');
  lines.push('App version: '+APP_VERSION);
  return 'mailto:'+String(reportEmail()).replace(/[^A-Za-z0-9@._+%-]/g,'')+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
}
function showSite(r){const nextFilters={...state.filters,siteUid:r.site_uid}; setState({mode:'search',query:'',filters:nextFilters,near:false},{url:false}); const input=$('#searchInput');if(input)input.value='';history.replaceState(null,'',stateUrl({site:r.site_uid}));document.getElementById('resultsHead')?.scrollIntoView({behavior:'smooth',block:'start'})}
function toggleSave(r){const saved=new Set(state.saved); if(saved.has(r.site_uid))saved.delete(r.site_uid);else saved.add(r.site_uid); storageSet('mmf_my_churches',JSON.stringify([...saved])); setState({saved})}
function renderNext(){
  const root=$('#modeHero');
  if(state.mode==='more'){root.innerHTML='';return}
  if(state.mode==='saved'){root.innerHTML=`<section class="nextCard"><div class="eyebrow">${esc(tr('savedTitle'))}</div><div class="siteName">${esc(tr('savedSub'))}</div></section>`;return}
  if(state.mode==='near'&&!state.location){root.innerHTML=`<section class="nextCard"><div class="eyebrow">${esc(tr('nearTitle'))}</div><div class="siteName">${esc(tr('locationAsk'))}</div><div class="meta">${esc(tr('locationNotEnabled'))}</div><div class="actions"><button class="btn primary" data-next-action="locate">${esc(tr('nearUse'))}</button></div></section>`;return}
  const r=state.next; if(!r){root.innerHTML='';return}
  const dist=r._dist!=null?distanceLabel(r,r._dist):'';
  const nearMeta=state.near?nearRecommendationLabel(r,state.nearScope):'';
  root.innerHTML=`<section class="nextCard"><div class="nextTop"><div><div class="eyebrow">${esc(state.near?tr('nearTitle'):tr('nextUseful'))}</div>${state.near?`<div class="meta">${esc(nearMeta||tr('sortedHintNear'))}</div>`:''}<div class="nextTime">${esc(r.time_24h)}</div><div class="relative">${esc(rel(r._delta))}${dist?' · '+esc(dist):''}</div></div><div style="font-size:26px">⛪</div></div><div class="siteName">${esc(visibleSiteName(r))}</div><div class="meta">${esc([r.town,r.parish_label||r.parish_name,r.region].filter(Boolean).join(' · '))}</div><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(r))}">${esc(tr('directions'))}</a><button class="btn" data-next-action="share">${esc(tr('share'))}</button><button class="btn" data-next-action="save">${esc(state.saved.has(r.site_uid)?tr('saved'):tr('save'))} ${state.saved.has(r.site_uid)?'★':'☆'}</button></div></section>`;
}


function sourceLabel(r){
  const direct=(state.lang==='fr'?r.source_label_fr:r.source_label_en)||'';
  if(direct)return direct;
  const site=(r.site_name||'').trim();
  const parish=(r.parish_label||r.parish_name||'').trim();
  const sourcePage=(r.source_page_label||parish).trim();
  if(sourcePage&&site&&norm(sourcePage)!==norm(site))return tr('sourceParishPage',{parish:sourcePage});
  return tr('source');
}
function scheduleScopeLabel(r){return tr('parishSchedule')}
function renderCard(r,i){
  const dist=r._dist!=null?distanceLabel(r,r._dist):'';
  const lang=languageBadge(r);
  const trust=trustLine(r);
  return `<article class="card">${warningBanner(r)}<div class="cardTop"><div><div class="cardTitle">${esc(visibleSiteName(r))}</div><div class="meta">${esc([r.town,r.parish_label||r.parish_name,r.region].filter(Boolean).join(' · '))}</div></div><div class="timeBox"><div class="time">${esc(r.time_24h)}</div><div class="relative">${esc(rel(r._delta))}</div></div></div><div class="trustStrip">${esc(trust)}</div><div class="badges"><span class="badge mass">${esc(dayName(r.day_of_week))}</span><span class="badge ${rowMass(r)?'ok':'warn'}">${esc(massBadge(r))}</span>${lang?`<span class="badge lang">${esc(lang)}</span>`:''}${dist?`<span class="badge">${esc(dist)}</span>`:''}</div><div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(r))}">${esc(tr('directions'))}</a><button class="btn" data-detail-row="${i}">${esc(tr('details'))}</button><button class="btn" data-save="${i}">${esc(state.saved.has(r.site_uid)?tr('saved'):tr('save'))} ${state.saved.has(r.site_uid)?'★':'☆'}</button></div></article>`
}

let lastFocusedBeforeDetail=null;
function renderDetailSheet(r){
  const root=$('#detailSheetBody'); if(!root||!r)return;
  const rule=ruleText(r), dist=r._dist!=null?distanceLabel(r,r._dist):'';
  const sLabel=sourceLabel(r);
  const sValue=norm(sLabel)===norm(tr('source'))?'':`<strong>${esc(sLabel)}</strong>`;
  const sourceRow=r.source_url?`<a class="detailActionRow" target="_blank" rel="noopener" href="${esc(r.source_url)}"><span>${esc(tr('source'))}</span>${sValue}</a>`:`<div class="detailActionRow inert"><span>${esc(tr('source'))}</span><strong>${esc(tr('sourceAvailable'))}</strong></div>`;
  root.innerHTML=`${warningBanner(r)}<div class="detailSummary"><div class="time">${esc(r.time_24h)}</div><div><div class="cardTitle">${esc(visibleSiteName(r))}</div><div class="meta">${esc([r.town,r.parish_label||r.parish_name,r.region].filter(Boolean).join(' · '))}</div><div class="relative">${esc(dayName(r.day_of_week))} · ${esc(rel(r._delta))}${dist?' · '+esc(dist):''}</div></div></div><div class="trustStrip">${esc(trustLine(r))}</div><div class="detailGrid"><div><b>${esc(tr('site'))}</b><br>${esc(visibleSiteName(r))}</div><div><b>${esc(tr('parish'))}</b><br>${esc(r.parish_label||r.parish_name||'')}</div>${r.town?`<div><b>${esc(tr('town'))}</b><br>${esc(r.town)}</div>`:''}${rule?`<div><b>${esc(tr('rule'))}</b><br>${esc(rule)}</div>`:''}</div><div class="detailActionList">${sourceRow}<button class="detailActionRow" data-detail-action="all-times" type="button"><span>${esc(tr('allTimes'))}</span><strong>${esc(visibleSiteName(r))}</strong></button><a class="detailActionRow" href="${esc(reportUrl(r))}"><span>${esc(tr('reportIssue'))}</span><strong>${esc(visibleSiteName(r))} · ${esc(r.day_of_week||'')} ${esc(r.time_24h||'')}</strong></a></div><div class="actions detailActions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(r))}">${esc(tr('directions'))}</a><button class="btn" data-detail-action="share" type="button">${esc(tr('share'))}</button><button class="btn" data-detail-action="save" type="button">${esc(state.saved.has(r.site_uid)?tr('saved'):tr('save'))} ${state.saved.has(r.site_uid)?'★':'☆'}</button></div>`;
}
let lockedScrollY=0;
function lockPageScroll(){
  if(document.body.classList.contains('scrollLocked'))return;
  lockedScrollY=window.scrollY||document.documentElement.scrollTop||0;
  document.body.style.position='fixed';
  document.body.style.top=`-${lockedScrollY}px`;
  document.body.style.left='0';
  document.body.style.right='0';
  document.body.style.width='100%';
  document.body.classList.add('scrollLocked');
}
function unlockPageScroll(){
  if(!document.body.classList.contains('scrollLocked'))return;
  document.body.classList.remove('scrollLocked');
  document.body.style.position='';
  document.body.style.top='';
  document.body.style.left='';
  document.body.style.right='';
  document.body.style.width='';
  window.scrollTo(0,lockedScrollY||0);
}
function activateSheetBackdrop(){
  const backdrop=$('#sheetBackdrop');
  if(!backdrop)return;
  backdrop.style.removeProperty('pointer-events');
  backdrop.style.removeProperty('opacity');
}
function deactivateSheetBackdrop(){
  const backdrop=$('#sheetBackdrop');
  if(!backdrop)return;
  backdrop.style.pointerEvents='none';
  backdrop.style.opacity='0';
}
function openDetailSheet(r,trigger=document.activeElement){
  setState({detailRow:r,modal:'detail'},{render:false}); lastFocusedBeforeDetail=trigger;
  renderDetailSheet(r);
  activateSheetBackdrop();
  lockPageScroll();
  document.body.classList.add('detailOpen','modalOpen');
  $('#detailSheet')?.setAttribute('aria-hidden','false');
  $('#appRoot')?.setAttribute('inert','');
  history.replaceState(null,'',stateUrl({row:rowKey(r)}));
  setTimeout(()=>($('#closeDetail')||focusablesIn($('#detailSheet'))[0])?.focus(),0);
}
function closeDetailSheet(){
  document.body.classList.remove('detailOpen','modalOpen');
  deactivateSheetBackdrop();
  $('#detailSheet')?.setAttribute('aria-hidden','true');
  if(state.modal==='detail')setState({modal:null,detailRow:null},{render:false});
  $('#appRoot')?.removeAttribute('inert');
  unlockPageScroll();
  if(lastFocusedBeforeDetail&&lastFocusedBeforeDetail.focus)lastFocusedBeforeDetail.focus();
}
function trapDetailFocus(e){if(e.key!=='Tab'||state.modal!=='detail')return; const f=focusablesIn($('#detailSheet')); if(!f.length)return; const first=f[0],last=f[f.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()} else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
function openHashRowIfNeeded(){
  if(!location.hash)return; const p=new URLSearchParams(location.hash.slice(1)); const row=p.get('row'); if(!row||state.detailRow)return;
  const r=state.rows.find(x=>rowKey(x)===row); if(r){r._delta=nextDelta(r); r._dist=state.location?distKm(state.location.lat,state.location.lon,rowLat(r),rowLon(r)):null; openDetailSheet(r,null)}
}

function renderSavedCard(group,i){
  const r=group.next; const dist=r&&r._dist!=null?distanceLabel(r,r._dist):'';
  const count=group.rows.length;
  const upcoming=group.rows.filter(rowMass).slice(0,3).map(x=>`${dayName(x.day_of_week)} ${x.time_24h}`).join(' · ');
  return `<article class="card savedChurch"><div class="cardTop"><div><div class="cardTitle">${esc(visibleSiteName(group.first))}</div><div class="meta">${esc([group.first.town,group.first.parish_label||group.first.parish_name,group.first.region].filter(Boolean).join(' · '))}</div></div>${r?`<div class="timeBox"><div class="time">${esc(r.time_24h)}</div><div class="relative">${esc(rel(r._delta))}</div></div>`:''}</div>${r?`<div class="trustStrip">${esc(trustLine(r))}</div>`:''}<div class="badges">${r?`<span class="badge mass">${esc(dayName(r.day_of_week))}</span><span class="badge ok">${esc(tr('nextMass'))}</span>${languageBadge(r)?`<span class="badge lang">${esc(languageBadge(r))}</span>`:''}`:''}${dist?`<span class="badge">${esc(dist)}</span>`:''}<span class="badge">${count} ${esc(tr('allTimes'))}</span></div>${upcoming?`<div class="savedTimes">${esc(upcoming)}</div>`:''}<div class="actions"><a class="btn primary" target="_blank" rel="noopener" href="${esc(mapsUrl(group.first))}">${esc(tr('directions'))}</a><button class="btn" data-show-site="${i}">${esc(tr('allTimes'))}</button><button class="btn" data-unsave-site="${i}">${esc(tr('saved'))} ★</button></div></article>`
}
function savedGroups(){
  const now=mauritiusNow(); const map=new Map();
  state.rows.filter(rowActive).filter(r=>state.saved.has(r.site_uid)).forEach(r=>{
    annotateRowForRanking(r,now);
    const key=r.site_uid; if(!map.has(key))map.set(key,{first:r,rows:[],next:null});
    const g=map.get(key); g.rows.push(r); if(r._actionable&&(!g.next||r._delta<g.next._delta))g.next=r;
  });
  return [...map.values()].map(g=>{rankResults(g.rows,{near:false}); return g}).sort((a,b)=>(a.next?._delta??999999)-(b.next?._delta??999999)||siteName(a.first).localeCompare(siteName(b.first)))
}

function dateGroupLabel(r,now=mauritiusNow()){
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
function renderCardsWithDateSeparators(arr,limit=60){
  const now=mauritiusNow();
  let last='';
  return arr.slice(0,limit).map((r,i)=>{
    const label=dateGroupLabel(r,now);
    const sep=label!==last?`<div class="dateSep">${esc(label)}</div>`:'';
    last=label;
    return sep+renderCard(r,i);
  }).join('');
}

function renderResults(){
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
  if(!n){root.className=''; root.innerHTML=`<div class="empty"><h3>${esc(tr('noResults'))}</h3><p>${esc(tr('noResultsText'))}</p></div>`; return}
  root.className='resultsGrid'; const capped=arr.length>60; const sundayNote=(effectiveDay()==='Dimanche'&&effectiveDayMode()==='sunday_obligation'&&arr.some(isSundayEligible))?`<div class="resultNotice">${esc(tr('sundayExplain'))}</div>`:''; const nearNotice=state.near&&state.location?nearScopeNotice(state.nearScope):''; const nearNote=nearNotice?`<div class="resultNotice ${state.nearScope==='all'?'warn':''}">${esc(nearNotice)}</div>`:''; const capNote=capped?`<div class="resultNotice warn">${esc(tr('resultCap',{n:arr.length}))}</div>`:''; root.innerHTML=nearNote+sundayNote+capNote+renderCardsWithDateSeparators(arr,60);
}
function renderChips(){const root=$('#intentChips'); if(!root)return; const chips=[...(state.parsed.chips||[])].filter(c=>c.k!=='near'||state.near||locationRequestInFlight); const has=k=>chips.some(c=>c.k===k); if(state.near&&!has('near'))chips.unshift({k:'near',label:tr('quickNear')}); const day=effectiveDay(),mode=effectiveDayMode(),time=effectiveTime(); if(day&&!has('day'))chips.push({k:'day',label:mode==='today'?tr('today'):mode==='tomorrow'?tr('tomorrow'):mode==='sunday_obligation'?tr('sunday'):dayName(day)}); if(time&&!has('time'))chips.push({k:'time',label:tr(time)||time}); if(state.filters.region)chips.push({k:'region',label:state.filters.region}); if(effectiveType()==='all')chips.push({k:'type',label:tr('includeOther')}); if(state.filters.siteUid)chips.push({k:'site',label:tr('allTimes')}); root.innerHTML=chips.map(c=>`<span class="intentChip">${esc(c.label)}<button type="button" aria-label="Remove ${esc(c.label)}" data-chip="${esc(c.k)}">×</button></span>`).join('')}

let deferredInstallPrompt=null;
let installPromptDismissedUntilSession=0;
let firstVisitSeenSession=false;
let standaloneWelcomeDismissedSession=false;
window.addEventListener('beforeinstallprompt',e=>{
  try{e.preventDefault();deferredInstallPrompt=e;renderInstallOnboarding()}catch(_){}}
);
function isStandaloneMode(){
  try{return !!(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true}catch(e){return false}
}
function ua(){return navigator.userAgent||''}
function isIOSDevice(){return /iPad|iPhone|iPod/.test(ua())||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)}
function isAndroidDevice(){return /Android/i.test(ua())}
function isMobileDevice(){return isIOSDevice()||isAndroidDevice()||(/Mobi|Mobile/i.test(ua()))||(window.matchMedia&&window.matchMedia('(max-width: 760px)').matches)}
function isLikelySafariOnIOS(){return isIOSDevice()&&/Safari/i.test(ua())&&!/(CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo|Instagram|FBAN|FBAV|Line|WhatsApp)/i.test(ua())}
function isLikelyInAppBrowser(){return /(Instagram|FBAN|FBAV|Line|WhatsApp|Messenger|Twitter|LinkedInApp|GSA)/i.test(ua())}
function installInstructionsHtml(){
  const iosWarn=isIOSDevice()&&!isLikelySafariOnIOS()?`<p class="installWarning">${esc(tr('openSafariFirst'))}</p>`:'';
  const nativeBtn=deferredInstallPrompt&&!isStandaloneMode()?`<p><button class="btn primary" type="button" data-install-action="native">${esc(tr('installNow'))}</button></p>`:'';
  return `<div class="guideText installGuide">${iosWarn}${nativeBtn}<details open><summary>${esc(tr('iphoneInstallTitle'))}</summary><ol><li>${esc(tr('iphoneInstallStep1'))}</li><li>${esc(tr('iphoneInstallStep2'))}</li><li>${esc(tr('iphoneInstallStep3'))}</li><li>${esc(tr('iphoneInstallStep4'))}</li></ol></details><details open><summary>${esc(tr('androidInstallTitle'))}</summary><ol><li>${esc(tr('androidInstallStep1'))}</li><li>${esc(tr('androidInstallStep2'))}</li><li>${esc(tr('androidInstallStep3'))}</li><li>${esc(tr('androidInstallStep4'))}</li></ol></details><p>${esc(tr('browserUseNote'))}</p></div>`;
}
function removeInstallCard(){const c=$('#installOnboarding'); if(c)c.remove()}
function shouldShowFirstVisitInstallCard(){
  if(isStandaloneMode()||!isMobileDevice())return false;
  const storedUntil=Number(storageGet('mmf_install_prompt_dismissed_until','0')||0);
  const until=Math.max(storedUntil,installPromptDismissedUntilSession||0);
  if(until&&Date.now()<until)return false;
  if(!storageGet('mmf_first_visit_seen')&&!firstVisitSeenSession)return true;
  return !!(until&&Date.now()>=until);
}
function installCardHtml(kind){
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
function renderInstallOnboarding(){
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
async function handleInstallAction(action){
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

function moreSectionContent(){
  const sections={
    help:{id:'helpSection',title:tr('helpTitle'),body:tr('helpHtml')},
    install:{id:'installSection',title:tr('installTab'),body:installInstructionsHtml()},
    about:{id:'aboutSection',title:tr('aboutTitle'),body:`<div class="guideText">${tr('aboutHtml')}</div>`},
    update:{id:'howToUpdateSection',title:tr('updateGuideTitle'),body:`<div class="guideText">${tr('updateGuideHtml')}</div>`},
    report:{id:'reportSection',title:tr('reportIssue'),body:`<div class="guideText"><p>${esc(tr('trustText'))}</p><p><a class="btn primary" href="${esc(reportUrl(null))}">${esc(tr('reportIssue'))}</a></p></div>`}
  };
  return sections[state.moreSection]||sections.help;
}
function renderMore(){
  const box=$('#morePanel');
  if(state.mode!=='more'){box.hidden=true;box.innerHTML='';return}
  const section=moreSectionContent();
  box.hidden=false;
  box.innerHTML=`<section class="panel morePanelContent" tabindex="-1" aria-labelledby="${esc(section.id)}"><h2>${esc(tr('moreTitle'))}</h2><div class="moreTabs" role="tablist" aria-label="${esc(tr('moreTitle'))}"><button type="button" data-more-section="help" class="tag ${state.moreSection==='help'?'active':''}">${esc(tr('helpTitle'))}</button><button type="button" data-more-section="install" class="tag ${state.moreSection==='install'?'active':''}">${esc(tr('installTab'))}</button><button type="button" data-more-section="about" class="tag ${state.moreSection==='about'?'active':''}">${esc(tr('about'))}</button><button type="button" data-more-section="update" class="tag ${state.moreSection==='update'?'active':''}">${esc(tr('howUpdate'))}</button><button type="button" data-more-section="report" class="tag ${state.moreSection==='report'?'active':''}">${esc(tr('reportIssue'))}</button></div><h3 id="${esc(section.id)}">${esc(section.title)}</h3>${section.body}<h3>${esc(tr('trustTitle'))}</h3><p>${esc(tr('trustText'))}</p><p>${esc(tr('version'))}: ${APP_VERSION}</p><button class="btn primary" data-share-app="1">${esc(tr('share'))}</button></section>`;
}
function openMoreSection(section='help',shouldScroll=true){
  const moreSection=(section||'help').replace(/^#/,'').replace('Section','').replace('howToUpdate','update');
  setState({mode:'more',moreSection});
  const panel=$('#morePanel');
  if(shouldScroll&&panel){setTimeout(()=>{panel.scrollIntoView({behavior:'smooth',block:'start'}); $('.morePanelContent')?.focus({preventScroll:true})},0)}
}
function renderFooter(){const f=$('#appFooter'); if(!f)return; f.innerHTML=`<span>${esc(tr('version'))} ${APP_VERSION}</span><span aria-hidden="true">•</span><button type="button" data-footer-target="help">${esc(tr('helpTitle'))}</button><span aria-hidden="true">•</span><button type="button" data-footer-target="install">${esc(tr('installTab'))}</button><span aria-hidden="true">•</span><button type="button" data-footer-target="about">${esc(tr('about'))}</button><span aria-hidden="true">•</span><button type="button" data-footer-target="update">${esc(tr('howUpdate'))}</button><span aria-hidden="true">•</span><button type="button" data-footer-target="report">${esc(tr('reportIssue'))}</button>`;}
function openUpdateHelp(){openMoreSection('update')}

function renderStatic(){
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
function renderTags(){
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
function activeFilterCount(){
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
function updateFilterButton(){
  const btn=$('#openFilters'), badge=$('#filterCount'); if(!btn)return;
  const n=activeFilterCount();
  btn.classList.toggle('hasActiveFilters',n>0);
  btn.setAttribute('aria-label',n>0?`${tr('filters')} (${n})`:tr('filters'));
  if(badge){badge.textContent=n>0?String(n):''; badge.hidden=!n;}
}
function renderDataNotice(){
  const el=$('#dataNotice'); if(!el)return;
  const show=!!state.dataStale&&!state.loadError;
  el.hidden=!show;
  el.textContent=show?tr('staleDataNotice'):'';
}
function renderNav(){
  const day=effectiveDay(),mode=effectiveDayMode(),time=effectiveTime();
  $$('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===state.mode || (state.mode==='home'&&b.dataset.nav==='home')));
  $$('.pill').forEach(p=>{
    const active=(p.dataset.action==='near'&&state.near)||(p.dataset.action==='saved'&&state.mode==='saved')||(p.dataset.action==='morning'&&time==='morning')||(p.dataset.action==='afternoon'&&time==='afternoon')||(p.dataset.action==='today'&&mode==='today')||(p.dataset.action==='tomorrow'&&mode==='tomorrow')||(p.dataset.action==='sunday'&&day==='Dimanche'&&mode==='sunday_obligation');
    p.classList.toggle('active',!!active);
    if(['today','tomorrow','morning','afternoon','near','saved','sunday'].includes(p.dataset.action||''))p.setAttribute('aria-pressed',active?'true':'false');
  });
  updateFilterButton();
}
function render(){compute(); renderStatic(); renderChips(); renderTags(); renderNav(); renderDataNotice(); renderNext(); renderResults(); renderMore(); renderFooter(); renderInstallOnboarding(); $('#resultsHead').hidden=state.mode==='more'; $('#searchBox').classList.toggle('hasText',!!state.query);}
function setLang(l){storageSet('mmf_language',l); setState({lang:l},{url:true}); if(state.detailRow)renderDetailSheet(state.detailRow)}
function toast(msg){const t=$('#toast'); if(!t)return; t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),1800)}
let locationRequestInFlight=false;
function clearNearFailureState(){
  setState({near:false,nearExpanded:false,nearScope:'',mode:'home',query:removeQueryIntent(state.query,'near')},{url:true});
  toast(tr('locationDenied'));
}
function requestLocation(){
  if(locationRequestInFlight||state.location)return;
  if(!navigator.geolocation){clearNearFailureState();return}
  locationRequestInFlight=true;
  navigator.geolocation.getCurrentPosition(
    pos=>{locationRequestInFlight=false;setState({location:{lat:pos.coords.latitude,lon:pos.coords.longitude},near:true,mode:'near'},{url:true})},
    ()=>{locationRequestInFlight=false;clearNearFailureState()},
    {enableHighAccuracy:false,timeout:8000,maximumAge:0}
  )
}
let lastFocusedBeforeSheet=null;
function focusablesIn(el){return $$('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])').filter(x=>el&&el.contains(x)&&!x.disabled&&x.getAttribute('aria-hidden')!=='true')}
function openModal(name,trigger=document.activeElement){if(name!=='filters')return; lastFocusedBeforeSheet=trigger; setState({modal:'filters'},{render:false}); activateSheetBackdrop(); lockPageScroll(); document.body.classList.add('filtersOpen','modalOpen'); $('#filterSheet')?.setAttribute('aria-hidden','false'); $('#openFilters')?.setAttribute('aria-expanded','true'); $('#appRoot')?.setAttribute('inert',''); setTimeout(()=>{const target=$('#filterSheet')?.querySelector('#closeFilters')||focusablesIn($('#filterSheet'))[0]; target?.focus()},0)}
function closeModal(name='filters'){if(name!=='filters'&&state.modal!==name)return; document.body.classList.remove('filtersOpen','modalOpen'); deactivateSheetBackdrop(); unlockPageScroll(); setState({modal:null},{render:false}); $('#filterSheet')?.setAttribute('aria-hidden','true'); $('#openFilters')?.setAttribute('aria-expanded','false'); $('#appRoot')?.removeAttribute('inert'); if(lastFocusedBeforeSheet&&lastFocusedBeforeSheet.focus)lastFocusedBeforeSheet.focus()}
function openFilters(e){openModal('filters',e?.currentTarget||document.activeElement)}
function closeFilters(){closeModal('filters')}
function trapSheetFocus(e){if(e.key!=='Tab'||state.modal!=='filters')return; const f=focusablesIn($('#filterSheet')); if(!f.length)return; const first=f[0],last=f[f.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()} else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
function bindSheetDrag(){const sheet=$('#filterSheet'), grab=sheet?.querySelector('.grab'); if(!sheet||!grab)return; let startY=0,startX=0,dragging=false; grab.addEventListener('pointerdown',e=>{if(state.modal!=='filters')return; startY=e.clientY;startX=e.clientX;dragging=true; grab.setPointerCapture?.(e.pointerId)}); grab.addEventListener('pointerup',e=>{if(!dragging)return; const dy=e.clientY-startY,dx=Math.abs(e.clientX-startX); dragging=false; if(dy>60&&dy>dx*1.4)closeFilters()}); grab.addEventListener('pointercancel',()=>{dragging=false})}
function loadSavedChurches(){
  try{
    const raw=storageGet('mmf_my_churches','[]');
    const parsed=JSON.parse(raw);
    if(Array.isArray(parsed))return new Set(parsed.filter(Boolean));
  }catch(e){storageRemove('mmf_my_churches')}
  return new Set();
}
function applyRows(json){const rows=(json&&json.rows)||json||[]; if(Array.isArray(rows)&&rows.length){setState({rows:rows.filter(rowActive)},{render:false}); return true} return false}
async function loadData(){
  setState({saved:loadSavedChurches()},{render:false});
  let rendered=false;
  try{
    if(window.caches){
      const cached=await caches.match('data/masses.json');
      if(cached){
        const json=await cached.clone().json();
        rendered=applyRows(json);
        if(rendered){setState({dataStale:false,dataSource:'cache'},{render:false});render();openHashRowIfNeeded();}
      }
    }
  }catch(e){}
  if(!rendered){
    try{
      rendered=applyRows(window.MMF_FALLBACK_DATA||{});
      if(rendered){setState({dataStale:false,dataSource:'fallback'},{render:false});render();openHashRowIfNeeded();}
    }catch(e){}
  }
  try{
    let res=await fetch('data/masses.json',{cache:'no-cache'});
    if(!res.ok)throw new Error('fetch');
    let json=await res.clone().json();
    if(window.caches){try{const c=await caches.open(CACHE_NAME); await c.put('data/masses.json',res.clone())}catch(_){}}
    applyRows(json);
    setState({dataStale:false,dataSource:'network',loadError:''},{render:false});
    render();
    openHashRowIfNeeded();
  }catch(e){
    if(rendered)setState({dataStale:true},{render:true});
    else setState({loadError:String(e),dataStale:false});
  }
}
async function forceUpdate(){const banner=$('#updateBanner'); const latest=(banner&&banner.dataset.latestVersion)||APP_VERSION; try{if(navigator.serviceWorker){const reg=await navigator.serviceWorker.getRegistration(); if(reg&&reg.update)await reg.update()} if(window.caches){const keys=await caches.keys(); await Promise.all(keys.filter(k=>k.startsWith('mmf-')).map(k=>caches.delete(k)))}}catch(e){} storageRemove('mmf_update_dismissed_'+latest); setTimeout(()=>{const t=$('#updateText'); if(t)t.textContent=tr('updateFallback')},2000); const base=location.origin+location.pathname; location.replace(base+'?v='+encodeURIComponent(latest)+'&refresh='+Date.now()+location.hash)}
async function checkUpdate(){try{const res=await fetch('version.json?ts='+Date.now(),{cache:'no-store'});const v=await res.json(); if(v.version&&v.version!==APP_VERSION&&!storageGet('mmf_update_dismissed_'+v.version)){const banner=$('#updateBanner'); banner.dataset.latestVersion=v.version; banner.classList.add('show')}}catch(e){}}

function handleDelegatedAction(e){
  const installAction=e.target.closest('[data-install-action]'); if(installAction){e.preventDefault(); handleInstallAction(installAction.dataset.installAction); return}
  const chip=e.target.closest('[data-chip]'); if(chip){e.preventDefault(); clearFilter(chip.dataset.chip); return}
  const filter=e.target.closest('[data-filter]'); if(filter){e.preventDefault(); applyFilter(filter.dataset.filter,filter.dataset.value); return}
  const detailBtn=e.target.closest('[data-detail-row]'); if(detailBtn){e.preventDefault(); const r=state.results[+detailBtn.dataset.detailRow]; if(r)openDetailSheet(r,detailBtn); return}
  const saveBtn=e.target.closest('[data-save]'); if(saveBtn){e.preventDefault(); const r=state.results[+saveBtn.dataset.save]; if(r)toggleSave(r); return}
  const showSiteBtn=e.target.closest('[data-show-site]'); if(showSiteBtn){e.preventDefault(); const g=savedGroups()[+showSiteBtn.dataset.showSite]; if(g)showSite(g.first); return}
  const unsaveBtn=e.target.closest('[data-unsave-site]'); if(unsaveBtn){e.preventDefault(); const g=savedGroups()[+unsaveBtn.dataset.unsaveSite]; if(g)toggleSave(g.first); return}
  const nextAction=e.target.closest('[data-next-action]'); if(nextAction){e.preventDefault(); const a=nextAction.dataset.nextAction; if(a==='locate')requestLocation(); if(a==='share'&&state.next)shareResult(state.next); if(a==='save'&&state.next)toggleSave(state.next); return}
  const detailAction=e.target.closest('[data-detail-action]'); if(detailAction){e.preventDefault(); const r=state.detailRow; if(!r)return; const a=detailAction.dataset.detailAction; if(a==='share')shareResult(r); if(a==='save')toggleSave(r); if(a==='all-times'){closeDetailSheet();showSite(r)} return}
  const more=e.target.closest('[data-more-section]'); if(more){e.preventDefault(); openMoreSection(more.dataset.moreSection,false); return}
  const footer=e.target.closest('[data-footer-target]'); if(footer){e.preventDefault(); openMoreSection(footer.dataset.footerTarget); return}
  const share=e.target.closest('[data-share-app]'); if(share){e.preventDefault(); shareApp(); return}
}
function installDelegatedActions(){document.addEventListener('click',handleDelegatedAction)}
function runSearchDiagnostics(){const tests=['après-midi Curepipe','matin Curepipe','soir Curepipe','messe après-midi Curepipe','messe matin Curepipe','messe soir Curepipe','afternoon Curepipe','morning Curepipe','evening Curepipe','messe du soir Curepipe','evening Mass Curepipe','messe demain','messe aujourd’hui','messe samedi soir','18h','18:00','6pm','sacre coeur','saint jean','st jean','église','eglise']; const now=getMauritiusNow(new Date('2026-05-07T05:00:00+04:00')); return tests.map(q=>{const st={...state,query:q,filters:{...DEFAULT_FILTERS},mode:'search',near:false}; const out=getVisibleResults(st,now); return {query:q,count:out.results.length,top:out.results[0]?visibleSiteName(out.results[0]):null,pass:out.results.length>0}})}
function runDateDiagnostics(testNow){const now=getMauritiusNow(testNow?new Date(testNow):new Date()); const next=getNextMass(state.rows,now,state); return {now:now.toISOString(),next:next?{site:visibleSiteName(next),day:next.day_of_week,time:next.time_24h,delta:next._delta}:null,pass:!!next}}
function runRankingDiagnostics(){return {top:state.results.slice(0,5).map(r=>({site:visibleSiteName(r),day:r.day_of_week,time:r.time_24h,delta:r._delta,dist:r._dist??null})),pass:true}}
function runStateDiagnostics(){return {mode:state.mode,query:state.query,filters:{...state.filters},near:state.near,modal:state.modal,results:state.results.length,pass:true}}
function runDeepLinkDiagnostics(){
  const hashes=['#q=curepipe&time=afternoon&lang=fr','#q=curepipe&time=afternoon&lang=en','#q=messe%20du%20soir%20Curepipe&lang=fr','#q=evening%20Mass%20Curepipe&lang=en','#day=tomorrow&time=morning&lang=fr','#day=sunday&time=afternoon&lang=en','#mode=saved&lang=fr','#type=all&q=adoration&lang=fr','#bad=%E0%A4%A','#'];
  const cases=hashes.map(hash=>{const restored=restoreStateFromUrl(hash);return {hash,restored,pass:hash==='#'||!!restored}});
  const url=encodeStateToUrl(state); const restored=restoreStateFromUrl(url.includes('#')?url.slice(url.indexOf('#')):'');
  return {url,restored,cases,pass:cases.every(x=>x.pass)&&(!!restored||!url.includes('#'))}
}
window.MMFDiagnostics={runSearchDiagnostics,runDateDiagnostics,runRankingDiagnostics,runStateDiagnostics,runDeepLinkDiagnostics,activeFilterCount,isDayFilterActive,isTimeFilterActive,parseUserIntent,removeQueryIntent,removeNearIntentFromQuery,getVisibleResults,matchesExact};

let searchDebounceTimer=null;

function resetInteractionState(){
  try{
    document.body.classList.remove('modalOpen','scrollLocked','filtersOpen','detailOpen');
    const appRoot=$('#appRoot'); if(appRoot){appRoot.removeAttribute('inert'); appRoot.removeAttribute('aria-hidden')}
    deactivateSheetBackdrop()
    const filter=$('#filterSheet'); if(filter){filter.setAttribute('aria-hidden','true')}
    const detail=$('#detailSheet'); if(detail){detail.setAttribute('aria-hidden','true')}
  }catch(e){console.warn('MMF interaction reset failed',e)}
}
function showInitFailure(e){
  try{
    console.error('MMF init failed',e);
    document.body.classList.remove('modalOpen','scrollLocked','filtersOpen','detailOpen');
    const root=$('#results')||document.body;
    const msg=(state&&state.lang==='fr')?'Problème de chargement de l’application. Veuillez actualiser.':'App loading problem. Please refresh.';
    root.innerHTML=`<div class="empty error"><h3>${esc(msg)}</h3></div>`;
  }catch(_){}
}

function bind(){setState({lang:storageGet('mmf_language')||((navigator.language||'').toLowerCase().startsWith('fr')?'fr':'en')},{render:false}); restoreStateFromHash(); $('#searchInput').addEventListener('input',e=>{
  const q=e.target.value;
  if(searchDebounceTimer)clearTimeout(searchDebounceTimer);
  searchDebounceTimer=setTimeout(()=>{
    const parsed=parseUserIntent(q);
    const near=!!parsed.near;
    setState({query:q,filters:{siteUid:''},mode:near?'near':'search',near,nearExpanded:near?false:state.nearExpanded,nearScope:''},{url:true});
    if(near&&!state.location) requestLocation();
  },150);
}); $('#clearSearch').addEventListener('click',()=>clearAllFilters({url:true})); $('#langEn').addEventListener('click',()=>setLang('en')); $('#langFr').addEventListener('click',()=>setLang('fr')); $('#openFilters').addEventListener('click',openFilters); $('#closeFilters').addEventListener('click',closeFilters); $('#sheetBackdrop').addEventListener('click',()=>{if(state.modal==='detail')closeDetailSheet(); else closeFilters()}); $('#sheetBackdrop').addEventListener('touchmove',e=>e.preventDefault(),{passive:false}); $('#closeDetail')?.addEventListener('click',closeDetailSheet); $('#applyFilters').addEventListener('click',closeFilters); $$('.pill').forEach(p=>p.addEventListener('click',()=>{const a=p.dataset.action; if(a==='next')setState({mode:'home',near:false,nearScope:'',query:'',filters:{...DEFAULT_FILTERS}},{url:true}); if(a==='today')toggleQuickDay('__today'); if(a==='tomorrow')toggleQuickDay('__tomorrow'); if(a==='morning')toggleQuickTime('morning'); if(a==='afternoon'||a==='evening')toggleQuickTime('afternoon'); if(a==='near')toggleNearMode(); if(a==='sunday')toggleQuickDay('Dimanche'); if(a==='saved')setState(state.mode==='saved'?{mode:'home',near:false,nearScope:''}:{mode:'saved',near:false,nearScope:''},{url:true})})); $$('[data-nav]').forEach(b=>b.addEventListener('click',()=>{const n=b.dataset.nav;if(n==='near'){setState({mode:'near',near:true,nearExpanded:false,nearScope:''},{url:true});requestLocation()} else if(n==='saved'){setState(state.mode==='saved'?{mode:'home',near:false,nearScope:''}:{mode:'saved',near:false,nearScope:''},{url:true})} else setState({mode:n,near:false,nearScope:'',moreSection:n==='more'?'help':state.moreSection},{url:true}); window.scrollTo({top:0,behavior:'smooth'})})); const quick=$('#quickRow'); if(quick){quick.addEventListener('scroll',()=>{markSwipeHintSeen();updateSwipeAffordance()},{passive:true}); quick.addEventListener('click',()=>{markSwipeHintSeen();updateSwipeAffordance()}); window.addEventListener('resize',updateSwipeAffordance)} $('#updateRefresh').addEventListener('click',forceUpdate); $('#updateHelp')?.addEventListener('click',openUpdateHelp); $('#updateDismiss').addEventListener('click',()=>{const banner=$('#updateBanner'); const latest=banner.dataset.latestVersion||APP_VERSION; banner.classList.remove('show');storageSet('mmf_update_dismissed_'+latest,'1')}); document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.modal==='filters')closeFilters(); if(e.key==='Escape'&&state.modal==='detail')closeDetailSheet(); trapSheetFocus(e); trapDetailFocus(e)})}
async function registerSW(){if(!('serviceWorker'in navigator))return; try{await navigator.serviceWorker.register('sw.js')}catch(e){}}
document.addEventListener('DOMContentLoaded',()=>{try{resetInteractionState();installDelegatedActions();bind();bindSheetDrag();renderInstallOnboarding();loadData();registerSW();checkUpdate();setInterval(checkUpdate,30*60*1000)}catch(e){showInitFailure(e)}});
