import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useFonts } from "expo-font"

const ProgressBar = () => {
  return null; // Progress bar removed
};

const SixBoxesInput = () => {
  const [inputs, setInputs] = React.useState(['', '', '', '', '', '']);

  return (
    <View style={styles.verifycontainer}>
      {inputs.map((value, index) => (
        <TextInput
          key={index}
          style={styles.box}
          value={value}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={(text) => {
            const newInputs = [...inputs];
            newInputs[index] = text;
            setInputs(newInputs);
          }}
        />
      ))}
    </View>
  );
};

const VerificationContent = ({ userEmail }) => {
  const navigation = useNavigation();

  const handleVerify = () => {
    // Perform verification logic here
    // Navigate to page
    navigation.navigate('Signin');
  };

  const handleChangeEmail = () => {
    navigation.navigate('SignUp'); // Navigate to sign-up page
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  })
  return (
    <View style={styles.verificationContent}>
      <Image
        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1df78110c7d4fdfb4f6b7d4088e1c94a707bf505e4c12deaff442397fc5c68f5?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to AngleQuest 👋</Text>
      <Text style={styles.text}>A verification mail has been sent to <Text style={styles.email}>{userEmail}</Text> </Text>
      <Text style={styles.text}>Before we dive into all the amazing things you'll accomplish with us, please confirm your email address.</Text>
      <Text style={styles.text}>It's quick and easy, you should get a mail in 3 minutes.</Text>
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify your email</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleChangeEmail}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: 'coral', marginBottom: 10, fontFamily: "Roboto-Light" }}>Resend code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChangeEmail}>
          <Text style={{ fontSize: 13, marginLeft: 50, color: 'coral', fontWeight: '600', fontFamily: "Roboto-Light" }}>Change email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SignUpPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userEmail } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.whiteBox}>
        <ProgressBar />
        <VerificationContent userEmail={userEmail} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  whiteBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verificationContent: {
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -10,
    marginBottom: 20,
    fontFamily: "Roboto-Light"
  },
  text: {
    width: 500,
    marginVertical: 5,
    fontSize: 12,
    fontFamily: "Roboto-Light",
    marginLeft: 50,
    marginRight: 50
  },
  email: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "Roboto-Light"
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'coral',
    padding: 12,
    width: 290,
    marginTop: 30,
    borderRadius: 3,
  },
  verifycontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginVertical: 20,
  },
  box: {
    width: 45,
    height: 45,
    borderWidth: 1,
    paddingHorizontal: 5,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
});

export default SignUpPage;
