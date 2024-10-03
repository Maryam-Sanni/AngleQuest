import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const WincAcademyFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <View style ={{flexDirection: 'column', width: '50%', marginLeft: '5%'}}>
      <Text style={styles.heading}>AngleQuest AI</Text>
      <Text style={styles.description}>
        Upload your CV and let our AI guide you to your next career milestone. By analyzing your experience, skills, and goals, our AI recommends personalized career paths, helping you identify the best opportunities for growth and advancement.
      </Text>
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            colors={['#135837', '#29BE77']} // Gradient colors (green shades)
            style={styles.gradient}
          >
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.buttonText}>Sign Up Now</Text>
            <Image
              source={{ uri: 'https://img.icons8.com/?size=100&id=85463&format=png&color=FFFFFF' }}
              style={{ width: 18, height: 18, marginLeft: 10, marginTop: 3 }}
            />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/AI.jpg')}
        style={styles.imageBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 50,
     width: "100%",
    backgroundColor: '#003B24',
    alignItems: 'center', 
    flexDirection: 'row',
    height: 600,
  },
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'flex-start', 
    color: 'white',
    width: 600,
  },
  description: {
    fontSize: 20,
    textAlign: 'flex-start', // Center the description text
    color: 'white',
    marginBottom: 50, // Spacing between description and button
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
    width: 600,
       height: 600,
      position: 'absolute',
       right: 0,
       marginLeft: 50,
       marginTop: -50,
      marginBottom: -50
      },
});

export default WincAcademyFooter;
