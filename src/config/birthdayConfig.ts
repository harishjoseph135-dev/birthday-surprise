/**
 * ✏️ EDIT EVERYTHING HERE — this is the only file you need to change.
 */

import type { RoastStat } from "@/components/RoastCard";
import type { VaultPhoto } from "@/components/MemoryVault";
import type { Award } from "@/components/AwardsCard";

export type Surprise =
  | {
      type: "memory";
      label: string;
      title: string;
      image: string;
      date: string;
      caption: string;
    }
  | {
      type: "say-yes";
      label: string;
    }
  | {
      type: "roast";
      label: string;
      title: string;
      stats: RoastStat[];
      verdict: string;
    }
  | {
      type: "friendship-letter";
      label: string;
      title: string;
      message: string;
      closing?: string;
    }
  | {
      type: "vault";
      label: string;
      title: string;
      subtitle?: string;
      images: VaultPhoto[];
    }
  | {
      type: "awards";
      label: string;
      title: string;
      awards: Award[];
      finalLine?: string;
    }
  | {
      type: "final";
      label: string;
      image: string;
    };

export const birthdayConfig = {
  /** Name */
  friendName: "Lalitha",

  /** Birthday date — "YYYY-MM-DDTHH:mm:ss" local time */
  birthdayDate: "2026-09-11T00:00:00",

  /** 6-digit PIN */
  secretPin: "629011",

  /** Hint under the lock — set "" to hide */
  pinHint: "Think more to find 🤔",

  /** Background music file */
  backgroundMusic: "/assets/music/our-song.mp3",

  /** Final reveal message (Heart 6) */
  finalMessage: `Happy Birthday! 🎂

Thank you for all the laughs, random conversations, ridiculous moments, and memories.

I hope this year brings you happiness, success, amazing experiences, and plenty of reasons to smile.

Stay awesome, stay chaotic, and never stop being yourself.

Here's to another year of memories! 🥳`,

  /** Show secret "One Last Thing" button after the final reveal? */
  enableFinalExtraSurprise: true,

  /** Content for the secret extra surprise (shown after "One Last Thing" button) */
  finalExtraMessage: `You actually found the secret ending.

That says a lot about you. Genuinely. 😂

But seriously — thank you for being one of the most wonderfully chaotic people I know.

Here's to many more years of random conversations and unforgettable moments. 🥳`,

  /** Optional extra photo for the secret ending (leave "" to skip) */
  finalExtraImage: "",

  /** The six hearts — each a completely different surprise */
  surprises: [
    // ❤️ HEART 1 — THE MEMORY
    {
      type: "memory",
      label: "A Memory",
      title: "Memory Unlocked 📸",
      image: "/assets/photos/photo1.jpg",
      date: "",
      caption: "One of those random days that somehow became a core memory 😂",
    },

    // 💗 HEART 2 — THE BEST FRIEND AWARDS (was heart 5)
    {
      type: "awards",
      label: "Awards",
      title: "The 2026 Best Friend Awards 🏆",
      awards: [
        {
          icon: "🥇",
          title: "Most Random Conversations",
          reason: "At 2am, 3am, any time. No warning. No context.",
        },
        {
          icon: "🏆",
          title: "My Well Wisher",
          reason: "Always there, always caring, always cheering me on.",
        },
        {
          icon: "🎖️",
          title: "💬 Best Listener Award",
          reason: "Always there to listen, no matter what.",
        },
        {
          icon: "😂",
          title: "🕵️ Secret Keeper Award",
          reason: "Vault-level trusted. Nothing ever leaked.",
        },
        {
          icon: "🌟",
          title: "🧠 Advice Guru Award",
          reason: "The wisest friend anyone could ask for.",
        },
        {
          icon: "💛",
          title: "Somehow Still an Amazing Friend",
          reason: "Despite everything. Truly impressive.",
        },
      ] as Award[],
      finalLine: "Congratulations. Unfortunately, this award is permanent. 😂",
    },

    // 💜 HEART 3 — THE FRIENDSHIP LETTER
    {
      type: "friendship-letter",
      label: "A Message",
      title: "A Little Message For You 💌",
      message: `Happy Birthday, Thangoo! ❤️

Life has given me many people, but having you in my life is one of the things I'll always be grateful for. Thank you for being there through the good days, bad days, random laughs, and unforgettable memories. 🫂

I may not always say it, but your presence truly means a lot to me. No matter how much life changes or how far we go, I hope we always remain the same. ❤️

Keep smiling, keep shining, and never forget that you'll always have a special place in my heart. 🥹🫶`,
      closing: "Happy Birthday, Thangoo! 🎂✨ Here's to many more beautiful memories together. ❤️",
    },

    // 💖 HEART 4 — THE MEMORY VAULT
    {
      type: "vault",
      label: "Memory Vault",
      title: "The Memory Vault 🔐",
      subtitle: "Warning: excessive nostalgia ahead.",
      images: [
        {
          src: "/assets/photos/photo 2.jpeg",
          caption: "Why did we think this was a good idea? 😂",
          date: "",
        },
        {
          src: "/assets/photos/photo 3.jpeg",
          caption: "Peak chaos.",
          date: "",
        },
        {
          src: "/assets/photos/photo4.jpeg",
          caption: "Core memory unlocked.",
          date: "",
        },
        {
          src: "/assets/photos/photo 5.jpeg",
          caption: "This one deserves to be framed.",
          date: "",
        },
        {
          src: "/assets/photos/photo6.jpeg",
          caption: "That golden evening 🌅",
          date: "",
        },
        {
          src: "/assets/photos/photo1.jpg",
          caption: "One of those days 🌟",
          date: "",
        },
      ] as VaultPhoto[],
    },

    // 💛 HEART 5 — ONE WISH FROM YOU (was heart 2)
    {
      type: "say-yes",
      label: "One Wish 💝",
    },

    // 💙 HEART 6 — THE FINAL SURPRISE
    {
      type: "final",
      label: "Final Level 🔓",
      image: "/assets/photos/final.jpg",
    },
  ] as Surprise[],
};

export const SECRET_PIN = birthdayConfig.secretPin;
export const BIRTHDAY_DATE = birthdayConfig.birthdayDate;
