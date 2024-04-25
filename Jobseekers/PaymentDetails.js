import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import appleLogo from '../assets/apple.jpg';
import Top from '../components/top';

function MyComponent() {
  return (
    <View style={{ height: '63%' }}>
    <Top/ >
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.heading}>Payment Details</Text>
             <TouchableOpacity style={styles.saveButton}>
              <View style={styles.buttonContent}>
                <Image source={appleLogo} style={styles.appleIcon} />
                <Text style={styles.saveButtonText}>Pay</Text>
              </View>
            </TouchableOpacity>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20, marginLeft: 10, marginRight: 50, marginBottom: 5}} />
           <Text style={{ fontSize: 14, fontWeight: "bold", color: "black", marginBottom: 30, marginLeft: 400 }}>Or</Text>
             <View style={styles.inputField}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="titiana@stripe.com" />
            </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Card Number</Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="1111 2222 3333 4444" />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Expiration Month</Text>
              <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="MM" />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Expiration Year</Text>
              <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="YY" />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Security Code</Text>
              <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="123" />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Name on card</Text>
              <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="" />
            </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Country or region</Text>
              <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="United States" />
            </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Zip</Text>
              <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="00000" />
            </View>
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginLeft: 250,
    marginRight: 250
  },
  content: {
    paddingHorizontal: 8,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 25,
  },
  inputField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    flex: 1,
    marginLeft: 0,
    color: 'black', 
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    marginTop: 5,

  },
  saveButton: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default MyComponent;
