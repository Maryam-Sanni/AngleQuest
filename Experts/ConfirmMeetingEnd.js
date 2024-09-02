import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomAlert = ({ visible, title, message, onConfirm, onClose }) => {
  const [parsedData, setParsedData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [rating, setRating] = useState('No rating yet');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedData = await AsyncStorage.getItem('selectedMeeting');
        const user_id = await AsyncStorage.getItem('user_id');
        const authToken = await AsyncStorage.getItem('token'); // Retrieve token

        if (retrievedData) {
          setParsedData(JSON.parse(retrievedData));
        } else {
          console.log('No data found in AsyncStorage.');
        }

        if (user_id) {
          setUserId(user_id);
        } else {
          console.log('User ID not found in AsyncStorage.');
        }

        if (authToken) {
          setToken(authToken); // Set the token in state
        } else {
          console.log('Token not found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Failed to retrieve data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);

  const handleConfirm = async () => {
    if (!parsedData || !userId || !token) {
      Alert.alert("Error", "Missing data, unable to create hub session.");
      return;
    }

    const postData = {
      Topic: parsedData.meeting_topic,
      Description: parsedData.meeting_description,
      meeting_date: parsedData.date,
      meeting_time: parsedData.time,
      jobseeker_id: userId,
      rating: rating
    };

    try {
      const response = await fetch('https://recruitangle.com/api/jobseeker/create-hub-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in Authorization header
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Hub session created successfully.");
        onClose(); 
      } else {
        // Handle errors
        const errorData = await response.json();
        console.error("Failed to create hub session:", errorData);
        Alert.alert("Error", "Failed to create hub session.");
      }
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert("Error", "Network error, please try again later.");
    }
    onClose(); 
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Mark as Completed</Text>
          <Text style={styles.modalMessage}>Are you sure you want to mark this meeting as completed?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#888',
    width: 100,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#206C00',
    width: 100,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomAlert;
