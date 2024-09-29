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
        source={{ uri: 'https://img.icons8.com/?size=100&id=85018&format=png&color=FFFFFF' }}
        style={styles.arrowdown}
      />
      )}
    </TouchableOpacity>
  );
};

export default HButton;

const styles = StyleSheet.create({
  hText: {
    fontSize: 18,
    marginRight: 5,
    color: 'black',
    fontWeight: 500,
  },
  arrowdown: {
    width: 20,
    height: 20,
    // marginRight: 30,
  },
});
