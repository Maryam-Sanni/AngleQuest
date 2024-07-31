import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, TextInput, ScrollView } from 'react-native';
import DateTimePickerModal from "../components/DateTimeCoach";
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [isDateTimeModalVisible, setIsDateTimeModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')     
  const [isVisible, setIsVisible] = useState(true);

  const handleConfirmDateTime = (date, time) => {
    setSelectedDateTime(date);
    setSelectedTime(time);
    setIsDateTimeModalVisible(false);
  };

  const handleCancelDateTimeModal = () => {
    setIsDateTimeModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 
      if (!token) {
        alert('No token found');
        return;
      }
  
      const formData = {
        meeting_topic: topic,
        meeting_description: description,
        date: selectedDateTime,
        time: selectedTime,
      };
  
      const response = await axios.post('https://recruitangle.com/api/expert/newhubmeeting/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response:', response); // Log the response
      if (response.status === 201) {
        setAlertMessage(t('Meeting created successfully'));
      } else {
        setAlertMessage(t('Failed to create Meeting'));
      }
    } catch (error) {
      console.error('Error during save:', error); // Log error for debugging
      if (error.response) {
        console.error('Response error data:', error.response.data); // Log server response error
      }
      setAlertMessage(t('Failed to create Meeting'));
    }
    setAlertVisible(true);
  };
  
  const hideAlert = () => {
    setAlertVisible(false);
    // Ensure this does not inadvertently close the page
    setIsVisible(false);
    onClose(); // Ensure this is not closing the page prematurely
  };

  
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf")
  });
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
      <View style={styles.greenBox}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Schedule Next Hub Meeting")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <Text style={{ fontSize: 16, marginLeft: 50, marginTop: 10, fontWeight: '600', fontFamily: "Roboto-Light" }}>
              {t("Schedule the next hub meeting with SAP FI Hub")}
            </Text>
            <Text style={{ fontSize: 14, marginLeft: 50, marginTop: 5, marginBottom: 10, fontFamily: "Roboto-Light" }}>
              {t("Always remember to reference the note from the hub member employers on their preferred area of concentration for your hub memebers. This should often guide the topics, ideas, tips and tricks that you share.")}
            </Text>

            <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
              {t("Topic")}
            </Text>
            <TextInput
              placeholder=" "
              value={topic}
              onChangeText={(text) => setTopic(text)}
              style={styles.input}
            />

            <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
              {t("Description")}
            </Text>
            <TextInput
              placeholder=" "
              value={description}
              onChangeText={(text) => setDescription(text)}
              style={[styles.input, { height: 100 }]}
              multiline
            />

            <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
              {t("Date")}
            </Text>
            <TouchableOpacity onPress={() => setIsDateTimeModalVisible(true)}>
              <Text style={styles.input}><Text style={{ fontWeight: '500' }}>Date: </Text>{selectedDateTime}</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 10, marginBottom: 10, fontFamily: "Roboto-Light" }}>
              {t("Time")}
            </Text>
            <Text style={styles.input}><Text style={{ fontWeight: '500', fontFamily: "Roboto-Light" }}>Time: </Text> {selectedTime}</Text>
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonplus}>
            <Text style={styles.buttonTextplus}>{t("Schedule")}</Text>
          </TouchableOpacity>
        </ScrollView>

        <DateTimePickerModal
          isVisible={isDateTimeModalVisible}
          onConfirm={handleConfirmDateTime}
          onCancel={handleCancelDateTimeModal}
        />
        <CustomAlert
  visible={alertVisible}
  title={t("Alert")}
  message={alertMessage}
  onConfirm={hideAlert}
/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 100,
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 760,
    width: 100,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
    fontFamily: "Roboto-Light"
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily: "Roboto-Light"
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default MyComponent;
