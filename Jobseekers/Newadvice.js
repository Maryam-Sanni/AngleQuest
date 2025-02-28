import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Modal, Alert, ActivityIndicator } from 'react-native';
import { useNavigate } from 'react-router-dom';
import DateTimePickerModal from "../components/DateTimePickerModal";
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import PaymentDetails from './PaymentDetails';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';
import { format } from 'date-fns';
import OpenModal from '../components/Payment';
 
function MyComponent({ onClose }) {
   const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [type, setType] = useState("Optimize Productivity");
  const [role, setRole] = useState("");
  const [challenge, setChallenge] = useState("Changing to a new career path due to industry shifts");
  const [startingLevel, setStartingLevel] = useState("Beginner");
  const [targetLevel, setTargetLevel] = useState("Junior");
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
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);
      const [paymentRequired, setPaymentRequired] = useState(false);
      const [specialization, setSpecialization] = useState('');

      // Get user's timezone
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchPaymentDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found');
                return;
            }

            const response = await fetch(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            // Check if "Pay as you go" is set in the response
            if (data?.PaystackDetail?.payment_detail === 'Pay as you go') {
                setPaymentRequired(true);
            }

            // Set the specialization from the response
            if (data?.PaystackDetail?.specialization) {
              setRole(data.PaystackDetail.specialization);
            }

        } catch (error) {
            console.error('Error fetching payment details:', error);
        }
    };

    fetchPaymentDetails();
}, []); // Empty dependency array to run this effect only once on mount

const [isLoading, setIsLoading] = useState(false);
const [email, setEmail] = useState(false);
const initiatePayment = async () => {
  try {
    // Retrieve values from AsyncStorage
    const values = await AsyncStorage.multiGet(['first_name', 'last_name', 'email']);
    const firstName = values.find(item => item[0] === 'first_name')?.[1] || "";
    const lastName = values.find(item => item[0] === 'last_name')?.[1] || "";
    const email = values.find(item => item[0] === 'email')?.[1] || "";

    // Combine first and last name
    const fullName = `${firstName} ${lastName}`;
    setEmail(email);

    // Get token from AsyncStorage for authorization
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "Authorization token not found.");
      return false; // Indicate failure
    }

    // Fetch payment details from backend
    const paymentDetailsResponse = await axios.get(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Check if response is successful
    if (paymentDetailsResponse?.data?.status !== "success") {
      Alert.alert("Error", "Failed to retrieve payment details.");
      return false; // Indicate failure
    }

    // Extract and parse card details
    const rawCardDetails = paymentDetailsResponse.data.PaystackDetail.card_detail;
    console.log("Raw Card Details:", rawCardDetails); // Debugging

    // Check if rawCardDetails exists and is a valid JSON string
    let cardDetailsArray;
    try {
      cardDetailsArray = JSON.parse(rawCardDetails);
    } catch (parseError) {
      console.error("Error parsing card details:", parseError);
      Alert.alert("Error", "Failed to parse card details.");
      return false;
    }

    // Ensure we have at least one card
    if (!Array.isArray(cardDetailsArray) || cardDetailsArray.length === 0) {
      Alert.alert("Error", "No card details found.");
      return false;
    }

    const cardDetails = cardDetailsArray[0]; // Get first card
    console.log("Extracted Card Details:", cardDetails);

    // Extract expiry month and year correctly
    const [expMonth, expYear] = cardDetails.exp_date.split("/");

    // Construct payment payload
    const paymentPayload = {
      email: email,
      name: fullName,
      plan: "pay_as_you_go",
      amount: "40",
      card_number: cardDetails.cardnumber,
      cvv: cardDetails.cvv,
      expiry_month: expMonth,
      expiry_year: expYear,
    };

    console.log("Final Payment Payload:", paymentPayload); // Debugging

    // Log headers and payload before making the request
    console.log("Making payment request with token:", token);
    console.log("Payment URL:", `${apiUrl}/api/jobseeker/charge-card`);

    // Make the payment request to the backend
    const paymentResponse = await axios.post(`${apiUrl}/api/jobseeker/charge-card`, paymentPayload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Log the full payment response for debugging
    console.log("Payment Response:", paymentResponse);

    // Check if the HTTP status code is 200 (successful)
    if (paymentResponse.status === 200) {
      return true; // Indicate success
    } else {
      console.error("Payment Response Data:", paymentResponse?.data); // Log more details
      alert("We were unable to charge your card", "Payment initiation failed. Please check card details.");
      return false; // Indicate failure
    }
  } catch (error) {
    console.error("Payment Error:", error);

    // If error.response is undefined or null, handle it
    const errorMessage = error.response?.data?.message || error.message || "Please try again.";
    Alert.alert("An error occurred", errorMessage);
    return false; // Indicate failure
  }
};


