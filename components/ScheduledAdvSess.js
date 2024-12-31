import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Linking, ScrollView } from 'react-native';
import OpenSchedule from '../Jobseekers/OpenSkillAnalysis';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyScheduleImage from '../assets/EmptySch.jpeg';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [skillAnalysisData, setSkillAnalysisData] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Scheduled");
  const [showAllMeetings, setShowAllMeetings] = useState(false);

  const displayedMeetings = showAllMeetings ? skillAnalysisData : skillAnalysisData.slice(0, 2);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/jobseeker/get-jobseeker-skill-analysis`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          let data = response.data.skillAnalysis || [];
          data = data.filter(item => item.completed !== "Yes");
          data.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

          // Filter for scheduled meetings (those that haven't expired yet)
          const now = new Date();
          data = data.filter(item => new Date(item.date_time) > now); // Keep only scheduled meetings
          setSkillAnalysisData(data);
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
    const intervalId = setInterval(loadFormData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleOpenPress = async (analysis) => {
    setSelectedAnalysis(analysis);
    setModalVisible(true);
    try {
      await AsyncStorage.setItem('selectedSkillAnalysis', JSON.stringify(analysis));
    } catch (error) {
      console.error('Failed to save selected analysis to AsyncStorage', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const toggleShowAllMeetings = () => {
    setShowAllMeetings(!showAllMeetings);
  };
  
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
       

        <ScrollView>
          {displayedMeetings.length === 0 ? (
       <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: 'white'
          }}
        >
          {/* Empty Schedule Image */}
          <Image
            source={EmptyScheduleImage}
            style={{
              width: 200,
              height: 200,
              marginBottom: 20,
            }}
          />
      
          {/* Title */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 10,
            }}
          >
            No New Meetings Scheduled
          </Text>
      
          {/* Explanation */}
          <Text
            style={{
              fontSize: 16,
              color: '#777',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            It seems there are no upcoming meetings right now. You can create new ones anytime.
          </Text>
      
          {/* Create New Button */}
          <TouchableOpacity
            style={{
              backgroundColor: 'green', // Similar to Microsoft DevOps button color
              paddingVertical: 12,
              paddingHorizontal: 30,
              borderRadius: 5,
            }}
            onPress={() => {
              // Action for Create New button (like navigating to a new screen or opening a form)
              console.log('Create New clicked!');
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Create New
            </Text>
          </TouchableOpacity>
        </View>
          ) : (
       displayedMeetings.map((analysis, index) => (
            <View key={index} style={styles.meetingContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=42287&format=png&color=000000",
                  }}
                  style={{
                    width: 150,
                    height: 150,
                    marginTop: 30,
                    marginBottom: 30,
                    marginLeft: 50,
                  }}
                />
                <View
                  style={{ flexDirection: "column", width: "75%" }}
                >
                  <View style={{ flexDirection: "row", marginBottom: 20 }}>
                    <Text style={styles.meetingTime}>
                      One-on-One Session .{" "}
                    </Text>
                    <Text style={styles.meetingTime}>Online . </Text>
                    <Text style={styles.meetingTime}>{analysis.starting_level} - {analysis.target_level}</Text>
                  </View>
              <Text style={styles.cellText}><Text style={styles.label}>{t("Expert")}: </Text>{analysis.expert_name}</Text>
              <Text style={styles.cellText}><Text style={styles.label}>{t("Type")}: </Text>{analysis.type}</Text>
                  
              <Text style={styles.cellText}>
                <Text style={styles.label}>{t("Meeting Date")}: </Text>
                {new Date(analysis.date_time).toLocaleDateString()} {new Date(analysis.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
              </Text>
                  <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                    {(() => {
                      const now = new Date();
                      const meetingTime = new Date(analysis.date_time);
                      const oneHourAfter = new Date(meetingTime.getTime() + 60 * 60 * 1000); // 1 hour after meeting time

                      if (now >= meetingTime && now <= oneHourAfter) {
                        // Show "Now" if within one-hour window
                        return (
                          <Text style={{ backgroundColor: 'lightgreen', padding: 3, borderRadius: 5, color: 'green', width: 80, textAlign: 'center', marginTop: 5 }}>
                            Now
                          </Text>
                        );
                      } else if (now < meetingTime) {
                        // Show "Scheduled" if before meeting time
                        return (
                          <Text style={{ backgroundColor: '#ADD8E6', padding: 3, borderRadius: 5, color: 'blue', width: 80, textAlign: 'center', marginTop: 5 }}>
                            Scheduled
                          </Text>
                        );
                      } else {
                        // Show "Expired" if beyond one hour after meeting time
                        return (
                          <Text style={{ backgroundColor: '#FFDAB9', padding: 3, borderRadius: 5, color: 'brown', width: 80, textAlign: 'center', marginTop: 5 }}>
                            Expired
                          </Text>
                        );
                      }
                    })()}
                  </View>
              <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'flex-end' }}>
                <TouchableOpacity style={styles.joinButton2} onPress={() => handleOpenPress(analysis)}>
                  <Text style={styles.buttonText2}>{t("Update")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.joinButton}
                  onPress={() => {
                    const meetingLink = analysis.candidate_link || 'https://anglequest.com';
                    Linking.openURL(meetingLink)
                      .catch(err => console.error("Couldn't load page", err));
                  }}
                >
                  <Text style={styles.buttonText}>{t("Join Meeting")}</Text>
                </TouchableOpacity>
              </View>
                </View>
              </View>
            </View>
           ))
           )}

          {skillAnalysisData.length > 2 && (
            <TouchableOpacity style={styles.viewAllButton} onPress={toggleShowAllMeetings}>
              <Text style={styles.buttonText2}>{showAllMeetings ? "Show Less" : "View All"}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
          <View style={styles.modalContent}>
            <OpenSchedule analysis={selectedAnalysis} onClose={handleCloseModal} />
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  untitle: {
    color: "darkgrey",
    fontWeight: 'bold',
    fontSize: 15,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
  },
  meetingContainer: {
    marginBottom: 20,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cellText: {
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: "#206C00",
    fontSize: 14,
    fontFamily: "Roboto-Light",
    padding: 5,
  }, 
  viewAllButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    width: 100,
    alignSelf: "center",
    borderColor: "darkgreen",
    borderWidth: 1,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  joinButton: {
    backgroundColor: "#206C00",
    padding: 10,
    borderRadius: 5,
    width: 120,
  },
  joinButton2: {
    borderColor: "#206C00",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 120,
    marginRight: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText2: {
    color: "#206C00",
    fontWeight: "bold",
    textAlign: "center",
  },
  noMeetings: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
  },
});

export default ScheduledMeetingsTable;
