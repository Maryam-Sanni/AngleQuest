import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Linking, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../components/Createhubform';
import OpenModal2 from '../components/Edithubform';
import ConfirmationPopup from '../Experts/OtherHubs';
import { BlurView } from 'expo-blur';
import OpenModal4 from './SetMeet';
import OpenModal5 from './Assignment';
import { useTranslation } from 'react-i18next';
import {useFonts} from "expo-font"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScheduledMeet from '../Experts/ScheduledMeetings';

function MyComponent() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [isFirstHubsHovered, setIsFirstHubsHovered] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);;
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [isAllHovered, setIsAllHovered] = useState(false);
    const [coaching_hub_name, setGroupName] = useState('');

  
      const goToMyHubs = () => {
        navigation.navigate('All Hubs');
      };

      const handleOthersPress = () => {
        setModalVisible2(true);
      };
    
      const handleCloseModal2 = () => {
        setModalVisible2(false);
      };

      const handleOpenPress = () => {
        setModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };

    const handleOpenPress2 = () => {
      setModalVisible3(true);
    };
  
    const handleCloseModal3 = () => {
      setModalVisible3(false);
    };

    const handleOpenPress3 = () => {
      setModalVisible4(true);
    };
  
    const handleCloseModal4 = () => {
      setModalVisible4(false);
    };

    const handleOpenPress4 = () => {
      setModalVisible5(true);
    };
  
    const handleCloseModal5 = () => {
      setModalVisible5(false);
      onClose();
    };

  
const {t}=useTranslation()
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('https://recruitangle.com/api/expert/hubs/get', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          const data = response.data.NewHub;
          setGroupName(data.coaching_hub_name || '');
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
  }, []);

  const reloadHomeExperts = () => {
    navigation.navigate('anglequest');
    setTimeout(() => {
      navigation.navigate('Manage Hubs');
    }, 2000); // Delay of 3 seconds (3000 milliseconds)
  };

  
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
          <View style={{ marginLeft: 270 }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={reloadHomeExperts}>
                <Image
                  source={{ uri: 'https://img.icons8.com/?size=100&id=14296&format=png&color=000000' }}
                  style={{width: 18, height: 18, marginTop: 5, marginLeft: 30 }}
                />
              </TouchableOpacity>  
              <TouchableOpacity
            underlayColor={isFirstHubsHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsFirstHubsHovered(true)}
            onMouseLeave={() => setIsFirstHubsHovered(false)}> 
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                <Text style={[{marginLeft: 5, color: "#666" }, isFirstHubsHovered && { color: '#666' }]}>{coaching_hub_name || "No update yet"}</Text>
              </View>
            </TouchableOpacity>
            
            
            <TouchableOpacity onPress={goToMyHubs}
            underlayColor={isAllHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsAllHovered(true)}
            onMouseLeave={() => setIsAllHovered(false)} >
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image2}
/>
                <Text style={[{marginLeft: 5, color: "#666" }, isAllHovered && { color: 'coral' }]}>{t("All Hubs")}</Text>
              </View>
            </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ position: 'absolute', right: 80, top: -45, paddingHorizontal: 8, paddingVertical: 10, borderRadius: 5, backgroundColor: 'coral', width: 100, alignItems: 'center',}}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("New Hub")}</Text>
                  </View>
     </TouchableOpacity>

     <View style={{ flexDirection: "row"}}>
            <TouchableOpacity onPress={handleOpenPress2}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Edit Hub")}</Text>
                  </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={handleOpenPress4} >
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 20, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("New Meeting")}</Text>
                  </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={handleOpenPress3}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 20, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Assignment")}</Text>
                  </View>
     </TouchableOpacity>
    
     </View>
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={handleCloseModal3}
      >
          <View style={styles.modalContent}>
          <OpenModal2 onClose={() => handleCloseModal3()} />
          </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={handleCloseModal4}
      >
          <View style={styles.modalContent}>
          <OpenModal5 onClose={() => handleCloseModal4()} />
          </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
          <View style={styles.modalContent}>
            <ConfirmationPopup onClose={() => handleCloseModal2()} />
          </View>
      </Modal>

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
        visible={modalVisible5}
        onRequestClose={handleCloseModal4}
      >
        <View style={styles.modalContent}>
          <OpenModal4 onClose={handleCloseModal5} />
        </View>
      </Modal>
            <ScheduledMeetingsTable />
             <ScheduledMeet />
            
          </View>
        </ScrollView>
      </View>
    </View>
    </ImageBackground>
  );
}

