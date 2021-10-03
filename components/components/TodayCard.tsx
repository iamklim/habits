import React from "react";
import {
  CheckBox,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { View } from "react-native";
import { TimeOfDayEnum } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  currentWeekDaySelector,
  habitsByTimeOfDayAndWeekDaySelector,
  todayHabitStatusSelector,
  updateTodayHabitStatus,
} from "../../store/schedule/scheduleSlice";
import { HABITS } from "../../constants/habits.constant";

const themedStyles = StyleService.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 15,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "background-basic-color-1",
    borderColor: "border-basic-color-4",
  },
  title: {
    paddingBottom: 10,
    borderBottomColor: "color-basic-transparent-100",
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  titleText: {
    fontWeight: "500",
    fontSize: 18,
  },
  habitCheck: {
    marginBottom: 16,
  },
  checkBoxText: {
    fontWeight: "300",
    fontSize: 14,
    marginLeft: 15,
  },
});

interface ITodayCardCheckBoxProps {
  habitId: number;
  timeOfDay: TimeOfDayEnum;
}

const HabitCheck = ({ habitId, timeOfDay }: ITodayCardCheckBoxProps) => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();

  const habitStatus = useAppSelector((state) =>
    todayHabitStatusSelector({ state, timeOfDay, habitId })
  );

  const currentHabit = HABITS.find((habit) => habit.id === habitId);

  const handleChange = ({ nextChecked }: { nextChecked: boolean }) => {
    dispatch(
      updateTodayHabitStatus({ timeOfDay, habitId, habitStatus: nextChecked })
    );
  };

  if (!currentHabit) {
    return null;
  }

  return (
    <CheckBox
      checked={habitStatus}
      onChange={(nextChecked) => handleChange({ nextChecked })}
    >
      {(evaProps) => (
        <Text {...evaProps} style={styles.checkBoxText}>
          {currentHabit.name}
        </Text>
      )}
    </CheckBox>
  );
};

interface ITodayCardProps {
  timeOfDay: TimeOfDayEnum;
}

const TodayCard = ({ timeOfDay }: ITodayCardProps) => {
  const styles = useStyleSheet(themedStyles);

  const currentWeekDay = useAppSelector((state) =>
    currentWeekDaySelector({ state })
  );

  const habitsByTimeOfDayAndWeekDay = useAppSelector((state) =>
    habitsByTimeOfDayAndWeekDaySelector({
      state,
      timeOfDay,
      weekDay: currentWeekDay,
    })
  );

  const timeOfDayCamelCased =
    timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1).toLowerCase();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>{timeOfDayCamelCased}</Text>
      </View>
      {habitsByTimeOfDayAndWeekDay?.length > 0 ? (
        habitsByTimeOfDayAndWeekDay.map((habitId, index) => {
          return (
            <View
              key={habitId}
              style={
                index !== habitsByTimeOfDayAndWeekDay.length - 1
                  ? styles.habitCheck
                  : null
              }
            >
              <HabitCheck habitId={habitId} timeOfDay={timeOfDay} />
            </View>
          );
        })
      ) : (
        <Text>No habits added</Text>
      )}
    </View>
  );
};

export default TodayCard;
