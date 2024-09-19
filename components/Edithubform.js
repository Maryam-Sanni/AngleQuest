import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Picker, TouchableOpacity, ScrollView, Modal, FlatList  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from './CustomAlert'; 


const CustomTimePicker = ({ initialValue, onChange }) => {
  const [hour, setHour] = useState(initialValue.split(':')[0]);
  const [minute, setMinute] = useState(initialValue.split(':')[1]);
  const [isPM, setIsPM] = useState(initialValue.includes('PM'));
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleHourChange = (selectedHour) => {
    setHour(selectedHour);
  };

  const handleMinuteChange = (selectedMinute) => {
    setMinute(selectedMinute);
  };

  const handleToggleAMPM = () => {
    setIsPM(!isPM);
  };

  const showTimePicker = () => {
    setModalVisible(true);
  };

  const selectTime = () => {
    const time = `${hour}:${minute} ${isPM ? 'PM' : 'AM'}`;
    onChange(time);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.timeOption} onPress={item.onPress}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1 ).map((hour) => ({
    label: hour.toString(),
    onPress: () => handleHourChange(hour.toString().padStart(2, '0')),
  }));

  const minuteOptions = Array.from({ length: 6 }, (_, i) => i * 10).map((minute) => ({
    label: minute.toString().padStart(2, '0'),
    onPress: () => handleMinuteChange(minute.toString().padStart(2, '0')),
  }));
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

 
  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={showTimePicker}>
        <Text>{`${hour}:${minute} ${isPM ? 'PM' : 'AM'}`}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.optionsContainer}>
            <FlatList
              data={hourOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <FlatList
              data={minuteOptions}
              renderItem={renderItem}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
           <View style={styles.ampmContainer}>
            <TouchableOpacity style={[styles.ampmButton, isPM ? styles.selected : null]} onPress={handleToggleAMPM}>
              <Text style={{fontFamily:"Roboto-Light"}}>PM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ampmButton, !isPM ? styles.selected : null]} onPress={handleToggleAMPM}>
              <Text style={{fontFamily:"Roboto-Light"}}>AM</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.selectButton} onPress={selectTime}>
            <Text style={{fontFamily:"Roboto-Light"}}>{t("Select")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const CreateCoachingHubForm = ({ onClose }) => {
  const navigation = useNavigation();
  const [from, setStartTime] = useState('12:00');
  const [to, setEndTime] = useState('12:00');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')     
  const [isVisible, setIsVisible] = useState(true); 

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

 
  const [visibility, setVisibility] = useState('public');
   const [category, setCategory] = useState('');
  const [coaching_hub_name, setGroupName] = useState('');
  const [coaching_hub_goals, setAddgoals] = useState('');
  const [coaching_hub_description, setGroupDescription] = useState('');
  const [coaching_hub_limit, setlimit] = useState('');
  const [meeting_day, setmeeting_day] = useState('Monday');
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [coaching_hub_fee, setfee] = useState('');
  const maxDescriptionLength = 85; // Max character limit for description

   const apiUrl = process.env.REACT_APP_API_URL;

  const handleDescriptionChange = (text) => {
    if (text.length <= maxDescriptionLength) {
      setGroupDescription(text);
      setDescriptionLength(text.length);
    }
  };

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');
        
        const response = await axios.get(`${apiUrl}/api/expert/hubs/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        if (response.status === 200 && response.data.status === 'success') {
          const data = response.data.NewHub;
          setVisibility(data.visibility || '');
          setGroupName(data.coaching_hub_name || '');
          setAddgoals(data.coaching_hub_goals || '');
          setGroupDescription(data.coaching_hub_description || '');
          setfee(data.coaching_hub_fee || '');
          setmeeting_day(data.meeting_day || '');
          setlimit(data.coaching_hub_limit || '');
          setStartTime(data.from || '');
          setEndTime(data.to || '');
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };
  
    loadFormData();
  }, []);
  

  const getBearerToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Adjust key as per your implementation
      return token;
    } catch (error) {
      console.error('Failed to fetch the token from AsyncStorage', error);
      return null;
    }
  };
  
  const handleSave = async () => {
    try {
      const token = await getBearerToken();
      if (!token) {
        console.error('Bearer token not found');
        return;
      }
  
      const formData = {
        visibility,
        category,
        coaching_hub_name,
        meeting_day,
        coaching_hub_description,
        from,
        to,
        coaching_hub_fee,
        coaching_hub_goals,
        coaching_hub_limit
      };
  
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      const response = await axios.put(
        `${apiUrl}/api/expert/hubs/edit`,
        formData,
        { headers }
      );
  
        if (response.status === 200) {
          setAlertMessage(t('Hub updated successfully'));
        } else {
          setAlertMessage(t('Failed to update Hub'));
        }
      } catch (error) {
        console.error('Error during save:', error); // Log error for debugging
        setAlertMessage(t('Failed to update Hub'));
      }
      setAlertVisible(true);
    };
    
    const hideAlert = () => {
      setAlertVisible(false);
      setIsVisible(false);
      onClose();
    };
    


  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

 
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center'  }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
<TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', marginLeft: 850,fontWeight: 'bold', marginTop: -20,fontFamily:"Roboto-Light"}}>
                            ✕
                        </Text>
                        </TouchableOpacity>
    <View style={styles.pageContainer}>
      <View style={styles.formContainer}>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 25,fontFamily:"Roboto-Light" }}>{t("Visibility")}*</Text>
        <Picker
          selectedValue={visibility}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setVisibility(itemValue)
          }> 
          <Picker.Item label={t("Public")} value="public" />
          <Picker.Item label={t("Private")} value="private" />
        </Picker>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Category")}*</Text>
          <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory (itemValue)}
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
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Learning Hub Name")}*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter hub name"
          value={coaching_hub_name}
          onChangeText={text => setGroupName(text)}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Learning Hub Description")}* ({maxDescriptionLength - descriptionLength} characters remaining)</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder= {t("Type here...")}
          multiline
          value={coaching_hub_description}
          onChangeText={handleDescriptionChange}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Meeting Day")}*</Text>
        <Picker
      selectedValue={meeting_day}
      style={styles.picker}
      onValueChange={(itemValue) => setmeeting_day (itemValue)}
          > 
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10 }}>{t("Meeting Time")}*</Text>
        <View style={styles.timecontainer}>
      <View style={styles.timeformContainer}>
        <Text style={styles.timelabel}>{t("From")}</Text>
        <CustomTimePicker initialValue={from} onChange={handleStartTimeChange} />
        <Text style={styles.timelabel}>{t("To")}</Text>
        <CustomTimePicker initialValue={to} onChange={handleEndTimeChange} />
      </View>
    </View>
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Learning Hub Fee")}*</Text>
        <TextInput
          style={styles.input}
          placeholder="$25"
          value={coaching_hub_fee}
          onChangeText={text => setfee(text)}
        />
        <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Learning Hub Goals (Optional)")} </Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder= "Type here..."
          multiline
          value={coaching_hub_goals}
          onChangeText={text => setAddgoals(text)}
        />
       <Text style={{ fontWeight: 600, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("learning Hub Limit")}*</Text>
        <TextInput
          style={styles.input}
          placeholder="50"
          keyboardType="numeric" // Set keyboardType to 'numeric' for number input
          value={coaching_hub_limit}
          onChangeText={text => setlimit(text)}
        />
        <TouchableOpacity
          style={{ backgroundColor: 'coral', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 25, marginBottom: 30 }}
          onPress={handleSave}
        >
          <Text style={{ color: 'white', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Save Changes")}</Text>
        </TouchableOpacity>
      </View>
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
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8'
  },
  scrollContainer: {
    flexGrow: 1,
    maxHeight: 500
  },
  formContainer: {
    width: '80%',
    paddingHorizontal: 20, // Add some horizontal padding for better layout
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  picker: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  greenBox: {
    width: 920,
    height:850,
    backgroundColor: '#F8F8F8',
    marginTop: 40
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  timecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeformContainer: {
    width: '100%',
  },
  timelabel: {
    fontWeight: '600',
    marginBottom: 2,
    marginTop: 10,
    fontSize: 14,
    fontStyle: 'italic',
    fontFamily:"Roboto-Light"
  },
  modalContainer: {
    backgroundColor: '#F8F8F8',
    marginTop: 'auto',
    marginBottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timeOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  ampmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ampmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selected: {
    backgroundColor: 'coral',
  },
  selectButton: {
    backgroundColor: 'coral',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    color: 'white'
  },
});

export default CreateCoachingHubForm;
