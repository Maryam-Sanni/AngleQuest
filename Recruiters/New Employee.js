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
          <Text style={styles.headerText}>Invite New Employee</Text>
       
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
                                         Specialization
                                        </Text>
<Picker
  style={styles.picker} 
>
<Picker.Item label="Pick an area of specialization" value="Pick an area of specialization" />
          <Picker.Item label="Java Engineering" value="Java Engineering" />
          <Picker.Item label="SAP FI" value="SAP FI" />
          <Picker.Item label="Microsoft Azure" value="Microsoft Azure" />
          <Picker.Item label="Dev Ops" value="Dev Ops" />
          <Picker.Item label="Frontend Development" value="Frontend Development" />
          <Picker.Item label="Backend Development" value="Backend Development" />
          <Picker.Item label="Fullstack Development" value="Fullstack Development" />
          <Picker.Item label="Data Analysis" value="Data Analysis" />
          <Picker.Item label="UI/UX Design" value="UI/UX Design" />
        </Picker>

        <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5 }}>
                                            Current role
                                        </Text>
<Picker
  style={styles.picker} 
>
  <Picker.Item label="Beginner" value="Beginner" />
  <Picker.Item label="Junior" value="Junior" />
  <Picker.Item label="Medior" value="Medior" />
  <Picker.Item label="Senior" value="Senior" />
  <Picker.Item label="Professional" value="Professional" />
</Picker>

      
     
<Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 30, marginBottom: 5 }}>
                                            Target role
                                        </Text>
<Picker
  style={styles.picker} 
>
  <Picker.Item label="Junior" value="Junior" />
  <Picker.Item label="Beginner" value="Beginner" />
  <Picker.Item label="Medior" value="Medior" />
  <Picker.Item label="Senior" value="Senior" />
  <Picker.Item label="Professional" value="Professional" />
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