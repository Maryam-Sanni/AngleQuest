import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Linking, ScrollView } from 'react-native';
import OpenSchedule from '../Jobseekers/OpenGrowth';
import OpenSchedule2 from '../Jobseekers/OpenGrowth';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyScheduleImage from '../assets/EmptySch.jpeg';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGrowthPlan, setSelectedGrowthPlan] = useState(null);
  const [growthPlans, setGrowthPlans] = useState([]);
  const [showAll, setShowAll] = useState(false); // State to control "View All"

  const apiUrl = process.env.REACT_APP_API_URL;

  const loadFormData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.get(`${apiUrl}/api/jobseeker/get-jobseeker-growthplan`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        let data = response.data.growthPlan || [];

         data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
        
        setGrowthPlans(data);

        // Save all growth plans to AsyncStorage
        try {
          await AsyncStorage.setItem('allGrowthPlans', JSON.stringify(data));
          console.log('All growth plans saved:', data);
        } catch (error) {
          console.error('Failed to save all growth plans to AsyncStorage', error);
        }
      } else {
        console.error('Failed to fetch data:', response.status, response.data);
      }
    } catch (error) {
      console.error('Failed to load form data', error);
    }
  };  

  // Function to format date_time string
  const formatDateTime = (dateTimeString) => {
  let date, time;

  // Check if the string contains a '|', indicating a non-standard format
  if (dateTimeString.includes('|')) {
    // Split the input string into date and time
    const [datePart, timePart] = dateTimeString.split(' | ');

    // Create a new Date object from the date part
    date = new Date(datePart);
    time = timePart.trim(); // Clean up any extra spaces
  } else {
    // If it's a proper format, parse directly
    date = new Date(dateTimeString);
    time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  // Format the date to DD/MM/YYYY
  const formattedDate = `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;

  // Ensure the time is in the desired format (lowercase)
  const formattedTime = time.toLowerCase(); // Convert to lowercase

  return `${formattedDate} ${formattedTime}`; // Return the full formatted string
  };


  useEffect(() => {
    loadFormData(); // Initial data load

    // Set up polling
    const intervalId = setInterval(loadFormData, 5000); // Poll every 5 seconds

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, []);


  const handleOpenPress = async (growthPlan) => {
    setSelectedGrowthPlan(growthPlan);
    setModalVisible(true);
    await AsyncStorage.setItem('selectedGrowthPlan', JSON.stringify(growthPlan));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedGrowthPlan(null);
  };

  
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();

  // Only display two items initially, or all if "View All" is clicked
  const displayedMeetings = showAll ? growthPlans : growthPlans.slice(0, 2);

  return (
    <ScrollView style={styles.container}>
          {growthPlans.length === 0 ? (
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
            It seems there are no upcoming meetings right now. You can create a new growth plan session anytime.
          </Text>

      </View>
          ) : (
            <>
              {displayedMeetings.map((growthPlan, index) => (
                <View key={index} style={styles.meetingContainer}>
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
                        <Text style={styles.meetingTime}>{growthPlan.starting_level} - {growthPlan.target_level}</Text>
                      </View>
                      <Text style={styles.cellText}><Text style={styles.headerText}>{t("Expert")}: </Text>{growthPlan.coach}</Text>
                      <Text style={styles.cellText}><Text style={styles.headerText}>{t("Goal")}: </Text>{growthPlan.title}</Text>
                      <Text style={styles.cellText}><Text style={styles.headerText}>{t("Meeting Date")}: </Text>{formatDateTime(growthPlan.date_time)}</Text>
                      <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'flex-end' }}>
                        <TouchableOpacity onPress={() => handleOpenPress(growthPlan)} style={styles.joinButton2}>
                          <Text style={styles.buttonText2}>{t("Update")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            const joinLink = growthPlan.candidate_link || 'https://default-join-link.com';
                            if (joinLink) {
                              Linking.openURL(joinLink).catch(err => console.error("Couldn't load page", err));
                            } else {
                              console.warn('No valid link available');
                            }
                          }}
                          style={styles.joinButton}
                        >
                          <Text style={styles.buttonText}>{t("Join Meeting")}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              {!showAll && growthPlans.length > 2 && (
                <TouchableOpacity onPress={() => setShowAll(true)} style={styles.viewAllButton}>
                  <Text style={styles.buttonText2}>{t("View All")}</Text>
                </TouchableOpacity>
              )}
            </>
          )}

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
        <View style={styles.modalContent}>
          <OpenSchedule growthPlan={selectedGrowthPlan} onClose={handleCloseModal} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 30,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
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
