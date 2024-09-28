import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import Row from "./Row";
import Title from "./Title";

const SimpleBtn = ({ title, onPress, textSize }) => {
  return (
    <Pressable onPress={onPress}>
      <Row style={{ gap: 10, alignItems: "center", marginTop: 10 }}>
        <Title
          title={title}
          textSize={textSize ? textSize : 16}
          textColor={"#135837"}
        />

        <AntDesign name="arrowright" size={18} color="#135837" />
      </Row>
    </Pressable>
  );
};

export default SimpleBtn;

const styles = StyleSheet.create({});
