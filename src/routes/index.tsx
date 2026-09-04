import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { AchievementSystem, type Achievement } from "@/components/AchievementSystem";
import { AwardsCard } from "@/components/AwardsCard";
import { BalloonGrid } from "@/components/BalloonGrid";
import { BirthdayCake } from "@/components/BirthdayCake";
import { ComboSystem } from "@/components/ComboSystem";
import { CustomCursor } from "@/components/CustomCursor";
import { DreamyBackground } from "@/components/DreamyBackground";
import { FinalSurprise } from "@/components/FinalSurprise";
import { FriendshipLetter } from "@/components/FriendshipLetter";
import { IntroAnimation } from "@/components/IntroAnimation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MemoryCard } from "@/components/MemoryCard";
import { MemoryVault } from "@/components/MemoryVault";
import { MiniGame } from "@/components/MiniGame";
import { MusicToggle } from "@/components/MusicToggle";
import { PinLock } from "@/components/PinLock";
import { RoastCard } from "@/components/RoastCard";
import { SayYes } from "@/components/SayYes";
import { SecretButton } from "@/components/SecretButton";
import { SurpriseBox } from "@/components/SurpriseBox";
import { SurpriseModal } from "@/components/SurpriseModal";
import { birthdayConfig } from "@/config/birthdayConfig";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `A Birthday Surprise For ${birthdayConfig.friendName} 🎂` },
      {
        name: "description",
        content:
          "A secret, magical birthday surprise: unlock the PIN, pop six balloons and discover photos, a personal birthday message, our favorite song and one final reveal.",
      },
      { property: "og:title", content: `A Birthday Surprise For ${birthdayConfig.friendName} 🎂` },
      {
        property: "og:description",
        content: "Unlock the secret PIN and open six little surprises made just for you.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Index,
});

type AppStage = "loading" | "pin" | "intro" | "main";

