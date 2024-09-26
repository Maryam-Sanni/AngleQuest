import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import OpenModal from '../components/Tour0b';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const videoRef = useRef(null);

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose(); // Notify parent component to close this modal
  };

  const handleCloseMainModal = () => {
    setMainModalVisible(false);
    onClose(); // Notify parent component to close this modal
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
               <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 30 }}>Hello There, Welcome to AngleQuest</Text>
              <Image
                source={require('../assets/TG5.png')}
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

            <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus}>
              <Text style={styles.buttonTextplus}>Start Tour</Text>
            </TouchableOpacity>
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
    width: '75%',
    height: 700,
    backgroundColor: 'white',
    justifyContent: 'center',
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    width: 300,
    marginTop: 100
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
