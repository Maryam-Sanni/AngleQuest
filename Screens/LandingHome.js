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
import { useNavigation } from "@react-navigation/native";
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

//import Carousel from "react-native-reanimated-carousel";
//import MainFooter from "./MainFooter";
//import DesignedFooter from "./DesignedFooter";

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
    text: "Cross Community",
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
    text: "Career Mentoring",
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
];

const BigLableButton = ({ title, img, subTitle, desc }) => {
  return (
    <LinearGradient colors={["#d5f8c5", "#ffffff"]} style={styles.greyBox}>
      <Text
        style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "#135837" }}
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
        <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>
          {subTitle}
        </Text>
        <Text style={{ fontSize: 16, fontFamily: "Poppins-Regular" }}>
          {desc}
        </Text>
      </View>
      <MainButtons
        width={"100%"}
        gradient={true}
        title={"Get Started"}
        icon={<AntDesign name="arrowright" size={18} color="white" />}
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
        textFamily={"Poppins-SemiBold"}
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
      style={[style, { width: 608, height: 344, position: "absolute" }]}
    />
  );
};
const CardItem = ({ title, cardImg, personImg, bgColor }) => {
  const [active, setActive] = useState(false);
  const RowItem = ({ text }) => {
    return (
      <Row style={{ gap: 8 }}>
        <AntDesign name="checkcircle" size={16} color="white" />
        <Text style={{ fontSize: 14, color: "white" }}>{text}</Text>
      </Row>
    );
  };
  return (
    <TouchableOpacity
      style={{
        width: 280,
        backgroundColor: bgColor ? bgColor : "white",
        height: 385,

        position: "relative",
        borderRadius: 20,
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {active && (
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            //  backgroundColor: "#000000B2",
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
            <Feather name="loader" size={20} color="white" />
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
          textFamily={"Poppins-SemiBold"}
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
              bottom: -20,
              right: 0,
              width: 265,
              height: 180,
              zIndex: 10,
              //  objectFit: "contain",
              borderBottomEndRadius: 20,
              borderBottomRightRadius: 20,
            }}
            source={cardImg}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const SpecialBtn = ({ text, height, width, bgColor }) => {
  return (
    <Pressable
      style={{
        backgroundColor: bgColor ? bgColor : "#00000033",
        width: width ? width : 144,
        height: height ? height : 54,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontFamily: "Poppins-Regular",
          fontWeight: "400",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
const MyComponent = () => {
  const navigation = useNavigation(); // Navigation object
  const [ModalVisible, setModalVisible] = useState(false);
  const scrollRef = useRef(null);
  const videoRef = useRef(null);
  const handleOpenPress = () => {
    setModalVisible(true);
  };

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
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#cccc",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          zIndex: 200,
        }}
        onPress={() => scrollRef.current?.scrollTo({ x: -300, animated: true })}
      >
        {left ? (
          <AntDesign name="caretleft" size={24} color="#ccc" />
        ) : (
          <AntDesign name="caretright" size={24} color="#ccc" />
        )}
      </TouchableOpacity>
    );
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
                  fontSize: 48,
                  fontFamily: "Poppins-SemiBold",
                  fontWeight: "500",
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
                  fontSize: 20,
                  fontFamily: "Poppins-Regular",
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
                      width: 700,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 20,
                        fontFamily: "Poppins-Regular",
                        fontWeight: "400",
                      }}
                    >
                      Get started as:
                    </Text>
                    <Row style={{ alignItems: "center", gap: 20 }}>
                      <SpecialBtn text={"Individual"} />
                      <SpecialBtn text={"Expert"} />
                      <SpecialBtn text={"Business"} />
                    </Row>
                  </Row>
                </BlurView>
                <MainButtons
                  title="Book a demo now"
                  height={74}
                  width={200}
                  fontSize={18}
                  center
                  gradient
                  borderRadius={10}
                />
              </Row>
            </View>
          </View>

          {/**toolkit */}
          <View
            style={{
              marginVertical: 40,
              width: "100%",
              paddingHorizontal: 100,
              backgroundColor: "#fffff",
              position: "relative",
              alignItems: "center",
            }}
          >
            <View style={{ width: 1400 }}>
              <View style={{ gap: 10 }}>
                <Title
                  textSize={28}
                  textWeight={"700"}
                  title={"Supercharge your growth"}
                  textFamily={"Poppins-Bold"}
                />
                <Title
                  textSize={22}
                  textFamily={"Poppins-Regular"}
                  title={
                    "We know how important your work is to you, we made it our life’s work to support you."
                  }
                />
                <Row style={{ gap: 10 }}>
                  <MaterialIcons
                    name="keyboard-arrow-left"
                    size={20}
                    color={"#135837"}
                  />
                  <Title
                    textSize={22}
                    textFamily={"Poppins-SemiBold"}
                    textColor={"#135837"}
                    title={
                      "Subscribe as indiviudual, team, organization or community"
                    }
                  />
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
                      x: 300,
                      y: 0,
                      animated: true,
                    })
                  }
                />

                <ScrollView
                  horizontal
                  ref={scrollRef}
                  pagingEnabled
                  //   showsHorizontalScrollIndicator={true}
                  contentContainerStyle={{
                    gap: 20,
                    marginVertical: 40,
                    flexGrow: 1,
                    justifyContent: "center",
                    width: "100%",
                    height: 420,
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
                    />
                  ))}
                </ScrollView>
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
                  fontFamily: "Poppins-Bold",

                  marginBottom: -60,
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
              paddingHorizontal: 100,
              backgroundColor: "#fffff",
              position: "relative",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 1400,
                paddingVertical: 40,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 50,
                  marginBottom: 100,
                }}
              >
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <View style={[styles.bigwhiteBox2, { alignItems: "center" }]}>
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
                    <View style={{ marginTop: 20 }}>
                      <MainButtons
                        gradient
                        title={"Get Started"}
                        icon={
                          <AntDesign
                            name="arrowright"
                            size={10}
                            color="#ffff"
                          />
                        }
                      />
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
                    <View style={{ marginTop: 20 }}>
                      <MainButtons
                        gradient
                        title={"Get Started"}
                        icon={
                          <AntDesign
                            name="arrowright"
                            size={10}
                            color="#ffff"
                          />
                        }
                      />
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
            }}
          >
            <DottedImage style={{ top: -20, left: -20 }} />
            <View
              style={{
                width: 1400,
                paddingVertical: 40,
              }}
            >
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
                width: 573,
                height: 573,
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
                  fontFamily: "Poppins-Bold",
                  marginTop: 80,
                  fontWeight: "700",
                  marginBottom: 10,
                  color: "white",
                }}
              >
                Imagine a new vision for your career
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins-Regular",
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
                    <MainButtons
                      width={180}
                      gradient={true}
                      title={"Get Started"}
                      icon={
                        <AntDesign name="arrowright" size={18} color="white" />
                      }
                    />
                  </View>
                </View>
                <View style={{ width: "65%" }}>
                  <Image
                    source={require("../assets/imagine.png")}
                    style={{ height: 555, width: "100%" }}
                  />
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
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
                fontFamily: "Poppins-Bold",
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
                fontFamily: "Poppins-Regular",
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
    height: 600,
    backgroundColor: "white",
    marginTop: 50,
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
