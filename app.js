(() => {
'use strict';
const APP_VERSION = '21.4';
const RELEASE_VERIFIED_DATE_EN = '26 April 2026';
const RELEASE_VERIFIED_DATE_FR = '26 avril 2026';
const DAYS = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const DAY_LABELS = {
  en: {Lundi:'Monday', Mardi:'Tuesday', Mercredi:'Wednesday', Jeudi:'Thursday', Vendredi:'Friday', Samedi:'Saturday', Dimanche:'Sunday'},
  fr: {Lundi:'Lundi', Mardi:'Mardi', Mercredi:'Mercredi', Jeudi:'Jeudi', Vendredi:'Vendredi', Samedi:'Samedi', Dimanche:'Dimanche'}
};
const DAYIDX = Object.fromEntries(DAYS.map((d,i)=>[d,i]));
const T = {
  en: {
    appTitle:'Mauritius Mass Finder',
    heroText:'Find a Mass quickly anywhere in Mauritius',
    quickTitle:'What do you need?', quickHint:'One tap. No typing.',
    qaNowTitle:'Find a Mass now', qaNowText:'Next available Masses, sorted by time.',
    qaNearTitle:'Near me', qaNearText:'Use your location and sort nearby results.',
    qaSundayTitle:'Sunday obligation', qaSundayText:'Show Sunday Masses and Saturday Masses from 15:30 onward.',
    qaFavTitle:'My Churches', qaFavText:'Open your saved churches quickly.',
    locationExplainTitle:'Use your location?', locationExplainText:'Your location is used only on this device to sort Masses by distance. It is not stored or sent by this app.', locationContinue:'Continue', locationCancel:'Not now', showAllMasses:'Show all Masses', showingTop:'Showing the most useful results first. You can show all results at any time.',
    navHome:'Home', navSearch:'Search', navNear:'Near me', navFav:'My Churches', navMore:'More',
    aboutTitle:'About this app', aboutText:'A simple Catholic Mass finder for Mauritius, built for fast mobile use.', aboutHtml:'<p>A simple Catholic Mass finder for Mauritius, built for fast mobile use.</p><p><b>Purpose:</b> help users find a suitable Mass quickly by day, parish, area, saved church, or nearby location.</p><p><b>Data:</b> the database is based on the project’s reconciled diocesan parish data and includes source links on each result.</p><p><b>Important:</b> Mass times can change. When timing is critical, verify directly with the parish using the source link.</p><p><b>Privacy:</b> location is used only on your device to sort nearby results. It is not stored by this app.</p>', mainNavigation:'Main navigation', languageLabel:'Language', quickActionsLabel:'Quick actions', nextUsefulMass:'Next useful Mass', shareTitle:'Mauritius Mass Finder', reportSubject:'Mass Finder correction: {site}', versionWord:'Version', share:'Share', shareText:'Mass at {site}, {day} {time}. Directions: {url}', shareCopied:'Mass details copied. You can paste them into WhatsApp or a message.',
    sundayNotice:'Showing Sunday Masses and Saturday Masses from 15:30 onward.',
    searchPlaceholder:'Search parish, church, town…', searchLabel:'Search parish, church, town', dayFilterLabel:'Filter by day', regionFilterLabel:'Filter by region', modeFilterLabel:'Filter by Masses only or include other celebrations', anyDay:'Any day', allRegions:'All regions', massesOnly:'Masses only', includeOther:'Include other celebrations',
    findNext:'Find next Mass', useLocation:'Use my location', favouritesOnly:'My Churches only', clear:'Clear', loading:'Loading data…',
    updateTitle:'Update the database without rebuilding', updateA:'<b>Option A:</b> edit <code>data/masses.json</code> in GitHub and commit. The app fetches it on launch.', updateB:'<b>Option B:</b> publish a Google Sheet as CSV and paste the published CSV URL in <code>config.js</code>.', fallbackNote:'The app falls back to the embedded full database if the live file is unavailable.', footerNote:'Sources are linked on each result. Always verify special services directly with the parish when timing is critical.',
    rowWord:'', rows:'', parishes:'Parishes', sites:'Churches & chapels', massRows:'Masses', other:'Other celebrations', showing:'', results:'results found', trustStrip:'{parishes} parishes · {sites} churches & chapels · verified {date}',
    noResult:'No Mass found.', noResultHint:'Try another church name, area, day, or clear your filters.', noResultNextHint:'No upcoming Mass found with the current filters. Clear filters or try another area.', noResultOtherHint:'Some non-Mass celebrations may be hidden. Turn on “Include other celebrations” if needed.', favEmptyTitle:'You haven’t saved any churches yet.', favEmptyHint:'You have not saved any churches yet. Tap ❤️ / Save on a church to add it here.', favEmptySearch:'Search now', favEmptyNear:'Show nearby Masses', vigilBadge:'Vigil Mass', vigilNotice:'Sunday obligation mode includes Sunday Masses and Saturday Masses from 15:30 onward.', nextNotice:'Showing the next available Masses across the coming 7 days, sorted by soonest time.', locationNotice:'Location sorting is active. Distances are approximate for some churches.', favNotice:'Showing My Churches only.', otherNotice:'Other celebrations are shown separately and are not mixed into Masses-only results.',
    parish:'Parish', today:'Today', inDays:'In {n} day(s)', distanceExact:'{n} km', distanceApprox:'~{n} km', directions:'Directions', source:'Official source', favouriteOn:'★ My Church', favouriteOff:'☆ Save church', reportCorrection:'Report correction',
    dataLiveJson:'Database loaded', dataGoogle:'Live database loaded', dataFallback:'Offline database loaded', copied:'Correction details copied. Paste them into an email or message.', locationAsk:'Use your location to show nearby Masses. Your location is not stored.', locationDenied:'Location is not available. You can still search by church, area, parish, or use directions from a result card.', locationUnsupported:'Location is not available. You can still search by church, area, parish, or use directions from a result card.', correction:'Correction', checkEntry:'Please check this Mass Finder entry:', dayTime:'Day/time', serviceMass:'Mass', serviceOther:'Other celebration', updateAvailable:'A new version is available', updateText:'Refresh to use the latest version. If the old version remains, close and reopen the app.', updateRefresh:'Refresh now', updateDismiss:'Later', lastVerified:'Last verified', verifiedNote:'Mass times can change. Check the official source for feast days, funerals, cyclones, holidays, or recent parish changes.', howUpdateLink:'How to update', howUpdateTitle:'How to update the app', howUpdateHtml:'<h3>How to update the app</h3><p>If a new version is available:</p><ol><li>Tap “Refresh / Update” if the banner appears.</li><li>If the app does not update, close it completely and reopen it.</li><li>On iPhone, swipe up and close the app from the app switcher, then reopen it.</li><li>If it is still stuck on an old version, remove the home-screen shortcut and install it again from the latest link.</li></ol><p>Your saved churches should normally remain saved.</p>', sundayObligationBadge:'Counts for Sunday', sundayMassBadge:'Sunday Mass', weekdayMassBadge:'Weekday Mass', specialRuleBadge:'Special rule', otherCelebrationBadge:'Other celebration / ambiguous', vigilInferredBadge:'Possible Vigil Mass', whatNewTitle:'What’s new in v21.4', whatNewHtml:'<ul><li>Refines the public trust strip, removes technical row wording, and preserves v21.4 configuration and Sunday-obligation fixes.</li><li>Shows clearer public coverage: 48 parishes and 118 churches & chapels.</li><li>Masses remain shown by default; other/ambiguous celebrations are hidden unless requested.</li><li>Sunday obligation now means Sunday Masses plus Saturday Masses from 15:30 onward.</li><li>Preserves the Help / FAQ / About support centre, simple update logic, and stable v17.2 shell.</li></ul>', helpLink:'Help', helpTitle:'Help Center / User Guide', helpHtml:'<h3>Quick Start</h3><ol><li>Search by church, parish, town, or region.</li><li>Use Near Me to find nearby churches.</li><li>Save churches with ❤️ / Save.</li><li>Tap Directions for Google Maps.</li><li>Tap Refresh / Update when a new version appears.</li></ol><h3>Features explained</h3><h4>Search</h4><p>Search is accent-insensitive and works with church, parish, town, and region names.</p><h4>Sunday obligation</h4><p>Sunday obligation mode shows Sunday Masses and Saturday Masses from 15:30 onward. These Saturday Masses are marked as counting for Sunday.</p><h4>Near Me and distances</h4><p>Near Me uses your device location to sort churches by distance. Some coordinates are locality-based, so distances marked with ~ are approximate.</p><h4>My Churches</h4><p>Tap ❤️ / Save to keep a church in My Churches. Tap ❤️ again to remove it.</p><h4>Directions</h4><p>Tap Directions to open Google Maps. For approximate coordinates, the app uses a text search so Google Maps can choose the best location.</p><h4>Other celebrations</h4><p>The app shows Masses by default. The “Include other celebrations” option may show celebrations or services that are not Masses.</p><h4>Language switching</h4><p>Use English / Français. Your language choice is saved on this device.</p><h4>Offline behavior</h4><p>The app can reopen with cached data if the network is unavailable. Always refresh when a new version is available.</p><h3>FAQ</h3><h4>Why do I see Saturday evening Masses when looking for Sunday?</h4><p>Because this app treats Saturday Masses from 15:30 onward as satisfying the Sunday obligation.</p><h4>Why are some distances approximate?</h4><p>Some churches use locality-based coordinates rather than exact church-door coordinates.</p><h4>Why can’t I find nearby churches?</h4><p>Location access may be disabled, blocked by the browser, or unavailable on your device.</p><h4>How do I remove a saved church?</h4><p>Tap ❤️ again on that church.</p><h4>How do I switch language?</h4><p>Use the English / Français language buttons at the top of the app.</p><h4>How do I update the app?</h4><p>Tap Refresh / Update when prompted, or close and reopen the app.</p><h4>What does “Other celebrations” mean?</h4><p>These may include celebrations or services that are not Masses.</p><h4>Why might times be wrong?</h4><p>Schedules can change, especially for feast days, funerals, cyclones, public holidays, or recent parish changes. Please use the source link or report a correction.</p><h3>Install / Update</h3><h4>iPhone</h4><p>Open the app link in Safari, tap the Share icon, then tap Add to Home Screen.</p><h4>Android</h4><p>Open the app link in Chrome, tap the menu, then tap Add to Home screen or Install app.</p><h4>Updating</h4><p>Tap Refresh / Update when prompted. If the old version remains, close the app completely and reopen it.</p><h3>About the data / trust</h3><p>Data is compiled from diocesan/parish sources and may change. Check “Last verified”. For feast days, funerals, cyclones, public holidays, or recent parish changes, verify directly with the official source. Please report corrections when a time, location, or note appears wrong.</p><h3>Contact / report correction</h3><p>On any result, tap Report correction. The app prepares the church, parish, day, time, and source details so you can send the correction easily.</p>', close:'Close', onboardingSkip:'Skip', onboardingNext:'Next', onboardingDone:'Done', onboarding1Title:'Search quickly', onboarding1Text:'Search by church, parish, town, or region.', onboarding2Title:'Use Near Me', onboarding2Text:'Allow location access to find nearby churches. Distances may be approximate.', onboarding3Title:'Save My Churches', onboarding3Text:'Tap Save / &#10084;&#65039; to keep favourite churches.', approximateLabel:'Approximate distance', exactLabel:'Distance', townLabel:'Town', categoryLabelText:'Category', mapsLabel:'Maps', appVersionLabel:'App version', correctionPrompt:'Correction needed', nearPrecisionNote:'Distances are approximate for some churches.', trustNote:'Mass times can change. Check the official source for feast days, funerals, cyclones, holidays, or recent parish changes. Report a correction if something looks wrong.'
  },
  fr: {
    appTitle:'Trouver une Messe à Maurice',
    heroText:'Trouvez rapidement une messe à Maurice',
    quickTitle:'De quoi avez-vous besoin ?', quickHint:'Un clic. Sans taper.',
    qaNowTitle:'Trouver une messe maintenant', qaNowText:'Prochaines messes, triées par horaire.',
    qaNearTitle:'Près de moi', qaNearText:'Utilisez votre position et triez les résultats proches.',
    qaSundayTitle:'Messe du dimanche', qaSundayText:'Afficher les messes du dimanche et les messes du samedi à partir de 15h30.',
    qaFavTitle:'Mes églises', qaFavText:'Ouvrir rapidement vos églises sauvegardées.',
    locationExplainTitle:'Utiliser votre position ?', locationExplainText:'Votre position sert uniquement sur cet appareil à trier les messes par distance. Elle n’est pas enregistrée ni envoyée par cette application.', locationContinue:'Continuer', locationCancel:'Pas maintenant', showAllMasses:'Afficher toutes les messes', showingTop:'Affichage prioritaire des résultats les plus utiles. Vous pouvez afficher tous les résultats à tout moment.',
    navHome:'Accueil', navSearch:'Recherche', navNear:'Près de moi', navFav:'Mes églises', navMore:'Plus',
    aboutTitle:'À propos de cette application', aboutText:'Une application simple pour trouver rapidement les messes à Maurice sur mobile.', aboutHtml:'<p>Une application simple pour trouver rapidement les messes à Maurice sur mobile.</p><p><b>Objectif :</b> aider les utilisateurs à trouver rapidement une messe par jour, paroisse, région, église sauvegardée ou position proche.</p><p><b>Données :</b> la base repose sur les données diocésaines réconciliées du projet et chaque résultat contient un lien source.</p><p><b>Important :</b> les horaires peuvent changer. Lorsque l’horaire est critique, vérifiez directement auprès de la paroisse avec le lien source.</p><p><b>Confidentialité :</b> votre position sert uniquement sur votre appareil à trier les résultats proches. Elle n’est pas enregistrée par cette application.</p>', mainNavigation:'Navigation principale', languageLabel:'Langue', quickActionsLabel:'Actions rapides', nextUsefulMass:'Prochaine messe utile', shareTitle:'Trouver une Messe à Maurice', reportSubject:'Correction Mass Finder : {site}', versionWord:'Version', share:'Partager', shareText:'Messe à {site}, {day} {time}. Itinéraire : {url}', shareCopied:'Les détails de la messe ont été copiés. Vous pouvez les coller dans WhatsApp ou un message.',
    sundayNotice:'Affichage des messes du dimanche et des messes du samedi à partir de 15h30.',
    searchPlaceholder:'Rechercher paroisse, église, ville…', searchLabel:'Rechercher paroisse, église, ville', dayFilterLabel:'Filtrer par jour', regionFilterLabel:'Filtrer par région', modeFilterLabel:'Filtrer par messes seulement ou inclure les autres célébrations', anyDay:'Tous les jours', allRegions:'Toutes les régions', massesOnly:'Messes seulement', includeOther:'Inclure les autres célébrations',
    findNext:'Trouver la prochaine messe', useLocation:'Utiliser ma position', favouritesOnly:'Mes églises seulement', clear:'Effacer', loading:'Chargement des données…',
    updateTitle:'Mettre à jour la base sans reconstruire', updateA:'<b>Option A :</b> modifiez <code>data/masses.json</code> dans GitHub et validez. L’application le charge au démarrage.', updateB:'<b>Option B :</b> publiez une feuille Google en CSV et collez l’URL CSV publiée dans <code>config.js</code>.', fallbackNote:'L’application utilise la base intégrée si le fichier en direct n’est pas disponible.', footerNote:'Les sources sont liées sur chaque résultat. Vérifiez toujours les services spéciaux directement avec la paroisse lorsque l’horaire est critique.',
    rowWord:'', rows:'', parishes:'Paroisses', sites:'Églises et chapelles', massRows:'Messes', other:'Autres célébrations', showing:'', results:'résultats', trustStrip:'{parishes} paroisses · {sites} églises et chapelles · vérifié {date}',
    noResult:'Aucune messe trouvée.', noResultHint:'Essayez un autre nom d’église, une région, un jour, ou effacez les filtres.', noResultNextHint:'Aucune prochaine messe trouvée avec les filtres actuels. Effacez les filtres ou essayez une autre région.', noResultOtherHint:'Certaines célébrations hors messe peuvent être masquées. Activez « Inclure les autres célébrations » si nécessaire.', favEmptyTitle:'Vous n’avez encore enregistré aucune église.', favEmptyHint:'Vous n’avez pas encore enregistré d’églises. Appuyez sur ❤️ / Enregistrer sur une église pour l’ajouter ici.', favEmptySearch:'Rechercher maintenant', favEmptyNear:'Afficher les messes proches', vigilBadge:'Messe anticipée', vigilNotice:'Le mode obligation dominicale inclut les messes du dimanche et les messes du samedi à partir de 15h30.', nextNotice:'Affichage des prochaines messes disponibles sur les 7 prochains jours, triées par horaire.', locationNotice:'Le tri par position est actif. Les distances sont approximatives pour certaines églises.', favNotice:'Affichage de mes églises seulement.', otherNotice:'Les autres célébrations sont affichées séparément et ne sont pas mélangées aux résultats “messes seulement”.',
    parish:'Paroisse', today:'Aujourd’hui', inDays:'Dans {n} jour(s)', distanceExact:'{n} km', distanceApprox:'~{n} km', directions:'Itinéraire', source:'Source officielle', favouriteOn:'★ Mon église', favouriteOff:'☆ Sauvegarder', reportCorrection:'Signaler une correction',
    dataLiveJson:'Base chargée', dataGoogle:'Base en direct chargée', dataFallback:'Base hors ligne chargée', copied:'Les détails de correction ont été copiés. Collez-les dans un e-mail ou un message.', locationAsk:'Utilisez votre position pour afficher les messes proches. Votre position n’est pas enregistrée.', locationDenied:'La localisation n’est pas disponible. Vous pouvez chercher par église, région, paroisse, ou utiliser l’itinéraire depuis une fiche.', locationUnsupported:'La localisation n’est pas disponible. Vous pouvez chercher par église, région, paroisse, ou utiliser l’itinéraire depuis une fiche.', correction:'Correction', checkEntry:'Veuillez vérifier cette entrée du Mass Finder :', dayTime:'Jour/heure', serviceMass:'Messe', serviceOther:'Autre célébration', updateAvailable:'Une nouvelle version est disponible', updateText:'Actualisez pour utiliser la dernière version. Si l’ancienne version reste affichée, fermez puis rouvrez l’application.', updateRefresh:'Actualiser', updateDismiss:'Plus tard', lastVerified:'Dernière vérification', verifiedNote:'Les horaires peuvent changer. Vérifiez la source officielle en cas de fêtes, funérailles, cyclones, jours fériés ou changement paroissial récent.', howUpdateLink:'Comment mettre à jour', howUpdateTitle:'Comment mettre l’application à jour', howUpdateHtml:'<h3>Comment mettre l’application à jour</h3><p>Si une nouvelle version est disponible :</p><ol><li>Appuyez sur « Actualiser / Mettre à jour » si la bannière apparaît.</li><li>Si l’application ne se met pas à jour, fermez-la complètement puis rouvrez-la.</li><li>Sur iPhone, fermez l’application depuis le sélecteur d’applications, puis rouvrez-la.</li><li>Si l’ancienne version reste bloquée, supprimez le raccourci de l’écran d’accueil et réinstallez-le avec le dernier lien.</li></ol><p>Vos églises enregistrées devraient normalement rester sauvegardées.</p>', sundayObligationBadge:'Compte pour le dimanche', sundayMassBadge:'Messe du dimanche', weekdayMassBadge:'Messe de semaine', specialRuleBadge:'Règle spéciale', otherCelebrationBadge:'Autre célébration / ambigu', vigilInferredBadge:'Messe anticipée possible', whatNewTitle:'Nouveautés v21.4', whatNewHtml:'<ul><li>Améliore la bande de confiance publique, supprime les libellés techniques de lignes et conserve les corrections de configuration et d’obligation dominicale de v21.4.</li><li>Affiche une couverture publique plus claire : 48 paroisses et 118 églises et chapelles.</li><li>Les messes restent affichées par défaut ; les autres célébrations/éléments ambigus sont masqués sauf demande.</li><li>L’obligation dominicale inclut les messes du dimanche et les messes du samedi à partir de 15h30.</li><li>Conserve le centre Aide / FAQ / À propos, la logique de mise à jour simple et la base stable v17.2.</li></ul>', helpLink:'Aide', helpTitle:'Centre d’aide / Guide d’utilisation', helpHtml:'<h3>Démarrage rapide</h3><ol><li>Recherchez par église, paroisse, localité ou région.</li><li>Utilisez Près de moi pour trouver les églises proches.</li><li>Enregistrez les églises avec ❤️ / Enregistrer.</li><li>Appuyez sur Itinéraire pour ouvrir Google Maps.</li><li>Appuyez sur Actualiser / Mettre à jour quand une nouvelle version apparaît.</li></ol><h3>Fonctions expliquées</h3><h4>Recherche</h4><p>La recherche fonctionne avec ou sans accents et accepte les noms d’église, de paroisse, de localité ou de région.</p><h4>Messe du dimanche</h4><p>Le mode Messe du dimanche affiche les messes du dimanche et les messes du samedi à partir de 15h30. Ces messes du samedi sont indiquées comme comptant pour le dimanche.</p><h4>Près de moi et distances</h4><p>Près de moi utilise la position de votre appareil pour trier les églises par distance. Certaines coordonnées sont approximatives par localité ; les distances avec ~ sont donc approximatives.</p><h4>Mes églises</h4><p>Appuyez sur ❤️ / Enregistrer pour garder une église dans Mes églises. Appuyez à nouveau sur ❤️ pour la retirer.</p><h4>Itinéraire</h4><p>Appuyez sur Itinéraire pour ouvrir Google Maps. Pour les coordonnées approximatives, l’application utilise une recherche textuelle afin que Google Maps choisisse le meilleur lieu.</p><h4>Autres célébrations</h4><p>L’application affiche les messes par défaut. L’option « Inclure les autres célébrations » peut afficher des célébrations ou services qui ne sont pas des messes.</p><h4>Changement de langue</h4><p>Utilisez English / Français. Votre choix de langue est sauvegardé sur cet appareil.</p><h4>Mode hors ligne</h4><p>L’application peut se rouvrir avec les données en cache si le réseau n’est pas disponible. Actualisez toujours lorsqu’une nouvelle version est proposée.</p><h3>FAQ</h3><h4>Pourquoi est-ce que je vois des messes du samedi soir quand je cherche le dimanche ?</h4><p>Parce que cette application traite les messes du samedi à partir de 15h30 comme satisfaisant l’obligation dominicale.</p><h4>Pourquoi certaines distances sont-elles approximatives ?</h4><p>Certaines églises utilisent des coordonnées par localité plutôt que des coordonnées exactes à la porte de l’église.</p><h4>Pourquoi est-ce que je ne trouve pas d’églises proches ?</h4><p>L’accès à la localisation peut être désactivé, bloqué par le navigateur ou indisponible sur votre appareil.</p><h4>Comment retirer une église enregistrée ?</h4><p>Appuyez à nouveau sur ❤️ sur cette église.</p><h4>Comment changer de langue ?</h4><p>Utilisez les boutons English / Français en haut de l’application.</p><h4>Comment mettre l’application à jour ?</h4><p>Appuyez sur Actualiser / Mettre à jour lorsque le message apparaît, ou fermez et rouvrez l’application.</p><h4>Que signifie « Autres célébrations » ?</h4><p>Il peut s’agir de célébrations ou de services qui ne sont pas des messes.</p><h4>Pourquoi un horaire peut-il être incorrect ?</h4><p>Les horaires peuvent changer, surtout en cas de fêtes, funérailles, cyclones, jours fériés ou changement paroissial récent. Utilisez le lien source ou signalez une correction.</p><h3>Installer / Mettre à jour</h3><h4>iPhone</h4><p>Ouvrez le lien de l’application dans Safari, touchez l’icône Partager, puis touchez Sur l’écran d’accueil.</p><h4>Android</h4><p>Ouvrez le lien de l’application dans Chrome, touchez le menu, puis touchez Ajouter à l’écran d’accueil ou Installer l’application.</p><h4>Mise à jour</h4><p>Appuyez sur Actualiser / Mettre à jour lorsque le message apparaît. Si l’ancienne version reste affichée, fermez complètement l’application puis rouvrez-la.</p><h3>À propos des données / confiance</h3><p>Les données sont compilées à partir de sources diocésaines ou paroissiales et peuvent changer. Vérifiez « Dernière vérification ». En cas de fêtes, funérailles, cyclones, jours fériés ou changement paroissial récent, vérifiez directement avec la source officielle. Merci de signaler toute correction si un horaire, un lieu ou une note semble incorrect.</p><h3>Contact / signaler une correction</h3><p>Sur un résultat, appuyez sur Signaler une correction. L’application prépare les détails de l’église, de la paroisse, du jour, de l’heure et de la source pour faciliter l’envoi.</p>', close:'Fermer', onboardingSkip:'Passer', onboardingNext:'Suivant', onboardingDone:'Terminer', onboarding1Title:'Rechercher rapidement', onboarding1Text:'Recherchez par église, paroisse, localité ou région.', onboarding2Title:'Utiliser Près de moi', onboarding2Text:'Autorisez la localisation pour trouver les églises proches. Les distances peuvent être approximatives.', onboarding3Title:'Enregistrer mes églises', onboarding3Text:'Appuyez sur Enregistrer / &#10084;&#65039; pour garder vos églises préférées.', approximateLabel:'Distance approximative', exactLabel:'Distance', townLabel:'Localité', categoryLabelText:'Catégorie', mapsLabel:'Cartes', appVersionLabel:'Version de l’application', correctionPrompt:'Correction à apporter', nearPrecisionNote:'Les distances sont approximatives pour certaines églises.', trustNote:'Les horaires peuvent changer. Vérifiez la source officielle en cas de fêtes, funérailles, cyclones, jours fériés ou changement paroissial récent. Signalez une correction si une information semble incorrecte.'
  }
};
let DATA = [];
let META = {};
let userPos = null;
let nextMode = true;
let nearMode = false;
let quickMode = '';
let favOnly = false;
let showAllResults = false;
let locationErrorKey = '';
function safeGetLocalStorage(key, fallback){
  try { const value = localStorage.getItem(key); return value == null ? fallback : value; } catch(e){ return fallback; }
}
function safeSetLocalStorage(key, value){
  try { localStorage.setItem(key, value); } catch(e){}
}
function safeLoadFavourites(){
  try {
    const parsed = JSON.parse(safeGetLocalStorage('mmf_site_favourites', '[]'));
    return Array.isArray(parsed) ? new Set(parsed.filter(Boolean)) : new Set();
  } catch(e){
    try { localStorage.removeItem('mmf_site_favourites'); } catch(_e){}
    return new Set();
  }
}
const savedLang = safeGetLocalStorage('mmf_lang', '');
let currentLang = (savedLang === 'fr' || savedLang === 'en') ? savedLang : (((navigator.language || 'en').toLowerCase().startsWith('fr')) ? 'fr' : 'en');
const favs = safeLoadFavourites();
const $ = id => document.getElementById(id);
const tr = (key, vars={}) => String((T[currentLang] && T[currentLang][key]) || T.en[key] || key).replace(/\{(\w+)\}/g, (_,k)=>vars[k] ?? '');
const dayLabel = d => (DAY_LABELS[currentLang] && DAY_LABELS[currentLang][d]) || d;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s || '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[œŒ]/g,'oe').replace(/[æÆ]/g,'ae')
  .toLowerCase()
  .replace(/[’'`´]/g,' ')
  .replace(/\b(sainte|saintes|saint|saints|ste|stes|st)\b/g,'st')
  .replace(/[^a-z0-9]+/g,' ')
  .replace(/\s+/g,' ')
  .trim();
const SEARCH_STOPWORDS = new Set(['de','du','des','la','le','l','les']);
function searchKey(s){
  return norm(s).split(' ').filter(t => t && !SEARCH_STOPWORDS.has(t)).join(' ');
}
function editDistanceLimited(a,b,limit=2){
  a=String(a||''); b=String(b||'');
  if(Math.abs(a.length-b.length)>limit) return limit+1;
  const prev = Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){
    const cur=[i]; let rowMin=cur[0];
    for(let j=1;j<=b.length;j++){
      const cost=a[i-1]===b[j-1]?0:1;
      const v=Math.min(prev[j]+1, cur[j-1]+1, prev[j-1]+cost);
      cur[j]=v; if(v<rowMin) rowMin=v;
    }
    if(rowMin>limit) return limit+1;
    for(let j=0;j<cur.length;j++) prev[j]=cur[j];
  }
  return prev[b.length];
}
function tokenMatches(qt, ht){
  if(!qt || !ht) return false;
  if(ht === qt || ht.includes(qt) || qt.includes(ht)) return true;
  if(qt.length < 4 || ht.length < 4) return false;
  const lim = Math.min(2, qt.length >= 7 ? 2 : 1);
  return editDistanceLimited(qt, ht, lim) <= lim;
}
function fuzzyTokensMatch(queryTokens, hayTokens){
  if(!queryTokens.length) return true;
  if(queryTokens.length > 5) return false;
  let fuzzyCount = 0;
  return queryTokens.every(qt => {
    const exact = hayTokens.some(ht => ht === qt || ht.includes(qt) || qt.includes(ht));
    if(exact) return true;
    const fuzzy = hayTokens.some(ht => tokenMatches(qt, ht));
    if(fuzzy) fuzzyCount++;
    return fuzzy && fuzzyCount <= 2;
  });
}
function searchMatchesRow(r, rawQuery){
  const q = norm(rawQuery);
  if(!q) return true;
  const qKey = searchKey(rawQuery);
  const hay = norm([r.search_text,r.parish_name,r.site_name,r.town,r.region,r.parish_label,r.maps_query,r.special_rule,r.qualifier,r.notes].join(' '));
  if(hay.includes(q)) return true;
  const hayKey = searchKey(hay);
  if(qKey && hayKey.includes(qKey)) return true;
  const hayTokens = hayKey.split(' ').filter(Boolean);
  const tokens = qKey.split(' ').filter(Boolean);
  if(tokens.length > 0 && tokens.every(t => new Set(hayTokens).has(t))) return true;
  return fuzzyTokensMatch(tokens, hayTokens);
}
function uniqParts(parts){ const seen=new Set(); return parts.map(x=>String(x||'').trim()).filter(x=>{ const k=norm(x); if(!k || seen.has(k)) return false; seen.add(k); return true; }); }
function buildMapsQuery(r){ return uniqParts([r.site_name, r.town, r.parish_label || r.parish_name, r.region, 'Mauritius']).join(', '); }
let SITE_NAME_COLLISIONS = new Set();
function computeDisambiguation(){ const byName=new Map(); DATA.forEach(r=>{ const k=norm(r.site_name); if(!k) return; if(!byName.has(k)) byName.set(k,new Set()); byName.get(k).add(r.site_uid || buildMapsQuery(r)); }); SITE_NAME_COLLISIONS = new Set([...byName.entries()].filter(([k,v])=>v.size>1).map(([k])=>k)); }
function siteDisplayName(r){ const name = r.site_name || ''; if(r.display_site_label) return r.display_site_label; if(SITE_NAME_COLLISIONS.has(norm(name))){ const suffix = uniqParts([r.town, r.region]).join(' · '); return suffix ? name + ' (' + suffix + ')' : name; } return name; }
function parseCSV(text){
  const rows=[]; let row=[], field='', quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(quoted){ if(c==='"' && n==='"'){field+='"'; i++;} else if(c==='"'){quoted=false;} else field+=c; }
    else { if(c==='"') quoted=true; else if(c===','){row.push(field); field='';} else if(c==='\n'){row.push(field); rows.push(row); row=[]; field='';} else if(c==='\r'){} else field+=c; }
  }
  if(field.length || row.length){row.push(field); rows.push(row);}
  const headers = rows.shift() || [];
  return rows.filter(r=>r.some(x=>x!=='')).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i] ?? ''])));
}
function bool(v){ return v === true || String(v).toLowerCase() === 'true'; }
function normaliseRows(rows){
  return rows.map((r,i)=>{
    const category = r.mass_category || (bool(r.is_mass_only_visible) ? 'Mass' : 'Non-Mass');
    const visible = bool(r.is_mass_only_visible) || category === 'Mass';
    const baseSearch = [r.region,r.town,r.parish_name,r.parish_label,r.site_name,r.parent_parish,r.special_rule,r.qualifier,r.notes,buildMapsQuery(r)].join(' ');
    return {
      id: r.id || 'row-'+i,
      parish_uid: r.parish_uid || '', site_uid: r.site_uid || '', region: r.region || '', town: r.town || '',
      parish_name: r.parish_name || '', parish_label: r.parish_label || r.parish_name || '', site_name: r.site_name || '', display_site_label: r.display_site_label || '',
      day_of_week: r.day_of_week || '', time_24h: r.time_24h || '', service_type: r.service_type || '', mass_category: category,
      verified_status: r.verified_status || '', language: r.language || '', special_rule: r.special_rule || '', qualifier: r.qualifier || '', notes: r.notes || '',
      source_url: r.source_url || '', last_checked: r.last_checked || (currentLang === 'fr' ? RELEASE_VERIFIED_DATE_FR : RELEASE_VERIFIED_DATE_EN), is_active: String(r.is_active).toLowerCase() !== 'false',
      latitude: Number.isFinite(parseFloat(r.latitude)) ? parseFloat(r.latitude) : null,
      longitude: Number.isFinite(parseFloat(r.longitude)) ? parseFloat(r.longitude) : null,
      maps_query: buildMapsQuery(r),
      coordinate_precision: r.coordinate_precision || '', coordinate_note: r.coordinate_note || '',
      parent_parish: r.parent_parish || r.parish_name || '', site_type: r.site_type || '',
      is_mass_only_visible: visible,
      display_category: r.display_category || (visible ? 'Mass' : 'Other celebration'),
      calendar_day: r.calendar_day || r.day_of_week || '',
      obligation_day: r.obligation_day || r.day_of_week || '',
      is_vigil: bool(r.is_vigil) || detectVigilStatus(r, visible) !== 'not_vigil',
      vigil_label_en: r.vigil_label_en || '',
      vigil_label_fr: r.vigil_label_fr || '',
      vigil_status: detectVigilStatus(r, visible),
      is_vigil_for_sunday: bool(r.is_vigil_for_sunday) || detectVigilStatus(r, visible) !== 'not_vigil',
      vigil_reason: r.vigil_reason || vigilReasonForStatus(detectVigilStatus(r, visible)),
      search_text: r.search_text ? norm(r.search_text) : norm(baseSearch)
    };
  });
}
function detectVigilStatus(r, visible){
  if(!visible) return 'not_vigil';
  if((r.day_of_week || '') === 'Samedi' && mins(r.time_24h) >= (15*60 + 30)) return 'practical_1530_rule';
  return 'not_vigil';
}
function vigilReasonForStatus(status){
  if(status === 'practical_1530_rule') return 'Saturday Mass at or after 15:30 under v21.4 Sunday-obligation rule';
  if(status === 'explicit') return 'explicit source wording';
  if(status === 'inferred') return 'inferred from Saturday evening schedule';
  if(status === 'unknown') return 'uncertain';
  return 'not applicable';
}
function loadFallbackData(){
  if(window.MMF_FALLBACK_DATA) return Promise.resolve(window.MMF_FALLBACK_DATA);
  return new Promise(resolve=>{
    const script=document.createElement('script');
    script.src='fallback-data.js?v=' + APP_VERSION;
    script.onload=()=>resolve(window.MMF_FALLBACK_DATA || {rows:[]});
    script.onerror=()=>resolve({rows:[]});
    document.head.appendChild(script);
  });
}
async function loadData(){
  const cfg = window.MASS_FINDER_CONFIG || window.MMF_CONFIG || {};
  let loadedKey = 'dataFallback';
  let raw = window.MMF_EMBEDDED_DATA || null;
  try{
    if(cfg.GOOGLE_SHEET_CSV_URL){
      const url = cfg.GOOGLE_SHEET_CSV_URL + (cfg.GOOGLE_SHEET_CSV_URL.includes('?') ? '&' : '?') + 'v=' + Date.now();
      const res = await fetch(url,{cache:'no-store'}); if(!res.ok) throw new Error('Google Sheet CSV unavailable');
      DATA = normaliseRows(parseCSV(await res.text())); META = {version:'Google Sheet live', row_count:DATA.length}; loadedKey='dataGoogle';
    } else {
      const url = (cfg.DATA_JSON_URL || './data/masses.json') + '?v=' + Date.now();
      const res = await fetch(url,{cache:'no-store'}); if(!res.ok) throw new Error('JSON unavailable');
      raw = await res.json(); DATA = normaliseRows(raw.rows || raw); META = raw.meta || {row_count:DATA.length}; loadedKey='dataLiveJson';
    }
  } catch(e){
    raw = raw || await loadFallbackData(); DATA = normaliseRows(raw.rows || raw); META = raw.meta || {row_count:DATA.length}; loadedKey='dataFallback';
  }
  computeDisambiguation();
  $('dataStatus').dataset.loadedKey = loadedKey;
  updateStaticText();
  initFilters(); render();
}
function updateStaticText(){
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = tr(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-html]').forEach(el => el.innerHTML = tr(el.dataset.i18nHtml));
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = tr(el.dataset.i18nPlaceholder));
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => el.setAttribute('aria-label', tr(el.dataset.i18nAriaLabel)));
  document.title = tr('appTitle') + ' v' + APP_VERSION;
  $('langEn')?.classList.toggle('active', currentLang === 'en');
  $('langFr')?.classList.toggle('active', currentLang === 'fr');
  if($('dataStatus')?.dataset.loadedKey) $('dataStatus').textContent = tr($('dataStatus').dataset.loadedKey) + ' · v' + APP_VERSION;
  const vf=$('versionFooter'); if(vf) vf.textContent='v' + APP_VERSION;
  const av=$('aboutVersion'); if(av) av.textContent=APP_VERSION;
  const ub=$('updateBanner'); if(ub && ub.style.display !== 'none'){
    const latest = ub.dataset.latest || '';
    const ut=$('updateTitle'), ux=$('updateText'), ur=$('updateRefresh'), ud=$('updateDismiss');
    if(ut) ut.textContent = tr('updateAvailable') + (latest ? ' — v' + latest : '');
    if(ux) ux.textContent = tr('updateText');
    if(ur) ur.textContent = tr('updateRefresh');
    if(ud) ud.textContent = tr('updateDismiss');
    const uh=$('updateHelp'); if(uh){ uh.textContent = tr('howUpdateLink'); uh.setAttribute('aria-label', tr('howUpdateTitle')); }
  }
  updateHelpModalText();
  updateOnboardingText();
}
function setLang(lang){ currentLang = lang; safeSetLocalStorage('mmf_lang', lang); updateStaticText(); refreshDayOptions(); render(); }
function initFilters(){
  refreshDayOptions();
  const regionSelect = $('region');
  const current = regionSelect.value;
  while(regionSelect.options.length > 1) regionSelect.remove(1);
  [...new Set(DATA.map(r=>r.region).filter(Boolean))].sort().forEach(r => regionSelect.insertAdjacentHTML('beforeend','<option>'+esc(r)+'</option>'));
  regionSelect.value = current;
}
function refreshDayOptions(){
  const daySelect = $('day');
  if(!daySelect) return;
  const current = daySelect.value;
  daySelect.innerHTML = '<option value="">'+esc(tr('anyDay'))+'</option>' + DAYS.map(d=>'<option value="'+esc(d)+'">'+esc(dayLabel(d))+'</option>').join('');
  daySelect.value = current;
}
function minutesNow(){ const d=new Date(); return d.getHours()*60+d.getMinutes(); }
function todayIdx(){ return (new Date().getDay()+6)%7; }
function mins(t){ const [h,m] = String(t || '00:00').split(':').map(Number); return h*60+m; }
function nextDelta(r){ const day = DAYIDX[r.day_of_week]; if(day == null) return 999999; let deltaDays=(day - todayIdx() + 7) % 7; let delta=deltaDays*1440 + mins(r.time_24h) - minutesNow(); if(delta < 0) delta += 7*1440; return delta; }
function relativeText(delta){
  if(delta < 60) return currentLang === 'fr' ? 'dans '+delta+' min' : 'in '+delta+' min';
  if(delta < 1440){ const h=Math.floor(delta/60), m=delta%60; return currentLang === 'fr' ? 'dans '+h+' h'+(m?' '+m+' min':'') : 'in '+h+'h'+(m?' '+m+'m':''); }
  const d=Math.floor(delta/1440); return currentLang === 'fr' ? 'dans '+d+' jour(s)' : 'in '+d+' day(s)';
}
function distKm(a,b,c,d){ if([a,b,c,d].some(x=>x==null || Number.isNaN(x))) return null; const R=6371, rad=x=>x*Math.PI/180; const dLat=rad(c-a), dLon=rad(d-b); const h=Math.sin(dLat/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(h)); }
function filtered(){
  const rawQ=$('q').value, day=$('day').value, region=$('region').value, mode=$('mode').value;
  let arr = DATA.filter(r=>r.is_active);
  if(mode === 'mass') arr = arr.filter(r=>r.is_mass_only_visible);
  if(favOnly) arr = arr.filter(r=>favs.has(r.site_uid));
  if(norm(rawQ)) arr = arr.filter(r=>searchMatchesRow(r, rawQ));
  if(day && !nextMode) arr = arr.filter(r=> day === 'Dimanche' ? isSundayFilterMatch(r) : r.day_of_week === day);
  if(region) arr = arr.filter(r=>r.region === region);
  if(quickMode === 'sundayMorning') arr = arr.filter(r=>isSundayFilterMatch(r));
  arr.sort((a,b)=>{
    if(($('day').value === 'Dimanche' || quickMode === 'sundayMorning') && !nearMode && !nextMode){ const nd=nextDelta(a)-nextDelta(b); if(nd) return nd; const va=isVigilMass(a)?0:1, vb=isVigilMass(b)?0:1; if(va!==vb) return va-vb; }
    if(nearMode && userPos){ const da=distKm(userPos.lat,userPos.lon,a.latitude,a.longitude) ?? 9999; const db=distKm(userPos.lat,userPos.lon,b.latitude,b.longitude) ?? 9999; if(da!==db) return da-db; const nd=nextDelta(a)-nextDelta(b); if(nd) return nd; }
    if(nextMode){ const nd = nextDelta(a)-nextDelta(b); if(nd) return nd; }
    return (DAYIDX[a.day_of_week]-DAYIDX[b.day_of_week]) || (mins(a.time_24h)-mins(b.time_24h)) || a.site_name.localeCompare(b.site_name);
  });
  return arr;
}
function mapsUrl(r){ const useExact = isExactCoord(r) && r.latitude != null && r.longitude != null; const destRaw = useExact ? (r.latitude+','+r.longitude) : (r.maps_query || buildMapsQuery(r)); const dest=encodeURIComponent(destRaw); const origin=userPos ? '&origin='+encodeURIComponent(userPos.lat+','+userPos.lon) : ''; return 'https://www.google.com/maps/dir/?api=1'+origin+'&destination='+dest; }
function toggleFav(siteUid){ if(favs.has(siteUid)) favs.delete(siteUid); else favs.add(siteUid); safeSetLocalStorage('mmf_site_favourites', JSON.stringify([...favs])); render(); }
function shareAction(r){
  const url = mapsUrl(r);
  const text = tr('shareText', {site:siteDisplayName(r), day:dayLabel(r.day_of_week), time:r.time_24h, url});
  if(navigator.share){ navigator.share({title:tr('shareTitle'), text, url}).catch(()=>{}); }
  else { navigator.clipboard?.writeText(text).then(()=>alert(tr('shareCopied'))).catch(()=>alert(text)); }
}

