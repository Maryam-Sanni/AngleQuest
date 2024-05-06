import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import OpenModal from '../Experts/Viewwonbids';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

  return (
   <View style={{marginLeft: 50 }}>
      <Text style={styles.title}>Won Bids</Text>
      {/* Body */}
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>ASML</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>July 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell} onPress={handleOpenPress}>
            <Text style={styles.cellText}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>TMC</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>August 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell} onPress={handleOpenPress}>
            <Text style={styles.cellText}>View</Text>
          </TouchableOpacity>
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
            <OpenModal onClose={() => handleCloseModal()} />
          </View>
      </Modal>
        </View>

      </View>
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
  staricon: {
    width: 20,
    height: 20,
    marginTop: -600,
    marginLeft: -410
  },
  title: {
    marginTop: 30,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 200,
    marginTop: 10,
    alignContent: 'center',
    marginBottom: 20,
    backgroundColor: '#F8F8F8',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    alignItems: 'center',
  },
  cellText: {
    textAlign: 'center',
  },
});

export default ScheduledMeetingsTable;
