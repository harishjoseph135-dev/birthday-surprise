import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { celebrateBig } from "@/lib/celebrate";
import { playReveal, playSparkle } from "@/lib/sounds";

/* ─────────────────────────────────────────────────────
   DATE PLAN — edit these to customise the experience
───────────────────────────────────────────────────── */
const DATE_PLAN = {
  title: "Our Special Day ❤️",
  date: "Saturday, 13 September 2026",
  time: "6:00 PM",
  location: "The Rooftop Garden, Marina Bay",
  activities: [
    { time: "6:00 PM", icon: "🌅", label: "Golden hour walk along the waterfront" },
    { time: "7:30 PM", icon: "🍽️", label: "Candlelight dinner at our favourite spot" },
    { time: "9:00 PM", icon: "🎬", label: "Cozy movie under the stars" },
    { time: "10:30 PM", icon: "🌃", label: "Midnight desserts & city lights" },
  ],
  ending: "A night you'll never forget. ✨",
  // ICS event details
  icsStart: "20260913T180000",
  icsEnd: "20260913T230000",
  icsLocation: "The Rooftop Garden, Marina Bay",
  icsDescription: "A very special evening — just for the two of us. ❤️",
};

/* ── Generate a .ics calendar file ── */
function generateICS() {
  const uid = `date-${Date.now()}@birthday-surprise`;
  const now = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BirthdaySurprise//DateProposal//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=Asia/Kolkata:${DATE_PLAN.icsStart}`,
    `DTEND;TZID=Asia/Kolkata:${DATE_PLAN.icsEnd}`,
    `SUMMARY:${DATE_PLAN.title}`,
    `LOCATION:${DATE_PLAN.icsLocation}`,
    `DESCRIPTION:${DATE_PLAN.icsDescription}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT60M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder — your special date is in 1 hour! ❤️",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "our-date.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/* ── Floating hearts background ── */
function FloatingHearts() {
  const hearts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + ((i * 37) % 90)}%`,
    delay: (i * 0.4) % 7,
    dur: 7 + (i % 5),
    size: 12 + (i % 4) * 6,
    op: 0.12 + (i % 6) * 0.06,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-0 select-none"
          style={{
            left: h.left,
            fontSize: h.size,
            opacity: h.op,
            animation: `dateHeartFloat ${h.dur}s ease-in ${h.delay}s infinite`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}

/* ── Main component ── */
type Stage = "question" | "yes-burst" | "plan" | "confirmed";

export function DateProposal({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<Stage>("question");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMoves, setNoMoves] = useState(0);
  const noRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Inject keyframes once */
  useEffect(() => {
    if (document.getElementById("date-proposal-styles")) return;
    const style = document.createElement("style");
    style.id = "date-proposal-styles";
    style.textContent = `
      @keyframes dateHeartFloat {
        0%   { transform: translateY(0)   scale(0.8); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 0.6; }
        100% { transform: translateY(-110vh) scale(1.1); opacity: 0; }
      }
      @keyframes datePulse {
        0%,100% { box-shadow: 0 0 20px 4px rgba(233,30,99,0.4); }
        50%      { box-shadow: 0 0 50px 12px rgba(233,30,99,0.8); }
      }
      @keyframes dateSpin {
        to { transform: rotate(360deg); }
      }
      @keyframes dateShake {
        0%,100% { transform: translateX(0); }
        20%     { transform: translateX(-8px); }
        40%     { transform: translateX(8px); }
        60%     { transform: translateX(-5px); }
        80%     { transform: translateX(5px); }
      }
      @keyframes dateCardIn {
        from { opacity:0; transform: translateY(30px) scale(0.95); }
        to   { opacity:1; transform: translateY(0)    scale(1); }
      }
      @keyframes dateGlow {
        0%,100% { opacity:0.6; }
        50%     { opacity:1; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  /* Move NO button to a random spot on hover/touch */
  const escapeNo = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const maxX = rect.width - 140;
    const maxY = rect.height - 60;
    const nx = 20 + Math.random() * maxX;
    const ny = 20 + Math.random() * maxY;
    setNoPos({ x: nx, y: ny });
    setNoMoves((n) => n + 1);
  };

  const handleYes = () => {
    playSparkle();
    setStage("yes-burst");
    setTimeout(() => {
      playReveal();
      celebrateBig();
      setStage("plan");
    }, 2000);
    setTimeout(() => setStage("confirmed"), 5500);
  };

  /* NO button funny messages */
  const noLabels = [
    "NO 💔",
    "still no 😅",
    "nope 🙈",
    "run away 🏃",
    "not a chance 😂",
    "try yes instead 👀",
    "please no 😭",
    "absolutely not 🙅",
    "wrong button 😬",
    "stop it 😂",
  ];
  const noLabel = noLabels[Math.min(noMoves, noLabels.length - 1)]!;

  /* Glass card style */
  const glassCard = {
    background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  };

  /* Rose gradient button */
  const roseBtn = {
    background: "linear-gradient(135deg, #c2185b 0%, #e91e63 50%, #f06292 100%)",
    boxShadow: "0 4px 24px -4px rgba(233,30,99,0.7)",
    animation: "datePulse 2s ease-in-out infinite",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[85] flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 30% 40%, #2d0018 0%, #1a000d 40%, #0a0005 100%)",
      }}
    >
      {/* Floating hearts always visible */}
      <FloatingHearts />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/4 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full"
          style={{ background: "oklch(0.35 0.18 350 / 0.3)", filter: "blur(100px)" }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full"
          style={{ background: "oklch(0.62 0.19 14 / 0.2)", filter: "blur(90px)" }}
        />
      </div>

      {/* Close */}
      <motion.button
        type="button"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-5 right-5 z-10 rounded-full px-4 py-1.5 text-xs tracking-widest text-pink-200/50 uppercase hover:text-pink-200 transition"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        ✕ Close
      </motion.button>

      {/* ── STAGE: QUESTION ── */}
      <AnimatePresence mode="wait">
        {stage === "question" && (
          <motion.div
            key="question"
            ref={containerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-md flex-col items-center px-6 text-center"
            style={{ minHeight: 420 }}
          >
            {/* Beating heart */}
            <motion.div
              animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 text-6xl"
              style={{ filter: "drop-shadow(0 0 24px rgba(233,30,99,0.9))" }}
            >
              ❤️
            </motion.div>

            {/* Question */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl leading-snug text-white sm:text-4xl"
            >
              Will you go on a
              <span
                className="block mt-1"
                style={{
                  background: "linear-gradient(90deg, #f48fb1, #e91e63, #f48fb1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                date with me? 🌹
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ fontFamily: "var(--font-hand)" }}
              className="mt-3 text-lg text-pink-200/70"
            >
              I promise it'll be unforgettable...
            </motion.p>

            {/* YES button */}
            <motion.button
              type="button"
              onClick={handleYes}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 rounded-full px-12 py-4 text-lg font-semibold text-white"
              style={roseBtn}
            >
              YES ❤️
            </motion.button>

            {/* NO button — floats to a random position */}
            <motion.button
              ref={noRef}
              type="button"
              onMouseEnter={escapeNo}
              onTouchStart={escapeNo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="absolute rounded-full px-6 py-2.5 text-sm text-pink-300/60 transition"
              style={{
                left: noPos.x || "50%",
                top: noPos.y || "82%",
                transform: noPos.x ? "none" : "translateX(-50%)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "left 0.18s ease, top 0.18s ease",
                userSelect: "none",
                cursor: "default",
              }}
            >
              {noLabel}
            </motion.button>
          </motion.div>
        )}

        {/* ── STAGE: YES BURST ── */}
        {stage === "yes-burst" && (
          <motion.div
            key="yes-burst"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="flex flex-col items-center gap-5 text-center px-6"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 0.9, 1.2, 1], rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-7xl"
              style={{ filter: "drop-shadow(0 0 40px rgba(233,30,99,1))" }}
            >
              ❤️
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl text-white sm:text-5xl"
            >
              She said YES! 🎉
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontFamily: "var(--font-hand)" }}
              className="text-xl text-pink-200/80"
            >
              Preparing your perfect date...
            </motion.p>

            {/* Loading dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-pink-400"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── STAGE: DATE PLAN ── */}
        {(stage === "plan" || stage === "confirmed") && (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg px-4 py-6 overflow-y-auto"
            style={{ maxHeight: "92svh" }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-5xl mb-3"
              >
                💑
              </motion.div>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="text-2xl text-white sm:text-3xl"
              >
                It's a Date! ❤️
              </h2>
              <p
                style={{ fontFamily: "var(--font-hand)" }}
                className="mt-1 text-pink-300/70 text-lg"
              >
                Your perfect evening, all planned out.
              </p>
            </div>

            {/* Main card */}
            <div className="rounded-3xl p-5 mb-4" style={glassCard as CSSProperties}>
              {/* Date & time */}
              <div
                className="flex items-center gap-3 mb-4 pb-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-2xl">📅</span>
                <div>
                  <p className="text-xs tracking-[0.3em] text-pink-300/60 uppercase">When</p>
                  <p className="text-white font-medium">{DATE_PLAN.date}</p>
                  <p className="text-pink-200/70 text-sm">{DATE_PLAN.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs tracking-[0.3em] text-pink-300/60 uppercase">Where</p>
                  <p className="text-white font-medium">{DATE_PLAN.location}</p>
                </div>
              </div>

              {/* Timeline */}
              <p className="text-xs tracking-[0.3em] text-pink-300/60 uppercase mb-3">The Plan</p>
              <div className="space-y-3">
                {DATE_PLAN.activities.map((act, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <span className="text-xl">{act.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm leading-snug">{act.label}</p>
                    </div>
                    <span className="text-xs text-pink-300/50 shrink-0">{act.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Romantic ending */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="rounded-3xl p-5 mb-4 text-center"
              style={glassCard}
            >
              <p className="text-2xl mb-2">🌙</p>
              <p
                style={{ fontFamily: "var(--font-hand)" }}
                className="text-lg leading-relaxed text-pink-100/90"
              >
                {DATE_PLAN.ending}
              </p>
            </motion.div>

            {/* Confirmed message */}
            <AnimatePresence>
              {stage === "confirmed" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 280 }}
                  className="rounded-3xl p-5 mb-5 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(233,30,99,0.2), rgba(194,24,91,0.15))",
                    border: "1px solid rgba(233,30,99,0.35)",
                    animation: "dateGlow 2s ease-in-out infinite",
                  }}
                >
                  <p className="text-3xl mb-2">🥂</p>
                  <p style={{ fontFamily: "var(--font-display)" }} className="text-xl text-white">
                    It's a Date! ❤️
                  </p>
                  <p className="mt-1 text-sm text-pink-200/60">
                    Mark your calendar — this one's official.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col gap-3"
            >
              {/* Add to Calendar */}
              <button
                type="button"
                onClick={generateICS}
                className="w-full rounded-full py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={roseBtn as CSSProperties}
              >
                📅 Add to Calendar
              </button>

              {/* More confetti */}
              <button
                type="button"
                onClick={() => celebrateBig()}
                className="w-full rounded-full py-3 text-sm text-pink-300/70 flex items-center justify-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                🎉 Celebrate!
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full py-3 text-sm text-pink-200/40 hover:text-pink-200/70 transition"
              >
                Back ←
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
