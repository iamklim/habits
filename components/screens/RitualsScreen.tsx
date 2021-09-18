import React, { useState } from "react";
import {
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { TimeOfDayEnum, WeekDayEnum } from "../../types/types";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { WEEK_DAYS } from "../../constants/habits.constant";
import { useAppSelector } from "../../hooks/redux-hooks";
import { notificationTimeSelector } from "../../store/scheduleSlice";

const themedStyles = StyleService.create({
  layout: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 6,
    borderBottomColor: "color-basic-transparent-100",
    borderBottomWidth: 2,
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  weekDays: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: -4,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 43,
    height: 43,
    borderRadius: 43,
    marginHorizontal: 4,
  },
  buttonContainerDefault: {
    backgroundColor: "color-primary-transparent-100",
  },
  buttonContainerActive: {
    backgroundColor: "color-primary-500",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "600",
  },
  buttonTextDefault: {
    color: "color-basic-800",
  },
  buttonTextActive: {
    color: "color-basic-100",
  },
  ritualTitle: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 10,
  },
  ritualNotification: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ritualNotificationText: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 10,
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

const RitualsScreen = () => {
  const styles = useStyleSheet(themedStyles);

  const [currentWeekDay, setCurrentWeekDay] = useState(WeekDayEnum.MON);

  const onPress = ({ weekDay }: { weekDay: WeekDayEnum }) => {
    setCurrentWeekDay(weekDay);
  };

  const notificationTime = useAppSelector((state) =>
    notificationTimeSelector({ state, timeOfDay: TimeOfDayEnum.MORNING })
  );

  return (
    <Layout style={styles.layout}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.buttonView}>
          <View style={styles.weekDays}>
            {WEEK_DAYS.map((weekDay, index) => {
              const isActive = currentWeekDay === weekDay;

              return (
                <WeekDayButton
                  key={index}
                  weekDay={weekDay}
                  isActive={isActive}
                  onPress={() => onPress({ weekDay })}
                />
              );
            })}
          </View>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.ritualTitle}>Morning ritual</Text>
            <View style={styles.ritualNotification}>
              <Text style={styles.ritualNotificationText}>Notification: </Text>
              <Text style={styles.ritualNotificationText}>
                {notificationTime?.length ? notificationTime : "not set"}
              </Text>
            </View>
            <Text style={styles.ritualTitle}>Afternoon ritual</Text>
            <Text style={styles.ritualTitle}>Evening ritual</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default RitualsScreen;
