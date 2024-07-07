import React, { useState } from "react";
import { View, Image, TextInput, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import SettingsModal from './SettingsExpert';

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

const MyComponent = () => {
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const navigation = useNavigation(); // Initialize navigation
  const { i18n, t } = useTranslation();

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

  const handleIconPress = (index) => {
    setSelectedIconIndex(index);
    if (index === 0) {
      navigation.navigate('Notifications'); // Replace 'Notifications' with your actual route name
    } else if (index === 1) {
      setShowSettingsModal(true);
    }
  };

  const toggleLanguageSwitcher = () => {
    setShowSettingsModal(!showSettingsModal);
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

  const onChangeLang = (lang_code) => {
    i18n.changeLanguage(lang_code);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&"}} style={styles.logo} />
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder={t("Search")} />
        {icons.map((icon, index) => (
          <Icon key={index} source={icon.src} alt={icon.alt} style={styles.icon} onPress={() => handleIconPress(index)} />
        ))}
        <Picker selectedValue={i18n.language} onValueChange={onChangeLang} style={styles.picker}>
          {languages.map(({ code, label }) => (
            <Picker.Item key={code} label={label} value={code} />
          ))}
        </Picker>
      </View>
      <Modal visible={showSettingsModal} animationType="fade" transparent={true} onRequestClose={() => setShowSettingsModal(false)}>
        <TouchableWithoutFeedback onPress={() => setShowSettingsModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <SettingsModal onClose={() => setShowSettingsModal(false)} />
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
  logo: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "70%",
  },
  searchInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#206C00",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 500,
    outline: 'none',
    marginRight: 70,
  },
  icon: {
    width: 24,
    height: 24,
  },
  picker: {
    height: 40,
    width: 100,
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
});

export default MyComponent;
