import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';
import { useNavigate } from 'react-router-dom';
import DateTimePickerModal from "../components/DateTimePickerModal";
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';

function MyComponent({ onClose }) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [type, setType] = useState("Career Change");
  const [role, setRole] = useState("");
  const [challenge, setChallenge] = useState("");
  const [startingLevel, setStartingLevel] = useState("Beginner");
  const [targetLevel, setTargetLevel] = useState("Medior");
  const [status, setStatus] = useState("Active");
  const [token, setToken] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [expertAvailableDays, setExpertAvailableDays] = useState('Mon-Fri');
  const [expertAvailableTime, setExpertAvailableTime] = useState('10AM-5PM');
  const [expert, setExpert] = useState('');
  const [candidate, setCandidate] = useState("Individual");
  const [expertId, setExpertId] = useState('');
  const [meetingType, setMeetingType] = useState("advice");
  const [rating, setRating] = useState(0);

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Very Dissatisfied';
      case 2: return 'Dissatisfied';
      case 3: return 'Somewhat Dissatisfied';
      case 4: return 'Slightly Dissatisfied';
      case 5: return 'Neutral';
      case 6: return 'Somewhat Satisfied';
      case 7: return 'Satisfied';
      case 8: return 'Very Satisfied';
      case 9: return 'Extremely Satisfied';
      case 10: return 'Completely Satisfied';
      default: return 'No Rating Yet';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedData = await AsyncStorage.getItem('selectedSkillAnalysis');
        if (retrievedData) {
          const parsedData = JSON.parse(retrievedData);
          setData(parsedData);
          setId(parsedData.id);

          setType(parsedData.type || 'Career Change');
          setRole(parsedData.role || '');
          setChallenge(parsedData.description || '');
          setStartingLevel(parsedData.starting_level || 'Beginner');
          setTargetLevel(parsedData.target_level || 'Medior');
          setStatus(parsedData.status || 'Active');
          setExpert(parsedData.expert_name || '');
          setExpertAvailableDays(parsedData.expert_available_days || 'Mon-Fri');
          setExpertAvailableTime(parsedData.expert_available_time || '10AM-5PM');
          setExpertId(parsedData.expertid || '');
          setRating(parseInt(parsedData.rating_figure, 10));
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
      const url = `${apiUrl}/api/jobseeker/edit-jobseeker-skill-analysis/${id}`;

      const postData = {
        type,
        role,
        description: challenge,
        starting_level: startingLevel,
        target_level: targetLevel,
        status,
        date_time: data?.date_time,
        expert_name: data?.expert_name,
        expert_available_days: data?.expert_available_days,
        expert_available_time: data?.expert_available_time,
        expertid: data?.expertid,
        meetingtype: meetingType,
        name: data?.name || 'name',
      };

      const response = await axios.put(url, postData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Skill Analysis session updated successfully:', response.data);
     navigate('/skill-analysis-sessions');
      } else {
        console.error('Failed to update the skill analysis session:', response.data);
      }
    } catch (error) {
      console.error('Error updating the skill analysis session:', error);
    } finally {
      onClose();
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
    return null;
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
            <Text style={styles.headerText}>{t("View Skill Analysis Session")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Type")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={data?.types}
                  style={styles.picker}
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
                  value={data?.role}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Starting Level")}</Text>
              </View>
            <View style={styles.cell}>
                <TextInput
                  placeholder={t('Become SAP FI Medior expert in 6 months')}
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={data?.starting_level}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Target Level")}</Text>
              </View>
            <View style={styles.cell}>
                <TextInput
                  placeholder={t('Become SAP FI Medior expert in 6 months')}
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={data?.target_level}
                />
              </View>
            </View>



          </View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{ marginTop: 20, marginBottom: -10, fontWeight: '500', fontSize: 14, color: 'black', marginLeft: 50,fontFamily:"Roboto-Light" }}>{t("Skill Analysis Scoring")}</Text>
        <Text style={{marginLeft: 540, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Uneditable Section")}</Text>
               </View>
               <View style={styles.container}>
                 {data?.descriptions?.map((item, index) => (
                   <View style={styles.row} key={index}>
                     <View style={styles.cell}>
                       <Text style={{fontWeight: 'bold', fontFamily: "Roboto-Light"}}>
                         {t("Topic")} {index + 1}: {item.description}
                       </Text>
                     </View>
                     <View style={styles.cell}>
                       <Text style={{color: 'grey', fontFamily: "Roboto-Light"}}>
                         {item.percentage}%
                       </Text>
                     </View>
                   </View>
                 ))}
                </View>
        <Text style={{ marginTop: 20, fontWeight: '500', color: 'black', marginLeft: 50, fontSize: 14, marginBottom: 10,fontFamily:"Roboto-Light" }}> {t("Overall Feedback/Remark")}</Text>
                      <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 100, backgroundColor: 'none', borderWidth: 2, borderColor: '#CCC', marginLeft: 50, marginRight: 70 }}>
                      <Text style={{color: 'black',fontFamily:"Roboto-Light"}}>{data?.remark}</Text>

                        </View>

        <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Performance Rating")}</Text>
                </View>
                <View style={styles.cell}>
                <Text style={{color: 'black',fontFamily:"Roboto-Light"}}>{data?.rating}</Text>
                </View>
                </View>
                </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratetitle}>{t("Rating")} <Image
              source={{ uri: 'https://img.icons8.com/?size=100&id=60003&format=png&color=206C00' }}
              style={{width: 20, height: 20, marginLeft: 5, marginTop: 5 }}
            /></Text>
            <View style={styles.raterow}>
              <Text style={styles.ratetext}>You rated {data?.expert_name} </Text>
              <Text style={styles.ratetext}>{getRatingText(rating)}</Text>
            </View>
          </View>

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
    height:850,
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
  ratingContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 50,
    marginTop: 300
  },
  ratetitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: '#206C00'
  },
  raterow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratetext: {
    color: 'black',
    fontFamily: "Roboto-Light",
    fontSize: 16
  },

});

export default MyComponent;