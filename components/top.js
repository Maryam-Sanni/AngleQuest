import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleXPress = () => {
navigate('/welcome'); // Navigate to 'JoinAs' page
  };

  return ( 
    <View style={{backgroundColor: '#F8F8F8', }}>
            <TouchableOpacity style={styles.header} onPress={() => navigate('/welcome')}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} 
            style={styles.logo}
          />
          <Text style={styles.headerText}>AngleQuest</Text>
       
        </TouchableOpacity>
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
  marginRight: 5,
  marginLeft: 50,
},
headerText: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#206C00'
},
joinButton: {
  backgroundColor: 'white',
  borderWidth: 1,
  borderColor: 'coral',
 padding: 10,
  position: 'absolute',
  right: 20
},
joinButtonText: {
  color: 'coral',
  fontWeight: 'bold',
},
});

export default MyComponent;