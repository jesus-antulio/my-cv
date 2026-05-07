const root = document.documentElement;
const canvas = document.querySelector("#skillCanvas");
const ctx = canvas?.getContext("2d");
const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const secondaryExperienceOpen = document.querySelector("#secondaryExperienceOpen");
const secondaryExperienceClose = document.querySelector("#secondaryExperienceClose");
const secondaryExperienceModal = document.querySelector("#secondaryExperienceModal");
const projectCards = document.querySelectorAll("[data-project-card]");
const projectModal = document.querySelector("#projectModal");
const projectModalClose = document.querySelector("#projectModalClose");
const projectModalEyebrow = document.querySelector("#projectModalEyebrow");
const projectModalTitle = document.querySelector("#projectModalTitle");
const projectModalDescription = document.querySelector("#projectModalDescription");
const projectModalDetails = document.querySelector("#projectModalDetails");
const projectModalTags = document.querySelector("#projectModalTags");
const projectModalImageButton = document.querySelector("#projectModalImageButton");
const projectModalImage = document.querySelector("#projectModalImage");
const imageModal = document.querySelector("#imageModal");
const imageModalClose = document.querySelector("#imageModalClose");
const imageModalTitle = document.querySelector("#imageModalTitle");
const imageModalImage = document.querySelector("#imageModalImage");
const imagePrev = document.querySelector("#imagePrev");
const imageNext = document.querySelector("#imageNext");
const imageCounter = document.querySelector("#imageCounter");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

let nodes = [];
let width = 0;
let height = 0;
let animationFrame = 0;
let activeProjectId = null;
let activeImageIndex = 0;

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

function syncBodyLock() {
  document.body.style.overflow = document.querySelector("dialog[open]") ? "hidden" : "";
}

function showDialog(dialog) {
  if (!dialog) return;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }

  syncBodyLock();
}

function openSecondaryExperience() {
  if (!secondaryExperienceModal) return;

  showDialog(secondaryExperienceModal);
}

function closeSecondaryExperience() {
  if (!secondaryExperienceModal?.open) return;

  secondaryExperienceModal.close();
  syncBodyLock();
  secondaryExperienceOpen?.focus();
}

function getProject(projectId) {
  return projectData[projectId] || null;
}

function renderCardGallery(card, nextIndex) {
  const project = getProject(card.dataset.projectCard);
  const image = card.querySelector(".project-image-trigger img");
  const dots = card.querySelector(".gallery-dots");
  if (!project || !image || !dots) return;

  const safeIndex = (nextIndex + project.images.length) % project.images.length;
  card.dataset.activeImage = String(safeIndex);
  image.src = project.images[safeIndex].src;
  image.alt = project.images[safeIndex].alt;
  dots.innerHTML = project.images
    .map((_, index) => `<span class="${index === safeIndex ? "is-active" : ""}"></span>`)
    .join("");
}

function openProject(projectId) {
  const project = getProject(projectId);
  if (!project || !projectModal) return;

  activeProjectId = projectId;
  activeImageIndex = 0;
  projectModalEyebrow.textContent = project.eyebrow;
  projectModalTitle.textContent = project.title;
  projectModalDescription.textContent = project.description;
  projectModalImage.src = project.images[activeImageIndex].src;
  projectModalImage.alt = project.images[activeImageIndex].alt;
  projectModalDetails.innerHTML = project.details
    .map(([label, value]) => `<div><strong>${label}</strong><span>${value}</span></div>`)
    .join("");
  projectModalTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");

  showDialog(projectModal);
}

function closeProject() {
  if (!projectModal?.open) return;

  projectModal.close();
  syncBodyLock();
  document.querySelector(`[data-project-card="${activeProjectId}"]`)?.focus();
}

function renderImageModal() {
  const project = getProject(activeProjectId);
  if (!project || !imageModalImage || !imageCounter) return;

  const image = project.images[activeImageIndex];
  imageModalTitle.textContent = project.title;
  imageModalImage.src = image.src;
  imageModalImage.alt = image.alt;
  imageCounter.textContent = `${activeImageIndex + 1} / ${project.images.length}`;
}

function openImageGallery(projectId, imageIndex = 0) {
  const project = getProject(projectId);
  if (!project || !imageModal) return;

  activeProjectId = projectId;
  activeImageIndex = (imageIndex + project.images.length) % project.images.length;
  renderImageModal();
  showDialog(imageModal);
}

function closeImageGallery() {
  if (!imageModal?.open) return;

  imageModal.close();
  syncBodyLock();
}

function moveActiveImage(direction) {
  const project = getProject(activeProjectId);
  if (!project) return;

  activeImageIndex = (activeImageIndex + direction + project.images.length) % project.images.length;
  renderImageModal();
}

function initializeProjectCards() {
  projectCards.forEach((card) => {
    renderCardGallery(card, 0);

    card.querySelector(".gallery-control-prev")?.addEventListener("click", (event) => {
      event.stopPropagation();
      renderCardGallery(card, Number(card.dataset.activeImage || 0) - 1);
    });

    card.querySelector(".gallery-control-next")?.addEventListener("click", (event) => {
      event.stopPropagation();
      renderCardGallery(card, Number(card.dataset.activeImage || 0) + 1);
    });

    card.querySelector(".project-image-trigger")?.addEventListener("click", (event) => {
      event.stopPropagation();
      openImageGallery(card.dataset.projectCard, Number(card.dataset.activeImage || 0));
    });

    card.addEventListener("click", () => openProject(card.dataset.projectCard));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(card.dataset.projectCard);
      }
    });
  });
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
initializeProjectCards();

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

secondaryExperienceOpen?.addEventListener("click", openSecondaryExperience);
secondaryExperienceClose?.addEventListener("click", closeSecondaryExperience);
projectModalClose?.addEventListener("click", closeProject);
imageModalClose?.addEventListener("click", closeImageGallery);
projectModalImageButton?.addEventListener("click", () => openImageGallery(activeProjectId, activeImageIndex));
imagePrev?.addEventListener("click", () => moveActiveImage(-1));
imageNext?.addEventListener("click", () => moveActiveImage(1));

secondaryExperienceModal?.addEventListener("click", (event) => {
  if (event.target === secondaryExperienceModal) closeSecondaryExperience();
});

secondaryExperienceModal?.addEventListener("close", () => {
  syncBodyLock();
});

projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProject();
});

projectModal?.addEventListener("close", () => {
  syncBodyLock();
});

imageModal?.addEventListener("click", (event) => {
  if (event.target === imageModal) closeImageGallery();
});

imageModal?.addEventListener("close", () => {
  syncBodyLock();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
  if (!imageModal?.open) return;
  if (event.key === "ArrowLeft") moveActiveImage(-1);
  if (event.key === "ArrowRight") moveActiveImage(1);
});

if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "stroke-width": 2,
    },
  });
}
