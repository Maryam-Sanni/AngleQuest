import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";

const HButton = ({ onPress, onMouseEnter, dropdown, title }) => {
  return (
    <TouchableOpacity
      onMouseEnter={onMouseEnter}
      onPress={onPress}
      style={{ alignItems: "center", flexDirection: "row" }}
    >
      <Text style={styles.hText}>{title}</Text>
      {dropdown && (
        <Image
          source={require("../assets/icons8-arrow-down-24.png")}
          style={styles.arrowdown}
        />
      )}
    </TouchableOpacity>
  );
};

export default HButton;

const styles = StyleSheet.create({
  hText: {
    fontSize: 16,
    marginRight: 5,
    // marginLeft: 30,
    fontWeight: 500,
  },
  arrowdown: {
    width: 20,
    height: 20,
    // marginRight: 30,
  },
});
