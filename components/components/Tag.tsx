import { TouchableOpacity } from "react-native";
import { Icon, StyleService, Text, useStyleSheet } from "@ui-kitten/components";
import React from "react";
import { ChevronRightIcon } from "./Icons";

const themedStyles = StyleService.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  containerActive: {
    backgroundColor: "background-basic-color-3",
  },
  containerLight: {
    backgroundColor: "background-basic-color-2",
  },
  habitIcon: {
    width: 18,
    height: 18,
    color: "color-basic-600",
    marginRight: 4,
  },
  text: {
    fontSize: 16,
  },
  textActive: {
    color: "color-basic-800",
  },
  textLight: {
    color: "color-basic-700",
  },
  actionIcon: {
    width: 18,
    height: 18,
    color: "color-basic-600",
    marginLeft: 4,
  },
});

interface ITagProps {
  icon?: string;
  text: string;
  onPress: () => void;
  isActive?: boolean;
}

const Tag = ({ icon, text, onPress, isActive = true }: ITagProps) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        isActive ? styles.containerActive : styles.containerLight,
      ]}
    >
      {icon && <Icon style={styles.habitIcon} name={icon} />}
      <Text
        style={[styles.text, isActive ? styles.textActive : styles.textLight]}
      >
        {text}
      </Text>
      <ChevronRightIcon style={styles.actionIcon} />
    </TouchableOpacity>
  );
};

export default Tag;
