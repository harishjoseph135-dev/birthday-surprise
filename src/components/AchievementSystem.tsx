import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export type Achievement =
  | "first_balloon"
  | "memory_hunter"
  | "chaos_detected"
  | "balloon_master"
  | "final_level"
  | "birthday_legend";

const DEFS: Record<Achievement, { icon: string; title: string; sub: string }> = {
  first_balloon: { icon: "🎈", title: "First Balloon!", sub: "The adventure begins." },
  memory_hunter: { icon: "📸", title: "Memory Hunter", sub: "Unlocked a photo memory." },
  chaos_detected: { icon: "😂", title: "Chaos Detected", sub: "You found the classified file." },
  balloon_master: { icon: "🎊", title: "Balloon Master", sub: "Popped 4 balloons!" },
  final_level: { icon: "🔓", title: "Final Level", sub: "All balloons unlocked!" },
  birthday_legend: { icon: "🎂", title: "Birthday Legend", sub: "You're officially legendary." },
};

export function AchievementSystem({
  unlocked,
}: {
  unlocked: Achievement[];
}) {
  const [queue, setQueue] = useState<Achievement[]>([]);
  const [showing, setShowing] = useState<Achievement | null>(null);
  const prevRef = useRef<Achievement[]>([]);

  useEffect(() => {
    const newOnes = unlocked.filter((a) => !prevRef.current.includes(a));
    prevRef.current = unlocked;
    if (newOnes.length > 0) {
      setQueue((q) => [...q, ...newOnes]);
    }
  }, [unlocked]);

  useEffect(() => {
    if (showing) return;
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      setShowing(next!);
      setQueue(rest);
      setTimeout(() => setShowing(null), 2800);
    }
  }, [queue, showing]);

  if (!showing) return null;
  const def = DEFS[showing];
  if (!def) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={showing}
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 120, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed bottom-24 right-4 z-50 max-w-[220px]"
      >
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.18 0.08 12), oklch(0.12 0.05 10))",
            border: "1px solid oklch(0.82 0.12 85 / 0.4)",
            boxShadow: "0 0 30px -8px oklch(0.82 0.12 85 / 0.4)",
          }}
        >
          <span className="text-2xl">{def.icon}</span>
          <div>
            <p className="text-[0.6rem] tracking-[0.3em] text-gold uppercase">Unlocked!</p>
            <p className="text-xs font-medium text-cream">{def.title}</p>
            <p className="text-[0.65rem] text-muted-foreground">{def.sub}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
