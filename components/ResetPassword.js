import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import Top from '../components/top';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/reset-password`, {
        email,
        new_password: newPassword, // The new password being reset
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
      <Top />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.contained}>
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
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={true}
            onChangeText={setNewPassword}
            value={newPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
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
