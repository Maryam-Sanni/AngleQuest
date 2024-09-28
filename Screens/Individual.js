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
import ImageBtn from "../components/ImageBtn";
import DottedImage from "../components/DottedImage";
import SmallCards from "../components/SmallCards";
import MainTitle from "../components/MainTitle";
import { useNavigate } from 'react-router-dom';

const Individual = () => {
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
                  title={"Individual"}
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
              <View style={{ gap: 10, alignItems: "center" }}>
                <Title
                  textSize={32}
                  center
                  style={{ width: 666, alignSelf: "center" }}
                  title="Try anglequest today"
                />
                <Title
                  textSize={16}
                  center
                  style={{ width: 666, alignSelf: "center" }}
                  title="14-day free trial | No credit card needed"
                />
                <TouchableOpacity onPress={handleIndividualSignUp}>
                <MainButtons
                  gradient
                  title={"Get Started"}
                  borderRadius={8}
                  icon={<AntDesign name="arrowright" size={10} color="#ffff" />}
                  style={{ marginTop: 30 }}
                />
                </TouchableOpacity>
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
                <Image
                  style={{ marginTop: -80, width: 80, height: 80 }}
                  source={require("../assets/holes.png")}
                />
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
                      textAlign: "center",
                      color: "white",
                      marginVertical: 30,
                    }}
                  >
                    Kylie J
                    <Text style={{  }}>
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
              <DottedImage style={{ top: -20, left: -20 }} />{/*
              <DottedImage down style={{ bottom: -20, right: -20 }} />*/}
              <Row style={{}}>
                <View style={{ gap: 30, width: "40%" }}>
                  <Title
                    textSize={40}
                    title={"Integrate AngleQuest with over 50 apps"}
                  />
                  <Title
                    textSize={20}
                    textWeight={"400"}
                    title={
                      "AngleQuest works seamlessly with your favorite apps, or find the right app for your needs on AngleQuest Integrated Apps"
                    }
                  />
                  <Row style={{ gap: 10, alignItems: "center", marginTop: 10 }}>
                    <Title
                      title={"Learn more"}
                      textSize={16}
                      textColor={"#135837"}
                    />

                    <AntDesign name="arrowright" size={18} color="#135837" />
                  </Row>
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

export default Individual;

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
