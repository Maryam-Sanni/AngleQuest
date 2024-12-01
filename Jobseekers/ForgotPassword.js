import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Top from '../components/top';
import { useFonts } from 'expo-font';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false); // To track if email has been sent
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  // Refs for input fields
  const emailRef = useRef();

  const handleResetPassword = async () => {
    try {
      await axios.post(`${apiUrl}/api/forgot-password`, {
        email,  // Only sending the email
      });

      // Save email to AsyncStorage
      await AsyncStorage.setItem('userEmail', email);
      
      setSuccess("Password reset link sent to your email. Please check your inbox.");
      setError(null);
      setEmailSent(true); // Set email sent status to true

      // Show alert on success
      Alert.alert(
        "Password Reset",
        "A password reset link has been sent to your email.",
        [{ text: "OK" }]
      );
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.email?.[0] || "An error occurred. Please try again.";
      setError(errorMessage);
      setSuccess(null);
      setEmailSent(false); // In case of error, reset the email sent status

      // Show alert with specific error message
      Alert.alert(
        "Error",
        errorMessage,
        [{ text: "OK" }]
      );
    }
  };

    const handleBack = () => {
   navigate("/sign-in");
    };
  
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <View style={{ flex: 1}}>
   
      <View style={styles.container}>
        <View style={{flexDirection: 'row',               marginBottom: 50}}>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} 
          style={{
              width: 50,
              height: 50,
            }}
          />
        <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 1, marginTop: 20, color: '#206c00'}}>AngleQuest</Text>
        </View>
         <View style={styles.contained}>
           <Image
             source={{
               uri: "https://img.icons8.com/?size=100&id=112162&format=png&color=000000",
             }}
             style={{
               width: 100,
               height: 100,
             }}
           />
           <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Forgot Password</Text>
        <Text style={styles.title}>Enter your email address and we'll send you a link to rest your password</Text>


        <View style={styles.inputContainer}>
          <TextInput
            ref={emailRef}
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={setEmail}
            value={email}
            editable={!emailSent} // Disable input if email is sent
          />
        </View>
           {success && <Text style={styles.successText}>{success}</Text>}
           {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity 
          style={[styles.button, emailSent && styles.buttonSuccess]} // Conditional styling
          onPress={handleResetPassword}
          disabled={emailSent} // Disable button if email is sent
        >
          <Text style={styles.buttonText}>
            {emailSent ? "Email Sent" : t("Submit")} {/* Change button text */}
          </Text>
        </TouchableOpacity>
           <TouchableOpacity onPress={handleBack} >
           <Text style={{fontSize: 12, marginTop: 40}}>Back to Login</Text>
             </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contained: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    color: "grey",
    width: 400,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    marginTop: 10,
    fontFamily: "Roboto-Light"
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
    fontFamily: "Roboto-Light"
  },
  successText: {
    fontSize: 14,
    color: "green",
    marginBottom: 10,
    textAlign: 'flex-start',
    fontFamily: "Roboto-Light"
  },
  errorText: {
    fontSize: 14,
    color: "red",
    textAlign: 'flex-start',
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#135837",
    borderRadius: 5,
    padding: 10,
    width: 500,
    alignItems: "center",
    marginTop: 30,
  },
  buttonSuccess: {
    backgroundColor: "green", // Button color when email is sent
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ResetPasswordForm;
