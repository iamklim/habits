import { TimeOfDayEnum } from "../types/types";

export const TIME_OF_DAY_TO_DEFAULT_NOTIFICATION_HOUR = {
  [TimeOfDayEnum.MORNING]: 7,
  [TimeOfDayEnum.AFTERNOON]: 12,
  [TimeOfDayEnum.EVENING]: 19,
};
