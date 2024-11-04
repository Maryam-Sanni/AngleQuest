import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, Image } from 'react-native';
import OpenSchedule from '../Experts/ViewCompletedgrowth';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const POLLING_INTERVAL = 5000;

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastExpertLink, setLastExpertLink] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const { t } = useTranslation();
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedExpertId = await AsyncStorage.getItem('user_id');

        if (!token || !storedExpertId) {
          console.error('No token or user ID found');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/expert/growthplan/getAllExpertsGrowthPlanFeedbacks`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          const data = response.data.allGrowthPlan;

          // Filter meetings based on expert_id
          const filteredMeetings = data.filter(meeting => meeting.user_id === storedExpertId);
          setMeetings(filteredMeetings);

          // Save all growth plans to AsyncStorage
          try {
            await AsyncStorage.setItem('allExpertsgrowth', JSON.stringify(data));
            console.log('All expert growth plans saved:', data);
          } catch (error) {
            console.error('Failed to save all expert growth plans to AsyncStorage', error);
          }
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    // Initial data load
    loadFormData();

    // Set up polling
    const intervalId = setInterval(loadFormData, POLLING_INTERVAL);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleOpenPress = async (meeting) => {
    try {
      // Save the selected meeting data to AsyncStorage
      await AsyncStorage.setItem('selectedMeeting', JSON.stringify(meeting));
      console.log('Selected meeting saved:', meeting);

      // Set the selected meeting in state to pass it to the modal
      setSelectedMeeting(meeting);
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to save selected meeting to AsyncStorage', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleViewAllPress = () => {
    // Logic to navigate to a different screen or show all meetings
    console.log("View All Meetings pressed");
  };

  return (
    <View style={styles.container}>
        {meetings.length > 0 ? (
          <View style={styles.meetingsContainer}>
            {meetings.slice(0, 2).map((meeting, index) => {
              const dateTime = new Date(meeting.updated_at);
              const date = dateTime.toLocaleDateString();
              const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

              return (
                <View key={index} style={styles.meetingContainer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image
                        source={{
                          uri: "https://img.icons8.com/?size=100&id=42287&format=png&color=000000",
                        }}
                        style={{
                          width: 150,
                          height: 150,
                          marginTop: 30,
                          marginBottom: 30,
                          marginLeft: 50,
                        }}
                      />
                      <View style={{ flexDirection: "column", width: "75%" }}>
                        <View style={{ flexDirection: "row", marginBottom: 20 }}>
                          <Text style={styles.meetingTime}>One-on-One Session . </Text>
                          <Text style={styles.meetingTime}>Online . </Text>
                          <Text style={styles.meetingTime}>Completed</Text>
                        </View>

                      <Text style={styles.cellText}>{meeting.coach}</Text>
                          <Text style={styles.cellText}>{meeting.role}
                            </Text>
                        <Text style={styles.cellText}>{date} {time}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'flex-end' }}>
                          <TouchableOpacity  style={styles.joinButton2} onPress={() => handleOpenPress(meeting)}>
                              <Text style={styles.buttonText2}>{t("Open")}</Text>
                          </TouchableOpacity>
                    </View>
                      </View>
                      </View>


                  </View>
                  
              );
            })}
            <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllPress}>
              <Text style={styles.viewAllText}>{t("View All")}</Text>
            </TouchableOpacity>
          </View>
        ) : (
      <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=678&format=png&color=D3D3D3",
          }}
          style={{
            width: 50,
            height: 50,
            marginLeft: 100,
          }}
        />
          <Text style={styles.noMeetings}>No scheduled meeting has been completed</Text>
      </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenSchedule onClose={handleCloseModal} meeting={selectedMeeting} />
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 30,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  meetingContainer: {
    marginBottom: 20,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginHorizontal: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cellText: {
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: "#206C00",
    fontSize: 14,
    fontFamily: "Roboto-Light",
    padding: 5,
  }, 
  viewAllButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    alignSelf: "center",
    borderColor: "darkgreen",
    borderWidth: 1,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  joinButton: {
    backgroundColor: "#206C00",
    padding: 10,
    borderRadius: 5,
    width: 120,
  },
  joinButton2: {
    borderColor: "#206C00",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 100,
    marginRight: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText2: {
    color: "#206C00",
    fontWeight: "bold",
    textAlign: "center",
  },
  noMeetings: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
  },
});

export default ScheduledMeetingsTable;
