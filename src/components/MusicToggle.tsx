import { Music, Music2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Small floating background-music button. Never autoplays without a click. */
export function MusicToggle({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current.volume = 0.35;
  }, []);

  const toggle = async () => {
    const a = ref.current;
    if (!a) return;
    try {
      if (on) {
        a.pause();
        setOn(false);
      } else {
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
        title={failed ? "Add public/assets/music/our-song.mp3" : on ? "Music on" : "Music off"}
        className="fixed bottom-5 right-5 z-40 grid h-12 w-12 cursor-pointer place-items-center rounded-full glass text-cream transition hover:bg-primary/40"
      >
        {on ? <Music2 className="h-5 w-5 text-gold" /> : <Music className="h-5 w-5" />}
      </button>
      <audio ref={ref} src={src} loop preload="none" onError={() => setFailed(true)} />
    </>
  );
}
