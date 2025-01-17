import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, Image } from 'react-native';
import OpenSchedule from '../Experts/OpenScheduledgrowth';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import EmptyScheduleImage from '../assets/EmptySch.jpeg';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastExpertLink, setLastExpertLink] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [showAllMeetings, setShowAllMeetings] = useState(false);
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

        const response = await axios.get(`${apiUrl}/api/jobseeker/get-all-jobseeker-growthplan`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          const data = response.data.allGrowthPlan;

          // Filter meetings based on expert_id and completed status
          const filteredMeetings = data.filter(meeting => meeting.expertid === storedExpertId && meeting.completed !== "Yes");

          setMeetings(filteredMeetings);
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();

    // Polling every 30 seconds (30000 milliseconds)
    const intervalId = setInterval(loadFormData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchLastCreatedMeeting = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedExpertId = await AsyncStorage.getItem('user_id');

        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch(`${apiUrl}/api/jobseeker/meetings/get?type=growth`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          const meetings = Object.values(data.meetings);
          const matchingMeetings = meetings.filter(meeting => meeting.expert_id === storedExpertId);

          if (matchingMeetings.length > 0) {
            const sortedMeetings = matchingMeetings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setLastExpertLink(sortedMeetings[0].expert_link);
          } else {
            console.error('No matching meetings found for this expert ID');
          }
        } else {
          console.error('Failed to fetch meetings:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
      }
    };

    fetchLastCreatedMeeting();
  }, []);

  const handleJoinPress = () => {
    if (lastExpertLink) {
      Linking.openURL(lastExpertLink);
    } else {
      console.error('No expert link found');
    }
  };

  const handleOpenPress = async (meeting) => {
    try {
      await AsyncStorage.setItem('selectedMeeting', JSON.stringify(meeting));
      setSelectedMeeting(meeting);
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to save selected meeting to AsyncStorage', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const formatDateTime = (dateTimeString) => {
    let date, time;
    if (dateTimeString.includes('|')) {
      const [datePart, timePart] = dateTimeString.split(' | ');
      const dateComponents = datePart.trim().split(' ');
      if (dateComponents.length === 4) {
        const monthName = dateComponents[1];
        const day = parseInt(dateComponents[2].replace(',', ''), 10);
        const year = parseInt(dateComponents[3], 10);
        const month = new Date(Date.parse(monthName + " 1")).getMonth();
        date = new Date(year, month, day);
      } else {
        console.error("Invalid date format:", datePart);
        return "Invalid Date";
      }
      time = timePart.trim();
    } else {
      date = new Date(dateTimeString);
      if (isNaN(date.getTime())) {
        console.error("Invalid date provided:", dateTimeString);
        return "Invalid Date";
      }
      time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    const formattedDate = `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;
    const formattedTime = time.toLowerCase();
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <View style={styles.container}>
        {meetings.length === 0 ? (
      <View
         style={{
           flex: 1,
           justifyContent: "center",
           alignItems: "center",
           padding: 20,
           backgroundColor: 'white'
         }}
       >
         {/* Empty Schedule Image */}
         <Image
           source={EmptyScheduleImage}
           style={{
             width: 200,
             height: 200,
             marginBottom: 20,
           }}
         />

         {/* Title */}
         <Text
           style={{
             fontSize: 24,
             fontWeight: 'bold',
             color: '#333',
             marginBottom: 10,
           }}
         >
           No New Meetings Scheduled
         </Text>

         {/* Explanation */}
         <Text
           style={{
             fontSize: 16,
             color: '#777',
             textAlign: 'center',
             marginBottom: 20,
           }}
         >
           It seems there are no upcoming meetings right now. You will get notification when individuals create new meetings.
         </Text>


       </View>
        ) : (
          <>
            <View style={styles.meetingsContainer}>
              {(showAllMeetings ? meetings : meetings.slice(0, 2)).map((meeting, index) => {
                const formattedDateTime = formatDateTime(meeting.date_time);
                return (
                  <View key={index} style={styles.meetingContainer}>
                    <View style={styles.meetingContent}>
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
                            <Text style={styles.meetingTime}>Scheduled</Text>
                          </View>
                      <Text style={styles.cellText}>{meeting.name}</Text>
                 
                    <Text style={styles.cellText}>{meeting.role}</Text>
                    <Text style={styles.cellText}>{formattedDateTime}</Text>
                          <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'flex-end' }}>
                    <TouchableOpacity style={styles.joinButton2} onPress={() => handleOpenPress(meeting)}>
                      <Text style={styles.buttonText2}>{t("Give Feedback")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.joinButton}
                      onPress={() => {
                        const meetingLink = meeting.expert_link || 'https://default-meeting-link.com';
                        if (meetingLink) {
                          Linking.openURL(meetingLink).catch(err => console.error("Couldn't load page", err));
                        } else {
                          console.warn('No valid link available');
                        }
                      }}
                    >
                      <Text style={styles.buttonText}>{t("Start Meeting")}</Text>
                    </TouchableOpacity>
                  </View>
                        </View>
                         </View>
                    </View>
                  </View>
                );
              })}
            </View>
            {!showAllMeetings && meetings.length > 2 && (
              <TouchableOpacity style={styles.viewAllButton} onPress={() => setShowAllMeetings(true)}>
                <Text style={styles.buttonText2}>{t("View All")}</Text>
              </TouchableOpacity>
            )}
          </>
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
    width: 150,
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
