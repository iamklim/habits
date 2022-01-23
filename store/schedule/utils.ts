import { IScheduleState, TTodayRecord } from "./scheduleSlice";
import { TimeOfDayEnum, WeekDayEnum } from "../../types/types";
import { JS_DAY_INDEX_TO_WEEKDAY } from "../../constants/schedule.constants";

export const getTodayHabitsUpdated = ({
  state,
  timeOfDay,
  weekDay,
  isNewDay,
}: {
  state: IScheduleState;
  timeOfDay: TimeOfDayEnum;
  weekDay: WeekDayEnum;
  isNewDay: boolean;
}) => {
  const todayStateUpdated: TTodayRecord = {};
  const todayCurrentState = state.today[timeOfDay];
  const habitIdsAdded = state[timeOfDay].habits[weekDay];

  habitIdsAdded.forEach((habitId) => {
    if (habitId in todayCurrentState) {
      todayStateUpdated[habitId] = isNewDay
        ? false
        : todayCurrentState[habitId];
    } else {
      todayStateUpdated[habitId] = false;
    }
  });

  return todayStateUpdated;
};

export const getCurrentWeekDayIndex = () => {
  const currentDate = new Date();
  return currentDate.getDay();
};

export const getCurrentWeekDay = () => {
  const currentWeekDayIndex = getCurrentWeekDayIndex();
  return JS_DAY_INDEX_TO_WEEKDAY[currentWeekDayIndex];
};
