import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import OpenSchedule from '../Jobseekers/Replan';
import OpenSchedule2 from '../Jobseekers/OpenGrowth';
import { BlurView } from 'expo-blur';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
      
      
      <View style={styles.table}>
      <View style={styles.row}>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Type</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Title</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Role</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Start Date</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>End Date</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Status</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}> </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Team Development</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>Become SAP FI Mentor to another team member</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>SAP FI Medior</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>7/Mar/2024</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>7/Nov/2024</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Active</Text>
          </View>
          <TouchableOpacity style={styles.cell2} onPress={handleOpenPress2}>
          <Text style={styles.open}>Open</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Personal Development</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>Become SAP FI Mentor to another team member</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP FI Medior</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>6/Dec/2024</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>6/May/2025</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Completed</Text>
          </View>
          <TouchableOpacity style={styles.cell} onPress={handleOpenPress2}>
          <Text style={styles.open}>Open</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Organization Development</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>Integrate into the company</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>SAP FI Medior</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>6/Dec/2024</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>6/May/2025</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Completed</Text>
          </View>
          <TouchableOpacity style={styles.cell2} onPress={handleOpenPress2}>
          <Text style={styles.open}>Open</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Organization Development</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>Integrate into the company</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP FI Medior</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>6/Dec/2024</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>6/May/2025</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Replan</Text>
          </View>
          <TouchableOpacity style={styles.cell} onPress={handleOpenPress}> 
          <Text style={styles.replan}>Replan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
          <OpenSchedule onClose={() => handleCloseModal()} />
          </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
          <View style={styles.modalContent}>
          <OpenSchedule2 onClose={() => handleCloseModal2()} />
          </View>
      </Modal>
      </BlurView>
    </View>
  );
}

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
    marginRight: 200,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
 open: {
    color: "black",
     fontSize: 14,
      borderColor: "#63EC55", 
      borderWidth: 2, 
      padding: 5, 
      paddingHorizontal: 15, 
      borderRadius: 5
},
replan: {
    color: "coral",
     fontSize: 14,
      borderColor: "coral", 
      borderWidth: 2, 
      padding: 5, 
      paddingHorizontal: 15, 
      borderRadius: 5
},
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
   backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
   backgroundColor: 'none',
    padding: 10, 
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
  },
  
  greenBox: {
    flex: 2,
   width: "90%",
    height: 550,
    marginLeft: 50, 
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 30, 
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
  },
});

export default ScheduledMeetingsTable;
