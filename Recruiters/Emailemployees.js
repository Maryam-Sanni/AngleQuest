import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Image, TouchableOpacity, Alert, FlatList, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function BookingModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [emailError, setEmailError] = useState('');

  const handleEmailInputChange = (input) => {
    setEmail(input);
    setEmailError(''); // Clear the error message when the user types
    if (input.includes(',')) {
      handleAddEmail(); // Automatically add email when comma is typed
    }
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleAddEmail = () => {
    // Simple email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setEmails([...emails, email]);
      setEmail('');
      setEmailError(''); // Clear any previous error
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSubmit = async () => {
    const bookingData = {
      email: emails,
    };

    try {
      // Retrieve the token from AsyncStorage for authentication
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User is not authenticated. Please log in.');
        return;
      }

      // Send the booking request using axios
      const response = await axios.post(
        `${apiUrl}/api/business/invite-employees`, // Replace apiUrl with actual endpoint URL
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        alert('Success', 'Invitation Sent successfully!');
        onClose();
      } else {
        alert('Error', 'Failed to send invitation. Please try again.');
      }
    } catch (error) {
      console.error('Error sending booking request:', error);
      Alert.alert('Error', 'Failed to send booking request. Please try again.');
    }
  };


  const renderEmailItem = ({ item }) => {
    return (
      <View style={styles.emailItem}>
        <Text style={styles.emailText}>{item}</Text>
        <TouchableOpacity onPress={() => handleRemoveEmail(item)}>
          <Image
            source={{
              uri: 'https://img.icons8.com/?size=100&id=95771&format=png&color=E70B0B',
            }}
            style={{ width: 18, height: 18 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.heading}>Add Employees via Email</Text>

      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>✕</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          value={email}
          onChangeText={handleEmailInputChange}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddEmail}>
          <MaterialIcons name="add-circle" size={20} color="#206C00" />
          <Text style={styles.addButtonText}>Add Email</Text>
        </TouchableOpacity>
      </View>
      {/* Display error message if email is invalid */}
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <FlatList
        data={emails}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderEmailItem}
        numColumns={screenWidth > 570 ? 2 : 1} // Dynamically adjust columns
        contentContainerStyle={styles.emailListContainer}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Invite</Text>
        <MaterialIcons name="email" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: 600,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: 370,
    height: 40,
    backgroundColor: '#F8F8F8',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  addButton: {
    width: 170,
    height: 40,
    fontSize: 15,
    backgroundColor: '#F8F8F8',
    borderColor: '#206C00',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    marginLeft: 20,
    flexDirection: 'row',
  },
  addButtonText: {
    color: '#206C00',
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '600',
  },
  emailListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emailItem: {
    backgroundColor: '#E8F8E0',
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  emailText: {
    color: '#333',
    fontSize: 14,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default BookingModal;
