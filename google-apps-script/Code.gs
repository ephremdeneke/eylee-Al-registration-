/**
 * AL-AMI Spark Leadership Program - Google Sheets & Apps Script Backend API
 * 
 * Act as REST API for React Frontend Web App.
 * Saves registration data to Google Sheets, screenshots to Google Drive.
 */

// Configuration
// If your script is not container-bound (standalone), paste your Google Spreadsheet ID here:
// E.g., const SPREADSHEET_ID = "1aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890";
const SPREADSHEET_ID = ""; 
const SPREADSHEET_NAME = "Registrations";
const DRIVE_FOLDER_NAME = "AL-AMI Spark Screenshots";

// Main GET Handler
function doGet(e) {
  // CORS Preflight handles via standard return
  const action = e.parameter.action;
  
  if (action === "list") {
    return handleList();
  } else if (action === "get") {
    const id = e.parameter.id;
    return handleGet(id);
  }
  
  return createResponse({ success: false, error: "Invalid action parameter" });
}

// Main POST Handler
function doPost(e) {
  try {
    let requestData;
    if (e.postData && e.postData.contents) {
      requestData = JSON.parse(e.postData.contents);
    } else {
      return createResponse({ success: false, error: "No post data found" });
    }

    const action = e.parameter.action || requestData.action;

    if (action === "update") {
      return handleUpdate(requestData);
    } else if (action === "delete") {
      return handleDelete(requestData.id || requestData["Registration ID"]);
    } else {
      // Default: create registration
      return handleCreate(requestData);
    }
  } catch (error) {
    return createResponse({ success: false, error: error.toString() });
  }
}

// ----------------------------------------------------
// Core Controller Functions
// ----------------------------------------------------

// 1. Get All Registrations (Sheet to Dashboard)
function handleList() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return createResponse({ success: true, data: [] });
  }
  
  const headers = data[0];
  const list = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const record = {};
    for (let j = 0; j < headers.length; j++) {
      record[headers[j]] = row[j];
    }
    list.push(record);
  }
  
  return createResponse({ success: true, data: list });
}

// 2. Get Single Registration
function handleGet(id) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      const record = {};
      for (let j = 0; j < headers.length; j++) {
        record[headers[j]] = data[i][j];
      }
      return createResponse({ success: true, data: record });
    }
  }
  
  return createResponse({ success: false, error: "Registration not found" });
}

// 3. Create Registration (Form to Sheet)
function handleCreate(data) {
  const sheet = getOrCreateSheet();
  const values = sheet.getDataRange().getValues();
  
  // A. Duplicate Validation (Email or Phone)
  const emailIndex = 6; // Email Address column index
  const phoneIndex = 5; // Phone Number column index
  for (let i = 1; i < values.length; i++) {
    if (values[i][emailIndex] && values[i][emailIndex].toString().toLowerCase() === data.email.toLowerCase()) {
      return createResponse({ success: false, error: "An applicant with this email is already registered." });
    }
    if (values[i][phoneIndex] && values[i][phoneIndex].toString() === data.phone) {
      return createResponse({ success: false, error: "An applicant with this phone number is already registered." });
    }
  }
  
  // B. Generate Registration ID (e.g. ALAMI-2-2026-00001)
  let nextNum = 1;
  const sheetData = sheet.getDataRange().getValues();
  if (sheetData.length > 1) {
    const lastId = sheetData[sheetData.length - 1][0];
    if (lastId && lastId.toString().startsWith("ALAMI-2-2026-")) {
      const parts = lastId.toString().split("-");
      const numPart = parts[parts.length - 1];
      nextNum = parseInt(numPart) + 1;
    }
  }
  const regId = "ALAMI-2-2026-" + String(nextNum).padStart(5, '0');
  const regDate = new Date().toISOString();

  // C. Upload Payment Screenshot to Google Drive (if present)
  let screenshotUrl = "";
  if (data.screenshotBase64 && data.screenshotName) {
    try {
      screenshotUrl = saveFileToDrive(data.screenshotBase64, data.screenshotName, regId);
    } catch (e) {
      Logger.log("Failed to upload image: " + e.toString());
      // Proceed without image rather than crashing whole form submission
    }
  }

  // D. Map payload to spreadsheet headers
  const rowData = [
    regId,                          // 1. Registration ID
    regDate,                        // 2. Registration Date
    data.fullName,                  // 3. Full Name
    data.gender,                    // 4. Gender
    data.age,                       // 5. Age
    data.phone,                     // 6. Phone Number
    data.email,                     // 7. Email Address
    data.city,                      // 8. Current City
    data.school,                    // 9. School/University/Organization
    data.occupation,                // 10. Occupation
    data.training,                  // 11. Previous Leadership Training
    data.experience,                // 12. Leadership Experience
    data.whyJoin,                   // 13. Why Join AL-AMI Spark
    data.biggestChallenge,          // 14. Biggest Challenge
    data.hopeToLearn,               // 15. Hope to Learn
    data.teamPreference,            // 16. Preferred Team
    data.referralSource,            // 17. Referral Source
    data.participantCategory || 'Youth Leader', // 18. Participant Category
    "0",                            // 19. Commitment Fee
    "Free",                         // 20. Payment Status
    data.paymentReference || "",    // 21. Payment Reference
    screenshotUrl,                  // 22. Payment Screenshot
    data.agreement ? "Yes" : "No",  // 23. Commitment Agreement
    0,                              // 24. Selection Score
    "Pending",                      // 25. Selected
    "",                             // 26. Assigned Team
    ""                              // 27. Remarks
  ];

  sheet.appendRow(rowData);
  
  // Return the saved record fields
  const headers = values[0] || getHeaders();
  const record = {};
  for (let j = 0; j < headers.length; j++) {
    record[headers[j]] = rowData[j];
  }

  return createResponse({ success: true, data: record });
}

