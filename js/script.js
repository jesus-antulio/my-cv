const root = document.documentElement;
const canvas = document.querySelector("#skillCanvas");
const ctx = canvas?.getContext("2d");
const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

let nodes = [];
let width = 0;
let height = 0;
let animationFrame = 0;

function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* Local storage can be unavailable in strict browser modes. */
  }
}

function getEffectiveTheme() {
  return root.dataset.theme || (systemDark.matches ? "dark" : "light");
}

function applyTheme(theme, shouldStore = true) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0b0d10" : "#f6f3ec");
  themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
  if (shouldStore) storeTheme(theme);
  if (canvas && ctx) startCanvas();
}

function initializeTheme() {
  const storedTheme = getStoredTheme();
  if (storedTheme === "light" || storedTheme === "dark") {
    applyTheme(storedTheme, false);
    return;
  }

  applyTheme(systemDark.matches ? "dark" : "light", false);
}

function closeMenu() {
  navLinks?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  const isOpen = navLinks?.classList.toggle("is-open");
  menuToggle?.setAttribute("aria-expanded", String(Boolean(isOpen)));
}

function readCanvasColors() {
  const styles = getComputedStyle(root);
  return [
    styles.getPropertyValue("--mesh-dot-a").trim() || "#e04f39",
    styles.getPropertyValue("--mesh-dot-b").trim() || "#087f8c",
    styles.getPropertyValue("--mesh-dot-c").trim() || "#d5a021",
    styles.getPropertyValue("--accent-4").trim() || "#5f4bb6",
  ];
}

function resizeCanvas() {
  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const colors = readCanvasColors();

  width = rect.width;
  height = rect.height;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const nodeCount = width < 420 ? 28 : 46;
  nodes = Array.from({ length: nodeCount }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    size: 2.4 + Math.random() * 4.8,
    color: colors[index % colors.length],
  }));
}

function draw() {
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);
  const meshLine = getComputedStyle(root).getPropertyValue("--mesh-line").trim() || "rgba(23, 23, 23, 0.16)";

  for (const node of nodes) {
    if (!reduceMotion.matches) {
      node.x += node.vx;
      node.y += node.vy;
    }

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;
  }

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);

      if (distance < 128) {
        ctx.strokeStyle = meshLine;
        ctx.globalAlpha = Math.max(0.05, 0.18 - distance / 900);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }

  for (const node of nodes) {
    ctx.fillStyle = node.color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!reduceMotion.matches) {
    animationFrame = requestAnimationFrame(draw);
  }
}

function startCanvas() {
  if (!canvas || !ctx) return;
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  draw();
}

function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  const runCounter = (counter) => {
    const target = Number(counter.dataset.target || 0);
    const suffix = counter.dataset.suffix || "";
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * eased)}${suffix}`;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(runCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

initializeTheme();
startCanvas();
animateCounters();

window.addEventListener("resize", startCanvas);

const handleSystemThemeChange = () => {
  if (!getStoredTheme()) applyTheme(systemDark.matches ? "dark" : "light", false);
};

if (systemDark.addEventListener) {
  systemDark.addEventListener("change", handleSystemThemeChange);
} else {
  systemDark.addListener(handleSystemThemeChange);
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = getEffectiveTheme() === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

menuToggle?.addEventListener("click", toggleMenu);

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "stroke-width": 2,
    },
  });
}
