import { Image } from "react-native";
import React from "react";

const DottedImage = ({ style,down }) => {
 if(down) {return (
    <Image
      source={require("../assets/dottedNetdown.png")}
      style={[style, { width: 608, height: 344, position: "absolute" }]}
    />
  );}
  return (
    <Image
      source={require("../assets/dottedNet.png")}
      style={[style, { width: 608, height: 344, position: "absolute" }]}
    />
  );
};
export default DottedImage;