function reportAction(r){
  const cfg = window.MASS_FINDER_CONFIG || window.MMF_CONFIG || {};
  const subject = tr('reportSubject', {site:siteDisplayName(r)});
  const body = [tr('checkEntry'), '', siteDisplayName(r), tr('parish')+': '+(r.parish_label||r.parish_name), tr('townLabel')+': '+(r.town||''), tr('dayTime')+': '+dayLabel(r.day_of_week)+' '+r.time_24h, tr('categoryLabelText')+': '+categoryLabel(r), tr('source')+': '+(r.source_url||''), tr('mapsLabel')+': '+mapsUrl(r), tr('appVersionLabel')+': v'+APP_VERSION, '', tr('correctionPrompt')+': '].join('\n');
  if(cfg.REPORT_EMAIL) location.href = 'mailto:'+encodeURIComponent(cfg.REPORT_EMAIL)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  else navigator.clipboard?.writeText(body).then(()=>alert(tr('copied'))).catch(()=>alert(body));
}
function renderStats(){
  const par=new Set(DATA.map(r=>r.parish_uid)).size, sites=new Set(DATA.map(r=>r.site_uid)).size;
  const date = currentLang === 'fr' ? RELEASE_VERIFIED_DATE_FR : RELEASE_VERIFIED_DATE_EN;
  const trust = '<div class="notice ok trustStrip" style="grid-column:1/-1"><b>'+esc(tr('trustStrip',{parishes:par,sites:sites,date:date}))+'</b><br><span class="small">'+esc(tr('trustNote'))+'</span></div>';
  $('stats').innerHTML = trust;
}
function renderNotice(){
  const notices=[];
  if(nextMode) notices.push('<div class="notice ok">'+esc(tr('nextNotice'))+'</div>');
  if(nearMode && userPos) notices.push('<div class="notice ok">'+esc(tr('locationNotice'))+'</div>');
  if(nearMode && userPos) notices.push('<div class="notice warn">'+esc(tr('nearPrecisionNote'))+'</div>');
  if(locationErrorKey) notices.push('<div class="notice warn">'+esc(tr(locationErrorKey))+'</div>');
  if(favOnly) notices.push('<div class="notice ok">'+esc(tr('favNotice'))+'</div>');
  if(quickMode === 'sundayMorning' || $('day').value === 'Dimanche') notices.push('<div class="notice ok">'+esc(tr('sundayNotice'))+'</div>');
  if(($('mode').value==='all')) notices.push('<div class="notice warn">'+esc(tr('otherNotice'))+'</div>');
  $('notice').innerHTML = notices.join('');
}
function el(tag, attrs={}, text){ const node=document.createElement(tag); for(const [k,v] of Object.entries(attrs)){ if(k==='class') node.className=v; else if(k==='href') node.href=v; else if(k==='target') node.target=v; else node.setAttribute(k,v); } if(text != null) node.textContent=text; return node; }
function categoryLabel(r){ return r.is_mass_only_visible ? tr('serviceMass') : tr('serviceOther'); }
function isExactCoord(r){ return ['exact','existing','verified','exact_church','church_exact','verified_church'].includes(String(r.coordinate_precision||'').toLowerCase()); }
function distanceLabel(r, d){ return tr(isExactCoord(r) ? 'distanceExact' : 'distanceApprox', {n:d.toFixed(1)}); }
function vigilStatus(r){ return r && r.vigil_status ? r.vigil_status : detectVigilStatus(r || {}, !!(r && r.is_mass_only_visible)); }
function isVigilMass(r){ return r && r.is_mass_only_visible && (r.is_vigil === true || r.is_vigil_for_sunday === true || vigilStatus(r) === 'explicit'); }
function isSundayFilterMatch(r){ return r.is_mass_only_visible && (r.day_of_week === 'Dimanche' || (r.day_of_week === 'Samedi' && mins(r.time_24h) >= (15*60 + 30))); }
function liturgicalMassBadge(r){
  if(!r.is_mass_only_visible) return tr('otherCelebrationBadge');
  if(isVigilMass(r)) return tr('vigilBadge');
  if(r.day_of_week === 'Dimanche') return tr('sundayMassBadge');
  return tr('weekdayMassBadge');
}
function firstNextMass(){
  const oldNext=nextMode, oldNear=nearMode, oldQuick=quickMode, oldFav=favOnly;
  nextMode=true; nearMode=false; quickMode=''; favOnly=false;
  const arr=filtered().filter(r=>r.is_mass_only_visible);
  nextMode=oldNext; nearMode=oldNear; quickMode=oldQuick; favOnly=oldFav;
  return arr[0] || null;
}
function renderNextHero(){
  const root=$('nextHero'); if(!root) return;
  const r=firstNextMass();
  if(!r){ root.innerHTML=''; return; }
  const d=userPos?distKm(userPos.lat,userPos.lon,r.latitude,r.longitude):null;
  const meta=[dayLabel(r.day_of_week), r.town, d!=null ? distanceLabel(r,d) : ''].filter(Boolean).join(' · ');
  root.innerHTML='<div class="heroLine"><div><div class="small">'+esc(tr('nextUsefulMass'))+'</div><div class="heroSite">'+esc(siteDisplayName(r))+'</div><div class="heroMeta">'+esc(meta)+'</div></div><div class="heroTime">'+esc(r.time_24h)+'</div></div><div class="heroActions"><a class="primarylink" target="_blank" rel="noopener" href="'+esc(mapsUrl(r))+'">'+esc(tr('directions'))+'</a><button type="button" id="heroShare">'+esc(tr('share'))+'</button><button type="button" id="heroShowNext">'+esc(tr('findNext'))+'</button></div>';
  $('heroShare')?.addEventListener('click',()=>shareAction(r));
  $('heroShowNext')?.addEventListener('click',()=>showNext());
}
function render(){
  updateStaticText();
  const arr=filtered(); renderStats(); renderNotice(); renderNextHero();
  const root=$('results'); root.innerHTML='';
  if(!arr.length){
    const empty=el('div',{class:'empty'});
    if(favOnly && favs.size === 0){
      empty.appendChild(el('div',{},tr('favEmptyTitle')));
      empty.appendChild(el('div',{class:'small'},tr('favEmptyHint')));
      const er=el('div',{class:'actions'});
      const search=el('button',{class:'primary'},tr('favEmptySearch')); search.addEventListener('click',()=>{favOnly=false; syncFavButton(); setActiveNav('navSearch'); scrollToSearch(); render();}); er.appendChild(search);
      const near=el('button',{},tr('favEmptyNear')); near.addEventListener('click',()=>{favOnly=false; syncFavButton(); showNear();}); er.appendChild(near);
      empty.appendChild(er); root.appendChild(empty); return;
    }
    empty.appendChild(el('div',{},tr('noResult')));
    const hintKey = nextMode ? 'noResultNextHint' : (locationErrorKey ? 'locationDenied' : 'noResultHint');
    empty.appendChild(el('div',{class:'small'},tr(hintKey)));
    if($('mode').value !== 'all' && DATA.some(r=>!r.is_mass_only_visible)) empty.appendChild(el('div',{class:'small'},tr('noResultOtherHint')));
    const er=el('div',{class:'actions'});
    const clear=el('button',{},tr('clear')); clear.addEventListener('click',()=>{$('clearBtn').click();}); er.appendChild(clear);
    const sun=el('button',{},tr('qaSundayTitle')); sun.addEventListener('click',()=>showSunday()); er.appendChild(sun);
    const near=el('button',{},tr('qaNearTitle')); near.addEventListener('click',()=>showNear()); er.appendChild(near);
    const all=el('button',{},tr('includeOther')); all.addEventListener('click',()=>{$('mode').value='all'; nextMode=false; quickMode=''; showAllResults=true; render();}); er.appendChild(all);
    empty.appendChild(er); root.appendChild(empty); return;
  }
  const initialBroadView = !showAllResults && !($('q').value || $('day').value || $('region').value || favOnly || nearMode || quickMode);
  const displayArr = initialBroadView ? arr.slice(0,24) : arr;
  root.appendChild(el('div',{class:'small'},displayArr.length+' '+tr('results')+(initialBroadView && arr.length>displayArr.length ? ' · '+tr('showingTop') : '')));
  if(initialBroadView && arr.length>displayArr.length){
    const allWrap=el('div',{class:'actions'}); const btn=el('button',{class:'ghost'},tr('showAllMasses')); btn.addEventListener('click',()=>{showAllResults=true; render();}); allWrap.appendChild(btn); root.appendChild(allWrap);
  }
  for(const r of displayArr){
    const card=el('article',{class:'card'});
    const top=el('div',{class:'top'}); const left=el('div');
    left.appendChild(el('h3',{class:'site'},siteDisplayName(r)));
    left.appendChild(el('div',{class:'meta'},[r.town,r.region].filter(Boolean).join(' · ')));
    left.appendChild(el('div',{class:'meta'},tr('parish')+': '+(r.parish_label||r.parish_name)));
    top.appendChild(left);
    const timeBox=el('div',{class:'timeBox'});
    timeBox.appendChild(el('div',{class:'time'},r.time_24h));
    if(nextMode || nearMode) timeBox.appendChild(el('div',{class:'relative'},relativeText(nextDelta(r))));
    top.appendChild(timeBox); card.appendChild(top);
    const badges=el('div',{class:'badges'});
    badges.appendChild(el('span',{class:'badge mass'},dayLabel(r.day_of_week)));
    if(isVigilMass(r)){ const label = currentLang === 'fr' ? (r.vigil_label_fr || tr('vigilBadge')) : (r.vigil_label_en || tr('vigilBadge')); badges.appendChild(el('span',{class:'badge warn','aria-label':label}, label)); badges.appendChild(el('span',{class:'badge warn','aria-label':tr('sundayObligationBadge')},tr('sundayObligationBadge'))); }
    else if(r.day_of_week === 'Dimanche' && r.is_mass_only_visible){ badges.appendChild(el('span',{class:'badge warn','aria-label':tr('sundayMassBadge')},tr('sundayMassBadge'))); }
    else if(r.is_mass_only_visible){ badges.appendChild(el('span',{class:'badge mass','aria-label':tr('weekdayMassBadge')},tr('weekdayMassBadge'))); }
    if(!r.is_mass_only_visible){ badges.appendChild(el('span',{class:'badge warn','aria-label':tr('otherCelebrationBadge')},tr('otherCelebrationBadge'))); }
    badges.appendChild(el('span',{class:'badge '+(r.is_mass_only_visible?'mass':'')},categoryLabel(r)));
    if(nextMode){ const delta=nextDelta(r); const daysAway=Math.floor(delta/1440); badges.appendChild(el('span',{class:'badge'}, daysAway===0 ? tr('today') : tr('inDays',{n:daysAway}))); }
    if(r.qualifier) badges.appendChild(el('span',{class:'badge'},r.qualifier));
    if(r.special_rule) badges.appendChild(el('span',{class:'badge warn','aria-label':tr('specialRuleBadge')+': '+r.special_rule},r.special_rule));
    const d=userPos?distKm(userPos.lat,userPos.lon,r.latitude,r.longitude):null; if(d!=null) badges.appendChild(el('span',{class:'badge'},distanceLabel(r,d)));
    card.appendChild(badges);
    if(isVigilMass(r)) card.appendChild(el('div',{class:'small vigilLine','aria-label':(currentLang==='fr' ? 'Messe anticipée du dimanche' : 'Vigil Mass for Sunday')}, (currentLang==='fr' ? dayLabel(r.day_of_week)+' '+r.time_24h+' · Messe anticipée du dimanche' : dayLabel(r.day_of_week)+' '+r.time_24h+' · Vigil Mass for Sunday')));
    if(r.notes) card.appendChild(el('div',{class:'small'},r.notes));
    card.appendChild(el('div',{class:'small'},tr('lastVerified')+': '+(r.last_checked || (currentLang === 'fr' ? RELEASE_VERIFIED_DATE_FR : RELEASE_VERIFIED_DATE_EN))+' · '+tr('verifiedNote')));
    const actions=el('div',{class:'actions'});
    actions.appendChild(el('a',{class:'primarylink',href:mapsUrl(r),target:'_blank',rel:'noopener','aria-label':tr('directions')+' — '+siteDisplayName(r)},tr('directions')));
    const share=el('button',{'aria-label':tr('share')+' — '+siteDisplayName(r)},tr('share')); share.addEventListener('click',()=>shareAction(r)); actions.appendChild(share);
    if(r.source_url) actions.appendChild(el('a',{href:r.source_url,target:'_blank',rel:'noopener','aria-label':tr('source')+' — '+siteDisplayName(r)},tr('source')));
    const fav=el('button',{class:'fav '+(favs.has(r.site_uid)?'active':''),'aria-label':(favs.has(r.site_uid)?tr('favouriteOn'):tr('favouriteOff'))+' — '+siteDisplayName(r)},favs.has(r.site_uid)?tr('favouriteOn'):tr('favouriteOff')); fav.addEventListener('click',()=>toggleFav(r.site_uid)); actions.appendChild(fav);
    const rep=el('button',{'aria-label':tr('reportCorrection')+' — '+siteDisplayName(r)},tr('reportCorrection')); rep.addEventListener('click',()=>reportAction(r)); actions.appendChild(rep);
    card.appendChild(actions); root.appendChild(card);
  }
}


