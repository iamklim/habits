import React from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useEffect } from "react";
import { setCurrentWeekDayAndUpdateTodayHabits } from "../store/schedule/scheduleSlice";
import { checkAndSetUID } from "./helpers/uid";

const AppWrapper: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentWeekDayAndUpdateTodayHabits());
    checkAndSetUID();
  }, []);

  return <>{children}</>;
};

export default AppWrapper;
