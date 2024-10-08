import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking } from 'react-native';
import OpenSchedule from '../Jobseekers/OpenSkillAnalysis';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [skillAnalysisData, setSkillAnalysisData] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

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

            // Filter out entries where completed is "Yes"
            data = data.filter(item => item.completed !== "Yes");

            setSkillAnalysisData(data);
          try {
            await AsyncStorage.setItem('allSkillAnalysisData', JSON.stringify(data));
            console.log('All data saved:', data);
          } catch (error) {
            console.error('Failed to save all data to AsyncStorage', error);
          }
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    // Initial data load
    loadFormData();

    // Set up polling
    const intervalId = setInterval(loadFormData, 5000); // Poll every 30 seconds

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, []);


  const handleOpenPress = async (analysis) => {
    setSelectedAnalysis(analysis);
    setModalVisible(true);

    try {
      await AsyncStorage.setItem('selectedSkillAnalysis', JSON.stringify(analysis));
      console.log('Selected analysis saved:', analysis);
    } catch (error) {
      console.error('Failed to save selected analysis to AsyncStorage', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>{t("Scheduled Skill Analysis Sessions")}</Text>
        <View style={styles.table}>
          <View style={styles.row}>
             <View style={{flexDirection: 'row', width: "100%"}}>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Expert")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Role")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Starting level")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Meeting Date")}</Text>
            </View>
               <TouchableOpacity>
                 <View style={styles.cell2}>
                 <Text style={{color: 'white'}}>Update</Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity>
                 <View style={styles.cell2}>
                 <Text style={{color: 'white'}}>Join Meeting</Text>
                  </View>
               </TouchableOpacity>
          </View>
          </View>

          {skillAnalysisData.map((analysis, index) => {
            const dateTime = new Date(analysis.date_time);
            const date = dateTime.toLocaleDateString();
            const time = dateTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

      
            return (
              <View key={index} style={styles.row}>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{analysis.expert_name}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{analysis.role}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{analysis.starting_level}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{new Date(analysis.date_time).toLocaleDateString()} {new Date(analysis.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                </View>
                <TouchableOpacity onPress={() => handleOpenPress(analysis)}>
                   <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.linkText}>{t("Update")}</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const meetingLink = analysis.candidate_link || 'https://anglequest.com';
                    if (meetingLink) {
                      Linking.openURL(meetingLink)
                        .catch(err => console.error("Couldn't load page", err)); // Handle potential errors
                    } else {
                      console.warn('No valid link available');
                    }
                  }}
                >
                  <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                    <Text style={styles.linkText}>{t("Join Meeting")}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenSchedule analysis={selectedAnalysis} onClose={handleCloseModal} />
          </View>
        </Modal>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    marginTop: 30,
    marginLeft: 50,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    flex: 1,
    marginRight: 200,
    marginTop: 20,
    marginBottom: 30,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
  greenBox: {
    width: "90%",
    marginBottom: 20,
    marginLeft: 50,
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 30,
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
    backgroundColor: 'none',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
    backgroundColor: 'white', 
    padding: 10,
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
    fontFamily: "Roboto-Light"
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
  linkText: {
    color: "#206C00",
    fontSize: 14,
    fontFamily: "Roboto-Light"
  }
});

export default ScheduledMeetingsTable;
