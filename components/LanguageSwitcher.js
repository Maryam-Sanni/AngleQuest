import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import i18n from './i18n';

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

const LanguageSwitcher = ({ onClose }) => {
  const changeLanguage = (lang) => {
    i18n.locale = lang;
    onClose();
  };

  return (
    <View style={styles.container}>
      {languages.map((language) => (
        <TouchableOpacity key={language.code} onPress={() => changeLanguage(language.code)} style={styles.languageButton}>
          <Image source={language.icon} style={styles.icon} />
          <Text style={styles.language}>{language.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1000,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  language: {
    fontSize: 16,
  },
});

export default LanguageSwitcher;
