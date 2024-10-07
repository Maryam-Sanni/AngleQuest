import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const TwinButton = ({ text1, text2, text3, activeBtn, handleActive }) => {
  return (
    <View style={styles.selectType}>
      <TouchableOpacity
        onPress={() => handleActive(0)}
        style={activeBtn == 0 ? styles.activeBtn : styles.inActiveBtn}
      >
        <Text
          style={activeBtn == 0 ? styles.activeBtnText : styles.inActiveBtnText}
        >
          {text1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleActive(1)}
        style={activeBtn == 1 ? styles.activeBtn : styles.inActiveBtn}
      >
        <Text
          style={activeBtn == 1 ? styles.activeBtnText : styles.inActiveBtnText}
        >
          {text2}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleActive(2)}
        style={activeBtn == 2 ? styles.activeBtn : styles.inActiveBtn}
      >
        <Text
          style={activeBtn == 2 ? styles.activeBtnText : styles.inActiveBtnText}
        >
          {text3}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TwinButton;

const styles = StyleSheet.create({
  selectType: {
    alignItems: "center",
    marginTop: 20,
    gap: 10,
    flexDirection: "row",
    backgroundColor: "#EDFBF4",
    padding: 8,
    borderRadius: 30,
    width: 706,
  },
  activeBtn: {
    backgroundColor: "#135837",
    padding: 12,
    borderRadius: 30,
    width: "33.3%",
    alignItems: "center",
  },
  activeBtnText: {
    color: "#fff",
  },
  inActiveBtn: {
    padding: 12,
    borderRadius: 30,
    width: "31%",
    alignItems: "center",
  },
  inActiveBtnText: {
    color: "black",
  },
});
