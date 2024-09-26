import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  ImageBackground, Dimensions,
  Pressable,
} from "react-native";
import { useNavigate } from 'react-router-dom';
import Top from "../components/HomeTop";
import OpenModal from "../LandingPage/Collectinfo";
//import Footer from "./Footer";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import MainButtons from "../LandingPage/MainButton";
import NoCreditSection from "../LandingPage/NoCreditSection";
import { LinearGradient } from "expo-linear-gradient";
import Title from "../components/Title";
import Row from "../components/Row";

import carta from "../assets/carta.png";
import heineken from "../assets/heineken.png";
import blueforte from "../assets/blueforte.png";
import deliotte from "../assets/deliotte.png";
import philips from "../assets/philips.png";
import alix from "../assets/alix.png";
import { Video } from "expo-av";
import { BlurView } from "expo-blur";
import Footer from "../components/Footer";

const cardSliderData = [
  {
    id: 1,
    color: "#094A2B",
    text: "New Skills Acquisition",
    personImg: require("../assets/person1.png"),
    cardImg: require("../assets/card1.png"),
  },
  {
    id: 2,
    color: "#4E33D3",
    text: "Support a New Employee",
    personImg: require("../assets/person2.png"),
    cardImg: require("../assets/card2.png"),
  },
  {
    id: 3,
    color: "#DE7423",
    text: "Cross Community Learning",
    personImg: require("../assets/person3.png"),
    cardImg: require("../assets/card3.png"),
  },
  {
    id: 4,
    color: "#6EA84F",
    text: "Boost Under- performers",
    personImg: require("../assets/person4.png"),
    cardImg: require("../assets/card4.png"),
  },
  {
    id: 5,
    color: "#6E1D1A",
    text: "Career          Mentoring",
    personImg: require("../assets/person5.png"),
    cardImg: require("../assets/card5.png"),
  },
  {
    id: 6,
    color: "#292929",
    text: "Organizational Knowledge",
    personImg: require("../assets/person4.png"),
    cardImg: require("../assets/card3.png"),
  },
  {
    id: 7,
    color: "#D33336",
    text: "Team Knowledge management",
    personImg: require("../assets/person4.png"),
    cardImg: require("../assets/card3.png"),
  },
  {
    id: 8,
    color: "#D3336B",
    text: "Skill Gap         Analysis",
    personImg: require("../assets/person4.png"),
    cardImg: require("../assets/card3.png"),
  },
];

const BigLableButton = ({ title, img, subTitle, desc }) => {
  return (
    <LinearGradient colors={["#d5f8c5", "#ffffff"]} style={styles.greyBox}>
      <Text
        style={{ fontSize: 20, color: "#135837" }}
      >
        {title}
      </Text>
      <Image
        source={img}
        style={{
          alignSelf: "center",
          width: 100,
          height: 90,
          marginVertical: 20,
        }}
      />
      <View style={{ gap: 16, marginBottom: 20 }}>
        <Text style={{ fontSize: 18 }}>
          {subTitle}
        </Text>
        <Text style={{ fontSize: 16 }}>
          {desc}
        </Text>
      </View>
      <MainButtons
        width={"100%"}
        gradient={true}
        title={"Get Started"}
        borderRadius={5}
        icon={<Image
          source={{ uri: 'https://img.icons8.com/?size=100&id=85463&format=png&color=FFFFFF' }}
          style={{ width: 18, height: 18 }}
        />}
      />
    </LinearGradient>
  );
};

const SlideButton = ({ title, item1, item2, item3, item4 }) => {
  return (
    <TouchableOpacity style={{ gap: 20 }}>
      <Title
        textSize={20}
        textColor={"#C6ff64"}
        title={title}
      />
      <View style={{ gap: 16, paddingLeft: 16 }}>
        <Title textSize={16} textColor={"white"} title={item1} />
        <Title textSize={16} textColor={"white"} title={item2} />
        <Title textSize={16} textColor={"white"} title={item3} />
        <Title textSize={16} textColor={"white"} title={item4} />
      </View>
    </TouchableOpacity>
  );
};

