import React from "react";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { BackIcon } from "./Icons";
import { useNavigation } from "@react-navigation/native";

const BackAction = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };

  return <TopNavigationAction onPress={onPress} icon={BackIcon} />;
};

const TopNavigationBack = () => (
  <TopNavigation accessoryLeft={BackAction} title="Back" />
);

export default TopNavigationBack;
