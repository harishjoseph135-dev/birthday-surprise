import { motion } from "motion/react";
import { useState } from "react";
import { playSparkle } from "@/lib/sounds";

export function FriendshipLetter({
  title,
  message,
  closing,
}: {
  title: string;
  message: string;
  closing?: string;
}) {
  const [open, setOpen] = useState(false);

  const paragraphs = message.split("\n\n").filter(Boolean);

  return (
    <div className="text-center">
      <p className="text-[0.65rem] tracking-[0.45em] text-gold uppercase">💌 {title}</p>

      {!open ? (
        /* Envelope closed state */
        <motion.button
          type="button"
          onClick={() => { setOpen(true); playSparkle(); }}
          whileHover={{ scale: 1.04, y: -6 }}
          whileTap={{ scale: 0.97 }}
          className="mx-auto mt-8 block w-full max-w-xs cursor-pointer"
          aria-label="Open the birthday message"
        >
          {/* Envelope */}
          <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-xl bg-blush/80 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.7)]">
            {/* Envelope flap */}
            <div
              className="absolute inset-x-0 top-0 h-1/2 origin-top"
              style={{
                background: "oklch(0.75 0.1 8)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
            {/* Bottom flaps */}
            <div
              className="absolute bottom-0 left-0 h-1/2 w-1/2"
              style={{
                background: "oklch(0.80 0.09 8)",
                clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 h-1/2 w-1/2"
              style={{
                background: "oklch(0.78 0.09 8)",
                clipPath: "polygon(0 100%, 100% 100%, 0 0)",
              }}
            />
            {/* Seal */}
            <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-cream shadow-lg text-lg">
              💌
            </div>
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 text-xs tracking-[0.25em] text-muted-foreground uppercase"
          >
            Tap to open
          </motion.p>
        </motion.button>
      ) : (
        /* Letter open state */
        <motion.div
          initial={{ rotateX: -90, opacity: 0, y: 40 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1000 }}
          className="mx-auto mt-6 max-w-lg"
        >
          {/* Paper texture card */}
          <div className="rounded-2xl bg-cream px-6 py-7 text-left shadow-[0_30px_60px_-15px_rgba(0,0,0,0.75)] sm:px-9">
            {/* Intro line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ fontFamily: "var(--font-hand)" }}
              className="mb-5 text-sm italic text-wine/60"
            >
              Okay, no jokes for the next 30 seconds...
            </motion.p>

            {/* Message paragraphs — line by line reveal */}
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.5, duration: 0.8 }}
                style={{ fontFamily: "var(--font-hand)" }}
                className="mb-4 text-lg leading-relaxed text-wine sm:text-xl"
              >
                {para}
              </motion.p>
            ))}

            {/* Closing line */}
            {closing && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + paragraphs.length * 0.5 + 0.3, duration: 0.7 }}
                style={{ fontFamily: "var(--font-hand)" }}
                className="mt-5 border-t border-wine/15 pt-4 text-sm italic text-wine/60"
              >
                {closing}
              </motion.p>
            )}
          </div>

          {/* Wax seal decoration */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 280 }}
            className="mx-auto -mt-4 grid h-9 w-9 place-items-center rounded-full bg-primary text-sm shadow-lg"
          >
            💌
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
