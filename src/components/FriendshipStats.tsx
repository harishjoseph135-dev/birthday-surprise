import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { label: "Random Conversations", pct: 98, icon: "💬" },
  { label: "Laughing at Nothing", pct: 99, icon: "😂" },
  { label: "Inside Jokes", pct: 94, icon: "🤣" },
  { label: "Certified Chaos", pct: 100, icon: "🌪️" },
  { label: "Memories Made", pct: 100, icon: "📸" },
];

function StatBar({
  label,
  pct,
  icon,
  delay,
}: {
  label: string;
  pct: number;
  icon: string;
  delay: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started.current) {
          started.current = true;
          timeoutId = setTimeout(() => {
            let current = 0;
            const step = () => {
              current = Math.min(pct, current + 2);
              setVal(current);
              if (current < pct) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }, delay * 1000);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [pct, delay]);

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-cream/80">
          {icon} {label}
        </span>
        <span className="tabular-nums text-gold font-medium">
          {pct === 100 && val === 100 ? "∞" : `${val}%`}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blush to-gold"
          initial={{ width: 0 }}
          style={{ width: `${val}%` }}
        />
      </div>
    </div>
  );
}

export function FriendshipStats() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="mx-auto mt-2 flex cursor-pointer items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-cream transition hover:bg-primary/20"
      >
        📊 Friendship Stats
      </motion.button>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-wine/85 p-5 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="w-full max-w-sm rounded-3xl glass p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center text-[0.65rem] tracking-[0.4em] text-gold uppercase">
              📊 Friendship Analytics
            </p>
            <div className="mt-5 space-y-4">
              {STATS.map((s, i) => (
                <StatBar key={s.label} {...s} delay={i * 0.12} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 w-full cursor-pointer rounded-full bg-primary py-2.5 text-sm text-primary-foreground hover:brightness-110"
            >
              Off the charts 🥳
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
