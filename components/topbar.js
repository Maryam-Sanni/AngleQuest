import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LanguageSwitcher from './LanguageSwitcher';
import SettingsModal from './Settings';

const Icon = ({ source, alt, style, onPress }) => {
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
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const navigation = useNavigation();

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
      navigation.navigate('Notifications');
    } else if (index === 1) {
      setShowSettingsModal(true);
    }
  };

  const toggleLanguageSwitcher = () => {
    setShowLanguageSwitcher(!showLanguageSwitcher);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        paddingRight: 40,
        alignItems: "center",
        backgroundColor: "#A2BE95",
        maxWidth: '100%',
        height: 60
      }}
    >
       <Image
       source={require('../assets/33.png')}
        style={{ width: 40, height: 40 }}
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          maxWidth: "70%",
        }}
      >
        <TextInput
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#206C00",
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
            width: 500,
            outline: 'none',
            marginRight: 70,
          }}
          placeholder="Search"
        />
        {icons.map((icon, index) => (
          <Icon
            key={index}
            source={icon.src}
            alt={icon.alt}
            style={{ width: 24, height: 24 }}
            onPress={() => handleIconPress(index)}
          />
        ))}
        <TouchableOpacity onPress={toggleLanguageSwitcher} style={styles.languageButton}>
          <Image
            source={require('../assets/english.png')}
            style={styles.languageIcon}
          />
          <Text style={styles.languageButtonText}>EN</Text>
        </TouchableOpacity>
        <Modal
          visible={showLanguageSwitcher}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowLanguageSwitcher(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowLanguageSwitcher(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <LanguageSwitcher onClose={() => setShowLanguageSwitcher(false)} />
          </View>
        </Modal>
      </View>
      <Modal
        visible={showSettingsModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowSettingsModal(false)}
      >
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
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 10,
  },
  languageIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  languageButtonText: {
    color: '#333',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    width: '20%',
    right: 30,
    top: 60,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 20,
  },
  settingsModalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  settingsModalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MyComponent;
