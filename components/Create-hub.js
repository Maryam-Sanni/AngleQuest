import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, Image, TouchableOpacity, ScrollView, Modal, CheckBox, FlatList  } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from './CustomAlert'; 
import DaysTimePickerModal from "../components/TimePicker3";

const specializationRoles = {
  'Business Analysis': ['Business Analysis'],
  SAP: ['SAP FI', 'SAP MM', 'SAP SD'],
  Scrum: ['Scrum'],
  Microsoft: ['Dynamics Sales', 'Dynamics Customer Service', 'Dynamics Field Service', 'Dynamics CRM Developer', 'Business Central', 'Power Platform Developer', 'Dynamics F&O'],
};

const CustomMultiSelect = ({ items, selectedItems, onSelectedItemsChange }) => {
  const toggleSelection = (id) => {
    // Replace the previous selection with the new one
    if (selectedItems.includes(id)) {
      onSelectedItemsChange([]); // Clear the selection if clicked again (optional)
    } else {
      onSelectedItemsChange([id]); // Only allow one selected item
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
              tintColors={{ true: 'green', false: 'gray' }} // Checkbox colors
              style={styles.checkbox} // Optional styles for the checkbox
            />
            <Text style={selectedItems.includes(item.id) ? styles.selectedText : styles.unselectedText}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};


const CustomTimePicker = ({ initialValue, onChange }) => {
  const [hour, setHour] = useState(initialValue.split(':')[0]);
  const [minute, setMinute] = useState(initialValue.split(':')[1]);
  const [isPM, setIsPM] = useState(initialValue.includes('PM'));
  const [modalVisible, setModalVisible] = useState(false);



  const handleHourChange = (selectedHour) => {
    setHour(selectedHour);
  };

  const handleMinuteChange = (selectedMinute) => {
    setMinute(selectedMinute);
  };

  const handleToggleAMPM = () => {
    setIsPM(!isPM);
  };

  const showTimePicker = () => {
    setModalVisible(true);
  };

  const selectTime = () => {
    const time = `${hour}:${minute} ${isPM ? 'PM' : 'AM'}`;
    onChange(time);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.timeOption} onPress={item.onPress}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1 ).map((hour) => ({
    label: hour.toString(),
    onPress: () => handleHourChange(hour.toString().padStart(2, '0')),
  }));

  const minuteOptions = Array.from({ length: 6 }, (_, i) => i * 10).map((minute) => ({
    label: minute.toString().padStart(2, '0'),
    onPress: () => handleMinuteChange(minute.toString().padStart(2, '0')),
  }));
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()


  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={showTimePicker}>
        <Text>{`${hour}:${minute} ${isPM ? 'PM' : 'AM'}`}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.optionsContainer}>
            <FlatList
              data={hourOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <FlatList
              data={minuteOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
           <View style={styles.ampmContainer}>
            <TouchableOpacity style={[styles.ampmButton, isPM ? styles.selected : null]} onPress={handleToggleAMPM}>
              <Text style={{fontFamily:"Roboto-Light"}}>PM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ampmButton, !isPM ? styles.selected : null]} onPress={handleToggleAMPM}>
              <Text style={{fontFamily:"Roboto-Light"}}>AM</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.selectButton} onPress={selectTime}>
            <Text style={{fontFamily:"Roboto-Light", color: 'white'}}>{t("Apply")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const CreateCoachingHubForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [from, setStartTime] = useState('12:00');
  const [to, setEndTime] = useState('12:00');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true); 
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isSelectVisible, setSelectVisible] = useState(false);
  const [currentSelectedRoles, setCurrentSelectedRoles] = useState(() => {
    // Check if selectedRoles is defined and has a property 'SAP'
    return selectedRoles && selectedRoles['SAP'] ? selectedRoles['SAP'] : []; // Fallback to empty array
  });
   

  // Effect to clear selected roles when specialization changes
  useEffect(() => {
    setCurrentSelectedRoles([]); // Clear roles
  }, [specialization]);

  // Function to handle click on the input box
  const handleInputClick = () => {
    setSelectVisible(prevState => !prevState); // Toggle visibility
  };

  // Update the selected roles and close the select when a change happens
  const handleSelectedItemsChange = (items) => {
    setCurrentSelectedRoles(items);
    onSelectedItemsChange(items); // Call the parent function to update
    setSelectVisible(false); // Close the select after selection
  };


  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };


  const [visibility, setVisibility] = useState('public');
  const [category, setCategory] = useState('');
  const [coaching_hub_name, setGroupName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [skills, setSkills] = useState('Expert');
  const [years_experience, setExperience] = useState('5');
  const [meeting_day, setMeetingDay] = useState(' ');
  const [location, setLocation] = useState('Netherlands');
  const [coaching_hub_goals, setAddgoals] = useState('Goals');
  const [coaching_hub_description, setGroupDescription] = useState('');
  const [coaching_hub_limit, setlimit] = useState('100');
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [objectiveLength, setObjectiveLength] = useState(0);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [level, setLevel] = useState('');
  const [objectives, setObjectives] = useState('');
  const [coaching_hub_fee, setfee] = useState('$40 per meeting');
  const maxDescriptionLength = 200; // Max character limit for description
  const maxObjectiveLength = 250;// Max character limit for objectives
  const [availableDays, setAvailableDays] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

   const apiUrl = process.env.REACT_APP_API_URL;

   const handleConfirm = ({ selectedDay, startTime, endTime }) => {
    // Set the selected day as a single value
    setAvailableDays(selectedDay);  // No need for array check anymore
    setAvailableTimes(`${startTime.hour}:${startTime.minute} ${startTime.period} - ${endTime.hour}:${endTime.minute} ${endTime.period}`);
    setModalVisible(false);
  };  

  const handleDescriptionChange = (text) => {
    if (text.length <= maxDescriptionLength) {
      setGroupDescription(text);
      setDescriptionLength(text.length);
    }
  };

  const handleObjectiveChange = (text) => {
    if (text.length <= maxObjectiveLength) {
      setObjectives(text);
      setObjectiveLength(text.length);
    }
  };

  useEffect(() => {
    // Retrieve first_name and last_name from AsyncStorage
    const retrieveData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('first_name');
        const storedLastName = await AsyncStorage.getItem('last_name');
        if (storedFirstName !== null && storedLastName !== null) {
          console.log('Stored first_name:', storedFirstName);
          console.log('Stored last_name:', storedLastName);
          setFirstName(storedFirstName);
          setLastName(storedLastName);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    retrieveData();
  }, []);

  const getBearerToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Adjust key as per your implementation
      return token;
    } catch (error) {
      console.error('Failed to fetch the token from AsyncStorage', error);
      return null;
    }
  };

  const handleSave = async () => {
    if (!coaching_hub_name || !coaching_hub_description || !coaching_hub_fee || !meeting_day || !from || !to) {
      setAlertMessage(t('Please fill all fields'));
      setAlertVisible(true);
      return;
    }

    try {
      const token = await getBearerToken();
      if (!token) {
        console.error('Bearer token not found');
        return;
      }

      const formData = {
        visibility,
        category: specialization,
        coaching_hub_name,
        specialization: currentSelectedRoles.join(', '),
        years_experience,
        skills,
        location,
        level,
        learning_obj: objectives,
        meeting_day: "day",
        coaching_hub_description,
        from: "from",
        to: "to",
        coaching_hub_fee,
        coaching_hub_goals,
        coaching_hub_limit,
        expert_name: first_name + ' ' + last_name,
        timezone:"timezone"
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        `${apiUrl}/api/expert/hubs/create`,
        formData,
        { headers }
      );

      if (response.status === 201) {
        setAlertMessage(t('Hub created successfully'));
      } else {
        setAlertMessage(t('Failed to create Hub'));
      }
    } catch (error) {
      console.error('Error during save:', error); // Log error for debugging
      setAlertMessage(t('Failed to create Hub'));
    }
    setAlertVisible(true);
  };  

  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
    onClose();
  };

  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()


  return (
    <View style={{ flex: 1, backgroundColor: "white", marginTop: 40, alignItems: 'center'  }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>

    <View style={styles.pageContainer}>
      <View style={styles.formContainer}>
         <Text style={styles.headerText}>{t("Create New Hub")}</Text>
        
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Category")}*</Text>
        <Picker
            selectedValue={specialization}
            value={specialization}
            style={styles.picker}
            onValueChange={(itemValue) => setSpecialization(itemValue)}
          >
            {Object.keys(specializationRoles).map((spec) => (
              <Picker.Item key={spec} label={spec} value={spec} />
            ))}
          </Picker>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Specialization")}*</Text>
        {/* Clickable TextInput */}
        <TouchableOpacity onPress={handleInputClick} style={styles.inputContainer}>
            <TextInput
              style={styles.input2}
              value={
                currentSelectedRoles.length > 0
                  ? currentSelectedRoles.join(', ')
                  : selectedRoles.length > 0
                  ? selectedRoles
                  : 'Select specialization...'}
              editable={false} // Make it non-editable
            />
         
            <Image
              source={{ uri: 'https://img.icons8.com/?size=100&id=39942&format=png&color=000000' }} // Use the provided icon link
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          
          {/* Conditionally render CustomMultiSelect */}
          {isSelectVisible && specialization && specializationRoles[specialization] && (
            <CustomMultiSelect
              items={specializationRoles[specialization].map((role) => ({ id: role, name: role }))}
              selectedItems={currentSelectedRoles}
              onSelectedItemsChange={handleSelectedItemsChange} // Update selected roles
            />
          )}
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Training Hub Name")}*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter hub name"
          value={coaching_hub_name}
          onChangeText={text => setGroupName(text)}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Training Hub Overview")}* ({maxDescriptionLength - descriptionLength} characters remaining)</Text>
        <TextInput
          style={[styles.input, { height: 120 }]}
          placeholder= {t("The overview of this training is to...")}
          multiline
          value={coaching_hub_description}
          onChangeText={handleDescriptionChange}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Training Hub Fee")} (per meeting)</Text>
        <TextInput
          style={styles.input}
          placeholder="$40"
          value={coaching_hub_fee}
          onChangeText={text => setfee(text)}
          editable={false}
        />

<Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Training Hub Objectives")}* ({maxObjectiveLength - objectiveLength} characters remaining)</Text>
        <TextInput
          style={[styles.input, { height: 120 }]}
          placeholder= {t("At the end of this training...")}
          multiline
          value={objectives}
          onChangeText={handleObjectiveChange}
        />

               <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Training Level")}*</Text> 
        <Picker
                  selectedValue={level}
                  style={styles.picker}
                  onValueChange={(itemValue) => setLevel(itemValue)}
                >
                  <Picker.Item label={t('Beginner')} value="Beginner" />
                  <Picker.Item label={t('Intermediate')} value="Intermediate" />
                  <Picker.Item label={t('Advanced')} value="Advanced" />
                </Picker>

        
      
        <TouchableOpacity
          style={{ backgroundColor: 'coral', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 25, marginBottom: 30 }}
          onPress={handleSave}
        >
          <Text style={{ color: 'white', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Create New Hub")}</Text>
        </TouchableOpacity>
      </View>
      </View>
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
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  scrollContainer: {
    flexGrow: 1,
    maxHeight: 500
  },
  formContainer: {
    width: '80%',
    paddingHorizontal: 5,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  picker: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  greenBox: {
    width: 820,
    height:850,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  timecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeformContainer: {
    width: '100%',
  },
  timelabel: {
    fontWeight: '600',
    marginBottom: 2,
    marginTop: 10,
    fontSize: 14,
    fontStyle: 'italic',
    fontFamily:"Roboto-Light",

  },
  modalContainer: {
    backgroundColor: '#F8F8F8',
    marginTop: 'auto',
    marginBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignSelf: 'center'
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  ampmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ampmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  selected: {
    backgroundColor: '#135837',
    fontColor: 'white'
  },
  selectButton: {
    backgroundColor: '#135837',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    },
    multiSelect: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
    },
    container2: {
      backgroundColor: '#F5F5F5', // Background color of the FlatList
      borderColor: '#ccc', // Border color
      borderWidth: 1, 
      borderBottomRadius: 5,
      padding: 5,
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
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginTop: 5
    },
    arrowIcon: {
      width: 10, // Set the desired width
      height: 10, // Set the desired height
      marginLeft: 10, // Space between input and icon
    },
    input2: {
      flex: 1,
      fontSize: 16,
      paddingRight: 30, // Add padding to prevent text overlapping with the arrow
    },
    container: {
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#CCC',
    },
});

export default CreateCoachingHubForm;
