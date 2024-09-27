import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Image, ScrollView, Picker } from 'react-native';
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';
import DaysTimePickerModal from "../components/TimePicker";


const MAX_TOPICS = 10;

function MyComponent({ onClose }) {

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();

  const [role, setSkillsAnalysisRole] = useState('');
   const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [rate, setRate] = useState('');
  const [availableDays, setAvailableDays] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [topics, setTopics] = useState([{ topic: '', percentage: '' }]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedData = await AsyncStorage.getItem('selectedMeeting');
        if (retrievedData) {
          const parsedData = JSON.parse(retrievedData);
          setData(parsedData); // Update the state with the retrieved data
        } else {
          console.log('No data found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Failed to retrieve data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);
  
  const handleConfirm = ({ selectedDays, startTime, endTime }) => {
    setAvailableDays(selectedDays);
    setAvailableTimes(`${startTime.hour}:${startTime.minute} ${startTime.period} - ${endTime.hour}:${endTime.minute} ${endTime.period}`);
    setModalVisible(false);
  };

  const handleSave = async () => {
    if (!role || !level || !rate || !availableDays || !availableTimes) {
      setAlertMessage(t('Please fill all fields'));
      setAlertVisible(true);
      return;
    }

    try {
      const data = {
        role,
        level,
        rate,
        available_days: availableDays,
        available_times: availableTimes,
        category,
        topics
      };

      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(
        `${apiUrl}/api/expert/skillAnalysis/create`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        await AsyncStorage.setItem('skillAnalysisFormData', JSON.stringify(data));
        setAlertMessage(t('Skill Analysis profile created successfully'));
      } else {
        setAlertMessage(t('Failed to create skill analysis profile'));
      }
    } catch (error) {
      console.error('Error during save:', error); // Log error for debugging
      setAlertMessage(t('Failed to create skill analysis profile'));
    }
    setAlertVisible(true);
  };

  const addTopic = () => {
    if (topics.length < MAX_TOPICS) {
      setTopics([...topics, { topic: '', percentage: '' }]);
    }
  };

  const updateTopic = (index, key, value) => {
    const newTopics = [...topics];
    newTopics[index][key] = value;
    setTopics(newTopics);
  };

  const deleteTopic = (index) => {
    const newTopics = topics.filter((_, i) => i !== index);
    setTopics(newTopics);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
    onClose();
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  if (!isVisible) {
    return null; // Return null to unmount the parent component
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Give Personal Roadmap")}</Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Full Name")}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{data?.name}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Role")}</Text>
              </View>
              <View style={styles.cell}>
                 <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{data?.role}</Text>
              </View>
            </View>
            
            
           
           
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: 50, fontWeight: 'bold', marginTop: 50, fontSize: 16, marginBottom: 10 }}>{t("Give at least 5 but not more than 10 personal roap maps with description to protegee")}</Text>
            <TouchableOpacity
              style={[styles.buttonplus, topics.length >= MAX_TOPICS && styles.buttonplusDisabled, isPressed && styles.buttonplusPressed]}
              onPress={addTopic}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={topics.length >= MAX_TOPICS}
            >
              <Text style={styles.buttonTextplus}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            {topics.map((topic, index) => (
              <View key={index} style={styles.row}>
                <View style={[styles.cell, { flex: 2 }]}>
                  <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t(`Roadmap`)} {index + 1}</Text>
                </View>
                <View style={[styles.cell, { flex: 2 }]}>
                  <TextInput
                    placeholder={t("Point")}
                    placeholderTextColor="grey"
                    style={styles.input}
                    value={topic.topic}
                    onChangeText={text => updateTopic(index, 'topic', text)}
                  />
                </View>
                <View style={[styles.cell, { flex: 5 }]}>
                  <TextInput
                    placeholder={t("Description")}
                    placeholderTextColor="grey"
                    style={styles.input}
                    value={topic.topic}
                    onChangeText={text => updateTopic(index, 'topic', text)}
                  />
                </View>
               
                <TouchableOpacity onPress={() => deleteTopic(index)} style={styles.deleteButton}>
                  <Text style={{color: 'red', fontSize: 18, fontWeight: 600}}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.buttonsave}>
            <Text style={styles.buttonTextsave}>{t("Save")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomAlert
        visible={alertVisible}
        title={t("Alert")}
        message={alertMessage}
        onConfirm={hideAlert}
      />
      <DaysTimePickerModal
        isVisible={isModalVisible}
        onConfirm={handleConfirm}
        onCancel={() => setModalVisible(false)}
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
    marginTop: 10,
    marginLeft: 50
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
  buttonDue: {
    borderWidth: 2,
    borderColor: 'coral',
    padding: 10,
    marginLeft: 50,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  buttonTextDue: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 50,
    width: 100,
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 10
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
  buttonsave: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 750,
    width: 100,
    paddingHorizontal: 20,
    marginTop: 30
  },
  buttonTextsave: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  greenBox: {
    width: 920,
    height: 600,
    backgroundColor: '#F8F8F8',
  },
  input: {
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
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
    marginBottom: 20
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily: "Roboto-Light"
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1,
    color: 'grey',
    fontSize: 14
  },
  buttonplusPressed: {
    backgroundColor: 'green',
  },
  buttonplusDisabled: {
    backgroundColor: 'red',
  },
});

export default MyComponent;
