import React, { useState, useEffect, useRef} from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Linking, TouchableHighlight, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import ScheduledAdvice from '../components/ScheduledAdvSess';
import Expired from '../components/ExpiredSchedlue';
import CompletedAdvice from '../components/CompletedAdvSess';
import OpenModal from '../Jobseekers/Pickexpertadv';
import { useNavigate } from 'react-router-dom';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


function MyComponent() { 
  const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
  const [meetingData, setMeetingData] = useState({ date: '', time: '' })
  const [lastCandidateLink, setLastCandidateLink] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [days, setDays] = useState(null);
  const [time, setTime] = useState(null);
  const [type, setType] = useState("Career Change");
  const [role, setRole] = useState("");
  const [startingLevel, setStartingLevel] = useState("Beginner");
  const [targetLevel, setTargetLevel] = useState("Medior");
  const [expert, setExpert] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [activeTab, setActiveTab] = useState('Scheduled');
  

  const apiUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/jobseeker/get-jobseeker-skillanalysis-datetime`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const { InterviewDT } = response.data;
          if (InterviewDT && InterviewDT.length > 0) {
            const meeting = InterviewDT[0];
            const dateTime = new Date(meeting.date_time);

            // Format date as 'DD/MM/YYYY'
            const date = dateTime.toLocaleDateString('en-GB');

            // Format time as 'HH:MM AM/PM'
            const time = dateTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }); 

            setMeetingData({
              date,
              time,
            });
          } else {
            console.error('No meetings found');
          }
        } else {
          console.error('Failed to fetch meeting data');
        }
      } catch (error) {
        console.error('Error fetching meeting data:', error);
      }
    };

    fetchMeetingData();
  }, []);
  
  useEffect(() => {
      const loadFormData = async () => {
          try {
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                  console.error('No token found');
                  return;
              }

              const response = await axios.get(`${apiUrl}/api/jobseeker/get-jobseeker-skill-analysis`, {
                  headers: { Authorization: `Bearer ${token}` }
              });

              if (response.status === 200) {
                  const data = response.data.skillAnalysis; // Array of skillAnalysis objects


                // Check if the data array is empty
                if (!data || data.length === 0) {
                    navigate('/skill-analysis-new'); // Navigate to the desired page
                    return;
                }
                
                  // Sort the skillAnalysis array by created_at in descending order
                  const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                  // Get the latest skill analysis
                  const latestSkillAnalysis = sortedData[0];

                  setRole(latestSkillAnalysis.role || '');
                  setType(latestSkillAnalysis.type || '');
                  setStartingLevel(latestSkillAnalysis.starting_level || '');
                  setTargetLevel(latestSkillAnalysis.target_level || '');
                  setExpert(latestSkillAnalysis.expert_name || '');
                setDays(latestSkillAnalysis.expert_available_days || '');
                setTime(latestSkillAnalysis.expert_available_time || '');
                  setDescription(latestSkillAnalysis.description || '');

                  // Convert date_time to date and time
                  const dateTime = new Date(latestSkillAnalysis.date_time);
                  const date = dateTime.toLocaleDateString();
                  const time = dateTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true  // Use 12-hour clock with AM/PM
                  });

                  setSelectedDate(date);
                  setSelectedTime(time);

              } else {
                  console.error('Failed to fetch data', response);
              }
          } catch (error) {
              console.error('Failed to load form data', error);
          }
      };

      loadFormData();
  }, []);

  
  useEffect(() => {
    const fetchLastCreatedMeeting = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
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

          if (meetings.length > 0) {
            // Sort the meetings by created_at in descending order to get the latest one
            const sortedMeetings = meetings.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );

            // Set the candidate_link from the last created meeting
            setLastCandidateLink(sortedMeetings[0].candidate_link);
          } else {
            console.error('No meetings found');
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

  const handlejoinPress = () => {
    if (lastCandidateLink) {
      Linking.openURL(lastCandidateLink);
    } else {
      console.error('No candidate link found');
    }
  };

  
  const gotoresult = () => {
    navigate('/ai-analysis');
    onClose();
  };

  const gotoanalysis = () => {
    navigate('/expert-analysis');
    onClose();
  };
  
    const handleOpenPress = () => {
       setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };
  
    const [fontsLoaded]=useFonts({
      "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })      
        const {t}=useTranslation()
    return (
      <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
  style={{ height: '100%', width: '100%',flex: 1}}
>
        <View style={{ flex: 1 }}>
            <Topbar />
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Sidebar />
              
                               
                <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
                   
                    <View style={{marginLeft: 270}}>
                      <View style={styles.header}>
                                   <View style={{backgroundColor: '#f7fff4', flexDirection: 'row', marginTop: -10, marginRight: -10, marginLeft: -10, marginBottom: -10, padding: 10}}>
                        <Button mode="text" 
                          textColor="#000000"
                          style={styles.button} 
                          onPress={handleOpenPress}
                          icon={() => (
                            <Image 
                              source={{ uri: 'https://img.icons8.com/?size=100&id=3220&format=png&color=4CAF50' }} 
                              style={{ width: 20, height: 20 }} 
                            />
                          )}>New</Button>
                          </View>
                        <View style={{ borderRightWidth: 1, borderRightColor: '#CCC', marginRight: 20, marginLeft: 10}}/>
                        <Button mode="text" 
                          textColor="#000000"
                          style={styles.button} 
                          onPress={gotoresult}
                          >AI Analysis</Button>
                        <Button mode="text" 
                          textColor="#000000"
                          style={styles.button} 
                          onPress={gotoanalysis}
                          >Expert Analysis</Button>
                      </View>
                      
                      <View style={styles.container}>
                        {/* Tab Navigation */}
                        <View style={styles.tabContainer}>
                          <TouchableOpacity
                            style={[styles.tab, activeTab === 'Scheduled' && styles.activeTab]}
                            onPress={() => setActiveTab('Scheduled')}
                          >
                            <Text style={[styles.tabText, activeTab === 'Scheduled' && styles.activeTabText]}>
                              Scheduled
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.tab, activeTab === 'Expired' && styles.activeTab]} // Update here
                            onPress={() => setActiveTab('Expired')}
                          >
                            <Text style={[styles.tabText, activeTab === 'Expired' && styles.activeTabText]}>
                              Expired
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.tab, activeTab === 'Completed' && styles.activeTab]}
                            onPress={() => setActiveTab('Completed')}
                          >
                            <Text style={[styles.tabText, activeTab === 'Completed' && styles.activeTabText]}>
                              Completed
                            </Text>
                          </TouchableOpacity>
                        </View>

                        {/* Conditionally Render Component Based on Active Tab */}
                        <View style={styles.contentContainer}>
                          {activeTab === 'Scheduled' && <ScheduledAdvice />}
                          {activeTab === 'Expired' && <Expired />}  {/* Update here to only show when Expired tab is active */}
                          {activeTab === 'Completed' && <CompletedAdvice />}
                        </View>
                      </View>


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
                </ScrollView>
                 </View>
                  </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10
      },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: -60,
    marginBottom: 10,
    shadowColor: '#FFFFFF', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5, 
  },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 10, 
    }, 
    headertext: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: 'normal',
        marginTop: 7, 
        color: 'black'
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 5,
        marginLeft: 100,
        marginTop: 5,
      tintColor: '#666',
    },
  container: {
 backgroundColor: "rgba(211,249,216,0.1)", 
    padding: 50 ,
    marginTop: 50,
    marginRight: 50
  },
      box: {
        backgroundColor: '#f7fff4',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '22%',
        height: 150,
        borderWidth: 2, borderColor: 'rgba(225,225,212,0.3)',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      boximage: {
        width: 30,
        height: 30,
        marginTop: 10,
        borderRadius: 25
      },
  tabContainer: {
    flexDirection: 'row',
    marginLeft: 50
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D3D3D3',
    marginBottom: 10,
     padding: 5,
    marginRight: 20
  },
  activeTabText: {
    color: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    borderColor: 'white'
    },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default MyComponent;
