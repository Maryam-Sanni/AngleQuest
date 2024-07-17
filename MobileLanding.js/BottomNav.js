import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Linking, Image } from 'react-native';

const BottomTab = ({ navigation, onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productTextVisible, setProductTextVisible] = useState(false);
  const [solutionsTextVisible, setSolutionsTextVisible] = useState(false);
  const [moreTextVisible, setMoreTextVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setProductTextVisible(false); 
    setSolutionsTextVisible(false);
    setMoreTextVisible(false);
  };

  const toggleProductText = () => {
    setProductTextVisible(!productTextVisible);
  };

  const toggleSolutionsText = () => {
    setSolutionsTextVisible(!solutionsTextVisible);
  };

  const toggleMoreText = () => {
    setMoreTextVisible(!moreTextVisible);
  };

  const handleXPress = () => {
    Linking.openURL('https://mobile.anglequest.com');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.menuIcon}>☰</Text>
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
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={toggleProductText}>
              <Text style={styles.modalText}>Product</Text>
              <Image
                  source={require('../assets/arrow-down.png')}
                  style={styles.adown}
                />
            </TouchableOpacity>
            {productTextVisible && (
              <View style={styles.productTextContainer}>
                <Text style={styles.productText}>AngleQuest AI</Text>
                <Text style={styles.productText}>AngleQuest CDP</Text>
                <Text style={styles.productText}>AngleQuest Team Impact</Text>
              </View>
            )}
            
            <TouchableOpacity style={styles.modalButton} onPress={toggleSolutionsText}>
              <Text style={styles.modalText}>Solutions</Text>
              <Image
                  source={require('../assets/arrow-down.png')}
                  style={styles.adown}
                />
            </TouchableOpacity>
            {solutionsTextVisible && (
              <View style={styles.productTextContainer}>
                <Text style={styles.productText}>New Hire Support</Text>
                <Text style={styles.productText}>Boost Under-Performer</Text>
                <Text style={styles.productText}>Rapid Upskilling</Text>
                <Text style={styles.productText}>Growth Culture</Text>
                <Text style={styles.productText}>Junior to Senior Boost</Text>
                <Text style={styles.productText}>Senior to Architect Boost</Text>
              </View>
            )}
            
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalText}>AngleQuest AI</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalButton} onPress={toggleMoreText}>
              <Text style={styles.modalText}>More</Text>
              <Image
                  source={require('../assets/arrow-down.png')}
                  style={styles.adown}
                />
            </TouchableOpacity>
            {moreTextVisible && (
              <View style={styles.productTextContainer}>
                <Text style={styles.productText}>About AngleQuest</Text>
                <Text style={styles.productText}>Reviews</Text>
                <Text style={styles.productText}>Contact Us</Text>
              </View>
            )}
            <View style={{borderBottomColor: '#CCC', borderBottomWidth: 1, marginTop: 5, marginBottom: 10}}/>
            <TouchableOpacity style={styles.modalButton} onPress={handleXPress}>
              <Text style={styles.signInText}>Sign In</Text>
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
    backgroundColor: '#FFF',
    height: 50,
    alignItems: 'center',
    padding: 10
  },
  button: {
    padding: 10,
    marginRight: 350
  },
  menuIcon: {
    fontSize: 24,
    fontWeight: 'bold'
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
    position: 'absolute',
    bottom: 50,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalButton: {
    padding: 10,
    flexDirection: 'row'
  },
   modalButton2: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    alignSelf: 'flex-end', // Align close button to the end
    padding: 10,
    marginBottom: 10,
    marginRight: 12
  },
  modalText: {
    fontSize: 16,
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
  productTextContainer: {
    marginLeft: 10,
  },
  productText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10
  },
  signInText: {
    color: 'coral',
    fontWeight: 'bold',
    fontSize: 16
  },
  adown: {
    width: 12,
    height: 12,
   position: 'absolute',
   right: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
});

export default BottomTab;
