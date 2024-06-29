import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Picker, Modal, ScrollView } from 'react-native';

function MyComponent({ onClose }) {


  return (
        <View style={{ flex: 1, backgroundColor: "#F8F8F8", marginTop: 40, alignItems: 'center' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1,  }}>
          <View style={styles.greenBox}>
          
            <View style={styles.header}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>Attach Expert to Employee</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold' }}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>

            <View style={{flexDirection: 'row',  }}>
            <View style={{flexDirection: 'column', marginLeft: 150}}>
          <Image
       source={require('../assets/useravatar1.png')}
        style={{width: 100, height: 100, marginTop: 20, borderWidth: 2, borderColor: "#206C00" }}
      />
      <Text style={{ fontSize: 16, marginTop: 5 }}>
              Larissa Omreh
            </Text>
            </View>
            <View style={{flexDirection: 'column', marginLeft: 300 }}>
<Image
       source={require('../assets/useravatar2.png')}
       style={{width: 100, height: 100, marginTop: 20, borderWidth: 2, borderColor: "#206C00" }}
      />
       <Text style={{ fontSize: 16, marginTop: 5 }}>
              Joop Melcher
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "400", color: 'grey' }}>
              Attached Expert
            </Text>
            </View>
      </View>

      <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 10  }}> Authorize AngleQuest:  </Text>
      <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 10, }}>
      <TouchableOpacity style={styles.touchableOpacity}/>
        <Text style={{ fontSize: 15, }}> Find matching expert for Larissa </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30, marginBottom: 20 }}>
                                            <TouchableOpacity style={styles.touchableOpacity2}/>
                         <Text style={{ fontSize: 15, }}> Wait for note from manager or coach  </Text>
                                        </View>

            <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
              What key areas would you like the expert to focus on with "Employee Name"?
            </Text>
            <TextInput
              placeholder=" "
              style={styles.input}
            />

            <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
              Detailed Description
            </Text>
            <TextInput
              placeholder=" "
              style={[styles.input, styles.multilineInput]}
              multiline
            />

            <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
              Expert country (Optional): Select the preferred country you would like the expert to be from
            </Text>
            <Picker
              style={styles.picker}
            >
              <Picker.Item label=" " value=" " />
              <Picker.Item label="Nigeria" value="Nigeria" />
              <Picker.Item label="United States" value="United States" />
              <Picker.Item label="United Kingdom" value="United Kingdom" />
              <Picker.Item label="Canada" value="Canada" />
              <Picker.Item label="Australia" value="Australia" />
              <Picker.Item label="Netherlands" value="Netherlands" />
              <Picker.Item label="India" value="India" />
              <Picker.Item label="Germany" value="Germany" />
              <Picker.Item label="France" value="France" />
              <Picker.Item label="China" value="China" />
              <Picker.Item label="Japan" value="Japan" />
              <Picker.Item label="Brazil" value="Brazil" />
              <Picker.Item label="South Africa" value="South Africa" />
            </Picker>

                

            

                <TouchableOpacity onPress={onClose} style={styles.buttonplus}>
                  <Text style={styles.buttonTextplus}>Save</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </ScrollView>
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
    marginTop: 20,
    marginLeft: 100,
  },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: '80%',
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
    marginTop: 30,
    marginLeft: 50,
    width: 150,
    paddingHorizontal: 20,
    borderRadius: 5,
marginBottom: 50
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10,
  },
  uneditable: {
    height: 40,
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1,
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
  multilineInput: {
    height: 80,
  },
  touchableOpacity: {
    height: 18,
    width: 18,
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: '#206C00',
    borderColor: "black",
    marginRight: 5,
    marginLeft: 30,
},
touchableOpacity2: {
    height: 18,
    width: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    marginRight: 5,
    marginLeft: 30,
},
});

export default MyComponent;
