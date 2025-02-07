import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, CheckBox, FlatList, Picker, ScrollView } from 'react-native';
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert'; 
import DaysTimePickerModal from "../components/TimePicker";

const MAX_QUESTIONS = 15;

  const specializationRoles = {
    'Select a Category': ['No category selected'],
    SAP: ['SAP FI', 'SAP MM', 'SAP SD', 'SAP PP'],
    Microsoft: [
      'Microsoft Dynamics Sales',
      'Microsoft Dynamics Customer Service',
      'Microsoft Dynamics Field Service',
      'Microsoft Dynamics CRM Developer',
      'Microsoft Business Central',
      'Microsoft Power Platform Developer',
      'Microsoft Dynamics F&O',
    ],
  };

  const CustomMultiSelect = ({ items, selectedItems, onSelectedItemsChange }) => {
    const toggleSelection = (id) => {
      if (selectedItems.includes(id)) {
        // Remove the item if it's already selected
        onSelectedItemsChange(selectedItems.filter((item) => item !== id));
      } else {
        // Add the item if it's not selected
        onSelectedItemsChange([...selectedItems, id]);
      }
    };

    return (
      <View style={styles.container2}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={selectedItems.includes(item.id)}
                onValueChange={() => toggleSelection(item.id)}
                tintColors={{ true: 'green', false: 'gray' }}
                style={styles.checkbox}
              />
              <Text
                style={
                  selectedItems.includes(item.id)
                    ? styles.selectedText
                    : styles.unselectedText
                }
              >
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    );
  };

function MyComponent({ onClose, onDone }) {
  
  const [isSelectVisible, setSelectVisible] = useState(false);
  const [currentSelectedRoles, setCurrentSelectedRoles] = useState([]);

  // Effect to clear selected roles when category changes
  useEffect(() => {
    setCurrentSelectedRoles([]);
  }, [category]);

  // Function to handle click on the input box
  const handleInputClick = () => {
    setSelectVisible((prevState) => !prevState);
  };

  // Update the selected roles and synchronize with selectedSpecializations
  const handleSelectedItemsChange = (items) => {
    setCurrentSelectedRoles(items);
    setSelectedSpecializations(items); // Update the parent state
  };
  
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();
 
  const [role, setInterviewRole] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [available_days, setAvailableDays] = useState('');
  const [available_times, setAvailableTimes] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', percentage: '' }
  ]); 
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');    
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [specialization, setSpecialization] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
  const [rate, setRate] = useState('$50'); // Initial value includes $
  const [isPickerVisible, setPickerVisible] = useState(false);

  const toggleSpecialization = (specialization) => {
    setSelectedSpecializations((prevSelected) =>
      prevSelected.includes(specialization)
        ? prevSelected.filter((item) => item !== specialization)
        : [...prevSelected, specialization]
    );
  };

  const handleRateChange = (text) => {
    // Remove non-numeric characters except for the decimal point
    const numericValue = text.replace(/[^0-9.]/g, '');

    // If the input is not empty, set the state with the `$` at the start
    if (numericValue || numericValue === '') {
      setRate(`$${numericValue}`);
    }
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleConfirm = ({ selectedDays, startTime, endTime }) => {
    setAvailableDays(selectedDays);
    setAvailableTimes(`${startTime.hour}:${startTime.minute} ${startTime.period} - ${endTime.hour}:${endTime.minute} ${endTime.period}`);
    setModalVisible(false);
  };

  const combinedValue = `${Array.isArray(available_days) ? available_days.join(', ') : ''}, ${available_times}`;

  const specializationsList = [
    'SAP FI',
    'SAP MM',
    'SAP SD',
    'SAP PP',
    'Microsoft Dynamics Sales',
    'Microsoft Dynamics Customer Service',
    'Microsoft Dynamics Field Service',
    'Microsoft Dynamics CRM Developer',
    'Microsoft Business Central',
    'Microsoft Power Platform Developer',
    'Microsoft Dynamics F&O',
  ];

  useEffect(() => {
    const fetchPreferences = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await axios.get(`${apiUrl}/api/expert/get-preference`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200 && response.data?.ExpertPreference) {
                const { category, specialization, time } = response.data.ExpertPreference;

                setCategory(category || '');
                setCurrentSelectedRoles(specialization || []);
                setAvailableTimes(time || '');
            }
        } catch (error) {
            console.error('Error fetching preferences:', error);
        }
    };

    fetchPreferences();
}, []);

  const handleSave = async () => {
    if (!category || !available_days || !available_times) {
      setAlertMessage(t('Please fill all fields'));
      setAlertVisible(true);
      return;
    }

    try {
      const data = {
        time: `${available_days} ${available_times}`,
        category,
        specialization: selectedSpecializations,
      };

      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(
        `${apiUrl}/api/expert/create-preference`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        await AsyncStorage.setItem('InterviewFormData', JSON.stringify(data));
        onDone();
        setAlertMessage(t('Support request guide created successfully'));
      } else {
        setAlertMessage(t('Failed to create Support request guide'));
      }
    } catch (error) {
      console.error('Error during save:', error); // Log error for debugging
      setAlertMessage(t('Failed to create Support request guide'));
    }
    setAlertVisible(true);
  };
  
