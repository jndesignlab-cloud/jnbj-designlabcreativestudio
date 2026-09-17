<<<<<<< HEAD
const SITE_VERSION = "4.0.0";
=======
const SITE_VERSION = "3.16.41";
>>>>>>> 7f39293e2f5678adeb0e99f8ea9505061eeddde1
document.querySelectorAll("#year").forEach((el) => el.textContent = new Date().getFullYear());
document.querySelectorAll("#siteVersion").forEach((el) => el.textContent = SITE_VERSION);