// 4. Update Registration details (For Admin Dashboard)
function handleUpdate(updateData) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const targetId = updateData["Registration ID"];
  
  if (!targetId) {
    return createResponse({ success: false, error: "Registration ID is required for updates" });
  }

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === targetId) {
      const rowIndex = i + 1; // 1-indexed for sheets
      
      // Update each field specified in the payload
      for (const key in updateData) {
        if (key === "Registration ID") continue;
        
        const colIndex = headers.indexOf(key);
        if (colIndex !== -1) {
          // FIX: Use sheet.getRange(row, col) instead of sheet.getCell() which is undefined!
          sheet.getRange(rowIndex, colIndex + 1).setValue(updateData[key]);
        }
      }
      
      // Retrieve the freshly updated row
      const updatedRow = sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
      const record = {};
      for (let j = 0; j < headers.length; j++) {
        record[headers[j]] = updatedRow[j];
      }
      
      return createResponse({ success: true, data: record });
    }
  }
  
  return createResponse({ success: false, error: "Participant ID not found" });
}

// 5. Delete Registration
function handleDelete(id) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  if (!id) {
    return createResponse({ success: false, error: "ID is required for deletion" });
  }

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.deleteRow(i + 1);
      return createResponse({ success: true, message: "Record deleted successfully" });
    }
  }
  
  return createResponse({ success: false, error: "Record not found" });
}

// ----------------------------------------------------
// Utility Functions
// ----------------------------------------------------

// Get or Create Spreadsheet Sheet (Supports standalone or container-bound sheets)
function getOrCreateSheet() {
  let ss;
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    throw new Error("Could not access Google Spreadsheet. If running standalone, set SPREADSHEET_ID in Code.gs.");
  }

  let sheet = ss.getSheetByName(SPREADSHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SPREADSHEET_NAME);
    sheet.appendRow(getHeaders());
  }
  
  return sheet;
}

// Save Base64 file string to Google Drive
function saveFileToDrive(base64Data, originalName, regId) {
  // Extract content type and base64 bytes
  const parts = base64Data.split(",");
  const metadata = parts[0];
  const rawBase64 = parts[1];
  
  const contentType = metadata.split(";")[0].split(":")[1];
  const decodedBytes = Utilities.base64Decode(rawBase64);
  const blob = Utilities.newBlob(decodedBytes, contentType, regId + "_" + originalName);
  
  // Find or create Drive folder
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  let folder;
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(DRIVE_FOLDER_NAME);
  }
  
  // Save file to folder
  const file = folder.createFile(blob);
  
  // Set permissions: Anyone with the link can view
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  return file.getUrl();
}

// Define Schema Headers
function getHeaders() {
  return [
    "Registration ID",
    "Registration Date",
    "Full Name",
    "Gender",
    "Age",
    "Phone Number",
    "Email Address",
    "Current City",
    "School/University/Organization",
    "Occupation",
    "Previous Leadership Training",
    "Leadership Experience",
    "Why Join AL-AMI Spark",
    "Biggest Challenge",
    "Hope to Learn",
    "Preferred Team",
    "Referral Source",
    "Participant Category",
    "Commitment Fee",
    "Payment Status",
    "Payment Reference",
    "Payment Screenshot",
    "Commitment Agreement",
    "Selection Score",
    "Selected",
    "Assigned Team",
    "Remarks"
  ];
}

// Format API Response with JSON MIME type
function createResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
