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
  FlatList,
  TextInput, Linking
} from "react-native";
import { useNavigate } from "react-router-dom";
import { BlurView } from "expo-blur";
import Sidebar from "../components/expertssidebar";
import Topbar from "../components/expertstopbar";
import SuggestionModal from "../components/Suggestion";
import HelpModal from "../components/Help";
import OpenModal2 from "../Experts/Updateprofiles";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import CustomModal from "../Experts/Updateprofiles";
import { api_url, AuthContext } from "../Messaging/AuthProvider";

const defaultAvatar = require("../assets/account.png");

const HomePage = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isHovered7, setIsHovered7] = useState(false);
  const [isHovered8, setIsHovered8] = useState(false);
  const [isHovered10, setIsHovered10] = useState(false);
  const [isHovered11, setIsHovered11] = useState(false);
  const [isHovered12, setIsHovered12] = useState(false);
  const [isHovered13, setIsHovered13] = useState(false);
  const [isHovered14, setIsHovered14] = useState(false);
  const [isHovered15, setIsHovered15] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [helpmodalVisible, sethelpModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [token, setToken] = useState(null);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState(null);
  const [totalBal, setTotalBal] = useState(null);
  const [NewPay, setNewPayer] = useState(null);
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

  useEffect(() => {
    // Function to fetch balance data with token from AsyncStorage
    const fetchBalance = async () => {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        // Make API request with token in headers
        const response = await fetch(`${apiUrl}/api/expert/get-balance`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.status === "success" && data.bal) {
          setTotalBalance(data.bal.new_payment);
          setNewPayer(data.bal.paid_by);
          setTotalBal(data.bal.total_balance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

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
    navigate("/chats", { activeRoom: room });
  };

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
        const response = await axios.get(`${apiUrl}/api/jobseeker/get-withdrawal-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Extract PaystackDetail object from the response
        const paystackDetails = response?.data?.WithdrawalDetail;

        if (paystackDetails) {
          // Check the payment method
          if (paystackDetails.bank_name === "Done") {
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

    // Call the function immediately
    checkLastPaymentMethod();
  }, [apiUrl, setModalVisible2]); // Dependencies

  
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

  const openUser = (userId) => {
    navigation.navigate("Messaging", { userId });
  };

  const handleCloseModal = () => {
    setCustomModalVisible(false);
  };

  const goToMessages = () => {
    navigate("/chats");
  };

  const goToManageHubs = () => {
    navigate("/hubs");
  };

  const goToWithdrawal = () => {
    navigate("/earnings");
  };

  const goToInterview = () => {
    navigate("/interview");
  };

  const goToAdvice = () => {
    navigate("/skill-analysis");
  };

  const goToGrowth = () => {
    navigate("/growth-plan");
  };

  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();

  async function fetchAllData() {
    try {
      const token = await AsyncStorage.getItem("token");
      const storedExpertId = await AsyncStorage.getItem("user_id");

      if (!token || !storedExpertId) {
        console.error("No token or user ID found");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [growthPlanResponse, interviewResponse, skillAnalysisResponse] = await Promise.all([
        fetch(`${apiUrl}/api/jobseeker/get-all-jobseeker-growthplan`, { headers }),
        fetch(`${apiUrl}/api/jobseeker/get-all-jobseeker-interview`, { headers }),
        fetch(`${apiUrl}/api/jobseeker/get-all-jobseeker-skillanalysis`, { headers }),
      ]);

      if (!growthPlanResponse.ok) throw new Error(`Growth Plan API error: ${growthPlanResponse.status}`);
      if (!interviewResponse.ok) throw new Error(`Interview API error: ${interviewResponse.status}`);
      if (!skillAnalysisResponse.ok) throw new Error(`Skill Analysis API error: ${skillAnalysisResponse.status}`);

      const growthPlanData = await growthPlanResponse.json();
      const interviewData = await interviewResponse.json();
      const skillAnalysisData = await skillAnalysisResponse.json();

      const filteredGrowthPlan = (growthPlanData.allGrowthPlan || []).filter((plan) => plan.expertid === storedExpertId);
      const filteredInterview = (interviewData.allInterview || []).filter((entry) => entry.expertid === storedExpertId);
      const filteredSkillAnalysis = (skillAnalysisData.skillAnalysis || []).filter((entry) => entry.expertid === storedExpertId);

      const latestGrowthPlan = processLatestEntry(filteredGrowthPlan, "name", "date_time", "expert_link");
      const latestInterview = processLatestEntry(filteredInterview, "name", "date_time", "expert_link");
      const latestSkillAnalysis = processLatestEntry(filteredSkillAnalysis, "name", "date_time", "expert_link");

      return { latestGrowthPlan, latestInterview, latestSkillAnalysis };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const processLatestEntry = (entries, nameField, dateTimeField, linkField) => {
    if (!entries || entries.length === 0) return {};

    const parsedEntries = entries.map((entry) => ({
      ...entry,
      [dateTimeField]: parseCustomDate(entry[dateTimeField]), // Use custom parsing function
    })).filter(entry => entry[dateTimeField]); // Only keep entries with valid dates

    parsedEntries.sort((a, b) => b[dateTimeField] - a[dateTimeField]);

    const latestEntry = parsedEntries[0];

    return {
      name: latestEntry ? latestEntry[nameField] : "No Name Available",
      dateTime: latestEntry ? formatDate(latestEntry[dateTimeField]) : "No Date Available",
      expertLink: latestEntry ? latestEntry[linkField] : "No Link Available",
    };
  };

  // Custom date parsing function
  const parseCustomDate = (dateString) => {
    if (!dateString) return null;

    // Attempt to parse standard ISO dates
    let parsedDate = Date.parse(dateString);
    if (!isNaN(parsedDate)) return new Date(parsedDate);

    // Handle custom formats
    const regexPatterns = [
      /(\w+),\s(\d{4}-\d{2}-\d{2}\s\d{1,2}:\d{2}\s\w{2})/,  // "Thursday, 2024-10-17 10:55 AM"
      /(\w+),\s(\w+\s\d{1,2},\s\d{4}\s\|\s\d{1,2}:\d{2}\s\w{2})/, // "Sunday, October 27, 2024 | 12:00 AM"
    ];

    for (let pattern of regexPatterns) {
      const match = dateString.match(pattern);
      if (match) {
        parsedDate = Date.parse(match[2]); // Attempt to parse the matched date part
        if (!isNaN(parsedDate)) return new Date(parsedDate);
      }
    }

    console.warn("Unable to parse date:", dateString);
    return null;
  };

  // Formatting function
  const formatDate = (date) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
    const day = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date);
    const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(date);

    return `${month} ${day} | ${time}`;
  };

  useEffect(() => {
    fetchAllData().then((fetchedData) => {
      if (fetchedData) {
        console.log("Fetched Data for State:", fetchedData);
        setplanData(fetchedData);
      }
    });
  }, []);


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
              <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <Image
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                  }}
                  style={{ width: 40, height: 40, marginTop: -5 }}
                />
                `{" "}
                <Text style={styles.greeting}>
                  {t("Good Day")}, {first_name} {last_name}
                </Text>
                `
              </View>
              <View style={styles.mainContent}>
                <View style={styles.messageBox}>
                  <BlurView intensity={50} style={styles.blurBackground}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../assets/chat.png")}
                        style={styles.boxicon}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#63EC55",
                          marginTop: 25,
                          marginLeft: 10,
                          fontWeight: "bold",
                          fontFamily: "Roboto-Light",
                        }}
                      >
                        {t("Upcoming Hub Sessions")}
                      </Text>
                    </View>

                  
                  </BlurView>
                </View>

                <View style={styles.sideColumn}>
                  <View style={styles.greenBorderedBox}>
                    <BlurView intensity={50} style={styles.blurBackground}>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flexDirection: "column",
                            marginTop: 20,
                            width: 350,
                            marginLeft: 30,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 24,
                              color: "#63EC55",
                              fontWeight: "bold",
                              marginTop: 12,
                              fontFamily: "Roboto-Light",
                            }}
                          >
                            {t(
                              "By supporting others we lift their life's work"
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
                            <Text style={styles.touchableTextbegin}>
                              {t("My Profile")}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <Image
                          source={require("../assets/passion.png")}
                          style={styles.imageback}
                        />
                      </View>
                    </BlurView>
                  </View>

                  <View style={styles.greenBox}>
                    <BlurView intensity={80} style={styles.blurBackground}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#63EC55",
                          marginTop: 50,
                          marginLeft: 50,
                          fontWeight: "bold",
                          fontFamily: "Roboto-Light",
                        }}
                      >
                        {t("Quick links")}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <View style={styles.greenwhitebox2}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignSelf: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={goToAdvice}
                              style={[
                                styles.touchablerate,
                                isHovered8 && styles.touchableOpacityHovered,
                              ]}
                              onMouseEnter={() => setIsHovered8(true)}
                              onMouseLeave={() => setIsHovered8(false)}
                            >
                              <Text style={styles.touchableTextrate}>
                                {t("Skills Analysis")}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={goToGrowth}
                              style={[
                                styles.touchablerate,
                                isHovered6 && styles.touchableOpacityHovered,
                              ]}
                              onMouseEnter={() => setIsHovered6(true)}
                              onMouseLeave={() => setIsHovered6(false)}
                            >
                              <Text style={styles.touchableTextrate}>
                                {t("Growth plan")}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={goToManageHubs}
                              style={[
                                styles.touchablerate,
                                isHovered5 && styles.touchableOpacityHovered,
                              ]}
                              onMouseEnter={() => setIsHovered5(true)}
                              onMouseLeave={() => setIsHovered5(false)}
                            >
                              <Text style={styles.touchableTextrate}>
                                {t("Hubs")}
                              </Text>
                            </TouchableOpacity>  
                            <TouchableOpacity
                              onPress={goToInterview}
                              style={[
                                styles.touchablerate,
                                isHovered7 && styles.touchableOpacityHovered,
                              ]}
                              onMouseEnter={() => setIsHovered7(true)}
                              onMouseLeave={() => setIsHovered7(false)}
                            >
                              <Text style={styles.touchableTextrate}>
                                {t("Interview")}
                              </Text>
                            </TouchableOpacity>
                           
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flexDirection: "column" }}>
                          <View style={{ flexDirection: "row" }}>
                            <View style={{ flexDirection: "row" }}>
                              <Image
                                source={require("../assets/Upcom2.png")}
                                style={{
                                  width: 25,
                                  height: 25,
                                  marginLeft: 50,
                                  marginTop: 30,
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  color: "#63EC55",
                                  marginTop: 30,
                                  marginLeft: 10,
                                  fontWeight: "bold",
                                  fontFamily: "Roboto-Light",
                                }}
                              >
                                {t("Upcoming Sessions")}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View style={styles.greenwhitebox}>
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "#63EC55",
                                marginTop: 15,
                                marginLeft: 30,
                                fontWeight: "bold",
                                fontFamily: "Roboto-Light",
                              }}
                            >
                              {t("Growth Plan Review")}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "white",
                                marginTop: 15,
                                position: "absolute",
                                right: 20,
                                fontWeight: "600",
                                fontFamily: "Roboto-Light",
                              }}
                            >
                              {" "}
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
                                fontFamily: "Roboto-Light",
                              }}
                            >
                              {plandata.latestGrowthPlan.name ||
                                "You are all caught up! You have no pending action"}
                            </Text>
                            <TouchableOpacity
  style={[
    styles.touchablestart,
    isHovered10 && styles.touchableOpacityHovered,  // Ensure you're using the right hover state
  ]}
  onMouseEnter={() => setIsHovered10(true)}
  onMouseLeave={() => setIsHovered10(false)}
  onPress={goToGrowth}
>
  <Text style={styles.touchableTextjoinreview}>
    {t("Open")}
  </Text>
</TouchableOpacity>
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
                                fontFamily: "Roboto-Light",
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
                                fontFamily: "Roboto-Light",
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
                                fontFamily: "Roboto-Light",
                              }}
                            >
                              {plandata.latestSkillAnalysis.name ||
                                "You are all caught up! You have no pending action"}
                            </Text>
                            <TouchableOpacity
  style={[
    styles.touchablestart,
    isHovered11 && styles.touchableOpacityHovered,  // Ensure you're using the right hover state
  ]}
  onMouseEnter={() => setIsHovered11(true)}
  onMouseLeave={() => setIsHovered11(false)}
  onPress={goToAdvice}
>
  <Text style={styles.touchableTextjoinreview}>
    {t("Open")}
  </Text>
</TouchableOpacity>
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
                                fontFamily: "Roboto-Light",
                              }}
                            >
                              {t("Interview Session")}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "white",
                                marginTop: 15,
                                position: "absolute",
                                right: 20,
                                fontWeight: "600",
                                fontFamily: "Roboto-Light",
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
                              {plandata.latestInterview.name ||
                                "You are all caught up! You have no pending action"}
                            </Text>
                            <TouchableOpacity
  style={[
    styles.touchablestart,
    isHovered12 && styles.touchableOpacityHovered,  // Ensure you're using the right hover state
  ]}
  onMouseEnter={() => setIsHovered12(true)}
  onMouseLeave={() => setIsHovered12(false)}
  onPress={goToInterview}
>
  <Text style={styles.touchableTextjoinreview}>
    {t("Open")}
  </Text>
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
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={require("../assets/question.png")}
                          style={styles.boxicon}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#63EC55",
                            marginTop: 25,
                            marginLeft: 10,
                            fontWeight: "bold",
                            fontFamily: "Roboto-Light",
                          }}
                        >
                          {t("Have a question?")}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "white",
                          marginTop: 10,
                          marginLeft: 35,
                          marginRight: 20,
                          marginBottom: 20,
                          fontFamily: "Roboto-Light",
                        }}
                      >
                        {t(
                          "Do you have an idea you will like to share with us?",
                        )}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={[
                          styles.touchablecoach,
                          isHovered13 && styles.touchableOpacityHovered,
                        ]}
                        onMouseEnter={() => setIsHovered13(true)}
                        onMouseLeave={() => setIsHovered13(false)}
                      >
                        <Text style={styles.touchableTextcoach}>
                          {t("Suggestion")}
                        </Text>
                      </TouchableOpacity>
                    </BlurView>
                  </View>

                 

                  <View style={styles.whiteBox}>
                    <BlurView intensity={100} style={styles.blurBackground}>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={require("../assets/money (2).png")}
                          style={styles.boxicon}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#63EC55",
                            marginTop: 25,
                            marginLeft: 10,
                            fontWeight: "bold",
                            fontFamily: "Roboto-Light",
                          }}
                        >
                          {t("Income Overview")}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "white",
                          marginTop: 10,
                          marginLeft: 35,
                          marginRight: 20,
                          fontFamily: "Roboto-Light",
                        }}
                      >
                        View your earnings and available balance
                      </Text>
                      <TouchableOpacity
                        onPress={goToWithdrawal}
                        style={[
                          styles.touchablecoach,
                          isHovered15 && styles.touchableOpacityHovered,
                        ]}
                        onMouseEnter={() => setIsHovered15(true)}
                        onMouseLeave={() => setIsHovered15(false)}
                      >
                        <Text style={styles.touchableTextcoach}>
                          {t("View Earnings")}
                        </Text>
                      </TouchableOpacity>
                    </BlurView>
                  </View>
                </View>
              </View>
            </View>
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
          </ScrollView>
        </View>

        <SuggestionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
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
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginLeft: 270,
    marginTop: 100,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
    marginLeft: 3,
    fontFamily: "Roboto-Light",
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 30,
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
    marginLeft: -55,
  },
  sideColumn: {
    marginRight: 15,
  },
  greenBorderedBox: {
    width: 580,
    height: 220,
    backgroundColor: "rgba(125,125,125,0.3)",
    borderRadius: 20,
    marginBottom: 20,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
  },
  messageBox: {
    width: 250,
    height: 600,
    backgroundColor: "rgba(125,125,125,0.3)",
    borderRadius: 20,
    marginRight: 15,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    marginBottom: 30,
  },
  greenBox: {
    width: 580,
    height: 650,
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
  blurBackground2: {
    flex: 1,
    borderRadius: 20,
  },
  whiteBoxesContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  whiteBox: {
    width: 280,
    height: 200,
    backgroundColor: "rgba(125,125,125,0.3)",
    borderRadius: 20,
    marginBottom: 15,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
  },
  touchable: {
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 12,
    marginLeft: 120,
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
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
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
  touchableText: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Roboto-Light",
  },
  touchableTextbegin: {
    color: "darkgreen",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto-Light",
  },
  touchablecoach: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 5,
    marginTop: 25,
    marginLeft: 30,
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
    fontFamily: "Roboto-Light",
  },
  touchableall: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 15,
    width: 220,
    marginLeft: 30,
    marginRight: 30,
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
    paddingHorizontal: 20,
    padding: 8,
    marginTop: 15,
    width: 120,
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
    justifyContent: "center",
    padding: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 20,
    width: 100,
    height: 40,
    overflow: "hidden",
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
    fontSize: 13,
    fontFamily: "Roboto-Light",
  },
  touchablesession: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 50,
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
    fontFamily: "Roboto-Light",
  },
  greenwhitebox: {
    width: 510,
    height: 100,
    backgroundColor: "rgba(10,0,0,0.3)",
    marginLeft: 35,
    marginTop: 10,
    borderRadius: 20,
  },
  greenwhitebox2: {
    width: 510,
    height: 100,
    backgroundColor: "rgba(10,0,0,0.3)",
    marginLeft: 35,
    marginTop: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  touchablejoinreview: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    marginLeft: 350,
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
  touchablestart: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 15,
    borderRadius: 10,
    right: 20,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  touchableTextjoinreview: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Roboto-Light",
  },
  touchablejoinrate: {
    backgroundColor: "rgba(200,200,125,0.3)",
    padding: 8,
    paddingHorizontal: 20,
    marginTop: 10,
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
  touchableTextjoinrate: {
    color: "white",
    textAlign: "center",
    fontSize: 13,
  },
  touchableOpacityHovered: {
    backgroundColor: "coral",
  },
  verticalLine: {
    height: 60,
    width: 2,
    backgroundColor: "#CCC",
    marginLeft: 30,
    marginTop: 15,
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#63EC55",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -15,
  },
  circleText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Roboto-Light",
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginLeft: 15,
    borderRadius: 25,
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
  hubTitle: {
    fontSize: 16,
    color: "white",
    marginTop: 20,
    marginLeft: 15,
    fontWeight: "bold",
    fontFamily: "Roboto-Light",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10,
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
});

export default HomePage;
