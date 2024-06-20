import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useFonts} from "expo-font"

const Button = ({ icon, text }) => (
  <View style={styles.buttonContainer}>
    <Image source={{ uri: icon }} style={styles.buttonIcon} />
    <Text>{text}</Text>
  </View>
);

const MyComponent = () => {
  const navigation = useNavigation(); // Hook to access navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      // Send request to the server for authentication
      // Handle response from the server

      // Navigate to the Home page after successful sign-in
      navigation.navigate('Home - Manager'); // Assuming 'Home' is the name of your Home screen
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [fontsLoaded]=useFonts({
    'Varta-Light':require("../assets/fonts/Varta-Light.ttf"),
    "Varta-Bold":"../assets/fonts/Varta-Bold.ttf",
    "Varta-Medium":"../assets/fonts/Varta-Medium.ttf",
    "Varta-Regular":"./assets/fonts/Varta-Regular.ttf",
    "Varta-SemiBold":"./assets/fonts/Varta-SemiBold.ttf"


  })

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>
            Sign in to your account
          </Text>
          <Button icon="https://cdn.builder.io/api/v1/image/assets/TEMP/9b121841ef69a10b1af6ac5e748b328c728e89a39c6315e2c11281511ec4c518?apiKey=7b9918e68d9b487793009b3aea5b1a32&" text="Continue with Google" />
          <Button icon="https://cdn.builder.io/api/v1/image/assets/TEMP/44c39c6507947c98c1b395fecfccacfdba1edd07847eab25a4f629858fa22afa?apiKey=7b9918e68d9b487793009b3aea5b1a32&" text="Continue with LinkedIn" />
          <Button icon="https://cdn.builder.io/api/v1/image/assets/TEMP/9ecd922eae17c3c396c1cf547b89d2fe741644963272e5f9bc212ada28b8aff6?apiKey=7b9918e68d9b487793009b3aea5b1a32&" text="Continue with email" />
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Forgot Password')}
          >
            <Text style={{fontSize: 12, marginTop: 8, color: 'coral',fontFamily:"Varta-Light" }}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
          >
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Sign Up')}
          >
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={styles.signUpLink}>Join here</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/jobseeker.png')} style={styles.image} resizeMode="cover" />
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 400,
  },
  formContainer: {
    padding: 40,
    borderRadius: 0,
    backgroundColor: '#ffffff',
    height: 550,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily:"Varta-Light"

  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 16,
    fontSize: 12,
    color: 'black',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C8C8C8',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#C8C8C8',
  },
  dividerText: {
    marginHorizontal: 15,
  },
  input: {
    padding: 10,
    marginTop: 20,
    fontSize: 12,
    borderColor: '#C8C8C8',
    borderWidth: 1,
    borderRadius: 8,
    color: '#646464',
    fontFamily:"Varta-Light"
  },
  signInButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 24,
    backgroundColor: '#FF7F50',
    borderRadius: 5,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily:"Varta-Light"
  },
  signUpText: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
    fontFamily:"Varta-Light"
  },
  signUpLink: {
    color: '#B2BEB5',
    textDecorationLine: 'underline',
    fontFamily:"Varta-Light"
  },
  image: {
    width: 350,
    height: 550,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default MyComponent;
