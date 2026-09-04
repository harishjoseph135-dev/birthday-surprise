import { motion } from "motion/react";

export type RoastStat = { label: string; pct: number };

export function RoastCard({
  name,
  title,
  stats,
  verdict,
}: {
  name: string;
  title: string;
  stats: RoastStat[];
  verdict: string;
}) {
  return (
    <div className="text-center">
      {/* Header badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-red-700/50 bg-red-950/40 px-4 py-1.5"
      >
        <span className="text-[0.55rem] tracking-[0.4em] text-red-400 uppercase">
          😂 {title}
        </span>
      </motion.div>

      {/* File card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-5 max-w-sm rounded-2xl bg-[oklch(0.11_0.04_10)] p-5 text-left ring-1 ring-red-800/40 shadow-xl"
      >
        {/* Subject line */}
        <div className="mb-4 flex items-center justify-between border-b border-red-900/40 pb-3">
          <span className="text-[0.6rem] tracking-widest text-red-500 uppercase font-mono">
            Official Report
          </span>
          <span className="text-[0.55rem] text-red-800/60 font-mono">CONFIDENTIAL</span>
        </div>

        <p className="mb-1 font-mono text-[0.65rem] text-red-400/80 uppercase tracking-wider">Subject:</p>
        <p
          style={{ fontFamily: "var(--font-hand)" }}
          className="mb-4 text-xl text-blush"
        >
          {name}
        </p>

        {/* Stats bars */}
        <div className="space-y-3">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[0.65rem] text-cream/70 font-mono">{s.label}</span>
                <span className="text-[0.6rem] tabular-nums text-red-400/80 font-mono">{s.pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      s.pct >= 90
                        ? "oklch(0.62 0.19 14)"
                        : s.pct >= 60
                        ? "oklch(0.78 0.14 75)"
                        : "oklch(0.55 0.12 220)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.pct}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verdict */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + stats.length * 0.1 + 0.4, duration: 0.7 }}
          className="mt-5 rounded-xl border border-dashed border-red-800/40 p-3 text-center"
        >
          <p className="text-[0.6rem] tracking-[0.3em] text-red-400 uppercase font-mono mb-1">
            Final Verdict
          </p>
          <p style={{ fontFamily: "var(--font-hand)" }} className="text-base leading-snug text-cream/90">
            {verdict}
          </p>
        </motion.div>

        {/* Stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{ delay: 0.4 + stats.length * 0.1 + 0.8, type: "spring", stiffness: 300 }}
          className="mt-4 flex justify-end"
        >
          <span className="rounded border-2 border-green-500/70 px-3 py-1 text-[0.65rem] font-bold tracking-widest text-green-400/80 uppercase font-mono">
            ✅ Approved
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
