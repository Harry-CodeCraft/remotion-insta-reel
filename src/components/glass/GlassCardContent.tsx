import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import type { ReelCardConfig } from "../../data/reelCards";
import { GlassCardHeader } from "./GlassCardHeader";
import { GlassCardTags } from "./GlassCardTags";

export type GlassCardContentProps = {
  card: ReelCardConfig;
  enterProgress: number;
};

export const GlassCardContent: React.FC<GlassCardContentProps> = ({
  card,
  enterProgress,
}) => {
  const frame = useCurrentFrame();

  const descriptionOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descriptionY = interpolate(frame, [8, 20], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const footerStart = 20 + (card.tags?.length ?? 0) * 4;
  const footerOpacity = interpolate(
    frame,
    [footerStart, footerStart + 10],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        fontFamily:
          'Inter, "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <GlassCardHeader
        category={card.category}
        title={card.title}
        icon={card.icon}
        enterProgress={enterProgress}
        frame={frame}
      />

      <p
        style={{
          margin: 0,
          fontSize: 28,
          lineHeight: 1.45,
          fontWeight: 500,
          color: "rgba(255,255,255,0.86)",
          letterSpacing: "-0.01em",
          maxWidth: "100%",
          whiteSpace: "pre-line",
          opacity: descriptionOpacity * enterProgress,
          transform: `translateY(${descriptionY}px)`,
        }}
      >
        {card.description}
      </p>

      <GlassCardTags
        tags={card.tags}
        frame={frame}
        enterProgress={enterProgress}
      />

      {card.footer ? (
        <div
          style={{
            marginTop: 2,
            fontSize: 17,
            lineHeight: 1.4,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.62)",
            opacity: footerOpacity * enterProgress,
          }}
        >
          {card.footer}
        </div>
      ) : null}
    </div>
  );
};
