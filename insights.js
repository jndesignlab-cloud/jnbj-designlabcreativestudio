const SITE_VERSION = "2.8.0";
document.querySelectorAll("#year").forEach((el) => el.textContent = new Date().getFullYear());
document.querySelectorAll("#siteVersion").forEach((el) => el.textContent = SITE_VERSION);
