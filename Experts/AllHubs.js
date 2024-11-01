import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Linking, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import OpenModal from '../components/Createhubform';
import OpenModal2 from '../components/Edithubform';
import OpenModal7 from '../Experts/OtherHubs';
import ConfirmationPopup from '../Experts/OtherHubs';
import OpenModal4 from './SetMeet';
import OpenModal5 from './Assignment';
import OpenModal6 from './All Sessions';
import { useTranslation } from 'react-i18next';
import {useFonts} from "expo-font"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScheduledMeet from '../Experts/ScheduledMeetings';
import ScheduledMeet2 from '../Experts/ScheduledMeetID';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function MyComponent() {
  const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [isFirstHubsHovered, setIsFirstHubsHovered] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);
    const [modalVisible5, setModalVisible5] = useState(false);;
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible7, setModalVisible7] = useState(false);
    const [isAllHovered, setIsAllHovered] = useState(false);
    const [coaching_hub_name, setGroupName] = useState('');
  const [hubs, setHubs] = useState([]);
  const [selectedHub, setSelectedHub] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  
      const goToMyHubs = () => {
        navigate('/all-Hubs');
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

    const handleOpenPress7 = () => {
      setModalVisible7(true);
    };
  
    const handleCloseModal7 = () => {
      setModalVisible7(false);
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

        const response = await axios.get(`${apiUrl}/api/expert/hubs/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          setHubs(response.data.NewHub || []);
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
  }, []);


  
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
          <View style={{ marginLeft: 270 }}>
            <View style={styles.header}>
              
              <TouchableOpacity onPress={handleOpenPress}>
                <View style={{marginLeft: 110, padding: 10, borderRadius: 5, backgroundColor: 'coral', width: 130, alignItems: 'center',}}>
                                <Text style={{ fontSize: 14, color: "white", alignText: 'center', fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("Create New Hub")}</Text>
                              </View>
                 </TouchableOpacity>
             
              <TouchableOpacity onPress={handleOpenPress2}>
                <View style={{ marginLeft: 10, padding: 10,  borderRadius: 5, backgroundColor: 'coral', width: 100, alignItems: 'center',}}>
                                <Text style={{ fontSize: 14, color: "white", alignText: 'center', fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("Edit Hub")}</Text>
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
              visible={modalVisible5}
              onRequestClose={handleCloseModal5}
            >
              <View style={styles.modalContent}>
                <OpenModal4 onClose={handleCloseModal5} />
              </View>
            </Modal>
            
            <ScheduledMeetingsTable />
             
            
          </View>
        </ScrollView>
      </View>
    </View>
    </ImageBackground>
  );
}

const ScheduledMeetingsTable = () => {
   const [modalVisible6, setModalVisible6] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
   const [modalVisible4, setModalVisible4] = useState(false);
  const [meetingConfirmation, setMeetingConfirmation] = useState(0);
  const [yetToConfirm, setYetToConfirm] = useState(0);
  const [totalHubMembers, setTotalHubMembers] = useState(0);
  const [sessionsHeld, setSessionsHeld] = useState(0);
  const [sessionsMissed, setSessionsMissed] = useState(0);
  const [hubs, setHubs] = useState([]);
  const [selectedHub, setSelectedHub] = useState(null);
  const [lastCandidateLink, setLastCandidateLink] = useState(null);
  const [hubId, setHubId] = useState(null);
  const [meetingData, setMeetingData] = useState({
    date: '',
    time: ''
  });

  const handleOpenPress6 = () => {
    setModalVisible6(true);
  };

  const handleCloseModal6 = () => {
    setModalVisible6(false);
    onClose();
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleHubPress = async (hub) => {
    setSelectedHub(hub);
    setHubId(hub.id); // Set the hubId state

    try {
      await AsyncStorage.setItem('hub_id', hub.id.toString());
      await AsyncStorage.setItem('coaching_hub_name', hub.coaching_hub_name || '');
      console.log(`Hub ID ${hub.id} and Coaching Hub Name ${hub.coaching_hub_name} saved to AsyncStorage`);
    } catch (error) {
      console.error("Error saving hub data to AsyncStorage", error);
    }
  };
  
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${apiUrl}/api/expert/hubs/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          setHubs(response.data.NewHub || []);
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

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('user_id');
        if (!token || !userId) {
          console.error('No token or user ID found');
          return;
        }

        const response = await fetch('https://recruitangle.com/api/jobseeker/get-all-joined-jobseeker', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          const meetings = data.allJoinedJobseekers || [];

          // Filter meetings based on the user ID
          const userMeetings = meetings.filter(meeting => meeting.expert_id === userId);

          // Calculate the data
          setTotalHubMembers(userMeetings.length);

          // Other calculations based on `userMeetings` can be done here
          // Example:
          setSessionsHeld(userMeetings.reduce((acc, meeting) => acc + Number(meeting.hub_sessions_held), 0));

          // Calculate total SessionsMissed
          setSessionsMissed(userMeetings.reduce((acc, meeting) => acc + Number(meeting.hub_sessions_missed), 0));

          // Calculate total Meeting Confirmations (`Yes`)
          setMeetingConfirmation(userMeetings.reduce((acc, meeting) => acc + (meeting.confirmed_attendance === 'Yes' ? 1 : 0), 0));

          // Calculate total Yet to Confirm (`No`)
          setYetToConfirm(userMeetings.reduce((acc, meeting) => acc + (meeting.confirmed_attendance === 'No' ? 1 : 0), 0));

        } else {
          console.error('Failed to fetch additional data:', data.message);
        }
      } catch (error) {
        console.error('Failed to fetch additional data:', error);
      }
    };

    fetchAdditionalData();
  }, []);
  
  const handlejoinPress = () => {
    if (lastCandidateLink) {
      Linking.openURL(lastCandidateLink);
    } else {
      console.error('No candidate link found');
    }
  };
  
    const {t}=useTranslation()

  const handleOpenPress4 = () => {
    setModalVisible5(true);
  };

  const handleCloseModal5 = () => {
    setModalVisible5(false);
    onClose();
  };

  const handleOpenPress3 = () => {
    setModalVisible4(true);
  };

  const handleCloseModal4 = () => {
    setModalVisible4(false);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  
  return ( 
  <View style={{ flex: 1 }}>
    <Text style={{ fontSize: 16, color: '#f7fff4', marginTop: 20, marginLeft: 50 }}>
      My Hubs
    </Text>

    <View style={{ flexDirection: "row", marginLeft: 50, marginTop: -5 }}>
      {hubs.map((hub) => {
        const isSelected = hub.id === selectedHub?.id;

        return (
          <TouchableOpacity key={hub.id} onPress={() => handleHubPress(hub)} accessibilityRole="button">
            <View
              style={[
                styles.item,
                isSelected ? styles.selectedItem : styles.unselectedItem,
              ]}
            >
              <Text
                style={[
                  styles.hubText,
                  isSelected ? styles.selectedText : styles.unselectedText,
                ]}
              >
                {hub.coaching_hub_name || 'No hub yet'}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>

    {selectedHub && (
      <View style={styles.container}>
        <View style={styles.whiteBox}>
          <Text style={{ fontSize: 16, color: "black", fontWeight: '600' }}>
            {t("Next Meeting Schedule")}
          </Text>
          <Text style={{ fontSize: 13, color: "black", marginTop: 10 }}>
            {moment(meetingData.date).format("DD-MM-YYYY hh:mmA")}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: isHovered ? '#206C00' : 'transparent',
              padding: 8,
              paddingHorizontal: 10,
              marginTop: 15,
              borderRadius: 5,
              marginLeft: 10,
              marginRight: 10,
              borderWidth: 2,
              borderColor: '#206C00',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onPress={handlejoinPress}
          >
            <Text style={{ color: isHovered ? 'white' : '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600' }}>
              {t("Start Session")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.whiteBox}>
          <Text style={{ fontSize: 16, color: "black", fontWeight: '500' }}>
            {t("All Meeting Confirmation")}
          </Text>
          <Text style={{ fontSize: 24, color: "black", marginTop: 5, fontWeight: 'bold' }}>
            {meetingConfirmation}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: isHovered2 ? '#206C00' : 'transparent',
              padding: 8,
              paddingHorizontal: 10,
              marginTop: 15,
              borderRadius: 5,
              marginLeft: 10,
              marginRight: 10,
              borderWidth: 2,
              borderColor: '#206C00',
            }}
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
            onPress={handleOpenPress6}
          >
            <Text style={{ color: isHovered2 ? 'white' : '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600' }}>
              {t("View Attendance")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.whiteBox}>
          <Text style={{ fontSize: 16, color: "black", fontWeight: '500' }}>
            {t("Total Hub Members")}
          </Text>
          <Text style={{ fontSize: 24, color: "black", marginTop: 10, fontWeight: 'bold' }}>
            {totalHubMembers}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: isHovered3 ? '#206C00' : 'transparent',
              padding: 8,
              paddingHorizontal: 10,
              marginTop: 15,
              borderRadius: 5,
              marginLeft: 10,
              marginRight: 10,
              borderWidth: 2,
              borderColor: '#206C00',
            }}
            onMouseEnter={() => setIsHovered3(true)}
            onMouseLeave={() => setIsHovered3(false)}
            onPress={handleOpenPress4}
          >
            <Text style={{ color: isHovered3 ? 'white' : '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600' }}>
              {t("New Training Session")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.whiteBox}>
          <Text style={{ fontSize: 16, color: "black", fontWeight: '500', marginBottom: 5 }}>
            {t("Hub Assessment")}
          </Text>
          <Text style={{ fontSize: 13, marginLeft: 10, marginRight: 10, color: "black", marginBottom: 10, textAlign: 'center' }}>
            Set new assessment for hub session
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: isHovered4 ? '#206C00' : 'transparent',
              padding: 8,
              paddingHorizontal: 10,
              marginTop: 15,
              borderRadius: 5,
              marginLeft: 10,
              marginRight: 10,
              borderWidth: 2,
              borderColor: '#206C00',
            }}
            onMouseEnter={() => setIsHovered4(true)}
            onMouseLeave={() => setIsHovered4(false)}
            onPress={handleOpenPress3}
          >
            <Text style={{ color: isHovered4 ? 'white' : '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600' }}>
              {t("Create New")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
    {selectedHub && ( // Only show the below components if a hub is selected
    <ScheduledMeet2 hubId={selectedHub.id} coachingHubName={selectedHub.coaching_hub_name} />
    )}

    {!selectedHub && ( // Show ScheduledMeet when no hub is selected
        <ScheduledMeet />
    )}
    {/* Modals */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible6}
      onRequestClose={handleCloseModal6}
    >
      <View style={styles.modalContent}>
        <OpenModal6 onClose={handleCloseModal6} />
      </View>
    </Modal>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible5}
      onRequestClose={handleCloseModal5}
    >
      <View style={styles.modalContent}>
        <OpenModal4 onClose={handleCloseModal5} />
      </View>
    </Modal>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible4}
      onRequestClose={handleCloseModal4}
    >
      <View style={styles.modalContent}>
        <OpenModal5 onClose={handleCloseModal4} />
      </View>
    </Modal>
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
  marginTop: 20,
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
  selectedItem: {
    justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: "#135837",
        backgroundColor:
            "#135837",
        alignItems: "center",
        marginTop: 20,
        borderWidth: 1,
    marginRight: 20,
  },
  unselectedItem: {
    justifyContent: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderColor: "#f7fff4",
        backgroundColor:
            "rgba(211,249,216,0.3)",
        alignItems: "center",
        marginTop: 20,
        borderWidth: 1,
    marginRight: 20,
  },
  hubText: {
    padding: 5,
    paddingHorizontal: 15,
    fontFamily: "Roboto-Light",
  },
  selectedText: {
    color: "#fff", // white text
  },
  unselectedText: {
    color: "#f7fff4", // green text
  },
});

export default MyComponent;
