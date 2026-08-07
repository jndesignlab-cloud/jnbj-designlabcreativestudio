const SITE_VERSION = "3.10.0";
const LAST_EDIT = "August 7, 2026";

document.querySelectorAll("#siteVersion").forEach((el) => el.textContent = SITE_VERSION);
document.querySelectorAll("#lastEdit").forEach((el) => el.textContent = LAST_EDIT);
document.querySelectorAll("#year").forEach((el) => el.textContent = new Date().getFullYear());

const downloadModal = document.getElementById("downloadModal");
const downloadOpenButtons = document.querySelectorAll("[data-download-open]");
const downloadCloseButtons = document.querySelectorAll("[data-download-close]");
let lastDownloadTrigger = null;

function openDownloadModal(trigger) {
  if (!downloadModal) return;
  lastDownloadTrigger = trigger || document.activeElement;
  downloadModal.classList.add("is-open");
  downloadModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("download-modal-open");
  window.setTimeout(() => downloadModal.querySelector(".download-dialog-close")?.focus(), 20);
}

function closeDownloadModal() {
  if (!downloadModal) return;
  downloadModal.classList.remove("is-open");
  downloadModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("download-modal-open");
  lastDownloadTrigger?.focus();
}

downloadOpenButtons.forEach((button) => {
  button.addEventListener("click", () => openDownloadModal(button));
});

downloadCloseButtons.forEach((button) => {
  button.addEventListener("click", closeDownloadModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && downloadModal?.classList.contains("is-open")) {
    closeDownloadModal();
  }
});

document.querySelector("[data-download-copy]")?.addEventListener("click", () => {
  closeDownloadModal();
});
