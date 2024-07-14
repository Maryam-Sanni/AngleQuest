import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
 
const PickerItem = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.pickerItem} onPress={onPress}>
    <Image source={icon} style={styles.pickerItemIcon} />
    <Text style={styles.pickerItemText}>{label}</Text>
  </TouchableOpacity>
);

const MyComponent = () => {
  const navigation = useNavigation();
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const { i18n, t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false); // For handling the modal visibility

  const handleXPress = () => {
    navigation.navigate('Join Recruitangle');
  };

  const languages = [
    { code: 'en', label: 'English', icon: require('../assets/english.png') },
    { code: 'nl', label: 'Dutch', icon: require('../assets/dutch.png') },
    { code: 'es', label: 'Spanish', icon: require('../assets/spanish.png') },
    { code: 'fr', label: 'French', icon: require('../assets/french.png') },
    { code: 'de', label: 'German', icon: require('../assets/german.png') },
    { code: 'zh', label: 'Mandarin', icon: require('../assets/mandarin.png') },
    { code: 'hi', label: 'Hindi', icon: require('../assets/hindi.png') },
    { code: 'ar', label: 'Arabic', icon: require('../assets/arabic.png') },
    { code: 'bn', label: 'Bengali', icon: require('../assets/bengali.png') },
    { code: 'pt', label: 'Portuguese', icon: require('../assets/portuguese.png') },
  ];

  const toggleLanguageSwitcher = () => {
    setShowLanguagePicker(!showLanguagePicker);
  };

  const onChangeLang = (lang_code) => {
    i18n.changeLanguage(lang_code);
    setShowLanguagePicker(false);
  };

  const selectedLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
          style={styles.logo}
        />
        <Text style={styles.headerText}>AngleQuest</Text>
        
        <TouchableOpacity onPress={toggleLanguageSwitcher} style={styles.languageButton}>
          <Image source={selectedLanguage.icon} style={styles.languageIcon} />
          <Text style={styles.languageButtonText}>{selectedLanguage.code}</Text>
        </TouchableOpacity>
        <Modal visible={showLanguagePicker} animationType="fade" transparent={true} onRequestClose={() => setShowLanguagePicker(false)}>
          <TouchableWithoutFeedback onPress={() => setShowLanguagePicker(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.languageModalContent}>
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <PickerItem
                  label={item.label}
                  icon={item.icon}
                  onPress={() => onChangeLang(item.code)}
                />
              )}
            />
          </View>
        </Modal>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 5,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'darkgreen',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'white',
    position: 'absolute',
    right: 20
  },
  languageIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  languageButtonText: {
    color: 'black',
    fontSize: 16
  },
  joinButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'coral',
    padding: 10,
    position: 'absolute',
    right: 20,
  },
  joinButtonText: {
    color: 'coral',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  languageModalContent: {
    position: 'absolute',
    width: '50%',
    right: 10,
    top: 50,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  pickerItemIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  pickerItemText: {
    fontSize: 18,
  },
  arrowdown: {
    width: 20,
    height: 20,
    marginRight: 40
  },
  topicons: {
    width: 20,
    height: 20,
    marginLeft: 30
  },
  megaphone: {
    width: 23,
    height: 23,
   position: "absolute",
   right: 280
  },
  search: {
    width: 23,
    height: 23,
   position: "absolute",
   right: 330
  },
});

export default MyComponent;
