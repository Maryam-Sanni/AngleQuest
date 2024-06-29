import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation();

  const handleXPress = () => {
    navigation.navigate('Join Recruitangle'); // Navigate to 'JoinAs' page
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, paddingRight: 40, alignItems: "center", backgroundColor: "white", maxWidth: '100%' }}>
      <Image
        source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&" }}
        style={{ width: 40, height: 40, marginRight: -1150 }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Recruitangle</Text>
      <TouchableOpacity onPress={handleXPress}>
        <Text style={{ fontSize: 18, marginRight: -50, color: 'grey' }}>✕</Text> {/* Unicode representation of 'X' character */}
      </TouchableOpacity>
    </View>
  );
};

export default MyComponent;