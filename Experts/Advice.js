import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableHighlight, TouchableOpacity,  Modal,  Animated, ImageBackground, Linking} from 'react-native';
import { FaStar } from 'react-icons/fa';
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

  
  const handleTextChange = () => {
    if (text === "How do we calculate ratings?") {
      setText("When you have completed your session, individuals will score the session");
    } else {
      setText("How do we calculate ratings?");
    }
  };

  const exampleMeeting = {
    title: 'Skill Analysis Session',
    description: 'Meeting',
    location: 'Anglequest.com',
  };
  
  const handleAddToCalendarPress = () => {
    console.log('Meeting Data:', meetingData); // Log to see the current meeting data

    const title = 'Next Meeting with Expert';
    const description = 'Discussion with your expert regarding skill analysis';

    // Ensure meetingData.date and meetingData.time are valid
    if (!meetingData.date || !meetingData.time) {
      console.error('date or time is undefined or invalid');
      return;
    }

    // Format the date from 'DD/MM/YYYY' to 'YYYY-MM-DD'
    const [day, month, year] = meetingData.date.split('/');
    const formattedDate = `${year}-${month}-${day}`; // Convert to 'YYYY-MM-DD'

    // Combine formatted date and time into a single datetime string
    const dateTimeString = `${formattedDate} ${meetingData.time}`;

    // Create a Date object from the combined string
    const startDate = new Date(dateTimeString);

    // Check if the startDate is valid
    if (isNaN(startDate.getTime())) {
      console.error('Invalid date format:', dateTimeString);
      return;
    }

    // Assuming the meeting lasts 1 hour
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const googleCalendarLink = generateGoogleCalendarLink(title, description, startDate, endDate, 'Online Meeting');

    // Open the Google Calendar link
    Linking.openURL(googleCalendarLink).catch(err => console.error('Failed to open URL:', err));
  };




  
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

  const handleJoinPress = () => {
    if (meetingData.expert_link) {
      Linking.openURL(meetingData.expert_link);
    } else {
      console.error('No expert link available');
    }
  };

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


            <TouchableHighlight

                                  underlayColor={isInterviewHovered ? 'transparent' : 'transparent'}
                                  onMouseEnter={() => setIsInterviewHovered(false)}
                                  onMouseLeave={() => setIsInterviewHovered(false)}>
                                  <View style={styles.item}>
                                  <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d82dc6c35b436a4ac93edec3cb47de416b168131f8e3deb5c4898437d416d25f?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
          style={styles.image}
          />
                                      <Text style={[styles.headertext, isInterviewHovered && { color: '#666' }]}>{role || "No update yet"}</Text>
                                  </View>
                              </TouchableHighlight>

                          </View>
                          <TouchableOpacity onPress={handleOpenPress2}>
          <View style={{ position: 'absolute', right: 80, top: -45, paddingHorizontal: 8, paddingVertical: 10, borderRadius: 5, backgroundColor: 'coral', width: 100, alignItems: 'center',}}>
                      <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("Edit Profile")}</Text>
                    </View>
          </TouchableOpacity>
                    
          <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Create Profile")}</Text>
                  </View>
     </TouchableOpacity>
          

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
        <View style={styles.box}>
          <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: '600', textAlign: 'center'}}>
              {t("Next Session")}
            </Text>
            <Text style={{ fontSize: 13, marginTop: 10, fontFamily: "Roboto-Light", textAlign: 'center' }}>
              {meetingData.date || 'N/A'}
            </Text>
            <Text style={{ fontSize: 13, marginTop: 5, fontWeight: '500', fontFamily: "Roboto-Light", textAlign: 'center' }}>
              {meetingData.time || 'N/A'}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
              <TouchableOpacity 
                style={{ backgroundColor: 'none', padding: 8, paddingHorizontal: 10, borderRadius: 5, marginRight: 10, borderWidth: 2, borderColor: '#206C00'}} 
                onPress={handleJoinPress}
              >
                <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600', fontFamily: "Roboto-Light" }}>
                  {t("Join Now")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={{ backgroundColor: 'none', padding: 8, paddingHorizontal: 10, borderRadius: 5, borderWidth: 2, borderColor: '#206C00'}} 
                onPress={handleAddToCalendarPress}
              >
                <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600', fontFamily: "Roboto-Light" }}>
                  {t("Add to Calendar")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>



       <View style={styles.box}>
        <View style={{alignItems: 'center', alignContent: 'center',fontFamily:"Roboto-Light"}}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>{t("Rating")}</Text>
       <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 15,fontFamily:"Roboto-Light" }}>{ratingCount} candidates reviews</Text>
    <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, backgroundColor: 'rgba(225,225,212,0.3)', width: 200, alignItems: 'center', marginTop: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: "black", fontWeight: '600', fontFamily: "Roboto-Light" }}>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < Math.round(averageRating) ? "gold" : "lightgrey"} />
          ))}
        </Text>
        <Text style={{ fontSize: 12, marginTop: 3, marginLeft: 5, color: "black" }}>
          {averageRating} out of 5
        </Text>
      </View>
                  </View>
          <TouchableOpacity onPress={handleTextChange}>
            <Text style={{ fontSize: 12, marginTop: 30, fontFamily: "Roboto-Light" }}>
              {text}
            </Text>
          </TouchableOpacity>
    </View>
      </View>
        <View style={styles.box2}>
          <Text style = {{fontSize: 14, color: 'black', fontWeight: '600', marginBottom: 5}}>{t("You have a new session in:")}</Text>
           <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'coral', marginTop: 5,fontFamily:"Roboto-Light" }}>{timerComponents}</Text>
          <Text style = {{fontSize: 12, marginTop: 20, color: 'grey',fontFamily:"Roboto-Light" }}>{t("By recording upcoming sessions in your calendar, you hold yourself accountable for candidate's progress.")} </Text>
        </View>
     </View>

          
  
          
          <Text style = {{fontSize: 20, marginTop: 30, color: '#f7fff4', fontWeight: 'bold', marginLeft: 50, marginBottom: -10 }}>{t("Skill Analysis Overview")} </Text>
          
