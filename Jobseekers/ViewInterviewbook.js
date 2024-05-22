import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function MyComponent({ onClose }) {
  const navigation = useNavigation();

  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setProfileImage(imageUrl);
  };

  const goToPlans = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('All Interviews');
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
          <Text style={styles.headerText}>Interview Booking</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold'}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 20, marginLeft: 50 }}>Job Information</Text>
<View style={styles.container}>
<View style={styles.row}>
        <View style={styles.cell}>
          <Text>Company</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey'}}>ASML</Text>
              </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Role</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey'}}>Data Analyst</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Your CV</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'black', fontWeight: '400'}}>MyCv.pdf</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Job Description</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'black', fontWeight: '400'}}>description.pdf</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Job Description text (optional)</Text>
        </View>
        <View style={[styles.cell, { height: 100 }]}>
        <Text style={{color: 'grey'}}>This is my job description</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Date and Time</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{color: 'grey'}}>Selected date and time: Thursday, 2024-05-30 11:00 am (GMT+1:0)</Text>
        </View>
      </View>
      </View>
     
      
      <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 30, marginLeft: 50 }}>Expert's available days and time</Text>
<View style={styles.container}>
      
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Days</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey' }}>Mon, Tue, Wed and Thurs</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Time</Text>
        </View>
        <View style={styles.cell}><Text style={{ color: 'grey' }}>09:00AM-05:00PM</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>Time Zone</Text>
        </View>
        <View style={styles.cell}><Text style={{ color: 'grey' }}>CET</Text>
        </View>
      </View>
    </View>
    
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
        marginTop: 5,
        marginLeft: 50 
      },
  greenBox: {
    width: 920,
    height:550,
    backgroundColor: '#F8F8F8',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
  },
  picker: {
    height: 20,
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderColor: 'black',
    borderWidth: 1, 
    color:'grey',
    fontSize: 14
  },
  buttonplus: {
    backgroundColor: 'coral',
    padding: 5,
    marginLeft: 750, 
    width: 100,
    paddingHorizontal: 20,
    marginTop: 10
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    outline: 'black',
    borderColor: 'black',
    borderWidth: 1
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