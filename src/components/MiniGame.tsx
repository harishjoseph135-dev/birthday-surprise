import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { celebrate } from "@/lib/celebrate";

const QUESTIONS = [
  {
    q: "Who knows the other person better — You or Me? 😏😂",
    a: ["Me", "You"],
    funny: ["Okay, that's actually fair 😂", "Hmm... maybe you're right 👀"],
  },
  {
    q: "Who is more annoying — You or Me? 🤣❤️",
    a: ["Me", "You"],
    funny: ["Honest answer. Respect. 😂", "Bold of you to say that 😂"],
  },
  {
    q: "Who loves this friendship more — You or Me? 🫂",
    a: ["Me", "You"],
    funny: ["Aww, that's actually sweet 🥹", "We both know the answer is both 🫂❤️"],
  },
];

export function MiniGame() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  // Store last picked answer index so result screen always has it
  const lastAnswerRef = useRef<number>(0);

  const reset = () => {
    setQ(0);
    setChosen(null);
    setDone(false);
    lastAnswerRef.current = 0;
  };

  const pick = (ai: number) => {
    if (chosen !== null) return; // prevent double-tap
    setChosen(ai);
    lastAnswerRef.current = ai;
    setTimeout(() => {
      setChosen(null);
      if (q + 1 >= QUESTIONS.length) {
        setDone(true);
        celebrate({ count: 100, power: 11 });
      } else {
        setQ((p) => p + 1);
      }
    }, 600);
  };

  const funnyMessage =
    QUESTIONS[Math.min(q, QUESTIONS.length - 1)]!.funny[lastAnswerRef.current] ??
    "That was fun! 😂";

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          reset();
          setOpen(true);
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="mx-auto mt-2 flex cursor-pointer items-center gap-3 rounded-2xl glass px-8 py-4 text-base font-semibold text-cream transition hover:bg-primary/20"
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
                              chosen === ai ? "bg-primary" : "bg-white/10 hover:bg-primary/50"
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
                    97% Friend Compatibility 😂
                  </p>
                  <p className="mt-2 text-sm text-cream/70">{funnyMessage}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Basically certified chaos partners 🎈
                  </p>
                  <div className="mt-5 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={reset}
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
