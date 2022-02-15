import React from "react";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { ArrowLeftIcon } from "./Icons";
import { useNavigation } from "@react-navigation/native";
import * as Analytics from "expo-firebase-analytics";

const BackAction = () => {
  const navigation = useNavigation();

  const onPress = async () => {
    await Analytics.logEvent("habits/my/back_button_press");
    navigation.goBack();
  };

  return <TopNavigationAction onPress={onPress} icon={ArrowLeftIcon} />;
};

interface ITopNavigationBackProps {
  title?: string;
}

const TopNavigationBack = ({ title = "Back" }: ITopNavigationBackProps) => (
  <TopNavigation accessoryLeft={BackAction} title={title} />
);

export default TopNavigationBack;