let lastFocusedBeforeModal = null;
let onboardingIndex = 0;
const onboardingKeys = [['onboarding1Title','onboarding1Text'],['onboarding2Title','onboarding2Text'],['onboarding3Title','onboarding3Text']];
function modalFocusable(root){ return [...root.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(x=>!x.disabled && x.offsetParent !== null); }
function openModal(id){ const modal=$(id); if(!modal) return; lastFocusedBeforeModal=document.activeElement; modal.hidden=false; document.body.classList.add('modalOpen'); updateHelpModalText(); updateOnboardingText(); setTimeout(()=>{(modalFocusable(modal)[0]||modal).focus();},0); }
function closeModal(id){ const modal=$(id); if(!modal) return; modal.hidden=true; document.body.classList.remove('modalOpen'); if(lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus==='function') lastFocusedBeforeModal.focus({preventScroll:true}); }
function updateHelpModalText(){ if(!$('helpModal')) return; $('helpModalTitle').textContent=tr('helpTitle'); $('helpModalBody').innerHTML=tr('helpHtml'); $('helpClose').textContent=tr('close'); $('helpClose').setAttribute('aria-label',tr('close')); $('helpModal').setAttribute('aria-label',tr('helpTitle')); }
function updateOnboardingText(){ if(!$('onboardingModal')) return; const pair=onboardingKeys[onboardingIndex]||onboardingKeys[0]; $('onboardingTitle').textContent=tr(pair[0]); $('onboardingText').textContent=tr(pair[1]); $('onboardingStep').textContent=(onboardingIndex+1)+' / '+onboardingKeys.length; $('onboardingSkip').textContent=tr('onboardingSkip'); $('onboardingNext').textContent=onboardingIndex===onboardingKeys.length-1?tr('onboardingDone'):tr('onboardingNext'); $('onboardingModal').setAttribute('aria-label',tr(pair[0])); }
function closeOnboarding(){ safeSetLocalStorage('mmf_onboarding_v21_4_done','1'); closeModal('onboardingModal'); }
function initModals(){ $('helpBtn')?.addEventListener('click',()=>openModal('helpModal')); $('helpClose')?.addEventListener('click',()=>closeModal('helpModal')); $('helpBackdrop')?.addEventListener('click',()=>closeModal('helpModal')); $('onboardingSkip')?.addEventListener('click',closeOnboarding); $('onboardingNext')?.addEventListener('click',()=>{ if(onboardingIndex>=onboardingKeys.length-1) closeOnboarding(); else { onboardingIndex++; updateOnboardingText(); $('onboardingNext')?.focus(); } }); $('onboardingBackdrop')?.addEventListener('click',closeOnboarding); document.addEventListener('keydown',e=>{ const open=[...document.querySelectorAll('.modalOverlay:not([hidden])')].pop(); if(!open) return; if(e.key==='Escape'){ e.preventDefault(); open.id==='onboardingModal'?closeOnboarding():closeModal(open.id); } if(e.key==='Tab'){ const f=modalFocusable(open); if(!f.length) return; const first=f[0], last=f[f.length-1]; if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); } } }); updateHelpModalText(); updateOnboardingText(); if(safeGetLocalStorage('mmf_onboarding_v21_4_done','')!=='1') setTimeout(()=>openModal('onboardingModal'),700); }

