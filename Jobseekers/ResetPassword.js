import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Switch } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

function MyComponent() {
  const navigation = useNavigation();
  const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false);

  const toggleTwoFactorAuth = () => {
    setTwoFactorAuthEnabled(!twoFactorAuthEnabled);
  };

  const goToAccountSettings = () => {
    navigation.navigate('Account Settings');
  };

  const goToResetPassword = () => {
    navigation.navigate('Reset Password');
  };

  const goToNotificationSettings = () => {
    navigation.navigate('Notification Settings');
  };

  const goToBillingsAndPayment = () => {
    navigation.navigate('Billings and Payment');
  };

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <View style={styles.leftContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.title}>Reset Password</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Old Password</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'grey',
                 marginLeft: 65,
                  borderRadius: 5,
                  marginRight: 15,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholderTextColor: 'grey'
                }}
                placeholder="********"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'grey',
                 marginLeft: 60,
                  borderRadius: 5,
                  marginRight: 15,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholderTextColor: 'grey'
                }}
                placeholder="Enter new password"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'grey',
                 marginLeft: 40,
                  borderRadius: 5,
                  marginRight: 15,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholderTextColor: 'grey'
                }}
                placeholder="Confirm new password"
              />
            </View>
            <Text style={[styles.passwordHint, {marginLeft: 170 }]}>
              Password must contain at least 8 characters. Combine uppercase,
              lowercase and numbers
            </Text>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </View>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20, marginLeft: 20, marginRight: 30 }} />
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Phone Verification</Text>
            <Text style={styles.sectionText}>
              Your phone number is not yet verified, verify now to secure your
              account.
            </Text>
            <View style={styles.verifyButton}>
              <Text style={styles.buttonText}>Verify Now</Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Security Question</Text>
            <Text style={styles.sectionText}>
              Add an additional layer of security to your account by creating a
              security question.
            </Text>
            <View style={styles.setButton}>
              <Text style={styles.buttonText}>Set</Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Two-factor Authentication</Text>
            <View style={{flexDirection: "row" }}>
            <Text style={styles.sectionText}>
              Turn on two-factor authentication to help keep your account
              secure. We’ll send a code via email which will be submitted when
              using a new device to login. 
            </Text> 
            <View style={{marginRight: 10, marginTop: -20 }}>
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

        <View style={styles.cardContainer}>
          <View style={styles.cardContent}>
          <TouchableOpacity onPress={goToAccountSettings}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9b7a3a6d0178d9e4654db03454de5de060a67e4b91a6fe4d31a059874d384eb2?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5 }} />
              <Text style={{ fontSize: 12, color: 'black' }}>Account Settings</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToResetPassword}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d2d638a18c02206d9cb09092e754e29b9e7fcec759c21615164f9508890194ba?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
                <Text style={{ fontSize: 12, color: 'coral', fontWeight: 'bold', marginTop: 15 }}>Password</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToNotificationSettings}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/17d8150403f80380e2928ef1b9db06fb8c60a50c487a2172f5699a0eb5f88b6d?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
                <Text style={{ fontSize: 12, color: 'black', marginTop: 15 }}>Notification Settings</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToBillingsAndPayment}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d71eb11f8b49b8dc89ac885de39244967a9d43ca35a783ff2b5c8a9c872d336c?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
                <Text style={{ fontSize: 12, color: 'black', marginTop: 15 }}>Billings & Payment </Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
  );
}


const styles = StyleSheet.create({
  leftContainer: {
    flex: 1,
    marginRight: 20,
    marginLeft: 230
  },
  sectionContainer: {
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#206C00",
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
    color: "#000",
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#555",
    marginRight: 15
  },
  passwordHint: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
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
  },
  sectionTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
    marginTop: -20,
    marginLeft: 250
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
