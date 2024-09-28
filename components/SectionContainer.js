import { View } from "react-native";
import React from "react";

const SectionContainer = ({ children, bgColor, style }) => {
  return (
    <View
      style={[
        style,
        {
          marginVertical: 40,
          width: "100%",
          paddingHorizontal: 100,
          backgroundColor: bgColor ? bgColor : "#fff",
          position: "relative",
          alignItems: "center",
        },
      ]}
    >
      {children}
    </View>
  );
};

export default SectionContainer;
