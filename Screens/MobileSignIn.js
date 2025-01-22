import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView, ActivityIndicator, TextInput
} from "react-native";
import Top from "../MobileLanding.js/HomeTop";
import Top2 from "../components/TopExtra";
import MainButtons from "../LandingPage/MainButton";
import Row from "../components/Row";
import Title from "../components/Title";
import google from "../assets/google.png";
import loginImg from "../assets/LogIn.jpg";
import InputField from "../components/InputField";
import PeopleComponent from "../components/PeopleComponent";
import Footer from "../MobileLanding.js/Footer";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
   const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const maskedPassword = passwordVisible ? password : '*'.repeat(password.length);
  const [topPosition, setTopPosition] = useState(20); 

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    console.log("Scroll Position Y:", scrollY); 

    if (scrollY > 0) { 
      setTopPosition(-30); 
    } else {
      setTopPosition(20); 
    }
  };

  const handleSignUp = () => {
 navigate("/sign-up");
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please fill in both email and password');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${apiUrl}/api/expert/signin`, {
        email,
        password,
      });

      console.log('Sign In Response:', response.data);

      if (response.data.status === 'success') {
        const { token, user } = response.data;
        const { id, first_name, last_name, role } = user;

        const currentTime = Date.now();
        const expiryTime = currentTime + 6 * 60 * 60 * 1000; // 6 hours in milliseconds

        // Store user details, token, and expiry time
        await AsyncStorage.multiSet([
          ['token', token],
          ['user_id', id.toString()],
          ['first_name', first_name],
          ['last_name', last_name],
          ['email', email],
          ['expiry_time', expiryTime.toString()],
        ]);

        // Check if the balance was already sent
        const balanceSent = await AsyncStorage.getItem('balanceSent');
        if (!balanceSent) {
          try {
            // Retrieve the token from AsyncStorage
            const authToken = await AsyncStorage.getItem('token');

            // Post the balance data if it hasn't been sent before
            const balanceResponse = await axios.post(
              `${apiUrl}/api/expert/send-balance`,
              {
                total_balance: 0,
                withdrawal: '0',
                new_payment: 0,
                paid_by: 'Admin',
              },
              {
                headers: {
                  Authorization: `Bearer ${authToken}`, // Include token in Authorization header
                },
              }
            );

            console.log('Balance Post Response:', balanceResponse.data);

            // Store a flag to indicate the balance was sent
            await AsyncStorage.setItem('balanceSent', 'true');
          } catch (balanceError) {
            console.error('Error sending balance:', balanceError);
          }
        }

        // Navigate based on user role (regardless of whether balance was successfully sent)
        if (role === 'expert') {
          navigate('/home-experts');
        } else if (role === 'individual') {
          navigate('/home-individuals');
          } else if (role === 'business') {
            navigate('/business-home');
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
        <View style={{  }}>
          <View style={{ position: 'absolute', top: topPosition, left: 0, right: 0, zIndex: 100 }}>
            <Top value={3} intensity={100} />
          </View>
        <View style={styles.container}>
          {/**professional AngleQuest */}
          <View
            style={{
              marginVertical: 10,
              width: "100%",
              paddingHorizontal: 10,

              alignItems: "center",
            }}
          >
            <View style={{alignItems: "center" }}>
              <Row
                style={{
                  width: "100%",
                  paddingHorizontal: 10,
                  gap: 10,
                  marginTop: 50,
                }}
              >
               
                <View
                              style={{
                                shadowColor: 'rgba(85, 107, 47, 0.5)', 
                                shadowOffset: {
                                  width: 0, 
                                  height: 15, 
                                },
                                shadowOpacity: 0.7, 
                                shadowRadius: 20, 
                                padding: 20,
                                elevation: 10,
                                backgroundColor: "#fff", 
                                borderRadius: 10, 
                              }}
                            >



                  <View style={{ marginTop: 20, gap: 16 }}>
                    <Title
                      center
                      title={"Login using email address"}
                      textSize={20}
                    />
                    <View style={{ marginTop: 10, gap: 20 }}>
                      <InputField
                        keyboardType="email"
                        val={email}
                        onChangeText={setEmail}
                        placeholder="email"
                      />

                      <View style={{ position: 'relative' }}>
                        <TextInput
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry={!passwordVisible} 
                          placeholder="Password"
                          style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
                        />
                        <TouchableOpacity
                          style={styles.eyeIcon}
                          onPress={() => setPasswordVisible(!passwordVisible)}
                        >
                          <Image
                            source={{
                              uri: passwordVisible
                                ? 'https://img.icons8.com/?size=100&id=60022&format=png&color=000000' 
                                : 'https://img.icons8.com/?size=100&id=3PEmEecIkSOo&format=png&color=000000' 
                            }}
                            style={{width: 20, height: 20}}
                          />
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity onPress={() => navigate('/forgot-password')}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          color: "blue",
                          textAlign: "right",
                        }}
                      >
                        Forgot Password
                      </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={handleSignIn} disabled={loading}>
                        {loading ? (
                          <ActivityIndicator color="green" />
                        ) : (
                      <MainButtons
                        style={{ alignSelf: "center", width: "100%" }}
                        gradient
                        borderRadius={5}
                        width={420}
                        textColor={"white"}
                        title={"Log In"}
                      />
                  )}
                  </TouchableOpacity>
                    </View>
                    <Text style={styles.signUpText} onPress={handleSignUp}>
                      Need to create an account?{" "}
                      <Text
                        style={{
                          fontWeight: "700",
                        }}
                      >
                        Sign up
                      </Text>
                    </Text>
                  </View>
                </View>
              </Row>
            </View>
          </View>
          <View style={{ width: "100%" }}>
              <View
                style={{
                  width: "100%", marginTop: 120
                }}
              />
             
            </View>
          
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
    marginTop: 100
  },
  header: {
    fontSize: 16,
    marginTop: 70,
    marginBottom: 5,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "400",
    marginVertical: 40,
    textAlign: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    padding: 10, 
  },
});

export default SignIn;
