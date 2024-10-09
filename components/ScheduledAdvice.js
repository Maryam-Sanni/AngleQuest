import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, Image } from 'react-native';
import OpenSchedule from '../Experts/OpenScheduledadvice';
import OpenSchedule2 from '../Experts/AdviceResponse';
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
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Number of meetings to display per page
  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  // Get the current meetings to display based on the page
  const displayedMeetings = meetings.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const { t } = useTranslation();
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

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

  const handleOpenPopup = (meeting) => {
    setSelectedMeeting(meeting);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleFeedback = async () => {
    try {
      // Save the selected meeting data to AsyncStorage
      await AsyncStorage.setItem('selectedMeeting', JSON.stringify(selectedMeeting));
      console.log('Selected meeting saved:', selectedMeeting);

      // Open the feedback modal (you can implement this as needed)
      setModalVisible(true);
      handleClosePopup();
    } catch (error) {
      console.error('Failed to save selected meeting to AsyncStorage', error);
    }
  };

  const handleStartMeeting = () => {
    const meetingLink = selectedMeeting.expert_link || 'https://default.meeting.link';
    if (meetingLink) {
      Linking.openURL(meetingLink).catch(err => console.error("Couldn't load page", err));
    } else {
      console.warn('No valid link available');
    }
    handleClosePopup();
  };
  
  useEffect(() => {
    const loadFormData = async () => {
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

          // Filter meetings based on expert_id and completed status
          const filteredMeetings = data
            .filter(meeting => 
              meeting.expertid === storedExpertId && meeting.completed !== "Yes"
            )
            .sort((a, b) => new Date(a.date_time) - new Date(b.date_time)); // Sorting by date_time in ascending order

          setMeetings(filteredMeetings);

          // Save all growth plans to AsyncStorage
          await AsyncStorage.setItem('allExpertsskillanalysis', JSON.stringify(data));
          console.log('All expert skill analysis saved:', data);
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

        const response = await fetch(`${apiUrl}/api/jobseeker/meetings/get?type=advice`, {
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
            meeting => meeting.expert_id === storedExpertId
          );

          if (matchingMeetings.length > 0) {
            // Sort the filtered meetings by created_at in descending order
            const sortedMeetings = matchingMeetings.sort(
              (a, b) => new Date(a.date_time) - new Date(b.date_time)
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

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>{t("Scheduled")}</Text>
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
              <Text style={styles.headerText}>{t("Meeting Date")}</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.cell2}>
                <Text style={styles.headerText}>Action</Text>
               </View>
            </TouchableOpacity>
          </View>

      {displayedMeetings.map((meeting, index) => {
        const dateTime = new Date(meeting.date_time);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

            return (
          <View key={index} style={styles.row}>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../assets/useravatar.jpg')} style={styles.image} />
                    <Text style={styles.cellText}>{meeting.name}</Text>
                  </View>
                </View>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{meeting.role}</Text>
                </View>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{t("Individual")}</Text>
                </View>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{date} {time}</Text>
                </View>
                <TouchableOpacity onPress={() => handleOpenPopup(meeting)}>
                  <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: -10, color: 'green' }}>...    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={goToPreviousPage} disabled={currentPage === 0}>
              <Text style={currentPage === 0 ? styles.disabledButton : styles.button}>{'<'}</Text>
            </TouchableOpacity>
            <Text>{`Page ${currentPage + 1} of ${totalPages}`}</Text>
            <TouchableOpacity onPress={goToNextPage} disabled={currentPage >= totalPages - 1}>
              <Text style={currentPage >= totalPages - 1 ? styles.disabledButton : styles.button}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        
        <Modal
          transparent={true}
          animationType="slide"
          visible={popupVisible}
          onRequestClose={handleClosePopup}
        >
          <View style={styles.popupContainer}>
            <View style={styles.popupContent}>
              <View style={{flexDirection: 'row'}}>
              <Text style={styles.popupTitle}>{t("Select")}</Text>
              <TouchableOpacity onPress={handleClosePopup} style={styles.closeButton}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: 'bold',
                    fontFamily: "Roboto-Light",
                    marginLeft: 80
                  }}
                >
                  ✕
                </Text>
              </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.popupOptionContainer} onPress={handleFeedback}>
                <Image 
                  source={require('../assets/TextFeed.jpeg')} 
                  style={styles.icon}
                />
                <Text style={styles.popupOption}>{t("Give Feedback")}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.popupOptionContainer} onPress={handleStartMeeting}>
                <Image 
                  source={require('../assets/VidFeed.jpeg')} 
                  style={styles.icon}
                />
                <Text style={styles.popupOption}>{t("Start Meeting")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
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
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
  greenBox: {
    width: "90%",
    position: 'relative',
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
    fontFamily: "Roboto-light",
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'none', 
  },
  popupContent: {
    width: 170,
    backgroundColor: '#F8F8F8', // Pastel green color
    padding: 10,
    position: 'absolute', // Change to absolute positioning
    right: 50,
    top: '50%', // Center vertically
    transform: 'translateY(-50%)', // Adjust to truly center
    borderWidth: 2, // Add border width
    borderColor: '#135837', // Border color (same as your other styles)
    borderRadius: 10, // Optional: add some rounding to the corners
    },
  popupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popupOption: {
    padding: 5,
    fontSize: 13,
  },
  popupClose: {
    padding: 10,
    fontSize: 16,
    color: 'red',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50
  },
  button: {
    fontSize: 18,
    color: 'darkgreen',
  },
  disabledButton: {
    fontSize: 18,
    color: 'gray',
  },
  popupOptionContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
  icon: {
    width: 15, 
    height: 15,
    marginRight: 10,
  },
});

export default ScheduledMeetingsTable;