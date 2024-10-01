import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const WincAcademyFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <Image
        source={require('../assets/Unlock.jpg')}
        style={styles.imageBack}
      />
      <View style ={{flexDirection: 'column', width: '50%', marginLeft: '5%'}}>
      <Text style={styles.heading}>Take the next step towards personal and professional goals with anglequest</Text>
      <Text style={styles.description}>
        Begin your journey with anglequest today!
      </Text>
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            colors={['#135837', '#29BE77']} // Gradient colors (green shades)
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Sign Up Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 50,
     width: "100%",
    backgroundColor: '#f9f9f9',
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    height: 600,
  },
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'flex-start', 
    color: 'black',
    width: 400,
  },
  description: {
    fontSize: 20,
    textAlign: 'flex-start', // Center the description text
    color: 'black',
    marginBottom: 20, // Spacing between description and button
    width: 600,
  },
  button: {
    width: 200, // Set button width
  },
  gradient: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // Center the button text
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  imageBack: {
  width: 400,
     height: 400,
     marginRight: 50,
    marginLeft: 100
    },
});

export default WincAcademyFooter;
