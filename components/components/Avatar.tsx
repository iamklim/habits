import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import TiredAnimation from "../../assets/animations/tired.json";

export const Avatar = () => {
  const [source, setSource] = useState(TiredAnimation);

  const animationRef = useRef(null);

  const onAnimationFinish = () => {
    // animationRef.current.play();
  };

  useEffect(() => {
    // animationRef.current.play();
  }, []);

  return (
    <LottieView
      ref={animationRef}
      source={source}
      loop={false}
      onAnimationFinish={onAnimationFinish}
    />
  );
};

export default Avatar;
