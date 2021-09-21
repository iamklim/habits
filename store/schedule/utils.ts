import { IScheduleState, TTodayRecord } from "./scheduleSlice";
import { TimeOfDayEnum, WeekDayEnum } from "../../types/types";

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
