import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Picker, Modal } from 'react-native';
import OpenModal from './Growthplanprofile';
import OpenModal2 from './InterviewProfile';
import OpenModal3 from './AdviceProfile';
import OpenModal4 from '../components/Createhubform';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisible2, setModalVisible2] = useState(false);
  const [ModalVisible3, setModalVisible3] = useState(false);
  const [ModalVisible4, setModalVisible4] = useState(false);

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

  const handleOpenPress3 = () => {
    setMainModalVisible(false);
    setModalVisible3(true);
  };

  const handleCloseModal3 = () => {
    setModalVisible3(false);
    onClose();
  };

  const handleOpenPress4 = () => {
    setMainModalVisible(false);
    setModalVisible4(true);
  };

  const handleCloseModal4 = () => {
    setModalVisible4(false);
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
          <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
            <View style={styles.header}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>Create Profiles</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 5,}}>
                 To Get Started...
                </Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 15, width: 400, fontWeight: '500', }}>
              You will need to create your profiles to unlock all features
                </Text>
                <Image
                  source={require('../assets/createPfp.png')}
                  style={styles.image}
                />
              </View>
              <View style={{ flexDirection: 'column' }}>
              <View style={styles.input}>
                <Text style={{ fontWeight: '500', fontSize: 16, }}>
                  Growth Plan <Text style={{ fontWeight: '500', fontSize: 14, color: 'green', marginLeft: 5 }}>Done</Text>
                </Text> 
                </View>
 <TouchableOpacity onPress={handleOpenPress} style={styles.buttonind}>
                  <Text style={styles.buttonTextplus}>Create Growth Plan Profile</Text>
                </TouchableOpacity>
                
                <View style={styles.input}>
                <Text style={{ fontWeight: '500', fontSize: 16, }}>
                  Interview <Text style={{ fontWeight: '500', fontSize: 14, color: 'darkred', marginLeft: 5 }}>Pending</Text>
                </Text> 
                </View>
 <TouchableOpacity onPress={handleOpenPress2} style={styles.buttonind}>
                  <Text style={styles.buttonTextplus}>Create Interview Profile</Text>
                </TouchableOpacity>

                <View style={styles.input}>
                <Text style={{ fontWeight: '500', fontSize: 16, }}>
                  Advice <Text style={{ fontWeight: '500', fontSize: 14, color: 'darkred', marginLeft: 5 }}>Pending</Text>
                </Text> 
                </View>
                
 <TouchableOpacity onPress={handleOpenPress3} style={styles.buttonind}>
                  <Text style={styles.buttonTextplus}>Create Advice Profile</Text>
                </TouchableOpacity>

                <View style={styles.input}>
                <Text style={{ fontWeight: '500', fontSize: 16, }}>
                  Hubs <Text style={{ fontWeight: '500', fontSize: 14, color: 'darkred', marginLeft: 5 }}>Pending</Text>
                </Text> 
                </View>
 <TouchableOpacity onPress={handleOpenPress4} style={styles.buttonind}>
                  <Text style={styles.buttonTextplus}>Create New Hub</Text>
                </TouchableOpacity>

               

                <TouchableOpacity onPress={onClose} style={styles.buttonplus}>
                  <Text style={styles.buttonTextplus}>Save & Continue Later</Text>
                </TouchableOpacity>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible4}
        onRequestClose={handleCloseModal4}
      >
        <View style={styles.modalContent}>
          <OpenModal4 onClose={handleCloseModal4} />
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
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 70,
    marginTop: 20,
    marginLeft: 50,
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
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 40,
    width: 450,
    marginLeft: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonind: {
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 10,
    width: 450,
    marginLeft: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  input: {
    height: 45,
    width: 450,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
    marginTop: 20
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
    marginBottom: 20,
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
});

export default MyComponent;
