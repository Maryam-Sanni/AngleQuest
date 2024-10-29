import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { ReactMic } from 'react-mic'; // Import ReactMic

const ResponseModal = ({ visible, onClose, title }) => {
  const [response, setResponse] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setAttachments((prev) => [...prev, ...response.assets]);
      }
    });
  };

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const onDataRecorded = (data) => {
    console.log(data);
    setRecordedBlob(data);
    setAttachments((prev) => [
      ...prev,
      { uri: data.blobURL, type: 'audio/wav', name: 'voice.wav' },
    ]);
  };

  const handleSubmit = () => {
    console.log("Response submitted:", response);
    console.log("Attachments:", attachments);
    // Handle your response submission logic here (e.g., send to API)
    setResponse('');
    setAttachments([]);
    setRecordedBlob(null);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Respond to: {title}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <TextInput
            value={response}
            onChangeText={setResponse}
            placeholder="Write your response here..."
            multiline
            style={styles.textInput}
          />
          <ScrollView style={styles.attachmentsContainer}>
            {attachments.map((attachment, index) => (
              <View key={index} style={styles.attachment}>
                {attachment.type?.startsWith('image/') ? (
                  <Image source={{ uri: attachment.uri }} style={styles.image} />
                ) : (
                  <Text style={styles.attachmentText}>{attachment.name || attachment.uri}</Text>
                )}
              </View>
            ))}
          </ScrollView>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleImagePick}>
              <Icon name="images-outline" size={20} color="black" />
            </TouchableOpacity>
            {recording ? (
              <TouchableOpacity onPress={stopRecording}>
                <Icon name="stop-circle-outline" size={20} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={startRecording}>
                <Icon name="mic-outline" size={20} color="black" />
              </TouchableOpacity>
            )}
          </View>
          <ReactMic
            record={recording}
            className="sound-wave"
            onStop={onDataRecorded}
            mimeType="audio/wav"
            strokeColor="green"
            backgroundColor="white"
          />
          {recordedBlob && (
            <View style={styles.audioContainer}>
              <Text>Recorded Audio:</Text>
              <audio controls src={recordedBlob.blobURL} />
            </View>
          )}
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeIcon: {
    fontSize: 18,
    color: '#3F5637',
    fontWeight: 'bold',
  },
  attachmentsContainer: {
    maxHeight: 100,
    marginBottom: 10,
  },
  attachment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  attachmentText: {
    marginBottom: 5,
    color: '#555',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  audioContainer: {
    marginTop: 10,
    marginBottom: 20
  },
  submitButton: {
    backgroundColor: 'coral',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ResponseModal;
