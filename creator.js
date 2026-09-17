const SITE_VERSION = "4.0.0";

const yearElement = document.querySelector("#year");
const versionElement = document.querySelector("#siteVersion");
const lastEditElement = document.querySelector("#lastEdit");
const visitorCountElement = document.querySelector("#visitorCount");

if (yearElement) yearElement.textContent = new Date().getFullYear();
if (versionElement) versionElement.textContent = SITE_VERSION;

if (lastEditElement) {
  const lastModified = new Date(document.lastModified);
  lastEditElement.textContent = lastModified.toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

