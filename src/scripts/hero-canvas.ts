interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  colorIndex: number;
}

const LINK_DISTANCE = 130;

/** Red de nodos animada del hero. Toma los colores de las variables --mesh-*. */
export function initHeroCanvas() {
  const canvas = document.querySelector<HTMLCanvasElement>("#skillCanvas");
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let nodes: Node[] = [];
  let colors: string[] = [];
  let lineColor = "";
  let width = 0;
  let height = 0;
  let frame = 0;
  let visible = true;

  function readColors() {
    const styles = getComputedStyle(root);
    const read = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
    colors = [read("--mesh-dot-a", "#00e676"), read("--mesh-dot-b", "#22c55e"), read("--mesh-dot-c", "#a3e635")];
    lineColor = read("--mesh-line", "rgba(0, 230, 118, 0.5)");
  }

  function resize() {
    const rect = canvas!.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    width = rect.width;
    height = rect.height;
    canvas!.width = width * ratio;
    canvas!.height = height * ratio;
    ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.max(24, Math.min(80, Math.round((width * height) / 16000)));
    nodes = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 1.2 + Math.random() * 2.2,
      colorIndex: index % 3,
    }));
  }

  function draw() {
    ctx!.clearRect(0, 0, width, height);

    if (!reduceMotion.matches) {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
    }

    ctx!.strokeStyle = lineColor;
    ctx!.lineWidth = 1;
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance >= LINK_DISTANCE) continue;

        ctx!.globalAlpha = 0.45 * (1 - distance / LINK_DISTANCE);
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }
    }

    ctx!.globalAlpha = 0.9;
    for (const node of nodes) {
      ctx!.fillStyle = colors[node.colorIndex];
      ctx!.beginPath();
      ctx!.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx!.fill();
    }
    ctx!.globalAlpha = 1;

    if (!reduceMotion.matches && visible) frame = requestAnimationFrame(draw);
  }

  function start() {
    cancelAnimationFrame(frame);
    draw();
  }

  readColors();
  resize();
  start();

  // En móvil el alto cambia al ocultarse la barra del navegador: solo se regenera si cambia el ancho.
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    resize();
    start();
  });

  document.addEventListener("themechange", () => {
    readColors();
    start();
  });

  // No gastar CPU cuando el hero no está en pantalla.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    }).observe(canvas);
  }
}
