import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigate } from 'react-router-dom';
import Top from "../components/HomeTop";
import Footer from "../components/Footer";
import MainButtons from "../LandingPage/MainButton";
import Row from "../components/Row";
import Title from "../components/Title";
import CheckMark from "../assets/checkmark-circle-02.png";
import carta from "../assets/carta.png";
import heineken from "../assets/heineken.png";
import blueforte from "../assets/blueforte.png";
import deliotte from "../assets/deliotte.png";
import alix from "../assets/alix.png";
import philips from "../assets/philips.png";
import PeopleComponent from "../components/PeopleComponent";

const CheckedItem = ({ text }) => {
  return (
    <Row style={{ gap: 10 }}>
      <Image
        source={CheckMark}
        style={{ width: 32, height: 32, objectFit: "contain" }}
      />
      <Title title={text} textSize={20} />
    </Row>
  );
};
const Input = ({ label, req, val, onChangeText, keyboardType, multiline }) => {
  return (
    <View>
      <Text style={{ fontSize: 14 }}>
        {label}
        {req && <Text style={{ color: "red" }}>*</Text>}
      </Text>
      <TextInput
        value={val}
        multiline={multiline}
        onChangeText={onChangeText}
        keyboardType={keyboardType ? keyboardType : "text"}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          height: multiline ? 80 : 40,
          borderWidth: 1,
          borderRadius: 5,
          width: 423,
        }}
      />
    </View>
  );
};
const MyComponent = () => {
  const navigate = useNavigate();
  const [ModalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  useEffect(() => {
    const texts = [
      "Power Platform & Dynamics CE",
      "Microsoft Azure",
      "SAP FI",
      "Dynamics F&O",
      "Salesforce",
      "Business Central",
      "Full-Stack Development",
    ];
    const colors = [
      "#206C00",
      "#C87081",
      "#121F64",
      "#F83838",
      "#FFBF40",
      "#4489DA",
      "coral",
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setCurrentText(texts[index]);
      setCurrentColor(colors[index]);
    }, 4000); // Change text and color every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [manage, setManage] = useState("");
  const [help, setHelp] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <Top value={2} intensity={100} tint={"light"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.container}>
          {/**professional AngleQuest */}
          <View
            style={{
              marginVertical: 40,
              width: "100%",
              paddingHorizontal: 100,
              position: "relative",
              alignItems: "center",
            }}
          >
            <View style={{ width: 1400, alignItems: "center" }}>
              <Row
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  paddingVertical: 60,
                  paddingHorizontal: 140,
                  gap: 50,
                }}
              >
                <View
                  style={{
                      shadowColor: 'rgba(85, 107, 47, 0.5)', 
                      shadowOffset: {
                        width: 0, 
                        height: 15, 
                      },
                      shadowOpacity: 0.7, 
                      shadowRadius: 20, 
                      padding: 40,
                      elevation: 10,
                      backgroundColor: "#fff", 
                      borderRadius: 10, 
                    }}
                  >
                  <Title
                    textSize={20}
                    textColor={"#000"}
                    title={"Contact our Sales team"}
                  />
                  <View style={{ marginTop: 40, gap: 20 }}>
                    <Input
                      keyboardType="email"
                      label={"Email"}
                      req={true}
                      val={email}
                      onChangeText={setEmail}
                    />
                    <Input
                      keyboardType="numeric"
                      label={"Phone number"}
                      req={true}
                      val={phone}
                      onChangeText={setPhone}
                    />
                    <Input
                      keyboardType="text"
                      label={"What would you like to manage with anglequest?"}
                      req={true}
                      val={manage}
                      onChangeText={setManage}
                    />
                    <Input
                      keyboardType="text"
                      label={"How can our Team help you?"}
                      val={help}
                      multiline={true}
                      onChangeText={setHelp}
                    />
                    <View style={{ alignItems: "center", gap: 12 }}>
                      <Title title={"By clicking submit, I acknowledge"} />

                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                        }}
                      >
                        AngleQuest’s
                        <Text style={{ color: "blue" }}> Privacy Policy</Text>
                      </Text>
                    </View>
                    <MainButtons
                      style={{ alignSelf: "center" }}
                      gradient
                      textColor={"white"}
                      title={"Submit"}
                    />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Title
                    textSize={48}
                    textColor={"#135837"}
                    title={"Book a personalized consultation"}
                    style={{ marginBottom: 20 }}
                  />
                  <Title
                    textSize={24}
                    textColor={"#000"}
                    title={
                      "Meet with a product consultant to see how AngleQuest can fit your exact business needs."
                    }
                  />
                  <View style={{ marginTop: 40, gap: 24 }}>
                    <CheckedItem
                      text={
                        "Robust processes, from OKR to workforce management in one place"
                      }
                    />
                    <CheckedItem
                      text={
                        "Full visibility into portfolios, performance, pipelines, and more, for smarter decisions"
                      }
                    />
                    <CheckedItem
                      text={
                        "Platform flexibility that scales as your business needs evolve"
                      }
                    />
                    <CheckedItem
                      text={
                        "Accelerated TTV with rapid implementation from our dedicated experts"
                      }
                    />
                  </View>
                </View>
              </Row>
            </View>
          </View>

          <Row
            style={{
              justifyContent: "center",
              gap: 50,
              paddingVertical: 50,
              backgroundColor: "white",
              width: "100%",
            shadowColor: "rgba(200, 200, 200, 0.8)",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.4,
                shadowRadius: 5,
                elevation: 10,
              }}
            >
            <Image source={alix} />
            <Image source={carta} />
            <Image source={philips} />
            <Image source={heineken} />
            <Image source={deliotte} />
            <Image source={blueforte} />
          </Row>

          <View style={{ position: "relative", width: "100%" }}>
            <View
              style={{
                //  backgroundColor: "#00000040",
                width: "100%",
                height: 155,
              }}
            />
            <PeopleComponent />
            <Footer />
          </View>
        </View>
      </ScrollView>
    </View>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffff",
  },
  header: {
    fontSize: 16,
    marginTop: 70,
    marginBottom: 5,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    marginHorizontal: 10,
    width: 30,
    height: 30,
  },
});

export default MyComponent;
