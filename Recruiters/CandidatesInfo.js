import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Modal} from 'react-native';
import OpenModal from './BookQuestions';

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
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>Interview Booking</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 

        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginTop: 20, marginLeft: 50 }}>Candidate's Information</Text>
        <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Full Name</Text>
        </View>
        <View style={styles.cell}>
           <TextInput
            placeholder=" "
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Candidate's CV</Text>
        </View>
        <View style={styles.cell}>
        <input
                type="file"
                accept="image/*"
                onChange={handleChooseImage}
                style={{ marginTop: 5 }}
              />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Other Information</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder=" "
            placeholderTextColor="grey"
            multiline
            style={[styles.input, { height: 100 }]}
          />
        </View>
      </View>
      </View>
      
        

    
        <View style={styles.buttonContainer}>
                                            <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus}>
                                                <Text style={styles.buttonTextplus}>Next</Text>
                                            </TouchableOpacity>
                                            
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
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
      container: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#CCC',
        marginRight: 70, 
        marginTop: 10,
        marginLeft: 50 
      },
  greenBox: {
    width: 920,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1, 
    color:'grey',
    fontSize: 14
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    right: 70,
    marginBottom: 5,
    bottom: -30
},
  buttonplus: {
      backgroundColor: 'coral',
      borderRadius: 5,
      padding: 5,
      marginLeft: 100,
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
    outline: 'black',
    borderColor: 'black',
    borderWidth: 1
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