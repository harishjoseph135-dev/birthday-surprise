import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(99, Math.floor((elapsed / duration) * 100));
      setProgress(p);
      if (elapsed < duration) requestAnimationFrame(tick);
      else {
        setProgress(100);
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 800);
        }, 400);
      }
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[oklch(0.09_0.04_10)]"
        >
          {/* Stars */}
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="pointer-events-none absolute rounded-full bg-cream"
              style={{
                left: `${(i * 37 + 11) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
                width: 1 + (i % 3),
                height: 1 + (i % 3),
                opacity: 0.2 + (i % 5) * 0.1,
                animation: `twinkle ${2 + (i % 4)}s ease-in-out ${(i % 6) * 0.4}s infinite`,
              }}
            />
          ))}

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[0.65rem] tracking-[0.5em] text-gold uppercase"
          >
            ✨ Preparing Something Special...
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 w-64"
          >
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blush to-gold"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <p className="mt-3 text-center text-xs tabular-nums text-muted-foreground">
              {progress}%
            </p>
          </motion.div>

          {progress >= 100 && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-sm tracking-[0.3em] text-cream/80 uppercase"
            >
              Ready.
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
