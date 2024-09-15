import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import OpenModal from '../components/Tour2b';

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

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={mainModalVisible}
        onRequestClose={onClose}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View style={{ width: 150, height: 30, backgroundColor: '#f7fff4', borderRadius: 10, borderWidth: 2, marginLeft: 25, position: "fixed", top: 235 } }>
        <Text style={{ textAlign: 'center', marginTop: 5 }}>Skill Analysis</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start', marginLeft: 220, position: "fixed", top: 220 }}>
          <View style={{ backgroundColor: '#f7fff4', padding: 20, borderRadius: 10 }}>
          <View style={{flexDirection: "row" } }>
          <View style={{width: 15, height: 15, borderRadius: 10, backgroundColor: '#63EC55', marginRight: 10, marginTop: 5 } }/>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Use AngleQuest AI for skill gap analysis</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}> ✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ marginBottom: 20 }}>Get results to shape your growth and schedule skill analysis session with experts.</Text>
            <TouchableOpacity onPress={handleOpenPress} style={{ marginBottom: 10, padding: 8, backgroundColor: 'coral', borderRadius: 5, width: 100  }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Next</Text>
            </TouchableOpacity>
          </View>
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
  closeButton: {
    position: 'absolute',
      right: 20
    },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
};

export default CustomModal;
