import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TextInput, View, TouchableOpacity, ScrollView, Picker} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BusinessProfilePage = ({ onClose }) => {
  const [businessName, setBusinessName] = useState(' ');
  const [adminName, setAdminName] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [phoneNumber, setPhoneNumber] = useState(' ');
  const [companyType, setCompanyType] = useState('consulting');
  const [ndaFile, setNdaFile] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No authentication token found.');
          return;
        }

        const response = await axios.get(`${apiUrl}/api/business/get-business-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        const { profile } = response.data;
        if (profile) {
          setPhoneNumber(profile.phone_no || ''); 
          setCompanyType(profile.company_type || ''); 
          
        }
      } catch (error) {
        console.error('Error fetching business profile:', error);
        Alert.alert('Error', 'Failed to fetch business profile.');
      }
    };

    fetchBusinessProfile();
  }, []); // Runs once when the component mounts


  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        setNdaFile({
          uri: file.uri,
          name: file.uri.split('/').pop(),
          type: file.type || 'image/jpeg',
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image.');
    }
  };
  
  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'No authentication token found.');
        return;
      }

      const formData = new FormData();
      formData.append('business_name', businessName.trim());
      formData.append('business_email', email.trim());
      formData.append('phone_no', phoneNumber.trim());
      formData.append('company_type', companyType.trim());
      formData.append('administrator_name', adminName.trim());
        if (ndaFile) {
          formData.append('upload_nda_file', {
            uri: ndaFile.uri,
            type: ndaFile.type,
            name: ndaFile.name,
          });
      }

      const response = await axios.post(
        `${apiUrl}/api/business/edit-business-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      Alert.alert('Success', 'Business profile updated successfully!');
    } catch (error) {
      console.error('Error updating business profile:', error);
      Alert.alert('Error', 'Failed to update business profile.');
    }
  };


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
        setAdminName(`${lastName}`.trim());
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
        <TouchableOpacity style={styles.imagePlaceholder}>
          <Image
            source={ndaFile ? { uri: ndaFile.uri } : require('../assets/coursehead.png')}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
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
        <Text style={styles.label}>Adminstrator Name</Text>
        <TextInput
          style={styles.input}
          value={adminName}
          onChangeText={setAdminName}
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
        <Picker
          selectedValue={companyType}
          style={styles.input}
          onValueChange={(itemValue) => setCompanyType(itemValue)}
          >
          <Picker.Item label="Consulting" value="Consulting" />
          <Picker.Item label="Recruitment" value="Recruitment" />
          <Picker.Item label="In-house Company" value="In-house Company" />
        </Picker>
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
    backgroundColor: '#36454F',
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
