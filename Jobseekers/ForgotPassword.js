import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Top from '../components/top';
import { useFonts } from 'expo-font';
import { useTranslation } from "react-i18next";
import axios from 'axios';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Refs for input fields
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('https://recruitangle.com/api/forgot-password', {
        email,
        new_password: newPassword,
      });
      setSuccess("Password reset successfully");
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data.message : "An error occurred");
      setSuccess(null);
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
        <Text style={styles.title}>Reset Your Password</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("Email")}</Text>
          <TextInput
            ref={emailRef} // Example ref usage
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("New Password")}</Text>
          <TextInput
            ref={passwordRef} // Example ref usage
            style={styles.input}
            secureTextEntry={true}
            placeholder="********"
            onChangeText={setNewPassword}
            value={newPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("Confirm Password")}</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="********"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </View>
        <Text style={styles.passwordHint}>
          {t("Password must contain at least 8 characters. Combine uppercase, lowercase and numbers.")}
        </Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {success && <Text style={styles.successText}>{success}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>{t("Reset Password")}</Text>
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
    padding: 100
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
    fontFamily: "Roboto-Light"
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
  passwordHint: {
    fontSize: 14,
    color: "#777",
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
  successText: {
    fontSize: 12,
    color: "green",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "coral",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ResetPasswordForm;
