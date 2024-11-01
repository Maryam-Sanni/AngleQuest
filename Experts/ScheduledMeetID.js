import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { BlurView } from 'expo-blur';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';

const defaultAvatar = require("../assets/account.png");

const ScheduledMeetingsTable = ({ hubId = '', coachingHubName = '' }) => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hubName, setHubName] = useState(coachingHubName || '');  // Default to coachingHubName if passed
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  const apiUrl = process.env.REACT_APP_API_URL;

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

          // Ensure hub_id is treated as a string for comparison
          const filteredMeetings = NewMeeting.filter(meeting => String(meeting.hub_id) === String(hubId));
          setMeetings(filteredMeetings);
        } else {
          console.error('Failed to fetch meeting data');
        }
      } catch (error) {
        console.error('Error fetching meeting data:', error);
      } finally {
        setLoading(false);  // Ensure loading stops on both success and error
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
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>{hubName} Sessions</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>Topic</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>Description</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>Date</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>Action</Text>
            </View>
          </View>

          {displayedMeetings.map((meeting, index) => (
            <View key={meeting.id} style={styles.row}>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{meeting.meeting_topic}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{meeting.meeting_description}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{moment(meeting.date).format('MMMM Do YYYY, h:mm A')}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <TouchableOpacity onPress={() => handleJoinLink(meeting)}>
                  <Text style={styles.joinButton}>Launch Meeting</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 50,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 200,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50,
    marginRight: 50
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
  },
  joinButton: {
    borderColor: '#206C00',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    color: '#206C00',
    width: 150
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
  greenBox: {
    width: "90%",
    marginBottom: 20,
    marginLeft: 50, 
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 50, 
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  blurBackground: {
    borderRadius: 20, 
    backgroundColor: 'rgba(225,225,212,0.3)',
  }
});

export default ScheduledMeetingsTable;
