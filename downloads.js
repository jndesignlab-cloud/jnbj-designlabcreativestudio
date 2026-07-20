const SITE_VERSION = "3.8.0";
const LAST_EDIT = "July 20, 2026";
document.querySelectorAll("#siteVersion").forEach((el) => el.textContent = SITE_VERSION);
document.querySelectorAll("#lastEdit").forEach((el) => el.textContent = LAST_EDIT);
document.querySelectorAll("#year").forEach((el) => el.textContent = new Date().getFullYear());
