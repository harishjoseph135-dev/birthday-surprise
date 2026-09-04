import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/* ─────────────────────────────────────────────
   BloomingRose — self-contained canvas + CSS
   animation injected once into a <style> tag.
   All drawing is pure JS Canvas 2D API.
───────────────────────────────────────────── */

export function BloomingRose({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const [message, setMessage] = useState<string | null>(null);
  const [bloomed, setBloomed] = useState(false);
  const bloomedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    /* ── Resize ── */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Time ── */
    const start = performance.now();
    const TOTAL = 6000; // full bloom in 6 s

    /* ── Particles ── */
    const SPARKS = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      speed: 0.00003 + Math.random() * 0.00006,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.3 + Math.random() * 0.7,
    }));

    /* ── Helpers ── */
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease-in-out quad
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
    const prog = (elapsed: number, from: number, to: number) =>
      clamp((elapsed - from) / (to - from), 0, 1);

    /* ── Stem ── */
    function drawStem(cx: number, baseY: number, tipY: number, p: number) {
      const currentTip = lerp(baseY, tipY, easeOut(p));
      ctx.save();
      // Stem glow
      ctx.shadowColor = "rgba(80,180,60,0.35)";
      ctx.shadowBlur = 12;
      // Main stem
      const grad = ctx.createLinearGradient(cx - 4, baseY, cx + 4, currentTip);
      grad.addColorStop(0, "#1a5c0a");
      grad.addColorStop(0.5, "#2d8c14");
      grad.addColorStop(1, "#3dac1e");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      // Slight natural curve
      ctx.moveTo(cx, baseY);
      ctx.bezierCurveTo(
        cx - 18, lerp(baseY, currentTip, 0.3),
        cx + 14, lerp(baseY, currentTip, 0.6),
        cx, currentTip
      );
      ctx.stroke();
      ctx.restore();
    }

    /* ── Leaf ── */
    function drawLeaf(
      cx: number, cy: number,
      angle: number, size: number, p: number
    ) {
      if (p <= 0) return;
      const s = easeOut(p) * size;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.shadowColor = "rgba(60,160,40,0.4)";
      ctx.shadowBlur = 8;
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
      g.addColorStop(0, "#4ecc2a");
      g.addColorStop(0.5, "#39a81f");
      g.addColorStop(1, "#1a5c0a");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 0.5, -s * 0.25, s * 1.1, s * 0.1, s, 0);
      ctx.bezierCurveTo(s * 1.1, s * 0.15, s * 0.5, s * 0.35, 0, 0);
      ctx.fill();
      // Mid-vein
      ctx.strokeStyle = "rgba(30,90,10,0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(s * 0.85, 0);
      ctx.stroke();
      ctx.restore();
    }

    /* ── Single petal ── */
    function drawPetal(
      cx: number, cy: number,
      angle: number,
      radiusX: number, radiusY: number,
      colorInner: string, colorOuter: string,
      p: number, zRot = 0
    ) {
      if (p <= 0) return;
      const ep = easeOut(p);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.scale(ep, ep);
      // 3-D tilt via skew
      ctx.transform(1, 0, Math.sin(zRot) * 0.3, 1 + Math.cos(zRot) * 0.08, 0, 0);

      const g = ctx.createRadialGradient(0, -radiusY * 0.2, 2, 0, 0, radiusY);
      g.addColorStop(0, colorInner);
      g.addColorStop(0.6, colorOuter);
      g.addColorStop(1, "rgba(80,0,20,0.6)");
      ctx.fillStyle = g;
      ctx.shadowColor = "rgba(180,0,40,0.35)";
      ctx.shadowBlur = 14;

      ctx.beginPath();
      ctx.ellipse(0, -radiusY * 0.5, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.fill();

      // Highlight
      const hi = ctx.createRadialGradient(
        -radiusX * 0.2, -radiusY * 0.7, 0,
        -radiusX * 0.2, -radiusY * 0.7, radiusX * 0.6
      );
      hi.addColorStop(0, "rgba(255,200,200,0.22)");
      hi.addColorStop(1, "rgba(255,200,200,0)");
      ctx.fillStyle = hi;
      ctx.beginPath();
      ctx.ellipse(0, -radiusY * 0.5, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    /* ── Full rose at progress p (0→1) ── */
    function drawRose(cx: number, cy: number, p: number, t: number) {
      const BASE_R = Math.min(canvas.width, canvas.height) * 0.18;

      // --- Outer petals (5) --- appear 0.25→0.55
      const op = prog(p, 0.25, 0.55);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        drawPetal(
          cx, cy,
          a,
          BASE_R * 0.55, BASE_R * 1.05,
          "#c2185b", "#880e38",
          clamp(op * 5 - i * 0.7, 0, 1),
          Math.sin(t * 0.0003 + i) * 0.15
        );
      }

      // --- Mid petals (5) --- appear 0.45→0.72
      const mp = prog(p, 0.45, 0.72);
      for (let i = 0; i < 5; i++) {
        const a = ((i + 0.5) / 5) * Math.PI * 2 - Math.PI / 2;
        drawPetal(
          cx, cy,
          a,
          BASE_R * 0.42, BASE_R * 0.78,
          "#e91e63", "#ad1457",
          clamp(mp * 5 - i * 0.7, 0, 1),
          Math.sin(t * 0.0004 + i * 1.3) * 0.18
        );
      }

      // --- Inner petals (5) --- appear 0.62→0.85
      const ip = prog(p, 0.62, 0.85);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2 + 0.3;
        drawPetal(
          cx, cy,
          a,
          BASE_R * 0.28, BASE_R * 0.52,
          "#f06292", "#c2185b",
          clamp(ip * 5 - i * 0.8, 0, 1),
          Math.sin(t * 0.0005 + i * 0.9) * 0.2
        );
      }

      // --- Core petals (4) --- appear 0.78→0.95
      const cp = prog(p, 0.78, 0.95);
      for (let i = 0; i < 4; i++) {
        const a = ((i + 0.25) / 4) * Math.PI * 2;
        drawPetal(
          cx, cy,
          a,
          BASE_R * 0.15, BASE_R * 0.28,
          "#fce4ec", "#f48fb1",
          clamp(cp * 4 - i * 0.9, 0, 1),
          0
        );
      }

      // --- Centre bud --- appear 0.88→1.0
      const bp = easeOut(prog(p, 0.88, 1.0));
      if (bp > 0) {
        const br = BASE_R * 0.1 * bp;
        const cg = ctx.createRadialGradient(cx, cy - br * 0.3, 0, cx, cy, br);
        cg.addColorStop(0, "#fce4ec");
        cg.addColorStop(0.5, "#f48fb1");
        cg.addColorStop(1, "#c2185b");
        ctx.fillStyle = cg;
        ctx.shadowColor = "rgba(240,100,140,0.6)";
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(cx, cy, br, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // --- Bloom glow halo ---
      if (p > 0.85) {
        const gp = easeOut(prog(p, 0.85, 1.0));
        const pulse = 0.85 + 0.15 * Math.sin(t * 0.0015);
        const halo = ctx.createRadialGradient(cx, cy, BASE_R * 0.2, cx, cy, BASE_R * 1.6 * pulse);
        halo.addColorStop(0, `rgba(240,100,140,${0.18 * gp})`);
        halo.addColorStop(0.5, `rgba(180,0,60,${0.08 * gp})`);
        halo.addColorStop(1, "rgba(180,0,60,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, BASE_R * 1.6 * pulse, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ── Sparkles ── */
    function drawSparkles(cx: number, cy: number, p: number, t: number) {
      if (p < 0.3) return;
      const alpha = easeOut(prog(p, 0.3, 0.7));
      const BASE_R = Math.min(canvas.width, canvas.height) * 0.28;

      SPARKS.forEach((sp, i) => {
        const angle = sp.phase + t * sp.speed * 1000;
        const r = BASE_R * (0.55 + 0.45 * Math.sin(t * 0.0002 + i));
        const sx = cx + Math.cos(angle) * r * sp.x * 2.2;
        const sy = cy + Math.sin(angle) * r * sp.y * 2.2;
        const flicker = 0.4 + 0.6 * Math.sin(t * 0.003 + sp.phase * 3);

        ctx.save();
        ctx.globalAlpha = sp.alpha * alpha * flicker;
        ctx.fillStyle = i % 3 === 0 ? "#fce4ec" : i % 3 === 1 ? "#f48fb1" : "#fff9c4";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(sx, sy, sp.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    /* ── Main loop ── */
    let elapsed = 0;
    let lastT = performance.now();

    const loop = (now: number) => {
      const dt = now - lastT;
      lastT = now;
      elapsed += dt;

      const p = clamp(elapsed / TOTAL, 0, 1);
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const stemBase = H * 0.92;
      const flowerY = H * 0.38;

      // Background
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createRadialGradient(cx, H * 0.4, 0, cx, H * 0.5, Math.max(W, H));
      bg.addColorStop(0, "#1a0008");
      bg.addColorStop(0.5, "#0d0005");
      bg.addColorStop(1, "#000000");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Stem grows from 0 → 0.35
      const stemP = prog(p, 0, 0.35);
      drawStem(cx, stemBase, flowerY + 10, stemP);

      // Leaves appear at 0.2 & 0.3
      const leaf1P = prog(p, 0.2, 0.38);
      const leaf2P = prog(p, 0.28, 0.45);
      const stemMidY = lerp(stemBase, flowerY + 10, 0.45);
      drawLeaf(cx - 5, stemMidY + 30, -Math.PI * 0.35, Math.min(W, H) * 0.09, leaf1P);
      drawLeaf(cx + 5, stemMidY - 10, Math.PI * 0.2, Math.min(W, H) * 0.075, leaf2P);

      // Sparkles
      drawSparkles(cx, flowerY, p, elapsed);

      // Rose
      drawRose(cx, flowerY, p, elapsed);

      // Mark bloom
      if (p >= 1 && !bloomedRef.current) {
        bloomedRef.current = true;
        setBloomed(true);
        setTimeout(() => setMessage("Coded for you 🌹"), 400);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Click / tap burst ── */
  const burstRef = useRef<HTMLCanvasElement>(null);

  const handleRoseClick = () => {
    if (!bloomedRef.current) return;
    setMessage("ROSE 🌹");

    const bc = burstRef.current;
    if (!bc) return;
    const bctx = bc.getContext("2d")!;
    bc.width = window.innerWidth;
    bc.height = window.innerHeight;

    const cx = bc.width / 2;
    const cy = bc.height * 0.38;
    const PIECES = 80;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; alpha: number;
      color: string; char: string;
    };

    const pieces: Particle[] = Array.from({ length: PIECES }, (_, i) => {
      const angle = (i / PIECES) * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      const chars = ["🌹", "❤️", "✨", "💖", "🌸"];
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 3,
        r: 6 + Math.random() * 10,
        alpha: 1,
        color: ["#f48fb1", "#fce4ec", "#e91e63", "#fff9c4", "#f06292"][i % 5]!,
        char: chars[i % chars.length]!,
      };
    });

    let braf = 0;
    const bloop = () => {
      bctx.clearRect(0, 0, bc.width, bc.height);
      let alive = false;
      pieces.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.12;
        p.vx *= 0.98;
        p.alpha -= 0.018;
        if (p.alpha <= 0) return;
        alive = true;
        bctx.globalAlpha = Math.max(0, p.alpha);
        if (p.char.length > 1) {
          bctx.font = `${p.r * 1.8}px serif`;
          bctx.fillText(p.char, p.x, p.y);
        } else {
          bctx.fillStyle = p.color;
          bctx.shadowColor = p.color;
          bctx.shadowBlur = 8;
          bctx.beginPath();
          bctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          bctx.fill();
          bctx.shadowBlur = 0;
        }
      });
      bctx.globalAlpha = 1;
      if (alive) braf = requestAnimationFrame(bloop);
      else bctx.clearRect(0, 0, bc.width, bc.height);
    };
    cancelAnimationFrame(braf);
    braf = requestAnimationFrame(bloop);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[90]"
      style={{ background: "#000" }}
    >
      {/* Rose canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onClick={handleRoseClick}
        style={{ cursor: bloomed ? "pointer" : "default" }}
      />

      {/* Burst overlay canvas */}
      <canvas
        ref={burstRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* "Coded for you" message */}
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[14%] left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <p
              className="text-lg sm:text-2xl font-light tracking-[0.25em]"
              style={{
                fontFamily: "'Dancing Script', cursive, serif",
                color: "#fce4ec",
                textShadow: "0 0 30px rgba(240,100,140,0.9), 0 0 60px rgba(200,0,60,0.5)",
              }}
            >
              {message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap hint */}
      <AnimatePresence>
        {bloomed && !message?.startsWith("ROSE") && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.6, 0] }}
            transition={{ duration: 3, times: [0, 0.2, 0.8, 1], delay: 0.8 }}
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-[0.6rem] tracking-[0.4em] text-pink-300/50 uppercase pointer-events-none"
          >
            Tap the rose ✨
          </motion.p>
        )}
      </AnimatePresence>

      {/* Close button */}
      <motion.button
        type="button"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute top-5 right-5 rounded-full px-4 py-2 text-xs tracking-[0.2em] text-pink-200/60 uppercase hover:text-pink-200 transition"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
        }}
      >
        Close ×
      </motion.button>
    </motion.div>
  );
}
