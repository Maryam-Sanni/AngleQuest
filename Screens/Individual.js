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
import Top2 from "../components/TopExtra";
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
import CertificateSection from "../Screens/CertificatesSection";
import NoCreditSection from "../LandingPage/IndividualAdv";
import NextStep from "../LandingPage/NextStep";
import Reviews from "../LandingPage/Reviews";
import VideoFooter from "../LandingPage/VideoFooter";
import { useNavigate } from 'react-router-dom';

const Individual = () => {
  const [ModalVisible, setModalVisible] = useState(false);
   const navigate = useNavigate();
  const [topPosition, setTopPosition] = useState(20); 

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    console.log("Scroll Position Y:", scrollY); 

    if (scrollY > 0) { 
      setTopPosition(-30); 
    } else {
      setTopPosition(20); 
    }
  };
  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

    const handlePricing = () => {
   navigate("/pricing");
    };
  
  const handleIndividualSignUp = () => {
    navigate('/sign-up', { state: { signUpOption: 1 } });
  };

  return (
        <View style={{ flex: 1, }}>
          <Top2 tint={"dark"} />
              <View style={{ position: 'absolute', top: topPosition, left: 0, right: 0, zIndex: 100 }}>
                <Top value={3} intensity={100} />
              </View>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                onScroll={handleScroll}  // Attach scroll listener
                scrollEventThrottle={16} // Frequency of scroll events
              >
        <View style={styles.container}>

          {/**Individual */}
          <SectionContainer>
            <View style={{ width: 1400 }}>
              <View style={{ gap: 10, marginTop: 50 }}>

                <MainTitle
                  title={"Discover how efficient you can be with"}
                  secondTitle={"AngleQuest"}
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
                    left={40}
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
                      "Evaluate your current skills and compare to industry averages and your personal goals"
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
                      "Get paired with industry experts who would guide and serve as a point of contact for career questions or concerns"
                    }
                    icon={
                      <MaterialIcons name="people" size={24} color="#F95053" />
                    }
                  />
                  <SmallCards
                    front
                    top={60}
                    right={-60}
                    title={"Rapid Upskilling"}
                    desc={
                      "Practice makes perfection! Get hands-on and real-world scenarios practice"
                    }
                    icon={
                      <AntDesign name="poweroff" size={24} color="#F95053" />
                    }
                  />




                </View>
              </View>
            </View>
          </SectionContainer>
           {<CertificateSection />}

           {<NoCreditSection />}


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
                <TouchableOpacity onPress={handlePricing}>
                <MainButtons
                  gradient
                  title={"Get Started"}
                  borderRadius={8}
                  icon={<AntDesign name="arrowright" size={10} color="#ffff" />}
                  style={{ marginTop: 30 }}
                />
                </TouchableOpacity>
              </View>

              {<Reviews />}
            </View>
          </SectionContainer>

          {<NextStep />}


           {<VideoFooter />}
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