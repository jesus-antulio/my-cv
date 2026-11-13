import { site } from "../data/site";

type Theme = "light" | "dark";

const root = document.documentElement;

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* localStorage puede no estar disponible en modos estrictos del navegador. */
  }
}

function applyTheme(theme: Theme, toggle: HTMLElement | null) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", site.themeColor[theme]);
  toggle?.setAttribute("aria-pressed", String(theme === "dark"));
  document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

/** El tema inicial lo fija el script inline de Layout.astro; aquí solo se conecta el botón. */
export function initTheme() {
  const toggle = document.querySelector<HTMLElement>("#themeToggle");
  const current: Theme = getStoredTheme() ?? (root.dataset.theme === "dark" ? "dark" : "light");
  applyTheme(current, toggle);

  toggle?.addEventListener("click", () => {
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next, toggle);
    storeTheme(next);
  });
}
