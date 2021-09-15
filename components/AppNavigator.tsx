import React from "react";
import {
  NavigationContainer,
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import TodayScreen from "./TodayScreen";
import HabitsScreen from "./HabitsScreen";
import RitualsScreen from "./RitualsScreen";
import HabitInfoScreen from "./HabitInfoScreen";
import { BellIcon } from "./Icons";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/src/types";
import { ScreenEnum } from "../types/types";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface IBottomTabBarProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
}

const BottomTabBar = ({ navigation, state }: IBottomTabBarProps) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="TODAY" icon={BellIcon} />
      <BottomNavigationTab title="RITUALS" icon={BellIcon} />
      <BottomNavigationTab title="HABITS" icon={BellIcon} />
    </BottomNavigation>
  );
};

const Habits = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ScreenEnum.HABITS_LIST} component={HabitsScreen} />
    <Stack.Screen name={ScreenEnum.HABIT_INFO} component={HabitInfoScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Rituals" component={RitualsScreen} />
      <Tab.Screen name="Habits" component={Habits} />
    </Tab.Navigator>
  </NavigationContainer>
);
