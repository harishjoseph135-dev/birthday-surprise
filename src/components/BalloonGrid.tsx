import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { celebrate } from "@/lib/celebrate";
import { playPop } from "@/lib/sounds";

// 6 unique balloon designs
const BALLOON_DESIGNS = [
  // Gradient balloon
  {
    render: (i: number) => (
      <svg width="110" height="145" viewBox="0 0 110 145">
        <defs>
          <radialGradient id={`g0-${i}`} cx="35%" cy="28%" r="75%">
            <stop offset="0%" stopColor="oklch(0.85 0.15 340)" />
            <stop offset="100%" stopColor="oklch(0.55 0.22 350)" />
          </radialGradient>
        </defs>
        <ellipse cx="55" cy="58" rx="42" ry="52" fill={`url(#g0-${i})`} />
        <ellipse cx="38" cy="36" rx="11" ry="16" fill="white" opacity="0.3" />
        <path d="M55 110 l-7 9 h14 z" fill="oklch(0.45 0.2 350)" />
        <path d="M55 119 C65 130,44 133,55 145" stroke="oklch(0.86 0.12 88)" strokeWidth="1.5" fill="none" opacity="0.7" />
      </svg>
    ),
    label: "gradient",
  },
  // Metallic balloon
  {
    render: (i: number) => (
      <svg width="110" height="145" viewBox="0 0 110 145">
        <defs>
          <radialGradient id={`g1-${i}`} cx="30%" cy="25%" r="80%">
            <stop offset="0%" stopColor="oklch(0.92 0.08 85)" />
            <stop offset="50%" stopColor="oklch(0.78 0.14 75)" />
            <stop offset="100%" stopColor="oklch(0.52 0.12 65)" />
          </radialGradient>
        </defs>
        <ellipse cx="55" cy="58" rx="42" ry="52" fill={`url(#g1-${i})`} />
        <ellipse cx="36" cy="34" rx="9" ry="13" fill="white" opacity="0.45" />
        <ellipse cx="68" cy="70" rx="5" ry="8" fill="white" opacity="0.15" />
        <path d="M55 110 l-7 9 h14 z" fill="oklch(0.52 0.12 65)" />
        <path d="M55 119 C65 130,44 133,55 145" stroke="oklch(0.72 0.1 80)" strokeWidth="1.5" fill="none" opacity="0.8" />
      </svg>
    ),
    label: "metallic",
  },
  // Glass balloon
  {
    render: (i: number) => (
      <svg width="110" height="145" viewBox="0 0 110 145">
        <defs>
          <radialGradient id={`g2-${i}`} cx="35%" cy="28%" r="75%">
            <stop offset="0%" stopColor="oklch(0.9 0.05 220 / 0.5)" />
            <stop offset="100%" stopColor="oklch(0.6 0.12 240 / 0.4)" />
          </radialGradient>
        </defs>
        <ellipse cx="55" cy="58" rx="42" ry="52" fill={`url(#g2-${i})`} stroke="oklch(0.85 0.05 220 / 0.6)" strokeWidth="1.5" />
        <ellipse cx="38" cy="36" rx="11" ry="16" fill="white" opacity="0.5" />
        <ellipse cx="68" cy="72" rx="6" ry="10" fill="white" opacity="0.2" />
        <path d="M55 110 l-7 9 h14 z" fill="oklch(0.6 0.1 220 / 0.6)" />
        <path d="M55 119 C65 130,44 133,55 145" stroke="oklch(0.82 0.12 88)" strokeWidth="1.5" fill="none" opacity="0.7" />
      </svg>
    ),
    label: "glass",
  },
  // Star-pattern balloon
  {
    render: (i: number) => (
      <svg width="110" height="145" viewBox="0 0 110 145">
        <defs>
          <radialGradient id={`g3-${i}`} cx="35%" cy="28%" r="75%">
            <stop offset="0%" stopColor="oklch(0.75 0.18 290)" />
            <stop offset="100%" stopColor="oklch(0.4 0.2 280)" />
          </radialGradient>
        </defs>
        <ellipse cx="55" cy="58" rx="42" ry="52" fill={`url(#g3-${i})`} />
        {[
          [40, 30], [70, 40], [30, 65], [75, 70], [50, 85],
        ].map(([sx, sy], j) => (
          <text key={j} x={sx} y={sy} fontSize="10" fill="white" opacity="0.45" textAnchor="middle">✦</text>
        ))}
        <ellipse cx="38" cy="36" rx="10" ry="15" fill="white" opacity="0.25" />
        <path d="M55 110 l-7 9 h14 z" fill="oklch(0.4 0.2 280)" />
        <path d="M55 119 C65 130,44 133,55 145" stroke="oklch(0.82 0.12 88)" strokeWidth="1.5" fill="none" opacity="0.7" />
      </svg>
    ),
    label: "star",
  },
  // Confetti balloon
  {
    render: (i: number) => (
      <svg width="110" height="145" viewBox="0 0 110 145">
        <defs>
          <radialGradient id={`g4-${i}`} cx="35%" cy="28%" r="75%">
            <stop offset="0%" stopColor="oklch(0.88 0.12 55)" />
            <stop offset="100%" stopColor="oklch(0.65 0.17 40)" />
          </radialGradient>
        </defs>
        <ellipse cx="55" cy="58" rx="42" ry="52" fill={`url(#g4-${i})`} />
        {[
          [42, 35, "oklch(0.85 0.07 8)", 4, 8],
          [65, 45, "oklch(0.62 0.19 14)", 3, 6],
          [35, 65, "oklch(0.82 0.12 85)", 4, 7],
          [70, 68, "oklch(0.75 0.18 290)", 3, 6],
          [50, 80, "oklch(0.88 0.12 55)", 4, 8],
          [62, 28, "oklch(0.62 0.19 14)", 3, 5],
        ].map(([cx, cy, col, rx, ry], j) => (
          <ellipse key={j} cx={cx as number} cy={cy as number} rx={rx as number} ry={ry as number} fill={col as string} opacity="0.7" transform={`rotate(${j * 25} ${cx} ${cy})`} />
        ))}
        <ellipse cx="38" cy="36" rx="10" ry="14" fill="white" opacity="0.28" />
        <path d="M55 110 l-7 9 h14 z" fill="oklch(0.55 0.17 40)" />
        <path d="M55 119 C65 130,44 133,55 145" stroke="oklch(0.82 0.12 88)" strokeWidth="1.5" fill="none" opacity="0.7" />
      </svg>
    ),
    label: "confetti",
  },
  // Chrome balloon
  {
    render: (i: number) => (
      <svg width="110" height="145" viewBox="0 0 110 145">
        <defs>
          <radialGradient id={`g5-${i}`} cx="32%" cy="25%" r="80%">
            <stop offset="0%" stopColor="oklch(0.95 0.03 200)" />
            <stop offset="35%" stopColor="oklch(0.7 0.08 190)" />
            <stop offset="70%" stopColor="oklch(0.45 0.1 185)" />
            <stop offset="100%" stopColor="oklch(0.25 0.06 180)" />
          </radialGradient>
        </defs>
        <ellipse cx="55" cy="58" rx="42" ry="52" fill={`url(#g5-${i})`} />
        <ellipse cx="35" cy="33" rx="10" ry="14" fill="white" opacity="0.5" />
        <ellipse cx="70" cy="68" rx="5" ry="9" fill="white" opacity="0.18" />
        <ellipse cx="62" cy="42" rx="3" ry="5" fill="white" opacity="0.3" />
        <path d="M55 110 l-7 9 h14 z" fill="oklch(0.35 0.08 185)" />
        <path d="M55 119 C65 130,44 133,55 145" stroke="oklch(0.82 0.12 88)" strokeWidth="1.5" fill="none" opacity="0.8" />
      </svg>
    ),
    label: "chrome",
  },
];

