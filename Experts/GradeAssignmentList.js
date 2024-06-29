import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Picker, Modal } from 'react-native';
import OpenModal from './Assignment';
import OpenModal2 from './GradeAssignment';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisible2, setModalVisible2] = useState(false);

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleOpenPress2 = () => {
    setMainModalVisible(false);
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
    onClose();
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
              <Text style={styles.headerText}>Grade Assignment</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

           
            <View style={styles.container}>
            <View style={{ flexDirection: "row", marginBottom: 20}}>
            <TouchableOpacity>
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "coral", backgroundColor: '#f7fff4', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "coral", alignText: 'center', fontWeight: 'bold' }}>Grade Assignment</Text>
                  </View>
     </TouchableOpacity>
     <TouchableOpacity  onPress={handleOpenPress} >
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "#f7fff4", backgroundColor: 'coral', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 20, borderWidth: 1 }}>
                    <Text style={{ fontSize: 13, color: "#f7fff4", alignText: 'center', fontWeight: 'bold' }}>New Assignment</Text>
                  </View>
     </TouchableOpacity>
     </View>

             
      <View style={styles.table}>
      <View style={styles.row}>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Hub Member(s)</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Topic</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Description</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Given Date</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>Due Date</Text>
          </View>
          <TouchableOpacity style={styles.cell}>
            <Text style={styles.cellText}> </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>8</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>Assignment 001</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Assignment 001 description will be written here</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>2024-06-25 11:00AM (GMT+1:0)</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>2024-07-25 11:00AM (GMT+1:0)</Text>
          </View>
          <TouchableOpacity  onPress={handleOpenPress2} style={styles.cell2} >
          <Text style={styles.open}>Grade</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>20</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>Assignment 002</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Assignment 002 description will be written here</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>2024-06-25 11:00AM (GMT+1:0)</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>2024-07-25 11:00AM (GMT+1:0)</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress2}style={styles.cell} >
          <Text style={styles.open}>Grade</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>4</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>Assignment 003</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Assignment 003 description will be written here</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>2024-06-25 11:00AM (GMT+1:0)</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>2024-07-25 11:00AM (GMT+1:0)</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress2} style={styles.cell2} >
          <Text style={styles.open}>Grade</Text>
          </TouchableOpacity>
        </View>
</View>

</View>
               
                </ScrollView>
              </View>
            
              </View>
             
             
              
      </Modal>
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
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
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
    color: "coral",
     fontSize: 14,
      borderColor: "coral", 
      backgroundColor: '#f7fff4',
      borderWidth: 2, 
      padding: 5, 
      paddingHorizontal: 15, 
      borderRadius: 5
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
    marginBottom: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
  },
  image: {
    width: 400,
    height: 400,
    marginRight: 30,
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
});

export default MyComponent;