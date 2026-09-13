(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("motion-enabled");

  function init() {
    const targets = [
      ...document.querySelectorAll(".agency-reveal"),
      ...document.querySelectorAll(".reveal-up")
    ];

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      document.querySelectorAll(".agency-stagger").forEach((child) => child.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll(".agency-stagger").forEach((child) => child.classList.add("is-visible"));
        obs.unobserve(entry.target);
      });
    }, {
      threshold: .08,
      rootMargin: "0px 0px -6% 0px"
    });

    targets.forEach((target) => observer.observe(target));

    const mutation = new MutationObserver(() => {
      document.querySelectorAll(".agency-reveal.is-visible .agency-stagger").forEach((child) => {
        child.classList.add("is-visible");
      });
    });

    const main = document.querySelector("main");
    if (main) mutation.observe(main, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();