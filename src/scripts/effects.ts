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

/** Inclina ligeramente los elementos [data-tilt] siguiendo al cursor. Solo con puntero fino. */
export function initTilt() {
  if (reduceMotion.matches || !window.matchMedia("(pointer: fine)").matches) return;

  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
    });
    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}
