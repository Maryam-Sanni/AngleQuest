import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Linking } from 'react-native';

const BottomTab = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleXPress = () => {
    Linking.openURL('https://mobile.anglequest.com'); // Open the link
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>☰</Text> {/* This is a menu icon represented by a simple text character */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.joinButton} onPress={handleXPress}>
          <Text style={styles.joinButtonText}>See Progress</Text>
        </TouchableOpacity>
      
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text>Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text>Clientele</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text>Company</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text>More</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style= {{color: 'coral', fontWeight: 500 }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    height: 50,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    padding: 10,
    marginRight: 350
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  joinButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'coral',
   padding: 10,
   borderRadius: 5,
    position: 'absolute',
    right: 20
  },
  joinButtonText: {
    color: 'coral',
    fontWeight: 'bold',
  },
});

export default BottomTab;
