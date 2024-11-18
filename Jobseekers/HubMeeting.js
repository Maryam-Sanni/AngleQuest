import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/CustomAlert";
import { Video } from 'expo-av';
import moment from "moment-timezone";

const HubMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [hubs, setHubs] = useState([]); // State for hubs
  const [selectedHub, setSelectedHub] = useState(null); // Track the selected hub
  const apiUrl = process.env.REACT_APP_API_URL; // Your API URL
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [expandedView, setExpandedView] = useState(false); 

  
  useEffect(() => {
    // When the expanded view is closed, reset the selected meeting
    if (!expandedView) {
      setSelectedMeeting(null);
    }
  }, [expandedView]);

  // Logic to toggle between "Upcoming" and "Past Sessions"
  const handleTabChange = (tab) => {
    if (tab === "Upcoming" && expandedView) {
      // Close the expanded view when switching to the "Upcoming" tab
      setExpandedView(false);
    }
  };
  
  // Move to the previous set of hubs
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Move to the next set of hubs
  const handleNext = () => {
    if (currentIndex < hubs.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const tabs = ["Upcoming", "Past Sessions", "Assessment"];

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const fetchJoinedHubs = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Retrieve the token
        const response = await axios.get(
          `${apiUrl}/api/jobseeker/get-jobseeker-hub`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use token for authentication
            },
          },
        );

        const data = response.data;
        if (data.status === "success" && data.JoinedHubs.length > 0) {
          // Set only coaching_hub_name values
          setHubs(data.JoinedHubs.map((hub) => hub.coaching_hub_name));

          // Set the first hub as the default selected hub
          setSelectedHub(data.JoinedHubs[0].coaching_hub_name);
        }
      } catch (error) {
        console.error("Error fetching joined hubs:", error);
      }
    };

    fetchJoinedHubs();
  }, [apiUrl]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Retrieve the token
        const response = await axios.get(`${apiUrl}/api/expert/hubs/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use token for authentication
          },
        });

        const allMeetings = response.data.AllHubs.flatMap((hub) => {
          if (Array.isArray(hub.meeting) && hub.meeting.length > 0) {
            return hub.meeting.map((meeting) => ({
              ...meeting,
              hubName: hub.coaching_hub_name,
              hubCat: hub.category,
              hubSpec: hub.specialization,
              hubId: hub.id,
              expertLink: hub.expert_link,
            }));
          }
          return []; // Return an empty array if no meetings are present
        });

        // Sort meetings by time, earliest to latest
        allMeetings.sort((a, b) => new Date(a.time) - new Date(b.time));

        setMeetings(allMeetings.length > 0 ? allMeetings : []); // Set meetings state
        setFilteredMeetings(allMeetings); // Initialize filtered meetings
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, [apiUrl]);

  const handleJoinMeeting = async (meeting) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const firstName = await AsyncStorage.getItem("first_name");
      const lastName = await AsyncStorage.getItem("last_name");
      const jobseekerId = await AsyncStorage.getItem("user_id");
      const jobseekerName = `${firstName} ${lastName}`;
      const meeting_id = String(meeting.meeting_id);
      const isRegistered = registrationStatus.includes(meeting_id);

      const meetingDetails = {
        meeting_topic: meeting.hubSpec,
        description: meeting.description,
        meeting_date: meeting.date,
        hub_id: String(meeting.hubId),
        meeting_id,
        expert_id: meeting.expert_id,
        jobseeker_name: jobseekerName,
        jobseeker_id: jobseekerId,
      };

      // Determine the correct API endpoint based on the registration status
      const url = `${apiUrl}/api/expert/${isRegistered ? "leave" : "join"}-meeting`;
      const response = await axios.post(url, meetingDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (isRegistered) {
        // Check if unregistration was successful (200 OK)
        if (response.status === 200) {
          setAlertMessage(
            "You have successfully unregistered from the meeting",
          );
          // Update the registration status locally by removing the meeting_id
          setRegistrationStatus((prevStatus) =>
            prevStatus.filter((id) => id !== meeting_id),
          );
        } else {
          setAlertMessage(
            "An error occurred while unregistering from the meeting.",
          );
        }
      } else {
        // Check if registration was successful (201 Created)
        if (response.status === 201) {
          setAlertMessage("You have successfully joined the meeting");
          // Update the registration status locally by adding the meeting_id
          setRegistrationStatus((prevStatus) => [...prevStatus, meeting_id]);
        } else {
          setAlertMessage("An error occurred while joining the meeting.");
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        setAlertMessage(
          "You have already registered/unregistered for this meeting.",
        );
      } else {
        setAlertMessage("An error occurred while processing your request.");
      }
    } finally {
      setAlertVisible(true);
    }
  };

  const checkRegistration = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) throw new Error("User is not authenticated.");

      const response = await axios.get(
        `${apiUrl}/api/expert/get-individual-meeting`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("API Response:", response.data);

      // Extract meeting IDs from response and convert them to strings
      const registrations = Array.isArray(response.data)
        ? response.data.map((meeting) => String(meeting.meeting_id))
        : response.data.status === "success" &&
            Array.isArray(response.data.data)
          ? response.data.data.map((meeting) => String(meeting.meeting_id))
          : [];

      console.log("Registrations:", registrations); // Log registrations for debugging
      setRegistrationStatus(registrations); // Store meeting IDs the user is registered for
    } catch (error) {
      console.error("Error checking registration:", error);
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
        setAlertMessage("Please register for this meeting before joining.");
        setAlertVisible(true); // Move this line directly after setting the alert message
        return; // Return here to exit if the user isn't registered
      }

      // Get the user token and candidate details from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      const firstName = await AsyncStorage.getItem("first_name");
      const lastName = await AsyncStorage.getItem("last_name");
      const candidateName = `${firstName} ${lastName}`;

      if (!token || !candidateName) {
        console.error("Token or candidate name missing.");
        return;
      }

      // API request
      const response = await axios.post(
        `${apiUrl}/api/expert/join-candidate`,
        { meeting_id, candidate_name: candidateName },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Check response for success and open the candidate link
      if (response.data.status === "success" && response.data.candidate_link) {
        const { candidate_link } = response.data;
        Linking.openURL(candidate_link); // Open the candidate link
      } else {
        alert("Failed to retrieve the meeting link.");
      }
    } catch (error) {
      console.error("Error joining meeting:", error);
      alert("Failed to join the meeting. Please try again.");
    }
  };

  const filteredByHub = meetings.filter((meeting) => meeting.hubName === selectedHub);

  const currentDate = new Date();
  const upcomingMeetings = filteredByHub.filter((meeting) => {
    const meetingDate = new Date(meeting.time);
    return meetingDate >= new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
  });

  const pastSessions = filteredByHub.filter((meeting) => {
    const meetingDate = new Date(meeting.time);
    return meetingDate < new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
  });

  // Define meetingsToDisplay based on the activeTab
  const meetingsToDisplay =
    activeTab === "Upcoming" ? upcomingMeetings : pastSessions;


  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hub buttons for filtering */}
      <View style={styles.hubButtonsContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Left Arrow */}
          {currentIndex > 0 && (
            <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
              <Text style={styles.arrowText}>←</Text>
            </TouchableOpacity>
          )}

          {/* Display three hubs based on the current index */}
          {hubs.slice(currentIndex, currentIndex + 3).map((hubName) => (
            <TouchableOpacity
              key={hubName}
              style={
                selectedHub === hubName
                  ? styles.selectedItem
                  : styles.unselectedItem
              }
              onPress={() => {
                setSelectedHub(hubName);
              }}
            >
              <Text
                style={
                  selectedHub === hubName
                    ? styles.selectedText
                    : styles.unselectedText
                }
              >
                {hubName}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Right Arrow */}
          {currentIndex < hubs.length - 3 && (
            <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
              <Text style={styles.arrowText}>→</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={{ backgroundColor: "rgba(211,249,216,0.1)", padding: 50 }}>
        <View style={{ flexDirection: "row", marginBottom: 30 }}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
              <Text
                style={{
                  fontSize: 18,
                  marginRight: 10,
                  padding: 5,
                  color: activeTab === tab ? "white" : "#D3D3D3",
                  borderRadius: 10,
                  borderWidth: activeTab === tab ? 1 : 0,
                  backgroundColor:
                    activeTab === tab ? "transparent" : "transparent",
                  borderColor: "white",
                  paddingHorizontal: 10, // Adds padding for better UX
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "Upcoming" || activeTab === "Past Sessions" ? (
          meetingsToDisplay.length > 0 ? (
            <>
              {meetingsToDisplay
                .slice(0, showAll ? meetingsToDisplay.length : 2)
                .map((meeting) => (
                  <View
                    key={meeting.meeting_id}
                    style={[styles.meetingContainer, activeTab === "Past Sessions" && selectedMeeting === meeting.meeting_id && { flexDirection: 'column' }]} // Apply layout change for selected past session
                  >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {activeTab === "Upcoming" ? (
                      // Display image for Upcoming sessions
                      <Image
                        source={{
                          uri: "https://img.icons8.com/?size=100&id=42287&format=png&color=000000",
                        }}
                        style={{
                          width: 150,
                          height: 150,
                          marginLeft: 50,
                        }}
                      />
                    ) : (
                      // Display video for Past sessions
                    <TouchableOpacity
                      style={{ width: 150, height: 150, flexDirection: 'row',  marginRight: 50 }}
                      onPress={() => {
                        setSelectedMeeting(meeting.meeting_id);
                        setExpandedView(true); 
                      }}
                    >
                      <Image
                        source={{
                          uri: "https://img.icons8.com/?size=100&id=85366&format=png&color=000000",
                        }}
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 10,
                          alignSelf: 'center'
                        }}
                      />
                      <Video
                        source={{ uri: '../assets/coursetest.mp4' }}
                        shouldPlay={selectedMeeting === meeting.meeting_id}
                        resizeMode="contain"
                        style={{ width: '100%', height: '100%',  borderRadius: 10 }}
                      />
                    </TouchableOpacity>
                    
                    )}

                    <View style={{ marginLeft: 10, width: '60%' }}>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={styles.meetingTime}>Live Session . </Text>
                        <Text style={styles.meetingTime}>Get Started . </Text>
                        <Text style={styles.meetingTime}>Online . </Text>
                        <Text style={styles.meetingTime}>{meeting.hubCat}</Text>
                      </View>
                      <Text style={styles.hubName}>{meeting.hubName}</Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          marginBottom: 10,
                        }}
                      >
                        {moment(meeting.time)
                          .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
                          .format("MMMM Do YYYY, h:mm A [( " +
                            Intl.DateTimeFormat().resolvedOptions().timeZone +
                            ")]")}
                      </Text>
                      <Text style={styles.meetingDescription}>
                        {meeting.description}
                      </Text>
                    </View>
                      </View>
                      {/* Only show Register and Join buttons for Upcoming meetings */}
                      {activeTab === "Upcoming" && (
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 10,
                            alignSelf: "flex-end",
                          }}
                        >
                          <TouchableOpacity
                            style={styles.joinButton2}
                            onPress={() => handleJoinMeeting(meeting)}
                          >
                            <Text style={styles.buttonText2}>
                              {registrationStatus.includes(String(meeting.meeting_id)) ? "Unregister" : "Register"}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.joinButton}
                            onPress={() => handleJoinLink(meeting)}
                          >
                            <Text style={styles.buttonText}>Join Meeting</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    
                  </View>
                ))}
              {meetingsToDisplay.length > 2 && (
                <TouchableOpacity
                  style={styles.viewAllButton}
                  onPress={toggleShowAll}
                >
                  <Text style={{ color: "#206C00" }}>
                    {showAll ? "Show Less" : "View All"}
                  </Text>
                </TouchableOpacity>
              )}
            </>
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
                style={{ width: 50, height: 50, marginLeft: 100 }}
              />
              <Text style={styles.noMeetings}>
                No meetings available for this hub
              </Text>
            </View>
          )
        ) : null}

        {expandedView && selectedMeeting && (
          <View style={styles.expandedViewContainer}>
            {/* Larger Video Player */}
            <View style={styles.largeVideoContainer}>
              {/* Find the selected meeting from the array */}
              {meetingsToDisplay && meetingsToDisplay.length > 0 && (
                // Find the meeting in the meetingsToDisplay array
                (() => {
                  const selectedMeetingData = meetingsToDisplay.find(meeting => meeting.meeting_id === selectedMeeting);
                  if (selectedMeetingData) {
                    return (
                      <>
                        <Video
                          source={require('../assets/coursetest.mp4')}
                          useNativeControls
                          resizeMode="cover"
                          style={styles.largeVideo}
                        />
                        <Text style={styles.meetingDetailsTitle}>
                          {selectedMeetingData.description}
                        </Text>
                        <Text style={styles.meetingDetails}>
                          {moment(selectedMeetingData.time)
                            .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
                            .format("MMMM Do YYYY, h:mm A [( " +
                              Intl.DateTimeFormat().resolvedOptions().timeZone +
                              ")]")}
                        </Text>
                      </>
                    );
                  }
                  return null;
                })()
              )}
            </View>

            {/* List of other Meetings on the right */}
            <View style={styles.meetingsListContainer}>
              {meetingsToDisplay.map((otherMeeting) => (
                <TouchableOpacity
                  key={otherMeeting.meeting_id}
                  onPress={() => {
                    setSelectedMeeting(otherMeeting.meeting_id); // Update selected meeting
                  }}
                  style={[
                    styles.meetingThumbnail,
                    selectedMeeting === otherMeeting.meeting_id && { borderColor: '#206C00' }
                  ]}
                >
                  <Text style={styles.meetingName}>
                    {otherMeeting.hubName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setExpandedView(false)} // Close the expanded view
            >
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>
        )}


      
      </View>
      <CustomAlert
        visible={alertVisible}
        title={"Alert"}
        message={alertMessage}
        onConfirm={hideAlert}
      />
    </ScrollView>
  );
};

// Function to handle joining a meeting
const handleJoinMeeting = (link) => {
  Linking.openURL(link).catch((err) =>
    console.error("Failed to open URL:", err),
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "none",
  },
  hubButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 40,
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
  },
  hubName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  meetingDescription: {
    fontSize: 14,
    width: "100%",
    marginBottom: 4,
    marginRight: 20,
    overflow: "hidden",
  },
  meetingDate: {
    fontSize: 14,
    color: "#444",
  },
  meetingTime: {
    fontSize: 12,
    color: "#444",
    marginBottom: 8,
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
    width: 120,
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
  selectedItem: {
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20,
    borderColor: "#135837",
    backgroundColor: "#206C00",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    marginRight: 20,
  },
  unselectedItem: {
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20,
    borderColor: "rgba(211,249,216,0.3)",
    backgroundColor: "rgba(211,249,216,0.3)",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    marginRight: 20,
  },
  selectedText: {
    color: "#fff", // white text
  },
  unselectedText: {
    color: "#f7fff4", // green text
  },
  viewAllButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    alignSelf: "center",
  },
  arrowButton: {
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  arrowText: {
    fontSize: 20, 
    color: "white", 
  },
  expandedViewContainer: {
    flexDirection: 'row',
    position: 'absolute',
    height: 600,
    top: 100,
    left: 50,
    right: 50,
    bottom: 0,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  largeVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  largeVideo: {
    width: "100%",
    height: 300,
    objectFit: 'cover',
  },
  meetingsListContainer: {
    flex: 0.3,
    backgroundColor: '#fff',
    padding: 10,
    maxHeight: '90%',
    overflowY: 'scroll',
  },
  meetingThumbnail: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  meetingName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  meetingDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center'
  },
  meetingDetails: {
    fontSize: 14,
    marginTop: 5,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default HubMeeting;
