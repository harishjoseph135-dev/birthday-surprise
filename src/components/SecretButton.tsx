import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { celebrate } from "@/lib/celebrate";

const SECRET_MESSAGES = [
  "You're officially too good at finding things 😂",
  "Okay, you were NOT supposed to find this 👀",
  "Certified chaos energy. This is why we're friends 😂",
  "I knew you'd find it. You're too curious for your own good 🎉",
];

export function SecretButton() {
  const [found, setFound] = useState(false);
  const [visible, setVisible] = useState(false);

  // Randomize position per session
  const pos = useMemo(
    () => ({
      x: 10 + Math.random() * 75,
      y: 15 + Math.random() * 65,
    }),
    [],
  );

  const message = useMemo(
    () => SECRET_MESSAGES[Math.floor(Math.random() * SECRET_MESSAGES.length)]!,
    [],
  );

  useEffect(() => {
    // Show after 3 seconds
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleFind = () => {
    setFound(true);
    celebrate({ count: 120, power: 12 });
  };

  return (
    <>
      {/* Tiny glowing secret star */}
      <AnimatePresence>
        {visible && !found && (
          <motion.button
            type="button"
            onClick={handleFind}
            aria-label="Secret"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed z-30 cursor-pointer text-gold"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              fontSize: 14,
              animation: "twinkle 2s ease-in-out infinite",
              textShadow: "0 0 12px oklch(0.82 0.12 85 / 0.9)",
            }}
            title=""
          >
            ✦
          </motion.button>
        )}
      </AnimatePresence>

      {/* Secret reveal modal */}
      <AnimatePresence>
        {found && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-wine/80 p-5 backdrop-blur-md"
            onClick={() => setFound(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="max-w-sm rounded-3xl glass p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-3xl">🎁</p>
              <p className="mt-4 text-[0.65rem] tracking-[0.4em] text-gold uppercase">
                You Found The Secret 👀
              </p>
              <p
                style={{ fontFamily: "var(--font-hand)" }}
                className="mt-4 text-xl leading-relaxed text-cream"
              >
                {message}
              </p>
              <button
                type="button"
                onClick={() => setFound(false)}
                className="mt-6 cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground transition hover:brightness-110"
              >
                Hehe 😂
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
