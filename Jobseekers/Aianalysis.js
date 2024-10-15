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
  Linking,
  ActivityIndicator,
  ScrollView,
  TextInput
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import CircularProgress from "react-native-circular-progress-indicator";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";

import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import AIbgImage from "../assets/AIbg.png";
import AQBot from "../assets/aq-bot11.png";
import BotIMG from "../assets/aq-bot11.png";
import down from "../assets/icons8-arrow-down-24.png";
import UploadImg from "../assets/UploadImg.jpeg";
import MainButtons from "../LandingPage/MainButton";
import Questionnaires from "../components/Questionnaire";
import Footer from "../components/Footer";
import Row from "../components/Row";
import Title from "../components/Title";
import { LinearGradient } from "expo-linear-gradient";
 import OpenModal from '../Jobseekers/SkillanalysisAI';
 import OpenModal2 from '../Jobseekers/Pickexpertadv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



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
const CountryLevels = ({ val, color, title }) => {
  const [levell, setLevell] = useState([]);
  useEffect(() => {
    let data = [];
    for (let i = 0; i < val; i++) {
      data.push(i);
    }
    setLevell(data);
  }, []);
  const [levellOp, setLevellOp] = useState([]);
  useEffect(() => {
    let data = [];
    let total = 12 - val;
    for (let i = 0; i < total; i++) {
      data.push(i);
    }
    setLevellOp(data);
  }, []);
  return (
    <Row style={{ justifyContent: "space-between" }}>
      <Title title={title} textSize={12} textFamily={"Poppins-Regular"} />
      <Row style={{}}>
        {levell?.map((item) => (
          <MaterialCommunityIcons
            key={item}
            name="human-male"
            size={16}
            color={color}
          />
        ))}
        {levellOp?.map((item) => (
          <MaterialCommunityIcons
            key={item}
            name="human-male"
            size={16}
            color={"black"}
          />
        ))}
      </Row>
    </Row>
  );
};
const CirclularLevels = ({ val, color, title, mainVal }) => {
  return (
    <View
      style={{
        alignSelf: "center",
        gap: 10,
      }}
    >
      <CircularProgress
        radius={50}
        value={val}
        maxValue={130000}
        titleColor={"black"}
        initialValue={0}
        valuePrefix={"$"}
        style={{ width: 80, height: 80 }}
        progressValueStyle={{ fontSize: 16, textAlign: "auto" }}
        valuePrefixStyle={{
          fontSize: 16,
          textAlign: "right",
          paddingLeft: 136,
        }}
        titleFontSize={16}
        progressValueColor={color}
        activeStrokeColor={color}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeColor={"#F1F1F1"}
        duration={3000}
      />
      <Title
        textSize={12}
        center
        title={title}
      />
    </View>
  );
};
const Barz = ({ color1, color2, title, val }) => {
  return (
    <View
      style={{
        width: 73,
        alignItems: "center",
        gap: 16,
      }}
    >
      <Title
        textSize={10.56}
        title={`%${val}`}
        center
      />
      <LinearGradient
        colors={[color1, color2]}
        style={{
          width: 10.5,
          height: 178 * (val / 100),
          borderRadius: 6.6,
        }}
      />
      <View style={{ height: 48 }}>
        <Title
          textSize={7.86}
          center
          title={title}
        />
      </View>
    </View>
  );
};

const AIResultHeader = ({ title, subTitle, step }) => {
  return (
    <View style={{ gap: 16 }}>
      <Title
        title={title ? title : "AngleQuest AI Result"}
        textSize={24}
        center
      />
      <Levels val={step} />
      <Title
        title={subTitle}
        textSize={20}
        center
      />
    </View>
  );
};

