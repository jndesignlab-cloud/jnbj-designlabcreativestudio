const SHEET_NAME = "Projects";
const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";
const INQUIRY_SHEET_NAME = "Inquiries";
const INQUIRY_NOTIFICATION_EMAIL = "jannjaravata@gmail.com";

const HEADERS = [
  "Created At",
  "ID",
  "Title",
  "Category",
  "Filter Category",
  "Featured",
  "Image URL",
  "Gallery Image URLs",
  "Skills / Services Used",
  "Description",
  "Problem / Goal",
  "What I Did",
  "Result / Outcome",
  "Project Link",
  "Status"
];

function doGet(e) {
  const action = e.parameter.action;

  if (action === "listProjects") {
    return jsonResponse({
      success: true,
      projects: getProjects()
    });
  }

  if (action === "recordVisit") {
    return jsonResponse({
      success: true,
      visits: recordVisit()
    });
  }

  if (action === "getVisitCount") {
    return jsonResponse({
      success: true,
      visits: getVisitCount()
    });
  }

  return jsonResponse({
    success: false,
    message: "Invalid action."
  });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");

    if (data.action === "submitInquiry") {
      return handleInquirySubmission(data);
    }

    if (data.action === "addProject") {
      if (data.password !== ADMIN_PASSWORD) {
        return jsonResponse({
          success: false,
          message: "Incorrect admin password."
        });
      }

      const sheet = getProjectSheet();
      const title = data.title || "";
      const id = createProjectId(title);

      sheet.appendRow([
        new Date(),
        id,
        title,
        data.category || "",
        data.filterCategory || "",
        data.featured || "FALSE",
        data.image || "",
        data.galleryImages || "",
        data.skills || "",
        data.description || "",
        data.problem || "",
        data.solution || "",
        data.outcome || "",
        data.link || "",
        "Published"
      ]);

      return jsonResponse({
        success: true,
        message: "Project added.",
        id: id
      });
    }

    return jsonResponse({
      success: false,
      message: "Invalid action."
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      message: error.message
    });
  }
}


const INQUIRY_HEADERS = [
  "Created At",
  "Inquiry ID",
  "First Name",
  "Last Name",
  "Email",
  "Contact Number",
  "Company / Brand",
  "Service Interest",
  "Package / Project",
  "Budget Range",
  "Preferred Timeline",
  "Preferred Contact Method",
  "Message",
  "Referral Source",
  "CTA Source",
  "Source Page",
  "Selected Theme",
  "Status",
  "Follow-up Notes",
  "Notification Status",
  "Notification Error"
];

function handleInquirySubmission(data) {
  // Honeypot field: legitimate visitors leave this blank.
  if (String(data.website || "").trim()) {
    return jsonResponse({ success: true, inquiryId: "Received" });
  }

  const requiredFields = [
    ["firstName", "First name"],
    ["lastName", "Last name"],
    ["email", "Email address"],
    ["contactNumber", "Contact number"],
    ["service", "Service interest"],
    ["budget", "Budget range"],
    ["timeline", "Preferred timeline"],
    ["preferredContact", "Preferred contact method"],
    ["message", "Project message"],
    ["consent", "Consent"]
  ];

  requiredFields.forEach(function(field) {
    if (!String(data[field[0]] || "").trim()) {
      throw new Error(field[1] + " is required.");
    }
  });

  const email = String(data.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please provide a valid email address.");
  }

  const message = String(data.message || "").trim();
  if (message.length < 20) {
    throw new Error("Please provide a little more information about the project.");
  }

  const inquiryId = createInquiryId();
  const sheet = getInquirySheet();

  sheet.appendRow([
    new Date(),
    inquiryId,
    cleanInquiryValue(data.firstName, 80),
    cleanInquiryValue(data.lastName, 80),
    cleanInquiryValue(email, 160),
    cleanInquiryValue(data.contactNumber, 40),
    cleanInquiryValue(data.company, 140),
    cleanInquiryValue(data.service, 140),
    cleanInquiryValue(data.package, 180),
    cleanInquiryValue(data.budget, 80),
    cleanInquiryValue(data.timeline, 100),
    cleanInquiryValue(data.preferredContact, 80),
    cleanInquiryValue(message, 3000),
    cleanInquiryValue(data.referralSource, 100),
    cleanInquiryValue(data.source, 160),
    cleanInquiryValue(data.sourcePage, 500),
    cleanInquiryValue(data.theme, 30),
    "New",
    "",
    "Pending",
    ""
  ]);

  const inquiryRow = sheet.getLastRow();
  const notification = sendInquiryNotification(data, inquiryId);
  updateInquiryNotificationStatus(sheet, inquiryRow, notification);

  return jsonResponse({
    success: true,
    message: "Inquiry received.",
    inquiryId: inquiryId,
    notificationSent: notification.sent,
    notificationError: notification.error || ""
  });
}

function getInquirySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(INQUIRY_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(INQUIRY_SHEET_NAME);
  }

  ensureInquiryHeaders(sheet);
  sheet.setFrozenRows(1);
  return sheet;
}

function ensureInquiryHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, INQUIRY_HEADERS.length).setValues([INQUIRY_HEADERS]);
    return;
  }

  const currentLastColumn = Math.max(sheet.getLastColumn(), 1);
  const currentHeaders = sheet.getRange(1, 1, 1, currentLastColumn).getValues()[0];

  INQUIRY_HEADERS.forEach(function(header) {
    if (currentHeaders.indexOf(header) === -1) {
      const nextColumn = sheet.getLastColumn() + 1;
      sheet.getRange(1, nextColumn).setValue(header);
      currentHeaders.push(header);
    }
  });
}

function createInquiryId() {
  const datePart = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd");
  const randomPart = Utilities.getUuid().slice(0, 6).toUpperCase();
  return "INQ-" + datePart + "-" + randomPart;
}

function cleanInquiryValue(value, maxLength) {
  const text = String(value || "").trim();
  return text.slice(0, maxLength || 5000);
}

function sendInquiryNotification(data, inquiryId) {
  try {
    const remainingQuota = MailApp.getRemainingDailyQuota();
    if (remainingQuota < 1) {
      throw new Error("The Apps Script daily email quota has been reached.");
    }

    const fullName = (cleanInquiryValue(data.firstName, 80) + " " + cleanInquiryValue(data.lastName, 80)).trim();
    const senderEmail = cleanInquiryValue(data.email, 160);
    const subject = "New DesignLab Inquiry: " + cleanInquiryValue(data.service, 100) + " [" + inquiryId + "]";

    const plainBody = [
      "A new portfolio inquiry was submitted.",
      "",
      "Reference: " + inquiryId,
      "Name: " + fullName,
      "Email: " + senderEmail,
      "Contact number: " + cleanInquiryValue(data.contactNumber, 40),
      "Company / Brand: " + cleanInquiryValue(data.company, 140),
      "Service: " + cleanInquiryValue(data.service, 140),
      "Package / Project: " + cleanInquiryValue(data.package, 180),
      "Budget: " + cleanInquiryValue(data.budget, 80),
      "Timeline: " + cleanInquiryValue(data.timeline, 100),
      "Preferred contact: " + cleanInquiryValue(data.preferredContact, 80),
      "Referral source: " + cleanInquiryValue(data.referralSource, 100),
      "CTA source: " + cleanInquiryValue(data.source, 160),
      "Source page: " + cleanInquiryValue(data.sourcePage, 500),
      "Theme: " + cleanInquiryValue(data.theme, 30),
      "",
      "Project message:",
      cleanInquiryValue(data.message, 3000)
    ].join("\n");

    const htmlBody = buildInquiryEmailHtml(data, inquiryId, fullName);

    MailApp.sendEmail({
      to: INQUIRY_NOTIFICATION_EMAIL,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody,
      replyTo: senderEmail,
      name: "DesignLab Portfolio Inquiry"
    });

    return {
      sent: true,
      error: "",
      remainingQuota: Math.max(remainingQuota - 1, 0)
    };
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    console.error("Inquiry notification email failed: " + message);
    Logger.log("Inquiry notification email failed: " + message);
    return {
      sent: false,
      error: message,
      remainingQuota: null
    };
  }
}

