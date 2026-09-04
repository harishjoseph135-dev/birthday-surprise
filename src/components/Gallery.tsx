import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Item = { src: string; caption: string };
const TILTS = [-4, 3, -2.5, 5, -3.5, 2];

export function Gallery({ title, images }: { title: string; images: Item[] }) {
  const [active, setActive] = useState<number | null>(null);

  const step = (dir: number) =>
    setActive((cur) => (cur === null ? cur : (cur + dir + images.length) % images.length));

  return (
    <div className="text-center">
      <p className="text-[0.7rem] tracking-[0.35em] text-gold uppercase">{title}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
        {images.map((img, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: TILTS[i % TILTS.length]! }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 2 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="cursor-pointer rounded-lg bg-cream p-2 pb-6 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.7)]"
            aria-label={`Open photo: ${img.caption}`}
          >
            <img
              src={img.src}
              alt={img.caption}
              loading="lazy"
              width={1024}
              height={1024}
              className="aspect-square w-full rounded-sm object-cover"
            />
            <span
              style={{ fontFamily: "var(--font-hand)" }}
              className="mt-2 block truncate text-base text-wine"
            >
              {img.caption}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-wine/90 p-4 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close photo"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-secondary/80 text-cream"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.img
              key={active}
              src={images[active]!.src}
              alt={images[active]!.caption}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[62svh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <p style={{ fontFamily: "var(--font-hand)" }} className="mt-5 text-2xl text-cream">
              {images[active]!.caption}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="grid h-12 w-12 place-items-center rounded-full glass text-cream hover:bg-primary/40"
              >
                <ChevronLeft />
              </button>
              <span className="text-xs tracking-[0.25em] text-muted-foreground">
                {active + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="grid h-12 w-12 place-items-center rounded-full glass text-cream hover:bg-primary/40"
              >
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
