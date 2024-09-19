import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TextInput, TouchableOpacity, Text, Modal, StyleSheet, Image } from 'react-native';

export default function AboutEditModal({ visible, about, onClose, onSave }) {
  const [editedAbout, setEditedAbout] = useState(about);

  const handleSave = () => {
    try {
      onSave(editedAbout);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
      const {t}=useTranslation()

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
      <View style={styles.header}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>{t("Edit About")}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
  
          <TextInput
            multiline
            value={editedAbout}
            onChangeText={setEditedAbout}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={handleSave} style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>{t("Save")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '50%',
    height: 400,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  textInput: {
    height: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: 'coral',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily:"Roboto-Light"
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
    fontFamily:"Roboto-Light"
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
});
