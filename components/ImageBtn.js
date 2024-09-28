import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const ImageBtn = ({ style, width, height, img, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={img} width={width} height={height} style={[style]} />
    </TouchableOpacity>
  );
};

export default ImageBtn;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 80,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
