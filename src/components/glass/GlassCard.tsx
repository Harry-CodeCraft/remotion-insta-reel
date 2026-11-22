import React from "react";
import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  Video,
  getRemotionEnvironment,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { ReelCardConfig } from "../../data/reelCards";
import { GlassCardContent } from "./GlassCardContent";
import { GlassReflection } from "./GlassReflection";

const ENTER_FRAMES = 10;
const EXIT_FRAMES = 8;

export type GlassCardProps = {
  card: ReelCardConfig;
  backgroundVideoSrc?: string;
  cardTopPercent: number;
  cardMaxHeightPercent: number;
  sequenceFrom: number;
};

const resolveMediaSrc = (src?: string): string | undefined => {
  if (!src) return undefined;
  if (/^(https?:|file:|data:)/.test(src)) return src;
  return staticFile(src);
};

export const GlassCard: React.FC<GlassCardProps> = ({
  card,
  backgroundVideoSrc,
  cardTopPercent,
  cardMaxHeightPercent,
  sequenceFrom,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
    durationInFrames: ENTER_FRAMES,
  });

  const enterProgress = interpolate(enterSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitProgress = interpolate(
    frame,
    [durationInFrames - EXIT_FRAMES, durationInFrames - 1],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.4, 0, 1, 1),
    },
  );

  const opacity =
    interpolate(enterProgress, [0, 1], [0, 1]) *
    interpolate(exitProgress, [0, 1], [1, 0]);

  const scale =
    interpolate(enterProgress, [0, 1], [0.92, 1]) *
    interpolate(exitProgress, [0, 1], [1, 0.97]);

  const translateY =
    interpolate(enterProgress, [0, 1], [36, 0]) +
    interpolate(exitProgress, [0, 1], [0, -10]);

  const cardWidth = Math.round(width * 0.875);
  const cardLeft = Math.round((width - cardWidth) / 2);
  const cardTop = Math.round((height * cardTopPercent) / 100);
  const cardMaxHeight = Math.round((height * cardMaxHeightPercent) / 100);
  const bgSrc = resolveMediaSrc(backgroundVideoSrc);
  const canRenderVideoFallback = getRemotionEnvironment().isRendering;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: cardLeft,
          top: cardTop,
          width: cardWidth,
          maxHeight: cardMaxHeight,
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
          transformOrigin: "center top",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow:
              "0 24px 60px rgba(0, 0, 0, 0.28), 0 2px 8px rgba(0, 0, 0, 0.12)",
          }}
        >
          {/* Frosted base: blurred background clipped to card so details diffuse like foggy glass */}
          {bgSrc ? (
            <AbsoluteFill style={{ overflow: "hidden" }}>
              {canRenderVideoFallback ? (
                <OffthreadVideo
                  src={bgSrc}
                  startFrom={sequenceFrom}
                  muted
                  pauseWhenBuffering
                  style={{
                    position: "absolute",
                    left: -cardLeft,
                    top: -cardTop,
                    width,
                    height,
                    objectFit: "cover",
                    filter: "blur(24px) saturate(1.2) brightness(1.03)",
                    transform: "scale(1.06)",
                  }}
                />
              ) : (
                <Video
                  src={bgSrc}
                  startFrom={sequenceFrom}
                  muted
                  pauseWhenBuffering
                  style={{
                    position: "absolute",
                    left: -cardLeft,
                    top: -cardTop,
                    width,
                    height,
                    objectFit: "cover",
                    filter: "blur(24px) saturate(1.2) brightness(1.03)",
                    transform: "scale(1.06)",
                  }}
                />
              )}
            </AbsoluteFill>
          ) : (
            <AbsoluteFill style={{ overflow: "hidden" }}>
              <div
                style={{
                  position: "absolute",
                  left: -cardLeft,
                  top: -cardTop,
                  width,
                  height,
                  filter: "blur(24px) saturate(1.15)",
                  transform: "scale(1.06)",
                }}
              >
                <AbsoluteFill
                  style={{
                    background:
                      "radial-gradient(120% 80% at 20% 10%, #334155 0%, #0f172a 45%, #020617 100%)",
                  }}
                />
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
              </div>
            </AbsoluteFill>
          )}

          {/* Foggy glass tint and backdrop blur (diffuses background, keeps translucent frosted look) */}
          <div
            style={{
              position: "relative",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 100%)",
              backdropFilter: "blur(18px) saturate(1.25)",
              WebkitBackdropFilter: "blur(18px) saturate(1.25)",
              border: "1px solid rgba(255, 255, 255, 0.32)",
              borderRadius: 24,
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.08)",
              padding: "28px 28px 24px",
              minHeight: 120,
            }}
          >
            <GlassReflection />
            <GlassCardContent card={card} enterProgress={enterProgress} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
