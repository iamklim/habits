import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeOfDayEnum, WeekDayEnum } from "../../types/types";
import { RootState } from "../store";
import { getCurrentWeekDay, getTodayHabitsUpdated } from "./utils";

type THabitRecord = Record<WeekDayEnum, number[]>;

interface ITimeOfDayState {
  notificationTime: string;
  habits: THabitRecord;
}

export type TTodayRecord = Record<number, boolean>;

export interface IScheduleState {
  habitsAdded: number[];
  morning: ITimeOfDayState;
  afternoon: ITimeOfDayState;
  evening: ITimeOfDayState;
  currentWeekDay: WeekDayEnum;
  today: {
    morning: TTodayRecord;
    afternoon: TTodayRecord;
    evening: TTodayRecord;
  };
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
  currentWeekDay: getCurrentWeekDay(),
  today: {
    morning: {},
    afternoon: {},
    evening: {},
  },
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
    setCurrentWeekDayAndUpdateTodayHabits: (state) => {
      const currentWeekDay = getCurrentWeekDay();

      const todayMorningHabits = getTodayHabitsUpdated({
        state,
        timeOfDay: TimeOfDayEnum.MORNING,
        weekDay: currentWeekDay,
      });

      const todayAfternoonHabits = getTodayHabitsUpdated({
        state,
        timeOfDay: TimeOfDayEnum.AFTERNOON,
        weekDay: currentWeekDay,
      });

      const todayEveningHabits = getTodayHabitsUpdated({
        state,
        timeOfDay: TimeOfDayEnum.EVENING,
        weekDay: currentWeekDay,
      });

      state.currentWeekDay = currentWeekDay;
      state.today.morning = todayMorningHabits;
      state.today.afternoon = todayAfternoonHabits;
      state.today.evening = todayEveningHabits;
    },
    updateTodayHabitStatus: (
      state,
      action: PayloadAction<{
        timeOfDay: TimeOfDayEnum;
        habitId: number;
        habitStatus: boolean;
      }>
    ) => {
      const { timeOfDay, habitId, habitStatus } = action.payload;
      state.today[timeOfDay][habitId] = habitStatus;
    },
  },
});

export const {
  addHabit,
  removeHabitFromHabitsAdded,
  toggleHabitInWeekDay,
  removeHabitFromTimeOfDay,
  setNotificationTime,
  setCurrentWeekDayAndUpdateTodayHabits,
  updateTodayHabitStatus,
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

export const currentWeekDaySelector = ({ state }: { state: RootState }) =>
  state.schedule.currentWeekDay;

export const todayHabitStatusSelector = ({
  state,
  timeOfDay,
  habitId,
}: {
  state: RootState;
  timeOfDay: TimeOfDayEnum;
  habitId: number;
}) => state.schedule.today[timeOfDay][habitId];

export const todayHabitsProgressSelector = ({
  state,
}: {
  state: RootState;
}) => {
  const morningHabitsEntries = Object.entries(state.schedule.today.morning);
  const afternoonHabitsEntries = Object.entries(state.schedule.today.afternoon);
  const eveningHabitsEntries = Object.entries(state.schedule.today.evening);

  const totalHabitsEntries = [
    ...morningHabitsEntries,
    ...afternoonHabitsEntries,
    ...eveningHabitsEntries,
  ];
  const totalHabitsCompleted = totalHabitsEntries.filter(
    ([_, habitValue]) => habitValue
  );

  if (totalHabitsEntries.length === 0) {
    return 0;
  }

  return Math.round(
    (totalHabitsCompleted.length / totalHabitsEntries.length) * 100
  );
};

const scheduleSliceReducer = scheduleSlice.reducer;
export default scheduleSliceReducer;
