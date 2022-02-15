import React from "react";
import { HABITS } from "../../constants/habits.constant";
import { useNavigation } from "@react-navigation/native";
import {
  BottomTabNavigatorScreensEnum,
  StackNavigatorScreensEnum,
  TimeOfDayEnum,
  WeekDayEnum,
} from "../../types/types";
import Tag from "./Tag";
import * as Analytics from "expo-firebase-analytics";

interface IRitualHabitProps {
  habitId: number;
  timeOfDay: TimeOfDayEnum;
  weekDay: WeekDayEnum;
}

const RitualHabit = ({ habitId, timeOfDay, weekDay }: IRitualHabitProps) => {
  const navigation = useNavigation();

  const currentHabit = HABITS.find((habit) => habit.id === habitId);

  const onPress = async () => {
    await Analytics.logEvent("rituals/habit_press", {
      weekDay,
      timeOfDay,
      habitId: currentHabit?.id,
      habitName: currentHabit?.name,
      tagText: currentHabit?.name,
    });

    // @ts-ignore
    navigation.navigate(BottomTabNavigatorScreensEnum.HABITS, {
      screen: StackNavigatorScreensEnum.HABIT_INFO,
      params: { id: habitId },
    });
  };

  if (!currentHabit) {
    return null;
  }

  return (
    <Tag onPress={onPress} icon={currentHabit.icon} text={currentHabit.name} />
  );
};

export default RitualHabit;
