import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Topbar from '../components/expertstopbar';
import Sidebar from '../components/expertssidebar';
import Transactions from '../components/Transactions';
import OpenModal from '../Experts/OpenWithdraw';
import { useNavigate } from "react-router-dom";
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

 
function MyComponent() {
  const navigate = useNavigate();
    const [isBidHovered, setIsBidHovered] = useState(false);
    const [isOfferHovered, setIsOfferHovered] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

    const goToOffers= () => {
       navigate('/earnings');
      };

      const goToBids = () => {
      navigate('/withdrawal');
      };
  
      const [fontsLoaded]=useFonts({
        "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
            })
            const {t}=useTranslation()

  return (
    <View style={{backgroundColor: '#11412C', flex: 1}}>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={{ marginLeft: 270, backgroundColor: '#11412C'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goToOffers} 
            underlayColor={isOfferHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsOfferHovered(true)}
            onMouseLeave={() => setIsOfferHovered(false)}> 
              <View style={styles.item}>
                <Image source={require('../assets/earnings.png')} style={styles.image} />
                <Text style={[styles.headertext, isOfferHovered && { color: 'coral' }]}>{t("Earnings")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToBids}
            underlayColor={isBidHovered ? 'transparent' : 'transparent'}
            onMouseEnter={() => setIsBidHovered(true)}
            onMouseLeave={() => setIsBidHovered(false)} >
              <View style={styles.item}>
                <Image source={require('../assets/withdrawal.png')} style={styles.image} />
                <Text style={[styles.headertext, isBidHovered && { color: 'coral' }]}>{t("Withdrawal")}</Text>
              </View>
            </TouchableOpacity>
            
          </View>
          <TouchableOpacity onPress={handleOpenPress} >
    <View style={{ justifyContent: "flex-start", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5, borderColor: "none", backgroundColor: 'rgba(225,225,212,0.3)', width: 150, alignItems: 'center', marginTop: 20, marginLeft: 50,  }}>
                    <Text style={{ fontSize: 13, color: "black", alignText: 'center', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Request Withdrawal")}</Text>
                  </View>
     </TouchableOpacity>

          
        <Text style={{fontSize: 14, fontWeight: '500', marginTop: 10, position: 'absolute', right: 60, color: 'coral',fontFamily:"Roboto-Light" }}>{t("Total Balance")}: $1180</Text>
 
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
 <Transactions />

  <View style={styles.greenBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 50, }}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bd6743481c726e33bcb35466888d1e3911e6448a2e87aa46de6fd902c814c762?' }}
              style={{ width: 80, height: 20, marginRight: 50, marginTop: -40 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 10,fontFamily:"Roboto-Light" }}>Paypal</Text>
               <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>$2.00 {t("USD per withdrawal")}</Text>
               <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("Paypal may charge additional fee per transaction (sending and withdrawing)")}</Text>
            </View>
            <TouchableOpacity style={{ position: 'absolute', right: 80, paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -10 }}>
              <Text style={{ color: 'coral', fontSize: 14,fontFamily:"Roboto-Light" }}>{t("Set up")}</Text>
            </TouchableOpacity>
          </View>
       
             <View style={{ marginTop: 20, marginLeft: 50, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image
             source={require('../assets/payoneerlogo.png')}
              style={{ width: 110, height: 21, marginRight: 25, marginTop: -40 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600',fontFamily:"Roboto-Light" }}>Payoneer</Text>
              <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("$2.00 USD per withdrawal")}</Text>
              <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("Payoneer charges additional fees to withdraw funds. Create a Payoneer account")} <TouchableOpacity style={{ color: '#32CD32' }}>here</TouchableOpacity></Text>
            </View>
            <TouchableOpacity style={{ position: 'absolute', right: 80, paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -5 }}>
              <Text style={{ color: 'coral', fontSize: 14,fontFamily:"Roboto-Light"  }}>{t("Set up")}</Text>
            </TouchableOpacity>
          </View>
        </View>   
               <View style={{ marginTop: 8, marginHorizontal: 5, marginLeft: 50, marginBottom: 50}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f8fcfecb3d17bd589f01cbad97bd1c71693401d4530ffd86ee9536cd1effb618?' }}
              style={{ width: 35, height: 35, marginRight: 95, marginTop: -20 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("Wire Transfer")}</Text>
               <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>$25.00 {t("USD per wire to any bank")}</Text>
             <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("Up to 7 business days to receive funds")}</Text>
            </View>
            <TouchableOpacity style={{  position: 'absolute', right: 80, paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -10 }}>
              <Text style={{ color: 'coral', fontSize: 14,fontFamily:"Roboto-Light"  }}>{t("Set up")}</Text>
            </TouchableOpacity>
          </View>
        </View>       
              </View>
</View>
          
          
        </ScrollView>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10
      },
  header: {
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headertext: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    fontFamily:"Roboto-Light"
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 100
  },
  greenBox: {
   width: "90%",
    paddingBottom: 10,
    marginBottom: 20,
    marginLeft: 50, 
    borderRadius: 20,
    backgroundColor: 'rgba(225,225,212,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 50,
    padding: 20
  },
});

export default MyComponent;
