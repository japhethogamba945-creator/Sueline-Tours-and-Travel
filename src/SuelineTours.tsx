import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { IntroScene } from "./scenes/IntroScene";
import { DestinationsScene } from "./scenes/DestinationsScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { CtaScene } from "./scenes/CtaScene";

const TRANSITION_FRAMES = 20;

export const SuelineTours: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Intro — 120 frames (4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 2: Destinations — 120 frames (4s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <DestinationsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 3: Features — 110 frames (~3.7s) */}
        <TransitionSeries.Sequence durationInFrames={110}>
          <FeaturesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 4: CTA — 130 frames (~4.3s) */}
        <TransitionSeries.Sequence durationInFrames={130}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
