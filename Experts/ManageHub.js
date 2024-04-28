import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';

const ExpoDevPage = () => {
  // Dummy data for trainees
  const [trainees, setTrainees] = useState([
    { id: '1', name: 'Ahmed Hassan', online: true, meetingsMissed: 0 },
    { id: '2', name: 'Maria Garcia', online: false, meetingsMissed: 2 },
    { id: '3', name: 'Isabella Ross', online: true, meetingsMissed: 0 },
    { id: '4', name: 'Adedare Adeyemi', online: false, meetingsMissed: 5 },
    { id: '5', name: 'Abdullah Al-Farsi', online: false, meetingsMissed: 1 },
    { id: '6', name: 'Sophie Dubois', online: true, meetingsMissed: 1 },
    { id: '7', name: 'Emily Johnson', online: false, meetingsMissed: 2 },
    { id: '8', name: 'Sofia Gonzalez', online: true, meetingsMissed: 1 },
    { id: '9', name: 'Chinwe Ekpo', online: true, meetingsMissed: 0 },
    { id: '10', name: 'Lily Baker', online: true, meetingsMissed: 0 },
    { id: '11', name: 'Chiara Romano', online: false, meetingsMissed: 0 },
    { id: '12', name: 'Anita Kovač', online: false, meetingsMissed: 0 },
    { id: '13', name: 'Mia Kim', online: true, meetingsMissed: 7 },
    { id: '14', name: 'Vladimir Arjun', online: false, meetingsMissed: 3 },
    { id: '15', name: 'Olaseni Oluseun', online: true, meetingsMissed: 0 },
    { id: '16', name: 'Benjamin Wilson', online: false, meetingsMissed: 0 },
    { id: '17', name: 'Grace Green', online: false, meetingsMissed: 2 },
    { id: '18', name: 'Aliyah Rahman', online: true, meetingsMissed: 1 },
    { id: '19', name: 'Oliver Morris', online: false, meetingsMissed: 0 },
    { id: '20', name: 'Ogoh Tochukwu', online: false, meetingsMissed: 0 },
    // Add more trainees as needed
  ]);

  // Function to toggle trainee's meeting attendance
  const toggleMeetingAttendance = (traineeId) => {
    setTrainees(prevTrainees =>
      prevTrainees.map(trainee =>
        trainee.id === traineeId ? { ...trainee, meetingsMissed: trainee.meetingsMissed + 1 } : trainee
      )
    );
  };

  const removeTrainee = (traineeId, traineeName) => {
    console.log('Removing trainee:', traineeId, traineeName); // Debugging log
    Alert.alert(
      'Confirm',
      `Are you sure you want to remove ${traineeName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            try {
              console.log('Removing confirmed. Trainee ID:', traineeId); // Debugging log
              setTrainees(prevTrainees =>
                prevTrainees.filter(trainee => trainee.id !== traineeId)
              );
            } catch (error) {
              console.error('Error removing trainee:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  


  // Define table header
  const tableHead = ['    ', 'Status', 'Sessions Missed', 'Remove Trainee'];

  // Define table data
  const tableData = trainees.map(trainee => ([
    <View style={styles.rowContainer}>
      <Image source={require('../assets/User.png')} style={styles.userImage} />
      <Text style={styles.traineeName}>{trainee.name}</Text>
    </View>,
    <Text style={[styles.statusText, trainee.online ? styles.onlineText : styles.offlineText]}>
      {trainee.online ? 'Online' : 'Offline'}
    </Text>,
    trainee.meetingsMissed,
    <TouchableOpacity key={trainee.id} onPress={() => removeTrainee(trainee.id, trainee.name)}>
      <Text style={styles.removeButton}>Remove</Text>
    </TouchableOpacity>,
  ]));

  return (
    <View style={{ height: '58%'}}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Expert Hub Management</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => console.log('Voice call pressed')}>
            <Icon name="phone" size={20} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Video call pressed')}>
            <Icon name="video-camera" size={20} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Chat pressed')}>
            <Icon name="comment" size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.subHeading}>Manage your coaching hub and trainees</Text>
      <View style={{ flexDirection: "row",  alignItems: "flex-start", paddingHorizontal: 10, marginTop: 10, marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 14, color: "#206C00" }}>Microsoft Azure Hub</Text>
        <Text style={{ fontSize: 14, marginLeft: 35, fontWeight: "600", }}>SAP Hub</Text>
        <Text style={{ fontSize: 14, marginLeft: 35, fontWeight: "600", }}>Frontend Dev. Hub</Text>
        <Text style={{ fontSize: 14, marginLeft: 35, color: "grey"   }}>New Hub</Text>
      </View>
      
      {/* Table */}
      <View style={styles.tableContainer}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.headertext} />
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={[styles.row, index % 2 && { backgroundColor: 'white' }]}
            textStyle={styles.text}
          />
        ))}
      </Table>
      </View>
      <TouchableOpacity onPress={() => console.log('Delete Hub pressed')} style={styles.deleteHubButton}>
              <Text style={styles.deleteHubButtonText}>Delete Hub</Text>
            </TouchableOpacity>
    </View>
    </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: 'white',
    marginLeft: 230,
  },
  tableContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: -5,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
    color: '#206C00',
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 25,
    color: '#666',
  },
  head: {
    height: 40,
    backgroundColor: '#A2BE95',
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
  headertext: {
    margin: 6,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  removeButton: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  traineeName: {
    marginLeft: 10,
  },
  statusText: {
    textAlign: 'center',
  },
  onlineText: {
    color: 'green',
    fontWeight: '500'
  },
  offlineText: {
    color: 'pink',
  },
  deleteHubButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  deleteHubButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ExpoDevPage;