import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "../components/DateTimePickerModal";
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';

function MyComponent({ onClose }) {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const [type, setType] = useState("Career Change");
  const [role, setRole] = useState("");
  const [challenge, setChallenge] = useState("");
  const [startingLevel, setStartingLevel] = useState("Beginner");
  const [targetLevel, setTargetLevel] = useState("Medior");
  const [status, setStatus] = useState("Active");
  const [token, setToken] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [expert_available_days, setExpertAvailableDays] = useState('Mon, Tue, Wed, and Thurs');
  const [expert_available_time, setExpertAvailableTime] = useState('2:00 pm -5:00 PM WAT');
  const [expert, setExpert] = useState('Joop Melcher');

  useEffect(() => {
    const getTokenAndUser = async () => {
      try {
        // Retrieve token and user data from AsyncStorage
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);

        const storedFirstName = await AsyncStorage.getItem('selectedUserFirstName');
        const storedLastName = await AsyncStorage.getItem('selectedUserLastName');

        if (storedFirstName && storedLastName) {
          setExpert(`${storedFirstName} ${storedLastName}`);
        } else {
          console.warn('No user data found');
        }
      } catch (error) {
        console.error('Error retrieving token or user:', error);
      }
    };

    getTokenAndUser();
  }, []);
  
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    getToken();
  }, []);

  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const goToPlan = async () => {
    try {
      // Validate the form data before making the API request
      if ( !role || !challenge || !targetLevel || !selectedDateTime) {
      setAlertMessage(t('Please fill all fields'));
        setAlertVisible(true);
        return;
      }

      // Prepare the data for the API request
      const formData = {
        type,
        role,
        description: challenge,
        starting_level: startingLevel,
        target_level: targetLevel,
        status,
        date_time: selectedDateTime,
        expert_available_days,
        expert_available_time,
        expert
      };

      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(
        'https://recruitangle.com/api/jobseeker/create-jobseeker-skill-analysis', 
        formData, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        await AsyncStorage.setItem('skillAnalysisFormData', JSON.stringify(formData));
        navigation.navigate('Advice Offer');
        onClose();
      } else {
        setAlertMessage('Failed to create skill analysis');
      }
    } catch (error) {
      console.error('Error during save:', error); // Log error for debugging
      setAlertMessage('Failed to create skill analysis');
    } finally {
      setAlertVisible(true);
    }
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if you want
  }

  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Create New Skill Analysis Session")}</Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Type")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={type}
                  style={styles.picker}
                  onValueChange={(itemValue) => setType(itemValue)}
                >
                  <Picker.Item label={t("Career Change")} value="Career Change" />
                  <Picker.Item label={t("Getting a raise")} value="Getting a raise" />
                  <Picker.Item label={t("Visibility at work")} value="Visibility at work" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Role")}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t("SAP FI")}
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={role}
                  onChangeText={setRole}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Describe the challenge you are seeking advice for in few words")}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t("I want to change from a data analyst to a SAP FI consultant")}
                  placeholderTextColor="grey"
                  multiline
                  style={[styles.input, { height: 100 }]}
                  value={challenge}
                  onChangeText={setChallenge}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Starting Level")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={startingLevel}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStartingLevel(itemValue)}
                >
                  <Picker.Item label={t("Beginner")} value="Beginner" />
                  <Picker.Item label={t("Junior")} value="Junior" />
                  <Picker.Item label={t("Medior")} value="Medior" />
                  <Picker.Item label={t("Senior")} value="Senior" />
                  <Picker.Item label={t("Professional")} value="Professional" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Target Level")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={targetLevel}
                  style={styles.picker}
                  onValueChange={(itemValue) => setTargetLevel(itemValue)}
                >
                  <Picker.Item label={t("Beginner")} value="Beginner" />
                  <Picker.Item label={t("Junior")} value="Junior" />
                  <Picker.Item label={t("Medior")} value="Medior" />
                  <Picker.Item label={t("Senior")} value="Senior" />
                  <Picker.Item label={t("Professional")} value="Professional" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Status")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={status}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStatus(itemValue)}
                >
                  <Picker.Item label={t("Active")} value="Active" />
                  <Picker.Item label={t("Review")} value="Review" />
                  <Picker.Item label={t("Replan")} value="Replan" />
                  <Picker.Item label={t("Completed")} value="Completed" />
                </Picker>
              </View>
            </View>
           
            </View>
          
            <Text style={{ fontSize: 15, color: 'black',  fontWeight: '500', marginTop: 30, marginBottom: -10, marginLeft: 50, }}>{t("Expert's available days and time")}</Text>
            <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Expert")}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>
                    {expert}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>{t("Days")}</Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>
                    {expert_available_days}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ fontFamily: "Roboto-Light" }}>Time</Text>
                </View>
                <View style={styles.cell}><Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>  {expert_available_time}
                  </Text>
                </View>
              </View>
            </View>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 30, marginBottom: -10, marginLeft: 50 }}>{t("Pick a date and time")}</Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Date and Time")}</Text>
              </View>
              <View style={styles.cell}>
                <TouchableOpacity
                  style={styles.dateTimeButton}
                  onPress={() => setIsModalVisible(true)}
                >
                  <Text style={{ fontFamily: "Roboto-Light" }}>
                    {selectedDateTime
                      ? selectedDateTime.toLocaleString()
                      : t("Select Date and Time")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
              <TouchableOpacity style={styles.buttonplus} onPress={goToPlan}>
                <Text style={styles.buttonTextplus}>{t("Save")}</Text>
              </TouchableOpacity>
            
          
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isModalVisible}
        mode="datetime"
        onConfirm={handleConfirmDateTime}
        onCancel={handleCancelModal}
      />
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
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70,
    marginTop: 20,
    marginLeft: 50,
  },
  greenBox: {
    width: 920,
    height: '100%',
    backgroundColor: '#F8F8F8',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1,
    color: 'grey',
    fontSize: 14,
  },
  buttonplus: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 5,
    marginLeft: 750,
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily: 'Roboto-Light',
  },
});

export default MyComponent;
