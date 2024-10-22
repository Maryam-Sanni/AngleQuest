import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, CheckBox, TextInput, Modal, Image, ScrollView, Picker, Button } from 'react-native';
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';
import DaysTimePickerModal from "../components/TimePicker";
import { format, parse } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const MAX_GUIDES = 15;

function MyComponent({ onClose }) {
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleCheckbox = (idx) => {
    if (checkedItems.includes(idx)) {
      setCheckedItems(checkedItems.filter(item => item !== idx));
    } else {
      setCheckedItems([...checkedItems, idx]);
    }
  };
  
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();

  const [role, setSkillsAnalysisRole] = useState('expert');
  const [skillAnalysisGuides, setSkillAnalysisGuides] = useState([]);
  const [selectedGuideIndex, setSelectedGuideIndex] = useState(0);
   const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [availableDays, setAvailableDays] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [guides, setGuides] = useState([{ guide: '', percentage: '' }]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [pressedButton, setPressedButton] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [rate, setRate] = useState('$30'); // Initial value includes $
  const [id, setID] = useState(null);

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
    // Ensure selectedDays is always an array
    setAvailableDays(Array.isArray(selectedDays) ? selectedDays : []);
    setAvailableTimes(`${startTime.hour}:${startTime.minute} ${startTime.period} - ${endTime.hour}:${endTime.minute} ${endTime.period}`);
    setModalVisible(false);
  };

  // Ensure availableDays is an array before calling join
  const combinedValue = `${Array.isArray(availableDays) ? availableDays.join(', ') : ''}, ${availableTimes}`;


  const getProfileData = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem('location');
      const storedCategory = await AsyncStorage.getItem('category');
      const storedYearsOfExperience = await AsyncStorage.getItem('yearsOfExperience');
      const storedProfileImage = await AsyncStorage.getItem('profileImage');
      const storedRoles = await AsyncStorage.getItem('currentSelectedRoles');
      
      // Check if storedRoles is not null and valid JSON
      const parsedRoles = storedRoles ? JSON.parse(storedRoles) : [];
  
      // Set the state with retrieved data
      if (storedLocation) setLocation(storedLocation);
      if (storedCategory) setCategory(storedCategory);
      if (storedYearsOfExperience) setYearsOfExperience(storedYearsOfExperience);
  
      // Convert storedProfileImage to Blob and setProfileImage
      if (storedProfileImage && typeof storedProfileImage === 'string') {
        const response = await fetch(storedProfileImage);
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProfileImage(imageUrl);  // Set the image URL
      }
  
      // Set selected roles state
      if (Array.isArray(parsedRoles)) {

      } else {
        console.warn('Parsed roles are not an array:', parsedRoles);
        setSelectedRoles([]);  // Fallback to an empty array if parsing fails
      }
  
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };
  
  // useEffect to load the profile data when the component mounts
  useEffect(() => {
    getProfileData();
  }, []);
  
 /// Function to fetch specialization from the API using token from AsyncStorage
 const fetchSpecialization = async () => {
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
      const specialization = response.data.profile.specialization || [];
      setSelectedRoles(specialization);  // Set the specialization array
    }
  } catch (error) {
    console.error('Error fetching specialization data:', error);
  }
};

