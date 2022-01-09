import React from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useEffect } from "react";
import { setCurrentWeekDayAndUpdateTodayHabits } from "../store/schedule/scheduleSlice";

const AppWrapper: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentWeekDayAndUpdateTodayHabits());
  }, []);

  return <>{children}</>;
};

export default AppWrapper;
