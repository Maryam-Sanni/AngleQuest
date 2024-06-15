import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language

  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    onClose(); // Close the language switcher (if applicable in your app flow)
  };

  return (
    <View style={styles.container}>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.code}
          onPress={() => changeLanguage(language.code)}
          style={[
            styles.languageButton,
            language.code === selectedLanguage ? { backgroundColor: '#e0e0e0' } : null,
          ]}
        >
          <Image source={language.icon} style={styles.icon} />
          <Text style={styles.language}>{language.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  language: {
    fontSize: 18,
  },
});

export default LanguageSwitcher;
