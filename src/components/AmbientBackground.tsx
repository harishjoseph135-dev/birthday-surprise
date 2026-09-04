import { useMemo } from "react";

function useSeeded(count: number, seed: number) {
  return useMemo(() => {
    let s = seed;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    return Array.from({ length: count }, () => ({
      left: rnd() * 100,
      size: rnd(),
      delay: rnd(),
      dur: rnd(),
      op: rnd(),
    }));
  }, [count, seed]);
}

/** Cinematic animated background: gradient, glow orbs, stars, gold dust, floating hearts. */
export function AmbientBackground({ hearts = 14 }: { hearts?: number }) {
  const stars = useSeeded(46, 7);
  const dust = useSeeded(26, 23);
  const heartItems = useSeeded(hearts, 41);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden romance-bg">
      {/* soft glowing circles */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/25 blur-[90px]" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/15 blur-[110px]" />
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-blush/10 blur-[100px]" />

      {/* stars */}
      {stars.map((s, i) => (
        <span
          key={`s${i}`}
          className="absolute rounded-full bg-cream"
          style={{
            left: `${s.left}%`,
            top: `${(s.size * 100).toFixed(2)}%`,
            width: 1 + s.size * 2.4,
            height: 1 + s.size * 2.4,
            opacity: 0.2 + s.op * 0.6,
            animation: `twinkle ${2.4 + s.dur * 4}s ease-in-out ${s.delay * 5}s infinite`,
          }}
        />
      ))}

      {/* gold dust */}
      {dust.map((d, i) => (
        <span
          key={`d${i}`}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${d.left}%`,
            bottom: -20,
            width: 2 + d.size * 3,
            height: 2 + d.size * 3,
            opacity: 0.35 + d.op * 0.45,
            animation: `float-up ${16 + d.dur * 18}s linear ${d.delay * 18}s infinite`,
          }}
        />
      ))}

      {/* floating heart balloons */}
      {heartItems.map((h, i) => {
        const sz = 14 + h.size * 24;
        return (
          <svg
            key={`h${i}`}
            className="absolute"
            width={sz}
            height={sz * 1.35}
            viewBox="0 0 55 74"
            style={{
              left: `${h.left}%`,
              bottom: -40,
              opacity: 0.3 + h.op * 0.3,
              animation: `float-up ${18 + h.dur * 16}s linear ${h.delay * 20}s infinite`,
            }}
          >
            <path
              d="M27.5,56 C27.5,56 6,40 6,22 C6,11 14,4 22,4 C25,4 27.5,7 27.5,7 C27.5,7 30,4 33,4 C41,4 49,11 49,22 C49,40 27.5,56 27.5,56 Z"
              fill="oklch(0.62 0.19 14)"
            />
            <ellipse cx="18" cy="15" rx="5" ry="7" fill="white" opacity="0.28" transform="rotate(-20 18 15)" />
            <ellipse cx="27.5" cy="58" rx="2.5" ry="2" fill="oklch(0.45 0.2 14)" opacity="0.8" />
            <path d="M27.5 60 C31 66,23 69,27.5 74" stroke="oklch(0.86 0.12 88)" strokeWidth="1" fill="none" opacity="0.6" />
          </svg>
        );
      })}

      {/* subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/></filter><rect width='140' height='140' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
