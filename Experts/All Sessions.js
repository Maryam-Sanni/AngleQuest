import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Linking } from 'react-native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'; // Ensure you have moment imported
import OpenModal from './ConfirmMeetingEnd';

function MyComponent({ onClose }) {
  const [meetings, setMeetings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [hubName, setHubName] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOpenPress = async (meeting) => {
    setSelectedMeeting(meeting);
    setModalVisible(true);

    try {
      await AsyncStorage.setItem('selectedMeeting', JSON.stringify(meeting));
      console.log('Selected meeting saved:', meeting);
    } catch (error) {
      console.error('Failed to save selected meeting to AsyncStorage', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleJoinLink = async (meeting) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const firstName = await AsyncStorage.getItem('first_name');
      const lastName = await AsyncStorage.getItem('last_name');
      const candidateName = `${firstName} ${lastName}`;

      if (!token || !candidateName) {
        console.error("Token or candidate name missing.");
        return;
      }

      const meeting_id = String(meeting.id);

      const response = await axios.post(
        `${apiUrl}/api/expert/join-candidate`,
        { meeting_id, candidate_name: candidateName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === "success" && response.data.candidate_link) {
        const { candidate_link } = response.data;
        Linking.openURL(candidate_link);
      } else {
        alert('Failed to retrieve the meeting link.');
      }
    } catch (error) {
      console.error("Error joining meeting:", error);
      alert('Failed to join the meeting. Please try again.');
    }
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  const handleOpenLink = async (url) => {
    if (url) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Can't open the URL:", url);
      }
    }
  };

  const fetchData = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const hubId = await AsyncStorage.getItem('hub_id'); 
        const storedHubName = await AsyncStorage.getItem('coaching_hub_name');
        setHubName(storedHubName);

        const response = await axios.get(`${apiUrl}/api/expert/get-all-meeting`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        // Assuming meeting.hub_id is also a string, no need to change it
        const formattedMeetings = response.data.data
            .filter(meeting => meeting.hub_id === hubId) // Filter meetings by hub_id
            .map((meeting) => ({
                id: meeting.id,
                name: meeting.jobseeker_name,
                meetingDate: moment(meeting.meeting_date).format('MMMM Do YYYY, h:mm A'),
                meetingDescription: meeting.description,
                meetingTopic: meeting.meeting_topic,
                joinDate: moment(meeting.created_at).format('MMMM Do YYYY, h:mm A'),
            }));

        setMeetings(formattedMeetings);
    } catch (error) {
        console.error('Error fetching meetings:', error);
        alert('Failed to load meetings.'); // Optional: show an alert or a message to the user
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
      <View style={styles.greenBox}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("All")} {hubName} {t(" ")}
 {t("Confirmation")} </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>{t("Name")}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>{t("Topic")}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>{t("Description")}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ fontWeight: '600', fontSize: 16 }}>{t("Joined")}</Text>
                </View>
               
              </View>
              {meetings.map((meeting) => (
                <View key={meeting.id} style={styles.row}>
                  <View style={styles.cell2}>
                    <Text style={styles.cellText}>{meeting.name}</Text>
                  </View>
                  <View style={styles.cell2}>
                    <Text style={styles.cellText}>{meeting.meetingTopic}</Text>
                  </View>
                  <View style={styles.cell2}>
                    <Text style={styles.cellText}>{meeting.meetingDescription}</Text>
                  </View>
                  <View style={styles.cell2}>
                    <Text style={styles.cellText}>{meeting.joinDate}</Text>
                  </View>
                  
                </View>
              ))}
            </View>
          </View>
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
        </ScrollView>
      </View>
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
  container: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  greenBox: {
    width: 1000,
    backgroundColor: '#F8F8F8',
  },
  table: {
    marginTop: 20,
  },
  open: {
    color: "coral",
    fontSize: 14,
    borderColor: "coral",
    backgroundColor: '#f7fff4',
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontFamily: "Roboto-Light",
    textAlign: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    padding: 5,
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  cell2: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 14,
    fontFamily: "Roboto-Light",
  },
  linkText: {
    color: "#206C00",
    fontSize: 14,
    fontFamily: "Roboto-Light",
    textDecorationLine: 'underline',
  },
  linkButton: {
    backgroundColor: "#206C00",
    padding: 10,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    height: 40
  },
  coralButton: {
    borderColor: "#206C00",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
    height: 40,
    marginRight: 30
  },
});

export default MyComponent;
