import { IScheduleState, TTodayRecord } from "./scheduleSlice";
import { TimeOfDayEnum, WeekDayEnum } from "../../types/types";
import { JS_DAY_INDEX_TO_WEEKDAY } from "../../constants/schedule.constants";

export const getTodayHabitsUpdated = ({
  state,
  timeOfDay,
  weekDay,
}: {
  state: IScheduleState;
  timeOfDay: TimeOfDayEnum;
  weekDay: WeekDayEnum;
}) => {
  const todayStateUpdated: TTodayRecord = {};
  const todayCurrentState = state.today[timeOfDay];
  const habitIdsAdded = state[timeOfDay].habits[weekDay];

  habitIdsAdded.forEach((habitId) => {
    if (habitId in todayCurrentState) {
      todayStateUpdated[habitId] = todayCurrentState[habitId];
    } else {
      todayStateUpdated[habitId] = false;
    }
  });

  return todayStateUpdated;
};

export const getCurrentWeekDay = () => {
  const currentDate = new Date();
  const currentWeekDayIndex = currentDate.getDay();
  return JS_DAY_INDEX_TO_WEEKDAY[currentWeekDayIndex];
};
