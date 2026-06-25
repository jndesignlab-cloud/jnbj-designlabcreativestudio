const SITE_VERSION = "3.2.7";

const yearNode = document.getElementById("year");
const versionNode = document.getElementById("siteVersion");
const printButton = document.getElementById("printCvButton");

if (yearNode) yearNode.textContent = new Date().getFullYear();
if (versionNode) versionNode.textContent = SITE_VERSION;
if (printButton) printButton.addEventListener("click", () => window.print());
