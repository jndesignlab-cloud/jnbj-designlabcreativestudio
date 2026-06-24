(() => {
  const STORAGE_KEY = "designlab-theme";
  const THEMES = ["dark", "blue", "light"];
  const root = document.documentElement;

  function readStoredTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return THEMES.includes(saved) ? saved : "blue";
    } catch (error) {
      return "blue";
    }
  }

  function persistTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* Theme still works for this visit when storage is unavailable. */
    }
  }

  function setTheme(theme) {
    const selected = THEMES.includes(theme) ? theme : "blue";
    root.dataset.theme = selected;
    persistTheme(selected);

    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      const active = button.dataset.themeChoice === selected;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function initializeThemeControls() {
    setTheme(readStoredTheme());

    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.addEventListener("click", () => setTheme(button.dataset.themeChoice));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeThemeControls);
  } else {
    initializeThemeControls();
  }
})();
