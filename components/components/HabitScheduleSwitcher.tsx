import React from "react";
import { StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import { TouchableOpacity, View } from "react-native";
import {
  notificationTimeSelector,
  toggleHabitInWeekDay,
  weekdaysWithHabitSelector,
} from "../../store/schedule/scheduleSlice";
import { TimeOfDayEnum, WeekDayEnum } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { BellOffIcon } from "./Icons";
import { WEEK_DAYS } from "../../constants/schedule.constants";
import * as Analytics from "expo-firebase-analytics";

export const themedStyles = StyleService.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 15,
    backgroundColor: "color-primary-200",
    borderRadius: 10,
  },
  notification: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  notificationTime: {
    fontSize: 14,
    fontWeight: "bold",
    color: "color-primary-700",
    textAlign: "center",
  },
  icon: {
    width: 20,
    height: 20,
    color: "color-primary-700",
  },
  weekDays: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: -3,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  buttonContainerDefault: {
    backgroundColor: "transparent",
  },
  buttonContainerActive: {
    backgroundColor: "background-basic-color-1",
  },
  buttonText: {
    fontSize: 10,
    fontWeight: "600",
  },
  buttonTextDefault: {
    color: "color-primary-transparent-500",
  },
  buttonTextActive: {
    color: "color-primary-500",
  },
});

interface IWeekDayButtonProps {
  weekDay: WeekDayEnum;
  isActive: boolean;
  onPress: ({ weekDay }: { weekDay: WeekDayEnum }) => void;
}

export const WeekDayButton = ({
  weekDay,
  isActive,
  onPress,
}: IWeekDayButtonProps) => {
  const styles = useStyleSheet(themedStyles);
  const weekDayCamelCased =
    weekDay.charAt(0).toUpperCase() + weekDay.slice(1).toLowerCase();

  return (
    <TouchableOpacity
      onPress={() => onPress({ weekDay })}
      style={[
        styles.buttonContainer,
        isActive ? styles.buttonContainerActive : styles.buttonContainerDefault,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          isActive ? styles.buttonTextActive : styles.buttonTextDefault,
        ]}
      >
        {weekDayCamelCased}
      </Text>
    </TouchableOpacity>
  );
};

interface IHabitScheduleSwitcherProps {
  timeOfDay: TimeOfDayEnum;
  habitId: number;
  habitName: string;
}

const HabitScheduleSwitcher = ({
  timeOfDay,
  habitId,
  habitName,
}: IHabitScheduleSwitcherProps) => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();

  const notificationTime = useAppSelector((state) =>
    notificationTimeSelector({ state, timeOfDay })
  );
  const notificationTimeParsed = Boolean(notificationTime?.length)
    ? new Date(notificationTime)
    : null;

  const activeWeekDays = useAppSelector((state) =>
    weekdaysWithHabitSelector({ state, timeOfDay, habitId })
  );

  const onPress = async ({ weekDay }: { weekDay: WeekDayEnum }) => {
    await Analytics.logEvent("habits/info/weekday_in_schedule_toggle", {
      habitId,
      habitName,
      timeOfDay,
      weekDay,
    });
    dispatch(toggleHabitInWeekDay({ id: habitId, timeOfDay, weekDay }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        {notificationTimeParsed ? (
          <Text style={styles.notificationTime}>
            {notificationTimeParsed.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        ) : (
          <BellOffIcon style={styles.icon} />
        )}
      </View>

      <View style={styles.weekDays}>
        {WEEK_DAYS.map((weekDay, index) => {
          const isActive = activeWeekDays.includes(weekDay);

          return (
            <WeekDayButton
              key={index}
              weekDay={weekDay}
              isActive={isActive}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
};

export default HabitScheduleSwitcher;