const ImageBtn = ({ style, width, height, img }) => {
  return (
    <TouchableOpacity
      style={{
        width: 180,
        height: 80,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={img} width={width} height={height} style={[style]} />
    </TouchableOpacity>
  );
};
const DottedImage = ({ style }) => {
  return (
    <Image
      source={require("../assets/dottedFrame.png")}
      style={[style, { width: 608, height: 280, position: "absolute" }]}
    />
  );
};
const CardItem = ({ title, cardImg, personImg, bgColor }) => {
  const [active, setActive] = useState(false);
  const RowItem = ({ text }) => {
    return (
      <Row style={{ gap: 8 }}>
        <Image
          source={{ uri: 'https://img.icons8.com/?size=100&id=OFocZB6PD94a&format=png&color=FFFFFF' }}
          style={{ width: 15, height: 15 }}
        />
        <Text style={{ fontSize: 14, color: "white" }}>{text}</Text>
      </Row>
    );
  };


  
  return (
      <TouchableOpacity
        style={{
          width: 320,
          backgroundColor: bgColor ? bgColor : "white",
          height: 400,

          position: "relative",
          borderRadius: 20,
        }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {active && (
          <BlurView
            intensity={100}
            tint="dark" 
            style={{
              backgroundColor: 'rgba(0, 0, 0, 1)', 
              paddingVertical: 20,
              paddingLeft: 20,
              borderRadius: 20,
              position: "absolute",
              height: "100%",
              width: "100%",
              zIndex: 100,
            }}
          >
          <Text style={{ fontSize: 18, color: "white" }}>
            Recommended Product
          </Text>
          <View
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 6,
              marginTop: 20,
              backgroundColor: bgColor ? bgColor : "white",
            }}
          >
            <Image
              source={{ uri: 'https://img.icons8.com/?size=100&id=hP1kO4hPVbYU&format=png&color=FFFFFF' }}
              style={{ width: 22, height: 22 }}
            />
          </View>
          <View style={{ gap: 8, marginVertical: 40 }}>
            <RowItem text={"Project Management"} />
            <RowItem text={"Task Management"} />
            <RowItem text={"Resource Management"} />
            <RowItem text={"Portfolio Management"} />
          </View>
          <MainButtons
            borderRadius={20}
            textColor={"white"}
            bgColor={bgColor}
            title="Get Started"
          />
        </BlurView>
      )}
      <View
        style={{
          paddingVertical: 20,
          paddingLeft: 20,
          width: "100%",
          height: "100%",
        }}
      >
        <Title
          title={title}
          textSize={32}
          textColor={bgColor ? "white" : "black"}
          textWeight={"700"}
        />
        <View style={{ alignItems: "flex-end", marginTop: -45 }}>
          <Image
            style={{
              width: 197,
              height: 295,
              zIndex: 10,
            }}
            source={personImg}
          />
        </View>
        <View style={{ justifyContent: "flex-end", borderBottomEndRadius: 20 }}>
          <Image
            style={{
              position: "absolute",
              bottom: -50,
              right: 0,
              width: 265,
              height: 180,
              zIndex: 10,
            }}
            source={cardImg}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SpecialBtn = ({ text, onPress,  height, width, bgColor }) => {
  const navigate = useNavigate();
   const [isHovered, setIsHovered] = useState(false);
  
  return (
        <Pressable
          onPress={onPress} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        style={{
          backgroundColor: isHovered
            ? 'linear-gradient(90deg, #135837, #29BE77)' 
            : bgColor || "#00000033",
          width: width || 144,
          height: height || 54,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          background: isHovered ? 'linear-gradient(90deg, #135837, #29BE77)' : (bgColor || "#00000033"),
        }}
      >
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "400",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const MyComponent = () => {
   const navigate = useNavigate(); // Navigation object
  const [ModalVisible, setModalVisible] = useState(false);
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const { width: screenWidth } = Dimensions.get('window');

  const fadeWidth = 60;
  
  const colorList = [
    { offset: "0%", color: "#231557", opacity: "1" },
    { offset: "29%", color: "#44107A", opacity: "1" },
    { offset: "67%", color: "#FF1361", opacity: "1" },
    { offset: "100%", color: "#FFF800", opacity: "1" },
  ];
  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };
  const SliderBtn = ({ left, onPress }) => {
    
    return (
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 190,
          left: left && 10,
          right: !left && 10,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          zIndex: 200,
        }}
        onPress={() => scrollRef.current?.scrollTo({ x: -200, animated: true })}
      >
        {left ? (
        <Image
          source={{ uri: 'https://img.icons8.com/?size=100&id=99284&format=png&color=000000' }}
          style={{ width: 50, height: 50 }}
        />
        ) : (
        <TouchableOpacity
         onPress={() => scrollRef.current?.scrollTo({ x: 500, animated: true })}>
        <Image
          source={{ uri: 'https://img.icons8.com/?size=100&id=100007&format=png&color=000000' }}
          style={{ width: 50, height: 50 }}
        />
        </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const handlecontact = () => {
    navigate('/sign-up'); 
  };

  const gotocontact= () => {
  navigate("/contact-sales");
  };

  const handleIndividualSignUp = () => {
    navigate('/sign-up', { state: { signUpOption: 1 } });
  };

  const handleBusinessSignUp = () => {
    navigate('/sign-up', { state: { signUpOption: 3 } });
  };
  
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.container}>
          <Video
            resizeMode="cover"
            videoStyle={{ width: "100%", height: 1024 }} // Can be a URL or a local file.
            source={require("../assets/background.mp4")}
            ref={videoRef}
            isLooping
            shouldPlay
            isMuted
            style={styles.backgroundVideo}
          />
          <Top value={3} intensity={100} />
          <View
            style={{
              marginVertical: 40,
              width: "100%",
              paddingHorizontal: 100,
              backgroundColor: "#fffff",
              position: "relative",
              height: 1024,
              alignItems: "center",
            }}
          >
            <View style={{ width: 1400, height: "30%" }}></View>
            <View style={{ width: 1400, height: "70%" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 55,
                  fontWeight: "500",
                  marginTop: 130,
                  maxWidth: 852,
                }}
              >
                Peak Performers Have a Team Working On Their{" "}
                <Text style={{ color: "#29BE77" }}>Growth</Text>, Do You?{" "}
              </Text>
              <Text
                style={{
                  marginTop: 30,
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: "400",
                  maxWidth: 646,
                }}
              >
                Designed for individuals, teams, recruiters and enterprise who
                wants to support their talents to succeed in the career.
              </Text>
              <Row style={{ gap: 20, alignItems: "center", marginTop: 30 }}>
                <BlurView
                  intensity={100}
                  // tint="dark"
                  style={{
                    height: 74,
                    gap: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "white",
                    paddingHorizontal: 20,
                    maxWidth: 740,
                  }}
                >
                  <Row
                    style={{
                      backgroundColor: "transparent",
                      height: 74,
                      gap: 10,
                      justifyContent: "space-between",
                      width: 500,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "400",
                      }}
                    >
                      Get started as:
                    </Text>
                    <Row style={{ alignItems: "center", gap: 20 }}>
                      <SpecialBtn text={"Individual"} onPress={handleIndividualSignUp} />
                      <SpecialBtn text={"Business"} onPress={handleBusinessSignUp} />
                    </Row>
                  </Row>
                </BlurView>
                <TouchableOpacity onPress={gotocontact}>
                <MainButtons
                  title="Book a demo now"
                  height={74}
                  width={200}
                  fontSize={18}
                  center
                  gradient
                  borderRadius={10}
                />
              </TouchableOpacity>
              </Row>
            </View>
          </View>

          {/**toolkit */}
          <View
            style={{
              marginVertical: 20,
              width: "100%",
              paddingLeft: 10,
              marginTop: -70,
              backgroundColor: "#fffff",
              position: "relative",
            }}
          >
            <View style={{ width: "100%" }}>
              <View style={{ gap: 10, paddingHorizontal: 70 }}>
                <Title
                  textSize={28}
                  textWeight={"700"}
                  title={"Supercharge your growth"}
                />
                <Title
                  textSize={22}
                  title={
                    "We know how important your work is to you, we made it our life’s work to support you."
                  }
                />
                <Row style={{ gap: 10 }}>
                  <Image
                    source={{ uri: 'https://img.icons8.com/?size=100&id=86517&format=png&color=135837' }}
                    style={{ width: 22, height: 22 }}
                  />
                  <TouchableOpacity onPress={handlecontact}>
                  <Title
                    textSize={20}
                    textColor={"#135837"}
                    style={{ textDecorationLine: "underline"}} 
                    textWeight={"bold"}
                    title={"Subscribe as individual, team, organization or community"}
                  />
                  </TouchableOpacity>
                </Row>
              </View>
              <View
                style={{
                  position: "relative",
                  height: 480,
                }}
              >
                {/*
                <Carousel
                  loop
                  width={1400}
                  height={450}
                  autoPlay={true}
                 data={cardSliderData}
                  scrollAnimationDuration={1000}
                  // onSnapToItem={(index) => console.log("current index:", index)}
                  renderItem={( item ) => (
                    <CardItem
                      key={item?.id}
                      bgColor={item?.color}
                      title={item?.text}
                      personImg={item?.personImg}
                      cardImg={item?.cardImg}
                    />
                  )}
                />
                    */}
                <SliderBtn
                  left={true}
                  onPress={() =>
                    scrollRef.current?.scrollTo({
                      x: -300,
                      y: 0,

                      animated: true,
                    })
                  }
                />
                <SliderBtn
                  left={false}
                  onPress={() =>
                    scrollRef.current?.scrollTo({
                      x: 500,
                      y: 0,
                      animated: true,
                    })
                  }
                />
                <View style={{ position: 'relative', width: '100%' }}>
                  {/* Left Fade */}
                  <LinearGradient
                    colors={['#ffffff', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: fadeWidth,
                      zIndex: 200,
                    }}
                  />               
                <ScrollView
                  horizontal
                  ref={scrollRef}
                  pagingEnabled
                   showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 20,
                    marginVertical: 40,
                    flexGrow: 1,
                    width: "100%",
                    height: 500,
                    zIndex: 100,
                   
                  }}
                >
                  {cardSliderData?.map?.((item) => (
                    <CardItem
                      key={item?.id}
                      bgColor={item?.color}
                      title={item?.text}
                      personImg={item?.personImg}
                      cardImg={item?.cardImg}
                       style={{ width: screenWidth }}
                    />
                  ))}
                </ScrollView>
                  {/* Right Fade */}
                    <LinearGradient
                      colors={['transparent', '#ffffff']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: fadeWidth,
                        zIndex: 200,
                      }}
                    />
                  </View>
              </View>

              <View style={{ marginTop: 40 }}>
                <Title
                  textSize={20}
                  center={true}
                  textWeight={"400"}
                  title={
                    "Trusted by top professionals from startups to enterprises"
                  }
                />
              </View>
            </View>
          </View>
            
              <View
                style={{
                  justifyContent: "center",
                  gap: 50,
                  flexDirection: 'row',
                  paddingVertical: 50,
                  marginBottom: 20,
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
               </View>
       

          {/**professional AngleQuest */}
          <View
            style={{
              backgroundColor: "#f5f5f5",
              paddingVertical: 20,
              paddingHorizontal: 160,
              gap: 40,
              position: "relative",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              <Image
                source={require("../assets/shadowCircle.png")}
                style={{ marginRight: 20 }}
              />
            </View>
            <View
              style={{
                backgroundColor: "transparent",
                padding: 10,
                alignSelf: "stretch",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  textAlign: "center",
                  fontWeight: "700",
                  marginTop: 100,
                  marginBottom: -80,
                  color: "#135837",
                }}
              >
                A Toolkit to Boost Professionals & Teams Performance
              </Text>
              <Image
                source={require("../assets/landingco1.gif")}
                style={styles.landingimage}
              />
            </View>
          </View>
          {/**consult & inhouse section */}
          <View
            style={{
              marginVertical: 40,
              width: "100%",
              paddingHorizontal: 10,
              backgroundColor: "#fffff",
              position: "relative",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 1400,
                paddingVertical: 100,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: -70,
                  marginBottom: 20,
                }}
              >
                <View style={{ flexDirection: "row", gap: 5}}>
                  <View style={[styles.bigwhiteBox2, { alignItems: "center", marginRight: 10 }]}>
                    <View style={{ marginTop: 10, alignItems: "center" }}>
                      <Image
                        source={require("../assets/40.png")}
                        style={styles.recommended4}
                      />
                      <View style={{ alignItems: "center" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginLeft: 10,
                          }}
                        >
                          Consulting Firms
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "grey",
                            marginTop: 5,
                            marginLeft: 10,
                            width: 280,
                          }}
                        >
                          Keep your team sharpened and prepared
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 30,
                      }}
                    >
                      Optimize team readiness and ensure consistent performance
                    </Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#CCC",
                        marginTop: 10,
                      }}
                    />

                    <Image
                      source={require("../assets/consult.png")}
                      style={styles.innerimage}
                    />
                    <View style={{ marginTop: 50, }}>
                       <TouchableOpacity onPress={handlecontact}>
                      <MainButtons
                        gradient
                        title={"Get Started"}
                        borderRadius={5}
                        icon={
                          <Image
                            source={{ uri: 'https://img.icons8.com/?size=100&id=85463&format=png&color=FFFFFF' }}
                            style={{ width: 15, height: 15 }}
                          />
                        }
                      />
                       </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.bigwhiteBox2, { alignItems: "center" }]}>
                    <View style={{ marginTop: 10, alignItems: "center" }}>
                      <Image
                        source={require("../assets/39.png")}
                        style={styles.recommended4}
                      />
                      <View style={{ alignItems: "center" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginLeft: 10,
                          }}
                        >
                          In-house Teams
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "grey",
                            marginTop: 5,
                            marginLeft: 10,
                            width: 280,
                          }}
                        >
                          Back your team to succeed
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 30,
                      }}
                    >
                      Transform your team with a tool that guarantees their
                      growth and improved productivity
                    </Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#CCC",
                        marginTop: 10,
                      }}
                    />

                    <Image
                      source={require("../assets/inHouse.png")}
                      style={styles.innerimage}
                    />
                    <View style={{ marginTop: 50 }}>
                       <TouchableOpacity onPress={handlecontact}>
                      <MainButtons
                        gradient
                        title={"Get Started"}
                        borderRadius={5}
                        icon={
                          <Image
                            source={{ uri: 'https://img.icons8.com/?size=100&id=85463&format=png&color=FFFFFF' }}
                            style={{ width: 15, height: 15 }}
                          />
                        }
                      />
                       </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/**INtegrate */}
          <View
            style={{
              marginVertical: 40,
              width: "100%",
              paddingHorizontal: 100,
              backgroundColor: "#fffff",
              position: "relative",
              alignItems: "center",
              marginTop: -130
            }}
          >
            <DottedImage style={{ top: -20, left: -20, filter: 'blur(4px)' }} />
            <View
              style={{
                width: 1400,
                paddingVertical: 40,
              }}
            >
              <Row style={{}}>
                <View style={{ gap: 30, width: "30%" }}>
                  <Text style={{ fontWeight: '600', fontSize: 40}}>Integrate anglequest with over 50 apps</Text>
                  <Text style={{ fontWeight: '400', fontSize: 20}}>AngleQuest works seamlessly with your favorite apps, or find the right app for your needs on anglequest Integrated Apps</Text>
                
                  <Row style={{ gap: 10, alignItems: "center", marginTop: 10 }}>
                    <Title
                      title={"Learn more"}
                      textSize={18}
                      textColor={"#206C00"}
                    />

                    <Image
                      source={{ uri: 'https://img.icons8.com/?size=100&id=85463&format=png&color=206C00' }}
                      style={{ width: 15, height: 15 }}
                    />
                  </Row>
                </View>
                <View style={{ width: "60%", gap: 20, }}>
                  <Row
                    style={{
                      justifyContent: "flex-end",
                      gap: 20,
                      width: "100%",
                      marginTop: 50 
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
          </View>
          {/** */}
          <View
            style={{
              marginVertical: 40,
              width: "100%",
              paddingHorizontal: 100,
              backgroundColor: "#548A76",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Image
              source={require("../assets/imagineShadesR.png")}
              style={{
                width: 573,
                height: 573,
                position: "absolute",
                left: -200,
                top: -286,
              }}
            />
            <Image
              source={require("../assets/imagineShadesL.png")}
              style={{
                width: 400,
                height: 400,
                borderRadius: 200,
                position: "absolute",
                right: -200,
                top: -286,
              }}
            />

            <View
              style={{
                width: 1400,
                // marginHorizontal: 50,
                alignItems: "center",
                marginVertical: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 36,
                  marginTop: 80,
                  fontWeight: "600",
                  marginBottom: 10,
                  color: "white",
                }}
              >
                Imagine a new vision for your career
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "400",
                  marginBottom: 30,
                  color: "white",
                  maxWidth: 793,
                }}
              >
                We will partner with you to reach your next personal best as we
                provide all the tools, knowledge, experience, hand-holding and
                strategies to accomplish it!
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 40,
                  gap: 20,
                  width: "100%",
                }}
              >
                <View style={{ width: "30%" }}>
                  <Row style={{ gap: 40 }}>
                    <View
                      style={{
                        width: 3,
                        height: 650,
                        backgroundColor: "white",
                      }}
                    />
                    <View style={{ gap: 20 }}>
                      <SlideButton
                        title={"Transitioning into Tech"}
                        item1={"AngleQuest AI & Domain Expert Gap Analysis"}
                        item2={"Personalized Growth Roadmap"}
                        item3={"Domain Expert Led Gap Analysis"}
                        item4={"And more..."}
                      />
                      <SlideButton
                        title={"Transitioning into Tech"}
                        item1={"AngleQuest AI & Domain Expert Gap Analysis"}
                        item2={"Personalized Growth Roadmap"}
                        item3={"Domain Expert Led Gap Analysis"}
                        item4={"And more..."}
                      />
                      <SlideButton
                        title={"Transitioning into Tech"}
                        item1={"AngleQuest AI & Domain Expert Gap Analysis"}
                        item2={"Personalized Growth Roadmap"}
                        item3={"Domain Expert Led Gap Analysis"}
                        item4={"And more..."}
                      />
                    </View>
                  </Row>
                  <View style={{ marginLeft: 30 }}>
                     <TouchableOpacity onPress={handlecontact}>
                    <MainButtons
                      width={180}
                      gradient={true}
                      title={"Get Started"}
                      borderRadius={5}
                      icon={
                      <Image
                        source={{ uri: 'https://img.icons8.com/?size=100&id=85463&format=png&color=FFFFFF' }}
                        style={{ width: 18, height: 18 }}
                      />
                      }
                    />
                     </TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: "65%" }}>
                  <Image
                    source={require("../assets/imagine.png")}
                    style={{ height: 555, width: "100%" }}
                  />
                  <Text
                    style={{
                      fontWeight: "600",
                      marginTop: 30,
                      color: "white",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    Do it with a concise plan and the strategic leverage of
                    AngleQuest
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/** back your employees to succeed with anglequest */}
          <View
            style={{
              alignItems: "center",
              marginVertical: 40,
              width: 1400,
            }}
          >
            <Text
              style={{
                fontSize: 36,
                marginTop: 80,
                fontWeight: "700",
                marginBottom: 10,
              }}
            >
              End-to-end Product to run your team’s growth
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "400",
                marginBottom: 30,
              }}
            >
              Tailored for every member of your team
            </Text>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 40,
                width: "100%",
              }}
            >
              <BigLableButton
                title={"New Employee Booster"}
                img={require("../assets/newEmployee.png")}
                subTitle={"Unlock potentials"}
                desc="Have you ever wondered the best way to support new employee to maximize their talent?"
              />
              <BigLableButton
                title={"Existing Employee Upskilling"}
                img={require("../assets/existingEmployee.png")}
                subTitle={"Empower your outliers"}
                desc="Ignite employees' quest for growth by simplifying the process to attain new height using AngleQuest"
              />
              <BigLableButton
                title={"New Employee Booster"}
                img={require("../assets/boostUnder.png")}
                subTitle={"Groom reource for peak performance"}
                desc="Incubate in-house talent to maturity to reach their peak-performance and efficiency"
              />
            </View>
          </View>
          {/**No credit section */}
          <View
            style={{
              //  backgroundColor: "#135837",
              width: "100%",
              alignItems: "center",
            }}
          >
            {<NoCreditSection />}
          </View>
          {/*  Footer */}
          <Footer bgColor={"#084427"} />
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
    backgroundColor: "#F6F6F6",
    position: "relative",
  },
  header: {
    fontSize: 16,
    marginTop: 70,
    marginBottom: 5,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonplus: {
    backgroundColor: "#135837",
    padding: 15,
    borderRadius: 20,
    marginTop: 40,
    width: 250,
  },
  buttonTextplus: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    marginTop: 50,
    width: 1000,
    height: 300,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "darkgreen",
    marginTop: 30,
    textAlign: "center",
  },
  landingimage: {
    width: 1125,
    height: 675,
    alignSelf: "center",
      boxShadow: '0px 10px 20px rgba(255, 255, 255, 0.7)',
  },
  shadowimage: {
    //marginTop: -40,
    width: "60%",
    height: 500,
    marginVertical: 10,
  },
  innerimage: {
    marginTop: 20,
    width: 446,
    height: 277,
    //objectFit: "contain",
  },
  indivimage: {
    // marginTop: 20,
    //width: 1000,
    width: "135%",
    height: 560,
    alignSelf: "center",
  },
  whiteBox1: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 50,
    borderColor: "#CCC",
    borderWidth: 0,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 20,
  },
  whiteBox: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 50,
    borderColor: "#CCC",
    borderWidth: 0,
    borderRightWidth: 1,
    padding: 20,
  },
  bigwhiteBox: {
    width: 580,
    height: 600,
    backgroundColor: "white",
    marginTop: 50,
    marginRight: 40,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bigwhiteBox2: {
  width: 580,
    height: 650,
    backgroundColor: "white",
    marginTop: 50,
    marginRight: 40,
    padding: 20,
    borderRadius: 5,
    
    boxShadow: '0px 20px 40px rgba(85, 107, 47, 0.5)', 
  },
  roundedBox: {
    width: 380,
    height: 400,
    backgroundColor: "white",
    marginTop: 50,
    marginRight: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  greyBox: {
    width: "32%",
    backgroundColor: "#D5f8c5",
    //width: 380,
    //height: 400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  signupBox: {
    width: 380,
    height: 500,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 50,
    marginRight: 20,
    padding: 20,
    shadowColor: "#39FF14",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  recommended2: {
    marginBottom: 20,
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  recommended: {
    marginBottom: 20,
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  recommended3: {
    marginBottom: 20,
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  tryarrow: {
    marginLeft: 20,
    width: 15,
    height: 15,
    marginTop: 30,
  },
  tryarrow2: {
    marginLeft: 20,
    width: 15,
    height: 15,
    marginTop: 40,
  },
  learn: {
    marginLeft: 10,
    width: 10,
    height: 10,
    marginTop: 40,
  },
  learn2: {
    marginLeft: 10,
    width: 10,
    height: 10,
    marginTop: 20,
  },
  video: {
    width: "80%",
    height: 170,
    alignSelf: "center",
    resizeMode: "contain",
    marginLeft: -20,
    marginTop: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  recommended4: {
    objectFit: "contain",
    width: 60,
    height: 60,
  },
  signupimg: {
    width: 40,
    height: 40,
  },
  joinButton: {
    backgroundColor: "#135837",
    padding: 10,
    borderRadius: 20,
    width: 150,
    marginTop: 40,
  },
  joinButtonText: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  signupButton: {
    borderWidth: 1,
    alignSelf: "center",
    padding: 8,
    borderRadius: 20,
    width: 150,
    marginTop: 40,
  },
  signupButtonText: {
    color: "black",
    fontWeight: "500",
    textAlign: "center",
  },
  check: {
    width: 20,
    height: 20,
  },
  followUsText: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
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
