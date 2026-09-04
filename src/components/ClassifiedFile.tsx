import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function ClassifiedFile({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mx-auto mt-2 flex cursor-pointer items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-cream transition hover:bg-red-900/30"
      >
        🔴 Classified File
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-wine/85 p-5 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="w-full max-w-sm rounded-2xl bg-[oklch(0.1_0.04_10)] p-6 font-mono text-sm shadow-2xl ring-2 ring-red-700/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-red-700/40 pb-3">
                <span className="text-xs tracking-widest text-red-500 uppercase">Top Secret</span>
                <span className="text-[0.6rem] text-red-700/60">FILE #BD-{Math.floor(Math.random()*9000)+1000}</span>
              </div>

              <div className="mt-4 space-y-2 text-xs leading-relaxed text-cream/80">
                <p className="text-center text-base font-bold tracking-[0.2em] text-red-400 uppercase">🔴 Classified</p>
                <div className="mt-3 rounded bg-white/5 p-3 space-y-1.5">
                  <p><span className="text-red-400">SUBJECT:</span> {name}</p>
                  <p><span className="text-red-400">STATUS:</span> Certified Chaos</p>
                  <p><span className="text-red-400">THREAT LEVEL:</span> ⭐⭐⭐⭐⭐</p>
                </div>

                <div className="mt-3 rounded bg-white/5 p-3">
                  <p className="mb-2 text-red-400 uppercase tracking-widest text-[0.6rem]">Known Activities:</p>
                  <ul className="space-y-1 text-cream/70">
                    <li>▸ Sending random reels at 2am</li>
                    <li>▸ Laughing at literally everything</li>
                    <li>▸ Creating unnecessary chaos</li>
                    <li>▸ Replying after 3 business days</li>
                    <li>▸ Being surprisingly awesome</li>
                  </ul>
                </div>

                <div className="mt-3 border-t border-red-700/30 pt-3 text-center text-[0.6rem] text-red-600/60 uppercase tracking-widest">
                  Case Closed. 😂
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-4 w-full cursor-pointer rounded-xl bg-red-900/40 py-2 text-xs text-red-300 hover:bg-red-900/60"
              >
                Declassify
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
