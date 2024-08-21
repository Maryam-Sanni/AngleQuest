import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import OpenSchedule from '../Jobseekers/ViewExpertreview';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [growthPlans, setGrowthPlans] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedGrowthPlan, setSelectedGrowthPlan] = useState(null);

  const handleOpenPress = async (growthPlan) => {
    setSelectedGrowthPlan(growthPlan);
    setModalVisible(true);

    // Create a simplified version of the growthPlan object
    const simplifiedGrowthPlan = {
      title: growthPlan.title,
      role: growthPlan.role,
      date: growthPlan.date,
      performance_rating: growthPlan.performance_rating,
      coach: growthPlan.coach,
    };

    try {
      // Save the simplified object to AsyncStorage
      await AsyncStorage.setItem('selectedGrowthPlan', JSON.stringify(simplifiedGrowthPlan));
      console.log('Selected growth plan saved:', simplifiedGrowthPlan);
    } catch (error) {
      console.error('Failed to save selected growth plan to AsyncStorage', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedGrowthPlan(null);
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  useEffect(() => {
      const fetchData = async () => {
          try {
              const token = await AsyncStorage.getItem('token'); // Retrieve the token from AsyncStorage
              const storedUserId = await AsyncStorage.getItem('user_id'); // Retrieve user_id from AsyncStorage

              if (token && storedUserId) {
                  setUserId(storedUserId); // Store user_id in state

                  const response = await fetch('https://recruitangle.com/api/expert/growthplan/getAllExpertsGrowthPlanFeedbacks', {
                      method: 'GET',
                      headers: {
                          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                      },
                  });

                  const data = await response.json();
                  if (data.status === 'success') {
                      // Filter the growth plans based on matching user_id and jobseeker_id
                      const filteredGrowthPlans = data.allGrowthPlan.filter(plan => plan.jobseeker_id === storedUserId);
                      setGrowthPlans(filteredGrowthPlans); // Store the filtered data in state

                      try {
                          await AsyncStorage.setItem('Growthplanfeedback', JSON.stringify(filteredGrowthPlans)); // Save the filtered growth plans to AsyncStorage
                          console.log('Filtered growth plans saved:', filteredGrowthPlans);
                      } catch (error) {
                          console.error('Failed to save filtered growth plans to AsyncStorage', error);
                      }
                  } else {
                      console.error('Failed to fetch data', response);
                  }
              } else {
                  console.error('Token or user ID is missing');
              }
          } catch (error) {
              console.error('Failed to load form data', error);
          }
      };

      fetchData();
  }, []);



  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>{t("Growth Plan Expert Review")}</Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Title")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Role")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Date")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Performance Rating")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Coach")}</Text>
            </View>
            <TouchableOpacity style={styles.cell2}>
              <Text style={styles.cellText}> </Text>
            </TouchableOpacity>
          </View>

          {growthPlans.map((plan, index) => (
            <View key={index} style={styles.row}>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{plan.title}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{plan.role}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{plan.date}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{plan.performance_rating}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{plan.coach}</Text>
              </View>
              <TouchableOpacity onPress={handleOpenPress}>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.open}>{t("View")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
             <OpenSchedule growthPlan={selectedGrowthPlan} onClose={handleCloseModal} />
          </View>
        </Modal>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    marginRight: 200,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
  open: {
    color: "black",
    fontSize: 14,
    borderColor: "#63EC55",
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5
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
    textAlign: 'flex-start',
    fontFamily: "Roboto-Light"
  },
  greenBox: {
    flex: 1,
    width: "90%",
    height: 250,
    marginBottom: 20,
    marginLeft: 50,
    marginTop: 50,
    backgroundColor: 'rgba(225,225,212,0.3)',
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
});

export default ScheduledMeetingsTable;
