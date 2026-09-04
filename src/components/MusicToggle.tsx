import { Music, Music2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const GAIN = 1.5; // 150% volume via Web Audio API GainNode

/** Floating background-music button — centered at bottom, boosted to 150% volume. */
export function MusicToggle({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const connectedRef = useRef(false);
  const [on, setOn] = useState(false);
  const [failed, setFailed] = useState(false);

  // Set up Web Audio context + gain node on first play
  const ensureAudioGraph = () => {
    const a = audioRef.current;
    if (!a || connectedRef.current) return;

    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) {
      // Fallback: cap at 1.0
      a.volume = 1.0;
      return;
    }

    const ctx = new Ctor();
    const gain = ctx.createGain();
    gain.gain.value = GAIN;

    const source = ctx.createMediaElementSource(a);
    source.connect(gain);
    gain.connect(ctx.destination);

    ctxRef.current = ctx;
    gainRef.current = gain;
    connectedRef.current = true;

    // Resume context if suspended (required by autoplay policy)
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (on) {
        a.pause();
        setOn(false);
      } else {
        ensureAudioGraph();
        if (ctxRef.current?.state === "suspended") {
          await ctxRef.current.resume();
        }
        await a.play();
        setOn(true);
      }
    } catch {
      setFailed(true);
      setOn(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={on ? "Turn music off" : "Turn music on"}
        title={
          failed
            ? "Add public/assets/music/our-song.mp3"
            : on
              ? "Music on"
              : "Music off"
        }
        className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 cursor-pointer items-center gap-2 rounded-full glass px-6 py-3 text-cream transition hover:bg-primary/40"
        style={{
          boxShadow: on
            ? "0 0 30px -6px oklch(0.82 0.12 85 / 0.8)"
            : "0 4px 20px -4px rgba(0,0,0,0.4)",
        }}
      >
        {on ? (
          <Music2 className="h-5 w-5 text-gold" />
        ) : (
          <Music className="h-5 w-5 text-cream/70" />
        )}
        <span className="text-sm font-medium tracking-wide">
          {on ? "Music On 🎵" : "Play Music 🎵"}
        </span>
      </button>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onError={() => setFailed(true)}
      />
    </>
  );
}
