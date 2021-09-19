import React from "react";
import {WEEK_DAYS_SHORT_TO_FULL} from "../../constants/habits.constant";
import {useNavigation} from "@react-navigation/native";
import {
  HabitsScreenTabEnum,
  StackNavigatorScreensEnum,
  THabitsScreenNavigationProp,
  TimeOfDayEnum,
  WeekDayEnum,
} from "../../types/types";
import Tag from "./Tag";

interface IRitualEmptyTagProps {
  timeOfDay: TimeOfDayEnum;
  weekDay: WeekDayEnum;
}

const RitualEmptyTag = ({ timeOfDay, weekDay }: IRitualEmptyTagProps) => {
  const navigation = useNavigation<THabitsScreenNavigationProp>();

  const tagText = `Add habit for ${WEEK_DAYS_SHORT_TO_FULL[weekDay]} ${timeOfDay}`;

  const onPress = () => {
    navigation.navigate(StackNavigatorScreensEnum.HABITS_LIST, {
      tab: HabitsScreenTabEnum.MY_HABITS,
    });
  };

  return <Tag onPress={onPress} text={tagText} isActive={false} />;
};

export default RitualEmptyTag;
