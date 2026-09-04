import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { celebrate } from "@/lib/celebrate";
import { playError, playPop, playUnlock } from "@/lib/sounds";
import { Countdown } from "@/components/Countdown";
import { birthdayConfig } from "@/config/birthdayConfig";

const LEN = 6;

export function PinLock({ pin, hint, onUnlock }: { pin: string; hint?: string; onUnlock: () => void }) {
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const value = digits.join("");

  useEffect(() => {
    if (value.length === LEN && !digits.includes("") && !unlocked) {
      if (value === pin) {
        setUnlocked(true);
        playUnlock();
        celebrate({ count: 130, power: 11 });
        setTimeout(onUnlock, 1900);
      } else {
        setError(true);
        playError();
        setTimeout(() => {
          setError(false);
          setDigits(Array(LEN).fill(""));
          refs.current[0]?.focus();
        }, 900);
      }
    }
  }, [value, digits, pin, unlocked, onUnlock]);

  const setAt = (i: number, char: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[i] = char;
      return next;
    });
  };

  const handleChange = (i: number, raw: string) => {
    const chars = raw.replace(/\D/g, "");
    if (!chars) return;
    if (chars.length > 1) {
      setDigits((prev) => {
        const next = [...prev];
        chars.split("").slice(0, LEN - i).forEach((c, k) => (next[i + k] = c));
        return next;
      });
      refs.current[Math.min(LEN - 1, i + chars.length)]?.focus();
      return;
    }
    playPop();
    setAt(i, chars);
    refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i]) setAt(i, "");
      else if (i > 0) {
        setAt(i - 1, "");
        refs.current[i - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft") refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight") refs.current[i + 1]?.focus();
  };

  return (
    <motion.div
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-5 py-14 text-center"
      animate={unlocked ? { scale: 1.12, opacity: 0, filter: "blur(10px)" } : { scale: 1, opacity: 1 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9 }}
        className="text-sm tracking-[0.35em] text-gold uppercase"
      >
        ✨ A Little Surprise For You ✨
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.5, duration: 1.1 }}
        style={{ fontFamily: "var(--font-display)" }}
        className="mt-6 max-w-xl text-balance text-3xl leading-tight text-cream sm:text-5xl"
      >
        Someone special left something here for you…
      </motion.h1>

      {/* Countdown — visible on the PIN page */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="mt-8 w-full max-w-lg"
      >
        <Countdown date={birthdayConfig.birthdayDate} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={unlocked ? { scale: [1, 1.35, 1.1], rotate: [0, -8, 0] } : { opacity: 1, scale: 1 }}
        transition={{ delay: unlocked ? 0 : 0.9, duration: unlocked ? 1.2 : 0.8 }}
        className="relative mt-10 grid h-20 w-20 place-items-center rounded-full glass"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: unlocked ? "0 0 90px 10px oklch(0.82 0.12 85 / 0.6)" : "var(--shadow-glow)" }}
        />
        {unlocked ? (
          <Unlock className="h-8 w-8 text-gold" />
        ) : (
          <Lock className="h-8 w-8 text-blush" />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="mt-10 w-full max-w-md"
      >
        <div
          className="flex items-center justify-center gap-2 sm:gap-3"
          style={error ? { animation: "shake-x 0.5s ease" } : undefined}
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              inputMode="numeric"
              autoComplete="one-time-code"
              aria-label={`PIN digit ${i + 1}`}
              maxLength={LEN}
              className={`h-13 w-11 rounded-full glass text-center text-xl font-semibold text-cream outline-none transition-all duration-300 focus:scale-110 focus:ring-2 focus:ring-gold sm:h-16 sm:w-14 sm:text-2xl ${
                error ? "ring-2 ring-destructive" : ""
              }`}
              style={{ height: "3.25rem" }}
            />
          ))}
        </div>

        <div className="mt-5 min-h-6">
          {error ? (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-blush"
            >
              Hmm… that&apos;s not it 🎈 Try again.
            </motion.p>
          ) : unlocked ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gold">
              Unlocking your surprise…
            </motion.p>
          ) : (
            hint && <p className="text-xs text-muted-foreground">{hint}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
