import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';
import CustomAlert from '../components/CustomAlert'; 
import moment from 'moment-timezone';

function MyComponent({ onClose }) {
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();
  const [selectedHubData, setSelectedHubData] = useState(null); // State for storing hub data
  const [Sessionsheld, setSessionsheld] = useState('0');
  const [Sessionsmissed, setSessionsmissed] = useState('0');
  const [Confirmed, setSetConfirmed] = useState('No');
  const [attend, setattend] = useState('No');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hasJoinedHub, setHasJoinedHub] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState([]);
   const [hubs, setHubs] = useState([]);
  

  const apiUrl = process.env.REACT_APP_API_URL;


  // Fetch hubs and check for joining status
  useEffect(() => {
    const fetchHubs = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/jobseeker/get-jobseeker-hub`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.status === 'success' && data.JoinedHubs.length > 0) {
          setHubs(data.JoinedHubs);

          // Check if selectedHubData is defined before accessing its properties
          if (selectedHubData && selectedHubData.coaching_hub_name) {
            const isJoined = data.JoinedHubs.some(hub => hub.coaching_hub_name === selectedHubData.coaching_hub_name);
            setHasJoinedHub(isJoined); // Set the joined status
          } else {
            setHasJoinedHub(false); // If selectedHubData is null, set to false
          }
        } else {
          setHubs([]);
          setHasJoinedHub(false); // No hubs, so set to false
        }
      } catch (error) {
        console.error('Error fetching hubs:', error);
        setHubs([]);
        setHasJoinedHub(false); // Error case, also set to false
      }
    };

    fetchHubs();
  }, [selectedHubData]); // Include selectedHubData as a dependency

  const leaveHubHandler = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Retrieve the token from AsyncStorage
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await fetch(`${apiUrl}/api/jobseeker/unjoin-hub`, {
        method: 'POST', // Assuming POST is required for this endpoint
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          coaching_hub_name: selectedHubData.coaching_hub_name,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to leave hub: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Successfully left the hub:', data);

      // Update UI or state
      setHasJoinedHub(false);
    } catch (error) {
      console.error('Error leaving the hub:', error.message);
    }
    window.location.reload();
  };
  
  const handleJoinMeeting = async (meeting) => {
    try {
      // Retrieve necessary information from AsyncStorage
      const firstName = await AsyncStorage.getItem('first_name');
      const lastName = await AsyncStorage.getItem('last_name');
      const jobseekerId = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('token'); // Get token for authorization

      const jobseekerName = `${firstName} ${lastName}`;
      const meeting_id = String(meeting.meeting_id); // Ensure meeting_id is a string
      const isRegistered = registrationStatus.includes(meeting_id); // Check registration status

      // Prepare meeting details for the API call
      const meetingDetails = {
        meeting_topic: meeting.hubSpec, // Use the specific topic from the meeting
        candidate_link: meeting.candidate_link,
        expert_link: meeting.expert_link,
        description: meeting.description,
        meeting_date: meeting.date,
        hub_id: String(selectedHubData.hub_id),
        expert_id: String(selectedHubData.user_id),
        jobseeker_name: jobseekerName,
        jobseeker_id: jobseekerId,
      };

      // Determine the correct API endpoint based on the registration status
      const url = `${apiUrl}/api/expert/${isRegistered ? 'leave' : 'join'}-meeting`;

      // POST to join or leave the meeting
      const response = await axios.post(url, meetingDetails, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
        },
      });

      // Check if the action was successful
      if (isRegistered) {
        // Unregistering from the meeting
        if (response.status === 200) {
          setAlertMessage('You have successfully unregistered from the meeting');
          // Update the registration status locally
          setRegistrationStatus((prevStatus) => prevStatus.filter((id) => id !== meeting_id));
        } else {
          setAlertMessage('An error occurred while unregistering.');
        }
      } else {
        // Registering for the meeting
        if (response.status === 201) {
          setAlertMessage('You have successfully joined the meeting');
          // Update the registration status locally
          setRegistrationStatus((prevStatus) => [...prevStatus, meeting_id]);
        } else {
          setAlertMessage('An error occurred while joining the meeting.');
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        setAlertMessage('You have already registered/unregistered for this meeting.');
      } else {
        setAlertMessage('An error occurred while processing your request.');
      }
    } finally {
      setAlertVisible(true);
    }
  };


  
  const createHubAndJoinExpertHub = async () => {
    setIsPressed(true);
    setAlertMessage(''); // Reset alert message before processing
    setAlertVisible(false); // Hide alert initially

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      // POST to create the hub
      const createHubResponse = await axios.post(`${apiUrl}/api/jobseeker/create-hub`, {
        category: selectedHubData.category,
        meeting_day: selectedHubData.created_at,
        from: selectedHubData.created_at,
        to: selectedHubData.created_at,
        coaching_hub_name: selectedHubData.coaching_hub_name,
        expert_name: selectedHubData.expert_name,
        coaching_hub_description: selectedHubData.coaching_hub_description,
        coaching_hub_fee: selectedHubData.coaching_hub_fee,
        attend: attend
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check for successful hub creation
      if (createHubResponse.status === 200 || createHubResponse.status === 201) {
        console.log('Hub successfully created');
        setAlertMessage('Hub joined successfully');
        setAlertVisible(true); // Show alert only if successful

        const firstName = await AsyncStorage.getItem('first_name');
        const lastName = await AsyncStorage.getItem('last_name');
        const jobseekerId = await AsyncStorage.getItem('user_id');
        const jobseekerName = `${firstName} ${lastName}`;

        // POST to join the expert hub
        const joinResponse = await axios.post(`${apiUrl}/api/jobseeker/join-expert-hub`, {
          jobseeker_name: jobseekerName,
          jobseeker_id: jobseekerId,
          expert_id: selectedHubData.user_id,
          hub_name: selectedHubData.coaching_hub_name,
          hub_id: selectedHubData.hub_id,
          hub_sessions_held: Sessionsheld,
          hub_sessions_missed: Sessionsmissed,
          confirmed_attendance: Confirmed
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (joinResponse.status === 200) {
          console.log('Successfully joined the expert hub');
           setAlertMessage("You've sucessfully joined this hub.");
        } else if (joinResponse.status === 400) {
          setHasJoinedHub(true);
        }

      } else {
        setAlertMessage('Error joining hub');
        setAlertVisible(true);
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Error:', errorMessage);
      setAlertMessage(errorMessage);
      setAlertVisible(true);
    }
    window.location.reload();
  };

  const checkRegistration = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) throw new Error('User is not authenticated.');

      const response = await axios.get(`${apiUrl}/api/expert/get-individual-meeting`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('API Response:', response.data);

      // Extract meeting IDs from response and convert them to strings
      const registrations = Array.isArray(response.data)
        ? response.data.map((meeting) => String(meeting.meeting_id))
        : response.data.status === 'success' && Array.isArray(response.data.data)
        ? response.data.data.map((meeting) => String(meeting.meeting_id))
        : [];

      console.log('Registrations:', registrations); // Log registrations for debugging
      setRegistrationStatus(registrations); // Store meeting IDs the user is registered for
    } catch (error) {
      console.error('Error checking registration:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Call checkRegistration in useEffect
  useEffect(() => {
    checkRegistration();
  }, []);


  const handleJoinLink = async (meeting) => {
    try {
      // Check if the user is registered for this meeting
      const meeting_id = String(meeting.meeting_id);
      if (!registrationStatus.includes(meeting_id)) {
        setAlertMessage('Please register for this meeting before joining.');
        setAlertVisible(true); // Move this line directly after setting the alert message
        return; // Return here to exit if the user isn't registered
      }

      // Get the user token and candidate details from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const firstName = await AsyncStorage.getItem('first_name');
      const lastName = await AsyncStorage.getItem('last_name');
      const candidateName = `${firstName} ${lastName}`;
      const duration = meeting.duration;
      
      if (!token || !candidateName) {
        console.error("Token or candidate name missing.");
        return;
      }

      // API request
      const response = await axios.post(
        `${apiUrl}/api/expert/join-candidate`,
        { meeting_id, duration, candidate_name: candidateName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Check response for success and open the candidate link
      if (response.data.status === "success" && response.data.candidate_link) {
        const { candidate_link } = response.data;
        Linking.openURL(candidate_link); // Open the candidate link
      } else {
        alert('Failed to retrieve the meeting link.');
      }
    } catch (error) {
      console.error("Error joining meeting:", error);
      alert('Failed to join the meeting. Please try again.');
    }
  };

  const filterMeetings = (hubName) => {
    setSelectedHub(hubName);
    const filtered = meetings.filter(meeting => meeting.hubName === hubName);
    setFilteredMeetings(filtered);
    setShowAll(false); // Reset to show only two meetings when a new hub is selected
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('selectedHubData');
        if (data) {
          setSelectedHubData(JSON.parse(data)); // Parse and set the retrieved data
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage: ", error);
      }
    };

    fetchData();
  }, []); // Fetch data on component mount
  
  const getWidthByLevel = (level) => {
    switch (level) {
      case "Beginner":
        return '33%'; // For Beginner
      case "Intermediate":
        return '66%'; // For Intermediate
      case "Advanced":
        return '100%'; // For Advanced
      default:
        return '0%'; // Default if level is not recognized
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);
    
    // Use toLocaleString to format the date
    return date.toLocaleString('en-GB', options).replace(',', ''); // Remove comma if needed
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
    onClose();
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: "white", marginTop: 40 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Close button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
            ✕
          </Text>
        </TouchableOpacity>

        <View style={styles.darkGreenBox}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              {/* Render the selected hub title */}
              {selectedHubData && (
                <>
                  <Text style={styles.sessionTitle}>{selectedHubData.coaching_hub_name}</Text>
                  <View style={styles.iconRow}>
                   
                    <View style={styles.iconTextWrapper}>
                      <Icon name="calendar-outline" size={20} color="#FFF" style={styles.icon} />
                      <Text style={styles.iconText}>{t(`Created: ${formatDate(selectedHubData.created_at)}`)}</Text>
                    </View>
                    <View style={styles.iconTextWrapper}>
  <Icon name="folder-outline" size={20} color="#FFF" style={styles.icon} />
  <Text style={styles.iconText}>{selectedHubData.category}</Text>
</View>
                    <View style={styles.iconTextWrapper}>
                      <Icon name="globe-outline" size={20} color="#FFF" style={styles.icon} />
                      <Text style={styles.iconText}>{t("Online")}</Text>
                    </View>
                    
                  </View>
                  <Image
                    source={require('../assets/TG4.png')}
                    style={styles.sessionImage}
                  />
                </>
              )}
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 50 }}>
              <Text style={styles.overviewTitle}>{t("Overview")}</Text>
              {selectedHubData && (
                <>
                  <Text style={styles.overview}>{selectedHubData.coaching_hub_description}</Text>
                  <Text style={styles.learningObjectivesTitle}>{t("Learning Objectives")}</Text>
                  <Text style={styles.learningObjectives}>{selectedHubData.learning_obj}</Text>
                  <Text style={styles.learningObjectivesTitle}>{t("Specialization")}</Text>
                  <Text style={styles.learningObjectives}>{selectedHubData.specialization}</Text>
                  <View style={styles.experienceTitleWrapper}>
                    <Text style={styles.experienceTitle}>{t("For")}</Text>
                  </View>

                 <View style={styles.lineWrapper}>
    <View style={[styles.filledLine, { width: selectedHubData ? getWidthByLevel(selectedHubData.level) : '0%' }]} />
  </View>

  <View style={styles.experienceLevels}>
    <Text style={styles.experienceLevel}>{t("Beginners")}</Text>
    <Text style={styles.experienceLevel}>{t("Intermediates")}</Text>
    <Text style={styles.experienceLevel}>{t("Advanced")}</Text>
  </View>

                </>
              )}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                <TouchableOpacity
                  onPress={createHubAndJoinExpertHub}
                  style={{
                    backgroundColor: hasJoinedHub ? 'lightgreen' : '#206C00',
                    borderRadius: 5,
                    marginRight: hasJoinedHub ? 10 : 0, // Add spacing only if "Leave Hub" is shown
                    width: hasJoinedHub ? 300 : 120,
                    padding: 10,
                    justifyContent: 'center',
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={{
                      color: hasJoinedHub ? 'black' : 'white',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}
                  >
                    {hasJoinedHub ? 'You have already joined this hub ✔ ' : 'Join Hub'}
                  </Text>
                </TouchableOpacity>

                {hasJoinedHub && (
                  <TouchableOpacity
                    onPress={leaveHubHandler} // Replace with your logic to leave the hub
                    style={{
                      backgroundColor: 'red',
                      borderRadius: 5,
                      padding: 10,
                      justifyContent: 'center',
                      width: 120,
                    }}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}
                    >
                      Leave Hub
                    </Text>
                  </TouchableOpacity>
                )}
              </View>


            </View>
           
          </View>
          
        </View>

        <View style={styles.whiteBox}>
          <Text style={styles.scheduleTitle}>{t("Knowledge sharing sessions")}</Text>

          {/* Check if selectedHubData exists and contains meetings */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>{t("Description")}</Text>
              <Text style={styles.headerText}>{t("Date/Time")}</Text>
              <Text style={styles.headerText}>{t(" ")}</Text>
            </View>

            {selectedHubData && selectedHubData.meeting &&
              (typeof selectedHubData.meeting === 'object') && Object.keys(selectedHubData.meeting).length > 0 ? (
                Object.keys(selectedHubData.meeting)
                  .filter((key) => {
                    const meeting = selectedHubData.meeting[key];
                    if (!meeting.time) return false; // Exclude meetings with no time

                    const meetingTime = moment(meeting.time);
                    const now = moment();
                    const past24Hours = now.clone().subtract(24, 'hours');

                    // Include only meetings within the past 24 hours or in the future
                    return meetingTime.isBetween(past24Hours, now) || meetingTime.isAfter(now);
                  })
                  .map((key) => {
                    const meeting = selectedHubData.meeting[key];
                    const userTimezone = moment.tz.guess(); // Get the user's timezone
                    const meetingDate = meeting.time ? moment(meeting.time).tz(userTimezone) : null; // Convert the date

                    return (
                      <View key={key} style={styles.scheduleRow}>
                        <Text style={styles.cell}>{meeting.description || "No description available"}</Text>
                        <Text style={styles.cell}>
                          {meetingDate ? meetingDate.format('LLLL') : "No date available"} {/* Format the date as needed */}
                        </Text>

                        <TouchableOpacity 
                          style={styles.button} 
                          onPress={() => handleJoinMeeting(meeting)} // Pass the meeting object to the function
                        >
                          <Text style={styles.buttonText}>
                            {registrationStatus.includes(String(meeting.meeting_id)) ? 'Unregister' : 'Register'}
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.cell2} />
                        <TouchableOpacity 
                          style={styles.linkbutton} 
                          onPress={() => handleJoinLink(meeting)}
                        >
                          <Text style={styles.linkText}>{t("Join Meeting")}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })
              ) : (
                <Text>{t("No meetings available.")}</Text> // Fallback if no meetings exist
              )}

          </View>


        </View>








      </ScrollView>
      <CustomAlert
  visible={alertVisible}
  title={t("Alert")}
  message={alertMessage}
  onConfirm={hideAlert}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  darkGreenBox: {
    width: 1200,
    backgroundColor: '#013220',
    padding: 20,
  },
  topicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sessionImage: {
    width: 600,
    height: 300,
    marginTop: 20
  },
  detailsColumn: {
    flex: 1,
    paddingRight: 20,
  },
  sessionTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: "rgba(225,225,212,0.3)",
    padding: 10,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  iconText: {
    color: 'white',
    fontSize: 14,
    marginRight: 30
  },
  overviewTitle: {
    marginTop: 14,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  overview: {
    marginTop: 5,
    color: '#FFF',
    fontSize: 14,
    width: 480,
    marginRight: 10
  },
  learningObjectivesTitle: {
    marginTop: 14,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  learningObjectives: {
    marginTop: 5,
    color: '#FFF',
    fontSize: 14,
    width: 480,
     marginRight: 10
  },
  experienceTitle: {
    marginTop: 20,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  experienceLevels: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'space-between',
    width: 480,
     marginRight: 10
  },
  experienceLevel: {
    color: '#FFF',
    fontSize: 14,
    marginRight: 20
  },
  experienceTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lineWrapper: {
    width: '90%', // Full width of the container
    height: 4,
    backgroundColor: '#CCC', // Light grey for the unfilled portion
    marginBottom: 10,
  },
  filledLine: {
    height: '90%',
    backgroundColor: '#206C00', // Dark green for the filled portion
  },
  rolesTitle: {
    marginTop: 20,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  role: {
    marginTop: 5,
    color: '#FFF',
    fontSize: 16,
  },
  scheduleButton: {
    marginTop: 20,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  whiteBox: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 20,
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  table: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0, // Horizontal offset
      height: 2, // Vertical offset
    },
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.5, // Blur radius
    // Android shadow property
    elevation: 5, 
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: 'none', // Light grey for the header
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    textAlign: 'center'
  },
  cell: {
    flex: 1, // Ensures the cell takes equal space
    paddingHorizontal: 10, // Horizontal padding within cells
    paddingVertical: 20, // Add padding for the row
    borderRightWidth: 1, // Right border for cell separation
    borderRightColor: '#CCC', // Color of the right border
    height: 50,
    textAlign: 'center',
    width: 300,
    overflow: 'hidden'
  },
  cell2: {
    borderRightWidth: 1, // Right border for cell separation
    borderRightColor: '#CCC', // Color of the right border
    height: 50
  },
  cell3: {
    borderRightWidth: 1, // Right border for cell separation
    borderRightColor: '#CCC', // Color of the right border
    height: 20,
    padding: 20
  },
  headerText: {
    flex: 2,
    padding: 10,
    textAlign: 'center'
  },
  description: {
    flex: 2,
    color: '#333',
  },
  time: {
    flex: 1,
    color: '#333',
  },
  button: {
    backgroundColor: 'coral',
    padding: 8,
    alignItems: 'center',
    borderRadius: 10,
    width: 120,
    marginLeft: 20,
    marginRight: 20
  },
  linkbutton: {
    borderColor: 'coral',
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
    borderRadius: 10,
    width: 120,
    marginLeft: 20,
    marginRight: 20
  },
 linkText: {
    color: 'coral',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
});

export default MyComponent;