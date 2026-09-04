import { AnimatePresence, motion } from "motion/react";
import { useState, useRef, useCallback } from "react";
import { celebrate, celebrateBig } from "@/lib/celebrate";

/* ─── Floating particles ─── */
function Particles() {
  const items = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      left: 3 + ((i * 41) % 94),
      delay: (i * 0.6) % 9,
      dur: 7 + ((i * 1.4) % 8),
      char: ["✨", "⭐", "🌸", "💫", "🎉", "🌟"][i % 6]!,
      size: 10 + ((i * 5) % 12),
      op: 0.12 + ((i * 0.06) % 0.22),
    })),
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.current.map((p, i) => (
        <span
          key={i}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            bottom: -30,
            fontSize: p.size,
            opacity: p.op,
            animation: `float-up ${p.dur}s linear ${p.delay}s infinite`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}

/* ─── SVG Bestie Dolls ─── */
type Pose = "wave" | "coffee" | "movie" | "walk" | "selfie" | "highfive" | "confetti";

function BestieDolls({ pose }: { pose: Pose }) {
  const HAIR_L = "oklch(0.3 0.08 30)";
  const HAIR_R = "oklch(0.25 0.1 280)";
  const SKIN = "oklch(0.82 0.06 55)";
  const DRESS_L = "oklch(0.62 0.19 14)";
  const DRESS_R = "oklch(0.65 0.18 280)";
  const SMILE = "#c2185b";

  return (
    <div className="flex items-end justify-center gap-2 select-none">
      {/* Left doll */}
      <motion.svg
        width="62"
        height="88"
        viewBox="0 0 64 90"
        animate={
          pose === "wave"
            ? { rotate: [0, -4, 4, -2, 0] }
            : pose === "confetti"
              ? { y: [0, -8, 0, -6, 0] }
              : pose === "highfive"
                ? { y: [0, -4, 0] }
                : {}
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="32" cy="72" rx="14" ry="16" fill={DRESS_L} />
        <circle cx="32" cy="32" r="17" fill={SKIN} />
        <ellipse cx="32" cy="20" rx="17" ry="10" fill={HAIR_L} />
        <ellipse cx="18" cy="30" rx="6" ry="12" fill={HAIR_L} />
        <ellipse cx="46" cy="28" rx="5" ry="10" fill={HAIR_L} />
        <circle cx="26" cy="31" r="2.5" fill="#333" />
        <circle cx="38" cy="31" r="2.5" fill="#333" />
        <circle cx="27" cy="30" r="0.8" fill="white" />
        <circle cx="39" cy="30" r="0.8" fill="white" />
        <path
          d="M27 38 Q32 43 37 38"
          stroke={SMILE}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="22" cy="36" rx="4" ry="2.5" fill="#f48fb1" opacity="0.5" />
        <ellipse cx="42" cy="36" rx="4" ry="2.5" fill="#f48fb1" opacity="0.5" />
        {/* Left arm poses */}
        {pose === "wave" && (
          <line
            x1="18"
            y1="58"
            x2="6"
            y2="44"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {pose === "coffee" && (
          <path
            d="M18 60 Q10 55 14 48"
            stroke={SKIN}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        )}
        {pose === "movie" && (
          <line
            x1="18"
            y1="60"
            x2="10"
            y2="52"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {pose === "walk" && (
          <line
            x1="18"
            y1="58"
            x2="8"
            y2="50"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {pose === "selfie" && (
          <line
            x1="18"
            y1="56"
            x2="4"
            y2="40"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {pose === "highfive" && (
          <line
            x1="18"
            y1="56"
            x2="30"
            y2="42"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {pose === "confetti" && (
          <line
            x1="18"
            y1="58"
            x2="10"
            y2="46"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        <line x1="46" y1="62" x2="54" y2="72" stroke={SKIN} strokeWidth="4" strokeLinecap="round" />
        <line
          x1="26"
          y1="86"
          x2="22"
          y2="90"
          stroke={HAIR_L}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="38"
          y1="86"
          x2="42"
          y2="90"
          stroke={HAIR_L}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {pose === "coffee" && (
          <g>
            <rect
              x="4"
              y="44"
              width="10"
              height="8"
              rx="2"
              fill="#fff8e1"
              stroke="#d4a520"
              strokeWidth="1"
            />
            <path d="M14 46 Q17 48 14 50" stroke="#d4a520" strokeWidth="1.2" fill="none" />
          </g>
        )}
        {pose === "confetti" && (
          <>
            <circle cx="12" cy="20" r="3" fill="oklch(0.82 0.12 85)" opacity="0.8" />
            <circle cx="6" cy="30" r="2" fill="oklch(0.62 0.19 14)" opacity="0.7" />
          </>
        )}
      </motion.svg>

      {/* Centre prop */}
      {pose === "highfive" && (
        <motion.span
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-2xl mb-8"
        >
          👋
        </motion.span>
      )}
      {pose === "movie" && <span className="text-3xl mb-6">🍿</span>}
      {pose === "walk" && <span className="text-2xl mb-4">🌟</span>}

      {/* Right doll */}
      <motion.svg
        width="62"
        height="88"
        viewBox="0 0 64 90"
        animate={
          pose === "wave"
            ? { rotate: [0, 4, -4, 2, 0] }
            : pose === "confetti"
              ? { y: [0, -6, 0, -9, 0] }
              : pose === "highfive"
                ? { y: [0, -4, 0] }
                : {}
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        <ellipse cx="32" cy="72" rx="14" ry="16" fill={DRESS_R} />
        <circle cx="32" cy="32" r="17" fill={SKIN} />
        <ellipse cx="32" cy="18" rx="17" ry="9" fill={HAIR_R} />
        <ellipse cx="46" cy="26" rx="5" ry="10" fill={HAIR_R} />
        <circle cx="46" cy="17" r="6" fill={HAIR_R} />
        <circle cx="26" cy="31" r="2.5" fill="#333" />
        <circle cx="38" cy="31" r="2.5" fill="#333" />
        <circle cx="27" cy="30" r="0.8" fill="white" />
        <circle cx="39" cy="30" r="0.8" fill="white" />
        <path
          d="M26 37 Q32 44 38 37"
          stroke={SMILE}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="22" cy="36" rx="4" ry="2.5" fill="#f48fb1" opacity="0.5" />
        <ellipse cx="42" cy="36" rx="4" ry="2.5" fill="#f48fb1" opacity="0.5" />
        {/* Right arm poses */}
        {pose === "wave" && (
          <line
            x1="46"
            y1="58"
            x2="58"
            y2="44"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {pose === "coffee" && (
          <path
            d="M46 60 Q54 55 50 48"
            stroke={SKIN}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        )}
        {pose === "movie" && (
          <line
            x1="46"
            y1="60"
            x2="54"
            y2="52"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {pose === "walk" && (
          <line
            x1="46"
            y1="58"
            x2="56"
            y2="50"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {pose === "selfie" && (
          <line
            x1="46"
            y1="60"
            x2="54"
            y2="54"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {pose === "highfive" && (
          <line
            x1="46"
            y1="56"
            x2="34"
            y2="42"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        {pose === "confetti" && (
          <line
            x1="46"
            y1="58"
            x2="56"
            y2="46"
            stroke={SKIN}
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        <line x1="18" y1="62" x2="10" y2="72" stroke={SKIN} strokeWidth="4" strokeLinecap="round" />
        <line
          x1="26"
          y1="86"
          x2="22"
          y2="90"
          stroke={HAIR_R}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="38"
          y1="86"
          x2="42"
          y2="90"
          stroke={HAIR_R}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {pose === "coffee" && (
          <g>
            <rect
              x="50"
              y="44"
              width="10"
              height="8"
              rx="2"
              fill="#fff8e1"
              stroke="#d4a520"
              strokeWidth="1"
            />
            <path d="M50 46 Q47 48 50 50" stroke="#d4a520" strokeWidth="1.2" fill="none" />
          </g>
        )}
        {pose === "confetti" && (
          <>
            <circle cx="52" cy="20" r="3" fill="oklch(0.82 0.12 85)" opacity="0.8" />
            <circle cx="58" cy="30" r="2" fill="oklch(0.62 0.19 14)" opacity="0.7" />
          </>
        )}
      </motion.svg>
    </div>
  );
}

/* ─── Step progress bar ─── */
function StepHeader({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full"
            animate={{ width: i < step ? 22 : i === step - 1 ? 28 : 10 }}
            style={{ background: i < step ? "oklch(0.62 0.19 14)" : "rgba(255,255,255,0.15)" }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
      <span className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
        {step} / {total}
      </span>
    </div>
  );
}

/* ─── Selectable card ─── */
function SelectCard({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer rounded-2xl px-4 py-3 text-left transition-all"
      style={{
        background: selected
          ? "linear-gradient(135deg,rgba(193,24,91,0.35),rgba(240,98,146,0.2))"
          : "rgba(255,255,255,0.06)",
        border: `1.5px solid ${selected ? "oklch(0.62 0.19 14)" : "rgba(255,255,255,0.1)"}`,
        backdropFilter: "blur(10px)",
        boxShadow: selected ? "0 0 18px -4px rgba(233,30,99,0.5)" : "none",
      }}
      aria-pressed={selected}
    >
      <span className="text-xl">{icon}</span>
      <span className="ml-2 text-sm font-medium text-cream">{label}</span>
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-2 text-xs text-primary"
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}

/* ─── .ics generator ─── */
function downloadIcs(day: string, activity: string, bring: string, extra: string, name: string) {
  const DATE_MAP: Record<string, string> = {
    Today: "20260911",
    Tomorrow: "20260912",
    Saturday: "20260912",
    Sunday: "20260913",
    Monday: "20260914",
    "Surprise me": "20260918",
  };
  const d = DATE_MAP[day] ?? "20260918";
  const uid = `bestie-${Date.now()}@birthday-surprise`;
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const desc = `Friend Hangout 👯\\nActivity: ${activity}\\nBringing: ${bring}\\nEnding: ${extra}\\nWith: ${name}`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BirthdaySurprise//BestiePlan//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${d}T170000`,
    `DTEND:${d}T230000`,
    `SUMMARY:Friend Day with ${name} 👯`,
    `LOCATION:TBD`,
    `DESCRIPTION:${desc}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "friend-day.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ─── Share ─── */
async function shareOrCopy(text: string) {
  try {
    if (navigator.share) await navigator.share({ title: "Friend Day 👯", text });
    else {
      await navigator.clipboard.writeText(text);
      alert("Copied! 🎉");
    }
  } catch {
    /* dismissed */
  }
}

/* ─── Runaway NO button ─── */
function RunawayNo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const LABELS = [
    "NO 💔",
    "Nope 🙅",
    "Never!",
    "Run! 🏃",
    "Catch me!",
    "Nah 😜",
    "Try again!",
    "Nuh-uh!",
  ];
  const flee = () => {
    setPos({ x: (Math.random() - 0.5) * 180, y: (Math.random() - 0.5) * 120 });
    setAttempts((a) => a + 1);
  };
  return (
    <motion.button
      type="button"
      onMouseEnter={flee}
      onTouchStart={flee}
      onClick={flee}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      whileTap={{ scale: 0.9 }}
      className="cursor-pointer select-none rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-cream/70"
      style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
    >
      {LABELS[attempts % LABELS.length]}
      {attempts > 3 && <span className="ml-1 text-[0.6rem] text-cream/40">({attempts}×)</span>}
    </motion.button>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
type Gate = "question" | "yes-anim" | "planner";

export function SayYes({ name }: { name: string }) {
  const [gate, setGate] = useState<Gate>("question");
  const [step, setStep] = useState(1);
  const [day, setDay] = useState("");
  const [activity, setActivity] = useState("");
  const [bring, setBring] = useState("");
  const [extra, setExtra] = useState("");
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadJpeg = useCallback(async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const el = ticketRef.current;

      // Clone and sanitize oklch colors (html2canvas doesn't support them)
      const clone = el.cloneNode(true) as HTMLElement;
      clone.style.position = "fixed";
      clone.style.top = "-9999px";
      clone.style.left = "-9999px";
      clone.style.transform = "none";
      clone.style.width = el.offsetWidth + "px";
      document.body.appendChild(clone);

      // Replace oklch in all inline styles recursively
      const sanitize = (node: HTMLElement) => {
        if (node.style) {
          const s = node.getAttribute("style") || "";
          if (s.includes("oklch")) {
            node.setAttribute(
              "style",
              s
                .replace(/oklch\(0\.78\s+0\.14\s+78[^)]*\)/g, "#c9a227")
                .replace(/oklch\(0\.82\s+0\.12\s+85[^)]*\)/g, "#d4a520")
                .replace(/oklch\(0\.62\s+0\.19\s+14[^)]*\)/g, "#e91e63")
                .replace(/oklch\([^)]*\)/g, "#ffffff"),
            );
          }
        }
        Array.from(node.children).forEach((c) => sanitize(c as HTMLElement));
      };
      sanitize(clone);

      await new Promise((r) => setTimeout(r, 120));

      const canvas = await html2canvas(clone, {
        backgroundColor: "#1a020d",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        foreignObjectRendering: false,
        removeContainer: false,
        imageTimeout: 8000,
      });

      document.body.removeChild(clone);

      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            alert("Could not generate image.");
            setDownloading(false);
            return;
          }
          const file = new File([blob], "friend-day-pass.jpg", { type: "image/jpeg" });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({ files: [file], title: "Friend Day Pass 👯" });
            } catch {
              triggerDownload(blob);
            }
          } else {
            triggerDownload(blob);
          }
          setDownloading(false);
        },
        "image/jpeg",
        0.95,
      );
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed — please try again.");
      setDownloading(false);
    }
  }, []);

  function triggerDownload(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "friend-day-pass.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const TOTAL = 6;

  const handleYes = () => {
    setGate("yes-anim");
    celebrate({ count: 130, power: 13 });
    setTimeout(() => {
      celebrateBig();
      setGate("planner");
    }, 2500);
  };

  const next = () => {
    if (step < TOTAL) {
      celebrate({ count: 40, power: 6 });
      setStep((s) => s + 1);
    }
  };
  const back = () => step > 1 && setStep((s) => s - 1);

  const STEP_POSE: Record<number, Pose> = {
    1: "wave",
    2: "coffee",
    3: "selfie",
    4: "highfive",
    5: "confetti",
    6: "confetti",
  };
  const ACT_POSE: Record<string, Pose> = {
    "☕ Coffee": "coffee",
    "🍽️ Dinner": "coffee",
    "🎬 Movie Night": "movie",
    "🌙 A Long Walk": "walk",
  };
  const currentPose: Pose =
    gate === "planner" && step === 2 && activity
      ? (ACT_POSE[activity] ?? STEP_POSE[step]!)
      : gate === "planner"
        ? STEP_POSE[step]!
        : "wave";

  return (
    <div className="relative w-full overflow-hidden">
      <Particles />

      <AnimatePresence mode="wait">
        {/* ── GATE: question ── */}
        {gate === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-6 px-2 py-8 text-center"
          >
            {/* Floating hearts */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute select-none text-primary/35"
                  style={{ left: `${8 + i * 9}%`, bottom: -20, fontSize: 12 + (i % 4) * 4 }}
                  animate={{ y: [0, -(110 + i * 18)], opacity: [0, 0.6, 0] }}
                  transition={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut",
                  }}
                >
                  💕
                </motion.span>
              ))}
            </div>

            {/* Bestie dolls waving */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <BestieDolls pose="wave" />
            </motion.div>

            {/* Question */}
            <div>
              <p className="text-[0.65rem] tracking-[0.45em] text-gold uppercase">
                ✨ A Special Question
              </p>
              <h2
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-3 text-2xl leading-snug text-cream sm:text-3xl"
              >
                Hey {name}... 👀
              </h2>
              <motion.p
                style={{ fontFamily: "var(--font-hand)" }}
                className="mt-2 text-xl leading-relaxed text-blush sm:text-2xl"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                Will you go on a date with me? 🌹
              </motion.p>
              <p className="mt-2 text-xs text-cream/40">(There is only one correct answer here.)</p>
            </div>

            {/* YES / NO */}
            <div className="mt-2 flex items-center justify-center gap-8">
              <motion.button
                type="button"
                onClick={handleYes}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer rounded-full px-9 py-4 text-base font-bold text-white"
                style={{
                  background: "linear-gradient(135deg,#c2185b,#e91e63,#f06292)",
                  boxShadow: "0 0 35px -6px rgba(233,30,99,0.9)",
                }}
              >
                YES ❤️
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(233,30,99,0.3)" }}
                  animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </motion.button>
              <RunawayNo />
            </div>
          </motion.div>
        )}

        {/* ── GATE: yes-anim ── */}
        {gate === "yes-anim" && (
          <motion.div
            key="yes-anim"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.55, type: "spring", stiffness: 260 }}
            className="relative z-10 flex flex-col items-center justify-center gap-5 py-16 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0, -8, 0], rotate: [0, -5, 5, -3, 0] }}
              transition={{ duration: 0.7, repeat: 3 }}
            >
              <BestieDolls pose="confetti" />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.3, 1, 1.2, 1], rotate: [-5, 5, -5, 0] }}
              transition={{ duration: 0.65, repeat: 3 }}
              className="text-5xl"
            >
              💕
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl text-gold sm:text-4xl"
            >
              It's a date! ❤️
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{ fontFamily: "var(--font-hand)" }}
              className="text-lg text-cream/80"
            >
              I knew you'd say yes 😊
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-xs tracking-[0.3em] text-muted-foreground uppercase"
            >
              Now let's plan it...
            </motion.p>
          </motion.div>
        )}

        {/* ── GATE: planner ── */}
        {gate === "planner" && (
          <motion.div
            key="planner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 px-1 py-4"
          >
            {/* Dolls */}
            <motion.div
              className="flex justify-center mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <BestieDolls pose={currentPose} />
            </motion.div>

            {/* Progress */}
            <StepHeader step={step} total={TOTAL} />

            <AnimatePresence mode="wait">
              {/* STEP 1 — When */}
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-1">Step 1</p>
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-lg text-cream mb-4"
                  >
                    When are you free? 🗓️
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["Today", "Tomorrow", "Saturday", "Sunday", "Monday", "Surprise me"].map(
                      (d) => (
                        <SelectCard
                          key={d}
                          icon={d === "Surprise me" ? "🎲" : "📅"}
                          label={d}
                          selected={day === d}
                          onClick={() => setDay(d)}
                        />
                      ),
                    )}
                  </div>
                  <motion.button
                    type="button"
                    onClick={next}
                    disabled={!day}
                    whileHover={day ? { scale: 1.04 } : {}}
                    whileTap={day ? { scale: 0.97 } : {}}
                    className="mt-5 w-full cursor-pointer rounded-full py-3 text-sm font-semibold text-white disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg,#c2185b,#e91e63)" }}
                  >
                    Next ✨
                  </motion.button>
                </motion.div>
              )}

              {/* STEP 2 — Where */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-1">Step 2</p>
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-lg text-cream mb-4"
                  >
                    Where are we going? ✨
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      {
                        icon: "☕",
                        label: "Coffee",
                        val: "☕ Coffee",
                        desc: "Café + endless talking",
                      },
                      {
                        icon: "🍽️",
                        label: "Dinner",
                        val: "🍽️ Dinner",
                        desc: "Good food, better company",
                      },
                      {
                        icon: "🎬",
                        label: "Movie Night",
                        val: "🎬 Movie Night",
                        desc: "You pick. No arguments.",
                      },
                      {
                        icon: "🌙",
                        label: "A Long Walk",
                        val: "🌙 A Long Walk",
                        desc: "Random roads, random convos",
                      },
                    ].map((a) => (
                      <motion.button
                        key={a.val}
                        type="button"
                        onClick={() => setActivity(a.val)}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        className="cursor-pointer rounded-2xl px-4 py-3 flex items-center gap-3 text-left"
                        style={{
                          background:
                            activity === a.val
                              ? "linear-gradient(135deg,rgba(193,24,91,0.3),rgba(240,98,146,0.15))"
                              : "rgba(255,255,255,0.06)",
                          border: `1.5px solid ${activity === a.val ? "oklch(0.62 0.19 14)" : "rgba(255,255,255,0.1)"}`,
                          backdropFilter: "blur(10px)",
                          boxShadow:
                            activity === a.val ? "0 0 18px -4px rgba(233,30,99,0.5)" : "none",
                        }}
                      >
                        <span className="text-2xl">{a.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-cream">{a.label}</p>
                          <p className="text-[0.65rem] text-cream/55">{a.desc}</p>
                        </div>
                        {activity === a.val && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto text-primary text-sm"
                          >
                            ✓
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={back}
                      className="cursor-pointer rounded-full border border-white/15 px-5 py-2.5 text-xs text-cream/60 hover:bg-white/10"
                    >
                      ← Back
                    </button>
                    <motion.button
                      type="button"
                      onClick={next}
                      disabled={!activity}
                      whileHover={activity ? { scale: 1.04 } : {}}
                      whileTap={activity ? { scale: 0.97 } : {}}
                      className="flex-1 cursor-pointer rounded-full py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                      style={{ background: "linear-gradient(135deg,#c2185b,#e91e63)" }}
                    >
                      Next ✨
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — What to bring */}
              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-1">Step 3</p>
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-lg text-cream mb-4"
                  >
                    What should I bring? 🎁
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "🌸 Flowers",
                      "🍰 Something Sweet",
                      "🎵 A Playlist",
                      "🎁 A Small Surprise",
                    ].map((b) => (
                      <SelectCard
                        key={b}
                        icon={b.split(" ")[0]!}
                        label={b.slice(b.indexOf(" ") + 1)}
                        selected={bring === b}
                        onClick={() => setBring(b)}
                      />
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={back}
                      className="cursor-pointer rounded-full border border-white/15 px-5 py-2.5 text-xs text-cream/60 hover:bg-white/10"
                    >
                      ← Back
                    </button>
                    <motion.button
                      type="button"
                      onClick={next}
                      disabled={!bring}
                      whileHover={bring ? { scale: 1.04 } : {}}
                      whileTap={bring ? { scale: 0.97 } : {}}
                      className="flex-1 cursor-pointer rounded-full py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                      style={{ background: "linear-gradient(135deg,#c2185b,#e91e63)" }}
                    >
                      Next ✨
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — And then */}
              {step === 4 && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-1">Step 4</p>
                  <h3
                    style={{ fontFamily: "var(--font-display)" }}
                    className="text-lg text-cream mb-4"
                  >
                    And then? 🌟
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["🍰 Dessert", "⭐ Stargazing", "🚗 A Drive", "📸 Take Photos"].map((e) => (
                      <SelectCard
                        key={e}
                        icon={e.split(" ")[0]!}
                        label={e.slice(e.indexOf(" ") + 1)}
                        selected={extra === e}
                        onClick={() => setExtra(e)}
                      />
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={back}
                      className="cursor-pointer rounded-full border border-white/15 px-5 py-2.5 text-xs text-cream/60 hover:bg-white/10"
                    >
                      ← Back
                    </button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        if (extra) {
                          celebrateBig();
                          next();
                        }
                      }}
                      disabled={!extra}
                      whileHover={extra ? { scale: 1.04 } : {}}
                      whileTap={extra ? { scale: 0.97 } : {}}
                      className="flex-1 cursor-pointer rounded-full py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                      style={{ background: "linear-gradient(135deg,#c2185b,#e91e63)" }}
                    >
                      Build the Pass 🎟️
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5 — Bestie Pass */}
              {step === 5 && (
                <motion.div
                  key="s5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-center text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-4">
                    Your Friend Pass 🎟️
                  </p>

                  {/* ═══ PREMIUM TICKET ═══ */}
                  <div ref={ticketRef}>
                    <motion.div
                      initial={{ y: 24, opacity: 0, scale: 0.94 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="relative w-full overflow-hidden"
                      style={{
                        borderRadius: 24,
                        background:
                          "linear-gradient(160deg, #2a0515 0%, #1a020d 50%, #200410 100%)",
                        border: "2.5px solid rgba(233,30,99,0.7)",
                        boxShadow:
                          "0 0 0 1px rgba(233,30,99,0.15), 0 0 40px -8px rgba(233,30,99,0.55), inset 0 0 60px -20px rgba(120,0,40,0.4)",
                      }}
                    >
                      {/* Grain texture overlay */}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.035]"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/></filter><rect width='80' height='80' filter='url(%23n)'/></svg>\")",
                          borderRadius: 24,
                        }}
                      />

                      {/* Top gradient stripe */}
                      <div
                        className="h-3 w-full"
                        style={{
                          background:
                            "linear-gradient(90deg,#880e38,#c2185b,#e91e63,#f06292,#e91e63,#c2185b,#880e38)",
                        }}
                      />

                      {/* Ticket perforation notches */}
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full"
                        style={{ background: "#0d0008", border: "2px solid rgba(233,30,99,0.5)" }}
                      />
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-5 w-5 rounded-full"
                        style={{ background: "#0d0008", border: "2px solid rgba(233,30,99,0.5)" }}
                      />

                      <div className="px-6 pt-6 pb-4">
                        {/* ── HEADER ── */}
                        <div className="text-center mb-5">
                          {/* Official Document label */}
                          <p
                            className="uppercase tracking-[0.45em] font-medium"
                            style={{
                              fontSize: 11,
                              color: "oklch(0.78 0.14 78)",
                              fontFamily: "var(--font-sans)",
                              letterSpacing: "0.45em",
                            }}
                          >
                            Official Document
                          </p>

                          {/* Main title */}
                          <motion.h2
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "clamp(26px, 7vw, 36px)",
                              lineHeight: 1.2,
                            }}
                            className="mt-2 font-bold text-cream"
                            animate={{
                              textShadow: [
                                "0 0 12px rgba(233,30,99,0.25)",
                                "0 0 30px rgba(233,30,99,0.65)",
                                "0 0 12px rgba(233,30,99,0.25)",
                              ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            👯 Friend Day Pass
                          </motion.h2>

                          {/* Subtitle */}
                          <p
                            className="mt-1.5 font-medium tracking-[0.25em] uppercase"
                            style={{
                              fontSize: "clamp(13px, 3.5vw, 17px)",
                              color: "rgba(255,255,255,0.55)",
                            }}
                          >
                            Admit Two — Best Friends
                          </p>
                        </div>

                        {/* ── GOLD DIVIDER ── */}
                        <div className="flex items-center gap-3 mb-5">
                          <div
                            className="flex-1 h-px"
                            style={{
                              background:
                                "linear-gradient(90deg,transparent,oklch(0.78 0.14 78 / 0.6),transparent)",
                            }}
                          />
                          <span style={{ color: "oklch(0.78 0.14 78)", fontSize: 14 }}>✦</span>
                          <div
                            className="flex-1 h-px"
                            style={{
                              background:
                                "linear-gradient(90deg,transparent,oklch(0.78 0.14 78 / 0.6),transparent)",
                            }}
                          />
                        </div>

                        {/* ── INFO ROWS ── */}
                        <div className="space-y-3">
                          {[
                            { k: "HOLDER", v: name },
                            { k: "DATE", v: day },
                            { k: "ACTIVITY", v: activity },
                            { k: "BRINGING", v: bring },
                            { k: "ENDING", v: extra },
                          ].map((row, i) => (
                            <motion.div
                              key={row.k}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.08 }}
                              className="flex items-center justify-between gap-3"
                              style={{
                                background: "rgba(255,255,255,0.04)",
                                borderRadius: 10,
                                padding: "10px 14px",
                                border: "1px solid rgba(255,255,255,0.07)",
                              }}
                            >
                              <span
                                className="uppercase tracking-widest shrink-0 font-semibold"
                                style={{
                                  fontSize: "clamp(11px, 3vw, 14px)",
                                  color: "oklch(0.78 0.14 78)",
                                  fontFamily: "var(--font-sans)",
                                }}
                              >
                                {row.k}
                              </span>
                              <span
                                className="text-right font-medium"
                                style={{
                                  fontSize: "clamp(14px, 4vw, 18px)",
                                  color: "rgba(255,255,255,0.92)",
                                  fontFamily: "var(--font-sans)",
                                  lineHeight: 1.3,
                                }}
                              >
                                {row.v}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* ── DASHED DIVIDER ── */}
                        <div
                          className="my-5 border-t"
                          style={{ borderColor: "rgba(233,30,99,0.25)", borderStyle: "dashed" }}
                        />

                        {/* ── BESTIE DOLLS ── */}
                        <div className="relative flex justify-center items-end pb-2">
                          {/* Sparkle confetti around dolls */}
                          {["✨", "⭐", "🌸", "💫", "✦"].map((c, i) => (
                            <motion.span
                              key={i}
                              className="absolute pointer-events-none select-none"
                              style={{
                                fontSize: 12 + (i % 3) * 4,
                                left: `${10 + i * 18}%`,
                                top: i % 2 === 0 ? -8 : 4,
                                color: i % 2 === 0 ? "oklch(0.82 0.12 85)" : "#f48fb1",
                                opacity: 0.7,
                              }}
                              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                              transition={{
                                duration: 2 + i * 0.3,
                                repeat: Infinity,
                                delay: i * 0.25,
                              }}
                            >
                              {c}
                            </motion.span>
                          ))}

                          {/* Larger dolls */}
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            style={{ transform: "scale(1.25)", transformOrigin: "bottom center" }}
                          >
                            <BestieDolls pose="confetti" />
                          </motion.div>
                        </div>

                        {/* ── TICKET FOOTER ── */}
                        <div className="mt-3 text-center">
                          <p
                            className="uppercase tracking-[0.3em]"
                            style={{
                              fontSize: 10,
                              color: "rgba(255,255,255,0.25)",
                              fontFamily: "var(--font-sans)",
                            }}
                          >
                            🎉 Have the best day ever 🎉
                          </p>
                        </div>
                      </div>

                      {/* Bottom gradient stripe */}
                      <div
                        className="h-3 w-full"
                        style={{
                          background:
                            "linear-gradient(90deg,#880e38,#c2185b,#e91e63,#f06292,#e91e63,#c2185b,#880e38)",
                        }}
                      />
                    </motion.div>
                    {/* ═══ END TICKET ═══ */}
                  </div>

                  {/* Single action — Download ticket as JPEG */}
                  <div className="mt-5 flex justify-center">
                    <motion.button
                      type="button"
                      onClick={downloadJpeg}
                      disabled={downloading}
                      whileHover={{ scale: 1.06, y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="cursor-pointer rounded-full px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-50"
                      style={{
                        background: "linear-gradient(135deg,#7b0d2a,#c2185b,#e91e63)",
                        boxShadow: "0 0 30px -6px rgba(233,30,99,0.8)",
                      }}
                    >
                      {downloading ? "⏳ Saving..." : "⬇️ Save to Gallery"}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 6 — Calendar */}
              {step === 6 && (
                <motion.div
                  key="s6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
                    className="mx-auto max-w-xs rounded-3xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(233,30,99,0.3)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div
                      className="py-3 text-center"
                      style={{ background: "linear-gradient(135deg,#c2185b,#e91e63)" }}
                    >
                      <p className="text-xs tracking-[0.3em] text-white/80 uppercase font-mono">
                        September 2026
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                          <span
                            key={i}
                            className="text-[0.55rem] text-muted-foreground font-medium"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {/* Sep 2026 starts on Tuesday — offset 2 */}
                        <span />
                        <span />
                        {Array.from({ length: 30 }, (_, i) => {
                          const n = i + 1;
                          const highlight = n === 11;
                          const sel =
                            (day === "Today" && n === 11) ||
                            (day === "Tomorrow" && n === 12) ||
                            (day === "Saturday" && n === 12) ||
                            (day === "Sunday" && n === 13) ||
                            (day === "Monday" && n === 14) ||
                            (day === "Surprise me" && n === 18);
                          return (
                            <motion.span
                              key={n}
                              className="text-xs rounded-full w-6 h-6 flex items-center justify-center mx-auto font-medium"
                              style={{
                                background: sel
                                  ? "linear-gradient(135deg,#c2185b,#e91e63)"
                                  : highlight
                                    ? "rgba(233,30,99,0.2)"
                                    : "transparent",
                                color: sel
                                  ? "white"
                                  : highlight
                                    ? "#f48fb1"
                                    : "rgba(255,255,255,0.7)",
                                boxShadow: sel ? "0 0 12px -2px rgba(233,30,99,0.7)" : "none",
                              }}
                              animate={sel ? { scale: [1, 1.15, 1] } : {}}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              {n}
                            </motion.span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-5"
                  >
                    <p
                      style={{ fontFamily: "var(--font-display)" }}
                      className="text-base text-cream"
                    >
                      It's happening on <span className="text-blush">{day}</span>! 🎉
                    </p>
                    <p className="mt-2 text-xs text-cream/65 leading-relaxed">
                      Get ready for a day full of fun,
                      <br />
                      memories & chaos! 😄
                    </p>
                    <p
                      style={{ fontFamily: "var(--font-hand)" }}
                      className="mt-3 text-xl text-gold"
                    >
                      See you there! 👯‍♀️
                    </p>
                  </motion.div>

                  <motion.button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setGate("question");
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-5 cursor-pointer rounded-full px-8 py-3 text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#c2185b,#e91e63,#f06292)" }}
                  >
                    Plan Another Day 💝
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
