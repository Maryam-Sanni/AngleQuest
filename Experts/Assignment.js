import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image, ScrollView, Picker, Modal } from 'react-native';
import OpenModal from './GradeAssignmentList';
import DateTimePickerModal from "../components/TimePicker4";
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';
import MultiSelect from 'react-native-multiple-select';
import { api_url, AuthContext } from '../Messaging/AuthProvider';
import moment from 'moment';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDateTimeModalVisible, setIsDateTimeModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');     
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hubMembers, setHubMembers] = useState([]);
  const [groupName, setGroupName] = useState('');
   const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleConfirmDateTime = (date, time) => {
    setSelectedDateTime(date);
    setSelectedTime(time);
    setIsDateTimeModalVisible(false);
  };

  const handleCancelDateTimeModal = () => {
    setIsDateTimeModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };
  
  const formatTime = (time) => {
    if (!time) return "No time selected";
    return time; // You can further customize this function if needed
  };

  const handleMeetingSelect = (itemValue) => {
    const selected = meetings.find((meeting) => meeting.id === itemValue);
    setSelectedMeeting(selected);
  };
  
  useEffect(() => {
      const loadFormData = async () => {
          try {
              const token = await AsyncStorage.getItem('token');
              if (!token) throw new Error('No token found');

              const hubId = await AsyncStorage.getItem('hub_id'); // Retrieve hub_id from AsyncStorage
              if (!hubId) throw new Error('No hub_id found');

              // Fetch new hub meetings data
              const hubResponse = await axios.get(`${apiUrl}/api/expert/newhubmeeting/get`, {
                  headers: { Authorization: `Bearer ${token}` },
              });

              if (hubResponse.status === 200 && hubResponse.data.status === 'success') {
                  const meetings = hubResponse.data.NewMeeting;

                  // Filter meetings based on the hub_id from AsyncStorage
                  const hubMeetings = meetings
                      .filter(meeting => meeting.hub_id.toString() === hubId)
                      .map(meeting => ({
                          id: meeting.id,
                          description: meeting.meeting_topic || "Untitled Meeting",
                          meetingDate: moment(meeting.date).format('MMMM Do YYYY, h:mm A'),
                      }));

                  setMeetings(hubMeetings);

                  // Set group name, assuming coaching_hub_name is stored in AsyncStorage
                  const coachingHubName = await AsyncStorage.getItem('coaching_hub_name');
                  setGroupName(coachingHubName || '');
              } else {
                  console.error('Failed to fetch hub meeting data', hubResponse);
              }
          } catch (error) {
              console.error('Failed to load form data', error);
          }
      };

      loadFormData();
  }, []);
  
  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      if (!token) {
        alert('No token found');
        return;
      }

      // Map selected member IDs to names
      const selectedNames = selectedMembers.map(id => {
          const member = hubMembers.find(member => member.id === id);
          return member ? member.name : id;
      });


      const formData = {
        hub_member: selectedMeeting,
        topic: "topic",
        description: description,
        assignment_due: selectedDateTime,
        hub_name: groupName,
        assignment_response: "Pending"
      };

      const response = await axios.post(`${apiUrl}/api/expert/newassignment/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setAlertMessage(t('Assignment created successfully'));
      } else {
        setAlertMessage(t('Failed to create Assignment'));
      }
    } catch (error) {
      console.error('Error during save:', error);
      setAlertMessage(t('Failed to create Assignment'));
    }
    setAlertVisible(true);
  }; 

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();
 
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${apiUrl}/api/expert/getAllJobSeekers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = response.data.allJobSeekers.map((jobSeeker) => ({
        id: jobSeeker.id.toString(),
        name: `${jobSeeker.first_name} ${jobSeeker.last_name}`,
      }));

      console.log('Fetched members:', result); // Add this line

      setHubMembers(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    // Fetch the members directly when the component mounts
    fetchData();
  }, []);



  useEffect(() => {
    const saveSelectedMembers = async () => {
      try {
        await AsyncStorage.setItem('selectedMembers', JSON.stringify(selectedMembers));
      } catch (error) {
        console.error('Failed to save selected members:', error);
      }
    };

    saveSelectedMembers();
  }, [selectedMembers]);

  return (
    <View style={{  flex: 1, marginTop: 40, backgroundColor: "#F8F8F8", alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
      <View style={styles.greenBox}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("New Assessment")} for {groupName ? `${groupName}` : 'Loading...'}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
           
          </View>

          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 10, marginBottom: 5, fontFamily: "Roboto-Light" }}>
            Select a meeting for assesment
          </Text>
          {meetings.length > 0 ? (
            <Picker
                selectedValue={selectedMeeting?.id}
                style={styles.input}
                onValueChange={(itemValue) => handleMeetingSelect(itemValue)}
            >
                <Picker.Item label="Select a meeting" value={null} />
                {meetings.map((meeting) => (
                    <Picker.Item 
                        key={meeting.id} 
                        label={meeting.description} 
                        value={meeting.id} 
                    />
                ))}
            </Picker>
          ) : (
            <Text style={{ fontWeight: '500', marginLeft: 50, fontSize: 16 }}>
                No meetings available for this hub.
            </Text>
          )}

          
          

          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
            {t("Assessment Description")}
          </Text>
          <TextInput
            placeholder=" "
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={[styles.input, { height: 100 }]}
            multiline
          />

          <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
            {t("Assessment Due")}
          </Text>
          <TouchableOpacity onPress={() => setIsDateTimeModalVisible(true)}>
  <Text style={styles.input}>
    <Text style={{ fontWeight: '500', fontFamily: "Roboto-Light" }}>Date: </Text>
    {selectedDateTime 
      ? `${selectedDateTime.toDateString()} ${formatTime(selectedTime)}`
      : t("No date selected")}
  </Text>
</TouchableOpacity>


        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.buttonplus}>
          <Text style={styles.buttonTextplus}>{t("Send")}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDateTimeModalVisible}
        onConfirm={handleConfirmDateTime}
        onCancel={handleCancelDateTimeModal}
      />
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
      <CustomAlert
        visible={alertVisible}
        title={t("Alert")}
        message={alertMessage}
        onConfirm={hideAlert}
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
    marginLeft: 100,
  },
  greenBox: {
    width: 1000,
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: '80%',
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
    marginBottom: 100,
    marginTop: 30,
    width: 100,
    marginLeft: 770,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light"
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
    fontFamily: "Roboto-Light"
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
  multiSelectContainer: {
    marginLeft: 25,
    marginRight: 65,
  },
  multiSelectContainerExpanded: {
    height: 200,
  },
  multiSelectInputGroup: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#206C00',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5
  },
  multiSelectDropdown: {
    maxHeight: 150,
  },
  multiSelectSearchInput: {
    height: 40,
    padding: 20,
    borderWidth: 1,
    borderColor: '#206C00',
    fontSize: 20
  },
  multiSelectText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10
  },
  meetingItem: {
    padding: 15,
    marginLeft: 50,
    marginRight: 130,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedItem: {
    backgroundColor: '#d3f9d8', // Light green background for selected item
  },
  meetingDescription: {
    fontSize: 16,
    fontWeight: '600',
  },
  meetingDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyComponent;
