import { Image, View } from "react-native";
import React from "react";

import Title from "./Title";
import SimpleBtn from "./SimpleBtn";

const SidededCard = ({
  community,
  width,
  height,
  reverse,
  img,
  title,
  desc,
  onPress,
}) => {
  return (
    <View
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
        justifyContent: "space-between",
      }}
    >
      <Image
        style={{
          height: height ? height : 309,
          width: width ? width : 500,
        }}
        source={img}
      />
      <View style={{ gap: 14, width: 600 }}>
        {community && (
          <Title
            textFamily={"Poppins-Regular"}
            textSize={20}
            title={"Cross Community Learning"}
            textColor={"#135837"}
          />
        )}
        <Title
          textFamily={"Poppins-SemiBold"}
          textSize={30}
          style={{ marginBottom: 10 }}
          title={title}
        />
        <Title textFamily={"Poppins-Regular"} textSize={24} title={desc} />
        {!community && <SimpleBtn title={"Start Now"} />}
      </View>
    </View>
  );
};

export default SidededCard;
