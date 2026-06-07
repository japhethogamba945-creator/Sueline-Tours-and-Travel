import React from "react";
import { Composition } from "remotion";
import { SuelineTours } from "./SuelineTours";
import { KenyanCitizenshipTikTok } from "./KenyanCitizenshipTikTok";

const SUELINE_FRAMES = 420;
// 7 scenes (990f total) - 6 transitions × 15f = 900f = 30s at 30fps
const CITIZENSHIP_FRAMES = 900;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SuelineTours"
        component={SuelineTours}
        durationInFrames={SUELINE_FRAMES}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="KenyanCitizenshipTikTok"
        component={KenyanCitizenshipTikTok}
        durationInFrames={CITIZENSHIP_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
