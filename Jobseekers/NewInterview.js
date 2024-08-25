  import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Modal } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import DateTimePickerModal from "../components/DateTimePickerModal";
  import { useFonts } from "expo-font";
  import { useTranslation } from 'react-i18next';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  import CustomAlert from '../components/CustomAlert';
  import { format } from 'date-fns';

  function MyComponent({ onClose }) {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [cv, setCV] = useState(null);
    const [job_description_file, setJobFile] = useState(null);
    const [job_description_text, setjobText] = useState("Write your description here");
    const [token, setToken] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [expert_available_days, setExpertAvailableDays] = useState('');
    const [expert_available_time, setExpertAvailableTime] = useState('');
    const [expert, setExpert] = useState('');
    const [candidate, setCandidate] = useState("Individual");
    const [expertid, setExpertid] = useState("");
     const [meetingtype, setType] = useState("interview");
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

    const handleConfirmDateTime = (dateTime) => {
      setSelectedDateTime(dateTime);
      setIsModalVisible(false);
    };

    const handleCancelModal = () => {
      setIsModalVisible(false);
    };

    const handleChooseImage = (setter) => (event) => {
      const selectedFile = event.target.files[0];
      setter(selectedFile);
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

        const goToPlan = async () => {
          try {
            if (!company || !role || !cv || !job_description_file || !selectedDateTime) {
              setAlertMessage('Please fill all fields');
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
              onClose();
              return;
            }
        
        const formData = new FormData();
        formData.append('company', company);
        formData.append('role', role);
        formData.append('cv', cv);
        formData.append('job_description_file', job_description_file);
        formData.append('job_description_text', job_description_text);
        formData.append('date_time', formattedDate);
        formData.append('expert_available_days', expert_available_days);
        formData.append('expert_available_time', expert_available_time);
        formData.append('expert_name', expert);
        formData.append('expertid', expertid);
        formData.append('name', first_name  + ' ' + last_name);


            // Make the GET request to check the subscription status
            const subscriptionResponse = await axios.get(
                'https://recruitangle.com/api/jobseeker/get-subscription',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Check if JSSubscriptionStatus exists and if subscribed is "Yes"
            const subscribed = subscriptionResponse?.data?.JSSubscriptionStatus?.subscribed;

        // Save the growth plan regardless of the subscription status
        const response = await axios.post(
          'https://recruitangle.com/api/jobseeker/create-jobseeker-interview', 
          formData, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          await AsyncStorage.setItem('InterviewFormData', JSON.stringify(formData));

          // Navigate based on the subscription status
          if (subscribed === 'Yes') {
            navigation.navigate('Interview Sessions');
          } else {
            navigation.navigate('Interview Offer');
          }

          onClose(); // Close the form/modal
        }
      } catch (error) {
        console.error('Error during save:', error);
        setAlertMessage('Failed to create Interview Session');
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
      return null;
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
              <Text style={styles.headerText}>{t("Interview Booking")}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 20, marginLeft: 50, fontFamily: "Roboto-Light" }}>{t("Job Information")}</Text>
            <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Company")}</Text>
                </View>
                <View style={styles.cell}>
                  <TextInput
                    placeholder="ASML"
                    placeholderTextColor="grey"
                    style={styles.input}
                    value={company}
                    onChangeText={setCompany}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Role")}</Text>
                </View>
                <View style={styles.cell}>
                  <TextInput
                    placeholder={t("Data Analyst")}
                    placeholderTextColor="grey"
                    style={styles.input}
                    value={role}
                    onChangeText={setRole}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Your CV")}</Text>
                </View>
                <View style={styles.cell}>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleChooseImage(setCV)}
                    style={{ marginTop: 5 }}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Job Description")}</Text>
                </View>
                <View style={styles.cell}>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleChooseImage(setJobFile)}
                    style={{ marginTop: 5 }}
                  />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Job Description text (optional)")}</Text>
                </View>
                <View style={styles.cell}>
                  <TextInput
                    placeholder={t("This is my job description")}
                    placeholderTextColor="grey"
                    multiline
                    style={[styles.input, { height: 100 }]}
                    value={job_description_text}
                    onChangeText={setjobText}
                  />
                </View>
              </View>
             
            </View>
            <Text style={{ fontSize: 15, color: 'black',  fontWeight: '500', marginTop: 30, marginBottom: 5, marginLeft: 50, }}>{t("Expert's available days and time")}</Text>
            <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Days")}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>{expert_available_days}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Time")}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>{expert_available_time}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Expert")}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>{expert}</Text>
                </View>
              </View>
            </View>

             <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 30, marginBottom: 5, marginLeft: 50, marginRight: 50 }}>{t("Select date and time for interview session.")} {expert} is available {expert_available_days} {expert_available_time}</Text>
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
                    <Text style={{ fontFamily: "Roboto-Light" }}>
                      {selectedDateTime
                        ? selectedDateTime.toLocaleString()
                        : t("Select Date and Time")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={goToPlan} style={styles.buttonplus}>
              <Text style={styles.buttonTextplus}>{t("Continue")}</Text>
            </TouchableOpacity>
            
          </View>
        </ScrollView>
        <CustomAlert
          visible={alertVisible}
          title={t("Alert")}
          message={alertMessage}
          onConfirm={hideAlert}
        />
        <DateTimePickerModal
          isVisible={isModalVisible}
          onConfirm={handleConfirmDateTime}
          onCancel={handleCancelModal}
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
  },
  buttonplus: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 5,
    marginLeft: 750,
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
  input: {
    outline: 'black',
    borderColor: 'black',
    borderWidth: 1
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
    color: '#3F5637',
    fontFamily: "Roboto-Light"
  }
});

export default MyComponent;