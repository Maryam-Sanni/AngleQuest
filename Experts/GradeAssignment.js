import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Picker, Modal } from 'react-native';
import OpenModal from './Assignment';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  useEffect(() => {
    const loadSelectedAssignment = async () => {
      try {
        const assignmentData = await AsyncStorage.getItem('selectedAssignment');
        if (assignmentData) {
          setSelectedAssignment(JSON.parse(assignmentData));
        }
      } catch (error) {
        console.error('Failed to load selected assignment:', error.message);
      }
    };

    loadSelectedAssignment();
  }, []);

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  // Default values for assignment details
  const defaultAssignment = {
    topic: 'Assignment 001',
    description: 'Assignment 001 description will be written here',
    dueDate: '2024-06-25 11:00AM (GMT+1:0)',
  };

  const assignment = selectedAssignment || defaultAssignment;

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={mainModalVisible}
        onRequestClose={onClose}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", marginTop: 40, alignItems: 'center' }}>
          <View style={styles.greenBox}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
              <View style={styles.header}>
                <Image
                  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                  style={styles.logo}
                />
                <Text style={styles.headerText}>{t("Grade Assignment")}</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.container}>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                  <TouchableOpacity>
                    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "coral", backgroundColor: '#f7fff4', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                      <Text style={{ fontSize: 13, color: "coral", alignText: 'center', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Grade Assignment")}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleOpenPress}>
                    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'coral', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 20, borderWidth: 1 }}>
                      <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("New Assignment")}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 10, marginBottom: 5, fontFamily: "Roboto-Light" }}>
                  {t("Hub Members")}
                </Text>

                <Text style={{ fontSize: 14, marginLeft: 50, marginTop: 10, fontFamily: "Roboto-Light" }}>
                {assignment.hub_member}
                </Text>

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
                  {t("Topic")}
                </Text>
                <Text style={styles.input}>
                  {assignment.topic}
                </Text>

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
                  {t("Description")}
                </Text>
                <Text style={[styles.input, { height: 100 }]}>
                  {assignment.description}
                </Text>

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontFamily: "Roboto-Light" }}>
                  {t("Assignment Due")}
                </Text>
                <Text style={styles.input}>
                  {assignment.assignment_due}
                </Text>

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 10, marginBottom: 5, fontFamily: "Roboto-Light" }}>
                  {t("Grade Assignment")}
                </Text>
                <Picker
                  style={styles.picker}
                >
                  <Picker.Item label="10%" value="10%" />
                  <Picker.Item label="20%" value="20%" />
                  <Picker.Item label="30%" value="30%" />
                  <Picker.Item label="40%" value="40%" />
                  <Picker.Item label="50%" value="50%" />
                  <Picker.Item label="60%" value="60%" />
                  <Picker.Item label="70%" value="70%" />
                  <Picker.Item label="80%" value="80%" />
                  <Picker.Item label="90%" value="90%" />
                  <Picker.Item label="100%" value="100%" />
                </Picker>

                <TouchableOpacity onPress={onClose} style={styles.buttonplus}>
                  <Text style={styles.buttonTextplus}>{t("Send")}</Text>
                </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
       
      </Modal>
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
    </>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flexDirection: 'column',
    marginLeft: 50,
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: '85%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 5,
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginBottom: 50,
    marginTop: 30,
    width: 100,
    marginLeft: 760,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Roboto-Light"
  },
  input: {
    height: 40,
    width: '85%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 5,
    padding: 10,
    fontFamily: "Roboto-Light"
  },
  uneditable: {
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
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
    marginBottom: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily: "Roboto-Light"
  },
  image: {
    width: 400,
    height: 400,
    marginRight: 30,
  },
});

export default MyComponent;
