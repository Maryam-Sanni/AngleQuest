import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

function MyComponent({ onClose }) {
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: "white", marginTop: 40 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Topic, Overview, and Image section */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
            ✕
          </Text>
        </TouchableOpacity>
        <View style={styles.darkGreenBox}>
        <View style={{ flexDirection:'row' }}>
        <View style={{ flexDirection:'column' }}>
              <Text style={styles.sessionTitle}>{t("Introducing Interceptors in SAP Commerce Cloud")}</Text>
              <View style={styles.iconRow}>
                {/* Add icons with text */}
                <View style={styles.iconTextWrapper}>
                  <Icon name="calendar-outline" size={20} color="#FFF" style={styles.icon} />
                  <Text style={styles.iconText}>{t("Created: 24/10/2024")}</Text>
                </View>
                <View style={styles.iconTextWrapper}>
                  <Icon name="globe-outline" size={20} color="#FFF" style={styles.icon} />
                  <Text style={styles.iconText}>{t("Online")}</Text>
                </View>
                <View style={styles.iconTextWrapper}>
                  <Icon name="time-outline" size={20} color="#FFF" style={styles.icon} />
                  <Text style={styles.iconText}>{t("1 hour")}</Text>
                </View>
              </View>
              <Image
   source={require('../assets/TG4.png')}
              style={styles.sessionImage}
            />
                     </View>
                     <View style={{ flexDirection:'column', marginLeft: 50 }}>
              <Text style={styles.overviewTitle}>{t("Overview")}</Text>
              <Text style={styles.overview}>{t("This live session introduces the concept of interceptors...")}</Text>
              <Text style={styles.learningObjectivesTitle}>{t("Learning Objectives")}</Text>
<Text style={styles.learningObjectives}>{t("After participating, you should be able to:")}</Text>
<Text style={styles.learningObjectives}>{t("1. Explain the concept of interceptors and their types in SAP Commerce Cloud.")}</Text>
<Text style={styles.learningObjectives}>{t("2. Implement a new interceptor for various use cases.")}</Text>
<Text style={styles.learningObjectives}>{t("3. Customize interceptor behavior based on specific project requirements.")}</Text>
<Text style={styles.learningObjectives}>{t("4. Apply best practices to ensure efficient interceptor implementation.")}</Text>

<View style={styles.experienceTitleWrapper}>
  <Text style={styles.experienceTitle}>{t("For")}</Text>
</View>

<View style={styles.lineWrapper}>
  <View style={[styles.filledLine, { width: '33%' }] /* Adjust width based on the selected experience level */} />
</View>

<View style={styles.experienceLevels}>
  <Text style={styles.experienceLevel}>{t("Beginners")}</Text>
  <Text style={styles.experienceLevel}>{t("Intermediates")}</Text>
  <Text style={styles.experienceLevel}>{t("Advanced")}</Text>
</View>
              </View>
            </View>
           
</View>
   

        {/* Live session schedule section */}
        <View style={styles.whiteBox}>
          <Text style={styles.scheduleTitle}>{t("Live Session Schedule")}</Text>
          <View style={styles.scheduleRow}>
            <Text style={styles.description}>{t("Introducing interceptors in SAP Commerce Cloud")}</Text>
            <Text style={styles.time}>{t("Nov 28, 2024, 09:30 - 10:30 GMT+1")}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{t("Register")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scheduleRow}>
            <Text style={styles.description}>{t("Webinar: Interceptors in SAP Commerce Cloud")}</Text>
            <Text style={styles.time}>{t("Feb 6, 2025, 15:00 - 16:00 GMT")}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{t("Register")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scheduleRow}>
            <Text style={styles.description}>{t("Webinar: Interceptors in SAP Commerce Cloud")}</Text>
            <Text style={styles.time}>{t("Mar 18, 2025, 09:30 - 10:30 GMT+1")}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{t("Register")}</Text>
            </TouchableOpacity>
          </View>
        </View>

       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  darkGreenBox: {
    width: 1200,
    backgroundColor: '#013220',
    padding: 20,
  },
  topicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sessionImage: {
    width: 600,
    height: 300,
    marginTop: 20
  },
  detailsColumn: {
    flex: 1,
    paddingRight: 20,
  },
  sessionTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: "rgba(225,225,212,0.3)",
    padding: 10,
    borderRadius: 10
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  iconText: {
    color: 'white',
    fontSize: 14,
    marginRight: 30
  },
  overviewTitle: {
    marginTop: 14,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  overview: {
    marginTop: 5,
    color: '#FFF',
    fontSize: 14,
  },
  learningObjectivesTitle: {
    marginTop: 14,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  learningObjectives: {
    marginTop: 5,
    color: '#FFF',
    fontSize: 14,
    width: 500
  },
  experienceTitle: {
    marginTop: 20,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  experienceLevels: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'space-between',
  },
  experienceLevel: {
    color: '#FFF',
    fontSize: 14,
  },
  experienceTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lineWrapper: {
    width: '100%', // Full width of the container
    height: 4,
    backgroundColor: '#CCC', // Light grey for the unfilled portion
    marginBottom: 10,
  },
  filledLine: {
    height: '100%',
    backgroundColor: '#206C00', // Dark green for the filled portion
  },
  rolesTitle: {
    marginTop: 20,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  role: {
    marginTop: 5,
    color: '#FFF',
    fontSize: 16,
  },
  scheduleButton: {
    marginTop: 20,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  whiteBox: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 20,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  description: {
    flex: 2,
    color: '#333',
  },
  time: {
    flex: 1,
    color: '#333',
  },
  button: {
    backgroundColor: 'coral',
    padding: 8,
    alignItems: 'center',
    borderRadius: 5,
    width: 120,
    marginBottom: 10
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
});

export default MyComponent;
