import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const GlassReflection: React.FC = () => {
  const frame = useCurrentFrame();
  const sweepX = interpolate(frame, [0, 90], [-40, 140], {
    extrapolateRight: "extend",
    extrapolateLeft: "clamp",
  });
  const sheenOpacity = interpolate(frame, [0, 20, 90], [0.18, 0.28, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        borderRadius: 24,
        overflow: "hidden",
        translate: "-0.5px 1.4px"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -40,
          background: `linear-gradient(115deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0) ${sweepX - 18}%,
            rgba(255,255,255,${sheenOpacity}) ${sweepX}%,
            rgba(255,255,255,0) ${sweepX + 18}%,
            rgba(255,255,255,0) 100%)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1,
          right: 1,
          top: 1,
          height: "42%",
          borderRadius: "23px 23px 60% 60%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0) 100%)",
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 24,
          boxShadow:
            "inset 1px 1px 0 rgba(255,255,255,0.18), inset -1px -1px 0 rgba(255,255,255,0.06)",
        }}
      />
    </AbsoluteFill>
  );
};