function Index() {
  const [stage, setStage] = useState<AppStage>("loading");
  const [popped, setPopped] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [finalOpen, setFinalOpen] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const surprises = birthdayConfig.surprises;

  const unlockAchievement = (a: Achievement) => {
    setAchievements((prev) => (prev.includes(a) ? prev : [...prev, a]));
  };

  const handleUnlock = () => {
    setStage("intro");
  };

  const handleIntroGo = () => {
    setStage("main");
  };

  const handlePop = (index: number, origin: { x: number; y: number }) => {
    setPopped((p) => {
      if (p.includes(index)) return p;
      const next = [...p, index];
      if (next.length === 1) unlockAchievement("first_balloon");
      if (next.length === 4) unlockAchievement("balloon_master");
      if (next.length === surprises.length) unlockAchievement("final_level");
      const s = surprises[index];
      if (s && s.type === "memory") unlockAchievement("memory_hunter");
      return next;
    });

    const surprise = surprises[index]!;
    if (surprise.type === "final") {
      setFinalOpen(true);
      unlockAchievement("birthday_legend");
    } else {
      setActive(index);
    }
  };

  const current = active !== null ? surprises[active] : null;

  return (
    <main className="relative min-h-[100svh] w-full overflow-x-hidden">
      {/* Premium cursor trail */}
      <CustomCursor />

      {/* Dreamy background (always present) */}
      <DreamyBackground />

      {/* Loading screen */}
      <AnimatePresence>
        {stage === "loading" && <LoadingScreen key="loading" onDone={() => setStage("pin")} />}
      </AnimatePresence>

      {/* PIN lock */}
      <AnimatePresence mode="wait">
        {stage === "pin" && (
          <PinLock
            key="lock"
            pin={birthdayConfig.secretPin}
            hint={birthdayConfig.pinHint}
            onUnlock={handleUnlock}
          />
        )}
      </AnimatePresence>

      {/* Cinematic intro after PIN */}
      <AnimatePresence>
        {stage === "intro" && (
          <IntroAnimation key="intro" name={birthdayConfig.friendName} onDone={handleIntroGo} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {stage === "main" && (
          <motion.section
            key="surprise"
            initial={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-5xl px-4 pt-10 pb-24 sm:px-6"
          >
            {/* Header */}
            <header className="text-center">
              <p className="text-[0.7rem] tracking-[0.4em] text-gold uppercase">
                Made with friendship, just for you
              </p>
              <h1
                style={{ fontFamily: "var(--font-display)" }}
                className="mt-3 text-3xl text-cream sm:text-5xl"
              >
                Happy Birthday,{" "}
                <span style={{ fontFamily: "var(--font-hand)" }} className="text-blush">
                  {birthdayConfig.friendName}
                </span>
              </h1>
            </header>

            {/* Balloon instruction */}
            <p className="mt-12 text-center text-sm text-cream/75">
              Six balloons. Six little surprises. Pop them one by one 🎈
            </p>

            {/* 3D Balloon Grid */}
            <BalloonGrid surprises={surprises} popped={popped} onPop={handlePop} />

            {/* Combo system */}
            <ComboSystem count={popped.length} />

            {/* Progress counter */}
            {popped.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center"
              >
                <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">
                  {popped.length} of {surprises.length} opened
                  {popped.length < surprises.length
                    ? " · keep going 🎈"
                    : " · you found them all 🥳"}
                </p>

                {/* Progress bar */}
                <div className="mx-auto mt-3 h-1 w-48 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blush to-gold"
                    animate={{ width: `${(popped.length / surprises.length) * 100}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Surprise Box (unlocks at 3) */}
            <SurpriseBox poppedCount={popped.length} total={surprises.length} />

            {/* Premium extras — show after first balloon */}
            {popped.length >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mt-10"
              >
                <p className="text-center text-[0.65rem] tracking-[0.4em] text-gold uppercase mb-4">
                  ✨ More surprises
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <BirthdayCake />
                  <MiniGame />
                </div>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Secret hidden star */}
      {stage === "main" && <SecretButton />}

      {/* Achievement popups */}
      <AchievementSystem unlocked={achievements} />

      {/* Background music toggle */}
      <MusicToggle src={birthdayConfig.backgroundMusic} />

      {/* Modal for hearts 1–5 */}
      <SurpriseModal open={active !== null} onClose={() => setActive(null)}>
        {current?.type === "memory" && (
          <MemoryCard
            title={current.title}
            image={current.image}
            date={current.date}
            caption={current.caption}
            onNext={() => setActive(null)}
          />
        )}
        {current?.type === "say-yes" && <SayYes name={birthdayConfig.friendName} />}
        {current?.type === "roast" && (
          <RoastCard
            name={birthdayConfig.friendName}
            title={current.title}
            stats={current.stats}
            verdict={current.verdict}
          />
        )}
        {current?.type === "friendship-letter" && (
          <FriendshipLetter
            title={current.title}
            message={current.message}
            {...(current.closing !== undefined && { closing: current.closing })}
          />
        )}
        {current?.type === "vault" && (
          <MemoryVault
            title={current.title}
            {...(current.subtitle !== undefined && { subtitle: current.subtitle })}
            images={current.images}
          />
        )}
        {current?.type === "awards" && (
          <AwardsCard
            title={current.title}
            name={birthdayConfig.friendName}
            awards={current.awards}
            {...(current.finalLine !== undefined && { finalLine: current.finalLine })}
          />
        )}
      </SurpriseModal>

      {/* Final cinematic reveal — Heart 6 */}
      <FinalSurprise
        open={finalOpen}
        name={birthdayConfig.friendName}
        image={
          (surprises.find((s) => s.type === "final") as { image: string } | undefined)?.image ??
          "/assets/photos/final.jpg"
        }
        message={birthdayConfig.finalMessage}
        enableExtra={birthdayConfig.enableFinalExtraSurprise}
        extraMessage={birthdayConfig.finalExtraMessage}
        {...(birthdayConfig.finalExtraImage ? { extraImage: birthdayConfig.finalExtraImage } : {})}
        onClose={() => setFinalOpen(false)}
      />
    </main>
  );
}
