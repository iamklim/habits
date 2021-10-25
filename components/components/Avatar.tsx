import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import OffIdleAnimation from "../../assets/animations/off-idle.json";
import Idle1Animation from "../../assets/animations/idle-1.json";
import Idle2Animation from "../../assets/animations/idle-2.json";
import IdleLikeIdleAnimation from "../../assets/animations/idle-like-idle.json";
import IdleSleepAnimation from "../../assets/animations/idle-sleep.json";
import SleepAnimation from "../../assets/animations/sleep.json";
import SleepIdleAnimation from "../../assets/animations/sleep-idle.json";
import { useAppSelector } from "../../hooks/redux-hooks";
import {
  avatarIsActivatedSelector,
  avatarSpeechesSelector,
  todayHabitsProgressSelector,
} from "../../store/schedule/scheduleSlice";
import { AvatarStateEnum, TLottieAnimation } from "../../types/types";
import { Animated, Easing } from "react-native";

const getSource = (status: AvatarStateEnum): TLottieAnimation => {
  switch (status) {
    case AvatarStateEnum.OFF_IDLE:
      return OffIdleAnimation;
    case AvatarStateEnum.IDLE_1:
      return Idle1Animation;
    case AvatarStateEnum.IDLE_2:
      return Idle2Animation;
    case AvatarStateEnum.IDLE_LIKE_IDLE:
      return IdleLikeIdleAnimation;
    case AvatarStateEnum.IDLE_SLEEP:
      return IdleSleepAnimation;
    case AvatarStateEnum.SLEEP:
      return SleepAnimation;
    case AvatarStateEnum.SLEEP_IDLE:
      return SleepIdleAnimation;
    default:
      return Idle1Animation;
  }
};

export const Avatar = () => {
  const [avatarStatus, setAvatarStatus] = useState<AvatarStateEnum>(
    AvatarStateEnum.OFF_IDLE
  );
  const [isFinished, setIsFinished] = useState(false);
  const [animation, setAnimation] =
    useState<Animated.CompositeAnimation | null>(null);

  const avatarIsActivated = useAppSelector((state) =>
    avatarIsActivatedSelector({ state })
  );
  const todayHabitsProgress = useAppSelector((state) =>
    todayHabitsProgressSelector({ state })
  );
  const speeches = useAppSelector((state) => avatarSpeechesSelector({ state }));

  const prevTodayHabitsProgressRef = useRef<number | null>(null);
  const progressAnimation = useRef(new Animated.Value(0)).current;

  const runAnimation = (nextAvatarStatus: AvatarStateEnum) => {
    if (animation) {
      animation.reset();
    }

    setAvatarStatus(nextAvatarStatus);
    setIsFinished(false);

    const isShortAnimation =
      nextAvatarStatus === AvatarStateEnum.OFF_IDLE ||
      nextAvatarStatus === AvatarStateEnum.IDLE_SLEEP ||
      nextAvatarStatus === AvatarStateEnum.SLEEP_IDLE;

    const duration = isShortAnimation ? 1000 : 3000;

    const nextAnimation = Animated.timing(progressAnimation, {
      duration,
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    setAnimation(nextAnimation);

    nextAnimation.start(() => {
      setIsFinished(true);
    });
  };

  useEffect(() => {
    if (isFinished) {
      let nextAvatarStatus = avatarStatus;
      const isAvatarTired = todayHabitsProgress <= 10;
      const isCurrProgressBiggerThanPrev =
        prevTodayHabitsProgressRef.current &&
        todayHabitsProgress > prevTodayHabitsProgressRef.current;
      const isSpeechesEmpty = speeches.length === 0;

      if (avatarStatus === AvatarStateEnum.OFF_IDLE) {
        nextAvatarStatus = AvatarStateEnum.IDLE_1;
      }

      if (avatarStatus === AvatarStateEnum.IDLE_1) {
        if (isAvatarTired && isSpeechesEmpty) {
          nextAvatarStatus = AvatarStateEnum.IDLE_SLEEP;
        } else {
          if (isCurrProgressBiggerThanPrev) {
            nextAvatarStatus = AvatarStateEnum.IDLE_LIKE_IDLE;
          } else {
            nextAvatarStatus = AvatarStateEnum.IDLE_2;
          }
        }
      }

      if (avatarStatus === AvatarStateEnum.IDLE_2) {
        if (isAvatarTired && isSpeechesEmpty) {
          nextAvatarStatus = AvatarStateEnum.IDLE_SLEEP;
        } else {
          if (isCurrProgressBiggerThanPrev) {
            nextAvatarStatus = AvatarStateEnum.IDLE_LIKE_IDLE;
          } else {
            nextAvatarStatus = AvatarStateEnum.IDLE_1;
          }
        }
      }

      if (avatarStatus === AvatarStateEnum.IDLE_LIKE_IDLE) {
        nextAvatarStatus = AvatarStateEnum.IDLE_1;
      }

      if (avatarStatus === AvatarStateEnum.IDLE_SLEEP) {
        nextAvatarStatus = AvatarStateEnum.SLEEP;
      }

      if (avatarStatus === AvatarStateEnum.SLEEP) {
        if (!isAvatarTired) {
          nextAvatarStatus = AvatarStateEnum.SLEEP_IDLE;
        }
      }

      if (avatarStatus === AvatarStateEnum.SLEEP_IDLE) {
        nextAvatarStatus = AvatarStateEnum.IDLE_1;
      }

      prevTodayHabitsProgressRef.current = todayHabitsProgress;

      runAnimation(nextAvatarStatus);
    }
  }, [isFinished, todayHabitsProgress, speeches]);

  useEffect(() => {
    if (avatarIsActivated) {
      runAnimation(AvatarStateEnum.OFF_IDLE);
    }
  }, [avatarIsActivated]);

  return (
    <LottieView source={getSource(avatarStatus)} progress={progressAnimation} />
  );
};

export default Avatar;
