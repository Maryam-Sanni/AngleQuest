import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Sidebar from "../components/expertssidebar";
import Topbar from "../components/expertstopbar";
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';

function MyComponent() {
  const navigation = useNavigation();
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
      const response = await fetch('https://recruitangle.com/api/reset-password', {
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
                 style={[styles.input, { marginLeft: 40 }]}
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
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20, marginLeft: 20, marginRight: 30 }} />
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{t("Phone Verification")}</Text>
              <Text style={styles.sectionText}>
                {t("Your phone number is not yet verified, verify now to secure your account.")}
              </Text>
              <View style={styles.verifyButton}>
                <Text style={styles.buttonText}>{t("Verify Now")}</Text>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{t("Security Question")}</Text>
              <Text style={styles.sectionText}>
                {t("Add an additional layer of security to your account by creating a security question.")}
              </Text>
              <View style={styles.setButton}>
                <Text style={styles.buttonText}>{t("Set")}</Text>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{t("Two-factor Authentication")}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.sectionText}>
                  {t("Turn on two-factor authentication to help keep your account secure. We’ll send a code via email which will be submitted when using a new device to login.")}
                </Text>
                <View style={{ marginRight: 10, marginTop: -20 }}>
                  <Switch
                    trackColor={{ false: "grey", true: "coral" }}
                    thumbColor={twoFactorAuthEnabled ? "#fff" : "white"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleTwoFactorAuth}
                    value={twoFactorAuthEnabled}
                  />
                </View>
              </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: "#206C00",
    marginBottom: 20,
    fontFamily: "Roboto-Light"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: "#206C00",
    fontWeight: '600',
    marginRight: 10,
    fontFamily: "Roboto-Light"
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
    padding: 8,
    marginRight: 15,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 12,
    color: "white",
    fontFamily: "Roboto-Light"
  },
  sectionTitle: {
    fontSize: 16,
    color: "#206C00",
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    fontFamily: "Roboto-Light"
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
    marginTop: -20,
    marginLeft: 250,
    fontFamily: "Roboto-Light"
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
