import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ResponseModal = ({ visible, onClose, title }) => {
  const [response, setResponse] = useState('');
  const [description, setDescription] = useState('');
  const [hyperlink, setHyperlink] = useState('');
  const [attachments, setAttachments] = useState([]);
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
    formData.append('text_response', response);
    formData.append('description', requestData.description);
    formData.append('hyperlink', hyperlink);
  
    // Adding attachments to FormData
    attachments.forEach((attachment, index) => {
      formData.append(`attachment_${index}`, {
        uri: attachment.uri,
        type: attachment.type || 'application/octet-stream', // Adjust type if necessary
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
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
  
      if (response.status === 201) {
        console.log('Response successfully submitted:', response.data);
        // Handle success logic, e.g., close modal or show a success message
        setResponse('');
        setAttachments([]);
        setDescription('');
        setHyperlink('');
        onClose();
      } else {
        console.error('Error submitting response:', response.data);
        // Handle error logic (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      // Handle network error or axios error (e.g., show a network error message)
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
                uri: "https://img.icons8.com/?size=100&id=a3p4tCfgq8qa&format=png&color=000000",
              }}
              style={{
                width: 30,
                height: 30,
            marginRight: 10
              }}
            />
             <Text style={{fontSize: 20, fontWeight: '600' }}>Give your response</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
            <View style={{backgroundColor: 'green', width: 30, height: 30, borderRadius: 15, marginRight: 10, borderWidth: 1, borderColor: 'lightgreen'}}>
            </View>
          <TextInput
            value={response}
            onChangeText={setResponse}
            placeholder="Write your response..."
            multiline
            style={styles.input}
          />
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
