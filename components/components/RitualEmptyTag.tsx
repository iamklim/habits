import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  BottomTabNavigatorScreensEnum,
  HabitsScreenTabEnum,
  StackNavigatorScreensEnum,
  TimeOfDayEnum,
  WeekDayEnum,
} from "../../types/types";
import Tag from "./Tag";
import { WEEK_DAYS_SHORT_TO_FULL } from "../../constants/schedule.constants";

interface IRitualEmptyTagProps {
  timeOfDay: TimeOfDayEnum;
  weekDay: WeekDayEnum;
}

const RitualEmptyTag = ({ timeOfDay, weekDay }: IRitualEmptyTagProps) => {
  const navigation = useNavigation();

  const tagText = `Add habit for ${WEEK_DAYS_SHORT_TO_FULL[weekDay]} ${timeOfDay}`;

  const onPress = () => {
    // @ts-ignore
    navigation.navigate(BottomTabNavigatorScreensEnum.HABITS, {
      screen: StackNavigatorScreensEnum.HABITS_LIST,
      params: { tab: HabitsScreenTabEnum.MY_HABITS },
    });
  };

  return <Tag onPress={onPress} text={tagText} isActive={false} />;
};

export default RitualEmptyTag;