function scrollToResults(){ document.getElementById('results')?.scrollIntoView({behavior:'smooth', block:'start'}); }
function scrollToSearch(){ document.getElementById('searchPanel')?.scrollIntoView({behavior:'smooth', block:'start'}); }
function setActiveNav(id){ document.querySelectorAll('.navBtn').forEach(b=>b.classList.toggle('active', b.id===id)); }
function showNext(){ nextMode=true; nearMode=false; quickMode=''; favOnly=false; showAllResults=false; syncFavButton(); $('day').value=''; $('mode').value='mass'; setActiveNav('navHome'); render(); scrollToResults(); }
function showSunday(){ nextMode=false; nearMode=false; quickMode='sundayMorning'; favOnly=false; showAllResults=false; syncFavButton(); $('day').value='Dimanche'; $('mode').value='mass'; setActiveNav('navHome'); render(); scrollToResults(); }
function syncFavButton(){ $('favOnlyBtn')?.classList.toggle('primary', favOnly); }
function resetFiltersForNearMe(){
  const day=$('day'), region=$('region'), mode=$('mode'), q=$('q');
  if(day) day.value='';
  if(region) region.value='';
  if(mode) mode.value='mass';
  if(q) q.value='';
  nextMode=false; quickMode=''; favOnly=false; showAllResults=false; syncFavButton(); setActiveNav('navNear');
}
function showFavs(){ favOnly=true; nextMode=false; nearMode=false; quickMode=''; showAllResults=false; syncFavButton(); setActiveNav('navFav'); render(); scrollToResults(); }
function ensureLocationPrompt(){
  let panel = $('locationPrompt');
  if(panel) return panel;
  panel = document.createElement('div');
  panel.id = 'locationPrompt';
  panel.className = 'updateBanner locationPrompt';
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-live','polite');
  panel.innerHTML = '<div><b id="locationPromptTitle"></b><div id="locationPromptText" class="small"></div></div><div class="updateActions"><button id="locationPromptContinue" class="primary" type="button"></button><button id="locationPromptCancel" class="ghost" type="button"></button></div>';
  const searchPanel = $('searchPanel') || document.querySelector('.wrap') || document.body;
  searchPanel.parentNode.insertBefore(panel, searchPanel);
  $('locationPromptContinue').addEventListener('click', () => { panel.style.display='none'; requestLocationAndShowNear(); });
  $('locationPromptCancel').addEventListener('click', () => { panel.style.display='none'; });
  return panel;
}
function updateLocationPromptText(){
  const panel = $('locationPrompt'); if(!panel) return;
  $('locationPromptTitle').textContent = tr('locationExplainTitle');
  $('locationPromptText').textContent = tr('locationExplainText');
  $('locationPromptContinue').textContent = tr('locationContinue');
  $('locationPromptCancel').textContent = tr('locationCancel');
}
function requestLocationAndShowNear(){
  resetFiltersForNearMe();
  if(!navigator.geolocation){ locationErrorKey='locationUnsupported'; nearMode=true; render(); scrollToResults(); return; }
  navigator.geolocation.getCurrentPosition(p=>{
    userPos={lat:p.coords.latitude, lon:p.coords.longitude};
    locationErrorKey='';
    nearMode=true; render(); scrollToResults();
  },()=>{
    resetFiltersForNearMe();
    locationErrorKey='locationDenied';
    nearMode=true; render(); scrollToResults();
  });
}
function showNear(){
  if(!navigator.geolocation){ resetFiltersForNearMe(); locationErrorKey='locationUnsupported'; nearMode=true; render(); scrollToResults(); return; }
  if(userPos){ requestLocationAndShowNear(); return; }
  const panel = ensureLocationPrompt();
  updateLocationPromptText();
  panel.style.display = 'flex';
  panel.scrollIntoView({behavior:'smooth', block:'center'});
}

