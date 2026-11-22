import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  Video,
  getRemotionEnvironment,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GlassCard } from "../components/glass/GlassCard";
import { ReelProgress } from "../components/glass/ReelProgress";
import { reelCards, type ReelCardConfig } from "../data/reelCards";

export type GlassmorphismReelProps = {
  cards?: ReelCardConfig[];
  /** Path relative to public/ (resolved via staticFile), or absolute/data URL. */
  backgroundVideoSrc?: string;
  /** Vertical position of the card as a percentage from the top of the frame. */
  cardTopPercent?: number;
  /** Maximum card height as a percentage of frame height. */
  cardMaxHeightPercent?: number;
  showProgress?: boolean;
  /** Delay before the first auto-placed card appears, in frames (e.g. 150 = 5s at 30fps). */
  cardsStartDelayInFrames?: number;
};

export const CARD_TRANSITION_OVERLAP = 12;

export type CardSegment = {
  card: ReelCardConfig;
  from: number;
  duration: number;
};

const resolveMediaSrc = (src?: string): string | undefined => {
  if (!src) return undefined;
  if (/^(https?:|file:|data:)/.test(src)) return src;
  return staticFile(src);
};

const resolveCardStart = (
  card: ReelCardConfig,
  fallbackFrom: number,
  fps: number,
): number => {
  if (typeof card.startFrame === "number" && Number.isFinite(card.startFrame)) {
    return Math.max(0, Math.round(card.startFrame));
  }
  if (typeof card.startSec === "number" && Number.isFinite(card.startSec)) {
    return Math.max(0, Math.round(card.startSec * fps));
  }
  return Math.max(0, Math.round(fallbackFrom));
};

export const buildCardSegments = (
  cards: ReelCardConfig[],
  options?: {
    overlap?: number;
    startDelayInFrames?: number;
    fps?: number;
  },
): CardSegment[] => {
  const defaultOverlap = options?.overlap ?? CARD_TRANSITION_OVERLAP;
  const fps = options?.fps ?? 30;
  let nextAutoFrom = Math.max(0, Math.round(options?.startDelayInFrames ?? 0));

  return cards.map((card) => {
    const from = resolveCardStart(card, nextAutoFrom, fps);
    const duration = Math.max(1, Math.round(card.duration));
    const overlapAfter =
      typeof card.overlapAfter === "number" &&
      Number.isFinite(card.overlapAfter)
        ? Math.max(0, Math.round(card.overlapAfter))
        : defaultOverlap;
    nextAutoFrom = from + duration - overlapAfter;
    return { card, from, duration };
  });
};

export const calculateGlassReelDuration = (
  cards: ReelCardConfig[],
  overlap = CARD_TRANSITION_OVERLAP,
  startDelayInFrames = 0,
  fps = 30,
): number => {
  const safeDelay = Math.max(0, Math.round(startDelayInFrames));
  if (cards.length === 0) return Math.max(1, safeDelay || 1);
  const segments = buildCardSegments(cards, {
    overlap,
    startDelayInFrames: safeDelay,
    fps,
  });
  const end = Math.max(...segments.map((s) => s.from + s.duration), safeDelay);
  return Math.max(1, Math.round(end));
};

const PlaceholderBackground: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(120% 80% at 20% 10%, #334155 0%, #0f172a 45%, #020617 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(60% 50% at 80% 20%, rgba(56,189,248,0.35) 0%, rgba(56,189,248,0) 70%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(55% 45% at 20% 80%, rgba(168,85,247,0.28) 0%, rgba(168,85,247,0) 70%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(40% 35% at 70% 75%, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0) 75%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const GlassmorphismReel: React.FC<GlassmorphismReelProps> = ({
  cards = reelCards,
  backgroundVideoSrc,
  cardTopPercent = 24,
  cardMaxHeightPercent = 62,
  showProgress = true,
  cardsStartDelayInFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const bgSrc = resolveMediaSrc(backgroundVideoSrc);
  const isRendering = getRemotionEnvironment().isRendering;

  const segments = buildCardSegments(cards, {
    overlap: CARD_TRANSITION_OVERLAP,
    startDelayInFrames: cardsStartDelayInFrames,
    fps,
  });

  const progressSegments = segments.filter(
    (segment) => !segment.card.excludeFromProgress,
  );
  const progressEndFrame = progressSegments.reduce(
    (max, segment) => Math.max(max, segment.from + segment.duration),
    0,
  );
  const shouldShowProgress =
    showProgress && progressSegments.length > 1 && frame < progressEndFrame;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617" }}>
      {/* Continuous full-screen background (never restarts between cards) */}
      <AbsoluteFill>
        {bgSrc ? (
          isRendering ? (
            <OffthreadVideo
              src={bgSrc}
              pauseWhenBuffering
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Video
              src={bgSrc}
              pauseWhenBuffering
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )
        ) : (
          <PlaceholderBackground />
        )}
      </AbsoluteFill>

      {/* Subtle global vignette for premium contrast and Instagram-safe edges */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.06) 70%, rgba(0,0,0,0.28) 100%)",
          pointerEvents: "none",
        }}
      />

      {segments.map(({ card, from, duration }) => (
        <Sequence
          key={String(card.id)}
          from={from}
          durationInFrames={duration}
          premountFor={30}
        >
          <GlassCard
            card={card}
            backgroundVideoSrc={backgroundVideoSrc}
            cardTopPercent={cardTopPercent}
            cardMaxHeightPercent={cardMaxHeightPercent}
            sequenceFrom={from}
          />
        </Sequence>
      ))}

      {shouldShowProgress ? <ReelProgress segments={progressSegments} /> : null}

      {/* Safety padding visualization guard not needed; content kept within margins */}
      <div style={{ display: "none" }}>{durationInFrames}</div>
    </AbsoluteFill>
  );
};
