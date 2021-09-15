import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const MaterialCommunityIconsPack = {
  name: "materialCommunity",
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name: string) {
        return IconProvider(name);
      },
    }
  );
}

const IconProvider = (name: string) => ({
  toReactElement: (props: IMaterialCommunityIconParams) =>
    // @ts-ignore
    MaterialCommunityIcon({ name, ...props }),
});

interface IMaterialCommunityIconParams {
  name: string;
  style: any;
}

function MaterialCommunityIcon({ name, style }: IMaterialCommunityIconParams) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return <Icon name={name} size={height} color={tintColor} style={iconStyle} />;
}
