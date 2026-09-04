import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { celebrate } from "@/lib/celebrate";

export type Award = { icon: string; title: string; reason: string };

export function AwardsCard({
  title,
  name,
  awards,
  finalLine,
}: {
  title: string;
  name: string;
  awards: Award[];
  finalLine?: string;
}) {
  const [step, setStep] = useState(-1); // -1 = intro, 0..n-1 = awards, n = grand finale
  const total = awards.length;

  // Auto-advance intro after 1.8s
  useEffect(() => {
    const t = setTimeout(() => setStep(0), 1800);
    return () => clearTimeout(t);
  }, []);

  const advance = () => {
    if (step < total) {
      setStep((s) => s + 1);
      if (step === total - 1) celebrate({ count: 90, power: 10 });
    }
  };

  return (
    <div className="text-center">
      <p className="text-[0.65rem] tracking-[0.45em] text-gold uppercase">🏆 {title}</p>

      <div className="mx-auto mt-5 max-w-sm">
        <AnimatePresence mode="wait">
          {/* Intro */}
          {step === -1 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex justify-center gap-1 text-3xl">
                {["🏆", "🥇", "🎖️"].map((e, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-display)" }} className="mt-4 text-lg text-cream">
                The 2026 Best Friend Awards
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Loading ceremony...</p>
            </motion.div>
          )}

          {/* Individual awards */}
          {step >= 0 && step < total && (
            <motion.div
              key={`award-${step}`}
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              {/* Spotlight ring */}
              <motion.div
                className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full"
                style={{
                  background: "radial-gradient(circle, oklch(0.82 0.12 85 / 0.2), transparent 70%)",
                  boxShadow: "0 0 60px -10px oklch(0.82 0.12 85 / 0.6)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 40px -10px oklch(0.82 0.12 85 / 0.4)",
                    "0 0 80px -10px oklch(0.82 0.12 85 / 0.8)",
                    "0 0 40px -10px oklch(0.82 0.12 85 / 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-4xl">{awards[step]!.icon}</span>
              </motion.div>

              <p className="text-[0.6rem] tracking-[0.4em] text-gold uppercase">
                Award {step + 1} of {total}
              </p>
              <p style={{ fontFamily: "var(--font-display)" }} className="mt-2 text-xl text-cream">
                {awards[step]!.title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground italic">{awards[step]!.reason}</p>

              <motion.button
                type="button"
                onClick={advance}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="mt-6 cursor-pointer rounded-full bg-primary px-7 py-2.5 text-sm text-primary-foreground hover:brightness-110"
              >
                {step < total - 1 ? "Next Award →" : "See Grand Finale 🎉"}
              </motion.button>
            </motion.div>
          )}

          {/* Grand finale */}
          {step === total && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-5xl"
              >
                🏆
              </motion.div>

              <p className="mt-3 text-[0.6rem] tracking-[0.4em] text-gold uppercase">
                And the award for...
              </p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-3 text-xl text-cream"
              >
                🏆 Best Friend of the Year
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.7 }}
                style={{ fontFamily: "var(--font-hand)" }}
                className="mt-2 text-3xl text-blush"
              >
                {name}
              </motion.p>

              {finalLine && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.7 }}
                  className="mt-3 text-xs italic text-muted-foreground"
                >
                  {finalLine}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
