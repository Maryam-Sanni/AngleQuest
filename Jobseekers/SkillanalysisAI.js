import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import BotIMG from "../assets/AnglequestAI.png";
import down from "../assets/arrow-down.png";
import UploadImg from "../assets/UploadImg.jpeg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MyComponent = ({ onClose }) => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [document, setDocument] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handlePress = () => {
    // Programmatically trigger the file input
    fileInputRef.current.click();
  };

  useEffect(() => {
    const checkSkillAnalysis = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(
            "https://recruitangle.com/api/jobseeker/get-jobseeker-skill-analysis",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = await response.json();

          if (data.status === "success" && data.form_filled) {
            navigation.navigate("Advice Sessions");
          }
        }
      } catch (error) {
        Alert.alert("Error", "Failed to check skill analysis form.");
        console.error(error);
      }
    };

    checkSkillAnalysis();
  }, []);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]; // Select the first file

    if (selectedFile) {
      setDocument(selectedFile); // Store the file object in state
    } else {
      alert("No file selected. Please choose a file to upload.");
    }
  };

  const handleCVUpload = async () => {
    if (!document) {
      alert("No Document Selected. Please select a document to upload.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        alert("Authorization Error: No token found.");
        return;
      }

      const formData = new FormData();
      formData.append("file", document);

      setUploading(true);

      const response = await axios.post(
        "https://recruitangle.com/api/jobseeker/upload-cv",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Explicitly set Content-Type
          },
        },
      );

      if (response.status === 200) {
        alert("Success: CV uploaded successfully.");
        console.log(response.data);
      } else {
        alert(
          `Upload Failed: ${response.data.message || "Unable to upload CV."}`,
        );
        console.error(response.data);
      }
    } catch (error) {
      alert("Error: An error occurred while uploading the CV.");
      console.error("CV Upload Error:", error);
    } finally {
      setUploading(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
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
          style={{ width: 20, height: 20, objectFit: "contain" }}
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

  const Questionnaires = ({ question, isEnabled, toggleSwitch }) => {
    return (
      <View style={styles.questionnaires}>
        <Text
          style={{
            fontSize: 13,
            lineHeight: 15,
            fontFamily: "Poppins-Regular",
          }}
        >
          {question}
        </Text>
        <View>
          <View
            style={{
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 12, fontFamily: "Roboto-light" }}>No</Text>
            <Switch
              trackColor={{ false: "#767577", true: "green" }}
              thumbColor={isEnabled ? "white" : "white"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={{ fontSize: 12, fontFamily: "Roboto-light" }}>
              Yes
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const handleSubmit = () => {
    onClose();
    navigation.navigate("AI Result");
  };

  const handleCVSubmit = () => {
    onClose();
    navigation.navigate("AI Result");
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "#F5F5F5",
        }}
      >
        <View
          style={
            switched
              ? [styles.container, { width: 650, height: 660 }]
              : styles.container
          }
        >
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
              }} // replace with your logo URL
              style={styles.logo}
            />
            <Text style={styles.headerText}>
              {t("Use AngleQuest AI to analyse your skills")}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#3F5637",
                  fontWeight: "bold",
                  fontFamily: "Roboto-Light",
                }}
              >
                ✕
              </Text>
            </TouchableOpacity>
            {switched && (
              <View
                style={{
                  // padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 30,
                }}
              ></View>
            )}
          </View>
          {!switched ? (
            <View style={styles.bottom}>
              <View style={styles.titleWrapper}>
                <Image style={styles.image} source={BotIMG} />
                <View style={{ flex: 1, gap: 8 }}>
                  <Text style={styles.title}>Hello I am AngleQuest AI</Text>
                  <Text style={styles.subTitle}>
                    Upload your CV and choose the next level in your career that
                    you want to reach...
                  </Text>
                  <Text style={styles.subTitle}>
                    I'll conduct a personalized skill gap analysis, growth plan,
                    timeline and references to help you get started!
                  </Text>
                </View>
              </View>
              <DropDown
                title={"Use CV"}
                bgColor={openQues ? "#D9D9D9" : "#6A8F6D"}
                textColor={openQues ? "#777676" : "white"}
                subTitle={"Get a personalized skill gap analysis in 2 minutes"}
                onPress={handleCV}
              />

              {openCV && (
                <Animated.View style={[styles.openCV, animatedStyle]}>
                  <TouchableOpacity
                    onPress={handlePress}
                    style={{ alignSelf: "center" }}
                  >
                    <Image
                      source={UploadImg}
                      style={{ width: 100, height: 100 }}
                    />
                    <Text style={{ paddingVertical: 5, textAlign: "center" }}>
                      Upload CV
                    </Text>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      accept="application/pdf,application/msword"
                      onChange={handleFileSelect}
                      ref={fileInputRef} // Connect the ref to the input
                      style={{ display: "none" }} // Hide the input
                    />
                  </TouchableOpacity>

                  {document && (
                    <View style={{ marginLeft: 20 }}>
                      <Text>Document Name: {document.name}</Text>
                      <Text>Document Size: {document.size} bytes</Text>
                    </View>
                  )}

                  <TextInput
                    style={styles.picker}
                    placeholder="What is your next role?"
                    value={specialization}
                    onChangeText={setSpecialization}
                  />

                  <TouchableOpacity
                    onPress={handleCVUpload}
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
                  bgColor={openQues ? "#6A8F6D" : "#6A8F6D"}
                  textColor={openQues ? "white" : "white"}
                />
              )}
              {openQues && (
                <Animated.View style={[styles.openCV, animatedStyle2]}>
                  <Picker
                    selectedValue={specialization}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSpecialization(itemValue)}
                  >
                    <Picker.Item label="Choose Specialization" value="" />
                    <Picker.Item label="SAP" value="SAP" />
                    <Picker.Item label="Microsoft" value="Microsoft" />
                    <Picker.Item label="Salesforce" value="Salesforce" />
                    <Picker.Item
                      label="Frontend Development"
                      value="Frontend Development"
                    />
                    <Picker.Item
                      label="Backend Development"
                      value="Backend Development"
                    />
                    <Picker.Item label="UI/UX" value="UI/UX" />
                    <Picker.Item label="Data Analysis" value="Data Analysis" />
                    <Picker.Item
                      label="Cloud Computing"
                      value="Cloud Computing"
                    />
                    <Picker.Item label="Management" value="Management" />
                  </Picker>

                  <TouchableOpacity style={styles.button} onPress={handleQues}>
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
                    height: 480,
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
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 595,
    minHeight: 600,
  },

  top: {
    height: 48,
    backgroundColor: "#7AA666",
    width: "100%",
    paddingHorizontal: 50,
  },
  image: {
    width: 70,
    height: 70,
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
    fontWeight: "700",
  },
  subTitle: {
    fontFamily: "Roboto-light",
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
    fontWeight: "700",
    color: "#F5F5F5",
  },
  smallText: {
    fontSize: 13,
    fontFamily: "Roboto-light",
    fontStyle: "italic",
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
    backgroundColor: "coral",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontFamily: "Roboto-light",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3F5637",
    fontFamily: "Roboto-Light",
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

export default MyComponent;
