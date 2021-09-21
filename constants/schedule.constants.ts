import { TimeOfDayEnum, WeekDayEnum } from "../types/types";

export const WEEK_DAYS = [
  WeekDayEnum.MON,
  WeekDayEnum.TUE,
  WeekDayEnum.WED,
  WeekDayEnum.THU,
  WeekDayEnum.FRI,
  WeekDayEnum.SAT,
  WeekDayEnum.SUN,
];

export const WEEK_DAYS_SHORT_TO_FULL = {
  [WeekDayEnum.MON]: "monday",
  [WeekDayEnum.TUE]: "tuesday",
  [WeekDayEnum.WED]: "wednesday",
  [WeekDayEnum.THU]: "thursday",
  [WeekDayEnum.FRI]: "friday",
  [WeekDayEnum.SAT]: "saturday",
  [WeekDayEnum.SUN]: "sunday",
};

export const TIME_OF_DAY_TO_DEFAULT_NOTIFICATION_HOUR = {
  [TimeOfDayEnum.MORNING]: 7,
  [TimeOfDayEnum.AFTERNOON]: 12,
  [TimeOfDayEnum.EVENING]: 19,
};

export const JS_DAY_INDEX_TO_WEEKDAY: Record<number, WeekDayEnum> = {
  0: WeekDayEnum.SUN,
  1: WeekDayEnum.MON,
  2: WeekDayEnum.TUE,
  3: WeekDayEnum.WED,
  4: WeekDayEnum.THU,
  5: WeekDayEnum.FRI,
  6: WeekDayEnum.SAT,
};
