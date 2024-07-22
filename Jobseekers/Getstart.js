import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../Jobseekers/PickanExpert';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import axios from 'axios';


function MyComponent({ onClose }) {
  const navigation = useNavigation();
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [formModalVisible, setformModalVisible] = useState(false);
  
  const handleOpenPress = () => {
    // Close the main modal
    setMainModalVisible(false);
    setformModalVisible(true);
  
    // Construct the data to send
    const data = {
      specialization: selectedSpecialization,
      role: selectedRole,
      target: selectedTarget
    };
  
    // Make a POST request using Axios
    axios.post('https://crispy-spoon-xg65jq45g6r3prpg-8000.app.github.dev/api/jobseeker/create-jobseeker-send-get-started', data)
      .then(response => {
        console.log('POST request successful:', response.data);
        // Optionally handle success response here
        // Navigate to the next screen or perform other actions
      })
      .catch(error => {
        console.error('Error sending data:', error);
        // Optionally handle error response here
      });
  
    // Show the form modal
    
  
    // Optionally, you can perform other actions related to opening the form modal here
  };
  

  const handleCloseformModal = () => {
    setformModalVisible(false);
    onClose();
  };


  const goToPlans = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('Advice Payment');
    onClose(); // Close the modal
  };

  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
      const {t}=useTranslation()

  return (
    <>
    <Modal
      animationType="slide"
      transparent={true}
      visible={mainModalVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", marginTop: 40, alignItems: 'center' }}>
<View style={styles.greenBox}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("Get Started")}</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 

        <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                                            {t("What is your specialization?")}
                                        </Text>
<Picker
  style={styles.picker} 
>
<Picker.Item label={t("Pick an area of specialization")} value="Pick an area of specialization" />
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

        <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                                            {t("What is your current role?")}
                                        </Text>
<Picker
  style={styles.picker} 
>
  <Picker.Item label={t("Beginner")} value="Beginner" />
  <Picker.Item label={t("Junior")} value="Junior" />
  <Picker.Item label={t("Medior")} value="Medior" />
  <Picker.Item label={t("Senior")} value="Senior" />
  <Picker.Item label={t("Professional")} value="Professional" />
</Picker>

      
     
<Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 30, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                                            {t("What is your next target?")}
                                        </Text>
<Picker
  style={styles.picker} 
>
<Picker.Item label={t("Beginner")} value="Beginner" />
  <Picker.Item label={t("Junior")} value="Junior" />
  <Picker.Item label={t("Medior")} value="Medior" />
  <Picker.Item label={t("Senior")} value="Senior" />
  <Picker.Item label={t("Professional")} value="Professional" />
</Picker>

    
    <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>{t("Next")}</Text>
    </TouchableOpacity>
    </View>
    </View>
    </Modal>
    <Modal
        animationType="slide"
        transparent={true}
        visible={formModalVisible}
        onRequestClose={handleCloseformModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseformModal} />
        </View>
     
      </Modal>
      </>

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
    height: '100%',
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: '80%',
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
    borderRadius: 5,
    padding: 5,
    marginLeft: 700,
    width: 100,
    paddingHorizontal: 20,
    marginTop: 50
},
  buttonTextplus: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily:"Roboto-Light"
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
    color: '#3F5637',
    fontFamily:"Roboto-Light"
  }
});

export default MyComponent;