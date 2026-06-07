import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import {
  HookScene,
  ProblemScene,
  BirthScene,
  MarriageScene,
  NaturalizationScene,
  ResolutionScene,
  CitizenshipCtaScene,
} from "./scenes/KenyanCitizenshipScenes";

// 7 scenes × varied durations, 6 transitions × 15f = 90f overlap
// Total playback = 990 - 90 = 900 frames = 30s at 30fps
const T = 15;

export const KenyanCitizenshipTikTok: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Hook — 155f (~5.2s) */}
        <TransitionSeries.Sequence durationInFrames={155}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* Scene 2: Problem — 150f (5s) */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <ProblemScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* Scene 3A: By Birth — 120f (4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <BirthScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* Scene 3B: By Marriage — 120f (4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <MarriageScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* Scene 3C: By Naturalization — 120f (4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <NaturalizationScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* Scene 4: Resolution — 175f (~5.8s) */}
        <TransitionSeries.Sequence durationInFrames={175}>
          <ResolutionScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* Scene 5: CTA — 150f (5s) */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <CitizenshipCtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
