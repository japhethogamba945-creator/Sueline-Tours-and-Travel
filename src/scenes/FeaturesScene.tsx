import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

type Feature = {
  icon: string;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  { icon: "🗺️", title: "Custom Itineraries", desc: "Every trip designed around you" },
  { icon: "🛡️", title: "Travel Insurance", desc: "Fully covered for peace of mind" },
  { icon: "🌟", title: "5-Star Service", desc: "Luxury experiences worldwide" },
  { icon: "✈️", title: "Flight Deals", desc: "Best fares, always" },
  { icon: "🏨", title: "Premium Hotels", desc: "Hand-picked accommodations" },
  { icon: "📞", title: "24/7 Support", desc: "We're here whenever you need us" },
];

const FeatureItem: React.FC<{ feature: Feature; index: number; frame: number }> = ({
  feature,
  index,
  frame,
}) => {
  const row = Math.floor(index / 3);
  const col = index % 3;
  const delay = row * 20 + col * 10;

  const opacity = interpolate(frame, [delay, delay + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [delay, delay + 30], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const glow = interpolate((frame + index * 15) % 90, [0, 45, 90], [0, 1, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(100,200,255,${0.1 + glow * 0.15})`,
        borderRadius: 20,
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        boxShadow: `0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.07)`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ fontSize: 40, filter: "drop-shadow(0 2px 8px rgba(100,200,255,0.4))" }}>
        {feature.icon}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "white",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        {feature.title}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "rgba(200,230,255,0.7)",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.4,
        }}
      >
        {feature.desc}
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 25], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0a0e1a 0%, #0f1e35 50%, #091525 100%)",
        overflow: "hidden",
      }}
    >
      {/* Hexagon pattern background */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(i % 4) * 30 - 5}%`,
            top: `${Math.floor(i / 4) * 40 - 10}%`,
            width: 200,
            height: 200,
            border: "1px solid rgba(100,200,255,0.04)",
            borderRadius: 20,
            transform: `rotate(${frame * 0.1 + i * 30}deg)`,
          }}
        />
      ))}

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#64c8ff",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "Arial, sans-serif",
            marginBottom: 10,
          }}
        >
          ✦ Why Choose Us ✦
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: 50,
            fontWeight: 800,
            color: "white",
            fontFamily: "Georgia, serif",
            textShadow: "0 4px 20px rgba(100,200,255,0.3)",
          }}
        >
          Everything You Need
        </h2>
      </div>

      {/* 2×3 feature grid */}
      <div
        style={{
          position: "absolute",
          top: 195,
          left: 60,
          right: 60,
          bottom: 60,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 20,
        }}
      >
        {FEATURES.map((f, i) => (
          <FeatureItem key={f.title} feature={f} index={i} frame={frame} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
