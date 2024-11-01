import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Switch,
    Linking,
    TouchableOpacity,
    Modal, FlatList,
ActivityIndicator,
    ImageBackground,
} from "react-native";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import PastSessions from "../Jobseekers/HubMeeting";
import HubsAssignments from "../components/HubsAssignments";
import OpenModal from "../Jobseekers/Pickyourhub";
import { useNavigate } from 'react-router-dom';
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import CustomAlert from '../components/CustomAlert'; 
import moment from 'moment-timezone';

function MyComponent() {
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [hubs, setHubs] = useState([]);
    const [selectedHub, setSelectedHub] = useState(null);
    const [isAttending, setIsAttending] = useState(false);
      const [isModalVisible, setisModalVisible] = useState(false);
     const [meetingsData, setMeetingsData] = useState([]);
    const [loading, setLoading] = useState(false);
      const [alertMessage, setAlertMessage] = useState('');
      const [alertVisible, setAlertVisible] = useState(false);

     const apiUrl = process.env.REACT_APP_API_URL;
    
    const toggleAttendance = () =>
        setIsAttending((previousState) => !previousState);

    const handleOpenPress = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handlejoinPress = () => {
        Linking.openURL("https://meet.anglequest.com");
    };

    const handleHubPress = async () => {
      try {
        await AsyncStorage.setItem('hub_name', selectedHub.coaching_hub_name); // Save the coaching hub name
        setisModalVisible(true); // Show the modal to fetch meeting data
        fetchMeetingsData(selectedHub.coaching_hub_name); // Fetch meetings data based on selected hub name
      } catch (error) {
        console.error("Error saving hub name:", error);
      }
    };

    const fetchMeetingsData = async (hubName) => {
      setLoading(true);
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem('token'); // Replace 'token' with your key
        const response = await axios.get(`${apiUrl}/api/expert/hubs/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { AllHubs } = response.data;

        if (hubName) {
          // Filter using coaching_hub_name
          const filteredHubs = AllHubs.filter(hub => hub.coaching_hub_name === hubName);
          setMeetingsData(filteredHubs);
        }
      } catch (error) {
        console.error("Error fetching meeting data:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleJoinLink = async (meeting) => {
      try {
        // Get the user token and candidate details from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        const firstName = await AsyncStorage.getItem('first_name');
        const lastName = await AsyncStorage.getItem('last_name');
        const candidateName = `${firstName} ${lastName}`;

        if (!token || !candidateName) {
          console.error("Token or candidate name missing.");
          return;
        }

        // Meeting ID
        const meeting_id = String(meeting.meeting_id);

        // API request
        const response = await axios.post(
          `${apiUrl}/api/expert/join-candidate`,
          { meeting_id, candidate_name: candidateName },
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
    
    const handleJoinMeeting = async (meeting, hubId, expertId) => {
      try {
        // Retrieve necessary information from AsyncStorage
        const firstName = await AsyncStorage.getItem('first_name');
        const lastName = await AsyncStorage.getItem('last_name');
        const jobseekerId = await AsyncStorage.getItem('user_id');
        const token = await AsyncStorage.getItem('token'); // Get token for authorization

        const jobseekerName = `${firstName} ${lastName}`;

        // Prepare meeting details for the API call
        const meetingDetails = {
          meeting_topic: "Your Meeting Topic", // Adjust this to reflect actual meeting topic if available
          candidate_link: meeting.candidate_link,
          expert_link: meeting.expert_link,
          description: meeting.description,
          meeting_date: meeting.date,
          hub_id: String(hubId), // Use the passed hubId
          expert_id: expertId, // Use the passed expertId
          jobseeker_name: jobseekerName,
          jobseeker_id: jobseekerId,
        };

        // POST to join the meeting
        const joinMeetingResponse = await axios.post(
          `${apiUrl}/api/expert/join-meeting`,
          meetingDetails,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token for authorization
            },
          }
        );

        // Check if joining the meeting was successful
        if (joinMeetingResponse.status === 201) {
          setAlertMessage('You have successfully joined the meeting');
        } else {
          setAlertMessage('An error occurred while joining the meeting.');
        }
      } catch (error) {
        console.error(error);

        // Check for 400 status code in the error response
        if (error.response && error.response.status === 400) {
          setAlertMessage('You have already joined this meeting.');
        } else {
          setAlertMessage('An error occurred while processing your request.');
        }
      } finally {
        setAlertVisible(true); // Always show alert, whether success or error
      }
    };




      const handleJoinlink = (link) => {
        Linking.openURL(link); // Open the meeting link
      };

      const handleRegister = () => {
        // Implement your registration logic here
        console.log("Registration for meeting initiated.");
      };
    
    useEffect(() => {
        const fetchHubs = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/api/jobseeker/get-all-jobseeker-hubs`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                if (data.status === 'success' && data.AllJoinedHubs.length > 0) {
                    setHubs(data.AllJoinedHubs);
                    setSelectedHub(data.AllJoinedHubs[0]);
                } else {
                    setHubs([]);
                    setSelectedHub(null);
                    // Redirect to Coaching Hubs page if no hubs are available
                    navigate('/coaching-hub-new'); // Make sure 'CoachingHubsPage' matches your route name
                }
            } catch (error) {
                console.error('Error fetching hubs:', error);
                setHubs([]);
                setSelectedHub(null);
                // Redirect to Coaching Hubs page on error as well
                navigate('/coaching-hub-new'); // Make sure 'CoachingHubsPage' matches your route name
            }
        };

        fetchHubs();
    }, [navigate]);

    const [fontsLoaded] = useFonts({
        "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    });
    const { t } = useTranslation();

      const hideAlert = () => {
        setAlertVisible(false);
        setIsVisible(false);
        onClose();
      };
    
    if (!selectedHub) {
        return null; // Or you can navigate to another screen here if necessary
    }

    return (
        <ImageBackground
            source={require("../assets/backgroundimg2.png")}
            style={{ height: "100%", width: "100%", flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                <Topbar />
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Sidebar />
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}
                    >
                        <View style={{  marginLeft: 270 }}>
                            <View style={styles.header}>
                               
                                <Text style={{fontSize: 24, color: '#206C00', fontWeight: '600', marginLeft: 70 }}>Knowledge Sharing Sessions</Text>
                                       
                        
                            </View>
                             <TouchableOpacity onPress={handleOpenPress}>
                                <View style={{ position: 'absolute', right: 80, top: -45, paddingHorizontal: 8, paddingVertical: 10, borderRadius: 5, backgroundColor: 'coral', width: 100, alignItems: 'center',}}>
                                                <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("Join New Hub")}</Text>
                                              </View>
                                 </TouchableOpacity>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={handleCloseModal}
                            >
                                <View style={styles.modalContent}>
                                    <OpenModal
                                        onClose={() => handleCloseModal()}
                                    />
                                </View>
                            </Modal>
                            <PastSessions />
                           
                      
                          
                        </View>
                    </ScrollView>
                </View>
            </View>

            <Modal
              visible={isModalVisible}
              transparent={true}
              onRequestClose={() => setisModalVisible(false)}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ width: '80%', height: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Knowledge Sharing Sessions</Text>
                  <TouchableOpacity onPress={() => setisModalVisible(false)} style={{ position: 'absolute', right: 20 }}>
                    <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                      ✕
                    </Text>
                  </TouchableOpacity>
                  {loading ? (
                    <ActivityIndicator size="large" color="#206C00" />
                  ) : meetingsData.length > 0 ? (
                    <ScrollView style={{ flex: 1 }}>
                      {meetingsData.map((hub, index) => (
                        <View key={index} style={{ marginBottom: 20 }}>
                          <Text style={{ fontWeight: "600", fontSize: 16 }}>{hub.coaching_hub_name}</Text>

                          {hub.meeting && Object.values(hub.meeting).length > 0 ? (
                            <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginTop: 10 }}>
                              {/* Table Header */}
                              <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', padding: 10 }}>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>Description</Text>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>Date</Text>
                                <Text style={{ flex: 1, fontWeight: "bold" }}>Actions</Text>
                              </View>

                              {/* Table Rows */}
                              {Object.values(hub.meeting).map((meeting, idx) => {
                                const userTimezone = moment.tz.guess(); // Get the user's timezone
                                const meetingDate = meeting.date ? moment(meeting.date).tz(userTimezone) : null; // Convert the date

                                return (
                                  <View key={idx} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                                    <Text style={{ flex: 1 }}>{meeting.description}</Text>
                                    <Text style={{ flex: 1 }}>{meetingDate ? meetingDate.format('LLLL') : "No date available"}</Text>
                                    {/* Actions */}
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity
                                          onPress={() => handleJoinLink(meeting)}
                                          style={{
                                            backgroundColor: "#206C00",
                                            padding: 5,
                                            borderRadius: 5,
                                            width: 100
                                          }}
                                        >
                                          <Text style={{ color: "white", textAlign: "center", fontSize: 12 }}>Join</Text>
                                        </TouchableOpacity>

                                      <TouchableOpacity
                                        onPress={() => handleJoinMeeting(meeting, hub.id, hub.user_id)} // Pass hub.id and hub.user_id
                                        style={{
                                          borderColor: "#206C00",
                                          borderWidth: 1,
                                          padding: 5,
                                          borderRadius: 5,
                                          width: 100
                                        }}
                                      >
                                        <Text style={{ color: "#206C00", textAlign: "center", fontSize: 12 }}>Register</Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                );
                              })}
                            </View>
                          ) : (
                            <Text>No meetings available</Text>
                          )}
                        </View>
                      ))}
                    </ScrollView>
                  ) : (
                    <Text>No meetings available</Text>
                  )}
                </View>
              </View>
            </Modal>


             <CustomAlert
              visible={alertVisible}
              title={t("Alert")}
              message={alertMessage}
              onConfirm={hideAlert}
            />

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        marginLeft: -60,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(225,225,212,0.3)",
        backgroundColor: "white",
    },
    item: {
        marginBottom: 10, // space between items
    },
    selectedItem: {
        justifyContent: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            borderColor: "#135837",
            backgroundColor:
                "#135837",
            alignItems: "center",
            marginTop: 20,
            borderWidth: 1,
        marginRight: 20,
    },
    unselectedItem: {
        justifyContent: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            borderColor: "#f7fff4",
            backgroundColor:
                "rgba(211,249,216,0.3)",
            alignItems: "center",
            marginTop: 20,
            borderWidth: 1,
        marginRight: 20,
    },
    hubText: {
        padding: 5,
        paddingHorizontal: 15,
        fontFamily: "Roboto-Light",
    },
    selectedText: {
        color: "#fff", // white text
    },
    unselectedText: {
        color: "#f7fff4", // green text
    },
    hubName: {
        color: "#206C00",
        borderColor: "#63EC55",
        borderWidth: 2,
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        fontFamily: "Roboto-Light",
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5,
    },
    newHubButton: {
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: "#f7fff4",
        backgroundColor: "rgba(211,249,216,0.3)",
        width: 150,
        alignItems: "center",
        marginTop: 20,
        marginLeft: 50,
        borderWidth: 1,
    },
    newHubText: {
        fontSize: 13,
        color: "#f7fff4",
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Roboto-Light",
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 50,
        maxWidth: "90%",
        marginLeft: 50,
    },
    box: {
        backgroundColor: "#f7fff4",
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "22%",
        height: 150,
        borderWidth: 2,
        borderColor: "rgba(225,225,212,0.3)",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    nextMeetingTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#206C00",
        fontFamily: "Roboto-Light",
    },
    meetingDetail: {
        fontSize: 14,
        color: "#206C00",
        fontFamily: "Roboto-Light",
    },
    joinButton: {
        marginTop: 10,
        backgroundColor: "#206C00",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    joinText: {
        color: "#f7fff4",
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "Roboto-Light",
    },
    hubDescriptionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#206C00",
        marginBottom: 10,
        fontFamily: "Roboto-Light",
    },
    hubDescription: {
        fontSize: 14,
        color: "#206C00",
        textAlign: "center",
        fontFamily: "Roboto-Light",
    },
    modalContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    confirmationTitle: {
        fontSize: 14,
        color: "black",
        fontWeight: "bold",
        fontFamily: "Roboto-Light",
    },
    attendanceConfirmation: {
        fontSize: 12,
        marginRight: 10,
        fontWeight: "600",
        fontFamily: "Roboto-Light",
    },
    boximage: {
        width: 30,
        height: 30,
        marginTop: -10,
        marginLeft: 10,
    },
    attendantTitle: {
        fontSize: 14,
        color: "black",
        fontWeight: "bold",
        marginTop: 10,
        fontFamily: "Roboto-Light",
    },
    confirmedCount: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: "bold",
        color: "#206C00",
        fontFamily: "Roboto-Light",
    },
    unconfirmedTitle: {
        fontSize: 14,
        color: "black",
        fontWeight: "bold",
        marginTop: 10,
        fontFamily: "Roboto-Light",
    },
    unconfirmedCount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
        marginTop: 5,
        fontFamily: "Roboto-Light",
    },
    image: {
        width: 20,
        height: 20,
        marginTop: 5,
        tintColor: "#666",
        marginLeft: 100,
    },
    switchrow: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        color: "#206C00",
        fontFamily: "Roboto-Light",
    },
});

export default MyComponent;