import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreferredLocationsEditModal = ({ visible, preferredLocations, onClose, onSave }) => {
  const [editableLocations, setEditableLocations] = useState([...preferredLocations]);

  const handleSaveLocations = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('Token not found. Please sign in again.');
        return;
      }

      // Prepare data for API request
      const data = {
        preferred_locations: editableLocations.join(', '), // Join array into a string
      };

      // Send POST request to API
      const response = await axios.post('https://recruitangle.com/api/expert/update-profile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Save Specification Response:', response.data);

      // Close modal after successful save
      onClose();
    } catch (error) {
      console.error('Save Specification Error:', error);
      alert('Failed to save preferred locations. Please try again.');
    }

    // Save the locations in the parent component
    onSave(editableLocations);
  };

  
  const handleLocationChange = (text, index) => {
    const updatedLocations = [...editableLocations];
    updatedLocations[index] = text;
    setEditableLocations(updatedLocations);
  };

  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  
const {t}=useTranslation()
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Edit Preferred Locations")}</Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>
          {editableLocations.map((location, index) => (
            <TextInput
              key={index}
              style={styles.input}
              onChangeText={(text) => handleLocationChange(text, index)}
              value={location}
            />
          ))}
          <View style={{ width: 200, marginTop: 20 }}>
            <Button title="Save" onPress={handleSaveLocations} color="coral" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginTop: 40,
    width: 600
  },
  input: {
    height: 40,
    borderColor: 'none',
    borderRadius: 20,
    marginBottom: 10,
    width: '50%',
    paddingHorizontal: 10,
    backgroundColor: '#d3f9d8',
    color: '#206C00'
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    width: 600,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 50,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily:"Roboto-Light"
  }
});

export default PreferredLocationsEditModal;
