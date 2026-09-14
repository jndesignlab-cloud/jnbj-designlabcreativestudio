(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = [...document.querySelectorAll(".agency-reveal, .reveal-up")];

  document.documentElement.classList.add("motion-soft");

  // Hero should never wait on an observer.
  document.querySelector(".dl-hero-panel")?.classList.add("is-visible");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.06,
    rootMargin: "0px 0px -4% 0px"
  });

  targets.forEach((target) => {
    if (!target.classList.contains("is-visible")) observer.observe(target);
  });
})();
