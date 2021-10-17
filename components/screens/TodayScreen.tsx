import React from "react";
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import {
  activateAvatar,
  avatarIsActivatedSelector,
  setCurrentWeekDayAndUpdateTodayHabits,
} from "../../store/schedule/scheduleSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import TodayCard from "../components/TodayCard";
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TimeOfDayEnum } from "../../types/types";
import Battery from "../components/Battery";
import Avatar from "../components/Avatar";
import TapAnimation from "../components/TapAnimation";
import SpeechBubble from "../components/SpeechBubble";
import TapAnimationBlack from "../../assets/animations/tap-gesture-black.json";

const themedStyles = StyleService.create({
  layout: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  container: {
    position: "relative",
    height: 320,
    width: "100%",
    borderBottomColor: "color-basic-transparent-100",
    borderBottomWidth: 2,
  },
  touchable: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  tapAnimation: {
    position: "absolute",
    width: 100,
    height: 100,
    bottom: 0,
  },
  battery: {
    position: "absolute",
    top: 20,
    left: 20,
    height: 100,
    width: 100,
    transform: [{ rotate: "90deg" }],
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  todayCard: {
    marginBottom: 10,
  },
});

const TodayScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();
  const avatarIsActivated = useAppSelector((state) =>
    avatarIsActivatedSelector({ state })
  );

  const handleAvatarPress = () => {
    if (!avatarIsActivated) {
      dispatch(activateAvatar());
    }
  };

  useFocusEffect(() => {
    dispatch(setCurrentWeekDayAndUpdateTodayHabits());
  });

  return (
    <Layout style={styles.layout}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={handleAvatarPress}>
            <View style={styles.touchable}>
              <Avatar />
              {avatarIsActivated && (
                <View style={styles.battery}>
                  <Battery />
                </View>
              )}
              {!avatarIsActivated && (
                <View style={styles.tapAnimation}>
                  <TapAnimation source={TapAnimationBlack} />
                </View>
              )}
              <SpeechBubble />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.todayCard}>
              <TodayCard timeOfDay={TimeOfDayEnum.MORNING} />
            </View>
            <View style={styles.todayCard}>
              <TodayCard timeOfDay={TimeOfDayEnum.AFTERNOON} />
            </View>
            <View>
              <TodayCard timeOfDay={TimeOfDayEnum.EVENING} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default TodayScreen;
