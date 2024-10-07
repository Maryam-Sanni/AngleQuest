import { StyleSheet, ScrollView, View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import Title from "../components/Title";
import Top from "../components/HomeTop";
import Top2 from "../components/TopExtra";
import Footer from "../components/Footer";
import SectionContainer from "../components/SectionContainer";
import TwinButton from "../components/TwinButton";
import Row from "../components/Row";
import MainButtons from "../LandingPage/MainButton";

const individualData = [
  {
    id: 1,
    title: "Free",
    subTitle:
      "Get access to basic features of AngleQuest for no additional cost",
    price: 0,
    total: 0,
    freq: "monthly",
  },
  {
    id: 2,
    title: "Monthly",
    subTitle: "Get access to all AngleQuest features",
    price: 120,
    total: 120,
    freq: "monthly",
  },
  {
    id: 3,
    title: "Quarterly",
    subTitle: "Get access to all AngleQuest features",
    price: 100,
    total: 400,
    freq: "quarterly",
  },
  {
    id: 4,
    title: "Yearly",
    subTitle: "Get access to all AngleQuest features",
    price: 100,
    total: 960,
    freq: "yearly",
  },
];

const businessData = [
  {
    id: 5,
    title: "Licensing",
    subTitle:
      "Get access to basic features of AngleQuest for no additional cost",
    price: 5,
    total: 5,
    freq: "monthly",
  },

  {
    id: 6,
    title: "Quarterly",
    subTitle: "Get access to all AngleQuest features",
    price: 90,
    total: 360,
    freq: "quarterly",
  },
  {
    id: 7,
    title: "Yearly",
    subTitle: "Get access to all AngleQuest features",
    price: 70,
    total: 840,
    freq: "yearly",
  },
];
const communityData = [
  {
    id: 8,
    title: "White-labelling",
    subTitle: "Get access to all AngleQuest features",
    price: 4,
    total: 360,
    freq: "quarterly",
  },
  {
    id: 9,
    title: "Licensing",
    subTitle: "Get access to all AngleQuest features",
    price: 7,
    total: 840,
    freq: "yearly",
  },
];

const PriceCard = ({
  title,
  subTitle,
  freq,
  total,
  price,
  onPress,
  activePressed,
}) => {
  const CheckedItem = ({ title }) => {
    return (
      <Row>
        <AntDesign name="check" size={16} color="#135837" />
        <Title textSize={12} title={title} />
      </Row>
    );
  };
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 250,
        height: 401,
        backgroundColor: "#EDFBF4",
        padding: 8,
        borderRadius: 16,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 6,
        }}
      >
        <Title title={title} textSize={24} />
        <Title
          title={subTitle ? subTitle : "Get access to all AngleQuest features"}
          textSize={12}
          style={{ width: 201 }}
        />
      </View>
      <View>
        <Row style={{ marginVertical: 7 }}>
          <Text
            style={{
              fontSize: 24,
            }}
          >
            ${" "}
          </Text>
          <Text style={{ fontSize: 32, }}>
            {price}{" "}
          </Text>
          <Title textSize={12}  title="/ USD" />
        </Row>
        <View style={{ gap: 8 }}>
          <Title
            textSize={12}
            title="per month"
          />
          <Title
            textSize={12}
            title={`$${total} billed ${freq}`}
          />
          <View
            style={{
              backgroundColor: "#CCCCCC",
              width: "100%",
              height: 1,
              borderRadius: 2,
              marginVertical: 6,
            }}
          />
          <View style={{ gap: 6 }}>
            <CheckedItem title="AngleQuest AI" />
            <CheckedItem title="CV/Resume revamp" />
            <CheckedItem title="Career Mentorship" />
            <CheckedItem title="Join Course" />
          </View>

          <View
            style={{
              backgroundColor: "#CCCCCC",
              width: "100%",
              height: 1,
              borderRadius: 2,
              marginVertical: 6,
            }}
          />
          {activePressed ? (
            <MainButtons
              fontSize={14}
              width={"100%"}
              gradient
              title={"Get Started"}
              borderRadius={8}
            />
          ) : (
            <Pressable style={{}}>
              <Title
                textSize={14}
                center
                title={`Get Started`}
              />
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
};
const Pricing = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const handleActive = (val) => {
    setActiveBtn(val);
  };
  return (
          <View style={{ flex: 1 }}>
            <Top2 />
            <View
              style={{
                position: "absolute",
                top: topPosition,
                left: 0,
                right: 0,
                zIndex: 100,
              }}
            >
              <Top value={3} intensity={100} />
            </View>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              onScroll={handleScroll} // Attach scroll listener
              scrollEventThrottle={16} // Frequency of scroll events
            >
              <View style={styles.container}>
          <SectionContainer>
            <View style={{ width: 1400 }}>
              <View style={{ gap: 10, marginTop: 50 }}>

                <Title
                  textSize={32}
                  textWeight={"500"}
                  title={"Pick Your Perfect Plan"}
                  center
                />
                <Title
                  textSize={20}
                  textWeight={"400"}
                  title={
                    "Start for free. No credit card required. Upgrade to unlock more."
                  }
                  center
                />
              </View>
              <View style={{ marginVertical: 30, alignItems: "center" }}>
                <TwinButton
                  text1="Individual"
                  text2="Business"
                  text3="Community"
                  activeBtn={activeBtn}
                  handleActive={handleActive}
                />
              </View>
              <View>
                <Row style={{ justifyContent: "center", gap: 40 }}>
                  {activeBtn === 0
                    ? individualData.map((item) => (
                        <PriceCard
                          onPress={() => setActiveIndex(item?.id)}
                          activePressed={
                            activeIndex === item?.id ? true : false
                          }
                          key={item?.id}
                          title={item?.title}
                          subTitle={item?.subTitle}
                          price={item?.price}
                          freq={item?.freq}
                          total={item?.total}
                        />
                      ))
                    : activeBtn === 1
                    ? businessData.map((item) => (
                        <PriceCard
                          onPress={() => setActiveIndex(item?.id)}
                          activePressed={
                            activeIndex === item?.id ? true : false
                          }
                          key={item?.id}
                          title={item?.title}
                          subTitle={item?.subTitle}
                          price={item?.price}
                          freq={item?.freq}
                          total={item?.total}
                        />
                      ))
                    : communityData.map((item) => (
                        <PriceCard
                          onPress={() => setActiveIndex(item?.id)}
                          activePressed={
                            activeIndex === item?.id ? true : false
                          }
                          key={item?.id}
                          title={item?.title}
                          subTitle={item?.subTitle}
                          price={item?.price}
                          freq={item?.freq}
                          total={item?.total}
                        />
                      ))}
                </Row>
              </View>
            </View>
          </SectionContainer>

          <Footer />
        </View>
      </ScrollView>
    </View>
  );
};

export default Pricing;

const styles = StyleSheet.create({
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
