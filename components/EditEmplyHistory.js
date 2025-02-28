import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmploymentHistoryModal = ({ visible, onClose, employmentHistory, onSave }) => {
  const [history, setHistory] = useState(employmentHistory);

  useEffect(() => {
    setHistory(employmentHistory);
  }, [employmentHistory]);

  const handleChange = (key, value) => {
    setHistory({ ...history, [key]: value });
  };

  const handleSave = async () => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token); // Add this line for debugging

      if (!token) {
        alert('Token not found. Please sign in again.');
        return;
      }
  
      // Prepare data for API request
      const data = {
        position: history.position,
        company: history.company,
        duration: history.duration,
        description: history.description,
      };
  
      // Send POST request to API
      const response = await axios.post('https://recruitangle.com/api/certifications/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Save Certifications Response:', response.data);
  
      // Close modal after successful save
      onClose();
    } catch (error) {
      console.error('Save Certifications Error:', error);
      alert('Failed to save certifications. Please try again.');
    }
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });
  const { t } = useTranslation();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>{t("Edit Employment History")}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.input}
                value={history.position}
                onChangeText={(text) => handleChange('position', text)}
                placeholder="Position"
              />
              <TextInput
                style={styles.input}
                value={history.company}
                onChangeText={(text) => handleChange('company', text)}
                placeholder="Company"
              />
              <TextInput
                style={styles.input}
                value={history.duration}
                onChangeText={(text) => handleChange('duration', text)}
                placeholder="Duration"
              />
              <TextInput
                style={styles.inputMultiline}
                value={history.description}
                onChangeText={(text) => handleChange('description', text)}
                placeholder="Description"
                multiline
              />
              <View style={styles.saveButtonContainer}>
                <Button title="Save Changes" onPress={handleSave} color="coral" />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 600,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#3F5637',
    fontWeight: 'bold',
    fontFamily:"Roboto-Light"
  },
  modalContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputMultiline: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  saveButtonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default EmploymentHistoryModal;
