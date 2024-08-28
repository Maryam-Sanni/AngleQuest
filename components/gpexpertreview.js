import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
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

  const handleOpenPress2 = async (growthPlan) => {
    setSelectedGrowthPlan(growthPlan);
    setModalVisible2(true);

    try {
      await AsyncStorage.setItem('selectedGrowthPlan', JSON.stringify(growthPlan));
      console.log('Selected growth plan saved:', growthPlan);
    } catch (error) {
      console.error('Failed to save selected growth plan to AsyncStorage', error);
    }
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };

  const handleOpenPress = async (growthPlan) => {
    setSelectedGrowthPlan(growthPlan);
    setModalVisible(true);

    try {
      await AsyncStorage.setItem('selectedGrowthPlan', JSON.stringify(growthPlan));
      console.log('Selected growth plan saved:', growthPlan);
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

  useEffect(() => {
    fetchData(); // Initial data load

    const intervalId = setInterval(fetchData, 5000); // Polling every 5 seconds

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts
  }, []);



  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>{t("Completed Growth Plans")}</Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell2}><Text style={styles.headerText }>{t("Expert")}</Text></View>
            <View style={styles.cell2}><Text style={styles.headerText}>{t("Title")}</Text></View>
            <View style={styles.cell2}><Text style={styles.headerText}>{t("Role")}</Text></View>
            <View style={styles.cell2}><Text style={styles.headerText}>{t("Completed")}</Text></View>
            <View style={styles.cell2}><Text style={styles.headerText}>{t("Performance")}</Text></View>
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>Rate</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>View</Text>
               </View>
            </TouchableOpacity>
          </View>

          {growthPlans.map((plan, index) => (
            <View key={index} style={styles.row}>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{plan.coach}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{plan.title}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{plan.role}</Text>
              </View>
               <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{new Date(plan.updated_at).toLocaleDateString()} {new Date(plan.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{plan.performance_rating}</Text>
              </View>
               <TouchableOpacity onPress={() => handleOpenPress2 (plan)}>
                 <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.linkText}>{t('Rate')}</Text>
                 </View>
              </TouchableOpacity>
               <TouchableOpacity onPress={() => handleOpenPress (plan)}>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.linkText}>{t("View")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={handleCloseModal2}
        >
          <View style={styles.modalContent}>
             <OpenSchedule2 growthPlan={selectedGrowthPlan} onCancel={handleCloseModal2} />
            </View>
          </Modal>
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