// useEffect to fetch data when the component mounts
useEffect(() => {
  fetchSpecialization();
}, []);

  useEffect(() => {
    const loadFormData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await axios.get(`${apiUrl}/api/expert/growthplan/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200 && response.data.status === 'success') {
                const fetchedGuides = response.data.growthPlan;
                const newGuide = {
                    id: 'new',
                    role: '',
                    level: '',
                    rate: '',
                    available_days: [],
                    available_times: '',
                    category: '',
                    guides: []
                };

                setSkillAnalysisGuides([newGuide, ...fetchedGuides]);
                updateFormFields(0);  // Initialize form with the first guide (New)
            } else {
                console.error('Failed to fetch data', response);
            }
        } catch (error) {
             console.error('Failed to load form data', error);
        }
    };

    loadFormData();
  }, []);

  const updateFormFields = (index) => {
    const guide = skillAnalysisGuides[index];
    setCategory(guide.category);
    setSelectedRole(guide.specialization);
    setLevel(guide.level);
    setRate(guide.rate);
    setAvailableDays(guide.available_days);
    setAvailableTimes(guide.available_times);
    setGuides(guide.guides);
    setID(guide.id);
  };

  const handleNextGuide = () => {
    if (selectedGuideIndex < skillAnalysisGuides.length - 1) {
        const newIndex = selectedGuideIndex + 1;
        setSelectedGuideIndex(newIndex);
        updateFormFields(newIndex);
    }
  };

  const handlePreviousGuide = () => {
    if (selectedGuideIndex > 0) {
        const newIndex = selectedGuideIndex - 1;
        setSelectedGuideIndex(newIndex);
        updateFormFields(newIndex);
    }
  };


  
  const handleNewGuide = async () => {
      try {
          // Fetch the latest category from AsyncStorage
          const storedCategory = await AsyncStorage.getItem('category');
        
          const newGuide = {
              id: 'new',
              role: '',
              level: '',
              rate: '$0',
            specialization: '',
              available_days: [],
              available_times: '',
              category: storedCategory || '',
              guides: []
          };

          // Update the skill analysis guides state
          setSkillAnalysisGuides([newGuide, ...skillAnalysisGuides]);
          setSelectedGuideIndex(0); // Set to the new guide
          updateFormFields(0); // Initialize form fields with the new guide

      } catch (error) {
          console.error('Failed to create new guide', error);
      }
  };
  
  
  const handleSave = async () => {
    if ( !level || !rate || !availableDays || !availableTimes) {
      setAlertMessage(t('Please fill all fields'));
      setAlertVisible(true);
      return;
    }

    try {
      const data = {
        role,
        level,
        rate,
        specialization: selectedRole,
        years_experience: yearsOfExperience,
        location,
        available_days: availableDays,
        available_times: availableTimes,
        category,
        guides
      };

      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(
        `${apiUrl}/api/expert/growthplan/create`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        await AsyncStorage.setItem('growthPlanFormData', JSON.stringify(data));
        setAlertMessage(t('Growth Plan profile created successfully'));
      } else {
        setAlertMessage(t('Failed to create growth plan profile'));
      }
    } catch (error) {
      console.error('Error during save:', error); // Log error for debugging
      setAlertMessage(t('Failed to create growth plan profile'));
    }
    setAlertVisible(true);
  };

  const handlePut = async () => {
    if ( !level || !rate || !availableDays || !availableTimes) {
      setAlertMessage(t('Please fill all fields'));
      setAlertVisible(true);
      return;
    }

    try {
      const data = {
        id: id,
        role,
        level,
        rate,
        specialization: selectedRole,
        years_experience: yearsOfExperience,
        location,
        available_days: availableDays,
        available_times: availableTimes,
        category,
        guides
      };

      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.put(
        `${apiUrl}/api/expert/growthplan/edit/${id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        await AsyncStorage.setItem('growthPlanFormData', JSON.stringify(data));
        setAlertMessage(t('Growth Plan profile updated successfully'));
      } else {
        setAlertMessage(t('Failed to update growth plan profile'));
      }
    } catch (error) {
      console.error('Error during save:', error); // Log error for debugging
      setAlertMessage(t('Failed to update growth plan profile'));
    }
    setAlertVisible(true);
  };
  
  const addGuide = () => {
    if (guides.length < MAX_GUIDES) {
      setGuides([...guides, { guide: '', percentage: '' }]);
    }
  };

  const updateGuide = (index, key, value) => {
    const newGuides = [...guides];
    newGuides[index][key] = value;
    setGuides(newGuides);
  };

  const deleteGuide = (index) => {
    const newGuides = topics.filter((_, i) => i !== index);
    setGuides(newGuides);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
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
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Create Growth Plan Guide")}</Text>


          </View>

          <View style={styles.navigationContainer}>
              <TouchableOpacity
                  style={styles.navButton}
                  onPress={handleNewGuide}
              >
                  <Text style={styles.navButtonText}>New</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={[styles.navButton, selectedGuideIndex === 1 && styles.disabledNavButton]}
                  onPress={handlePreviousGuide}
                  disabled={selectedGuideIndex === 1}
              >
                  <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={[styles.navButton, selectedGuideIndex === skillAnalysisGuides.length - 1 && styles.disabledNavButton]}
                  onPress={handleNextGuide}
                  disabled={selectedGuideIndex === skillAnalysisGuides.length - 1}
              >
                  <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
          </View>
          
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View style={styles.buttonDue}>
              <Text style={styles.buttonTextDue}>Please fill in all fields</Text>
            </View>
          </View>

          <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 10, marginLeft: 50}}>{level || "Please create"} {selectedRole || ""} profile</Text>

          <View style={styles.container}>
            <View style={styles.row}>
               <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Category")}</Text>
              </View>
               <View style={[styles.cell, { flex: 2}]}>
                <TextInput
                  placeholder="Category"
                  placeholderTextColor="black"
                  style={styles.input}
                  editable={false}
                  value={category || "Update your personal information"}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.cell, { flex: 1 }]}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                  Specialization
                </Text>
              </View>
              <View style={[styles.cell, { flex: 2 }]}>
              <Picker
        selectedValue={selectedRole}  // Use the selected role state
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedRole(itemValue)}  // Update selected role when changed
      >
        {/* Default option when no role is selected */}
        <Picker.Item label="Select a specialization" value="" />

        {selectedRoles.length > 0 ? (
          selectedRoles.map((role, index) => (
            <Picker.Item key={index} label={role} value={role} />  // Dynamically create Picker.Item for each role
          ))
        ) : (
          <Picker.Item label="No specializations available" value="no_roles" />  // Fallback when no roles exist
        )}
      </Picker>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Candidate Starting Level")}</Text>
              </View>
              <View style={[styles.cell, { flex: 2}]}>
                <Picker
                  selectedValue={level}
                  style={styles.picker}
                  onValueChange={(itemValue) => setLevel(itemValue)}
                >
                  <Picker.Item label={t('Beginner')} value="Beginner" />
                  <Picker.Item label={t('Intermediate')} value="Intermediate" />
                  <Picker.Item label={t('Advanced')} value="Advanced" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Rate")}</Text>
              </View>
              <View style={[styles.cell, { flex: 2}]}>
                <TextInput
                  placeholder="$20"
                  placeholderTextColor="black"
                  style={styles.input}
                  editable={false} // Prevent manual input
                />
              </View>
            </View>
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

          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <Text style={{ marginLeft: 50, fontWeight: 'bold', marginTop: 20,}}>{t("My Scoring Guide")}</Text>


          </View>

          <View style={{ flexDirection: 'row'}}>
          <Text style={{ marginLeft: 50, fontWeight: '600', marginTop: 5, fontFamily: "Roboto-Light", fontStyle: "italic" }}>{t("Make use of the guide to jot down questions and notes, helping you facilitate the session more effectively")}</Text>
         
          </View>

                  <View style={styles.container2}>
                    {guides.map((guide, index) => (
                        <View key={index} style={styles.row}>
                          <View style={[styles.cell2, { flex: 0.3, marginTop: 5 }]}>
                            <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t(``)} {index + 1}</Text>
                          </View>
                        <View style={[styles.cell2, { flex: 5 }]}>
                          <TextInput
                            placeholder={t(" ")}
                            placeholderTextColor="grey"
                            style={styles.input2}
                            value={guide.guide}
                            onChangeText={text => updateGuide(index, 'guide', text)}
                          />
                        </View>
                        <View style={[styles.cell2, { flex: 0.5 }]}>
                          <Picker
                            selectedValue={guide.percentage}
                            style={styles.picker2}
                            onValueChange={(itemValue) => updateGuide(index, 'percentage', itemValue)}
                          >
                          <Picker.Item label="Select Score" value="Select Score" />
                            <Picker.Item label="10%" value="10" />
                            <Picker.Item label="20%" value="20" />
                            <Picker.Item label="30%" value="30" />
                            <Picker.Item label="40%" value="40" />
                            <Picker.Item label="50%" value="50" />
                            <Picker.Item label="60%" value="60" />
                            <Picker.Item label="70%" value="70" />
                            <Picker.Item label="80%" value="80" />
                            <Picker.Item label="90%" value="90" />
                            <Picker.Item label="100%" value="100" />
                          </Picker>

                        </View>
                <TouchableOpacity onPress={() => deleteGuide(index)} style={styles.deleteButton}>
                  <Text style={{color: 'grey', fontSize: 14, marginTop: 10, fontWeight: 600}}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.buttonplus, guides.length >= MAX_GUIDES && styles.buttonplusDisabled, isPressed && styles.buttonplusPressed]}
            onPress={addGuide}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={guides.length >= MAX_GUIDES}
          >
            <Text style={styles.buttonTextplus}>Add Item</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={selectedGuideIndex === 0 ? handleSave : handlePut} // Assuming the new guide is always at index 0
            style={styles.buttonsave}
          >
            <Text style={styles.buttonTextsave}>
                {selectedGuideIndex === 0 ? t("Save") : t("Update")} {/* Change text based on context */}
            </Text>
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
    fontSize: 14,
  },
  deleteButton: {
marginTop: 10
  },
  buttonDue: {
    marginLeft: 50,
    marginBottom: 20
  },
  buttonTextDue: {
    color: 'black',
    fontSize: 12,
    fontFamily: "Roboto-Light",
    fontStyle: 'italic'
  },
  buttonplus: {
    backgroundColor: 'white', 
    padding: 10,
    marginLeft: 100, 
    width: 80,
    marginTop: 20,
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
    marginLeft: 720,
    width: 100,
      padding: 10,
    paddingHorizontal: 20,
    marginTop: -35,
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
    fontSize: 22,
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
  navigationContainer: {
    flexDirection: 'row',
    marginLeft: 50,
    marginBottom: 20
  },
  navButton: {
    backgroundColor: '#CEFAD0',
    padding: 10,
    borderRadius: 5,
    width: 100,
    marginRight: 20
  },
  disabledNavButton: {
    backgroundColor: '#f5f5f5',
  },
  navButtonText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default MyComponent;