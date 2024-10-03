import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigate } from "react-router-dom";

const WincAcademyFooter = () => {
  const navigate = useNavigate();

  const handleIndividualSignUp = () => {
    navigate("/sign-up", { state: { signUpOption: 1 } });
  };

  return (
    <View style={styles.footerContainer}>
      <View style={{ flexDirection: "column", width: "50%", marginLeft: "5%" }}>
        <Text style={styles.heading}>
          Still Unsure where to start from or the best fit for you?
        </Text>
        <Text style={styles.description}>
          We're here to help. Our skill gap analysis offers personalized
          guidance—simply upload your CV for AI-powered analysis, or answer a
          few straightforward questions. From there, you can connect with our
          experts to explore tailored options. It’s the perfect starting point
          for your learning journey!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleIndividualSignUp}
        >
          <LinearGradient
            colors={["#135837", "#29BE77"]} // Gradient colors (green shades)
            style={styles.gradient}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.buttonText}>Sign Up</Text>
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=85463&format=png&color=FFFFFF",
                }}
                style={{ width: 18, height: 18, marginLeft: 7, marginTop: 2 }}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../assets/Unsure.jpg")}
        style={styles.imageBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 50,
    width: "100%",
    backgroundColor: "#003B24",
    alignItems: "center",
    flexDirection: "row",
    height: 600,
  },
  heading: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "flex-start",
    color: "white",
    width: 600,
  },
  description: {
    fontSize: 20,
    textAlign: "flex-start", // Center the description text
    color: "white",
    marginBottom: 50, // Spacing between description and button
    width: 600,
  },
  button: {
    width: 200, // Set button width
    marginTop: 20,
  },
  gradient: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center", // Center the button text
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  imageBack: {
    width: 600,
    height: 600,
    position: "absolute",
    right: 0,
    marginLeft: 50,
    marginTop: -50,
    marginBottom: -50,
  },
});

export default WincAcademyFooter;
