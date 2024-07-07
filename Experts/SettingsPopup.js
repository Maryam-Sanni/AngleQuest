import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

function MyComponent() {
    const navigation = useNavigation();
    const goToAccountSettings = () => {
        navigation.navigate('Account Setup');
      };
    
      const goToResetPassword = () => {
        navigation.navigate('Password');
      };
    
      const goToNotificationSettings = () => {
        navigation.navigate('Notification Setup');
      };
    
      const goToBillingsAndPayment = () => {
        navigation.navigate('Earnings');
      };
      const [fontsLoaded]=useFonts({
        "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
            })
            const {t}=useTranslation()

      return (
<View style={styles.cardContainer}>
<View style={styles.cardContent}>
  <TouchableOpacity onPress={goToAccountSettings}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9b7a3a6d0178d9e4654db03454de5de060a67e4b91a6fe4d31a059874d384eb2?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5 }} />
      <Text style={{ fontSize: 12, color: 'black',fontFamily:"Roboto-Light" }}>{t("Account Settings")}</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={goToResetPassword}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d2d638a18c02206d9cb09092e754e29b9e7fcec759c21615164f9508890194ba?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
      <Text style={{ fontSize: 12, color: 'black', marginTop: 15,fontFamily:"Roboto-Light" }}>{t("Password")}</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={goToNotificationSettings}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/17d8150403f80380e2928ef1b9db06fb8c60a50c487a2172f5699a0eb5f88b6d?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
      <Text style={{ fontSize: 12, color: 'black', marginTop: 15, fontWeight: '500',fontFamily:"Roboto-Light" }}>{t("Notification Settings")}</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={goToBillingsAndPayment}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d71eb11f8b49b8dc89ac885de39244967a9d43ca35a783ff2b5c8a9c872d336c?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
      <Text style={{ fontSize: 12, color: 'black', marginTop: 15,fontFamily:"Roboto-Light" }}>{t("Payment")}</Text>
    </View>
  </TouchableOpacity>
</View>
</View>
);
}

export default MyComponent;

const styles = StyleSheet.create({
cardContainer: {
width: '16%',
height: 180,
borderRadius: 10,
marginTop: 30,
marginLeft: 10,
marginRight: 10,
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
},
cardContent: {
backgroundColor: 'white',
padding: 16,
borderRadius: 20,
marginBottom: 5,
},
});
