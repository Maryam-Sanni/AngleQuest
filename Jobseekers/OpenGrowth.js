import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "../components/DateTimePickerModal";
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';
import { format } from 'date-fns';

function MyComponent({ onClose }) {
  const navigation = useNavigation();
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [id, setId] = useState(null); // Store the ID
  
  const [token, setToken] = useState("");
  const [type, setSelectedType] = useState('Personal');
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [result_description, setResultDescription] = useState('');
  const [how_to_achieve, setHowToAchieve] = useState('');
  const [achieve_the_objective, setNeeds] = useState('');
  const [review_with_coach, setreviewwithcoach] = useState('Biannually');
  const [starting_level, setStartingLevel] = useState('Beginner');
  const [target_level, setTargetLevel] = useState('Medior');
  const [end_date, setEndDate] = useState('12 Months');
  const [status, setStatus] = useState('Active');
  const [coach, setCoach] = useState('');
   const [feedbacks, setFeedback] = useState('Read only field');
  const [expert_available_days, setExpertAvailableDays] = useState('');
  const [expert_available_time, setExpertAvailableTime] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [candidate, setCandidate] = useState("Individual");
  const [expertid, setExpertid] = useState(" ");
   const [meetingtype, setType] = useState("growth");

  const apiUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedData = await AsyncStorage.getItem('selectedGrowthPlan');
        if (retrievedData) {
          const parsedData = JSON.parse(retrievedData);
          setData(parsedData);
          setId(parsedData.id); // Store the ID
          
           // Initialize state variables with retrieved data
          setType(parsedData.type);
          setTitle(parsedData.title);
          setRole(parsedData.role);
          setResultDescription(parsedData.result_description);
          setHowToAchieve(parsedData.how_to_achieve);
          setNeeds(parsedData.achieve_the_objective);
          setStartingLevel(parsedData.starting_level);
          setTargetLevel(parsedData.target_level);
          setStatus(parsedData.status);
          setCoach(parsedData.coach);
          setExpertAvailableDays(parsedData.expert_available_days);
          setExpertAvailableTime(parsedData.expert_available_time);
        } else {
          console.log('No data found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Failed to retrieve data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    getToken();
  }, []);


    const goToPlans = async () => {
      try {
        // Construct the URL with the `id`
        const url = `${apiUrl}/api/jobseeker/edit-jobseeker-growth-plan/${id}`;
        
      const postData = {
        type: type || 'Personal',
        title: title || 'Default Title',
        role: role || 'Default Role',
        result_description: result_description || 'Default Description',
        how_to_achieve: how_to_achieve || 'Default Plan',
        achieve_the_objective: achieve_the_objective || 'Default Objective',
        review_with_coach: review_with_coach || 'Biannually',
        starting_level: starting_level || 'Beginner',
        target_level: target_level || 'Medior',
        end_date: end_date || '12 Months',
        status: status || 'Active',
        date_time: selectedDateTime || data?.date_time || 'Default DateTime',
        coach: data?.coach || 'Default Coach',
        expert_available_days: expert_available_days || 'Default Days',
        expert_available_time: expert_available_time || 'Default Time',
        expertid: data?.expertid || 'Default Expert ID',
        meetingtype: meetingtype || 'growth',
         feedbacks: feedbacks || 'Read only field',
         name: data?.name || 'name',
      };

        // Send the PUT request
        const response = await axios.put(url, postData, {
          headers: {
            'Content-Type': 'application/json', // Ensure JSON content type
            'Authorization': `Bearer ${token}`, // Include token if authentication is required
          },
        });

      // Handle the response
      if (response.status === 201) {
        console.log('Growth Plan session updated successfully:', response.data);
        // Optionally, show a success message or navigate to another screen
        navigation.navigate('Growth Plan Sessions');
      } else {
        console.error('Failed to update the Growth Plan session:', response.data);
      }
    } catch (error) {
      console.error('Error updating the Growth Plan session:', error);
    } finally {
      onClose(); // Close the modal
    }
  };



  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
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
    <View style={{ flex: 1, backgroundColor: '#F8F8F8', alignItems: 'center', marginTop: 40 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t('Update Growth Plan Objective')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: 'Roboto-Light' }}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 20, marginLeft: 50, fontFamily: 'Roboto-Light' }}>
            {t('Development Objectives')}
          </Text>
          <View style={styles.container}>
            {/* Form fields */}
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Type')}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={type}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedType(itemValue)}
                >
                  <Picker.Item label={t('Personal')} value="Personal" />
                  <Picker.Item label={t('Team')} value="Team" />
                  <Picker.Item label={t('Organization')} value="Organization" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Title')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t('Become SAP FI Medior expert in 6 months')}
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Role')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder="SAP FI"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={role}
                  onChangeText={setRole}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Result description')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t('Example: To be able to find my way around SAP fi...')}
                  placeholderTextColor="grey"
                  multiline
                  style={[styles.input, { height: 50 }]}
                  value={result_description}
                  onChangeText={setResultDescription}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('How to achieve')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t('Example: To be taught how to troubleshoot, find T\'codes...')}
                  placeholderTextColor="grey"
                  multiline
                  style={[styles.input, { height: 50 }]}
                  value={how_to_achieve}
                  onChangeText={setHowToAchieve}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('What do you need to achieve the objective?')}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t('Continous training, practice and support')}
                  placeholderTextColor="grey"
                  multiline
                  style={[styles.input, { height: 50 }]}
                  value={achieve_the_objective}
                  onChangeText={setNeeds}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('How often do you want to review with your coach?')}</Text>
              </View>
              <View style={styles.cell}>
              <Text style={{color: 'grey', borderColor: 'black', borderWidth: 1, padding: 5, borderRadius: 5, fontSize: 14,}}>Biannually</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Starting Level')}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={starting_level}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStartingLevel(itemValue)}
                >
                  <Picker.Item label={t('Beginner')} value="Beginner" />
                  <Picker.Item label={t('Junior')} value="Junior" />
                  <Picker.Item label={t('Medior')} value="Medior" />
                  <Picker.Item label={t('Senior')} value="Senior" />
                  <Picker.Item label={t('Professional')} value="Professional" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Target Level')}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={target_level}
                  style={styles.picker}
                  onValueChange={(itemValue) => setTargetLevel(itemValue)}
                >
                  <Picker.Item label={t('Beginner')} value="Beginner" />
                  <Picker.Item label={t('Junior')} value="Junior" />
                  <Picker.Item label={t('Medior')} value="Medior" />
                  <Picker.Item label={t('Senior')} value="Senior" />
                  <Picker.Item label={t('Professional')} value="Professional" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Status')}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={status}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStatus(itemValue)}
                >
                  <Picker.Item label={t('Active')} value="Active" />
                  <Picker.Item label={t('Review')} value="Review" />
                  <Picker.Item label={t('Replan')} value="Replan" />
                  <Picker.Item label={t('Completed')} value="Completed" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Feedbacks/remarks (from Coach)')}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: 'grey', fontFamily: 'Roboto-Light' }}>{feedbacks}</Text>
              </View>
            </View>
          </View>


          <Text style={{ fontSize: 15, color: 'black', marginLeft: 50, fontWeight: '500', marginTop: 30, marginBottom: -10, }}>{t("Expert's available days and time")}</Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Coach")}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>
                  {data?.coach || ''}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Days")}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>
                   {data?.expert_available_days|| ''}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>Time</Text>
              </View>
              <View style={styles.cell}><Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}> {data?.expert_available_time || ''}
                </Text>
              </View>
            </View>
          </View>

           <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 30, marginBottom: -10, marginLeft: 50, marginRight: 50 }}>{t("Select date and time for skill analysis session.")}  {data?.coach || ''} is available  {data?.expert_available_days|| ''} {data?.expert_available_time || ''}</Text>
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
                    {data?.date_time || t("Select Date and Time")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonplus} onPress={goToPlans}>
            <Text style={styles.buttonTextplus}>{t("Update")}</Text>
          </TouchableOpacity>
   

        </View>
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
