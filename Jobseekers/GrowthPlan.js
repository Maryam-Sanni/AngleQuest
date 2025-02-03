import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, ImageBackground, Image, StyleSheet } from 'react-native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import { BlurView } from 'expo-blur';
import OpenModal from '../Jobseekers/Pickyourcoach';
import OpenModal2 from '../Jobseekers/Newgrowth';
import PaymentDetails from './PaymentDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {useFonts} from "expo-font"


function MyComponent() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const { t } = useTranslation()
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
    const [paymentRequired, setPaymentRequired] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
      const fetchPaymentDetails = async () => {
          try {
              const token = await AsyncStorage.getItem('token'); 
              if (!token) {
                  console.error('No authentication token found');
                  return;
              }

              const response = await fetch(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`, 
                      'Content-Type': 'application/json',
                  },
              });

              const data = await response.json();

              // Check if "Pay as you go" is set in the response
              if (data?.PaystackDetail?.payment_detail === 'Pay as you go') {
                  setPaymentRequired(true);
              }
          } catch (error) {
              console.error('Error fetching payment details:', error);
          }
      };

      fetchPaymentDetails();
  }, []);

  const handlePaymentSuccess = () => {
      setPaymentModalVisible(false);
      setPaymentRequired(false);
  };


  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleOpenPress2 = () => {
    if (paymentRequired) {
        setPaymentModalVisible(true);
    } else {
        setModalVisible2(true);
    }
  };
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };
    
      const handleCloseModal2 = () => {
        setModalVisible2(false);
      };
 
      const [fontsLoaded]=useFonts({
        'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
    
    
      })
    
  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
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
          <View style={{ flex: 1,  }}>
          <View style={styles.header}>
            <TouchableOpacity>
              <View style={styles.item}>
                <Image source={require('../assets/list.png')} style={styles.image} />
                <Text style={{color: 'black', fontWeight: '600', marginLeft: 7, fontSize: 16, }}>{t("Growth Plan")}</Text>
              </View>
            </TouchableOpacity>
          
            </View>
     <View style={styles.box}>
     <Text style={{ fontSize: 19, fontWeight: 'bold', marginTop: 30, marginLeft: 30,}}>{t("About Career Growth Plan")}</Text>
     <Text style={{ fontSize: 15, color: "black", marginTop: 5, marginLeft: 30, marginRight: 200, }}>{t("Begin the real change in your career by crafting a clear-cut growth plan with an expert")}</Text>
     <View style={{flexDirection: 'row'}}>
     <TouchableOpacity onPress={handleOpenPress}>
    <View style={styles.button}>
                       <Text style={styles.buttontext}>{t("Schedule an appointment")}</Text>
                  </View>
     </TouchableOpacity>
     <Image source={require('../assets/EmptySch.jpeg')} style={styles.boximage} />
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
  <Modal
    animationType="slide"
    transparent={true}
    visible={paymentModalVisible}
    onRequestClose={() => setPaymentModalVisible(false)}
  >
      <View style={styles.modalContent}>
        <PaymentDetails 
          onClose={() => setPaymentModalVisible(false)} 
          onPaymentSuccess={handlePaymentSuccess} 
        />
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
     height: 250, 
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
   marginTop: -60
  },
  button:{
    backgroundColor: 'coral',
    padding: 15,
    marginTop: 50,
    marginLeft: 20
  },
  buttontext:{
    color: 'white'
  }
});
export default MyComponent;
