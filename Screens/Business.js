import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import Top from "../components/HomeTop";
import OpenModal from "../LandingPage/Collectinfo";
//import Footer from "./Footer";
import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import MainButtons from "../LandingPage/MainButton";
import Title from "../components/Title";
import Row from "../components/Row";

import Footer from "../components/Footer";
import SectionContainer from "../components/SectionContainer";
import MainTitle from "../components/MainTitle";
import Checkedbutton from "../components/CheckedButton";
import SmallCards from "../components/SmallCards";
import ImageBtn from "../components/ImageBtn";
import DottedImage from "../components/DottedImage";
import SidededCard from "../components/SidedCard";
import SimpleBtn from "../components/SimpleBtn";
import SwitcherComponent from "../components/SwitcherComponent";

const BtnText = ({ img, text, onPress, textSize }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: "center", width: 128, height: 116, gap: 16 }}
    >
      <Image style={{ height: 60, width: 60 }} source={img} />
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "400",
          fontFamily: "Poppins-Regular",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const BigCard = ({ img, title, desc, full }) => {
  if (full) {
    return (
      <View
        style={{
          width: "100%",
          gap: 130,
          borderRadius: 8,
          flexDirection: "row",
          //  maxHeight: 686,
          height: 500,
          padding: 40,
          shadowColor: "#135837",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}
      >
        <View style={{ gap: 40 }}>
          <Title
            style={{ width: 436 }}
            title={title}
            textSize={24}
            textFamily={"Poppins-SemiBold"}
          />
          <Title
            style={{ width: 436 }}
            title={desc}
            textSize={20}
            textFamily={"Poppins-Regular"}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={img}
            style={{
              width: 533,
              height: 385,
              borderRadius: 8,
            }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          width: 560,
          gap: 40,
          borderRadius: 8,
          //  maxHeight: 686,
          height: 650,
          padding: 40,
          shadowColor: "#135837",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}
      >
        <Title title={title} textSize={24} textFamily={"Poppins-SemiBold"} />
        <Title title={desc} textSize={20} textFamily={"Poppins-Regular"} />
        <Image
          source={img}
          style={{
            width: 468,
            height: 362,
            borderRadius: 8,
            justifySelf: "flex-end",
          }}
        />
      </View>
    );
  }
};
const Business = () => {
  const [ModalVisible, setModalVisible] = useState(false);
  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.container}>
        <Top value={3} intensity={100} tint={"dark"} />

          {/**Individual */}
          <SectionContainer>
            <View style={{ width: 1400 }}>
              <View style={{ gap: 10 }}>
                <Title
                  textSize={14}
                  textWeight={"300"}
                  title={"Business"}
                  textFamily={"Poppins-Regular"}
                  center
                />
                <MainTitle
                  width={735}
                  title={"Transform your service operations from"}
                  secondTitle={"reactive "}
                  thirdTitle={"to"}
                  forthTitle={"proactive"}
                />

                <Title
                  textSize={16}
                  textWeight={"400"}
                  title={
                    "Empower service teams to deliver exceptional support experiences faster with smart automations that leverage the power of AI."
                  }
                  textFamily={"Poppins-Regular"}
                  center
                />
                <Title
                  textSize={16}
                  textWeight={"400"}
                  title="What would you like to manage?"
                  textFamily={"Poppins-Regular"}
                  center
                />

                <Row
                  style={{
                    marginVertical: 20,
                    gap: 20,
                    maxWidth: 1200,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "100%",
                    alignSelf: "center",
                  }}
                >
                  <Checkedbutton unchecked text={"Market Trends Analysis"} />
                  <Checkedbutton unchecked text={"Skill Gap Analysis"} />
                  <Checkedbutton unchecked text={"Resume Optimisation"} />
                  <Checkedbutton unchecked text={"Interview Preparation"} />
                  <Checkedbutton unchecked text={"Resume and Mentorship"} />
                  <Checkedbutton unchecked text={"Networking Optimisation"} />
                  <Checkedbutton unchecked text={"Market Trends Analysis"} />
                  <Checkedbutton
                    unchecked
                    text={"Career Path Visualization "}
                  />
                  <Checkedbutton
                    unchecked
                    text={"Diversity and Inclusion Focus"}
                  />
                </Row>

                <View style={{ alignItems: "center" }}>
                  <MainButtons
                    gradient
                    title={"Get Started"}
                    borderRadius={8}
                    fontSize={16}
                    width={170}
                    icon={
                      <AntDesign name="arrowright" size={16} color="#ffff" />
                    }
                  />
                </View>
                <View
                  style={{
                    maxWidth: 1200,
                    minHeight: 721,
                    marginVertical: 30,
                    position: "relative",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={require("../assets/business1.png")}
                    style={{
                      width: 893,
                      height: 721,
                    }}
                  />
                  <Image
                    source={require("../assets/consult.png")}
                    style={{
                      position: "absolute",
                      bottom: 140,
                      left: -160,
                    }}
                  />
                  <Image
                    source={require("../assets/inHouse.png")}
                    style={{
                      position: "absolute",
                      bottom: 140,
                      right: -160,
                    }}
                  />
                </View>
              </View>
            </View>
          </SectionContainer>
          <SectionContainer>
            <View style={{ width: 1400, marginTop: -100 }}>
              <View style={{ alignItems: "center" }}>
                <Title
                  // textColor={"white"}
                  textSize={32}
                  center
                  textFamily={"Poppins-SemiBold"}
                  style={{ width: 666 }}
                  title={`Out-of-the box solutions for a variety of service use cases`}
                />
              </View>
              <Row
                style={{
                  justifyContent: "center",
                  gap: 50,
                  paddingVertical: 50,
                  backgroundColor: "white",
                  width: "100%",
                }}
              >
                <BtnText
                  text={"New Employees Booster"}
                  img={require("../assets/chart-up.png")}
                />
                <BtnText
                  text={"Service Catalogue"}
                  img={require("../assets/catalogue.png")}
                />
                <BtnText
                  text={"Advanced AI"}
                  img={require("../assets/artificial-intelligence-04.png")}
                />
                <BtnText
                  text={"Cross-sector Collaboration"}
                  img={require("../assets/agreement-02.png")}
                />
                <BtnText
                  text={"Boost Under-performers"}
                  img={require("../assets/analytics-up.png")}
                />
                <BtnText
                  text={"Role Diversification"}
                  img={require("../assets/anchor-point.png")}
                />
                <BtnText
                  text={"Cross-sector Collaboration"}
                  img={require("../assets/chart-up.png")}
                />
                <BtnText
                  text={"Inventory & Orders"}
                  img={require("../assets/check-list.png")}
                />
              </Row>
              <View style={{ alignItems: "center" }}>
                <MainButtons
                  gradient
                  title={"Get Started"}
                  borderRadius={8}
                  fontSize={16}
                  width={170}
                  icon={<AntDesign name="arrowright" size={16} color="#ffff" />}
                />
              </View>
            </View>
          </SectionContainer>
          <SectionContainer>
            <View style={{ width: 1400 }}>
              <View style={{ alignItems: "center", marginVertical: 40 }}>
                <Title
                  // textColor={"white"}
                  textSize={32}
                  center
                  textFamily={"Poppins-SemiBold"}
                  style={{ width: 666 }}
                  title={
                    "Fast-track service operations from A to Z with AngleQuest AI"
                  }
                />
              </View>
              <Row
                style={{
                  gap: 60,
                  marginTop: 60,
                  alignSelf: "center",
                }}
              >
                <BigCard
                  img={require("../assets/peopleChat.png")}
                  title="Self-service customer"
                  desc="Enable customers to solve common issues on their own so agents can focus on critical issues."
                />
                <BigCard
                  img={require("../assets/laptopGuy.png")}
                  title="Automatic ticket classification"
                  desc="Let AI automatically tag tickets by type, urgency, sentiment, department, and more to accurately prioritize incoming tickets."
                />
              </Row>
              <Row
                style={{
                  gap: 60,
                  marginTop: 60,
                  alignSelf: "center",
                }}
              >
                <BigCard
                  img={require("../assets/groupPeeps.png")}
                  title="Self-service customer"
                  desc="Enable customers to solve common issues on their own so agents can focus on critical issues."
                />
                <BigCard
                  img={require("../assets/techPeeps.png")}
                  title="Automatic ticket classification"
                  desc="Let AI automatically tag tickets by type, urgency, sentiment, department, and more to accurately prioritize incoming tickets."
                />
              </Row>
              <Row
                style={{
                  marginTop: 60,
                  alignSelf: "center",
                }}
              >
                <BigCard
                  full
                  img={require("../assets/techies.png")}
                  title="Automatic ticket classification"
                  desc="Let AI automatically tag tickets by type, urgency, sentiment, department, and more to accurately prioritize incoming tickets."
                />
              </Row>
            </View>
          </SectionContainer>

          <SectionContainer>
            <View style={{ width: 1400, gap: 70, paddingHorizontal: 100 }}>
              <SidededCard
                img={require("../assets/inHouse.png")}
                title="Stay up-to-date"
                desc="Instantly send emails when due dates arrive, and receive real-time updates when tasks are completed — so your team is always aligned."
              />
              <SidededCard
                reverse
                width={403}
                height={360}
                img={require("../assets/act21.png")}
                title="Stay up-to-date"
                desc="Leave repetitive work behind. Avoid unnecessary meetings, lengthy email chains, and more by setting up customizable automations within minutes."
              />
              <SidededCard
                img={require("../assets/consult.png")}
                title="Make use of our AI your own way"
                desc="Leave repetitive work behind. Avoid unnecessary meetings, lengthy email chains, and more by setting up customizable automations within minutes."
              />
            </View>
          </SectionContainer>

          <SectionContainer>
            <View style={{ width: 1400, gap: 40 }}>
              <View style={{ gap: 20 }}>
                <Title
                  textFamily={"Poppins-SemiBold"}
                  textSize={40}
                  //center
                  style={{ width: 618 }}
                  title="One platform for enterprise service management"
                />
                <Title
                  textFamily={"Poppins-Regular"}
                  textSize={20}
                  // center
                  style={{ width: 820 }}
                  title="Create a seamless connection across the organization between service desks and their data, tools, and people to maximize resources and boost efficiency."
                />
               <SwitcherComponent/>
              </View>

              <View
                style={{
                  backgroundColor: "#135837",
                  width: "100%",

                  justifyContent: "center",
                  alignItems: "center",
                  padding: 40,
                  gap: 30,
                  marginVertical: 40,
                }}
              >
                <View style={{ width: 666, alignItems: "center" }}>
                  <Title
                    textColor={"white"}
                    textSize={36}
                    center
                    title={`We increased our project capacity significantly in a few months thanks to the 40,000+ human actions we save each month with automations.`}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Poppins-SemiBold",
                      textAlign: "center",
                      color: "white",
                      marginVertical: 30,
                    }}
                  >
                    Kylie J
                    <Text style={{ fontFamily: "Poppins-Regular" }}>
                      | Manager (Operations), Protozisk Ltd.
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </SectionContainer>
          {/**INtegrate */}
          <SectionContainer>
            <View
              style={{
                width: 1400,
                position: "relative",
                paddingVertical: 40,
              }}
            >
              <DottedImage style={{ top: -20, left: -20 }} />
              <Row style={{}}>
                <View style={{ gap: 30, width: "40%" }}>
                  <Title
                    textSize={40}
                    textFamily={"Poppins-SemiBold"}
                    title={"Integrate AngleQuest with over 50 apps"}
                  />
                  <Title
                    textSize={20}
                    textWeight={"400"}
                    title={
                      "AngleQuest works seamlessly with your favorite apps, or find the right app for your needs on AngleQuest Integrated Apps"
                    }
                  />
                  <SimpleBtn title={"Learn more"} />
                </View>
                <View style={{ width: "60%", gap: 20 }}>
                  <Row
                    style={{
                      justifyContent: "flex-end",
                      gap: 20,
                      width: "100%",
                    }}
                  >
                    <ImageBtn
                      width={150}
                      height={38}
                      img={require("../assets/slackImg.png")}
                    />
                  </Row>
                  <Row
                    style={{
                      justifyContent: "flex-end",
                      gap: 20,
                      width: "100%",
                    }}
                  >
                    <ImageBtn
                      width={100}
                      height={50}
                      img={require("../assets/bobImg.png")}
                    />
                    <ImageBtn
                      width={100}
                      height={50}
                      img={require("../assets/sapImg.png")}
                    />
                  </Row>
                  <Row
                    style={{
                      justifyContent: "flex-end",
                      gap: 20,
                      width: "100%",
                    }}
                  >
                    <ImageBtn
                      width={100}
                      height={30}
                      img={require("../assets/clickUpImg.png")}
                    />
                    <ImageBtn
                      width={113}
                      height={27}
                      img={require("../assets/calendlyImg.png")}
                    />
                    <ImageBtn
                      width={50}
                      height={50}
                      img={require("../assets/microsoftImg.png")}
                    />
                  </Row>
                  <Row
                    style={{
                      justifyContent: "flex-end",
                      gap: 20,
                      width: "100%",
                    }}
                  >
                    <ImageBtn
                      width={150}
                      height={30}
                      img={require("../assets/mondayImg.png")}
                    />
                    <ImageBtn
                      width={100}
                      height={30}
                      img={require("../assets/servicenowImg.png")}
                    />
                    <ImageBtn
                      width={60}
                      height={60}
                      img={require("../assets/googleCalendarImg.png")}
                    />
                    <ImageBtn
                      width={117}
                      height={30}
                      img={require("../assets/linkedInImg.png")}
                    />
                  </Row>
                </View>
              </Row>
            </View>
          </SectionContainer>
          {/*  Footer */}
          <Footer />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={ModalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenModal onClose={handleCloseModal} />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Business;

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
    backgroundColor: "#fff",
    position: "relative",
  },
  image: {
    marginTop: 50,
    width: 1000,
    height: 300,
  },
});
