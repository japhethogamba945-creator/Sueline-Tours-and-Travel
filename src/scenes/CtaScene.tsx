import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineScale = interpolate(frame, [10, 45], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.2, 0.64, 1),
  });

  const subOpacity = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subY = interpolate(frame, [35, 60], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const btnOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const btnScale = interpolate(frame, [55, 80], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const contactOpacity = interpolate(frame, [75, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow for button
  const btnGlow = interpolate((frame - 55) % 60, [0, 30, 60], [0.6, 1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating particles
  const particles = [...Array(20)].map((_, i) => ({
    x: `${(i * 37 + 11) % 100}%`,
    baseY: `${(i * 53 + 5) % 100}%`,
    dy: ((frame * (0.3 + (i % 5) * 0.1)) % 110) - 10,
    size: 3 + (i % 4),
    opacity: 0.15 + (i % 5) * 0.05,
    color: i % 3 === 0 ? "#64c8ff" : i % 3 === 1 ? "#ffb347" : "#a0f0e0",
  }));

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 40%, #0a1a2e 100%)",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Animated aurora background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 50% at ${50 + Math.sin(frame * 0.025) * 15}% ${40 + Math.cos(frame * 0.02) * 10}%,
              rgba(100,0,200,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at ${70 + Math.cos(frame * 0.018) * 10}% ${60 + Math.sin(frame * 0.022) * 8}%,
              rgba(0,150,255,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 70% 45% at ${30 + Math.sin(frame * 0.02) * 12}% ${50 + Math.cos(frame * 0.025) * 10}%,
              rgba(0,200,150,0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            bottom: `calc(${p.baseY} + ${p.dy}px)`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}

      {/* Center content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {/* Main headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `scale(${headlineScale})`,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 78,
              fontWeight: 800,
              color: "white",
              fontFamily: "Georgia, serif",
              lineHeight: 1.1,
              textShadow: "0 8px 40px rgba(100,100,255,0.5)",
            }}
          >
            Your Dream Trip
          </h1>
          <h1
            style={{
              margin: 0,
              fontSize: 78,
              fontWeight: 800,
              fontFamily: "Georgia, serif",
              lineHeight: 1.1,
              background: "linear-gradient(90deg, #64c8ff 0%, #a0f0e0 50%, #ffb347 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Starts Here
          </h1>
        </div>

        {/* Subheading */}
        <p
          style={{
            margin: 0,
            fontSize: 22,
            color: "rgba(200,230,255,0.8)",
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.5,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
          }}
        >
          Let Sueline Tours & Travel craft the perfect adventure —
          from exotic safaris to city escapes.
        </p>

        {/* CTA Button */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${btnScale})`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, #0072c6, #00b4db, #0072c6)",
              backgroundSize: "200%",
              borderRadius: 50,
              padding: "18px 56px",
              fontSize: 22,
              fontWeight: 700,
              color: "white",
              fontFamily: "Arial, sans-serif",
              letterSpacing: "0.05em",
              boxShadow: `0 0 ${40 * btnGlow}px rgba(0,180,219,${0.6 * btnGlow}), 0 8px 32px rgba(0,0,0,0.4)`,
              cursor: "pointer",
            }}
          >
            Book Your Adventure →
          </div>
        </div>

        {/* Contact info */}
        <div
          style={{
            opacity: contactOpacity,
            display: "flex",
            gap: 40,
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>📧</div>
            <div style={{ fontSize: 14, color: "rgba(200,230,255,0.6)", fontFamily: "Arial, sans-serif", marginTop: 4 }}>
              info@suelinetours.com
            </div>
          </div>
          <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>📞</div>
            <div style={{ fontSize: 14, color: "rgba(200,230,255,0.6)", fontFamily: "Arial, sans-serif", marginTop: 4 }}>
              +1 (800) SUELINE
            </div>
          </div>
          <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>🌐</div>
            <div style={{ fontSize: 14, color: "rgba(200,230,255,0.6)", fontFamily: "Arial, sans-serif", marginTop: 4 }}>
              www.suelinetours.com
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Brand footer */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [90, 110], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontSize: 13,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "Arial, sans-serif",
        }}
      >
        🌍 Sueline Tours & Travel — Discover the World, Your Way
      </div>
    </AbsoluteFill>
  );
};
