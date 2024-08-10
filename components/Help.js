import React from 'react';
import { useFonts } from 'expo-font';
import { Modal, Text, View, TouchableOpacity, FlatList, StyleSheet, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

const helpOptions = [
  { id: '1', title: 'FAQs', description: 'Find answers to common questions and troubleshooting tips.', url: 'https://example.com/help-center' },
  { id: '2', title: 'Contact Support', description: 'Reach out to our support team for personalized assistance.', url: 'mailto:ask@anglequest.com' },
  { id: '3', title: 'Guided Tour', description: 'Get an interactive tour of our app\'s features.', url: 'https://example.com/guided-tour' },
  { id: '4', title: 'Tutorials and Guides', description: 'Access detailed tutorials and user manuals.', url: 'https://example.com/tutorials' },
  { id: '5', title: 'Video Tutorials', description: 'Watch video guides on how to use the app.', url: 'https://example.com/video-tutorials' },
  { id: '6', title: 'Community Forum', description: 'Join discussions and get help from other users.', url: 'https://example.com/forum' },
  { id: '7', title: 'AngleQuest AI', description: 'Learn about how AngleQuest AI works and its features.', url: 'https://example.com/anglequest-ai' },
  { id: '8', title: 'System Status', description: 'Check the current status of our systems and services.', url: 'https://example.com/system-status' },
   { id: '9', title: 'Blog', description: 'Read our latest articles and updates on our blog.', url: 'https://example.com/blog' },
  { id: '10', title: 'App Updates', description: 'Stay informed about the latest updates and new features.', url: 'https://example.com/app-updates' },
  { id: '11', title: 'Privacy Policy', description: 'Read about how we protect your privacy and data.', url: 'https://aq.anglequest.com/privacy-policy' },
  { id: '12', title: 'Terms of Service', description: 'Review our terms and conditions for using the app.', url: 'https://aq.anglequest.com/terms-conditions' },
];

const HelpOption = ({ title, description, url }) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.helpOption}>
    <Text style={styles.helpTitle}>{title}</Text>
    <Text style={styles.helpDescription}>{description}</Text>
  </TouchableOpacity>
);

export default function SuggestionModal({ visible, onClose }) {
  const { t } = useTranslation();
  
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{t("Welcome to AngleQuest Help Center")}</Text>
          <FlatList
            data={helpOptions}
            renderItem={({ item }) => <HelpOption {...item} />}
            keyExtractor={item => item.id}
            style={styles.helpList}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '50%',
  },
  closeButton: {
    fontSize: 24,
    color: 'red',
    position: 'absolute',
    right: 20,
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: "Roboto-Light",
  },
  modalTitle: {
    fontSize: 22,
    color: '#206C00',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
  },
  helpList: {
    marginTop: 20,
  },
  helpOption: {
    marginBottom: 15,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpDescription: {
    fontSize: 14,
    color: 'gray',
  },
});
