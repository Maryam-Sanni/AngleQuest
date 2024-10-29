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
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Number of meetings to display per page
  const totalPages = Math.ceil(sessions.length / itemsPerPage);

  // Get the current meetings to display based on the page
  const displayedMeetings = sessions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${apiUrl}/api/expert/get-individual-meeting`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSessions(data.data); // Update to use 'data' array from API response
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
        <Text style={styles.title}>{t("Registered Meetings")}</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Topic")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Description")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Date")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Time")}</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.cell2}>
                <Text style={{color: 'white'}}>Join Meeting</Text>
              </View>
            </TouchableOpacity>
          </View>

          {sessions.length > 0 ? (
      displayedMeetings.map((session, index) => (
              <View key={index} style={styles.row}>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{session.meeting_topic}</Text>
                </View>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{session.description}</Text>
                </View>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{new Date(session.meeting_date).toLocaleDateString()}</Text>
                </View>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.cellText}>{new Date(session.meeting_date).toLocaleTimeString()}</Text>
                </View>
                <TouchableOpacity onPress={() => handleOpenPress(session)}>
                  <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                    <Text style={styles.linkText}>{t("Join Meeting")}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.row}>
              <Text style={styles.noDataText}>{t("No sessions available")}</Text>
            </View>
          )}
          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={goToPreviousPage} disabled={currentPage === 0}>
              <Text style={currentPage === 0 ? styles.disabledButton : styles.button}>{'<'}</Text>
            </TouchableOpacity>
            <Text>{`Page ${currentPage + 1} of ${totalPages}`}</Text>
            <TouchableOpacity onPress={goToNextPage} disabled={currentPage >= totalPages - 1}>
              <Text style={currentPage >= totalPages - 1 ? styles.disabledButton : styles.button}>{'>'}</Text>
            </TouchableOpacity>
          </View>
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
    marginLeft: 50,
    marginRight: 50
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
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
  linkText: {
    color: "#206C00",
    fontSize: 14,
    fontFamily: "Roboto-Light"
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50
  },
  button: {
    fontSize: 18,
    color: 'darkgreen',
  },
  disabledButton: {
    fontSize: 18,
    color: 'gray',
  },
});

export default ScheduledMeetingsTable;
