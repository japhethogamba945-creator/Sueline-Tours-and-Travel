import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const KENYA_GREEN = "#006600";
const KENYA_RED = "#BB0000";
const KENYA_BLACK = "#1a1a1a";
const KENYA_WHITE = "#FFFFFF";
const KENYA_GOLD = "#FFD700";

const fadeIn = (frame: number, start: number, duration = 15) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, start: number, duration = 20) =>
  interpolate(frame, [start, start + duration], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

// ==================== SCENE 1: HOOK ====================
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flagOpacity = fadeIn(frame, 0, 20);
  const emojiScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 8, stiffness: 80 } });
  const titleOpacity = fadeIn(frame, 30, 15);
  const titleY = slideUp(frame, 30, 20);
  const subtitleOpacity = fadeIn(frame, 60, 15);
  const bradOpacity = fadeIn(frame, 85, 15);
  const questionOpacity = fadeIn(frame, 120, 20);
  const questionScale = interpolate(frame, [120, 150, 155], [0.85, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #1a1a1a 35%, #003300 70%, #006600 100%)",
        overflow: "hidden",
      }}
    >
      {/* Kenyan flag stripe accents */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 14, background: KENYA_BLACK, opacity: flagOpacity }} />
      <div style={{ position: "absolute", top: 14, left: 0, right: 0, height: 14, background: KENYA_RED, opacity: flagOpacity }} />
      <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, height: 14, background: KENYA_RED, opacity: flagOpacity }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 14, background: KENYA_BLACK, opacity: flagOpacity }} />

      {/* Maasai shield watermark */}
      <div style={{
        position: "absolute",
        right: -60,
        top: "30%",
        fontSize: 300,
        opacity: 0.04,
        transform: "rotate(15deg)",
        userSelect: "none",
      }}>
        🛡️
      </div>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px",
          gap: 30,
        }}
      >
        {/* Kenya flag emoji */}
        <div style={{
          fontSize: 120,
          transform: `scale(${emojiScale})`,
          filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.6))",
          opacity: frame >= 10 ? 1 : 0,
        }}>
          🇰🇪
        </div>

        {/* Main hook headline */}
        <div style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}>
          <p style={{
            margin: 0,
            fontSize: 78,
            fontWeight: 900,
            color: KENYA_WHITE,
            fontFamily: "Impact, Arial Black, sans-serif",
            lineHeight: 1.05,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
          }}>
            WANT TO BECOME
          </p>
          <p style={{
            margin: 0,
            fontSize: 96,
            fontWeight: 900,
            color: KENYA_GOLD,
            fontFamily: "Impact, Arial Black, sans-serif",
            lineHeight: 1.05,
            textTransform: "uppercase",
            textShadow: "0 4px 20px rgba(255,180,0,0.5)",
          }}>
            KENYAN? 🤔
          </p>
        </div>

        {/* Teaser badge */}
        <div style={{
          opacity: subtitleOpacity,
          textAlign: "center",
          background: "rgba(0,0,0,0.55)",
          borderRadius: 18,
          padding: "18px 36px",
          border: `2px solid ${KENYA_RED}`,
        }}>
          <p style={{
            margin: 0,
            fontSize: 40,
            color: KENYA_WHITE,
            fontFamily: "Arial, sans-serif",
            fontWeight: 700,
          }}>
            It's ACTUALLY possible 👇
          </p>
        </div>

        {/* Brad character card */}
        <div style={{
          opacity: bradOpacity,
          transform: `translateX(${interpolate(bradOpacity, [0, 1], [-50, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: 20,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 22,
          padding: "22px 40px",
          border: `2px solid rgba(255,255,255,0.2)`,
        }}>
          <span style={{ fontSize: 72 }}>👨</span>
          <div>
            <p style={{
              margin: 0,
              fontSize: 38,
              fontWeight: 800,
              color: KENYA_GOLD,
              fontFamily: "Arial Black, sans-serif",
            }}>
              Meet BRAD 🇺🇸→🇰🇪
            </p>
            <p style={{
              margin: 0,
              fontSize: 30,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "Arial, sans-serif",
            }}>
              He's been trying for 8 years...
            </p>
          </div>
        </div>

        {/* Cliffhanger */}
        <div style={{
          opacity: questionOpacity,
          transform: `scale(${questionScale})`,
          textAlign: "center",
        }}>
          <p style={{
            margin: 0,
            fontSize: 44,
            color: KENYA_RED,
            fontFamily: "Arial Black, sans-serif",
            fontWeight: 900,
            textShadow: "0 2px 12px rgba(0,0,0,0.9)",
          }}>
            Here's what he DIDN'T know 👆
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ==================== SCENE 2: PROBLEM ====================
export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = fadeIn(frame, 0, 15);
  const item1Opacity = fadeIn(frame, 18, 15);
  const item2Opacity = fadeIn(frame, 38, 15);
  const item3Opacity = fadeIn(frame, 58, 15);
  const item4Opacity = fadeIn(frame, 78, 15);
  const punchlineOpacity = fadeIn(frame, 110, 20);
  const punchlineScale = interpolate(frame, [110, 135, 150], [0.85, 1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const CredentialRow: React.FC<{
    emoji: string;
    text: string;
    opacity: number;
    positive: boolean;
  }> = ({ emoji, text, opacity, positive }) => (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 18,
      opacity,
      transform: `translateX(${interpolate(opacity, [0, 1], [-40, 0])}px)`,
      background: positive ? "rgba(0,102,0,0.25)" : "rgba(187,0,0,0.2)",
      borderRadius: 16,
      padding: "18px 28px",
      border: `2px solid ${positive ? "#00aa00" : "#cc3333"}`,
      width: "100%",
    }}>
      <span style={{ fontSize: 50, flexShrink: 0 }}>{emoji}</span>
      <p style={{
        margin: 0,
        fontSize: 32,
        color: KENYA_WHITE,
        fontFamily: "Arial, sans-serif",
        fontWeight: 600,
        lineHeight: 1.3,
      }}>
        {text}
      </p>
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a0505 0%, #2d1010 60%, #0a150a 100%)",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 50px",
          gap: 20,
        }}
      >
        <div style={{ opacity: titleOpacity, textAlign: "center" }}>
          <p style={{
            margin: 0,
            fontSize: 56,
            fontWeight: 900,
            color: KENYA_WHITE,
            fontFamily: "Arial Black, sans-serif",
            textTransform: "uppercase",
          }}>
            Brad's Kenyan "Resume" 📋
          </p>
        </div>

        <CredentialRow
          emoji="✅"
          text="Lived in Nairobi for 8 YEARS"
          opacity={item1Opacity}
          positive
        />
        <CredentialRow
          emoji="✅"
          text="Married Wanjiru (8 years ago!)"
          opacity={item2Opacity}
          positive
        />
        <CredentialRow
          emoji="✅"
          text="Pays KRA taxes every year"
          opacity={item3Opacity}
          positive
        />
        <CredentialRow
          emoji="❌"
          text="Knows HOW to legally become Kenyan"
          opacity={item4Opacity}
          positive={false}
        />

        {frame >= 110 && (
          <div style={{
            opacity: punchlineOpacity,
            transform: `scale(${punchlineScale})`,
            background: `linear-gradient(135deg, ${KENYA_RED}, #990000)`,
            borderRadius: 22,
            padding: "26px 40px",
            textAlign: "center",
            border: `3px solid ${KENYA_GOLD}`,
            width: "100%",
          }}>
            <p style={{
              margin: 0,
              fontSize: 38,
              fontWeight: 800,
              color: KENYA_WHITE,
              fontFamily: "Arial, sans-serif",
              lineHeight: 1.3,
            }}>
              Under Kenyan law, there are
            </p>
            <p style={{
              margin: 0,
              fontSize: 72,
              fontWeight: 900,
              color: KENYA_GOLD,
              fontFamily: "Impact, sans-serif",
              lineHeight: 1.1,
            }}>
              3 LEGAL ROUTES! 🚀
            </p>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ==================== SCENE 3A: BY BIRTH ====================
export const BirthScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });
  const routeOpacity = fadeIn(frame, 10, 15);
  const titleOpacity = fadeIn(frame, 20, 15);
  const ruleOpacity = fadeIn(frame, 38, 18);
  const exampleOpacity = fadeIn(frame, 62, 18);
  const lawOpacity = fadeIn(frame, 90, 15);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${KENYA_GREEN} 0%, #004400 55%, #001a00 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Decorative background circle */}
      <div style={{
        position: "absolute",
        top: -120,
        right: -120,
        width: 450,
        height: 450,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
      }} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 55px",
          gap: 26,
        }}
      >
        {/* Badge */}
        <div style={{
          transform: `scale(${badgeScale})`,
          background: KENYA_GOLD,
          borderRadius: "50%",
          width: 110,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(255,215,0,0.55)",
        }}>
          <span style={{ fontSize: 56, fontWeight: 900, color: KENYA_BLACK, fontFamily: "Impact, sans-serif" }}>1</span>
        </div>

        {/* Route label */}
        <div style={{ opacity: routeOpacity, textAlign: "center" }}>
          <p style={{
            margin: 0,
            fontSize: 36,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            Route 1
          </p>
        </div>

        {/* Method title */}
        <div style={{ opacity: titleOpacity, textAlign: "center" }}>
          <p style={{
            margin: 0,
            fontSize: 88,
            fontWeight: 900,
            color: KENYA_WHITE,
            fontFamily: "Impact, Arial Black, sans-serif",
            textTransform: "uppercase",
            lineHeight: 1,
            textShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}>
            BY BIRTH 👶
          </p>
        </div>

        {/* Rule box */}
        <div style={{
          opacity: ruleOpacity,
          background: "rgba(0,0,0,0.45)",
          borderRadius: 20,
          padding: "26px 36px",
          textAlign: "center",
          border: "2px solid rgba(255,255,255,0.2)",
          width: "100%",
        }}>
          <p style={{
            margin: 0,
            fontSize: 36,
            color: KENYA_WHITE,
            fontFamily: "Arial, sans-serif",
            fontWeight: 600,
            lineHeight: 1.45,
          }}>
            Born to at least{" "}
            <span style={{ color: KENYA_GOLD, fontWeight: 900 }}>ONE Kenyan parent</span>
            {" "}= Automatic citizen 🎯
          </p>
        </div>

        {/* Example card */}
        <div style={{
          opacity: exampleOpacity,
          transform: `translateY(${interpolate(exampleOpacity, [0, 1], [30, 0])}px)`,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "22px 32px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 18,
          border: `2px solid ${KENYA_GOLD}`,
        }}>
          <span style={{ fontSize: 64, flexShrink: 0 }}>👧</span>
          <div>
            <p style={{
              margin: 0,
              fontSize: 32,
              color: KENYA_GOLD,
              fontFamily: "Arial Black, sans-serif",
              fontWeight: 800,
            }}>
              Example: Amara
            </p>
            <p style={{
              margin: "6px 0 0",
              fontSize: 28,
              color: "rgba(255,255,255,0.88)",
              fontFamily: "Arial, sans-serif",
              lineHeight: 1.4,
            }}>
              Dad is American 🇺🇸, Mom from Nakuru 🇰🇪
              {"\n"}→ Amara is KENYAN ✅
            </p>
          </div>
        </div>

        {/* Law reference */}
        <div style={{
          opacity: lawOpacity,
          background: "rgba(0,0,0,0.65)",
          borderRadius: 12,
          padding: "12px 24px",
          border: `1px solid rgba(255,215,0,0.4)`,
        }}>
          <p style={{
            margin: 0,
            fontSize: 24,
            color: "rgba(255,215,0,0.85)",
            fontFamily: "monospace",
            fontStyle: "italic",
          }}>
            📜 Citizenship & Immigration Act 2011 — Sec. 14
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ==================== SCENE 3B: BY MARRIAGE ====================
export const MarriageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });
  const titleOpacity = fadeIn(frame, 20, 15);
  const reqsOpacity = fadeIn(frame, 38, 18);
  const bradOpacity = fadeIn(frame, 62, 18);
  const celebrateOpacity = fadeIn(frame, 88, 20);
  const celebrateScale = spring({ frame: Math.max(0, frame - 88), fps, config: { damping: 6, stiffness: 110 } });
  const lawOpacity = fadeIn(frame, 100, 15);

  const requirements = [
    "💍 Married to a Kenyan citizen",
    "📅 For at least 3 YEARS",
    "📝 Apply to Cabinet Secretary",
    "🤝 Take Oath of Allegiance",
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #6b0000 0%, ${KENYA_RED} 45%, #800000 100%)`,
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute",
        bottom: -80,
        left: -80,
        width: 420,
        height: 420,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
      }} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 55px",
          gap: 22,
        }}
      >
        {/* Badge */}
        <div style={{
          transform: `scale(${badgeScale})`,
          background: KENYA_GOLD,
          borderRadius: "50%",
          width: 110,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(255,215,0,0.55)",
        }}>
          <span style={{ fontSize: 56, fontWeight: 900, color: KENYA_BLACK, fontFamily: "Impact, sans-serif" }}>2</span>
        </div>

        {/* Method title */}
        <div style={{ opacity: titleOpacity, textAlign: "center" }}>
          <p style={{
            margin: 0,
            fontSize: 36,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            Route 2
          </p>
          <p style={{
            margin: 0,
            fontSize: 84,
            fontWeight: 900,
            color: KENYA_WHITE,
            fontFamily: "Impact, Arial Black, sans-serif",
            textTransform: "uppercase",
            lineHeight: 1,
          }}>
            BY MARRIAGE 💍
          </p>
        </div>

        {/* Requirements list */}
        <div style={{
          opacity: reqsOpacity,
          background: "rgba(0,0,0,0.4)",
          borderRadius: 20,
          padding: "22px 32px",
          width: "100%",
          border: "2px solid rgba(255,255,255,0.2)",
        }}>
          {requirements.map((item, i) => (
            <p key={i} style={{
              margin: "8px 0",
              fontSize: 30,
              color: KENYA_WHITE,
              fontFamily: "Arial, sans-serif",
              fontWeight: 500,
            }}>
              {item}
            </p>
          ))}
        </div>

        {/* Brad's story */}
        <div style={{
          opacity: bradOpacity,
          transform: `translateX(${interpolate(bradOpacity, [0, 1], [50, 0])}px)`,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "22px 32px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 18,
          border: `2px solid ${KENYA_GOLD}`,
        }}>
          <span style={{ fontSize: 60, flexShrink: 0 }}>👨‍❤️‍👩</span>
          <div>
            <p style={{
              margin: 0,
              fontSize: 32,
              color: KENYA_GOLD,
              fontFamily: "Arial Black, sans-serif",
              fontWeight: 800,
            }}>
              Brad ❤️ Wanjiru — 8 years!
            </p>
            <p style={{
              margin: "6px 0 0",
              fontSize: 28,
              color: "rgba(255,255,255,0.88)",
              fontFamily: "Arial, sans-serif",
            }}>
              Brad QUALIFIES for this route! ✅
            </p>
          </div>
        </div>

        {/* Celebration */}
        {frame >= 88 && (
          <div style={{
            opacity: celebrateOpacity,
            transform: `scale(${celebrateScale})`,
            textAlign: "center",
          }}>
            <p style={{
              margin: 0,
              fontSize: 54,
              color: KENYA_GOLD,
              fontFamily: "Impact, sans-serif",
              fontWeight: 900,
              textShadow: "0 4px 24px rgba(255,215,0,0.7)",
            }}>
              🎉 HE'S GOT A PATH! 🎉
            </p>
          </div>
        )}

        <div style={{
          opacity: lawOpacity,
          background: "rgba(0,0,0,0.65)",
          borderRadius: 12,
          padding: "12px 24px",
          border: `1px solid rgba(255,215,0,0.4)`,
        }}>
          <p style={{
            margin: 0,
            fontSize: 24,
            color: "rgba(255,215,0,0.85)",
            fontFamily: "monospace",
            fontStyle: "italic",
          }}>
            📜 Citizenship & Immigration Act 2011 — Sec. 16
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ==================== SCENE 3C: BY NATURALIZATION ====================
export const NaturalizationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });
  const titleOpacity = fadeIn(frame, 20, 15);
  const req1Opacity = fadeIn(frame, 36, 15);
  const req2Opacity = fadeIn(frame, 56, 15);
  const req3Opacity = fadeIn(frame, 76, 15);
  const exampleOpacity = fadeIn(frame, 92, 18);
  const lawOpacity = fadeIn(frame, 105, 15);

  const reqs = [
    { emoji: "📅", text: "Legally resident in Kenya for 7+ CONTINUOUS years" },
    { emoji: "✋", text: "Good character & no criminal record" },
    { emoji: "📬", text: "Apply to Cabinet Secretary + take Oath of Allegiance" },
  ];

  const reqOpacities = [req1Opacity, req2Opacity, req3Opacity];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #050510 0%, #0d1b2a 55%, #1a2a40 100%)",
        overflow: "hidden",
      }}
    >
      {/* Subtle horizontal lines */}
      {[...Array(9)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          top: `${i * 12}%`,
          left: 0, right: 0,
          height: 1,
          background: "rgba(255,255,255,0.025)",
        }} />
      ))}

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 55px",
          gap: 22,
        }}
      >
        {/* Badge */}
        <div style={{
          transform: `scale(${badgeScale})`,
          background: KENYA_GOLD,
          borderRadius: "50%",
          width: 110,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(255,215,0,0.55)",
        }}>
          <span style={{ fontSize: 56, fontWeight: 900, color: KENYA_BLACK, fontFamily: "Impact, sans-serif" }}>3</span>
        </div>

        {/* Method title */}
        <div style={{ opacity: titleOpacity, textAlign: "center" }}>
          <p style={{
            margin: 0,
            fontSize: 36,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            Route 3
          </p>
          <p style={{
            margin: 0,
            fontSize: 68,
            fontWeight: 900,
            color: KENYA_WHITE,
            fontFamily: "Impact, Arial Black, sans-serif",
            textTransform: "uppercase",
            lineHeight: 1,
          }}>
            NATURALIZATION 📋
          </p>
        </div>

        {/* Requirements */}
        {reqs.map((req, i) => (
          <div key={i} style={{
            opacity: reqOpacities[i],
            transform: `translateX(${interpolate(reqOpacities[i], [0, 1], [-50, 0])}px)`,
            background: "rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: "18px 28px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 18,
            border: "1px solid rgba(255,255,255,0.14)",
          }}>
            <span style={{ fontSize: 46, flexShrink: 0 }}>{req.emoji}</span>
            <p style={{
              margin: 0,
              fontSize: 28,
              color: KENYA_WHITE,
              fontFamily: "Arial, sans-serif",
              fontWeight: 500,
              lineHeight: 1.4,
            }}>
              {req.text}
            </p>
          </div>
        ))}

        {/* Example card */}
        <div style={{
          opacity: exampleOpacity,
          transform: `translateY(${interpolate(exampleOpacity, [0, 1], [30, 0])}px)`,
          background: "rgba(0,102,0,0.22)",
          borderRadius: 20,
          padding: "22px 32px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 18,
          border: `2px solid ${KENYA_GOLD}`,
        }}>
          <span style={{ fontSize: 60, flexShrink: 0 }}>🧑‍💼</span>
          <div>
            <p style={{
              margin: 0,
              fontSize: 32,
              color: KENYA_GOLD,
              fontFamily: "Arial Black, sans-serif",
              fontWeight: 800,
            }}>
              Example: Priya from India
            </p>
            <p style={{
              margin: "6px 0 0",
              fontSize: 28,
              color: "rgba(255,255,255,0.88)",
              fontFamily: "Arial, sans-serif",
              lineHeight: 1.4,
            }}>
              10 yrs in Mombasa, runs a business 🏪
              {"\n"}→ She QUALIFIES! ✅
            </p>
          </div>
        </div>

        <div style={{
          opacity: lawOpacity,
          background: "rgba(0,0,0,0.65)",
          borderRadius: 12,
          padding: "12px 24px",
          border: `1px solid rgba(255,215,0,0.4)`,
        }}>
          <p style={{
            margin: 0,
            fontSize: 24,
            color: "rgba(255,215,0,0.85)",
            fontFamily: "monospace",
            fontStyle: "italic",
          }}>
            📜 Citizenship & Immigration Act 2011 — Sec. 18
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ==================== SCENE 4: RESOLUTION ====================
export const ResolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = fadeIn(frame, 0, 20);
  const step1Opacity = fadeIn(frame, 22, 15);
  const step2Opacity = fadeIn(frame, 48, 15);
  const step3Opacity = fadeIn(frame, 74, 15);
  const step4Opacity = fadeIn(frame, 100, 15);
  const resultOpacity = fadeIn(frame, 130, 22);
  const resultScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 6, stiffness: 80 } });

  const steps = [
    { emoji: "📄", text: "Gather docs (marriage cert, passport, affidavit)", opacity: step1Opacity },
    { emoji: "🔍", text: "Get DCI Certificate of Good Conduct", opacity: step2Opacity },
    { emoji: "📬", text: "Apply to Cabinet Secretary (Interior)", opacity: step3Opacity },
    { emoji: "✋", text: "Swear Oath of Allegiance to Kenya", opacity: step4Opacity },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #002200 0%, #005500 40%, #8b0000 100%)",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 55px",
          gap: 20,
        }}
      >
        {/* Title */}
        <div style={{ opacity: titleOpacity, textAlign: "center" }}>
          <p style={{
            margin: 0,
            fontSize: 52,
            fontWeight: 900,
            color: KENYA_GOLD,
            fontFamily: "Arial Black, sans-serif",
          }}>
            Brad's Game Plan 🗺️
          </p>
          <p style={{
            margin: 0,
            fontSize: 30,
            color: "rgba(255,255,255,0.75)",
            fontFamily: "Arial, sans-serif",
          }}>
            (Marriage Route — Sec. 16)
          </p>
        </div>

        {/* Steps */}
        {steps.map((step, i) => (
          <div key={i} style={{
            opacity: step.opacity,
            transform: `translateX(${interpolate(step.opacity, [0, 1], [60, 0])}px)`,
            background: "rgba(0,0,0,0.45)",
            borderRadius: 16,
            padding: "18px 26px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 18,
            border: "1px solid rgba(255,255,255,0.18)",
          }}>
            <div style={{
              background: KENYA_GOLD,
              borderRadius: "50%",
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 900,
              color: KENYA_BLACK,
              fontFamily: "Impact, sans-serif",
              flexShrink: 0,
            }}>
              {i + 1}
            </div>
            <span style={{ fontSize: 38, flexShrink: 0 }}>{step.emoji}</span>
            <p style={{
              margin: 0,
              fontSize: 28,
              color: KENYA_WHITE,
              fontFamily: "Arial, sans-serif",
              fontWeight: 500,
              lineHeight: 1.35,
            }}>
              {step.text}
            </p>
          </div>
        ))}

        {/* Final celebration */}
        {frame >= 130 && (
          <div style={{
            opacity: resultOpacity,
            transform: `scale(${resultScale})`,
            background: `linear-gradient(135deg, ${KENYA_GOLD}, #FFA500)`,
            borderRadius: 24,
            padding: "28px 36px",
            textAlign: "center",
            boxShadow: "0 8px 48px rgba(255,215,0,0.6)",
            width: "100%",
          }}>
            <p style={{
              margin: 0,
              fontSize: 40,
              fontWeight: 900,
              color: KENYA_BLACK,
              fontFamily: "Arial Black, sans-serif",
            }}>
              🎊 KARIBU KENYA, BRAD! 🎊
            </p>
            <p style={{
              margin: "10px 0 0",
              fontSize: 30,
              color: "#3d1a00",
              fontFamily: "Arial, sans-serif",
              fontWeight: 700,
            }}>
              🇰🇪 Official Kenyan Citizen! 🇰🇪
            </p>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ==================== SCENE 5: CTA ====================
export const CitizenshipCtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flagScale = spring({ frame, fps, config: { damping: 8, stiffness: 80 } });
  const titleOpacity = fadeIn(frame, 18, 20);
  const recapOpacity = fadeIn(frame, 42, 20);
  const ctaOpacity = fadeIn(frame, 70, 20);
  const hashtagOpacity = fadeIn(frame, 95, 18);
  const brandOpacity = fadeIn(frame, 115, 18);

  const pulse = interpolate(
    (frame - 70) % 60,
    [0, 30, 60],
    [1, 1.04, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #000000 0%, #0d0d0d 40%, #003300 75%, #006600 100%)",
        overflow: "hidden",
      }}
    >
      {/* Kenyan flag stripe accents */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 14, background: KENYA_BLACK }} />
      <div style={{ position: "absolute", top: 14, left: 0, right: 0, height: 14, background: KENYA_RED }} />
      <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, height: 14, background: KENYA_RED }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 14, background: KENYA_BLACK }} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 55px",
          gap: 26,
        }}
      >
        {/* Kenya flag */}
        <div style={{
          fontSize: 110,
          transform: `scale(${flagScale})`,
          filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.6))",
        }}>
          🇰🇪
        </div>

        {/* "Now you know" headline */}
        <div style={{ opacity: titleOpacity, textAlign: "center" }}>
          <p style={{
            margin: 0,
            fontSize: 50,
            fontWeight: 900,
            color: KENYA_WHITE,
            fontFamily: "Arial Black, sans-serif",
            lineHeight: 1.2,
          }}>
            Now you KNOW the
          </p>
          <p style={{
            margin: 0,
            fontSize: 72,
            fontWeight: 900,
            color: KENYA_GOLD,
            fontFamily: "Impact, sans-serif",
            textTransform: "uppercase",
          }}>
            3 ROUTES! 🚀
          </p>
        </div>

        {/* Quick recap */}
        <div style={{
          opacity: recapOpacity,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 18,
          padding: "22px 32px",
          width: "100%",
          border: "1px solid rgba(255,255,255,0.18)",
        }}>
          {[
            "1️⃣  BY BIRTH — Kenyan parent",
            "2️⃣  BY MARRIAGE — 3+ years",
            "3️⃣  BY NATURALIZATION — 7+ years",
          ].map((item, i) => (
            <p key={i} style={{
              margin: "8px 0",
              fontSize: 30,
              color: KENYA_WHITE,
              fontFamily: "Arial, sans-serif",
              fontWeight: 600,
            }}>
              {item}
            </p>
          ))}
        </div>

        {/* CTA button */}
        <div style={{
          opacity: ctaOpacity,
          transform: frame >= 70 ? `scale(${pulse})` : "scale(1)",
          background: `linear-gradient(135deg, ${KENYA_RED}, #990000)`,
          borderRadius: 22,
          padding: "26px 40px",
          textAlign: "center",
          width: "100%",
          border: `3px solid ${KENYA_GOLD}`,
          boxShadow: "0 6px 32px rgba(187,0,0,0.45)",
        }}>
          <p style={{
            margin: 0,
            fontSize: 40,
            fontWeight: 800,
            color: KENYA_WHITE,
            fontFamily: "Arial Black, sans-serif",
          }}>
            👇 Share with someone who needs this!
          </p>
        </div>

        {/* Hashtags */}
        <div style={{ opacity: hashtagOpacity, textAlign: "center" }}>
          <p style={{
            margin: 0,
            fontSize: 26,
            color: "rgba(255,215,0,0.8)",
            fontFamily: "Arial, sans-serif",
          }}>
            #KenyanCitizenship #KenyanLaw #LearnOnTikTok 🇰🇪
          </p>
        </div>

        {/* Brand */}
        <div style={{ opacity: brandOpacity, textAlign: "center" }}>
          <p style={{
            margin: 0,
            fontSize: 24,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            letterSpacing: "0.06em",
          }}>
            Sueline Tours & Travel
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
