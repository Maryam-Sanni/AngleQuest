import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import OpenSchedule from '../components/RatingHub';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sessions, setSessions] = useState([]);
   const [selectedHubsession, setSelectedHubsession] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
        const response = await fetch(`${apiUrl}/api/jobseeker/get-hub-sessions`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in the Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSessions(data.HB); // Store the fetched sessions in the state
        } else {
          console.error('Failed to fetch sessions:', response.status);
          Alert.alert('Error', 'Failed to fetch sessions.');
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
        Alert.alert('Error', 'An error occurred while fetching sessions.');
      }
    };

    fetchData();
  }, []);

  const handleOpenPress = async (session) => {
    setSelectedHubsession(session);
    setModalVisible(true);

    try {
      await AsyncStorage.setItem('selectedhubsession', JSON.stringify(session));
      console.log('Selected hub saved:', session);
    } catch (error) {
      console.error('Failed to save selected hub to AsyncStorage', error);
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
        <Text style={styles.title}>{t("Hub Meetings")}</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Topic")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14  }}>{t("Description")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Date")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Time")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Presence")}</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>Rating</Text>
               </View>
            </TouchableOpacity>
          </View>

          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <View key={index} style={styles.row}>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{session.Topic}</Text>
                </View>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{session.Description}</Text>
                </View>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{session.meeting_date}</Text>
                </View>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{session.meeting_time}</Text>
                </View>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{session.rating}</Text>
                </View>
                <TouchableOpacity onPress={() => handleOpenPress(session)}>
                  <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.linkText}>{t("Rate")}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.row}>
              <Text style={styles.noDataText}>{t("No sessions available")}</Text>
            </View>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenSchedule session={selectedHubsession} onCancel={handleCloseModal} />
          </View>
        </Modal>
      </BlurView>
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
