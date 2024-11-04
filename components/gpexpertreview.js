import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import OpenSchedule from '../Jobseekers/ViewExpertreview';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OpenSchedule2 from '../components/Rating Growth';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [growthPlans, setGrowthPlans] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedGrowthPlan, setSelectedGrowthPlan] = useState(null);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const itemsToShowInitially = 2;

  const { t } = useTranslation();
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  const handleOpenPress2 = async (growthPlan) => {
    setSelectedGrowthPlan(growthPlan);
    setModalVisible2(true);
    await AsyncStorage.setItem('selectedGrowthPlan', JSON.stringify(growthPlan));
  };
  
  const handleCloseModal2 = () => setModalVisible2(false);

  const handleOpenPress = async (growthPlan) => {
    setSelectedGrowthPlan(growthPlan);
    setModalVisible(true);
    await AsyncStorage.setItem('selectedGrowthPlan', JSON.stringify(growthPlan));
  };

  const handleCloseModal = () => setModalVisible(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('user_id');
      if (token && storedUserId) {
        setUserId(storedUserId);

        const response = await fetch(`${apiUrl}/api/expert/growthplan/getAllExpertsGrowthPlanFeedbacks`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.status === 'success') {
          const filteredGrowthPlans = data.allGrowthPlan.filter(plan => plan.jobseeker_id === storedUserId);
          setGrowthPlans(filteredGrowthPlans);
          await AsyncStorage.setItem('Growthplanfeedback', JSON.stringify(filteredGrowthPlans));
        }
      }
    } catch (error) {
      console.error('Failed to load form data', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const displayedGrowthPlans = showAll ? growthPlans : growthPlans.slice(0, itemsToShowInitially);

  return (
          <View style={styles.container}>
            {growthPlans.length === 0 ? (
            <View
              style={{
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=678&format=png&color=D3D3D3",
                }}
                style={{
                  width: 50,
                  height: 50,
                  marginLeft: 150,
                }}
              />
              <Text style={styles.noMeetings}>No scheduled meeting has been completed</Text>
            </View>
           
            ) : (
              <>
                {displayedGrowthPlans.map((plan, index) => (
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
                          <Text style={styles.meetingTime}>Completed</Text>
                        </View>
                        <Text style={styles.cellText}>{t("Expert")}: {plan.coach}</Text>
                        <Text style={styles.cellText}>{t("Title")}: {plan.title}</Text>
                        <Text style={styles.cellText}>{t("Role")}: {plan.role}</Text>
                        <Text style={styles.cellText}>{t("Completed")}: {new Date(plan.updated_at).toLocaleString()}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'flex-end' }}>
                          <TouchableOpacity onPress={() => handleOpenPress2(plan)} style={styles.joinButton2}>
                            <Text style={styles.buttonText2}>{t("Rate")}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleOpenPress(plan)} style={styles.joinButton}>
                            <Text style={styles.buttonText}>{t("View")}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}

            {!showAll && growthPlans.length > itemsToShowInitially && (
              <TouchableOpacity onPress={() => setShowAll(true)} style={styles.viewAllButton}>
                <Text style={styles.buttonText2}>{t("View All")}</Text>
              </TouchableOpacity>
            )}

        <Modal animationType="slide" transparent={true} visible={modalVisible2} onRequestClose={handleCloseModal2}>
          <View style={styles.modalContent}>
            <OpenSchedule2 growthPlan={selectedGrowthPlan} onCancel={handleCloseModal2} />
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
          <View style={styles.modalContent}>
            <OpenSchedule growthPlan={selectedGrowthPlan} onClose={handleCloseModal} />
          </View>
        </Modal>
    </View>
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
