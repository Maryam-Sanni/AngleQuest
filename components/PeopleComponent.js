import { StyleSheet, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import people from "../assets/peoplee.png";
import { Image } from "react-native";
import MainButtons from "../LandingPage/MainButton";
import Title from "./Title";
import Row from "./Row";

const PeopleComponent = () => {
  return (
    <LinearGradient
      colors={["#135837", "#29BE77"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        width: "100%",
        height: 450,
        alignItems: "center",
        paddingHorizontal: 100,
      }}
    >
      <Row
        style={{
          width: 1400,
          height: "100%",
        }}
      >
        <View style={{  }}>
          <View style={{ marginBottom: 50 }}>
            <Title
              textColor={"white"}
              textSize={36}
              title={"Empowering teams to"}
            />
            <Title
              textColor={"white"}
              textSize={36}
              // textWeight={}
              textFamily="Poppins-SemiBold"
              title={"accomplish more, together"}
            />
          </View>
          <MainButtons
            borderRadius={20}
            bgColor={"white"}
            textColor={"#135837"}
            title={"Get Started"}
            icon={<AntDesign name="arrowright" size={10} color="#135837" />}
          />
        </View>
        <Image
          style={{ position: "absolute", bottom: 0, right: 0 }}
          source={people}
        />
      </Row>
    </LinearGradient>
  );
};

export default PeopleComponent;

const styles = StyleSheet.create({});
