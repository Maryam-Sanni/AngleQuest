import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from './landtop';
import CustomAlert from '../components/CustomAlert';

const MyComponent = () => {
  const navigation = useNavigation(); // Navigation object
  const [profileImage, setProfileImage] = useState(null); // State to track the selected image
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setProfileImage(imageUrl);
    }
  };

  const handleShareCV = () => {
    if (profileImage) {
      setAlertMessage('Thank you for sharing your CV with us. Anglequest AI will be with you soon.');
    } else {
      setAlertMessage('Please choose a file');
    }
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const handleBackPress = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={{backgroundColor: '#001a00', flex: 1}}>
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
            <Text style={{ fontSize: 35, color: 'white', textAlign: 'center', fontWeight: '600' }}>
              Uncover all the steps you need to take
            </Text>
            <Text style={{ fontSize: 35, color: 'white', textAlign: 'center', fontWeight: '600' }}>
              to reach your next level
            </Text>
          </View>
          <Image
            source={require('../assets/AIback.png')}
            style={styles.image}
          />
          <Text style={{ fontSize: 35, color: 'white', padding: 10, textAlign: 'center', marginTop: 10 }}>
            Join 18,578 others who have shared their CV to train our model
          </Text>
          <View style={{ flexDirection: 'column', marginTop: 50, marginBottom: 50, alignSelf: 'center' }}>
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
      <CustomAlert
        visible={alertVisible}
        title="Alert"
        message={alertMessage}
        onConfirm={hideAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#001a00',
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
    width: 350,
    height: 350,
    marginTop: 20,
  },
  back: {
    marginTop: 20,
    marginLeft: 100,
    width: 100,
    height: 100,
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
