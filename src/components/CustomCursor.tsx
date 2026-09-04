import { useEffect, useRef } from "react";

interface Trail {
  x: number;
  y: number;
  alpha: number;
}

/** Subtle sparkle trail cursor — desktop only. */
export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailRef = useRef<Trail[]>([]);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9998";
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      trailRef.current.push({ x: e.clientX, y: e.clientY, alpha: 0.8 });
      if (trailRef.current.length > 18) trailRef.current.shift();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const ctx = canvas.getContext("2d")!;
    const SPARKLE_CHARS = ["✦", "·", "✧", "⋆"];

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < trailRef.current.length; i++) {
        const t = trailRef.current[i]!;
        const progress = i / trailRef.current.length;
        const size = 4 + progress * 8;
        ctx.globalAlpha = t.alpha * progress * 0.5;
        ctx.fillStyle = progress > 0.6 ? "oklch(0.82 0.12 85)" : "oklch(0.85 0.07 8)";
        ctx.font = `${size}px serif`;
        ctx.fillText(SPARKLE_CHARS[i % SPARKLE_CHARS.length]!, t.x - size / 2, t.y + size / 2);
        t.alpha *= 0.88;
      }
      trailRef.current = trailRef.current.filter((t) => t.alpha > 0.02);

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  return null;
}
