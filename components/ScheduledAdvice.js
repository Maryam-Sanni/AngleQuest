import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity, Modal, Image } from 'react-native';
import OpenSchedule from '../Experts/OpenScheduledadvice';
import OpenSchedule2 from '../Experts/AdviceResponse';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment-timezone';
import EmptyScheduleImage from '../assets/EmptySch.jpeg';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [lastExpertLink, setLastExpertLink] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showAllMeetings, setShowAllMeetings] = useState(false);

  const { t } = useTranslation();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedExpertId = await AsyncStorage.getItem('user_id');

        if (!token || !storedExpertId) {
          console.error('No token or user ID found');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/jobseeker/get-all-jobseeker-skillanalysis`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const data = response.data.skillAnalysis;
          const filteredMeetings = data
            .filter(meeting => 
              meeting.expertid === storedExpertId && meeting.completed !== "Yes"
            )
            .sort((a, b) => new Date(b.date_time) - new Date(a.date_time));

          setMeetings(filteredMeetings);
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load meetings', error);
      }
    };

    loadMeetings();
  }, []);

  const handleOpenPress = (meeting) => {
    setSelectedMeeting(meeting);
    setModalVisible(true);
  };

  const handleOpenPress2 = (meeting) => {
    setSelectedMeeting(meeting);
    setModalVisible2(true);
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
            {meetings.slice(0, showAllMeetings ? meetings.length : 2).map((meeting, index) => {
              const dateTime = moment.tz(meeting.date_time, "YYYY-MM-DD HH:mm", meeting.timezone);
              const date = dateTime.format('L');
              const time = dateTime.format('hh:mm A');

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
                        <Text style={styles.meetingTime}>Scheduled</Text>
                      </View>
                  
                    <Text style={styles.cellText}>{meeting.name}</Text>
                
                  <Text style={styles.cellText}>{meeting.role}</Text>
                  <Text style={styles.cellText}>{`${date} ${time}`}</Text>
                      <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'flex-end' }}>
                  <TouchableOpacity style={styles.joinButton2} onPress={() => handleOpenPress(meeting)}>
                    <Text style={styles.buttonText2}>Give Feedback</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.joinButton} onPress={() => handleOpenPress2(meeting)}>
                    <Text style={styles.buttonText}>Start Meeting</Text>
                  </TouchableOpacity>
                      </View>
                </View>
                  </View>
                </View>
              );
            })}
            {!showAllMeetings && meetings.length > 2 && (
              <TouchableOpacity style={styles.viewAllButton} onPress={() => setShowAllMeetings(true)}>
                <Text style={styles.buttonText2}>View All</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {/* Modal for Feedback */}
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContent}>
            <OpenSchedule onClose={() => setModalVisible(false)} meeting={selectedMeeting} />
          </View>
        </Modal>

        {/* Modal for Start Meeting */}
        <Modal visible={modalVisible2} transparent={true} animationType="slide">
          <View style={styles.modalContent}>
            <OpenSchedule2 onClose={() => setModalVisible2(false)} meeting={selectedMeeting} />
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
