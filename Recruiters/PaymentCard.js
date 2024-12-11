import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Picker, Modal, Switch } from 'react-native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyComponent({ onClose }) {
  const [ModalVisible, setModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleSave = () => {
    // You can store these details into AsyncStorage or any other storage you use
    console.log({
      fullName,
      email,
      phone,
      billingAddress,
      isRecurring,
    });
    // Close modal and reset state if needed
    setModalVisible(false);
    onClose();
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", marginTop: 40, alignItems: 'center' }}>
      <View style={styles.greenBox}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("Card Details")}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'column', marginLeft: 50, marginRight: 50 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 5, textAlign: 'flex-start' }}>
            {t("Enter Card Details")}
          </Text>
        </View>

        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
            {t("Full Name")}
          </Text>
          <TextInput
            placeholder={t("Full Name")}
            placeholderTextColor="grey"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
            {t("Email Address")}
          </Text>
          <TextInput
            placeholder="hello@mybusiness.com"
            placeholderTextColor="grey"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
            {t("Phone Number")}
          </Text>
          <TextInput
            placeholder="123-456-7890"
            placeholderTextColor="grey"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
            {t("Billing Address")}
          </Text>
          <TextInput
            placeholder={t("Billing Address")}
            placeholderTextColor="grey"
            style={styles.input}
            value={billingAddress}
            onChangeText={setBillingAddress}
          />

          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, fontFamily: "Roboto-Light" }}>
            {t("Recurring Payment")}
          </Text>
          <View style={styles.switchContainer}>
            <Text>{t("Enable Recurring Payments")}</Text>
            <Switch
              value={isRecurring}
              onValueChange={(value) => setIsRecurring(value)}
            />
          </View>

          <TouchableOpacity onPress={handleSave} style={styles.buttonplus}>
            <Text style={styles.buttonTextplus}>{t("Save")}</Text>
          </TouchableOpacity>
        </View>

       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  input: {
    height: 40,
    width: "90%",
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
    marginTop: 10,
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 30,
    marginLeft: 850,
    width: 100,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light",
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MyComponent;
