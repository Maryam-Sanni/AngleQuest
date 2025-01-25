import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableHighlight, TouchableOpacity, FlatList, Modal,  Animated, ImageBackground, Picker} from 'react-native';
import { FaStar } from 'react-icons/fa';
import { Button } from 'react-native-paper';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import ScheduledAdvice from '../components/ScheduledAdvice';
import CompletedAdvice from '../components/CompletedAdvice';
import OpenModal from '../Experts/AdviceProfile';
import OpenModal2 from '../Experts/EditAdviceProfile';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const generateGoogleCalendarLink = (title, description, startDate, endDate, location) => {
  const baseUrl = 'https://calendar.google.com/calendar/render';
  const formattedStartDate = new Date(startDate).toISOString().replace(/-|:|\.\d+/g, '');
  const formattedEndDate = new Date(endDate).toISOString().replace(/-|:|\.\d+/g, '');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location: location,
    dates: `${formattedStartDate}/${formattedEndDate}`,
  });

  return `${baseUrl}?${params.toString()}`;
};



function MyComponent() {
    const [isInterviewHovered, setIsInterviewHovered] = useState(true);
  const [meetingData, setMeetingData] = useState({ date: '', time: '', expert_link: '' });
   const [targetDate, setTargetDate] = useState(''); 
    const [role, setSkillsAnalysisRole] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [text, setText] = useState("How do we calculate ratings?");
   const [activeTab, setActiveTab] = useState('Scheduled');
  const [dropdownVisible, setDropdownVisible] = useState(false); 
  const [skillAnalysisGuides, setSkillAnalysisGuides] = useState([]); // Store fetched guides
  const [selectedGuide, setSelectedGuide] = useState(null);
  
  
  const apiUrl = process.env.REACT_APP_API_URL;


  // Helper function to get the start and end of the current month
  const getCurrentMonthRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // last day of the current month
    return { startOfMonth, endOfMonth };
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate(); // Get total days in the current month

  // Initialize an array to track meetings for each day of the month
  let daysOfMonth = Array.from({ length: getDaysInMonth(new Date().getFullYear(), new Date().getMonth()) }, (_, i) => ({ day: i + 1, count: 0 }));

  const dayAbbreviations = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];


  const filterMeetingsForExpertThisMonth = (data, expertId) => {
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();

    data.forEach(item => {
      const meetingDate = new Date(item.date_time.split(', ')[1]);

      if (item.expertid === expertId && meetingDate >= startOfMonth && meetingDate <= endOfMonth) {
        const dayOfMonth = meetingDate.getDate();
        const dayOfWeek = meetingDate.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Increment the meeting count for that day
        daysOfMonth[dayOfMonth - 1].count++;
        daysOfMonth[dayOfMonth - 1].dayAbbreviation = dayAbbreviations[dayOfWeek]; // Add day abbreviation
      }
    });

    console.log('Days of Month:', daysOfMonth);
  };


  const generateMeetingData = () => {
    // Update the state with the days of the month data for rendering
    setMeetingData(daysOfMonth); // Now, meetingData will be an array of { day: <number>, count: <number> }

    console.log('Meeting Data:', daysOfMonth); // Check the final structure of the meeting data
  };

  useEffect(() => {
    const fetchNextMeeting = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedExpertId = await AsyncStorage.getItem('user_id');

        if (!token || !storedExpertId) {
          console.error('No token or expert ID found');
          return;
        }

        const response = await fetch(`${apiUrl}/api/jobseeker/get-all-jobseeker-skillanalysis`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          const skillAnalysis = data.skillAnalysis;

          // Filter the meetings for this expert and future dates
          const matchingMeetings = skillAnalysis.filter(
            meeting => meeting.expertid === storedExpertId
          );

          if (matchingMeetings.length > 0) {
            // Get today's date
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set to the start of the day

            // Filter only future meetings including today
            const futureMeetings = matchingMeetings.filter(meeting => {
              // Parse the meeting date
              const meetingDate = new Date(meeting.date_time);
              return !isNaN(meetingDate.getTime()) && meetingDate >= today; // Ensure it's a valid date
            });

            if (futureMeetings.length > 0) {
              // Sort the future meetings by date (ascending)
              const sortedMeetings = futureMeetings.sort(
                (a, b) => new Date(a.date_time) - new Date(b.date_time)
              );

              // Get the closest upcoming meeting
              const nextMeeting = sortedMeetings[0];

              // Validate the date_time before using it
              if (!nextMeeting.date_time) {
                console.error('nextMeeting.date_time is undefined');
                return;
              }

              // Convert the dateTimeString into a valid Date object
              const meetingDateTime = new Date(nextMeeting.date_time);

              if (isNaN(meetingDateTime.getTime())) {
                console.error('Invalid date format:', nextMeeting.date_time);
                return;
              }

              // Extract the date and time parts in the desired format
              const options = { year: 'numeric', month: 'short', day: 'numeric' };
              const formattedDate = meetingDateTime.toLocaleDateString('en-US', options); // e.g., "Oct 26, 2024"
              const formattedTime = meetingDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // e.g., "01:00 PM"

              // Update the state with the next meeting's date, time, and expert link
              setMeetingData({ date: formattedDate, time: formattedTime, expert_link: nextMeeting.expert_link });
            } else {
              console.error('No future meetings found');
            }
          } else {
            console.error('No matching meetings found for this expert ID');
          }
        } else {
          console.error('Failed to fetch skill analysis:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch skill analysis:', error);
      }
    };

    fetchNextMeeting();
  }, []);





  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedExpertId = await AsyncStorage.getItem('user_id');

        if (!token || !storedExpertId) {
          console.error('No token or user ID found');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/expert/skillAnalysis/getAllExpertsSkillAnalysisFeedbacks`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          const data = response.data.skillAnalysis;

          // Filter meetings based on expert_id
          const filteredMeetings = data.filter(meeting => meeting.user_id === storedExpertId);

          // Calculate total ratings and average rating
          const validRatings = filteredMeetings.filter(meeting => meeting.rating_figure !== null);

          // Calculate the total rating directly on a scale of 1 to 5
          const totalRatings = validRatings.reduce((acc, meeting) => acc + (Number(meeting.rating_figure) || 0), 0);
          const averageRating = validRatings.length > 0 ? (totalRatings / validRatings.length / 2).toFixed(1) : 0; // Divide by 2 to normalize to a 5-star system

          setRatingCount(validRatings.length);
          setAverageRating(averageRating);

          // Save all growth plans to AsyncStorage
          await AsyncStorage.setItem('allExpertsskillanalysis', JSON.stringify(data));
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    // Initial data load
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

  const barHeights = useRef([]);

  useEffect(() => {
    if (meetingData.length > 0) {
      // Initialize bar heights based on meetingData
      barHeights.current = meetingData.map(() => new Animated.Value(0));

      // Run animations
      const animations = meetingData.map((item, index) =>
        Animated.timing(barHeights.current[index], {
          toValue: Math.max(item.score * 10, 1), // Ensure a minimum height
          duration: 1000,
          useNativeDriver: false,
        })
      );

      Animated.stagger(100, animations).start();
    }
  }, [meetingData]);

  useEffect(() => {
    const loadFormData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No token found');
            
            const response = await axios.get(`${apiUrl}/api/expert/skillAnalysis/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                const data = response.data.SkillAnalysis; // Access the SkillAnalysis property
                setSkillsAnalysisRole(data.role || '');
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

        const response = await axios.get(`${apiUrl}/api/expert/skillAnalysis/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const fetchedGuides = response.data.SkillAnalysis.map((guide) => ({
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
        <View style={{ marginLeft: 270, }}>

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
            {activeTab === 'Scheduled' ? <ScheduledAdvice />  :  <CompletedAdvice />}
          </View>
          
        </View>
     
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
    marginTop: 5,
    marginRight: 5,
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
