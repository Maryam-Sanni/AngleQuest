import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Picker, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function MyComponent({ onClose }) {
  const navigation = useNavigation();

  const goToEmployees = () => {
    navigation.navigate('Managers');
    onClose();
  };

  return (
        <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
          <View style={styles.greenBox}>
            <View style={styles.header}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>Add Manager</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginBottom: 30 }}>
                 Invite a new Manager
                </Text>
                <Image
                  source={require('../assets/AddManager.png')}
                  style={styles.image}
                />
                <Text style={{ fontSize: 14, marginTop: 10, marginBottom: 10, fontStyle: 'italic', width: 400 }}>
                  The manager will be able to access team members schedules, hubs activities and ratings.
                </Text>
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'center', width: 500 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 80, marginTop: 10, }}>
                  Attach "Manager's Name" to Employees
                </Text> 
              


                <TouchableOpacity onPress={goToEmployees} style={styles.buttonplus}>
                  <Text style={styles.buttonTextplus}>Get Started</Text>
                </TouchableOpacity>
              </View>
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
    marginRight: 70,
    marginTop: 20,
    marginLeft: 50,
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: 450,
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
    marginTop: 15,
    marginLeft: 175,
    width: 150,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 450,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
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
