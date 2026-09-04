import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type VaultPhoto = {
  src: string;
  caption: string;
  date?: string;
  location?: string;
};

const TILTS = [-5, 3, -2, 6, -4, 2, -3, 5, -1, 4];

export function MemoryVault({
  title,
  subtitle,
  images,
}: {
  title: string;
  subtitle?: string;
  images: VaultPhoto[];
}) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const step = (dir: number) =>
    setActive((cur) => (cur === null ? cur : (cur + dir + images.length) % images.length));

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[0.65rem] tracking-[0.45em] text-gold uppercase">🔐 {title}</p>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground italic">{subtitle}</p>}
      </motion.div>

      {/* Polaroid grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
        {images.map((img, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 28, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: TILTS[i % TILTS.length]! }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
            transition={{ delay: i * 0.09, duration: 0.6 }}
            className="cursor-pointer rounded-lg bg-cream p-2 pb-8 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.75)]"
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
            {/* Handwritten caption */}
            <p
              style={{ fontFamily: "var(--font-hand)" }}
              className="mt-2 block truncate text-sm text-wine"
            >
              {img.caption}
            </p>
            {img.date && <p className="mt-0.5 text-[0.55rem] text-wine/50">{img.date}</p>}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[oklch(0.07_0.03_10)]/95 p-4 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close photo"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-secondary/80 text-cream hover:bg-primary/60 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Photo */}
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.88, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl bg-cream p-3 pb-10 shadow-2xl"
            >
              <img
                src={images[active]!.src}
                alt={images[active]!.caption}
                className="max-h-[55svh] w-auto max-w-[85vw] rounded-md object-contain"
              />
              <p
                style={{ fontFamily: "var(--font-hand)" }}
                className="mt-3 text-center text-lg text-wine"
              >
                {images[active]!.caption}
              </p>
              {(images[active]!.date || images[active]!.location) && (
                <p className="mt-1 text-center text-xs text-wine/50">
                  {[images[active]!.date, images[active]!.location].filter(Boolean).join(" · ")}
                </p>
              )}
            </motion.div>

            {/* Navigation */}
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="grid h-12 w-12 place-items-center rounded-full glass text-cream hover:bg-primary/40 transition"
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
                className="grid h-12 w-12 place-items-center rounded-full glass text-cream hover:bg-primary/40 transition"
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
