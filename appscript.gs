/**
 * ===== SHINING STAR PUBLIC SCHOOL =====
 * Google Apps Script Backend for Admission Form
 * 
 * DEPLOYMENT STEPS:
 * 1. Go to https://script.google.com and create a new project
 * 2. Paste this code into Code.gs
 * 3. Click "Deploy" > "New deployment"
 * 4. Select "Web app" as the type
 * 5. Set "Execute as" to "Me"
 * 6. Set "Who has access" to "Anyone"
 * 7. Click "Deploy" and authorize
 * 8. Copy the Web App URL
 * 9. Paste the URL into script.js (replace YOUR_GOOGLE_APPS_SCRIPT_URL_HERE)
 * 
 * GOOGLE SHEET SETUP:
 * 1. Create a new Google Sheet
 * 2. Name the first sheet "Admissions"
 * 3. Add these headers in Row 1:
 *    Timestamp | Student Name | Date of Birth | Gender | Applying For | 
 *    Father Name | Mother Name | Mobile | Alternate Number | Email | 
 *    Address | City | Previous School | Message
 * 4. Copy the Sheet ID from the URL and paste below
 */

// ===== REPLACE WITH YOUR GOOGLE SHEET ID =====
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Admissions';

/**
 * Handle POST requests from the admission form
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    let data;
    if (e.postData && e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    // Append row with timestamp
    sheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.studentName || '',
      data.dob || '',
      data.gender || '',
      data.applyingFor || '',
      data.fatherName || '',
      data.motherName || '',
      data.mobile || '',
      data.altNumber || '',
      data.email || '',
      data.address || '',
      data.city || '',
      data.previousSchool || '',
      data.message || ''
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Form submitted successfully!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Shining Star School API is running!' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle CORS - Options preflight
 * Note: Google Apps Script handles CORS automatically for web apps
 * deployed with "Anyone" access. The no-cors mode in fetch handles this.
 */
