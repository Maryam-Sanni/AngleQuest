import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native';
import axios from 'axios';
import LinkedInModal from '@gcou/react-native-linkedin';

// SignUpButton component
const SignUpButton = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
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
  const [linkedInModalVisible, setLinkedInModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const role = "Individual"; // Static role for signup

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!isChecked) {
      Alert.alert('Error', 'Please agree to the Terms of Service & Privacy Policy');
      return;
    }

    try {
      setLoading(true); // Set loading to true when sign up is initiated
      
      const response = await axios.post(`https://recruitangle.com/api/signup`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role: role, // Include the role in the request body
      });

      console.log('Signup success:', response.data);
      navigation.navigate('Verify Email', { userEmail: email }); // Navigate and pass email as parameter
    } catch (error) {
      console.error('Signup failed:', error);
      Alert.alert('Error', 'Signup failed. Please try again.');
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const navigateToTerms = () => {
    navigation.navigate('TermsofService');
  };

  const handleSignInPress = () => {
    navigation.navigate('Signin');
  };

  const handleLinkedInSuccess = async (data) => {
    console.log('LinkedIn data:', data);
    // Here you would send the received data to your backend to complete the sign-up process
    // For example:
    // await axios.post('https://your-backend.com/linkedin-signup', { accessToken: data.access_token });
    // Navigate to the next screen
    navigation.navigate('Verify mail', { userInfo: data });
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create a new account</Text>
            <SignUpButton
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/9b121841ef69a10b1af6ac5e748b328c728e89a39c6315e2c11281511ec4c518?apiKey=7b9918e68d9b487793009b3aea5b1a32&"
              text="Sign up with Google"
              onPress={() => Alert.alert('Google sign-up not implemented yet')}
            />
            <SignUpButton 
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/44c39c6507947c98c1b395fecfccacfdba1edd07847eab25a4f629858fa22afa?apiKey=7b9918e68d9b487793009b3aea5b1a32&"
              text="Sign up with LinkedIn"
              onPress={() => setLinkedInModalVisible(true)}
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
                <Text style={{ color: 'black', fontSize: 14 }}>
                  I agree to the Terms of Service & Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSignUp} disabled={loading}>
            {loading ? (
                <ActivityIndicator color="white" />
              ) : (
              <Text style={styles.submitButtonText}>Sign up</Text>
            )}
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
    marginTop: 10,
    color: 'gray',
  },
  loader: {
    marginTop: 20,
  },
});

export default MyComponent;
