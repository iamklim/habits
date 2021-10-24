import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export enum StackNavigatorScreensEnum {
  HABITS_LIST = "HabitsList",
  HABIT_INFO = "HabitInfo",
}

export type TStackNavigatorParams = {
  [StackNavigatorScreensEnum.HABITS_LIST]: { tab: HabitsScreenTabEnum };
  [StackNavigatorScreensEnum.HABIT_INFO]: { id: number };
};

export type THabitsListScreenRouteProp = RouteProp<
  TStackNavigatorParams,
  StackNavigatorScreensEnum.HABITS_LIST
>;

export type THabitInfoScreenRouteProp = RouteProp<
  TStackNavigatorParams,
  StackNavigatorScreensEnum.HABIT_INFO
>;

export type THabitsScreenNavigationProp = NativeStackNavigationProp<
  TStackNavigatorParams,
  StackNavigatorScreensEnum.HABITS_LIST
>;

export enum BottomTabNavigatorScreensEnum {
  TODAY = "Today",
  RITUALS = "Rituals",
  HABITS = "Habits",
}

export type TBottomTabNavigatorParams = {
  [BottomTabNavigatorScreensEnum.TODAY]: undefined;
  [BottomTabNavigatorScreensEnum.RITUALS]: undefined;
  [BottomTabNavigatorScreensEnum.HABITS]: undefined;
};

export type TRitualsScreenNavigationProp = BottomTabNavigationProp<
  TBottomTabNavigatorParams,
  BottomTabNavigatorScreensEnum.RITUALS
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

export enum HabitsScreenTabEnum {
  HABITS = "habits",
  MY_HABITS = "myHabits",
}

export enum AvatarStateEnum {
  OFF_IDLE = "off-idle",
  IDLE_1 = "idle-1",
  IDLE_2 = "idle-2",
  IDLE_LIKE_IDLE = "idle_like_idle",
  IDLE_SLEEP = "idle-sleep",
  SLEEP = "sleep",
  SLEEP_IDLE = "sleep-idle",
}

export interface AnimationObject {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: any[];
  layers: any[];
}

export type TLottieAnimation = string | AnimationObject | { uri: string };
