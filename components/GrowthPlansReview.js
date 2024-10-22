import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, Image } from 'react-native';
import OpenSchedule from '../Experts/OpenScheduledgrowth';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastExpertLink, setLastExpertLink] = useState(null);
  const [meetings, setMeetings] = useState([]);
   const [selectedMeeting, setSelectedMeeting] = useState(null);
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

          // Log to debug the values
          console.log('Data from API:', data);

          // Filter meetings based on expert_id and completed status
          const filteredMeetings = data.filter(meeting => {
            console.log(`Meeting completed: ${meeting.completed}, expertid: ${meeting.expertid}`);
            return meeting.expertid === storedExpertId && meeting.completed !== "Yes";
          });

          console.log('Filtered Meetings:', filteredMeetings);

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
            meeting => meeting.expert_id === storedExpertId
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

// Function to format date_time string
const formatDateTime = (dateTimeString) => {
  let date, time;

  // Check if the string contains a '|', indicating a non-standard format
  if (dateTimeString.includes('|')) {
    // Split the input string into date and time
    const [datePart, timePart] = dateTimeString.split(' | ');

    // Extract date components from the date part
    const dateComponents = datePart.trim().split(' '); // ["Tuesday,", "October", "22,", "2024"]
    
    // Check if we have the correct number of components
    if (dateComponents.length === 4) {
      const monthName = dateComponents[1]; // "October"
      const day = parseInt(dateComponents[2].replace(',', ''), 10); // "22"
      const year = parseInt(dateComponents[3], 10); // "2024"
      
      // Convert month name to month number
      const month = new Date(Date.parse(monthName + " 1")).getMonth(); // Get the month index (0-based)

      // Create a new Date object using the extracted values
      date = new Date(year, month, day);
    } else {
      console.error("Invalid date format:", datePart);
      return "Invalid Date"; // Handle invalid date
    }

    // Trim any extra spaces and set the time
    time = timePart.trim(); // Clean up any extra spaces
  } else {
    // If it's a proper format (assuming YYYY-MM-DDTHH:mm:ss or similar), parse directly
    date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date provided:", dateTimeString);
      return "Invalid Date"; // Handle invalid date
    }
    // Format time directly from the Date object
    time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  // Format the date to DD/MM/YYYY
  const formattedDate = `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;

  // Ensure the time is in the desired format (lowercase)
  const formattedTime = time.toLowerCase(); // Convert to lowercase

  return `${formattedDate} ${formattedTime}`; // Return the full formatted string
};

// Example usage:
const inputDateTime1 = "Tuesday, October 22, 2024 | 4:00 PM";
const formattedDateTime1 = formatDateTime(inputDateTime1);
console.log(formattedDateTime1); // Should output: "22/10/2024 4:00pm"

  
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
              <Text style={styles.headerText}>{t("Meeting Date")}</Text>
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

          {displayedMeetings.map((meeting, index) => {
            const formattedDateTime = formatDateTime(meeting.date_time);

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
                  <Text style={styles.cellText}>{t("Individual Account")}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                 <Text style={styles.cellText}>{formattedDateTime}</Text>
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
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
             <OpenSchedule onClose={handleCloseModal} meeting={selectedMeeting} />
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
});

export default ScheduledMeetingsTable;