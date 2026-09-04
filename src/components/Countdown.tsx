import { motion } from "motion/react";
import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    done: ms === 0,
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [t, setT] = useState(() => diff(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto w-full max-w-2xl rounded-3xl glass px-6 py-8 text-center"
      >
        <p
          style={{ fontFamily: "var(--font-display)" }}
          className="text-2xl text-gold sm:text-4xl"
        >
          🎉 IT&apos;S YOUR SPECIAL DAY! 🎉
        </p>
      </motion.div>
    );
  }

  const cells = [
    { v: t.days, l: "Days" },
    { v: t.hours, l: "Hours" },
    { v: t.minutes, l: "Mins" },
    { v: t.seconds, l: "Secs" },
  ];

  return (
    <div className="w-full">
      <p className="text-center text-[0.7rem] tracking-[0.4em] text-gold uppercase sm:text-xs">
        Birthday Countdown
      </p>
      <div className="mx-auto mt-4 grid max-w-2xl grid-cols-4 gap-2 sm:gap-4">
        {cells.map((c) => (
          <div
            key={c.l}
            className="rounded-2xl glass px-1 py-3 text-center sm:px-3 sm:py-5"
          >
            <div
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl tabular-nums text-cream sm:text-4xl"
            >
              {mounted ? String(c.v).padStart(2, "0") : "--"}
            </div>
            <div className="mt-1 text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase sm:text-[0.7rem]">
              {c.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
