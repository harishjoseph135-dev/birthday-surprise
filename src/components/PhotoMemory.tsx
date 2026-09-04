import { motion } from "motion/react";

export function PhotoMemory({
  image,
  title,
  message,
}: {
  image: string;
  title: string;
  message: string;
}) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ rotate: -3, scale: 0.94, opacity: 0 }}
        animate={{ rotate: -1.5, scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mx-auto w-full max-w-sm rounded-xl bg-cream p-3 pb-10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
      >
        <div className="overflow-hidden rounded-md">
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />
        </div>
        <p style={{ fontFamily: "var(--font-hand)" }} className="mt-3 text-xl text-wine">
          {title}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mx-auto mt-6 max-w-md text-pretty text-sm leading-relaxed text-cream/85 sm:text-base"
      >
        {message}
      </motion.p>

      <div className="mt-4 flex justify-center gap-3 text-primary">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, delay: i * 0.4, repeat: Infinity }}
          >
            🎈
          </motion.span>
        ))}
      </div>
    </div>
  );
}
