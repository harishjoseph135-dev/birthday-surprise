/** Lightweight canvas confetti + hearts. No dependencies. */

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  heart: boolean;
  life: number;
};

const COLORS = ["#f4c7cf", "#e11d48", "#7a0b25", "#e9c46a", "#fdf3e3", "#ff8fab", "#c9a227"];

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let pieces: Piece[] = [];
let raf = 0;

function ensureCanvas() {
  if (typeof document === "undefined") return null;
  if (canvas) return canvas;
  canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  const resize = () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);
  return canvas;
}

function drawHeart(c: CanvasRenderingContext2D, s: number) {
  c.beginPath();
  c.moveTo(0, s * 0.3);
  c.bezierCurveTo(0, 0, -s, 0, -s, s * 0.35);
  c.bezierCurveTo(-s, s * 0.8, 0, s * 1.1, 0, s * 1.4);
  c.bezierCurveTo(0, s * 1.1, s, s * 0.8, s, s * 0.35);
  c.bezierCurveTo(s, 0, 0, 0, 0, s * 0.3);
  c.fill();
}

function loop() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces = pieces.filter((p) => p.life > 0 && p.y < canvas!.height + 60);
  for (const p of pieces) {
    p.life -= 1;
    p.vy += 0.09;
    p.vx *= 0.995;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 60));
    ctx.fillStyle = p.color;
    if (p.heart) drawHeart(ctx, p.size * 0.55);
    else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  }
  if (pieces.length) raf = requestAnimationFrame(loop);
  else {
    cancelAnimationFrame(raf);
    raf = 0;
  }
}

export function celebrate(opts: { count?: number; origin?: { x: number; y: number }; power?: number } = {}) {
  const el = ensureCanvas();
  if (!el) return;
  const count = opts.count ?? 90;
  const power = opts.power ?? 9;
  const ox = opts.origin?.x ?? window.innerWidth / 2;
  const oy = opts.origin?.y ?? window.innerHeight / 2;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * power + power * 0.35;
    pieces.push({
      x: ox,
      y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: 6 + Math.random() * 10,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      heart: Math.random() < 0.35,
      life: 120 + Math.random() * 90,
    });
  }
  if (!raf) raf = requestAnimationFrame(loop);
}

export function celebrateBig() {
  celebrate({ count: 160, power: 13 });
  setTimeout(() => celebrate({ count: 120, origin: { x: window.innerWidth * 0.2, y: window.innerHeight * 0.5 }, power: 12 }), 250);
  setTimeout(() => celebrate({ count: 120, origin: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.5 }, power: 12 }), 500);
  setTimeout(() => celebrate({ count: 140, power: 14 }), 900);
}
