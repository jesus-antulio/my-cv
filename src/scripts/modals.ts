const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const closeDuration = 220;
const closeTimers = new WeakMap<HTMLDialogElement, number>();

function syncBodyLock() {
  document.body.style.overflow = document.querySelector("dialog[open]") ? "hidden" : "";
}

function clearCloseState(dialog: HTMLDialogElement) {
  const timer = closeTimers.get(dialog);
  if (timer) {
    window.clearTimeout(timer);
    closeTimers.delete(dialog);
  }
  dialog.dataset.closing = "false";
}

export function showDialog(dialog: HTMLDialogElement | null) {
  if (!dialog) return;

  clearCloseState(dialog);
  if (typeof dialog.showModal === "function") {
    if (!dialog.open) dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
  syncBodyLock();
}

export function closeDialog(dialog: HTMLDialogElement | null, onClosed?: () => void) {
  if (!dialog?.open || dialog.dataset.closing === "true") return;

  dialog.dataset.closing = "true";

  const finish = () => {
    dialog.close();
    clearCloseState(dialog);
    syncBodyLock();
    onClosed?.();
  };

  if (reduceMotion.matches) {
    finish();
    return;
  }

  closeTimers.set(dialog, window.setTimeout(finish, closeDuration));
}

/** Cierre con clic en el fondo, Esc y botón de cerrar, siempre con animación. */
export function wireDialog(dialog: HTMLDialogElement | null, closeButton: Element | null, close: () => void) {
  if (!dialog) return;

  closeButton?.addEventListener("click", close);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });

  dialog.addEventListener("close", () => {
    clearCloseState(dialog);
    syncBodyLock();
  });
}
