import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Top from "../components/topbar";
import Sidebar from "../components/sidebar";
import { BlurView } from "expo-blur";
import CustomAlert from "../components/CustomAlert";
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
  const [modalTitle, setModalTitle] = useState("");
  const [modalsubTitle, setModalSubTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [activeIndex, setActiveIndex] = useState(3);

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
    subTitle,
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
          width: 215,
          height: 100,
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
            fontSize: 13,
          }}
        >
          {title}
          <Text style={{ color: "white", fontWeight: "400" }}>{subTitle}</Text>
        </Text>
        <Text style={{ color: "white", fontWeight: "400", fontSize: 10 }}>
          {desc}
        </Text>
        <Text
          onPress={handleFunc}
          style={{
            textAlign: "right",
            color: "white",
            textDecorationLine: "underline",
            fontWeight: "500",
            fontSize: 10,
          }}
        >
          See more
        </Text>
      </View>
    );
  };
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
                    <View style={{ flex: "19%", paddingLeft: 30 }}>
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
                          <SideButton
                            sideBtn={12}
                            setSideBtn={() => setActiveIndex(12)}
                            active={activeIndex === 12 ? true : false}
                          />
                          <SideButton
                            sideBtn={15}
                            setSideBtn={() => setActiveIndex(15)}
                            active={activeIndex === 15 ? true : false}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: "80%", paddingRight: 15 }}>
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
                          Current State:
                          <Text style={{ fontSize: 16, fontWeight: "400" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco
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
                            Intermediate Programmer
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
                          style={{ width: "100%", height: 600, marginTop: 20}}
                        ></ImageBackground>
                        <Cards
                          title={"Desired Destination |"}
                          subTitle={" Goals Achieved with AngleQuest"}
                          desc="Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor"
                          bgColor={"#7f65bc"}
                          top={100}
                          left={300}
                          handleFunc={() => {
                            setModalVisible2(!modalVisible2);
                            setModalTitle("Desired Destination |");
                            setModalSubTitle(" Goals Achieved with AngleQuest");
                            setModalDesc(
                              "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor"
                            );
                          }}
                        />
                        <Cards
                          title={"Certification to obtain |"}
                          subTitle={" The bragging certs in this level"}
                          desc="Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor"
                          bgColor={"#4782bc"}
                          top={230}
                          right={80}
                          handleFunc={() => {
                            setModalTitle("Certification to obtain |");
                            setModalVisible2(!modalVisible2);
                            setModalSubTitle(
                              " The bragging certs in this level"
                            );
                            setModalDesc(
                              "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor"
                            );
                          }}
                        />
                        <Cards
                          title={"Your knowledge gaps |"}
                          subTitle={" Things that you need to learn"}
                          desc="Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor"
                          bgColor={"#01bbb6"}
                          top={250}
                          left={100}
                          handleFunc={() => {
                            setModalTitle("Your knowledge gaps |");
                            setModalVisible2(!modalVisible2);
                            setModalSubTitle(" Things that you need to learn");
                            setModalDesc(
                              "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor"
                            );
                          }}
                        />
                        <Cards
                          title={"Learning References |"}
                          subTitle={" Where and how to learn your goals"}
                          desc="Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor"
                          bgColor={"#2c9fc2"}
                          bottom={45}
                          right={170}
                          handleFunc={() => {
                            setModalTitle("Learning References |");
                            setModalVisible2(!modalVisible2);
                            setModalSubTitle(
                              " Where and how to learn your goals"
                            );
                            setModalDesc(
                              "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor"
                            );
                          }}
                        />
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
                              fontSize: 14,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                          {modalTitle}
                          </Text>
                        </View>
                        <Text
                          style={{
                            //  color: "white",
                            fontWeight: "500",
                            alignSelf: "center",
                            textAlign: "center",
                            fontSize: 13,
                          }}
                        >
                          {modalTitle}
                          <Text
                            style={{
                              //  color: "white",
                              fontWeight: "400",
                            }}
                          >
                            {modalsubTitle}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            //color: "white",
                            fontWeight: "400",
                            fontSize: 10,
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
                        <Text style={{ fontSize: 12, color: "white" }}>
                          close
                        </Text>
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
    alignItems: "center",
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