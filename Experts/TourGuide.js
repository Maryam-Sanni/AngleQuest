import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import OpenModal from '../components/Tour0';

function MyComponent({ onClose, handleClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose(); // Notify parent component to close this modal
  };

  const handleCloseMainModal = () => {
    setMainModalVisible(false);
    onClose(); // Notify parent component to close this modal
    handleClose();
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={mainModalVisible}
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.greenBox}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleCloseMainModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}> ✕</Text>
              </TouchableOpacity>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 30 }}>Hello Expert, Welcome to AngleQuest</Text>
              <Image
                source={require('../assets/TG2.png')}
                style={{
                  width: 1000,
                  height: 300,
                  marginTop: 20,
                  borderRadius: 10,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </View>

            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TouchableOpacity onPress={handleCloseMainModal} style={styles.buttonplus2}>
              <Text style={styles.buttonTextplus}>Close</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus}>
              <Text style={styles.buttonTextplus}>Start Tour</Text>
            </TouchableOpacity>

            </View>
            
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40, 
    flex: 1,
  },
  greenBox: {
    width: '80%',
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  video: {
    marginTop: 20,
    width: 900,
    height: 420,
    resizeMode: 'contain'
  },
  buttonplus: {
    backgroundColor: 'coral',
    borderRadius: 5,
padding: 10,
    alignSelf: 'center',
    width: 200,
    marginTop: 20
  },
  buttonplus2: {
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    width: 200,
    marginTop: 20,
    marginRight: 10
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    position: 'absolute',
    right: 50
  },
  closeButtonText: {
    fontSize: 18,
    color: '#3F5637',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'none',
    marginTop: 10,
  },
});

export default MyComponent;
