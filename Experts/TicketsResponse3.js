import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { ReactMic } from 'react-mic'; // Import ReactMic
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ResponseModal = ({ visible, onClose, title }) => {
  const [response, setResponse] = useState('');
  const [description, setDescription] = useState('');
  const [hyperlink, setHyperlink] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [requestData, setRequestData] = useState(null);


  // Function to fetch saved request data from AsyncStorage
  const fetchSavedRequest = async () => {
    try {
      const savedRequest = await AsyncStorage.getItem('selectedRequest');
      if (savedRequest) {
        console.log('Retrieved saved request:', savedRequest);
        return JSON.parse(savedRequest);
      }
      console.warn('No saved request found for the key: selectedRequest');
      return null;
    } catch (error) {
      console.error('Error retrieving saved request:', error);
      return null;
    }
  };

  // useEffect to load the saved request when the component mounts
  useEffect(() => {
    const loadRequestData = async () => {
      const data = await fetchSavedRequest();
      console.log('Data loaded in useEffect:', data);
      if (data) {
        setRequestData(data);
      }
    };

    loadRequestData(); // Load the request data when the component mounts
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setAttachments((prev) => [...prev, ...response.assets]);
      }
    });
  };

  const handleSubmit = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
  
    if (!requestData || !requestData.id) {
      console.error('No request data or ID found.');
      return;
    }
  
    const formData = new FormData();
  
    // If there's a recorded blob, append it directly as the file without name/size metadata
    if (recordedBlob) {
      const blob = recordedBlob.blob;  // Use the raw blob from recordedBlob
      
      // Send as 'audio/wav' type without including file size or name metadata
      const file = new Blob([blob], { type: 'audio/wav' }); // Raw Blob without extra metadata
  
      // Append the file to FormData with just the audio data (no size, name) in the request
      formData.append('voice_response', file, 'voice_response.wav');
    }
  
    // Add other fields to the form data (if needed)
    formData.append('description', requestData.description || '');
    formData.append('hyperlink', hyperlink);
  
    // Add attachments to FormData (if any)
    attachments.forEach((attachment, index) => {
      formData.append(`attachment_${index}`, {
        uri: attachment.uri,
        type: attachment.type || 'application/octet-stream',
        name: attachment.fileName || `attachment_${index}`,
      });
    });
  
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found.');
        return;
      }
  
      // Make the API request using axios
      const response = await axios.post(
        `${apiUrl}/api/expert/respond-with-text/${requestData.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        console.log('Response successfully submitted:', response.data);
        setResponse('');
        setAttachments([]);
        setDescription('');
        setHyperlink('');
        onClose();
      } else {
        console.error('Error submitting response:', response.data);
      }
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };
  

  const startRecording = () => {
    setRecording(true);
  };
  
  const stopRecording = () => {
    setRecording(false);
  };
  
  const onDataRecorded = (data) => {
    console.log("Data received from recording:", data);
  
    // Check if the data contains a blob
    if (data && data.blob) {
      setRecordedBlob(data.blob);
      console.log("Recorded Blob:", data.blob);
    } else {
      console.error("No blob found in recorded data:", data);
    }
  };  

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8', alignItems: 'center', marginTop: 40, borderRadius: 10, }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.modalContent}>
         <Text style={styles.modalTitle}>{requestData ? requestData.name : 'Loading...'}</Text>
                   <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                     <Text style={styles.closeIcon}>✕</Text>
                   </TouchableOpacity>
                   <Text style={{fontWeight: '600', fontSize: 14, backgroundColor: 'lightgrey', padding: 5, width: 230, marginBottom: 30}}>Deadline: {requestData ? requestData.deadline : 'Loading...'}</Text>
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
                     placeholder={requestData?.description || 'Add a description'}
                     multiline
                     style={styles.textInput}
                     editable={false}
                   />
          <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=60695&format=png&color=000000",
              }}
              style={{
                width: 30,
                height: 30,
            marginRight: 10
              }}
            />
             <Text style={{fontSize: 20, fontWeight: '600' }}>Press the microphone to begin recording</Text>
          </View>
         

          <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
            {recording ? (
              <TouchableOpacity onPress={stopRecording}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=0xYCItyT3xNJ&format=png&color=FF0000",
              }}
              style={{
                width: 30,
                height: 30,
            marginRight: 10
              }}
            />
                  </TouchableOpacity>
                ) : (
      <TouchableOpacity onPress={startRecording}>
        <Image
          source={{
            uri: "https://img.icons8.com/?size=100&id=mpEbBpFuW75A&format=png&color=000000",
          }}
          style={{
            width: 30,
            height: 30,
        marginRight: 10
          }}
        />
              </TouchableOpacity>
      )}
            <View style={{flex:1, padding: 10, borderWidth: 1, borderColor: 'black'}}>
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=9387&format=png&color=000000",
                }}
                style={{
                  width: 40,
                  height: 40,
alignSelf: 'center',
                  marginLeft: -40,
                  marginBottom: -70
                }}
              />
            <ReactMic
              record={recording}
              className="sound-wave"
              onStop={onDataRecorded}
              mimeType="audio/wav"
              strokeColor="black"
              backgroundColor="transparent"
            />
            </View>
          </View>
          {recordedBlob && (
            <View style={styles.audioContainer}>
              <Text>Recorded Audio:</Text>
              <audio controls src={recordedBlob.blobURL} />
            </View>
          )}
          
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
    marginLeft: 50,
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
