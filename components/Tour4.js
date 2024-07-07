import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import OpenModal from '../components/Tour1';

const CustomModal = ({ visible, onClose }) => {
  const [mainModalVisible, setMainModalVisible] = useState(visible);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleOpenPress();
    }, 5000); // 5 seconds delay
  
    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);  

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={mainModalVisible}
        onRequestClose={onClose}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start', marginLeft: 210, position: "fixed", top: 360 }}>
          <View style={{ backgroundColor: '#f7fff4', padding: 20 }}>
          <View style={{flexDirection: "row" } }>
          <View style={{width: 15, height: 15, borderRadius: 10, backgroundColor: '#63EC55', marginRight: 10, marginTop: 5 } }/>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, }}>Create and Manage Hubs</Text>
            </View>
            <Text style={{ marginBottom: 20 }}>Facilitate coaching sessions, track progress and engage with participants.</Text>
            <TouchableOpacity onPress={() => onClose(false)} style={{ marginBottom: 10, padding: 8, backgroundColor: 'none', borderRadius: 5, borderColor: 'coral', borderWidth: 1, width: 100  }}>
              <Text style={{ color: 'coral', textAlign: 'center' }}>Close Tour</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default CustomModal;
