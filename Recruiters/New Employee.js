import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Picker, Modal } from 'react-native';
import OpenModal from './AddEmployeeMan';
import { Button, Checkbox, Switch } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState('');
  const [activeTab, setActiveTab] = useState('Employee information'); // State for active tab
  const [employeeData, setEmployeeData] = useState({
    fullname: '',
    email_address: '',
    specialization: '',
    type: '',
    current_role: '',
    target_role: '',
  });

  const apiUrl = `${process.env.REACT_APP_API_URL}/api/business/create-employee`;

  // Function to retrieve the token and selected support from AsyncStorage
  const initializeData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const support = await AsyncStorage.getItem('selectedSupport');
      if (support) setSelectedSupport(support);
      setEmployeeData((prev) => ({ ...prev, type: support, token }));
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  const handleSave = async () => {
    const { token, ...dataToSend } = employeeData;
    try {
      const response = await Axios.post(apiUrl, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Employee created successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error creating employee:', error.response?.data || error.message);
    }
  };

  const handleChange = (field, value) => {
    setEmployeeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf")
  });

  const { t } = useTranslation();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
       <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
      <View style={styles.greenBox}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("Add Employee")}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
              ✕
            </Text>
          </TouchableOpacity>
        </View>
 
        {/* Tab Buttons */}
        <View style={styles.header}>
            <Button
              mode="text"
              textColor="#000000"
              style={[
                styles.button,
                activeTab === 'Employee information' && styles.activeButton,
              ]}
              onPress={() => handleTabChange('Employee information')}
            >
              Employee information
            </Button>
          <Button
          mode="text"
          textColor="#000000"
          style={[
            styles.button,
            activeTab === 'Note to AngleQuest expert' && styles.activeButton,
          ]}
            onPress={() => handleTabChange('Note to AngleQuest expert')}
          >
            Note to AngleQuest expert
          </Button>
        </View>
      

        {/* Content Rendering Based on Active Tab */}
        <View style={styles.contentContainer}>
          {activeTab === 'Employee information' ? (
            <View style={styles.employeeInfoContainer}>
              <Text style={styles.infoLabel}>{t("Full Name")}</Text>
              <TextInput
                placeholder={t("Full Name")}
                placeholderTextColor="grey"
                style={styles.input}
                value={employeeData.fullname}
                onChangeText={(value) => handleChange('fullname', value)}
              />

              <Text style={styles.infoLabel}>{t("Email Address")}</Text>
              <TextInput
                placeholder="hello@mybusiness.com"
                placeholderTextColor="grey"
                style={styles.input}
                value={employeeData.email_address}
                onChangeText={(value) => handleChange('email_address', value)}
              />

              <Text style={styles.infoLabel}>{t("Specialization")}</Text>
              <Picker 
                                selectedValue={employeeData.specialization}
                                style={styles.picker}
                                onValueChange={(value) => handleChange('specialization', value)}
              >
                <Picker.Item label={t("Pick an area of specialization")} value="Pick an area of specialization" />
                <Picker.Item label="SAP" value="SAP" />
                <Picker.Item label="Microsoft" value="Microsoft" />
                <Picker.Item label="Scrum" value="Scrum" />
                <Picker.Item label="Business Analysis" value="Business Analysis" />
              </Picker>

              
              {/* Lock icon for Type of Service */}
              <View style={{marginTop: -15}}>
              <Text style={styles.infoLabel}>
                {t("Type of Service")}
                <Image
                  source={{ uri: 'https://img.icons8.com/?size=100&id=10641&format=png&color=000000' }}
                  style={styles.lockIcon}
                />
              </Text>
              <TextInput
                  placeholder="Selected support"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={selectedSupport}
                  editable={false}
              />

              </View>
              
              <Text style={styles.infoLabel}>{t("Current role")}</Text>
              <Picker
                  selectedValue={employeeData.current_role}
                  style={styles.picker}
                  onValueChange={(value) => handleChange('current_role', value)}
                >
                <Picker.Item label={t("Beginner")} value="Beginner" />
                <Picker.Item label={t("Junior")} value="Junior" />
                <Picker.Item label={t("Intermediate")} value="Intermediate" />
                <Picker.Item label={t("Advanced")} value="Advanced" />
              </Picker>

              <Text style={styles.infoLabel}>{t("Target role")}</Text>
              <Picker
                  selectedValue={employeeData.target_role}
                  style={styles.picker}
                  onValueChange={(value) => handleChange('target_role', value)}
                >
                <Picker.Item label={t("Junior")} value="Junior" />
                <Picker.Item label={t("Senior")} value="Senior" />
                <Picker.Item label={t("Manager")} value="Manager" />
                <Picker.Item label={t("Senior Manager")} value="Senior Manager" />
                <Picker.Item label={t("Solution Architect")} value="Solution Architect" />
              </Picker>
            </View>
          ) : (
            <View style={styles.noteContainer}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>{t("Special Information")}</Text>
              <Text style={styles.noteDescription}>
                {t("Add any special information you would like AngleQuest that will be working with this employee to know.")}
              </Text>
              <Text style={{fontSize: 18, marginTop: 40, fontWeight: '600'}}>{t("Special note to AngleQuest expert")}</Text>
              <TextInput
                placeholder={t("Write your note here...")}
                placeholderTextColor="grey"
                style={styles.noteInput}
                multiline
              />
            </View>
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} style={styles.buttonplus}>
          <Text style={styles.buttonTextplus}>{t("Save")}</Text>
        </TouchableOpacity>

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
      </ScrollView>
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
  tabButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
      shadowOffset: { width: 0, height: 2, }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84,
       elevation: 5, 
  },
  button: {
marginRight: 20
  },
  activeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  contentContainer: {
    marginTop: 20,
  },
  employeeInfoContainer: {
    paddingHorizontal: 20,
  },
  infoLabel: {
    fontWeight: '500',
    fontSize: 16,
    marginTop: 10
  },
  input: {
    height: 40,
    width: "100%",
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    width: "100%",
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
     marginTop: 10,
  },
  lockIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
    marginTop: 25
  },
  noteContainer: {
    paddingHorizontal: 20,
  },
  noteDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  noteInput: {
    height: 200,
    width: "100%",
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 5,
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 30,
    marginLeft: 870,
    width: 100,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
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
  image: {
    width: 400,
    height: 400,
    marginRight: 30,
  },
});

export default MyComponent;
