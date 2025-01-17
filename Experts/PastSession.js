import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { BlurView } from 'expo-blur';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';
import EmptyScheduleImage from '../assets/EmptySch.jpeg';

const defaultAvatar = require("../assets/account.png");

const ScheduledMeetingsTable = ({ hubId = '', coachingHubName = '' }) => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hubName, setHubName] = useState(coachingHubName || '');   const [showAllMeetings, setShowAllMeetings] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const generateGoogleCalendarUrl = (meeting) => {
    const startDate = moment(meeting.date).format('YYYYMMDDTHHmmss') + 'Z';

    // Calculate the end time by adding the duration (in hours) to the start time
    const endDate = moment(meeting.date).add(meeting.duration, 'hours').format('YYYYMMDDTHHmmss') + 'Z';

    const eventTitle = encodeURIComponent(meeting.meeting_topic);
    const eventDetails = encodeURIComponent(meeting.meeting_description);
    const eventLocation = encodeURIComponent(meeting.meeting_location || 'Online'); // Default location if none provided

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${eventDetails}&location=${eventLocation}`;
  };

  // Button click handler to open Google Calendar link
  const handleAddToCalendar = (meeting) => {
    const googleCalendarUrl = generateGoogleCalendarUrl(meeting);
    Linking.openURL(googleCalendarUrl).catch(err => console.error('Failed to open URL:', err));
  };



  useEffect(() => {
    if (coachingHubName) {
      setHubName(coachingHubName);
    } else {
      const loadHubData = async () => {
        try {
          const storedHubName = await AsyncStorage.getItem('coaching_hub_name');
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
        console.error('hubId is missing');
        setLoading(false);
        return;
      }

      if (!apiUrl) {
        console.error('API URL is missing');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${apiUrl}/api/expert/newhubmeeting/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const { NewMeeting } = response.data;
          if (!NewMeeting) {
            console.error('Unexpected response structure:', response.data);
            setLoading(false);
            return;
          }

          // Calculate the 24-hour threshold
          const now = new Date();
          const thresholdDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

          // Filter meetings by hub_id and date
          const filteredMeetings = NewMeeting
            .filter(meeting => String(meeting.hub_id) === String(hubId)) // Filter by hub_id
            .filter(meeting => new Date(meeting.date) < thresholdDate); // Only past 24 hours

          // Sort the filtered meetings by date in descending order
          const sortedMeetings = filteredMeetings.sort((a, b) => new Date(b.date) - new Date(a.date));

          setMeetings(sortedMeetings);
        } else {
          console.error('Failed to fetch meeting data');
        }
      } catch (error) {
        console.error('Error fetching meeting data:', error);
      } finally {
        setLoading(false); // Ensure loading stops on both success and error
      }
    };

    fetchMeetingData();
  }, [hubId, apiUrl]);





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
           No Past Sessions
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
           It seems there are no meetings have been previously done.
         </Text>


       </View>
        ) : (
          (showAllMeetings ? meetings : meetings.slice(0, 2)).map((meeting) => (
            <View key={meeting.id} style={styles.meetingContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=42287&format=png&color=000000",
                  }}
                  style={{width: 150, height: 150, marginTop: 30, marginBottom: 30, marginLeft: 50}}
                />
                <View style={{flexDirection: "column", width: "75%"}}>
                  <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text style={styles.meetingTime}>Live Session . </Text>
                    <Text style={styles.meetingTime}>Online . </Text>
                    <Text style={styles.meetingTime}>Get Started</Text>
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
                      .format('MMMM Do YYYY, h:mm A [( ' + Intl.DateTimeFormat().resolvedOptions().timeZone + ')]')}
                  </Text>
                  <Text style={styles.meetingDescription}>{meeting.meeting_description}</Text>
                </View>
              </View>
            </View>
          ))
        )}

        {!showAllMeetings && meetings.length > 2 && (
          <TouchableOpacity onPress={() => setShowAllMeetings(true)} style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View All</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
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
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  hubName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meetingDescription: {
    fontSize: 16,
    width: 700,
    marginBottom: 4,
  },
  meetingTime: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: '#206C00',
    padding: 15,
    borderRadius: 5,
  },
  joinButton2: {
    borderColor: '#206C00',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginRight: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewAllButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    width: 100,
    alignSelf: 'center',
  },
  viewAllButtonText: {
    color: '#206C00',
    fontWeight: 'bold',
  },
});

export default ScheduledMeetingsTable;
