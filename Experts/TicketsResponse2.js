import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { ReactMic } from 'react-mic'; // Import ReactMic

const ResponseModal = ({ visible, onClose, title }) => {
  const [response, setResponse] = useState('');
  const [description, setDescription] = useState('');
  const [hyperlink, setHyperlink] = useState('');
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
    <View style={{ flex: 1, backgroundColor: '#F8F8F8', alignItems: 'center', marginTop: 40, borderRadius: 10, }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Material posting issues with PO posting</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={{fontWeight: '600', fontSize: 16}}>Adelain Huter</Text>
          <Text style={{fontWeight: '600', fontSize: 16, backgroundColor: 'lightgrey', padding: 5, width: 230, marginBottom: 20}}>Deadline: 24/11/2024 2PM</Text>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=_0p37K42drxY&format=png&color=000000",
              }}
              style={{
                width: 30,
                height: 30,
            marginRight: 10
              }}
            />
             <Text style={{fontSize: 20, MarginTop: 10, fontWeight: '600' }}>Description</Text>

            </View>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder=" "
            multiline
            style={styles.textInput}
          />
         
          <Text style={{fontSize: 20, fontWeight: '600', textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Join the meeting 24/11/2024 - 2PM </Text>
          <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
              <TouchableOpacity>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=GsPxgmTxBONV&format=png&color=000000",
              }}
              style={{
                width: 30,
                height: 30,
            marginRight: 10
              }}
            />
                  </TouchableOpacity>
            <View style={{flex:1, padding: 10, borderWidth: 1,
                          borderColor: 'green',
                          backgroundColor: "#B6D0E2",}}>
              <View style={{padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'grey', alignSelf: 'center',}}>
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=jHA3O0dbvOj1&format=png&color=FFFFFF",
                }}
                style={{
                  width: 30,
                  height: 30,
          alignSelf: 'center',
                }}
              />
              </View>
               <Text style={{fontSize: 18, fontWeight: '600', textAlign: 'center', marginTop: 10, marginBottom: 10 }}>Start</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=7867&format=png&color=000000",
              }}
              style={{
                width: 30,
                height: 30,
            marginRight: 10
              }}
            />
          <TextInput
            value={hyperlink}
            onChangeText={setHyperlink}
            placeholder="Add Hyperlink..."
            style={styles.input2}
          />
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=86460&format=png&color=000000",
              }}
              style={{
                width: 30,
                height: 30,
            marginRight: 10
              }}
            />
            <TouchableOpacity style={styles.input2} onPress={handleImagePick}>
                {attachments.length === 0 ? (
                  <Text style={{ color: 'black' }}>Add Attachment...</Text>
                ) : (
                  attachments.map((attachment, index) => (
                    <Text key={index} style={{ color: '#555', marginBottom: 5, width: 600, maxHeight: 30, textAlign: 'center' }}>
                      {attachment.name || attachment.uri}
                    </Text>
                  ))
                )}
            </TouchableOpacity>
          </View>


          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

        </View>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    width: 800,
    borderRadius: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  textInput: {
    height: 200,
    borderColor: '#ccc',
    backgroundColor: '#F5F5F5',
    marginLeft: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  input: {
    height: 100,
    flex: 1,
    borderColor: 'lightgreen',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
      input2: {
        height: 40,
        flex: 1,
        borderColor: 'lightgreen',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        overflow: 'hidden'
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
    marginBottom: 20,
    marginLeft: 50
  },
  submitButton: {
    backgroundColor: 'darkgreen',
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ResponseModal;
