import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from './HomeTop';
import BottomTab from './BottomNav';

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
              style={styles.back}
            />
          <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', marginTop: 30 }}>
            AI CAREER ROAD MAP GENERATOR
          </Text>
          <View style={{ flexDirection: 'column', marginTop: 30 }}>
            <Text style={{ fontSize: 25, color: 'white', textAlign: 'center', fontWeight: '600' }}>
              Uncover all the steps you need to take
            </Text>
            <Text style={{ fontSize: 25, color: 'white', textAlign: 'center', fontWeight: '600' }}>
              to reach your next level
            </Text>
          </View>
          <Image
            source={require('../assets/AIback.png')}
            style={styles.image}
          />
          <Text style={{ fontSize: 25, color: 'white', padding: 10, textAlign: 'center', marginTop: 10 }}>
            Join 18,578 others who have shared their CV to train our model
          </Text>
      
          <View style={{ flexDirection: 'column', marginTop: 50, marginBottom: 50 }}>
          <View style={styles.input}>
              <input
                type="file"
                accept="image/*"
                onChange={handleChooseImage}
                style={{ color: 'white' }} // Added style to change input text color to white
              />
            </View>
            <TouchableOpacity style={styles.buttonplus} onPress={handleShareCV}>
              <Text style={styles.buttonTextplus}>Share CV</Text>
            </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
      <BottomTab navigation={navigation} />
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
    backgroundColor: '#001a00',
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
    borderWidth: 1,
    borderColor: 'white',
    padding: 12,
    borderRadius: 20,
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
    width: 200,
    height: 200,
  },
  back: {
    marginTop: 20,
    marginLeft: 20,
    width: 60,
    height: 60,
    alignSelf: 'flex-start'
  },
  input: {
    color: 'white',
    fontSize: 14,
    padding: 10,
    marginBottom: 10,
  },
});

export default MyComponent;
