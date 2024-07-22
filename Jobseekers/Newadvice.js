import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "../components/DateTimePickerModal";
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function MyComponent({ onClose }) {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const [type, setType] = useState("");
  const [role, setRole] = useState("");
  const [challenge, setChallenge] = useState("");
  const [startingLevel, setStartingLevel] = useState("");
  const [targetLevel, setTargetLevel] = useState("");
  const [status, setStatus] = useState("");
  
  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const goToPlans = () => {
    // Validate the form data before making the API request
    if (!type || !role || !challenge || !startingLevel || !targetLevel || !status || !selectedDateTime) {
      alert(t("Please fill in all fields"), t("Please fill in all fields"));
      return;
    }

    // Prepare the data for the API request
    const formData = {
      type,
      role,
      challenge,
      starting_level: startingLevel,
      target_level: targetLevel,
      status,
      date_time: selectedDateTime,
    };

    // Make the API request using Axios
    axios.post('https://www.recruitangle.com/api/expert/signup', formData)
      .then(response => {
        if (response.data.status === 'success') {
          alert(t("Success"), t("Advice Objective created successfully"));
          navigation.navigate('Advice Offer');
          onClose(); // Close the modal
        } else {
          alert(t("Error"), t("Failed to create Advice Objective"));
        }
      })
      .catch(error => {
        alert(t("Error"), t("An error occurred. Please try again."));
        console.error(error);
      });
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Create New Objective")}</Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Type")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={type}
                  style={styles.picker}
                  onValueChange={(itemValue) => setType(itemValue)}
                >
                  <Picker.Item label={t("Career Change")} value="Career Change" />
                  <Picker.Item label={t("Getting a raise")} value="Getting a raise" />
                  <Picker.Item label={t("Visibility at work")} value="Visibility at work" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Role")}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t("SAP FI")}
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={role}
                  onChangeText={setRole}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Describe the challenge you are seeking advice for in few words")}</Text>
              </View>
              <View style={styles.cell}>
                <TextInput
                  placeholder={t("I want to change from a data analyst to a SAP FI consultant")}
                  placeholderTextColor="grey"
                  multiline
                  style={[styles.input, { height: 100 }]}
                  value={challenge}
                  onChangeText={setChallenge}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Starting Level")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={startingLevel}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStartingLevel(itemValue)}
                >
                  <Picker.Item label={t("Beginner")} value="Beginner" />
                  <Picker.Item label={t("Junior")} value="Junior" />
                  <Picker.Item label={t("Medior")} value="Medior" />
                  <Picker.Item label={t("Senior")} value="Senior" />
                  <Picker.Item label={t("Professional")} value="Professional" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Target Level")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={targetLevel}
                  style={styles.picker}
                  onValueChange={(itemValue) => setTargetLevel(itemValue)}
                >
                  <Picker.Item label={t("Beginner")} value="Beginner" />
                  <Picker.Item label={t("Junior")} value="Junior" />
                  <Picker.Item label={t("Medior")} value="Medior" />
                  <Picker.Item label={t("Senior")} value="Senior" />
                  <Picker.Item label={t("Professional")} value="Professional" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Status")}</Text>
              </View>
              <View style={styles.cell}>
                <Picker
                  selectedValue={status}
                  style={styles.picker}
                  onValueChange={(itemValue) => setStatus(itemValue)}
                >
                  <Picker.Item label={t("Active")} value="Active" />
                  <Picker.Item label={t("Review")} value="Review" />
                  <Picker.Item label={t("Replan")} value="Replan" />
                  <Picker.Item label={t("Completed")} value="Completed" />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Expert")}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>Joop Melcher</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Expert available days")}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>Mon, Tue, Wed and Thurs</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Expert available time")}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={{ color: 'grey', fontFamily: "Roboto-Light" }}>09:00AM-05:00PM</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={{ fontFamily: "Roboto-Light" }}>{t("Date and Time")}</Text>
              </View>
              <View style={styles.cell}>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                  <Text style={{ color: 'grey', borderWidth: 1, borderColor: 'black', fontFamily: "Roboto-Light" }}>{t("Selected date and time: {selectedDateTime}")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={goToPlans} style={styles.buttonplus}>
            <Text style={styles.buttonTextplus}>{t("Next")}</Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isModalVisible}
          onConfirm={handleConfirmDateTime}
          onCancel={handleCancelModal}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70,
    marginTop: 20,
    marginLeft: 50
  },
  greenBox: {
    width: 920,
    height: '100%',
    backgroundColor: '#F8F8F8',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1,
    color: 'grey',
    fontSize: 14
  },
  buttonplus: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 5,
    marginLeft: 750,
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
  input: {
    outline: 'black',
    borderColor: 'black',
    borderWidth: 1
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily: "Roboto-Light"
  }
});

export default MyComponent;
