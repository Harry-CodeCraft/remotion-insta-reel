import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export type ProgressSegment = {
  from: number;
  duration: number;
};

export type ReelProgressProps = {
  segments: ProgressSegment[];
  activeColor?: string;
  inactiveColor?: string;
};

export const ReelProgress: React.FC<ReelProgressProps> = ({
  segments,
  activeColor = "rgba(255,255,255,0.95)",
  inactiveColor = "rgba(255,255,255,0.28)",
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        bottom: 74,
        display: "flex",
        gap: 8,
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {segments.map(({ from, duration }, index) => {
        const safeDuration = Math.max(1, duration);
        const local = interpolate(
          frame,
          [from, from + safeDuration],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        return (
          <div
            key={index}
            style={{
              flex: 1,
              height: 5,
              borderRadius: 999,
              background: inactiveColor,
              overflow: "hidden",
              backdropFilter: "blur(6px)",
            }}
          >
            <div
              style={{
                width: `${local * 100}%`,
                height: "100%",
                borderRadius: 999,
                background: activeColor,
                boxShadow: "0 0 12px rgba(255,255,255,0.35)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
