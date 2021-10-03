import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import BatteryAnimation from "../../assets/animations/battery.json";
import { useAppSelector } from "../../hooks/redux-hooks";
import { todayHabitsProgressSelector } from "../../store/schedule/scheduleSlice";

const ANIMATION_START_FRAME = 116;
const ANIMATION_END_FRAME = 93;
const ANIMATION_LENGTH = ANIMATION_START_FRAME - ANIMATION_END_FRAME;

export const Battery = () => {
  const [animationCurrentFrame, setAnimationCurrentFrame] = useState(
    ANIMATION_START_FRAME
  );

  const todayHabitsProgress = useAppSelector((state) =>
    todayHabitsProgressSelector({ state })
  );

  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (animationRef && animationRef.current) {
      animationRef.current.play(animationCurrentFrame, animationCurrentFrame);
    }
  }, []);

  useEffect(() => {
    const shouldBePlayedFrames = Math.round(
      (todayHabitsProgress * ANIMATION_LENGTH) / 100
    );
    const animationEndFrame = ANIMATION_START_FRAME - shouldBePlayedFrames;

    if (animationRef && animationRef.current) {
      animationRef.current.play(animationCurrentFrame, animationEndFrame);
      setAnimationCurrentFrame(animationEndFrame);
    }
  }, [todayHabitsProgress]);

  return (
    <LottieView ref={animationRef} source={BatteryAnimation} loop={false} />
  );
};

export default Battery;
