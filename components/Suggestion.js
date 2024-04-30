import React, { useState } from 'react';
import { Modal, Text, TextInput, Button, View } from 'react-native';

export default function SuggestionModal({ visible, onClose }) {
  const [suggestion, setSuggestion] = useState('');

  const submitSuggestion = () => {
    // Here you can add your logic to submit the suggestion
    console.log("Suggestion: ", suggestion);
    // Optionally, you can perform any other actions after submission

    // Close modal after submission
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '30%' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Help us improve</Text>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="Type your suggestion or review here..."
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 20 }}
            value={suggestion}
            onChangeText={text => setSuggestion(text)}
          />
          <Button title="Submit" onPress={submitSuggestion} color="coral" />
        </View>
      </View>
    </Modal>
  );
}
