import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { celebrate } from "@/lib/celebrate";

type Stage = "stars" | "welcome" | "waiting" | "ready" | "done";

export function IntroAnimation({ name, onDone }: { name: string; onDone: () => void }) {
  const [stage, setStage] = useState<Stage>("stars");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("welcome"), 1200);
    const t2 = setTimeout(() => setStage("waiting"), 3000);
    const t3 = setTimeout(() => setStage("ready"), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleGo = () => {
    celebrate({ count: 80, power: 10 });
    setStage("done");
    setTimeout(onDone, 900);
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          exit={{ opacity: 0, scale: 1.08, filter: "blur(16px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center overflow-hidden bg-[oklch(0.07_0.03_10)] px-6 text-center"
        >
          {/* Animated stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute rounded-full bg-cream"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1 + (i % 7) * 0.08, scale: 1 }}
              transition={{ delay: (i % 12) * 0.06, duration: 0.8 }}
              style={{
                left: `${(i * 31 + 7) % 100}%`,
                top: `${(i * 47 + 13) % 100}%`,
                width: 1.5 + (i % 4) * 0.8,
                height: 1.5 + (i % 4) * 0.8,
                animation: `twinkle ${2.5 + (i % 5) * 0.7}s ease-in-out ${(i % 8) * 0.3}s infinite`,
              }}
            />
          ))}

          {/* Glowing orbs */}
          <div className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-gold/15 blur-[100px]" />

          <AnimatePresence mode="wait">
            {stage === "stars" && (
              <motion.div
                key="stars"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-4xl">✨</span>
              </motion.div>
            )}

            {stage === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[0.65rem] tracking-[0.5em] text-gold uppercase">👀 psst...</p>
                <h1
                  style={{ fontFamily: "var(--font-display)" }}
                  className="mt-4 text-3xl text-cream sm:text-5xl"
                >
                  Welcome,{" "}
                  <span style={{ fontFamily: "var(--font-hand)" }} className="text-blush">
                    {name}
                  </span>
                </h1>
              </motion.div>
            )}

            {stage === "waiting" && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1 }}
              >
                <p
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-xl text-cream/80 sm:text-3xl"
                >
                  I've been waiting for you to open this...
                </p>
              </motion.div>
            )}

            {stage === "ready" && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="flex flex-col items-center gap-8"
              >
                <p
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-2xl text-cream sm:text-4xl"
                >
                  Ready?
                </p>
                <motion.button
                  type="button"
                  onClick={handleGo}
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative cursor-pointer rounded-full bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground"
                  style={{
                    boxShadow: "0 0 40px -8px oklch(0.62 0.19 14 / 0.8), 0 0 80px -20px oklch(0.82 0.12 85 / 0.5)",
                  }}
                >
                  <span className="relative z-10">LET'S GO ✨</span>
                  {/* pulsing ring */}
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
