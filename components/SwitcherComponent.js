import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Row from "./Row";
import { Image } from "react-native";
import Title from "./Title";
const CardItem = ({ onHover, title, desc, img, img1, bgColor, active }) => {
  if (active) {
    return (
      <Pressable
        onMouseEnter={onHover}
        style={{
          width: 700,
          height: 631,
          justifyContent: "center",
          borderRadius: 16,
          paddingHorizontal: 30,
          backgroundColor: bgColor ? bgColor : "#F7F7F7",
        }}
      >
        <View
          style={{
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 472,
              height: 321,
            }}
            source={require("../assets/light.png")}
          />
        </View>
        <View>
          <Title
            title={title}
            style={{ width: 360 }}
            textSize={24}
            textColor={bgColor ? "white" : "black"}
          />
          <Title
            title={desc}
            textColor={bgColor ? "white" : "black"}
            style={{ width: 381 }}
            textSize={16}
          />
        </View>
      </Pressable>
    );
  }
  return (
    <Pressable
      onMouseEnter={onHover}
      style={{
        width: 340,
        backgroundColor: bgColor ? bgColor : "#F7F7F7",
        borderRadius: 16,
        paddingHorizontal: 40,
        paddingVertical: 60,
        height: 631,
        justifyContent: "space-between",
      }}
    >
      <Image style={{ width: "100%", height: 321 }} source={img1} />

      <Title
        textSize={24}
        style={{ width: 164 }}
        textColor={bgColor ? "white" : "black"}
        title={title}
      />
    </Pressable>
  );
};
const SwitcherComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Row style={{ gap: 20, marginVertical: 40 }}>
      <CardItem
        img1={require("../assets/whitey.png")}
        title={"Turn service needs into action"}
        desc={
          "Bridge the gap between tickets and larger scale service initiatives by managing them in one place."
        }
        onHover={() => setActiveIndex(0)}
        active={activeIndex === 0 ? true : false}
      />
      <CardItem
        bgColor={"#135837"}
        img1={require("../assets/greeny.png")}
        title={"Accelerate stakeholder collaboration"}
        desc={
          "Replace messy email threads with in-platform communication to connect internal and external stakeholders."
        }
        onHover={() => setActiveIndex(1)}
        active={activeIndex === 1 ? true : false}
      />
      <CardItem
        bgColor={"#E8456B"}
        img1={require("../assets/pinky.png")}
        title={"Solve tickets with full context"}
        desc={
          "Bridge the gap between tickets and larger scale service initiatives by managing them in one place."
        }
        onHover={() => setActiveIndex(2)}
        active={activeIndex === 2 ? true : false}
      />
      {/* 
     <View
        style={{
          width: 700,
          height: 631,
          justifyContent: "center",
          borderRadius: 16,
          paddingHorizontal: 30,
          backgroundColor: "#F7F7F7",
        }}
      >
        <View
          style={{
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              //    alignSelf: "center",
              width: 472,
              height: 321,
            }}
            source={require("../assets/light.png")}
          />
        </View>
        <View>
          <Title
            title={"Turn service needs into action"}
            style={{ width: 360 }}
            textSize={24}
            textFamily={"Poppins-SemiBold"}
          />
          <Title
            title={
              "Bridge the gap between tickets and larger scale service initiatives by managing them in one place."
            }
            style={{ width: 381 }}
            textSize={16}
            textFamily={"Poppins-Regular"}
          />
        </View>
      </View>

      <View
        style={{
          width: 340,
          backgroundColor: "#135837",
          borderRadius: 16,
          paddingHorizontal: 40,
          paddingVertical: 60,
          height: 631,
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: "100%", height: 321 }}
          source={require("../assets/greeny.png")}
        />

        <Title
          textSize={24}
          style={{ width: 164 }}
          textColor={"white"}
          title="Accelerate stakeholder collaboration"
          textFamily={"Poppins-SemiBold"}
        />
      </View>
      <View
        style={{
          width: 340,
          backgroundColor: "#E8456B",
          borderRadius: 16,
          paddingHorizontal: 40,
          paddingVertical: 60,
          height: 631,
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: "100%", height: 321 }}
          source={require("../assets/pinky.png")}
        />

        <Title
          textSize={24}
          style={{ width: 164 }}
          textColor={"white"}
          title="Solve tickets with full context"
          textFamily={"Poppins-SemiBold"}
        />
      </View>
      */}
    </Row>
  );
};

export default SwitcherComponent;

const styles = StyleSheet.create({});
