# 💕 Birthday Surprise Website

A romantic, interactive birthday surprise: a secret 6-digit PIN lock, a live countdown,
six poppable balloons (photos, a love letter, a scrapbook gallery, "our song") and a
cinematic final reveal.

## ✏️ Everything you need to change is in ONE file

`src/config/birthdayConfig.ts`

| What                     | Where in the config                                      |
| ------------------------ | -------------------------------------------------------- |
| 1. Her name              | `girlfriendName`                                         |
| 2. Birthday date         | `birthdayDate` — format `"YYYY-MM-DDTHH:mm:ss"`          |
| 3. Secret PIN            | `secretPin` (6 digits) + optional `pinHint`              |
| 4. Background music      | `backgroundMusic`                                        |
| 5. Love messages         | `surprises[…].message` / `title`                         |
| 6. Final photo + message | the `type: "final"` surprise `image`, and `finalMessage` |
| 7. Photos                | `surprises[…].image` and the gallery `images` array      |

## 📸 Where to put your photos

Drop your files in `public/assets/photos/` and keep the same names to replace the
placeholders automatically:

```
public/assets/photos/photo1.jpg   → Balloon 1 (first memory)
public/assets/photos/photo2.jpg   → Balloon 2 (favorite memory) + song cover
public/assets/photos/photo3.jpg   → Gallery
public/assets/photos/photo4.jpg   → Gallery
public/assets/photos/photo5.jpg   → Gallery
public/assets/photos/final.jpg    → Final surprise
```

Square photos (1:1) look best. Any name works as long as you update the config path
(paths always start with `/assets/...`).

## 🎵 Where to put the music

```
public/assets/music/our-song.mp3
```

That single file powers both the little music button and Balloon 5's player.
Until you add it, the player shows a gentle "add your song" note instead of breaking.
Pop / sparkle / unlock sounds are generated in the browser — no extra files needed.

Music never autoplays: she is asked "🎵 Turn on the music?" right after unlocking.

## 🧭 The journey

Mystery → 🔐 secret PIN → ✨ unlock → 🎈 six balloons → 📸 💌 🎞️ 🎵 → 🎉 final surprise.

## 🗂️ Structure

```
src/
  config/birthdayConfig.ts   ← edit this
  components/
    AmbientBackground.tsx    hearts, stars, gold dust, glow
    PinLock.tsx              6-digit lock + unlock animation
    Countdown.tsx            live countdown (glass cards)
    Balloon.tsx              SVG balloon + pop animation
    SurpriseModal.tsx        blurred modal shell
    PhotoMemory.tsx          polaroid photo reveal
    LoveLetter.tsx           envelope opening + handwritten letter
    Gallery.tsx              scrapbook gallery + lightbox
    MusicPlayer.tsx          play/pause, progress, volume, visualizer
    FinalSurprise.tsx        cinematic final reveal
    MusicToggle.tsx          floating background-music button
  lib/celebrate.ts           confetti + hearts (celebrate(), celebrateBig())
  lib/sounds.ts              synthesized pop/sparkle/unlock sounds
  routes/index.tsx           the whole experience
  styles.css                 design system (burgundy / rose / gold)
```

## ▶️ Run it

```bash
npm install
npm run dev
```

Default PIN is `123456` — change it before you send her the link 😉
