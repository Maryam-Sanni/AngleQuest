import React, { useState,  useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, Modal  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import SuggestionModal from '../components/Suggestion';
import HelpModal from '../components/Help';
import OpenModal2 from '../Experts/GProfile';
import {useFonts} from "expo-font"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { formatDistanceToNow, format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import CustomModal from './TourGuide';

const defaultAvatar = require("../assets/account.png");

const HomePage = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isHovered7, setIsHovered7] = useState(false);
  const [isHovered8, setIsHovered8] = useState(false);
  const [isHovered9, setIsHovered9] = useState(false);
  const [isHovered10, setIsHovered10] = useState(false);
  const [isHovered11, setIsHovered11] = useState(false);
  const [isHovered12, setIsHovered12] = useState(false);
  const [isHovered13, setIsHovered13] = useState(false);
  const [isHovered14, setIsHovered14] = useState(false);
  const [isHovered15, setIsHovered15] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [helpmodalVisible, sethelpModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [custommodalVisible, setCustomModalVisible] = useState(false);
  const navigation = useNavigation();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
   const [data, setData] = useState([]);
  const [plandata, setplanData] = useState({
      latestGrowthPlan: {},
      latestInterview: {},
      latestSkillAnalysis: {}
  })
 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token retrieved:", token);

      if (token) {
        const response = await axios.get(
          "https://recruitangle.com/api/expert/getAllJobSeekers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data);
        const result = response.data.allJobSeekers;

        // Retrieve all last messages and timestamps in parallel
        const chatDataPromises = result.map(item =>
          AsyncStorage.getItem(`lastMessage_${item.id}`)
        );
        const chatData = await Promise.all(chatDataPromises);

        // Process and format data
        const formattedData = result.map((item, index) => {
          const { lastMessage = "No messages", timestamp = new Date().toISOString() } = chatData[index] ? JSON.parse(chatData[index]) : {};

          // Determine the time format
          const now = new Date();
          const messageDate = new Date(timestamp);
          let timeFormatted = '';

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);

          if (messageDate >= today) {
            timeFormatted = format(messageDate, 'h:mm a', { locale: enGB });
          } else if (messageDate >= yesterday) {
            timeFormatted = 'Yesterday';
          } else {
            timeFormatted = format(messageDate, 'MMM dd, yyyy', { locale: enGB });
          }

          return {
            id: item.id.toString(), // Ensure id is a string
            name: `${item.first_name} ${item.last_name}`,
            avatar: item.avatar_url ? { uri: item.avatar_url } : defaultAvatar,
            message: lastMessage,
            time: timeFormatted,
            timestamp: messageDate, // Include timestamp for sorting
            messagecount: "0",
            hub: "Hub Members",
          };
        });

        // Sort the data by timestamp in descending order
        formattedData.sort((a, b) => b.timestamp - a.timestamp);

        setData(formattedData);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    // Show the CustomModal when the component mounts
    setCustomModalVisible(true);
  }, []);

  
  useEffect(() => {
    // Retrieve first_name and last_name from AsyncStorage
    const retrieveData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('first_name');
        const storedLastName = await AsyncStorage.getItem('last_name');
        if (storedFirstName !== null && storedLastName !== null) {
          console.log('Stored first_name:', storedFirstName);
          console.log('Stored last_name:', storedLastName);
          setFirstName(storedFirstName);
          setLastName(storedLastName);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };
  
    retrieveData();
  }, []);

  const openUser = (userId) => {
    navigation.navigate('Messaging', { userId });
  };
  
  const handleCloseModal = () => {
    setCustomModalVisible(false);
  };

  const goToMessages = () => {
    navigation.navigate('Messaging');
  };

  const goToManageHubs = () => {
    navigation.navigate('Manage Hubs');
  };
 
  const goToWithdrawal = () => {
    navigation.navigate('Withdrawal');
  };

  const goToInterview = () => {
    navigation.navigate('Interview');
  };

  const goToAdvice = () => {
    navigation.navigate('Advice');
  };
 
  const goToGrowth = () => {
    navigation.navigate('Growth Plan');
  };
  
  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };

  const [fontsLoaded]=useFonts({
"Roboto-Light":require("../assets/fonts/Roboto-Light.ttf")
  });

