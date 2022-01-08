import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import OffIdleAnimation from "../../assets/animations/off-idle.json";
import Idle1Animation from "../../assets/animations/idle-1.json";
import Idle2Animation from "../../assets/animations/idle-2.json";
import Idle1FullAnimation from "../../assets/animations/idle-1-full.json";
import Idle2FullAnimation from "../../assets/animations/idle-2-full.json";
import IdleLoveIdleAnimation from "../../assets/animations/idle-love-idle.json";
import IdleLikeIdleAnimation from "../../assets/animations/idle-like-idle.json";
import IdleSleepAnimation from "../../assets/animations/idle-sleep.json";
import SleepAnimation from "../../assets/animations/sleep.json";
import SleepIdleAnimation from "../../assets/animations/sleep-idle.json";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  avatarIsActivatedSelector,
  avatarSpeechesSelector,
  setAvatarSpeeches,
  todayHabitsProgressSelector,
} from "../../store/schedule/scheduleSlice";
import { AvatarStateEnum, TLottieAnimation } from "../../types/types";
import { Animated, Easing } from "react-native";
import {
  AVATAR_MOTIVATIONAL_SPEECHES,
  AvatarReactionType,
} from "../../constants/avatar.constants";

const getSource = (status: AvatarStateEnum): TLottieAnimation => {
  switch (status) {
    case AvatarStateEnum.OFF_IDLE:
      return OffIdleAnimation;
    case AvatarStateEnum.IDLE_1:
      return Idle1Animation;
    case AvatarStateEnum.IDLE_2:
      return Idle2Animation;
    case AvatarStateEnum.IDLE_1_FULL:
      return Idle1FullAnimation;
    case AvatarStateEnum.IDLE_2_FULL:
      return Idle2FullAnimation;
    case AvatarStateEnum.IDLE_LOVE_IDLE:
      return IdleLoveIdleAnimation;
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

const getRandomOption = (options: any[]) => {
  return options[Math.floor(Math.random() * options.length)];
};

export const Avatar = () => {
  const [avatarStatus, setAvatarStatus] = useState<AvatarStateEnum>(
    AvatarStateEnum.OFF_IDLE
  );
  const [isFinished, setIsFinished] = useState(false);
  const [animation, setAnimation] =
    useState<Animated.CompositeAnimation | null>(null);

  const dispatch = useAppDispatch();

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
      const isAvatarFull = todayHabitsProgress >= 100;
      const isCurrProgressBiggerThanPrev =
        prevTodayHabitsProgressRef.current &&
        todayHabitsProgress > prevTodayHabitsProgressRef.current;
      const isSpeechesEmpty = speeches.length === 0;

      if (avatarStatus === AvatarStateEnum.OFF_IDLE) {
        nextAvatarStatus = AvatarStateEnum.IDLE_1;
      }

      if (
        avatarStatus === AvatarStateEnum.IDLE_1 ||
        avatarStatus === AvatarStateEnum.IDLE_1_FULL
      ) {
        if (isAvatarTired && isSpeechesEmpty) {
          nextAvatarStatus = AvatarStateEnum.IDLE_SLEEP;
        } else {
          if (isAvatarFull) {
            nextAvatarStatus = AvatarStateEnum.IDLE_2_FULL;
          } else if (isCurrProgressBiggerThanPrev) {
            const reactionType = getRandomOption([
              AvatarReactionType.ANIMATION,
              AvatarReactionType.SPEECH,
            ]);

            if (reactionType === AvatarReactionType.ANIMATION) {
              nextAvatarStatus = getRandomOption([
                AvatarStateEnum.IDLE_LOVE_IDLE,
                AvatarStateEnum.IDLE_LIKE_IDLE,
              ]);
            } else {
              const speech = getRandomOption(AVATAR_MOTIVATIONAL_SPEECHES);
              dispatch(setAvatarSpeeches([speech]));
              nextAvatarStatus = AvatarStateEnum.IDLE_2;
            }
          } else {
            nextAvatarStatus = AvatarStateEnum.IDLE_2;
          }
        }
      }

      if (
        avatarStatus === AvatarStateEnum.IDLE_2 ||
        avatarStatus === AvatarStateEnum.IDLE_2_FULL
      ) {
        if (isAvatarTired && isSpeechesEmpty) {
          nextAvatarStatus = AvatarStateEnum.IDLE_SLEEP;
        } else {
          if (isAvatarFull) {
            nextAvatarStatus = AvatarStateEnum.IDLE_1_FULL;
          } else if (isCurrProgressBiggerThanPrev) {
            const reactionType = getRandomOption([
              AvatarReactionType.ANIMATION,
              AvatarReactionType.SPEECH,
            ]);

            if (reactionType === AvatarReactionType.ANIMATION) {
              nextAvatarStatus = getRandomOption([
                AvatarStateEnum.IDLE_LOVE_IDLE,
                AvatarStateEnum.IDLE_LIKE_IDLE,
              ]);
            } else {
              const speech = getRandomOption(AVATAR_MOTIVATIONAL_SPEECHES);
              dispatch(setAvatarSpeeches([speech]));
              nextAvatarStatus = AvatarStateEnum.IDLE_1;
            }
          } else {
            nextAvatarStatus = AvatarStateEnum.IDLE_1;
          }
        }
      }

      if (
        avatarStatus === AvatarStateEnum.IDLE_LOVE_IDLE ||
        avatarStatus === AvatarStateEnum.IDLE_LIKE_IDLE
      ) {
        if (isAvatarFull) {
          nextAvatarStatus = AvatarStateEnum.IDLE_1_FULL;
        } else {
          nextAvatarStatus = AvatarStateEnum.IDLE_1;
        }
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
