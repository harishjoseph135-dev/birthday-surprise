import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function BirthdayTicket({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="mx-auto mt-2 flex cursor-pointer items-center gap-2 rounded-full glass px-5 py-2.5 text-sm text-cream transition hover:bg-primary/20"
      >
        🎟️ Birthday Ticket
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
              initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="w-full max-w-xs"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ticket body */}
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, oklch(0.18 0.08 12), oklch(0.12 0.06 10))",
                  border: "1px solid oklch(0.82 0.12 85 / 0.4)",
                  boxShadow: "0 0 60px -15px oklch(0.82 0.12 85 / 0.5)",
                }}
              >
                {/* Top stripe */}
                <div
                  className="h-2 w-full"
                  style={{ background: "linear-gradient(90deg, oklch(0.62 0.19 14), oklch(0.82 0.12 85), oklch(0.62 0.19 14))" }}
                />

                <div className="px-6 py-6 text-center">
                  <p className="text-[0.6rem] tracking-[0.5em] text-gold uppercase">Official Document</p>
                  <p className="mt-2 text-2xl">🎂</p>
                  <p
                    style={{ fontFamily: "var(--font-display)" }}
                    className="mt-2 text-lg tracking-[0.15em] text-cream uppercase"
                  >
                    Birthday Pass
                  </p>
                  <p className="mt-1 text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                    Admit One
                  </p>

                  {/* Dashed separator */}
                  <div className="my-4 border-t border-dashed border-cream/20" />

                  <p
                    style={{ fontFamily: "var(--font-hand)" }}
                    className="text-2xl text-blush"
                  >
                    {name}
                  </p>

                  <div className="mt-4 space-y-1 text-[0.65rem] text-cream/60">
                    <p><span className="text-gold">STATUS:</span> Birthday Legend</p>
                    <p><span className="text-gold">VALID:</span> Forever</p>
                    <p><span className="text-gold">CLASS:</span> Best Friend Tier</p>
                  </div>

                  {/* QR decorative */}
                  <div className="mx-auto mt-5 grid h-14 w-14 grid-cols-4 grid-rows-4 gap-0.5 opacity-40">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-[2px]"
                        style={{
                          background: [0,1,4,5,2,7,10,13,15,11,14,3].includes(i)
                            ? "oklch(0.82 0.12 85)"
                            : "transparent",
                        }}
                      />
                    ))}
                  </div>

                  <div className="my-4 border-t border-dashed border-cream/20" />
                  <p className="text-[0.55rem] tracking-widest text-muted-foreground uppercase">
                    🎉 Have the best day ever 🎉
                  </p>
                </div>

                {/* Bottom stripe */}
                <div
                  className="h-2 w-full"
                  style={{ background: "linear-gradient(90deg, oklch(0.62 0.19 14), oklch(0.82 0.12 85), oklch(0.62 0.19 14))" }}
                />
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-4 w-full cursor-pointer rounded-full bg-primary py-2.5 text-sm text-primary-foreground hover:brightness-110"
              >
                Keep this forever 🎂
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
