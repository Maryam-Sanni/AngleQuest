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
import { useNavigation } from "@react-navigation/native";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import OpenModal from "../components/Createhubform";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomAlert from '../components/CustomAlert';

function MyComponent() {
  const [scaleAnimations] = useState(
    [...Array(8)].map(() => new Animated.Value(1)),
  );
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isOthersHovered, setIsOthersHovered] = useState(false);
  const [isAllHovered, setIsAllHovered] = useState(false);
  const [cardData, setCardData] = useState({ AllHubs: [] });
  const [isPressed, setIsPressed] = useState(Array(4).fill(false));
  const [isSaved, setIsSaved] = useState(false);
  const [recommendedExperts, setRecommendedExperts] = useState([]);
  const [selectedHub, setSelectedHub] = useState(null);
   const [selectedIndex, setSelectedIndex] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')  

  const handlePress = () => {
    setIsSaved(!isSaved);
  };

  const joinCourse = async () => {
    if (!selectedHub) {
      console.error("No hub selected");
      return;
    }

    const url = 'https://recruitangle.com/api/jobseeker/join-course';

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
          "https://recruitangle.com/api/expert/hubs/all",
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
          "https://recruitangle.com/api/jobseeker/get-all-jobseeker-hubs",
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

  const goToMyHubs = () => {
    navigation.navigate("Join Courses");
  };

  const goToHubs = () => {
    navigation.navigate("Coaching Hub Sessions");
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
          transform: [{ scale: scaleAnimations[index] || 1 }],
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
            backgroundColor: "#F3F3F3",
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

  const renderCards = () => {
    if (!cardData.AllHubs || cardData.AllHubs.length === 0) {
      return <Text>No data available</Text>;
    }

    return cardData.AllHubs.map((data, index) => (
      <Animated.View
        key={index}
        style={{
          width: "25%",
          paddingHorizontal: 5,
          marginBottom: 20,
          transform: [{ scale: scaleAnimations[index] }],
        }}
        onMouseEnter={() => handleCardAnimation(index, 1.05)}
        onMouseLeave={() => handleCardAnimation(index, 1)}
      >
        <View
          style={{
            width: "95%",
            height: 300,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: "#d3f9d8",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              width: "90%",
              height: 110,
              borderRadius: 5,
              backgroundColor: "#F0FFF9",
              marginRight: "4%",
              marginLeft: 10,
              alignItems: "center",
              marginTop: 20,
              borderWidth: 1,
              borderColor: "#206C00",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=117557&format=png&color=000000",
                }}
                style={{ width: 30, height: 30, aspectRatio: 1, marginTop: 20 }}
              />
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=m4bxQHJfLWpO&format=png&color=000000",
                }}
                style={{
                  width: 30,
                  height: 30,
                  aspectRatio: 1,
                  marginLeft: -10,
                  marginTop: 20,
                }}
              />
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=113989&format=png&color=000000",
                }}
                style={{
                  width: 30,
                  height: 30,
                  aspectRatio: 1,
                  marginLeft: -10,
                  marginTop: 20,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "black",
                fontWeight: "600",
                marginTop: 5,
              }}
            >
              {data.category}
            </Text>
            <Text style={{ fontSize: 13, color: "#206C00", marginTop: 10 }}>
              {data.meeting_day}
            </Text>
            <Text style={{ fontSize: 13, color: "#206C00", marginBottom: 5 }}>
              {data.from} - {data.to}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#000",
                  fontWeight: "600",
                  marginTop: 20,
                }}
              >
                {data.coaching_hub_name}
              </Text>
              <Text style={{ fontSize: 12, color: "black", fontWeight: "400" }}>
                {t("Coach")}: {data.expert_name}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: "#888",
              marginTop: 10,
              marginLeft: 10,
              height: 50,
            }}
          >
            {data.coaching_hub_description}
          </Text>
          
          <TouchableOpacity
            onPressIn={() => handleJoinPressIn(index)}
            onPressOut={handleJoinPressOut}
            style={{
              borderWidth: 1,
                borderColor: '#206C00',
                backgroundColor: "#F0FFF9",
                borderRadius: 5,
                paddingHorizontal: 50,
                paddingVertical: 5,
                marginTop: 15,
                width: "90%",
                alignSelf: "center",
                justifyContent: 'center',
                marginLeft: 10,
                marginRight: 10,
              backgroundColor: isPressed[index] ? 'darkgreen' : '#F0FFF9',
            }}
            onPress={joinCourse} >
          <Text style={{ color: isPressed[index] ? '#fff' : '#206C00', textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>Join</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    ));
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  return (
    <ImageBackground
      source={require("../assets/backgroundimg2.png")}
      style={{ height: "120%", width: "100%", flex: 1 }}
    >
      <BlurView intensity={70} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Topbar />
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Sidebar />
            <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
              <View style={styles.glassBox}>
                <View style={styles.pagecontainer}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                      <TouchableOpacity
                        onPress={goToMyHubs}
                        underlayColor={
                          isOthersHovered ? "transparent" : "transparent"
                        }
                        onMouseEnter={() => setIsOthersHovered(true)}
                        onMouseLeave={() => setIsOthersHovered(false)}
                      >
                        <View style={styles.item}>
                          <Image
                            source={{
                              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                            }}
                            style={styles.image}
                          />
                          <Text
                            style={[
                              styles.headertext,
                              isOthersHovered && { color: "coral" },
                            ]}
                          >
                            {t("View All Courses")}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={goToHubs}
                        underlayColor={
                          isAllHovered ? "transparent" : "transparent"
                        }
                        onMouseEnter={() => setIsAllHovered(true)}
                        onMouseLeave={() => setIsAllHovered(false)}
                      >
                        <View style={styles.item}>
                          <Image
                            source={{
                              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/925cfbb55e82458868f5e0c8cafbdc90d47bec0907e65b77fb918a7ac0dbcfe0?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                            }}
                            style={styles.image2}
                          />
                          <Text
                            style={[
                              styles.headertext,
                              isAllHovered && { color: "coral" },
                            ]}
                          >
                            {t("Join New Hub")}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    

                    <Text
                      style={{
                        color: "darkgreen",
                        fontWeight: "bold",
                        marginTop: 30,
                        marginRight: 50,
                        marginLeft: 60,
                        fontSize: 18,
                      }}
                    >
                      {t("Upcoming Courses")}:
                    </Text>
                    <Text
                      style={{
                        color: "grey",
                        fontWeight: 600,
                        marginTop: 10,
                        marginRight: 50,
                        marginLeft: 60,
                      }}
                    >
                      {t(
                        "Joining a course means you will not be a part of the hub for extensive training but you will be able to get access to the course content and the hub meetings.",
                      )}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: 20,
                        marginRight: 50,
                        marginLeft: 50,
                      }}
                    >
                      {renderCards()}
                    </View>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        marginTop: 30,
                        marginRight: 50,
                        marginLeft: 60,
                        fontSize: 18,
                      }}
                    >
                      {t("My Hubs")}:
                    </Text>
                    <Text
                      style={{
                        color: "grey",
                        fontWeight: 600,
                        marginTop: 10,
                        marginRight: 50,
                        marginLeft: 60,
                      }}
                    >
                      {t(
                        "These are hubs you are already a part of you will recieve extensive training from the hub expert, be mandated to join hub meetings, get assignments and follow ups. To join a new hub",
                      )}<TouchableOpacity
                        style={{
                          color: "grey",
                          fontWeight: 600,
                          marginLeft: 3,
                          textDecoration: "underline"
                        }}
                           onPress={goToHubs} >
                        {t(
                          " click here",
                        )}
                      </TouchableOpacity>
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: 20,
                        marginRight: 50,
                        marginLeft: 50,
                      }}
                    >
                      {renderRecommendedExpertCard()}
                    </View>
                  </View>
                </View>
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
      </BlurView>
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
    backgroundColor: "#f7fff4",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "rgba(225,225,212,0.3)",
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
    backgroundColor: "rgba(225,255,212,0.3)",
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
});

export default MyComponent;
