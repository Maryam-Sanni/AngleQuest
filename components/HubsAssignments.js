import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import OpenSchedule from '../Jobseekers/SubmitAssigment';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newAssignments, setNewAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleOpenPress = async (assignment) => {
    setSelectedAssignment(assignment);
    setModalVisible(true);

    try {
      await AsyncStorage.setItem('selectedAssignment', JSON.stringify(assignment));
      console.log('Selected assignment saved:', assignment);
    } catch (error) {
      console.error('Failed to save selected assignment to AsyncStorage', error);
    }
  };


  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const fetchNewAssignments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://recruitangle.com/api/expert/newassignment/get-all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.NewAssignment) {
        setNewAssignments(response.data.NewAssignment);
      }
    } catch (error) {
      console.error('Error fetching new assignments:', error);
    }
  };

  useEffect(() => {
    fetchNewAssignments();
  }, []);

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { t } = useTranslation();

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  const countHubMembers = (hubMemberString) => {
    // Split the string by comma and trim any extra spaces
    const membersArray = hubMemberString.split(',').map(member => member.trim());
    // Return the number of members
    return membersArray.length;
  };
  
  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>{t("Hub Assignments")}</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Hub Name")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Assignmed To")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Topic")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Given Date")}</Text>
            </View>
            <View style={styles.cell2}>
              <Text style={styles.headerText}>{t("Due Date")}</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.cell2}>
              <Text style={{color: 'white'}}>Open</Text>
               </View>
            </TouchableOpacity>
          </View>

          {newAssignments.map((assignment, index) => (
            <View key={assignment.id} style={styles.row}>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{assignment.hub_name}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>
                  {`Members: ${countHubMembers(assignment.hub_member)}`}
                </Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{assignment.topic}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{new Date(assignment.created_at).toLocaleDateString()}</Text>
              </View>
              <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                <Text style={styles.cellText}>{new Date(assignment.assignment_due).toLocaleDateString()}</Text>
              </View>
              <TouchableOpacity onPress={() => handleOpenPress(assignment)}>
                <View style={index % 2 === 0 ? styles.cell : styles.cell2}>
                  <Text style={styles.linkText}>{t("Open")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenSchedule assignment={selectedAssignment} onClose={handleCloseModal} />
          </View>
        </Modal>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    marginTop: 30,
    marginLeft: 50,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    flex: 1,
    marginRight: 200,
    marginTop: 20,
    marginBottom: 30,
    alignContent: 'center',
    justifyContent: 'flex-start',
    marginLeft: 50,
    marginRight: 50,
  },
  greenBox: {
    width: "90%",
    marginBottom: 20,
    marginLeft: 50,
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 30,
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
    fontFamily: "Roboto-Light",
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
  linkText: {
    color: "#206C00",
    fontSize: 14,
    fontFamily: "Roboto-Light",
  },
});

export default ScheduledMeetingsTable;