const Step4Label = ({
  top,
  bottom,
  left,
  right,
  width,
  height,
  borderTopColor,
  borderRightColor,
  borderLeftColor,
  borderBottomColor,
  title,
  link,
}) => {
  return (
    <View
      style={{
        borderTopColor: borderTopColor,
        borderRightColor: borderRightColor,
        borderLeftColor: borderLeftColor,
        borderBottomColor: borderBottomColor,
        borderTopWidth: borderTopColor && 1,
        borderRightWidth: borderRightColor && 1,
        borderLeftWidth: borderLeftColor && 1,
        borderBottomWidth: borderBottomColor && 1,
        borderStyle: "dashed",
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        paddingTop: top && 20,
        paddingBottom: bottom && 20,
        paddingLeft: right && 20,
        paddingRight: left && 20,
        width: width ? width : 360,
        height: height ? height : 52,
        gap: 10,
        position: "absolute",
      }}
    >
      <Title
        textSize={14}
        style={{}}
        title={title}
      />
      {link && (
        <TouchableOpacity onPress={() => Linking.openURL(link)}>
          <Title
            textColor="#5268C1"
            style={{ width: 293 }}
            textSize={10}
            title={link}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
const Step4Image = ({ img, top, left, bottom, right }) => {
  return (
    <Image
      style={{
        position: "absolute",
        top: top,
        left: left,
        right: right,
        bottom: bottom,
      }}
      source={img}
    />
  );
};
const Step5Card = ({
  title,
  text1,
  text2,
  bgColor,
  num,
  top,
  left,
  bottom,
  right,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        position: "absolute",
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        zIndex: 10,
      }}
    >
      <View
        style={{
          borderRadius: 50,
          width: 32,
          height: 32,
          borderWidth: 1,
          borderColor: bgColor ? bgColor : "red",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            borderRadius: 50,
            width: 24,
            height: 24,
            borderWidth: 1,
            borderColor: bgColor ? bgColor : "red",
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
          }}
        >
          <Title textSize={20.48} title={num} />
        </View>
      </View>
      <View
        style={{
          padding: 16,
          backgroundColor: bgColor ? bgColor : "red",
          borderRadius: 8,
          gap: 4,
          width: 224,
        }}
      >
        <Title textColor={"white"} title={title} />
        <View
          style={{
            backgroundColor: "#f7f7f7",
            width: "100%",
            height: 1,
          }}
        />

        <Row style={{ gap: 5 }}>
          <View
            style={{
              width: 2.5,
              height: 2.5,
              borderRadius: 2.5,
              backgroundColor: "white",
            }}
          />
          <Title textSize={12} textColor={"white"} title={text1} />
        </Row>
        <Row style={{ gap: 5 }}>
          <View
            style={{
              width: 2.5,
              height: 2.5,
              borderRadius: 2.5,
              backgroundColor: "white",
            }}
          />
          <Title textSize={12} textColor={"white"} title={text2} />
        </Row>
      </View>
    </View>
  );
};
const Step5Arrow = ({
  top,
  left,
  bottom,
  right,
  arrowType,
  arrowLeft,
  arrowTop,
  arrowRight,
  arrowBottom,
  width,
  height,
  bt,
  br,
  bl,
  bb,
}) => {
  return (
    <View
      style={{
        borderTopColor: "black",
        borderBottomColor: "black",
        borderRightColor: "black",
        borderLeftColor: "black",
        borderTopWidth: bt && 1,
        borderRightWidth: br && 1,
        borderLeftWidth: bl && 1,
        borderBottomWidth: bb && 1,
        borderRadius: 8,
        position: "absolute",
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        height: height,
        width: width,
        zIndex: 0,
      }}
    >
      <AntDesign
        name={arrowType}
        size={14}
        color="black"
        style={{
          position: "absolute",
          bottom: arrowBottom,
          right: arrowRight,
          left: arrowLeft,
          top: arrowTop,
        }}
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
       
      </LinearGradient>
    </View>
  );
};
const AIScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [topPosition, setTopPosition] = useState(20); 
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [document, setDocument] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
   const [isLoading, setIsLoading] = useState(false);
  
  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    console.log("Scroll Position Y:", scrollY); 

    if (scrollY > 0) { 
      setTopPosition(-30); 
    } else {
      setTopPosition(20); 
    }
  };

  const handleStep = (value) => {
    setStep(value);
  };

  const handleChooseDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // You can specify document types like "application/pdf" for PDFs only
      });

      if (result.type === "success") {
        setDocument(result);
      }
    } catch (error) {
      console.log("DocumentPicker Error: ", error);
      Alert.alert("Error", "Failed to select document.");
    }
  };

  const DropDown = ({ title, subTitle, onPress, bgColor, textColor }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.dropDown, { backgroundColor: bgColor, zIndex: 100 }]}
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
  const [analysisData, setAnalysisData] = useState(null);
  const [apiData, setApiData] = useState(null);
   const [loading, setLoading] = useState(true);
  const [specialization, setSpecialization] = useState("");
  const animeHeight = useSharedValue(0);
  const animeHeight2 = useSharedValue(0);
  const [switchStates, setSwitchStates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

   const apiUrl = process.env.REACT_APP_API_URL;
  
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

  const handleQues = async () => {

    if (!specialization || specialization.trim() === '') {
      alert("Missing Specialization, include your target role", "Please enter the job title or specialization.");
      return;
    }

    setSwitched(true);
    await fetchQuestions(); // Fetch questions when proceeding
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

  const toggleSwitch = (index) => {
    setSwitchStates(prev => {
      const newSwitchStates = [...prev];
      newSwitchStates[index] = !newSwitchStates[index];
      return newSwitchStates;
    });
  };
  const toggleSwitch9 = () => setIsEnabled9((previousState) => !previousState);
  const toggleSwitch10 = () =>
    setIsEnabled10((previousState) => !previousState);

  const handleSubmit = () => {
    navigate("/welcome");
  };

  const GoToExpert = () => {
    navigate("/expert-analysis");
  };

  const GoToBack= () => {
    navigate("/skill-analysis-sessions");
  };
  
  const handlePress = () => {
    // Programmatically trigger the file input
    fileInputRef.current.click();
  };

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
      alert("No Document Selected", "Please select a document to upload.");
      return;
    }

    if (!specialization || specialization.trim() === '') {
      alert("Missing Specialization, include your target role", "Please enter the job title or specialization.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Authorization Error", "No token found.");
        return;
      }

      const formData = new FormData();
      formData.append("cv", document);
      formData.append("job_title", specialization);

      setUploading(true);

      const response = await axios.post(
         `${apiUrl}/api/jobseeker/analyze-cv`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "CV uploaded successfully.");
        console.log(response.data);
        navigate('/ai-result');
        onClose();
      } else {
        alert(
          "Upload Failed, please try again",
          response.data.message || "Unable to upload CV."
        );
        console.error(response.data);
      }
    } catch (error) {
      alert("An error occurred while uploading the CV, please try again.", "An error occurred while uploading the CV.");
      console.error("CV Upload Error:", error);
    } finally {
      setUploading(false);
    }
  };

  const fetchQuestions = async () => {
    setLoadingQuestions(true); // Start loading

    try {
      const response = await fetch(
        "https://ai.recruitangle.com/api/v1/prediction/622858da-03bd-40fc-bf7e-67293dfa70b1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: specialization,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data.json && data.json.questions) {
        try {
          const parsedQuestions = JSON.parse(data.json.questions);
          console.log("Parsed Questions:", parsedQuestions);

          if (Array.isArray(parsedQuestions.questions)) {
            setQuestions(parsedQuestions.questions);
          } else {
            console.error("Questions field is not an array", parsedQuestions);
          }
        } catch (parseError) {
          console.error("Failed to parse questions", parseError);
        }
      } else {
        console.error("Questions field is missing or invalid", data);
      }
    } catch (error) {
      console.error("Failed to fetch questions", error);
    } finally {
      setLoadingQuestions(false); // End loading
    }
  };

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

          // Add log to see the structure of parsedAnalysis
          console.log('Checking for knowledge gaps structure:', parsedAnalysis);

          // Check where knowledge_gaps are located and extract details
          const knowledgeGaps = parsedAnalysis?.three_months_step_by_step_guide?.knowledge_gaps || [];
          console.log('Knowledge Gaps:', knowledgeGaps);

          const details = knowledgeGaps.map(item => item.details) || [];
          console.log('Extracted details:', details);

          // Save only the details to AsyncStorage
          await AsyncStorage.setItem('ai_analysis', JSON.stringify(details));
          console.log('ai_analysis details saved to AsyncStorage:', details);

          setApiData(parsedAnalysis); // Set the parsed data to state
        } else {
          console.error('Token not found');
          Alert.alert('Error', 'Authentication token not found. Please log in again.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch analysis data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndData();
  }, []);



  
  // Conditional rendering before the return statement
  if (loading) {
    // Render the loading state before the main return using a custom loading GIF
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('../assets/loading.gif')}  // Reference to your loading GIF
          style={{ width: 100, height: 100 }}        // Customize the size of the GIF
        />
      </View>
    );
  }

  const getColorForCertification = (index, isSecondColor = false) => {
    const colors = [
      { color1: "#DE7423", color2: "#DD963336" },
      { color1: "#D3336B", color2: "#DD333336" },
      { color1: "#6EA84F", color2: "#6EA84F36" },
      { color1: "#D33336", color2: "#D3333636" },
      { color1: "#4E33D3", color2: "#4E33D336" },
      { color1: "#094A2B", color2: "#094A2B36" },
      { color1: "#6E1D1A", color2: "#6E1D1A36" },
    ];

    return isSecondColor ? colors[index].color2 : colors[index].color1;
  };

  const getValForCertification = (index) => {
    const values = [50, 65, 60, 45, 70, 55, 95]; // Your corresponding values
    return values[index];
  };

  const placeholderHireCountries = ["United Kingdom", "Canada", "USA", "Germany", "Australia", "Netherlands"];
  
  const getValForCountry = (index) => {
    const values = [10, 8, 9, 6, 8, 5]; // Example values for each country
    return values[index];
  };

  const getColorForCountry = (index) => {
    const colors = [
      "#FF0289", // Country 1
      "#F9AD50", // Country 2
      "#85A947", // Country 3
      "#C750F9", // Country 4
      "#FF3D00", // Country 5
      "#0AE8F0"  // Country 6
    ];
    return colors[index];
  };

  const placeholderCountries = ["Canada", "Netherland", "United Kingdom", "Germany", "Czech Replublic", "Argentina"];
  
  const getValForCountrys = (index) => {
    const values = [115000, 90000, 100000, 86000, 75000, 80000]; // Example values for each country
    return values[index];
  };

  const getColorForCountrys = (index) => {
    const colors = [
      "#FF0289", // Country 1
      "#FF3D00", // Country 2
      "#85A947", // Country 3
      "#C750F9", // Country 4
      "#0AE8F0", // Country 5
      "#F9AD50"  // Country 6
    ];
    return colors[index];
  };

  const getPositionForLabel = (index) => {
    const positions = [
      {
        imageProps: { top: 85, left: 188 },
        labelProps: { borderTopColor: "#78CB57", borderRightColor: "#78CB57", top: 4, left: -148, paddingTop: 20, width: 360, height: 52 }
      },
      {
        imageProps: { left: 69, bottom: 270 },
        labelProps: { borderBottomColor: "#7E62B4", borderRightColor: "#7E62B4", bottom: 130, left: -208, paddingBottom: 20, width: 302, height: 100 }
      },
      {
        imageProps: { left: 182, bottom: 110 },
        labelProps: { borderBottomColor: "#5583A5", borderRightColor: "#5583A5", bottom: -5, left: -116, paddingBottom: 20, width: 317, height: 70 }
      },
      {
        imageProps: { right: 100, top: 149 },
        labelProps: { borderTopColor: "#4058AD", borderLeftColor: "#4058AD", top: 38, right: -203, paddingTop: 20, width: 317, height: 70 }
      },
      {
        imageProps: { right: 100, bottom: 149 },
        labelProps: { borderBottomColor: "#F36064", borderLeftColor: "#F36064", bottom: 53, right: -180, paddingTop: 20, width: 317, height: 70 }
      }
    ];

    // Loop through positions if the index exceeds the length of the positions array
    return positions[index % positions.length];
  };


  {/* Array of images corresponding to each reference */}
  const images = [
    require("../assets/udemy.png"),
    require("../assets/youtube.png"),
    require("../assets/udacity.png"),
    require("../assets/coursera.png"),
    require("../assets/udemy.png"),
  ];
  
  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };
  
  return (
                 
                        <View style={{ flex: 1 }}>
                            <Topbar />
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Sidebar />
                            

                                <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
                                  
                                  <View style={styles.container}>
                                        <ImageBackground
                                          source={require ('../assets/backgroundimg2.png') }
                                        style={{ height: '100%', width: '100%',flex: 1}}
                                        >
                                        
                                         

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
                                          <TouchableOpacity>
                                            <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 200, alignItems: 'center', marginTop: 20, marginLeft: 10, borderWidth: 1 }}>

                                                            <Text style={{ fontSize: 14, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>AI Analysis</Text>

                                                          </View>
                                             </TouchableOpacity>
                                            <TouchableOpacity onPress={GoToExpert}>
                                              <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'rgba(211,249,216,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 10, borderWidth: 1 }}>
                                                              <Text style={{ fontSize: 14, color: "#f7fff4", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>Expert Analysis</Text>
                                                            </View>
                                               </TouchableOpacity>
                                          </View>
                                          
            {step === 3 ? (
              <View style={styles.aiBody}>
                <View style={styles.aiContainer}>
                  <Image
                    style={{ width: 164, height: 160, objectFit: "contain" }}
                    source={AQBot}
                  />
                  <View style={{ marginTop: 50 }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-start" }}
                    >
                      <BlurView
                        //  tint={"systemThinMaterialLight"}
                        intensity={40}
                        style={{
                          width: 550,
                          height: 220,
                          borderRadius: 20,
                          padding: 20,
                          borderWidth: 1,
                          borderColor: "#fff",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 24,
                            color: "white",
                            fontWeight: "500",
                          }}
                        >
                          Hello 👋 I am 
                          <Text
                            style={{
                              color: "#7AA666",
                              fontWeight: "700",
                              marginLeft: 5
                            }}
                          >
                          AngleQuest AI!
                          </Text>{" "}
                          I will conduct a personalized skill gap analysis,
                          growth plan, timeline and references to help you get
                          started!
                        </Text>
                      </BlurView>
                    </View>
                    <View style={{ alignItems: "flex-end", marginTop: 30 }}>
                      <TouchableOpacity onPress={() => handleStep(2)}>
                      <MainButtons
                        gradient
                        onPress={() => handleStep(2)}
                        title={"Get Started"}
                        borderRadius={8}
                        fontSize={16}
                        width={170}
                        icon={
                          <AntDesign
                            name="arrowright"
                            size={14}
                            color="#ffff"
                          />
                        }
                      />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : step === 2 ? (
              <View style={[styles.aiBody, { minHeight: 1000 }]}>
                <View
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <View
                    style={
                      switched
                        ? [styles.container1, { width: 650 }]
                        : styles.container1
                    }
                  >
                    {switched && (
                      <View style={styles.top}>
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
                      </View>
                    )}
                    {!switched ? (
                      <View style={styles.bottom}>
                        {/*
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
                              growth plan, timeline and references to help you
                              get started!
                            </Text>
                          </View>
                        </View>
                        */}
                        <DropDown
                          title={"Use CV"}
                          bgColor={"#7AA666"}
                          textColor={"white"}
                          subTitle={
                            "Get a personalized skill gap analysis in 2 minutes"
                          }
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
                              placeholder="What is your target career role?"
                              value={specialization}
                              onChangeText={setSpecialization}
                            />

                            <View style={[styles.loadingContainer, { display: uploading ? 'flex' : 'none' }]}>
                              <Text style={styles.loadingText}>Analyzing CV, Please wait...</Text>
                              <Image 
                                source={require('../assets/loading.gif')}
                                style={styles.loadingGif} 
                              />
                            </View>

                            <View style={{ alignItems: "center" }}>
                              <TouchableOpacity                                  onPress={() => handleStep(3)}>
                              <MainButtons
                                gradient
                                onPress={() => handleStep(3)}
                                title={"Submit"}
                                borderRadius={8}
                                fontSize={16}
                                width={170}
                              />
                              </TouchableOpacity>
                            </View>
                          </Animated.View>
                        )}
                        {/*openCV && (  )*/}
                        {/*!openCV && (
                        )*/}
                        <DropDown
                          title={"Use Questionnaire"}
                          subTitle={
                            "Get a personalized skill gap analysis in 10 minutes"
                          }
                          onPress={handleQuestionaire}
                        />
                        {openQues && (
                          <Animated.View
                            style={[styles.openCV, animatedStyle2]}
                          >
                            <TextInput
                              style={styles.picker}
                              placeholder="What is your target career role?"
                              value={specialization}
                              onChangeText={setSpecialization}
                            />

                            <View style={{ alignItems: "center" }}>
                              <TouchableOpacity  onPress={handleQues}>
                              <MainButtons
                                gradient
                                onPress={handleQues}
                                title={"Proceed"}
                                borderRadius={8}
                                fontSize={16}
                                width={170}
                              />
                              </TouchableOpacity>
                            </View>
                          </Animated.View>
                        )}
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.bottom,
                          {
                            backgroundColor: "white",
                          },
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
                              gap: 12,
                              marginVertical: 10,
                              backgroundColor: "#fff",
                            }}
                          >
                            {loadingQuestions ? (
                              <View style={styles.loadingContainer}>
                                <Text style={styles.loadingText}>Compiling questions, Please wait...</Text>
                                <Image 
                                  source={require('../assets/loading.gif')}
                                  style={styles.loadingGif} 
                                />
                              </View>
                            ) : (
                              <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                  height: 480,
                                  gap: 12,
                                  marginVertical: 10,
                                  marginHorizontal: 10,
                                }}
                              >
                                {questions.map((question, index) => (
                                  <View key={index} style={styles.questionContainer}>
                                    <Text style={styles.questionText}>{`${index + 1}. ${question.question}`}</Text>
                                    <Switch
                                      value={switchStates[index] || false}
                                      onValueChange={() => toggleSwitch(index)}
                                      trackColor={{ false: "#767577", true: "coral" }} 
                                      thumbColor={switchStates[index] ? "#fff" : "#fff"}
                                      style={styles.switch}
                                    />
                                    <Text style={styles.answerText}>{switchStates[index] ? "Yes" : "No"}</Text>
                                  </View>
                                ))}

                              </ScrollView>
                            )}
                          </View>

                          <Row
                            style={{
                              justifyContent: "space-between",
                              marginBottom: 20,
                            }}
                          >
                             <TouchableOpacity                                                               onPress={() => setSwitched(false)}>
                            <MainButtons
                              onPress={() => setSwitched(false)}
                              title={"Back"}
                              borderRadius={8}
                              fontSize={16}
                              bgColor={"white"}
                              textColor={"black"}
                            />
                             </TouchableOpacity>
                            <TouchableOpacity                onPress={() => handleStep(3)}>
                            <MainButtons
                              gradient
                              onPress={() => handleStep(3)}
                              title={"Submit"}
                              borderRadius={8}
                              fontSize={16}
                            />
                            </TouchableOpacity>
                          </Row>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ) : step === 1 ? (
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
                              "Certifications & Courses | Certification to obtain"
                            }
                          />
                          <View style={styles.card}>
                            <Text style={styles.sectionHeader}>Current Position</Text>
                            <Text style={styles.sectionContent}>
                              {apiData.analysis?.current_position?.title || 'No title available'}
                            </Text>

                            <Text style={styles.sectionHeader}>Next Career Level</Text>
                            <Text style={styles.sectionContent}>
                              {apiData.next_career_stage?.title || 'No career level available'}
                            </Text>

                            <Text style={styles.sectionHeader}>Rationale</Text>
                            <Text style={styles.sectionContent}>
                              {apiData?.next_career_stage?.rationale || 'No rationale provided'}
                            </Text>

                            <Text style={styles.sectionHeader}>Your Proficiency Rating</Text>
                            <Text style={styles.sectionContent}>
                              {apiData.analysis?.current_proficiency_rating || 'No rating available'}
                            </Text>
                          </View>
                          <Row style={{ width: "100%", gap: 20 }}>
                            <View
                              style={[
                                styles.step3Wrapper,
                                {
                                  backgroundColor: "#f5f5f5",
                                  width: "60%",
                                  height: 340,
                                },
                              ]}
                            >
                        <Title
                            textFamily={"Poppins-SemiBold"}
                            textSize={16}
                            title={"Courses & Certification"}
                          />
                          <View
                            style={{
                              alignItems: "flex-end",
                              height: "100%",
                              paddingBottom: 20,
                              flexDirection: "row",
                              gap: 6,
                            }}
                          >
                            {apiData.three_months_step_by_step_guide.certifications_and_courses && apiData.three_months_step_by_step_guide.certifications_and_courses.length > 0 ? (
                              apiData.three_months_step_by_step_guide.certifications_and_courses.map((course, index) => (
                                  <Barz
                                      key={index}
                                      color1={getColorForCertification(index)}
                                      color2={getColorForCertification(index, true)}
                                      val={getValForCertification(index)} // Use the refactored function here
                                      title={course.certification}
                                  />
                              ))
                            ) : (
                              <div>No data available</div> // Message to display when there's no data
                            )}


                          </View>
                        </View>
                            <View
                              style={[
                                styles.step3Wrapper,
                                {
                                  backgroundColor: "#ECFBF4",
                                  width: "37%",
                                  height: 340,
                                  gap: 20,
                                },
                              ]}
                            >
                                <Text style={{fontSize: 16}}>Countries with the highest hire rate for |
                                  <Title
                                    textFamily={"Poppins-SemiBold"}
                                    textSize={16}
                                    title={                              
                                (apiData.analysis?.current_position?.title || 'No title available')
                                    }
                                  /><Text>s</Text>
                                    </Text>
                                  <View style={{ gap: 20 }}>
                                    {apiData?.top_countries_hire_rate?.length > 0 ? (
                                      apiData.top_countries_hire_rate.map((country, index) => (
                                        <CountryLevels
                                          key={index}
                                          val={getValForCountry(index)} // Use actual hire rates for countries
                                          color={getColorForCountry(index)} // Use actual colors for each country
                                          title={country} // Use the country name as the title
                                        />
                                      ))
                                    ) : (
                                      placeholderHireCountries.map((country, index) => (
                                        <CountryLevels
                                          key={index}
                                          val={getValForCountry(index)} // Placeholder hire rates
                                          color={getColorForCountry(index)} // Placeholder colors
                                          title={country} // Placeholder country name
                                        />
                                      ))
                                    )}



                                
                              </View>
                            </View>
                          </Row>
                          <View
                            style={[
                              styles.step3Wrapper,
                              {
                                backgroundColor: "#f5f5f5",
                                width: "100%",
                                height: 210,
                                gap: 20,
                              },
                            ]}
                          >
                              <Text style={{fontSize: 16}}>Highest Paying countries for | 
                                <Title
                                  textFamily={"Poppins-SemiBold"}
                                  textSize={16}
                                  title={
                                    (apiData.analysis?.current_position?.title || 'No title available')
                                  }
                                /><Text>s</Text>
                                </Text><Row style={{ justifyContent: "space-around" }}>
                                  {apiData?.highest_paying_countries?.length > 0 ? (
                                    apiData.highest_paying_countries.map((country, index) => (
                                      <CirclularLevels
                                        key={index}
                                        val={getValForCountrys(index)} // Use the actual values for each country
                                        color={getColorForCountrys(index)} // Use the actual colors for each country
                                        title={country} // Use the country name as the title
                                      />
                                    ))
                                  ) : (
                                    placeholderCountries.map((country, index) => (
                                      <CirclularLevels
                                        key={index}
                                        val={getValForCountrys(index)} // Use placeholder values
                                        color={getColorForCountrys(index)} // Use placeholder colors
                                        title={country} // Placeholder country name
                                      />
                                    ))
                                  )}


                              
                            </Row>
                          </View>
                        </View>

                        <Row
                          style={{
                            justifyContent: "center",
                            gap: 50,
                            marginBottom: 20,
                          }}
                        >
                          
                          <TouchableOpacity                onPress={() => handleStep(4)}>
                          <MainButtons
                            gradient
                            onPress={() => handleStep(4)}
                            title={"Next"}
                            borderRadius={8}
                            center
                            fontSize={16}
                            width={226}
                          />
                          </TouchableOpacity>
                        </Row>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
                                         
                          
            ) : step === 4 ? (
              <View style={[styles.aiBody, { minHeight: 900, marginLeft: 230 }]}>
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
                              "Learning References | How to learn your goals"
                            }
                          />
                          <View style={{ position: "relative" }}>
                            <Image
                              source={require("../assets/step4.png")}
                              style={{ height: 526, width: 526 }}
                            />

                            {apiData.three_months_step_by_step_guide.learning_references.map((reference, index) => {
                              const position = getPositionForLabel(index); 
                              return (
                                <>
                                  <Step4Image
                                    key={index} 
                                    {...position.imageProps} // Spread position props
                                    img={images[index]} // Use the corresponding image based on index
                                  />
                                  <Step4Label
                                    title={reference.course} // Use reference action for the title
                                    link={reference.link} // Use reference details for the link
                                    borderTopColor={position.borderTopColor}
                                    borderRightColor={position.borderRightColor}
                                    {...position.labelProps} // Spread position props for the label
                                  />
                                </>
                              );
                            })}
                            
                           
                          </View>
                        </View>

                        <Row
                          style={{
                            justifyContent: "center",
                            gap: 50,
                            marginBottom: 20,
                          }}
                        >
                          
                          <TouchableOpacity                onPress={() => handleStep(5)}>
                          <MainButtons
                            gradient
                            onPress={() => handleStep(5)}
                            title={"Next"}
                            borderRadius={8}
                            center
                            fontSize={16}
                            width={226}
                          />
                          </TouchableOpacity>
                        </Row>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : step === 5 ? (
              <View style={[styles.aiBody, { minHeight: 900, marginLeft: 230 }]}>
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
                            subTitle={"Study Road Map | What to begin from"}
                          />
                          <View
                            style={{ position: "relative", minHeight: 525 }}
                          >
                            <>
                              <Step5Card
                                bgColor={"#5679EE"}
                                num={"1"}
                               title={apiData.six_months_step_by_step_guide.study_road_map[0]?.area || 'No Title Available'} 
                                text1={apiData.six_months_step_by_step_guide.study_road_map[0]?.details || 'No Details Available'} 
                                top={10}
                                left={-500}
                              />
                              {/* Arrow 1 */}
                              <Step5Arrow
                                top={60}
                                left={-236}
                                height={105}
                                width={80}
                                bt
                                br
                                arrowBottom={11}
                                arrowRight={-7}
                                arrowType={"caretdown"}
                              />

                              <Step5Card
                                bgColor={"#17A398"}
                                num={"2"}
                                title={apiData.three_months_step_by_step_guide.study_road_map[0]?.area || 'No Title Available'} // Fallback if area is not present
                                text1={apiData.three_months_step_by_step_guide.study_road_map[0]?.details || 'No Details Available'} // Fallback if details are not present

                                top={150}
                                left={-275}
                              />
                              {/* Arrow 2 */}
                              <Step5Arrow
                                top={200}
                                left={-245}
                                height={95}
                                width={80}
                                bt
                                bl
                                arrowBottom={7}
                                arrowLeft={-8}
                                arrowType={"caretdown"}
                              />

                              <Step5Card
                                bgColor={"#FFC107"}
                                num={"3"}
                                title={apiData.nine_months_step_by_step_guide.study_road_map[0]?.area || 'No Title Available'} // Fallback if area is not present
                                text1={apiData.nine_months_step_by_step_guide.study_road_map[0]?.details || 'No Details Available'} // Fallback if details are not present

                                top={285}
                                left={-375}
                              />
                              {/* Arrow 3 */}
                              <Step5Arrow
                                bottom={86}
                                left={-350}
                                height={95}
                                width={80}
                                bt
                                bl
                                arrowBottom={7}
                                arrowLeft={-8}
                                arrowType={"caretdown"}
                              />

                              <Step5Card
                                bgColor={"#FF6F61"}
                                num={"4"}
                                title={apiData.six_months_step_by_step_guide.study_road_map[1]?.area || 'No Title Available'} // Fallback if area is not present
                                text1={apiData.six_months_step_by_step_guide.study_road_map[1]?.details || 'No Details Available'} // Fallback if details are not present

                                bottom={-10}
                                left={-500}
                              />
                              {/* Arrow 4 */}
                              <Step5Arrow
                                bottom={-45}
                                left={-236}
                                height={95}
                                width={123}
                                bt
                                arrowTop={-8}
                                arrowRight={3}
                                arrowType={"caretright"}
                              />

                              <Step5Card
                                bgColor={"#2ECC71"}
                                num={"5"}
                                title={apiData.three_months_step_by_step_guide.study_road_map[1]?.area || 'No Title Available'} // Fallback if area is not present
                                text1={apiData.three_months_step_by_step_guide.study_road_map[1]?.details || 'No Details Available'} // Fallback if details are not present

                                bottom={10}
                                left={-170}
                              />
                              {/* Arrow 5 */}
                              <Step5Arrow
                                bottom={-45}
                                right={-181}
                                height={95}
                                width={123}
                                bt
                                arrowTop={-8}
                                arrowRight={3}
                                arrowType={"caretright"}
                              />

                              <Step5Card
                                bgColor={"#C19682"}
                                num={"6"}
                                title={apiData.nine_months_step_by_step_guide.study_road_map[1]?.area || 'No Title Available'} // Fallback if area is not present
                                text1={apiData.nine_months_step_by_step_guide.study_road_map[1]?.details || 'No Details Available'} // Fallback if details are not present

                                bottom={0}
                                right={-400}
                              />
                              {/* Arrow 6 */}
                              <Step5Arrow
                                bottom={100}
                                right={-300}
                                height={95}
                                width={123}
                                br
                                bt
                                arrowTop={-7}
                                arrowRight={14}
                                arrowType={"caretleft"}
                              />

                              <Step5Card
                                bgColor={"#B4CBDB"}
                                num={"7"}
                                title={apiData.six_months_step_by_step_guide.study_road_map[2]?.area || 'No Title Available'} // Fallback if area is not present
                                text1={apiData.six_months_step_by_step_guide.study_road_map[2]?.details || 'No Details Available'} // Fallback if details are not present

                                top={285}
                                right={-275}
                              />
                              {/* Arrow 7 */}
                              <Step5Arrow
                                bottom={210}
                                right={-300}
                                height={95}
                                width={123}
                                bl
                                bt
                                arrowTop={-8}
                                arrowRight={80}
                                arrowType={"caretright"}
                              />

                              <Step5Card
                                bgColor={"#CDDCD0"}
                                num={"8"}
                                title={apiData.three_months_step_by_step_guide.study_road_map[2]?.area || 'No Title Available'} // Fallback if area is not present
                                text1={apiData.three_months_step_by_step_guide.study_road_map[2]?.details || 'No Details Available'} // Fallback if details are not present

                                right={-442}
                                top={165}
                              />
                              {/* Arrow 8 */}
                              <Step5Arrow
                                top={100}
                                right={-350}
                                height={95}
                                width={23}
                                br
                                bt
                                arrowTop={11}
                                arrowRight={-8}
                                arrowType={"caretup"}
                              />

                              <Step5Card
                                bgColor={"#40E0CD"}
                                num={"9"}
                                title={apiData.nine_months_step_by_step_guide.study_road_map[2]?.area || 'No Title Available'} // Fallback if area is not present
                                text1={apiData.nine_months_step_by_step_guide.study_road_map[2]?.details || 'No Details Available'} // Fallback if details are not present

                                top={10}
                                right={-500}
                              />
                              {/* Arrow 9 */}
                              <Step5Arrow
                                top={68}
                                right={-280}
                                height={30}
                                width={123}
                                br
                                bt
                                arrowTop={-7}
                                arrowRight={97}
                                arrowType={"caretleft"}
                              />

                              <Step5Card
                                bgColor={"#B284BE"}
                                num={"10"}
                                title={apiData.three_months_step_by_step_guide.study_road_map[3]?.area || 'No Title Available'} // Fallback if area is not present
                                text1={apiData.three_months_step_by_step_guide.study_road_map[3]?.details || 'No Details Available'} // Fallback if details are not present

                                top={30}
                                right={-170}
                              />
                            </>
                            <Step4Image
                              bottom={130}
                              img={require("../assets/collaborationArt.png")}
                              right={-470}
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
                         
                          <TouchableOpacity                onPress={() => handleStep(6)}>
                          <MainButtons
                            gradient
                            onPress={() => handleStep(6)}
                            title={"Next"}
                            borderRadius={8}
                            center
                            fontSize={16}
                            width={226}
                          />
                          </TouchableOpacity>
                        </Row>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : step === 6 ? (
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
                              title={apiData.three_months_step_by_step_guide.knowledge_gaps[0]?.area || apiData.nine_months_step_by_step_guide.knowledge_gaps[0]?.area || 'No Area Available'}
                              text1={apiData.three_months_step_by_step_guide.knowledge_gaps[0]?.details || apiData.nine_months_step_by_step_guide.knowledge_gaps[0]?.details || 'No Details Available'}
                            />
                            <Step6Card
                              reversed
                              bgColor1="#1C4A8A"
                              bgColor2={"#3197DA"}
                              num={"02"}
                              title={apiData.three_months_step_by_step_guide.knowledge_gaps[1]?.area}
                              text1={apiData.three_months_step_by_step_guide.knowledge_gaps[1]?.details || apiData.nine_months_step_by_step_guide.knowledge_gaps[1]?.details || 'No Details Available'}
                            />
                            <Step6Card
                              bgColor1="#8F1987"
                              bgColor2={"#DF2783"}
                              num={"03"}
                              title={apiData.three_months_step_by_step_guide.knowledge_gaps[2]?.area || apiData.nine_months_step_by_step_guide.knowledge_gaps[2]?.area || 'No Area Available'}
                              text1={apiData.three_months_step_by_step_guide.knowledge_gaps[2]?.details || apiData.nine_months_step_by_step_guide.knowledge_gaps[2]?.details || 'No Details Available'}
                            />
                            <Step6Card
                              reversed
                              bgColor1="#13E3D2"
                              bgColor2={"#0E7B75"}
                              num={"04"}
                              title={apiData.three_months_step_by_step_guide.knowledge_gaps[3]?.area || apiData.nine_months_step_by_step_guide.knowledge_gaps[3]?.area || 'No Area Available'}
                              text1={apiData.three_months_step_by_step_guide.knowledge_gaps[3]?.details || apiData.nine_months_step_by_step_guide.knowledge_gaps[3]?.details || 'No Details Available'}
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
                          <TouchableOpacity onPress={handleOpenPress2}>
                          <MainButtons
                            gradient
                            onPress={handleOpenPress}
                            title={"Proceed to select an expert"}
                            borderRadius={8}
                            center
                            fontSize={16}
                            width={250}
                          />
                        </TouchableOpacity>
                        </Row>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
        
                                           </ImageBackground>
        </View>
                             
      </ScrollView>
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
                                  <OpenModal2 onClose={() => handleCloseModal2()} />
                                </View>
                              </Modal>
                                 
    </View>
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
  card: {
    backgroundColor: '#ECFBF4', // Light lemon color
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 17,
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 13,
    marginBottom: 15,
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
  touch:{
    borderWidth: 1,
    padding: 10,
    borderColor: '#666',
    borderRadius: 5,
    marginLeft: 30
  }
});