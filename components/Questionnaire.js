import { StyleSheet, Switch, Text, View } from "react-native";
import React from "react";

const Questionnaires = ({ question, isEnabled, toggleSwitch }) => {
  return (
    <View style={styles.questionnaires}>
      <Text
        style={{
          fontSize: 13,
          lineHeight: 15,
          fontFamily: "Poppins-Regular",
        }}
      >
        {question}
      </Text>
      <View>
        <View
          style={{
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 12, fontFamily: "Poppins-Regular" }}>
            No
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={{ fontSize: 12, fontFamily: "Poppins-Regular" }}>
            Yes
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Questionnaires;

const styles = StyleSheet.create({});
