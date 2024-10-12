import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  Modal,
  ScrollView,
  TextInput
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import CircularProgress from "react-native-circular-progress-indicator";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import MainButtons from "../LandingPage/MainButton";
import Row from "../components/Row";
import Title from "../components/Title";
import { LinearGradient } from "expo-linear-gradient";
 import OpenModal from '../Jobseekers/SkillanalysisAI';

const Levels = ({ val }) => {
  const [levell, setLevell] = useState([]);
  const [levellOp, setLevellOp] = useState([]);
  //  console.log("lev, ", val);
  useEffect(() => {
    let data = [];
    for (let i = 0; i < val - 2; i++) {
      data.push(i);
    }
    setLevell(data);
  }, [val]);
  useEffect(() => {
    let data = [];
    let total = 4 - (val - 2);
    for (let i = 0; i < total; i++) {
      data.push(i);
    }
    setLevellOp(data);
  }, [val]);

  return (
    <Row style={{ gap: 4, justifyContent: "center" }}>
      {levell?.map((item) => (
        <View
          key={item}
          style={{
            borderRadius: 10,
            width: 60,
            height: 4,
            backgroundColor: "#135837",
          }}
        />
      ))}
      {levellOp.map((item) => (
        <View
          key={item}
          style={{
            borderRadius: 10,
            width: 60,
            height: 4,
            backgroundColor: "#DFE0E0",
          }}
        />
      ))}
    </Row>
  );
};


const AIResultHeader = ({ title, subTitle, step }) => {
  return (
    <View style={{ gap: 16 }}>
      <Title
        title={title ? title : "Expert Analysis"}
        textSize={24}
        center
      />
      <Title
        title={subTitle}
        textSize={20}
        center
      />
    </View>
  );
};


