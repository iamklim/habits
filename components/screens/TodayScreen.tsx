import React from "react";
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import { setCurrentWeekDayAndUpdateTodayHabits } from "../../store/schedule/scheduleSlice";
import { useAppDispatch } from "../../hooks/redux-hooks";
import TodayCard from "../components/TodayCard";
import { SafeAreaView, ScrollView, View } from "react-native";
import { TimeOfDayEnum } from "../../types/types";
import Avatar from "../components/Avatar";
import Battery from "../components/Battery";

const themedStyles = StyleService.create({
  layout: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  avatar: {
    position: "relative",
    height: 320,
    borderBottomColor: "color-basic-transparent-100",
    borderBottomWidth: 2,
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

  useFocusEffect(() => {
    dispatch(setCurrentWeekDayAndUpdateTodayHabits());
  });

  return (
    <Layout style={styles.layout}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.avatar}>
          <View style={styles.battery}>
            <Battery />
          </View>
          <Avatar />
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
