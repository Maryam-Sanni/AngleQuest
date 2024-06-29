import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, Modal, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import OpenModal from './EditEmployee';
import OpenModal2 from './ProvideNote';
import OpenModal3 from './SetMeeting';
import { useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';

const ScheduledMeetingsTable = () => {
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisible2, setModalVisible2] = useState(false);
  const [ModalVisible3, setModalVisible3] = useState(false);
    

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
    onClose();
  };

  const handleOpenPress3 = () => {
    setModalVisible3(true);
  };

  const handleCloseModal3 = () => {
    setModalVisible3(false);
    onClose();
  };
const {t}=useTranslation()
const [fontsLoaded]=useFonts({
  'Varta-Light':require("../assets/fonts/Varta-Light.ttf"),
  'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
})

  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
      
      <Text style={styles.title}>{t("Manage Assigned Employees")}</Text>
      <View style={styles.table}>
      <View style={styles.row}>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>{t("Name")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>{t("Specialization")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>{t("Rating")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>{t("Target Level")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}> </Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}> </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity onPress={handleOpenPress} >
            <Text style={{textDecoration: 'underline'}}>Larrisa Omreh</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Excellent</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Senior</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress2} style={styles.cell2}>
          <Text style={styles.add}>{t("Note")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress3} style={styles.cell2}>
          <Text style={styles.open}>{t("Meeting")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <TouchableOpacity onPress={handleOpenPress} >
            <Text style={{textDecoration: 'underline'}}>Jerry Bassey</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Satisfactory</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Professional</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell}>
          <Text style={styles.add}>{t("Note")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress3} style={styles.cell}>
          <Text style={styles.open}>{t("Meeting")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
          <TouchableOpacity onPress={handleOpenPress} >
            <Text style={{textDecoration: 'underline'}}>Anthony Okafor</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>SAP FI</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Outstanding</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Medior</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell2}>
          <Text style={styles.add}>{t("Note")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress3} style={styles.cell2}>
          <Text style={styles.open}>{t("Meeting")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
          <TouchableOpacity onPress={handleOpenPress} >
            <Text style={{textDecoration: 'underline'}}>Fatimah Hussain</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>Power Platform</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Excellent</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Professional</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell}>
          <Text style={styles.add}>{t("Note")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenPress3} style={styles.cell}>
          <Text style={styles.open}>{t("Meeting")}</Text>
          </TouchableOpacity>
        </View>
       
        

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
        visible={ModalVisible2}
        onRequestClose={handleCloseModal2}
      >
        <View style={styles.modalContent}>
          <OpenModal2 onClose={handleCloseModal2} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible3}
        onRequestClose={handleCloseModal3}
      >
        <View style={styles.modalContent}>
          <OpenModal3 onClose={handleCloseModal3} />
        </View>
      </Modal>
      </View>
      
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
    marginTop: 30,
    marginLeft: 50,
    color: "#63EC55",
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'flex-start',
    fontFamily:"Roboto-Light"
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
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
   width: 750,
    height: 550, 
    marginTop: 30,
    backgroundColor: 'rgba(125,125,125,0.3)',
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
  },
  open: {
    color: "black",
     fontSize: 14,
      borderColor: "#63EC55", 
      borderWidth: 2, 
      padding: 5, 
      paddingHorizontal: 15, 
      borderRadius: 5
},
add: {
  color: "black",
   fontSize: 14,
    borderColor: "#206C00", 
    borderWidth: 2, 
    padding: 5, 
    paddingHorizontal: 15, 
    borderRadius: 5
},
});

export default ScheduledMeetingsTable;
