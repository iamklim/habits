import React from "react";
import {
  Button,
  Icon,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { View } from "react-native";

const themedStyles = StyleService.create({
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 24,
    paddingHorizontal: 18,
    paddingBottom: 10,
    minHeight: 155,
    backgroundColor: "background-basic-color-1",
    borderColor: "border-basic-color-4",
    overflow: "hidden",
  },
  cardMain: {
    marginBottom: 10,
  },
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  cardTitleText: {
    fontSize: 18,
    fontWeight: "500",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
    color: "color-basic-600",
  },
  backgroundIcon: {
    position: "absolute",
    top: 0,
    right: -70,
    width: 200,
    height: 200,
    color: "color-basic-transparent-200",
    transform: [{ rotate: "-15deg" }],
  },
  cardDescription: {
    fontSize: 14,
    fontWeight: "300",
  },
  cardFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    marginLeft: 10,
  },
});

interface IHabitCardProps {
  id: number;
  name: string;
  icon: string;
  description: string;
  isAdded: boolean;
  onHabitAdd: ({ id }: { id: number }) => void;
  onHabitRemove: ({ id }: { id: number }) => void;
  onHabitOpen: ({ id }: { id: number }) => void;
}

const HabitCard = ({
  id,
  name,
  icon,
  description,
  isAdded,
  onHabitAdd,
  onHabitRemove,
  onHabitOpen,
}: IHabitCardProps) => {
  const styles = useStyleSheet(themedStyles);

  const onAdd = () => {
    if (onHabitAdd) {
      onHabitAdd({ id });
    }
  };

  const onRemove = () => {
    if (onHabitRemove) {
      onHabitRemove({ id });
    }
  };

  const onOpen = () => {
    if (onHabitOpen) {
      onHabitOpen({ id });
    }
  };

  return (
    <View style={styles.card}>
      <Icon style={styles.backgroundIcon} name={icon} />
      <View style={styles.cardMain}>
        <View style={styles.cardTitle}>
          <Icon style={styles.icon} name={icon} />
          <Text style={styles.cardTitleText}>{name}</Text>
        </View>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <View style={styles.cardFooter}>
        {isAdded ? (
          <>
            <Button size="small" appearance="ghost" onPress={onRemove}>
              Remove
            </Button>
            <Button
              style={styles.actionButton}
              size="small"
              appearance="outline"
              onPress={onOpen}
            >
              Open
            </Button>
          </>
        ) : (
          <Button size="small" appearance="outline" onPress={onAdd}>
            Add
          </Button>
        )}
      </View>
    </View>
  );
};

export default HabitCard;