<ScheduledAdvice /> 
<CompletedAdvice />
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
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f7fff4',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    flexDirection: 'row',
    alignItems: 'center',
  marginTop: 50,
  maxWidth: '90%',
  marginLeft: 50,
  },
  box2: {
    backgroundColor: '#f7fff4',
    padding: 20,
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '44%',
    height: 200,
    overflow: 'scroll',
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
  box: {
    backgroundColor: '#f7fff4',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: 200,
    marginRight: 20,
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
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  barGraphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 200,
    height: 80,
    marginTop: 40,
    marginRight: 20,
    marginBottom: -10,
    paddingHorizontal: 10,
    backgroundColor: '#f7fff4',
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 10,
  },
  barContainer: {
    alignItems: 'center',
  },
  scoreDateContainer: {
    position: 'absolute',
    bottom: -30,
    left: '50%',
    transform: [{ translateX: -5 }],
    alignItems: 'center',
     marginBottom: 10,
  },
  graphBar: {
    width: 20,
    borderRadius: 2,
    marginBottom: 10,
  },
  graphScore: {
    fontSize: 10,
    color: 'lightgrey',
    fontWeight: '600',
     marginTop: 10,
     fontFamily:"Roboto-Light"
  },
  graphDate: {
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold',
    marginTop: 2,
   marginBottom: -10,
   fontFamily:"Roboto-Light"
  },
  boximage: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: '100%',
        marginLeft: 350,
        borderRadius: 25, 
      },
  calendarContainer: {
    flexDirection: 'column',
    marginTop: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxWidth: '100%',
    overflow: 'hidden'
  },
  monthGrid: {
    flexDirection: 'column', 
    alignItems: 'center',
    marginTop: 10,
  },
  dayAbbreviationsRow: {
    flexDirection: 'row', // Days abbreviation in a row
    justifyContent: 'space-between', // Space out evenly
    width: '100%', // Full width for the row
    marginBottom: 5, // Space below for the counts
  },
  daysRow: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    width: '100%',
  },
  dayContainer: {
    alignItems: 'center',
    width: '14%',
    marginBottom: 10, 
  },
  dayName: {
    fontWeight: 'bold',
  },
  dayNumber: {
    fontSize: 14, 
fontWeight: 'bold'
  },
  meetingCount: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(225,225,212,0.3)',
    textAlign: 'center',
  },
});

export default MyComponent;
