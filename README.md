# Mauritius Mass Finder v24.7

Version Metadata Cleanup Edition.

## Deployment
Upload the contents of this package to the GitHub Pages branch/root. Keep \.nojekyll.

## Data updates
Normal Mass-time updates should be made in data/masses.json and data/masses.csv. The embedded fallback remains available for offline resilience.

## User data
Saved churches, language preference, onboarding status, and location hint status use stable localStorage keys and are not tied to release version numbers.

## Analytics
Privacy-friendly analytics is enabled in `config.js` for the configured Plausible domain. The app still works normally if analytics is blocked by the browser, network, or a privacy extension. To disable analytics, set `analytics.enabled` to `false` in `config.js`.


## Release gate and update flow
Use `admin/release-gate-legacy-scan.sh` before every upload. The gate scans runtime files only, so verification reports and changelogs cannot create false failures.

For every new release:
1. bump `APP_VERSION` in `app.js`;
2. bump `version.json.version`;
3. bump `version.json.cache_version`;
4. bump `CACHE` in `sw.js`;
5. upload all files, including `version.json` and `sw.js`.

Users are informed of a new version because the app checks `version.json` with `cache: no-store`. If the live `version.json` is newer than the open app version, the update banner appears. Clicking Refresh now clears old MMF caches, activates the latest service worker where available, and reloads the app without deleting saved churches or language preferences.

## v24.7 version metadata cleanup
Search uses deterministic, local-only normalization, ranking, conservative typo tolerance, and suggestions. It does not use AI search or external search services.
