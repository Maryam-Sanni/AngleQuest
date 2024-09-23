import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainButtons from "../LandingPage/MainButton";
import { AntDesign } from "@expo/vector-icons";

const HomeCard = ({ title, subTitle, desc }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 40,
        backgroundColor: "white",
        borderRadius: 20,
        width: "80%",
        justifyContent: "space-between",
        paddingHorizontal: 50,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 20,
          width: 360,
          borderWidth: 1,
          borderColor: "#ccc",
          marginLeft: 50,
        }}
      >
        <View style={{ padding: 20, gap: 20 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 20,
              gap: 30,
              flex: 1,
            }}
          >
            <View style={styles.dots} />
            <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Regular",
              fontWeight: "400",
            }}
          >
            {subTitle}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Regular",
              fontWeight: "400",
              width: 295,
            }}
          >
            {desc}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignSelf: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <MainButtons
          title={"Get Started"}
          outlined
          icon={<AntDesign name="arrowright" size={10} color="#135837" />}
        />
      </View>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  dots: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#135837",
  },
});
