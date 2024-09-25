import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableHighlight, TouchableOpacity,  Modal,  Animated, ImageBackground,} from 'react-native';
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

const data = [
  { date: 'M', score: 10 },
{ date: 'T', score: 15 },
{ date: 'W', score: 8 },
{ date: 'T', score: 18 },
{ date: 'F', score: 4 },
{ date: 'S', score: 6 },
{ date: 'S', score: 1 }
];

const colors = ['#FF4040', '#CD5B45', '#FF7F50', '#F08080', '#F88379', '#FFE4E1', '#FFE4E1',];

function MyComponent() {
    const [isInterviewHovered, setIsInterviewHovered] = useState(true);
   const [targetDate, setTargetDate] = useState(''); 
    const [role, setSkillsAnalysisRole] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const barHeights = useRef(data.map(() => new Animated.Value(0))).current;

  const apiUrl = process.env.REACT_APP_API_URL;
  
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


  useEffect(() => {
    const animations = data.map((item, index) => Animated.timing(barHeights[index], {
      toValue: item.score * 7,
      duration: 1000,
      useNativeDriver: false,
    }));

    Animated.stagger(100, animations).start();
  }, []);

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
  style={{ height: '120%', width: '100%',flex: 1}}
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
                        <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ position: 'absolute', right: 80, top: -45, paddingHorizontal: 8, paddingVertical: 10, borderRadius: 5, backgroundColor: 'coral', width: 100, alignItems: 'center',}}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("Create Profile")}</Text>
                  </View>
     </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress2}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Edit Profile")}</Text>
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
        <View style={styles.barGraphContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <Animated.View style={[styles.graphBar, { height: barHeights[index], backgroundColor: colors[index] }]} />
              <View style={styles.scoreDateContainer}>
                <Text style={styles.graphScore}>{item.score}</Text>
                <Text style={styles.graphDate}>{item.date}</Text>
              </View>
            </View>
          ))}
          
        </View>
        
      </View>
       <View style={styles.box}>
        <View style={{alignItems: 'center', alignContent: 'center',fontFamily:"Roboto-Light"}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Rating")}</Text>
       <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 15,fontFamily:"Roboto-Light" }}>{t("40 candidates reviews")}</Text>
    <View style={{ paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, backgroundColor: 'rgba(225,225,212,0.3)', width: 200, alignItems: 'center', marginTop: 10 }}>
    <View style={{ flexDirection: 'row'}}>
                    <Text style={{ fontSize: 18, color: "black", alignText: 'center', fontWeight: '600',fontFamily:"Roboto-Light" }}><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /><FaStar color="gold" /></Text> <Text style={{ fontSize: 12, marginTop: 3, marginLeft: 5, color: "black"}}> 4.7 out of 5 </Text>
                    </View>
                  </View>
      <TouchableOpacity>
     <Text style={{ fontSize: 12, color: 'darkgrey', marginTop: 30,fontFamily:"Roboto-Light" }}>{t("How do we calculate ratings?")}</Text>
     </TouchableOpacity>
    </View>
      </View>
      <View style={styles.box2}>
        <Text style = {{fontSize: 14, color: 'black', fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("You have a new session in:")}</Text>
         <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'coral', marginTop: 5,fontFamily:"Roboto-Light" }}>{timerComponents}</Text>
        <Text style = {{fontSize: 12, marginTop: 20, color: 'grey',fontFamily:"Roboto-Light" }}>{t("By recording upcoming sessions in your calendar, you hold yourself accountable for candidate's progress. Seeing these sessions scheduled prompts you to prepare accordingly and actively participate.")} </Text>
     </View>
     </View>

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
    justifyContent: 'space-between',
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
    marginTop: 60,
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
});

export default MyComponent;
