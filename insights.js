const SITE_VERSION = "3.6.1";
document.querySelectorAll("#year").forEach((el) => el.textContent = new Date().getFullYear());
document.querySelectorAll("#siteVersion").forEach((el) => el.textContent = SITE_VERSION);
