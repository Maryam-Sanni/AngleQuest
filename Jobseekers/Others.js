import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../Jobseekers/PickanExpert';


function MyComponent({ onClose }) {
  const navigation = useNavigation();
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [formModalVisible, setformModalVisible] = useState(false);
  
  const handleOpenPress = () => {
    setMainModalVisible(false);
    setformModalVisible(true);
  };

  const handleCloseformModal = () => {
    setformModalVisible(false);
    onClose();
  };


  const goToPlans = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('Home');
    onClose(); // Close the modal
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40}}>
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>Get Started</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 

        <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 10 }}>
                                            Subject
                                        </Text>
                                        <TextInput
          style={styles.input}
          placeholder=" "
          />

      
     
<Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 30, marginBottom: 10 }}>
                                            Detailed Description
                                        </Text>
                                        <TextInput
          style={[styles.input, { height: 150 }]}
          multiline
          placeholder=" "
          />

    
    <TouchableOpacity onPress={goToPlans} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>Send</Text>
    </TouchableOpacity>
    </View>
    
    <Modal
        animationType="slide"
        transparent={true}
        visible={formModalVisible}
        onRequestClose={handleCloseformModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseformModal} />
        </View>
      </Modal>
</ScrollView>
</View>

);
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#CCC',
        marginRight: 70, 
        marginTop: 20, 
        marginLeft: 50 
      },
  greenBox: {
    width: 920,
    height: '80%',
    backgroundColor: '#F8F8F8',
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1, 
    color:'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    position: 'absolute',
    bottom: -30,
    right: 130,
    width: 100,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
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
  }
});

export default MyComponent;