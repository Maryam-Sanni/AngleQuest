import React from 'react';
import { useFonts } from 'expo-font';
import { Modal, Text, View, TouchableOpacity, FlatList, StyleSheet, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';

const helpOptions = [
  { id: '1', title: 'Help Center', description: 'Find answers to common questions and troubleshooting tips.', url: 'https://example.com/help-center' },
  { id: '2', title: 'Contact Support', description: 'Reach out to our support team for personalized assistance.', url: 'mailto:support@example.com' },
  { id: '3', title: 'Guided Tour', description: 'Get an interactive tour of our app\'s features.', url: 'https://example.com/guided-tour' },
  { id: '4', title: 'Tutorials and Guides', description: 'Access detailed tutorials and user manuals.', url: 'https://example.com/tutorials' },
  { id: '5', title: 'Video Tutorials', description: 'Watch video guides on how to use the app.', url: 'https://example.com/video-tutorials' },
  { id: '6', title: 'Community Forum', description: 'Join discussions and get help from other users.', url: 'https://example.com/forum' },
  { id: '7', title: 'Feedback Form', description: 'Submit feedback or suggestions about the app.', url: 'https://example.com/feedback-form' },
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
          <Text style={styles.modalTitle}>{t("Help Center")}</Text>
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
    width: '80%',
  },
  closeButton: {
    fontSize: 18,
    color: 'grey',
    position: 'absolute',
    right: 20,
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: "Roboto-Light",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    fontFamily: "Roboto-Light",
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
