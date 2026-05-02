(() => {
'use strict';
const APP_VERSION = '24.20.2';
const RELEASE_VERIFIED_DATE_EN = '1 May 2026';
const RELEASE_VERIFIED_DATE_FR = '1 mai 2026';
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
    qaTodayTitle:'Today', qaTodayText:'Show Masses for today.', qaTomorrowTitle:'Tomorrow', qaTomorrowText:'Show Masses for tomorrow.',
    qaNearTitle:'Near me', qaNearText:'Use your location and sort nearby results.', nearResultsTitle:'Next Masses near you', nearNoLocationTitle:'Location needed for Near Me', nearNoLocationText:'To find Masses near you, please allow location access. Without your location, I can show the next Masses in Mauritius, but not the closest ones.', nearUseLocation:'Use my location', nearShowNextMauritius:'Show next Masses in Mauritius', nearFarWarning:'No Mass found closer in time near your current filters.', farAwayLocationWarning:'You seem far from Mauritius. Results may not be relevant to your current location.', ambiguousAroundTime:'Did you mean around {hour}am or around {hour}pm? Try “around {hour}am” or “around {hour}pm”.', ambiguousBeforeTime:'Did you mean before {hour}am or before {hour}pm?', ambiguousAfterTime:'Did you mean after {hour}am or after {hour}pm?', ambiguousTwelveTime:'12 can mean noon or midnight. Try “around noon” or “around midnight”.', noMoreToday:'No more Masses today. Try Tomorrow.',
    qaSundayTitle:'Sunday obligation', qaSundayText:'Show Sunday Masses and Saturday Masses from 15:30 onward.',
    qaFavTitle:'My Churches', qaFavText:'Open your saved churches quickly.',
    locationExplainTitle:'Use your location?', locationExplainText:'Your location is used only on this device to sort Masses by distance. It is not stored or sent by this app.', locationContinue:'Continue', locationCancel:'Not now', showAllMasses:'Show all Masses', showingTop:'Showing the most useful results first. You can show all results at any time.',
    navHome:'Home', navSearch:'Search', navNear:'Near me', navFav:'My Churches', myChurches:'My Churches', navMore:'More',
    aboutTitle:'About this app', aboutText:'A simple Catholic Mass finder for Mauritius, built for fast mobile use.', aboutHtml:'<p>A simple Catholic Mass finder for Mauritius, built for fast mobile use.</p><p><b>Purpose:</b> help users find a suitable Mass quickly by day, parish, area, saved church, or nearby location.</p><p><b>Data:</b> the database is based on the project’s reconciled diocesan parish data and includes source links on each result.</p><p><b>Important:</b> Mass times can change. When timing is critical, verify directly with the parish using the source link.</p><p><b>Privacy:</b> location is used only on your device to sort nearby results. It is not stored by this app.</p><p><b>Analytics:</b> This app may use privacy-friendly analytics to understand general usage. It does not need an account and does not collect personal Mass attendance, saved churches, or precise location.</p>', mainNavigation:'Main navigation', languageLabel:'Language', quickActionsLabel:'Quick actions', nextUsefulMass:'Next useful Mass', shareTitle:'Mauritius Mass Finder', reportSubject:'Correction for Mauritius Mass Finder', versionWord:'Version', share:'Share', shareThisMass:'Share Mass details', shareText:'Mass details: {site}, {parish}, {day} {time}{qualifier}. Source: {source}. Directions: {url}. App: {app}', shareCopied:'Mass details copied. You can paste them into WhatsApp or a message.', qaShareTitle:'Share app', qaShareText:'Send the app link by WhatsApp, Messages, or email.', shareApp:'Share app', appShareText:'Find a Catholic Mass quickly anywhere in Mauritius.', appShareCopied:'App link copied.',
    sundayNotice:'Showing Sunday Masses and Saturday Masses from 15:30 onward.',
    searchPlaceholder:'Search place, time, or church…', searchLabel:'Search by place, time, parish, church, or town', searchHint:'Try: “evening Mass Curepipe”', searchSuggestionsLabel:'Suggestions', searchUnderstoodLabel:'Search understood', chipTomorrow:'Tomorrow', chipToday:'Today', chipNearMe:'Near me', chipEnglish:'English', chipOtherCelebrations:'Other celebrations', chipAfter:'After {time}', recentSearchesLabel:'Recent searches', clearRecentSearches:'Clear recent searches', analyticsDisclosure:'This app may use privacy-friendly analytics to understand general usage. It does not need an account and does not collect personal Mass attendance, saved churches, or precise location.', dayFilterLabel:'Filter by day', regionFilterLabel:'Filter by region', modeFilterLabel:'Filter by Masses only or include other celebrations', anyDay:'Any day', allRegions:'All regions', timeOfDayFilterLabel:'Filter by time of day', allDay:'All day', morning:'Morning', afternoon:'Afternoon', evening:'Evening', semanticMorningNotice:'Showing morning Masses', semanticAfternoonNotice:'Showing afternoon Masses', semanticEveningNotice:'Showing evening Masses', verifiedLabel:'Verified', verificationNeeded:'Verification needed', massesOnly:'Masses only', includeOther:'Include other celebrations', englishLimitedNotice:'English Masses in Mauritius are limited. Showing all available.', verifyBeforeVisit:'Verify before visiting',
    findNext:'Find next Mass', useLocation:'Use my location', favouritesOnly:'My Churches only', clear:'Clear', loading:'Loading data…',
    updateTitle:'Update the database without rebuilding', updateA:'<b>Option A:</b> edit <code>data/masses.json</code> in GitHub and commit. The app fetches it on launch.', updateB:'<b>Option B:</b> publish a Google Sheet as CSV and paste the published CSV URL in <code>config.js</code>.', fallbackNote:'The app falls back to the embedded full database if the live file is unavailable.', footerNote:'Sources are linked on each result. Always verify special services directly with the parish when timing is critical.',
    rowWord:'', rows:'', parishes:'Parishes', sites:'Churches & chapels', massRows:'Masses', other:'Other celebrations', showing:'', results:'results found', trustStrip:'{parishes} parishes · {sites} churches & chapels · verified {date}',
    noResult:'No Mass found.', noResultHint:'Try a nearby town, a simpler church name, “evening Mass”, “messe du soir”, or clear your filters.', nearNoMatchHint:'No nearby Mass matches all your filters. Try removing the time, day, or place filter.', noResultNextHint:'No upcoming Mass found with the current filters. Try a nearby town, a simpler name, or clear filters.', noResultOtherHint:'Some non-Mass celebrations may be hidden. Turn on “Include other celebrations” if needed.', noResultFilters:'Results exist, but your filters are hiding them.', activeFiltersLabel:'Active filters', clearFiltersAction:'Clear filters', didYouMean:'Did you mean', searchExamples:'Try: evening Mass Curepipe, morning Mass Port Louis, 18h Quatre Bornes, Saint Jean.', favEmptyTitle:'You haven’t saved any churches yet.', favEmptyHint:'You have not saved any churches yet. Tap ❤️ / Save on a church to add it here.', favEmptySearch:'Search now', favEmptyNear:'Show nearby Masses', vigilBadge:'Vigil Mass', vigilNotice:'Sunday obligation mode includes Sunday Masses and Saturday Masses from 15:30 onward.', nextNotice:'Showing the next available Masses across the coming 7 days, sorted by soonest time.', locationNotice:'Showing nearby Masses first. Wider results may appear if few are available.', favNotice:'Showing My Churches only.', otherNotice:'Other celebrations are shown separately and are not mixed into Masses-only results.',
    parish:'Parish', today:'Today', tomorrow:'Tomorrow', inDays:'In {n} day(s)', distanceExact:'{n} km', distanceApprox:'~{n} km', directions:'Directions', source:'Official source', favouriteOn:'★ My Church', favouriteOff:'☆ Save church', reportCorrection:'Report correction',
    dataLiveJson:'Database loaded', dataGoogle:'Live database loaded', dataFallback:'Offline database loaded', copied:'Correction template copied and email opened.', locationAsk:'Use your location to show nearby Masses. Your location is not stored.', locationDenied:'Location access is needed for Near Me. You can still search by place, parish, or time.', locationUnsupported:'Location is not available. You can still search by church, area, parish, or use directions from a result card.', correction:'Correction', checkEntry:'Please check this Mass Finder entry:', dayTime:'Day/time', serviceMass:'Mass', serviceOther:'Other celebration', updateAvailable:'A new version is available', updateText:'Refresh to use the latest version. If the old version remains, close and reopen the app.', updateRefresh:'Refresh now', updateDismiss:'Later', lastVerified:'Last verified', verifiedNote:'Mass times can change. Check the official source for feast days, funerals, cyclones, holidays, or recent parish changes.', howUpdateLink:'How to update', howUpdateTitle:'How to update the app', howUpdateHtml:'<h3>How to update the app</h3><p>If a new version is available:</p><ol><li>Tap “Refresh / Update” if the banner appears.</li><li>If the app does not update, close it completely and reopen it.</li><li>On iPhone, swipe up and close the app from the app switcher, then reopen it.</li><li>If it is still stuck on an old version, remove the home-screen shortcut and install it again from the latest link.</li></ol><p>Your saved churches should normally remain saved.</p>', sundayObligationBadge:'Counts for Sunday obligation', sundayMassBadge:'Sunday Mass', weekdayMassBadge:'Weekday Mass', specialRuleBadge:'Special rule', otherCelebrationBadge:'Other celebration / ambiguous', vigilInferredBadge:'Counts for Sunday obligation', whatNewTitle:'What’s new in v24.20.2', whatNewHtml:'<ul><li>Rebuilt from the last stable baseline.</li><li>Replaced the ambiguous header share icon with a clear Share button.</li><li>Protected the update refresh flow with cache-busted reload fallback.</li><li>Preserved the stable bottom navigation and core search behaviour.</li></ul>', helpLink:'Help', helpTitle:'Help Center / User Guide', backToResults:'Back to results', helpHtml:'<h3>Find a Mass quickly</h3><p>Use simple words. You can search by place, time, or both together.</p><h4>Search by place</h4><p>Try a town, parish, or church name: <b>Curepipe</b>, <b>Quatre Bornes</b>, <b>Port Louis</b>, <b>Saint Jean</b>, <b>Sacré Coeur</b>.</p><h4>Search by time</h4><p>Try natural words: <b>evening Mass</b>, <b>morning Mass</b>, <b>afternoon Mass</b>, <b>messe du soir</b>, <b>messe du matin</b>.</p><h4>Combine place and time</h4><p>Try: <b>evening Mass Curepipe</b>, <b>morning Mass Port Louis</b>, <b>messe du soir Quatre Bornes</b>.</p><h4>Use an exact time</h4><p>Try: <b>18:00</b>, <b>18h</b>, <b>6pm</b>, or <b>07:30</b>.</p><h4>Spelling tips</h4><p>You do not need accents. <b>Sacre Coeur</b> can find <b>Sacré-Cœur</b>. You can type <b>Saint</b> or <b>St</b>. Partial names often work.</p><h3>Near Me / Next Mass</h3><p>Tap <b>Next Mass near you</b> or <b>Near me</b> and allow location access. The app shows upcoming Masses, with nearby options first. Distances marked with <b>~</b> are approximate.</p><h3>My Churches</h3><p>Tap <b>Save church</b> to keep a church in <b>My Churches</b>. Tap again to remove it.</p><h3>Share the app</h3><p>Tap <b>Share app</b> to send the link by WhatsApp, Messages, or email.</p><h3>Other celebrations</h3><p>By default, the app shows Masses only. Turn on <b>Include other celebrations</b> to also show items such as adoration, prayer services, or other non-Mass celebrations.</p><h3>Accuracy and source information</h3><p>Each result includes an official source link where available. Mass times can change for feast days, funerals, cyclones, public holidays, or parish updates. When timing is critical, check the source or contact the parish.</p><h3>Report a correction</h3><p>On any result, tap <b>Report correction</b>. The app prepares the church, parish, day, time, and source details so a correction can be sent easily.</p><h3>Updating the app</h3><p>If an update banner appears, tap <b>Refresh now</b>. If the old version remains, close the app completely and reopen it. Your saved churches should normally remain saved.</p>', close:'Close', onboardingSkip:'Skip', onboardingNext:'Next', onboardingDone:'Got it', onboarding1Title:'Find a Mass in seconds', onboarding1Text:'Try simple searches like Curepipe, evening Mass, messe du matin, or 18h.', onboarding2Title:'Combine time and place', onboarding2Text:'Try evening Mass Quatre Bornes or messe du soir Curepipe to narrow results faster.', onboarding3Title:'Use Near Me and save churches', onboarding3Text:'Allow location to find nearby Masses, and save your regular churches in My Churches.', approximateLabel:'Approximate distance', exactLabel:'Distance', townLabel:'Town', categoryLabelText:'Category', mapsLabel:'Maps', appVersionLabel:'App version', correctionPrompt:'Correction needed', nearPrecisionNote:'Nearby results are prioritised within about 12 km where available. Distances marked ~ are approximate.', trustNote:'Mass times can change. Check the official source for feast days, funerals, cyclones, holidays, or recent parish changes. Report a correction if something looks wrong.'
  },
  fr: {
    appTitle:'Trouver une Messe à Maurice',
    heroText:'Trouvez rapidement une messe à Maurice',
    quickTitle:'De quoi avez-vous besoin ?', quickHint:'Un clic. Sans taper.',
    qaNowTitle:'Trouver une messe maintenant', qaNowText:'Prochaines messes, triées par horaire.',
    qaTodayTitle:'Aujourd’hui', qaTodayText:'Afficher les messes d’aujourd’hui.', qaTomorrowTitle:'Demain', qaTomorrowText:'Afficher les messes de demain.',
    qaNearTitle:'Près de moi', qaNearText:'Utilisez votre position et triez les résultats proches.', nearResultsTitle:'Prochaines messes près de vous', farAwayLocationWarning:'Vous semblez loin de Maurice. Les résultats peuvent ne pas correspondre à votre position actuelle.', ambiguousAroundTime:'Voulez-vous dire vers {hour}h ou vers {hour24}h ? Essayez « vers {hour}h » ou « vers {hour24}h ».', ambiguousBeforeTime:'Voulez-vous dire avant {hour}h ou avant {hour24}h ?', ambiguousAfterTime:'Voulez-vous dire après {hour}h ou après {hour24}h ?', ambiguousTwelveTime:'12h peut vouloir dire midi ou minuit. Essayez « vers midi » ou « vers minuit ».', noMoreToday:'Il n’y a plus de messes aujourd’hui. Essayez Demain.',
    qaSundayTitle:'Messe du dimanche', qaSundayText:'Afficher les messes du dimanche et les messes du samedi à partir de 15h30.',
    qaFavTitle:'Mes églises', qaFavText:'Ouvrir rapidement vos églises sauvegardées.',
    locationExplainTitle:'Utiliser votre position ?', locationExplainText:'Votre position sert uniquement sur cet appareil à trier les messes par distance. Elle n’est pas enregistrée ni envoyée par cette application.', locationContinue:'Continuer', locationCancel:'Pas maintenant', showAllMasses:'Afficher toutes les messes', showingTop:'Affichage prioritaire des résultats les plus utiles. Vous pouvez afficher tous les résultats à tout moment.',
    navHome:'Accueil', navSearch:'Recherche', navNear:'Près de moi', navFav:'Mes églises', myChurches:'Mes églises', navMore:'Plus',
    aboutTitle:'À propos de cette application', aboutText:'Une application simple pour trouver rapidement les messes à Maurice sur mobile.', aboutHtml:'<p>Une application simple pour trouver rapidement les messes à Maurice sur mobile.</p><p><b>Objectif :</b> aider les utilisateurs à trouver rapidement une messe par jour, paroisse, région, église sauvegardée ou position proche.</p><p><b>Données :</b> la base repose sur les données diocésaines réconciliées du projet et chaque résultat contient un lien source.</p><p><b>Important :</b> les horaires peuvent changer. Lorsque l’horaire est critique, vérifiez directement auprès de la paroisse avec le lien source.</p><p><b>Confidentialité :</b> votre position sert uniquement sur votre appareil à trier les résultats proches. Elle n’est pas enregistrée par cette application.</p><p><b>Statistiques :</b> Cette application peut utiliser des statistiques anonymes et agrégées pour comprendre l’utilisation générale, par exemple les visites et les fonctions utilisées. Elle ne collecte pas votre nom, vos églises enregistrées ni votre position précise.</p>', mainNavigation:'Navigation principale', languageLabel:'Langue', quickActionsLabel:'Actions rapides', nextUsefulMass:'Prochaine messe utile', shareTitle:'Trouver une Messe à Maurice', reportSubject:'Correction pour Mauritius Mass Finder', versionWord:'Version', share:'Partager', shareThisMass:'Partager les détails', shareText:'Détails de la messe : {site}, {parish}, {day} {time}{qualifier}. Source : {source}. Itinéraire : {url}. App : {app}', shareCopied:'Les détails de la messe ont été copiés. Vous pouvez les coller dans WhatsApp ou un message.', qaShareTitle:'Partager l’application', qaShareText:'Envoyez le lien par WhatsApp, Messages ou e-mail.', shareApp:'Partager l’application', appShareText:'Trouvez rapidement une messe catholique à Maurice.', appShareCopied:'Lien de l’application copié.',
    sundayNotice:'Affichage des messes du dimanche et des messes du samedi à partir de 15h30.',
    searchPlaceholder:'Rechercher lieu, horaire ou église…', searchLabel:'Rechercher par lieu, horaire, paroisse, église ou ville', searchHint:'Essayez : « messe du soir Curepipe »', searchSuggestionsLabel:'Suggestions', searchUnderstoodLabel:'Recherche comprise', chipTomorrow:'Demain', chipToday:'Aujourd’hui', chipNearMe:'Près de moi', chipEnglish:'Anglais', chipOtherCelebrations:'Autres célébrations', chipAfter:'Après {time}', recentSearchesLabel:'Recherches récentes', clearRecentSearches:'Effacer les recherches récentes', analyticsDisclosure:'Cette application peut utiliser des statistiques respectueuses de la vie privée pour comprendre l’usage général. Elle ne nécessite pas de compte et ne collecte pas votre participation personnelle aux messes, vos églises enregistrées ni votre position précise.', dayFilterLabel:'Filtrer par jour', regionFilterLabel:'Filtrer par région', modeFilterLabel:'Filtrer par messes seulement ou inclure les autres célébrations', anyDay:'Tous les jours', allRegions:'Toutes les régions', timeOfDayFilterLabel:'Filtrer par moment de la journée', allDay:'Toute la journée', morning:'Matin', afternoon:'Après-midi', evening:'Soir', semanticMorningNotice:'Affichage des messes du matin', semanticAfternoonNotice:'Affichage des messes de l’après-midi', semanticEveningNotice:'Affichage des messes du soir', verifiedLabel:'Vérifié', verificationNeeded:'Vérification nécessaire', massesOnly:'Messes seulement', includeOther:'Inclure les autres célébrations', englishLimitedNotice:'Les messes en anglais sont limitées à Maurice. Voici toutes les options disponibles.', verifyBeforeVisit:'Vérifiez avant de vous déplacer',
    findNext:'Trouver la prochaine messe', useLocation:'Utiliser ma position', favouritesOnly:'Mes églises seulement', clear:'Effacer', loading:'Chargement des données…',
    updateTitle:'Mettre à jour la base sans reconstruire', updateA:'<b>Option A :</b> modifiez <code>data/masses.json</code> dans GitHub et validez. L’application le charge au démarrage.', updateB:'<b>Option B :</b> publiez une feuille Google en CSV et collez l’URL CSV publiée dans <code>config.js</code>.', fallbackNote:'L’application utilise la base intégrée si le fichier en direct n’est pas disponible.', footerNote:'Les sources sont liées sur chaque résultat. Vérifiez toujours les services spéciaux directement avec la paroisse lorsque l’horaire est critique.',
    rowWord:'', rows:'', parishes:'Paroisses', sites:'Églises et chapelles', massRows:'Messes', other:'Autres célébrations', showing:'', results:'résultats', trustStrip:'{parishes} paroisses · {sites} églises et chapelles · vérifié {date}',
    noResult:'Aucune messe trouvée.', noResultHint:'Essayez une ville proche, un nom d’église plus simple, « messe du soir », « evening Mass », ou effacez les filtres.', noResultNextHint:'Aucune prochaine messe trouvée avec les filtres actuels. Essayez une ville proche, un nom plus simple, ou effacez les filtres.', noResultOtherHint:'Certaines célébrations hors messe peuvent être masquées. Activez « Inclure les autres célébrations » si nécessaire.', noResultFilters:'Des résultats existent, mais vos filtres les masquent.', activeFiltersLabel:'Filtres actifs', clearFiltersAction:'Effacer les filtres', didYouMean:'Voulez-vous dire', searchExamples:'Essayez : messe du soir Curepipe, messe du matin Port Louis, 18h Quatre Bornes, Saint Jean.', favEmptyTitle:'Vous n’avez encore enregistré aucune église.', favEmptyHint:'Vous n’avez pas encore enregistré d’églises. Appuyez sur ❤️ / Enregistrer sur une église pour l’ajouter ici.', favEmptySearch:'Rechercher maintenant', favEmptyNear:'Afficher les messes proches', vigilBadge:'Messe anticipée', vigilNotice:'Le mode obligation dominicale inclut les messes du dimanche et les messes du samedi à partir de 15h30.', nextNotice:'Affichage des prochaines messes disponibles sur les 7 prochains jours, triées par horaire.', locationNotice:'Les messes proches sont affichées en premier. Des résultats plus éloignés peuvent apparaître s’il y a peu d’options.', favNotice:'Affichage de mes églises seulement.', otherNotice:'Les autres célébrations sont affichées séparément et ne sont pas mélangées aux résultats “messes seulement”.',
    parish:'Paroisse', today:'Aujourd’hui', tomorrow:'Demain', inDays:'Dans {n} jour(s)', distanceExact:'{n} km', distanceApprox:'~{n} km', directions:'Itinéraire', source:'Source officielle', favouriteOn:'★ Mon église', favouriteOff:'☆ Sauvegarder', reportCorrection:'Signaler une correction',
    dataLiveJson:'Base chargée', dataGoogle:'Base en direct chargée', dataFallback:'Base hors ligne chargée', copied:'Modèle copié et e-mail ouvert.', locationAsk:'Utilisez votre position pour afficher les messes proches. Votre position n’est pas enregistrée.', locationDenied:'La localisation est nécessaire pour « près de moi ». Vous pouvez toujours rechercher par lieu, paroisse ou horaire.', locationUnsupported:'La localisation n’est pas disponible. Vous pouvez chercher par église, région, paroisse, ou utiliser l’itinéraire depuis une fiche.', correction:'Correction', checkEntry:'Veuillez vérifier cette entrée du Mass Finder :', dayTime:'Jour/heure', serviceMass:'Messe', serviceOther:'Autre célébration', updateAvailable:'Une nouvelle version est disponible', updateText:'Actualisez pour utiliser la dernière version. Si l’ancienne version reste affichée, fermez puis rouvrez l’application.', updateRefresh:'Actualiser', updateDismiss:'Plus tard', lastVerified:'Dernière vérification', verifiedNote:'Les horaires peuvent changer. Vérifiez la source officielle en cas de fêtes, funérailles, cyclones, jours fériés ou changement paroissial récent.', howUpdateLink:'Comment mettre à jour', howUpdateTitle:'Comment mettre l’application à jour', howUpdateHtml:'<h3>Comment mettre l’application à jour</h3><p>Si une nouvelle version est disponible :</p><ol><li>Appuyez sur « Actualiser / Mettre à jour » si la bannière apparaît.</li><li>Si l’application ne se met pas à jour, fermez-la complètement puis rouvrez-la.</li><li>Sur iPhone, fermez l’application depuis le sélecteur d’applications, puis rouvrez-la.</li><li>Si l’ancienne version reste bloquée, supprimez le raccourci de l’écran d’accueil et réinstallez-le avec le dernier lien.</li></ol><p>Vos églises enregistrées devraient normalement rester sauvegardées.</p>', sundayObligationBadge:'Obligation dominicale', sundayMassBadge:'Messe du dimanche', weekdayMassBadge:'Messe de semaine', specialRuleBadge:'Règle spéciale', otherCelebrationBadge:'Autre célébration / ambigu', vigilInferredBadge:'Obligation dominicale', whatNewTitle:'Nouveautés v24.20.2', whatNewHtml:'<ul><li>Reconstruction depuis la dernière base stable.</li><li>Remplacement de l’icône de partage ambiguë par un bouton Partager clair.</li><li>Protection du bouton Actualiser avec un rechargement forcé de secours.</li><li>Préservation de la navigation inférieure stable et de la recherche principale.</li></ul>', helpLink:'Aide', helpTitle:'Centre d’aide / Guide d’utilisation', backToResults:'Retour aux résultats', helpHtml:'<h3>Trouver une messe rapidement</h3><p>Utilisez des mots simples. Vous pouvez chercher par lieu, par moment, ou les deux ensemble.</p><h4>Rechercher par lieu</h4><p>Essayez une ville, une paroisse ou une église : <b>Curepipe</b>, <b>Quatre Bornes</b>, <b>Port Louis</b>, <b>Saint Jean</b>, <b>Sacré Cœur</b>.</p><h4>Rechercher par horaire</h4><p>Essayez des mots simples : <b>messe du soir</b>, <b>messe du matin</b>, <b>messe de l’après-midi</b>, <b>evening Mass</b>, <b>morning Mass</b>.</p><h4>Combiner lieu et horaire</h4><p>Essayez : <b>messe du soir Curepipe</b>, <b>messe du matin Port Louis</b>, <b>evening Mass Quatre Bornes</b>.</p><h4>Utiliser une heure précise</h4><p>Essayez : <b>18h</b>, <b>18:00</b>, <b>6pm</b> ou <b>07:30</b>.</p><h4>Conseils d’écriture</h4><p>Les accents ne sont pas obligatoires. <b>Sacre Coeur</b> peut trouver <b>Sacré-Cœur</b>. Vous pouvez écrire <b>Saint</b> ou <b>St</b>. Un nom partiel suffit souvent.</p><h3>Près de moi / Prochaine messe</h3><p>Appuyez sur <b>Prochaine messe près de vous</b> ou <b>Près de moi</b> et autorisez la localisation. L’application affiche les prochaines messes, avec les options proches en priorité. Les distances avec <b>~</b> sont approximatives.</p><h3>Mes églises</h3><p>Appuyez sur <b>Sauvegarder</b> pour garder une église dans <b>Mes églises</b>. Appuyez à nouveau pour la retirer.</p><h3>Partager l’application</h3><p>Appuyez sur <b>Partager l’application</b> pour envoyer le lien par WhatsApp, Messages ou e-mail.</p><h3>Autres célébrations</h3><p>Par défaut, l’application affiche uniquement les messes. Activez <b>Inclure les autres célébrations</b> pour voir aussi des adorations, temps de prière ou autres célébrations qui ne sont pas des messes.</p><h3>Exactitude et sources</h3><p>Chaque résultat contient un lien vers la source officielle lorsqu’elle est disponible. Les horaires peuvent changer en cas de fêtes, funérailles, cyclones, jours fériés ou changement paroissial. Lorsque l’horaire est important, vérifiez la source ou contactez la paroisse.</p><h3>Signaler une correction</h3><p>Sur un résultat, appuyez sur <b>Signaler une correction</b>. L’application prépare les détails de l’église, de la paroisse, du jour, de l’heure et de la source.</p><h3>Mettre à jour l’application</h3><p>Si une bannière de mise à jour apparaît, appuyez sur <b>Actualiser</b>. Si l’ancienne version reste affichée, fermez complètement l’application puis rouvrez-la. Vos églises enregistrées devraient normalement rester sauvegardées.</p>', close:'Fermer', onboardingSkip:'Passer', onboardingNext:'Suivant', onboardingDone:'Compris', onboarding1Title:'Trouver une messe en quelques secondes', onboarding1Text:'Essayez des recherches simples comme Curepipe, messe du soir, morning Mass ou 18h.', onboarding2Title:'Combiner horaire et lieu', onboarding2Text:'Essayez messe du soir Quatre Bornes ou evening Mass Curepipe pour cibler plus vite.', onboarding3Title:'Utiliser Près de moi et Mes églises', onboarding3Text:'Autorisez la localisation pour trouver les messes proches et sauvegardez vos églises habituelles.', approximateLabel:'Distance approximative', exactLabel:'Distance', townLabel:'Localité', categoryLabelText:'Catégorie', mapsLabel:'Cartes', appVersionLabel:'Version de l’application', correctionPrompt:'Correction à apporter', nearPrecisionNote:'Les résultats proches sont priorisés autour de 12 km lorsque possible. Les distances avec ~ sont approximatives.', trustNote:'Les horaires peuvent changer. Vérifiez la source officielle en cas de fêtes, funérailles, cyclones, jours fériés ou changement paroissial récent. Signalez une correction si une information semble incorrecte.'
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
    const legacy = safeGetLocalStorage('mmf_site_favourites', '');
    const raw = safeGetLocalStorage('mmf_my_churches', legacy || '[]');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.filter(Boolean)) : new Set();
  } catch(e){
    try { localStorage.removeItem('mmf_my_churches'); localStorage.removeItem('mmf_site_favourites'); } catch(_e){}
    return new Set();
  }
}
const savedLang = safeGetLocalStorage('mmf_language', safeGetLocalStorage('mmf_lang', ''));
let currentLang = (savedLang === 'fr' || savedLang === 'en') ? savedLang : (((navigator.language || 'en').toLowerCase().startsWith('fr')) ? 'fr' : 'en');
const favs = safeLoadFavourites();
const $ = id => document.getElementById(id);
const tr = (key, vars={}) => String((T[currentLang] && T[currentLang][key]) || T.en[key] || key).replace(/\{(\w+)\}/g, (_,k)=>vars[k] ?? '');
const dayLabel = d => (DAY_LABELS[currentLang] && DAY_LABELS[currentLang][d]) || d;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ALIAS_MAP = [
  ['st louis','saint louis'],
  ['st louis','cathedrale saint louis'],
  ['saint louis','cathedrale saint louis'],
  ['cathedral','cathedrale'],
  ['cathedrale','cathedrale'],
  ['cathédrale','cathedrale'],
  ['catedral','cathedrale'],
  ['sacre coeur','sacre coeur'],
  ['sacré-cœur','sacre coeur'],
  ['sacre couer','sacre coeur'],
  ['salette','notre dame de la salette'],
  ['nd salette','notre dame de la salette'],
  ['notre dame salette','notre dame de la salette'],
  ['notre-dame salette','notre dame de la salette'],
  ['nd','notre dame'],
  ['quatre bornes','quatre bornes'],
  ['rose hill','rose hill'],
  ['grand baie','grand baie']
];
const norm = s => String(s || '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[œŒ]/g,'oe').replace(/[æÆ]/g,'ae')
  .toLowerCase()
  .replace(/[’'\`´]/g,' ')
  .replace(/[-–—_/.,;:()\[\]{}!?]+/g,' ')
  .replace(/\b(stes)\b/g,'saintes')
  .replace(/\b(ste)\b/g,'sainte')
  .replace(/\b(sts)\b/g,'saints')
  .replace(/\b(st)\b/g,'saint')
  .replace(/\b(nd)\b/g,'notre dame')
  .replace(/[^a-z0-9]+/g,' ')
  .replace(/\s+/g,' ')
  .trim();
const SEARCH_STOPWORDS = new Set(['de','du','des','la','le','l','les']);
const WEAK_FUZZY_TOKENS = new Set(['saint','sainte','saints','saintes']);
function searchKey(s){
  return norm(s).split(' ').filter(t => t && !SEARCH_STOPWORDS.has(t)).join(' ');
}
const NEAR_ME_PATTERNS = ['pres de moi','proche de moi','autour de moi','a cote de moi','dans les environs','autour d ici','near me','nearby','closest','nearest','around me','close to me','next to me'];
function isNearMeIntent(raw){ const q=norm(raw); return !!q && NEAR_ME_PATTERNS.some(p=>q===p || q.includes(p)); }
function coordinateRank(r){ return isExactCoord(r) ? 0 : 1; }
const NEAR_ME_REASONABLE_RADIUS_KM = 12;
function nearSortKey(r, intent=null){
  const delta=nextDelta(r);
  const distance=userPos ? (distKm(userPos.lat,userPos.lon,r.latitude,r.longitude) ?? 9999) : 9999;
  const days=Math.floor(delta/1440);
  // Hard precedence guard: a Mass today/tomorrow within a reasonable nearby radius
  // must outrank a very close church whose next Mass is several days away.
  const practicalTimeBucket = (days <= 1 && distance <= NEAR_ME_REASONABLE_RADIUS_KM) ? 0 : 1;
  const rowMinutes = mins(r.time_24h);
  const hasExact = !!(intent && intent.exactTime && intent.afterMinutes == null && intent.beforeMinutes == null);
  const exactDelta = hasExact ? Math.abs(rowMinutes - intent.exactTime.minutes) : 9999;
  // Exact-time Near Me queries should respect the requested clock time, but not
  // promote a distant future result above a practical today/tomorrow option.
  const exactDayBucket = hasExact ? (days <= 1 ? 0 : (days <= 3 ? 1 : 2)) : 0;
  return {practicalTimeBucket, exactDayBucket, exactDelta, days, minutes:delta, distance, precision:coordinateRank(r), name:siteDisplayName(r)};
}
function compareNearResults(a,b,intent=null){
  const ka=nearSortKey(a,intent), kb=nearSortKey(b,intent);
  if(intent && intent.exactTime && intent.afterMinutes == null && intent.beforeMinutes == null){
    return (ka.exactDayBucket-kb.exactDayBucket)||(ka.exactDelta-kb.exactDelta)||(ka.practicalTimeBucket-kb.practicalTimeBucket)||(ka.days-kb.days)||(ka.minutes-kb.minutes)||(ka.distance-kb.distance)||(ka.precision-kb.precision)||ka.name.localeCompare(kb.name);
  }
  return (ka.practicalTimeBucket-kb.practicalTimeBucket)||(ka.days-kb.days)||(ka.minutes-kb.minutes)||(ka.distance-kb.distance)||(ka.precision-kb.precision)||ka.name.localeCompare(kb.name);
}
function queryVariants(raw){
  const base = searchKey(raw);
  if(!base) return [];
  const variants = new Set([base]);
  ALIAS_MAP.forEach(([from,to])=>{
    const f=searchKey(from), t=searchKey(to);
    if(!f||!t) return;
    if(base === f || base.includes(f)) variants.add(base.replace(f,t));
    if(base === t || base.includes(t)) variants.add(base.replace(t,f));
  });
  return [...variants].filter(Boolean);
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
function typoLimit(qt, ht){
  if(qt.length < 4 || ht.length < 4) return 0;
  if(qt.length >= 8 && ht.length >= 8) return 2;
  if(qt.length >= 5 && ht.length >= 5) return 1;
  return 1;
}
function tokenStrongMatch(qt, ht){
  if(!qt || !ht) return false;
  if(ht === qt || ht.startsWith(qt) || qt.startsWith(ht)) return true;
  return qt.length >= 4 && ht.includes(qt);
}
function tokenFuzzyMatch(qt, ht){
  if(!qt || !ht || WEAK_FUZZY_TOKENS.has(qt)) return false;
  const lim = typoLimit(qt, ht);
  return lim > 0 && editDistanceLimited(qt, ht, lim) <= lim;
}
function fuzzyTokensMatch(queryTokens, hayTokens){
  if(!queryTokens.length) return true;
  if(queryTokens.length > 5) return false;
  let strongCount = 0, fuzzyCount = 0;
  const ok = queryTokens.every(qt => {
    if(hayTokens.some(ht => tokenStrongMatch(qt, ht))){ strongCount++; return true; }
    if(hayTokens.some(ht => tokenFuzzyMatch(qt, ht))){ fuzzyCount++; return true; }
    return false;
  });
  if(!ok) return false;
  if(fuzzyCount === 0) return true;
  if(queryTokens.length === 1) return queryTokens[0].length >= 5;
  return strongCount >= 1 && fuzzyCount <= 2;
}
function fieldScoreForKey(vKey, qKey, weight){
  if(!qKey || !vKey) return 0;
  if(vKey === qKey) return 120 * weight;
  if(vKey.startsWith(qKey)) return 96 * weight;
  if(vKey.includes(qKey)) return 78 * weight;
  const qTokens=qKey.split(' ').filter(Boolean), vTokens=vKey.split(' ').filter(Boolean);
  if(qTokens.length && qTokens.every(qt=>vTokens.some(vt=>vt===qt || vt.startsWith(qt)))) return 68 * weight;
  if(weight <= 1 || vTokens.length > 18) return 0;
  if(qTokens.length && fuzzyTokensMatch(qTokens, vTokens)){
    const fuzzyOnly = qTokens.every(qt=>!vTokens.some(vt=>tokenStrongMatch(qt,vt)));
    return (fuzzyOnly ? 36 : 52) * weight;
  }
  return 0;
}
function fieldScore(value, rawQuery, weight){
  const vKey = searchKey(value || '');
  return queryVariants(rawQuery).reduce((best,qKey)=>Math.max(best, fieldScoreForKey(vKey,qKey,weight)),0);
}
function searchScore(r, rawQuery){
  if(!norm(rawQuery)) return 0;
  const variants = queryVariants(rawQuery);
  const fields = r._search_fields || [
    [siteDisplayName(r),7],[r.display_site_label,7],[r.site_name,7],
    [r.parish_label||r.parish_name,5],[r.parish_name,5],
    [r.town,3.5],[r.maps_query,3],[r.region,2],
    [r.special_rule,1],[r.qualifier,1],[r.notes,1],[r.search_text,1]
  ].map(([value,weight])=>({key:searchKey(value||''), raw:value||'', weight}));
  let score = fields.reduce((best,f)=>Math.max(best, variants.reduce((b,qKey)=>Math.max(b,fieldScoreForKey(f.key,qKey,f.weight)),0)),0);
  if(score && !r.is_mass_only_visible){
    const q=searchKey(rawQuery);
    const otherText=searchKey([r.display_category,r.mass_category,r.service_type,r.qualifier,r.special_rule,r.notes].join(' '));
    if(!otherText.includes(q)) score -= 20;
  }
  return Math.max(0, score);
}
function searchMatchesRow(r, rawQuery){
  const q = norm(rawQuery);
  if(!q) return true;
  return searchScore(r, rawQuery) >= 30;
}
function safeLoadRecentSearches(){ try{ const parsed=JSON.parse(localStorage.getItem('mmf_recent_searches')||'[]'); return Array.isArray(parsed)?parsed.filter(x=>String(x||'').trim()).slice(0,8):[]; }catch(e){ return []; } }
function saveRecentSearch(raw){ const q=String(raw||'').trim(); if(q.length<2) return; const existing=safeLoadRecentSearches().filter(x=>norm(x)!==norm(q)); safeSetLocalStorage('mmf_recent_searches', JSON.stringify([q,...existing].slice(0,8))); }
function clearRecentSearches(){ try{ localStorage.removeItem('mmf_recent_searches'); }catch(e){} renderSearchAssist(true); }
let SUGGESTION_CACHE = null;
function suggestionCandidates(){
  if(SUGGESTION_CACHE) return SUGGESTION_CACHE;
  const map=new Map();
  function add(label, priority=0){ const clean=String(label||'').trim(); const key=searchKey(clean); if(clean&&key&&!map.has(key)) map.set(key,{label:clean, priority}); }
  DATA.forEach(r=>{ add(siteDisplayName(r),20); add(r.display_site_label,20); add(r.site_name,18); add(r.parish_label||r.parish_name,14); add(r.parish_name,12); add(r.town,8); });
  add('Cathédrale Saint-Louis',30);
  add('Notre-Dame-de-la-Salette',18);
  add('Sacré-Cœur',16);
  SUGGESTION_CACHE = [...map.values()];
  return SUGGESTION_CACHE;
}
function buildSuggestions(raw){
  const q=String(raw||'').trim();
  if(!norm(q)) return [];
  return suggestionCandidates()
    .map(x=>({label:x.label, score:fieldScore(x.label,q,1)+x.priority}))
    .filter(x=>x.score>=35)
    .sort((a,b)=>b.score-a.score||a.label.localeCompare(b.label))
    .slice(0,5);
}
function ensureSearchAssist(){ let box=$('searchAssist'); if(box) return box; const input=$('q'); if(!input) return null; box=document.createElement('div'); box.id='searchAssist'; box.className='searchAssist'; box.setAttribute('aria-live','polite'); input.insertAdjacentElement('afterend',box); return box; }
function applySearchText(q){ $('q').value=q; saveRecentSearch(q); nextMode=false; quickMode=''; showAllResults=false; trackEvent('search_used'); render(); renderSearchAssist(false); scrollToResults(); }
function bindAssistChips(root){ root.querySelectorAll('[data-search]').forEach(btn=>btn.addEventListener('click',()=>applySearchText(btn.dataset.search || btn.textContent || ''))); }
function renderSearchAssist(showWhenEmpty){ const box=ensureSearchAssist(); if(!box) return; const raw=$('q')?.value||''; if(norm(raw)){ const suggestions=buildSuggestions(raw); if(!suggestions.length){box.innerHTML=''; box.hidden=true; return;} box.hidden=false; box.innerHTML='<div class="assistTitle">'+esc(tr('searchSuggestionsLabel'))+'</div><div class="assistChips">'+suggestions.map(x=>'<button type="button" class="assistChip" data-search="'+esc(x.label)+'">'+esc(x.label)+'</button>').join('')+'</div>'; } else if(showWhenEmpty){ const recent=safeLoadRecentSearches(); if(!recent.length){box.hidden=false; box.innerHTML='<div class="assistTitle">'+esc(tr('searchExamples'))+'</div><div class="assistChips"><button type="button" class="assistChip" data-search="evening Mass Curepipe">evening Mass Curepipe</button><button type="button" class="assistChip" data-search="messe du soir Quatre Bornes">messe du soir Quatre Bornes</button><button type="button" class="assistChip" data-search="18h Port Louis">18h Port Louis</button></div>'; bindAssistChips(box); return;} box.hidden=false; box.innerHTML='<div class="assistTitle">'+esc(tr('recentSearchesLabel'))+' <button type="button" class="assistClear" id="clearRecentSearches">'+esc(tr('clearRecentSearches'))+'</button></div><div class="assistChips">'+recent.map(x=>'<button type="button" class="assistChip" data-search="'+esc(x)+'">'+esc(x)+'</button>').join('')+'</div>'; $('clearRecentSearches')?.addEventListener('click', clearRecentSearches); } else { box.innerHTML=''; box.hidden=true; }
  box.querySelectorAll('[data-search]').forEach(btn=>btn.addEventListener('click',()=>applySearchText(btn.dataset.search||btn.textContent||'')));
}
function analyticsConfig(){ return ((window.MMF_CONFIG || window.MASS_FINDER_CONFIG || {}).analytics) || {}; }
function trackEvent(name){
  const allowed = new Set(['app_open','search_performed','filter_used','near_me_clicked','directions_clicked','source_link_clicked','report_correction_clicked','language_changed','update_clicked','next_mass_clicked']);
  const alias = {search_used:'search_performed', near_me_used:'near_me_clicked', correction_report_clicked:'report_correction_clicked', language_change:'language_changed', next_mass_used:'next_mass_clicked'};
  name = alias[name] || name;
  if(!allowed.has(name)) return;
  const cfg=analyticsConfig(); if(!cfg||!cfg.enabled) return;
  try{ if(cfg.provider==='goatcounter'&&window.goatcounter&&typeof window.goatcounter.count==='function') window.goatcounter.count({path:'event/'+name,title:name,event:true}); else if(cfg.provider==='plausible'&&typeof window.plausible==='function') window.plausible(name); }catch(e){}
}
function initAnalytics(){ const cfg=analyticsConfig(); if(!cfg||!cfg.enabled||!cfg.provider) return; try{ if(cfg.provider==='goatcounter'&&cfg.endpoint&&!document.querySelector('script[data-mmf-analytics]')){ const el=document.createElement('script'); el.async=true; el.defer=true; el.dataset.mmfAnalytics='goatcounter'; el.src=cfg.endpoint; document.head.appendChild(el); } else if(cfg.provider==='plausible'&&cfg.endpoint&&cfg.siteId&&!document.querySelector('script[data-mmf-analytics]')){ const el=document.createElement('script'); el.async=true; el.defer=true; el.dataset.domain=cfg.siteId; el.dataset.mmfAnalytics='plausible'; el.src=cfg.endpoint; document.head.appendChild(el); } trackEvent('app_open'); }catch(e){} }

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
    const row = {
      id: r.id || 'row-'+i,
      parish_uid: r.parish_uid || '', site_uid: r.site_uid || '', region: r.region || '', town: r.town || '',
      parish_name: r.parish_name || '', parish_label: r.parish_label || r.parish_name || '', site_name: r.site_name || '', display_site_label: r.display_site_label || '',
      day_of_week: r.day_of_week || '', time_24h: r.time_24h || '', service_type: r.service_type || '', mass_category: category,
      verified_status: r.verified_status || '', language: r.language || '', special_rule: r.special_rule || '', qualifier: r.qualifier || '', notes: r.notes || '',
      source_url: r.source_url || '', last_verified: r.last_verified || r.last_checked || '2026-04-29', last_checked: r.last_checked || r.last_verified || (currentLang === 'fr' ? RELEASE_VERIFIED_DATE_FR : RELEASE_VERIFIED_DATE_EN), is_active: String(r.is_active).toLowerCase() !== 'false',
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
    row._search_fields = [
      [row.display_site_label || row.site_name,7],[row.display_site_label,7],[row.site_name,7],
      [row.parish_label || row.parish_name,5],[row.parish_name,5],
      [row.town,3.5],[row.maps_query,3],[row.region,2],
      [row.special_rule,1],[row.qualifier,1],[row.notes,1],[row.search_text,1]
    ].map(([value,weight])=>({key:searchKey(value||''), raw:value||'', weight})).filter(x=>x.key);
    return row;
  });
}
function detectVigilStatus(r, visible){
  if(!visible) return 'not_vigil';
  if((r.day_of_week || '') === 'Samedi' && mins(r.time_24h) >= (15*60 + 30)) return 'practical_1530_rule';
  return 'not_vigil';
}
function vigilReasonForStatus(status){
  if(status === 'practical_1530_rule') return 'Saturday Mass at or after 15:30 under the Sunday-obligation rule';
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
function setLang(lang){ trackEvent('language_change'); currentLang = lang; safeSetLocalStorage('mmf_language', lang); try { localStorage.removeItem('mmf_lang'); } catch(_e){} updateStaticText(); refreshDayOptions(); refreshTimeOfDayOptions(); render(); }
function initFilters(){
  refreshDayOptions();
  refreshTimeOfDayOptions();
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
function refreshTimeOfDayOptions(){
  const select = $('timeOfDay');
  if(!select) return;
  const current = select.value;
  select.innerHTML = '<option value="">'+esc(tr('allDay'))+'</option>' + ['morning','afternoon','evening'].map(k=>'<option value="'+k+'">'+esc(tr(k))+'</option>').join('');
  select.value = current;
}
function minutesNow(){ const d=new Date(); return d.getHours()*60+d.getMinutes(); }
function todayIdx(date){ const d = date instanceof Date ? date : new Date(); return (d.getDay()+6)%7; }
function mins(t){ const [h,m] = String(t || '00:00').split(':').map(Number); return h*60+m; }
function nextOccurrenceDate(r){
  const day = DAYIDX[r.day_of_week];
  const now = new Date();
  const target = new Date(now);
  target.setHours(0,0,0,0);
  if(day == null) return new Date(now.getTime() + 999999*60000);
  let deltaDays = (day - todayIdx(now) + 7) % 7;
  target.setDate(target.getDate() + deltaDays);
  const [h,m] = String(r.time_24h || '00:00').split(':').map(Number);
  target.setHours(Number.isFinite(h) ? h : 0, Number.isFinite(m) ? m : 0, 0, 0);
  if(target.getTime() < now.getTime()) target.setDate(target.getDate() + 7);
  return target;
}
function calendarDaysUntil(r){
  const now = new Date();
  const today = new Date(now); today.setHours(0,0,0,0);
  const target = nextOccurrenceDate(r); target.setHours(0,0,0,0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}
function relativeDayLabel(r){
  const days = calendarDaysUntil(r);
  if(days === 0) return tr('today');
  if(days === 1) return tr('tomorrow');
  return tr('inDays',{n:days});
}
function getTimeBucket(time){
  if(!time || !/^\d{2}:\d{2}$/.test(String(time))) return 'unknown';
  const [hour, minute] = String(time).split(':').map(Number);
  if(!Number.isFinite(hour) || !Number.isFinite(minute)) return 'unknown';
  const total = hour * 60 + minute;
  if(total < 12 * 60) return 'morning';
  if(total < 17 * 60) return 'afternoon';
  return 'evening';
}
function semanticTimeBucket(raw){
  const q = searchKey(raw || '');
  if(!q) return '';
  const has = (...terms) => terms.some(term => q.includes(searchKey(term)));
  if(has('morning mass','messe du matin','matin','morning')) return 'morning';
  if(has('afternoon mass','messe de l apres midi','messe de l apres-midi','apres midi','apres-midi','après midi','après-midi','afternoon')) return 'afternoon';
  if(has('evening mass','night mass','messe du soir','today evening','tonight','ce soir','soir','evening','night')) return 'evening';
  return '';
}
function semanticTimeNoticeKey(bucket){
  if(bucket === 'morning') return 'semanticMorningNotice';
  if(bucket === 'afternoon') return 'semanticAfternoonNotice';
  if(bucket === 'evening') return 'semanticEveningNotice';
  return '';
}
function queryWithoutSemanticTime(raw){
  let s = String(raw || ' ');
  const patterns = [
    /\b(morning mass|morning|afternoon mass|afternoon|evening mass|night mass|today evening|tonight|evening|night)\b/gi,
    /\b(messe du matin|matin|messe de l[’' ]après-midi|messe de l[’' ]apres-midi|après-midi|apres-midi|après midi|apres midi|messe du soir|ce soir|soir)\b/gi
  ];
  patterns.forEach(rx => { s = s.replace(rx, ' '); });
  return s.replace(/\s+/g,' ').trim();
}

function parseExactTime(raw){
  const text = String(raw || '').replace(/[’']/g,"'");
  const n = norm(text);
  if(/\b(noon|midi)\b/.test(n)) return {minutes:720, label:'12:00', matchText:(text.match(/\b(noon|midi)\b/i)||[''])[0]};
  if(/\b(midnight|minuit)\b/.test(n)) return {minutes:0, label:'00:00', matchText:(text.match(/\b(midnight|minuit)\b/i)||[''])[0]};
  // AM/PM with optional minutes must be parsed before generic 24-hour colon/dot formats.
  const m12min = text.match(/\b(1[0-2]|0?[1-9])\s*[:\.]\s*([0-5]\d)\s*(a\.?m\.?|p\.?m\.?)\b/i);
  if(m12min){
    let h = parseInt(m12min[1],10), m = parseInt(m12min[2],10);
    const ap = m12min[3].toLowerCase().replace(/\./g,'');
    if(ap === 'pm' && h < 12) h += 12;
    if(ap === 'am' && h === 12) h = 0;
    return {minutes:h*60+m, label:String(h).padStart(2,'0')+':'+String(m).padStart(2,'0'), matchText:m12min[0]};
  }
  const m12 = text.match(/\b(1[0-2]|0?[1-9])\s*(a\.?m\.?|p\.?m\.?)\b/i);
  if(m12){
    let h = parseInt(m12[1],10);
    const ap = m12[2].toLowerCase().replace(/\./g,'');
    if(ap === 'pm' && h < 12) h += 12;
    if(ap === 'am' && h === 12) h = 0;
    return {minutes:h*60, label:String(h).padStart(2,'0')+':00', matchText:m12[0]};
  }
  const m24 = text.match(/\b([01]?\d|2[0-3])\s*(?:h|:|\.)\s*([0-5]\d)?\b/i);
  if(m24){
    const h = parseInt(m24[1],10), m = m24[2] ? parseInt(m24[2],10) : 0;
    return {minutes:h*60+m, label:String(h).padStart(2,'0')+':'+String(m).padStart(2,'0'), matchText:m24[0]};
  }
  return null;
}
function parseTimeModifier(raw){
  const n = norm(raw || '');
  // Exact/around/after/before are semantic modifiers, not place-search words.
  // Around/about/vers/environ/autour must not become an after/lower-bound filter.
  if(/\b(after|apres|apres)\b/.test(n)) return 'after';
  if(/\b(before|avant)\b/.test(n)) return 'before';
  if(/\b(around|about|vers|environ|autour|autour de)\b/.test(n)) return 'around';
  if(/\b(at|a|à)\b/.test(n)) return 'exact';
  return null;
}
function bareHourAmbiguity(raw){
  const text = String(raw || '');
  const q = norm(text);
  const around = /\b(around|about|vers|environ|autour|autour de)\b/.test(q);
  const before = /\b(before|avant)\b/.test(q);
  const after = /\b(after|apres)\b/.test(q);
  if(!around && !before && !after) return null;
  if(/\b(1[0-2]|0?[1-9])\s*(a\.?m\.?|p\.?m\.?)\b/i.test(text)) return null;
  if(/\b([01]?\d|2[0-3])\s*(?:h|:|\.)\s*([0-5]\d)?\b/i.test(text)) return null;
  const m = q.match(/\b(1[0-2]|0?[1-9])\b/);
  if(!m) return null;
  const hour = parseInt(m[1], 10);
  if(hour < 1 || hour > 12) return null;
  let type = around ? 'around' : (before ? 'before' : 'after');
  if(hour === 12) type = 'twelve';
  return {type, hour, hour24: hour + 12};
}
function isAmbiguousBareAroundTime(raw){ const a = bareHourAmbiguity(raw); return !!(a && a.type === 'around'); }
function isAmbiguousBareTime(raw){ return !!bareHourAmbiguity(raw); }
function ambiguousTimeMessage(raw){
  const a = bareHourAmbiguity(raw);
  if(!a) return '';
  if(a.type === 'twelve') return tr('ambiguousTwelveTime');
  if(a.type === 'before') return tr('ambiguousBeforeTime', a);
  if(a.type === 'after') return tr('ambiguousAfterTime', a);
  return tr('ambiguousAroundTime', a);
}
function ambiguousTimeChipLabels(raw){
  const a = bareHourAmbiguity(raw);
  if(!a) return [];
  if(a.type === 'twelve') return currentLang === 'fr' ? ['vers midi','vers minuit'] : ['around noon','around midnight'];
  if(currentLang === 'fr') {
    const prefix = a.type === 'before' ? 'avant' : (a.type === 'after' ? 'après' : 'vers');
    return [`${prefix} ${a.hour}h`, `${prefix} ${a.hour24}h`];
  }
  const prefix = a.type === 'before' ? 'before' : (a.type === 'after' ? 'after' : 'around');
  return [`${prefix} ${a.hour}am`, `${prefix} ${a.hour}pm`];
}
function ambiguousTimePanel(raw){
  const msg = ambiguousTimeMessage(raw);
  if(!msg) return '';
  const chips = ambiguousTimeChipLabels(raw).map(x => '<button type="button" class="assistChip" data-ambiguous-time="'+esc(x)+'">'+esc(x)+'</button>').join(' ');
  return '<div class="notice warn ambiguousTimeNotice"><div>'+esc(msg)+'</div>'+(chips ? '<div class="assistChips">'+chips+'</div>' : '')+'</div>';
}
function parseAfterTime(raw){
  const exact = parseExactTime(raw);
  return (exact && parseTimeModifier(raw) === 'after') ? exact.minutes : null;
}
function parseBeforeTime(raw){
  const exact = parseExactTime(raw);
  return (exact && parseTimeModifier(raw) === 'before') ? exact.minutes : null;
}
function parseDayIntent(raw){
  const q = norm(raw || '');
  const dayStoplist = /\b(mardi gras|mardigras|carnaval|carnival)\b/;
  const stopDayIntent = dayStoplist.test(q);
  if(!stopDayIntent && /\b(tonight|ce soir)\b/.test(q)) return 'today';
  const pairs = [
    ['today','today'],['aujourd hui','today'],['aujourdhui','today'],
    ['tomorrow','tomorrow'],['demain','tomorrow'],
    ['monday','Lundi'],['lundi','Lundi'],
    ['tuesday','Mardi'],['mardi','Mardi'],
    ['wednesday','Mercredi'],['mercredi','Mercredi'],
    ['thursday','Jeudi'],['jeudi','Jeudi'],
    ['friday','Vendredi'],['vendredi','Vendredi'],
    ['saturday','Samedi'],['samedi','Samedi'],
    ['sunday','Dimanche'],['dimanche','Dimanche']
  ];
  for(const [term,val] of pairs){
    const k = norm(term);
    if(q === k || q.includes(' '+k+' ') || q.startsWith(k+' ') || q.endsWith(' '+k)){ if(stopDayIntent && (val === 'Mardi' || val === 'Tuesday')) continue; return val; }
  }
  return '';
}
function isOtherCelebrationIntent(raw){
  const q = norm(raw || '');
  return /\b(adoration|exposition|priere|prayer|temps de priere|celebration)\b/.test(q);
}
function languageIntent(raw){
  const q = norm(raw || '');
  if(/\b(mass in english|english mass|in english|messe en anglais|en anglais|anglais|english)\b/.test(q)) return 'english';
  if(/\b(mass in french|french mass|in french|messe en francais|en francais|francais|french)\b/.test(q)) return 'french';
  return '';
}
function isEnglishIntent(raw){ return languageIntent(raw) === 'english'; }
function removeNearMePhrases(raw){
  let s = String(raw || ' ');
  const patterns = [
    /\b(near me|nearby|closest|nearest|around me|close to me|next to me)\b/gi,
    /\b(près de moi|pres de moi|proche de moi|autour de moi|a cote de moi|dans les environs|autour d[’' ]?ici|à proximité|a proximite)\b/gi
  ];
  patterns.forEach(rx => { s = s.replace(rx, ' '); });
  return s.replace(/\s+/g,' ').trim();
}
function stripIntentPhrases(raw){
  let s = String(raw || ' ');
  const phrasePatterns = [
    /\b(mass in english|english mass|in english|messe en anglais|en anglais)\b/gi,
    /\b(mass in french|french mass|in french|messe en fran[çc]ais|en fran[çc]ais)\b/gi,
    /\b(near me|nearby|closest|nearest|around me|close to me|next to me)\b/gi,
    /\b(près de moi|pres de moi|proche de moi|autour de moi|a cote de moi|dans les environs|autour d[’' ]?ici|à proximité|a proximite)\b/gi,
    /\b(today evening|tonight|ce soir)\b/gi,
    /\b(morning mass|afternoon mass|evening mass|night mass|messe du matin|messe de l[’' ]après-midi|messe de l[’' ]apres-midi|messe du soir)\b/gi,
    /\b(temps de prière|temps de priere)\b/gi
  ];
  phrasePatterns.forEach(rx => { s = s.replace(rx, ' '); });
  return s.replace(/\s+/g,' ').trim();
}
function removeExactTimeText(raw){
  let s = String(raw || ' ');
  const patterns = [
    /\b(1[0-2]|0?[1-9])\s*[:\.]\s*([0-5]\d)\s*(a\.?m\.?|p\.?m\.?)\b/gi,
    /\b(1[0-2]|0?[1-9])\s*(a\.?m\.?|p\.?m\.?)\b/gi,
    /\b([01]?\d|2[0-3])\s*(?:h|:|\.)\s*([0-5]\d)?\b/gi,
    /\b(noon|midi|midnight|minuit)\b/gi
  ];
  patterns.forEach(rx => { s = s.replace(rx, ' '); });
  return s.replace(/\s+/g,' ').trim();
}
function removeResidualConnectorTokens(raw){
  const CONNECTOR_TOKENS = new Set(['at','around','about','near','for','a','à','vers','environ','autour','pour','in','en','de','du','des','le','la','l','the','after','apres','après','before','avant']);
  const SERVICE_TOKENS = new Set(['mass','masses','messe','messes','catholic','catholique','church','eglise','église','parish','paroisse','service','services','celebration','célébration','chapel','chapelle','next','now','prochaine','prochain','maintenant']);
  const TIME_DAY_TOKENS = new Set(['today','tomorrow','aujourdhui','demain','monday','tuesday','wednesday','thursday','friday','saturday','sunday','lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche','morning','matin','matinee','afternoon','evening','night','soir','soiree','apres-midi','apres','midi','pm','am','english','anglais','french','francais']);
  return String(raw || '')
    .split(/\s+/)
    .filter(token => {
      const stripped = token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
      const key = norm(stripped);
      if(!key) return false;
      if(CONNECTOR_TOKENS.has(key) || SERVICE_TOKENS.has(key) || TIME_DAY_TOKENS.has(key)) return false;
      return true;
    })
    .join(' ')
    .replace(/\s+/g,' ')
    .trim();
}
function cleanIntentQuery(raw, intent){
  let s = stripIntentPhrases(raw);
  s = removeExactTimeText(s);
  const patterns = [
    /\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|aujourd[’' ]?hui|aujourdhui|demain|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b/gi,
    /\b(morning|matin|matinée|matinee|afternoon|après-midi|apres-midi|après midi|apres midi|evening|night|soir|soirée|soiree)\b/gi,
    /\b(english|anglais|french|fran[çc]ais)\b/gi,
    /\b(adoration|exposition|prière|priere|prayer|celebration|célébration)\b/gi
  ];
  patterns.forEach(rx => { s = s.replace(rx, ' '); });
  const cleaned = removeResidualConnectorTokens(s);
  return searchKey(cleaned) ? cleaned : '';
}
function parseSearchIntent(raw){
  const rawQuery = String(raw || '');
  const normalizedQuery = norm(rawQuery);
  const ambiguousAroundTime = isAmbiguousBareAroundTime(rawQuery);
  const ambiguousBareTime = isAmbiguousBareTime(rawQuery);
  const locationIntent = isNearMeIntent(rawQuery);
  const exact = parseExactTime(rawQuery);
  const timeModifier = exact ? (parseTimeModifier(rawQuery) || 'exact') : null;
  const afterMinutes = parseAfterTime(rawQuery);
  const beforeMinutes = parseBeforeTime(rawQuery);
  const day = parseDayIntent(rawQuery);
  let bucket = exact ? '' : (semanticTimeBucket(rawQuery) || (afterMinutes != null && afterMinutes >= 17*60 ? 'evening' : ''));
  if(/\b(tonight|ce soir)\b/.test(normalizedQuery)) bucket = 'evening';
  const lang = languageIntent(rawQuery);
  const english = lang === 'english';
  const other = isOtherCelebrationIntent(rawQuery);
  const now = /\b(now|maintenant|next|prochaine|prochain)\b/.test(normalizedQuery);
  const intent = {
    raw: rawQuery,
    rawQuery,
    normalizedQuery,
    locationIntent,
    residualText: locationIntent ? removeNearMePhrases(rawQuery) : rawQuery,
    dayIntent: day,
    timeBucketIntent: bucket,
    exactTimeIntent: exact,
    exactTimeMinutes: exact ? exact.minutes : null,
    languageIntent: lang,
    serviceType: 'mass',
    placeIntent: '',
    otherDetectedIntents: {otherCelebration: other, now},
    day,
    bucket,
    exactTime: exact,
    timeModifier,
    afterMinutes,
    beforeMinutes,
    near: locationIntent,
    ambiguousAroundTime,
    ambiguousBareTime,
    ambiguousTime: bareHourAmbiguity(rawQuery),
    english,
    language: lang,
    other,
    now,
    consumedPhrases: [],
    consumedTokens: []
  };
  intent.cleanQuery = cleanIntentQuery(rawQuery, intent);
  intent.residualPlaceText = intent.cleanQuery;
  intent.placeIntent = intent.cleanQuery;
  return intent;
}
function intentChipLabels(intent){
  const chips = [];
  if(!intent || !norm(intent.raw)) return chips;
  if(intent.day === 'today') chips.push(tr('chipToday'));
  else if(intent.day === 'tomorrow') chips.push(tr('chipTomorrow'));
  else if(intent.day && DAYS.includes(intent.day)) chips.push(dayLabel(intent.day));
  if(intent.bucket) chips.push(tr(intent.bucket));
  if(intent.afterMinutes != null && intent.exactTime) chips.push(tr('chipAfter',{time:intent.exactTime.label}));
  else if(intent.exactTime) chips.push(intent.exactTime.label);
  if(intent.near) chips.push(tr('chipNearMe'));
  if(intent.english) chips.push(tr('chipEnglish'));
  if(intent.other) chips.push(tr('chipOtherCelebrations'));
  if(intent.cleanQuery) chips.push(intent.cleanQuery);
  return [...new Set(chips.filter(Boolean))].slice(0,6);
}
function rowMatchesIntent(r, intent){
  if(!intent) return true;
  if(intent.day === 'today' && calendarDaysUntil(r) !== 0) return false;
  if(intent.day === 'tomorrow' && calendarDaysUntil(r) !== 1) return false;
  if(DAYS.includes(intent.day) && !(intent.day === 'Dimanche' ? isSundayFilterMatch(r) : r.day_of_week === intent.day)) return false;
  if(intent.bucket && getTimeBucket(r.time_24h) !== intent.bucket) return false;
  if(intent.afterMinutes != null && mins(r.time_24h) < intent.afterMinutes) return false;
  if(intent.beforeMinutes != null && mins(r.time_24h) > intent.beforeMinutes) return false;
  if(intent.exactTime && intent.afterMinutes == null && intent.beforeMinutes == null && Math.abs(mins(r.time_24h) - intent.exactTime.minutes) > 60) return false;
  if(intent.language === 'english' || intent.english){
    const text = searchKey([r.language,r.qualifier,r.special_rule,r.notes,r.display_category].join(' '));
    if(!/\b(english|anglais)\b/.test(text)) return false;
  }
  if(intent.language === 'french'){
    const text = searchKey([r.language,r.qualifier,r.special_rule,r.notes,r.display_category].join(' '));
    if(!/\b(french|francais|français)\b/.test(text)) return false;
  }
  if(intent.other && r.is_mass_only_visible) return false;
  return true;
}
function intentRankBoost(r, intent){
  if(!intent) return 0;
  let score = 0;
  if(intent.cleanQuery){
    const placeScore = searchScore(r, intent.cleanQuery);
    score += placeScore * 4;
    if(searchKey(siteDisplayName(r)) === searchKey(intent.cleanQuery)) score += 1000;
    if(searchKey(r.parish_label || r.parish_name) === searchKey(intent.cleanQuery)) score += 800;
    if(searchKey(r.town) === searchKey(intent.cleanQuery)) score += 600;
  }
  if(intent.day) score += 180;
  if(intent.exactTime && intent.afterMinutes == null && intent.beforeMinutes == null) score += Math.max(0, 180 - Math.abs(mins(r.time_24h) - intent.exactTime.minutes));
  if(intent.bucket) score += 120;
  if(intent.english) score += 90;
  // Distance ranking for Near Me is intentionally handled only by compareNearResults().
  // Do not add a direct distance boost here, because it can push a very close
  // far-future Mass above a more practically useful Mass today/tomorrow.
  if(intent.now || nextMode) score += Math.max(0, 240 - nextDelta(r)/15);
  return score;
}
function formatVerifiedDate(raw){
  const v = String(raw || '').trim();
  if(!v) return tr('verificationNeeded');
  const m = v.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
  if(m){
    const months = currentLang === 'fr' ? ['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'] : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const idx = Math.max(0, Math.min(11, parseInt(m[2],10)-1));
    return months[idx] + ' ' + m[1];
  }
  return v;
}
function verifiedAgeMonths(r){
  const raw = String(r.last_verified || r.last_checked || '').trim();
  const m = raw.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
  if(!m) return null;
  const verified = new Date(parseInt(m[1],10), parseInt(m[2],10)-1, parseInt(m[3]||'1',10));
  const now = new Date();
  return (now.getFullYear()-verified.getFullYear())*12 + (now.getMonth()-verified.getMonth());
}
function verifiedChipText(r){
  const raw = r.last_verified || r.last_checked || '';
  if(!raw) return tr('verificationNeeded');
  const age = verifiedAgeMonths(r);
  if(age != null && age > 12) return tr('verifyBeforeVisit') + ' · ' + formatVerifiedDate(raw);
  return tr('verifiedLabel') + ': ' + formatVerifiedDate(raw);
}
function verifiedChipClass(r){
  const age = verifiedAgeMonths(r);
  if(age == null) return 'badge warn verifiedChip';
  if(age > 12) return 'badge verifiedChip old';
  if(age > 6) return 'badge verifiedChip stale';
  return 'badge mass verifiedChip';
}
function nextDelta(r){ return Math.max(0, Math.round((nextOccurrenceDate(r).getTime() - Date.now()) / 60000)); }
function relativeText(delta){
  if(delta < 60) return currentLang === 'fr' ? 'dans '+delta+' min' : 'in '+delta+' min';
  if(delta < 1440){ const h=Math.floor(delta/60), m=delta%60; return currentLang === 'fr' ? 'dans '+h+' h'+(m?' '+m+' min':'') : 'in '+h+'h'+(m?' '+m+'m':''); }
  const d=Math.floor(delta/1440); return currentLang === 'fr' ? 'dans '+d+' jour(s)' : 'in '+d+' day(s)';
}
function distKm(a,b,c,d){ if([a,b,c,d].some(x=>x==null || Number.isNaN(x))) return null; const R=6371, rad=x=>x*Math.PI/180; const dLat=rad(c-a), dLon=rad(d-b); const h=Math.sin(dLat/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(h)); }
function filtered(){
  const rawQ=$('q').value;
  const intent=parseSearchIntent(rawQ);
  const effectiveQ=intent.cleanQuery;
  const selectedDay=$('day').value, region=$('region').value, mode=$('mode').value, selectedTimeOfDay=($('timeOfDay') ? $('timeOfDay').value : '');
  const timeOfDay = selectedTimeOfDay || intent.bucket;
  let arr = DATA.filter(r=>r.is_active);
  let searchScoreCache = null;
  if(nearMode && !userPos) return [];
  const includeOtherByIntent = intent.other && norm(rawQ);
  if(mode === 'mass' && !includeOtherByIntent) arr = arr.filter(r=>r.is_mass_only_visible);
  if(favOnly) arr = arr.filter(r=>favs.has(r.site_uid));
  if(norm(effectiveQ)){
    searchScoreCache = new Map();
    arr = arr.filter(r=>{ const s=searchScore(r, effectiveQ); searchScoreCache.set(r,s); return s >= 30; });
  }
  arr = arr.filter(r=>rowMatchesIntent(r, intent));
  if(selectedDay && !nextMode) arr = arr.filter(r=> selectedDay === 'Dimanche' ? isSundayFilterMatch(r) : r.day_of_week === selectedDay);
  if(region) arr = arr.filter(r=>r.region === region);
  if(timeOfDay) arr = arr.filter(r=>getTimeBucket(r.time_24h) === timeOfDay);
  if(quickMode === 'sundayMorning') arr = arr.filter(r=>isSundayFilterMatch(r));
  const nearActive = (nearMode || intent.near) && userPos;
  arr.sort((a,b)=>{
    if(nearActive){
      const nearOrder = compareNearResults(a,b,intent);
      if(nearOrder) return nearOrder;
      const ib = intentRankBoost(b,intent), ia = intentRankBoost(a,intent);
      if(ib !== ia) return ib - ia;
      if(norm(effectiveQ)){ const sb=searchScoreCache?.get(b) ?? searchScore(b, effectiveQ), sa=searchScoreCache?.get(a) ?? searchScore(a, effectiveQ); if(sb!==sa) return sb-sa; }
      return (DAYIDX[a.day_of_week]-DAYIDX[b.day_of_week]) || (mins(a.time_24h)-mins(b.time_24h)) || a.site_name.localeCompare(b.site_name);
    }
    const ib = intentRankBoost(b,intent), ia = intentRankBoost(a,intent);
    if(ib !== ia) return ib - ia;
    if(norm(effectiveQ)){ const sb=searchScoreCache?.get(b) ?? searchScore(b, effectiveQ), sa=searchScoreCache?.get(a) ?? searchScore(a, effectiveQ); if(sb!==sa) return sb-sa; }
    if((selectedDay === 'Dimanche' || quickMode === 'sundayMorning') && !nextMode){ const nd=nextDelta(a)-nextDelta(b); if(nd) return nd; const va=isVigilMass(a)?0:1, vb=isVigilMass(b)?0:1; if(va!==vb) return va-vb; }
    if(nextMode || intent.now){ const nd = nextDelta(a)-nextDelta(b); if(nd) return nd; }
    return (DAYIDX[a.day_of_week]-DAYIDX[b.day_of_week]) || (mins(a.time_24h)-mins(b.time_24h)) || a.site_name.localeCompare(b.site_name);
  });
  return arr;
}
function mapsUrl(r){ const useExact = isExactCoord(r) && r.latitude != null && r.longitude != null; const destRaw = useExact ? (r.latitude+','+r.longitude) : (r.maps_query || buildMapsQuery(r)); const dest=encodeURIComponent(destRaw); const origin=userPos ? '&origin='+encodeURIComponent(userPos.lat+','+userPos.lon) : ''; return 'https://www.google.com/maps/dir/?api=1'+origin+'&destination='+dest; }
function toggleFav(siteUid){ if(favs.has(siteUid)) favs.delete(siteUid); else favs.add(siteUid); safeSetLocalStorage('mmf_my_churches', JSON.stringify([...favs])); try { localStorage.removeItem('mmf_site_favourites'); } catch(_e){}  render(); }
function showToast(message){
  const text = String(message || '');
  if(!text) return;
  let toast = $('toast');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role','status');
    toast.setAttribute('aria-live','polite');
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(()=>toast.classList.remove('show'), 2400);
}
async function copyTextFallback(text){
  if(navigator.clipboard && window.isSecureContext){
    await navigator.clipboard.writeText(text);
    showToast(currentLang === 'fr' ? 'Lien copié.' : 'Link copied.');
    return true;
  }
  alert(text);
  return false;
}
async function sharePayload(shareData, fallbackText){
  if(navigator.share){
    try{
      await navigator.share(shareData);
      return;
    }catch(error){
      if(error && error.name === 'AbortError') return;
    }
  }
  try{ await copyTextFallback(fallbackText || shareData.url || shareData.text || window.location.href); }
  catch(_e){ alert(fallbackText || shareData.url || shareData.text || window.location.href); }
}
async function shareAction(r){
  const directionsUrl = mapsUrl(r);
  const appUrl = window.location.href.split('#')[0];
  const source = r.source_url || appUrl;
  const qualifier = (r.qualifier || r.special_rule || r.notes) ? ' — ' + (r.qualifier || r.special_rule || r.notes) : '';
  const text = tr('shareText', {site:siteDisplayName(r), parish:(r.parish_label || r.parish_name || ''), day:dayLabel(r.day_of_week), time:r.time_24h, qualifier, source, url:directionsUrl, app:appUrl});
  await sharePayload({title:tr('shareTitle'), text, url:appUrl}, text);
}
async function shareAppAction(){
  const url = window.location.href;
  const text = tr('appShareText');
  await sharePayload({title:tr('shareTitle'), text, url}, url);
}


function correctionBody(r){
  return [
    'Church / Église:',
    'Town / Ville:',
    'Issue found / Problème constaté:',
    'Correct information / Information correcte:',
    'Source / Source:',
    'Additional comments / Commentaires:'
  ].join('\n');
}
function openCorrectionMail(subject, body, email){
  const mailto = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  window.location.href = mailto;
}
function reportAction(r){
  const cfg = window.MASS_FINDER_CONFIG || {};
  const email = cfg.REPORT_EMAIL || 'mauritiusmassfinder@gmail.com';
  const subject = tr('reportSubject');
  const body = correctionBody(r);
  const openMail = () => openCorrectionMail(subject, body, email);
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(body).then(()=>{
      openMail();
      setTimeout(()=>alert(tr('copied')), 250);
    }).catch(openMail);
  } else {
    openMail();
  }
}

function renderStats(){
  const par=new Set(DATA.map(r=>r.parish_uid)).size, sites=new Set(DATA.map(r=>r.site_uid)).size;
  const date = currentLang === 'fr' ? RELEASE_VERIFIED_DATE_FR : RELEASE_VERIFIED_DATE_EN;
  const trust = '<div class="notice ok trustStrip" style="grid-column:1/-1"><b>'+esc(tr('trustStrip',{parishes:par,sites:sites,date:date}))+'</b><br><span class="small">'+esc(tr('trustNote'))+'</span></div>';
  $('stats').innerHTML = trust;
}
function renderNotice(){
  const notices=[];
  const raw = $('q')?.value || '';
  const intent = parseSearchIntent(raw);
  const chips = intentChipLabels(intent);
  if(chips.length){
    notices.push('<div class="notice ok searchIntentNotice"><b>'+esc(tr('searchUnderstoodLabel'))+':</b> <span class="intentChips">'+chips.map(c=>'<span class="badge">'+esc(c)+'</span>').join(' ')+'</span></div>');
  }
  if(nextMode) notices.push('<div class="notice ok">'+esc(tr('nextNotice'))+'</div>');
  if(nearMode && userPos) notices.push('<div class="notice ok">'+esc(tr('locationNotice'))+'</div>');
  if(nearMode && userPos) notices.push('<div class="notice warn">'+esc(tr('nearPrecisionNote'))+'</div>');
  if(nearMode && userPos){ const nearest = nearestDistanceKm(); if(nearest != null && nearest > 50) notices.push('<div class="notice warn">'+esc(tr('farAwayLocationWarning'))+'</div>'); }
  if(intent.ambiguousBareTime) notices.push(ambiguousTimePanel(raw));
  if(locationErrorKey) notices.push('<div class="notice warn">'+esc(tr(locationErrorKey))+'</div>');
  if(favOnly) notices.push('<div class="notice ok">'+esc(tr('favNotice'))+'</div>');
  const semanticKey = semanticTimeNoticeKey(intent.bucket);
  if(semanticKey && !($('timeOfDay')?.value)) notices.push('<div class="notice ok">'+esc(tr(semanticKey))+'</div>');
  if(intent.other && $('mode')?.value !== 'all') notices.push('<div class="notice warn">'+esc(tr('noResultOtherHint'))+'</div>');
  if(quickMode === 'sundayMorning' || $('day').value === 'Dimanche') notices.push('<div class="notice ok">'+esc(tr('sundayNotice'))+'</div>');
  if(($('mode').value==='all')) notices.push('<div class="notice warn">'+esc(tr('otherNotice'))+'</div>');
  $('notice').innerHTML = notices.join('');
}
function el(tag, attrs={}, text){ const node=document.createElement(tag); for(const [k,v] of Object.entries(attrs)){ if(k==='class') node.className=v; else if(k==='href') node.href=v; else if(k==='target') node.target=v; else node.setAttribute(k,v); } if(text != null) node.textContent=text; return node; }
function categoryLabel(r){ return r.is_mass_only_visible ? tr('serviceMass') : tr('serviceOther'); }
function isExactCoord(r){ return ['exact','existing','verified','exact_church','church_exact','verified_church'].includes(String(r.coordinate_precision||'').toLowerCase()); }
function distanceLabel(r, d){ return tr(isExactCoord(r) ? 'distanceExact' : 'distanceApprox', {n:d.toFixed(1)}); }
function nearestDistanceKm(){
  if(!userPos || !Array.isArray(DATA) || !DATA.length) return null;
  let best = Infinity;
  DATA.forEach(r => {
    const lat = Number(r.latitude), lon = Number(r.longitude);
    if(Number.isFinite(lat) && Number.isFinite(lon)){
      const d = distKm(userPos.lat, userPos.lon, lat, lon);
      if(Number.isFinite(d) && d < best) best = d;
    }
  });
  return Number.isFinite(best) ? best : null;
}
function vigilStatus(r){ return r && r.vigil_status ? r.vigil_status : detectVigilStatus(r || {}, !!(r && r.is_mass_only_visible)); }
function isVigilMass(r){ return r && r.is_mass_only_visible && (r.is_vigil === true || r.is_vigil_for_sunday === true || vigilStatus(r) === 'explicit'); }
function translateLiturgicalText(text){
  const raw = String(text || '').trim();
  if(!raw) return '';
  const key = norm(raw);
  const fr = currentLang === 'fr';
  const exact = {
    'adoration': fr ? 'Adoration' : 'Adoration',
    'adoration mass': fr ? 'Adoration et messe' : 'Adoration and Mass',
    'adoration exposition': fr ? 'Adoration / Exposition' : 'Adoration / Exposition',
    'adoration exposition before mass': fr ? 'Adoration / Exposition avant la messe' : 'Adoration / Exposition before Mass',
    'adoration at 09 30': fr ? 'Adoration à 09:30' : 'Adoration at 09:30',
    'adoration at 17 30': fr ? 'Adoration à 17:30' : 'Adoration at 17:30',
    'adoration followed by mass exact mass time unclear': fr ? 'Adoration suivie de la messe ; heure exacte de la messe non précisée' : 'Adoration followed by Mass; exact Mass time unclear',
    'adoration only': fr ? 'Adoration uniquement' : 'Adoration only',
    'after exposition of the blessed sacrament': fr ? 'Après l’Exposition du Saint-Sacrement' : 'After Exposition of the Blessed Sacrament',
    'celebration by laity': fr ? 'Célébration animée par des laïcs' : 'Celebration led by lay people',
    'celebration at chapelle du montmartre': fr ? 'Célébration à la Chapelle du Montmartre' : 'Celebration at Chapelle du Montmartre',
    'celebration de la parole': fr ? 'Célébration de la Parole' : 'Celebration of the Word',
    'except first friday then mass at 18 00 after exposition': fr ? 'Sauf le premier vendredi ; messe à 18:00 après l’Exposition du Saint-Sacrement' : 'Except first Friday; Mass at 18:00 after Exposition of the Blessed Sacrament',
    'exposition du saint sacrement': fr ? 'Exposition du Saint-Sacrement' : 'Exposition of the Blessed Sacrament',
    'exposition du st sacrement': fr ? 'Exposition du Saint-Sacrement' : 'Exposition of the Blessed Sacrament',
    'exposition du saint sacrement at 17 15 followed by mass': fr ? 'Exposition du Saint-Sacrement à 17:15, suivie de la messe' : 'Exposition of the Blessed Sacrament at 17:15, followed by Mass',
    'first friday 10 00 adoration followed by mass exact mass time not separately stated': fr ? 'Premier vendredi à 10:00 — Adoration suivie de la messe ; heure exacte de la messe non précisée' : 'First Friday 10:00 — Adoration followed by Mass; exact Mass time not separately stated',
    'first friday 17 00 exposition du saint sacrement before mass': fr ? 'Premier vendredi à 17:00 — Exposition du Saint-Sacrement avant la messe' : 'First Friday 17:00 — Exposition of the Blessed Sacrament before Mass',
    'first friday exposition 07 00 12 00': fr ? 'Premier vendredi — Exposition du Saint-Sacrement de 07:00 à 12:00' : 'First Friday — Exposition of the Blessed Sacrament from 07:00 to 12:00',
    'first friday exposition at 09 00': fr ? 'Premier vendredi — Exposition du Saint-Sacrement à 09:00' : 'First Friday — Exposition of the Blessed Sacrament at 09:00',
    'first tuesday 17 00 adoration': fr ? 'Premier mardi à 17:00 — Adoration' : 'First Tuesday 17:00 — Adoration',
    'first friday only': fr ? 'Premier vendredi uniquement' : 'First Friday only',
    'second friday only': fr ? 'Deuxième vendredi uniquement' : 'Second Friday only',
    'third friday only': fr ? 'Troisième vendredi uniquement' : 'Third Friday only',
    'last friday only': fr ? 'Dernier vendredi uniquement' : 'Last Friday only',
    'final friday only': fr ? 'Dernier vendredi uniquement' : 'Last Friday only',
    'last friday of month only': fr ? 'Dernier vendredi uniquement' : 'Last Friday only',
    'last friday of the month only': fr ? 'Dernier vendredi uniquement' : 'Last Friday only',
    'counts for sunday obligation': fr ? 'Obligation dominicale' : 'Counts for Sunday obligation',
    'compte pour le dimanche': fr ? 'Obligation dominicale' : 'Counts for Sunday obligation',
    'compte pour l obligation dominicale': fr ? 'Obligation dominicale' : 'Counts for Sunday obligation',
    'first sunday only': fr ? 'Premier dimanche uniquement' : 'First Sunday only',
    'second sunday only': fr ? 'Deuxième dimanche uniquement' : 'Second Sunday only',
    'third saturday only': fr ? 'Troisième samedi uniquement' : 'Third Saturday only',
    'sick mass every third friday of the month': fr ? 'Messe des malades chaque troisième vendredi du mois' : 'Sick Mass every third Friday of the month',
    'english on first sunday of the month': fr ? 'Messe en anglais le premier dimanche du mois' : 'English on first Sunday of the month',
    'english mass on first sunday of the month': fr ? 'Messe en anglais le premier dimanche du mois' : 'English Mass on first Sunday of the month',
    'english mass third saturday only': fr ? 'Messe en anglais — troisième samedi uniquement' : 'English Mass · Third Saturday only',
    'adoration mass': fr ? 'Adoration et messe' : 'Adoration and Mass',
    'followed by one hour of eucharistic adoration': fr ? 'Suivie d’une heure d’adoration eucharistique' : 'Followed by one hour of Eucharistic adoration',
    'friday 09 30 adoration before 10 30 mass': fr ? 'Vendredi à 09:30 — Adoration avant la messe de 10:30' : 'Friday 09:30 — Adoration before 10:30 Mass',
    'friday 17 00 adoration exposition before mass': fr ? 'Vendredi à 17:00 — Adoration / Exposition avant la messe' : 'Friday 17:00 — Adoration / Exposition before Mass',
    'friday 17 30 adoration before mass': fr ? 'Vendredi à 17:30 — Adoration avant la messe' : 'Friday 17:30 — Adoration before Mass',
    'friday 18 30 adoration only': fr ? 'Vendredi à 18:30 — Adoration uniquement' : 'Friday 18:30 — Adoration only',
    'messe ou celebration': fr ? 'Messe ou célébration' : 'Mass or celebration',
    'temps de priere': fr ? 'Temps de prière' : 'Prayer time',
    'thursday 06 30 celebration de la parole': fr ? 'Jeudi à 06:30 — Célébration de la Parole' : 'Thursday 06:30 — Celebration of the Word',
    'thursday 17 30 temps de priere': fr ? 'Jeudi à 17:30 — Temps de prière' : 'Thursday 17:30 — Prayer time',
    'tuesday 06 30 messe ou celebration': fr ? 'Mardi à 06:30 — Messe ou célébration' : 'Tuesday 06:30 — Mass or celebration',
    'wednesday 19 00 temps de priere': fr ? 'Mercredi à 19:00 — Temps de prière' : 'Wednesday 19:00 — Prayer time'
  };
  if(exact[key]) return exact[key];
  let out = raw;
  const replacements = fr ? [
    [/Exposition du (Saint|St)[ -]?Sacrement/gi, 'Exposition du Saint-Sacrement'],
    [/Exposition of the Blessed Sacrament/gi, 'Exposition du Saint-Sacrement'],
    [/Eucharistic adoration/gi, 'adoration eucharistique'],
    [/Adoration only/gi, 'Adoration uniquement'],
    [/Adoration followed by Mass/gi, 'Adoration suivie de la messe'],
    [/Adoration before Mass/gi, 'Adoration avant la messe'],
    [/before Mass/gi, 'avant la messe'],
    [/followed by Mass/gi, 'suivie de la messe'],
    [/exact Mass time not separately stated/gi, 'heure exacte de la messe non précisée'],
    [/exact Mass time unclear/gi, 'heure exacte de la messe non précisée'],
    [/Celebration of the Word/gi, 'Célébration de la Parole'],
    [/Celebration by laity/gi, 'Célébration animée par des laïcs'],
    [/Prayer time/gi, 'Temps de prière'],
    [/First Friday/gi, 'Premier vendredi'],
    [/First Tuesday/gi, 'Premier mardi'],
    [/Second Friday/gi, 'Deuxième vendredi'],
    [/Third Friday/gi, 'Troisième vendredi'],
    [/Last Friday/gi, 'Dernier vendredi'],
    [/First Sunday/gi, 'Premier dimanche'],
    [/Second Sunday/gi, 'Deuxième dimanche'],
    [/Third Saturday/gi, 'Troisième samedi'],
    [/Sick Mass/gi, 'Messe des malades'],
    [/English Mass/gi, 'Messe en anglais'],
    [/English on/gi, 'Messe en anglais le'],
    [/of the month/gi, 'du mois'],
    [/only/gi, 'uniquement'],
    [/Friday/gi, 'Vendredi'],
    [/Thursday/gi, 'Jeudi'],
    [/Tuesday/gi, 'Mardi'],
    [/Wednesday/gi, 'Mercredi']
  ] : [
    [/Exposition du (Saint|St)[ -]?Sacrement/gi, 'Exposition of the Blessed Sacrament'],
    [/Célébration de la Parole/gi, 'Celebration of the Word'],
    [/Célébration animée par des laïcs/gi, 'Celebration led by lay people'],
    [/Célébration/gi, 'Celebration'],
    [/Messe ou célébration/gi, 'Mass or celebration'],
    [/temps de prière/gi, 'prayer time'],
    [/Temps de prière/gi, 'Prayer time']
  ];
  replacements.forEach(([pattern, replacement]) => { out = out.replace(pattern, replacement); });
  return out;
}
function canonicalRuleKey(text){
  let k = norm(translateLiturgicalText(text));
  if(!k) return '';
  k = k
    .replace(/\b1st\b/g,'first').replace(/\b2nd\b/g,'second').replace(/\b3rd\b/g,'third')
    .replace(/\bpremier\b/g,'first').replace(/\bdeuxieme\b/g,'second').replace(/\btroisieme\b/g,'third')
    .replace(/\bdernier\b/g,'last').replace(/\bfinal\b/g,'last')
    .replace(/\bvendredi\b/g,'friday').replace(/\bdimanche\b/g,'sunday').replace(/\bsamedi\b/g,'saturday').replace(/\bmardi\b/g,'tuesday')
    .replace(/\buniquement\b/g,'only')
    .replace(/\bdu mois\b/g,'of month').replace(/\bof the month\b/g,'of month')
    .replace(/\bexposition du saint sacrement\b/g,'exposition blessed sacrament')
    .replace(/\bexposition of the blessed sacrament\b/g,'exposition blessed sacrament')
    .replace(/\bcounts for sunday obligation\b/g,'sunday obligation')
    .replace(/\bobligation dominicale\b/g,'sunday obligation')
    .replace(/\bcompte pour le dimanche\b/g,'sunday obligation')
    .replace(/\bcompte pour l obligation dominicale\b/g,'sunday obligation')
    .replace(/\bmesse\b/g,'mass')
    .replace(/\bl only\b/g,'only');
  k = k.replace(/\b(first|second|third|last) (friday|sunday|saturday|tuesday) of month only\b/g,'$1 $2 only');
  k = k.replace(/\b(first|second|third|last) (friday|sunday|saturday|tuesday) of the month only\b/g,'$1 $2 only');
  k = k.replace(/\s+/g,' ').trim();
  return k;
}
function appendUniqueRuleBadge(container, seen, text, className='badge', ariaPrefix=''){
  const translated = translateLiturgicalText(text);
  const k = canonicalRuleKey(text);
  if(!translated || !k || seen.has(k)) return false;
  seen.add(k);
  const attrs={class:className};
  if(ariaPrefix) attrs['aria-label']=ariaPrefix+': '+translated;
  container.appendChild(el('span',attrs,translated));
  return true;
}
function shouldShowNoteText(text, seen){
  if(!text || /source[- ]traced master dataset|freshly re[- ]?scraped/i.test(text)) return false;
  const k=canonicalRuleKey(text);
  return !!k && !seen.has(k);
}
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
function isLateDayTodayEmpty(intent){
  const explicitToday = intent?.day === 'today' || quickMode === 'today';
  if(!explicitToday) return false;
  const now = new Date();
  const todayName = DAYS[now.getDay()];
  return DATA.filter(r => r.is_active && r.is_mass_only_visible && r.day_of_week === todayName).every(r => mins(r.time_24h) <= now.getHours()*60 + now.getMinutes());
}
function noResultHintForIntent(intent){
  if(intent?.ambiguousBareTime) return ambiguousTimeMessage(intent.rawQuery || intent.raw);
  if(isLateDayTodayEmpty(intent)) return tr('noMoreToday');
  if(locationErrorKey) return tr('locationDenied');
  if(intent?.near && !userPos) return tr('nearNoLocationText');
  if(intent?.near && userPos) return tr('nearNoMatchHint');
  if(intent?.english) return currentLang === 'fr' ? 'Aucune messe en anglais trouvée pour cette recherche. Les informations de langue peuvent être incomplètes ; essayez une recherche plus large.' : 'No English Mass found for this search. Language information may be incomplete; try broadening your search.';
  if(intent?.other && $('mode')?.value !== 'all') return tr('noResultOtherHint');
  if(intent?.bucket === 'evening') return currentLang === 'fr' ? 'Aucune messe du soir trouvée pour cette recherche. Essayez de retirer “soir” ou d’élargir le lieu.' : 'No evening Mass found for this search. Try removing “evening” or broadening the place.';
  if(intent?.bucket === 'morning') return currentLang === 'fr' ? 'Aucune messe du matin trouvée pour cette recherche. Essayez de retirer “matin” ou d’élargir le lieu.' : 'No morning Mass found for this search. Try removing “morning” or broadening the place.';
  if(intent?.exactTime) return currentLang === 'fr' ? 'Aucune messe trouvée autour de cet horaire. Essayez une heure proche ou retirez l’heure.' : 'No Mass found around that time. Try a nearby time or remove the time.';
  return tr(nextMode ? 'noResultNextHint' : 'noResultHint');
}
function render(){
  updateStaticText();
  const arr=filtered(); renderStats(); renderNotice(); renderNextHero();
  const root=$('results'); root.innerHTML='';
  const renderIntent = parseSearchIntent($('q')?.value || '');
  if(renderIntent.english && arr.length > 0 && arr.length <= 5){ root.appendChild(el('div',{class:'notice ok'},tr('englishLimitedNotice'))); }
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
    if(nearMode && !userPos){
      empty.appendChild(el('div',{},tr('nearNoLocationTitle')));
      empty.appendChild(el('div',{class:'small'},tr('nearNoLocationText')));
      const er=el('div',{class:'actions'});
      const use=el('button',{class:'primary'},tr('nearUseLocation')); use.addEventListener('click',()=>showNear()); er.appendChild(use);
      const next=el('button',{},tr('nearShowNextMauritius')); next.addEventListener('click',()=>showNext()); er.appendChild(next);
      empty.appendChild(er); root.appendChild(empty); return;
    }
    empty.appendChild(el('div',{},tr('noResult')));
    const rawQ=$('q')?.value || '';
    const intent=parseSearchIntent(rawQ);
    const effectiveQ=intent.cleanQuery;
    const hasQuery=!!norm(effectiveQ || rawQ);
    const baseMode=$('mode')?.value || 'mass';
    let preFilterMatches=[];
    if(hasQuery){
      preFilterMatches = DATA.filter(r=>r.is_active)
        .filter(r=>baseMode === 'all' || r.is_mass_only_visible)
        .filter(r=>!favOnly || favs.has(r.site_uid))
        .filter(r=>!norm(effectiveQ) || searchScore(r, effectiveQ) >= 30);
    }
    const activeFilters=[];
    if($('day')?.value) activeFilters.push(dayLabel($('day').value));
    if($('region')?.value) activeFilters.push($('region').value);
    if($('timeOfDay')?.value) activeFilters.push(tr($('timeOfDay').value));
    if(quickMode) activeFilters.push(tr('qaSundayTitle'));
    if(favOnly) activeFilters.push(tr('myChurches'));
    if(hasQuery && preFilterMatches.length && activeFilters.length){
      empty.appendChild(el('div',{class:'small'},tr('noResultFilters')));
      empty.appendChild(el('div',{class:'small'},tr('activeFiltersLabel')+': '+activeFilters.join(' · ')));
    } else {
      empty.appendChild(el('div',{class:'small'},noResultHintForIntent(intent)));
      if(hasQuery){
        const suggestions=buildSuggestions(effectiveQ || rawQ);
        if(suggestions.length){
          const sug=el('div',{class:'small'},tr('didYouMean')+': ');
          const chips=el('div',{class:'assistChips'});
          suggestions.slice(0,5).forEach(x=>{ const b=el('button',{class:'assistChip'},x.label); b.addEventListener('click',()=>applySearchText(x.label)); chips.appendChild(b); });
          empty.appendChild(sug); empty.appendChild(chips);
        } else {
          empty.appendChild(el('div',{class:'small'},tr('searchExamples')));
        }
      }
    }
    if($('mode').value !== 'all' && DATA.some(r=>!r.is_mass_only_visible)) empty.appendChild(el('div',{class:'small'},tr('noResultOtherHint')));
    const er=el('div',{class:'actions'});
    const clear=el('button',{},tr(hasQuery && preFilterMatches.length && activeFilters.length ? 'clearFiltersAction' : 'clear')); clear.addEventListener('click',()=>{$('clearBtn').click();}); er.appendChild(clear);
    if(isLateDayTodayEmpty(intent)){ const tomorrowBtn=el('button',{class:'primary'},tr('chipTomorrow')); tomorrowBtn.addEventListener('click',()=>applySearchText('tomorrow')); er.appendChild(tomorrowBtn); }
    const sun=el('button',{},tr('qaSundayTitle')); sun.addEventListener('click',()=>showSunday()); er.appendChild(sun);
    const near=el('button',{},tr('qaNearTitle')); near.addEventListener('click',()=>showNear()); er.appendChild(near);
    const all=el('button',{},tr('includeOther')); all.addEventListener('click',()=>{$('mode').value='all'; nextMode=false; quickMode=''; showAllResults=true; render();}); er.appendChild(all);
    empty.appendChild(er); root.appendChild(empty); return;
  }
  const initialBroadView = !showAllResults && !($('q').value || $('day').value || $('region').value || favOnly || nearMode || quickMode);
  const displayArr = initialBroadView ? arr.slice(0,24) : arr;
  if(nearMode && userPos) root.appendChild(el('div',{class:'notice ok'},tr('nearResultsTitle')));
  root.appendChild(el('div',{class:'small'},displayArr.length+' '+tr('results')+(initialBroadView && arr.length>displayArr.length ? ' · '+tr('showingTop') : '')));
  if(nearMode && userPos && displayArr[0] && nextDelta(displayArr[0]) > 2880) root.appendChild(el('div',{class:'notice warn'},tr('nearFarWarning')));
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
    const seenRuleTexts = new Set();
    badges.appendChild(el('span',{class:'badge mass'},dayLabel(r.day_of_week)));
    if(isVigilMass(r)){
      appendUniqueRuleBadge(badges, seenRuleTexts, tr('sundayObligationBadge'), 'badge warn', tr('sundayObligationBadge'));
    }
    else if(r.day_of_week === 'Dimanche' && r.is_mass_only_visible){ badges.appendChild(el('span',{class:'badge warn','aria-label':tr('sundayMassBadge')},tr('sundayMassBadge'))); }
    else if(r.is_mass_only_visible){ badges.appendChild(el('span',{class:'badge mass','aria-label':tr('weekdayMassBadge')},tr('weekdayMassBadge'))); }
    if(!r.is_mass_only_visible){ badges.appendChild(el('span',{class:'badge warn','aria-label':tr('otherCelebrationBadge')},tr('otherCelebrationBadge'))); }
    badges.appendChild(el('span',{class:'badge '+(r.is_mass_only_visible?'mass':'')},categoryLabel(r)));
    if(nextMode || nearMode || ['today','tomorrow'].includes(parseSearchIntent($('q')?.value || '').day) || parseSearchIntent($('q')?.value || '').now){ badges.appendChild(el('span',{class:'badge'}, relativeDayLabel(r))); }
    appendUniqueRuleBadge(badges, seenRuleTexts, r.special_rule, 'badge warn', tr('specialRuleBadge'));
    appendUniqueRuleBadge(badges, seenRuleTexts, r.qualifier, 'badge', '');
    if(r.language && !/^fr$/i.test(String(r.language).trim())) appendUniqueRuleBadge(badges, seenRuleTexts, r.language, 'badge', tr('languageLabel'));
    const d=userPos?distKm(userPos.lat,userPos.lon,r.latitude,r.longitude):null; if(d!=null) badges.appendChild(el('span',{class:'badge'},distanceLabel(r,d)));
    badges.appendChild(el('span',{class:verifiedChipClass(r)},verifiedChipText(r)));
    card.appendChild(badges);
    if(isVigilMass(r)) card.appendChild(el('div',{class:'small vigilLine','aria-label':(currentLang==='fr' ? 'Messe anticipée du dimanche' : 'Vigil Mass for Sunday')}, (currentLang==='fr' ? dayLabel(r.day_of_week)+' '+r.time_24h+' · Messe anticipée du dimanche' : dayLabel(r.day_of_week)+' '+r.time_24h+' · Vigil Mass for Sunday')));
    if(shouldShowNoteText(r.notes, seenRuleTexts)){ const noteText = translateLiturgicalText(r.notes); seenRuleTexts.add(canonicalRuleKey(r.notes)); card.appendChild(el('div',{class:'small'},noteText)); } 
    card.appendChild(el('div',{class:'small'},tr('verifiedNote')));
    const actions=el('div',{class:'actions'});
    actions.appendChild(el('a',{class:'primarylink',href:mapsUrl(r),target:'_blank',rel:'noopener','aria-label':tr('directions')+' — '+siteDisplayName(r)},tr('directions')));
    const share=el('button',{'aria-label':tr('shareThisMass')+' — '+siteDisplayName(r)},tr('shareThisMass')); share.addEventListener('click',()=>shareAction(r)); actions.appendChild(share);
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
function updateHelpModalText(){ if(!$('helpModal')) return; $('helpModalTitle').textContent=tr('helpTitle'); $('helpModalBody').innerHTML=tr('helpHtml'); const topClose=$('helpClose'); if(topClose){ topClose.textContent='×'; topClose.setAttribute('aria-label', currentLang==='fr'?'Fermer l’aide':'Close help'); topClose.setAttribute('title', currentLang==='fr'?'Fermer l’aide':'Close help'); } const bottom=$('helpBottomClose'); if(bottom){ bottom.textContent=tr('backToResults'); bottom.setAttribute('aria-label',tr('backToResults')); } $('helpModal').setAttribute('aria-label',tr('helpTitle')); }
function updateOnboardingText(){ if(!$('onboardingModal')) return; const pair=onboardingKeys[onboardingIndex]||onboardingKeys[0]; $('onboardingTitle').textContent=tr(pair[0]); $('onboardingText').textContent=tr(pair[1]); $('onboardingStep').textContent=(onboardingIndex+1)+' / '+onboardingKeys.length; $('onboardingSkip').textContent=tr('onboardingSkip'); $('onboardingNext').textContent=onboardingIndex===onboardingKeys.length-1?tr('onboardingDone'):tr('onboardingNext'); $('onboardingModal').setAttribute('aria-label',tr(pair[0])); }
function migrateLegacyStorageKeys(){
  const oldLang = safeGetLocalStorage('mmf_lang','');
  if(oldLang && !safeGetLocalStorage('mmf_language','')) safeSetLocalStorage('mmf_language', oldLang);
  try { localStorage.removeItem('mmf_lang'); } catch(_e){}
  const oldFavs = safeGetLocalStorage('mmf_site_favourites','');
  if(oldFavs && !safeGetLocalStorage('mmf_my_churches','')) safeSetLocalStorage('mmf_my_churches', oldFavs);
  try { localStorage.removeItem('mmf_site_favourites'); } catch(_e){}
  try{
    const legacyPrefix = ['mmf','onboarding','v'].join('_');
    const legacySuffix = '_done';
    let legacyDone = false;
    const removeKeys = [];
    for(let i=0;i<localStorage.length;i++){
      const k = localStorage.key(i) || '';
      if(k.startsWith(legacyPrefix) && k.endsWith(legacySuffix)){
        if(localStorage.getItem(k) === '1') legacyDone = true;
        removeKeys.push(k);
      }
    }
    if(legacyDone && safeGetLocalStorage('mmf_onboarding_done','') !== '1') safeSetLocalStorage('mmf_onboarding_done','1');
    if(legacyDone && !safeGetLocalStorage('mmf_onboarding_last_seen_version','')) safeSetLocalStorage('mmf_onboarding_last_seen_version', APP_VERSION);
    removeKeys.forEach(k => { try { localStorage.removeItem(k); } catch(_e){} });
  }catch(_e){}
}

function closeOnboarding(){
  safeSetLocalStorage('mmf_onboarding_done','1');
  safeSetLocalStorage('mmf_onboarding_last_seen_version', APP_VERSION);
  closeModal('onboardingModal');
}
function initModals(){ $('helpBtn')?.addEventListener('click',()=>openModal('helpModal')); $('helpClose')?.addEventListener('click',()=>closeModal('helpModal')); $('helpBottomClose')?.addEventListener('click',()=>closeModal('helpModal')); $('helpBackdrop')?.addEventListener('click',()=>closeModal('helpModal')); $('onboardingSkip')?.addEventListener('click',closeOnboarding); $('onboardingNext')?.addEventListener('click',()=>{ if(onboardingIndex>=onboardingKeys.length-1) closeOnboarding(); else { onboardingIndex++; updateOnboardingText(); $('onboardingNext')?.focus(); } }); $('onboardingBackdrop')?.addEventListener('click',closeOnboarding); document.addEventListener('keydown',e=>{ const open=[...document.querySelectorAll('.modalOverlay:not([hidden])')].pop(); if(!open) return; if(e.key==='Escape'){ e.preventDefault(); open.id==='onboardingModal'?closeOnboarding():closeModal(open.id); } if(e.key==='Tab'){ const f=modalFocusable(open); if(!f.length) return; const first=f[0], last=f[f.length-1]; if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); } } }); updateHelpModalText(); updateOnboardingText(); migrateLegacyStorageKeys(); if(safeGetLocalStorage('mmf_onboarding_done','')!=='1') setTimeout(()=>openModal('onboardingModal'),700); }

function scrollToResults(){ document.getElementById('results')?.scrollIntoView({behavior:'smooth', block:'start'}); }
function scrollToSearch(){ document.getElementById('searchPanel')?.scrollIntoView({behavior:'smooth', block:'start'}); }
function setActiveNav(id){ document.querySelectorAll('.navBtn').forEach(b=>b.classList.toggle('active', b.id===id)); }
function showNext(){ trackEvent('next_mass_used'); nextMode=true; nearMode=false; quickMode=''; favOnly=false; showAllResults=false; syncFavButton(); $('day').value=''; $('mode').value='mass'; setActiveNav('navHome'); render(); scrollToResults(); }
function showSunday(){ nextMode=false; nearMode=false; quickMode='sundayMorning'; favOnly=false; showAllResults=false; syncFavButton(); $('day').value='Dimanche'; $('mode').value='mass'; setActiveNav('navHome'); render(); scrollToResults(); }
function syncFavButton(){ $('favOnlyBtn')?.classList.toggle('primary', favOnly); }
function resetFiltersForNearMe(){
  // Near Me is additive. Do not clear query, day, region, time, mode, language, or saved-church filters.
  nextMode=false; quickMode=''; showAllResults=false; syncFavButton(); setActiveNav('navNear');
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
function requestLocationAndShowNear(){ trackEvent('near_me_used');
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

$('q')?.addEventListener('input',()=>{ if(isNearMeIntent($('q').value)){ nextMode=false; quickMode=''; showAllResults=false; showNear(); render(); renderSearchAssist(false); return; } nextMode=false; nearMode=false; locationErrorKey=''; quickMode=''; showAllResults=false; render(); renderSearchAssist(true); });
$('q')?.addEventListener('focus',()=>renderSearchAssist(true));
$('q')?.addEventListener('keydown',e=>{ if(e.key==='Enter'){ if(isNearMeIntent($('q').value)){ e.preventDefault(); saveRecentSearch($('q').value); showNear(); renderSearchAssist(false); return; } saveRecentSearch($('q').value); trackEvent('search_used'); renderSearchAssist(false); } });
['day','region','timeOfDay','mode'].forEach(id => $(id).addEventListener('input',()=>{ nextMode=false; quickMode=''; showAllResults=false; render(); }));
$('nextBtn').addEventListener('click',()=>showNext());
$('clearBtn').addEventListener('click',()=>{ ['q','day','region','timeOfDay'].forEach(id=>{ if($(id)) $(id).value=''; }); $('mode').value='mass'; nextMode=true; nearMode=false; quickMode=''; favOnly=false; showAllResults=false; userPos=null; locationErrorKey=''; syncFavButton(); setActiveNav('navHome'); render(); });
$('favOnlyBtn').addEventListener('click',()=>{ favOnly=!favOnly; nextMode=false; nearMode=false; quickMode=''; showAllResults=false; syncFavButton(); if(favOnly) setActiveNav('navFav'); render(); scrollToResults(); });
$('nearBtn').addEventListener('click',()=>showNear());

$('qaNow')?.addEventListener('click',()=>showNext());
$('qaToday')?.addEventListener('click',()=>applySearchText('today'));
$('qaTomorrow')?.addEventListener('click',()=>applySearchText('tomorrow'));
$('qaNear')?.addEventListener('click',()=>showNear());

document.addEventListener('click', (ev) => {
  const btn = ev.target && ev.target.closest ? ev.target.closest('[data-ambiguous-time]') : null;
  if(!btn) return;
  applySearchText(btn.getAttribute('data-ambiguous-time') || btn.textContent || '');
});
$('qaSunday')?.addEventListener('click',()=>showSunday());
$('qaFav')?.addEventListener('click',()=>showFavs());
$('qaShareApp')?.addEventListener('click', shareAppAction);
$('shareAppBtn')?.addEventListener('click', shareAppAction);
$('headerShareApp')?.addEventListener('click', shareAppAction);
$('navHome')?.addEventListener('click',()=>{setActiveNav('navHome'); document.getElementById('homePanel')?.scrollIntoView({behavior:'smooth', block:'start'});});
$('navSearch')?.addEventListener('click',()=>{setActiveNav('navSearch'); scrollToSearch();});
$('navNear')?.addEventListener('click',()=>showNear());
$('navFav')?.addEventListener('click',()=>showFavs());
$('navMore')?.addEventListener('click',()=>{setActiveNav('navMore'); document.querySelector('footer')?.scrollIntoView({behavior:'smooth', block:'end'});});
$('langEn')?.addEventListener('click',()=>setLang('en'));
$('langFr')?.addEventListener('click',()=>setLang('fr'));
function openUpdateHelp(){ const about=$('aboutPanel'); if(about) about.open=true; const panel=$('howUpdatePanel') || about; panel?.scrollIntoView({behavior:'smooth', block:'center'}); const btn=$('howUpdateBtn'); btn?.focus({preventScroll:true}); }
$('howUpdateBtn')?.addEventListener('click', openUpdateHelp);
async function clearMmfRuntimeCaches(){
  try{
    if('caches' in window){
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => /^mmf-/i.test(k)).map(k => caches.delete(k)));
    }
  }catch(_e){}
}
function reloadWithCacheBust(){
  const url = new URL(window.location.href);
  url.searchParams.set('mmf_refresh', Date.now().toString());
  window.location.replace(url.toString());
}
async function applyServiceWorkerUpdate(){
  trackEvent('update_refresh_started');
  if(location.protocol === 'file:') { window.location.reload(); return; }
  try{
    await clearMmfRuntimeCaches();
    if('serviceWorker' in navigator){
      const reg = await navigator.serviceWorker.getRegistration();
      if(reg){
        if(reg.waiting){
          let reloaded = false;
          const reloadOnce = () => { if(!reloaded){ reloaded = true; reloadWithCacheBust(); } };
          navigator.serviceWorker.addEventListener('controllerchange', reloadOnce, {once:true});
          reg.waiting.postMessage({type:'SKIP_WAITING'});
          setTimeout(reloadOnce, 1500);
          return;
        }
        await reg.update().catch(()=>{});
      }
    }
  }catch(_e){}
  reloadWithCacheBust();
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
  $('updateRefresh').addEventListener('click', () => { trackEvent('update_clicked'); applyServiceWorkerUpdate(); });
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
window.addEventListener('load',()=>{ initAnalytics(); registerServiceWorker(); checkForUpdate(); setInterval(checkForUpdate, 30*60*1000); });
document.addEventListener('visibilitychange',()=>{ if(!document.hidden) checkForUpdate(); });
initModals();
window.MMF = {render, filtered, getData:()=>DATA, setLang, version:APP_VERSION, buildMapsQuery, siteDisplayName, searchMatchesRow, searchKey, searchScore, parseSearchIntent, parseTimeModifier, intentChipLabels, isNearMeIntent, removeNearMePhrases, compareNearResults, nearSortKey, buildSuggestions, isVigilMass, vigilStatus, isSundayFilterMatch, getTimeBucket, checkForUpdate};
loadData();
})();
