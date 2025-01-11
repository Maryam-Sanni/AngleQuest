import React, { useState } from 'react';
import { StyleSheet, Text, Image, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BusinessProfilePage = () => {
  const [businessName, setBusinessName] = useState('Anglequest');
  const [email, setEmail] = useState('example@business.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [companyType, setCompanyType] = useState('LLC');
  const [ndaFile, setNdaFile] = useState(null);

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
});

export default BusinessProfilePage;
