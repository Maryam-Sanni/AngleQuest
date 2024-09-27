import React, { useState, useEffect, useRef} from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Linking, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import GrowthPlantype from '../components/growthplantype';
import Scheduledgrowth from '../components/Scheduledgrowth';
import GrowthPlanreview from '../components/gpexpertreview';
import OpenModal from '../Jobseekers/Pickyourcoach';
import { useNavigate } from 'react-router-dom';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function MyComponent() { 
  const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
   const [meetingData, setMeetingData] = useState({ date: '', time: '' })
  const [lastCandidateLink, setLastCandidateLink] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/jobseeker/get-jobseeker-growthplan-datetime`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const { GrowthPlanDT } = response.data;
          if (GrowthPlanDT && GrowthPlanDT.length > 0) {
            const meeting = GrowthPlanDT[0];
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
  
    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

  useEffect(() => {
    const fetchLastCreatedMeeting = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
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
  
    const [fontsLoaded]=useFonts({
      "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })
      
        const { t } = useTranslation()
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
            <TouchableOpacity>
              <View style={styles.item}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/dea8538a41a4085f905f7513c46d36613c28b4ada84630149918f4444ac5ecde?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                  style={styles.image}
                />
                <Text style={{color: '#666', fontWeight: '600', marginLeft: 10, fontSize: 14, marginTop: 5 }}>{t("Growth Plan")}</Text>
              </View>
            </TouchableOpacity>
            </View>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>+ {t("New")}</Text>
                  </View>
     </TouchableOpacity>

                        <TouchableOpacity >
                          <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 10, borderWidth: 1 }}>
                                          <Text style={{ fontSize: 14, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Expert Roadmap")}</Text>
                                        </View>
                           </TouchableOpacity>
                      </View>
     <View style={styles.container}>
      <View style={styles.box}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 14, color: "black", fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Next growth plan session")}</Text>
    <Text style={{ fontSize: 13, color: "grey", marginTop: 10,fontFamily:"Roboto-Light"}}>{meetingData.date}</Text>
    <Text style={{ fontSize: 13, color: "grey", marginTop: 5, fontWeight: '500',fontFamily:"Roboto-Light"}}>{meetingData.time}</Text>
    <TouchableOpacity style={{  backgroundColor: 'none', padding: 8, paddingHorizontal: 10, marginTop: 10, borderRadius: 5, marginLeft: 10, marginRight: 10, borderWidth: 2, borderColor: '#206C00'}} onPress={handlejoinPress}>
          <Text style={{ color: '#206C00', textAlign: 'center', fontSize: 13, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Join Now")}</Text>
          </TouchableOpacity>
          </View>
           </View>

      <View style={styles.box}>
        <Text style = {{fontSize: 14, color: 'black', fontWeight: 'bold', marginTop: 5, marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Personal Development")}</Text>
        <View style={{flexDirection: 'row'}}>
           <Text style = {{fontSize: 18, fontWeight: 'bold', marginTop: 5, color: '#206C00',fontFamily:"Roboto-Light" }}>1</Text>
           <Text style = {{fontSize: 12, marginTop: 10, marginLeft: 10,fontFamily:"Roboto-Light" }}>{t("Active")}</Text>
           <Image source={require('../assets/person.png')} style={styles.boximage}  />
     </View>
     <Text style = {{fontSize: 12, fontWeight: '500', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("0 completed in the past")}</Text>
    
      </View>
     
      <View style={styles.box}> 
      <Text style = {{fontSize: 14, color: 'black', fontWeight: 'bold', marginTop: 5, marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Team Development")}</Text>
        <View style={{flexDirection: 'row'}}>
           <Text style = {{fontSize: 18, fontWeight: 'bold', marginTop: 5, color: '#206C00',fontFamily:"Roboto-Light" }}>0</Text>
           <Text style = {{fontSize: 12, marginTop: 10, marginLeft: 10,fontFamily:"Roboto-Light" }}>{t("Completed")}</Text>
           <Image source={require('../assets/teamicon.jpg')} style={styles.boximage}  />
     </View>
      </View>
      
      <View style={styles.box}>
      <Text style = {{fontSize: 14, color: 'black', fontWeight: 'bold', marginTop: 5, marginBottom: 10,fontFamily:"Roboto-Light", textAlign: 'center'}}>{t("Organizational Development")}</Text>
        <View style={{flexDirection: 'row'}}>
           <Text style = {{fontSize: 18, fontWeight: 'bold', marginTop: 5, color: '#206C00',fontFamily:"Roboto-Light" }}>0</Text>
           <Text style = {{fontSize: 12, marginTop: 10, marginLeft: 10,fontFamily:"Roboto-Light" }}>Completed</Text>
           <Image source={require('../assets/organization.png')} style={styles.boximage}  />
     </View>
     <Text style = {{fontSize: 12, fontWeight: '500', marginTop: 10, color: 'coral',fontFamily:"Roboto-Light" }}>{t("1 replan available")}</Text>
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
                       
                        <GrowthPlantype />
                      <Scheduledgrowth />
                        <GrowthPlanreview />
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
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(225,225,212,0.3)',
        backgroundColor: '#f7fff4',
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
});

export default MyComponent;
