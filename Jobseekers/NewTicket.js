import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Picker } from 'react-native';

const ComplaintsForm = ({ onClose }) => {
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleChooseAttachment = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setAttachment(file);
    } else {
      alert("File size should not exceed 2 MB.");
    }
  };

  const handleSubmit = () => {
    // Logic for submitting form data
    console.log("Complaint submitted:", { topic, description, attachment });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>Submit a New Ticket</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Category</Text>
            <Picker
                  style={styles.input}
                >
                     <Picker.Item label="SAP" value="SAP" />
                    <Picker.Item label="Microsoft" value="Microsoft" />
                    <Picker.Item label="Scrum" value="Scrum" />
                    <Picker.Item label="Business Analysis" value="Business Analysis" />
                </Picker>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Severity</Text>
            <Picker
                  style={styles.input}
                >
                     <Picker.Item label="Low" value="Low" />
                    <Picker.Item label="Moderate" value="Moderate" />
                    <Picker.Item label="Severe" value="Severe" />
                </Picker>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Topic</Text>
            <TextInput
              placeholder="Enter the topic"
              placeholderTextColor="grey"
              style={styles.input}
              value={topic}
              onChangeText={setTopic}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Enter details"
              placeholderTextColor="grey"
              multiline
              style={[styles.input, { height: 100 }]}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Attachment (optional)</Text>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleChooseAttachment}
              style={{ marginTop: 5,     marginLeft: 50 }}
            />
            {attachment && <Text style={styles.attachmentText}>{attachment.name}</Text>}
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: 800,
    height: '100%',
    backgroundColor: '#F8F8F8',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20
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
    fontFamily: "Roboto-Light"
  },
  row: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    marginBottom: 5,
    marginLeft: 50
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: 50,
    marginRight: 50
  },
  attachmentText: {
    fontSize: 12,
    color: 'grey',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: 100,
    marginLeft: 50
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ComplaintsForm;