/// Function to fetch specialization and category from the API using token from AsyncStorage
const fetchExpertProfile = async () => {
  try {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('token');

    // Make the API request with the token in the headers
    const response = await axios.get(`${apiUrl}/api/expert/get-expert-profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });

    // Check if the response status is success
    if (response.data.status === "success") {
      const { specialization = [], category = '' } = response.data.profile;

      // Set the specialization array
      setSelectedRoles(specialization);

                // Only set category if it's currently null
      setCategory(prevCategory => prevCategory === null ? category : prevCategory);
    }
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
};

// useEffect to fetch data when the component mounts
useEffect(() => {
  fetchExpertProfile();
}, []);


  const hideAlert = () => {
    setAlertVisible(false);
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
           
            <Text style={styles.headerText}>{t("Create Support Request Guide")}</Text>


          </View> 

          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View style={styles.buttonDue}>
              <Text style={styles.buttonTextDue}>A support request is a query or complaint that a user makes to get information or assistance. Create a guide to provide needed assistance to such users, make sure to fill all fields.</Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.row}>
              <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Category")}</Text>
              </View>
              <View style={[styles.cell, { flex: 2}]}>
                <Picker
                                selectedValue={category}
                                style={styles.picker}
                                onValueChange={(value) => setCategory(value)}
                              >
                                <Picker.Item label="All Category" value="" />
                                <Picker.Item label="SAP" value="SAP" />
                                <Picker.Item label="Microsoft" value="Microsoft" />
                              </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Specialization")}</Text>
              </View>
              <View style={[styles.cell, { flex: 2}]}>
                <TouchableOpacity onPress={handleInputClick} style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={
                      currentSelectedRoles.length > 0
                        ? currentSelectedRoles.join(', ')
                        : 'Select specialization...'
                    }
                    editable={false}
                  />
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/?size=100&id=39942&format=png&color=000000',
                    }}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>

                {/* Conditionally render CustomMultiSelect */}
                {isSelectVisible && category && specializationRoles[category] && (
                  <CustomMultiSelect
                    items={specializationRoles[category].map((role) => ({
                      id: role,
                      name: role,
                    }))}
                    selectedItems={currentSelectedRoles}
                    onSelectedItemsChange={handleSelectedItemsChange}
                  />
                )}
               
                  </View>
                </View>
             {/* Modal for Picker */}
      <Modal
        visible={isPickerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select one or more Specialization(s)</Text>
            <FlatList
              data={specializationsList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.modalItem}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleSpecialization(item)}
                  >
                    {selectedSpecializations.includes(item) && (
                      <Text style={styles.checkboxText}>✓</Text>
                    )}
                  </TouchableOpacity>
                  <Text style={styles.modalItemText}>{item}</Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPickerVisible(false)}
            >
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

           
          
            <View style={styles.row}>
              <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Available Day(s) and Time")}</Text>
              </View>
              <View style={[styles.cell, { flex: 2}]}>
                <TextInput
                  placeholder="Mon, Tue, Wed..., Sun / 12PM-1PM"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={combinedValue}
                  editable={false} // Prevent manual input
                  pointerEvents="none" // Ensure it behaves like a button
                />
              </View>
            </View>
              </View>

          <View style={[styles.container, { marginTop: 50, borderRadius: 20, backgroundColor: '#F5F5F5' }]}>
            <DaysTimePickerModal
              isVisible={isModalVisible}
              onConfirm={handleConfirm}
              onCancel={() => setModalVisible(false)}
            />

          </View>

            

         

        

        

                    <TouchableOpacity onPress={handleSave} style={styles.buttonsave}>
                    <Text style={styles.buttonTextsave}>{t("Save")}</Text>
                    </TouchableOpacity>
                    </View>
                    </ScrollView>
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
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70,
    marginTop: 10,
    marginLeft: 50
  },
  container2: {
    flexDirection: 'column',
    marginRight: 70,
    marginTop: 10,
    marginLeft: 50
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
  },
  cell3: {
    flex: 1,
    padding: 5,
  },
  cell2: {
    flex: 1,
    padding: 5,
    borderBottomWidth: 0.5, 
    borderBottomColor: '#CCC',
    marginTop: 5
  },
  input2: {
    fontFamily: "Roboto-Light",
    padding: 5,
    borderWidth: 1,
    borderColor: "#CCC"
  },
  picker2: {
    height: 30,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#CCC',
    borderWidth: 1,
    color: 'black',
  },
  deleteButton: {
marginTop: 10
  },
  buttonDue: {
    marginLeft: 50,
    marginTop: 5,
  },
  buttonTextDue: {
    color: 'black',
    fontSize: 15,
    width: 700,
    fontFamily: "Roboto-Light",
  },
  buttonplus: {
    backgroundColor: 'white', 
    padding: 10,
    marginLeft: 100, 
    width: 80,
    marginTop: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonTextplus: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
  buttonsave: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 730,
    width: 80,
      padding: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    borderRadius: 5,
    marginBottom: 50
  },
  buttonTextsave: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  greenBox: {
    width: 880,
    backgroundColor: 'white',
  },
  input: {
    fontFamily: "Roboto-Light",
    paddingLeft: 5
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
  },
  buttonplusPressed: {
    backgroundColor: 'green',
  },
  buttonplusDisabled: {
    backgroundColor: 'red',
  },
  placeholderText: {
    color: 'grey',
    fontSize: 12, // Adjust size as needed
    position: 'absolute',
    left: 10,
    top: 15, // Adjust position as needed
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  dropdownButton: {
    borderWidth: 0,
    borderColor: '#ccc',
    backgroundColor: 'none',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
  },
  modalContent: {
    position: 'absolute',
    width: 400,
    height: 300,
left: '51.5%',
top: 350,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  modalItemText: {
    fontSize: 14,
    marginLeft: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'coral',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row', // Align checkbox and text in a row
    alignItems: 'center', // Center them vertically
    marginVertical: 5, 
    marginTop: 7,
    marginLeft: 10
  },
  checkbox: {
    color: 'green', 
    backgroundColor: 'green'
  },
  selectedText: {
    color: 'green', // Text color for selected items
    marginLeft: 10
  },
  unselectedText: {
    color: 'black', // Default text color
    marginLeft: 10
  },
});

export default MyComponent;