import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Ionicons } from '@expo/vector-icons';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const loadEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        console.log("Loaded email:", storedEmail);
        setEmail(storedEmail || ""); // Set email or fallback to an empty string
      } catch (e) {
        console.error("Failed to load email:", e);
      }
    };
    loadEmail();
  }, []);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('token'); 

      if (!token) {
        setError("Token not found");
        return;
      }

      // Make the request with the token and other details
      await axios.post(`${apiUrl}/api/reset-password`, {
        token,
        email,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      setSuccess("Password reset successfully");
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data.message : "An error occurred");
      setSuccess(null);
    }
  };

    const handleBack = () => {
   navigate("/sign-in");
    };

  return (
    <View style={{ flex: 1 }}>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.contained}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} 
            style={{
                width: 80,
                height: 80,
               marginBottom: 50
              }}
            />
           <Image
             source={{
               uri: "https://img.icons8.com/?size=100&id=96646&format=png&color=000000",
             }}
             style={{
               width: 100,
               height: 100,
               
             }}
           />
        <Text style={styles.title}>Reset Your Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              editable={false} 
            />
          </View>
          <View style={styles.input2Container}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={!newPasswordVisible}
              onChangeText={setNewPassword}
              value={newPassword}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setNewPasswordVisible(!newPasswordVisible)}
            >
              <Ionicons
                name={newPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.input2Container}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <Ionicons
                name={confirmPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {success && <Text style={styles.successText}>{success}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={handleBack} >
             <Text style={{fontSize: 12, marginTop: 40}}>Go to Login</Text>
               </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
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
  input: {
    width: 500,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
    fontFamily: "Roboto-Light"
  },
  input2Container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  iconContainer: {
    padding: 5,
    marginLeft: -40
  },
  button: {
    backgroundColor: "#135837",
    borderRadius: 5,
    padding: 10,
    width: 500,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
  },
  successText: {
    color: "green",
  },
});

export default ResetPasswordForm;
