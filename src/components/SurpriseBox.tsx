import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { celebrate } from "@/lib/celebrate";

export function SurpriseBox({ poppedCount, total }: { poppedCount: number; total: number }) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const unlocked = poppedCount >= 3;

  if (poppedCount < 1) return null;

  const handleOpen = () => {
    if (!unlocked) return;
    setOpen(true);
    setTimeout(() => {
      setRevealed(true);
      celebrate({ count: 90, power: 10 });
    }, 600);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-8 flex justify-center"
      >
        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={unlocked ? { scale: 1.05, y: -4 } : {}}
          whileTap={unlocked ? { scale: 0.97 } : {}}
          className={`cursor-pointer rounded-2xl glass px-6 py-4 text-center transition ${unlocked ? "hover:bg-primary/20" : "opacity-60 cursor-not-allowed"}`}
          aria-label="Surprise box"
          disabled={!unlocked}
        >
          <p className="text-2xl">{unlocked ? "🎁" : "🔒"}</p>
          <p className="mt-1 text-xs tracking-[0.25em] text-muted-foreground uppercase">
            {unlocked ? "Surprise Box!" : `Unlocks at 3 balloons`}
          </p>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-wine/80 p-5 backdrop-blur-md"
            onClick={() => { setOpen(false); setRevealed(false); }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="max-w-sm rounded-3xl glass p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {!revealed ? (
                <motion.p className="text-5xl" animate={{ rotate: [0, -10, 10, -5, 0] }} transition={{ duration: 0.5 }}>
                  🎁
                </motion.p>
              ) : (
                <>
                  <p className="text-4xl">🎉</p>
                  <p className="mt-4 text-[0.65rem] tracking-[0.4em] text-gold uppercase">Halfway there...</p>
                  <p
                    style={{ fontFamily: "var(--font-hand)" }}
                    className="mt-3 text-xl text-cream"
                  >
                    Keep going 👀
                  </p>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{poppedCount} / {total} SURPRISES UNLOCKED</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blush to-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${(poppedCount / total) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => { setOpen(false); setRevealed(false); }}
                    className="mt-6 cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground transition hover:brightness-110"
                  >
                    Back to balloons 🎈
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
