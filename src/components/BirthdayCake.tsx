import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { celebrate } from "@/lib/celebrate";

const CANDLE_COUNT = 5;

export function BirthdayCake() {
  const [open, setOpen] = useState(false);
  const [lit, setLit] = useState<boolean[]>(Array(CANDLE_COUNT).fill(true));
  const [wished, setWished] = useState(false);
  const micRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number>(0);

  const allOut = lit.every((l) => !l);

  // Try to detect blowing via microphone
  useEffect(() => {
    if (!open || wished) return;
    let active = true;
    const startMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micRef.current = stream;
        if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
          audioCtxRef.current.close();
        }
        const ctx = new (
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        )();
        audioCtxRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;
        const data = new Uint8Array(analyser.frequencyBinCount);
        const check = () => {
          if (!active) return;
          analyser.getByteFrequencyData(data);
          const avg = data.reduce((a, b) => a + b, 0) / data.length;
          if (avg > 28) {
            // Blow detected — extinguish one candle
            setLit((prev) => {
              const idx = prev.lastIndexOf(true);
              if (idx === -1) return prev;
              const next = [...prev];
              next[idx] = false;
              return next;
            });
          }
          rafRef.current = requestAnimationFrame(check);
        };
        rafRef.current = requestAnimationFrame(check);
      } catch {
        // Mic not available — click fallback only
      }
    };
    startMic();
    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
      micRef.current?.getTracks().forEach((t) => t.stop());
      audioCtxRef.current?.close().catch(() => {});
    };
  }, [open, wished]);

  useEffect(() => {
    if (allOut && !wished && open) {
      setWished(true);
      celebrate({ count: 140, power: 13 });
    }
  }, [allOut, wished, open]);

  const blowOne = () => {
    setLit((prev) => {
      const idx = prev.lastIndexOf(true);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = false;
      return next;
    });
  };

  const reset = () => {
    setLit(Array(CANDLE_COUNT).fill(true));
    setWished(false);
  };

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
        className="w-full sm:w-auto mx-auto mt-2 flex cursor-pointer items-center justify-center gap-3 rounded-2xl glass px-8 py-4 text-base font-semibold text-cream transition hover:bg-primary/20"
      >
        🍰 Make a Wish
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
              className="flex w-full max-w-xs flex-col items-center rounded-3xl glass p-5 sm:p-7 text-center overflow-y-auto"
              style={{ maxHeight: "90svh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {!wished ? (
                <>
                  <p className="text-[0.65rem] tracking-[0.4em] text-gold uppercase">
                    🍰 Make a Wish
                  </p>
                  <p className="mt-2 text-xs text-cream/60">Blow or tap the candles!</p>

                  {/* Cake visual */}
                  <div className="mt-5 flex flex-col items-center">
                    {/* Candles */}
                    <div className="flex gap-2 sm:gap-4 mb-1">
                      {lit.map((on, i) => (
                        <motion.button
                          key={i}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            blowOne();
                          }}
                          className="flex cursor-pointer flex-col items-center gap-0.5"
                          whileTap={{ scale: 0.9 }}
                          aria-label={on ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
                          title="Click to blow out"
                        >
                          <AnimatePresence>
                            {on && (
                              <motion.span
                                key="flame"
                                initial={{ scale: 0 }}
                                animate={{ scale: [1, 1.2, 0.9, 1.1, 1], y: [0, -2, 1, -1, 0] }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="text-base"
                              >
                                🔥
                              </motion.span>
                            )}
                          </AnimatePresence>
                          <div
                            className="w-2 rounded-t-full"
                            style={{
                              height: 22,
                              background: on
                                ? "linear-gradient(to top, oklch(0.5 0.1 30), oklch(0.85 0.07 8))"
                                : "oklch(0.5 0.05 30)",
                            }}
                          />
                        </motion.button>
                      ))}
                    </div>

                    {/* Cake tiers */}
                    <div
                      className="rounded-lg"
                      style={{
                        width: "min(192px, 72vw)",
                        height: 28,
                        background:
                          "linear-gradient(to right, oklch(0.62 0.19 14), oklch(0.85 0.07 8))",
                        boxShadow: "0 4px 20px -4px oklch(0.62 0.19 14 / 0.5)",
                      }}
                    />
                    <div
                      className="rounded-lg"
                      style={{
                        width: "min(224px, 84vw)",
                        height: 36,
                        marginTop: 2,
                        background:
                          "linear-gradient(to right, oklch(0.82 0.12 85), oklch(0.68 0.15 40))",
                      }}
                    />
                    <div
                      className="rounded-lg"
                      style={{
                        width: "min(256px, 90vw)",
                        height: 40,
                        marginTop: 2,
                        background:
                          "linear-gradient(to right, oklch(0.65 0.17 40), oklch(0.55 0.2 350))",
                      }}
                    />
                    <div className="mt-1 text-xs text-cream/40">
                      {lit.filter(Boolean).length} candle
                      {lit.filter(Boolean).length !== 1 ? "s" : ""} left
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={blowOne}
                    className="mt-5 cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground hover:brightness-110"
                  >
                    Blow 💨
                  </button>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <p className="text-4xl">🎉</p>
                  <p className="mt-4 text-[0.65rem] tracking-[0.4em] text-gold uppercase">
                    Wish Granted!
                  </p>
                  <p style={{ fontFamily: "var(--font-hand)" }} className="mt-3 text-xl text-cream">
                    Whatever you wished for... it's already coming 🌟
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-5 cursor-pointer rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground hover:brightness-110"
                  >
                    🥳 Yes!
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
