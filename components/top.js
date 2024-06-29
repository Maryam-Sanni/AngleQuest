import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation();

  const handleXPress = () => {
    navigation.navigate('Join Recruitangle'); // Navigate to 'JoinAs' page
  };

  return ( 
    <View style={{ flexDirection: "row", marginTop: -50, justifyContent: "space-between", padding: 10, paddingRight: 40, alignItems: "center", backgroundColor: "white", maxWidth: '100%' }}>
       <Image
       source={require('../assets/34.png')}
        style={{ width: 200, height: 200 }}
      />
      <TouchableOpacity onPress={handleXPress}>
        <Text style={{ fontSize: 18, marginRight: -50, color: 'grey' }}>✕</Text> {/* Unicode representation of 'X' character */}
      </TouchableOpacity>
    </View>
  );
};

export default MyComponent;