import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TimeOfDayEnum, WeekDayEnum} from "../types/types";
import {RootState} from "./store";

type THabitRecord = Record<WeekDayEnum, number[]>;

interface ITimeOfDayState {
  notificationTime: string;
  habits: THabitRecord;
}

interface IScheduleState {
  habitsAdded: number[];
  morning: ITimeOfDayState;
  afternoon: ITimeOfDayState;
  evening: ITimeOfDayState;
}

const initialHabitsState: THabitRecord = {
  [WeekDayEnum.MON]: [],
  [WeekDayEnum.TUE]: [],
  [WeekDayEnum.WED]: [],
  [WeekDayEnum.THU]: [],
  [WeekDayEnum.FRI]: [],
  [WeekDayEnum.SAT]: [],
  [WeekDayEnum.SUN]: [],
};

const initialTimeOfDayState: ITimeOfDayState = {
  notificationTime: "",
  habits: initialHabitsState,
};

const initialState: IScheduleState = {
  habitsAdded: [],
  morning: initialTimeOfDayState,
  afternoon: initialTimeOfDayState,
  evening: initialTimeOfDayState,
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habitsAdded = [...state.habitsAdded, action.payload.id];
    },
    removeHabitFromTimeOfDay: (
      state: IScheduleState,
      action: PayloadAction<{ id: number; timeOfDay: TimeOfDayEnum }>
    ) => {
      const id = action.payload.id;
      const timeOfDay = action.payload.timeOfDay;
      const habits = state[timeOfDay].habits;
      const habitsUpdated = initialHabitsState;

      Object.entries(habits).forEach(([weekDay, habitIds]) => {
        habitsUpdated[weekDay as WeekDayEnum] = habitIds.filter(
          (habitId) => habitId !== id
        );
      });

      state[timeOfDay].habits = habitsUpdated;
    },
    removeHabitFromHabitsAdded: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      const id = action.payload.id;
      state.habitsAdded = state.habitsAdded.filter((habitId) => habitId !== id);
    },
    toggleHabitInWeekDay: (
      state,
      action: PayloadAction<{
        id: number;
        timeOfDay: TimeOfDayEnum;
        weekDay: WeekDayEnum;
      }>
    ) => {
      const id = action.payload.id;
      const timeOfDay = action.payload.timeOfDay;
      const weekDay = action.payload.weekDay;

      const weekDayHabits = state[timeOfDay].habits[weekDay];

      if (weekDayHabits.indexOf(id) === -1) {
        state[timeOfDay].habits[weekDay] = [...weekDayHabits, id];
      } else {
        state[timeOfDay].habits[weekDay] = weekDayHabits.filter(
          (habitId) => habitId !== id
        );
      }
    },
    setNotificationTime: (
      state,
      action: PayloadAction<{
        timeOfDay: TimeOfDayEnum;
        notificationTime: string;
      }>
    ) => {
      const timeOfDay = action.payload.timeOfDay;
      state[timeOfDay].notificationTime = action.payload.notificationTime;
    },
  },
});

export const {
  addHabit,
  removeHabitFromHabitsAdded,
  toggleHabitInWeekDay,
  removeHabitFromTimeOfDay,
  setNotificationTime,
} = scheduleSlice.actions;

export const notificationTimeSelector = ({
  state,
  timeOfDay,
}: {
  state: RootState;
  timeOfDay: TimeOfDayEnum;
}) => state.schedule[timeOfDay].notificationTime;

export const weekdaysWithHabitSelector = ({
  state,
  timeOfDay,
  habitId,
}: {
  state: RootState;
  timeOfDay: TimeOfDayEnum;
  habitId: number;
}) => {
  const weekdaysWithHabit: WeekDayEnum[] = [];

  const timeOfDayHabits = state.schedule[timeOfDay].habits;

  Object.entries(timeOfDayHabits).forEach(([weekDay, habitIds]) => {
    const isHabitInCurrentWeekday = habitIds.includes(habitId);
    if (isHabitInCurrentWeekday) {
      return weekdaysWithHabit.push(weekDay as WeekDayEnum);
    }
  });

  return weekdaysWithHabit;
};

export const habitsByTimeOfDayAndWeekDaySelector = ({
  state,
  timeOfDay,
  weekDay,
}: {
  state: RootState;
  timeOfDay: TimeOfDayEnum;
  weekDay: WeekDayEnum;
}) => state.schedule[timeOfDay].habits[weekDay];

export default scheduleSlice.reducer;
