import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView, ActivityIndicator
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Top from "../components/HomeTop";
import MainButtons from "../LandingPage/MainButton";
import Row from "../components/Row";
import Title from "../components/Title";
import google from "../assets/google.png";
import loginImg from "../assets/loginImg.png";
import InputField from "../components/InputField";
import PeopleComponent from "../components/PeopleComponent";
import Footer from "../components/Footer";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const navigation = useNavigation(); // Navigation object

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSignUp = () => {
    navigation.dispatch(CommonActions.navigate("Sign Up2"));
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

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user_id', id.toString());
        await AsyncStorage.setItem('first_name', first_name);
        await AsyncStorage.setItem('last_name', last_name);

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
    <View style={{ flex: 1 }}>
      <Top value={3} intensity={100} tint={"light"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.container}>
          {/**professional AngleQuest */}
          <View
            style={{
              marginVertical: 40,
              width: "100%",
              paddingHorizontal: 100,
              position: "relative",
              alignItems: "center",
            }}
          >
            <View style={{ width: 1400, alignItems: "center" }}>
              <Row
                style={{
                  width: "100%",
                  //    backgroundColor: "#fff",
                  // paddingVertical: 60,
                  paddingHorizontal: 140,
                  gap: 50,
                }}
              >
                <View>
                  <Image
                    source={loginImg}
                    style={{ width: 620, height: 620 }}
                  />
                </View>
                <View
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,
                    padding: 40,
                    elevation: 9,
                    backgroundColor: "#fff",
                  }}
                >
                  <MainButtons
                    outlined
                    paddingVertical={5}
                    borderRadius={8}
                    width={"100%"}
                    title={"Log In with Google"}
                    textColor={"black"}
                    leftImg={google}
                  />

                  <Row style={{ marginTop: 40, width: "100%", gap: 5 }}>
                    <View
                      style={{
                        width: "47%",
                        height: 1,
                        backgroundColor: "black",
                      }}
                    />
                    <Title title={"or"} />
                    <View
                      style={{
                        width: "47%",
                        height: 1,
                        backgroundColor: "black",
                      }}
                    />
                  </Row>
                  <View style={{ marginTop: 40, gap: 16 }}>
                    <Title
                      center
                      title={"Login using email address"}
                      textSize={18}
                    />
                    <View style={{ marginTop: 10, gap: 20 }}>
                      <InputField
                        keyboardType="email"
                        val={email}
                        onChangeText={setEmail}
                        placeholder="Username"
                      />

                      <InputField
                        keyboardType="text"
                        val={password}
                        placeholder="Password"
                        onChangeText={setPassword}
                      />

                      <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          fontFamily: "Poppins-Regular",
                          color: "blue",
                          textAlign: "right",
                        }}
                      >
                        Forget Password
                      </Text>
                      </TouchableOpacity>
                    
                      <TouchableOpacity onPress={handleSignIn} disabled={loading}>
                        {loading ? (
                          <ActivityIndicator color="green" />
                        ) : (
                      <MainButtons
                        style={{ alignSelf: "center", width: "100%" }}
                        gradient
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
                          fontFamily: "Poppins-Bold",
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

          <View style={{ position: "relative", width: "100%" }}>
            <View
              style={{
                width: "100%",
                height: 155,
              }}
            />
            <PeopleComponent />
            <Footer />
          </View>
        </View>
      </ScrollView>
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
    // width: 1400,
    //alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
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
    fontFamily: "Poppins-Regular",
    marginVertical: 40,
    textAlign: "center",
  },
});

export default SignIn;
