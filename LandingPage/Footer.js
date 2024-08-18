import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, TouchableOpacity } from 'react-native';

const Footer = () => {
  return (
    <ImageBackground
      source={require('../assets/footer.png')}
      style={styles.imageBackground}
    >
      <View style={styles.footerContainer}>
        <Text style={styles.heading}>Backing Professionals to Succeed</Text>
        <Text style={styles.subheading}>Built to transform your team’s performance. Unlimited Growth.</Text>
        <TouchableOpacity style={styles.button} onPress={() => alert('Button Pressed')}>
          <Text style={styles.buttonText}>Click Me</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 500,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center',     // Center content horizontally
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 30,
    marginTop: 220,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Footer;
