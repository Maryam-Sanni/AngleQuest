import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
  ImageBackground,
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
import SidededCard from "../components/SidedCard";
import Checkedbutton from "../components/CheckedButton";
import carta from "../assets/carta.png";
import heineken from "../assets/heineken.png";
import blueforte from "../assets/blueforte.png";
import deliotte from "../assets/deliotte.png";
import philips from "../assets/philips.png";
import alix from "../assets/alix.png";
import MainTitle from "../components/MainTitle";
import SmallCards from "../components/SmallCards";
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const [ModalVisible, setModalVisible] = useState(false);
   const navigate = useNavigate();
  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleIndividualSignUp = () => {
    navigate('/sign-up', { state: { signUpOption: 1 } });
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
                  title={"Community"}
                  center
                />
                <MainTitle
                  title={"Discover how efficient you can be with"}
                  secondTitle={"AngleQuest AI"}
                />

                <Title
                  textSize={16}
                  textWeight={"400"}
                  title={
                    "Focus on what matters most with this free to use AngleQuest AI"
                  }
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
                  <Checkedbutton text={"Skill Gap Analysis"} />
                  <Checkedbutton text={"Resume Optimisation"} />
                  <Checkedbutton text={"Interview Preparation"} />
                  <Checkedbutton text={"Resume and Mentorship"} />
                  <Checkedbutton text={"Networking Optimisation"} />
                  <Checkedbutton text={"Market Trends Analysis"} />
                  <Checkedbutton text={"Career Path Visualization "} />
                  <Checkedbutton text={"Diversity and Inclusion Focus"} />
                </Row>

                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity onPress={handleIndividualSignUp}>
                  <MainButtons
                    gradient
                    title={"Get Started"}
                    borderRadius={8}
                    icon={
                      <AntDesign name="arrowright" size={10} color="#ffff" />
                    }
                  />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    maxWidth: 1200,
                    minHeight: 550,
                    position: "relative",
                    justifyContent: "space-between",
                    marginVertical: 30,
                  }}
                >
                  <SmallCards
                    left={265}
                    title={"AngleQuest Team Impact"}
                    desc={
                      "Measuring and analyzing the domain knowledge and work of team members"
                    }
                    icon={
                      <FontAwesome6
                        name="people-line"
                        size={24}
                        color="#50B6F9"
                      />
                    }
                  />
                  <SmallCards
                    front
                    top={60}
                    left={50}
                    title={"Junior to Senior Boost"}
                    desc={
                      "Career development platform optimized with resources for individuals"
                    }
                    icon={
                      <AntDesign name="rocket1" size={24} color="#C750F9" />
                    }
                  />
                  <SmallCards
                    front
                    top={100}
                    left={500}
                    title={"Skill Gap Analysis"}
                    desc={
                      "Evaluate user’s current skills compared to new roles, stating areas for improvement"
                    }
                    icon={
                      <AntDesign name="rocket1" size={24} color="#50F988" />
                    }
                  />
                  <SmallCards
                    //  top={0}
                    right={170}
                    title={"Networking and Mentorship"}
                    desc={
                      "Connect users with potential mentors in their field to guide career development"
                    }
                    icon={
                      <MaterialIcons name="people" size={24} color="#F95053" />
                    }
                  />
                  <SmallCards
                    front
                    top={60}
                    right={-50}
                    title={"Rapid Upskilling"}
                    desc={
                      "Intensive mentorship program to enhance individual’s skill & productivity"
                    }
                    icon={
                      <AntDesign name="poweroff" size={24} color="#F95053" />
                    }
                  />

                  <ImageBackground
                    source={require("../assets/blurrybg.png")}
                    style={{
                      width: "120%",
                      height: 262,
                      zIndex: 3,
                      position: "absolute",
                      left: 0,
                      bottom: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    imageStyle={{ width: "100%", height: "100%" }}
                  >
                    <Title
                      textSize={24}
                      center
                      style={{ width: 510, marginTop: 40 }}
                      title="Explore even more artificial intelligence that AngleQuest has to offer"
                    />
                  </ImageBackground>
                </View>
              </View>
            </View>
          </SectionContainer>
          <SectionContainer>
            <View style={{ width: 1400, gap: 70, paddingHorizontal: 100 }}>
              <Title
                textSize={32}
                center
                style={{ width: 666, alignSelf: "center" }}
                title="Explore even more requests that AngleQuest AI has to offer"
              />
              <SidededCard
                community
                img={require("../assets/inHouse.png")}
                title="Stay up-to-date"
                desc="Instantly send emails when due dates arrive, and receive real-time updates when tasks are completed — so your team is always aligned."
              />
              <SidededCard
                community
                reverse
                width={403}
                height={360}
                img={require("../assets/act21.png")}
                title="Stay up-to-date"
                desc="Leave repetitive work behind. Avoid unnecessary meetings, lengthy email chains, and more by setting up customizable automations within minutes."
              />
              <SidededCard
                community
                img={require("../assets/consult.png")}
                title="Make use of our AI your own way"
                desc="Leave repetitive work behind. Avoid unnecessary meetings, lengthy email chains, and more by setting up customizable automations within minutes."
              />
            </View>
          </SectionContainer>

          {/** */}
          <SectionContainer bgColor={"#EDFFF6"}>
            <View
              style={{ width: 1400, paddingVertical: 80, alignItems: "center" }}
            >
              <View style={{ width: 810, gap: 20, alignItems: "center" }}>
                <Title
                  center
                  textSize={32}
                  title="Make decisions with confidence"
                />
                <Title
                  center
                  textSize={20}
                  title="Ready to see how monday.com improves alignment across teams?"
                />
                <TouchableOpacity onPress={handleIndividualSignUp}>
                <MainButtons
                  gradient
                  title={"Get Started"}
                  borderRadius={8}
                  fontSize={18}
                  width={170}
                  icon={<AntDesign name="arrowright" size={18} color="#ffff" />}
                />
                </TouchableOpacity>
              </View>
            </View>
          </SectionContainer>
          <SectionContainer>
            <View style={{ alignItems: "center" }}>
              <Title
                textSize={20}
                center={true}
                textWeight={"400"}
                title={
                  "Trusted by top professionals from startups to enterprises"
                }
              />
            </View>
          </SectionContainer>
          <Row
            style={{
              justifyContent: "center",
              gap: 50,
              paddingVertical: 50,
              backgroundColor: "white",
              width: "100%",
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
            <Image source={alix} />
            <Image source={carta} />
            <Image source={philips} />
            <Image source={heineken} />
            <Image source={deliotte} />
            <Image source={blueforte} />
          </Row>
          {/**INtegrate */}
          <SectionContainer>
            <View
              style={{
                width: 1400,
                position: "relative",
                paddingVertical: 40,
                alignItems: "center",
              }}
            >
              <Row style={{ marginVertical: 40 }}>
                <View
                  style={{
                    width: 506,
                    paddingVertical: 0,
                    justifyContent: "center",
                  }}
                >
                  <Title
                    textSize={40}
                    textWeight={"700"}
                    style={{ width: 335 }}
                    title={"Why customers love using AngleQuest"}
                  />
                </View>
                <View
                  style={{
                    width: 506,
                    gap: 20,
                    backgroundColor: "#135837",
                    borderRadius: 12,
                    paddingVertical: 32,
                    paddingHorizontal: 40,
                  }}
                >
                  <Title
                    textSize={20}
                    textColor={"white"}
                    title={`“Within minutes we can create dashboards to give a high-level, detailed view of where effort is being spent, and keep track of time which simplifies follow-up and review.”`}
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      //  textAlign: "center",
                      color: "white",
                      marginVertical: 10,
                    }}
                  >
                    Kylie J
                    <Text style={{ }}>
                      | Manager (Operations), Protozisk Ltd.
                    </Text>
                  </Text>

                  <Row style={{ gap: 10, marginTop: 0 }}>
                    <AntDesign name="star" size={24} color="#FFC507" />
                    <AntDesign name="star" size={24} color="#FFC507" />
                    <AntDesign name="star" size={24} color="#FFC507" />
                    <AntDesign name="star" size={24} color="#FFC507" />
                    <AntDesign name="star" size={24} color="#ccc" />
                  </Row>
                </View>
              </Row>
              <Row style={{ marginBottom: 20, gap: 100 }}>
                <View
                  style={{
                    width: 498,
                    height: 309,
                    //  justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../assets/learner.png")}
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
                <View
                  style={{
                    //   width: 506,
                    gap: 20,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 590,
                      gap: 30,
                      justifyContent: "center",
                    }}
                  >
                    <Title
                      textSize={30}
                      textWeight={"700"}
                      title={`Learn more About AngleQuest`}
                    />
                    <Title
                      textSize={20}
                      textWeight={"400"}
                      title={`Instantly send emails when due dates arrive, and receive real-time updates when tasks are completed — so your team is always aligned.`}
                    />
                  </View>
                </View>
              </Row>
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity onPress={handleIndividualSignUp}>
                <MainButtons
                  gradient
                  title={"Get Started"}
                  borderRadius={8}
                  fontSize={18}
                  width={170}
                  icon={<AntDesign name="arrowright" size={18} color="#ffff" />}
                />
                </TouchableOpacity>
              </View>
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

export default Community;

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
