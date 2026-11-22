import { Composition } from "remotion";
import {
  GlassmorphismReel,
  calculateGlassReelDuration,
} from "./compositions/GlassmorphismReel";
import { reelCards } from "./data/reelCards";

export const GlassmorphismReelComposition = () => {
  const cardsStartDelayInFrames = 300; // e.g. 150 for a 5-second delay at 30fps
  const backgroundVideoDurationInFrames = 960; // ~32s at 30fps for reels/background.mp4; set to your background video's full length
  const cardsDurationInFrames = calculateGlassReelDuration(
    reelCards,
    12,
    cardsStartDelayInFrames,
  );

  return (
    <Composition
      id="GlassmorphismReel"
      component={GlassmorphismReel}
      durationInFrames={Math.max(
        cardsDurationInFrames,
        backgroundVideoDurationInFrames,
      )}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        cards: reelCards,
        backgroundVideoSrc: "reels/background.mp4",
        cardTopPercent: 24,
        cardMaxHeightPercent: 62,
        showProgress: true,
        cardsStartDelayInFrames,
      }}
    />
  );
};
