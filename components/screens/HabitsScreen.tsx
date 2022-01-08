import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Button,
  Layout,
  StyleService,
  useStyleSheet,
  Text,
} from "@ui-kitten/components";
import HabitCard from "../components/HabitCard";
import { HABITS } from "../../constants/habits.constant";
import { addHabit } from "../../store/schedule/scheduleSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { removeHabit } from "../../store/schedule/scheduleThunks";
import {
  BottomTabNavigatorScreensEnum,
  HabitsScreenTabEnum,
  IHabit,
  StackNavigatorScreensEnum,
  THabitsListScreenRouteProp,
  THabitsScreenNavigationProp,
} from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import Tag from "../components/Tag";

const themedStyles = StyleService.create({
  layout: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    marginHorizontal: 6,
    borderBottomColor: "color-basic-transparent-100",
    borderBottomWidth: 2,
  },
  habitsTab: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  habitCard: {
    marginBottom: 10,
  },
  habitAddView: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 2,
  },
  text: {
    fontSize: 16,
  },
});

interface IHabitsListProps {
  habits: IHabit[];
  isAddedHabits?: boolean;
}

const HabitsList = ({ habits, isAddedHabits = false }: IHabitsListProps) => {
  const dispatch = useAppDispatch();
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const isHabitsAvailable = Boolean(habits.length);

  const onHabitAdd = ({ id }: { id: number }) => {
    dispatch(addHabit({ id }));
  };

  const onHabitRemove = ({ id }: { id: number }) => {
    dispatch(removeHabit({ id }));
  };

  const onHabitOpen = ({ id }: { id: number }) => {
    // @ts-ignore
    navigation.navigate(BottomTabNavigatorScreensEnum.HABITS, {
      screen: StackNavigatorScreensEnum.HABIT_INFO,
      params: { id },
    });
  };

  const onTagPress = () => {
    // @ts-ignore
    navigation.navigate(BottomTabNavigatorScreensEnum.HABITS, {
      screen: StackNavigatorScreensEnum.HABITS_LIST,
      params: { tab: HabitsScreenTabEnum.HABITS },
    });
  };

  return (
    <>
      {isHabitsAvailable ? (
        habits.map(({ id, name, icon, description }) => {
          return (
            <View style={styles.habitCard} key={id}>
              <HabitCard
                id={id}
                name={name}
                icon={icon}
                description={description}
                isAdded={isAddedHabits}
                onHabitAdd={onHabitAdd}
                onHabitRemove={onHabitRemove}
                onHabitOpen={onHabitOpen}
              />
            </View>
          );
        })
      ) : isAddedHabits ? (
        <View style={styles.habitAddView}>
          <Text style={styles.text}>You have no habits </Text>
          <Tag onPress={onTagPress} text="Add some" />
        </View>
      ) : (
        <View style={styles.habitAddView}>
          <Text style={styles.text}>Great! All habits are added</Text>
        </View>
      )}
    </>
  );
};

const HabitsScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation<THabitsScreenNavigationProp>();
  const route = useRoute<THabitsListScreenRouteProp>();
  const tab = route.params.tab;

  const habitsAdded = useAppSelector((state) => state.schedule.habitsAdded);

  const isHabitsTab = tab === HabitsScreenTabEnum.HABITS;
  const isMyHabitsTab = tab === HabitsScreenTabEnum.MY_HABITS;

  const habitsAddedToSchedule = habitsAdded.map(
    (habitId) => HABITS.find((habit) => habit.id === habitId) as IHabit
  );

  const habitsNotAddedToSchedule = HABITS.filter(
    ({ id }) => !habitsAdded.includes(id)
  );

  const onHabitsPress = () => {
    navigation.setParams({
      tab: HabitsScreenTabEnum.HABITS,
    });
  };

  const onMyHabitsPress = () => {
    navigation.setParams({
      tab: HabitsScreenTabEnum.MY_HABITS,
    });
  };

  return (
    <Layout style={styles.layout}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.buttonView}>
          <View style={styles.button}>
            <Button
              onPress={onHabitsPress}
              appearance={isHabitsTab ? "filled" : "ghost"}
            >
              All habits
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              onPress={onMyHabitsPress}
              appearance={isMyHabitsTab ? "filled" : "ghost"}
            >
              My habits
            </Button>
          </View>
        </View>
        <ScrollView>
          <View style={styles.habitsTab}>
            {isHabitsTab && <HabitsList habits={habitsNotAddedToSchedule} />}
            {isMyHabitsTab && (
              <HabitsList habits={habitsAddedToSchedule} isAddedHabits={true} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default HabitsScreen;