const {t}=useTranslation()

  async function fetchAllData() {
      try {
          const token = await AsyncStorage.getItem('token');
          const storedExpertId = await AsyncStorage.getItem('user_id');

          if (!token || !storedExpertId) {
              console.error('No token or user ID found');
              return;
          }

          const headers = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          };

          // Fetch all data concurrently
          const [growthPlanResponse, interviewResponse, skillAnalysisResponse] = await Promise.all([
              fetch('https://recruitangle.com/api/jobseeker/get-all-jobseeker-growthplan', { headers }),
              fetch('https://recruitangle.com/api/jobseeker/get-all-jobseeker-interview', { headers }),
              fetch('https://recruitangle.com/api/jobseeker/get-all-jobseeker-skillanalysis', { headers })
          ]);

          // Check if responses are OK
          if (!growthPlanResponse.ok) {
              throw new Error(`Growth Plan API responded with status ${growthPlanResponse.status}`);
          }
          if (!interviewResponse.ok) {
              throw new Error(`Interview API responded with status ${interviewResponse.status}`);
          }
          if (!skillAnalysisResponse.ok) {
              throw new Error(`Skill Analysis API responded with status ${skillAnalysisResponse.status}`);
          }

          // Parse JSON responses
          const growthPlanData = await growthPlanResponse.json();
          const interviewData = await interviewResponse.json();
          const skillAnalysisData = await skillAnalysisResponse.json();

          // Log the raw data for debugging
          console.log('Raw Growth Plan Data:', growthPlanData);
          console.log('Raw Interview Data:', interviewData);
          console.log('Raw Skill Analysis Data:', skillAnalysisData);

          // Check and filter data based on storedExpertId
          const filteredGrowthPlan = (growthPlanData.allGrowthPlan || []).filter(plan => plan.expertid === storedExpertId);
          const filteredInterview = (interviewData.allInterview || []).filter(entry => entry.expertid === storedExpertId);
          const filteredSkillAnalysis = (skillAnalysisData.skillAnalysis || []).filter(entry => entry.expertid === storedExpertId);

          // Log the filtered data for debugging
          console.log('Filtered Growth Plan Data:', filteredGrowthPlan);
          console.log('Filtered Interview Data:', filteredInterview);
          console.log('Filtered Skill Analysis Data:', filteredSkillAnalysis);

          // Process the latest entries
          const latestGrowthPlan = processLatestEntry(filteredGrowthPlan, 'name', 'date_time');
          const latestInterview = processLatestEntry(filteredInterview, 'name', 'date_time');
          const latestSkillAnalysis = processLatestEntry(filteredSkillAnalysis, 'name', 'date_time');

          // Log the processed latest data for debugging
          console.log('Latest Growth Plan:', latestGrowthPlan);
          console.log('Latest Interview:', latestInterview);
          console.log('Latest Skill Analysis:', latestSkillAnalysis);

          return {
              latestGrowthPlan,
              latestInterview,
              latestSkillAnalysis
          };
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }


  const processLatestEntry = (entries, nameField, dateTimeField) => {
      if (!entries || entries.length === 0) return {};

      // Log the raw entries for debugging
      console.log('Raw Entries:', entries);

      // Parse the date_time field to Date objects
      const parsedEntries = entries.map(entry => ({
          ...entry,
          [dateTimeField]: new Date(entry[dateTimeField])  // Convert date_time to Date object
      }));

      // Log parsed entries for debugging
      console.log('Parsed Entries:', parsedEntries);

      // Sort entries by date_time in descending order
      parsedEntries.sort((a, b) => b[dateTimeField] - a[dateTimeField]);

      // Log sorted entries for debugging
      console.log('Sorted Entries:', parsedEntries);

      // Return the latest entry's name and formatted date_time
      return {
          name: parsedEntries[0][nameField] || 'No Name Available', // Default to 'No Name Available' if name is null or undefined
          dateTime: formatDate(parsedEntries[0][dateTimeField].toISOString())
      };
  }

  // Formatting function
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Use Intl.DateTimeFormat for consistent formatting
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date);
    const time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(date);

    return `${month} ${day} | ${time}`;
  }

  useEffect(() => {
      fetchAllData().then(fetchedData => {
          if (fetchedData) {
              console.log('Fetched Data for State:', fetchedData);
              setplanData(fetchedData);
          }
      });
  }, []);
  
  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
  style={{ height: '120%', width: '100%',flex: 1}}
