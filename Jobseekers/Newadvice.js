import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "../components/DateTimePickerModal";
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';
import { format } from 'date-fns';

function MyComponent({ onClose }) {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const [type, setType] = useState("Optimize Productivity");
  const [role, setRole] = useState("");
  const [challenge, setChallenge] = useState("");
  const [startingLevel, setStartingLevel] = useState("Zero");
  const [targetLevel, setTargetLevel] = useState("Medior");
  const [status, setStatus] = useState("Active");
  const [token, setToken] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [expert_available_days, setExpertAvailableDays] = useState(' ');
  const [expert_available_time, setExpertAvailableTime] = useState(' ');
  const [expert, setExpert] = useState(' ');
  const [candidate, setCandidate] = useState("Individual");
  const [expertid, setExpertid] = useState(" ");
   const [meetingtype, setmeetType] = useState("advice");
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

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
  
  useEffect(() => {
    const getTokenAndUser = async () => {
      try {
        // Retrieve token and user data from AsyncStorage
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);

        const storedFirstName = await AsyncStorage.getItem('selectedUserFirstName');
        const storedLastName = await AsyncStorage.getItem('selectedUserLastName');
        const storedExpertid = await AsyncStorage.getItem('selectedUserExpertid');
        const storedDays = await AsyncStorage.getItem('selectedUserDays');
        const storedTimes = await AsyncStorage.getItem('selectedUserTimes');

        if (storedFirstName && storedLastName) {
          setExpert(`${storedFirstName} ${storedLastName}`);
          setExpertid(`${storedExpertid}`);
          setExpertAvailableDays(`${storedDays}`);
          setExpertAvailableTime(`${storedTimes}`);
          
        } else {
          console.warn('No user data found');
        }
      } catch (error) {
        console.error('Error retrieving token or user:', error);
      }
    };

    getTokenAndUser();
  }, []);
  
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    getToken();
  }, []);

  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const goToPlan = async () => {
    try {
      // Validate the form data before making the API request
      if ( !role || !challenge || !targetLevel || !selectedDateTime) {
      setAlertMessage(t('Please fill all fields'));
        setAlertVisible(true);
        return;
      }

      // Format selectedDateTime to Y-m-d H:i:s
      const formattedDate = format(selectedDateTime, "yyyy-MM-dd HH:mm:ss");

      const meetingFormData = new FormData();
      meetingFormData.append('candidate_account_type', candidate);
      meetingFormData.append('role', role);
      meetingFormData.append('expert_id', expertid); 
      meetingFormData.append('type', meetingtype);
      meetingFormData.append('date_scheduled', formattedDate);

      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      // Post to create-jobseeker-interview endpoint
      const MeetingResponse = await axios.post(
        'https://recruitangle.com/api/jobseeker/meetings/schedule',
        meetingFormData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );

      if (MeetingResponse.status !== 200) {
        navigation.navigate('Advice Offer');
        onClose();
        return;
      }
      
      // Prepare the data for the API request
      const formData = {
        type,
        role,
        description: challenge,
        starting_level: startingLevel,
        target_level: targetLevel,
        status,
        date_time: selectedDateTime,
        expert_available_days,
        expert_available_time,
        expert_name: expert,
        expertid: expertid,
        name: first_name  + ' ' + last_name
      };

      // Make the GET request to check the subscription status
      const subscriptionResponse = await axios.get(
          'https://recruitangle.com/api/jobseeker/get-subscription',
          { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check if JSSubscriptionStatus exists and if subscribed is "Yes"
      const subscribed = subscriptionResponse?.data?.JSSubscriptionStatus?.subscribed;

          // Save the growth plan regardless of the subscription status
          const response = await axios.post(
            'https://recruitangle.com/api/jobseeker/create-jobseeker-skill-analysis', 
            formData, 
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.status === 201) {
            await AsyncStorage.setItem('SkillAnalysisFormData', JSON.stringify(formData));

            // Navigate based on the subscription status
            if (subscribed === 'Yes') {
              navigation.navigate('Advice Sessions');
            } else {
              navigation.navigate('Advice Offer');
            }

                  onClose(); // Close the form/modal
                }
              } catch (error) {
                console.error('Error during save:', error);
                setAlertMessage('Failed to create Skill Analysis Session');
                setAlertVisible(true);
              }
            };

    

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if you want
  }

  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Create New Skill Analysis Session")}</Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Type")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={type}
                  style={styles.picker}
                  onValueChange={(itemValue) => setType(itemValue)}
                >
                   <Picker.Item label={t("Optimize Productivity")} value="Optimize Productivity" />
                  <Picker.Item label={t("Career Change")} value="Career Change" />
                  <Picker.Item label={t("Getting a raise")} value="Getting a raise" />
                  <Picker.Item label={t("New Skill Acquisition")} value="New Skill Acquisition" />
                   <Picker.Item label={t("Role Transition")} value="Role Transition" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Role")}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t("Example: SAP FI")}
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={role}
                  onChangeText={setRole}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Tell us why you are taking this step")}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t("Example: ‘Changing to SAP FI because of the direction of the job market’")}
                  placeholderTextColor="grey"
                  multiline
                  style={[styles.input, { height: 100 }]}
                  value={challenge}
                  onChangeText={setChallenge}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Rate your current level")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={startingLevel}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStartingLevel(itemValue)}
                >
                   <Picker.Item label={t("Zero")} value="Zero" />
                  <Picker.Item label={t("Beginner")} value="Beginner" />
                  <Picker.Item label={t("Junior")} value="Junior" />
                  <Picker.Item label={t("Intermediate")} value="Intermediate" />
                  <Picker.Item label={t("Senior")} value="Senior" />
                  <Picker.Item label={t("Solution Architect")} value="Solution Architect" />
                  <Picker.Item label={t("Manager")} value="Manager" />
                  <Picker.Item label={t("Senior Manager")} value="Senior Manager" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Desired target level")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={targetLevel}
                  style={styles.picker}
                  onValueChange={(itemValue) => setTargetLevel(itemValue)}
                >
                  <Picker.Item label={t("Beginner")} value="Beginner" />
                  <Picker.Item label={t("Junior")} value="Junior" />
                  <Picker.Item label={t("Intermediate")} value="Intermediate" />
                  <Picker.Item label={t("Senior")} value="Senior" />
                  <Picker.Item label={t("Solution Architect")} value="Solution Architect" />
                  <Picker.Item label={t("Manager")} value="Manager" />
                  <Picker.Item label={t("Senior Manager")} value="Senior Manager" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Status")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={status}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStatus(itemValue)}
                >
                  <Picker.Item label={t("Active")} value="Active" />
                </Picker>
              </View>
            </View>
           
            </View>
          
            <Text style={{ fontSize: 15, color: 'black',  fontWeight: '500', marginTop: 30, marginBottom: -10, marginLeft: 50, }}>{expert}'s {t("available days and time")}</Text>
            <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Days")}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>
                    {expert_available_days}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>Time</Text>
                </View>
                <View style={styles.cell}><Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>{expert_available_time}
                  </Text>
                </View>
              </View>
            </View>
           <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 30, marginBottom: -10, marginLeft: 50, marginRight: 50 }}>{t("Select day and time for skill analysis session.")}</Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Date and Time")}</Text>
              </View>
              <View style={styles.cell}>
                <TouchableOpacity
                  style={styles.dateTimeButton}
                  onPress={() => setIsModalVisible(true)}
                >
                  <Text style={{ fontFamily: "Roboto-Light", color: 'blue', textDecorationLine: 'underline' }}>
                    {selectedDateTime
                      ? selectedDateTime.toLocaleString()
                      : t("Select Date and Time")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
              <TouchableOpacity style={styles.buttonplus} onPress={goToPlan}>
                <Text style={styles.buttonTextplus}>{t("Save")}</Text>
              </TouchableOpacity>
            
          
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isModalVisible}
        mode="datetime"
        onConfirm={handleConfirmDateTime}
        onCancel={handleCancelModal}
      />
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
    marginTop: 20,
    marginLeft: 50,
  },
  greenBox: {
    width: 920,
    height: '100%',
    backgroundColor: '#F8F8F8',
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
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1,
    color: 'grey',
    fontSize: 14,
  },
  buttonplus: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 5,
    marginLeft: 750,
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    fontSize: 14,
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
    fontFamily: 'Roboto-Light',
  },
});

export default MyComponent;
