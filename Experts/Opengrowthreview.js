import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker,} from "react-native";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";

function MyComponent({ onClose }) {
  const [guides, setGuides] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [remark, setRemark] = useState("");
  const [rating, setRating] = useState("Just Reviewed");
  const [completed, setCompleted] = useState("Yes");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [review, setReview] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  const handlePress = () => {
    onClose();
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedData = await AsyncStorage.getItem("selectedMeeting");
        if (retrievedData) {
          const parsedData = JSON.parse(retrievedData);
          setData(parsedData); // Update the state with the retrieved data
        } else {
          console.log("No data found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Failed to retrieve data from AsyncStorage", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get(
          `${apiUrl}/api/expert/growthplan/get`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.status === 200 && response.data.status === "success") {
          const data = response.data.growthPlan;
          setGuides(data.guides || []);
        } else {
          console.error("Failed to fetch data", response);
        }
      } catch (error) {
        console.error("Failed to load form data", error);
      }
    };

    const retrieveExpertName = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem("first_name");
        const storedLastName = await AsyncStorage.getItem("last_name");
        if (storedFirstName && storedLastName) {
          setFirstName(storedFirstName);
          setLastName(storedLastName);
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    loadFormData();
    retrieveExpertName();
  }, []);

  const handleGuideChange = (index, field, value) => {
    const newGuides = [...guides];
    newGuides[index] = { ...newGuides[index], [field]: value };
    setGuides(newGuides);
  };

  const postReviewStatus = async (reviewStatus) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const payload = {
        jobseeker_id: data?.user_id,
        remark: remark,
        expert_name: `${firstName} ${lastName}`,
        growthplan_id: String(data?.id),
        rating: rating,
        completed: completed,
        review: reviewStatus,
        expertid: data?.expertid,
        title: data?.title,
        role: data?.role,
        date: data?.date_time,
        performance_rating: rating,
        coach: String(data?.name),
        descriptions: guides.map((guide) => ({
          description: guide.guide,
          percentage: guide.percentage,
        })),
      };

      const response = await axios.post(
        `${apiUrl}/api/expert/review-growth-plan`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200 && response.data.status === "success") {
        console.log("Review posted successfully");
        setAlertMessage(t("Review status updated successfully"));
      } else {
        console.error("Failed to post review status", response);
        setAlertMessage(t("Failed to update review status"));
      }
    } catch (error) {
      console.error("Error posting review status", error);
      setAlertMessage(t("Error updating review status"));
    } finally {
      setAlertVisible(true);
    }
  };

  const handleSatisfiedPress = () => {
    setReview("satisfied");
    postReviewStatus("satisfied");
    onClose();
  };

  const handleReplanPress = () => {
    setReview("replan");
    postReviewStatus("replan");
    onClose();
  };


  const hideAlert = () => {
    setAlertVisible(false);
  };

  if (!isVisible) {
    return null; // Return null to unmount the parent component
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F8F8F8",
        marginTop: 40,
        alignItems: "center",
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
              }} // replace with your logo URL
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Review Growth Plan")}</Text>

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
          </View>
          <Text
            style={{
              marginLeft: 730,
              marginTop: 20,
              marginBottom: -15,
              width: 200,
              fontWeight: "600",
            }}
          >
            {t("Uneditable Section")}
          </Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text
                  style={{ fontWeight: "bold", fontFamily: "Roboto-Light" }}
                >
                  {t("Protegee")}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: "grey", fontFamily: "Roboto-Light" }}>
                  {data?.name}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text
                  style={{ fontWeight: "bold", fontFamily: "Roboto-Light" }}
                >
                  {t("Level")}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: "grey", fontFamily: "Roboto-Light" }}>
                  {data?.starting_level}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text
                  style={{ fontWeight: "bold", fontFamily: "Roboto-Light" }}
                >
                  {t("Result Description")}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: "grey", fontFamily: "Roboto-Light" }}>
                  {data?.result_description}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text
                  style={{ fontWeight: "bold", fontFamily: "Roboto-Light" }}
                >
                  {t("How to achieve")}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: "grey", fontFamily: "Roboto-Light" }}>
                  {data?.how_to_achieve}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text
                  style={{ fontWeight: "bold", fontFamily: "Roboto-Light" }}
                >
                  {t("Anticipated Progress (Target)")}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: "grey", fontFamily: "Roboto-Light" }}>
                  {data?.target_level}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text
                  style={{ fontWeight: "bold", fontFamily: "Roboto-Light" }}
                >
                  {t("What do you need to achieve this objective?")}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: "grey", fontFamily: "Roboto-Light" }}>
                  {data?.achieve_the_objective}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              marginLeft: 50,
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: -10,
            }}
          >
            {t("Growth Plan Scoring")}
          </Text>

          <View style={styles.container}>
            {guides.map((guide, index) => (
              <View style={styles.row} key={index}>
                <View style={[styles.cell, { flex: 2 }]}>
                  <Text
                    style={{ fontWeight: "bold", fontFamily: "Roboto-Light" }}
                  >
                    {t("Guide")} {index + 1}
                  </Text>
                </View>
                <View style={[styles.cell, { flex: 5 }]}>
                  <TextInput
                    placeholder={t("Guide description")}
                    placeholderTextColor="grey"
                    style={styles.input}
                    editable={false}
                    value={guide.guide}
                    onChangeText={(text) =>
                      handleGuideChange(index, "guide", text)
                    }
                  />
                </View>
                <View style={[styles.cell, { flex: 2 }]}>
                  <Picker
                    selectedValue={guide.percentage}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      handleGuideChange(index, "percentage", itemValue)
                    }
                  >
                    <Picker.Item label="10%" value="10" />
                    <Picker.Item label="20%" value="20" />
                    <Picker.Item label="30%" value="30" />
                    <Picker.Item label="40%" value="40" />
                    <Picker.Item label="50%" value="50" />
                    <Picker.Item label="60%" value="60" />
                    <Picker.Item label="70%" value="70" />
                    <Picker.Item label="80%" value="80" />
                    <Picker.Item label="90%" value="90" />
                    <Picker.Item label="100%" value="100" />
                  </Picker>
                </View>
              </View>
            ))}
            <TouchableOpacity
              onPress={() =>
                setGuides([...guides, { guide: "", percentage: "0" }])
              }
              style={styles.addButton}
            ></TouchableOpacity>
          </View>
          <Text
            style={{
              marginTop: 30,
              fontWeight: "bold",
              color: "black",
              marginLeft: 50,
            }}
          >
            {" "}
            {t("Overall Feedback/Remark")}
          </Text>
          <View style={{ marginLeft: 50, marginRight: 70, marginTop: 5 }}>
            <TextInput
              style={{
                padding: 6,
                fontSize: 14,
                fontWeight: "normal",
                color: "black",
                borderWidth: 1,
                outline: "black",
                borderColor: "black",
                height: 150,
              }}
              placeholder="e.g: Your goals and its description are clear and concise. Well done for that. I am satisfied with this set goals and I am more than happy to work with you to the finish line.  See you in our one-one session where I'll share further tips on how to achieve this feat and above all meet you."
              value={data?.remark}
              placeholderTextColor="grey"
              multiline={true}
              onChangeText={(text) => setRemark(text)}
            />
          </View>

      
          

          <View style={{ flexDirection: "row", marginBottom: 50 }}>
            <TouchableOpacity
              onPress={handleSatisfiedPress}
              style={styles.buttonAcc}
            >
              <Text style={styles.buttonTextAcc}>
                {t("Satisfied, Proceed")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleReplanPress}
              style={styles.buttonAcc2}
            >
              <Text style={styles.buttonTextAcc2}>
                {t("Not satisfied, replan")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomAlert
        visible={alertVisible}
        title={t("Alert")}
        message={alertMessage}
        onConfirm={hideAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#CCC",
    marginRight: 70,
    marginTop: 20,
    marginLeft: 50,
  },
  checkcontainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginLeft: 40,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textChecked: {
    color: "green",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 5,
  },
  greenBox: {
    width: 920,
    height: 850,
    backgroundColor: "#F8F8F8",
  },
  picker: {
    height: 20,
    width: "100%",
    backgroundColor: "#F8F8F8",
    borderColor: "#F8F8F8",
    color: "grey",
    fontSize: 14,
    outline: "black",
    borderWidth: 1,
    borderColor: "black",
  },
  buttonAcc: {
    backgroundColor: "coral",
    padding: 10,
    marginTop: 30,
    marginLeft: 500,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  buttonTextAcc: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Roboto-Light",
  },
  buttonAcc2: {
    backgroundColor: "green",
    padding: 10,
    marginTop: 30,
    marginLeft: 30,
    paddingHorizontal: 20,
    fontFamily: "Roboto-Light",
    marginBottom: 50,
  },
  buttonTextAcc2: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  buttoncomplete: {
    backgroundColor: "darkgreen",
    padding: 10,
    marginTop: 30,
    marginLeft: 50,
    paddingHorizontal: 5,
    marginBottom: 20,
    borderRadius: 5,
    width: 150,
  },
  input: {
    outline: "none",
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
});

export default MyComponent;
