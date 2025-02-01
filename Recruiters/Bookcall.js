import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function BookingModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [bestTime, setBestTime] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [token, setToken] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const handleSubmit = async () => {
    if (!token) {
      Alert.alert('Error', 'Authentication token is missing. Please log in again.');
      return;
    }

    const bookingData = {
      email: email || 'Not provided',
      contact: phone || 'Not provided',
      location: location || 'Not specified',
      users: capacity || 'Not specified',
      start_date: startDate || 'Not specified',
      time_of_calling: bestTime || 'Anytime',
      note: additionalInfo || 'No additional info',
    };

    try {
      const response = await fetch(`${apiUrl}/api/jobseeker/book-a-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
       alert('Your request has been sent!', 'Success');
        onClose();
      } else {
     alert('Failed to send request. Please try again.', 'Error');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      Alert.alert('Error', 'Failed to send booking request. Please try again.');
    }
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>✕</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Book a Call</Text>

      <TextInput style={styles.input} placeholder="Email Address" value={email} placeholderTextColor= "grey" onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Phone Number" value={phone} placeholderTextColor= "grey" onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Where are you calling from?" value={location} placeholderTextColor= "grey" onChangeText={setLocation} />
      <TextInput style={styles.input} placeholder="Number of Users" value={capacity} placeholderTextColor= "grey" onChangeText={setCapacity} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="When do you intend to start?" value={startDate} placeholderTextColor= "grey"  onChangeText={setStartDate} />
      <TextInput style={styles.input} placeholder="When is the best time to call you?" value={bestTime} placeholderTextColor= "grey" onChangeText={setBestTime} />
      <TextInput style={[styles.input, { height: 100 }]} placeholder="Additional Information" placeholderTextColor= "grey" value={additionalInfo} onChangeText={setAdditionalInfo} multiline />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: 600,
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#F8F8F8',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default BookingModal;
