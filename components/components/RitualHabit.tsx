import React from "react";
import { HABITS } from "../../constants/habits.constant";
import { useNavigation } from "@react-navigation/native";
import {
  StackNavigatorScreensEnum,
  THabitsScreenNavigationProp,
} from "../../types/types";
import Tag from "./Tag";

interface IRitualHabitProps {
  habitId: number;
}

const RitualHabit = ({ habitId }: IRitualHabitProps) => {
  const navigation = useNavigation<THabitsScreenNavigationProp>();

  const currentHabit = HABITS.find((habit) => habit.id === habitId);

  const onPress = () => {
    navigation.navigate(StackNavigatorScreensEnum.HABIT_INFO, { id: habitId });
  };

  if (!currentHabit) {
    return null;
  }

  return (
    <Tag onPress={onPress} icon={currentHabit.icon} text={currentHabit.name} />
  );
};

export default RitualHabit;
