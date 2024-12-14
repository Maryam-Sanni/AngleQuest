import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Picker, Modal, ScrollView } from 'react-native';
import OpenModal from './AddEmployeeMan';
import { Button, Checkbox, Switch } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Employee information'); 
    const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [specialization, setSpecialization] = useState('');
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');
  
  const getSelectedEmployee = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedEmployee');
      if (value) {
        const parsedEmployee = JSON.parse(value);
        setSelectedEmployee(parsedEmployee);

        // Set states for specialization, current role, and target role
        setSpecialization(parsedEmployee?.specialization || '');
        setCurrent(parsedEmployee?.current || '');
        setTarget(parsedEmployee?.target || '');
      } else {
        console.log('No selected employee found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving selected employee:', error);
    }
  };

    // Fetch the saved employee data on component mount
    useEffect(() => {
      getSelectedEmployee();
    }, []);
    
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
    <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", marginTop: 40, alignItems: 'center' }}>
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

        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>

        {/* Content Rendering Based on Active Tab */}
        <View style={styles.contentContainer}>
          {activeTab === 'Employee information' ? (
            <View style={styles.employeeInfoContainer}>
              <Text style={styles.infoLabel}>{t("Full Name")}</Text>
              <TextInput
                placeholder={t("Full Name")}
                placeholderTextColor="grey"
                style={styles.input}
                value={selectedEmployee?.name || ''}
              />

              <Text style={styles.infoLabel}>{t("Email Address")}</Text>
              <TextInput
                placeholder="hello@mybusiness.com"
                placeholderTextColor="grey"
                style={styles.input}
                value={selectedEmployee?.email || ''}
              />

              <Text style={styles.infoLabel}>{t("Specialization")}</Text>
              <Picker
                selectedValue={specialization}
                onValueChange={(itemValue) => setSpecialization(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label={t("Pick an area of specialization")} value="" />
                <Picker.Item label="SAP" value="SAP" />
                <Picker.Item label="Microsoft" value="Microsoft" />
                <Picker.Item label="Scrum" value="Scrum" />
                <Picker.Item label="Business Analysis" value="Business Analysis" />
              </Picker>


              {/* Lock icon for Type of Service */}
              <Text style={styles.infoLabel}>
                {t("Type of Service")}
              </Text>
              <TextInput
                placeholder={t("Selected support")}
                placeholderTextColor="grey"
                style={styles.input}
                value={selectedEmployee?.service || ''}
                editable={false} // Lock the field
              />

              <Text style={styles.infoLabel}>{t("Current role")}</Text>
              <Picker
                selectedValue={current}
                onValueChange={(itemValue) => setCurrent(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label={t("Beginner")} value="Beginner" />
                <Picker.Item label={t("Junior")} value="Junior" />
                <Picker.Item label={t("Intermediate")} value="Intermediate" />
                <Picker.Item label={t("Advanced")} value="Advanced" />
              </Picker>

              <Text style={styles.infoLabel}>{t("Target role")}</Text>
              <Picker
                selectedValue={target}
                onValueChange={(itemValue) => setTarget(itemValue)}
                style={styles.picker}
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
        <TouchableOpacity onPress={onClose} style={styles.buttonplus}>
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
        </ScrollView>
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
    width: 22,
    height: 22,
    marginLeft: 10,
    marginTop: 11
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
