import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useFonts } from "expo-font";

const MyComponent = () => {
  const navigation = useNavigation();

  const handleXPress = () => {
    navigation.navigate('Join Recruitangle'); // Navigate to 'JoinAs' page
  };
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })

  return ( 
    <View style={{ flexDirection: "row", marginTop: -50, justifyContent: "space-between", padding: 10, paddingRight: 40, alignItems: "center", backgroundColor: "white", maxWidth: '100%' }}>
       <Image
       source={require('../assets/34.png')}
        style={{ width: 200, height: 200 }}
      />
      <TouchableOpacity onPress={handleXPress}>
        <Text style={{ fontSize: 18, marginRight: -50, color: 'grey',fontFamily:"Roboto-Light" }}>✕</Text> {/* Unicode representation of 'X' character */}
      </TouchableOpacity>
    <View style={{backgroundColor: '#F8F8F8', }}>
            <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} 
            style={styles.logo}
          />
          <Text style={styles.headerText}>AngleQuest</Text>
       
        <TouchableOpacity onPress={handleXPress} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
closeButton: {
  position: 'absolute',
  top: 20,
  right: 20,
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  backgroundColor: 'white',
},
logo: {
  width: 40,
  height: 40,
  marginRight: 5
},
headerText: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#206C00'
}
});

export default MyComponent;