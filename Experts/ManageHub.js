import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, Modal } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import { useNavigation } from '@react-navigation/native';

const ExpoDevPage = () => {
  // Dummy data for trainees
  const navigation = useNavigation();

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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTraineeId, setSelectedTraineeId] = useState(null);

  const toggleMeetingAttendance = (traineeId) => {
    setTrainees(prevTrainees =>
      prevTrainees.map(trainee =>
        trainee.id === traineeId ? { ...trainee, meetingsMissed: trainee.meetingsMissed + 1 } : trainee
      )
    );
  };

  // Function to remove trainee
  const removeTrainee = (traineeId) => {
    setTrainees(prevTrainees =>
      prevTrainees.filter(trainee => trainee.id !== traineeId)
    );
    setModalVisible(false);
  };
  
  const goToAllHubs = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('My Hubs');
  };

  // Define table header
  const tableHead = ['    ', 'Status', 'Sessions Missed', 'Remove Participant'];

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
    <TouchableOpacity key={trainee.id} onPress={() => {
      setSelectedTraineeId(trainee.id);
      setModalVisible(true);
    }}>
      <Text style={styles.removeButton}>Remove</Text>
    </TouchableOpacity>,
  ]));

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Expert Hub Management</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => console.log('Voice call pressed')}>
          <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fe923b79972d80159d9e76f3125f9461c31cb052dd8304d20beee39ec1ce030c?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={{ width: 20, height: 20, marginLeft: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Video call pressed')}>
          <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a2dbec3f3a9aca911900f391c458cd3027f682bac2911c9be95cb59b74639e5c?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={{ width: 20, height: 20, marginLeft: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Chat pressed')}>
          <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3b3ed81d6719b7b18bcc3ac498fee44248d027fef236dab07161ff2b533c6d1a?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={{ width: 20, height: 20, marginLeft: 20,  marginRight: 60  }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.subHeading}>Manage your coaching hub and participants</Text>
    <View style={{ flexDirection: "row",  alignItems: "flex-start", paddingHorizontal: 10, marginTop: 10, marginBottom: 20 }}>
    <TouchableOpacity onPress={goToAllHubs} >
    <Text style={{ fontSize: 14, fontWeight: "600", color: "#666", marginTop: 5  }}>All Hubs</Text>
    </TouchableOpacity>
      <View style={{ justifyContent: "flex-end", marginLeft: 30, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, backgroundColor: "#d3f9d8", borderWidth: 1, borderColor: '#206C00' }}>
              <Text style={{ fontSize: 14, color: "#206C00", alignText: 'center', fontWeight: "600", }}>SAP FI</Text>
            </View>
        <Text style={{ fontSize: 14, marginLeft: 30,  fontWeight: "600", color: "#666", marginTop: 5  }}>Dev Ops</Text>
        <Text style={{ fontSize: 14, marginLeft: 30,  fontWeight: "600", color: "#666", marginTop: 5  }}>Frontend Dev.</Text>
      </View>
      
      {/* Table */}
      <View style={styles.tableContainer}>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.headertext} />
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={[styles.row, index % 2 && { backgroundColor: '#F8F8F8' }]}
            textStyle={styles.text}
          />
        ))}
      </Table>
      </View>
      <TouchableOpacity onPress={() => console.log('Delete Hub pressed')} style={styles.deleteHubButton}>
              <Text style={styles.deleteHubButtonText}>Delete Hub</Text>
            </TouchableOpacity>
            <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to remove this participant?</Text>
              <TouchableOpacity
                style={[styles.modalButton, styles.removeButton]}
                onPress={() => removeTrainee(selectedTraineeId)}
              >
                <Text style={styles.modalButtonText}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText2}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View>
    </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white',
    marginLeft: 280,
  },
  tableContainer: {
    backgroundColor: 'white',
    marginRight: 50
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
  subHeading: {
    fontSize: 14,
    marginBottom: 25,
    color: '#206C00',
  },
 head: {
    height: 40,
    backgroundColor: '#d3f9d8',
  },
  text: {
    margin: 6,
    textAlign: 'center',
  },
  headertext: {
    margin: 6,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
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
    fontWeight: 'bold'
  },
  offlineText: {
    color: 'grey',
  },
  deleteHubButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 50
  },
  deleteHubButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red'
  },
  modalButtonText2: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'green'
  },
});


export default ExpoDevPage;