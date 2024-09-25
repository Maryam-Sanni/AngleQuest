import { StyleSheet, Image, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Title from "./Title";
import Row from "./Row";

const Footer = ({ bgColor }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [changeBg, setChangeBg] = useState(bgColor ? bgColor : "#E0F8EC");

  const handleBG = (val) => {
    setChangeBg(val);
  };

  const goToExpert= () => {
  navigate("/sign-up");
  };
  
  const FooterList = ({
    title,
    item1,
    item2,
    item3,
    item4,
    item5,
    onPress1,
    onPress2,
    onPress3,
    onPress4,
    onPress5,
  }) => {
    return (
      <View style={{ gap: 16 }}>
        {title && (
          <Title
            textSize={16}
            textColor={changeBg === "#084427" ? "white" : "#135837"}
            textWeight={"700"}
            title={title}
          />
        )}
        {item1 && (
          <Title
            textSize={16}
            textColor={changeBg === "#084427" ? "white" : "black"}
            textWeight={"400"}
            title={item1}
            onPress={onPress1}
          />
        )}
        {item2 && (
          <Title
            textSize={16}
            textColor={changeBg === "#084427" ? "white" : "black"}
            textWeight={"400"}
            title={item2}
            onPress={onPress2}
          />
        )}
        {item3 && (
          <Title
            textSize={16}
            textColor={changeBg === "#084427" ? "white" : "black"}
            textWeight={"400"}
            title={item3}
            onPress={onPress3}
          />
        )}
        {item4 && (
          <Title
            textSize={16}
            textColor={changeBg === "#084427" ? "white" : "black"}
            textWeight={"400"}
            title={item4}
            onPress={onPress4}
          />
        )}
        {item5 && (
          <Title
            textSize={16}
            textColor={changeBg === "#084427" ? "white" : "black"}
            textWeight={"400"}
            title={item5}
            onPress={onPress5}
          />
        )}
      </View>
    );
  };
  return (
    <View
      style={{
        paddingVertical: 40,
        width: "100%",
        paddingHorizontal: 100,
        backgroundColor: changeBg,
        position: "relative",
        alignItems: "center",
      }}
    >
      <View style={{ width: 1400 }}>
        <View style={{ marginBottom: 25 }}>
          <Row style={{ justifyContent: "space-between" }}>
            <View
              style={{
                flexDirection: "row",
                width: 475,
                justifyContent: "space-between",
              }}
            >
              <FooterList
                title={"Product"}
                item1={"Individual"}
                item2={"Experts"}
                item3={"Businesses"}
                item4={"Pricing"}
              />
              <FooterList
                title={"Information"}
                item1={"FAQs"}
                item2={"Blog"}
                item3={"Support"}
              />
              <FooterList
                title={"Company"}
                item1={"About us"}
                item2={"Careers"}
                item3={"Contact us"}
              />
            </View>
            <LinearGradient
              colors={
                changeBg === "#084427"
                  ? ["#79d164", "#E0F8EC"]
                  : ["#135837", "#29BE77"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ padding: 20, gap: 16, borderRadius: 12 }}
            >
              <Row style={{ height: 50, marginTop: 20 }}>
                <View
                  style={{
                    width: 320,
                    height: "100%",
                    backgroundColor: "#f5f5f5",
                    borderBottomLeftRadius: 6,
                    borderTopLeftRadius: 6,
                  }}
                >
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email Address"
                    style={{
                      width: "100%",
                      height: "100%",
                      paddingLeft: 16,
                    }}
                  />
                </View>
                <Pressable
                  style={{
                    width: 45,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#135837",
                    borderBottomRightRadius: 6,
                    borderTopRightRadius: 6,
                  }}
                >
                  <Image
                    source={{ uri: 'https://img.icons8.com/?size=100&id=85463&format=png&color=FFFFFF' }}
                    style={{ width: 20, height: 20 }}
                  />
                </Pressable>
              </Row>
              <View>
                <Title
                  textSize={12}
                  style={{ maxWidth: 364, lineHeight: 21 }}
                  textColor={"white"}
                  title={
                    "Hello fam, would you like to get emails regarding our products and services, updates and changes? Subscribe to our Newsletter. "
                  }
                />
              </View>
            </LinearGradient>
          </Row>
        </View>

        <View style={{ gap: 25 }}>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: changeBg === "#084427" ? "white" : "black",
            }}
          />
          <Row style={{ justifyContent: "space-between" }}>
            <View />
            <Row style={{ gap: 30 }}>
              <Title
                textSize={14}
                textFamily={"Poppins-Regular"}
                textWeight={"400"}
                title={"Terms"}
                textColor={changeBg === "#084427" ? "white" : "black"}
              />
              <Title
                textSize={14}
                textFamily={"Poppins-Regular"}
                textWeight={"400"}
                title={"Privacy"}
                textColor={changeBg === "#084427" ? "white" : "black"}
              />
              <Title
                textSize={14}
                textFamily={"Poppins-Regular"}
                textWeight={"400"}
                title={"Cookies"}
                textColor={changeBg === "#084427" ? "white" : "black"}
              />
            </Row>
            <Row style={{ gap: 16 }}>
              <Pressable style={styles.socialIcon}>
                <FontAwesome
                  name="linkedin"
                  size={14}
                  color={changeBg === "#084427" ? "white" : "black"}
                />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <FontAwesome
                  name="facebook"
                  size={14}
                  color={changeBg === "#084427" ? "white" : "black"}
                />
              </Pressable>
              <Pressable style={styles.socialIcon}>
                <FontAwesome
                  name="twitter"
                  size={14}
                  color={changeBg === "#084427" ? "white" : "black"}
                />
              </Pressable>
            </Row>
          </Row>
          <Row style={{ gap: 10 }}>
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
              }}
              style={styles.logo}
            />
            <Title
              textSize={20}
              textWeight={"700"}
              title={"AngleQuest"}
              textColor={changeBg === "#084427" ? "white" : "black"}
            />
            {/* <Row style={{ alignSelf: "flex-end", gap: 20, justifySelf: "end" }}>
              <Pressable
                onPress={() => handleBG("#ffff")}
                style={[styles.socialIcon, { backgroundColor: "#ffff" }]}
              ></Pressable>
              <Pressable
                onPress={() => handleBG("#E0F8EC")}
                style={[styles.socialIcon, { backgroundColor: "#E0F8EC" }]}
              ></Pressable>
              <Pressable
                onPress={() => handleBG("#084427")}
                style={[styles.socialIcon, { backgroundColor: "#084427" }]}
              ></Pressable>
            </Row> */}
          </Row>
        </View>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  socialIcon: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "black",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
