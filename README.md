# Glassmorphism Reel (Remotion)

Reusable Remotion template for an Instagram-style 9:16 reel with animated frosted-glass cards over a full-screen background video.

## Setup

```console
npm i
```

Add your background video at `public/reels/background.mp4` (or update `backgroundVideoSrc` in [src/Composition.tsx](src/Composition.tsx)). Large media files are git-ignored by default.

## Preview

```console
npm run dev
```

Opens Remotion Studio with the `GlassmorphismReel` composition.

## Render

```console
npx remotion render src/index.ts GlassmorphismReel out/glassmorphism-reel.mp4 --codec=h264 --overwrite
```

## Customize

- **Cards/content/timing:** edit [src/data/reelCards.ts](src/data/reelCards.ts). Each card supports `duration` (frames @ 30fps), optional `startFrame`/`startSec`, `overlapAfter`, and `excludeFromProgress`.
- **Composition settings:** edit [src/Composition.tsx](src/Composition.tsx) for `cardsStartDelayInFrames`, `backgroundVideoDurationInFrames`, `backgroundVideoSrc`, card position/size, and progress visibility.
- **Glass UI:** see [src/components/glass/](src/components/glass/) and [src/compositions/GlassmorphismReel.tsx](src/compositions/GlassmorphismReel.tsx).

## Quality check

```console
npm run lint
```
