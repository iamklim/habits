import {
  removeHabitFromHabitsAdded,
  removeHabitFromTimeOfDay,
} from "./scheduleSlice";
import { TimeOfDayEnum } from "../../types/types";
import { AppDispatch } from "../store";

export const removeHabit =
  ({ id }: { id: number }) =>
  (dispatch: AppDispatch) => {
    dispatch(removeHabitFromHabitsAdded({ id }));
    dispatch(
      removeHabitFromTimeOfDay({ id, timeOfDay: TimeOfDayEnum.MORNING })
    );
    dispatch(
      removeHabitFromTimeOfDay({ id, timeOfDay: TimeOfDayEnum.AFTERNOON })
    );
    dispatch(
      removeHabitFromTimeOfDay({ id, timeOfDay: TimeOfDayEnum.EVENING })
    );
  };
