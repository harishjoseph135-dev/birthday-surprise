import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";

export function MusicPlayer({
  song,
  songTitle,
  artist,
  cover,
  title,
  message,
}: {
  song: string;
  songTitle: string;
  artist: string;
  cover: string;
  title: string;
  message: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        await a.play();
        setPlaying(true);
      }
    } catch {
      setError(true);
      setPlaying(false);
    }
  };

  const fmt = (s: number) =>
    Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";

  return (
    <div className="text-center">
      <p className="text-[0.7rem] tracking-[0.35em] text-gold uppercase">🎵 {title}</p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto mt-7 h-40 w-40 overflow-hidden rounded-full border-4 border-cream/20 shadow-[0_0_60px_-12px_oklch(0.62_0.19_14/0.7)] sm:h-48 sm:w-48"
        style={{ animation: playing ? "spin-slow 9s linear infinite" : undefined }}
      >
        <img src={cover} alt={songTitle} loading="lazy" width={512} height={512} className="h-full w-full object-cover" />
      </motion.div>

      {/* visualizer */}
      <div className="mt-6 flex h-10 items-end justify-center gap-1">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-primary"
            animate={playing ? { height: [6, 10 + ((i * 7) % 30), 6] } : { height: 6 }}
            transition={{ duration: 0.7 + (i % 5) * 0.15, repeat: playing ? Infinity : 0 }}
          />
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-md rounded-2xl glass p-4">
        <p style={{ fontFamily: "var(--font-display)" }} className="text-lg text-cream">
          {songTitle}
        </p>
        <p className="text-xs text-muted-foreground">{artist}</p>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause song" : "Play song"}
            className="grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground transition hover:brightness-110"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>

          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            step={0.1}
            aria-label="Song progress"
            onChange={(e) => {
              const v = Number(e.target.value);
              setProgress(v);
              if (audioRef.current) audioRef.current.currentTime = v;
            }}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-gold"
          />
          <span className="w-16 shrink-0 text-right text-[0.65rem] tabular-nums text-muted-foreground">
            {fmt(progress)} / {fmt(duration)}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Volume2 className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            aria-label="Volume"
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-gold"
          />
        </div>

        {error && (
          <p className="mt-3 text-xs text-blush">
            Add your song at <code>public{song}</code> to hear it here.
          </p>
        )}
      </div>

      <p className="mx-auto mt-5 max-w-sm text-sm text-cream/80">{message}</p>

      <audio
        ref={audioRef}
        src={song}
        preload="metadata"
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
        onError={() => setError(true)}
      />
    </div>
  );
}
