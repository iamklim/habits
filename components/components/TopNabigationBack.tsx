import React from "react";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { ArrowLeftIcon } from "./Icons";
import { useNavigation } from "@react-navigation/native";

const BackAction = () => {
  const navigation = useNavigation();
  const onPress = () => {
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
