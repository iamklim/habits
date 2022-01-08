import React from "react";
import { HABITS } from "../../constants/habits.constant";
import { useNavigation } from "@react-navigation/native";
import {
  BottomTabNavigatorScreensEnum,
  StackNavigatorScreensEnum,
} from "../../types/types";
import Tag from "./Tag";

interface IRitualHabitProps {
  habitId: number;
}

const RitualHabit = ({ habitId }: IRitualHabitProps) => {
  const navigation = useNavigation();

  const currentHabit = HABITS.find((habit) => habit.id === habitId);

  const onPress = () => {
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
