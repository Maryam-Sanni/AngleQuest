import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Picker, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';
import { WebView } from 'react-native-webview';

const MAX_RESPONSE= 10;

function MyComponent({ onClose }) {
   const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState(Array.from({ length: 5 }, () => ({ response: '', title: '' })));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [completed, setCompleted] = useState('Yes');
  const [skill_analysis_id, setskill_analysis_id] = useState('');
  const [remark, setRemark] = useState('');
  const [rating, setRating] = useState('Replan');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')     
  const [isVisible, setIsVisible] = useState(true); 
  const [data, setData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [cvModalVisible, setCvModalVisible] = React.useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleViewCv = () => {
    if (data?.cv) {
      // Append a file download parameter or ensure correct URL
      const fileUrl = data.cv.endsWith('/') ? `${data.cv}cv.pdf` : data.cv;
      Linking.openURL(fileUrl).catch((err) => console.error("Failed to open URL:", err));
    }
  };
  
   const apiUrl = process.env.REACT_APP_API_URL;
  
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })
  
        const {t}=useTranslation()

  const handleToggleCheckbox = () => {
    setIsChecked(!isChecked);
    // Add any additional logic here, such as marking the task as completed
  };
  
  const handlePressed = () => {
    onClose();
  };

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
  
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${apiUrl}/api/expert/interview/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          const data = response.data.interview;
          setQuestions(data.questions|| []);
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    const retrieveExpertName = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('first_name');
        const storedLastName = await AsyncStorage.getItem('last_name');
        if (storedFirstName && storedLastName) {
          setFirstName(storedFirstName);
          setLastName(storedLastName);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    loadFormData();
    retrieveExpertName();
    }, []);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const addResponse = () => {
    if (response.length < MAX_RESPONSE) {
      setResponse([...response, { response: '', percentage: '' }]);
    }
  };

  const updateResponse = (index, key, value) => {
    const newResponse = [...response];
    newResponse[index][key] = value;
    setResponse(newResponse);
  };

  const deleteResponse = (index) => {
    const newResponse = response.filter((_, i) => i !== index);
    setResponse(newResponse);
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  
  const handlePress = async () => {
    if (!remark || !rating) {
      setAlertMessage(t('Please fill all fields'));
      setAlertVisible(true);
      return;
    }

    setIsChecked(!isChecked);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const payload = {
      jobseeker_id: data?.user_id,
        interview_id: String(data?.id),
        remark: remark,
        expert_name: `${firstName} ${lastName}`,
        rating: rating,
        completed: completed,
        level: data?.name,
        company: data?.company,
        date: data?.date_time,
        time: data?.date_time,
        score: rating,
        role: data?.role,
        descriptions: questions.map(question => ({
          description: question.question,
          percentage: question.percentage,
        })),
      };

      // POST request for feedback
      const response = await axios.post(`${apiUrl}/api/expert/feedback-interview`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201 && response.data.status === 'success') {
        console.log('Marked as completed successfully');

        // GET current balance
        const balanceResponse = await axios.get(`${apiUrl}/api/expert/get-balance`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (balanceResponse.status === 200 && balanceResponse.data && balanceResponse.data.bal) {
          const currentBalance = balanceResponse.data.bal.total_balance !== null 
            ? parseInt(balanceResponse.data.bal.total_balance, 10) 
            : 0; // Default to 0 if total_balance is null

          const newBalance = currentBalance + 50; // Add 50 to the current balance

          // PUT request to update the balance
          const updateBalanceResponse = await axios.put(`${apiUrl}/api/expert/edit-balance`, {
            total_balance: newBalance, 
            withdrawal: "0",  
            new_payment: 50,  
            paid_by: data?.name, 
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (updateBalanceResponse.status === 200) {
            console.log('Balance updated successfully');
          } else {
            console.error('Failed to update balance', updateBalanceResponse);
          }
        } else {
          console.error('Failed to retrieve current balance', balanceResponse);
        }

      } else {
        console.error('Failed to mark as completed', response);
      }
    } catch (error) {
      console.error('Error marking as completed', error);
    } finally {
      onClose();
    }
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  if (!isVisible) {
    return null; // Return null to unmount the parent component
  }
  
  
  return (
     
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40}}>
       <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("Scheduled Interview Meetings")}</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View>
  <Text style={{marginLeft: 730, marginTop: 20, marginBottom: -15, width: 200, fontWeight: '600'}}>{t("Uneditable Section")}</Text>
 <View style={styles.container}>
 <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Name")}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{data?.name}</Text>
        </View>
      </View>
   <View style={styles.row}>
     <View style={styles.cell}>
       <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Company")}</Text>
     </View>
     <View style={styles.cell}>
       <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{data?.company}</Text>
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
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("CV")}</Text>
        </View>
        <TouchableOpacity onPress={handleViewCv} style={styles.cell}>
           <Text style={{color: 'blue', textDecorationLine: 'underline', fontFamily:"Roboto-Light"}}>{data?.cv}</Text>
        </TouchableOpacity>
      </View>
      
         
      
      
    </View>
     
  <Text style={{ marginLeft: 50, fontWeight: 'bold', marginTop: 20, marginBottom: -20 }}>{t("Interview Scoring")}</Text>

  <View style={styles.container}>
    {questions.map((question, index) => (
      <View style={styles.row} key={index}>
        <View style={[styles.cell, { flex: 2 }]}>
          <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Question")} {index + 1}</Text>
        </View>
        <View style={[styles.cell, { flex: 5 }]}>
          <TextInput
            placeholder={t("Question description")}
            placeholderTextColor="grey"
            style={styles.input}
             editable={false}
            value={question.question}
            onChangeText={text => handleQuestionChange(index, 'question', text)}
          />
        </View>
        <View style={[styles.cell, { flex: 2 }]}>
          <Picker
            selectedValue={question.percentage}
            style={styles.picker}
            onValueChange={(itemValue) => handleQuestionChange(index, 'percentage', itemValue)}
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
      onPress={() => setQuestions([...questions, { question: '', percentage: '0' }])}
      style={styles.addButton}
    >

    </TouchableOpacity>
  </View>

  <View style={{ flexDirection: 'row' }}>
     <View style={{ flexDirection: 'column' }}>
      <Text style={{ marginLeft: 50, fontWeight: 'bold', marginTop: 50, fontSize: 14, }}>{t("Create Personalised Roadmap")}</Text>
     <Text style={{ marginLeft: 50, fontSize: 12, marginTop: 5, fontStyle: 'italic' }}>{t("(Insert maximum of 10)")}</Text>
     </View>
      <TouchableOpacity
        style={[styles.buttonplus, response.length >= MAX_RESPONSE && styles.buttonplusDisabled, isPressed && styles.buttonplusPressed]}
        onPress={addResponse}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={response.length >= MAX_RESPONSE}
      >
        <Text style={styles.buttonTextplus}>+</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.container}>
      {response.map((response, index) => (
        <View key={index} style={styles.row}>
          <View style={[styles.cell, { flex: 0.5 }]}>
            <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t(``)} {index + 1}</Text>
          </View>
          <View style={[styles.cell, { flex: 2 }]}>
            <TextInput
              placeholder={t("Title")}
              placeholderTextColor="grey"
              style={styles.input}
              value={response.title}
              onChangeText={text => updateResponse(index, 'title', text)}
            />
            </View>
            <View style={[styles.cell, { flex: 5 }]}>
            <TextInput
              placeholder={t("Description")}
              placeholderTextColor="grey"
              style={styles.input}
              value={response.response}
              onChangeText={text => updateResponse(index, 'response', text)}
            />
          </View>

          <TouchableOpacity onPress={() => deleteResponse(index)} style={styles.deleteButton}>
            <Text style={{color: 'red', fontSize: 18, fontWeight: 600}}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  
  <Text style={{ marginTop: 30, fontWeight: 'bold', color: 'black', marginLeft: 50  }}> {t("Overall Feedback/Remark")}</Text>
                <View style={{ marginLeft: 50, marginRight: 70, marginTop: 5 }}>
                  <TextInput
                    style={{ padding: 6, fontSize: 14, fontWeight: 'normal', color: 'black', borderWidth: 1, outline: 'black', borderColor: 'black', height: 150  }}
                    placeholder="e.g: Your goals and its description are clear and concise. Well done for that. I am satisfied with this set goals and I am more than happy to work with you to the finish line.  See you in our one-one session where I'll share further tips on how to achieve this feat and above all meet you."
                    value={remark}
                    placeholderTextColor="grey"
                     multiline={true}
                    onChangeText={text => setRemark(text)}
                  />
                  </View>

    <Text style={{ marginTop: 30, marginBottom: -15, fontWeight: 'bold', color: 'black', marginLeft: 50  }}> {t("Rating")}</Text>
  <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Performance Rating")}</Text>
          </View>
          <View style={styles.cell}>
          <Picker
            selectedValue={rating}
             style={styles.picker}
             onValueChange={(itemValue) => setRating(itemValue)}
  >     
    <Picker.Item label="Replan" value="Replan" />
    <Picker.Item label="Fair" value="Fair" />
    <Picker.Item label="Good" value="Good" />
    <Picker.Item label="Brilliant" value="Brilliant" />
  </Picker>
          </View>
          </View>
          </View>
  <View style={{flexDirection: 'row'}}>

    <TouchableOpacity style={styles.checkcontainer} onPress={handleToggleCheckbox}>
      <Image
        source={{
          uri: isChecked 
            ? 'https://img.icons8.com/?size=100&id=59755&format=png&color=000000' // Checked icon
            : 'https://img.icons8.com/?size=100&id=83310&format=png&color=000000' // Unchecked icon
        }}
        style={{ width: 24, height: 24, marginRight: 10 }}
      />
      <Text style={[styles.text, isChecked && styles.textChecked]}>
        {isChecked ? "Completed" : "Mark as completed"}
      </Text>
    </TouchableOpacity>

      <TouchableOpacity style={styles.buttonAcc} onPress={handlePress}>
        <Text style={styles.buttonTextAcc}>{t("Save")}</Text>
      </TouchableOpacity>

    </View>
       <Text style={{ marginLeft: 50, color: 'grey', fontWeight: '600', marginBottom: 20, marginTop: 10 }}>{t("When you mark as completed and save you will no longer able to edit or review this section")}</Text>


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
    marginTop: 30, 
    marginLeft: 50 
  },
  checkcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 40
  },
    text: {
      fontSize: 16,
      color: 'gray',
    },
    textChecked: {
      color: 'green',
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
  buttonAcc: {
     backgroundColor: 'coral',
      padding: 10,
      marginTop: 30,
      marginLeft: 480, 
      marginRight: 70,
      width: 150,
      paddingHorizontal: 5,
      marginBottom: 20,
      borderRadius: 5
    },
    buttoncomplete: {
     backgroundColor: 'darkgreen',
      padding: 10,
      marginTop: 30,
      marginLeft: 50, 
      paddingHorizontal: 5,
      marginBottom: 20,
      borderRadius: 5,
       width: 150,
    },
    buttonTextAcc: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
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
  greenBox: {
    width: 920,
    height:300,
    backgroundColor: '#F8F8F8',
  },
  input: {
    outline: 'none',
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
    marginLeft: 500,
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
  buttonplusDisabled: {
    backgroundColor: 'red',
  },
});

export default MyComponent;