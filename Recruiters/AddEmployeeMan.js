import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Modal} from 'react-native';
import OpenModal from './AddEmployeeCoach';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>Employee's Manager</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 

        <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', marginLeft: 20}}>
        <Text style={{ fontWeight: '500', fontSize: 16, marginTop: 10, marginBottom: 30 }}>
                                            Attach "Employee's Name" to Manager
                                        </Text>
        <Image
       source={require('../assets/EmployeeName.png')}
        style={styles.image}
      />
      <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 10, fontStyle: 'italic', width: 400 }}>
                                            The manager will be part of "Employee's Name" growth journey.
                                        </Text>
      </View>
      <View style={{flexDirection: 'column', marginTop: 100}}>
       

        <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
                                         Select Manager
                                        </Text>
<Picker
  style={styles.picker} 
>
<Picker.Item label=" " value=" " />
<Picker.Item label="Monica Jerry" value="Monica Jerry" />
          <Picker.Item label="Will Cooper" value="Will Cooper" />
          <Picker.Item label="John Othega" value="John Othega" />
          <Picker.Item label="Joop Melcher" value="Joop Melcher" />
        </Picker>

        

    
        <View style={styles.buttonContainer}>
                                            <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus}>
                                                <Text style={styles.buttonTextplus}>Next</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleOpenPress} style={styles.buttonskip}>
                                                <Text style={styles.buttonTextskip}>Skip</Text>
                                            </TouchableOpacity>
                                            </View>
    </View>
    </View>
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
    </>
);
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      },
    container: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#CCC',
        marginRight: 70, 
        marginTop: 20, 
        marginLeft: 50 
      },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: 450,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1, 
    color:'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    right: 30,
    marginBottom: 5,
    bottom: -30
},
  buttonplus: {
      backgroundColor: 'coral',
      borderRadius: 5,
      padding: 5,
      marginLeft: 360,
      width: 100,
      paddingHorizontal: 20,
      marginBottom: 30
  },
  buttonskip: {
      backgroundColor: 'white',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'coral',
      padding: 5,
      marginLeft: 20,
      width: 100,
      paddingHorizontal: 20,
      marginBottom: 30
  },
  buttonTextplus: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
  },
  buttonTextskip: {
      color: 'coral',
      fontSize: 14,
      textAlign: 'center',
  },
  input: {
    height: 40,
    width: 450,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1, 
    color:'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10
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
    marginBottom: 20
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637'
  },
  image: {
    width: 400,
    height: 400,
    marginRight: 30
  },
});

export default MyComponent;