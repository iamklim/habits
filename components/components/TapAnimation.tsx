import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { TLottieAnimation } from "../../types/types";

interface ITapAnimationProps {
  source: TLottieAnimation;
  speed?: number;
}

export const TapAnimation = ({ source, speed = 1 }: ITapAnimationProps) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (animationRef && animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return <LottieView ref={animationRef} source={source} speed={speed} />;
};

export default TapAnimation;
