import { useEffect, useRef, useMemo } from "react";

function seeded(count: number, seed: number) {
  let s = seed;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  return Array.from({ length: count }, () => ({
    left: rnd() * 100,
    top: rnd() * 100,
    size: rnd(),
    delay: rnd(),
    dur: rnd(),
    op: rnd(),
  }));
}

/** Premium dreamy background: stars, blobs, particles, shooting stars, subtle grain. Responds to mouse. */
export function DreamyBackground() {
  const blobRef = useRef<HTMLDivElement>(null);

  const stars = useMemo(() => seeded(60, 11), []);
  const particles = useMemo(() => seeded(35, 29), []);
  const balloons = useMemo(() => seeded(6, 53), []);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0]!.clientX : (e as MouseEvent).clientX;
      const y = "touches" in e ? e.touches[0]!.clientY : (e as MouseEvent).clientY;
      const dx = (x / window.innerWidth - 0.5) * 30;
      const dy = (y / window.innerHeight - 0.5) * 30;
      blob.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Moving gradient base */}
      <div className="absolute inset-0 romance-bg" />

      {/* Mouse-following blobs */}
      <div
        ref={blobRef}
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute rounded-full"
          style={{
            left: "15%", top: "20%", width: 500, height: 500,
            background: "oklch(0.35 0.14 12 / 0.4)",
            filter: "blur(110px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            right: "10%", bottom: "15%", width: 450, height: 450,
            background: "oklch(0.28 0.1 350 / 0.3)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            left: "50%", top: "50%", width: 350, height: 350,
            transform: "translate(-50%,-50%)",
            background: "oklch(0.82 0.12 85 / 0.08)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* Stars */}
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="absolute rounded-full bg-cream"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: 1 + s.size * 2.5,
            height: 1 + s.size * 2.5,
            opacity: 0.15 + s.op * 0.65,
            animation: `twinkle ${2.2 + s.dur * 4.5}s ease-in-out ${s.delay * 6}s infinite`,
          }}
        />
      ))}

      {/* Gold particles floating up */}
      {particles.map((p, i) => (
        <span
          key={`part-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: -10,
            width: 2 + p.size * 3,
            height: 2 + p.size * 3,
            background: p.op > 0.5 ? "oklch(0.82 0.12 85 / 0.7)" : "oklch(0.85 0.07 8 / 0.6)",
            animation: `float-up ${14 + p.dur * 20}s linear ${p.delay * 20}s infinite`,
          }}
        />
      ))}

      {/* Floating mini heart balloons */}
      {balloons.map((b, i) => {
        const sz = 18 + b.size * 20;
        const col = i % 2 === 0 ? "oklch(0.62 0.19 14)" : "oklch(0.85 0.07 8)";
        const shine = i % 3 === 0 ? "oklch(0.90 0.12 340)" : "white";
        return (
          <svg
            key={`bal-${i}`}
            className="absolute"
            width={sz}
            height={sz * 1.35}
            viewBox="0 0 55 74"
            style={{
              left: `${b.left}%`,
              bottom: -40,
              opacity: 0.22 + b.op * 0.22,
              animation: `float-up ${22 + b.dur * 20}s linear ${b.delay * 25}s infinite`,
            }}
          >
            {/* Heart */}
            <path
              d="M27.5,56 C27.5,56 6,40 6,22 C6,11 14,4 22,4 C25,4 27.5,7 27.5,7 C27.5,7 30,4 33,4 C41,4 49,11 49,22 C49,40 27.5,56 27.5,56 Z"
              fill={col}
            />
            {/* Shine */}
            <ellipse cx="19" cy="16" rx="5" ry="7" fill={shine} opacity="0.28" transform="rotate(-20 19 16)" />
            {/* Knot */}
            <ellipse cx="27.5" cy="58" rx="2.5" ry="2" fill={col} opacity="0.8" />
            {/* String */}
            <path d="M27.5 60 C31 66,23 69,27.5 74" stroke="oklch(0.86 0.12 88)" strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
        );
      })}

      {/* Shooting stars */}
      {[0, 1, 2].map((i) => (
        <span
          key={`shoot-${i}`}
          className="absolute h-px rounded-full"
          style={{
            top: `${10 + i * 25}%`,
            left: "110%",
            width: 80 + i * 40,
            background: "linear-gradient(90deg, oklch(0.82 0.12 85 / 0.8), transparent)",
            animation: `shooting-star ${6 + i * 3}s linear ${i * 4}s infinite`,
          }}
        />
      ))}

      {/* Subtle noise grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/></filter><rect width='140' height='140' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
