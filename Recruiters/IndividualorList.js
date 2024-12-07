import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import OpenModal from './New Employee';

function BulkUploadModal({ onClose }) {
  const [isBulkUpload, setIsBulkUpload] = useState(null);
  const [ModalVisible, setModalVisible] = useState(false);

  const handleBulkUploadChoice = (choice) => {
    setIsBulkUpload(choice);
  };

  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setProfileImage(imageUrl);
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  const renderOptions = () => {
    if (isBulkUpload === true) {
      return (
        <View style={styles.optionsContainer}>
          <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 30}}>
            <View style={{flexDirection: 'column'}}>
            <View style={styles.input}>
              <input
              type="file"
              accept="image/*"
              onChange={handleChooseImage}
            />
            </View>
              <Text style={{fontSize: 14, color: 'grey', marginTop: 5, textAlign: 'center', width: '80%',}}>Upload employees List from excel</Text>
            </View>

              <View style={{flexDirection: 'column', marginLeft: 30}}>
            <TouchableOpacity style={styles.buttonind}>
              <Text style={styles.buttontextind}>View Template</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 14, color: 'grey',  marginTop: 5, textAlign: 'center'}}>View Template for bulk upload</Text>
              </View>
          </View>
        </View>
      );
    } else if (isBulkUpload === false) {
      return (
        <View style={{flexDirection: 'column', marginTop: 30}}>
          <TouchableOpacity onPress={handleOpenPress} style={styles.buttonind}>
            <Text style={styles.buttontextind}>New Employee</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 14, color: 'grey',  marginTop: 5, textAlign: 'center'}}>Create employees individually</Text>
            </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>
          ✕
        </Text>
      </TouchableOpacity>
      <Text style={styles.questionText}>Create your members individually or simply upload an excel document to add all members at once.</Text>
      <Text style={{fontSize: 16}}>Do you want to bulk upload employees?</Text>
      <View style={styles.checkboxContainer}>
         <View style={{flexDirection: 'row'}}>
        <Checkbox
          status={isBulkUpload === true ? 'checked' : 'unchecked'}
          onPress={() => handleBulkUploadChoice(true)}
          color="#4CAF50"
        />
        <Text style={styles.checkboxLabel}>Yes</Text>
         </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
        <Checkbox
          status={isBulkUpload === false ? 'checked' : 'unchecked'}
          onPress={() => handleBulkUploadChoice(false)}
          color="#4CAF50"
        />
        <Text style={styles.checkboxLabel}>No</Text>
        </View>
      </View>
      {renderOptions()}
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
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: 600,
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20
  },
  checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#206C00',
    marginTop: 10
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#206C00',
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#206C00',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  uploadInfo: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: 200,
    borderRadius: 5,
    marginTop: 30,
    elevation: 5,
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    borderRadius: 5,
    padding: 10,
  },
  buttonind: {
    backgroundColor: "white",
    borderColor: "#206C00",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginLeft: 10,
    height: 45,
    borderRadius: 5,
  },
  buttontextind: {
  color: 'black',
    textAlign: 'center'
  },
});

export default BulkUploadModal;
