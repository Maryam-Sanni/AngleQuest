import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Top from "../components/HomeTop";
import MainFooter from "../LandingPage/MainFooter";
import AIbgImage from "../assets/AIbg.png";
import AQBot from "../assets/aq-bot11.png";
import MainButtons from "../LandingPage/MainButton";
import { TouchableOpacity } from "react-native";
import { Switch } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Questionnaires from "../components/Questionnaire";

const AIScreen = () => {
  const [step, setStep] = useState(1);
  const handleStep = () => {
    if (step < 3) {
      setstep(step + 1);
    } else {
      setStep(3);
    }
  };

  const DropDown = ({ title, subTitle, onPress, bgColor, textColor }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.dropDown, { backgroundColor: bgColor }]}
      >
        <View style={{ gap: 12 }}>
          <Text style={[styles.bigText, { color: textColor }]}>{title}</Text>
          <Text style={[styles.smallText, { color: textColor }]}>
            {subTitle}
          </Text>
        </View>
        <Image
          source={down}
          style={{ width: 27, height: 14, objectFit: "contain" }}
        />
      </TouchableOpacity>
    );
  };
  const [openCV, setOpenCV] = useState(false);
  const [openQues, setOpenQues] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [specialization, setSpecialization] = useState("");
  const animeHeight = useSharedValue(0);
  const animeHeight2 = useSharedValue(0);

  const handleCV = () => {
    setOpenCV(!openCV);
    if (openCV) {
      animeHeight.value = withTiming(0, { duration: 100 });
    } else {
      animeHeight.value = withSpring(410, { duration: 1000 });
    }
    setOpenQues(false);
  };

  const handleQuestionaire = () => {
    setOpenQues(!openQues);
    if (openQues) {
      animeHeight2.value = withTiming(0, { duration: 100 });
    } else {
      animeHeight2.value = withSpring(220, { duration: 1000 });
    }
    setOpenCV(false);
  };

  const handleQues = () => {
    setSwitched(true);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animeHeight.value,
    };
  });
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      height: animeHeight2.value,
    };
  });

  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);
  const [isEnabled7, setIsEnabled7] = useState(false);
  const [isEnabled8, setIsEnabled8] = useState(false);
  const [isEnabled9, setIsEnabled9] = useState(false);
  const [isEnabled10, setIsEnabled10] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const toggleSwitch3 = () => setIsEnabled3((previousState) => !previousState);
  const toggleSwitch4 = () => setIsEnabled4((previousState) => !previousState);
  const toggleSwitch5 = () => setIsEnabled5((previousState) => !previousState);
  const toggleSwitch6 = () => setIsEnabled6((previousState) => !previousState);
  const toggleSwitch7 = () => setIsEnabled7((previousState) => !previousState);
  const toggleSwitch8 = () => setIsEnabled8((previousState) => !previousState);
  const toggleSwitch9 = () => setIsEnabled9((previousState) => !previousState);
  const toggleSwitch10 = () =>
    setIsEnabled10((previousState) => !previousState);

  const handleSubmit = () => {
    onClose();
    navigation.navigate("AI Result");
  };
  return (
    <View style={{ flex: 1 }}>
      <Top />
      <ScrollView style={{ flexGrow: 1, maxHeight: 2000 }}>
        <ImageBackground
          source={AIbgImage}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#0B281A",
          }}
        >
          {step === 1 ? (
            <View style={styles.aiBody}>
              <View style={styles.aiContainer}>
                <Image
                  style={{ width: 164, height: 160, objectFit: "contain" }}
                  source={AQBot}
                />
                <View style={{ flex: 1, backgroundColor: "#FFFFFF14" }}>
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      fontSize: 24,
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Hello, I am{" "}
                    <Text
                      style={{
                        color: "#7AA666",
                        fontWeight: "700",
                        fontFamily: "Poppins-BoldItalic",
                      }}
                    >
                      Angle Quest!
                    </Text>{" "}
                    I will conduct a personalized skill gap analysis, growth
                    plan, timeline and references to help you get started!
                  </Text>
                </View>
                  <MainButtons
                    fontSize={21}
                    outlined
                    textColor={"#135837"}
                    title={"Get Started"}
                    borderRadius={10}
                    width={150}
                    onPress={handleStep}
                  />
              </View>
            </View>
          ) : step === 2 ? (
            <View style={styles.aiBody}>
              {/*  
              <View style={styles.aiContainer}>
              <Image
                  style={{ width: 268, height: 264, objectFit: "contain" }}
                  source={AQBot}
                />

                <View>
                    */}
              <View
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <View
                  style={
                    switched
                      ? [styles.container, { width: 650 }]
                      : styles.container
                  }
                >
                  <View style={styles.top}>
                    {switched && (
                      <View
                        style={{
                          // padding: 10,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 30,
                        }}
                      >
                        <Image
                          style={{
                            marginTop: 5,
                            width: 34,
                            height: 34,
                            objectFit: "contain",
                          }}
                          source={BotIMG}
                        />
                        <Text
                          style={{
                            color: "#F5F5F5",
                            fontFamily: "Poppins-Bold",
                            fontSize: 16,
                          }}
                        >
                          AngleQuest AI Gap Analysis Questionnaire
                        </Text>
                      </View>
                    )}
                  </View>
                  {!switched ? (
                    <View style={styles.bottom}>
                      <View style={styles.titleWrapper}>
                        <Image style={styles.image} source={BotIMG} />
                        <View style={{ flex: 1, gap: 8 }}>
                          <Text style={styles.title}>
                            Hello I am AngleQuest AI
                          </Text>
                          <Text style={styles.subTitle}>
                            Upload your CV and choose the next level in your
                            career that you want to reach...
                          </Text>
                          <Text style={styles.subTitle}>
                            I'll conduct a personalized skill gap analysis,
                            growth plan, timeline and references to help you get
                            started!
                          </Text>
                        </View>
                      </View>
                      <DropDown
                        title={"Use CV"}
                        bgColor={openQues ? "#D9D9D9" : "#7AA666"}
                        textColor={openQues ? "#777676" : "white"}
                        subTitle={
                          "Get a personalized skill gap analysis in 2 minutes"
                        }
                        onPress={handleCV}
                      />

                      {openCV && (
                        <Animated.View style={[styles.openCV, animatedStyle]}>
                          <TouchableOpacity
                            onPress={handleChooseDocument}
                            style={{ alignSelf: "center" }}
                          >
                            <Image
                              source={UploadImg}
                              style={styles.uploadImg}
                            />
                            <Text
                              style={{
                                paddingVertical: 5,
                                textAlign: "center",
                              }}
                            >
                              Upload CV
                            </Text>
                          </TouchableOpacity>
                          <Picker
                            onChange={setSpecialization}
                            selectedValue={specialization}
                            onValueChange={(itemValue, itemIndex) =>
                              setSpecialization(itemValue)
                            }
                            style={styles.picker}
                          >
                            <Picker.Item
                              label="Choose Specialization"
                              value=""
                            />
                            <Picker.Item
                              label="Microsoft Azure"
                              value="Microsoft Azure"
                            />
                            <Picker.Item
                              label="Java Engineering"
                              value="Java Engineering"
                            />
                            <Picker.Item label="SAP FI" value="SAP FI" />
                            <Picker.Item
                              label="Microsoft Azure"
                              value="Microsoft Azure"
                            />
                            <Picker.Item label="Dev Ops" value="Dev Ops" />
                            <Picker.Item
                              label="Frontend Development"
                              value="Frontend Development"
                            />
                            <Picker.Item
                              label="Backend Development"
                              value="Backend Development"
                            />
                            <Picker.Item
                              label="Fullstack Development"
                              value="Fullstack Development"
                            />
                            <Picker.Item
                              label="Data Analysis"
                              value="Data Analysis"
                            />
                            <Picker.Item
                              label="UI/UX Design"
                              value="UI/UX Design"
                            />
                          </Picker>

                          <TouchableOpacity
                            onPress={handleSubmit}
                            style={styles.button}
                          >
                            <Text style={styles.buttonText}>Submit</Text>
                          </TouchableOpacity>
                        </Animated.View>
                      )}
                      {/*openCV && (  )*/}
                      {!openCV && (
                        <DropDown
                          title={"Use Questionnaire"}
                          subTitle={
                            "Get a personalized skill gap analysis in 10 minutes"
                          }
                          onPress={handleQuestionaire}
                        />
                      )}
                      {openQues && (
                        <Animated.View style={[styles.openCV, animatedStyle2]}>
                          <Picker
                            selectedValue={specialization}
                            onValueChange={(itemValue, itemIndex) =>
                              setSpecialization(itemValue)
                            }
                            style={styles.picker}
                          >
                            <Picker.Item
                              label="Choose Specialization"
                              value=""
                            />
                            <Picker.Item
                              label="Microsoft Azure"
                              value="Microsoft Azure"
                            />
                            <Picker.Item
                              label="Java Engineering"
                              value="Java Engineering"
                            />
                            <Picker.Item label="SAP FI" value="SAP FI" />
                            <Picker.Item
                              label="Microsoft Azure"
                              value="Microsoft Azure"
                            />
                            <Picker.Item label="Dev Ops" value="Dev Ops" />
                            <Picker.Item
                              label="Frontend Development"
                              value="Frontend Development"
                            />
                            <Picker.Item
                              label="Backend Development"
                              value="Backend Development"
                            />
                            <Picker.Item
                              label="Fullstack Development"
                              value="Fullstack Development"
                            />
                            <Picker.Item
                              label="Data Analysis"
                              value="Data Analysis"
                            />
                            <Picker.Item
                              label="UI/UX Design"
                              value="UI/UX Design"
                            />
                          </Picker>

                          <TouchableOpacity
                            style={styles.button}
                            onPress={handleQues}
                          >
                            <Text style={styles.buttonText}>Proceed</Text>
                          </TouchableOpacity>
                        </Animated.View>
                      )}
                    </View>
                  ) : (
                    <View style={styles.bottom}>
                      <View
                        style={{
                          height: "100%",
                          gap: 15,
                          justifyContent: "space-between",
                        }}
                      >
                        <ScrollView
                          showsVerticalScrollIndicator={false}
                          contentContainerStyle={{
                            // paddingVertical: 10,
                            height: 400,
                            gap: 12,
                            marginVertical: 10,
                            marginHorizontal: 10,
                          }}
                        >
                          <Questionnaires
                            isEnabled={isEnabled1}
                            toggleSwitch={toggleSwitch1}
                            question={
                              "1. I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!"
                            }
                          />
                          <Questionnaires
                            isEnabled={isEnabled2}
                            toggleSwitch={toggleSwitch2}
                            question={
                              "2. I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!"
                            }
                          />
                          <Questionnaires
                            isEnabled={isEnabled3}
                            toggleSwitch={toggleSwitch3}
                            question={
                              "3. I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!"
                            }
                          />
                          <Questionnaires
                            isEnabled={isEnabled4}
                            toggleSwitch={toggleSwitch4}
                            question={
                              "4. I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!"
                            }
                          />
                          <Questionnaires
                            isEnabled={isEnabled5}
                            toggleSwitch={toggleSwitch5}
                            question={
                              "5. I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!"
                            }
                          />
                          <Questionnaires
                            isEnabled={isEnabled6}
                            toggleSwitch={toggleSwitch6}
                            question={
                              "6. I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!"
                            }
                          />
                          <Questionnaires
                            isEnabled={isEnabled7}
                            toggleSwitch={toggleSwitch7}
                            question={
                              "7. I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!"
                            }
                          />
                          <Questionnaires
                            isEnabled={isEnabled8}
                            toggleSwitch={toggleSwitch8}
                            question={
                              "8. I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!"
                            }
                          />
                          <Questionnaires
                            isEnabled={isEnabled9}
                            toggleSwitch={toggleSwitch9}
                            question={
                              "9. I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!"
                            }
                          />
                          <Questionnaires
                            isEnabled={isEnabled10}
                            toggleSwitch={toggleSwitch10}
                            question={
                              "10. I’ll conduct a personalized skill gap analysis, growth plan, timeline, and references to help you get started!"
                            }
                          />
                        </ScrollView>

                        <TouchableOpacity
                          style={[
                            styles.button,
                            {
                              paddingVertical: 10,
                              width: 100,
                              alignSelf: "flex-end",
                              marginBottom: 20,
                            },
                          ]}
                          onPress={handleSubmit}
                        >
                          <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>
              {/*  </View>
              </View>
              */}
            </View>
          ) : null}
          {/* <MainFooter />*/}
        </ImageBackground>
      </ScrollView>
    </View>
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
  container: {
    width: 595,
    minHeight: 555,
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
  },
  uploadImg: {
    width: 135,
    height: 135,
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
});
