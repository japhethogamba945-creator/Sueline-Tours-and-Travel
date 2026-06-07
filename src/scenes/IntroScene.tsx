import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Sequence,
} from "remotion";

const Plane: React.FC<{ progress: number }> = ({ progress }) => {
  const x = interpolate(progress, [0, 1], [-120, 1300]);
  const y = interpolate(progress, [0, 0.5, 1], [60, -20, 40]);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: 52,
        transform: "scaleX(1)",
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
      }}
    >
      ✈️
    </div>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const planeProgress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(frame, [15, 55], [0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const logoOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const taglineY = interpolate(frame, [50, 75], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const globeRotation = frame * 0.8;

  const charCount = Math.floor(
    interpolate(frame, [fps * 0.4, fps * 1.8], [0, 20], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const brandText = "Sueline Tours & Travel".slice(0, charCount);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Starfield */}
      {[...Array(40)].map((_, i) => {
        const starOpacity = interpolate(
          (frame + i * 7) % 60,
          [0, 30, 60],
          [0.3, 1, 0.3]
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 80}%`,
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              borderRadius: "50%",
              background: "white",
              opacity: starOpacity,
            }}
          />
        );
      })}

      {/* Animated globe in background */}
      <div
        style={{
          position: "absolute",
          right: -100,
          bottom: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.08)",
          transform: `rotate(${globeRotation}deg)`,
          background:
            "radial-gradient(circle at 35% 35%, rgba(100,200,255,0.06), transparent 60%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -50,
          bottom: -50,
          width: 350,
          height: 350,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
          transform: `rotate(${-globeRotation * 0.7}deg)`,
        }}
      />

      {/* Plane animation */}
      <Sequence from={0} durationInFrames={90} layout="none">
        <Plane progress={planeProgress} />
      </Sequence>

      {/* Center content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* Globe emoji logo */}
        <div
          style={{
            fontSize: 80,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            filter: "drop-shadow(0 8px 24px rgba(0,150,255,0.5))",
          }}
        >
          🌍
        </div>

        {/* Brand name — typewriter */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.04em",
              textAlign: "center",
              textShadow: "0 4px 24px rgba(0,150,255,0.4)",
              minWidth: 700,
            }}
          >
            {brandText}
            <span
              style={{
                opacity: frame % 30 < 15 ? 1 : 0,
                borderRight: "3px solid #64c8ff",
              }}
            />
          </h1>
        </div>

        {/* Tagline */}
        <p
          style={{
            margin: 0,
            fontSize: 26,
            color: "rgba(200,230,255,0.85)",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            textAlign: "center",
          }}
        >
          Discover the World, Your Way
        </p>

        {/* Decorative line */}
        <div
          style={{
            width: interpolate(frame, [70, 100], [0, 300], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #64c8ff, transparent)",
            opacity: taglineOpacity,
          }}
        />
      </AbsoluteFill>

      {/* Bottom wave */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background:
            "linear-gradient(180deg, transparent, rgba(0,100,200,0.15))",
        }}
      />
    </AbsoluteFill>
  );
};
