import React from "react";
import { interpolate } from "remotion";

export type GlassCardTagsProps = {
  tags?: string[];
  frame: number;
  enterProgress: number;
};

export const GlassCardTags: React.FC<GlassCardTagsProps> = ({
  tags,
  frame,
  enterProgress,
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 4,
      }}
    >
      {tags.map((tag, index) => {
        const start = 16 + index * 4;
        const opacity = interpolate(frame, [start, start + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame, [start, start + 8], [10, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const scale = interpolate(frame, [start, start + 8], [0.96, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={`${tag}-${index}`}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: "rgba(255,255,255,0.92)",
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
              opacity: opacity * enterProgress,
              transform: `translateY(${y}px) scale(${scale})`,
            }}
          >
            {tag}
          </div>
        );
      })}
    </div>
  );
};
