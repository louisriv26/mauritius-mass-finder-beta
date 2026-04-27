# Google Sheets live update guide

1. Upload data/masses.csv into Google Sheets.
2. Keep the column names exactly as supplied.
3. File > Share > Publish to web.
4. Choose the sheet/tab and CSV format.
5. Copy the published CSV URL.
6. Paste it into GOOGLE_SHEET_CSV_URL in config.js.
7. Commit config.js to GitHub Pages.

After that, normal schedule changes are made in Google Sheets, not by rebuilding the app.
