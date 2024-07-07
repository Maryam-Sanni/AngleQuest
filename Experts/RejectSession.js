import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

export default function SessionRejectConfirmation() {
    const navigation = useNavigation();
  const handlegobackpress = () => {
    navigation.navigate('All Sessions'); // Navigate to Home screen
  };
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })
        const {t}=useTranslation()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{ position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 25 }}>
        <View style={{ width: 100, height: 100, position: 'relative' }}>
          <View style={{ width: 100, height: 100,  position: 'absolute', backgroundColor: '#F12B2B', borderRadius: 50 }}>
            <Text style={{ color: 'white', fontSize: 80, textAlign: 'center', lineHeight: 100,fontFamily:"Roboto-Light" }}>?</Text>
          </View>
        </View>
        <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: '600',fontFamily:"Roboto-Light" }}>{t("Are you sure you want to reject this session?")}</Text>
        <View style={{ padding: 20, paddingTop: 5, paddingBottom: 50, backgroundColor: '#F4F4F4', borderRadius: 5, width: 500, }}>
          <TextInput
            style={{ padding: 6, marginTop: 2.5, fontSize: 12, fontWeight: 'normal', color: '#6B7280', borderWidth: 1, outline: 'none', borderColor: '#F4F4F4', borderRadius: 5 }}
            placeholder="Give reasons..."
          />
        </View>
         <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity onPress={handlegobackpress}>
          <View style={{ width: 135, height: 40, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, backgroundColor: 'white', borderRadius: 5, borderWidth: 1, borderColor: '#F12B2B', justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
            <Text style={{ textAlign: 'center', color: '#FF7F50', fontSize: 13, fontWeight: '500',fontFamily:"Roboto-Light"}}>{t("Go back")}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Handle Confirm press */}}>
          <View style={{ width: 135, height: 40, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, backgroundColor: '#F12B2B', borderRadius: 5,  justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 13, fontWeight: '500', fontFamily:"Roboto-Light"}}>{t("Confirm")}</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
