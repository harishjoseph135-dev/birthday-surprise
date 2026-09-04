import { motion } from "motion/react";
import { useState } from "react";
import { playSparkle } from "@/lib/sounds";

export function LoveLetter({ title, message }: { title: string; message: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center">
      <p className="text-[0.7rem] tracking-[0.35em] text-gold uppercase">{title}</p>

      {!open ? (
        <motion.button
          type="button"
          onClick={() => {
            setOpen(true);
            playSparkle();
          }}
          whileHover={{ scale: 1.04, y: -6 }}
          whileTap={{ scale: 0.97 }}
          className="mx-auto mt-8 block w-full max-w-xs cursor-pointer"
          aria-label="Open the birthday message"
        >
          <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-lg bg-blush shadow-[0_25px_50px_-20px_rgba(0,0,0,0.7)]">
            <div
              className="absolute inset-x-0 top-0 h-1/2 origin-top"
              style={{
                background: "oklch(0.78 0.09 8)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
            <div className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-cream shadow-lg">
              ❤
            </div>
          </div>
          <span className="mt-4 block text-xs tracking-[0.25em] text-muted-foreground uppercase">
            Tap to open
          </span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ rotateX: -90, opacity: 0, y: 40 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1000 }}
          className="mx-auto mt-8 max-w-lg rounded-xl bg-cream px-5 py-8 text-left shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] sm:px-10"
        >
          {message.split("\n\n").map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.45, duration: 0.8 }}
              style={{ fontFamily: "var(--font-hand)" }}
              className="mb-4 text-xl leading-relaxed text-wine sm:text-2xl"
            >
              {para}
            </motion.p>
          ))}
        </motion.div>
      )}
    </div>
  );
}
