import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  TextInput,
  FlatList, Linking
} from "react-native";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { BlurView } from "expo-blur";
import Topbar from "../components/topbar";
import SuggestionModal from "../components/Suggestion";
import HelpModal from "../components/Help";
import CustomModal from "../Jobseekers/GetStartedInd";
import CustomPercentageChart from "../components/PercentageChart";
import OpenModal2 from "../Jobseekers/GetStartedInd";
import OpenModal3 from "../Jobseekers/Pickyourcoach";
import OpenModal4 from "../Jobseekers/Pickyourhub";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { api_url, AuthContext } from "../Messaging/AuthProvider";
import { formatDistanceToNow, format } from "date-fns";
import { enGB } from "date-fns/locale";
import { useLocation } from 'react-router-dom';

const defaultAvatar = require("../assets/account.png");

const HomePage = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isHovered10, setIsHovered10] = useState(false);
  const [isHovered11, setIsHovered11] = useState(false);
  const [isHovered12, setIsHovered12] = useState(false);
  const [isHovered13, setIsHovered13] = useState(false);
  const [isHovered14, setIsHovered14] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [helpmodalVisible, sethelpModalVisible] = useState(false);
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [token, setToken] = useState(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [data, setData] = useState([]);
  const [plandata, setplanData] = useState({
    latestGrowthPlan: {},
    latestInterview: {},
    latestSkillAnalysis: {},
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  const ico =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b";

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        console.log("Token retrieved from AsyncStorage:", storedToken);
      } else {
        console.log("No token found in AsyncStorage.");
      }
    } catch (error) {
      console.log("Error retrieving token:", error);
    }
  };

  // Function to fetch user chatrooms
  const getUserChatrooms = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${api_url}chat/my-memberships`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (data?.status === "success") {
        setConversations(data?.memberships);
        console.log("Chatrooms fetched successfully:", data?.memberships);
      } else {
        console.log("Failed to fetch chatrooms:", data);
      }
    } catch (err) {
      console.log("Error fetching chatrooms:", err);
    }
  };

  // Fetch token on component mount
  useEffect(() => {
    getToken();
  }, []);

  // Fetch chatrooms once the token is retrieved
  useEffect(() => {
    if (token) {
      getUserChatrooms();
    }
  }, [token]);

  const handleSelectRoom = (room) => {
    console.log("Selected Room:", room);
    // Navigate to Room screen, passing room details as parameters
    navigate("/chat", { activeRoom: room });
  };

  const [service, setService] = useState(""); // State to store the service

  useEffect(() => {
    const checkLastPaymentMethod = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("Token not found in AsyncStorage");
          return;
        }
  
        // Fetch payment details from the API
        const response = await axios.get(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Extract PaystackDetail object from the response
        const paystackDetails = response?.data?.PaystackDetail;
  
        if (paystackDetails) {
          setService(paystackDetails.service); // Store the service from the response
  
          // Check the payment method
          if (paystackDetails.payment_method === "Done") {
            setModalVisible2(false); // Payment is completed; hide the modal
          } else {
            setModalVisible2(true); // Payment is not completed; show the modal
          }
        } else {
          console.warn("No payment details found in the response.");
          setModalVisible2(true); // Show the modal if no payment details are found
        }
      } catch (error) {
        console.error("Error fetching payment details: ", error);
        setModalVisible2(true); // Show the modal in case of an error
      }
    };
  
    checkLastPaymentMethod(); // Call the function immediately
  }, [apiUrl, setModalVisible2]);



  useEffect(() => {
    // Retrieve first_name and last_name from AsyncStorage
    const retrieveData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem("first_name");
        const storedLastName = await AsyncStorage.getItem("last_name");
        if (storedFirstName !== null && storedLastName !== null) {
          console.log("Stored first_name:", storedFirstName);
          console.log("Stored last_name:", storedLastName);
          setFirstName(storedFirstName);
          setLastName(storedLastName);
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    retrieveData();
  }, []);

  const goToGrowth = () => {
    navigate("/growth-plan-sessions");
  };

  const goToAI = () => {
    navigate("/ai-analysis");
  };

  const goTopay = () => {
    navigate("/billings-payment");
  };

  const goToInterview = () => {
    navigate("/interview-sessions");
  };

  const goToAdvice = () => {
    navigate("/skill-analysis-sessions");
  };
  
  const goToHub = () => {
    navigate("/coaching-hub-new");
  };

  const goToHubs = () => {
    navigate("/coaching-hub-sessions");
  };

  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

   const handleCloseModal2 = async () => {
     const token = await AsyncStorage.getItem("token"); // Get token from AsyncStorage
     if (!token) {
       console.error("Token not found");
       return;
     }

     try {
       // Fetch payment details from the API
       const response = await axios.get(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });

       // Get the PaystackDetail object
       const paystackDetails = response?.data?.PaystackDetail;

       if (paystackDetails) {
         // Check the payment method
         const paymentMethod = paystackDetails.payment_method;

         if (paymentMethod === "Done") {
           // Allow closing the modal only if the payment method is "Done"
           setModalVisible2(false);
         } else {
           console.log("Cannot close modal. Payment method is not 'Done'.");
         }
       } else {
         console.warn("No payment details found");
       }
     } catch (error) {
       console.error("Error fetching payment details:", error.response?.data || error.message);
     }
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
      const token = await AsyncStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [growthPlanResponse, interviewResponse, skillAnalysisResponse] =
        await Promise.all([
          fetch(`${apiUrl}/api/jobseeker/get-jobseeker-growthplan`, {
            headers,
          }),
          fetch(`${apiUrl}/api/jobseeker/get-jobseeker-interview`, { headers }),
          fetch(`${apiUrl}/api/jobseeker/get-jobseeker-skill-analysis`, {
            headers,
          }),
        ]);

      const growthPlanData = await growthPlanResponse.json();
      const interviewData = await interviewResponse.json();
      const skillAnalysisData = await skillAnalysisResponse.json();

      // Log the fetched data for debugging
      console.log("Growth Plan Data:", growthPlanData);
      console.log("Interview Data:", interviewData);
      console.log("Skill Analysis Data:", skillAnalysisData);

      const latestGrowthPlan = processLatestEntry(
        growthPlanData.growthPlan,
        "coach",
        "date_time",
        "candidate_link"
      );
      const latestInterview = processLatestEntry(
        interviewData.interview,
        "expert_name",
        "date_time",
        "candidate_link"
      );
      const latestSkillAnalysis = processLatestEntry(
        skillAnalysisData.skillAnalysis,
        "expert_name",
        "date_time",
        "candidate_link"
      );

      // Log the processed latest data for debugging
      console.log("Latest Growth Plan:", latestGrowthPlan);
      console.log("Latest Interview:", latestInterview);
      console.log("Latest Skill Analysis:", latestSkillAnalysis);

      return {
        latestGrowthPlan,
        latestInterview,
        latestSkillAnalysis,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const processLatestEntry = (entries, expertNameField, dateTimeField, linkField) => {
    if (!entries || entries.length === 0) return {};

    const parsedEntries = entries.map((entry) => {
      const parsedDate = parseCustomDate(entry[dateTimeField]);
      return {
        ...entry,
        [dateTimeField]: parsedDate ? parsedDate : null, // Store parsed date or null if invalid
      };
    }).filter(entry => entry[dateTimeField]); // Filter out entries with invalid dates

    if (parsedEntries.length === 0) return {};

    parsedEntries.sort((a, b) => b[dateTimeField] - a[dateTimeField]);

    const latestEntry = parsedEntries[0];

    return {
      expertName: latestEntry[expertNameField] || "No Name Available",
      dateTime: latestEntry[dateTimeField] ? formatDate(latestEntry[dateTimeField]) : "No Date Available",
      expertLink: latestEntry[linkField] || "No Link Available",
    };
  };

  // Custom date parsing function to handle various formats
  function parseCustomDate(dateString) {
    if (!dateString) return null;

    // Try to parse ISO date first
    let parsedDate = Date.parse(dateString);
    if (!isNaN(parsedDate)) return new Date(parsedDate);

    // Handle common non-ISO formats
    const formats = [
      "EEEE, yyyy-MM-dd hh:mm a",      // e.g., "Thursday, 2024-10-17 10:55 AM"
      "EEEE, MMMM dd, yyyy | hh:mm a", // e.g., "Sunday, October 27, 2024 | 12:00 AM"
    ];

    for (let format of formats) {
      parsedDate = Date.parse(dateString.replace(/,| \|/g, '')); // Simple replace to normalize formats
      if (!isNaN(parsedDate)) return new Date(parsedDate);
    }

    console.warn("Unable to parse date:", dateString);
    return null;
  }

  // Formatting function (unchanged)
  function formatDate(date) {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
    const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date);
    const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(date);

    return `${month} ${day} | ${time}`;
  }

  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const targetDate = new Date("April 1, 2025 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;

      if (timeLeft <= 0) {
        setCountdown("Launching Today!");
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // Call immediately
    const timer = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    fetchAllData().then((fetchedData) => {
      if (fetchedData) {
        console.log("Fetched Data for State:", fetchedData);
        setplanData(fetchedData);
      }
    });
  }, []);

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
            <View style={styles.container}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                  }}
                  style={{ width: 40, height: 40, marginTop: -5 }}
                />
                <Text style={styles.greeting}>
                  {t("Good Day")}, {first_name}
                </Text>
              </View>
              <View style={styles.mainContent}>
                <View style={styles.messageBox}>
                  <BlurView intensity={50} style={styles.blurBackground}>
                    
                    <View style={styles.card}>
                    <Image
                                source={require("../assets/AI.jpg")}
        style={styles.image}
      />
      <Text style={styles.title}>Work smarter with <Text style={styles.highlight}>ERP AI</Text></Text>
      <Text style={styles.description}>
        Automated request responses based on user-defined researches, using AI algorithms.
      </Text>
      <View style={{backgroundColor: '#F5F5F5', padding: 10, borderRadius: 5, marginTop: 10,}}>
        <Text style={{fontSize: 20, fontWeight: 600, color: 'darkgreen'}}>Coming Soon!</Text>
        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 5 }}>{countdown}</Text>
        </View>
    </View>
                  
    <Text
  style={{
    fontSize: 20,
    color: "#63EC55",
    marginTop: 25,
    marginLeft: 20,
    fontWeight: "600",
  }}
>
  {t("Quick Links")}
</Text>

{/* Show Support Request, Hubs, and Make a Suggestion if service is "Knowledge Backup" */}
{service === "Knowledge Backup" && (
  <>
    <TouchableOpacity
      onPress={goToAI}
      style={[styles.touchablechat, isHovered4 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered4(true)}
      onMouseLeave={() => setIsHovered4(false)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.touchableTextchat}>{t("Support Request")}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={goToHubs}
      style={[styles.touchablechat, isHovered3 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered3(true)}
      onMouseLeave={() => setIsHovered3(false)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.touchableTextchat}>{t("Join a Hub")}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={[styles.touchablechat, isHovered13 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered13(true)}
      onMouseLeave={() => setIsHovered13(false)}
    >
      <Text style={styles.touchableTextchat}>{t("Make a suggestion")}</Text>
    </TouchableOpacity>
  </>
)}

{/* Show Skill Analysis, Growth Plan, Hubs, and Make a Suggestion if service is "Career Support" */}
{service === "Career Support" && (
  <>
      <TouchableOpacity
      onPress={goToAI}
      style={[styles.touchablechat, isHovered4 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered4(true)}
      onMouseLeave={() => setIsHovered4(false)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.touchableTextchat}>{t("AI Analysis")}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={goToAdvice}
      style={[styles.touchablechat, isHovered1 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered1(true)}
      onMouseLeave={() => setIsHovered1(false)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.touchableTextchat}>{t("Update Skill Analysis")}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={goToGrowth}
      style={[styles.touchablechat, isHovered6 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered6(true)}
      onMouseLeave={() => setIsHovered6(false)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.touchableTextchat}>{t("Update Growth Plan")}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={goToHubs}
      style={[styles.touchablechat, isHovered3 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered3(true)}
      onMouseLeave={() => setIsHovered3(false)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.touchableTextchat}>{t("Join a Hub")}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={[styles.touchablechat, isHovered13 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered13(true)}
      onMouseLeave={() => setIsHovered13(false)}
    >
      <Text style={styles.touchableTextchat}>{t("Make a suggestion")}</Text>
    </TouchableOpacity>
  </>
)}

{/* Show All Options if service is "Knowledge Backup + Career Support" */}
{service === "Knowledge Backup + Career Support" && (
  <>
    <TouchableOpacity
      onPress={goToAI}
      style={[styles.touchablechat, isHovered4 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered4(true)}
      onMouseLeave={() => setIsHovered4(false)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.touchableTextchat}>{t("AI Analysis")}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={goToAdvice}
      style={[styles.touchablechat, isHovered1 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered1(true)}
      onMouseLeave={() => setIsHovered1(false)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.touchableTextchat}>{t("Update Skill Analysis")}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={goToGrowth}
      style={[styles.touchablechat, isHovered6 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered6(true)}
      onMouseLeave={() => setIsHovered6(false)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.touchableTextchat}>{t("Update Growth Plan")}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={goToHubs}
      style={[styles.touchablechat, isHovered3 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered3(true)}
      onMouseLeave={() => setIsHovered3(false)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.touchableTextchat}>{t("Join a Hub")}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={[styles.touchablechat, isHovered13 && styles.touchableOpacityHovered]}
      onMouseEnter={() => setIsHovered13(true)}
      onMouseLeave={() => setIsHovered13(false)}
    >
      <Text style={styles.touchableTextchat}>{t("Make a suggestion")}</Text>
    </TouchableOpacity>
  </>
)}


                  </BlurView>
                </View>
                <View style={styles.sideColumn}>
                  <View style={styles.greenBorderedBox}>
                    <BlurView intensity={80} style={styles.blurBackground}>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flexDirection: "column",
                            marginTop: 10,
                            width: 350,
                            marginLeft: 30,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 18,
                              color: "darkgreen",
                              fontWeight: "bold",
                              marginTop: 10,
                            }}
                          >
                            {t("What are your upcoming goals,")} {first_name}?
                          </Text>
                          <Text
                            style={{
                              fontSize: 24,
                              color: "#63EC55",
                              fontWeight: "bold",
                              marginTop: 5,
                            }}
                          >
                            {t(
                              "Helping you achieve your next career milestone is our priority",
                            )}
                          </Text>
                          <TouchableOpacity
                            onPress={handleOpenPress2}
                            style={[
                              styles.touchablebegin,
                              isHovered2 && styles.touchableOpacityHovered,
                            ]}
                            onMouseEnter={() => setIsHovered2(true)}
                            onMouseLeave={() => setIsHovered2(false)}
                          >
                            <Text style={styles.touchableText}>
                              {t("Account Setup")}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <Image
                          source={require("../assets/AddManager.png")}
                          style={styles.imageback}
                        />
                      </View>
                    </BlurView>
                  </View>

                  <View style={styles.greenBox}>
                    <BlurView intensity={80} style={styles.blurBackground}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "column" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 20,
                              marginBottom: 10,
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              <Image
                                source={require("../assets/Upcom2.png")}
                                style={{
                                  width: 25,
                                  height: 25,
                                  marginLeft: 50,
                                  marginTop: 15,
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  color: "#63EC55",
                                  marginTop: 15,
                                  marginLeft: 10,
                                  fontWeight: "bold",
                                }}
                              >
                                {t("Upcoming")}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.greenwhitebox}>
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "#63EC55",
                                marginTop: 15,
                                marginLeft: 30,
                                fontWeight: "bold",
                              }}
                            >
                              {t("Growth Plan Review")}{" "}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "white",
                                marginTop: 15,
                                position: "absolute",
                                right: 20,
                                fontWeight: "600",
                              }}
                            >
                              {plandata.latestGrowthPlan.dateTime ||
                                " "}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Image
                              source={{
                                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b",
                              }}
                              style={{
                                width: 30,
                                height: 30,
                                marginLeft: 30,
                                marginTop: 15,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                color: "white",
                                marginTop: 20,
                                marginLeft: 10,
                                fontWeight: "600",
                              }}
                            >
                              {plandata.latestGrowthPlan.expertName ||
                                "You are all caught up! You have no pending action"}
                            </Text>
                            

                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.greenwhitebox}>
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "#63EC55",
                                marginTop: 15,
                                marginLeft: 30,
                                fontWeight: "bold",
                              }}
                            >
                              {t("Skill Analysis Session")}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "white",
                                marginTop: 15,
                                position: "absolute",
                                right: 20,
                                fontWeight: "600",
                              }}
                            >
                              {plandata.latestSkillAnalysis.dateTime ||
                                " "}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Image
                              source={{
                                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b",
                              }}
                              style={{
                                width: 30,
                                height: 30,
                                marginLeft: 30,
                                marginTop: 15,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                color: "white",
                                marginTop: 20,
                                marginLeft: 10,
                                fontWeight: "600",
                              }}
                            >
                              {plandata.latestSkillAnalysis.expertName ||
                                "You are all caught up! You have no pending action"}
                            </Text>

                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.greenwhitebox}>
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "#63EC55",
                                marginTop: 15,
                                marginLeft: 30,
                                fontWeight: "bold",
                              }}
                            >
                              {t("Hub Sessions")}{" "}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "white",
                                marginTop: 15,
                                position: "absolute",
                                right: 20,
                                fontWeight: "600",
                              }}
                            >
                              {plandata.latestInterview.dateTime ||
                                " "}
                            </Text>
                          </View>
                          <View
                            style={{ flexDirection: "row", marginBottom: 10 }}
                          >
                            <Image
                              source={{
                                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b",
                              }}
                              style={{
                                width: 30,
                                height: 30,
                                marginLeft: 30,
                                marginTop: 15,
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                color: "white",
                                marginTop: 20,
                                marginLeft: 10,
                                fontWeight: "600",
                              }}
                            >
                              {plandata.latestInterview.expertName ||
                                "You are all caught up! You have no pending action"}
                            </Text>

                          </View>
                        </View>
                      </View>
                    </BlurView>
                  </View>

                 
                </View>

                
                    

                   
            
               
              </View>
             
            </View>
           
              
          </ScrollView>
         
        </View>

        <SuggestionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={customModalVisible}
          onRequestClose={handleCloseModal2}
        >
          <View style={styles.modalContent}>
            <CustomModal onClose={() => setCustomModalVisible(false)} /> 
          </View>
        </Modal>
        
        <HelpModal
          visible={helpmodalVisible}
          onClose={() => sethelpModalVisible(false)}
        />
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
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    alignItems: "center",
    marginLeft: 50,
    marginTop: 100,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
    marginLeft: 3,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginTop: 10,
  },
  sunicon: {
    width: 28,
    height: 28,
    marginRight: 10,
    marginTop: 20,
    marginLeft: -300,
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
    marginTop: 15,
  },
  mainContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  sideColumn: {
    marginRight: 15,
  },
  greenBorderedBox: {
    width: 580,
    height: 200,
    backgroundColor: "rgba(125,125,125,0.3)",
    borderRadius: 20,
    marginBottom: 20,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
  },
  messageBox: {
    width: 300,
    height: 670,
    backgroundColor: "rgba(125,125,125,0.3)",
    borderRadius: 20,
    marginRight: 15,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
  },
  greenBox: {
    width: 580,
    height: 450,
    backgroundColor: "rgba(225,255,212,0.1)",
    borderRadius: 20,
    marginBottom: 20,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
  whiteBoxesContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  greenwhitebox: {
    width: 510,
    height: 100,
    backgroundColor: "rgba(10,0,0,0.3)",
    marginLeft: 35,
    marginTop: 10,
    borderRadius: 20,
  },
  whiteBox: {
    width: 280,
    height: 670,
    backgroundColor: "rgba(125,125,125,0.3)",
    borderRadius: 20,
    marginBottom: 15,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    paddingBottom: 30,
  },
  touchable: {
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 12,
    marginLeft: 150,
    backgroundColor: "rgba(200,200,125,0.3)",
    borderRadius: 10,
    shadowColor: "#000",
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
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "rgba(200,200,125,0.3)",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableText: {
    color: "darkgreen",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  touchableTextchat: {
    color: "white",
    textAlign: "flex-start",
    fontSize: 16,
  },
  touchableOpacityHovered: {
    backgroundColor: "coral",
  },
  touchablecoach: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 5,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextcoach: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Roboto-Light'",
  },
  touchableall: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextall: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
  },
  touchablehub: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 15,
    marginRight: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTexthub: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
  },
  touchablejoinsession: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextjoinsession: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
  },
  touchablerate: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 10,
    marginTop: 15,
    marginLeft: 10,
    width: 90,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextrate: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  touchablesession: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 180,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextsession: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
  },
  touchablestart: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 15,
    position: "absolute",
    right: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchablejoinreview: {
    backgroundColor: "white",
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginTop: 5,
    marginLeft: 200,
    borderColor: "#CCC",
    borderWidth: 1,
  },
  touchableTextjoinreview: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Roboto-Light'",
  },
  verticalLine: {
    height: 60,
    width: 2,
    backgroundColor: "#CCC",
    marginLeft: 30,
    marginTop: 15,
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 25,
  },
  profile: {
    width: 80,
    height: 80,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 50,
  },
  imageback: {
    width: 180,
    height: 180,
    marginRight: 30,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  touchablebegin: {
    padding: 10,
    paddingHorizontal: 5,
    marginTop: 20,
    marginBottom: 10,
    width: 150,
    backgroundColor: "#63EC55",
    borderRadius: 10,
    shadowColor: "#000",
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 5,
  },
  messageCountText: {
    color: "coral",
    fontWeight: "500",
    fontSize: 14,
    fontFamily: "Roboto-Light'",
  },
  messagecontainer: {
    height: 50,
    marginBottom: 50,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "white",
    borderColor: "#63EC55",
    borderRadius: 20,
    padding: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    padding: 5,
    fontSize: 16,
    borderWidth: 0,
    color: "black",
    fontFamily: "Roboto-Light'",
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  conversation: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  conversationUsername: {
    color: "white",
  },
  conversationLastMessage: {
    color: "#F2F2F2",
  },
  chatInput: {
    width: '90%',
    height: 40,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 400,
    backgroundColor: 'white'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    height: 310,
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 20,
    width: 260,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  image: {
    width: 260,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -15,
    height: 120,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  highlight: {
    color: 'darkgreen', 
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  button: {
    backgroundColor: 'darkgreen',
    width: 230,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomePage;
