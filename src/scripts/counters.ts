/** Anima de 0 a data-target los elementos .counter cuando entran en pantalla. */
export function initCounters() {
  const counters = document.querySelectorAll<HTMLElement>(".counter");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const run = (counter: HTMLElement) => {
    const target = Number(counter.dataset.target || 0);
    const suffix = counter.dataset.suffix || "";
    const duration = 900;
    const start = performance.now();

    if (reduceMotion) {
      counter.textContent = `${target}${suffix}`;
      return;
    }

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(run);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((counter) => observer.observe(counter));
}
