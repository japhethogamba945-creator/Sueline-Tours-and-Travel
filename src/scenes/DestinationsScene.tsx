import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

type Destination = {
  emoji: string;
  name: string;
  country: string;
  tagline: string;
  color: string;
  accent: string;
};

const DESTINATIONS: Destination[] = [
  {
    emoji: "🏔️",
    name: "Maasai Mara",
    country: "Kenya",
    tagline: "Wild Savannas & Great Migration",
    color: "linear-gradient(135deg, #c94b2a 0%, #a0522d 100%)",
    accent: "#ffb347",
  },
  {
    emoji: "🏝️",
    name: "Maldives",
    country: "Indian Ocean",
    tagline: "Crystal Waters & Overwater Villas",
    color: "linear-gradient(135deg, #0072c6 0%, #00b4db 100%)",
    accent: "#a0f0e0",
  },
  {
    emoji: "🗼",
    name: "Paris",
    country: "France",
    tagline: "Romance, Art & Culture",
    color: "linear-gradient(135deg, #2c3e50 0%, #8e44ad 100%)",
    accent: "#f8e0a0",
  },
];

const DestinationCard: React.FC<{
  dest: Destination;
  index: number;
  frame: number;
}> = ({ dest, index, frame }) => {
  const delay = index * 18;

  const cardY = interpolate(frame, [delay, delay + 35], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const cardOpacity = interpolate(frame, [delay, delay + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const emojiScale = interpolate(frame, [delay + 10, delay + 45], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const shimmer = interpolate(
    (frame - delay) % 90,
    [0, 45, 90],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px)`,
        background: dest.color,
        borderRadius: 24,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        flex: 1,
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)`,
        minWidth: 0,
      }}
    >
      {/* Shimmer highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(120deg, transparent 30%, rgba(255,255,255,${shimmer * 0.15}) 50%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Emoji */}
      <div
        style={{
          fontSize: 64,
          transform: `scale(${emojiScale})`,
          filter: `drop-shadow(0 4px 12px rgba(0,0,0,0.3))`,
        }}
      >
        {dest.emoji}
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "white",
          fontFamily: "Georgia, serif",
          textAlign: "center",
          textShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        {dest.name}
      </div>

      {/* Country badge */}
      <div
        style={{
          background: "rgba(255,255,255,0.18)",
          borderRadius: 20,
          padding: "4px 14px",
          fontSize: 14,
          fontWeight: 600,
          color: dest.accent,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          backdropFilter: "blur(4px)",
        }}
      >
        {dest.country}
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.8)",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.4,
          marginTop: 4,
        }}
      >
        {dest.tagline}
      </div>

      {/* Bottom accent */}
      <div
        style={{
          width: 40,
          height: 3,
          background: dest.accent,
          borderRadius: 2,
          marginTop: 4,
        }}
      />
    </div>
  );
};

export const DestinationsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleY = interpolate(frame, [0, 25], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const bgShift = interpolate(frame, [0, 120], [0, 100]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + bgShift * 0.5}deg, #0d1b2a 0%, #1b2838 50%, #0d1b2a 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Subtle animated background circles */}
      <div
        style={{
          position: "absolute",
          left: -200,
          top: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(50,100,200,0.08) 0%, transparent 70%)",
          transform: `translate(${Math.sin(frame * 0.02) * 30}px, ${Math.cos(frame * 0.015) * 20}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -150,
          bottom: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,50,100,0.06) 0%, transparent 70%)",
          transform: `translate(${Math.cos(frame * 0.02) * 25}px, ${Math.sin(frame * 0.018) * 20}px)`,
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{ fontSize: 16, color: "#64c8ff", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Arial, sans-serif" }}>
          ✦ Featured Destinations ✦
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: 54,
            fontWeight: 800,
            color: "white",
            fontFamily: "Georgia, serif",
            textAlign: "center",
            textShadow: "0 4px 20px rgba(100,200,255,0.3)",
          }}
        >
          Where Will You Go?
        </h2>
      </div>

      {/* Cards */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 60,
          right: 60,
          bottom: 80,
          display: "flex",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        {DESTINATIONS.map((dest, i) => (
          <DestinationCard key={dest.name} dest={dest} index={i} frame={frame} />
        ))}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 15,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.15em",
          fontFamily: "Arial, sans-serif",
          opacity: interpolate(frame, [60, 80], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        50+ destinations worldwide • Tailor-made itineraries
      </div>
    </AbsoluteFill>
  );
};
