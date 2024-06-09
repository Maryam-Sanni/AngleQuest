import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Picker, Modal } from 'react-native';
import OpenModal from './TargetMeet';
import DateTimePickerModal from "../components/DateTimePickerModal";

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
            <View style={styles.header}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>Target Rating</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

           
            
            <Text style={{  fontSize: 16, marginLeft: 100,}}>
                  Obtain Certificate
                </Text>
                <View style={{ padding: 5, marginTop: 20, marginLeft: 100, marginRight: 100, borderWidth: 1, borderColor: 'black'}}>
                <Text style={{  fontSize: 16,}}>
                  To execute the assigned project to the desired expectation of the client and to earn a support renewal for at least 3 months. To obtain PL-200 certification.
                </Text>
                </View>
                
                <View style={styles.container}>
                <View style={{flexDirection: 'row', marginTop: 10,}}>
                <Text style={{marginLeft: 585, marginBottom: -5, fontWeight: '500'}}>
                  Set Score
                </Text> 
                <Text style={{marginLeft: 35, marginBottom: -5, fontWeight: '500'}}>
                  Rate
                </Text> 
                </View>
                <View style={{flexDirection: 'row', marginLeft: 50, marginTop: 10, marginBottom: 5}}>
              <Text style={styles.text}>
                  Criteria 01
                </Text> 
                <TextInput
                 style={styles.input}
              placeholder="Obtain Certificate"
             
            />
            <View style={styles.score}>
           <Text style={styles.scoretext}>
                 100
                </Text> 
                </View>

            <Picker
                  style={styles.picker}
                >
                     <Picker.Item label=" " value=" " />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="40" value="40" />
                  <Picker.Item label="50" value="50" />
                  <Picker.Item label="60" value="60" />
                  <Picker.Item label="70" value="70" />
                  <Picker.Item label="80" value="80" />
                  <Picker.Item label="90" value="90" />
                  <Picker.Item label="100" value="100" />
                </Picker>
</View>
<View style={{flexDirection: 'row', marginLeft: 50, marginTop: 20, marginBottom: 5}}>
              <Text style={styles.text}>
                  Criteria 02
                </Text> 
                <TextInput
              placeholder="Execute project on time"
              style={styles.input}
            />
              <View style={styles.score}>
           <Text style={styles.scoretext}>
                 100
                </Text> 
                </View>
            <Picker
                  style={styles.picker}
                >
                     <Picker.Item label=" " value=" " />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="40" value="40" />
                  <Picker.Item label="50" value="50" />
                  <Picker.Item label="60" value="60" />
                  <Picker.Item label="70" value="70" />
                  <Picker.Item label="80" value="80" />
                  <Picker.Item label="90" value="90" />
                  <Picker.Item label="100" value="100" />
                </Picker>
</View>

<View style={{flexDirection: 'row', marginLeft: 50, marginTop: 20, marginBottom: 5}}>
              <Text style={styles.text}>
                  Criteria 03
                </Text> 
                <TextInput
              placeholder="How satisfied was the client"
              style={styles.input}
            />
             <View style={styles.score}>
           <Text style={styles.scoretext}>
                 100
                </Text> 
                </View>
            <Picker
                  style={styles.picker}
                >
                     <Picker.Item label=" " value=" " />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="40" value="40" />
                  <Picker.Item label="50" value="50" />
                  <Picker.Item label="60" value="60" />
                  <Picker.Item label="70" value="70" />
                  <Picker.Item label="80" value="80" />
                  <Picker.Item label="90" value="90" />
                  <Picker.Item label="100" value="100" />
                </Picker>
</View>

<View style={{flexDirection: 'row', marginLeft: 50, marginTop: 20, marginBottom: 5}}>
              <Text style={styles.text}>
                  Criteria 04
                </Text> 
                <TextInput
              placeholder="Execute project within budget"
              style={styles.input}
            />
             <View style={styles.score}>
           <Text style={styles.scoretext}>
                 100
                </Text> 
                </View>
            <Picker
                  style={styles.picker}
                >
                     <Picker.Item label=" " value=" " />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="40" value="40" />
                  <Picker.Item label="50" value="50" />
                  <Picker.Item label="60" value="60" />
                  <Picker.Item label="70" value="70" />
                  <Picker.Item label="80" value="80" />
                  <Picker.Item label="90" value="90" />
                  <Picker.Item label="100" value="100" />
                </Picker>
</View>
<View style={{flexDirection: 'row', marginLeft: 50, marginTop: 20, marginBottom: 5}}>
              <Text style={styles.text}>
                  Criteria 05
                </Text> 
                <TextInput
              placeholder="Supoort contract earned"
              style={styles.input}
            />
             <View style={styles.score}>
           <Text style={styles.scoretext}>
                 100
                </Text> 
                </View>
            <Picker
                  style={styles.picker}
                >
                     <Picker.Item label=" " value=" " />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="40" value="40" />
                  <Picker.Item label="50" value="50" />
                  <Picker.Item label="60" value="60" />
                  <Picker.Item label="70" value="70" />
                  <Picker.Item label="80" value="80" />
                  <Picker.Item label="90" value="90" />
                  <Picker.Item label="100" value="100" />
                </Picker>
</View>
                </View>

                <TouchableOpacity onPress={onClose} style={styles.buttonplus}>
                  <Text style={styles.buttonTextplus}>Submit</Text>
                </TouchableOpacity>
              </View>
              </View>
           
      </Modal>
      <DateTimePickerModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDateTime}
        onCancel={handleCancelModal}
      />
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
    marginTop: 10,
    marginLeft: 100,
    borderColor: '#206C00',
    padding: 10,
    borderWidth: 2,
    marginRight: 100
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: '10%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    borderRadius: 5,
  },
  score: {
    height: 40,
    width: '10%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoretext: {
fontWeight: '500',
textAlign: 'center'
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
   bottom: 10,
    width: 100,
    position: 'absolute',
    right: 110,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '60%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    borderRadius: 5,
    padding: 10,
    marginRight: 10
  },
  text: {
    fontWeight: '500', 
    fontSize: 16,
   marginRight: 10,
   marginTop: 10
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