['q','day','region','mode'].forEach(id => $(id).addEventListener('input',()=>{ nextMode=false; quickMode=''; showAllResults=false; render(); }));
$('nextBtn').addEventListener('click',()=>showNext());
$('clearBtn').addEventListener('click',()=>{ ['q','day','region'].forEach(id=>$(id).value=''); $('mode').value='mass'; nextMode=true; nearMode=false; quickMode=''; favOnly=false; showAllResults=false; userPos=null; locationErrorKey=''; syncFavButton(); setActiveNav('navHome'); render(); });
$('favOnlyBtn').addEventListener('click',()=>{ favOnly=!favOnly; nextMode=false; nearMode=false; quickMode=''; showAllResults=false; syncFavButton(); if(favOnly) setActiveNav('navFav'); render(); scrollToResults(); });
$('nearBtn').addEventListener('click',()=>showNear());

$('qaNow')?.addEventListener('click',()=>showNext());
$('qaNear')?.addEventListener('click',()=>showNear());
$('qaSunday')?.addEventListener('click',()=>showSunday());
$('qaFav')?.addEventListener('click',()=>showFavs());
$('navHome')?.addEventListener('click',()=>{setActiveNav('navHome'); document.getElementById('homePanel')?.scrollIntoView({behavior:'smooth', block:'start'});});
$('navSearch')?.addEventListener('click',()=>{setActiveNav('navSearch'); scrollToSearch();});
$('navNear')?.addEventListener('click',()=>showNear());
$('navFav')?.addEventListener('click',()=>showFavs());
$('navMore')?.addEventListener('click',()=>{setActiveNav('navMore'); document.querySelector('footer')?.scrollIntoView({behavior:'smooth', block:'end'});});
$('langEn')?.addEventListener('click',()=>setLang('en'));
$('langFr')?.addEventListener('click',()=>setLang('fr'));
function openUpdateHelp(){ const about=$('aboutPanel'); if(about) about.open=true; const panel=$('howUpdatePanel') || about; panel?.scrollIntoView({behavior:'smooth', block:'center'}); const btn=$('howUpdateBtn'); btn?.focus({preventScroll:true}); }
$('howUpdateBtn')?.addEventListener('click', openUpdateHelp);
function applyServiceWorkerUpdate(){
  if(!('serviceWorker' in navigator) || location.protocol === 'file:') { location.reload(); return; }
  navigator.serviceWorker.getRegistration().then(reg => {
    if(reg && reg.waiting){
      let reloaded = false;
      const reloadOnce = () => { if(!reloaded){ reloaded = true; location.reload(); } };
      navigator.serviceWorker.addEventListener('controllerchange', reloadOnce, {once:true});
      reg.waiting.postMessage({type:'SKIP_WAITING'});
      setTimeout(reloadOnce, 3000);
    } else {
      location.reload();
    }
  }).catch(()=>location.reload());
}

