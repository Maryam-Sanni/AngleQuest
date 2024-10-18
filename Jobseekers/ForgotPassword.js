import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Top from '../components/top';
import { useFonts } from 'expo-font';
import { useTranslation } from "react-i18next";
import axios from 'axios';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false); // To track if email has been sent
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  // Refs for input fields
  const emailRef = useRef();

  const handleResetPassword = async () => {
    try {
      await axios.post(`${apiUrl}/api/forgot-password`, {
        email,  // Only sending the email
      });
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

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <View style={{ flex: 1}}>
      <Top />
      <View style={styles.container}>
        <Text style={styles.title}>Enter your email address to rest your password</Text>

        {success && <Text style={styles.successText}>{success}</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}

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

        <TouchableOpacity 
          style={[styles.button, emailSent && styles.buttonSuccess]} // Conditional styling
          onPress={handleResetPassword}
          disabled={emailSent} // Disable button if email is sent
        >
          <Text style={styles.buttonText}>
            {emailSent ? "Email Sent" : t("Reset Password")} {/* Change button text */}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 200
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
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
    textAlign: "center",
    fontFamily: "Roboto-Light"
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "coral",
    borderRadius: 5,
    padding: 10,
    width: 200,
    alignItems: "center",
    marginTop: 10,
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
