import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, Picker, ScrollView } from 'react-native';
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert'; 
import DaysTimePickerModal from "../components/TimePicker";

const MAX_QUESTIONS = 15;

function MyComponent({ onClose }) {

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();

  const [role, setInterviewRole] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [available_days, setAvailableDays] = useState('');
  const [available_times, setAvailableTimes] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', percentage: '' }
  ]); 
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');    
  const [isVisible, setIsVisible] = useState(true); 
  const [isPressed, setIsPressed] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [rate, setRate] = useState('$0'); // Initial value includes $

  const handleRateChange = (text) => {
    // Remove non-numeric characters except for the decimal point
    const numericValue = text.replace(/[^0-9.]/g, '');

    // If the input is not empty, set the state with the `$` at the start
    if (numericValue || numericValue === '') {
      setRate(`$${numericValue}`);
    }
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleConfirm = ({ selectedDays, startTime, endTime }) => {
    setAvailableDays(selectedDays);
    setAvailableTimes(`${startTime.hour}:${startTime.minute} ${startTime.period} - ${endTime.hour}:${endTime.minute} ${endTime.period}`);
    setModalVisible(false);
  };

  const combinedValue = `${Array.isArray(available_days) ? available_days.join(', ') : ''}, ${available_times}`;
  
  const handleSave = async () => {
    if (!role || !level || !rate || !available_days || !available_times) {
      setAlertMessage(t('Please fill all fields'));
      setAlertVisible(true);
      return;
    }

    try {
      const data = {
        role,
        level,
        rate,
        available_days,
        available_times,
        category,
        questions
      };

      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(
        `${apiUrl}/api/expert/interview/create`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        await AsyncStorage.setItem('InterviewFormData', JSON.stringify(data));
        setAlertMessage(t('Interview profile created successfully'));
      } else {
        setAlertMessage(t('Failed to create interview profile'));
      }
    } catch (error) {
      console.error('Error during save:', error); // Log error for debugging
      setAlertMessage(t('Failed to create interview profile'));
    }
    setAlertVisible(true);
  };

  const addQuestion = () => {
    if (questions.length < MAX_QUESTIONS) {
      setQuestions([...questions, { question: '', percentage: '' }]);
    }
  };

  const updateQuestion = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };
  
  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
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
            <Text style={styles.headerText}>{t("Create Interview Guide")}</Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View> 

<View style={{ flexDirection: "row", marginBottom: 10 }}>
  <View style={styles.buttonDue}>
    <Text style={styles.buttonTextDue}>Please fill all fields</Text>
  </View>
</View>

<View style={styles.container}>
  <View style={styles.row}>
    <View style={[styles.cell, { flex: 1}]}>
      <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Category")}</Text>
    </View>
    <View style={[styles.cell, { flex: 2}]}>
      <TextInput
        placeholder="Junior Platform Developer"
        placeholderTextColor="grey"
        style={styles.input}
        value={role}
        editable={false}
        onChangeText={text => setInterviewRole(text)}
      />
    </View>
  </View>
  <View style={styles.row}>
    <View style={[styles.cell, { flex: 1}]}>
      <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Specialization")}</Text>
    </View>
    <View style={[styles.cell, { flex: 2}]}>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label={t('SAP')} value="SAP" />
        <Picker.Item label={t('Microsoft')} value="Microsoft" />
        <Picker.Item label={t('Scrum')} value="Scrum" />
        <Picker.Item label={t('Business Analysis')} value="Business Analysis" />
      </Picker>
    </View>
  </View>
  <View style={styles.row}>
    <View style={[styles.cell, { flex: 1}]}>
      <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Candidate Level")}</Text>
    </View>
    <View style={[styles.cell, { flex: 2}]}>
      <Picker
        selectedValue={level}
        style={styles.picker}
        onValueChange={(itemValue) => setLevel(itemValue)}
      >
        <Picker.Item label={t('Beginner')} value="Beginner" />
        <Picker.Item label={t('Intermediate')} value="Intermediate" />
        <Picker.Item label={t('Advanced')} value="Advanced" />
      </Picker>
    </View>
  </View>
  <View style={styles.row}>
    <View style={[styles.cell, { flex: 1}]}>
      <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Rate")}</Text>
    </View>
    <View style={[styles.cell, { flex: 2}]}>
      <TextInput
        style={styles.input}
        value={rate}
        onChangeText={handleRateChange}
        keyboardType="numeric" 
      />
    </View>
  </View>
  <View style={styles.row}>
    <View style={[styles.cell, { flex: 1}]}>
      <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Available Day(s) and Time")}</Text>
    </View>
    <View style={[styles.cell, { flex: 2}]}>
      <TextInput
        placeholder="Mon, Tue, Wed..., Sun / 12PM-1PM"
        placeholderTextColor="grey"
        style={styles.input}
        value={combinedValue}
        editable={false} // Prevent manual input
        pointerEvents="none" // Ensure it behaves like a button
      />
    </View>
  </View>
    </View>

