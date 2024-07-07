import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';

const CustomModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const goToProfile = () => {
    onClose(false); // Close the modal
    navigation.navigate('Basic Details');
  };
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)'  }}>
        <View style={{ backgroundColor: '#f7fff4', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10,fontFamily:"Roboto-Light" }}>{t("Complete Your Profile")}</Text>
          <Text style={{fontFamily:"Roboto-Light"}}>{t("Please complete your profile to unlock all features")}.</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity onPress={goToProfile}  style={{ padding: 10, paddingHorizontal: 30, backgroundColor: 'coral', borderRadius: 5, }}>
              <Text style={{ color: 'white',fontFamily:"Roboto-Light" }}>{t("Continue")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClose(false)} style={{ padding: 8, backgroundColor: '#f7fff4', borderRadius: 5, borderColor: 'coral', borderWidth: 1 }}>
              <Text style={{ color: 'coral',fontFamily:"Roboto-Light" }}>{t("Remind me later")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;