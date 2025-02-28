import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image, TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity, ActivityIndicator,
  Linking, Modal, Picker
} from "react-native";
import { Button, Chip } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/CustomAlert";
import Video from 'react-native-video';
import moment from "moment-timezone";
import OpenModal from "../Jobseekers/Pickyourhub";
import PaymentDetails from './PaymentDetails';
import EmptyScheduleImage from '../assets/EmptySch.jpeg';

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
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [note, setNote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null); // State to hold the video URL
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [isBuffering, setIsBuffering] = useState(true);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [paymentRequired, setPaymentRequired] = useState(false);

  const handlePaymentSuccess = () => {
    setPaymentModalVisible(false);
    setPaymentRequired(false);
  };
  
  useEffect(() => {
    const fetchRecording = async () => {
      if (!selectedMeeting) return;
  
      try {
        const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage
        
        // Make the GET request with query parameters
        const response = await axios.get(`${apiUrl}/api/expert/get-recording`, {
          params: { meeting_id: selectedMeeting }, // Add meeting_id as query parameter
          headers: {
            Authorization: `Bearer ${token}`, // Use token for authentication
          },
        });
  
        // Check the response data
        if (response.data.status === 'success' && response.data.data?.recording_url) {
          setVideoUrl(response.data.data.recording_url); // Use recording URL from API
        } else {
          setVideoUrl(require('../assets/coursetest.mp4')); // Fallback video
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
        setVideoUrl(require('../assets/coursetest.mp4')); // Fallback video
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchRecording();
  }, [selectedMeeting]);  

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
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

  useEffect(() => {
    // If expanded view is active, automatically collapse the meetings view.
    if (expandedView) {
      setShowAll(false);
    }
  }, [expandedView]);

  const tabs = [
    {
      label: "Upcoming",
      icon: "https://img.icons8.com/?size=100&id=10034&format=png&color=000000",
    },
    {
      label: "Past Sessions",
      icon: "https://img.icons8.com/?size=100&id=85162&format=png&color=000000",
    },
    {
      label: "Assessment",
      icon: "https://img.icons8.com/?size=100&id=65285&format=png&color=000000",
    },
  ];

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

  useEffect(() => {
    const fetchPaymentDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token'); 
            if (!token) {
                console.error('No authentication token found');
                return;
            }

            const response = await fetch(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            // Check if "Pay as you go" is set in the response
            if (data?.PaystackDetail?.payment_detail === 'Pay as you go') {
                setPaymentRequired(true);
            }
        } catch (error) {
            console.error('Error fetching payment details:', error);
        }
    };

    fetchPaymentDetails();
  }, []);

const [email, setEmail] = useState(false);
const initiatePayment = async () => {
  try {
    // Retrieve values from AsyncStorage
    const values = await AsyncStorage.multiGet(['first_name', 'last_name', 'email']);
    const firstName = values.find(item => item[0] === 'first_name')?.[1] || "";
    const lastName = values.find(item => item[0] === 'last_name')?.[1] || "";
    const email = values.find(item => item[0] === 'email')?.[1] || "";

    // Combine first and last name
    const fullName = `${firstName} ${lastName}`;
    setEmail(email);

    // Get token from AsyncStorage for authorization
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "Authorization token not found.");
      return false; // Indicate failure
    }

    // Fetch payment details from backend
    const paymentDetailsResponse = await axios.get(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Check if response is successful
    if (paymentDetailsResponse?.data?.status !== "success") {
      Alert.alert("Error", "Failed to retrieve payment details.");
      return false; // Indicate failure
    }

    // Extract and parse card details
    const rawCardDetails = paymentDetailsResponse.data.PaystackDetail.card_detail;
    console.log("Raw Card Details:", rawCardDetails); // Debugging

    // Check if rawCardDetails exists and is a valid JSON string
    let cardDetailsArray;
    try {
      cardDetailsArray = JSON.parse(rawCardDetails);
    } catch (parseError) {
      console.error("Error parsing card details:", parseError);
      Alert.alert("Error", "Failed to parse card details.");
      return false;
    }

    // Ensure we have at least one card
    if (!Array.isArray(cardDetailsArray) || cardDetailsArray.length === 0) {
      Alert.alert("Error", "No card details found.");
      return false;
    }

    const cardDetails = cardDetailsArray[0]; // Get first card
    console.log("Extracted Card Details:", cardDetails);

    // Extract expiry month and year correctly
    const [expMonth, expYear] = cardDetails.exp_date.split("/");

    // Construct payment payload
    const paymentPayload = {
      email: email,
      name: fullName,
      plan: "pay_as_you_go",
      amount: "40",
      card_number: cardDetails.cardnumber,
      cvv: cardDetails.cvv,
      expiry_month: expMonth,
      expiry_year: expYear,
    };

    console.log("Final Payment Payload:", paymentPayload); // Debugging

    // Log headers and payload before making the request
    console.log("Making payment request with token:", token);
    console.log("Payment URL:", `${apiUrl}/api/jobseeker/charge-card`);

    // Make the payment request to the backend
    const paymentResponse = await axios.post(`${apiUrl}/api/jobseeker/charge-card`, paymentPayload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Log the full payment response for debugging
    console.log("Payment Response:", paymentResponse);

    // Check if the HTTP status code is 200 (successful)
    if (paymentResponse.status === 200) {
      return true; // Indicate success
    } else {
      console.error("Payment Response Data:", paymentResponse?.data); // Log more details
      alert("We were unable to charge your card", "Payment initiation failed. Please check card details.");
      return false; // Indicate failure
    }
  } catch (error) {
    console.error("Payment Error:", error);

    // If error.response is undefined or null, handle it
    const errorMessage = error.response?.data?.message || error.message || "Please try again.";
    Alert.alert("An error occurred", errorMessage);
    return false; // Indicate failure
  }
};

  const handleJoinMeeting = async (meeting) => {
    if (paymentRequired) {
      const paymentSuccessful = await initiatePayment(); // Wait for payment to complete
      if (!paymentSuccessful) {
        return; // Stop execution if payment failed
      }
    }

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
          setAlertMessage("You have successfully registered for this meeting");
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
      const duration = meeting.duration;
      
      if (!token || !candidateName) {
        console.error("Token or candidate name missing.");
        return;
      }

      // API request
      const response = await axios.post(
        `${apiUrl}/api/expert/join-candidate`,
        { meeting_id, duration, candidate_name: candidateName },
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

  useEffect(() => {
    // Whenever the activeTab changes, close the expanded view
    setExpandedView(false);
  }, [activeTab]); // Depend on activeTab to trigger this effect
  
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

// Handle the Picker value change (update selected hub)
const handlePickerChange = (index) => {
  if (index === 0) return; // Don't do anything if "All Joined Hubs" is selected (index 0)

  const selectedHub = hubs[index]; // Get the selected hub
  setSelectedHub(selectedHub); // Update the selected hub state

  // Reorder hubs so that the selected hub is first
  const newHubs = [selectedHub, ...hubs.filter((hub) => hub !== selectedHub)];
  setHubs(newHubs); // Update the hubs list with the new order
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hub buttons for filtering */}
      

      <View style={styles.header}>
      {/* Join New Hub Button */}
      <View style={{ backgroundColor: '#f7fff4', flexDirection: 'row', marginTop: -10, marginRight: -10, marginLeft: -10, marginBottom: -10, padding: 10 }}>
        <Button
          mode="text"
          textColor="#000000"
          style={styles.button}
          onPress={handleOpenPress}
          icon={() => (
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=3220&format=png&color=4CAF50",
              }}
              style={{ width: 20, height: 20 }}
            />
          )}
        >
          Join New Hub
        </Button>
        {hubs.length > 4 && ( // Show Picker only if hubs length is greater than 4
  <Picker
    selectedValue={hubs.indexOf(selectedHub)} // Use the index of the selected hub
    style={{
      height: 30,
      width: 135,
      marginTop: 13,
      fontWeight: '600',
      fontSize: 14,
      backgroundColor: '#f7fff4',
      borderColor: '#f7fff4',
    }}
    onValueChange={handlePickerChange}
  >
    <Picker.Item label="All Joined Hubs" value={0} /> {/* Placeholder for "All Joined Hubs" */}
    {hubs.map((hub, index) => (
      <Picker.Item label={hub} value={index} key={index} /> // List all hubs in Picker
    ))}
  </Picker>
)}
      </View>
      <View style={{ borderRightWidth: 1, borderRightColor: '#CCC', marginRight: 20, marginLeft: 5}}/>
      {/* Hub Items Display */}
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        {hubs.slice(currentIndex, currentIndex + 4).map((hubName) => (
          <Chip
            key={hubName}
            mode="text"
            textColor="#000000"
            style={[
              styles.hubChip,
              selectedHub === hubName && styles.selectedChip,
            ]}
            textStyle={{
              color: selectedHub === hubName ? "black" : "black",
            }}
            onPress={() => setSelectedHub(hubName)} // Set selected hub when clicked
            selected={selectedHub === hubName}
          >
            {hubName}
          </Chip>
        ))}
      </View>
      
   
    </View>
      


      <View style={{ backgroundColor: "rgba(211,249,216,0.1)", padding: 50, marginLeft: 50, marginRight: 50, marginTop: 50 }}>
      <View style={{ flexDirection: "row", marginBottom: 30 }}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab.label} onPress={() => setActiveTab(tab.label)}>
            <View
              style={{
                alignItems: "center",
                marginRight: 15,
                padding: 5,
                backgroundColor: activeTab === tab.label ? "transparent" : "transparent",
                flexDirection: 'row',
                borderRadius: 10,
                borderWidth: activeTab === tab.label ? 1 : 0,
                borderColor: "white",
                paddingHorizontal: 10,
              }}
            >
              <Image
                source={{ uri: tab.icon }}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                  tintColor: activeTab === tab.label ? "#FFF" : "#D3D3D3", // Tint color for active tab
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: activeTab === tab.label ? "#FFF" : "#D3D3D3",
                }}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "Assessment" && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: 'white',
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
            Nothing available here
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
            It seems there are no assessments right now.
          </Text>
        </View>
      )}

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
                      style={{
                        width: 150,
                        height: 150,
                        marginRight: 50,
                      }}
                      onPress={() => {
                        setSelectedMeeting(meeting.meeting_id);
                        setExpandedView(true);
                      }}
                    >
                      <View style={{ width: '100%', height: '100%', position: 'relative' }}>
                        {/* Video Component */}
                        <Video
        source={require('../assets/coursetest.mp4')} // Local video file
        muted={true} // Mute the video
        resizeMode="contain" // Resize the video to fit within its container
        repeat={true} // Optional: Loop the video
        style={styles.video} // Apply styles
      />

                        {/* Image Overlay */}
                        <Image
                          source={{
                            uri: "https://img.icons8.com/?size=100&id=85366&format=png&color=000000",
                          }}
                          style={{
                            width: 50,
                            height: 50,
                            position: "absolute",
                            top: 60,
                            left: 50,
                            backgroundColor: "rgba(211,249,216,0.3)",
                          }}
                        />
                      </View>
                    </TouchableOpacity>

                    )}

                    <View style={{ marginLeft: 10, width: '60%' }}>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={styles.meetingTime}>Live Session . </Text>
                        <Text style={styles.meetingTime}>Get Started . </Text>
                        <Text style={styles.meetingTime}>Online . </Text>
                        <Text style={styles.meetingTime}>{meeting.hubCat}</Text>
                      </View>
                      <Text style={styles.hubName}>{meeting.topic}</Text>
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
                      Nothing available here
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
                      It seems there are no meetings right now.
                    </Text>
                
                    
                  </View>
          )
        ) : null}

