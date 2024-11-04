import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomAlert from '../components/CustomAlert';
import { MaterialIcons } from '@expo/vector-icons'; 
import DaysTimePickerModal from "../components/TimePicker 2";

const MAX_RESPONSE= 10;

function MyComponent({ onClose }) {
   const [topics, setTopics] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [completed, setCompleted] = useState('Yes');
  const [remark, setRemark] = useState('');
  const [draftData, setDraftData] = useState(null); 
   const [rating, setRating] = useState('Replan');
  const [selectedGuide, setSelectedGuide] = useState(null); // State for selected guide
  const [combinedOptions, setCombinedOptions] = useState([]); // State for picker options
  const [guidesToSend, setGuidesToSend] = useState([]); 
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')     
  const [isVisible, setIsVisible] = useState(true); 
  const [isChecked, setIsChecked] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [rating1, setRating1] = useState(" ");
  const [rating2, setRating2] = useState(" ");
  const [isModalVisible, setModalVisible] = useState(false);
  const [availableDays, setAvailableDays] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [data, setData] = useState({
    ai_analysis: [],
    guide: [],
    name: '',
    role: '',
    starting_level: '',
  });
  const [response, setResponse] = useState(Array.from({ length: 5 }, () => ({ response: '', title: '', percentage: '' })));
  const [items, setItems] = useState([
    { percentage: "0" }, 
    { percentage: "10" },
    { percentage: "20" },
     { percentage: "30" },
     { percentage: "40" },
     { percentage: "50" },
     { percentage: "60" },
     { percentage: "70" },
     { percentage: "80" },
     { percentage: "90" },
     { percentage: "100" },
  ]);

  const handlePercentageChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].percentage = value;
    setItems(updatedItems);
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })
        const {t}=useTranslation()

  const handlePressed = () => {

    onClose();
  };

  const handleConfirm = ({ date, startDateTime }) => {
    // Create a new Date object from the selected date
    const selectedDate = new Date(date);
  
    // Format the date to 'Day, Month Day, Year' (e.g., 'Fri, October 19, 2024')
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options); 
  
    // Function to format the time in 'hh:mm AM/PM' format
    const formatTime = (dateTime) => {
      const hours = dateTime.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
      const minutes = String(dateTime.getMinutes()).padStart(2, '0'); // Ensure two digits for minutes
      const period = dateTime.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM
      return `${hours}:${minutes} ${period}`;
    };
  
    // Format the start time
    const formattedStartTime = formatTime(startDateTime);
  
    // Update state with the selected date and formatted start time
    setAvailableDays([formattedDate]); // Store the formatted date including the day of the week
    setAvailableTimes(formattedStartTime); // Store only the start time
  
    // Close the modal
    setModalVisible(false);
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

        const response = await axios.get(`${apiUrl}/api/expert/skillAnalysis/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });

    if (response.status === 200) {
                const data = response.data.SkillAnalysis; // Access the SkillAnalysis property
              setTopics(data.topics || []);
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

  const handleToggleCheckbox = () => {
    setIsChecked(!isChecked);
    // Add any additional logic here, such as marking the task as completed
  };

  const handleTopicChange = (index, field, value) => {
    const newTopics = [...topics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    setTopics(newTopics);
  };

  const addResponse = () => {
    if (response.length < MAX_RESPONSE) {
      setResponse([...response, { response: '', title: '', percentage: '' }]);
    }
  };

  const updateResponse = (index, key, value) => {
    const newResponse = [...response];
    newResponse[index][key] = value; // Update the specific key
    setResponse(newResponse); // Update the state
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

  const fetchDraft = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
  
      // Check if token is available
      if (!token) {
        console.error('Token not found');
        return;
      }
  
      // Check if data exists and extract data_id and individual_id
      if (!data) {
        console.error('Data object is undefined');
        return;
      }
  
      const individual_id = String(data?.user_id);
      const data_id = String(data?.id);
  
      // Ensure that both data_id and individual_id are available
      if (!data_id || !individual_id) {
        console.error('Missing data_id or individual_id');
        return;
      }
  
      // Prepare request configuration
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      };
  
      // Make the GET request to /get-draft/{data_id}/{individual_id}
      const response = await axios.get(`${apiUrl}/api/expert/get-draft/${data_id}`, config);
  
      // Check if the response contains the expected structure
      if (response.data && response.data.status === "success" && response.data.Draft) {
        const draft = response.data.Draft;
  
        // Set the retrieved draft data
        setDraftData(draft);
        setRemark(draft.overall_feedback || '');
  
        // Map the additional field to the response state format
        const additionalData = draft.additional || [];
        const mappedResponses = additionalData.map(item => ({
          response: item.evaluation || '',
          title: item.topic || '',
          percentage: item.score || '',
        }));
  
        setResponse(mappedResponses);
  
        console.log('Draft retrieved successfully:', draft);
      } else {
        console.warn('No matching draft with the given data.id or unexpected response structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching draft:', error);
    }
  };
  
  useEffect(() => {
    fetchDraft();
  }, [data]);
  
  
  
  const createDraft = async () => {
    const apiEndpoint = `${apiUrl}/api/expert/create-draft`;

    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('user_id');

      if (!token || !userId) {
        console.error('Token or user_id not found');
        setAlertMessage('Token or user ID is missing');
        setAlertVisible(true);
        return;
      }

      const currentResponses = response; // Your state variable

      // Check if currentResponses is defined and is an array
      if (!Array.isArray(currentResponses)) {
        console.error('Response is not an array');
        setAlertMessage('Response data is not valid');
        setAlertVisible(true);
        return;
      }

      const payload = {
        user_id: userId,
        overall_feedback: remark,
        individual_id: String(data?.user_id),
          data_id: String(data?.id),
        additional: currentResponses.map(item => ({
          topic: item.title,
          evaluation: item.response,
          score: item.percentage
        })),
        set_date: null
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const apiResponse = await axios.post(apiEndpoint, payload, config);
      console.log('Draft created successfully:', apiResponse.data);

      // Set alert message for success
      setAlertMessage('Draft Created Successfully');
      setAlertVisible(true);

    } catch (error) {
      console.error('Error creating draft:', error);
      setAlertMessage('Error creating draft');
      setAlertVisible(true);
    }
  };

  // Transform data.guide into an array of descriptions and percentages
  const descriptions = data?.guide?.map(item => ({
    description: item.description,
    percentage: item.percentage,
  })) || [];

  const expert_analysis = response.map(item => ({
    point: item.title,        // Mapping 'title' to 'point'
    description: item.response, // Mapping 'response' to 'description'
    percentage: item.percentage // 'percentage' stays the same
  }));
  
  const handlePress = async () => {
    if (!remark || !topics || !rating) {
      setAlertMessage(t('Please fill all fields'));
      setAlertVisible(true);
      return;
    }
  
    setIsChecked(!isChecked);
  
    try {
      const token = await AsyncStorage.getItem('token');
      const expertid = await AsyncStorage.getItem('user_id'); // Retrieve expertid from AsyncStorage
      if (!token || !expertid) throw new Error('Token or expert ID not found');
  
      const payload = {
        jobseeker_id: String(data?.user_id),
        skill_analysis_id: String(data?.id),
        remark: remark,
        expert_name: `${firstName} ${lastName}`,
        rating: rating,
        completed: completed,
        role: data?.role,
        types: data?.type,
        starting_level: data?.starting_level,
        target_level: data?.target_level,
        date: data?.date_time,
        expert: data?.name,
        expert_analysis,
        descriptions,
      };
  
      // POST request for feedback
      const response = await axios.post(`${apiUrl}/api/expert/feedback-skillAnalysis`, payload, {
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
  
          const newBalance = currentBalance + 20; // Add 50 to the current balance
  
          // PUT request to update the balance
          const updateBalanceResponse = await axios.put(`${apiUrl}/api/expert/edit-balance`, {
            total_balance: newBalance,  
            withdrawal: "0",  
            new_payment: 20,  
            paid_by: data?.name, 
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (updateBalanceResponse.status === 200) {
            console.log('Balance updated successfully');
  
              // Ensure guidesToSend is properly structured for your backend
              const formattedGuides = guidesToSend.map(guide => guide.guide);

            // Second API Call: Create Growth Plan for Jobseeker
       const formData = {
  role: data?.role,
  title: data?.type,
  starting_level: data?.starting_level,
  target_level: data?.target_level,
  date_time: `${availableDays[0]} | ${availableTimes}`, // e.g., "Friday, October 19, 2024 | 10:00 AM - 11:00 AM"
  feedbacks: remark,
  expert_available_days: availableDays[0].split(',')[0], // Only the day of the week
  expert_available_time: availableTimes,
  coach: `${firstName} ${lastName}`,
  expertid: expertid, // From AsyncStorage
  name: data?.name,
  guide: formattedGuides 
};
  
            const growthPlanResponse = await axios.post(`${apiUrl}/api/expert/create-growthplan-for-jobseeker/${data?.user_id}`, formData, {
              headers: { Authorization: `Bearer ${token}` },
            });
  
            if (growthPlanResponse.status === 201) {
              console.log('Growth plan created successfully');
            } else {
              console.error('Failed to create growth plan', growthPlanResponse);
            }
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
  
  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${apiUrl}/api/expert/growthplan/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          const data = response.data.growthPlan;

          // Combine levels and specializations into picker options
          const combinedOptions = data.map(item => ({
            label: `${item.level} ${item.specialization}`,
            guides: item.guides // Keep the entire guides array for filtering later
          }));

          setCombinedOptions(combinedOptions); // Set picker options

          // Set initial selected value if there are options
          if (combinedOptions.length > 0) {
            setSelectedGuide(combinedOptions[0]); // Set to the first option by default
            setGuidesToSend(combinedOptions[0].guides); // Set guides for the first option
          }
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadFormData();
  }, []);

  const handleValueChange = (itemValue) => {
    const selectedOption = combinedOptions.find(option => option.label === itemValue);
    setSelectedGuide(selectedOption); // Update the selected guide
    setGuidesToSend(selectedOption.guides); // Update guides to send based on selection

    // Log the selected guides to the console
    console.log('Selected guides:', selectedOption.guides);
    
    // Save the selected guides to AsyncStorage if needed
    AsyncStorage.setItem('selectedGuides', JSON.stringify(selectedOption.guides))
      .then(() => console.log('Guides saved successfully'))
      .catch(error => console.error('Failed to save guides to AsyncStorage', error));
  };


  const hideAlert = () => {
    setAlertVisible(false);
  };

  if (!isVisible) {
    return null; // Return null to unmount the parent component
  }
  
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center'  }}>
       <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("Scheduled Skill Analysis Sessions")}</Text>
       
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
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Candidate Starting Level")}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{data?.starting_level}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style = {{fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Candidate Target Level")}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: 'grey',fontFamily:"Roboto-Light"}}>{data?.target_level}</Text>
        </View>
      </View>
         
      
      
    </View>
     
  <Text style={{ marginLeft: 50, fontWeight: 'bold', marginTop: 50, marginBottom: -20 }}>{t("AI Analysis")}</Text>

          <View style={[styles.container, { marginBottom: 30 }]}>
            {data?.ai_analysis && data.ai_analysis.length > 0 ? (
              data.ai_analysis.map((analysis, index) => (
                <View style={styles.row} key={index}>
                  <View style={[styles.cell, { flex: 0.5 }]}>
                    <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                      {index + 1}.
                    </Text>
                  </View>
                  <View style={[styles.cell, { flex: 5 }]}>
                    <TextInput
                      placeholder={t("AI Analysis Description")}
                      placeholderTextColor="grey"
                      style={styles.input}
                      editable={false}
                      value={analysis}
                    />
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>
                not available
              </Text>
            )}
          </View>
  

   <Text style={{ marginLeft: 50, fontWeight: 'bold', marginTop: 20, marginBottom: -20 }}>{t("Skill Analysis Guide")}</Text>

  <View style={styles.container}>
    {data?.guide && data.guide.length > 0 ? (
      data.guide.map((item, index) => (
        <View style={styles.row} key={index}>
          <View style={[styles.cell, { flex: 0.5 }]}>
            <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{index + 1}.</Text>
          </View>
          <View style={[styles.cell, { flex: 5 }]}>
            <TextInput
              placeholder={t("Topic")}
              placeholderTextColor="grey"
              style={styles.input}
              editable={false}
              value={item.topic}
            />
          </View>
          <View style={[styles.cell, { flex: 1 }]}>
            <Picker
              style={styles.picker}
            >
            <Picker.Item label="Select Score" value="Select Score" />
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
      ))
    ) : (
      <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>
        not available
      </Text>
    )}
  </View>



  <View style={{ flexDirection: 'row' }}>
     <View style={{ flexDirection: 'column' }}>
      <Text style={{ marginLeft: 50, fontWeight: 'bold', marginTop: 50, fontSize: 14, marginBottom: -10 }}>{t("Additional")}</Text>
     </View>
      
    </View>

    <View style={styles.container}>
      {response.map((response, index) => (
        <View key={index} style={styles.row}>
          <View style={[styles.cell, { flex: 0.5 }]}>
            <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t(``)} {index + 1}</Text>
          </View>
          <View style={[styles.cell, { flex: 2 }]}>
            <TextInput
              placeholder={t("Topic")}
              placeholderTextColor="grey"
              style={styles.input}
              value={response.title}
              onChangeText={text => updateResponse(index, 'title', text)}
            />
          </View>
          <View style={[styles.cell, { flex: 5 }]}>
            <TextInput
              placeholder={t("Evaluation")}
              placeholderTextColor="grey"
              style={styles.input}
              value={response.response}
              onChangeText={text => updateResponse(index, 'response', text)}
            />
          </View>
          <View style={[styles.cell, { flex: 1 }]}>
            <Picker
              selectedValue={response.percentage}
              style={styles.picker}
              onValueChange={(itemValue) => updateResponse(index, 'percentage', itemValue)}
            >
              <Picker.Item label="score" value="score" />
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

          <TouchableOpacity onPress={() => deleteResponse(index)} style={{padding: 5}}>
            <Text style={{color: 'grey', fontSize: 16, marginTop: 5, fontWeight: 600}}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>

  <TouchableOpacity
    style={[styles.buttonplus, response.length >= MAX_RESPONSE && styles.buttonplusDisabled, isPressed && styles.buttonplusPressed]}
    onPress={addResponse}
    onPressIn={handlePressIn}
    onPressOut={handlePressOut}
    disabled={response.length >= MAX_RESPONSE}
  >
    <Text style={styles.buttonTextplus}>Add More</Text>
  </TouchableOpacity>




  
  <Text style={{ marginTop: 30, fontWeight: 'bold', color: 'black', marginLeft: 50  }}> {t("Overall Feedback")}</Text>
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

    <Text style={{ marginTop: 30, marginBottom: -15, fontWeight: 'bold', color: 'black', marginLeft: 50  }}> {t("Remark")}</Text>

    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.cell, { flex: 5 }]}>
          <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
            {t("Move candidate to the next level?")}
          </Text>
        </View>
        <View style={[styles.cell, { flex: 1 }]}>
          <Picker
            selectedValue={rating1}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setRating1(itemValue);
              setRating2(" "); // Reset the second rating when the first one changes
            }}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>

      {/* Show the second question only if the first rating is "Yes" */}
      {rating1 === "Yes" && (
        <View style={styles.row}>
          <View style={[styles.cell, { flex: 5 }]}>
            <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
              {t("Are you continuing your growth plan with this candidate?")}
            </Text>
          </View>
          <View style={[styles.cell, { flex: 1 }]}>
            <Picker
              selectedValue={rating2}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setRating2(itemValue);
              }}
            >
              <Picker.Item label=" " value=" " />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
        </View>
      )}

      {/* Show the third question only if the second rating is "Yes" */}
      {rating1 === "Yes" && rating2 === "Yes" && (
        <View style={styles.row}>
          <View style={[styles.cell, { flex: 5 }]}>
            <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
              {t("Choose the appropriate growth plan profile")}
            </Text>
          </View>
          <View style={[styles.cell, { flex: 1 }]}>
          <Picker
        style={styles.picker}
        selectedValue={selectedGuide?.label} // Bind to selectedGuide state
        onValueChange={handleValueChange} // Trigger on value change
      >
        {combinedOptions.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.label} />
        ))}
      </Picker>
          </View>
        </View>
      )}

      {/* Show the date and time selection only if the second rating is "Yes" */}
      {rating1 === "Yes" && rating2 === "Yes" && (
        <View style={styles.row}>
          <View style={[styles.cell, { flex: 5 }]}>
            <Text style={{ fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
              {t("Set date and time for Growth Plan")}
            </Text>
          </View>
          <View style={[styles.cell, { flex: 1 }]}>
            <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
              <Text style={{ fontFamily: "Roboto-Light", color: 'black', textDecorationLine: 'underline', fontStyle: 'italic' }}>
                Select: {availableDays} {availableTimes}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      </View>

      {/* Show the DaysTimePickerModal only when isModalVisible is true */}
      {isModalVisible && (
        <View style={[styles.container, { marginTop: 50, borderRadius: 20, backgroundColor: '#F5F5F5' }]}>
          <DaysTimePickerModal
            isVisible={isModalVisible} // Control visibility
            onConfirm={handleConfirm}
            onCancel={() => setModalVisible(false)}
          />
        </View>
      )}
    

  
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
         {isChecked ? "Completed       " : "Mark as completed"}
       </Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles.buttonAcc}>

     </TouchableOpacity>
     
      <TouchableOpacity style={styles.buttonAcc2} onPress={handlePress}>
        <Text style={styles.buttonText}>{t("Save and send")}</Text>
      </TouchableOpacity>

    </View>
  <Text style={{ marginLeft: 50, color: 'grey', fontWeight: '600', marginBottom: 100, fontStyle: 'italic' }}>{t("When you mark as completed then click save and send you will no longer able to edit or review this session")}</Text>


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
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: '#F8F8F8',
    color:'grey',
    fontSize: 14,
    outline: 'black',
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonAcc: {
     backgroundColor: '#F8F8F8',
      padding: 10,
      marginTop: 30,
      marginLeft: 350, 
      marginRight: 10,
      width: 120,
      paddingHorizontal: 5,
      marginBottom: 20,
      borderRadius: 5
    },
  buttonAcc2: {
   backgroundColor: 'coral',
    padding: 10,
    marginTop: 30,
    marginLeft: 20, 
    marginRight: 70,
    width: 120,
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
  buttonTextplus: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
  },
  greenBox: {
    width: 920,
    marginBottom: 50,
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
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    marginLeft: 50,
    width: 120,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10
  },
  buttonplusDisabled: {
    backgroundColor: 'grey',
  },
});

export default MyComponent;       