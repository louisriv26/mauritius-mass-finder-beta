# Data dictionary

Core fields:
- parish_uid: stable parish identifier
- site_uid: stable church / chapel / site identifier
- region, town
- parish_name, parish_label
- site_name
- day_of_week: Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimanche
- time_24h: HH:MM
- mass_category: Mass or Non-Mass
- is_mass_only_visible: true only for clear Masses
- display_category: label shown in the app
- special_rule / qualifier / notes: conditions such as first Sunday only
- source_url: official source link
- latitude / longitude: optional; improves distance badges and sorting
- maps_query: Google Maps destination string; directions still work without coordinates
