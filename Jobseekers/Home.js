import React, { useState,  useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, Modal, TextInput  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/sidebar';
import { BlurView } from 'expo-blur';
import Topbar from '../components/topbar';
import SuggestionModal from '../components/Suggestion';
import HelpModal from '../components/Help';
import CustomModal from '../components/CustomModal'; 
import CustomPercentageChart from '../components/PercentageChart';
import OpenModal2 from '../Jobseekers/getstarted';
import OpenModal3 from '../Jobseekers/Pickyourcoach';
import OpenModal4 from '../Jobseekers/Pickyourhub';
import {useFonts} from "expo-font" 
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { formatDistanceToNow, format } from 'date-fns';
import { enGB } from 'date-fns/locale';

const defaultAvatar = require("../assets/account.png");

const HomePage = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
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
  const [isHovered16, setIsHovered16] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [custommodalVisible, setCustomModalVisible] = useState(false);
  const [helpmodalVisible, sethelpModalVisible] = useState(false);
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
          "https://recruitangle.com/api/expert/getAllExperts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data);
        const result = response.data.allExperts;

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
    navigation.navigate('Messages', { userId });
  };
  
  const goToGrowth = () => {
    navigation.navigate('Growth Plan Sessions');
  };

  const goToHubs = () => {
    navigation.navigate('Coaching Hub Sessions');
  };

  const goToInterview = () => {
    navigation.navigate('Interview Sessions');
  };

  const goToAdvice = () => {
    navigation.navigate('Advice Sessions');
  };

  const gotoAI = () => {
    navigation.navigate('Use AI');
  };
 
  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };

  const handleOpenPress3 = () => {
    setModalVisible3(true);
  };

  const handleCloseModal3 = () => {
    setModalVisible3(false);
  };

  const handleOpenPress4 = () => {
    setModalVisible4(true);
  };

  const handleCloseModal4 = () => {
    setModalVisible4(false);
  };

    // Function to fetch data from all APIs
    async function fetchAllData() {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const [growthPlanResponse, interviewResponse, skillAnalysisResponse] = await Promise.all([
                fetch('https://recruitangle.com/api/jobseeker/get-jobseeker-growthplan', { headers }),
                fetch('https://recruitangle.com/api/jobseeker/get-jobseeker-interview', { headers }),
                fetch('https://recruitangle.com/api/jobseeker/get-jobseeker-skill-analysis', { headers })
            ]);

            const growthPlanData = await growthPlanResponse.json();
            const interviewData = await interviewResponse.json();
            const skillAnalysisData = await skillAnalysisResponse.json();

            // Log the fetched data for debugging
            console.log('Growth Plan Data:', growthPlanData);
            console.log('Interview Data:', interviewData);
            console.log('Skill Analysis Data:', skillAnalysisData);

            const latestGrowthPlan = processLatestEntry(growthPlanData.growthPlan, 'coach', 'date_time');
            const latestInterview = processLatestEntry(interviewData.interview, 'expert_name', 'date_time');
            const latestSkillAnalysis = processLatestEntry(skillAnalysisData.skillAnalysis, 'expert_name', 'date_time');

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


  // Helper function to process and find the latest entry
  function processLatestEntry(entries, expertNameField, dateTimeField) {
      if (!entries || entries.length === 0) return {};

      // Log the raw entries for debugging
      console.log('Raw Entries:', entries);

      // Parse the date_time field to Date objects
      const parsedEntries = entries.map(entry => ({
          ...entry,
          [dateTimeField]: new Date(entry[dateTimeField])
      }));

      // Log parsed entries for debugging
      console.log('Parsed Entries:', parsedEntries);

      // Sort entries by date_time in descending order
      parsedEntries.sort((a, b) => b[dateTimeField] - a[dateTimeField]);

      // Log sorted entries for debugging
      console.log('Sorted Entries:', parsedEntries);

      // Return the latest entry's expert name and formatted date_time
      return {
          expertName: parsedEntries[0][expertNameField],
          dateTime: formatDate(parsedEntries[0][dateTimeField].toISOString())
      };
  }


  // Formatting function
  function formatDate(dateString) {
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

  
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })

  const { t } = useTranslation()

  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
  style={{ height: '100%', width: '100%',flex: 1}}
