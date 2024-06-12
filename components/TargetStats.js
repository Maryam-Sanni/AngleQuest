import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import OpenSchedule from '../Coach/Target Rating';
import { BlurView } from 'expo-blur';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const ProgressBar = ({ percentage }) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        <Text style={styles.progressText}>{percentage}%</Text>
      </View>
    );
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>Target Performance</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Name</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Performance</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Deadline</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Rating</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>Review Date</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}> </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
            <Text style={styles.cellText}>Jacob Ncube</Text>
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={67} />
            </View>
            <View style={styles.cell2}>
            <Text style={styles.cellText}>12/Oct/2024</Text>
            </View>
            <TouchableOpacity onPress={handleOpenPress} style={styles.cell2}>
          <Text style={styles.add}>Rate</Text>
          </TouchableOpacity>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>23/Oct/2024</Text>
            <Text style={styles.cellText}>2:00 PM</Text>
            </View>
          <TouchableOpacity style={styles.cell2}>
          <Text style={styles.open}>Start Meeting</Text>
          </TouchableOpacity>
            </View>
            <View style={styles.row}>
            <View style={styles.cell}>
            <Text style={styles.cellText}>Sander Josef</Text>
            </View>
            <View style={styles.cell}>
              <ProgressBar percentage={40} />
            </View>
            <View style={styles.cell}>
            <Text style={styles.cellText}>12/Oct/2024</Text>
            </View>
            <TouchableOpacity onPress={handleOpenPress} style={styles.cell}>
          <Text style={styles.add}>Rate</Text>
          </TouchableOpacity>
          <View style={styles.cell}>
            <Text style={styles.cellText}>23/Oct/2024</Text>
            <Text style={styles.cellText}>2:00 PM</Text>
            </View>
          <TouchableOpacity style={styles.cell}>
          <Text style={styles.open}>Start Meeting</Text>
          </TouchableOpacity>
            </View>
            <View style={styles.row}>
            <View style={styles.cell2}>
            <Text style={styles.cellText}>Joe Jason</Text>
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={95} />
            </View>
            <View style={styles.cell2}>
            <Text style={styles.cellText}>12/Oct/2024</Text>
            </View>
            <TouchableOpacity onPress={handleOpenPress} style={styles.cell2}>
          <Text style={styles.add}>Rate</Text>
          </TouchableOpacity>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>23/Oct/2024</Text>
            <Text style={styles.cellText}>2:00 PM</Text>
            </View>
          <TouchableOpacity style={styles.cell2}>
          <Text style={styles.open}>Start Meeting</Text>
          </TouchableOpacity>
            </View>
            <View style={styles.row}>
            <View style={styles.cell}>
            <Text style={styles.cellText}>Hussein Aliyu</Text>
            </View>
            <View style={styles.cell}>
              <ProgressBar percentage={81} />
            </View>
            <View style={styles.cell}>
            <Text style={styles.cellText}>12/Oct/2024</Text>
            </View>
            <TouchableOpacity onPress={handleOpenPress} style={styles.cell}>
          <Text style={styles.add}>Rate</Text>
          </TouchableOpacity>
          <View style={styles.cell}>
            <Text style={styles.cellText}>23/Oct/2024</Text>
            <Text style={styles.cellText}>2:00 PM</Text>
            </View>
          <TouchableOpacity style={styles.cell}>
          <Text style={styles.open}>Start Meeting</Text>
          </TouchableOpacity>
            </View>
          

        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenSchedule onClose={handleCloseModal} />
          </View>
        </Modal>
       
        </View>
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
    fontSize: 16,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 50,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50,
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
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#63EC55',
  },
  progressText: {
    position: 'absolute',
    right: 10,
    color: '#000',
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
add: {
  color: "black",
   fontSize: 14,
    borderColor: "#206C00", 
    borderWidth: 2, 
    padding: 5, 
    paddingHorizontal: 15, 
    borderRadius: 5
},
});

export default ScheduledMeetingsTable;
