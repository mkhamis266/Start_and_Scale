# Wiring the lead form to a Google Sheet

The form in §4.14 of the plan (name, phone, preferred group) submits to a
Google Apps Script "Web App" URL, which appends each submission as a row in
a Google Sheet. One-time setup, ~5 minutes, no server or paid service.

## 1. Create the sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new
   blank spreadsheet. Name it something like "Start and Scale — Leads".
2. In row 1, add these headers (must match exactly, in this order):
   `Name | Phone | Group | Page URL | Submitted At`

## 2. Add the script

1. In the sheet, go to **Extensions → Apps Script**.
2. Delete any placeholder code in `Code.gs` and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var p = e.parameter;
  sheet.appendRow([
    p.name || "",
    p.phone || "",
    p.group || "",
    p.page_url || "",
    p.submitted_at || new Date().toISOString(),
  ]);
  return ContentService.createTextOutput("OK");
}
```

3. Click the disk icon (or Ctrl+S) to save. Name the project anything, e.g.
   "Start and Scale lead intake".

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy**. Google will ask you to authorize the script — approve
   it (it's your own script, acting on your own sheet).
5. Copy the **Web app URL** it gives you — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. Wire it into the site

Open [js/config.js](js/config.js) and paste the URL:

```javascript
LEAD_FORM_ENDPOINT: "https://script.google.com/macros/s/AKfycb.../exec",
```

That's it — form submissions will now show up as new rows in the sheet.
Leave `LEAD_FORM_ENDPOINT` empty to keep the form in local-only mode (it
still shows a "thanks" message, but nothing is actually sent or saved).

## Notes

- If you ever edit the Apps Script code again, you need to **Deploy → Manage
  deployments → edit (pencil) → New version** for the change to take effect
  — saving the file alone does not update the live web app.
- The request uses `fetch(..., { mode: "no-cors" })`, so the browser can't
  read the response back (Apps Script doesn't send CORS headers on simple
  POSTs). The site just assumes success and shows the confirmation message
  regardless — check the sheet itself if you want to confirm a submission
  actually landed.
