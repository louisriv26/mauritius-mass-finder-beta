# Mauritius Mass Finder v17.2

Sunday Obligation Release Hardening Edition.

Use this GitHub Pages-ready package for deployment.

Main improvements:
- Sunday obligation mode includes Sunday Masses and explicit Saturday Vigil Masses.
- Vigil Masses are clearly marked and shown as Vigil Mass for Sunday / Messe anticipée du dimanche.
- Near Me clears stale filters even if location access is denied or unavailable.
- Help and onboarding text re-render correctly when switching EN/FR.
- Version, manifest, service worker, cache, and validation files updated to v17.2.

Validated counts:
- 383 rows
- 47 parishes
- 117 sites
- 378 Mass rows
- 5 other / ambiguous rows
- 78 explicit Vigil Mass rows

Files:
- index.html
- app.js
- data/masses.json
- data/masses.csv
- fallback-data.js
- manifest.json
- manifest.webmanifest
- sw.js
- service-worker.js
- version.json
- icons/
- release-validation-v17.2.txt
- validate-release.js
- .nojekyll
