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

  

  const handleback = () => {
    navigate("/skill-analysis-sessions");
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

              <View style={[styles.aiBody, { minHeight: 900, marginTop: 10, marginLeft: 230 }]}>
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
                          <MainButtons
                            title={"Download pdf"}
                            borderRadius={8}
                            center
                            fontSize={16}
                            width={226}
                            icon={
                              <AntDesign
                                name="download"
                                size={20}
                                color="#135837"
                              />
                            }
                            bgColor={"white"}
                            textColor={"#135837"}
                          />
                          
                        </Row>
                      </View>
                    </View>
                  </View>
                </View>

        </View>
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
});
