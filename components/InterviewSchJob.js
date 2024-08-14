import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import OpenSchedule from '../Jobseekers/OpenInterviewbook';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const ScheduledMeetingsTable = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [cv, setCV] = useState(null);
    const [job_description_file, setJobFile] = useState(null);
    const [job_description_text, setjobText] = useState("Job description text");

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

            // Convert date_time to date and time
            const dateTime = new Date(data.date_time);
            const date = dateTime.toLocaleDateString();
            const time = dateTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true  // Use 12-hour clock with AM/PM
            });

            setSelectedDate(date);
            setSelectedTime(time);
            
          } else {
            console.error('Failed to fetch data', response);
          }
        } catch (error) {
          console.error('Failed to load form data', error);
        }
      };

      loadFormData();
    }, []);

    const handleOpenPress = () => {
      setModalVisible(true);
    };

    const handleCloseModal = () => {
      setModalVisible(false);
    };
    
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })

const {t}=useTranslation()
  
  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
      
      <Text style={styles.title}>{t("Scheduled Interview")}</Text>
      <View style={styles.table}>
      <View style={styles.row}>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14,fontFamily:"Roboto-Light"}}>{t("Role")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14,fontFamily:"Roboto-Light"}}>{t("Level")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14,fontFamily:"Roboto-Light"}}>{t("Company")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14,fontFamily:"Roboto-Light"}}>{t("Date")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14,fontFamily:"Roboto-Light"}}>{t("Time")}</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}> </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}> </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <Text style={styles.cellText}>{role}</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>Senior</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{company}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{selectedDate}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{selectedTime}</Text>
          </View>
          <TouchableOpacity style={styles.cell2} onPress={handleOpenPress}>
          <Text style={styles.open}>{t("Update")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell2} >
          <Text style={styles.open}>{t("Join")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <Text style={styles.cellText}>{t("Data Analyst")}</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>Medior</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP FI Medior</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>07/05/2024</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>10:00am</Text>
          </View>
          <TouchableOpacity style={styles.cell} onPress={handleOpenPress}>
          <Text style={styles.open}>{t("Update")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell} >
          <Text style={styles.open}>{t("Join")}</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
          <OpenSchedule onClose={() => handleCloseModal()} />
          </View>
      </Modal>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    marginTop: 30,
    marginLeft: 50,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 200,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
 open: {
    color: "black",
     fontSize: 14,
      borderColor: "#63EC55", 
      borderWidth: 2, 
      padding: 5, 
      paddingHorizontal: 15, 
      borderRadius: 5,
      fontFamily:"Roboto-Light"
},
replan: {
    color: "coral",
     fontSize: 14,
      borderColor: "coral", 
      borderWidth: 2, 
      padding: 5, 
      paddingHorizontal: 15, 
      borderRadius: 5
},
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
   backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
   backgroundColor: 'none',
    padding: 10, 
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
    fontFamily:"Roboto-Light"
  },
  
  greenBox: {
    flex: 2,
   width: "90%",
    height: 550,
    marginLeft: 50, 
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 30, 
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
  },
});

export default ScheduledMeetingsTable;
