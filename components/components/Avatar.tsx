import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import OffIdleAnimation from "../../assets/animations/off-idle.json";
import Idle1Animation from "../../assets/animations/idle-1.json";
import Idle2Animation from "../../assets/animations/idle-2.json";
import IdleLoveIdleAnimation from "../../assets/animations/idle-love-idle.json";
import IdleSleepAnimation from "../../assets/animations/idle-sleep.json";
import SleepAnimation from "../../assets/animations/sleep.json";
import SleepIdleAnimation from "../../assets/animations/sleep-idle.json";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  avatarIsActivatedSelector,
  avatarSpeechesSelector,
  avatarStatusSelector,
  setAvatarStatus,
  todayHabitsProgressSelector,
} from "../../store/schedule/scheduleSlice";
import { AvatarStateEnum, TLottieAnimation } from "../../types/types";
import { Animated, Easing } from "react-native";

export const Avatar = () => {
  const dispatch = useAppDispatch();
  const [source, setSource] = useState<TLottieAnimation | null>(null);
  const [isFinished, setIsFinished] = useState(true);

  const progressAnim = useRef(new Animated.Value(0)).current;

  const avatarStatus = useAppSelector((state) =>
    avatarStatusSelector({ state })
  );
  const avatarIsActivated = useAppSelector((state) =>
    avatarIsActivatedSelector({ state })
  );
  const todayHabitsProgress = useAppSelector((state) =>
    todayHabitsProgressSelector({ state })
  );
  const speeches = useAppSelector((state) => avatarSpeechesSelector({ state }));

  const runAnimation = () => {
    setIsFinished(false);

    const isShortAnimation =
      avatarStatus === AvatarStateEnum.OFF_IDLE ||
      avatarStatus === AvatarStateEnum.IDLE_SLEEP ||
      avatarStatus === AvatarStateEnum.SLEEP_IDLE;

    const duration = isShortAnimation ? 1000 : 3000;

    const animation = Animated.timing(progressAnim, {
      duration,
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    animation.start(() => {
      if (!isShortAnimation) {
        animation.reset();
      }

      setIsFinished(true);

      if (avatarStatus === AvatarStateEnum.OFF_IDLE) {
        dispatch(setAvatarStatus({ status: AvatarStateEnum.IDLE_1 }));
      }

      if (avatarStatus === AvatarStateEnum.IDLE_1) {
        dispatch(setAvatarStatus({ status: AvatarStateEnum.IDLE_2 }));
      }

      if (avatarStatus === AvatarStateEnum.IDLE_2) {
        dispatch(setAvatarStatus({ status: AvatarStateEnum.IDLE_1 }));
      }

      if (avatarStatus === AvatarStateEnum.LOVE) {
        dispatch(setAvatarStatus({ status: AvatarStateEnum.IDLE_1 }));
      }

      if (avatarStatus === AvatarStateEnum.IDLE_SLEEP) {
        dispatch(setAvatarStatus({ status: AvatarStateEnum.SLEEP }));
      }

      if (avatarStatus === AvatarStateEnum.SLEEP_IDLE) {
        dispatch(setAvatarStatus({ status: AvatarStateEnum.IDLE_1 }));
      }
    });
  };

  useEffect(() => {
    if (isFinished) {
      if (avatarStatus === AvatarStateEnum.OFF_IDLE) {
        setSource(OffIdleAnimation);
      }
      if (avatarStatus === AvatarStateEnum.LOVE) {
        setSource(IdleLoveIdleAnimation);
      }
      if (avatarStatus === AvatarStateEnum.IDLE_1) {
        setSource(Idle1Animation);
      }
      if (avatarStatus === AvatarStateEnum.IDLE_2) {
        setSource(Idle2Animation);
      }
      if (avatarStatus === AvatarStateEnum.IDLE_SLEEP) {
        setSource(IdleSleepAnimation);
      }
      if (avatarStatus === AvatarStateEnum.SLEEP) {
        setSource(SleepAnimation);
      }
      if (avatarStatus === AvatarStateEnum.SLEEP_IDLE) {
        setSource(SleepIdleAnimation);
      }
    }
  }, [avatarStatus, isFinished]);

  useEffect(() => {
    if (
      avatarIsActivated &&
      speeches.length === 0 &&
      todayHabitsProgress <= 10 &&
      (avatarStatus === AvatarStateEnum.IDLE_1 ||
        avatarStatus === AvatarStateEnum.IDLE_2)
    ) {
      dispatch(setAvatarStatus({ status: AvatarStateEnum.IDLE_SLEEP }));
    }

    if (
      avatarIsActivated &&
      speeches.length === 0 &&
      todayHabitsProgress > 10 &&
      avatarStatus === AvatarStateEnum.SLEEP
    ) {
      dispatch(setAvatarStatus({ status: AvatarStateEnum.SLEEP_IDLE }));
    }
  }, [avatarIsActivated, speeches, todayHabitsProgress, avatarStatus]);

  useEffect(() => {
    if (avatarIsActivated && isFinished) {
      runAnimation();
    }
  }, [avatarIsActivated, isFinished]);

  return source ? <LottieView source={source} progress={progressAnim} /> : null;
};

export default Avatar;
