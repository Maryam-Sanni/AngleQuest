import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Picker, Modal } from 'react-native';
import OpenModal from './AddEmployeeMan';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState('');

  // Function to retrieve the selected support from AsyncStorage
  const getSelectedSupport = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedSupport');
      if (value !== null) {
        setSelectedSupport(value);
      } else {
        console.log('No value found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving from AsyncStorage:', error);
    }
  };

  // Fetch the value on component mount
  useEffect(() => {
    getSelectedSupport();
  }, []);

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf")
      })
    const {t}=useTranslation()

  return (
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", marginTop: 40, alignItems: 'center' }}>
          <View style={styles.greenBox}>
            <View style={styles.header}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>{t("Add Employee")}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>


              <View style={{ flexDirection: 'column', marginLeft: 50, marginRight: 50 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 5, textAlign: 'center' }}>
                  {t("Onboard a New Employee")}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 15, textAlign: 'center'}}>
                  {t("Anglequest will attach your employee to an expert that will guide them from their current level of expertise to the next level of their career")}.
                </Text>
               
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Full Name")}
                </Text> 
                <TextInput
                  placeholder= {t("Full Name")}
                  placeholderTextColor= "grey"
                  style={styles.input}
                />

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Email Address")}
                </Text>
                <TextInput
                  placeholder="hello@mybusiness.com"
                   placeholderTextColor= "grey"
                  style={styles.input}
                />

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Specialization")}
                </Text>
                <Picker
                  style={styles.picker}
                >
                  <Picker.Item label={t("Pick an area of specialization")} value="Pick an area of specialization" />
                  <Picker.Item label="SAP" value="SAP" />
                  <Picker.Item label="Microsoft" value="Microsoft" />
                  <Picker.Item label="Scrum" value="Scrum" />
                  <Picker.Item label="Business Analysis" value="Business Analysis" />
                </Picker>

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Type of Service")}
                </Text>
                <TextInput
                  placeholder="Selected support"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={selectedSupport} // Display the retrieved value
                  editable={false} // Make the input non-editable
                />
                
                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Current role")}
                </Text>
                <Picker
                  style={styles.picker}
                >
                  <Picker.Item label={t("Beginner")} value="Beginner" />
                   <Picker.Item label={t("Junior")} value="Junior" />
                  <Picker.Item label={t("Intermediate")} value="Intermediate" />
                  <Picker.Item label={t("Advanced")} value="Advanced" />
                </Picker>

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 30, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                  {t("Target role")}
                </Text>
                <Picker
                  style={styles.picker}
                >
                  <Picker.Item label={t("Junior")} value="Junior" />
                    <Picker.Item label={t("Senior")} value="Senior" />
                    <Picker.Item label={t("Manager")} value="Manager" />
                    <Picker.Item label={t("Senior Manager")} value="Senior Manager" />
                    <Picker.Item label={t("Solution Architect")} value="Solution Architect" />
                </Picker>

                <TouchableOpacity onPress={onClose} style={styles.buttonplus}>
                  <Text style={styles.buttonTextplus}>{t("Finish")}</Text>
                </TouchableOpacity>
              </View>
      
            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisible}
                onRequestClose={handleCloseModal}
              >
                <View style={styles.modalContent}>
                  <OpenModal onClose={handleCloseModal} />
                </View>
              </Modal>
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
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70,
    marginTop: 20,
    marginLeft: 50,
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: "90%",
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 30,
    marginLeft: 450,
    width: 100,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
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
    color: '#3F5637',
    fontFamily:"Roboto-Light"
  },
  image: {
    width: 400,
    height: 400,
    marginRight: 30,
  },
});

export default MyComponent;
