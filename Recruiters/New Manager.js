import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';


function MyComponent({ onClose }) {
  const navigation = useNavigation();


  const goToPlans = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('Advice Payment');
    onClose(); // Close the modal
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F8", alignItems: 'center', marginTop: 40}}>
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>Invite New Manager</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 

        <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
                                            Full Name
                                        </Text>
                                        <TextInput
            placeholder="Full Name"
            style={styles.input}
          />

           <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
                                            Email Address
                                        </Text>
                                        <TextInput
            placeholder="hello@mybusiness.com"
            style={styles.input}
          />

        <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
                                         Team
                                        </Text>
<Picker
  style={styles.picker} 
>
<Picker.Item label="Pick a team" value="Pick a team" />
<Picker.Item label="CEPPA" value="CEPPA" />
  <Picker.Item label="SAP" value="SAP" />
  <Picker.Item label="JPP" value="JPP" />
  <Picker.Item label="MORR" value="MORR" />
  <Picker.Item label="PRO" value="PRO" />
        </Picker>

        


    
    <TouchableOpacity style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>Invite</Text>
    </TouchableOpacity>
    </View>
    
   
</ScrollView>
</View>

);
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#CCC',
        marginRight: 70, 
        marginTop: 20, 
        marginLeft: 50 
      },
  greenBox: {
    width: 920,
    height: 600,
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    marginRight: 100,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1, 
    color:'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginTop: 30,
    marginLeft: 720,
    width: 100,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginRight: 100,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1, 
    color:'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5,
    padding: 10
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
    color: '#3F5637'
  }
});

export default MyComponent;