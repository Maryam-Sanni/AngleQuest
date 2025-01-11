import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BusinessProfilePage = ({ onClose }) => {
  const [businessName, setBusinessName] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [phoneNumber, setPhoneNumber] = useState(' ');
  const [companyType, setCompanyType] = useState(' ');
  const [ndaFile, setNdaFile] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No authentication token found.');
          return;
        }

        // Make the API call
        const response = await axios.get(`${apiUrl}/api/business/get-business-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Populate state with the fetched data
        const { businessName, email, phoneNumber, companyType, ndaFile } = response.data;
        setBusinessName(businessName);
        setEmail(email);
        setPhoneNumber(phoneNumber);
        setCompanyType(companyType);
        setNdaFile(ndaFile);
      } catch (error) {
        console.error('Error fetching business profile:', error);
        Alert.alert('Error', 'Failed to fetch business profile.');
      }
    };

    fetchBusinessProfile();
  }, []);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        // Fetch first_name, last_name, and email from AsyncStorage
        const values = await AsyncStorage.multiGet(['first_name', 'last_name', 'email']);

        // Extract the stored values
        const firstName = values[0][1] || '';
        const lastName = values[1][1] || '';
        const userEmail = values[2][1] || '';

        // Set the state with fetched values
        setBusinessName(`${firstName}`.trim());
        setEmail(userEmail);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
        Alert.alert('Error', 'Failed to load business details.');
      }
    };

    fetchBusinessDetails();
  }, []);
  
  const handleFileUpload = () => {
    alert('File uploaded successfully!');
  };

  const handleSave = () => {
    alert('Profile saved!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={['#A8E063', '#56AB2F']}
          style={styles.gradientBackground}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
      </LinearGradient>
      <View style={styles.headerContainer}>
        <View style={styles.imagePlaceholder}>
          <Image 
            source={require('../assets/coursehead.png')} 
            style={styles.logoImage} 
            resizeMode="cover" 
          />
        </View>
        <View style={{flexDirection: 'column', marginTop: 20, marginLeft: 50}} >
        <Text style={styles.header}>Profile</Text>
        <Text style={styles.subHeader}>Update your photo and personal details</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 50}} />
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Business Name</Text>
        <TextInput
          style={styles.input}
          value={businessName}
          onChangeText={setBusinessName}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Company Type</Text>
        <TextInput
          style={styles.input}
          value={companyType}
          onChangeText={setCompanyType}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Non-Disclosure Agreement</Text>
        <TouchableOpacity style={styles.fileUploadButton} onPress={handleFileUpload}>
          <Text style={styles.fileUploadText}>{ndaFile ? 'File Uploaded' : 'Upload File'}</Text>
        </TouchableOpacity>
      </View>

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    width: 800,
    height: 800,
    marginTop: 40
  },
  gradientBackground: {
   height: 150,
    marginTop: -20,
    marginLeft: -20,
    marginRight: -20
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row'
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: -30,
    backgroundColor: 'lightgreen',
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  subHeader: {
    fontSize: 16,
    color: '#888888',
  },
  inputGroup: {
    marginBottom: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#000000',
    width: 250,
    alignSelf: 'center',
    fontWeight: 600
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#000000',
    width: 350,
  },
  fileUploadButton: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  fileUploadText: {
    color: '#000000',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'darkgrey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 30
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: "absolute",
    right: 15,
  },
  closeButtonText: {
    fontSize: 18,
    marginTop: 10, 
    color: "white",
    fontWeight: "bold",
  },
});

export default BusinessProfilePage;
