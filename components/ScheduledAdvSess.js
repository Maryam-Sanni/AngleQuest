import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
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

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('https://recruitangle.com/api/jobseeker/get-jobseeker-skill-analysis', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const data = response.data.skillAnalysis || [];
          setSkillAnalysisData(data);

          // Save all the skill analysis data to AsyncStorage
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

    loadFormData();
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
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Role")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Type")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Starting Level")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Target Level")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Date")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Time")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}> </Text>
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
                  <Text style={styles.cellText}>{analysis.role}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{analysis.type}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{analysis.starting_level}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{analysis.target_level}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{date}</Text>
                </View>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{time}</Text>
                </View>
                <TouchableOpacity onPress={() => handleOpenPress(analysis)}>
                   <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.open}>{t("Open")}</Text>
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
    textAlign: 'left', // Align text to the left
  },
  table: {
    flex: 1,
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 30,
    alignContent: 'center',
    justifyContent: 'flex-start', // Adjust to start alignment
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
    justifyContent: 'center', // Center vertically
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center', // Center vertically
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'left', // Align text to the left
    fontFamily: "Roboto-Light",
  },
  headerText: {
    fontWeight: '600',
    fontFamily: "Roboto-Light",
    textAlign: 'left', // Align header text to the left
    paddingVertical: 10, // Adjust vertical padding if needed
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25,
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
  open: {
    color: "black",
    fontSize: 14,
    borderColor: "#63EC55",
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontFamily: "Roboto-Light",
  },
});

export default ScheduledMeetingsTable;
