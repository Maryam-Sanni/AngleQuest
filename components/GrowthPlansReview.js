import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../Experts/Opengrowthreview';

const ScheduledMeetingsTable = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

  

  return (
    <View style={{marginLeft: 50 }}>
      <Text style={styles.title}>Growth Plan to Review</Text>
      <View style={styles.tableheader}>
        <Text style={[styles.tableheaderText, { marginLeft: 25 }]}>Name</Text>
        <Text style={[styles.tableheaderText, { marginLeft: 120 }]}>Role</Text>
        <Text style={[styles.tableheaderText, { marginLeft: 100 }]}>Account Type</Text>
        <Text style={[styles.tableheaderText, { marginLeft: 80 }]}>Date</Text>
        <Text style={[styles.tableheaderText, { flex: 0.5 }]}>    </Text>
      </View>
      {/* Body */}
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Maryam Bakahli</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>SAP Finance Junior</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Individual Account</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>31/Mar, 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell} onPress={handleOpenPress}>
            <Text style={styles.cellText}>Open</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Patrick Oche</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Power Platform Dev</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Corporate Account</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>29/Mar, 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell} onPress={handleOpenPress}>
            <Text style={styles.cellText}>Open</Text>
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
            <OpenModal onClose={() => handleCloseModal()} />
          </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10
  },
  staricon: {
    width: 20,
    height: 20,
    marginTop: -600,
    marginLeft: -410
  },
  title: {
    marginTop: 70,
    color: "black",
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 200,
    marginTop: -5,
    alignContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'coral',
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
  tableheader: {
    marginRight: 200,
    marginTop: 10, 
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'coral',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tableheaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ScheduledMeetingsTable;