;

{expandedView && selectedMeeting && (
  <View style={styles.expandedViewContainer}>
    {/* Larger Video Player */}
    <View style={styles.largeVideoContainer}>
      {meetingsToDisplay && meetingsToDisplay.length > 0 && (
        (() => {
          const selectedMeetingData = meetingsToDisplay.find(
            meeting => meeting.meeting_id === selectedMeeting
          );
          if (selectedMeetingData) {
            
                    return (
                      <>
     <View style={{width: "100%", height: 300, position: 'relative', backgroundColor: 'grey'}}>
     <Video
        source={{ uri: videoUrl }}
        style={styles.largeVideo}
        controls
        onLoadStart={() => setIsBuffering(true)} // Show loader on start
        onLoad={() => setIsBuffering(false)} // Hide loader when loaded
        onError={(error) => {
          setIsBuffering(false);
          console.error('Video Error:', error);
        }}
      />
    </View>
                        <TouchableOpacity 
                          style={{ flexDirection: 'row', marginLeft: 550, marginTop: 10 }}
                          onPress={() => setIsAddingNote(true)}
                        >
                          <Image
                            source={{
                              uri: "https://img.icons8.com/?size=100&id=24717&format=png&color=206C00",
                            }}
                            style={{ width: 20, height: 20, marginRight: 10 }}
                          />
                          <Text style={{ color: '#206C00', marginTop: 2 }}>
                            Add Note to Expert
                          </Text>
                        </TouchableOpacity>

                        {isAddingNote && (
                          <View style={styles.noteContainer}>
                            <TextInput
                              style={styles.textInput}
                              placeholder="Write down your questions"
                              value={note}
                              onChangeText={setNote}
                              multiline
                            />
                            <View style={styles.noteActions}>
                              <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => {
                                  // Replace the selectedMeetingData (you can also update state or API as required)
                                  selectedMeetingData.note = note;
                                  setIsAddingNote(false);
                                }}
                              >
                                <Text style={styles.submitText}>Submit</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.notecloseButton}
                                onPress={() => setIsAddingNote(false)}
                              >
                                <Text style={styles.notecloseText}>Close</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}

                        <Text style={styles.meetingDetailsTitle}>
                          {selectedMeetingData.topic}
                       
                        <Text style={styles.meetingDetails}>
                          {selectedMeetingData.description}
                          </Text>
                            </Text>
                        <Text style={styles.meetingDetails2}>
                          Timestamp:

                        <Text style={styles.meetingDetails3}>
                          {moment(selectedMeetingData.time)
                            .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
                            .format("MMMM Do YYYY, h:mm A [( " +
                              Intl.DateTimeFormat().resolvedOptions().timeZone +
                              ")]")}   
                          {(() => {
                            const now = moment();
                            const meetingTime = moment(selectedMeetingData.time);
                            const diffInHours = now.diff(meetingTime, 'hours');
                            const diffInDays = now.diff(meetingTime, 'days');

                            if (diffInDays > 0) {
                              return `${diffInDays} ${diffInDays === 1 ? "day ago" : "days ago"}`;
                            } else if (diffInHours > 0) {
                              return `${diffInHours} ${diffInHours === 1 ? "hour ago" : "hours ago"}`;
                            } else {
                              return "Less than an hour ago";
                            }
                          })()}

                           </Text>
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
                  <Image
                    source={{
                      uri: "https://img.icons8.com/?size=100&id=8OtIp7ddIMJm&format=png&color=000000",
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: 10,
                    }}
                  />
                  <Text style={styles.meetingName}>
                    {otherMeeting.topic}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={paymentModalVisible}
          onRequestClose={() => setPaymentModalVisible(false)}
        >
            <View style={styles.modalContent}>
              <PaymentDetails 
                onClose={() => setPaymentModalVisible(false)} 
                onPaymentSuccess={handlePaymentSuccess} 
              />
          </View>
        </Modal>
        
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
    backgroundColor: "none",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 0,
    marginBottom: 10,
    shadowColor: '#FFFFFF', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5, 
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
    overflow: 'hidden',
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
    marginBottom: 20,
  },
  largeVideo: {
    width: "100%",
    height: 300,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingName: {
    fontSize: 14,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 5,
    width: 700
  },
  meetingDetails: {
    fontSize: 16,
    marginLeft: 5,
     fontWeight: '400',
    marginRight: 10
  },
  meetingDetails2: {
    fontSize: 14,
    marginLeft: 5,
    marginTop: 10,
     fontWeight: '600',
  },
  meetingDetails3: {
    fontSize: 14,
    marginLeft: 5,
    marginTop: 10,
     fontWeight: '400',
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
  noteContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#206C00',
    padding: 10,
    borderRadius: 8,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notecloseButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  notecloseText: {
    color: '#000',
  },
  hubChip: {
    marginHorizontal: 5,
     backgroundColor: "white",
    borderRadius: 30,
  },
  selectedChip: {
        backgroundColor: "rgba(128, 128, 128, 0.1)",
    borderRadius: 30,
  },
});

export default HubMeeting;
