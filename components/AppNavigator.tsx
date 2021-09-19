import React from "react";
import {
  NavigationContainer,
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import TodayScreen from "./screens/TodayScreen";
import HabitsScreen from "./screens/HabitsScreen";
import RitualsScreen from "./screens/RitualsScreen";
import HabitInfoScreen from "./screens/HabitInfoScreen";
import { BellIcon, CalendarTodayIcon, ListIcon } from "./components/Icons";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/src/types";
import {
  BottomTabNavigatorScreensEnum,
  HabitsScreenTabEnum,
  StackNavigatorScreensEnum,
  TBottomTabNavigatorParams,
  TStackNavigatorParams,
} from "../types/types";
import { SafeAreaView } from "react-native";

const Stack = createStackNavigator<TStackNavigatorParams>();
const Tab = createBottomTabNavigator<TBottomTabNavigatorParams>();

interface IBottomTabBarProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
}

const BottomTabBar = ({ navigation, state }: IBottomTabBarProps) => {
  return (
    <SafeAreaView>
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
      >
        <BottomNavigationTab title="TODAY" icon={CalendarTodayIcon} />
        <BottomNavigationTab title="HABITS" icon={ListIcon} />
        <BottomNavigationTab title="RITUALS" icon={BellIcon} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

const Habits = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name={StackNavigatorScreensEnum.HABITS_LIST}
      component={HabitsScreen}
      initialParams={{ tab: HabitsScreenTabEnum.HABITS }}
    />
    <Stack.Screen
      name={StackNavigatorScreensEnum.HABIT_INFO}
      component={HabitInfoScreen}
    />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen
        name={BottomTabNavigatorScreensEnum.TODAY}
        component={TodayScreen}
      />
      <Tab.Screen
        name={BottomTabNavigatorScreensEnum.HABITS}
        component={Habits}
      />
      <Tab.Screen
        name={BottomTabNavigatorScreensEnum.RITUALS}
        component={RitualsScreen}
      />
    </Tab.Navigator>
  </NavigationContainer>
);
