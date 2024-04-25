import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const MyComponent = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, paddingRight: 40, alignItems: "center", backgroundColor: "white", maxWidth: '100%' }}>
      <Image
        source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&" }}
        style={{ width: 40, height: 40, marginRight: -1130 }}
      />
      <Text style={{  fontWeight: "bold", fontSize: 20 }}>Recruitangle</Text>
      <TouchableOpacity onPress={() => alert('Close icon pressed')}>
        <Text style={{ fontSize: 18, marginRight: -10, color: 'grey' }}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyComponent;
