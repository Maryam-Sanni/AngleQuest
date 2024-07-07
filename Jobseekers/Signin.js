import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Config from 'react-native-config';

const API_URL = Config.REACT_APP_API_URL;

const Button = ({ icon, text }) => (
  <View style={styles.buttonContainer}>
    <Image source={{ uri: icon }} style={styles.buttonIcon} />
    <Text>{text}</Text>
  </View>
);

const MyComponent = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please fill in both email and password');
      return;
    }

    try {
      const response = await axios.post(`https://recruitangle.com/api/expert/signin`, {
        email,
        password,
      });
      console.log('Sign In Response:', response.data);

      if (response.data.success) {
        navigation.navigate('Home - Manager');
      } else {
        alert(response.data.message || 'Sign in failed');
      }
    } catch (error) {
      console.error('Sign In Error:', error);
      alert('An error occurred during sign in. Please check the console for more details.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>
            Sign in to your account
          </Text>
          <Button icon="https://cdn.builder.io/api/v1/image/assets/TEMP/9b121841ef69a10b1af6ac5e748b328c728e89a39c6315e2c11281511ec4c518?apiKey=7b9918e68d9b487793009b3aea5b1a32&" text="Continue with Google" />
          <Button icon="https://cdn.builder.io/api/v1/image/assets/TEMP/44c39c6507947c98c1b395fecfccacfdba1edd07847eab25a4f629858fa22afa?apiKey=7b9918e68d9b487793009b3aea5b1a32&" text="Continue with LinkedIn" />
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
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
            <Text style={{ fontSize: 12, marginTop: 8, color: 'coral' }}>Forgot Password?</Text>
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
    fontSize: 14,
    borderColor: '#C8C8C8',
    borderWidth: 1,
    borderRadius: 8,
    color: '#646464',
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
  },
  signUpText: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    marginTop: 30,
  },
  signUpLink: {
    color: '#B2BEB5',
    textDecorationLine: 'underline',
  },
  image: {
    width: 350,
    height: 550,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default MyComponent;
