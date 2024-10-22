import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import ScheduledGrowthPlan from '../components/ScheduledGrowthPlan';
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
            
                     
             
                            
                        </View>
                        <View style={{flexDirection: 'row'}}>
                    
          <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Create Profile")}</Text>
                  </View>
     </TouchableOpacity>
          
          <TouchableOpacity onPress={handleOpenPress2}>
            <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 20, borderWidth: 1 }}>
                            <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Edit Profile")}</Text>
                          </View>
             </TouchableOpacity>
                         </View>

     <View style={styles.container}>
     <View style={styles.box}>
  <Text style={{ fontSize: 12, color: 'grey', fontFamily: "Roboto-Light" }}>
    {t("Pending Growth Plan Reviews")}
  </Text>
  <View style={{ flexDirection: 'row' }}>
    <Image source={require('../assets/icons8-choice.gif')} style={styles.boximage} />
    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'brown', marginTop: 5, fontFamily: "Roboto-Light" }}>
      {pendingCount} {/* Display pending count here */}
    </Text>
  </View>
  <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 10, fontFamily: "Roboto-Light" }}>
    {t("Candidates are waiting for your review")}
  </Text>
</View>
<View style={styles.box}>
  <Text style={{ fontSize: 12, color: 'grey', fontFamily: "Roboto-Light" }}>
    {t("Plans Reviewed")}
  </Text>
  <View style={{ flexDirection: 'row' }}>
    <Image source={require('../assets/icons8-done.gif')} style={styles.boximage} />
    <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 5, color: '#4CAF50', fontFamily: "Roboto-Light" }}>
      {reviewedCount} {/* Display reviewed count here */}
    </Text>
  </View>
  <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 10, fontFamily: "Roboto-Light" }}>
    {t("You have marked")} {reviewedCount} {t("growth plans as completed")}
  </Text>
</View>
      <View style={styles.box2}>
        <Text style = {{fontSize: 12, color: 'grey',fontFamily:"Roboto-Light" }}>{t("Next growth Plan Session in")}</Text>
        <View style={{flexDirection: 'row'}}>
         <Image source={require('../assets/icons8-delivery-time.gif')} style={styles.boximage2}  />
           <Text style = {{fontSize: 24, fontWeight: 'bold', marginTop: 5, color: 'darkgreen',fontFamily:"Roboto-Light" }}>{timerComponents}</Text>
           </View>
           <Text style = {{fontSize: 14, fontWeight: '500', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("You have a new session in")} {timerComponents}!</Text>
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

          <GrowthPlansReview />
<CompletedGrowthPlan />
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
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f7fff4',
    paddingVertical: 25,
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
    marginRight: 5,
    marginTop: 5,
    marginLeft: 60
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  marginTop: 50,
  maxWidth: '90%',
  marginLeft: 50,
  },
  box: {
    backgroundColor: '#f7fff4',
    padding: 20,
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  box2: {
    backgroundColor: '#f7fff4',
    padding: 20,
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '44%',
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
    position: 'absolute',
    left: 150,
    borderRadius: 25
  },
  boximage2: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 350,
    marginTop:5, 
    borderRadius: 25
  },
});

export default MyComponent;
