import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Alert, TouchableOpacity } from "react-native";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';

function MyComponent() {
  const navigatie = useNavigate();
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const toggleTwoFactorAuth = () => {
    setTwoFactorAuthEnabled(!twoFactorAuthEnabled);
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setAlertMessage(t('Passwords do not match'));
      setAlertVisible(true);
      return;
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      alert("Error", "No token found, please log in again.");
      return;
    }

    const payload = {
      oldPassword,
      newPassword,
    };
 
    try {
      const response = await fetch(`${apiUrl}/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setAlertMessage(t('Success'));
        setAlertVisible(true);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await response.json();
        setAlertMessage(data.message || t('An error occurred'));
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage(t('An error occurred'));
      setAlertVisible(true);
    }
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
    onClose();
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Topbar />
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Sidebar />
          <View style={styles.leftContainer}>
            <View style={styles.sectionContainer}>
              <Text style={styles.title}>{t("Reset Password")}</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("Old Password")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="********"
                  secureTextEntry
                  value={oldPassword}
                  onChangeText={setOldPassword}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("New Password")}</Text>
                <TextInput
                  style={[styles.input, { marginLeft: 60 }]}
                  placeholder={t("Enter new password")}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("Confirm Password")}</Text>
                <TextInput
                 style={[styles.input, { marginLeft: 34 }]}
                  placeholder={t("Confirm new password")}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
              <Text style={styles.passwordHint}>
                {t("Password must contain at least 8 characters. Combine uppercase, lowercase and numbers")}
              </Text>
              <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
                <Text style={styles.buttonText}>{t("Save Changes")}</Text>
              </TouchableOpacity>
            </View>
            
       
          </View>
        </View>
      </View>
      <CustomAlert
  visible={alertVisible}
  title={t("Alert")}
  message={alertMessage}
  onConfirm={hideAlert}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  leftContainer: {
    flex: 1,
    marginRight: 20,
    marginLeft: 230,
    backgroundColor: 'white'
  },
  sectionContainer: {
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    color: "#555",
    marginLeft: 65,
    marginRight: 15,
    placeholderTextColor: 'grey',
    maxWidth: '100%',
    marginTop: 5
  },
  passwordHint: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
    fontFamily: "Roboto-Light",
    marginLeft: 170
  },
  button: {
    backgroundColor: "coral",
    borderRadius: 5,
    padding: 10,
    marginRight: 15,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
    marginTop: -20,
    marginLeft: 250,
  },
  verifyButton: {
    backgroundColor: "coral",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    marginTop: -40,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  setButton: {
    backgroundColor: "coral",
    borderRadius: 5,
    padding: 8,
    marginTop: -40,
    marginRight: 10,
    alignSelf: "flex-end",
    alignItems: 'center'
  },
  cardContainer: {
    width: '13%',
    height: 180,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    marginBottom: 10,
  },
});

export default MyComponent;
