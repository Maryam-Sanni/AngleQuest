import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker } from 'react-native';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


function MyComponent({ onClose }) {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
  const [coach, setCoach] = useState('Patrick OCHE');
   const [feedbacks, setFeedback] = useState('Read only field');
  const [expert_available_days, setExpertAvailableDays] = useState('Mon-Fri');
  const [expert_available_time, setExpertAvailableTime] = useState('10AM - 5PM');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [candidate, setCandidate] = useState("Individual");
  const [expertid, setExpertid] = useState(" ");
   const [meetingtype, setType] = useState("growth");

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('https://recruitangle.com/api/jobseeker/get-jobseeker-growthplan', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          const data = response.data.growthPlan; // Check the structure of `data`

          setRole(data.role || '');
          setSelectedType(data.type || '');
          setTitle(data.title || '');
          setResultDescription(data.result_description || '');
          setHowToAchieve(data.how_to_achieve || '');
          setNeeds(data.achieve_the_objective || '');
          setStartingLevel(data.starting_level || '');
          setTargetLevel(data.target_level || '');
          setStatus(data.status || '');
          setSelectedDateTime(data.start_date || '');


        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    getToken();
  }, []);
  
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  return ( 
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center',  }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>

<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("View Expert's Review")}</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
                        <Text style={{marginLeft: 730, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Uneditable Section")}</Text>
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
           enabled={false}
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
          placeholderTextColor="black"
          style={styles.input}
          editable={false}
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
          placeholderTextColor="black"
          style={styles.input}
          editable={false}
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
          editable={false}
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
          placeholderTextColor="black"
          multiline
          style={[styles.input, { height: 50 }]}
          editable={false}
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
          placeholderTextColor="black"
          multiline
          style={[styles.input, { height: 50 }]}
          editable={false}
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
      <Text style={{color: 'black', borderColor: 'black', borderWidth: 1, padding: 5, borderRadius: 5, fontSize: 14,}}>Biannually</Text>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={{ fontFamily: 'Roboto-Light' }}>{t('Starting Level')}</Text>
      </View>
      <View style={styles.cell}>
        <Picker
          selectedValue={starting_level}
           enabled={false}
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
           enabled={false}
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
           enabled={false}
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
        <Text style={{ color: 'black', fontFamily: 'Roboto-Light' }}>{feedbacks}</Text>
      </View>
    </View>
  </View>

 <View style={{flexDirection: 'row'}}>
<Text style={{ marginTop: 20, marginBottom: -10, fontWeight: '500', fontSize: 14, color: 'black', marginLeft: 50,fontFamily:"Roboto-Light" }}>{t("Growth Plan Scoring")}</Text>
<Text style={{marginLeft: 540, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600',fontFamily:"Roboto-Light"}}>{t("Uneditable Section")}</Text>
       </View>
       <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Topic")} 1</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>100%</Text>
        </View>
        </View>
        <View style={styles.row}>
        <View style={styles.cell}>
        <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Topic")} 2</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>100%</Text>
        </View>
        </View>
    <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Topic")} 3</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>100%</Text>
        </View>
        </View>
    <View style={styles.row}>
        <View style={styles.cell}>
        <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Topic")} 4</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>100%</Text>
        </View>
        </View>
<View style={styles.row}>
        <View style={styles.cell}>
        <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Topic")} 5</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>100%</Text>
        </View>
        </View>
 <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Topic")} 6</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>100%</Text>
        </View>
        </View>
        </View>
<Text style={{ marginTop: 20, fontWeight: '500', color: 'black', marginLeft: 50, fontSize: 14, marginBottom: 10,fontFamily:"Roboto-Light" }}> {t("Overall Feedback/Remark")}</Text>
              <View style={{ marginTop: 3.5, padding: 6, paddingTop: 8, paddingBottom: 100, backgroundColor: 'none', borderWidth: 2, borderColor: '#CCC', marginLeft: 50, marginRight: 70 }}>
              <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{t("Your goals and its description are clear and concise. Well done for that. I am satisfied with this set goals and I am more than happy to work with you to the finish line.  See you in our one-one session where I'll share further tips on how to achieve this feat and above all meet you.")}</Text>
               
                </View>

<View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Performance Rating")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>RT01-Brilliant</Text>
        </View>
        </View>
        </View>

    
    
 
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
    marginTop: 20, 
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
  greenBox: {
    width: 920,
    height:850,
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: '#F8F8F8',
    color:'black',
    fontSize: 14,
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonAcc: {
    borderWidth: 3,
    borderColor: 'grey',
    padding: 10,
    marginTop: 30,
    marginLeft: 700, 
    marginRight: 70,
    paddingHorizontal: 5,
    marginBottom: 20
  },
  buttonTextAcc: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black',
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
  }
});

export default MyComponent;