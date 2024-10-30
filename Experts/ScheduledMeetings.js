    import React, { useEffect, useState } from 'react';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import axios from 'axios';
    import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
    import { BlurView } from 'expo-blur';
    import { useNavigate } from 'react-router-dom';
    import moment from 'moment-timezone';

    const defaultAvatar = require("../assets/account.png");

    const ScheduledMeetingsTable = () => {
      const navigate = useNavigate();
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [hubName, setHubName] = useState('');
      const [currentPage, setCurrentPage] = useState(0);
      const itemsPerPage = 3;
      const totalPages = Math.ceil(data.length / itemsPerPage);

      const displayedMeetings = data.slice(
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

      const openUser = (userId) => {
        navigate('/chats', { state: { userId } });
      };

      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.get(`${apiUrl}/api/expert/get-all-meeting`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const formattedMeetings = response.data.data.map((meeting) => ({
            id: meeting.id,
            name: meeting.jobseeker_name,
            meetingDate: moment(meeting.meeting_date).format('MMMM Do YYYY, h:mm A'),
            meetingDescription: meeting.description,
            joinDate: moment(meeting.created_at).format('MMMM Do YYYY, h:mm A'),
            avatar: defaultAvatar, // Ensure default avatar
          }));

          setData(formattedMeetings);
          setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
          console.error('Error fetching meetings:', error);
          setError('Failed to load meetings.');
          setLoading(false); // Ensure loading is stopped on error as well
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

      useEffect(() => {
        const loadFormData = async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await axios.get(`${apiUrl}/api/expert/hubs/get`, {
              headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200 && response.data.status === 'success') {
              const data = response.data.NewHub;
              setHubName(data.coaching_hub_name || '');
            } else {
              console.error('Failed to fetch hub data');
            }
          } catch (error) {
            console.error('Failed to load form data', error);
          }
        };

        loadFormData();
      }, []);

      if (loading) {
        return <Text>Loading...</Text>;
      }

      if (error) {
        return <Text>{error}</Text>;
      }

      return (
        <View style={styles.greenBox}>
          <BlurView intensity={100} style={styles.blurBackground}>
            <Text style={styles.title}>{hubName} Hub Meeting attendance</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={styles.cell2}><Text style={styles.headerText}>Name</Text></View>
                <View style={styles.cell2}><Text style={styles.headerText}>Meeting Date</Text></View>
                <View style={styles.cell2}><Text style={styles.headerText}>Description</Text></View>
                <View style={styles.cell2}><Text style={styles.headerText}>Joined</Text></View>
              </View>

              {displayedMeetings.map((item, index) => (
                <View key={item.id} style={styles.row}>
                  <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                    <TouchableOpacity onPress={() => openUser(item.id)}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image source={item.avatar || defaultAvatar} style={styles.userimage} />
                        <Text style={styles.cellTextname}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                    <Text style={styles.cellText}>{item.meetingDate}</Text>
                  </View>
                  <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                    <Text style={styles.cellText}>{item.meetingDescription}</Text>
                  </View>
                  <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                    <Text style={styles.cellText}>{item.joinDate}</Text>
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
  cellTextname: {
    textAlign: 'flex-start',
    width: 200
  },
  messageCount: {
    width: 18,
    height: 18,
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    textAlign: 'center',
    marginLeft: 70,
    color: 'white',
    fontWeight: '500',
    fontSize: 13
  },
  messageCountText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 11
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
  },
  userimage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
  whiteBox: {
    width: '20%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f7fff4',
    borderRadius: 20,
    marginTop: 50,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    BlurView: '100%'
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