// Parallax depths for 3D feel
const DEPTHS = [0.6, 1, 0.8, 1.2, 0.7, 1.1];
const Z_OFFSETS = ["scale(0.88)", "scale(1)", "scale(0.92)", "scale(1.06)", "scale(0.85)", "scale(1.04)"];

export function BalloonGrid({
  surprises,
  popped,
  onPop,
}: {
  surprises: Array<{ label?: string }>;
  popped: number[];
  onPop: (i: number, origin: { x: number; y: number }) => void;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      mouseX.set((e.touches[0].clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.touches[0].clientY / window.innerHeight - 0.5) * 15);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6">
      {surprises.map((s, i) => {
        const depth = DEPTHS[i % DEPTHS.length]!;
        const design = BALLOON_DESIGNS[i % BALLOON_DESIGNS.length]!;
        return (
          <BalloonItem
            key={i}
            index={i}
            label={"label" in s && s.label ? s.label : `Surprise ${i + 1}`}
            popped={popped.includes(i)}
            onPop={(origin) => onPop(i, origin)}
            depth={depth}
            zClass={Z_OFFSETS[i % Z_OFFSETS.length]!}
            design={design}
            mouseX={smoothX}
            mouseY={smoothY}
          />
        );
      })}
    </div>
  );
}

