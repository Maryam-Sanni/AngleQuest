import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, Image } from 'react-native';
import OpenSchedule from '../Experts/OpenScheduledgrowth';
import OpenSchedule2 from '../Experts/GrowthPlanResponse';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
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

          const response = await axios.get(`${apiUrl}/api/expert/get-review-growth-plan`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.status === 200) {
            const data = response.data.reviewGrowthPlan;

            // Filter meetings based on expert_id and review status "satisfied"
            const filteredMeetings = data.filter(meeting => 
              meeting.user_id === storedExpertId && meeting.review === "satisfied"
            );
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

      loadFormData();

      // Polling every 30 seconds (30000 milliseconds)
      const intervalId = setInterval(loadFormData, 5000);

      // Clean up the interval on component unmount
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

          // Filter meetings where expert_id matches storedExpertId
          const matchingMeetings = meetings.filter(
            meeting => meeting.user_id === storedExpertId
          );

          if (matchingMeetings.length > 0) {
            // Sort the filtered meetings by created_at in descending order
            const sortedMeetings = matchingMeetings.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );

            // Set the lastExpertLink to the expert_link of the latest meeting
            setLastExpertLink(sortedMeetings[0].expert_link);
            console.log('Last expert link:', sortedMeetings[0].expert_link); // Debugging
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

  const handleOpenPress2 = async (meeting) => {
    try {
      // Save the selected meeting data to AsyncStorage
      await AsyncStorage.setItem('selectedMeeting', JSON.stringify(meeting));
      console.log('Selected meeting saved:', meeting);

      // Set the selected meeting in state to pass it to the modal
      setSelectedMeeting(meeting);
      setModalVisible2(true);
    } catch (error) {
      console.error('Failed to save selected meeting to AsyncStorage', error);
    }
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };
  
  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>{t("Scheduled Growth Plan Meetings")}</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Name")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Role")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Account Type")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Reviewed")}</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>Give Feedback</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>Start Meeting</Text>
               </View>
            </TouchableOpacity>
          </View>

          {meetings.map((meeting, index) => {
            const dateTime = new Date(meeting.date);
            const date = dateTime.toLocaleDateString();
            const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

            return (
              <View key={index} style={styles.row}>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/useravatar.jpg')} style={styles.image} />
                    <Text style={styles.cellText}>{meeting.coach}</Text>
                  </View>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{meeting.role}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{t("Individual Account")}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{date} {time}</Text>
                </View>
                <TouchableOpacity onPress={() => handleOpenPress(meeting)}>
                   <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.linkText}>{t("Give Feedback")}</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const meetingLink = meeting.expert_link || 'https://default-meeting-link.com';
                    if (meetingLink) {
                      Linking.openURL(meetingLink)
                        .catch(err => console.error("Couldn't load page", err)); // Handle potential errors
                    } else {
                      console.warn('No valid link available');
                    }
                  }}
                >
                  <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                    <Text style={styles.linkText}>{t("Start Meeting")}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={handleCloseModal2}
        >
          <View style={styles.modalContent}>
             <OpenSchedule2 onClose={handleCloseModal2} meeting={selectedMeeting} />
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
    justifyContent: 'flex-start',
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