const Step6Card = ({
  bgColor1,
  bgColor2,
  text1,
  text2,
  title,
  num,
  reversed,
}) => {
  return (
    <View
      style={{
        flexDirection: reversed ? "row-reverse" : "row",
        alignItems: "center",
        marginRight: !reversed && 300,
        marginLeft: reversed && 300,
      }}
    >
      <LinearGradient
        colors={[bgColor1, bgColor2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: 124,
          height: 124,
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",

          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5.62,
          elevation: 7,
          zIndex: 1,
        }}
      >
        <LinearGradient
          colors={[bgColor1, bgColor2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: 99.2,
            height: 99.2,
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",

            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5.62,
            elevation: 7,
            zIndex: 1,
          }}
        >
          <Title
            title={num}
            textSize={40}
            textColor={"white"}
          />
        </LinearGradient>
      </LinearGradient>
      <LinearGradient
        colors={[bgColor1, bgColor2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: 493,
          height: 100,
          borderRadius: 50,
          justifyContent: "center",
          marginLeft: !reversed && -40,
          marginRight: reversed ? -40 : 10,
          gap: 6,
          paddingLeft: 50,
          zIndex: 0,
        }}
      >
        <Title
          textSize={14}
          textColor={"white"}
          title={title}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <AntDesign name="arrowright" size={12} color="white" />
          <Title
            textSize={10}
            textColor={"white"}
            style={{ width: 282 }}
            title={text1}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <AntDesign name="arrowright" size={12} color="white" />
          <Title
            textSize={10}
            textColor={"white"}
            style={{ width: 282 }}
            title={text2}
          />
        </View>
      </LinearGradient>
    </View>
  );
};
const AIScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const animeHeight = useSharedValue(0);
  const animeHeight2 = useSharedValue(0);
  const [modalVisible, setModalVisible] = useState(false);

  const GoToBack= () => {
    navigate("/skill-analysis-sessions");
  };

  const handleback = () => {
    navigate("/skill-analysis-sessions");
  };

  const GoToAI = () => {
    navigate("/ai-analysis");
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  return (
            <ImageBackground
              source={require ('../assets/backgroundimg2.png') }
            style={{ height: '100%', width: '100%',flex: 1}}
            >
                  <View style={{ flex: 1 }}>
                      <Topbar />
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                          <Sidebar />


                          <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>

                           

                            <View style={{flexDirection: 'row', marginLeft: 250}}>
                              <TouchableOpacity onPress={GoToBack}>
                                <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "none", backgroundColor: 'none', width: 50, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 0 }}>
                                  <Image
                                    source={{ uri: 'https://img.icons8.com/?size=100&id=99857&format=png&color=FFFFFF' }}
                                    style={{ width: 30, height: 30, marginTop: -5 }}
                                  />
                                </View>
                                </TouchableOpacity>
                              <TouchableOpacity onPress={handleOpenPress}>
                                <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 10, borderWidth: 1 }}>
                                <Text style={{ fontSize: 14, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>+ New</Text>
                                </View>
                                </TouchableOpacity>
                              <TouchableOpacity  onPress={GoToAI}>
                              <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 200, alignItems: 'center', marginTop: 20, marginLeft: 10, borderWidth: 1 }}>

                                              <Text style={{ fontSize: 14, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>AI Analysis</Text>

                                            </View>
                               </TouchableOpacity>
                              <TouchableOpacity>
                                <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 10, borderWidth: 1 }}>
                                                <Text style={{ fontSize: 14, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>Expert Analysis</Text>
                                              </View>
                                 </TouchableOpacity>
                            </View>
                            
              <View style={[styles.aiBody, { minHeight: 900, marginTop: 50, marginLeft: 230 }]}>
                <View style={{ backgroundColor: "transparent" }}>
                  <View
                    style={[
                      styles.container1,
                      { width: 1075, borderRadius: 20 },
                    ]}
                  >
                    <View
                      style={[
                        styles.bottom,
                        { backgroundColor: "white", borderRadius: 20 },
                      ]}
                    >
                      <View
                        style={{
                          height: "99%",
                          gap: 15,
                          justifyContent: "space-between",
                          backgroundColor: "white",
                        }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                            gap: 20,
                            marginBottom: 20,
                          }}
                        >
                          <AIResultHeader
                            step={step}
                            subTitle={
                              "Knowledge Gaps | Things that you need to learn"
                            }
                          />
                          <View style={{ position: "relative", gap: 40 }}>
                            <Step6Card
                              bgColor1="#135837"
                              bgColor2={"#29BE77"}
                              num={"01"}
                              title={
                                "Google UX Design Professional Certificate (Coursera)"
                              }
                              text1={
                                "Focus: User-centered design, research, wireframing, prototyping, and usability testing."
                              }
                              text2={"Duration: 6 months (self-paced)."}
                            />
                            <Step6Card
                              reversed
                              bgColor1="#1C4A8A"
                              bgColor2={"#3197DA"}
                              num={"02"}
                              title={"Interaction Design Foundation (IDF)"}
                              text1={
                                "Certifications in various topics like UX design, design thinking, usability, and information architecture."
                              }
                              text2={"Duration: Depends on the course."}
                            />
                            <Step6Card
                              bgColor1="#8F1987"
                              bgColor2={"#DF2783"}
                              num={"03"}
                              title={"Udacity - UX Nanodegree"}
                              text1={
                                "Focus: User-centered design, research, wireframing, prototyping, and usability testing."
                              }
                              text2={"Duration: 6 months (self-paced)."}
                            />
                            <Step6Card
                              reversed
                              bgColor1="#13E3D2"
                              bgColor2={"#0E7B75"}
                              num={"04"}
                              title={"Interaction Design Foundation (IDF)"}
                              text1={
                                "Certifications in various topics like UX design, design thinking, usability, and information architecture."
                              }
                              text2={"Duration: Depends on the course."}
                            />
                            <Step6Card
                              bgColor1="#135837"
                              bgColor2={"#29BE77"}
                              num={"05"}
                              title={
                                "Google UX Design Professional Certificate (Coursera)"
                              }
                              text1={
                                "Focus: User-centered design, research, wireframing, prototyping, and usability testing."
                              }
                              text2={"Duration: 6 months (self-paced)."}
                            />
                            <Step6Card
                              reversed
                              bgColor1="#1C4A8A"
                              bgColor2={"#3197DA"}
                              num={"06"}
                              title={"Interaction Design Foundation (IDF)"}
                              text1={
                                "Certifications in various topics like UX design, design thinking, usability, and information architecture."
                              }
                              text2={"Duration: Depends on the course."}
                            />
                            <Step6Card
                              bgColor1="#8F1987"
                              bgColor2={"#DF2783"}
                              num={"07"}
                              title={"Udacity - UX Nanodegree"}
                              text1={
                                "Focus: User-centered design, research, wireframing, prototyping, and usability testing."
                              }
                              text2={"Duration: 6 months (self-paced)."}
                            />
                            <Step6Card
                              reversed
                              bgColor1="#13E3D2"
                              bgColor2={"#0E7B75"}
                              num={"08"}
                              title={"Interaction Design Foundation (IDF)"}
                              text1={
                                "Certifications in various topics like UX design, design thinking, usability, and information architecture."
                              }
                              text2={"Duration: Depends on the course."}
                            />
                            <Step6Card
                              bgColor1="#135837"
                              bgColor2={"#29BE77"}
                              num={"09"}
                              title={
                                "Google UX Design Professional Certificate (Coursera)"
                              }
                              text1={
                                "Focus: User-centered design, research, wireframing, prototyping, and usability testing."
                              }
                              text2={"Duration: 6 months (self-paced)."}
                            />
                            <Step6Card
                              reversed
                              bgColor1="#1C4A8A"
                              bgColor2={"#3197DA"}
                              num={"10"}
                              title={"Interaction Design Foundation (IDF)"}
                              text1={
                                "Certifications in various topics like UX design, design thinking, usability, and information architecture."
                              }
                              text2={"Duration: Depends on the course."}
                            />
                          </View>
                        </View>

                        <Row
                          style={{
                            justifyContent: "center",
                            gap: 50,
                            marginBottom: 20,
                          }}
                        >
                          
                          
                        </Row>
                      </View>
                    </View>
                  </View>
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
      </ScrollView>
    </View>
              </View>
              </ImageBackground>
  );
};

