import { projectData, type Project } from "../data/projects";
import { closeDialog, showDialog, wireDialog } from "./modals";

let activeProjectId: string | null = null;
let activeImageIndex = 0;

const getProject = (id: string | null | undefined): Project | null => (id && projectData[id]) || null;

const imageAlt = (project: Project, index: number) =>
  project.images[index].alt ?? `${project.title}: captura ${index + 1}`;

const wrap = (index: number, length: number) => ((index % length) + length) % length;

export function initProjectGallery() {
  const $ = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector);

  const projectModal = $<HTMLDialogElement>("#projectModal");
  const projectModalEyebrow = $("#projectModalEyebrow");
  const projectModalTitle = $("#projectModalTitle");
  const projectModalDescription = $("#projectModalDescription");
  const projectModalDetails = $("#projectModalDetails");
  const projectModalTags = $("#projectModalTags");
  const projectModalImage = $<HTMLImageElement>("#projectModalImage");
  const imageModal = $<HTMLDialogElement>("#imageModal");
  const imageModalTitle = $("#imageModalTitle");
  const imageModalImage = $<HTMLImageElement>("#imageModalImage");
  const imageCounter = $("#imageCounter");

  function renderCardGallery(card: HTMLElement, nextIndex: number) {
    const project = getProject(card.dataset.projectCard);
    const image = card.querySelector<HTMLImageElement>(".project-image-trigger img");
    const dots = card.querySelector(".gallery-dots");
    if (!project || !image || !dots) return;

    const index = wrap(nextIndex, project.images.length);
    card.dataset.activeImage = String(index);
    image.src = project.images[index].src;
    image.alt = imageAlt(project, index);
    dots.replaceChildren(
      ...project.images.map((_, i) => {
        const dot = document.createElement("span");
        if (i === index) dot.className = "is-active";
        return dot;
      }),
    );
  }

  function openProject(projectId: string | undefined) {
    const project = getProject(projectId);
    if (!project || !projectId || !projectModal) return;

    activeProjectId = projectId;
    activeImageIndex = 0;
    if (projectModalEyebrow) projectModalEyebrow.textContent = project.eyebrow;
    if (projectModalTitle) projectModalTitle.textContent = project.title;
    if (projectModalDescription) projectModalDescription.textContent = project.description;
    if (projectModalImage) {
      projectModalImage.src = project.images[0].src;
      projectModalImage.alt = imageAlt(project, 0);
    }

    projectModalDetails?.replaceChildren(
      ...project.details.map(([label, value]) => {
        const row = document.createElement("div");
        const strong = document.createElement("strong");
        const span = document.createElement("span");
        strong.textContent = label;
        span.textContent = value;
        row.append(strong, span);
        return row;
      }),
    );

    projectModalTags?.replaceChildren(
      ...project.tags.map((tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        return span;
      }),
    );

    showDialog(projectModal);
  }

  function closeProject() {
    closeDialog(projectModal, () => {
      document.querySelector<HTMLElement>(`[data-project-card="${activeProjectId}"]`)?.focus();
    });
  }

  function renderImageModal() {
    const project = getProject(activeProjectId);
    if (!project || !imageModalImage || !imageCounter) return;

    if (imageModalTitle) imageModalTitle.textContent = project.title;
    imageModalImage.src = project.images[activeImageIndex].src;
    imageModalImage.alt = imageAlt(project, activeImageIndex);
    imageCounter.textContent = `${activeImageIndex + 1} / ${project.images.length}`;
  }

  function openImageGallery(projectId: string | null | undefined, imageIndex = 0) {
    const project = getProject(projectId);
    if (!project || !projectId || !imageModal) return;

    activeProjectId = projectId;
    activeImageIndex = wrap(imageIndex, project.images.length);
    renderImageModal();
    showDialog(imageModal);
  }

  function moveActiveImage(direction: number) {
    const project = getProject(activeProjectId);
    if (!project) return;

    activeImageIndex = wrap(activeImageIndex + direction, project.images.length);
    renderImageModal();
  }

  document.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card) => {
    const activeIndex = () => Number(card.dataset.activeImage || 0);
    renderCardGallery(card, 0);

    card.querySelector(".gallery-control-prev")?.addEventListener("click", (event) => {
      event.stopPropagation();
      renderCardGallery(card, activeIndex() - 1);
    });

    card.querySelector(".gallery-control-next")?.addEventListener("click", (event) => {
      event.stopPropagation();
      renderCardGallery(card, activeIndex() + 1);
    });

    card.querySelector(".project-image-trigger")?.addEventListener("click", (event) => {
      event.stopPropagation();
      openImageGallery(card.dataset.projectCard, activeIndex());
    });

    card.addEventListener("click", () => openProject(card.dataset.projectCard));
    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(card.dataset.projectCard);
      }
    });
  });

  wireDialog(projectModal, $("#projectModalClose"), closeProject);
  wireDialog(imageModal, $("#imageModalClose"), () => closeDialog(imageModal));

  $("#projectModalImageButton")?.addEventListener("click", () => openImageGallery(activeProjectId, activeImageIndex));
  $("#imagePrev")?.addEventListener("click", () => moveActiveImage(-1));
  $("#imageNext")?.addEventListener("click", () => moveActiveImage(1));

  document.addEventListener("keydown", (event) => {
    if (!imageModal?.open) return;
    if (event.key === "ArrowLeft") moveActiveImage(-1);
    if (event.key === "ArrowRight") moveActiveImage(1);
  });
}
