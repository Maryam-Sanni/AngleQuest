import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal } from 'react-native';
import OpenSchedule from '../Jobseekers/OpenInterviewbook';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const POLLING_INTERVAL = 5000; // Poll every 60 seconds

   const apiUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${apiUrl}/api/jobseeker/get-jobseeker-interview`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          let newInterviews = response.data.interview || [];

          // Filter out interviews where completed is "Yes"
          newInterviews = newInterviews.filter(item => item.completed !== "Yes");

          setInterviews(newInterviews);

          // Save all interviews to AsyncStorage
          try {
            await AsyncStorage.setItem('allInterviews', JSON.stringify(newInterviews));
            console.log('All interviews saved:', newInterviews);
          } catch (error) {
            console.error('Failed to save all interviews to AsyncStorage', error);
          }

          // Compare with previous data
          const previousInterviews = previousInterviewsRef.current;
          if (JSON.stringify(newInterviews) === JSON.stringify(previousInterviews)) {
            // Stop polling if no new data
            clearInterval(intervalId);
          } else {
            // Update the previous interviews
            previousInterviewsRef.current = newInterviews;
          }
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    fetchInterviews(); // Initial fetch

    // Set up polling
    const intervalId = setInterval(fetchInterviews, POLLING_INTERVAL);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
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
              <Text style={styles.headerText}>{t('Expert')}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t('Role')}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t('Company')}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t('Meeting Date')}</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>Update</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>Join Meeting</Text>
               </View>
            </TouchableOpacity>
          </View>

          {interviews.map((interview, index) => (
            <View key={interview.id} style={styles.row}>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{interview.expert_name}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{interview.role}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{interview.company}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{new Date(interview.date_time).toLocaleDateString()} <Text style={styles.cellText}>{new Date(interview.date_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}</Text></Text>
              </View>
               <TouchableOpacity onPress={() => handleOpenPress(interview)}>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.linkText}>{t("Update")}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const meetingLink = interview.candidate_link || 'https://anglequest.com';
                  if (meetingLink) {
                    Linking.openURL(meetingLink)
                      .catch(err => console.error("Couldn't load page", err)); // Handle potential errors
                  } else {
                    console.warn('No valid link available');
                  }
                }}
              >
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.linkText}>{t("Join Meeting")}</Text>
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
    textAlign: 'flex-start',
  },
  table: {
    flex: 1,
    marginRight: 200,
    marginTop: 20,
    marginBottom: 30,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
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
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
    backgroundColor: 'white', 
    padding: 10,
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
    fontFamily: "Roboto-Light"
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
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
  linkText: {
    color: "#206C00",
    fontSize: 14,
    fontFamily: "Roboto-Light"
  }
});

export default ScheduledMeetingsTable;
