/**
 * Tiny synthesized sound effects (no audio files required).
 * Only ever triggered by a user interaction.
 */

let audioCtx: AudioContext | null = null;
let muted = false;

export function setSfxMuted(value: boolean) {
  muted = value;
}

function getCtx() {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) audioCtx = new Ctor();
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, slideTo?: number) {
  const ctx = getCtx();
  if (!ctx || muted) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, ctx.currentTime + dur);
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + dur + 0.02);
}

export const playPop = () => {
  tone(520, 0.12, "triangle", 0.22, 120);
  setTimeout(() => tone(880, 0.08, "sine", 0.1), 40);
};

export const playSparkle = () => {
  [1200, 1600, 2100, 2600].forEach((f, i) => setTimeout(() => tone(f, 0.14, "sine", 0.07), i * 70));
};

export const playUnlock = () => {
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.35, "sine", 0.12), i * 110));
};

export const playError = () => {
  tone(220, 0.18, "sine", 0.12, 160);
};

export const playReveal = () => {
  [392, 523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => tone(f, 0.5, "triangle", 0.1), i * 140));
};
