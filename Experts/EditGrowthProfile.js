import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';
import DaysTimePickerModal from "../components/TimePicker";

const MAX_GUIDES = 15;

function MyComponent({ onClose }) {
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();

  const [role, setRole] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [rate, setRate] = useState('');
  const [availableDays, setAvailableDays] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [guides, setGuides] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);


  const handleConfirm = ({ selectedDays, startTime, endTime }) => {
    setAvailableDays(selectedDays);
    setAvailableTimes(`${startTime.hour}:${startTime.minute} ${startTime.period} - ${endTime.hour}:${endTime.minute} ${endTime.period}`);
    setModalVisible(false);
  };

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('https://recruitangle.com/api/expert/growthplan/get', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          const data = response.data.growthPlan;
          setRole(data.role || '');
          setLevel(data.level || '');
          setRate(data.rate || '');
          setAvailableDays(data.available_days || '');
          setAvailableTimes(data.available_times || '');
          setGuides(data.guides || []);
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
  }, []);

  const handleSave = async () => {
    try {
      const data = {
        role,
        level,
        rate,
        available_days: availableDays,
        available_times: availableTimes,
        category,
        guides
      };

      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.put(
        'https://recruitangle.com/api/expert/growthplan/edit',
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        await AsyncStorage.setItem('GrowthFormData', JSON.stringify(data));
        setAlertMessage(t('Growth plan profile updated successfully'));
      } else {
        setAlertMessage(t('Failed to update growth plan profile'));
      }
    } catch (error) {
      console.error('Error during save:', error);
      setAlertMessage(t('Failed to update growth plan profile'));
    }
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  const handleGuideChange = (index, field, value) => {
    const newGuides = [...guides];
    newGuides[index] = { ...newGuides[index], [field]: value };
    setGuides(newGuides);
  };

  const addNewTopic = () => {
    setGuides([...guides, { guide: '', percentage: '0' }]);
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Edit Growth Plan Profile")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 10}}>
          <TouchableOpacity style={styles.buttonDue} >
                <Text style={styles.buttonTextDue}>{role}</Text>
              </TouchableOpacity>
          </View>
          
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Role")}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder="Junior Platform Developer"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={role}
                  onChangeText={text => setRole(text)}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Category")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={category}
                  style={styles.picker}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                >
                  <Picker.Item label={t('SAP')} value="SAP" />
                  <Picker.Item label={t('Microsoft')} value="Microsoft" />
                  <Picker.Item label={t('Salesforce')} value="Salesforce" />
                  <Picker.Item label={t('Frontend Development')} value="Frontend Development" />
                  <Picker.Item label={t('Backend Development')} value="Backend Development" />
                  <Picker.Item label={t('UI/UX')} value="UI/UX" />
                  <Picker.Item label={t('Data Analysis')} value="Data Analysis" />
                  <Picker.Item label={t('Cloud Computing')} value="Cloud Computing" />
                  <Picker.Item label={t('Management')} value="Management" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Level")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={level}
                  style={styles.picker}
                  onValueChange={(itemValue) => setLevel(itemValue)}
                >
                  <Picker.Item label={t('Junior')} value="Junior" />
                  <Picker.Item label={t('Medior')} value="Medior" />
                  <Picker.Item label={t('Senior')} value="Senior" />
                  <Picker.Item label={t('Professional')} value="Professional" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Rate")}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder="$50"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={rate}
                  onChangeText={text => setRate(text)}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Available Days")}</Text>
              </View>
              <View style={styles.cell}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <TextInput
                    placeholder="Mon,Tue,Wed...,Sun"
                    placeholderTextColor="grey"
                    style={styles.input}
                    value={availableDays}
                    editable={false} // Prevent manual input
                    pointerEvents="none" // Ensure it behaves like a button
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Available Times")}</Text>
              </View>
              <View style={styles.cell}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <TextInput
                    placeholder="12PM-1PM"
                    placeholderTextColor="grey"
                    style={styles.input}
                    value={availableTimes}
                    editable={false} // Prevent manual input
                    pointerEvents="none" // Ensure it behaves like a button
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginLeft: 50, fontWeight: '600', marginTop: 20, fontFamily: "Roboto-Light" }}>{t("My Scoring Guide")}</Text>

          <TouchableOpacity
            style={styles.buttonplus}
            onPress={addNewTopic}
            disabled={guides.length >= MAX_GUIDES}
          >
            <Text style={styles.buttonTextplus}>+</Text>
          </TouchableOpacity>
          </View>
            
          <View style={styles.container}>
            {guides.map((guide, index) => (
              <View key={index} style={styles.row}>
                <View style={[styles.cell, { flex: 2 }]}>
                  <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t(`Guide`)} {index + 1}</Text>
                </View>
                <View style={[styles.cell, { flex: 5 }]}>
                  <TextInput
                    placeholder={t("Guide description")}
                    placeholderTextColor="grey"
                    style={styles.input}
                    value={guide.guide}
                    onChangeText={text => handleGuideChange(index, 'guide', text)}
                  />
                </View>
                <View style={[styles.cell, { flex: 2 }]}>
                  <Picker
                    selectedValue={guide.percentage}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleGuideChange(index, 'percentage', itemValue)}
                  >
                    <Picker.Item label="10%" value="10" />
                    <Picker.Item label="20%" value="20" />
                    <Picker.Item label="30%" value="30" />
                    <Picker.Item label="40%" value="40" />
                    <Picker.Item label="50%" value="50" />
                    <Picker.Item label="60%" value="60" />
                    <Picker.Item label="70%" value="70" />
                    <Picker.Item label="80%" value="80" />
                    <Picker.Item label="90%" value="90" />
                    <Picker.Item label="100%" value="100" />
                  </Picker>
                </View>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => setGuides([...guides, { guide: '', percentage: '0' }])}
              style={styles.addButton}
            >
            
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSave} style={styles.buttonsave} >
                <Text style={styles.buttonTextsave}>{t("Save")} Changes</Text>
              </TouchableOpacity>

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
      </ScrollView>
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
    marginLeft: 50,
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
    fontFamily:"Roboto-Light"
  },
  buttonAcc: {
    borderWidth: 2,
    borderColor: '#CCC',
    padding: 10,
    marginTop: 15,
    marginLeft: 30, 
    paddingHorizontal: 20,
  },
  buttonTextAcc: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  buttonNew: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'coral',
    padding: 5,
    marginLeft: 50, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonTextNew: {
    color: 'coral',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  buttonplus: {
    backgroundColor: 'coral', 
    padding: 5,
    marginLeft: 585, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonplusPressed: {
    backgroundColor: 'green',
  },
  buttonplusDisabled: {
    backgroundColor: 'red',
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonsave: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 700, 
    width: 150,
    paddingHorizontal: 20,
    marginTop: 30
  },
  buttonTextsave: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  greenBox: {
    width: 920,
    height:600,
    backgroundColor: '#F8F8F8',
  },
  input: {
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
    fontFamily:"Roboto-Light"
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
    fontFamily:"Roboto-Light"
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1, 
    color:'grey',
    fontSize: 14
  },
});

export default MyComponent;
