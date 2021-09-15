import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

export enum ScreenEnum {
  HABITS_LIST = "HabitsList",
  HABIT_INFO = "HabitInfo",
}

export type TRootStackParamList = {
  [ScreenEnum.HABITS_LIST]: undefined;
  [ScreenEnum.HABIT_INFO]: { id: number };
};

export type THabitInfoScreenRouteProp = RouteProp<
  TRootStackParamList,
  ScreenEnum.HABIT_INFO
>;

export type THabitsScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  ScreenEnum.HABITS_LIST
>;

export interface IHabit {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export enum WeekDayEnum {
  MON = "mon",
  TUE = "tue",
  WED = "wed",
  THU = "thu",
  FRI = "fri",
  SAT = "sat",
  SUN = "sun",
}

export enum TimeOfDayEnum {
  MORNING = "morning",
  AFTERNOON = "afternoon",
  EVENING = "evening",
}
