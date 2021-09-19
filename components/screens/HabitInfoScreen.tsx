import React from "react";
import {Icon, Layout, StyleService, Text, useStyleSheet,} from "@ui-kitten/components";
import TopNavigationBack from "../components/TopNabigationBack";
import {SafeAreaView, ScrollView, View} from "react-native";
import {HABITS} from "../../constants/habits.constant";
import HabitScheduleSwitcher from "../components/HabitScheduleSwitcher";
import {useRoute} from "@react-navigation/native";
import {THabitInfoScreenRouteProp, TimeOfDayEnum} from "../../types/types";

const themedStyles = StyleService.create({
  layout: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 18,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
    color: "color-basic-600",
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
    lineHeight: 18,
    marginBottom: 30,
  },
  ritualTitle: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 10,
  },
  ritualSchedule: {
    marginBottom: 16,
  },
});

const HabitInfoScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<THabitInfoScreenRouteProp>();
  const habitId = route.params.id;
  const currentHabit = HABITS.find((habit) => habit.id === habitId);

  return (
    <Layout style={styles.layout}>
      <SafeAreaView style={styles.safeAreaView}>
        <TopNavigationBack title="Habits" />
        <ScrollView>
          {currentHabit && (
            <View style={styles.container}>
              <View style={styles.title}>
                <Icon style={styles.icon} name={currentHabit.icon} />
                <Text style={styles.titleText}>{currentHabit.name}</Text>
              </View>
              <Text style={styles.description}>{currentHabit.description}</Text>
              <Text style={styles.ritualTitle}>Morning ritual</Text>
              <View style={styles.ritualSchedule}>
                <HabitScheduleSwitcher
                  timeOfDay={TimeOfDayEnum.MORNING}
                  habitId={habitId}
                />
              </View>
              <Text style={styles.ritualTitle}>Afternoon ritual</Text>
              <View style={styles.ritualSchedule}>
                <HabitScheduleSwitcher
                  timeOfDay={TimeOfDayEnum.AFTERNOON}
                  habitId={habitId}
                />
              </View>
              <Text style={styles.ritualTitle}>Evening ritual</Text>
              <View style={styles.ritualSchedule}>
                <HabitScheduleSwitcher
                  timeOfDay={TimeOfDayEnum.EVENING}
                  habitId={habitId}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default HabitInfoScreen;
