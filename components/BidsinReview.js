import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image} from 'react-native';
import OpenModal from '../Experts/ViewinReview';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

  return (
    <View style={styles.greenBox}>
    <Text style={styles.title}>Bids in Review</Text>
    
    <View style={styles.table}>
    <View style={styles.row}>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Name</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Number of Candidates</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Field</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{fontWeight: '600', fontSize: 14}}>Start Date</Text>
        </View>
        <View style={styles.cell}>
          <Text style={{color: "white", fontSize: 14}}> </Text>
        </View>
      </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/asml.png')} style={styles.userimage} />
            <Text style={styles.cellText}>ASML</Text>
          </View>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>3 Candidates</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>July 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell2} onPress={handleOpenPress}>
          <Text style={{color: "#206C00", fontSize: 14}}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/rvl.png')} style={styles.userimage} />
            <Text style={styles.cellText}>RVL</Text>
          </View>
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
          <Text style={{color: "#206C00", fontSize: 14}}>View</Text>
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
    marginBottom: 80,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  cell: {
    flex: 1,
   backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
   backgroundColor: '#F2F2F2',
    padding: 10, 
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
  },
  
  greenBox: {
    flex: 1,
   width: "90%",
    height:250,
    paddingBottom: 10,
    marginBottom: 20,
    marginLeft: 50, 
    backgroundColor: '#F2F2F2',
    marginTop: 50, 
  },
  userimage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
});

export default ScheduledMeetingsTable;
