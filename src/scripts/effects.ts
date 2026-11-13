const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/** Reemplaza los <i data-lucide> por SVG (Lucide se carga por CDN en Layout.astro). */
export function initIcons() {
  window.lucide?.createIcons();
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
