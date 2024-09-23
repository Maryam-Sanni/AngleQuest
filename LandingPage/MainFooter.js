import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

const MainFooter = () => {
  return (
    <View
      style={{
        gap: 10,
        paddingVertical: 40,
        height: 361,
        marginHorizontal: 100,
        backgroundColor: "white",
       // width: 1400,
        //  alignItems: "center",
     //   alignSelf:"center"
      }}
    >
      <View style={styles.footer}>
        <View style={styles.sectionFirst}>
          <View style={styles.section}>
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
              }}
              style={styles.logo}
            />
            <Text style={styles.sectionTitle}>Contact Us</Text>

            <Text style={styles.sectionItem}>ask@anglequest.com</Text>
            <View style={styles.iconsRow}>
              <Image
                source={require("../assets/icons8-twitterx-50.png")}
                style={styles.icon}
              />
              <Image
                source={require("../assets/icons8-facebook-48.png")}
                style={styles.icon}
              />
              <Image
                source={require("../assets/icons8-linkedin-48.png")}
                style={styles.icon}
              />
            </View>
          </View>
        </View>
        <View style={styles.sectionSecond}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Products</Text>
            <Text style={styles.sectionItem}>Individual</Text>
            <Text style={styles.sectionItem}>Experts</Text>
            <Text style={styles.sectionItem}>Businesses</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>
            <Text style={styles.sectionItem}>Documentation</Text>
            <Text style={styles.sectionItem}>FAQ</Text>
            <Text style={styles.sectionItem}>Terms & Privacy Policy</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why AngleQuest</Text>
            <Text style={styles.sectionItem}>Pricing</Text>
          </View>
        </View>
      </View>
      <View style={{ gap: 10 }}>
        <View style={{ width: "100%", height: 2, backgroundColor: "black" }} />
        <Text style={{ alignSelf: "center" }}>
          All Rights Reserved by AngleQuest.com
        </Text>
      </View>
    </View>
  );
};

export default MainFooter;

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  sectionFirst: {
    flex: 1,
  },
  sectionSecond: {
    flexDirection: "row",
    flex: 5,
     justifyContent: "space-around",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  section: {
    marginRight: 100,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 5,
  },
  lastsection: {
    flexDirection: "column",
  },
  sectionItem: {},
  iconsRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
    objectFit: "contain",
  },
});
