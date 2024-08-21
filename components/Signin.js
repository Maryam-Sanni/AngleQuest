import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [first_name, setFirstName] = useState(''); // State for first name
  const [last_name, setLastName] = useState(''); // State for last name

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please fill in both email and password');
      return;
    }
 
    try {
      setLoading(true); // Set loading to true when sign in is initiated

      const response = await axios.post('https://recruitangle.com/api/expert/signin', {
        email,
        password,
      });

      console.log('Sign In Response:', response.data);

        if (response.data.status === 'success') {
          const { token, user } = response.data;
          const { id, first_name, last_name, role } = user;

          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('user_id', id.toString()); 
          await AsyncStorage.setItem('first_name', first_name);
          await AsyncStorage.setItem('last_name', last_name);

        // Navigate based on user role
        if (role === 'expert') {
          navigation.navigate('Home - Experts');
        } else if (role === 'individual') {
          navigation.navigate('Home');
        } else {
          alert('Unknown user role');
        }
      } else {
        alert(response.data.message || 'Sign in failed');
      }
    } catch (error) {
      console.error('Sign In Error:', error);
      alert('Sign in failed, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign in to your account</Text>
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
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
              <Text style={{ fontSize: 12, marginTop: 8, color: 'coral' }}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.signInButtonText}>Sign in</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Join Recruitangle')}>
              <Text style={styles.signUpText}>
                Don't have an account? <Text style={styles.signUpLink}>Join here</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../assets/jobseeker.png')} style={styles.image} resizeMode="cover" />
        </View>
      </View>
    </View>
  );
};

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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    height: 580,
    width: 350,
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
    color: 'black',
    marginTop: 20,
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
    resizeMode: 'contain',
    width: 350,
    height: 580,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});

export default MyComponent;
