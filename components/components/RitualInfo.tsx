import React from "react";
import {TouchableOpacity, View} from "react-native";
import {StyleService, Text, useStyleSheet} from "@ui-kitten/components";
import {TimeOfDayEnum, WeekDayEnum} from "../../types/types";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {
  habitsByTimeOfDayAndWeekDaySelector,
  notificationTimeSelector,
  setNotificationTime,
} from "../../store/scheduleSlice";
import DateTimePicker, {Event} from "@react-native-community/datetimepicker";
import {MinusIcon, PlusIcon} from "./Icons";
import {TIME_OF_DAY_TO_DEFAULT_NOTIFICATION_HOUR} from "../../constants/schedule.constants";
import RitualHabit from "./RitualHabit";
import RitualEmptyTag from "./RitualEmptyTag";

const themedStyles = StyleService.create({
  ritualTitle: {
    fontWeight: "500",
    fontSize: 20,
    marginBottom: 10,
  },
  ritualNotification: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ritualNotificationText: {
    fontSize: 18,
  },
  ritualNotificationTime: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ritualNotificationTimePicker: {
    flexBasis: 90,
    marginRight: 6,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: "background-basic-color-3",
  },
  icon: {
    width: 24,
    height: 24,
    color: "color-basic-600",
  },
  habitsAddedSection: {
    marginTop: 8,
  },
  habitsAddedText: {
    fontSize: 18,
    marginBottom: 6,
  },
  habitsAdded: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
    marginVertical: -4,
  },
});

export const AddNotificationButton = ({ onPress }: { onPress: () => void }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <PlusIcon style={styles.icon} />
    </TouchableOpacity>
  );
};

export const RemoveNotificationButton = ({
  onPress,
}: {
  onPress: () => void;
}) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <MinusIcon style={styles.icon} />
    </TouchableOpacity>
  );
};

interface IRitualInfoProps {
  timeOfDay: TimeOfDayEnum;
  weekDay: WeekDayEnum;
}

const RitualInfo = ({ timeOfDay, weekDay }: IRitualInfoProps) => {
  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();

  const habitsByTimeOfDayAndWeekDay = useAppSelector((state) =>
    habitsByTimeOfDayAndWeekDaySelector({ state, timeOfDay, weekDay })
  );
  const isHabitsAdded = Boolean(habitsByTimeOfDayAndWeekDay?.length);

  const notificationTime = useAppSelector((state) =>
    notificationTimeSelector({ state, timeOfDay })
  );
  const isNotificationTimeAvailable = Boolean(notificationTime?.length);

  const timeOfDayCamelCased =
    timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1).toLowerCase();

  const onNotificationChange = (event: Event, date?: Date) => {
    dispatch(
      setNotificationTime({
        timeOfDay,
        notificationTime: date?.toString() || "",
      })
    );
  };

  const onSetDefaultNotification = () => {
    const defaultDate = new Date();
    defaultDate.setHours(TIME_OF_DAY_TO_DEFAULT_NOTIFICATION_HOUR[timeOfDay]);
    defaultDate.setMinutes(0);

    dispatch(
      setNotificationTime({
        timeOfDay,
        notificationTime: defaultDate.toString(),
      })
    );
  };

  const onRemoveNotification = () => {
    dispatch(
      setNotificationTime({
        timeOfDay,
        notificationTime: "",
      })
    );
  };

  return (
    <View>
      <Text style={styles.ritualTitle}>{`${timeOfDayCamelCased} ritual`}</Text>
      <View style={styles.ritualNotification}>
        <Text style={styles.ritualNotificationText}>Notification: </Text>
        <View style={styles.ritualNotificationTime}>
          {isNotificationTimeAvailable && (
            <View style={styles.ritualNotificationTimePicker}>
              <DateTimePicker
                value={new Date(notificationTime)}
                mode="time"
                is24Hour={true}
                onChange={onNotificationChange}
              />
            </View>
          )}
          {isNotificationTimeAvailable ? (
            <RemoveNotificationButton onPress={onRemoveNotification} />
          ) : (
            <AddNotificationButton onPress={onSetDefaultNotification} />
          )}
        </View>
      </View>
      <View style={styles.habitsAddedSection}>
        {isHabitsAdded ? (
          <>
            <Text style={styles.habitsAddedText}>Habits added: </Text>
            <View style={styles.habitsAdded}>
              {habitsByTimeOfDayAndWeekDay.map((habitId) => (
                <RitualHabit key={habitId} habitId={habitId} />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.habitsAdded}>
            <RitualEmptyTag timeOfDay={timeOfDay} weekDay={weekDay} />
          </View>
        )}
      </View>
    </View>
  );
};

export default RitualInfo;