>
  <View style={{ flex: 1}}>
    <Topbar />
    <View style={{ flexDirection: 'row', flex: 1  }}>
      <Sidebar />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
           <View style={styles.container}>
           <View style={{flexDirection: 'row' }}>
           <Image
        source={{
          uri:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
        }}
        style={{ width: 40, height: 40, marginTop: -5}}
      />
      <Text style={styles.greeting}>{t("Good Day")}, {first_name}</Text>

      </View>
      <View style={styles.mainContent}>
      <View style={styles.messageBox}>
      <BlurView intensity={50} style={styles.blurBackground}>
          <Text style={{fontSize: 20, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("My Angle Badge")}</Text>
           <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
          <Image
       source={require('../assets/useravatar2.png')}
        style={styles.profile}
      />
<View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20, }}>
      <CustomPercentageChart percentage={45} />
      </View>
</View>
<Text style={{fontSize: 14, color: 'white', marginTop: 10, marginLeft: 20,marginRight: 20, marginBottom: 20,fontFamily:"Roboto-Light"  }}>{t("I set a goal to become a senior power platform developer by thoroughly understanding the platform with my coach.")}</Text>
<Text style={{fontSize: 20, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Activities")}</Text>  
        <TouchableOpacity onPress={goToAdvice}
          style={[
            styles.touchablechat,
            isHovered4 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered4(true)}
          onMouseLeave={() => setIsHovered4(false)}
        >
          <View style={{flexDirection: 'row' }}>
          <Text style={styles.touchableTextchat}>{t("Skill Analysis")}</Text>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>2</Text>
        </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToGrowth}
          style={[
            styles.touchablechat,
            isHovered3 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered3(true)}
          onMouseLeave={() => setIsHovered3(false)}
        >
         <View style={{flexDirection: 'row' }}>
          <Text style={styles.touchableTextchat}>{t("Growth Plan")}</Text>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>5</Text>
        </View>
        </View>
        </TouchableOpacity>
<TouchableOpacity onPress={goToHubs}
            style={[
              styles.touchablechat,
              isHovered1 && styles.touchableOpacityHovered
            ]}
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
          >
            <View style={{flexDirection: 'row' }}>
            <Text style={styles.touchableTextchat}>{t("Hubs")}</Text>
            <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>3</Text>
        </View>
        </View>
          </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.touchablechat,
            isHovered6 && styles.touchableOpacityHovered
          ]}
          onMouseEnter={() => setIsHovered6(true)}
          onMouseLeave={() => setIsHovered6(false)}
        >
          <View style={{flexDirection: 'row' }}>
          <Text style={styles.touchableTextchat}>{t("Scenario Project")}</Text>
          <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>1</Text>
        </View>
        </View>
        </TouchableOpacity>

          <TouchableOpacity onPress={goToInterview}
            style={[
              styles.touchablechat,
              isHovered5 && styles.touchableOpacityHovered
            ]}
            onMouseEnter={() => setIsHovered5(true)}
            onMouseLeave={() => setIsHovered5(false)}
          >
           <View style={{flexDirection: 'row' }}>
            <Text style={styles.touchableTextchat}>{t("Interview")}</Text>
            <View style={styles.messageCount}>
        <Text style={styles.messageCountText}>7</Text>
        </View>
        </View>
          </TouchableOpacity>
         
          </BlurView>
          </View>
        <View style={styles.sideColumn}>
        <View style={styles.greenBorderedBox}>
          <BlurView intensity={80} style={styles.blurBackground}>
          <View style={{flexDirection: 'row', }}>
          <View style={{flexDirection: 'column', marginTop: 10, width: 350, marginLeft: 30 }}>
          <Text style={{fontSize: 18, color: 'darkgreen', fontWeight: 'bold', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("What is next for you")} {first_name}?</Text>
          <Text style={{fontSize: 24, color: '#63EC55', fontWeight: 'bold', marginTop: 5, fontFamily:"Roboto-Light"}}>{t("Reaching your next career milstone is important to us")}</Text>
          <TouchableOpacity onPress={gotoAI} 
          style={[
          styles.touchablebegin,
          isHovered2 && styles.touchableOpacityHovered
        ]}
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
      >
          <Text style={styles.touchableText}>{t("Get Started")}</Text>
          </TouchableOpacity>
         
         
          
          
          </View>
          <Image
                  source={require('../assets/AddManager.png')}
                  style={styles.imageback}
                />
                </View>
          </BlurView>
          </View>

          <View style={styles.greenBox}>
          <BlurView intensity={80} style={styles.blurBackground}>
          
          
        
          <View style={{flexDirection: 'row' }}>
          <View style={{flexDirection: 'column' }}>
          <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10 }}>
         <View style={{flexDirection: 'row',  }}>
          <Image
       source={require('../assets/Upcom2.png')}
        style={{ width: 25, height: 25, marginLeft: 50, marginTop: 15,}}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 15, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Upcoming Sessions")}</Text>
          </View>
          
           </View>
          </View>
          </View>


