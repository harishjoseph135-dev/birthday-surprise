import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { celebrateBig } from "@/lib/celebrate";
import { playReveal } from "@/lib/sounds";

type Stage = 0 | 1 | 2 | 3;
// 0 = "last surprise" text
// 1 = "Happy Birthday NAME"
// 2 = main reveal
// 3 = extra secret reveal

export function FinalSurprise({
  open,
  name,
  image,
  message,
  extraMessage,
  extraImage,
  enableExtra,
  onClose,
}: {
  open: boolean;
  name: string;
  image: string;
  message: string;
  extraMessage?: string;
  extraImage?: string;
  enableExtra?: boolean;
  onClose: () => void;
}) {
  const [stage, setStage] = useState<Stage>(0);
  const [showExtraBtn, setShowExtraBtn] = useState(false);
  const [showWait, setShowWait] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setStage(0);
      setShowExtraBtn(false);
      setShowWait(false);
      return;
    }
    const t1 = setTimeout(() => setStage(1), 2800);
    const t2 = setTimeout(() => {
      setStage(2);
      playReveal();
      celebrateBig();
    }, 5600);
    // Show "WAIT..." tease after reveal settles
    const t3 = enableExtra ? setTimeout(() => setShowWait(true), 9000) : undefined;
    const t4 = enableExtra ? setTimeout(() => setShowExtraBtn(true), 11000) : undefined;
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (t3) clearTimeout(t3);
      if (t4) clearTimeout(t4);
    };
  }, [open, enableExtra]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-[oklch(0.06_0.03_10)]/98 px-5 py-14 backdrop-blur-lg"
        >
          {/* Ambient glow orbs */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <motion.div
              className="absolute left-1/4 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full"
              style={{ background: "oklch(0.35 0.14 12 / 0.35)", filter: "blur(120px)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full"
              style={{ background: "oklch(0.82 0.12 85 / 0.12)", filter: "blur(110px)" }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
          </div>

          <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {/* Stage 0 — cinematic opener */}
              {stage === 0 && (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0, filter: "blur(16px)", scale: 0.94 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(14px)", y: -24 }}
                  transition={{ duration: 1.5 }}
                  className="flex flex-col items-center gap-6"
                >
                  {/* Beating heart */}
                  <motion.div
                    animate={{ scale: [1, 1.18, 1, 1.14, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    className="text-5xl"
                    style={{ filter: "drop-shadow(0 0 20px oklch(0.62 0.19 14 / 0.9))" }}
                  >
                    ❤️
                  </motion.div>
                  <p
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-2xl text-cream/90 sm:text-4xl"
                  >
                    Okay… this is the last surprise.
                  </p>
                  <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                    Final Level 🔓
                  </p>
                </motion.div>
              )}

              {/* Stage 1 — name reveal */}
              {stage === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.12, filter: "blur(12px)" }}
                  transition={{ duration: 1.2 }}
                >
                  <p className="text-sm tracking-[0.4em] text-gold uppercase">🎂 Happy Birthday</p>
                  <motion.p
                    style={{ fontFamily: "var(--font-hand)" }}
                    className="mt-4 text-5xl text-blush sm:text-7xl"
                    animate={{
                      textShadow: [
                        "0 0 20px oklch(0.85 0.07 8 / 0.5)",
                        "0 0 60px oklch(0.85 0.07 8 / 0.9)",
                        "0 0 20px oklch(0.85 0.07 8 / 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {name}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage 2 — full reveal */}
            {stage === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="w-full"
              >
                {/* YOU MADE IT banner */}
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.4 }}
                >
                  <motion.h2
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-balance text-4xl leading-tight text-gold sm:text-6xl"
                  >
                    HAPPY BIRTHDAY,
                    <span className="mt-2 block text-cream">{name}! 🎂</span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-3 text-xs tracking-[0.3em] text-muted-foreground uppercase"
                  >
                    You made it to the final level 😂
                  </motion.p>
                </motion.div>

                {/* Final photo — blur to sharp */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.84, rotate: -3, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, rotate: -1, filter: "blur(0px)" }}
                  transition={{ delay: 0.7, duration: 1.4 }}
                  className="mx-auto mt-9 w-full max-w-sm rounded-2xl bg-cream p-3 pb-9"
                  style={{
                    boxShadow:
                      "0 0 60px -10px oklch(0.82 0.12 85 / 0.6), 0 40px 80px -25px rgba(0,0,0,0.85)",
                  }}
                >
                  <img
                    src={image}
                    alt={`Happy birthday ${name}`}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                  <p
                    style={{ fontFamily: "var(--font-hand)" }}
                    className="mt-3 text-center text-xl text-wine"
                  >
                    For you, {name} 🎂
                  </p>
                </motion.div>

                {/* Final message */}
                <div className="mt-8 space-y-4">
                  {message.split("\n\n").map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + i * 0.5, duration: 0.9 }}
                      className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-cream/90 sm:text-base"
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 1 }}
                  className="mt-10 flex flex-wrap justify-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() => celebrateBig()}
                    className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110"
                  >
                    🎉 More confetti
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-full glass px-6 py-3 text-sm text-cream transition hover:bg-secondary/60"
                  >
                    Back to the hearts
                  </button>
                </motion.div>

                {/* Secret extra surprise tease */}
                <AnimatePresence>
                  {showWait && !showExtraBtn && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-8 text-xs tracking-[0.3em] text-gold/80 uppercase"
                    >
                      WAIT... 👀
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showExtraBtn && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="mt-4 flex flex-col items-center gap-2"
                    >
                      <p className="text-xs text-cream/60">I'm not done yet.</p>
                      <motion.button
                        type="button"
                        onClick={() => setStage(3)}
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative cursor-pointer rounded-full px-8 py-3 text-sm font-semibold text-primary-foreground"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.62 0.19 14), oklch(0.82 0.12 85))",
                          boxShadow: "0 0 40px -8px oklch(0.82 0.12 85 / 0.8)",
                        }}
                        animate={{
                          boxShadow: [
                            "0 0 30px -8px oklch(0.62 0.19 14 / 0.6)",
                            "0 0 60px -8px oklch(0.82 0.12 85 / 0.9)",
                            "0 0 30px -8px oklch(0.62 0.19 14 / 0.6)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🎁 One Last Thing
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Stage 3 — secret final surprise */}
            {stage === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-full"
              >
                <motion.p
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2 }}
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-xl text-cream/80 sm:text-3xl"
                >
                  You thought six hearts were all I had?
                </motion.p>

                {extraImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, filter: "blur(15px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="mx-auto mt-8 w-full max-w-xs rounded-2xl bg-cream p-3 pb-8 shadow-2xl"
                  >
                    <img
                      src={extraImage}
                      alt="One last thing"
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                  </motion.div>
                )}

                {extraMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.9 }}
                    className="mx-auto mt-6 max-w-md"
                  >
                    {extraMessage.split("\n\n").map((p, i) => (
                      <p
                        key={i}
                        style={{ fontFamily: "var(--font-hand)" }}
                        className="mb-3 text-lg leading-relaxed text-cream/90"
                      >
                        {p}
                      </p>
                    ))}
                  </motion.div>
                )}

                <motion.button
                  type="button"
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="mt-8 cursor-pointer rounded-full glass px-7 py-3 text-sm text-cream hover:bg-secondary/60"
                >
                  🥳 That's it — Happy Birthday!
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
