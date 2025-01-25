import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Modal, Picker, ImageBackground } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import ScheduledGrowthPlan from '../components/ScheduledGrowthPlan';
import { Button } from 'react-native-paper';
import GrowthPlansReview from '../components/GrowthPlansReview';
import CompletedGrowthPlan from '../components/CompletedGrowthPlan';
import OpenModal from '../Experts/Growthplanprofile';
import OpenModal2 from '../Experts/EditGrowthProfile';
import {useFonts} from "expo-font"
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function MyComponent() {
    const [isInterviewHovered, setIsInterviewHovered] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [role, setGrowthRole] = useState('');
     const [targetDate, setTargetDate] = useState(''); 
     const [meetings, setMeetings] = useState([]);
     const [pendingCount, setPendingCount] = useState(0);
     const [reviewedCount, setReviewedCount] = useState(0);
   const [activeTab, setActiveTab] = useState('Scheduled');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false); 
  const [skillAnalysisGuides, setSkillAnalysisGuides] = useState([]); // Store fetched guides
  
  const apiUrl = process.env.REACT_APP_API_URL;
  
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
  
          // Filter meetings based on expert_id
          const filteredMeetings = data.filter(meeting => meeting.expertid === storedExpertId);
  
          // Calculate pending and completed counts
          const pendingCount = filteredMeetings.filter(meeting => 
            meeting.completed === null
          ).length;
  
          const completedCount = filteredMeetings.filter(meeting => meeting.completed === "Yes").length;
  
          console.log('Pending Count:', pendingCount);
          console.log('Completed Count:', completedCount);
  
          setMeetings(filteredMeetings);
          setPendingCount(pendingCount); // Update state
          setReviewedCount(completedCount); // Update state
  
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
  }, []);  

  
    useEffect(() => {
      const loadFormData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) throw new Error('No token found');
          
          const response = await axios.get(`${apiUrl}/api/expert/growthplan/get`, {
            headers: { Authorization: `Bearer ${token}` }
          });
    
          if (response.status === 200 && response.data.status === 'success') {
            const data = response.data.growthPlan;
            setGrowthRole(data.role || '');
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

            // Set the target date to the date scheduled of the latest meeting
            setTargetDate(sortedMeetings[0].date_scheduled);
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
  
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  // Handle Dropdown Item Selection
  const handleSaveToStorage = async (selectedGuide) => {
    try {
      await AsyncStorage.setItem('selectedGuide', JSON.stringify(selectedGuide));
      console.log('Saved to storage:', selectedGuide);

      // Perform additional action: handleOpenPress2
      handleOpenPress2();

      setDropdownVisible(false); // Close dropdown
    } catch (error) {
      console.error('Failed to save data to storage', error);
    }
  };

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${apiUrl}/api/expert/growthplan/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const fetchedGuides = response.data.growthPlan.map((guide) => ({
            ...guide,
            combinedName: `${guide.level} ${guide.specialization}`, // Combine level and specialization
          }));

          const newGuide = {
            id: 'new',
            role: '',
            level: '',
            rate: '',
            specialization: '',
            available_days: [],
            available_times: '',
            category: '',
            topics: [],
            combinedName: 'Select a guide',
          };

          setSkillAnalysisGuides([newGuide, ...fetchedGuides]);
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
  }, []);
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <Text key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </Text>
    );
  });

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };
  

    const handleOpenPress2 = () => {
      setModalVisible2(true);
    };
  
    const handleCloseModal2 = () => {
      setModalVisible2(false);
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
        <View style={{ marginLeft: 270}}>
          <View style={styles.header}>
            <Button mode="text" 
              textColor="#000000"
              style={styles.button} 
              onPress={handleOpenPress}
              icon={() => (
                <Image 
                  source={{ uri: 'https://img.icons8.com/?size=100&id=3220&format=png&color=4CAF50' }} 
                  style={{ width: 20, height: 20 }} 
                />
              )}>Create New Guide</Button>

          <View>
              <Button
                mode="text"
                textColor="#000000"
                style={{ marginBottom: 10 }}
                onPress={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown visibility
                contentStyle={{ alignItems: 'center' }}
                icon={() => (
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/?size=100&id=Da9Xe1TFL49g&format=png&color=000000',
                    }}
                    style={{ width: 20, height: 20 }}
                  />
                )}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ marginRight: 5 }}>Edit Guides</Text>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/?size=100&id=85018&format=png&color=000000',
                    }}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
              </Button>

              {/* Dropdown Section */}
              {dropdownVisible && (
                <View
                  style={{
                    marginTop: -45,
                    backgroundColor: 'white',
                  }}
                >
                  <Picker
                    selectedValue={selectedGuide}
                    onValueChange={(itemValue) => {
                      const selectedItem = skillAnalysisGuides.find(
                        (item) => item.combinedName === itemValue
                      );
                      setSelectedGuide(itemValue);
                      handleSaveToStorage(selectedItem); 
                    }}
                    style={{ height: 30, width: '100%', padding: 5, borderWidth: 0, outline: 'none', fontSize: 14, fontWeight: 600 }}
                  >

                    {skillAnalysisGuides.map((item) => (
                      <Picker.Item
                        key={item.id}
                        label={item.combinedName}
                        value={item.combinedName}
                      />
                    ))}
                  </Picker>
                </View>
              )}
            </View>
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
              {activeTab === 'Scheduled' ? <GrowthPlansReview />  :  <CompletedGrowthPlan />}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
          <View style={styles.modalContent}>
          <OpenModal2 onClose={() => handleCloseModal2()} />
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
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 7,
    color: '#666',
    fontFamily:"Roboto-Light"
  },
  image: {
    width: 21,
    height: 21,
    marginRight: 5,
    marginTop: 5,
    marginLeft: 60
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
          marginLeft: 10,
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
