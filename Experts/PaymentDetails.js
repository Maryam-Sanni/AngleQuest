import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';
import OpenModal from '../Experts/TourGuide';

const PaymentDetailsForm = ({ handleClose }) => {
  const [bankName, setBankName] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [country, setCountry] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleSubmit = async () => {
    if (!bankName || !accountNumber || !mobileNumber || !country) {
      setAlertMessage('Fill required fields');
      setAlertVisible(true);
      return;
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('No token found');
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/jobseeker/payment-details`,  // Update to the correct endpoint
        {
          bank_name: bankName,
          sort_code: sortCode || 'Not Applicable',
          acc_num: accountNumber,
          mobile_num: mobileNumber,
          country: country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setAlertMessage('Payment details saved successsfully');
      } else {
         setAlertMessage('Failed to save payment details');
      }
    } catch (error) {
      console.error('Error saving payment details:', error);
       setAlertMessage('An error occured');
    }
    setAlertVisible(true);
    setModalVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  return (
    <View style={styles.container}>
       <ScrollView contentContainerStyle={{maxHeight: 500}}>

         <Text style={styles.title}>Input Withdrawal Details</Text>
         <Text style={styles.description}>
           Withdrawal details are the necessary information required to process your withdrawals. 
           Ensure you provide accurate details to avoid delays or issues during the withdrawal process.
         </Text>

         
      <Text style={styles.label}>Bank Name</Text>
      <TextInput
        style={styles.input}
        value={bankName}
        onChangeText={setBankName}
        placeholder="Enter bank name"
        placeholderTextColor="grey"
      />

      <Text style={styles.label}>Sort/Swift Code (If applicable)</Text>
      <TextInput
        style={styles.input}
        value={sortCode}
        onChangeText={setSortCode}
        placeholder="Enter sort code"
        keyboardType="numeric"
        placeholderTextColor="grey"
      />

      <Text style={styles.label}>Account Number</Text>
      <TextInput
        style={styles.input}
        value={accountNumber}
        onChangeText={setAccountNumber}
        placeholder="XXXXXXXXXX"  // 10-digit placeholder for account number
        keyboardType="numeric"
        placeholderTextColor="grey"
      />

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder="+31 XXX-XXX-XXXX"  // Placeholder with country code
        keyboardType="phone-pad"
        placeholderTextColor="grey"
      />

      <Text style={styles.label}>Country</Text>
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
        placeholder="Netherlands"  // Default country placeholder
        placeholderTextColor="grey"
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <CustomAlert
        visible={alertVisible}
        title={'Notification'}
        message={alertMessage}
        onConfirm={hideAlert}
      />
       </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleClose} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginLeft: 150, marginRight: 150,
    marginTop: 30
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: 150
  },
  submitButtonText: {
    color: '#fff',
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    width: 800,
    alignSelf: 'center'
  },
});

export default PaymentDetailsForm;
