import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigate } from 'react-router-dom';
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import OpenModal from "../Jobseekers/Pickyourhub";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomAlert from '../components/CustomAlert';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


function MyComponent() {
  const [scaleAnimations] = useState(
    [...Array(8)].map(() => new Animated.Value(1)),
  );
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [cardData, setCardData] = useState({ AllHubs: [] });
  const [isPressed, setIsPressed] = useState(Array(4).fill(false));
  const [isSaved, setIsSaved] = useState(false);
  const [recommendedExperts, setRecommendedExperts] = useState([]);
  const [selectedHub, setSelectedHub] = useState(null);
   const [selectedIndex, setSelectedIndex] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')  
  const [hoveredIndex, setHoveredIndex] = useState(null);
   const [isHovered, setIsHovered] = useState(false);
  const [isViewHovered, setIsViewHovered] = useState(false);
   const [isHoveredhub, setIsHoveredhub] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setIsViewHovered((prev) => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsViewHovered(false);
  };

  const handlePress = () => {
    setIsSaved(!isSaved);
  };

  const goToCourse= () => {
  navigate("/my-courses");
  };
  
  const joinCourse = async () => {
    if (!selectedHub) {
      console.error("No hub selected");
      return;
    }

    const url = `${apiUrl}/api/jobseeker/join-course`;

    // Create payload from selectedHub data
    const payload = {
      category: selectedHub.category,
      meeting_day: selectedHub.meeting_day,
      from: selectedHub.from,
      to: selectedHub.to,
      coaching_hub_name: selectedHub.coaching_hub_name,
      expert_name: selectedHub.expert_name,
      coaching_hub_description: selectedHub.coaching_hub_description,
      coaching_hub_fee: selectedHub.coaching_hub_fee,
      attend: "Yes" 
    };

    try {
      const token = await AsyncStorage.getItem('token'); 
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {

        console.log('Successfully joined the course:', data);
        setAlertMessage(t('You have joined a new course'));
      } else {

        console.log('Failed to join the course:', data);
        setAlertMessage(t('Error'));
      }
    } catch (error) {

      console.error('Error joining the course:', error);
    }
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          `${apiUrl}/api/expert/hubs/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          console.log("Fetched data:", response.data); // Check the response structure
          setCardData(response.data);
        } else {
          console.error("Error fetching data:", response.statusText);
        }

        // Fetch recommended expert data
        const responseRecommended = await axios.get(
          `${apiUrl}/api/jobseeker/get-all-jobseeker-hubs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (responseRecommended.status === 200) {
          setRecommendedExperts(responseRecommended.data.AllJoinedHubs);
        } else {
          console.error(
            "Error fetching recommended expert data:",
            responseRecommended.statusText,
          );
        }
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchData();
  }, []);

  const handleCardAnimation = (index, toValue) => {
    Animated.timing(scaleAnimations[index], {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleJoinPressIn = (index) => {
    setIsPressed((prev) => {
      // Create a new state where only the currently pressed index is true
      const newState = Array(4).fill(false);
      newState[index] = true;
      return newState;
    });
    setSelectedIndex(index);
    setSelectedHub(cardData.AllHubs[index]);
  };

  const handleJoinPressOut = () => {
    // No need to update the state here
  };

  const renderRecommendedExpertCard = () => {
    if (!recommendedExperts || recommendedExperts.length === 0) {
      return null; // Or a loading indicator if you prefer
    }

    return recommendedExperts.map((expert, index) => (
      <Animated.View
        key={expert.id}
        style={{
          width: "25%",
          paddingHorizontal: 5,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: 300,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: "#d3f9d8",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              width: "90%",
              height: 100,
              borderRadius: 5,
              backgroundColor: "white",
              marginHorizontal: 10,
              marginTop: 20,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "grey",
            }}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text
                style={{ fontSize: 14, color: "black", fontWeight: "bold" }}
              >
                {expert.category}
              </Text>
              <Text style={{ fontSize: 12, marginBottom: 5 }}>
                {expert.meeting_day}s
              </Text>
              <Text
                style={{ fontSize: 12, marginBottom: 10 }}
              >
                {expert.from} - {expert.to}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: "#000",
              fontWeight: "600",
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            {expert.coaching_hub_name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "black",
              fontWeight: "400",
              marginLeft: 10,
            }}
          >
            Coach: {expert.expert_name}
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: "#888",
              marginTop: 10,
              marginLeft: 10,
              height: 70,
            }}
          >
            {expert.coaching_hub_description}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    ));
  };

  const getNextDateForDay = (meetingDay) => {
    // Map days to numbers
    const daysMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    };

    // Get current date
    const today = new Date();

    // Get the target day number from meetingDay
    const targetDay = daysMap[meetingDay];

    if (targetDay === undefined) {
      return 'Invalid day';
    }

    // Calculate the number of days to add
    const daysToAdd = (targetDay + 7 - today.getDay()) % 7;

    // If the target day is today, move to the next week
    const nextDate = new Date(today);
    if (daysToAdd === 0) {
      nextDate.setDate(today.getDate() + 7);
    } else {
      nextDate.setDate(today.getDate() + daysToAdd);
    }

    // Format the date as needed
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return nextDate.toLocaleDateString(undefined, options);
  };
  
  const renderCards = () => {
    if (!cardData.AllHubs || cardData.AllHubs.length === 0) {
      return <Text>No data available</Text>;
    }
    
    const categoryStyles = {
      'frontend development': {
        gradient: ['#A8D5BA', '#C9E4C5'],
        icon: 'https://img.icons8.com/?size=100&id=13662&format=png&color=000000',
        name: 'FR0',
        pattern: 'https://img.icons8.com/?size=100&id=9dXTGX8frZOm&format=png&color=FFFFFF20',
      },
      'backend development': {
        gradient: ['#d1c4e9', '#b39ddb'],
        icon: 'https://img.icons8.com/?size=100&id=9o42kRQ3hTYA&format=png&color=000000',
        name: 'BAC',
        pattern: 'https://img.icons8.com/?size=100&id=9dXTGX8frZOm&format=png&color=FFFFFF20',
      },
      'sap': {
        gradient: ['#003C71', '#4F9BCF'],
        icon: 'https://img.icons8.com/?size=100&id=38192&format=png&color=000000',
        name: 'SAP',
        pattern: 'https://img.icons8.com/?size=100&id=9dXTGX8frZOm&format=png&color=4F9BCF20',
      },
      'microsoft': {
        gradient: ['#F9C9B6', '#F8E2B4'],
        icon: 'https://img.icons8.com/?size=100&id=YJfJ0JM5Imsj&format=png&color=000000',
        name: 'MIC',
        pattern: 'https://img.icons8.com/?size=100&id=9dXTGX8frZOm&format=png&color=FFFFFF20',
      },
      'salesforce': {
        gradient: ['#B3CDE0', '#E3F2FD'],
        icon: 'https://img.icons8.com/?size=100&id=38804&format=png&color=000000',
        name: 'SAL',
        pattern: 'https://img.icons8.com/?size=100&id=9dXTGX8frZOm&format=png&color=FFFFFF20',
      },
      'ui/ux': {
        gradient: ['#0033A0', '#66B2FF'],
        icon: 'https://img.icons8.com/?size=100&id=QVobCUiSKNwK&format=png&color=000000',
        name: 'UI/U',
        pattern: 'https://img.icons8.com/?size=100&id=9dXTGX8frZOm&format=png&color=66B2FF10',
      },
      'cloud computing': {
        gradient: ['#a3c2e0', '#c5a6d9'],
        icon: 'https://img.icons8.com/?size=100&id=xVkTHh34x6rW&format=png&color=000000',
        name: 'CLO',
        pattern: 'https://img.icons8.com/?size=100&id=9dXTGX8frZOm&format=png&color=FFFFFF20',
      },
      'data analysis': {
        gradient: ['#BAAB89', '#D1C6A8'],
        icon: 'https://img.icons8.com/?size=100&id=80305&format=png&color=000000',
        name: 'DAT',
        pattern: 'https://img.icons8.com/?size=100&id=9dXTGX8frZOm&format=png&color=FFFFFF20',
      },
      'management': {
        gradient: ['#f8d7da', '#f5a9a9'],
        icon: 'https://img.icons8.com/?size=100&id=ASbjFB9PL3Cw&format=png&color=000000',
        name: 'MAN',
        pattern: 'https://img.icons8.com/?size=100&id=9dXTGX8frZOm&format=png&color=FFFFFF20',
      },
    };
    
    return cardData.AllHubs.map((data, index) => {
      const normalizedCategory = data.category.trim().toLowerCase();
      const style = categoryStyles[normalizedCategory] || {
        gradient: ['#66b2ff', '#3399ff'],
        icon: 'https://img.icons8.com/?size=100&id=YJfJ0JM5Imsj&format=png&color=000000',
         pattern: 'https://img.icons8.com/?size=100&id=9dXTGX8frZOm&format=png&color=66B2FF10',
        name: 'NIL',
      };

      console.log(`Normalized Category: ${normalizedCategory}`);
      console.log(`Gradient Colors: ${style.gradient}`);

      const nextDateForMeeting = getNextDateForDay(data.meeting_day);
      
      return (
        <Animated.View
          key={index}
          style={{
            width: '50%',
paddingHorizontal: 5,
            marginBottom: 20,
          }}
        >
        <View
          style={{
            width: "100%",
            height: 200,
            padding: 20,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: "white",
            borderWidth: hoveredIndex === index ? 3 : 3, 
            borderColor: hoveredIndex === index ? 'coral': 'transparent', 
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <View style={{flexDirection: 'row'}}>
            <LinearGradient
              colors={style.gradient}
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                width: '20%',
                height: 140,
                marginTop: 10,
                borderRadius: 5,
                marginRight: 10,
                alignItems: 'center',
                position: 'relative',
              }}
            >
              
              <Image
                source={{ uri: style.pattern }} 
                style={{
                  width: 60, 
                  height: 60, 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1, 
                }}
              />
              {/* Icon */}
              <Image
                source={{ uri: style.icon }} 
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  top: '50%', 
                  left: '50%', 
                  transform: [{ translateX: -25 }, { translateY: -25 }], 
                  zIndex: 1, 
                }}
              />

              {/* Category Name */}
              <Text
                style={{
                  position: 'absolute',
                  right: -5,
                  bottom: 10,
                  color: '#FFFFFF40',
                  fontSize: 26,
                  fontWeight: '600',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                }}
                numberOfLines={1}
              >
                {style.name}
              </Text>
            </LinearGradient>


          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              width: '30%' 
            }}
          >
            <View style={{ flex: 1, }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#000",
                  fontWeight: "600",
                }}
              >
                {data.coaching_hub_name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#A0A0A0",
                  fontWeight: "400",
                  marginTop: 5,
                }}
              >
                {data.category}
              </Text>
              <Text style={{ fontSize: 14, color: "#A0A0A0", fontWeight: "400" }}>
                {t("by")}: {data.expert_name}
              </Text>
             
              
              <Text
                style={{
                  fontSize: 14,
                  color: "#A0A0A0",
                  marginTop: 10,
                  height: 50,
                }}
              >
                {data.coaching_hub_description}
              </Text>
            </View>
          </View>

            <View style={{flexDirection: 'column', alignSelf: 'center', position: 'absolute', right: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=84997&format=png&color=2D2D2D",
                  }}
                  style={{ width: 18, height: 18, marginRight: 10 }}
                />
            <Text style={{ fontSize: 13, fontWeight: '600' }}>
             Meeting Day: <Text style={{color: "#A0A0A0"}}>{data.meeting_day}s
            </Text></Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=23360&format=png&color=2D2D2D",
                  }}
                  style={{ width: 18, height: 18, marginRight: 10, marginTop: 5 }}
                />
              <Text style={{ fontSize: 13, marginTop: 5, fontWeight: '600' }}>
                Next Meet: <Text style={{color: "#A0A0A0"}}>{nextDateForMeeting}
              </Text></Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/?size=100&id=DVIax78ExUe5&format=png&color=2D2D2D",
                  }}
                  style={{ width: 18, height: 18, marginRight: 10, marginTop: 5 }}
                />
            <Text style={{ fontSize: 13, marginTop: 5, fontWeight: '600' }}>
              Time: <Text style={{color: "#A0A0A0"}}>{data.from} - {data.to}
            </Text></Text>
              </View>
              <TouchableOpacity
                onPressIn={() => handleJoinPressIn(index)}
                onPressOut={() => handleJoinPressOut(index)}
                style={{
                  borderWidth: 2,
                  borderColor: isPressed[index] ? 'darkgreen' : isViewHovered[index] ? 'coral': '#333333',
                  borderRadius: 5,
                  paddingHorizontal: 50,
                  paddingVertical: 5,
                  marginTop: 15,
                  width: 170,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor: isPressed[index] ? 'darkgreen' : isViewHovered[index] ? 'coral' : 'white',
                }}
                onPress={joinCourse}
              >
                <Text
                  style={{
                    color: isPressed[index] || isViewHovered[index] ? 'white' : 'black',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
          </View>
            
        </View>
          
        </View>
            </Animated.View>
          );
        });
      };

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  return (
    <ImageBackground
      source={require("../assets/backgroundimg2.png")}
      style={{ height: "100%", width: "100%", flex: 1 }}
    >
     
        <View style={{ flex: 1 }}>
          <Topbar />
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Sidebar />
            <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
              <View style={styles.glassBox}>
                 <BlurView intensity={10} style={styles.blurBackground}>
                  <View style={{ flex: 1 }}>
                    
                    
                        <View style={styles.headerContainer}>
                          <ImageBackground
                             source={require('../assets/TG1.png')}
                            style={styles.imageBackground}
                            resizeMode="cover"
                          >
                              <View style={styles.cardContainer}>
                                <View style={styles.textContainer}>
                                  <Text style={styles.headingText}>{t("All Courses")}</Text>
                                  <Text style={styles.subHeadingText}>
                                    {t("Register to have access to weekly knowledge sharing sessions")}
                                  </Text>
                                </View>
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                  onPress={goToCourse}
                                  style={[styles.buttonplus, isHovered && styles.buttonplusHovered]}
                                  onMouseEnter={() => setIsHovered(true)}
                                  onMouseLeave={() => setIsHovered(false)}
                                >
                                  <Text style={styles.buttonTextplus}>View My Courses</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </ImageBackground>
                        </View>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: 20,
                        marginRight: 30,
                        marginLeft: 30,
                      }}
                    >
                      {renderCards()}
                    </View>
                    
                  </View>
                 </BlurView>
                </View>
         
            </ScrollView>
          </View>
        </View>
        <CustomAlert
          visible={alertVisible}
          title={t("Alert")}
          message={alertMessage}
          onConfirm={hideAlert}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenModal onClose={() => handleCloseModal()} />
          </View>
        </Modal>
  
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pagecontainer: {
    backgroundColor: "none",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "rgba(125,125,125,0.3)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  glassBox: {
    backgroundColor: "rgba(125,125,125,0.3)",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 30,
    marginLeft: 240,
    marginRight: 30,
    marginBottom: 30,
  },
  header: {
    marginLeft: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "none",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    fontFamily: "Roboto-Light",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 50,
  },
  image2: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 100,
  },
  greenBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(225,225,212,0.3)",
  },
  blurBackground: {
    flex: 1,
  },
  headerContainer: {
    padding: 40,
    marginTop: 20
  },
  imageBackground: {
    height: 400, 
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 20,
    borderRadius: 30,
    shadowColor: 'darkgreen', 
      shadowOffset: {
        width: 0, 
        height: 5, 
      },
      shadowOpacity: 0.7, 
      shadowRadius: 20, 
      elevation: 10,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    position: 'absolute',
    top: '60%',
    left: '10%',
    right: '10%',
    alignItems: 'center',
    width: 200
  },
  headingText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subHeadingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.85,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  circle: {
    position: 'absolute',
    backgroundColor: 'rgba(17, 65, 44, 0.3)', 
    borderRadius: 50, 
  },
  circleTopLeft: {
    width: 100,
    height: 100,
    top: -20,
    left: -30,
  },
  circleBottomRight: {
    width: 150,
    height: 150,
    bottom: -40,
    right: -50,
  },
  buttonplus: {
    backgroundColor: '#11412C',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    width: 200,
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 30,
    shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  buttonplusHovered: {
    backgroundColor: 'coral', 
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  cardContainer: {
    width: '30%', 
    padding: 20,
    backgroundColor: 'white', 
    borderRadius: 10,
    marginLeft: 10, 
    elevation: 5, 
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  textContainer: {
    alignItems: 'flex-start', 
  },
  headingText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeadingText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
    marginBottom: 20,
  },
});

export default MyComponent;
