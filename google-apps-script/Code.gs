/**
 * ASER AI — Contact form → Google Sheets (+ email alert)
 *
 * Paste this whole file into Extensions → Apps Script of the sheet,
 * then Deploy → New deployment → Web app (Execute as: Me, Access: Anyone).
 * See SETUP.md for the full steps.
 */

// ---------- Settings ----------
const SHEET_ID     = '1zsL0RH6ubtYufug3tw0mSMGtRTanPqEOc7_vMS9m624';
const SHEET_NAME   = 'Contact Submissions';          // tab is created automatically
const NOTIFY_EMAIL = 'info@aser.ai';                 // set to '' to turn off email alerts
const TIMEZONE     = 'Asia/Kuala_Lumpur';

const HEADERS = ['Submitted at', 'Full name', 'Email', 'Company', 'Topic', 'Message', 'Page'];
const ALLOWED_TOPICS = [
  'General enquiry', 'Request a demo', 'BESS operational pilot',
  'Insurance pilot', 'Partnership', 'Careers', 'Investors'
];

// ---------- Web app entry points ----------
function doPost(e) {
  const p = (e && e.parameter) || {};

  // Honeypot: real visitors never fill this field
  if (p.website) return json_({ result: 'success' });

  const data = {
    name:    clean_(p.name, 120),
    email:   clean_(p.email, 200),
    company: clean_(p.company, 200),
    topic:   ALLOWED_TOPICS.indexOf(p.topic) > -1 ? p.topic : 'General enquiry',
    message: clean_(p.message, 5000),
    page:    clean_(p.page, 300)
  };

  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json_({ result: 'error', error: 'Missing or invalid fields' });
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getSheet_();
    sheet.appendRow([
      Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
      data.name, data.email, data.company, data.topic, data.message, data.page
    ]);
  } catch (err) {
    return json_({ result: 'error', error: 'Could not save submission' });
  } finally {
    lock.releaseLock();
  }

  if (NOTIFY_EMAIL) {
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: data.email,
        subject: 'New website enquiry: ' + data.topic + ' — ' + data.name,
        body:
          'Name: ' + data.name + '\n' +
          'Email: ' + data.email + '\n' +
          'Company: ' + (data.company || '-') + '\n' +
          'Topic: ' + data.topic + '\n\n' +
          data.message + '\n\n' +
          '— Sent from ' + (data.page || 'aser.ai contact form')
      });
    } catch (err) {
      // Row is already saved; don't fail the visitor if email quota is hit
    }
  }

  return json_({ result: 'success' });
}

// Lets you open the Web App URL in a browser to check it's live
function doGet() {
  return json_({ result: 'ok', message: 'ASER AI contact endpoint is running.' });
}

// ---------- Helpers ----------
function getSheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(6, 400);
  }
  return sheet;
}

// Trims, limits length and stops spreadsheet formula injection (=, +, -, @)
function clean_(value, max) {
  let v = String(value || '').trim().slice(0, max);
  if (/^[=+\-@]/.test(v)) v = "'" + v;
  return v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: run this once from the editor to create the tab + headers and approve permissions
function setup() {
  getSheet_();
}
