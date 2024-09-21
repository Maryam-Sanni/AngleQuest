  import React, { useState, useEffect } from "react";
  import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView,
    ImageBackground,
    ActivityIndicator
  } from "react-native";
  import { AntDesign } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { useTranslation } from "react-i18next";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';

  import Top from "../components/topbar";
  import Sidebar from "../components/sidebar";
  import { BlurView } from "expo-blur";
  import OpenModal from "./Pickexpertadv";
  import BotIMG from "../assets/AnglequestAI.png";
  import BackGArrow from "../assets/BackarrowG.jpeg";

  const MyComponent = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [modalDesc, setModalDesc] = useState("");
     const [token, setToken] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalsubTitle, setModalSubTitle] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [activeIndex, setActiveIndex] = useState(3);
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
      console.log('useEffect triggered');
      const fetchTokenAndData = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          console.log('Token:', token); // Verify if token is retrieved
          if (token) {
            const response = await axios.get(`${apiUrl}/api/jobseeker/cv/analysis`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log('API Response:', response.data);

            const analysisData = response.data.analysis;
            let parsedAnalysis = {};

            if (typeof analysisData.analysis === 'string') {
              parsedAnalysis = JSON.parse(analysisData.analysis);
            } else {
              parsedAnalysis = analysisData.analysis;
            }

            console.log('Parsed Analysis Data:', parsedAnalysis);

            setApiData(parsedAnalysis);

          } else {
            console.error('Token not found');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchTokenAndData();
    }, []);






  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActiveButton = (index) => {
    setActiveIndex(index);
  };

  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setProfileImage(imageUrl);
    }
  };

  const handleShareCV = (imageUri) => {
    if (profileImage) {
      setAlertMessage('✓ Proceed to choose your "Specialty"');
    } else {
      setAlertMessage("Please choose a file");
    }
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const { t } = useTranslation();

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleCloseModal2 = () => setModalVisible2(false);

  const SideButton = ({ sideBtn, setSideBtn, active }) => {
    // console.log(sideBtn);
    return (
      <TouchableOpacity
        onPress={setSideBtn}
        style={
          active
            ? [styles.monthButton, { backgroundColor: "#7AA666" }]
            : styles.monthButton
        }
      >
        <AntDesign
          name="caretright"
          size={20}
          color={active ? "white" : "black"}
        />
        <Text
          style={
            active
              ? [styles.monthButtonText, { color: "white" }]
              : styles.monthButtonText
          }
        >
          {sideBtn} Months
        </Text>
      </TouchableOpacity>
    );
  };
    const Cards = ({
      bgColor,
      title,
      desc,
      left,
      top,
      bottom,
      right,
      handleFunc,
    }) => {
      return (
        <View
          style={{
            position: "absolute",
            right: right,
            left: left,
            top: top,
            bottom: bottom,
            padding: 10,
            width: 225,
            height: 130,
            gap: 5,
            backgroundColor: bgColor,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              alignSelf: "center",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: "white",
              fontWeight: "400",
              fontSize: 13,
              marginTop: 5,
            }}
            numberOfLines={5}
            ellipsizeMode="tail" 
          >
            {desc}
          </Text>
          <Text
            onPress={handleFunc}
            style={{
              textAlign: "right",
              color: "white",
              textDecorationLine: "underline",
              fontWeight: "500",
              fontSize: 14,
              marginTop: 10
            }}
          >
            See more
          </Text>
        </View>
      );
    };

    const { three_months_step_by_step_guide, six_months_step_by_step_guide, nine_months_step_by_step_guide } = apiData || {};

    const formatList = (list) => {
      return list?.map(item => `${item.area || item.course || item.certification}: ${item.details || item.action}`).join('\n') || "No data available";
    };

    const generateCards = (data, topOffset) => {
      return (
        <>
          <Cards
            title={"Knowledge Gaps | Things that you need to learn"}
            desc={formatList(data?.knowledge_gaps)} 
            bgColor={"#7f65bc"}
            top={100}
            left={300}
            handleFunc={() => {
              setModalVisible2(true);
              setModalTitle("Knowledge Gaps");
              setModalSubTitle("Things that you need to learn");
              setModalDesc(formatList(data?.knowledge_gaps));
            }}
          />
          <Cards
            title={"Study Road Map | What to begin from"}
            desc={formatList(data?.study_road_map).split('\n')[0]}
            bgColor={"#4782bc"}
            top={230}
            right={80}
            handleFunc={() => {
              setModalVisible2(true);
              setModalTitle("Study Road Map");
              setModalSubTitle("A guided map to widen your knowledge");
              setModalDesc(formatList(data?.study_road_map));
            }}
          />
          <Cards
            title={"Certifications & Courses | Certification to obtain"}
            desc={formatList(data?.certifications_and_courses).split('\n')[0]} // Only first line
            bgColor={"#01bbb6"}
            top={250}
            left={100}
            handleFunc={() => {
              setModalVisible2(true);
              setModalTitle("Certifications & Courses");
              setModalSubTitle("The bragging certs in this level");
              setModalDesc(formatList(data?.certifications_and_courses));
            }}
          />
          <Cards
            title={"Learning References | How to learn your goals"}
            desc={formatList(data?.learning_references).split('\n')[0]} // Only first line
            bgColor={"#2c9fc2"}
            bottom={45}
            right={170}
            handleFunc={() => {
              setModalVisible2(true);
              setModalTitle("Learning References");
              setModalSubTitle("Where and how to learn your goals");
              setModalDesc(formatList(data?.learning_references));
            }}
          />
        </>
      );
    };



    // If data is still loading
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // If there's no data
    if (!apiData) {
      return (
        <View style={{ flex: 1 }}>
          <Top />
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Sidebar />
            <ImageBackground
              source={require("../assets/backgroundimg2.png")}
              style={{ height: "110%", width: "100%", flex: 1 }}
            >
              <View style={styles.glassBox}>
                <View style={styles.container}>
                  <View style={{ width: "20%", }}>
                    <View style={{ marginBottom: 60 }}>
                      <Image style={styles.image} source={BotIMG} />
                    </View>
                  </View>
            <View style={{marginTop: 100, alignItems: 'center' }}>
              <Text style={{fontSize: 18 }}>No data available, Please create a <Text style={{fontWeight: 'bold', fontSize: 20 }}>New Skill Analysis Session</Text></Text>
            </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      );
    }


  return (
    <ImageBackground
      source={require("../assets/backgroundimg2.png")}
      style={{ height: "110%", width: "100%", flex: 1 }}
    >
      <BlurView intensity={70} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Top />
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Sidebar />
            <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
              <View style={styles.glassBox}>
                <View style={styles.container}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "20%", }}>
                      <View style={{ marginBottom: 60 }}>
                        <Image style={styles.image} source={BotIMG} />
                      </View>
                      <View>
                        <Text style={styles.timeline}>Timeline</Text>
                        <View style={{ marginVertical: 10, gap: 20 }}>
                          <SideButton
                            sideBtn={3}
                            setSideBtn={() => setActiveIndex(3)}
                            active={activeIndex === 3 ? true : false}
                          />
                          <SideButton
                            sideBtn={6}
                            setSideBtn={() => setActiveIndex(6)}
                            active={activeIndex === 6 ? true : false}
                          />
                          <SideButton
                            sideBtn={9}
                            setSideBtn={() => setActiveIndex(9)}
                            active={activeIndex === 9 ? true : false}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={{ width: "80%", paddingRight: 15 }}>
                      <View
                        style={{ alignItems: "flex-end", marginBottom: 16 }}
                      >
                        <Image
                          source={{
                            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b",
                          }}
                          style={{ width: 56, height: 56, borderRadius: 50 }}
                        />
                      </View>
                      <View style={{marginLeft: 50}}>
                        <Text style={[styles.timeline, { color: "black" }]}>
                          Current Position |{" "}
                          <Text style={{ fontSize: 16, fontWeight: "400" }}>
                            {apiData.analysis?.current_position?.title || 'No title available' }
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "700",
                            marginTop: 10,
                          }}
                        >
                          Next Career Level |{" "}
                          <Text style={{ fontWeight: "500" }}>
                            {apiData.next_career_stage?.title }
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "700",
                            marginTop: 10,
                          }}
                        >
                          Rationale |{" "}
                          <Text style={{ fontWeight: "500" }}>
                            {apiData?.next_career_stage?.rationale }
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "700",
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        >
                          Your proficiency rating |{" "}
                          <Text style={{ fontWeight: "500" }}>
                            {apiData.analysis?.current_proficiency_rating }
                          </Text>
                        </Text>

                      </View>
                      <View
                        style={{
                          minHeight: 600,
                          position: "relative",
                          borderRadius: 20,
                          shadowColor: "#000000",
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.17,
                          shadowRadius: 3.05,
                          elevation: 4,
                        }}
                      >
                          <ImageBackground
                            source={BackGArrow}
                            style={{ width: "100%", height: 600, marginTop: 20 }}
                          >
                            {activeIndex === 3 && generateCards(three_months_step_by_step_guide, 100)}
                            {activeIndex === 6 && generateCards(six_months_step_by_step_guide, 100)}
                            {activeIndex === 9 && generateCards(nine_months_step_by_step_guide, 100)}
                            <View
                              style={{
                                position: "absolute",
                                width: "100%",
                                bottom: -10,
                                marginTop: 100,
                                backgroundColor: "white",
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                              }}
                            >
                          <Text
                            style={{
                              fontSize: 20,
                              textAlign: "center",
                            }}
                          >
                            knowledge Gap Analysis
                          </Text>
                        </View>
                            </ImageBackground>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <TouchableOpacity
                          //  onPress={handleSubmit}
                        >
                          <Text style={[styles.buttonText, { color: "black" }]}>
                            {/* Download pdf */}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.button,
                            {
                              width: 200,
                              backgroundColor: "coral",
                              shadowColor: "#000000",
                              shadowOffset: {
                                width: 0,
                                height: 3,
                              },
                              shadowOpacity: 0.17,
                              shadowRadius: 3.05,
                              elevation: 4,
                            },
                          ]}
                          onPress={handleOpenPress}
                        >
                          <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* */}
                  </View>
                </View>

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
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible2}
                  onRequestClose={handleCloseModal2}
                >
                  <View style={styles.modalContent}>
                    <View
                      style={{
                        padding: 10,
                        width: 515,
                        height: 300,
                        gap: 5,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 8,
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <View
                          style={{
                            backgroundColor: "#7AA666",
                            width: "100%",
                            height: 30,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 18,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            {modalTitle}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontWeight: "600",
                            alignSelf: "center",
                            textAlign: "center",
                            fontSize: 16,
                            marginBottom: 10,
                            marginTop: 10
                          }}
                        >
                           {modalsubTitle}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "400",
                            fontSize: 16,
                          }}
                        >
                          {modalDesc}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={handleCloseModal2}
                        style={{
                          alignSelf: "flex-end",
                          backgroundColor: "#7AA666",
                          padding: 5,
                          borderRadius: 6,
                        }}
                      >
                        <Text style={{ fontSize: 12, color: "white" }}>close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

              </View>
            </ScrollView>
          </View>
        </View>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  container: {
    height: 1000,
    backgroundColor: "#f7fff4",
    borderRadius: 20,
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
    height: 1050,
    backgroundColor: "rgba(225,255,212,0.3)",
    borderRadius: 20,
    marginTop: 30,
    marginLeft: 240,
    marginRight: 30,
    marginBottom: 30,
  },
  image: {
    width: 80,
    height: 80,
  },
  timeline: {
    color: "#777676",
    fontSize: 18,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "transaparent",
    borderRadius: 10,
    borderColor: "coral",
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  monthButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    width: 145,
  },
  monthButtonText: {
    fontWeight: "600",
    fontSize: 16,
  },
});

export default MyComponent;