import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const COMBOS: Record<number, { text: string; emoji: string }> = {
  2: { text: "Nice 👀", emoji: "2️⃣" },
  3: { text: "You're on a roll 🔥", emoji: "3️⃣" },
  4: { text: "Speed mode activated ⚡", emoji: "4️⃣" },
  5: { text: "Almost there 😳", emoji: "5️⃣" },
  6: { text: "FINAL LEVEL UNLOCKED 🎉", emoji: "🏆" },
};

export function ComboSystem({ count }: { count: number }) {
  const [shown, setShown] = useState<number | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (COMBOS[count]) {
      setShown(count);
      setKey((k) => k + 1);
    }
  }, [count]);

  if (!shown || !COMBOS[shown]) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={key}
        initial={{ opacity: 0, y: -30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        onAnimationComplete={() => setTimeout(() => setShown(null), 2200)}
        className="pointer-events-none fixed left-1/2 top-24 z-50 -translate-x-1/2"
      >
        <div
          className="rounded-full px-6 py-3 text-center font-semibold text-cream shadow-2xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.62 0.19 14), oklch(0.82 0.12 85))",
            boxShadow: "0 0 40px -8px oklch(0.82 0.12 85 / 0.7)",
          }}
        >
          <span className="text-sm tracking-wide">{COMBOS[shown]!.text}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