<View style={[styles.container, { marginTop: 50, borderRadius: 20, backgroundColor: '#F5F5F5' }]}>
  <DaysTimePickerModal
    isVisible={isModalVisible}
    onConfirm={handleConfirm}
    onCancel={() => setModalVisible(false)}
  />

</View>

  <View style={{ flexDirection: 'row', marginTop: 30 }}>
    <Text style={{ marginLeft: 50, fontWeight: 'bold', marginTop: 20,}}>{t("My Scoring Guide")}</Text>


</View>

<View style={{ flexDirection: 'row', marginTop: 30 }}>
<Text style={{ marginLeft: 50, fontWeight: '600', marginTop: 5, fontFamily: "Roboto-Light", fontStyle: "italic" }}>{t("Make use of the guide to jot down questions and notes, helping you facilitate the session more effectively")}</Text>

</View>

<View style={styles.container2}>
  {questions.map((question, index) => (
    <View key={index} style={styles.row}>
       <View style={[styles.cell2, { flex: 0.3, marginTop: 5 }]}>
        <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t(``)} {index + 1}</Text>
      </View>
       <View style={[styles.cell2, { flex: 5 }]}>
        <TextInput
          placeholder={t(" ")}
          placeholderTextColor="grey"
          style={styles.input2}
          value={question.question}
          onChangeText={text => updateQuestion(index, 'question', text)}
        />
      </View>
       <View style={[styles.cell2, { flex: 0.5 }]}>
        <Picker
          selectedValue={question.percentage}
          style={styles.picker2}
          onValueChange={(itemValue) => updateQuestion(index, 'percentage', itemValue)}
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
      <TouchableOpacity onPress={() => deleteQuestion(index)} style={styles.deleteButton}>
        <Text style={{color: 'grey', fontSize: 18, fontWeight: 600}}>✕</Text>
      </TouchableOpacity>
          </View>
          ))}
          </View>

<TouchableOpacity 
  style={[styles.buttonplus, questions.length >= MAX_QUESTIONS && styles.buttonplusDisabled, isPressed && styles.buttonplusPressed]} 
  onPress={addQuestion}
  onPressIn={handlePressIn}
  onPressOut={handlePressOut}
  disabled={questions.length >= MAX_QUESTIONS}
>
  <Text style={styles.buttonTextplus}>Add Item</Text>
</TouchableOpacity>

          <TouchableOpacity onPress={handleSave} style={styles.buttonsave}>
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
container2: {
flexDirection: 'column',
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
cell3: {
flex: 1,
padding: 5,
},
cell2: {
flex: 1,
padding: 5,
borderBottomWidth: 0.5, 
borderBottomColor: '#CCC',
marginTop: 5
},
input2: {
fontFamily: "Roboto-Light",
padding: 5,
borderWidth: 1,
borderColor: "#CCC"
},
picker2: {
height: 30,
width: '100%',
backgroundColor: 'white',
borderColor: '#CCC',
borderWidth: 1,
color: 'black',
},
deleteButton: {
marginTop: 10
},
buttonDue: {
marginLeft: 50,
marginTop: 5,
},
buttonTextDue: {
  color: 'black',
  fontSize: 15,
  width: 700,
  fontFamily: "Roboto-Light",
  },
buttonplus: {
backgroundColor: 'white', 
padding: 10,
marginLeft: 100, 
width: 80,
marginTop: 20,
borderRadius: 5,
borderWidth: 1,
borderColor: 'black'
},
buttonTextplus: {
color: 'black',
fontSize: 14,
textAlign: 'center',
fontFamily: "Roboto-Light"
},
buttonsave: {
backgroundColor: 'coral',
padding: 5,
marginLeft: 730,
width: 80,
padding: 10,
paddingHorizontal: 20,
marginTop: -35,
borderRadius: 5,
marginBottom: 50
},
buttonTextsave: {
color: 'white',
fontSize: 14,
textAlign: 'center',
},
greenBox: {
width: 880,
backgroundColor: 'white',
},
input: {
fontFamily: "Roboto-Light",
paddingLeft: 5
},
closeButton: {
position: 'absolute',
top: 30,
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
fontSize: 22,
fontWeight: 'bold',
},
picker: {
height: 20,
width: '100%',
backgroundColor: 'white',
borderColor: 'white',
borderWidth: 1,
color: 'black',
fontSize: 14,
},
buttonplusPressed: {
backgroundColor: 'green',
},
buttonplusDisabled: {
backgroundColor: 'red',
},
placeholderText: {
color: 'grey',
fontSize: 12, // Adjust size as needed
position: 'absolute',
left: 10,
top: 15, // Adjust position as needed
},
});

export default MyComponent;

