import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { celebrate } from "@/lib/celebrate";

const QUESTIONS = [
  {
    q: "Who is more likely to reply after 3 business days? 😂",
    a: ["Me", "You"],
    funny: ["Classic. Owned it.", "I KNEW IT 😂"],
  },
  {
    q: "Who starts the random conversations at weird hours?",
    a: ["Me", "You"],
    funny: ["At least you're honest 😂", "Caught. Red-handed. 👀"],
  },
  {
    q: "Who causes more chaos in a group chat?",
    a: ["Definitely me", "Definitely you"],
    funny: ["Chaos is your brand.", "Facts. Zero arguments here 😂"],
  },
];

export function MiniGame() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const reset = () => { setQ(0); setAnswers([]); setChosen(null); setDone(false); };

  const pick = (ai: number) => {
    setChosen(ai);
    setTimeout(() => {
      const next = [...answers, ai];
      setAnswers(next);
      setChosen(null);
      if (q + 1 >= QUESTIONS.length) {
        setDone(true);
        celebrate({ count: 100, power: 11 });
      } else {
        setQ((p) => p + 1);
      }
    }, 600);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => { reset(); setOpen(true); }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="mx-auto mt-2 flex cursor-pointer items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-cream transition hover:bg-primary/20"
      >
        🎮 Quick Friendship Game
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="w-full max-w-sm rounded-3xl glass p-7 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {!done ? (
                <>
                  <p className="text-[0.65rem] tracking-[0.4em] text-gold uppercase">
                    🎮 One Quick Challenge
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {q + 1} / {QUESTIONS.length}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={q}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                    >
                      <p
                        style={{ fontFamily: "var(--font-display)" }}
                        className="mt-5 text-base leading-snug text-cream sm:text-lg"
                      >
                        {QUESTIONS[q]!.q}
                      </p>
                      <div className="mt-6 flex flex-col gap-3">
                        {QUESTIONS[q]!.a.map((ans, ai) => (
                          <motion.button
                            key={ai}
                            type="button"
                            onClick={() => pick(ai)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`cursor-pointer rounded-2xl px-5 py-3 text-sm font-medium text-cream transition ${
                              chosen === ai
                                ? "bg-primary"
                                : "bg-white/10 hover:bg-primary/50"
                            }`}
                          >
                            {ans}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="text-4xl">🎉</p>
                  <p className="mt-4 text-[0.65rem] tracking-[0.4em] text-gold uppercase">Result</p>
                  <p
                    style={{ fontFamily: "var(--font-display)" }}
                    className="mt-3 text-2xl text-cream"
                  >
                    97% Bestie Compatibility 😂
                  </p>
                  <p className="mt-2 text-sm text-cream/70">
                    {QUESTIONS[Math.min(q, QUESTIONS.length - 1)]!.funny[answers[answers.length - 1] ?? 0]}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Basically certified chaos partners 🎈
                  </p>
                  <div className="mt-5 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => { reset(); }}
                      className="cursor-pointer rounded-full bg-white/10 px-5 py-2 text-sm text-cream hover:bg-white/20"
                    >
                      Play again
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="cursor-pointer rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:brightness-110"
                    >
                      Done 🥳
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
