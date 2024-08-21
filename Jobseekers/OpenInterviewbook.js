import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "../components/DateTimePickerModal";
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
 

function MyComponent({ onClose }) {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [data, setData] = useState(null);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [cv, setCV] = useState(null);
  const [job_description_file, setJobFile] = useState(null);
  const [job_description_text, setjobText] = useState(" ");
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
    const fetchData = async () => {
      try {
        const retrievedData = await AsyncStorage.getItem('selectedInterview');
        if (retrievedData) {
          const parsedData = JSON.parse(retrievedData);
          setData(parsedData);

          // Initialize state variables with retrieved data
          setCompany(parsedData.company || '');
          setRole(parsedData.role || '');
          setCV(parsedData.cv || '');
          setJobFile(parsedData.job_description_file || '');
          setjobText(parsedData.job_description_text || '');
          setExpertAvailableDays(parsedData.expert_available_days || '');
          setExpertAvailableTime(parsedData.expert_available_time || '');
          setExpert(parsedData.expert_name || '');
          setExpertid(parsedData.expertid || '');
        } else {
          console.log('No data found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Failed to retrieve data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);

  
  
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
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    getToken();
  }, []);
  
  const goToPlans = async () => {
    try {
      // Prepare the data to be sent in the POST request
      
      const postData = {
        company: company || data?.company,
        role: role || data?.role,
        cv: cv,
        name: first_name + ' ' + last_name,
        job_description_file: job_description_file,
        job_description_text: job_description_text || data?.job_description_text,
        expert_available_days: expert_available_days || data?.expert_available_days,
        expert_available_time: expert_available_time || data?.expert_available_time,
        expertid: expertid || data?.expertid,
        date_time: selectedDateTime || data?.date_time,
        meetingtype: meetingtype,
        candidate: candidate,
      };

      // Send the POST request
      const response = await axios.put(
        'https://recruitangle.com/api/jobseeker/edit-jobseeker-interview',
        postData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // If you're sending files
            'Authorization': `Bearer ${token}` // Include token if authentication is required
          }
        }
      );

      // Handle the response
      if (response.status === 200) {
        console.log('Interview session updated successfully:', response.data);
        // Optionally, you can show a success message or navigate to another screen
        navigation.navigate('Interview Sessions');
      } else {
        console.error('Failed to update the interview session:', response.data);
        setAlertMessage('Failed to update the interview session. Please try again.');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Error updating the interview session:', error);
      setAlertMessage('Error updating the interview session. Please try again.');
      setAlertVisible(true);
    } finally {
      onClose(); // Close the modal
    }
  };

  
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40}}>
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("Update Interview Session")}</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
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
          placeholderTextColor="black"
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
          placeholderTextColor="black"
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
        <Text style={{ fontFamily: "Roboto-Light" }}>{cv}</Text>
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
         <Text style={{ fontFamily: "Roboto-Light" }}>{job_description_file}</Text>
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
        <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>{data?.expert_available_days|| ''}</Text>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={{ fontFamily: "Roboto-Light" }}>{t("Time")}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>{data?.expert_available_time || ''}</Text>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={{ fontFamily: "Roboto-Light" }}>{t("Expert")}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>{data?.expert_name || ''}</Text>
      </View>
    </View>
  </View>

  <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 30, marginBottom: 10, marginLeft: 50, marginRight: 50 }}>{t("Select date and time for skill analysis session.")}  {data?.expert_name || ''} is available  {data?.expert_available_days|| ''} {data?.expert_available_time || ''}</Text>
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
            {data?.date_time || t("Select Date and Time")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
      
      
    <TouchableOpacity onPress={goToPlans} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>{t("Update")}</Text>
    </TouchableOpacity>
    </View>
    
    <DateTimePickerModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDateTime}
        onCancel={handleCancelModal}
      />
</ScrollView>
</View>

);
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#CCC',
        marginRight: 70, 
        marginTop: 5,
        marginLeft: 50 
      },
  greenBox: {
    width: 920,
    height:550,
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
    color:'grey',
    fontSize: 14
  },
  buttonplus: {
    backgroundColor: 'coral',
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
    fontFamily:"Roboto-Light"
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
    fontFamily:"Roboto-Light",
  }
});

export default MyComponent;