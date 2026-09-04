import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const AWARDS = [
  { icon: "🥇", title: "Most Random Conversations", sub: "At the most unexpected hours" },
  { icon: "🏆", title: "Professional Meme Sender", sub: "Gold level certified" },
  { icon: "🎖️", title: "Certified Chaos Creator", sub: "No further explanation needed" },
  { icon: "😂", title: "Best Laugh in the Room", sub: "Contagious, uncontrollable, iconic" },
  { icon: "🌟", title: "Somehow Still My Best Friend", sub: "Despite all of the above 😂" },
];

export function BestFriendAwards() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="mx-auto mt-2 flex cursor-pointer items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-cream transition hover:bg-primary/20"
      >
        🏆 Best Friend Awards
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
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="w-full max-w-sm rounded-3xl glass p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-center text-[0.65rem] tracking-[0.4em] text-gold uppercase">
                🏆 Best Friend Awards
              </p>
              <div className="mt-5 space-y-3">
                {AWARDS.map((a, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setActive(active === i ? null : i); }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-left transition hover:bg-primary/20"
                  >
                    <span className="text-2xl">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-cream truncate">{a.title}</p>
                      <AnimatePresence>
                        {active === i && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-xs text-muted-foreground overflow-hidden"
                          >
                            {a.sub}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <span className="text-xs text-gold">
                      {active === i ? "▲" : "▼"}
                    </span>
                  </motion.button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-5 w-full cursor-pointer rounded-full bg-primary py-2.5 text-sm text-primary-foreground hover:brightness-110"
              >
                Fully deserved 🥳
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
