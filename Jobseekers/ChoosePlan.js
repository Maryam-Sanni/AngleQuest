import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from '../components/topbar';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';


function MyComponent() {
  const navigation = useNavigation(); // Get navigation object

  const [selectedSection, setSelectedSection] = useState('Standard'); // Set Standard as default selected section

  const handleSectionPress = (sectionName) => {
    setSelectedSection(sectionName);
  };

  const handlePurchasePress = (sectionName) => {
    // Navigate to PaymentDetails page when Purchase button is pressed for Standard or Pro sections
    if (sectionName === 'Standard' || sectionName === 'Pro') {
      navigation.navigate('Payment Details');
    } else {
      // Navigate to BasicDetails page for other sections
      navigation.navigate('Home');
    }
  };
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
      const {t}=useTranslation()

  return (
    <View style={{ height: '90%' }}>
    <Top/ >
    <View style={{ maxWidth: 768, margin: 'auto', textAlign: 'center' }}>
      {/* Heading */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'coral', marginBottom: 5, marginTop: 5,fontFamily:"Roboto-Light" }}>{t("Choose a Plan")} </Text>
      <Text style={{ fontSize: 12, color: 'black', marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Explore our range of plans and select the plan that is the perfect fit for you")} </Text>
      {/* Sections */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Basic Section */}
        <TouchableOpacity onPress={() => handleSectionPress('Basic')} style={{ flex: 1, marginHorizontal: 5, marginVertical: 10, marginRight: 10, backgroundColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: selectedSection === 'Basic' ? 'coral' : 'transparent', borderWidth: selectedSection === 'Basic' ? 2 : 0 }}>
          <View style={{ paddingHorizontal: 6, paddingVertical: 7, backgroundColor: 'white', borderRadius: 12 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Basic")}</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'coral', marginTop: 26, marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Free")}</Text>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{fontFamily:"Roboto-Light"}}>{t("Join for free")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{fontFamily:"Roboto-Light"}}>{t("Pay per interview session with experts")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{fontFamily:"Roboto-Light"}}> {t("Pay for career advice with experts")} </Text>
            </View>
            <TouchableOpacity onPress={handlePurchasePress} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, paddingVertical: 2.5, marginTop: 25, marginBottom: 10, backgroundColor: '#FCBDAA', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{t("Purchase")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Standard Section */}
        <TouchableOpacity onPress={() => handleSectionPress('Standard')} style={{ flex: 1, marginHorizontal: 5, marginVertical: 10, marginRight: 10, borderRadius: 12, backgroundColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderColor: selectedSection === 'Standard' ? 'coral' : 'transparent', borderWidth: selectedSection === 'Standard' ? 2 : 0 }}>
          <View style={{ paddingHorizontal: 6, paddingVertical: 7, backgroundColor: 'white', borderRadius: 12 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 10,fontFamily:"Roboto-Light"}}>{t("Standard")}</Text>
            <Text style={{ justifyContent: 'center', paddingHorizontal: 4, paddingVertical: 0.5, marginTop: 1, marginRight: 120, fontSize: 12, fontWeight: 'bold', color: 'coral', backgroundColor: 'rgba(255, 165, 0, 0.5)', borderRadius: 3,fontFamily:"Roboto-Light" }}>Most Popular</Text>
            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'coral',fontFamily:"Roboto-Light" }}>$29</Text>
              <Text style={{ alignSelf: 'center', fontSize: 16, color: 'black',fontFamily:"Roboto-Light" }}>USD / <Text style={{ fontSize: 10,fontFamily:"Roboto-Light" }}>{t("month")}</Text></Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{fontFamily:"Roboto-Light"}}>{t("Limitless interview sessions with experts")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{fontFamily:"Roboto-Light"}}>{t("Limitless career advice from experts")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{fontFamily:"Roboto-Light"}}> {t("Feedback reassessment")} </Text>
            </View>
            <TouchableOpacity onPress={() => handlePurchasePress('Standard')} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, paddingVertical: 2.5, marginTop: 15, marginBottom: 10, backgroundColor: 'coral', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', fontFamily:"Roboto-Light"}}>{t("Purchase")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Pro Section */}
        <TouchableOpacity onPress={() => handleSectionPress('Pro')} style={{ flex: 1, marginHorizontal: 5, marginVertical: 10, backgroundColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: selectedSection === 'Pro' ? 'coral' : 'transparent', borderWidth: selectedSection === 'Pro' ? 2 : 0 }}>
          <View style={{ paddingHorizontal: 6, paddingVertical: 7, backgroundColor: 'white', borderRadius: 12 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Pro")}</Text>
            <Text style={{ justifyContent: 'center', paddingHorizontal: 4, marginRight: 165, paddingVertical: 0.5, marginTop: 1, fontSize: 12, fontWeight: 'bold', color: 'coral', backgroundColor: 'rgba(255, 165, 0, 0.5)', borderRadius: 3,fontFamily:"Roboto-Light" }}>{t("Save")} $30</Text>
            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'coral' }}>$150</Text>
              <Text style={{ alignSelf: 'center', fontSize: 16, color: 'black',fontFamily:"Roboto-Light" }}>USD / 6 <Text style={{ fontSize: 10,fontFamily:"Roboto-Light" }}>{t("months")}</Text></Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{fontFamily:"Roboto-Light"}}>{t("Limitless interview sessions with experts")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{fontFamily:"Roboto-Light"}}>{t("Limitless career advice from experts")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{fontFamily:"Roboto-Light"}}> {t("Feedback reassessment")} </Text>
            </View>
            <TouchableOpacity onPress={() => handlePurchasePress('Pro')} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, paddingVertical: 2.5, marginTop: 15, marginBottom: 10, backgroundColor: 'coral', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white',fontFamily:"Roboto-Light" }}>{t("Purchase")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

export default MyComponent;
