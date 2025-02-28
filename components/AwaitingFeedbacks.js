import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import OpenSchedule from '../Experts/OpenScheduled';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const {t}=useTranslation()
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
      <Text style={styles.title}>{t("Awaiting Feedback")}</Text>
      
      <View style={styles.table}>
      <View style={styles.row}>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14 }}>{t("Name")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14 }}>{t("Role")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14 }}>{t("Account Type")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14 }}>{t("Date")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={{color: "white", fontSize: 14 }}> </Text>
          </View>
        </View> 
        <View style={styles.row}>
          <View style={styles.cell2}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar4.png')} style={styles.image} />
            <Text style={styles.cellText}>Maryam Bakahli</Text>
          </View>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>SAP Finance Junior</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{t("Individual Account")}</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>31/Mar, 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell2} onPress={handleOpenPress}>
          <Text style={{color: "#206C00", fontSize: 14,fontFamily:"Roboto-Light"}}>{t("Open")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <View style={{flexDirection: 'row'}}>
          <Image source={require('../assets/useravatar.jpg')} style={styles.image} />
            <Text style={styles.cellText}>Patrick Oche</Text>
          </View>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Power Platform Dev</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{t("Corporate Account")}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>29/Mar, 2024</Text>
          </View>
          <TouchableOpacity style={styles.cell} onPress={handleOpenPress}>
          <Text style={{color: "#206C00", fontSize: 14,fontFamily:"Roboto-Light"}}>{t("Open")}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
          <OpenSchedule onClose={() => handleCloseModal()} />
          </View>
      </Modal>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    marginTop: 20,
    marginLeft: 50,
    color: "black",
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 200,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 50, marginRight: 50
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
   backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
    backgroundColor: 'none',
    padding: 10,
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
  },
  
  greenBox: {
    flex: 1,
   width: "90%",
    height:250,
    marginBottom: 20,
    marginLeft: 50, 
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 30, 
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  cellText: {
    textAlign: 'center',
    fontFamily:"Roboto-Light"  },
  tableheaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: -5,
    borderRadius: 25
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
  },
  
});

export default ScheduledMeetingsTable;