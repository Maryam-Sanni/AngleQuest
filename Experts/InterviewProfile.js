import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, Picker, ScrollView } from 'react-native';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert'; 

function MyComponent({ onClose }) {

  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })

        const {t}=useTranslation()

        const [role, setInterviewRole] = useState('');
        const [level, setlevel] = useState('');
        const [rate, setrate] = useState('');
        const [available_days, setavailable_days] = useState('');
        const [available_times, setavailable_times] = useState('');
        const [question1, setquestion1] = useState('');
        const [question2, setquestion2] = useState('');
        const [question3, setquestion3] = useState('');
        const [question4, setquestion4] = useState('');
        const [question5, setquestion5] = useState('');
        const [question6, setquestion6] = useState('');
        const [question1_percentage, setquestion1_percentage] = useState('');
        const [question2_percentage, setquestion2_percentage] = useState('');
        const [question3_percentage, setquestion3_percentage] = useState('');
        const [question4_percentage, setquestion4_percentage] = useState('');
        const [question5_percentage, setquestion5_percentage] = useState('');
        const [question6_percentage, setquestion6_percentage] = useState(''); 
        const [alertVisible, setAlertVisible] = useState(false);
        const [alertMessage, setAlertMessage] = useState('')    
        const [isVisible, setIsVisible] = useState(true);   

        useEffect(() => {
          const loadFormData = async () => {
            try {
              const storedFormData = await AsyncStorage.getItem('InterviewFormData');
              if (storedFormData) {
                const parsedData = JSON.parse(storedFormData);
                setInterviewRole(parsedData.role || '');
              }
            } catch (error) {
              console.error('Failed to load form data', error);
            }
          };
      
          loadFormData();
        }, []);
      
        const handleSave = async () => {
          if (!role || !level || !rate || !available_days || !available_times || !question1 || !question2 || !question3 || !question4 || !question5 || !question6 || !question1_percentage || !question2_percentage || !question3_percentage || !question4_percentage || !question5_percentage || !question6_percentage ) {
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
              question1,
              question1_percentage,
              question2,
              question2_percentage,
              question3,
              question3_percentage,
              question4,
              question4_percentage,
              question5,
              question5_percentage,
              question6,
              question6_percentage
            };
        
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No token found');
        
            const response = await axios.post(
              'https://recruitangle.com/api/expert/interview/create',
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

        const hideAlert = () => {
          setAlertVisible(false);
          setIsVisible(false);
          onClose();
        };
        
        if (!isVisible) {
          return null; // Return null to unmount the parent component
        }

  return (
    <View style={{  flex: 1, backgroundColor: "white", marginTop: 40, alignItems: 'center' }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} 
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("Create Interview Profile")}</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 

     <TouchableOpacity style={styles.buttonNew} >
      <Text style={styles.buttonTextNew}>{t("New")} +</Text>
    </TouchableOpacity>
<View style={{ flexDirection: "row", marginBottom: 10}}>
<TouchableOpacity style={styles.buttonDue} >
      <Text style={styles.buttonTextDue}>{role}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>NIL</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonAcc} >
      <Text style={styles.buttonTextAcc}>NIL</Text>
    </TouchableOpacity>
</View>



 <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Role")}</Text>
        </View>
        <View style={styles.cell}>
           <TextInput
            placeholder="Junior Platform Developer"
            placeholderTextColor="grey"
            style={styles.input}
            value={role}
            onChangeText={text => setInterviewRole(text)}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Level")}</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="Junior"
            placeholderTextColor="grey"
            style={styles.input}
            value={level}
            onChangeText={text => setlevel(text)}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Rate")}</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="$50"
            placeholderTextColor="grey"
            style={styles.input}
            value={rate}
            onChangeText={text => setrate(text)}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Available Days")}</Text>
        </View>
        <View style={styles.cell}>
          <TextInput
            placeholder="Mon-Fri"
            placeholderTextColor="grey"
            style={styles.input}
            value={available_days}
            onChangeText={text => setavailable_days(text)}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Available Times")}</Text>
        </View>
        <View style={styles.cell}>
         <TextInput
            placeholder="12PM-1PM"
            placeholderTextColor="grey"
            style={styles.input}
            value={available_times}
            onChangeText={text => setavailable_times(text)}
          />
        </View>
      </View>
    </View>
     <TouchableOpacity style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>+</Text>
    </TouchableOpacity>


     <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Question")} 1</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
           <TextInput
            placeholder={t("3 Ways to Optimize a model driven app to optimize its performance")}
            placeholderTextColor="grey"
            style={styles.input}
            value={question1}
            onChangeText={text => setquestion1(text)}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  selectedValue={question1_percentage}
  style={styles.picker}
  onValueChange={(itemValue) => setquestion1_percentage(itemValue)}
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
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Question")} 2</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <TextInput
            placeholder={t("3 Ways to Optimize a model driven app to optimize its performance")}
            placeholderTextColor="grey"
            style={styles.input}
            value={question2}
            onChangeText={text => setquestion2(text)}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  selectedValue={question2_percentage}
  style={styles.picker}
  onValueChange={(itemValue) => setquestion2_percentage(itemValue)}
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
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Question")} 3</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
        <TextInput
            placeholder={t("3 Ways to Optimize a model driven app to optimize its performance")}
            placeholderTextColor="grey"
            style={styles.input}
            value={question3}
            onChangeText={text => setquestion3(text)}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  selectedValue={question3_percentage}
  style={styles.picker}
  onValueChange={(itemValue) => setquestion3_percentage(itemValue)}
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
      <View style={styles.row}>
        <View style={styles.cell}>
         <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Question")} 4</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
          <TextInput
            placeholder={t("3 Ways to Optimize a model driven app to optimize its performance")}
            placeholderTextColor="grey"
            style={styles.input}
            value={question4}
            onChangeText={text => setquestion4(text)}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  selectedValue={question4_percentage}
  style={styles.picker}
  onValueChange={(itemValue) => setquestion4_percentage(itemValue)}
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
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Question")} 5</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
         <TextInput
            placeholder={t("3 Ways to Optimize a model driven app to optimize its performance")}
            placeholderTextColor="grey"
            style={styles.input}
            value={question5}
            onChangeText={text => setquestion5(text)}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  selectedValue={question5_percentage}
  style={styles.picker}
  onValueChange={(itemValue) => setquestion5_percentage(itemValue)}
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
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Question")} 6</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
         <TextInput
            placeholder={t("3 Ways to Optimize a model driven app to optimize its performance")}
            placeholderTextColor="grey"
            style={styles.input}
            value={question6}
            onChangeText={text => setquestion6(text)}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
        <Picker
  selectedValue={question6_percentage}
  style={styles.picker}
  onValueChange={(itemValue) => setquestion6_percentage(itemValue)}
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
      </View>
<TouchableOpacity onPress={handleSave} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>{t("Save")}</Text>
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
    fontFamily:"Roboto-Light",
  },
   buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 750, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonTextplus: {
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
    fontFamily:"Roboto-Light",
  },
});

export default MyComponent;