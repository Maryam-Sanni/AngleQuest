import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import OpenModal from '../Jobseekers/PaymentDetails';

function MyComponent({ onClose }) {
  const [modalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
        setModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };
  return (
    <View style={{  flex: 1, backgroundColor: "white", marginTop: 40, alignItems: 'center' }}>
        <View style={styles.greenBox}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>Payment</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
      <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold', marginBottom: 40, marginLeft: 65 }}>Hello Patrick, Review your cart </Text>
       <Text style={{fontSize: 14, color: '#206C00', marginLeft: 65 }}>$15 for Interview  </Text>
    <View style={styles.box}>
 <Text style={{fontSize: 14, color: '#206C00', marginLeft: 10 }}>1 hour interview session with Joop Melcher for the position of "Power Platform Developer" </Text>
 </View>
 <Text style={{fontSize: 14, color: '#206C00', marginLeft: 65, marginTop: 25 }}>Total: $15</Text>

 <View style={{ flexDirection: 'row' }}>
<TouchableOpacity onPress={onClose} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>Back</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleOpenPress}  style={styles.buttonskip} >
      <Text style={styles.buttonTextskip}>Pay</Text>
    </TouchableOpacity>
</View>
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
            <OpenModal onClose={() => handleCloseModal()} />
          </View>
      </Modal>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
greenBox: {
    width: 1000,
    height: 700,
    backgroundColor: '#F8F8F8',
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
  box: {
    marginTop: 10,
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: '#63EC55',
    marginLeft: 50,
    marginRight: 50,
    padding: 5,
  },
  buttonplus: {
        backgroundColor: 'white',
         borderWidth: 1,
        borderColor: 'coral',
        padding: 5,
        marginTop: 300,
        marginLeft: 730, 
        width: 100,
        paddingHorizontal: 20,
        marginBottom: 30
      },
      buttonskip: {
        backgroundColor: 'coral',
         marginTop: 300,
        borderWidth: 1,
        borderColor: 'coral',
        padding: 5,
        marginLeft: 20, 
        width: 100,
        paddingHorizontal: 20,
        marginBottom: 30
      },
      buttonTextplus: {
        color: 'coral',
        fontSize: 14,
        textAlign: 'center',
      },
      buttonTextskip: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
      },
});

export default MyComponent;
