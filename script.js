const canvas = document.querySelector("#skillCanvas");
const ctx = canvas.getContext("2d");
const colors = ["#06b6d4", "#fb7185", "#a3e635", "#8b5cf6", "#0f172a"];

let nodes = [];
let width = 0;
let height = 0;
let animationFrame = 0;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const nodeCount = width < 420 ? 28 : 42;
  nodes = Array.from({ length: nodeCount }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    size: 2.5 + Math.random() * 4,
    color: colors[index % colors.length],
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  const meshLine = getComputedStyle(document.documentElement).getPropertyValue("--mesh-line").trim() || "rgba(15, 23, 42, 0.12)";

  for (const node of nodes) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;
  }

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);

      if (distance < 118) {
        ctx.strokeStyle = meshLine;
        ctx.globalAlpha = Math.max(0.04, 0.13 - distance / 1100);
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

  animationFrame = requestAnimationFrame(draw);
}

function startCanvas() {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  draw();
}

window.addEventListener("resize", startCanvas);
startCanvas();

if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "stroke-width": 2.2,
    },
  });
}
