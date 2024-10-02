import { StyleSheet, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MainButtons = ({
  img,
  leftImg,
  icon,
  title,
  outlined,
  onPress,
  bgColor,
  textColor,
  height,
  width,
  fontSize,
  borderRadius,
  gradient,
  fontFamily,
  style,
  paddingVertical,
}) => {
  if (gradient) {
    return (
      <LinearGradient
        onPress={onPress}
        colors={["#135837", "#29BE77"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          style,
          {
            alignItems: "center",
            flexDirection: "row",
            gap: 8,
            borderWidth: gradient ? 0 : 2,
            borderColor: bgColor ? bgColor : "#135837",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: borderRadius ? borderRadius : 0,
            gap: 10,
            width: width ? width : 130,
            height: height ? height : "auto",
            justifyContent: "center",
            backgroundColor: bgColor ? bgColor : outlined ? "#fff" : "#135837",
          },
        ]}
      >
        <Text
          style={[
            styles.hText,
            {
              fontSize: fontSize ? fontSize : 14,
              color: textColor ? textColor : outlined ? "black" : "#ffff",
            },
          ]}
        >
          {title}
        </Text>
        {img && <Image source={img} style={[styles.arrowdown]} />}
        {icon && icon}
      </LinearGradient>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
        borderWidth: 2,
        borderColor: bgColor ? bgColor : "#135837",
        paddingVertical: paddingVertical ? paddingVertical : 10,
        paddingHorizontal: 14,
        borderRadius: borderRadius ? borderRadius : 0,
        gap: 10,
        width: width ? width : 130,
        height: height ? height : "auto",
        justifyContent: "center",
        backgroundColor: bgColor ? bgColor : outlined ? "#fff" : "#135837",
      }}
    >
      {leftImg && <Image source={leftImg} style={[styles.arrowdown]} />}

      <Text
        style={[
          styles.hText,
          {
            fontSize: fontSize ? fontSize : 14,
            color: textColor ? textColor : outlined ? "black" : "#ffff",
          },
        ]}
      >
        {title}
      </Text>
      {img && <Image source={img} style={[styles.arrowdown]} />}
      {icon && icon}
    </TouchableOpacity>
  );
};

export default MainButtons;

const styles = StyleSheet.create({
  hText: {},
});
