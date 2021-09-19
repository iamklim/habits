import React from "react";
import {Icon} from "@ui-kitten/components";
import {IconProps} from "@ui-kitten/components/ui/icon/icon.component";

export const CalendarTodayIcon = (props: IconProps) => (
  <Icon {...props} name="calendar-today" />
);

export const BellIcon = (props: IconProps) => (
  <Icon {...props} name="bell-outline" />
);

export const ListIcon = (props: IconProps) => (
  <Icon {...props} name="clipboard-list-outline" />
);

export const ArrowLeftIcon = (props: IconProps) => (
  <Icon {...props} name="arrow-left" />
);

export const PlusIcon = (props: IconProps) => <Icon {...props} name="plus" />;

export const MinusIcon = (props: IconProps) => <Icon {...props} name="minus" />;

export const ChevronRightIcon = (props: IconProps) => (
  <Icon {...props} name="chevron-right" />
);
