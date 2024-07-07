import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, ImageBackground, Image, StyleSheet } from 'react-native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import { BlurView } from 'expo-blur';
import OpenModal from '../Jobseekers/PickInterviewer';
import OpenModal2 from '../Jobseekers/NewInterview';
import { useTranslation } from 'react-i18next';

import {useFonts} from "expo-font"
function MyComponent() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const { t } = useTranslation()

    const handleOpenPress = () => {
        setModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };

      const handleOpenPress2 = () => {
        setModalVisible2(true);
      };
    
      const handleCloseModal2 = () => {
        setModalVisible2(false);
      };
      
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
 
  return (
    <ImageBackground
    source={require ('../assets/Background.png') }
  style={{ height: '110%', width: '100%',flex: 1}}
>
<BlurView intensity={70} style={{flex:1}}>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
         <View style={styles.glassBox}>
         <View style={styles.pagecontainer}>
          <View style={{ flex: 1, }}>
          <View style={styles.header}>
            <TouchableOpacity>
            <View style={styles.item}>
                <Image source={require('../assets/list.png')} style={styles.image} />
                <Text style={{color: 'black', fontWeight: '600', marginLeft: 7, fontSize: 16,fontFamily:"Roboto-Light"}}>{t("Interview")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenPress2} >
            <View style={{ position: 'absolute', right: 20, width: 100, backgroundColor: 'coral', borderRadius: 5, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight:'600',fontFamily:"Roboto-Light" }}>+ {t("New")}</Text>
                  </View>
                  </TouchableOpacity>
            </View>
            <View style={styles.box}>
     <Text style={{ fontSize: 19, fontWeight: 'bold', marginTop: 30, marginLeft: 30,fontFamily:"Roboto-Light"}}>{t("About Interview")}</Text>
     <Text style={{ fontSize: 15, color: "black", marginTop: 10, marginLeft: 30, marginRight: 200,fontFamily:"Roboto-Light" }}>{t("Its often not the most qualified candidate on paper that gets the job, its who performs best at the interview. Let our expert to conduct a preparatory interview to help you prepare for your upcoming interview.")}</Text>
     <View style={{flexDirection: 'row'}}>
     <TouchableOpacity onPress={handleOpenPress}>
    <View style={{ justifyContent: "center", paddingHorizontal: 10, paddingVertical: 10, marginTop: 30, marginLeft: 30, backgroundColor: 'coral', borderRadius: 5, width: 150, alignItems: 'center', alignContent: 'center',}}>
                    <Text style={{ fontSize: 13, color: "white", alignText: 'center', fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("Get Interviewed")}</Text>
                  </View>
     </TouchableOpacity>
     <Image source={require('../assets/22.png')} style={styles.boximage} />
      </View>
      </View>
     </View>
            </View>
            </View>
        </ScrollView>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
          <View style={styles.modalContent}>
            <OpenModal onClose={() => handleCloseModal()} />
          </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={handleCloseModal2}
      >
          <View style={styles.modalContent}>
            <OpenModal2 onClose={() => handleCloseModal2()} />
          </View>
      </Modal>

      </BlurView>
    
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pagecontainer: {
    height: 1000,
    backgroundColor: '#f7fff4',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20, 
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderWidth: 2, 
    borderColor: 'rgba(225,225,212,0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 glassBox: {
    height: 1000,
  backgroundColor: 'rgba(225,255,212,0.3)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 30,
    marginLeft: 240,
    marginRight: 30,
    marginBottom: 30,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    marginLeft: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    backgroundColor: 'none',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'coral',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'space-between',
    marginTop: 5
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#206C00'
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 50
  },
  greenBox: {
   width: "100%",
    height:"100%",
    backgroundColor: 'rgba(225,225,212,0.3)',
  },
  blurBackground: {
    flex: 1, 
  },
  box: {
    borderRadius: 10,
    paddingHorizontal: 10,
     backgroundColor: 'white', 
     marginTop: 50,
     marginLeft: 50,
     marginRight: 50, 
     height: 220, 
     shadowColor: '#000',
      shadowOffset: { width: 0, height: 2, }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84,
       elevation: 5, 
        borderColor: '#63EC55',
         borderWidth: 1 
  },
  boximage: {
    width: 150,
    height: 150,
   position: 'absolute',
   right: 20,
   marginTop: -80
  },
});
export default MyComponent;
