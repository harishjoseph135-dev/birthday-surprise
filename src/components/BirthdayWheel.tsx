import { AnimatePresence, motion, useAnimation } from "motion/react";
import { useState } from "react";
import { celebrate } from "@/lib/celebrate";

const SEGMENTS = [
  { label: "🎂 Cake", msg: "You deserve the whole cake. And then some." },
  { label: "🍕 Pizza", msg: "Pizza party! The only logical celebration." },
  { label: "🎬 Movie", msg: "Movie night — your choice, no arguments." },
  { label: "😂 Roast", msg: "You asked for it. Happy birthday, chaos queen 😂" },
  { label: "📸 Memory", msg: "A new memory is loading... stay tuned 🎈" },
  { label: "🎁 Mystery", msg: "A surprise within a surprise. The real prize." },
  { label: "🎉 Celebrate", msg: "Just pure, unfiltered celebration. You earned it." },
  { label: "🌟 Legend", msg: "Spin landed on: Birthday Legend. Obviously." },
];

const COLORS = [
  "oklch(0.55 0.2 350)",
  "oklch(0.65 0.16 30)",
  "oklch(0.72 0.14 80)",
  "oklch(0.58 0.18 290)",
  "oklch(0.62 0.19 14)",
  "oklch(0.5 0.18 250)",
  "oklch(0.68 0.15 140)",
  "oklch(0.78 0.12 60)",
];

const SIZE = 240;
const R = SIZE / 2;
const N = SEGMENTS.length;
const SLICE = (2 * Math.PI) / N;

function wheelPath(i: number) {
  const start = i * SLICE - Math.PI / 2;
  const end = start + SLICE;
  const x1 = R + R * 0.95 * Math.cos(start);
  const y1 = R + R * 0.95 * Math.sin(start);
  const x2 = R + R * 0.95 * Math.cos(end);
  const y2 = R + R * 0.95 * Math.sin(end);
  return `M${R},${R} L${x1},${y1} A${R * 0.95},${R * 0.95} 0 0,1 ${x2},${y2} Z`;
}

export function BirthdayWheel() {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<(typeof SEGMENTS)[0] | null>(null);
  const [angle, setAngle] = useState(0);
  const controls = useAnimation();

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const extra = 1440 + Math.floor(Math.random() * 360);
    const finalAngle = angle + extra;
    setAngle(finalAngle);
    await controls.start({
      rotate: finalAngle,
      transition: { duration: 4, ease: [0.17, 0.67, 0.21, 1] },
    });
    const normalized = ((finalAngle % 360) + 360) % 360;
    const idx = Math.floor(((360 - normalized + 360 / N / 2) % 360) / (360 / N)) % N;
    setResult(SEGMENTS[idx]!);
    celebrate({ count: 80, power: 9 });
    setSpinning(false);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="mx-auto mt-2 flex cursor-pointer items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-cream transition hover:bg-primary/20"
      >
        🎡 Spin the Birthday Wheel
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-wine/85 p-5 backdrop-blur-md"
            onClick={() => {
              if (!spinning) setOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="flex flex-col items-center gap-5"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[0.65rem] tracking-[0.4em] text-gold uppercase">
                🎡 Spin The Birthday Wheel
              </p>

              {/* Wheel */}
              <div className="relative" style={{ width: SIZE, height: SIZE }}>
                {/* Pointer */}
                <div
                  className="absolute left-1/2 -top-3 z-10 -translate-x-1/2"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: "22px solid oklch(0.82 0.12 85)",
                    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
                  }}
                />
                <motion.svg
                  width={SIZE}
                  height={SIZE}
                  viewBox={`0 0 ${SIZE} ${SIZE}`}
                  animate={controls}
                  style={{ originX: "50%", originY: "50%" }}
                >
                  {SEGMENTS.map((seg, i) => {
                    const mid = i * SLICE - Math.PI / 2 + SLICE / 2;
                    const tx = R + R * 0.62 * Math.cos(mid);
                    const ty = R + R * 0.62 * Math.sin(mid);
                    return (
                      <g key={i}>
                        <path
                          d={wheelPath(i)}
                          fill={COLORS[i % COLORS.length]}
                          stroke="oklch(0.1 0.04 10)"
                          strokeWidth="1.5"
                        />
                        <text
                          x={tx}
                          y={ty}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="10"
                          fill="white"
                          transform={`rotate(${(i * 360) / N + 360 / N / 2} ${tx} ${ty})`}
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {seg.label.split(" ")[0]}
                        </text>
                      </g>
                    );
                  })}
                  {/* Center circle */}
                  <circle
                    cx={R}
                    cy={R}
                    r={18}
                    fill="oklch(0.12 0.05 10)"
                    stroke="oklch(0.82 0.12 85 / 0.6)"
                    strokeWidth="2"
                  />
                </motion.svg>
              </div>

              {!result ? (
                <motion.button
                  type="button"
                  onClick={spin}
                  disabled={spinning}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="cursor-pointer rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
                >
                  {spinning ? "Spinning..." : "SPIN! 🎡"}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xs rounded-2xl glass px-5 py-4 text-center"
                >
                  <p className="text-lg">{result.label}</p>
                  <p
                    style={{ fontFamily: "var(--font-hand)" }}
                    className="mt-2 text-sm text-cream/80"
                  >
                    {result.msg}
                  </p>
                  <button
                    type="button"
                    onClick={spin}
                    className="mt-3 cursor-pointer rounded-full bg-white/10 px-4 py-1.5 text-xs text-cream hover:bg-white/20"
                  >
                    Spin again
                  </button>
                </motion.div>
              )}

              {!spinning && (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs text-muted-foreground hover:text-cream"
                >
                  Close
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
