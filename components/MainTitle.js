import { StyleSheet, Text } from "react-native";
import React from "react";

const MainTitle = ({ width, title, secondTitle, thirdTitle, forthTitle }) => {
  return (
    <Text
      style={{
        marginVertical: 20,
        width: width ? width : 666,
        fontFamily: "Poppins-Bold",
        fontSize: 40,
        fontWeight: "700",
        alignSelf: "center",
        textAlign: "center",
      }}
    >
      {title}{" "}
      {secondTitle && <Text style={{ color: "#29BE77" }}>{secondTitle}</Text>}
      {thirdTitle && thirdTitle + " "}
      {forthTitle && <Text style={{ color: "#29BE77" }}>{forthTitle}</Text>}
    </Text>
  );
};
export default MainTitle;

const styles = StyleSheet.create({});
