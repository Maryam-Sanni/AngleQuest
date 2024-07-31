import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { Modal, Text, TextInput, Button, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function SuggestionModal({ visible, onClose }) {
  const [suggestion, setSuggestion] = useState('');

  const submitSuggestion = () => {
    // Construct the data to send
    const data = {
      suggestion: suggestion
    };
  
    // Make a POST request using Axios
    axios.post('https://crispy-spoon-xg65jq45g6r3prpg-8000.app.github.dev/api/jobseeker/create-jobseeker-suggestion', data)
      .then(response => {
        console.log('Suggestion submitted successfully:', response.data);
        // Optionally handle success response here
      })
      .catch(error => {
        console.error('Error submitting suggestion:', error);
        // Optionally handle error response here
      });
  
    // Close modal after submission
    onClose();
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '30%' }}>
        <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18, color:'grey', position: 'absolute', right: 20, fontWeight: 'bold', marginTop: 5, fontFamily:"Roboto-Light"}}>
                            ✕
                        </Text>
                        </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginTop: 30,  fontFamily:"Roboto-Light"
 }}>{t("Help us improve")}</Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder={t("Type your suggestion or review here...")}
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 20 }}
            value={suggestion}
            onChangeText={text => setSuggestion(text)}
          />
          <Button title={t("Submit")} onPress={submitSuggestion} color="coral" />
        </View>
      </View>
    </Modal>
  );
}
