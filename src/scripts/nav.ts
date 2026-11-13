/** Menú móvil, barra de progreso de scroll y resaltado de la sección activa. */
export function initNav() {
  const header = document.querySelector<HTMLElement>(".site-header");
  const menuToggle = document.querySelector<HTMLElement>("#menuToggle");
  const navLinks = document.querySelector<HTMLElement>("#navLinks");
  const progress = document.querySelector<HTMLElement>("#scrollProgress");
  const links = [...(navLinks?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];

  const closeMenu = () => {
    navLinks?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  links.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // Progreso de scroll + sombra del header
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    progress?.style.setProperty("scale", `${ratio} 1`);
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
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
  update();

  // Sección activa
  if (!("IntersectionObserver" in window)) return;

  const byId = new Map(links.map((link) => [link.getAttribute("href")?.slice(1), link]));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.removeAttribute("aria-current"));
        byId.get(entry.target.id)?.setAttribute("aria-current", "true");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  document.querySelectorAll<HTMLElement>("main section[id]").forEach((section) => observer.observe(section));
}
