/**
 * Google Apps Script for "Launch Website" Demo
 * 
 * Instructions:
 * 1. Create a Google Sheet. Name the first tab (or create a tab named): "Enquiries"
 * 2. Add header row in row 1:
 *    A1: Timestamp | B1: Name | C1: Email | D1: Phone | Message: Message | F1: Source
 * 3. Extensions > Apps Script
 * 4. Replace Code.gs with this script.
 * 5. Update SECRET_KEY below (or set it in Script Properties as GOOGLE_SHEET_SECRET).
 * 6. Click Deploy > New deployment > Select type: Web app
 *    - Description: Launch Website Contact Form Webhook
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone
 * 7. Click Deploy, Authorize access, and copy the Web App URL.
 * 8. Paste URL into GOOGLE_SHEET_WEBHOOK_URL in .env.local and set the matching GOOGLE_SHEET_SECRET.
 */

var SECRET_KEY = "CHANGE_ME_TO_MATCH_YOUR_ENV_SECRET";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "Invalid JSON format" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Secret verification check
    var scriptProps = PropertiesService.getScriptProperties();
    var expectedSecret = scriptProps.getProperty("GOOGLE_SHEET_SECRET") || SECRET_KEY;

    if (expectedSecret && expectedSecret !== "CHANGE_ME_TO_MATCH_YOUR_ENV_SECRET") {
      if (data.secret !== expectedSecret) {
        return ContentService
          .createTextOutput(JSON.stringify({ status: "error", message: "Unauthorized: Invalid secret" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName("Enquiries") || doc.getActiveSheet();

    // Ensure header row exists if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Message", "Source"]);
    }

    var timestamp = new Date().toISOString();
    var name = data.name || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var message = data.message || "";
    var source = data.source || "Website Contact Form";

    sheet.appendRow([timestamp, name, email, phone, message, source]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Row added successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