function buildInquiryEmailHtml(data, inquiryId, fullName) {
  const rows = [
    ["Reference", inquiryId],
    ["Name", fullName],
    ["Email", cleanInquiryValue(data.email, 160)],
    ["Contact number", cleanInquiryValue(data.contactNumber, 40)],
    ["Company / Brand", cleanInquiryValue(data.company, 140)],
    ["Service", cleanInquiryValue(data.service, 140)],
    ["Package / Project", cleanInquiryValue(data.package, 180)],
    ["Budget", cleanInquiryValue(data.budget, 80)],
    ["Timeline", cleanInquiryValue(data.timeline, 100)],
    ["Preferred contact", cleanInquiryValue(data.preferredContact, 80)],
    ["Referral source", cleanInquiryValue(data.referralSource, 100)],
    ["CTA source", cleanInquiryValue(data.source, 160)],
    ["Source page", cleanInquiryValue(data.sourcePage, 500)],
    ["Theme", cleanInquiryValue(data.theme, 30)]
  ];

  const tableRows = rows.map(function(row) {
    return '<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;vertical-align:top;">' +
      escapeHtmlForEmail(row[0]) +
      '</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;vertical-align:top;">' +
      escapeHtmlForEmail(row[1] || "—") +
      '</td></tr>';
  }).join("");

  return '<div style="font-family:Arial,sans-serif;color:#172033;line-height:1.55;max-width:720px;margin:auto;">' +
    '<div style="background:#2d63d7;color:white;padding:22px 26px;border-radius:14px 14px 0 0;">' +
      '<div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;opacity:.85;">DesignLab Portfolio</div>' +
      '<h1 style="font-size:24px;margin:6px 0 0;">New Project Inquiry</h1>' +
    '</div>' +
    '<div style="border:1px solid #e5e7eb;border-top:0;padding:24px 26px;border-radius:0 0 14px 14px;">' +
      '<table style="width:100%;border-collapse:collapse;font-size:14px;">' + tableRows + '</table>' +
      '<h2 style="font-size:16px;margin:24px 0 8px;">Project message</h2>' +
      '<div style="padding:16px;background:#f7f9fc;border-radius:10px;white-space:pre-wrap;">' +
        escapeHtmlForEmail(cleanInquiryValue(data.message, 3000)) +
      '</div>' +
      '<p style="font-size:12px;color:#647086;margin-top:20px;">Reply directly to this email to contact the sender.</p>' +
    '</div>' +
  '</div>';
}

function escapeHtmlForEmail(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function updateInquiryNotificationStatus(sheet, rowNumber, notification) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const statusColumn = headers.indexOf("Notification Status") + 1;
  const errorColumn = headers.indexOf("Notification Error") + 1;

  if (statusColumn > 0) {
    sheet.getRange(rowNumber, statusColumn).setValue(notification.sent ? "Sent" : "Failed");
  }
  if (errorColumn > 0) {
    sheet.getRange(rowNumber, errorColumn).setValue(notification.error || "");
  }
}

/**
 * Run this function once from the Apps Script editor after replacing Code.gs.
 * Google will ask you to authorize the script to send email.
 */
function authorizeInquiryEmail() {
  const quota = MailApp.getRemainingDailyQuota();
  MailApp.sendEmail({
    to: INQUIRY_NOTIFICATION_EMAIL,
    subject: "DesignLab Inquiry Email Test",
    body: "The DesignLab portfolio inquiry email notification is connected successfully. Remaining daily quota before this test: " + quota,
    name: "DesignLab Portfolio Inquiry"
  });
  return "Test email sent to " + INQUIRY_NOTIFICATION_EMAIL + ". Remaining daily quota before sending: " + quota;
}

