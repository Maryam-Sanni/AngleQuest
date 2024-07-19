import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from './HomeTop';

const MyComponent = () => {
  const navigation = useNavigation(); // Navigation object
  const [profileImage, setProfileImage] = useState(null); // State to track the selected image

  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setProfileImage(imageUrl);
    }
  };

  const handleShareCV = () => {
    if (profileImage) {
      alert(
        'Thank you for sharing your CV with us. AngleQuest AI will be soon.',
        'Thank you for sharing your CV with us. AngleQuest AI will be soon.'
      );
    } else {
      alert(
        'Please Choose a File',
        'Please Choose a File'
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Top />
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.container}>
          <Image
            source={require('../assets/AnglequestAI.png')}
            style={styles.image}
          />
          <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: '600' }}>
            AI Career Road Map Generator
          </Text>
          
            <Text style={{ fontSize: 25, color: 'black', textAlign: 'center', fontWeight: '600' }}>
              Uncover all the steps you need to take to
              <Text style={{ fontSize: 25, color: '#135837', textAlign: 'center', fontWeight: '600' }}> REACH YOUR NEXT LEVEL</Text>
            </Text>
            
         
          <Text style={{ fontSize: 25, color: 'grey', padding: 10, textAlign: 'center', marginTop: 50 }}>
            Join 18,578 others who have shared their CV to train our model
          </Text>
      
            <TouchableOpacity style={styles.buttonplus} onPress={handleShareCV}>
              <Text style={styles.buttonTextplus}>Share CV</Text>
            </TouchableOpacity>
            <View style={styles.input}>
              <input
                type="file"
                accept="image/*"
                onChange={handleChooseImage}
              />
            </View>
         
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  buttonplus: {
    backgroundColor: '#135837',
    padding: 10,
    borderRadius: 10,
    marginTop: 50,
    width: 200,
  },
  buttonTextplus: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    marginTop: 20,
    width: 150,
    height: 150,
  },
  goimage: {
    width: 100,
    height: 100,
    marginTop: -45,
    marginLeft: -20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginTop: 50,
    textAlign: 'center',
  },
  buttonBeFirst: {
    color: 'darkgreen',
    fontSize: 14,
    marginTop: 20,
    fontWeight: '600',
    padding: 5,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  input: {
    marginTop: 15,
    backgroundColor: 'white',
    borderColor: '#135837',
    borderWidth: 1,
    color: 'black',
    fontSize: 14,
    borderRadius: 10,
    padding: 10,
  },
});

export default MyComponent;
