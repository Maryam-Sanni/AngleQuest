import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

function InputField({ label, placeholder, onChange }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChange}
      />
    </View>
  );
}

function MyComponent() {
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [linkedinUsername, setLinkedinUsername] = useState('');
  const [xUsername, setXUsername] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [streetAddressLine2, setStreetAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  const handleSave = () => {
    // Do something with the collected data, such as sending it to a server
    const data = {
      email,
      mobileNumber,
      linkedinUsername,
      xUsername,
      streetAddress,
      streetAddressLine2,
      city,
      postalCode,
      country,
      region,
    };
    console.log('Collected data:', data);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
      <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 40, alignItems: 'center', justifyContent: 'center', }}>
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              backgroundColor: '#FFEBCC',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{ color: 'white', fontSize: 16 }}>1</Text>
            </View>
            <View style={{ width: 60, height: 2, backgroundColor: '#FFEBCC', marginTop: 4, marginLeft: 5 }} />
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              backgroundColor: '#FFEBCC',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}>
              <Text style={{ color: 'white', fontSize: 16 }}>2</Text>
            </View>
            <View style={{ width: 60, height: 2, backgroundColor: '#FFEBCC', marginTop: 4, marginLeft: 5 }} />
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              backgroundColor: '#FFEBCC',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}>
              <Text style={{ color: 'white', fontSize: 16 }}>3</Text>
            </View>
            <View style={{ width: 60, height: 2, backgroundColor: '#FFEBCC', marginTop: 4, marginLeft: 5 }} />
            <View style={{
              width: 30,
              height: 30,
              borderRadius: 40,
              backgroundColor: 'coral',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}>
              <Text style={{ color: 'white', fontSize: 16 , fontWeight: 'bold'  }}>4</Text>
            </View>
          </View>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <View style={styles.inputGroup}>
          <InputField label="Email Address" placeholder="Enter Email Address" onChange={setEmail} />
          <InputField label="Mobile Number" placeholder="(xxx) xxx-xxxx" onChange={setMobileNumber} />
        </View>
        <View style={styles.inputGroup}>
          <InputField label="Enter LinkedIn Username" placeholder="LinkedIn Username" onChange={setLinkedinUsername} />
          <InputField label="Enter X Username" placeholder="X Username" onChange={setXUsername} />
        </View>
        <Text style={styles.sectionTitle}>Address</Text>
        <TextInput
          placeholder="Street Address"
          style={styles.input}
          onChangeText={setStreetAddress}
        />
        <TextInput
          placeholder="Street Address Line 2"
          style={styles.input}
          onChangeText={setStreetAddressLine2}
        />
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="City"
            style={styles.halfInput}
            onChangeText={setCity}
          />
          <TextInput
            placeholder="Region"
            style={styles.halfInput}
            onChangeText={setRegion}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Postal / Zip Code"
            style={styles.halfInput}
            onChangeText={setPostalCode}
          />
          <TextInput
            placeholder="Country"
            style={styles.halfInput}
            onChangeText={setCountry}
          />
        </View>
        <TouchableOpacity
          style={styles.saveButtonContainer}
          onPress={handleSave}
        >
          <Text style={styles.saveButton}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16
  },
  innerContainer: { 
    flex: 1,
    maxWidth: 900,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'coral',
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    maxWidth: '48%',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
    maxWidth: '49%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButtonContainer: {
    alignSelf: 'center',
    marginTop: 20,
    width: '30%',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'coral',
    borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
             textAlign: 'center',
  },
});

export default MyComponent;
