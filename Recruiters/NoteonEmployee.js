import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Picker, Modal} from 'react-native';
import OpenModal from './AllSet';
import OpenSchedule2 from './Provideadditional';
import OpenSchedule3 from './AllSet';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';

function MyComponent({ onClose }) {
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);
  const [isAnnualPressed, setIsAnnualPressed] = useState(false);
  const [isMonthlyPressed, setIsMonthlyPressed] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false); // State for the annual modal

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
};

const handleCloseModal3 = () => {
    setModalVisible3(false);
};

  const handleOpenPress2 = () => {
    if (isMonthlyPressed) {
        setModalVisible2(true);
    } else if (isAnnualPressed) {
        setModalVisible3(true);
    }
};

  const handlePress = () => {
    setIsAnnualPressed(prevState => !prevState);
    if (isMonthlyPressed) {
        setIsMonthlyPressed(false);
    }
};

const handlePress2 = () => {
    setIsMonthlyPressed(prevState => !prevState);
    if (isAnnualPressed) {
        setIsAnnualPressed(false);
    }
};
const [fontsLoaded]=useFonts({
  "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf")
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
          <Text style={styles.headerText}>{t("Note on Employee to the expert")}</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 

        
      <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 5, marginLeft: 50, fontStyle: 'italic', fontWeight: '500',fontFamily:"Roboto-Light"}}>
                                            {t("It will be helpful to provide the expert with some detail about Employee Name")}
                                        </Text>
                                        <Text style={{ fontSize: 16, marginLeft: 50, marginBottom: 10, fontStyle: 'italic', fontWeight: '500',fontFamily:"Roboto-Light" }}>
                                            {t("The will guide the expert's guidance and focus.")}
                                        </Text>
       

        <Text style={{ fontWeight: '500', fontSize: 16, marginLeft: 50, marginTop: 20, marginBottom: 5, fontStyle: 'italic', fontFamily:"Roboto-Light"}}>
                                        {t("Who will provide the additional details?")}
                                        </Text>

                                        <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 5 }}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.touchableOpacity,
                                                    { backgroundColor: isAnnualPressed ? '#4A5568' : 'white' }
                                                ]}
                                                activeOpacity={1}
                                                onPress={handlePress}
                                            />
                                            <Text style={{ fontSize: 15,fontFamily:"Roboto-Light" }}> {t("Employee Name, coach or manager")}  </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 30, }}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.touchableOpacity,
                                                    { backgroundColor: isMonthlyPressed ? '#4A5568' : 'white' }
                                                ]}
                                                activeOpacity={1}
                                                onPress={handlePress2}
                                            />
                                            <Text style={{ fontSize: 15,fontFamily:"Roboto-Light" }}> {t("I'll provide it")}  </Text>
                                        </View>

        
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity onPress={handleOpenPress2} style={styles.buttonplus}>
                                                <Text style={styles.buttonTextplus}>{t("Next")}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleOpenPress} style={styles.buttonskip}>
                                                <Text style={styles.buttonTextskip}>{t("Skip")}</Text>
                                            </TouchableOpacity>
                                            </View>
    
    
    </View>
    </View>
  

      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseModal} />
        </View>
      </Modal>

      <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible2}
                                            onRequestClose={handleCloseModal2}
                                        >
                                            <View style={styles.modalContent}>
                                                <OpenSchedule2 onClose={handleCloseModal2} />
                                            </View>
                                        </Modal>
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible3}
                                            onRequestClose={handleCloseModal3}
                                        >
                                            <View style={styles.modalContent}>
                                                <OpenSchedule3 onClose={handleCloseModal3} />
                                            </View>
                                        </Modal>
    </>
);
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    container: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#CCC',
        marginRight: 70, 
        marginTop: 20, 
        marginLeft: 50 
      },
  greenBox: {
    width: 1000,
    height: "100%",
    backgroundColor: '#F8F8F8',
  },
  picker: {
    height: 40,
    width: 450,
    backgroundColor: 'white',
    borderColor: '#206C00',
    borderWidth: 1, 
    color:'black',
    fontSize: 14,
    marginLeft: 50,
    borderRadius: 5
  },
  touchableOpacity: {
        height: 18,
        width: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#4A5568",
        marginRight: 5,
        marginLeft: 30,
    },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    right: 30,
    marginBottom: 5,
    bottom: -30
},
  buttonplus: {
      backgroundColor: 'coral',
      borderRadius: 5,
      padding: 5,
      marginLeft: 360,
      width: 100,
      paddingHorizontal: 20,
      marginBottom: 30
  },
  buttonskip: {
      backgroundColor: 'white',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'coral',
      padding: 5,
      marginLeft: 20,
      width: 100,
      paddingHorizontal: 20,
      marginBottom: 30,
      fontFamily:"Roboto-Light"
  },
  buttonTextplus: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
      fontFamily:"Roboto-Light"
  },
  buttonTextskip: {
      color: 'coral',
      fontSize: 14,
      textAlign: 'center',
  },
  input: {
    height: 40,
    width: 450,
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
    color: '#3F5637',
    fontFamily:"Roboto-Light"
  },
  image: {
    width: 400,
    height: 400,
    marginRight: 30
  },
});

export default MyComponent;