import React, { useState } from "react";
import { View, Image, TextInput, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Text, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import SettingsModal from './SettingsExpert';
import OpenModal from '../Experts/TourGuide';

const Icon = ({ source, style, onPress }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <TouchableOpacity onPress={onPress} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <View style={[
          { backgroundColor: isHovered ? '#EEFFF8' : 'transparent', borderRadius: 20 },
          isHovered && { borderColor: '#EEFFF8' }
        ]}>
        <Image
          source={{ uri: source }}
          style={[style, { margin: 8 }]}
        />
      </View>
    </TouchableOpacity>
  );
};

const PickerItem = ({ label, icon, onPress }) => (
  <TouchableOpacity style={styles.pickerItem} onPress={onPress}>
    <Image source={icon} style={styles.pickerItemIcon} />
    <Text style={styles.pickerItemText}>{label}</Text>
  </TouchableOpacity>
);

const MyComponent = () => {
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const navigation = useNavigation(); // Initialize navigation
  const { i18n, t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);


  const icons = [
    {
      src:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/20bc5485e6416336b3f6bb2335faf463679bfa1e55902e6397d8473a8fb5d15f?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
      alt: "Icon 1",
    },
    {
      src:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/365ad64d295ea0276c8bffec19bb298c7b622a5a12d7bfcc93b77c7da295c4e5?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
      alt: "Icon 2",
    },
  ];

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

  const handleIconPress = (index) => {
    setSelectedIconIndex(index);
    if (index === 0) {
      navigation.navigate('MyNotifications'); // Replace 'Notifications' with your actual route name
    } else if (index === 1) {
      setShowSettingsModal(true);
    }
  };

  const toggleLanguageSwitcher = () => {
    setShowLanguagePicker(!showLanguagePicker);
  };

  const onChangeLang = (lang_code) => {
    i18n.changeLanguage(lang_code);
    setShowLanguagePicker(false); // Close the language picker after selecting a language
  };

  // Determine the currently selected language object
  const selectedLanguage = languages.find(lang => lang.code === i18n.language);

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&"}} style={styles.logo} />
      <TouchableOpacity onPress={handleOpenPress} >
      <Text style={styles.languageButtonText}>Leverage your expertise to mentor and assess top talents. <Text style={{textDecorationLine: 'underline'}}> Take a Tour</Text></Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <OpenModal onClose={() => setModalVisible(false)} />
  </Modal>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder={t("Search")} />
        {icons.map((icon, index) => (
          <Icon key={index} source={icon.src} alt={icon.alt} style={styles.icon} onPress={() => handleIconPress(index)} />
        ))}
        <TouchableOpacity onPress={toggleLanguageSwitcher} style={styles.languageButton}>
          <Image source={selectedLanguage.icon} style={styles.languageIcon} />
          <Text style={styles.languageButtonText}>{selectedLanguage.label}</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showSettingsModal} animationType="fade" transparent={true} onRequestClose={() => setShowSettingsModal(false)}>
        <TouchableWithoutFeedback onPress={() => setShowSettingsModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <SettingsModal onClose={() => setShowSettingsModal(false)} />
        </View>
      </Modal>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingRight: 40,
    alignItems: "center",
    backgroundColor: "#A2BE95",
    maxWidth: '100%',
    height: 60,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logo: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    flexDirection: "row",
  },
  searchInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#206C00",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 400,
    outline: 'none',
    marginRight: 30,
  },
  icon: {
    width: 24,
    height: 24,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#206C00',
    marginLeft: 30,
  },
  languageIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  languageButtonText: {
    color: '#206C00',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    width: '20%',
    right: 10,
    top: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
  },
  languageModalContent: {
    position: 'absolute',
    width: '20%',
    right: 10,
    top: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pickerItemIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  pickerItemText: {
    fontSize: 16,
  },
});

export default MyComponent;
