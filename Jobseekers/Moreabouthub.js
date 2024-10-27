import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';
import CustomAlert from '../components/CustomAlert'; 

function MyComponent({ onClose }) {
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();
  const [selectedHubData, setSelectedHubData] = useState(null); // State for storing hub data
  const [Sessionsheld, setSessionsheld] = useState('0');
  const [Sessionsmissed, setSessionsmissed] = useState('0');
  const [Confirmed, setSetConfirmed] = useState('No');
  const [attend, setattend] = useState('No');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const createHubAndJoinExpertHub = async () => {
    setIsPressed(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      // POST to create the hub
      const createHubResponse = await axios.post(`${apiUrl}/api/jobseeker/create-hub`, {
        category: selectedHubData.category,
        meeting_day: selectedHubData.created_at,
        from: selectedHubData.created_at,
        to: selectedHubData.created_at,
        coaching_hub_name: selectedHubData.coaching_hub_name,
        expert_name: selectedHubData.expert_name,
        coaching_hub_description: selectedHubData.coaching_hub_description,
        coaching_hub_fee: selectedHubData.coaching_hub_fee,
        attend: attend
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Alert messages based on status codes for create-hub API
      if (createHubResponse.status === 200 || createHubResponse.status === 201) {
        console.log('Hub successfully created');
        setAlertMessage('Hub joined successfully');

        // Proceed to the second API only if the first was successful
        const firstName = await AsyncStorage.getItem('first_name');
        const lastName = await AsyncStorage.getItem('last_name');
        const jobseekerId = await AsyncStorage.getItem('user_id');
        const jobseekerName = `${firstName} ${lastName}`;

        // POST to join the expert hub
        await axios.post(`${apiUrl}/api/jobseeker/join-expert-hub`, {
          jobseeker_name: jobseekerName,
          jobseeker_id: jobseekerId,
          expert_id: selectedHubData.user_id,
          hub_id: selectedHubData.id, 
          hub_sessions_held: Sessionsheld,
          hub_sessions_missed: Sessionsmissed,
          confirmed_attendance: Confirmed
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

      } else if (createHubResponse.status === 400) {
        const errorMessage = createHubResponse.data?.message || 'You have already joined this hub';
        console.warn(errorMessage);
        setAlertMessage(errorMessage);

      } else if (createHubResponse.status === 500) {
        console.error('Error creating hub:', createHubResponse.statusText);
        setAlertMessage('Error joining hub');
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Error:', errorMessage);
      setAlertMessage(errorMessage);
    }

    setAlertVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('selectedHubData');
        if (data) {
          setSelectedHubData(JSON.parse(data)); // Parse and set the retrieved data
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage: ", error);
      }
    };

    fetchData();
  }, []); // Fetch data on component mount

  const getWidthByLevel = (level) => {
    switch (level) {
      case "Beginner":
        return '33%'; // For Beginner
      case "Intermediate":
        return '66%'; // For Intermediate
      case "Advanced":
        return '100%'; // For Advanced
      default:
        return '0%'; // Default if level is not recognized
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);
    
    // Use toLocaleString to format the date
    return date.toLocaleString('en-GB', options).replace(',', ''); // Remove comma if needed
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
    onClose();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", marginTop: 40 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Close button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
            ✕
          </Text>
        </TouchableOpacity>

        <View style={styles.darkGreenBox}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              {/* Render the selected hub title */}
              {selectedHubData && (
                <>
                  <Text style={styles.sessionTitle}>{selectedHubData.coaching_hub_name}</Text>
                  <View style={styles.iconRow}>
                    <View style={styles.iconTextWrapper}>
                      <Icon name="calendar-outline" size={20} color="#FFF" style={styles.icon} />
                      <Text style={styles.iconText}>{t(`Created: ${formatDate(selectedHubData.created_at)}`)}</Text>
                    </View>
                    <View style={styles.iconTextWrapper}>
  <Icon name="folder-outline" size={20} color="#FFF" style={styles.icon} />
  <Text style={styles.iconText}>{selectedHubData.category}</Text>
</View>
                    <View style={styles.iconTextWrapper}>
                      <Icon name="globe-outline" size={20} color="#FFF" style={styles.icon} />
                      <Text style={styles.iconText}>{t("Online")}</Text>
                    </View>
                    <View style={styles.iconTextWrapper}>
                      <Icon name="time-outline" size={20} color="#FFF" style={styles.icon} />
                      <Text style={styles.iconText}>{t("1 hour")}</Text>
                    </View>
                  </View>
                  <Image
                    source={require('../assets/TG4.png')}
                    style={styles.sessionImage}
                  />
                </>
              )}
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 50 }}>
              <Text style={styles.overviewTitle}>{t("Overview")}</Text>
              {selectedHubData && (
                <>
                  <Text style={styles.overview}>{selectedHubData.coaching_hub_description}</Text>
                  <Text style={styles.learningObjectivesTitle}>{t("Learning Objectives")}</Text>
                  <Text style={styles.learningObjectives}>{selectedHubData.learning_obj}</Text>
                  <Text style={styles.learningObjectivesTitle}>{t("Specialization")}</Text>
                  <Text style={styles.learningObjectives}>{selectedHubData.specialization}</Text>
                  <View style={styles.experienceTitleWrapper}>
                    <Text style={styles.experienceTitle}>{t("For")}</Text>
                  </View>

                 <View style={styles.lineWrapper}>
    <View style={[styles.filledLine, { width: selectedHubData ? getWidthByLevel(selectedHubData.level) : '0%' }]} />
  </View>

  <View style={styles.experienceLevels}>
    <Text style={styles.experienceLevel}>{t("Beginners")}</Text>
    <Text style={styles.experienceLevel}>{t("Intermediates")}</Text>
    <Text style={styles.experienceLevel}>{t("Advanced")}</Text>
  </View>

                </>
              )}
               <TouchableOpacity
      style={{
        backgroundColor: isPressed ? 'coral' : '#206C00', // Change color based on isPressed
        borderRadius: 5,
        marginRight: 10,
        width: 120,
        marginTop: 20,
        padding: 5,
        justifyContent: 'center',
      }}
      onPress={createHubAndJoinExpertHub}
      activeOpacity={0.7}
    >
      <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>Join Hub</Text>
    </TouchableOpacity>
            </View>
           
          </View>
          
        </View>

        {/* Live session schedule section */}
        <View style={styles.whiteBox}>
          <Text style={styles.scheduleTitle}>{t("Live Session Schedule")}</Text>
          <View style={styles.scheduleRow}>
            <Text style={styles.description}>{t("Introducing interceptors in SAP Commerce Cloud")}</Text>
            <Text style={styles.time}>{t("Nov 28, 2024, 09:30 - 10:30 GMT+1")}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{t("Register")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scheduleRow}>
            <Text style={styles.description}>{t("Webinar: Interceptors in SAP Commerce Cloud")}</Text>
            <Text style={styles.time}>{t("Feb 6, 2025, 15:00 - 16:00 GMT")}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{t("Register")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scheduleRow}>
            <Text style={styles.description}>{t("Webinar: Interceptors in SAP Commerce Cloud")}</Text>
            <Text style={styles.time}>{t("Mar 18, 2025, 09:30 - 10:30 GMT+1")}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{t("Register")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomAlert
  visible={alertVisible}
  title={t("Alert")}
  message={alertMessage}
  onConfirm={hideAlert}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  darkGreenBox: {
    width: 1200,
    backgroundColor: '#013220',
    padding: 20,
  },
  topicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sessionImage: {
    width: 600,
    height: 300,
    marginTop: 20
  },
  detailsColumn: {
    flex: 1,
    paddingRight: 20,
  },
  sessionTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: "rgba(225,225,212,0.3)",
    padding: 10,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  iconText: {
    color: 'white',
    fontSize: 14,
    marginRight: 30
  },
  overviewTitle: {
    marginTop: 14,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  overview: {
    marginTop: 5,
    color: '#FFF',
    fontSize: 14,
    width: 500
  },
  learningObjectivesTitle: {
    marginTop: 14,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  learningObjectives: {
    marginTop: 5,
    color: '#FFF',
    fontSize: 14,
    width: 500
  },
  experienceTitle: {
    marginTop: 20,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  experienceLevels: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'space-between',
  },
  experienceLevel: {
    color: '#FFF',
    fontSize: 14,
  },
  experienceTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lineWrapper: {
    width: '100%', // Full width of the container
    height: 4,
    backgroundColor: '#CCC', // Light grey for the unfilled portion
    marginBottom: 10,
  },
  filledLine: {
    height: '100%',
    backgroundColor: '#206C00', // Dark green for the filled portion
  },
  rolesTitle: {
    marginTop: 20,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  role: {
    marginTop: 5,
    color: '#FFF',
    fontSize: 16,
  },
  scheduleButton: {
    marginTop: 20,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  whiteBox: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 20,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  description: {
    flex: 2,
    color: '#333',
  },
  time: {
    flex: 1,
    color: '#333',
  },
  button: {
    backgroundColor: 'coral',
    padding: 8,
    alignItems: 'center',
    borderRadius: 5,
    width: 120,
    marginBottom: 10
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
});

export default MyComponent;