>
  <View style={{ flex: 1 }}>
    <Topbar /> 
    <View style={{ flexDirection: 'row', flex: 1}}>
      <Sidebar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500}}>
           <View style={styles.container}>
           <View style={{flexDirection: 'row' }}>
           <Image
        source={{
          uri:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
        }}
        style={{ width: 40, height: 40, marginTop: -5}}
      />
     ` <Text style={styles.greeting}>{t('Good Day')}, {first_name} {last_name}</Text>`
      <View style={styles.circle}>
        <Text style={styles.circleText}>12</Text>
        </View>
      </View>
      <TouchableOpacity>
      <Text style={{color: '#63EC55', fontSize: 14, textDecoration: 'underline', marginTop: -5, marginLeft: 50, marginBottom: 30,fontFamily:"Roboto-Light"}}>{t("Share your profile on Linkedln")}</Text>
      </TouchableOpacity>
      <View style={styles.mainContent}>
      <View style={styles.messageBox}>
      <BlurView intensity={50} style={styles.blurBackground}>
      <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/chat.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold', fontFamily:"Roboto-Light"}}>{t("Chats")}</Text>
          </View>
                <Text style={styles.hubTitle}>All Hubs</Text>
        {data.slice(0, 5).map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', marginTop: 15 }}>
            <Image source={item.avatar} style={styles.image} />
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => openUser(item.id)}>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 15, fontFamily: "Roboto-Light" }}>
                  {item.name}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 13, marginTop: 5, width: 150, height: 15, fontFamily: "Roboto-Light" }}
                  numberOfLines={1}  // Limit to 1 line
                  ellipsizeMode="tail"  // Show "..." at the end if the text is too long
                >
                  {item.message}
                </Text>
              </TouchableOpacity>
              <Text style={{ color: 'lightgrey', fontSize: 12, marginTop: 3, fontFamily: "Roboto-Light" }}>
                {item.time}
              </Text>
            </View>
          </View>
        ))}
          <Text style={{color: 'white', fontSize: 13, marginTop: 10, textDecoration: 'underline', marginLeft: 140,fontFamily:"Roboto-Light"}}>{t("see more")}</Text>
          <View style={{ borderBottomWidth: 2, borderBottomColor: 'white', marginTop: 10, marginLeft: 20, marginRight: 20 }} />
          
         
 
          <TouchableOpacity onPress={goToMessages} 
          style={[
            styles.touchablechat,
            isHovered1 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <Text style={styles.touchableText}>{t("See All Chats")}</Text>
          </TouchableOpacity>
          </BlurView>
          </View>

        <View style={styles.sideColumn}>
          <View style={styles.greenBorderedBox}>
          <BlurView intensity={50} style={styles.blurBackground}>
          <View style={{flexDirection: 'row', }}>
          <View style={{flexDirection: 'column', marginTop: 20, width: 350, marginLeft: 30 }}>
          <Text style={{fontSize: 24, color: '#63EC55', fontWeight: 'bold', marginTop: 12,fontFamily:"Roboto-Light"  }}>{t("Are you passionate about lifting others in your field to their next level?")}</Text>
          <TouchableOpacity onPress={handleOpenPress2} 
          style={[
          styles.touchablebegin,
          isHovered2 && styles.touchableOpacityHovered
        ]}
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
      >
          <Text style={styles.touchableTextbegin}>{t("Get Started")}</Text>
          </TouchableOpacity>
         
         
          
          
          </View>
          <Image
                  source={require('../assets/passion.png')}
                  style={styles.imageback}
                />
                </View>
         
          </BlurView>
          </View>

          <View style={styles.greenBox}>
          <BlurView intensity={80} style={styles.blurBackground}>

            <Text style={{fontSize: 18, color: '#63EC55', marginTop: 50, marginLeft: 50, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Activities")}</Text>
          <View style={{flexDirection: 'row'}}>
          <View style={styles.greenwhitebox2}> 
<View style={{flexDirection: 'row', alignSelf: 'center' }}>
<TouchableOpacity onPress={goToManageHubs} 
style={[
  styles.touchablerate,
  isHovered5 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered5(true)}
onMouseLeave={() => setIsHovered5(false)}
>
          <Text style={styles.touchableTextrate}>{t("Hubs")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToGrowth} 
          style={[
            styles.touchablerate,
            isHovered6 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered6(true)}
          onMouseLeave={() => setIsHovered6(false)}
          >
          <Text style={styles.touchableTextrate}>{t("Growth plan")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToInterview} 
          style={[
            styles.touchablerate,
            isHovered7 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered7(true)}
          onMouseLeave={() => setIsHovered7(false)}
          >
          <Text style={styles.touchableTextrate}>{t("Interview")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToAdvice} 
          style={[
            styles.touchablerate,
            isHovered8 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered8(true)}
          onMouseLeave={() => setIsHovered8(false)}
          >
          <Text style={styles.touchableTextrate}>{t("Skills Analysis")}</Text>
          </TouchableOpacity>
</View>
</View>
        </View>
          <View style={{flexDirection: 'row' }}>
          <View style={{flexDirection: 'column' }}>
           <View style={{flexDirection: 'row' }}>
         <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/Upcom2.png')}
        style={{ width: 25, height: 25, marginLeft: 50, marginTop: 30,}}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 30, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Upcoming Sessions")}</Text>
          </View>
          
           </View>
          
            </View>
          </View>


<View style={{flexDirection: 'row' }}>
<View style={styles.greenwhitebox}> 
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 20, marginLeft: 20, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("New Offer")}</Text>
<View style={{flexDirection: 'row' }}>
<Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 20, textDecoration: 'underline',fontFamily:"Roboto-Light" }}>ASML wanta to enroll 5 SAP FI as your protegees</Text>
<TouchableOpacity
style={[
  styles.touchablejoinrate,
  isHovered9 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered9(true)}
onMouseLeave={() => setIsHovered9(false)}
>
          <Text style={styles.touchableTextjoinrate}>{t("Send a Bid")} </Text>
          </TouchableOpacity>
          </View>
</View>
</View>
<View style={{flexDirection: 'row' }}>
<View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold' ,fontFamily:"Roboto-Light"}}>{t("Growth Plan Review")}</Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, position: 'absolute', right: 20, fontWeight: '600',fontFamily:"Roboto-Light" }}>  {plandata.latestGrowthPlan.dateTime || 'No date Available'}</Text>
</View>
<View style={{flexDirection: 'row', }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600',fontFamily:"Roboto-Light" }}>{plandata.latestGrowthPlan.name || 'No name Available'}</Text>
<TouchableOpacity 
style={[
  styles.touchablestart,
  isHovered10 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered10(true)}
onMouseLeave={() => setIsHovered10(false)}
>
          <Text style={styles.touchableTextjoinreview}>{t("Start")}</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
<View style={{flexDirection: 'row' }}>
<View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold', fontFamily:"Roboto-Light"}}>{t("Skill Analysis Session")}</Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, position: 'absolute', right: 20, fontWeight: '600',fontFamily:"Roboto-Light" }}>{plandata.latestSkillAnalysis.dateTime || 'No date Available'}</Text>
</View>
<View style={{flexDirection: 'row' }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600',fontFamily:"Roboto-Light" }}>{plandata.latestSkillAnalysis.name || 'No name Available'}</Text>
<TouchableOpacity 
style={[
  styles.touchablestart,
  isHovered11 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered11(true)}
onMouseLeave={() => setIsHovered11(false)}
>
          <Text style={styles.touchableTextjoinreview}>{t("Start")}</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
 <View style={{flexDirection: 'row' }}>
          <View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Interview Session")}</Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, position: 'absolute', right: 20, fontWeight: '600',fontFamily:"Roboto-Light" }}>{plandata.latestInterview.dateTime || 'No date Available'}</Text>
</View>
<View style={{flexDirection: 'row', marginBottom: 10 }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600' }}>{plandata.latestInterview.name || 'No name Available'}</Text>
<TouchableOpacity
style={[
  styles.touchablestart,
  isHovered12 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered12(true)}
onMouseLeave={() => setIsHovered12(false)}
>
          <Text style={styles.touchableTextjoinreview}>{t("Start")}</Text>
          </TouchableOpacity>
          </View>
          </View>
          
          </View>
          </BlurView>
 </View>
 
        </View>

        <View style={styles.whiteBoxesContainer}>
        
          <View style={styles.whiteBox}>
          <BlurView intensity={50} style={styles.blurBackground}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/question.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Have a question?")}</Text>
          </View>
          <Text style={{fontSize: 14, color: 'white', marginTop: 10, marginLeft: 35,marginRight: 20, marginBottom: 20,fontFamily:"Roboto-Light"  }}>{t("Do you have an idea you will like to share with us?")}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}
          style={[
            styles.touchablecoach,
            isHovered13 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered13(true)}
          onMouseLeave={() => setIsHovered13(false)}
          >
          <Text style={styles.touchableTextcoach}>{t("Suggestion")}</Text>
          </TouchableOpacity>
          
          </BlurView>
          </View>

          <View style={styles.whiteBox}>
          <BlurView intensity={50} style={styles.blurBackground}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/QandA.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Need Help?")}</Text>
          </View>
          <Text style={{fontSize: 14, color: 'white', marginTop: 10, marginLeft: 35,marginRight: 20, marginBottom: 20,fontFamily:"Roboto-Light"  }}>{t("Do you have an issue you would like us to assist you with?")}</Text>
          <TouchableOpacity onPress={() => sethelpModalVisible(true)}
          style={[
            styles.touchablecoach,
            isHovered14 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered14(true)}
          onMouseLeave={() => setIsHovered14(false)}
          >
          <Text style={styles.touchableTextcoach}>{t("Get Help")}</Text>
          </TouchableOpacity>
          
          </BlurView>
          </View>

          <View style={styles.whiteBox}>
          <BlurView intensity={100} style={styles.blurBackground}>
          <View style={{flexDirection: 'row' }}>
          <Image
       source={require('../assets/money (2).png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Income Overview")}</Text>
          </View>
          <Text style={{fontSize: 14, color: 'white', marginTop: 10, marginLeft: 35,marginRight: 20,fontFamily:"Roboto-Light"  }}>{t("You earned $ (XYZ) from session with Joop Melcher. Your available balance is...")}</Text>
          <TouchableOpacity onPress={goToWithdrawal} 
          style={[
            styles.touchablecoach,
            isHovered15 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered15(true)}
          onMouseLeave={() => setIsHovered15(false)}
          >
          <Text style={styles.touchableTextcoach}>{t("Withdraw Earnings")}</Text>
          </TouchableOpacity>
          </BlurView>
          </View>
        </View> 
      </View>
 
    </View>
    <CustomModal visible={custommodalVisible} onClose={() => handleCloseModal()} />
        </ScrollView>
      </View>
      
     
    <SuggestionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    <HelpModal visible={helpmodalVisible} onClose={() => sethelpModalVisible(false)} />
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
        <View style={styles.modalContent}>
          <OpenModal2 onClose={() => handleCloseModal2()} />
        </View>
      </Modal>
     
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 270,
    marginTop: 100,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
    marginLeft: 3,
    fontFamily:"Roboto-Light"
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 30,
    marginTop: 10
  },
  sunicon: {
    width: 28,
    height: 28,
    marginRight: 10,
    marginTop: 20,
    marginLeft: -300
  },
  boxicon: {
    width: 25,
    height: 25,
    marginLeft: 20,
    marginTop: 25,
  },
  staricon: {
    width: 20,
    height: 20,
    marginLeft: 50,
    marginTop: 15
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginLeft: -55
  },
  sideColumn: {
    marginRight: 15,
  },
  greenBorderedBox: {
    width: 580,
    height: 220,
    backgroundColor: 'rgba(125,125,125,0.3)',
      borderRadius: 20,
    marginBottom: 20, 
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1
},
messageBox: {
  width: 220,
  height: 700,
  backgroundColor: 'rgba(125,125,125,0.3)',
    borderRadius: 20,
  marginRight: 15, 
  borderColor: 'rgba(255,255,255,0.5)',
  borderWidth: 1
},
greenBox: {
  width: 580,
  height: 800,
  backgroundColor: 'rgba(225,255,212,0.1)',
  borderRadius: 20,
  marginBottom: 20,
  borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1
},
blurBackground: {
  flex: 1, 
  borderRadius: 20, 
},
 blurBackground2: {
  flex: 1, 
  borderRadius: 20, 
},
whiteBoxesContainer: {
  flexDirection: 'column',
  justifyContent: 'flex-start',
},
whiteBox: {
  width: 280,
  height: 200,
  backgroundColor: 'rgba(125,125,125,0.3)',
  borderRadius: 20,
  marginBottom: 15,
  borderColor: 'rgba(255,255,255,0.5)',
  borderWidth: 1
},
  touchable: {
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 12,
    marginLeft: 120,
    backgroundColor: 'rgba(200,200,125,0.3)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchablechat: {
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'rgba(200,200,125,0.3)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light"
  },
  touchableTextbegin: {
    color: 'darkgreen',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily:"Roboto-Light"
  },
   touchablecoach: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 5, 
    marginTop: 25,
    marginLeft: 30,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextcoach: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light"
    },
   touchableall: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20,  
    marginTop: 15,
    width: 220,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextall: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
   touchablehub: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    paddingHorizontal: 20, 
    padding: 8, 
    marginTop: 15,
    width: 120,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTexthub: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
  touchablejoinsession: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextjoinsession: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
  touchablerate: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 10, 
    marginTop: 10,
    marginRight: 5,
    marginLeft: 20,
    width: 100,
    height: 40,
    overflow: 'hidden',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextrate: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light"
  },
  touchablesession: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    marginRight: 10,
    marginLeft: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextsession: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light"
  },
   greenwhitebox: {
    width: 510,
    height: 100,
    backgroundColor: 'rgba(10,0,0,0.3)',
    marginLeft: 35, 
    marginTop: 10, 
    borderRadius: 20, 
    },
  greenwhitebox2: {
    width: 510,
    height: 100,
    backgroundColor: 'rgba(10,0,0,0.3)',
    marginLeft: 35, 
    marginTop: 10, 
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center'
    },
     touchablejoinreview: {
      backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    marginLeft: 350,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchablestart: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 15,
    borderRadius: 10,
    right: 20,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextjoinreview: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light"
  },
  touchablejoinrate: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    position: 'absolute',
    right: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextjoinrate: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
  touchableOpacityHovered: {
    backgroundColor: 'coral'
  },
    verticalLine: {
    height: 60,
    width: 2,
    backgroundColor: '#CCC',
    marginLeft: 30,
    marginTop: 15
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
   backgroundColor: '#63EC55',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15
  },
  circleText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    fontFamily:"Roboto-Light"
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 25
  },
  imageback: {
    width: 180,
    height: 180,
    marginRight: 30,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 20
  },
  touchablebegin: {
    padding: 10,
    paddingHorizontal: 5,
    marginTop: 20,
    marginBottom: 10,
    width: 150,
    backgroundColor: '#63EC55',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  hubTitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 20,
    marginLeft: 15,
    fontWeight: 'bold',
    fontFamily: "Roboto-Light"
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10
  }
});

export default HomePage;
