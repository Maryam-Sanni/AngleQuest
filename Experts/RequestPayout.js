import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })
        const {t}=useTranslation()

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <View style={{ flex: 1, paddingVertical: 20, backgroundColor: 'white', marginLeft: 230, marginRight: -400, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <View style={{ flex: 1, marginRight: 5, maxWidth: '70%' }}>
               <View style={{ flexDirection: 'row' }}>
               <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#206C00',  marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Request Payout")}</Text>
                <Text style={{ fontSize: 10, fontWeight: '500', color: 'grey', marginBottom: 20, marginTop: 5,fontFamily:"Roboto-Light" }}>{t("Payout possible after a minum accumulation of $100")}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', marginLeft: 720 }}>
              <Text style={{ fontSize: 14, fontWeight: '600',fontFamily:"Roboto-Light"  }}>{t("Available balance")}</Text>
              <Text style={{ fontSize: 17, color: '#206C00', fontWeight: '600', marginTop: 5,fontFamily:"Roboto-Light"  }}>$1,234.00</Text>
            </View>
              </View>
              <View style={{ marginBottom: 10, marginTop: 30 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Recommended method for you")}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ca5a7febc964f7c0b83704af79ecc3672f36012e048830bcf05e2a3d4c39b03d?' }}
                style={{ width: 35, height: 35, marginRight: 95, marginTop: -20 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("Local Bank")}</Text>
                <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>• {t("$0.99 USD per withdrawal")}</Text>
                <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>• {t("Withdraw funds directly into your local bank")}</Text>
              </View>
            
            <TouchableOpacity style={{ alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 8, backgroundColor: 'coral', borderRadius: 5 }}>
              <Text style={{ color: 'white', fontSize: 14,fontFamily:"Roboto-Light" }}>{t("Withdraw")}</Text>
            </TouchableOpacity>
          </View>
              
               <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 10, marginLeft: 5, marginRight: 20 }} />   
               
               <View style={{ marginTop: 20, marginHorizontal: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bd6743481c726e33bcb35466888d1e3911e6448a2e87aa46de6fd902c814c762?' }}
              style={{ width: 80, height: 20, marginRight: 50, marginTop: -40 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 10,fontFamily:"Roboto-Light" }}>Paypal</Text>
               <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("$2.00 USD per withdrawal")}</Text>
               <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("Paypal may charge additional fee per transaction (sending and withdrawing)")}</Text>
            </View>
            <TouchableOpacity style={{ alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -10 }}>
              <Text style={{ color: 'coral', fontSize: 14,fontFamily:"Roboto-Light" }}>{t("Withdraw")}</Text>
            </TouchableOpacity>
          </View>
        </View>
             <View style={{ marginTop: 20 }}>
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
            <TouchableOpacity style={{ alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -5 }}>
              <Text style={{ color: 'coral', fontSize: 14,fontFamily:"Roboto-Light"  }}>{t("Withdraw")}</Text>
            </TouchableOpacity>
          </View>
        </View>   
               <View style={{ marginTop: 8, marginHorizontal: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f8fcfecb3d17bd589f01cbad97bd1c71693401d4530ffd86ee9536cd1effb618?' }}
              style={{ width: 35, height: 35, marginRight: 95, marginTop: -20 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("Wire Transfer")}</Text>
               <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("$25.00 USD per wire to any bank")}</Text>
             <Text style={{ fontSize: 13, marginBottom: 5,fontFamily:"Roboto-Light" }}>{t("Up to 7 business days to receive funds")}</Text>
            </View>
            <TouchableOpacity style={{  alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -10 }}>
              <Text style={{ color: 'coral', fontSize: 14,fontFamily:"Roboto-Light"  }}>{t("Withdraw")}</Text>
            </TouchableOpacity>
          </View>
        </View>       
              </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MyComponent;

