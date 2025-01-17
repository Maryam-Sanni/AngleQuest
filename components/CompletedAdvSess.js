import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OpenSchedule from '../Jobseekers/ViewSkillAnalysis';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import OpenSchedule2 from '../components/Rating';
import EmptyScheduleImage from '../assets/EmptySch.jpeg';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [skillanalysiss, setSkillanalysis] = useState([]);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOpenPress2 = async (analysis) => {
    setSelectedAnalysis(analysis);
    setModalVisible2(true);
    await AsyncStorage.setItem('selectedSkillAnalysis', JSON.stringify(analysis));
  };

  const handleCloseModal2 = () => setModalVisible2(false);
  const handleOpenPress = async (analysis) => {
    setSelectedAnalysis(analysis);
    setModalVisible(true);
    await AsyncStorage.setItem('selectedSkillAnalysis', JSON.stringify(analysis));
  };
  const handleCloseModal = () => setModalVisible(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('user_id');

      if (token && storedUserId) {
        const response = await fetch(`${apiUrl}/api/expert/skillAnalysis/getAllExpertsSkillAnalysisFeedbacks`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.status === 'success') {
          const filteredSkillAnalysis = data.skillAnalysis
            .filter(skillanalysis => skillanalysis.jobseeker_id === storedUserId)
            .sort((a, b) => new Date(b.date_time) - new Date(a.date_time));

          setSkillanalysis(filteredSkillAnalysis);
          await AsyncStorage.setItem('allSkillanalysis', JSON.stringify(filteredSkillAnalysis));
        }
      }
    } catch (error) {
      console.error('Failed to load form data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
  });
  const { t } = useTranslation();

  const displayedMeetings = showAll ? skillanalysiss : skillanalysiss.slice(0, 2);

      return (
        <View style={styles.greenBox}>
          {skillanalysiss.length === 0 ? (
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
              No Completed Meetings
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
              It seems no scheduled meeting has been completed. You can create new meetings anytime.
            </Text>

          </View>
          ) : (
            displayedMeetings.map((skillanalysis, index) => (
              <View style={styles.meetingContainer} key={index}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                  <View style={{ flexDirection: "column", width: "75%" }}>
                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                      <Text style={styles.meetingTime}>One-on-One Session . </Text>
                      <Text style={styles.meetingTime}>Online . </Text>
                      <Text style={styles.meetingTime}>{skillanalysis.role}</Text>
                    </View>
                    <Text style={styles.cellText}>{t('Expert')}: {skillanalysis.expert_name}</Text>
                    <Text style={styles.cellText}>{t('Type')}: {skillanalysis.types}</Text>
                    <Text style={styles.cellText}>
                      {t('Meeting Date')}: {new Date(skillanalysis.updated_at).toLocaleDateString()} {new Date(skillanalysis.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </Text>
                    <Text style={styles.completedLabel}>Completed</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'flex-end' }}>
                      <TouchableOpacity style={styles.joinButton2} onPress={() => handleOpenPress2(skillanalysis)}>
                        <Text style={styles.buttonText2}>{t('Rate')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.joinButton} onPress={() => handleOpenPress(skillanalysis)}>
                        <Text style={styles.buttonText}>{t('View')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
          {!showAll && skillanalysiss.length > 2 && (
            <TouchableOpacity style={styles.viewAllButton} onPress={() => setShowAll(true)}>
              <Text style={styles.buttonText2}>{t('View All')}</Text>
            </TouchableOpacity>
          )}

          


        <Modal animationType="slide" transparent={true} visible={modalVisible2} onRequestClose={handleCloseModal2}>
          <View style={styles.modalContent}>
            <OpenSchedule2 analysis={selectedAnalysis} onCancel={handleCloseModal2} />
          </View>
        </Modal>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
          <View style={styles.modalContent}>
            <OpenSchedule analysis={selectedAnalysis} onClose={handleCloseModal} />
          </View>
        </Modal>

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
  },
  greenBox: {
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
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
    marginHorizontal: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