const ScheduledMeetingsTable = () => {
  const [messageCountText, setMessageCountText] = useState('0'); 
  const [lastCandidateLink, setLastCandidateLink] = useState(null);
  const [meetingData, setMeetingData] = useState({
    date: '',
    time: ''
  });
   
  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('https://recruitangle.com/api/expert/newhubmeeting/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const { NewMeeting } = response.data;
          if (NewMeeting && NewMeeting.length > 0) {
            const meeting = NewMeeting[0]; // Assuming there's at least one meeting
            setMeetingData({
              date: meeting.date,
              time: meeting.time
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
    const fetchLastCreatedMeeting = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('https://recruitangle.com/api/jobseeker/meetings/get?type=hub', {
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
  
    const {t}=useTranslation()

  return ( 
    <View style={{flex: 1}}>
    <View style={styles.container}>
    <View style={styles.whiteBox}>
    <Text style={{ fontSize: 16, color: "black", fontWeight: '600'}}>{t("Next Meeting Schedule")}</Text>
    <Text style={{ fontSize: 13, color: "black", marginTop: 10}}>{meetingData.date}</Text>
    <Text style={{ fontSize: 14, color: "black", marginTop: 10, fontWeight: '500'}}>{meetingData.time}</Text>
    <TouchableOpacity style={{  backgroundColor: 'none', padding: 8, paddingHorizontal: 10, marginTop: 15, borderRadius: 5, marginLeft: 10, marginRight: 10, borderWidth: 2, borderColor: '#206C00'}}  onPress={handlejoinPress}>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600'}}>{t("Start Session")}</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.whiteBox}>
      <Text style={{ fontSize: 12, color: "black", fontWeight: '500'}}>{t("Next Meeting Confirmation")}</Text>
    <Text style={{ fontSize: 24, color: "black", marginTop: 5, fontWeight: 'bold'}}>0</Text>
    <Text style={{ fontSize: 12, color: "darkred", marginTop: 10, fontWeight: '500'}}>{t("Yet to Confirm")}</Text>
    <Text style={{ fontSize: 24, color: "darkred", marginTop: 5, fontWeight: 'bold'}}>0</Text>
      </View>

      <View style={styles.whiteBox}>
      <Text style={{ fontSize: 16, color: "black", fontWeight: '500'}}>{t("Total Hub Members")}</Text>
    <Text style={{ fontSize: 24, color: "black", marginTop: 10, fontWeight: 'bold'}}>1</Text>
    
      </View>

      <View style={styles.whiteBox}>
      <Text style={{ fontSize: 12, color: "#206C00", fontWeight: '500'}}>{t("Sessions Held")}</Text>
    <Text style={{ fontSize: 24, color: "#206C00", marginTop: 5, fontWeight: 'bold'}}>0</Text>
    <Text style={{ fontSize: 12, color: "darkred", fontWeight: '500', marginTop: 10,}}>{t("Sessions Missed")}</Text>
    <Text style={{ fontSize: 24, color: "darkred", marginTop: 5, fontWeight: 'bold'}}>0</Text>
      </View>

      </View>
    
    
    </View>
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fff4',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 500,
    color: '#666'
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 60
  },
  image2: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 120
  },
  headertext: {
    position: 'absolute',
    right: 30,
    marginLeft: 5,
    fontSize: 14,
    marginTop: -30,
    fontWeight: '500',
    color: '#666',
    fontFamily:""
  },
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
    marginLeft: 50, marginRight: 50
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
   backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
   backgroundColor: 'none',
    padding: 10,
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
  },
  messageCount: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 70
  },
  messageCountText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 11
  },
  greenBox: {
   width: "90%",
    height:250,
    marginBottom: 20,
    marginLeft: 50, 
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 20, 
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  blurBackground: {
    borderRadius: 20, 
    backgroundColor: 'rgba(225,225,212,0.3)',
  },
  cellText: {
    textAlign: 'center',
  },
  userimage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  marginTop: 50,
  maxWidth: '90%',
    marginLeft: 50
  },
  whiteBox: {
    width: '22%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f7fff4',
  borderRadius: 20,
  marginTop: 50,
  borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
});

export default MyComponent;