const handlePaymentSuccess = () => {
    setPaymentModalVisible(false);
    setPaymentRequired(false);
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

  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  // Options for the picker (challenges someone might face that requires expert help)
  const challenges = [
    'Changing to a new career path due to industry shifts',
    'Seeking help to advance in my current career',
    'Looking to improve specific skills (e.g., technical, leadership)',
    'Need guidance on career growth or promotion',
    'Transitioning to a new role or industry',
    'Need expertise in a specific field',
    'Facing challenges in current job role',
  ];

  // Handle selection change from the picker
  const handlePickerChange = (value) => {
    setChallenge(value); // Set the challenge state when a reason is selected
  };

  const goToPlan = async () => {
    if (paymentRequired) {
      const paymentSuccessful = await initiatePayment(); // Wait for payment to complete
      if (!paymentSuccessful) {
        return; // Stop execution if payment failed
      }
    }
    
    try {
        // Validate the form data before making the API request
        if (!role || !challenge || !targetLevel || !selectedDateTime) {
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

        // Retrieve data from AsyncStorage
        const aiAnalysisRaw = await AsyncStorage.getItem('ai_analysis');
        const guideRaw = await AsyncStorage.getItem('selectedUserTopics');

        // Parse the data or initialize as empty array
        const ai_analysis = aiAnalysisRaw ? JSON.parse(aiAnalysisRaw) : [];
        const guide = guideRaw ? JSON.parse(guideRaw) : [];

        // Debugging: Log the retrieved ai_analysis to check if it's correctly retrieved
        console.log('Retrieved ai_analysis:', ai_analysis);

        // Ensure ai_analysis contains no more than 4 items
        const limitedAiAnalysis = ai_analysis.slice(0, 4);

        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        // Post to create-jobseeker-interview endpoint
        const MeetingResponse = await axios.post(
            `${apiUrl}/api/jobseeker/meetings/schedule`,
            meetingFormData,
            { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
        );

        if (MeetingResponse.status !== 200) {
            return;
        }

        // Prepare the data for the API request
        const formData = {
            type,
            role,
            ai_analysis: limitedAiAnalysis,
            guide,
            timezone: userTimezone,
            description: challenge,
            starting_level: startingLevel,
            target_level: targetLevel,
            status,
            date_time: selectedDateTime,
            expert_available_days,
            expert_available_time,
            expert_name: expert,
            expertid: expertid,
            name: first_name + ' ' + last_name
        };

        // Save the growth plan regardless of the subscription status
        const response = await axios.post(
            `${apiUrl}/api/jobseeker/create-jobseeker-skill-analysis`,
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 201) {
            await AsyncStorage.setItem('SkillAnalysisFormData', JSON.stringify(formData));
            navigate('/skill-analysis-sessions');
            onClose();
        }
    } catch (error) {
        console.error('Error during save:', error);
        console.log('Server Response:', error.response?.data);
        setAlertMessage(error.response?.data?.message || 'Failed to create Skill Analysis Session');
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
    <View style={{ flex: 1, backgroundColor: "white", alignItems: 'center', marginTop: 40 }}>
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
               <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Type")}</Text>
              </View>
               <View style={[styles.cell, { flex: 2}]}>
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
               <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Role")}</Text>
              </View>
               <View style={[styles.cell, { flex: 2}]}>
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
               <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Tell us why you are taking this step")}</Text>
              </View>
               <View style={[styles.cell, { flex: 2}]}>
               <Picker
        selectedValue={challenge}
        onValueChange={handlePickerChange}
        style={styles.picker}
      >
        {challenges.map((challengeOption, index) => (
          <Picker.Item key={index} label={challengeOption} value={challengeOption} />
        ))}
      </Picker>
              </View>
            </View>
            <View style={styles.row}>
               <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Current level")}</Text>
              </View>
               <View style={[styles.cell, { flex: 2}]}>
                <Picker
                  selectedValue={startingLevel}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStartingLevel(itemValue)}
                >
                  <Picker.Item label={t("Beginner")} value="Beginner" />
                   <Picker.Item label={t("Junior")} value="Junior" />
                  <Picker.Item label={t("Intermediate")} value="Intermediate" />
                  <Picker.Item label={t("Advanced")} value="Advanced" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Desired career level")}</Text>
              </View>
              <View style={[styles.cell, { flex: 2}]}>
                <Picker
                  selectedValue={targetLevel}
                  style={styles.picker}
                  onValueChange={(itemValue) => setTargetLevel(itemValue)}
                >
                  <Picker.Item label={t("Junior")} value="Junior" />
                  <Picker.Item label={t("Senior")} value="Senior" />
                  <Picker.Item label={t("Manager")} value="Manager" />
                  <Picker.Item label={t("Senior Manager")} value="Senior Manager" />
                  <Picker.Item label={t("Solution Architect")} value="Solution Architect" />
                </Picker>
              </View>
            </View>
            
           
            </View>
          
            <Text style={{ fontSize: 15, color: 'black',  fontWeight: '500', marginTop: 30, marginBottom: -10, marginLeft: 50, }}>{expert}'s {t("available days and time")}</Text>
            <View style={styles.container}>
              <View style={styles.row}>
                 <View style={[styles.cell, { flex: 1}]}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Days")}</Text>
                </View>
                 <View style={[styles.cell, { flex: 2}]}>
                  <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>
                    {expert_available_days}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                 <View style={[styles.cell, { flex: 1}]}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>Time</Text>
                </View>
                 <View style={[styles.cell, { flex: 2}]}><Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>{expert_available_time}
                  </Text>
                </View>
              </View>
            </View>
           <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 30, marginBottom: -10, marginLeft: 50, marginRight: 10 }}>{t("Select day and time for skill analysis session.")}  <Text style={{ fontSize: 15, color: 'black', marginTop: 30, marginBottom: -10,}}>{t("(This session will run for 40 minutes)")}</Text></Text> 
          <View style={styles.container}>
            <View style={styles.row}>
               <View style={[styles.cell, { flex: 1}]}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Date and Time")}</Text>
              </View>
               <View style={[styles.cell, { flex: 2}]}>
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
          
          <TouchableOpacity style={styles.buttonplus} onPress={goToPlan} disabled={isLoading}>
  {isLoading ? (
    <ActivityIndicator size="small" color="#fff" /> // Show loading indicator while processing
  ) : (
    <Text style={styles.buttonTextplus}>{t("Save & Create Session")}</Text>
  )}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
          <OpenModal onClose={() => handleCloseModal()} />
          </View>
      </Modal>
      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={paymentModalVisible}
                        onRequestClose={() => setPaymentModalVisible(false)}
                      >
                          <View style={styles.modalContent}>
                            <PaymentDetails 
                              onClose={() => setPaymentModalVisible(false)} 
                              onPaymentSuccess={handlePaymentSuccess} 
                            />
                        </View>
                      </Modal>
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
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10
  },
  greenBox: {
    width: 920,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
  },
  buttonplus: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 10,
    marginLeft: 650,
    width: 200,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
  },
  input: {
    fontFamily: "Roboto-Light",
    paddingLeft: 5,
    fontSize: 14
  },
  input2: {
    fontFamily: "Roboto-Light",
    paddingLeft: 5,
    fontSize: 14,
    color: 'grey'
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