function BalloonItem({
  index,
  label,
  popped,
  onPop,
  depth,
  zClass,
  design,
  mouseX,
  mouseY,
}: {
  index: number;
  label: string;
  popped: boolean;
  onPop: (origin: { x: number; y: number }) => void;
  depth: number;
  zClass: string;
  design: (typeof BALLOON_DESIGNS)[0];
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
}) {
  const [bursting, setBursting] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const tx = useTransform(mouseX, (v) => v * depth);
  const ty = useTransform(mouseY, (v) => v * depth);

  const handle = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (bursting || popped) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    setBursting(true);
    playPop();
    celebrate({ count: 70, origin, power: 8 });
    setTimeout(() => onPop(origin), 620);
  };

  return (
    <motion.div
      style={{ x: tx, y: ty }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        ref={ref}
        type="button"
        onClick={handle}
        aria-label={`Open surprise ${index + 1}: ${label}`}
        className="group relative flex w-full cursor-pointer flex-col items-center rounded-3xl px-2 pt-2 pb-6 outline-none focus-visible:ring-2 focus-visible:ring-gold"
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{ transform: zClass }}
      >
        <motion.div
          animate={
            bursting
              ? { scale: [1, 1.3, 1.35, 0.1], rotate: [0, -8, 8, 0], opacity: [1, 1, 0.8, 0] }
              : { scale: 1, opacity: popped ? 0.22 : 1 }
          }
          transition={{ duration: bursting ? 0.65 : 0.4 }}
          className="relative"
          style={{
            animation: bursting || popped ? undefined : `bob ${4 + index * 0.45}s ease-in-out infinite`,
          }}
        >
          <div className="drop-shadow-[0_20px_38px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:scale-105">
            {design.render(index)}
          </div>

          {/* Glow under balloon */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full opacity-50 blur-xl"
            style={{ width: 60, height: 20, background: "oklch(0.62 0.19 14 / 0.5)" }}
          />

          {/* Sparkles on hover */}
          {[0, 1, 2].map((s) => (
            <span
              key={s}
              className="pointer-events-none absolute text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                left: `${16 + s * 30}%`,
                top: `${8 + s * 20}%`,
                animation: `twinkle ${1.5 + s * 0.5}s ease-in-out infinite`,
              }}
            >
              ✦
            </span>
          ))}
        </motion.div>

        <span className="mt-2 text-xs tracking-[0.25em] text-muted-foreground uppercase">
          {popped ? "✓ Opened" : label}
        </span>
      </motion.button>
    </motion.div>
  );
}
