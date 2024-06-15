import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Picker, Modal } from 'react-native';
import OpenModal from './New Employee';
import OpenModal2 from './New Manager';
import OpenModal3 from './New Coach';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisible2, setModalVisible2] = useState(false);
  const [ModalVisible3, setModalVisible3] = useState(false);

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

  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setProfileImage(imageUrl);
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
              <Text style={styles.headerText}>Add members</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 5,}}>
                  Onboard your members
                </Text>
                <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 15, width: 400, fontWeight: '500', }}>
               Create your members individually or simply upload an excel document to add all members at once.
                </Text>
                <Image
                  source={require('../assets/EmployeeName.png')}
                  style={styles.image}
                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
                  Upload employees List
                </Text> 
                <View style={{ flexDirection: 'row' }}>
                <View style={styles.input}>
                <input
                type="file"
                accept="image/*"
                onChange={handleChooseImage}
              />
              </View>
              <TouchableOpacity>
    <View style={{ marginLeft: 10, marginTop: 5, height: 45, borderRadius: 5, backgroundColor: 'white', borderWidth: 1, borderColor: '#206C00', width: 130, justifyContent: 'center', alignContent:  'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 13, color: 'black', alignText: 'center', fontWeight: '500' }}>Download Format</Text>
                  </View>
     </TouchableOpacity>
              
              </View>
 <TouchableOpacity onPress={handleOpenPress} style={styles.buttonind}>
                  <Text style={styles.buttonTextplus}>Create Employees Individually</Text>
                </TouchableOpacity>
                
                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
                  Upload Managers List
                </Text> 
                <View style={{ flexDirection: 'row' }}>
                <View style={styles.input}>
                <input
                type="file"
                accept="image/*"
                onChange={handleChooseImage}
              />
              </View>
              <TouchableOpacity>
    <View style={{ marginLeft: 10, marginTop: 5, height: 45, borderRadius: 5, backgroundColor: 'white', borderWidth: 1, borderColor: '#206C00', width: 130, justifyContent: 'center', alignContent:  'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 13, color: 'black', alignText: 'center', fontWeight: '500' }}>Download Format</Text>
                  </View>
     </TouchableOpacity>
              </View>
 <TouchableOpacity onPress={handleOpenPress2} style={styles.buttonind}>
                  <Text style={styles.buttonTextplus}>Create Managers Individually</Text>
                </TouchableOpacity>

                <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
                  Upload Coaches List
                </Text> 
                <View style={{ flexDirection: 'row' }}>
                <View style={styles.input}>
                <input
                type="file"
                accept="image/*"
                onChange={handleChooseImage}
              />
              </View>
              <TouchableOpacity>
    <View style={{ marginLeft: 10, marginTop: 5, height: 45, borderRadius: 5, backgroundColor: 'white', borderWidth: 1, borderColor: '#206C00', width: 130, justifyContent: 'center', alignContent:  'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 13, color: 'black', alignText: 'center', fontWeight: '500' }}>Download Format</Text>
                  </View>
     </TouchableOpacity>
              </View>
 <TouchableOpacity onPress={handleOpenPress3} style={styles.buttonind}>
                  <Text style={styles.buttonTextplus}>Create Coaches Individually</Text>
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
    marginTop: 30,
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
    marginTop: 15,
    width: 450,
    marginLeft: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  input: {
    height: 45,
    width: 310,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
    marginTop: 5
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
