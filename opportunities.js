const SITE_VERSION = "4.0.0";
const LAST_EDIT = "September 17, 2026";

document.querySelectorAll("#year").forEach((el) => (el.textContent = new Date().getFullYear()));
document.querySelectorAll("#siteVersion").forEach((el) => (el.textContent = SITE_VERSION));

const form = document.querySelector("#opportunityForm");
const submitButton = document.querySelector("#opportunitySubmit");
const statusNode = document.querySelector("#opportunityStatus");
const successNode = document.querySelector("#opportunitySuccess");
const messageBox = form?.querySelector('textarea[name="message"]');
const messageCount = document.querySelector("#opportunityMessageCount");

function updateCount(){ if(messageCount && messageBox) messageCount.textContent = String(messageBox.value.length); }
messageBox?.addEventListener("input", updateCount); updateCount();

function splitName(fullName){
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  if(parts.length <= 1) return {firstName: parts[0] || "Applicant", lastName: "Application"};
  return {firstName: parts.slice(0,-1).join(" "), lastName: parts.at(-1)};
}

async function postJson(payload){
  const response = await fetch(window.API_URL || API_URL, {method:"POST", body:JSON.stringify(payload)});
  return response.json();
}

async function submitOpportunity(event){
  event.preventDefault();
  if(!form?.reportValidity()) return;
  if(!(window.API_URL || (typeof API_URL !== "undefined" && API_URL))){ statusNode.textContent="Application service is not configured yet."; return; }

  const values = Object.fromEntries(new FormData(form).entries());
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";
  statusNode.textContent = "Submitting your application…";
  successNode.hidden = true;

  const payload = {
    action:"submitOpportunity",
    fullName: values.fullName,
    address: values.address,
    email: values.email,
    contactNumber: values.contactNumber,
    interest: values.interest,
    message: values.message,
    consent: values.consent ? "yes" : "",
    sourcePage: location.href
  };

  try{
    let data = await postJson(payload);

    // Current deployed Apps Script versions prior to v4 do not yet know
    // submitOpportunity. Fall back to the existing inquiry action so the
    // application still reaches jannjaravata@gmail.com immediately.
    if(!data.success && /invalid action/i.test(String(data.message || ""))){
      const name = splitName(values.fullName);
      const fallbackMessage = [
        "CLIENT ACQUISITION PARTNER APPLICATION",
        "",
        `Interest: ${values.interest}`,
        `Address / Location: ${values.address}`,
        `Applicant Email: ${values.email}`,
        `Contact Number: ${values.contactNumber}`,
        "",
        "Application message:",
        values.message
      ].join("\n");
      data = await postJson({
        action:"submitInquiry",
        firstName:name.firstName,
        lastName:name.lastName,
        email:values.email,
        contactNumber:values.contactNumber,
        company:`Applicant location: ${values.address}`,
        service:"Client Acquisition Partner Application",
        package:"Freelance Commission-Based Opportunity",
        budget:"25%–30% commission-based partnership",
        timeline:"Flexible / No fixed hours",
        preferredContact:"Email / Phone",
        message:fallbackMessage,
        referralSource:"DesignLab Opportunities page",
        source:"opportunities-page",
        sourcePage:location.href,
        theme:document.documentElement.dataset.theme || "light",
        consent:"yes",
        website:""
      });
    }

    if(!data.success) throw new Error(data.message || "Unable to send your application.");
    form.reset(); updateCount();
    successNode.hidden = false;
    statusNode.textContent = "";
    successNode.scrollIntoView({behavior:"smooth",block:"nearest"});
  }catch(error){
    console.error(error);
    statusNode.textContent = error.message || "Something went wrong. Please try again.";
  }finally{
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send application <span>↗</span>';
  }
}
form?.addEventListener("submit", submitOpportunity);
