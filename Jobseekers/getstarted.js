import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OpenModal from '../Jobseekers/Getstart';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';


function MyComponent({ onClose }) {
  const navigation = useNavigation();
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [formModalVisible, setformModalVisible] = useState(false);
  
  const handleOpenPress = () => {
    // Close the main modal
    setMainModalVisible(false);
    setformModalVisible(true);
  };

  const handleCloseformModal = () => {
    setformModalVisible(false);
    onClose();
  };

  const goToPlans = () => {
    // Navigate to ExpertsProfile screen when the button is clicked
    navigation.navigate('Use AI');
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
    <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: 'center', marginTop: 40}}>
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

        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                                            {t("Welcome to AngleQuest")}
                                        </Text>

    <Text style={{ fontWeight: '500', fontSize: 16, textAlign: 'center', marginTop: 20, marginBottom: 5,fontFamily:"Roboto-Light" }}>
                                            {t("Begin by using a personalized AI to determine your trajectory or manually choose your targets and goals")}
                                        </Text>
        
 <View style={{ flexDirection: 'row', marginTop: 50 }}>
    <TouchableOpacity onPress={goToPlans} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>{t("Use AI")}</Text>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>{t("Continue without AI")}</Text>
    </TouchableOpacity>
    </View>
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
    padding: 5,
    marginRight: 20,
    marginLeft: 100,
    width: 200,
    height: 30,
    paddingHorizontal: 20,
    borderRadius: 5
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