function testInquiryEmail() {
  return authorizeInquiryEmail();
}

function getProjects() {
  const sheet = getProjectSheet();
  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) return [];

  const header = values[0];
  const rows = values.slice(1);

  return rows
    .filter(row => getCell(row, header, "Status") === "Published")
    .map(row => {
      const title = getCell(row, header, "Title");
      const image = convertDriveUrl(getCell(row, header, "Image URL"));
      const galleryRaw = getCell(row, header, "Gallery Image URLs");

      return {
        createdAt: getCell(row, header, "Created At"),
        id: getCell(row, header, "ID") || createProjectId(title),
        title: title,
        category: getCell(row, header, "Category"),
        filterCategory: getCell(row, header, "Filter Category"),
        featured: getCell(row, header, "Featured"),
        image: image,
        galleryImages: parseGalleryImages(galleryRaw, image),
        skills: getCell(row, header, "Skills / Services Used"),
        description: getCell(row, header, "Description"),
        problem: getCell(row, header, "Problem / Goal"),
        solution: getCell(row, header, "What I Did"),
        outcome: getCell(row, header, "Result / Outcome"),
        link: getCell(row, header, "Project Link")
      };
    })
    .reverse();
}

function getProjectSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    return sheet;
  }

  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const existingHeaders = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];

  if (existingHeaders.indexOf("ID") === -1 || existingHeaders.indexOf("Filter Category") === -1 || existingHeaders.indexOf("Featured") === -1 || existingHeaders.indexOf("Gallery Image URLs") === -1 || existingHeaders.indexOf("Skills / Services Used") === -1 || existingHeaders.indexOf("Problem / Goal") === -1 || existingHeaders.indexOf("What I Did") === -1 || existingHeaders.indexOf("Result / Outcome") === -1) {
    sheet.clear();
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function getCell(row, header, name) {
  const index = header.indexOf(name);
  return index >= 0 ? row[index] : "";
}

function parseGalleryImages(value, fallbackImage) {
  if (!value) return fallbackImage ? [fallbackImage] : [];

  const images = String(value)
    .split(/\n|,/)
    .map(url => convertDriveUrl(url.trim()))
    .filter(Boolean);

  if (!images.length && fallbackImage) images.push(fallbackImage);

  return images;
}

function createProjectId(title) {
  const slug = String(title || "project")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const random = Utilities.getUuid().slice(0, 8);
  return slug + "-" + random;
}

function convertDriveUrl(url) {
  if (!url) return "";

  const match = String(url).match(/\/d\/([^/]+)/);
  if (match && match[1]) {
    return "https://drive.google.com/uc?export=view&id=" + match[1];
  }

  const idMatch = String(url).match(/[?&]id=([^&]+)/);
  if (idMatch && idMatch[1]) {
    return "https://drive.google.com/uc?export=view&id=" + idMatch[1];
  }

  return url;
}


function getVisitorSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Site Analytics");

  if (!sheet) {
    sheet = ss.insertSheet("Site Analytics");
    sheet.getRange("A1").setValue("Metric");
    sheet.getRange("B1").setValue("Value");
    sheet.getRange("A2").setValue("Total Visits");
    sheet.getRange("B2").setValue(0);
    sheet.getRange("A3").setValue("Last Visit");
    sheet.getRange("B3").setValue("");
  }

  return sheet;
}

function recordVisit() {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getVisitorSheet();
    const current = Number(sheet.getRange("B2").getValue()) || 0;
    const updated = current + 1;

    sheet.getRange("B2").setValue(updated);
    sheet.getRange("B3").setValue(new Date());

    return updated;
  } finally {
    lock.releaseLock();
  }
}

function getVisitCount() {
  const sheet = getVisitorSheet();
  return Number(sheet.getRange("B2").getValue()) || 0;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
