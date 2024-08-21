import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import OpenSchedule from '../Jobseekers/OpenInterviewbook';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [interviews, setInterviews] = useState([]);
  
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('https://recruitangle.com/api/jobseeker/get-jobseeker-interview', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          setInterviews(response.data.interview);

          // Save all interviews to AsyncStorage
          try {
            await AsyncStorage.setItem('allInterviews', JSON.stringify(response.data.interview));
            console.log('All interviews saved:', response.data.interview);
          } catch (error) {
            console.error('Failed to save all interviews to AsyncStorage', error);
          }
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
  }, []);


  const handleOpenPress = async (interview) => {
    setModalVisible(true);

    try {
      await AsyncStorage.setItem('selectedInterview', JSON.stringify(interview));
      console.log('Selected interview saved:', interview);
    } catch (error) {
      console.error('Failed to save selected interview to AsyncStorage', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  });

  const {t} = useTranslation();

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>{t("Scheduled Interview")}</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={{fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light"}}>{t("Role")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light"}}>{t("Company")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light"}}>{t("Date")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light"}}>{t("Time")}</Text>
            </View>
            <TouchableOpacity style={styles.cell2}>
              <Text style={styles.cellText}> </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cell2}>
              <Text style={styles.cellText}> </Text>
            </TouchableOpacity>
          </View>

          {interviews.map((interview, index) => (
            <View key={interview.id} style={styles.row}>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{interview.role}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{interview.company}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{new Date(interview.date_time).toLocaleDateString()}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{new Date(interview.date_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}</Text>
              </View>
               <TouchableOpacity onPress={() => handleOpenPress(interview)}>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.open}>{t("Update")}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity >
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.open}>{t("Join")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}

        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenSchedule onClose={handleCloseModal} />
          </View>
        </Modal>
      </BlurView>
    </View>
  );
};

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
    textAlign: 'left', // Align text to the left
  },
  table: {
    flex: 1,
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 30,
    alignContent: 'center',
    justifyContent: 'flex-start', // Adjust to start alignment
  },
  greenBox: {
    width: "90%",
    marginBottom: 20,
    marginLeft: 50,
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 30,
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
    backgroundColor: 'none',
    padding: 10,
    justifyContent: 'center', // Center vertically
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center', // Center vertically
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'left', // Align text to the left
    fontFamily: "Roboto-Light",
  },
  headerText: {
    fontWeight: '600',
    fontFamily: "Roboto-Light",
    textAlign: 'left', // Align header text to the left
    paddingVertical: 10, // Adjust vertical padding if needed
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25,
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
  open: {
    color: "black",
    fontSize: 14,
    borderColor: "#63EC55",
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontFamily: "Roboto-Light",
  },
});

export default ScheduledMeetingsTable;
