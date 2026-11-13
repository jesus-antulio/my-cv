const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/** Reemplaza los <i data-lucide> por SVG (Lucide se carga por CDN en Layout.astro). */
export function initIcons() {
  window.lucide?.createIcons({ attrs: { "stroke-width": 2 } });
}

/** Efecto de máquina de escribir sobre [data-typed], rotando las frases de data-phrases. */
export function initTyping() {
  const element = document.querySelector<HTMLElement>("[data-typed]");
  if (!element || reduceMotion.matches) return;

  let phrases: string[] = [];
  try {
    phrases = JSON.parse(element.dataset.phrases || "[]");
  } catch {
    return;
  }
  if (phrases.length === 0) return;

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = true;

  const step = () => {
    const phrase = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    element.textContent = phrase.slice(0, charIndex);

    let delay = deleting ? 28 : 62;
    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      delay = 2200;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    }

    window.setTimeout(step, delay);
  };

  window.setTimeout(step, 2400);
}

/** Halo verde que sigue al cursor. Solo con puntero fino (no táctil). */
export function initCursorGlow() {
  const glow = document.querySelector<HTMLElement>(".cursor-glow");
  if (!glow || reduceMotion.matches || !window.matchMedia("(pointer: fine)").matches) return;

  let x = 0;
  let y = 0;
  let queued = false;

  window.addEventListener(
    "pointermove",
    (event) => {
      x = event.clientX;
      y = event.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        glow.style.transform = `translate(${x}px, ${y}px)`;
        glow.classList.add("is-active");
      });
    },
    { passive: true },
  );

  document.documentElement.addEventListener("pointerleave", () => glow.classList.remove("is-active"));
}

/** "Dibuja" la línea del timeline conforme se hace scroll (variable CSS --progress). */
export function initTimelineProgress() {
  const timeline = document.querySelector<HTMLElement>(".timeline");
  if (!timeline || reduceMotion.matches) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = timeline.getBoundingClientRect();
    const progress = (window.innerHeight * 0.7 - rect.top) / rect.height;
    timeline.style.setProperty("--progress", String(Math.max(0, Math.min(progress, 1))));
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  window.addEventListener("resize", update);
  update();
}
