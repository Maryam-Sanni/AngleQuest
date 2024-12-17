import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, ScrollView, TouchableOpacity, Alert } from 'react-native';
import TopBar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

function MyComponent() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    // Retrieve first_name and last_name from AsyncStorage
    const retrieveData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('first_name');
        const storedLastName = await AsyncStorage.getItem('last_name');
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedFirstName !== null && storedLastName !== null) {
          console.log('Stored first_name:', storedFirstName);
          console.log('Stored last_name:', storedLastName);
          setFirstName(storedFirstName);
          setLastName(storedLastName);
           setEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    retrieveData();
  }, []);
  
  const handleDeactivate = async () => {
    if (confirmationText === 'DEACTIVATE') {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          alert('Failed to retrieve token. Please try again.');
          return;
        }

        // Make API call to deactivate the account
        const response = await axios.put(
          `${apiUrl}/api/jobseeker/deactivate-jobseeker`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        console.log('Response data:', response.data); // Log the response to debug

        // Check if the response was successful
        if (response.status === 200) {
          // If your API doesn't return a 'success' key, you can check the status code instead
          navigation.navigate('Join Recruitangle');
        } else {
          // Handle API error
          alert('Deactivation failed. Please try again.');
        }
      } catch (error) {
        // Handle errors from Axios or token retrieval
        console.error('Error deactivating:', error);
        alert(`Deactivation failed: ${error.response?.data?.message || error.message}`);
      }
    } else {
      alert('Please spell "DEACTIVATE" correctly to confirm.');
    }
  };



  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
    const {t}=useTranslation()

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500}}>
        <View style={{ backgroundColor: 'white', marginLeft: 230 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 30, marginBottom: 10, marginLeft: 10

           }}>{t("Contact Information")}</Text>
          <View style={{ flexDirection: 'row', paddingHorizontal: 8, paddingTop: 8 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Text style={{  fontWeight: '600'}}>{t("First Name")}</Text>
                <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#206C00',
                 marginLeft: 20,
                  borderRadius: 5,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholdertextColor: 'black',
                }}
                  placeholder={firstName}
              />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Text style={{fontWeight: '600' }}>{t("Last Name")}</Text>
                <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                 marginLeft: 20,
                  borderRadius: 5,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholdertextColor: 'black',
                }}
                  placeholder={lastName}
              />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Text style={{fontWeight: '600'}}>{t("Email")}</Text>
                <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                 marginLeft: 55,
                  borderRadius: 5,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholdertextColor: 'black',
                }}
                  placeholder={email}
              />
              </View>

            </View>


          </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20, marginLeft: 20, marginRight: 280 }} />




          <View style={{ paddingHorizontal: 8, marginTop: 10  }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 40}}>{t("Account Deactivation")}</Text>
            <View style={{ flexDirection: 'row', marginTop: - 20 }}>
              <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold', marginLeft: 230 }}>{t("This is what happens when you deactivate your account")}</Text>
                <Text style={{ fontSize: 16, color: '#777', marginTop: 4, marginLeft: 240 }}>• {t("Your profile will be permanently deleted from our server")}</Text>
                <Text style={{ fontSize: 16, color: '#777', marginTop: 2, marginLeft: 240 }}>• {t("All Booked sessions will be cancelled")}</Text>
                <Text style={{ fontSize: 16, color: '#777', marginTop: 2, marginLeft: 240 }}>• {t("Forwarded feedbacks retracted")}</Text>
                <Text style={{ fontSize: 16, color: '#777', marginTop: 2, marginLeft: 240 }}>• {t("You won’t be able to reactivate your sessions")}</Text>
                <Text style={{ fontSize: 16, color: '#777', marginTop: 2, marginLeft: 240 }}>• {t("You won’t be able to create another account with this email address")}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.deactivateButton} 
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.deactivateButtonText}>{t("Deactivate account")}</Text>
          </TouchableOpacity>

          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>{t("Are you sure you want to deactivate? This process is not reversible.")}</Text>
                <Text style={styles.modalText}>{t("Type 'DEACTIVATE' to confirm")}</Text>
                <TextInput
                  placeholder=''
                  style={styles.input}
                  value={confirmationText}
                  onChangeText={setConfirmationText}
                />
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleDeactivate}
                >
                  <Text style={styles.confirmButtonText}>{t("Yes")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>{t("Cancel")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>
        </ScrollView>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginLeft: 5,
  },
  cardContainer: {
    width: '16%',
    height: 180, 
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
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
    marginBottom: 5,
  },
  deactivateButton: {
    justifyContent: 'center',
    marginLeft: 250,
    width: 170,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 40,
    marginBottom: 50,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deactivateButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Roboto-Light"
  },
  input: {
    borderWidth: 1,
    borderColor: '#206C00',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontFamily: "Roboto-Light"
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: "Roboto-Light"
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  }
});

export default MyComponent;