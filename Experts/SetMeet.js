import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image, Picker, TextInput, FlatList, ActivityIndicator } from 'react-native';
import DateTimePickerModal from "../components/TimePicker4";
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';
import { format } from 'date-fns';
import { CheckBox } from 'react-native-elements';
import { duration } from 'moment-timezone';
import moment from 'moment';


function MyComponent({ onClose }) {
  const [isDateTimeModalVisible, setIsDateTimeModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')     
  const [isVisible, setIsVisible] = useState(true);
  const [candidate, setCandidate] = useState("expert");
  const [expertid, setExpertid] = useState(" ");
   const [meetingtype, setType] = useState("hub");
   const [loading, setLoading] = useState(false);
  const [hubs, setHubs] = useState([]);
  const [selectedHubId, setSelectedHubId] = useState(null);
  const [selectedHubs, setSelectedHubs] = useState({});
  const [duration, setDuration] = useState(1);
  const [learningObj, setLearningObj] = useState(null);
  const [materialFiles, setMaterialFiles] = useState([]);
  const [submitloading, setSubmitLoading] = useState(false);
  const [hubId, setHubId] = useState('');
  const [hubName, setHubName] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  const fileInputRef = React.createRef();

const handleFileUpload = () => {
  fileInputRef.current.click(); // Trigger the file input click
};

const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  setMaterialFiles(files); // Store the selected files in state
};

  useEffect(() => {
      const loadHubData = async () => {
          try {
              const storedHubId = await AsyncStorage.getItem('hub_id');
              const storedHubName = await AsyncStorage.getItem('coaching_hub_name');

              if (storedHubId !== null) {
                  setHubId(storedHubId);
              }
              if (storedHubName !== null) {
                  setHubName(storedHubName);
              }
          } catch (error) {
              console.error("Error loading hub data from AsyncStorage", error);
          }
      };

      loadHubData();
  }, []);


  useEffect(() => {
    const fetchHubs = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/expert/hubs/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHubs(response.data.NewHub);
      } catch (error) {
        console.error("Failed to fetch hubs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHubs();
  }, []);
  
  const toggleHubSelection = (id, coaching_hub_name, learning_obj) => {
    // If the selected hub is already selected, deselect it
    if (selectedHubId === id) {
      setSelectedHubId(null);
      setLearningObj(null);
    } else {
      // Select the new hub
      setSelectedHubId(id);
      setLearningObj(learning_obj);
    }
  };


  // useEffect to retrieve the expert id from AsyncStorage
  useEffect(() => {
    const getExpertId = async () => {
      try {
        const storedExpertId = await AsyncStorage.getItem('user_id');
        if (storedExpertId) {
          setExpertid(storedExpertId);
        }
      } catch (error) {
        console.error('Failed to load expert ID from AsyncStorage', error);
      }
    };

    getExpertId();
  }, []);
  
  const handleConfirmDateTime = (date, time) => {
    setSelectedDateTime(date);
    setSelectedTime(time);
    setIsDateTimeModalVisible(false);
  };

  const handleCancelDateTimeModal = () => {
    setIsDateTimeModalVisible(false);
  };

  const handleSubmit = async () => {

    setSubmitLoading(true);

    try {
      const token = await AsyncStorage.getItem('token'); 
      if (!token) {
        alert('No token found');
        return;
      }
  
      const formattedDate = format(selectedDateTime, "yyyy-MM-dd HH:mm:ss");
      
      // Prepare the initial meeting data
      const meetingFormData = new FormData();
      meetingFormData.append('candidate_account_type', candidate);
      meetingFormData.append('role', topic);
      meetingFormData.append('expert_id', expertid);
      meetingFormData.append('type', meetingtype);
      meetingFormData.append('date_scheduled', formattedDate);
  
      // Post to create-jobseeker-interview endpoint
      const MeetingResponse = await axios.post(
        `${apiUrl}/api/jobseeker/meetings/schedule`,
        meetingFormData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );
  
      if (MeetingResponse.status !== 200) {
        onClose();
        return;
      }

      const formattedTime = moment(selectedDateTime).format('YYYY-MM-DD HH:mm:ss');
      
      const formData = new FormData(); // Create a new FormData object
  
      formData.append('meeting_topic', topic);
      formData.append('meeting_description', description);
      formData.append('date', formattedTime);
      formData.append('time', selectedDateTime);
      formData.append('hub_id', hubId);
      formData.append('roles', candidate);
      formData.append('duration', duration);
      formData.append('learning_obj', learningObj);
  
      // Add the material files to the formData
      materialFiles.forEach((file) => {
        formData.append('material_hubs', file); // Append each file to material_hubs
      });

  
      // Make the second API call
      const response = await axios.post(`${apiUrl}/api/expert/newhubmeeting/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Change to multipart/form-data for file uploads
        },
      });
  
      console.log('Response:', response); // Log the response
      if (response.status === 201) {
        setAlertMessage(t('Meeting created successfully'));
      } else {
        setAlertMessage(t('Failed to create Meeting'));
      }
    } catch (error) {
      console.error('Error during save:', error); // Log error for debugging
      if (error.response) {
        console.error('Response error data:', error.response.data); // Log server response error
      }
      setAlertMessage(t('Failed to create Meeting'));
    }
    setAlertVisible(true);
    setSubmitLoading(false);
  };
  
  
  const hideAlert = () => {
    setAlertVisible(false);
    // Ensure this does not inadvertently close the page
    setIsVisible(false);
  };

  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })

        const {t}=useTranslation()

  return (
        <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={styles.greenBox}>
            <View style={styles.header}>
            <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>{t("Knowledge Sharing Session")}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <Text style={{ fontSize: 16, marginLeft: 50, marginBottom: 10, fontWeight: 'bold' }}>
                 {hubName} Session
              </Text>

            
              <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
              {t("Meeting Topic *")}
            </Text>
            <TextInput
              placeholder=" "
              value={topic}
              onChangeText={(text) => setTopic(text)}
              style={styles.input}
            />

<Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
              {t("Meeting Description *")}
            </Text>
            <TextInput
              placeholder=" "
              value={description}
              onChangeText={(text) => setDescription(text)}
              style={[styles.input, styles.multilineInput]}
              multiline
            />

<Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily:"Roboto-Light" }}>
  {t("Date *")}
</Text>
<TouchableOpacity onPress={() => setIsDateTimeModalVisible(true)}>
  <Text style={styles.input}>
    <Text style={{ fontWeight: '500', fontFamily: "Roboto-Light" }}>Date: </Text>
    {selectedDateTime ? selectedDateTime.toDateString() : t("Select Date")} {/* Format Date here */}
  </Text>
</TouchableOpacity>

<Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 10, marginBottom: 10, fontFamily: "Roboto-Light" }}>
  {t("Time *")}
</Text>
<Text style={styles.input}>
  <Text style={{ fontWeight: '500', fontFamily: "Roboto-Light" }}>Time: </Text> 
  {selectedTime || t("Select Time")}
</Text>
<Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 10, marginBottom: 10, fontFamily: "Roboto-Light" }}>
  {t("Duration")}
</Text>
<Picker
        selectedValue={duration}
        style={styles.input}
        onValueChange={(itemValue) => setDuration(itemValue)}
      >
        {/* Map through numbers 1-5 */}
        {[1, 2, 3, 4, 5].map((hour) => (
          <Picker.Item key={hour} label={`${hour} hr`} value={hour} />
        ))}
      </Picker>

<Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 10, marginBottom: 10, fontFamily: "Roboto-Light" }}>
  {t("Learning Materials: Upload File")}
</Text>
<TouchableOpacity onPress={handleFileUpload} style={styles.input}>
  <Text style={{fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Upload Learning Materials:")}</Text>
</TouchableOpacity>
<input
  type="file"
  onChange={handleFileChange}
  multiple // Allows multiple files
  style={{ display: 'none' }} // Hide the input element
  ref={fileInputRef} // Create a ref to trigger the file input
/>

            </View>
            <TouchableOpacity 
    onPress={submitloading ? null : handleSubmit} 
    style={[styles.buttonplus, submitloading && styles.buttonDisabled]} // Add a style for a disabled button
    disabled={submitloading} // Disable button if submitloading is true
>
    <Text style={styles.buttonTextplus}>
        {submitloading ? t("Loading...") : t("Create Meeting")}
    </Text>
</TouchableOpacity>

          </View>
       
          <CustomAlert
  visible={alertVisible}
  title={t("Alert")}
  message={alertMessage}
  onConfirm={hideAlert}
/>

      <DateTimePickerModal
        isVisible={isDateTimeModalVisible}
        onConfirm={handleConfirmDateTime}
        onCancel={handleCancelDateTimeModal}
      />
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
  container: {
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 100,
  },
  greenBox: {
    width: 1000,
    backgroundColor: '#F8F8F8',
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 30,
    width: 150,
    marginBottom: 50,
    marginLeft: 720,
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
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
    fontFamily:"Roboto-Light"
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  multilineInput: {
    height: 80,
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  hubContainer: {
    marginHorizontal: 5,
  },
  hubCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row', 
  },
  hubText: {
    fontSize: 14,
    marginRight: 5, // Space between text and checkbox
  },
  selectedHubsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  selectedHubsTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectedHubText: {
    fontSize: 16,
    color: '#206C00',
  },
  fileUploadButton: {
    backgroundColor: 'coral',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  
  fileUploadButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light",
  },
  buttonDisabled: {
    backgroundColor: 'gray', // Change to any color you want for the disabled state
    opacity: 0.5, // Optional: makes the button look faded
},
});

export default MyComponent; 