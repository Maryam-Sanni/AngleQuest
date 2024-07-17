import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherExperiencesEditModal = ({ visible, otherExperiences, onClose, onSave }) => {
  const [editableOtherExperiences, setEditableOtherExperiences] = useState([...otherExperiences]);

  useEffect(() => {
    setEditableOtherExperiences([...otherExperiences]);
  }, [otherExperiences]);

  const handleSaveOtherExperiences = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token); // Debugging line

      if (!token) {
        alert('Token not found. Please sign in again.');
        return;
      }

      // Prepare data for API request
      const data = {
        otherExperiences: editableOtherExperiences,
      };

      // Send POST request to API
      const response = await axios.post('https://recruitangle.com/api/other-experience/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Save Other Experiences Response:', response.data);

      // Call onSave callback with updated other experiences
      onSave(editableOtherExperiences);

      // Close modal after successful save
      onClose();
    } catch (error) {
      console.error('Save Other Experiences Error:', error);
      alert('Failed to save other experiences. Please try again.');
    }
  };

  const handleOtherExperienceChange = (text, index) => {
    const updatedOtherExperiences = [...editableOtherExperiences];
    updatedOtherExperiences[index] = text;
    setEditableOtherExperiences(updatedOtherExperiences);
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

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
            <Text style={styles.headerText}>{t("Edit Other Experiences")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          {editableOtherExperiences.map((experience, index) => (
            <TextInput
              key={index}
              style={styles.input}
              onChangeText={(text) => handleOtherExperienceChange(text, index)}
              value={experience}
            />
          ))}
          <View style={{ width: 200, marginTop: 20 }}>
            <Button title="Save Changes" onPress={handleSaveOtherExperiences} color="coral" />
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
    width: 600,
  },
  input: {
    height: 40,
    borderColor: '#206C00',
    borderWidth: 1,
    marginBottom: 10,
    width: '70%',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#3F5637',
    fontWeight: 'bold',
    fontFamily: "Roboto-Light",
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
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily: "Roboto-Light",
  },
});

export default OtherExperiencesEditModal;
