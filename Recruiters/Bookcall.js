import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';

function BookingModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [bestTime, setBestTime] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = async () => {
    const bookingData = {
      email,
      phone,
      location,
      capacity,
      startDate,
      bestTime,
      additionalInfo,
    };

    try {
      // Simulate sending email using a placeholder API (use your real backend/email API here)
      const response = await fetch('https://example.com/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'ask@anglequest.com',
          subject: 'New Booking Inquiry',
          message: `
            Email: ${email}
            Phone: ${phone}
            Location: ${location}
            Capacity: ${capacity}
            Start Date: ${startDate}
            Best Time to Call: ${bestTime}
            Additional Info: ${additionalInfo}
          `,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Your booking request has been sent!');
        onClose();
      } else {
        Alert.alert('Error', 'Failed to send booking request. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      Alert.alert('Error', 'Failed to send booking request. Please try again.');
    }
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>✕</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Book a Call</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Where are you calling from?"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Users"
        value={capacity}
        onChangeText={setCapacity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="When do you intend to start?"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="When is the best time to call you"
        value={bestTime}
        onChangeText={setBestTime}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Additional Information"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
        multiline
      />

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
