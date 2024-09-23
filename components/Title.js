import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Title = ({
  onPress,
  title,
  textSize,
  textColor,
  textWeight,
  textFamily,
  style,
  center,
}) => {
  return (
    <Text
      onPress={onPress}
      style={[
        style,
        {
          textAlign: center ? "center" : "left",
          fontSize: textSize ? textSize : 14,
          color: textColor ? textColor : "black",
          fontWeight: textWeight ? textWeight : "400",
        },
      ]}
    >
      {title}
    </Text>
  );
};

export default Title;

const styles = StyleSheet.create({});
