import { motion } from "motion/react";

export function MemoryCard({
  title,
  image,
  date,
  caption,
  onNext,
}: {
  title: string;
  image: string;
  date: string;
  caption: string;
  onNext?: () => void;
}) {
  return (
    <div className="text-center">
      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[0.65rem] tracking-[0.45em] text-gold uppercase"
      >
        📸 {title}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-1 text-xs text-muted-foreground"
      >
        Okay... let's start with a memory.
      </motion.p>

      {/* Polaroid photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, rotate: -4, y: 30 }}
        animate={{ opacity: 1, scale: 1, rotate: -1.5, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-7 w-full max-w-[280px] rounded-xl bg-cream p-3 pb-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.75)]"
        style={{ maxWidth: "min(280px, calc(100vw - 3rem))" }}
      >
        {/* Film strip dots */}
        <div className="mb-2 flex justify-between px-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-gray-300/60" />
          ))}
        </div>

        <div className="overflow-hidden rounded-md">
          <motion.img
            src={image}
            alt={caption}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
            initial={{ scale: 1.14, filter: "blur(6px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.8, ease: "easeOut" }}
          />
        </div>

        {/* Date stamp */}
        <div className="absolute right-4 top-5 rotate-12 rounded bg-gold/90 px-2 py-0.5 text-[0.55rem] font-bold tracking-wider text-wine shadow">
          {date}
        </div>

        {/* Caption */}
        <p
          style={{ fontFamily: "var(--font-hand)" }}
          className="mt-3 text-center text-lg leading-snug text-wine"
        >
          {caption}
        </p>
      </motion.div>

      {/* Floating balloons */}
      <div className="mt-5 flex justify-center gap-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, delay: i * 0.4, repeat: Infinity }}
            className="text-primary"
          >
            🎈
          </motion.span>
        ))}
      </div>

      {/* Next button */}
      {onNext && (
        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-5 cursor-pointer rounded-full glass px-6 py-2.5 text-xs tracking-[0.2em] text-cream uppercase transition hover:bg-primary/30"
        >
          Next Memory →
        </motion.button>
      )}
    </div>
  );
}
