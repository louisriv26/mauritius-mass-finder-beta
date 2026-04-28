# v24.8 Near Me Ranking Fix

- Fixed typed Near Me intent detection for French and English phrases.
- Bypassed ordinary text-search scoring for Near Me queries.
- Changed Near Me ranking to soonest upcoming Mass first, then distance, coordinate precision, and name.
- Added safe bilingual location-unavailable fallback.
- Updated version metadata and service-worker cache to v24.8.

## v24.7 — Version Metadata Cleanup

- Cleaned stale runtime version metadata from v24.5/v24.6 to v24.7.
- Preserved v24.6 result-card cleanup and time containment fix.
- Preserved v24.5 exact correction email template compliance.
- Preserved full data integrity and app functionality.

# Changelog

## v24.6 — Correction Email and UX Bugfix

- Strengthened deterministic fuzzy search and relevance ranking.
- Added stronger Notre-Dame / ND alias handling.
- Preserved Saint / St, Sainte / Ste, accents, hyphens, apostrophes, and common alias handling.
- Added precomputed normalized search fields for faster mobile search.
- Added filter-aware empty states when active filters hide valid search results.
- Added tappable “Did you mean” suggestions in no-result states.
- Added EN/FR translations for all new search-state text.
- Preserved full dataset integrity: 396 rows, 48 parishes, 118 sites, 379 Mass rows, 17 other celebrations.
- Preserved v24.2 release-gate, update-flow, analytics, PWA/offline, and stable user-storage architecture.

## v24.2 — Release-Gate & Update-Flow Hardened Edition

- Fixed release-gate false failures.
- Cleaned update-flow architecture.
- Preserved stable user-storage keys.
- Corrected analytics documentation consistency.
