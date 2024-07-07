import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import axios from 'axios';

function MyComponent({ onClose }) {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (!full_name || !email ) {
        alert('Please fill all fields');
        return;
      }
      
    try {
      const response = await axios.post('https://recruitangle.com/api/email-campaign', {
        full_name,
        email,
      });

      if (response.data.status === 'success') {
        console.log('Sign up successful:', response.data);
        alert('Thank you for signing up for AngleQuest!');
      } else {
        console.log('Sign up failed:', response.data);
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('Signup failed. Please try again.');
    }
    onClose();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.greenBox}>
      <View style={styles.header}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>Get ahead with AngleQuest</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
          <View style={{ flexDirection: 'column', alignItems: 'center'}}>
            <Text style={{ fontWeight: '500', fontSize: 14, marginTop: 10, marginBottom: 30, marginLeft: 10, marginRight: 10 }}>
              Be among the first 1,000 persons to see AngleQuest in 50 days
            </Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TextInput
              placeholder="Full Name"
              value={full_name}
              onChangeText={setFullName}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TouchableOpacity style={styles.buttonplus} onPress={handleSubmit}>
              <Text style={styles.buttonTextplus}>Inform me</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCC',
    marginRight: 10,
    marginTop: 20,
    marginLeft: 10,
  },
  greenBox: {
    width: "100%",
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: "80%",
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 10,
    marginTop: 180,
    position: 'absolute',
    right: 40,
    width: 150,
    paddingHorizontal: 20,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    padding: 10,
    marginBottom: 30
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
    marginBottom: 20,
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
  image: {
    width: 400,
    height: 400,
    marginRight: 30,
  },
});

export default MyComponent;
