// Mauritius Mass Finder v21.4 configuration
// Optional: paste a published Google Sheets CSV URL below if you later want the app to load a live sheet.
// The app reads window.MASS_FINDER_CONFIG. window.MMF_CONFIG is kept as a backward-compatible alias.
window.MASS_FINDER_CONFIG = window.MASS_FINDER_CONFIG || {
  DATA_JSON_URL: './data/masses.json',
  GOOGLE_SHEET_CSV_URL: '',
  REPORT_EMAIL: ''
};
window.MMF_CONFIG = window.MASS_FINDER_CONFIG;
