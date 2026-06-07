import React from "react";
import { Composition } from "remotion";
import { SuelineTours } from "./SuelineTours";

// Total frames: 120 + 120 + 110 + 130 - 3×20 (transitions) = 420 frames = 14s at 30fps
const TOTAL_FRAMES = 420;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="SuelineTours"
      component={SuelineTours}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
