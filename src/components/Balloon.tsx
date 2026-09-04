import { motion } from "motion/react";
import { useState } from "react";

const PALETTES = [
  ["oklch(0.68 0.2 12)", "oklch(0.42 0.16 12)"],
  ["oklch(0.84 0.1 5)", "oklch(0.6 0.15 8)"],
  ["oklch(0.86 0.12 88)", "oklch(0.66 0.13 70)"],
  ["oklch(0.7 0.17 350)", "oklch(0.45 0.15 350)"],
  ["oklch(0.8 0.09 30)", "oklch(0.55 0.14 20)"],
  ["oklch(0.62 0.21 20)", "oklch(0.3 0.12 12)"],
];

export function Balloon({
  index,
  label,
  popped,
  onPop,
}: {
  index: number;
  label: string;
  popped: boolean;
  onPop: (origin: { x: number; y: number }) => void;
}) {
  const [bursting, setBursting] = useState(false);
  const [light, dark] = PALETTES[index % PALETTES.length]!;

  const handle = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (bursting || popped) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const origin = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    setBursting(true);
    setTimeout(() => onPop(origin), 620);
  };

  return (
    <motion.button
      type="button"
      onClick={handle}
      aria-label={`Open surprise ${index + 1}: ${label}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.7 }}
      className="group relative flex w-full cursor-pointer flex-col items-center rounded-3xl px-2 pt-2 pb-6 outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <motion.div
        animate={
          bursting
            ? { scale: [1, 1.3, 1.35, 0.2], rotate: [0, -6, 6, 0], opacity: [1, 1, 1, 0] }
            : { scale: 1, opacity: popped ? 0.25 : 1 }
        }
        transition={{ duration: bursting ? 0.62 : 0.4 }}
        className="relative"
        style={{ animation: bursting || popped ? undefined : `bob ${4 + index * 0.4}s ease-in-out infinite` }}
      >
        <svg
          width="118"
          height="150"
          viewBox="0 0 118 150"
          className="drop-shadow-[0_18px_35px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
        >
          <defs>
            <radialGradient id={`bg-${index}`} cx="35%" cy="28%" r="75%">
              <stop offset="0%" stopColor={light} />
              <stop offset="100%" stopColor={dark} />
            </radialGradient>
          </defs>
          <ellipse cx="59" cy="60" rx="44" ry="55" fill={`url(#bg-${index})`} />
          <ellipse cx="42" cy="38" rx="12" ry="18" fill="white" opacity="0.28" />
          <path d="M59 114 l-8 10 h16 z" fill={dark} />
          <path
            d="M59 124 C 70 134, 48 138, 59 150"
            stroke="oklch(0.86 0.12 88)"
            strokeWidth="1.6"
            fill="none"
            opacity="0.8"
          />
        </svg>
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-60 blur-2xl"
          style={{ background: light, transform: "scale(0.7)" }}
        />
        {/* sparkles */}
        {[0, 1, 2].map((s) => (
          <span
            key={s}
            className="pointer-events-none absolute text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              left: `${18 + s * 32}%`,
              top: `${10 + s * 22}%`,
              animation: `twinkle ${1.6 + s * 0.5}s ease-in-out infinite`,
            }}
          >
            ✦
          </span>
        ))}
      </motion.div>

      <span className="mt-2 text-xs tracking-[0.25em] text-muted-foreground uppercase">
        {popped ? "Opened" : label}
      </span>
    </motion.button>
  );
}
