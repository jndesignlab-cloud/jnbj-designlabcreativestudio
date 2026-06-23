(() => {
  const STORAGE_KEY = "designlab-theme";
  const THEMES = ["dark", "blue", "light"];
  const root = document.documentElement;

  function getTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return THEMES.includes(saved) ? saved : "dark";
  }

  function setTheme(theme) {
    const selected = THEMES.includes(theme) ? theme : "dark";
    root.dataset.theme = selected;
    localStorage.setItem(STORAGE_KEY, selected);

    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      const active = button.dataset.themeChoice === selected;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function initializeThemeControls() {
    setTheme(getTheme());

    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        setTheme(button.dataset.themeChoice);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeThemeControls);
  } else {
    initializeThemeControls();
  }
})();
