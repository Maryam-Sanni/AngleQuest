import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import OpenModal from './ListEmployee';
import OpenModal2 from './ViewEmployees';
import OpenModal3 from './EditCoach';

const ScheduledMeetingsTable = () => {
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisible2, setModalVisible2] = useState(false);
  const [ModalVisible3, setModalVisible3] = useState(false);
  
  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
    onClose();
  };

  const handleOpenPress3 = () => {
    setModalVisible3(true);
  };

  const handleCloseModal3 = () => {
    setModalVisible3(false);
    onClose();
  };

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
      
      <Text style={styles.title}>Assign Employees To Coaches</Text>
      <View style={styles.table}>
      <View style={styles.row}>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Name</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Email</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Team</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Assign Employee</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={{fontWeight: '600', fontSize: 14}}>View Employees</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity onPress={handleOpenPress3} >
            <Text style={{textDecoration: 'underline'}}>Kenyatta Ohbahi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>atta@gmail.com</Text>
          </View>
          <View style={styles.cell2}>
          <Text style={styles.cellText}>MORR</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell2}>
          <Text style={styles.add}> + Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress2} style={styles.cell2}>
          <Text style={styles.open}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <TouchableOpacity onPress={handleOpenPress3} >
            <Text style={{textDecoration: 'underline'}}>Onana Humbrey</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>hubrey2@yahoo.com</Text>
          </View>
          <View style={styles.cell}>
          <Text style={styles.cellText}>SAP</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell}>
          <Text style={styles.add}>+ Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress2} style={styles.cell}>
          <Text style={styles.open}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity onPress={handleOpenPress3} >
            <Text style={{textDecoration: 'underline'}}>Jefferson King</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>tony@gmail.com</Text>
          </View>
          <View style={styles.cell2}>
          <Text style={styles.cellText}>JPP</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress}  style={styles.cell2}>
          <Text style={styles.add}>+ Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress2} style={styles.cell2}>
          <Text style={styles.open}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <TouchableOpacity onPress={handleOpenPress3} >
            <Text style={{textDecoration: 'underline'}}>Chordelia Bassey</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>basswy@gmail.com</Text>
          </View>
          <View style={styles.cell}>
          <Text style={styles.cellText}>PRO</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell}>
          <Text style={styles.add}>+ Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress2} style={styles.cell}>
          <Text style={styles.open}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity onPress={handleOpenPress3} >
            <Text style={{textDecoration: 'underline'}}>Jacob Hughes</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>J764@gmail.com</Text>
          </View>
          <View style={styles.cell2}>
          <Text style={styles.cellText}>MORR</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell2}>
          <Text style={styles.add}>+ Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress2} style={styles.cell2}>
          <Text style={styles.open}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <TouchableOpacity onPress={handleOpenPress3} >
            <Text style={{textDecoration: 'underline'}}>Noah Robinson</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>noah99@yahoo.com</Text>
          </View>
          <View style={styles.cell}>
          <Text style={styles.cellText}>SAP</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell}>
          <Text style={styles.add}>+ Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress2} style={styles.cell}>
          <Text style={styles.open}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity onPress={handleOpenPress3} >
            <Text style={{textDecoration: 'underline'}}>Aliyah Rahman</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>lih@gmail.com</Text>
          </View>
          <View style={styles.cell2}>
          <Text style={styles.cellText}>CEPPA</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell2}>
          <Text style={styles.add}>+ Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress2} style={styles.cell2}>
          <Text style={styles.open}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <TouchableOpacity onPress={handleOpenPress3} >
            <Text style={{textDecoration: 'underline'}}>Amélie Martin</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>amiie@gmail.com</Text>
          </View>
          <View style={styles.cell}>
          <Text style={styles.cellText}>CEPPA</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell}>
          <Text style={styles.add}>+ Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress2} style={styles.cell}>
          <Text style={styles.open}>View All</Text>
          </TouchableOpacity>
        </View>



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
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible2}
        onRequestClose={handleCloseModal2}
      >
        <View style={styles.modalContent}>
          <OpenModal2 onClose={handleCloseModal2} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible3}
        onRequestClose={handleCloseModal3}
      >
        <View style={styles.modalContent}>
          <OpenModal3 onClose={handleCloseModal3} />
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
    color: "#63EC55",
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'flex-start',
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
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
  picker: {
    height: 30,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 2, 
    color:'black',
    borderRadius: 5,
    fontSize: 14
  },
  picker2: {
    height: 30,
    width: '100%',
    backgroundColor: 'rgba(225,225,212,0.05)',
    borderColor: 'grey',
    borderWidth: 2, 
    color:'black',
    borderRadius: 5,
    fontSize: 14
  },
  greenBox: {
    flex: 1,
   width: 750,
    height: 550, 
    marginTop: 30,
    backgroundColor: 'rgba(125,125,125,0.3)',
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
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