function ensureUpdateBanner(){
  let b = $('updateBanner');
  if(b) return b;
  b = document.createElement('div');
  b.id = 'updateBanner';
  b.className = 'updateBanner';
  b.setAttribute('role','status');
  b.setAttribute('aria-live','polite');
  b.innerHTML = '<div><b id="updateTitle"></b><div id="updateText" class="small"></div></div><div class="updateActions"><button id="updateRefresh" class="primary" type="button"></button><button id="updateHelp" class="ghost" type="button"></button><button id="updateDismiss" class="ghost" type="button"></button></div>';
  const wrap = document.querySelector('.wrap') || document.body;
  wrap.insertBefore(b, wrap.firstChild);
  $('updateRefresh').setAttribute('aria-label', tr('updateRefresh'));
  $('updateRefresh').addEventListener('click', () => applyServiceWorkerUpdate());
  $('updateHelp')?.addEventListener('click', () => openUpdateHelp());
  $('updateDismiss').addEventListener('click', () => { b.style.display='none'; sessionStorage.setItem('mmf_update_dismissed_' + APP_VERSION, '1'); });
  return b;
}
function showUpdateBanner(newVersion){
  if(sessionStorage.getItem('mmf_update_dismissed_' + APP_VERSION)) return;
  const b = ensureUpdateBanner();
  b.dataset.latest = newVersion || '';
  $('updateTitle').textContent = tr('updateAvailable') + (newVersion ? ' — v' + newVersion : '');
  $('updateText').textContent = tr('updateText');
  $('updateRefresh').textContent = tr('updateRefresh');
  $('updateDismiss').textContent = tr('updateDismiss');
  $('updateHelp').textContent = tr('howUpdateLink');
  b.style.display = 'flex';
}
function parseVersionParts(v){ return String(v || '').replace(/^v/i,'').split('.').map(x=>parseInt(x,10)).filter(n=>Number.isFinite(n)); }
function compareVersions(a,b){ const A=parseVersionParts(a), B=parseVersionParts(b); const n=Math.max(A.length,B.length,1); for(let i=0;i<n;i++){ const x=A[i]||0, y=B[i]||0; if(x>y) return 1; if(x<y) return -1; } return 0; }
async function checkForUpdate(){
  if(location.protocol === 'file:') return;
  try{
    const res = await fetch('version.json?ts=' + Date.now(), {cache:'no-store'});
    if(!res.ok) return;
    const info = await res.json();
    const latest = String(info.version || '').trim();
    if(compareVersions(latest, APP_VERSION) > 0) showUpdateBanner(latest);
  }catch(e){}
}
function registerServiceWorker(){
  if(!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  navigator.serviceWorker.register('sw.js').then(reg => {
    reg.update().catch(()=>{});
    if(reg.waiting) showUpdateBanner();
    reg.addEventListener('updatefound', () => {
      const nw = reg.installing;
      if(!nw) return;
      nw.addEventListener('statechange', () => {
        if(nw.state === 'installed' && navigator.serviceWorker.controller) showUpdateBanner();
      });
    });
  }).catch(()=>{});
}
window.addEventListener('load',()=>{ registerServiceWorker(); checkForUpdate(); setInterval(checkForUpdate, 30*60*1000); });
document.addEventListener('visibilitychange',()=>{ if(!document.hidden) checkForUpdate(); });
initModals();
window.MMF = {render, filtered, getData:()=>DATA, setLang, version:APP_VERSION, buildMapsQuery, siteDisplayName, searchMatchesRow, searchKey, isVigilMass, vigilStatus, isSundayFilterMatch, checkForUpdate};
loadData();
})();
