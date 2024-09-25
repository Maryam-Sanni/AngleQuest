import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView, ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigate } from 'react-router-dom';
import Top from "../components/HomeTop";
import MainButtons from "../LandingPage/MainButton";
import Row from "../components/Row";
import Title from "../components/Title";
import google from "../assets/google.png";
import linkedIn from "../assets/linkedin.png";
import option1 from "../assets/option1.png";
import option2 from "../assets/option2.png";
import option3 from "../assets/option3.png";
import InputField from "../components/InputField";
import PeopleComponent from "../components/PeopleComponent";
import Footer from "../components/Footer";
import axios from "axios";
import { CheckBox } from "react-native";

const SignUp = () => {
   const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);
   const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [signUpOption, setSignUpOption] = useState(0);
  const handleSignIn = () => {
    navigate("/sign-in"); // Navigate to the Sign In page
  };

  const handleGoBack = () => {
    if (signUpOption > 0) {
      setSignUpOption(0);
      // If you want to navigate to the Sign In page again

    } else {
      navigate(-1); // Go back to the previous page
    }
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!isChecked) {
      alert("Please agree to the Terms of Service & Privacy Policy");
      return;
    }

    const role = "individual";

    try {
      setLoading(true); // Set loading to true when sign in is initiated

      const response = await axios.post(
        `${apiUrl}/api/expert/signup`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          role,
        },
      );

      console.log("Signup success:", response.data);
      navigation.navigate("Verify mail", { userEmail: email }); // Navigate and pass email as parameter
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };


  const handleSignUp2 = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    if (!isChecked) {
      alert('Please agree to the Terms of Service & Privacy Policy');
      return;
    }

    const role = 'expert';

    try {
      setLoading(true); // Set loading to true when sign in is initiated

      const response = await axios.post(`${apiUrl}/api/expert/signup`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role,
      });

      console.log('Signup success:', response.data);
      navigation.navigate('Verify mail', { userEmail: email }); // Navigate and pass email as parameter
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      <Top value={3} intensity={100} tint={"light"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 100,
              position: "relative",
              alignItems: "center",
            }}
          >
            <View style={{ width: 1400, alignItems: "center" }}>
              {signUpOption === 0 ? (
                <View style={styles.option1}>
                  <TouchableOpacity
                    style={styles.goBack}
                    onPress={handleGoBack}
                  >
                    <Image
                      source={{ uri: 'https://img.icons8.com/?size=100&id=85304&format=png&color=000000' }}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text style= {{fontSize: 20, fontWeight: '600', color: 'black', marginLeft: -10}}> Back </Text>
                  </TouchableOpacity>
                  <View style={styles.optionContainer}>
                    <Title title={"Sign up to join AngleQuest"} textSize={20} />
                    <MainButtons
                      outlined
                      borderRadius={8}
                      width={"100%"}
                      height={40}
                      padding={10}
                      title={"Join as an Individual"}
                      textColor={"#135837"}
                      onPress={() => setSignUpOption(1)}
                    />
                    <MainButtons
                      outlined
                      borderRadius={8}
                      width={"100%"}
                      title={"Join as an Expert"}
                      textColor={"#135837"}
                      onPress={() => setSignUpOption(2)}
                    />
                    <MainButtons
                      outlined
                      borderRadius={8}
                      width={"100%"}
                      title={"Join as a Business"}
                      textColor={"#135837"}
                      onPress={() => setSignUpOption(3)}
                    />
                    <Text style={styles.signUpText} onPress={handleSignIn}>
                      Already have an account?
                      <Text
                        style={{
                          fontWeight: "700",
                        }}
                      >
                        {" "}
                        Log in
                      </Text>
                    </Text>
                  </View>
                </View>
              ) : signUpOption === 1 ? (
                <Row
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    paddingVertical: 60,
                    paddingHorizontal: 140,
                    gap: 50,
                  }}
                >
                  <View>
                    <Image
                      source={option1}
                      style={{ width: 620, height: 916 }}
                    />
                  </View>
                    <View
                      style={{
                          shadowColor: 'rgba(85, 107, 47, 0.5)', 
                          shadowOffset: {
                            width: 0, 
                            height: 15, 
                          },
                          shadowOpacity: 0.7, 
                          shadowRadius: 20, 
                          padding: 40,
                          elevation: 10,
                          backgroundColor: "#fff", 
                          borderRadius: 10, 
                        }}
                      >
                    <TouchableOpacity
                      style={[styles.goBack, { marginBottom: 30 }]}
                      onPress={handleGoBack}
                    >
                      <Image
                        source={{ uri: 'https://img.icons8.com/?size=100&id=85304&format=png&color=000000' }}
                        style={{ width: 30, height: 30 }}
                      />
                      <Text style= {{fontSize: 20, fontWeight: '600', color: 'black', marginLeft: -10}}> Back </Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 20, gap: 20 }}>
                      <Title title={"Sign up as an Individual"} textSize={18} />

                      <MainButtons
                        outlined
                        paddingVertical={5}
                        borderRadius={8}
                        width={"100%"}
                        title={"Sign up using Google"}
                        textColor={"black"}
                        leftImg={google}
                      />
                      <MainButtons
                        outlined
                        paddingVertical={5}
                        borderRadius={8}
                        width={"100%"}
                        title={"Sign up using LinkedIn"}
                        textColor={"black"}
                        leftImg={linkedIn}
                      />
                    </View>

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

                    <View style={{ marginTop: 40, gap: 20 }}>
                      <InputField
                        keyboardType="name"
                        val={firstName}
                        onChangeText={setFName}
                        placeholder="First name"
                      />
                      <InputField
                        keyboardType="name"
                        val={lastName}
                        onChangeText={setLName}
                        placeholder="Last name"
                      />
                      <InputField
                        keyboardType="email"
                        val={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                      />

                      <InputField
                        keyboardType="text"
                        val={password}
                        placeholder="Password"
                        onChangeText={setPassword}
                      />
                      <TouchableOpacity   onPress={() => {
                          setAgree1(!agree1); 
                    toggleCheckbox();   
                        }} >
                        <Row style={{ gap: 10 }}>
                          {agree1 ? (
                            <MaterialIcons
                              name="check-box"
                              size={24}
                              color="black"
                            />
                          ) : (
                            <MaterialIcons
                              name="check-box-outline-blank"
                              size={24}
                              color="black"
                            />
                          )}
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "400",
                              fontFamily: "Poppins-Regular",
                            }}
                          >
                            I agree to the Terms of Service & Privacy Policy
                          </Text>
                        </Row>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleSignUp}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator color="green" />
                        ) : (
                      <MainButtons 
                        style={{ alignSelf: "center", width: "100%" }}
                        gradient
                        borderRadius={5}
                        width={420}
                        textColor={"white"}
                        title={"Sign Up"}
                      />
                          )}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.signUpText} onPress={handleSignIn}>
                      Already have an Account?{" "}
                      <Text
                        style={{
                          fontWeight: "700",
                        }}
                      >
                        Sign in
                      </Text>
                    </Text>
                  </View>
                </Row>
              ) : signUpOption === 2 ? (
                <Row
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    paddingVertical: 60,
                    paddingHorizontal: 140,
                    gap: 50,
                  }}
                >
                  <View>
                    <Image
                      source={option2}
                      style={{ width: 620, height: 916 }}
                    />
                  </View>
                    <View
                      style={{
                          shadowColor: 'rgba(85, 107, 47, 0.5)', 
                          shadowOffset: {
                            width: 0, 
                            height: 15, 
                          },
                          shadowOpacity: 0.7, 
                          shadowRadius: 20, 
                          padding: 40,
                          elevation: 10,
                          backgroundColor: "#fff", 
                          borderRadius: 10, 
                        }}
                      >
                    <TouchableOpacity
                      style={[styles.goBack, { marginBottom: 30 }]}
                      onPress={handleGoBack}
                    >
                      <Image
                        source={{ uri: 'https://img.icons8.com/?size=100&id=85304&format=png&color=000000' }}
                        style={{ width: 30, height: 30 }}
                      />
                      <Text style= {{fontSize: 20, fontWeight: '600', color: 'black', marginLeft: -10}}> Back </Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 20, gap: 20 }}>
                      <Title title={"Sign up as an Expert"} textSize={18} />

                      <MainButtons
                        outlined
                        paddingVertical={5}
                        borderRadius={8}
                        width={"100%"}
                        title={"Sign up using Google"}
                        textColor={"black"}
                        leftImg={google}
                      />
                      <MainButtons
                        outlined
                        paddingVertical={5}
                        borderRadius={8}
                        width={"100%"}
                        title={"Sign up using LinkedIn"}
                        textColor={"black"}
                        leftImg={linkedIn}
                      />
                    </View>

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

                    <View style={{ marginTop: 40, gap: 20 }}>
                      <InputField
                        keyboardType="name"
                        val={firstName}
                        onChangeText={setFName}
                        placeholder="First name"
                      />
                      <InputField
                        keyboardType="name"
                        val={lastName}
                        onChangeText={setLName}
                        placeholder="Last name"
                      />
                      <InputField
                        keyboardType="email"
                        val={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                      />

                      <InputField
                        keyboardType="text"
                        val={password}
                        placeholder="Password"
                        onChangeText={setPassword}
                      />
                      <TouchableOpacity   onPress={() => {
                        setAgree1(!agree1); 
                      toggleCheckbox();   
                      }} >
                        <Row style={{ gap: 10 }}>
                          {agree1 ? (
                            <MaterialIcons
                              name="check-box"
                              size={24}
                              color="black"
                            />
                          ) : (
                            <MaterialIcons
                              name="check-box-outline-blank"
                              size={24}
                              color="black"
                            />
                          )}
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "400",
                            }}
                          >
                            I agree to the Terms of Service & Privacy Policy
                          </Text>
                        </Row>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handleSignUp2}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator color="green" />
                        ) : (
                      <MainButtons 
                        style={{ alignSelf: "center", width: "100%" }}
                        gradient
                        borderRadius={5}
                        width={420}
                        textColor={"white"}
                        title={"Sign Up"}
                      />
                          )}
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.signUpText} onPress={handleSignIn}>
                      Already have an Account?{" "}
                      <Text
                        style={{
                          fontWeight: "700",
                        }}
                      >
                        Sign in
                      </Text>
                    </Text>
                  </View>
                </Row>
              ) : (
                <Row
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    paddingVertical: 60,
                    paddingHorizontal: 140,
                    gap: 50,
                  }}
                >
                  <View>
                    <Image
                      source={option3}
                      style={{ width: 620, height: 916 }}
                    />
                  </View>
                    <View
                      style={{
                          shadowColor: 'rgba(85, 107, 47, 0.5)', 
                          shadowOffset: {
                            width: 0, 
                            height: 15, 
                          },
                          shadowOpacity: 0.7, 
                          shadowRadius: 20, 
                          padding: 40,
                          elevation: 10,
                          backgroundColor: "#fff", 
                          borderRadius: 10, 
                        }}
                      >
                    <TouchableOpacity
                      style={[styles.goBack, { marginBottom: 30 }]}
                      onPress={handleGoBack}
                    >
                      <Image
                        source={{ uri: 'https://img.icons8.com/?size=100&id=85304&format=png&color=000000' }}
                        style={{ width: 30, height: 30 }}
                      />
                      <Text style= {{fontSize: 20, fontWeight: '600', color: 'black', marginLeft: -10}}> Back </Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: 20, gap: 20 }}>
                      <Title title={"Sign up as a Business"} textSize={18} />

                      <MainButtons
                        outlined
                        paddingVertical={5}
                        borderRadius={8}
                        width={"100%"}
                        title={"Sign up using Google"}
                        textColor={"black"}
                        leftImg={google}
                      />
                      <MainButtons
                        outlined
                        paddingVertical={5}
                        borderRadius={8}
                        width={"100%"}
                        title={"Sign up using LinkedIn"}
                        textColor={"black"}
                        leftImg={linkedIn}
                      />
                    </View>

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

                    <View style={{ marginTop: 40, gap: 20 }}>
                      <InputField
                        keyboardType="name"
                        val={firstName}
                        onChangeText={setFName}
                        placeholder="Business name"
                      />
                      <InputField
                        keyboardType="name"
                        val={lastName}
                        onChangeText={setLName}
                        placeholder="Administrator's name"
                      />
                      <InputField
                        keyboardType="email"
                        val={email}
                        onChangeText={setEmail}
                        placeholder="Business email"
                      />

                      <InputField
                        keyboardType="text"
                        val={password}
                        placeholder="Password"
                        onChangeText={setPassword}
                      />
                      <TouchableOpacity onPress={() => setAgree1(!agree1)}>
                        <Row style={{ gap: 10 }}>
                          {agree1 ? (
                            <MaterialIcons
                              name="check-box"
                              size={24}
                              color="black"
                            />
                          ) : (
                            <MaterialIcons
                              name="check-box-outline-blank"
                              size={24}
                              color="black"
                            />
                          )}
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "400",
                            }}
                          >
                            I agree to the Terms of Service & Privacy Policy
                          </Text>
                        </Row>
                      </TouchableOpacity>
                      <MainButtons
                        style={{ alignSelf: "center", width: "100%" }}
                        gradient
                        borderRadius={5}
                        width={420}
                        textColor={"white"}
                        title={"Sign Up"}
                      />
                    </View>
                    <Text style={styles.signUpText} onPress={handleSignIn}>
                      Already have an Account?{" "}
                      <Text
                        style={{
                          fontWeight: "700",
                        }}
                      >
                        Sign in
                      </Text>
                    </Text>
                  </View>
                </Row>
              )}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
  option1: {
    marginTop: 80,
    width: "80%",
    backgroundColor: "#fff",
    paddingVertical: 60,
    gap: 50,
    shadowColor: 'rgba(85, 107, 47, 0.5)', 
    shadowOffset: {
      width: 0, 
      height: 15, 
    },
    shadowOpacity: 0.7, 
    shadowRadius: 20, 
    padding: 40,
    elevation: 10,
    alignItems: "center",
    position: "relative",
    borderRadius: 10,
  },
  goBack: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 10,
  },
  optionContainer: {
    marginTop: 20,
    gap: 16,
    width: 486,
  },
});

export default SignUp;
