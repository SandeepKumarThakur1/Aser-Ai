# Contact form → Google Sheets setup

The contact form on `contact.html` sends every submission to your Google Sheet
and emails an alert to **info@aser.ai**. This takes about 5 minutes and only has to be done once.

Sheet: https://docs.google.com/spreadsheets/d/1zsL0RH6ubtYufug3tw0mSMGtRTanPqEOc7_vMS9m624/edit

## 1. Add the script
1. Open the Google Sheet above (signed in with the account that owns it).
2. Go to **Extensions → Apps Script**.
3. Delete everything in `Code.gs` and paste in the contents of `google-apps-script/Code.gs`.
4. Click **Save** (💾).

## 2. Approve permissions (one time)
1. In the function dropdown at the top, choose **setup** and click **Run**.
2. Click **Review permissions**, pick your Google account.
3. If you see "Google hasn't verified this app": **Advanced → Go to (project name) → Allow**.
4. A new tab **Contact Submissions** with headers now appears in the sheet.

## 3. Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Click the ⚙️ next to "Select type", choose **Web app**.
3. **Execute as:** Me  **Who has access:** Anyone
4. Click **Deploy** and copy the **Web app URL**
   (looks like `https://script.google.com/macros/s/AKfy..../exec`).

## 4. Paste the URL into the website
Open `contact.html`, find this line and replace the placeholder:

```html
data-endpoint="PASTE_YOUR_WEB_APP_URL_HERE"
```

→

```html
data-endpoint="https://script.google.com/macros/s/AKfy..../exec"
```

Upload the site. Done.

## 5. Test
- Open the Web App URL in your browser. You should see `"ASER AI contact endpoint is running."`
- Submit the form on the site. A row appears in **Contact Submissions**, and an email arrives at info@aser.ai.

## Notes
- **Changed Code.gs later?** Use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.
  This keeps the same URL. ("New deployment" creates a *new* URL.)
- **Email alerts:** change or blank out `NOTIFY_EMAIL` in `Code.gs`. Free Gmail accounts can send ~100 alerts/day; Workspace accounts ~1,500.
  If the limit is hit, rows are still saved.
- **Spam:** the form has a hidden honeypot field; bot submissions are silently dropped.
- **Until the URL is pasted**, the form shows "The form isn't connected yet" instead of sending. It never opens Gmail/Outlook.
- **Still opening Gmail/Outlook?** Your browser is using the old `main.js`. Hard refresh (Ctrl+Shift+R) or upload the new `script/main.js`.
- Columns saved: Submitted at (Malaysia time), Full name, Email, Company, Topic, Message, Page.
