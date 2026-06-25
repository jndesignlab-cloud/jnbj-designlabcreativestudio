(() => {
  const root = document.documentElement;

  function applyPortfolioTheme() {
    root.dataset.theme = "blue";
    try { localStorage.removeItem("designlab-theme"); } catch (error) {}

    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      const active = button.dataset.themeChoice === "blue";
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyPortfolioTheme);
  } else {
    applyPortfolioTheme();
  }
})();
