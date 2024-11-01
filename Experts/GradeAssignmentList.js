import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import OpenModal from './Assignment';
import OpenModal2 from './GradeAssignment';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleOpenPress2 = async (assignment) => {
    try {
      // Save the selected assignment to AsyncStorage
      await AsyncStorage.setItem('selectedAssignment', JSON.stringify(assignment));
      
      setSelectedAssignment(assignment);
      setMainModalVisible(false);
      setModalVisible2(true);
    } catch (error) {
      console.error('Failed to save assignment:', error.message);
    }
  };  

  const handleCloseModal2 = () => {
    setModalVisible2(false);
    onClose();
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get('https://recruitangle.com/api/expert/newassignment/get', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200 && response.data.status === 'success') {
          const sortedAssignments = response.data.NewAssignment.sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
          );
          setAssignments(sortedAssignments);
        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Failed to load assignments:', error.message);
      }
    };

    loadAssignments();
  }, []);


  const getHubMemberCount = (hub_member) => {
    if (!hub_member) return 0;
    return hub_member.split(',').length;
  };

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
                <Text style={styles.headerText}>{t("Assignments")}</Text>
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
                      <Text style={{ fontSize: 13, color: "coral", textAlign: 'center', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("Grade Assignment")}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleOpenPress}>
                    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'coral', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 20, borderWidth: 1 }}>
                      <Text style={{ fontSize: 13, color: "#f7fff4", textAlign: 'center', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>{t("New Assignment")}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.table}>
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Hub Member(s)")}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Topic")}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Description")}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Given Date")}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={{ fontWeight: '600', fontSize: 14, fontFamily: "Roboto-Light" }}>{t("Due Date")}</Text>
                    </View>
                    <TouchableOpacity style={styles.cell}>
                      <Text style={styles.cellText}> </Text>
                    </TouchableOpacity>
                  </View>
                  {assignments.map((assignment) => (
                    <View key={assignment.id} style={styles.row}>
                      <View style={styles.cell2}>
                        <Text style={styles.cellText}>{getHubMemberCount(assignment.hub_member)}</Text>
                      </View>
                      <View style={styles.cell2}>
                        <Text style={styles.cellText}>{assignment.topic}</Text>
                      </View>
                      <View style={styles.cell2}>
                        <Text style={styles.cellText}>{assignment.description}</Text>
                      </View>
                      <View style={styles.cell2}>
                        <Text style={styles.cellText}>{new Date(assignment.created_at).toLocaleDateString()}</Text>
                      </View>
                      <View style={styles.cell2}>
                        <Text style={styles.cellText}>{new Date(assignment.assignment_due).toLocaleDateString()}</Text>
                      </View>
                      <TouchableOpacity onPress={() => handleOpenPress2(assignment)} style={styles.cell2}>
                        <Text style={styles.open}>{t("Grade")}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseModal} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
        <View style={styles.modalContent}>
          <OpenModal2 onClose={handleCloseModal2} selectedAssignment={selectedAssignment} />
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
  table: {
    marginRight: 200,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50,
    marginRight: 50,
  },
  open: {
    color: "coral",
    fontSize: 14,
    borderColor: "coral",
    backgroundColor: '#f7fff4',
    borderWidth: 2,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontFamily: "Roboto-Light"
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    padding: 10,
    alignItems: 'center',
  },
  cell2: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  cellText: {
    fontSize: 14,
    fontFamily: "Roboto-Light"
  }
});

export default MyComponent;
