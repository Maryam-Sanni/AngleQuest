import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native';
import axios from 'axios';

// Environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

// SignUpButton component
const SignUpButton = ({ icon, text }) => (
  <TouchableOpacity style={styles.buttonContainer}>
    <Image source={{ uri: icon }} style={styles.buttonIcon} />
    <Text>{text}</Text>
  </TouchableOpacity>
);

// FormInput component
const FormInput = ({ placeholder, onChangeText }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      onChangeText={onChangeText}
    />
  </View>
);

// MyComponent
const MyComponent = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill all fields');
      return;
    }
  
    try {
      const response = await axios.post(`https://recruitangle.com/api/expert/signup`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password
      });
  
      console.log('Signup success:', response.data);
      navigation.navigate('Verify mail', { userEmail: email }); // Navigate and pass email as parameter
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  const navigateToTerms = () => {
    navigation.navigate('Terms of Service');
  };

  const handleSignInPress = () => {
    navigation.navigate('Sign in');
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create a new account</Text>
            <SignUpButton
              icon="https://example.com/google-icon.png"
              text="Sign up with Google"
            />
            <SignUpButton
              icon="https://example.com/linkedin-icon.png"
              text="Sign up with LinkedIn"
            />
            <View style={styles.divider}>
              <Text style={{ color: 'black', fontSize: 14 }}>or</Text>
            </View>
            <FormInput placeholder="First name" onChangeText={setFirstName} />
            <FormInput placeholder="Last name" onChangeText={setLastName} />
            <FormInput placeholder="Email" onChangeText={setEmail} />
            <FormInput placeholder="Password" onChangeText={setPassword} />
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isChecked}
                onValueChange={toggleCheckbox}
                style={styles.checkbox}
                tintColors={{ true: 'coral', false: '#ccc' }}
              />
              <TouchableOpacity onPress={navigateToTerms}>
                <Text style={{ color: 'black', fontSize: 14 }}>I agree to the Terms of Service & Privacy Policy</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
              <Text style={styles.submitButtonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignInPress}>
        <Text style={styles.signInText}>
          <Text style={styles.signInTextGray}>Already have an account?</Text> Log In
        </Text>
      </TouchableOpacity>
          </View>
          <Image source={require('../assets/createaccount.png')} style={styles.image} resizeMode="cover" />
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    height: 580,
    borderRadius: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  divider: {
    alignItems: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: 'coral',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    resizeMode: 'contain',
    width: 350,
    height: 580,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  signInText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  signInTextGray: {
    marginTop:10,
    color: 'gray',
  },
});

export default MyComponent;
