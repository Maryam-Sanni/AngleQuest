import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  View,
  Image, Modal,
  Text, Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";
import { BlurView } from "expo-blur";
import OpenModal from './EditMeet';
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";

const defaultAvatar = require("../assets/account.png");

const ScheduledMeetingsTable = ({ hubId = "", coachingHubName = "" }) => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hubName, setHubName] = useState(coachingHubName || "");
  const [showAllMeetings, setShowAllMeetings] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [uniqueNameCount, setUniqueNameCount] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;

  // Updated handleOpenPress function to accept the meeting details and save to AsyncStorage
  const handleOpenPress = async (meeting) => {
    try {
      // Save meeting details to AsyncStorage
      await AsyncStorage.setItem("meeting_topic", meeting.meeting_topic);
      await AsyncStorage.setItem("meeting_description", meeting.meeting_description);
      await AsyncStorage.setItem("meeting_date", meeting.date);
      await AsyncStorage.setItem("meeting_time", meeting.time);
      await AsyncStorage.setItem("meeting_location", meeting.meeting_location || "Online");
      await AsyncStorage.setItem("meeting_duration", String(meeting.duration));
      await AsyncStorage.setItem("meeting_id", String(meeting.id));

      // Open the modal
      setModalVisible(true);
    } catch (error) {
      console.error("Failed to save meeting details:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  const generateGoogleCalendarUrl = (meeting) => {
    const startDate = moment(meeting.date).format("YYYYMMDDTHHmmss") + "Z";

    // Calculate the end time by adding the duration (in hours) to the start time
    const endDate =
      moment(meeting.date)
        .add(meeting.duration, "hours")
        .format("YYYYMMDDTHHmmss") + "Z";

    const eventTitle = encodeURIComponent(meeting.meeting_topic);
    const eventDetails = encodeURIComponent(meeting.meeting_description);
    const eventLocation = encodeURIComponent(
      meeting.meeting_location || "Online",
    ); // Default location if none provided

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDetails}&location=${eventLocation}`;
  };

  // Button click handler to open Google Calendar link
  const handleAddToCalendar = (meeting) => {
    const googleCalendarUrl = generateGoogleCalendarUrl(meeting);
    Linking.openURL(googleCalendarUrl).catch((err) =>
      console.error("Failed to open URL:", err),
    );
  };

  useEffect(() => {
    if (coachingHubName) {
      setHubName(coachingHubName);
    } else {
      const loadHubData = async () => {
        try {
          const storedHubName = await AsyncStorage.getItem("coaching_hub_name");
          if (storedHubName) {
            setHubName(storedHubName);
          }
        } catch (error) {
          console.error("Error loading hub name from AsyncStorage", error);
        }
      };
      loadHubData();
    }
  }, [coachingHubName]);

  useEffect(() => {
    const fetchMeetingData = async () => {
      console.log("Fetching with hubId:", hubId);

      if (!hubId) {
        console.error("hubId is missing");
        setLoading(false);
        return;
      }

      if (!apiUrl) {
        console.error("API URL is missing");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${apiUrl}/api/expert/newhubmeeting/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const { NewMeeting } = response.data;
          if (!NewMeeting) {
            console.error("Unexpected response structure:", response.data);
            setLoading(false);
            return;
          }

          const currentTime = new Date();
          const twentyFourHoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);

          const filteredMeetings = NewMeeting.filter((meeting) => {
            const meetingDate = new Date(meeting.date);
            return (
              String(meeting.hub_id) === String(hubId) &&
              meetingDate >= twentyFourHoursAgo
            );
          });

          const sortedMeetings = filteredMeetings.sort(
            (a, b) => new Date(a.date) - new Date(b.date),
          );

          setMeetings(sortedMeetings);
        } else {
          console.error("Failed to fetch meeting data");
        }
      } catch (error) {
        console.error("Error fetching meeting data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingData();
  }, [hubId, apiUrl]);


  const handleJoinLink = async (meeting) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const firstName = await AsyncStorage.getItem("first_name");
      const lastName = await AsyncStorage.getItem("last_name");
      const candidateName = `${firstName} ${lastName}`;

      if (!token || !candidateName) {
        console.error("Token or candidate name missing.");
        return;
      }

      const meeting_id = String(meeting.id);

      const response = await axios.post(
        `${apiUrl}/api/expert/join-candidate`,
        { meeting_id, candidate_name: candidateName },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.status === "success" && response.data.candidate_link) {
        const { candidate_link } = response.data;
        Linking.openURL(candidate_link);
      } else {
        alert("Failed to retrieve the meeting link.");
      }
    } catch (error) {
      console.error("Error joining meeting:", error);
      alert("Failed to join the meeting. Please try again.");
    }
  };

  const handleDelete = async (meeting) => {
    try {
      // Convert meeting.id to string
      const meeting_id = String(meeting.id);

      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert('Error', 'User is not authenticated');
        return;
      }

      // Make the POST request using axios
      const response = await axios.post(
        `${apiUrl}/api/expert/newhubmeeting/delete`,
        {
          meeting_id, // Include the meeting_id in the request body
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );

      if (response.status === 200) {
        // Refresh the page if deletion is successful
        window.location.reload(); // Reload the current page
      } else {
        // Handle error in response
        alert('Error', 'Failed to delete the meeting.');
      }
    } catch (error) {
      // Handle any errors (e.g., network issues)
      alert('Error', 'An error occurred. Please try again later.');
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

        // Filter and format the meetings
        const formattedMeetings = response.data.data
            .filter(meeting => meeting.hub_id === hubId)
            .map((meeting) => ({
                id: meeting.id,
                name: meeting.jobseeker_name,
            }));

        setMeetings(formattedMeetings);

        // Calculate the number of unique names
        const uniqueNames = new Set(formattedMeetings.map(meeting => meeting.name));
        setUniqueNameCount(uniqueNames.size); // Update the state with the unique count
    } catch (error) {
        console.error('Error fetching meetings:', error);
        alert('Failed to load meetings.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (meeting) => {
    // Show confirmation dialog using window.confirm() for React Native Web
    const isConfirmed = window.confirm("Are you sure you want to delete this meeting?");

    if (isConfirmed) {
      handleDelete(meeting); // Proceed with deletion if "OK" is pressed
    }
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#206C00" />
      </View>
    );
  }

  return (
    <View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {(showAllMeetings ? meetings : meetings.slice(0, 2)).map((meeting) => (
          <View key={meeting.id} style={styles.meetingContainer}>
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
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <Text style={styles.meetingTime}>Live Session . </Text>
                  <Text style={styles.meetingTime}>Online . </Text>
                  <Text style={styles.meetingTime}>Get Started</Text>
                  <View style={{ flexDirection: 'row', right: 10, position: 'absolute'}}>
                  <TouchableOpacity onPress={() => handleOpenPress(meeting)}>
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=100&id=6698&format=png&color=000000",
                      }}
                      style={{ width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                    <TouchableOpacity onPress={() => confirmDelete(meeting)}>
                      <Image
                        source={{
                          uri: "https://img.icons8.com/?size=100&id=362&format=png&color=000000",
                        }}
                        style={{ width: 20, height: 20, marginLeft: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.hubName}>{meeting.meeting_topic}</Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {moment(meeting.time)
                    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
                    .format(
                      "MMMM Do YYYY, h:mm A [( " +
                        Intl.DateTimeFormat().resolvedOptions().timeZone +
                        ")]",
                    )}
                </Text>
                <Text style={styles.meetingDescription}>
                  {meeting.meeting_description}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    alignSelf: "flex-end",
                  }}
                >
                  <View style={styles.joinButton3}>
                      {[...Array(4)].map((_, index) => (
                          <Image
                              key={index}
                              source={{
                                  uri: "https://img.icons8.com/?size=100&id=34105&format=png&color=206C00",
                              }}
                              style={{ width: 25, height: 25, marginRight: 5 }}
                          />
                      ))}
                      <Text style={{ fontSize: 16, marginTop: 3 }}>+{uniqueNameCount}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleAddToCalendar(meeting)}
                    style={styles.joinButton2}
                  >
                    <Text style={styles.buttonText2}>Add To Calendar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleJoinLink(meeting)}
                    style={styles.joinButton}
                  >
                    <Text style={styles.buttonText}>Launch Meeting</Text>
                  </TouchableOpacity>
                  
                </View>
              </View>
            </View>
          </View>
        ))}
        {!showAllMeetings && meetings.length > 2 && (
          <TouchableOpacity
            onPress={() => setShowAllMeetings(true)}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllButtonText}>View All</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 20,
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
    fontSize: 16,
    width: 700,
    marginBottom: 4,
  },
  meetingTime: {
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: "#206C00",
    padding: 15,
    borderRadius: 5,
  },
  joinButton2: {
    borderColor: "#206C00",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginRight: 20,
  },
  joinButton3: {
    borderColor: "#206C00",
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
    borderRadius: 5,
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
  viewAllButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    alignSelf: "center",
  },
  viewAllButtonText: {
    color: "#206C00",
    fontWeight: "bold",
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ScheduledMeetingsTable;
