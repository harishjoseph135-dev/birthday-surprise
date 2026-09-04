import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const MESSAGES = [
  "You're officially one year older. Skill issue. 😂",
  "Congratulations! You've unlocked another year of being iconic.",
  "Still chaotic. Still awesome. 🎉",
  "Birthday calories don't count today. Fact.",
  "Your free trial of being this age has been renewed.",
  "Scientists confirm: you get funnier every year.",
  "Another year of being the most random person I know. We love it.",
  "Plot twist: you're still not boring. Impressive.",
  "Breaking news: today's main character is you. 🎂",
  "Certified another year of chaos and memories. Worth it.",
];

export function RandomMessage() {
  const [msg, setMsg] = useState<string | null>(null);
  const [key, setKey] = useState(0);
  const [last, setLast] = useState(-1);

  const roll = () => {
    let idx = Math.floor(Math.random() * MESSAGES.length);
    if (idx === last && MESSAGES.length > 1) idx = (idx + 1) % MESSAGES.length;
    setMsg(MESSAGES[idx]!);
    setLast(idx);
    setKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        type="button"
        onClick={roll}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="cursor-pointer rounded-full glass px-5 py-2.5 text-sm text-cream transition hover:bg-primary/20"
      >
        🎲 Give Me a Random Message
      </motion.button>

      <AnimatePresence mode="wait">
        {msg && (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 14, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 600 }}
            className="max-w-xs rounded-2xl glass px-5 py-4 text-center"
          >
            <p
              style={{ fontFamily: "var(--font-hand)" }}
              className="text-base leading-relaxed text-cream"
            >
              {msg}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
