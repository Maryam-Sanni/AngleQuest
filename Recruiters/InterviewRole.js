import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Modal} from 'react-native';
import DateTimePickerModal from "../components/DateTimePickerModal";
import OpenModal from './CandidatesInfo';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

function MyComponent({ onClose }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [mainModalVisible, setMainModalVisible] = useState(true);
  const [ModalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => {
    setMainModalVisible(false);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleConfirmDateTime = (dateTime) => {
    setSelectedDateTime(dateTime);
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setProfileImage(imageUrl);
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
<View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} // replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.headerText}>{t("Interview Booking")}</Text>
       
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>
            ✕
          </Text>
        </TouchableOpacity>
        </View> 
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginTop: 20, marginLeft: 50,fontFamily:"Roboto-Light" }}>{t("Role Information")}</Text>
<View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Role")}</Text>
        </View>
        <View style={styles.cell}>
           <TextInput
            placeholder="Data Analyst"
            placeholderTextColor="grey"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}> </Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder=" "
            placeholderTextColor="grey"
            multiline
            style={[styles.input, { height: 50 }]}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Job Description")}</Text>
        </View>
        <View style={styles.cell}>
        <input
                type="file"
                accept="image/*"
                onChange={handleChooseImage}
                style={{ marginTop: 5 }}
              />
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Job Description text (optional)")}</Text>
        </View>
        <View style={styles.cell}>
        <TextInput
            placeholder="This is my job description"
            placeholderTextColor="grey"
            multiline
            style={[styles.input, { height: 100 }]}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Date and Time")}</Text>
        </View>
        <View style={styles.cell}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={{color: 'grey', borderWidth: 1, borderColor: 'black',fontFamily:"Roboto-Light" }}>{t("Selected date and time")}: {selectedDateTime}</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
     
      
      <Text style={{ fontSize: 15, color: 'black', fontWeight: '500', marginTop: 30, marginLeft: 50,fontFamily:"Roboto-Light" }}>{t("Expert's available days and time")}</Text>
<View style={styles.container}>
      
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Days")}</Text>
        </View>
        <View style={styles.cell}>
        <Text style={{ color: 'grey',fontFamily:"Roboto-Light" }}>Mon, Tue, Wed and Thurs</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Time")}</Text>
        </View>
        <View style={styles.cell}><Text style={{ color: 'grey',fontFamily:"Roboto-Light" }}>09:00AM-05:00PM</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text>{t("Time Zone")}</Text>
        </View>
        <View style={styles.cell}><Text style={{ color: 'grey',fontFamily:"Roboto-Light" }}>CET</Text>
        </View>
      </View>
    </View>
    <TouchableOpacity onPress={handleOpenPress} style={styles.buttonplus} >
      <Text style={styles.buttonTextplus}>{t("Next")}</Text>
    </TouchableOpacity>

    </ScrollView>
    </View>
   


</View>
</Modal>
<DateTimePickerModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDateTime}
        onCancel={handleCancelModal}
      />
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
    </>
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
        borderWidth: 1,
        borderColor: '#CCC',
        marginRight: 70, 
        marginTop: 10,
        marginLeft: 50 
      },
  greenBox: {
    width: 920,
    height: "100%",
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
    borderRadius: 5,
    padding: 5,
    marginLeft: 750, 
    width: 100,
    paddingHorizontal: 10,
    marginTop: 10
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