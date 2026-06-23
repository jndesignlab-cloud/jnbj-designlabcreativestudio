const SITE_VERSION = "2.6.0";
const LAST_EDIT = "June 23, 2026";

const inquiryForm = document.querySelector("#inquiryForm");
const submitButton = document.querySelector("#inquirySubmit");
const inquiryStatus = document.querySelector("#inquiryStatus");
const successPanel = document.querySelector("#inquirySuccess");
const formIntro = document.querySelector("#contactFormIntro");
const referenceElement = document.querySelector("#inquiryReference");
const messageField = inquiryForm?.querySelector('textarea[name="message"]');
const messageCount = document.querySelector("#messageCount");

function setFooterMeta() {
  document.querySelector("#year").textContent = new Date().getFullYear();
  document.querySelector("#siteVersion").textContent = SITE_VERSION;
  document.querySelector("#lastEdit").textContent = LAST_EDIT;
}

function applyInquiryContext() {
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service") || "";
  const packageName = params.get("package") || "";
  const source = params.get("source") || "contact-page";

  const serviceField = document.querySelector("#serviceInterest");
  const packageField = document.querySelector("#packageInterest");
  const sourceField = document.querySelector("#inquirySource");
  const sourcePageField = document.querySelector("#inquirySourcePage");
  const themeField = document.querySelector("#inquiryTheme");

  if (service && [...serviceField.options].some((option) => option.value === service)) {
    serviceField.value = service;
  }
  if (packageName) packageField.value = packageName;
  sourceField.value = source;
  sourcePageField.value = document.referrer || window.location.href;
  themeField.value = document.documentElement.dataset.theme || "dark";
}

function updateMessageCount() {
  if (messageCount && messageField) messageCount.textContent = messageField.value.length;
}

function validateForm() {
  if (!inquiryForm.checkValidity()) {
    inquiryForm.reportValidity();
    return false;
  }
  return true;
}

async function submitInquiry(event) {
  event.preventDefault();

  if (!validateForm()) return;
  if (!API_URL || API_URL.includes("PASTE_YOUR")) {
    inquiryStatus.textContent = "The inquiry form is not connected yet. Please check config.js.";
    return;
  }

  const payload = Object.fromEntries(new FormData(inquiryForm).entries());
  payload.action = "submitInquiry";
  payload.theme = document.documentElement.dataset.theme || payload.theme || "dark";
  payload.sourcePage = payload.sourcePage || document.referrer || window.location.href;

  submitButton.disabled = true;
  submitButton.textContent = "Sending inquiry...";
  inquiryStatus.textContent = "Please wait while your inquiry is submitted.";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!data.success) throw new Error(data.message || "Unable to send your inquiry.");

    inquiryForm.hidden = true;
    formIntro.hidden = true;
    successPanel.hidden = false;
    referenceElement.textContent = data.inquiryId || "Submitted";
    successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    console.error(error);
    inquiryStatus.textContent = error.message || "Something went wrong. Please try again.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Project Inquiry ↗";
  }
}

messageField?.addEventListener("input", updateMessageCount);
inquiryForm?.addEventListener("submit", submitInquiry);

setFooterMeta();
applyInquiryContext();
updateMessageCount();
