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

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [cv, setCV] = useState(null);
  const [job_description_file, setJobFile] = useState(null);
  const [job_description_text, setjobText] = useState("Job description text");
  const [token, setToken] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [expert_available_days, setExpertAvailableDays] = useState('');
  const [expert_available_time, setExpertAvailableTime] = useState('');
  const [expert, setExpert] = useState('');
  const [candidate, setCandidate] = useState("Individual");
  const [expertid, setExpertid] = useState("");
   const [meetingtype, setType] = useState("interview");

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('https://recruitangle.com/api/jobseeker/get-jobseeker-interview', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          const data = response.data.interview;
          setCompany(data.company || '');
          setRole(data.role || '');
          setCV(data.cv || '');
          setJobFile(data.job_description_file || '');
          setjobText(data.job_description_text || '');
          setSelectedDateTime(data.date_time || '');
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
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


  const goToPlans = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('All Interviews');
    onClose(); // Close the modal
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