import React, { useRef } from "react";
import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
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
import * as Analytics from "expo-firebase-analytics";

const Stack = createStackNavigator<TStackNavigatorParams>();
const Tab = createBottomTabNavigator<TBottomTabNavigatorParams>();

interface IBottomTabBarProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
}

const themedStyles = StyleService.create({
  bottomNavigation: {
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 4,
    shadowColor: "color-basic-1000",
    shadowOpacity: 0.1,
  },
});

const BottomTabBar = ({ navigation, state }: IBottomTabBarProps) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaView>
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
        style={styles.bottomNavigation}
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

export const AppNavigator = () => {
  const navigationRef =
    useNavigationContainerRef<
      NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
    >();
  const routeNameRef = useRef<string>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await Analytics.logEvent("screen_view", {
            screen_name: currentRouteName,
          });
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
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
};
