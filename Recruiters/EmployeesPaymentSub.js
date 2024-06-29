import React, { useState, useTransition } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import OpenModal from './EmployeeStatus';
import { useTranslation } from 'react-i18next';

const ScheduledMeetingsTable = () => {
    const [ModalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
        setModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
        onClose();
      };
const {t}=useTranslation()
  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
      
      <Text style={styles.title}>{t("All Employees")}</Text>
      <View style={styles.table}>
      <View style={styles.row}>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>{t("Name")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>{t("Created On")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>{t("Renewal Date")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>{t("Status")}</Text>
          </View>
          <View style={styles.cell}>
          <Text style={{fontWeight: '600', fontSize: 14}}>{t("Update")}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>Maryam Sanni</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>21-02-23</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>22-02-24</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{t("Active")}</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell2}>
          <Text style={styles.open}>{t("Update")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>Eniobanke Jeremiah</Text>
          </View>
          <View style={styles.cell}> 
            <Text style={styles.cellText}>06-05-23</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>07-05-24</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{t("Active")}</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell}>
          <Text style={styles.open}>{t("Update")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>King Royale</Text>
          </View>
          <View style={styles.cell2}> 
            <Text style={styles.cellText}>18-04-23</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>19-04-24</Text>
          </View>
          <View style={styles.cell2}>
            <Text style={styles.cellText}>{t("Active")}</Text>
          </View>
          <TouchableOpacity onPress={handleOpenPress} style={styles.cell2}>
          <Text style={styles.open}>{t("Update")}</Text>
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
  picker: {
    height: 30,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 2, 
    color:'black',
    borderRadius: 5,
    fontSize: 14
  },
  picker2: {
    height: 30,
    width: '100%',
    backgroundColor: 'rgba(225,225,212,0.05)',
    borderColor: 'grey',
    borderWidth: 2, 
    color:'black',
    borderRadius: 5,
    fontSize: 14
  },
  greenBox: {
    flex: 1,
   width: "85%",
    height: 550, 
    marginTop: 30,
    backgroundColor: 'rgba(125,125,125,0.3)',
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    marginLeft: 50,
    marginBottom: 30
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
  },
  open: {
    color: "white",
     fontSize: 14,
      backgroundColor: "coral", 
      padding: 5, 
      paddingHorizontal: 15, 
      borderRadius: 5
},
});

export default ScheduledMeetingsTable;
