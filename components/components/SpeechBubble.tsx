import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableWithoutFeedback, View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import TapAnimation from "./TapAnimation";
import TapAnimationWhite from "../../assets/animations/tap-gesture-white.json";
import {
  avatarSpeechesSelector,
  removeCurrentSpeech,
} from "../../store/schedule/scheduleSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

const themedStyles = StyleService.create({
  container: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "background-alternative-color-2",
    width: "40%",
    borderRadius: 10,
    padding: 15,
    transition: "top",
  },
  containerDefault: {},
  containerHidden: {
    display: "none",
  },
  tail: {
    position: "absolute",
    bottom: -15,
    left: "50%",
    width: 15,
    height: 15,
    borderBottomWidth: 15,
    borderBottomColor: "transparent",
    borderLeftWidth: 20,
    borderLeftColor: "background-alternative-color-2",
  },
  text: {
    color: "text-alternate-color",
  },
  tapAnimation: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    fill: "#fff",
  },
});

export const SpeechBubble = () => {
  const dispatch = useAppDispatch();
  const styles = useStyleSheet(themedStyles);

  const speeches = useAppSelector((state) => avatarSpeechesSelector({ state }));

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const transformAnim = useRef(new Animated.Value(10)).current;

  const showBubble = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 100,
    }).start();

    Animated.timing(transformAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100,
    }).start();
  };

  const hideBubble = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100,
    }).start();

    Animated.timing(transformAnim, {
      toValue: 10,
      useNativeDriver: true,
      duration: 100,
    }).start();
  };

  const handlePress = () => {
    if (speeches.length === 1) {
      hideBubble();

      setTimeout(() => {
        dispatch(removeCurrentSpeech());
      }, 100);
    } else {
      dispatch(removeCurrentSpeech());
    }
  };

  useEffect(() => {
    if (speeches?.length) {
      showBubble();
    }
  }, [speeches]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacityAnim,
            transform: [{ translateY: transformAnim }],
          },
        ]}
      >
        <Text style={styles.text}>{speeches[0]}</Text>
        <View style={styles.tail} />
        <View style={styles.tapAnimation}>
          <TapAnimation source={TapAnimationWhite} speed={3} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default SpeechBubble;
