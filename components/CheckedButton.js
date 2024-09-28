import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import Row from "./Row";
import Title from "./Title";

const Checkedbutton = ({ text, unchecked }) => {
  if (unchecked) {
    return (
      <Row
        style={{
          gap: 12,
          padding: 10,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#A2EEC9",
        }}
      >
        <Ionicons name="square-outline" size={20} color={"#A2EEC9"} />
        <Title textSize={14} title={text} />
      </Row>
    );
  } else {
    return (
      <Row style={{ gap: 12 }}>
        <AntDesign name="checkcircle" size={16} color={"#135837"} />
        <Title textSize={14} title={text} />
      </Row>
    );
  }
};

export default Checkedbutton;