export default AIScreen;

const styles = StyleSheet.create({
  aiBody: {
    minHeight: 800,
    justifyContent: "center",
    alignItems: "center",
  },
  aiContainer: {
    flexDirection: "row",
    gap: 50,
    width: 750,
    minHeight: 400,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  step3Wrapper: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    position: "relative",
  },
  top: {
    height: 48,
    backgroundColor: "#7AA666",
    width: "100%",
    paddingHorizontal: 50,
  },
  image: {
    width: 56,
    height: 56,
  },
  bottom: {
    paddingHorizontal: 50,
    paddingTop: 20,
  },
  titleWrapper: {
    flexDirection: "row",
    gap: 30,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
  },
  subTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
  },
  container1: {
    width: 595,
    minHeight: 555,
  },
  dropDown: {
    borderRadius: 20,
    backgroundColor: "#7AA666",
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  bigText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    fontWeight: "700",
    color: "#F5F5F5",
  },
  smallText: {
    fontSize: 13,
    fontFamily: "Poppins-LightItalic",
    fontWeight: "400",
    color: "#F5F5F5",
  },
  openCV: {
    marginBottom: 20,
    paddingVertical: 35,
    paddingTop: 50,
    gap: 35,
    borderRadius: 25,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    marginTop: -50,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  uploadImg: {
    width: 105,
    height: 105,
  },
  picker: {
    height: 40,
    width: "80%",
    backgroundColor: "white",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    color: "black",
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 12,
    padding: 10
  },
  button: {
    alignSelf: "center",
    padding: 16,
    width: 150,
    backgroundColor: "#7AA666",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontFamily: "Poppins-Bold",
  },
  questionnaires: {
    borderRadius: 12,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
    padding: 16,
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 500
  },
  loadingText: {
    color: 'green',
    marginBottom: 10, 
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 10, 
  },
  questionText: {
    fontSize: 14,
    flex: 1, 
    marginRight: 10, 
  },
  answerText: {
    fontSize: 12,
    marginLeft: 10, 
  },
  switch: {
    color: 'green'
  },
  loadingGif: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain', 
  },
  header: {
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
    backgroundColor: '#f7fff4',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 10, 
  }, 
  headertext: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'normal',
    marginTop: 7, 
    color: 'black'
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginLeft: 100,
  marginTop: 5,
  tintColor: '#666',
  },
});
