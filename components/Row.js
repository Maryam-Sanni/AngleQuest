import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Row = ({ style, children }) => {
  return (
    <View style={[style, { flexDirection: "row", alignItems: "center" }]}>
      {children}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({});