<View style={{flexDirection: 'row' }}>
<View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Growth Plan Review")} </Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, position: 'absolute', right: 20, fontWeight: '600',fontFamily:"Roboto-Light" }}>{plandata.latestGrowthPlan.dateTime}</Text>
</View>
<View style={{flexDirection: 'row', }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600' }}>{plandata.latestGrowthPlan.expertName}</Text>
<TouchableOpacity
style={[
  styles.touchablestart,
  isHovered10 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered10(true)}
onMouseLeave={() => setIsHovered10(false)}
>
          <Text style={styles.touchableTextjoinreview}>{t("Join")}</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
<View style={{flexDirection: 'row' }}>
<View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Skill Analysis Session")}</Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, position: 'absolute', right: 20, fontWeight: '600',fontFamily:"Roboto-Light" }}>{plandata.latestSkillAnalysis.dateTime}</Text>
</View>
<View style={{flexDirection: 'row' }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600',fontFamily:"Roboto-Light" }}>{plandata.latestSkillAnalysis.expertName}</Text>
<TouchableOpacity 
style={[
  styles.touchablestart,
  isHovered11 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered11(true)}
onMouseLeave={() => setIsHovered11(false)}
>
          <Text style={styles.touchableTextjoinreview}>{t("Join")}</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
 <View style={{flexDirection: 'row' }}>
          <View style={styles.greenwhitebox}>
<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 16, color: '#63EC55', marginTop: 15, marginLeft: 30, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Interview Session")} </Text>
<Text style={{fontSize: 12, color: 'white', marginTop: 15, position: 'absolute', right: 20, fontWeight: '600',fontFamily:"Roboto-Light" }}>{plandata.latestInterview.dateTime}</Text>
</View>
<View style={{flexDirection: 'row', marginBottom: 10 }}>
<Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b' }}
              style={{ width: 30, height: 30,  marginLeft: 30, marginTop: 15,}}
            />
              <Text style={{fontSize: 14, color: 'white', marginTop: 20, marginLeft: 10, fontWeight: '600', fontFamily:"Roboto-Light" }}>{plandata.latestInterview.expertName}</Text>
<TouchableOpacity 
style={[
  styles.touchablestart,
  isHovered12 && styles.touchableOpacityHovered
]}
onMouseEnter={() => setIsHovered12(true)}
onMouseLeave={() => setIsHovered12(false)}
>
          <Text style={styles.touchableTextjoinreview}>{t("Join")}</Text>
          </TouchableOpacity>
          </View>
          </View>
          
          </View>
          </BlurView>
 </View>

 <View style={styles.messagecontainer}>
      <Image source={require('../assets/messagebox.png')} style={styles.icon} />
      <TextInput
        placeholder={t("Send Message to your Expert")}
        placeholderTextColor="#888"
        style={styles.input}
      />
      <TouchableOpacity>
        <Image
          source={{ uri: 'https://img.icons8.com/?size=100&id=94664&format=png&color=000000' }}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
        </View>

        <View style={styles.whiteBoxesContainer}>
        {/* White boxes will go here */}
          <View style={styles.whiteBox}>
          <View style={{flexDirection: 'row', marginBottom: 10 }}>
          <Image
       source={require('../assets/chat.png')}
        style={styles.boxicon}
      />
          <Text style={{fontSize: 18, color: '#63EC55', marginTop: 25, marginLeft: 10,  fontWeight: 'bold',fontFamily:"Roboto-Light" }}>All Experts</Text>
          <Text style={{fontSize: 18, color: 'white', marginTop: 25, position: 'absolute', right: 30, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Hubs")}</Text>
          </View>
             {data.slice(0, 4).map((item, index) => (
   <View style={{backgroundColor: '#A2BE95', padding: 10, marginTop: 20, marginLeft: 10, marginRight: 10, borderRadius: 5}}>
              <View key={index} style={{ flexDirection: 'row', marginTop: 15 }}>
                <Image source={item.avatar} style={styles.image} />
                <View style={{ flexDirection: 'column' }}>
                   <TouchableOpacity onPress={() => openUser(item.id)}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, fontFamily: "Roboto-Light" }}>
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
                  <Text style={{ color: 'white', marginLeft: 110, fontSize: 12, marginTop: 3, fontFamily: "Roboto-Light" }}>
                    {item.time}
                  </Text>
                </View>  
              </View>
   </View>
            ))}
          
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
          </View>

         

        
        </View>
      </View>
    </View>
          
        </ScrollView>
      </View>
      
    
    <SuggestionModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    <CustomModal visible={custommodalVisible} onClose={() => setCustomModalVisible(false)} />
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={handleCloseModal3}
      >
        <View style={styles.modalContent}>
          <OpenModal3 onClose={() => handleCloseModal3()} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible4}
        onRequestClose={handleCloseModal4}
      >
        <View style={styles.modalContent}>
          <OpenModal4 onClose={() => handleCloseModal4()} />
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
    alignItems: 'center',
    marginLeft: 210,
    marginTop: 100
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
    marginLeft: 3,
    fontFamily:"Roboto-Light"
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 20,
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
  },
  sideColumn: {
    marginRight: 15,
  },
  greenBorderedBox: {
    width: 580,
    height: 200,
    backgroundColor: 'rgba(125,125,125,0.3)',
      borderRadius: 20,
    marginBottom: 20, 
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1
},
messageBox: {
  width: 220,
  height: 670,
  backgroundColor: 'rgba(125,125,125,0.3)',
    borderRadius: 20,
  marginRight: 15, 
  borderColor: 'rgba(255,255,255,0.5)',
  borderWidth: 1
},
greenBox: {
  width: 580,
  height: 450,
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
  whiteBoxesContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  greenwhitebox: {
    width: 510,
    height: 100,
    backgroundColor: 'rgba(10,0,0,0.3)',
    marginLeft: 35, 
    marginTop: 10, 
    borderRadius: 20, 
    },
    whiteBox: {
      width: 280,
      height: 670,
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
    marginLeft: 150,
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
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgba(200,200,125,0.3)',
    borderRadius: 5,
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
    color: 'darkgreen',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  touchableTextchat: {
    color: 'white',
    textAlign: 'flex-start',
    fontSize: 16,
    fontFamily:"Roboto-Light"
  },
  touchableOpacityHovered: {
    backgroundColor: 'coral'
  },
  touchablecoach: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 5, 
    marginTop: 15,
    marginLeft: 20,
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
    fontFamily:"Roboto-Light'"
  },
   touchableall: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 15,
    marginLeft: 20,
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
  touchableTextall: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13
  },
   touchablehub: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 15,
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
    padding: 8,
    paddingHorizontal: 10, 
    marginTop: 15,
    marginLeft: 10,
    width: 90,
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
    fontSize: 12
  },
  touchablesession: {
    backgroundColor: 'rgba(200,200,125,0.3)',
    padding: 8,
    paddingHorizontal: 20, 
    marginTop: 10,
    marginRight: 10,
    marginLeft: 180,
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
    fontSize: 13
  },
    touchablestart: {
      backgroundColor: 'rgba(200,200,125,0.3)',
      padding: 8,
      paddingHorizontal: 20, 
      marginTop: 15,
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
     touchablejoinreview: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 15, 
    marginTop: 5,
    marginLeft: 200,
    borderColor: '#CCC',
    borderWidth: 1
  },
  touchableTextjoinreview: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontFamily:"Roboto-Light'"
  },
    verticalLine: {
    height: 60,
    width: 2,
    backgroundColor: '#CCC',
    marginLeft: 30,
    marginTop: 15
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 25
  },
  profile: {
    width: 80,
    height: 80,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    borderRadius:50
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
  messageCount: {
    width: 23,
    height: 23,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5
  },
  messageCountText: {
    color: 'coral',
    fontWeight: '500',
    fontSize: 14,
    fontFamily:"Roboto-Light'"
  },
  messagecontainer: {
    height: 50,
    marginBottom: 50,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    width: "100%",
    backgroundColor: 'white',
    borderColor: '#63EC55',
    borderRadius: 20,
    padding: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    padding: 5,
    fontSize: 16,
    borderWidth: 0,
    color: 'black',
    fontFamily:"Roboto-Light'"
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
});

export default HomePage;