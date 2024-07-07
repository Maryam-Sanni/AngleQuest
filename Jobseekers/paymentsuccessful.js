import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';


const PaymentSuccessful = ({ imageSrc, altText }) => {
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/dd026d3725b6e9ec09e0b599e114c5fb55e59aaa4b25030829b6d46dfdb80e4d?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={styles.logo} />
        </View>
        <Text style={styles.title}>{t("Payment Successful")}</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageSrc }} style={styles.image} />
        </View>
        <Text style={styles.text}>{altText}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{t("DONE")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f8faf8',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 30,
    width: 30,
    borderRadius: 31,
    marginBottom: 20,
  },
  logo: {
    width: '35%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
    fontFamily:"Roboto-Light"
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    aspectRatio: 1,
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
    maxWidth: 250,
    marginBottom: 20,
    fontFamily:"Roboto-Light",
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FF7F50',
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15, 
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
fontFamily:"Roboto-Light"
  },
});

function MyComponent() {
  return (
    <PaymentSuccessful
      imageSrc="https://cdn.builder.io/api/v1/image/assets%2F7b9918e68d9b487793009b3aea5b1a32%2F6df70668bda64877a6a692d0d36a3a1f"
      altText="Your payment for an interview session has been successfully completed"
    />
  );
}

export default MyComponent;
