import { useFonts } from 'expo-font';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useTranslation } from 'react-i18next';

function MyComponent({ onClose }) {
  const [fontsLoaded]=useFonts({
    'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
  })
  const {t}=useTranslation()

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.greenBox}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{fontFamily:"Roboto-Light"}}>✕</Text>
          </TouchableOpacity>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.name}>Joop Melcher</Text>
              <View style={styles.statusDot} />
            </View>
            <Text style={styles.expertText}>{t("Expert")}</Text>
            <View style={styles.separator} />
            <Text style={styles.email}>joopmelcher47@gmail.com</Text>
            <View style={styles.separator} />
            <Text style={styles.experienceText}>{t("15 year(s) experience")}</Text>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>{t("Hard Skills")}</Text>
            <Text style={styles.skillText}>• {t("Responsive Design")}</Text>
            <Text style={styles.skillText}>• HTML, CSS, JavaScript</Text>
            <Text style={styles.skillText}>• React & Angular</Text>
            <Text style={styles.skillText}>• Python & Node.js</Text>
            <Text style={styles.skillText}>• {t("Web security")}</Text>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>{t("Soft Skills")}</Text>
            <Text style={styles.skillText}>• {t("Communication")}</Text>
            <Text style={styles.skillText}>• {t("Problem-solving & Critical thinking")}</Text>
            <Text style={styles.skillText}>• {t("Time Management")}</Text>
            <Text style={styles.skillText}>• {t("Client Management")}</Text>
            <Text style={styles.skillText}>• {t("Continuous Learning Mindset")}</Text>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>{t("Work Experience")}</Text>
            <Text style={styles.skillText}>• Senior Web Developer at XYZ Company (2015-2020)</Text>
            <Text style={styles.skillText}>• Lead Developer at ABC Corporation (2010-2015)</Text>
            <Text style={styles.skillText}>• Lead SAP FI at 123 Enterprise (2005-2010)</Text>
            <View style={styles.separator} />
            <Text style={styles.receivedFilesText}>{t("View Journal")}</Text>
            <View style={styles.fileRow}>
              <Image
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b79c39e1425278a7e41c51ee38aead4f0c299b3e3b1c3700672a00748cf50159?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
                }}
                style={styles.fileImage}
              />
              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>JoopMelcher.pdf</Text>
                <Text style={styles.fileSize}>293 kb</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    maxHeight: 500,
  },
  greenBox: {
    backgroundColor: '#F8F8F8',
    padding: 20,
    width: 800,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  content: {
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  statusDot: {
    width: 6,
    height: 6,
    backgroundColor: 'green',
    borderRadius: 3,
    marginLeft: 5,
  },
  expertText: {
    fontSize: 12,
    color: '#A0AEC0',
    fontFamily:"Roboto-Light"
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  email: {
    fontSize: 12,
    color: '#206C00',
    fontFamily:"Roboto-Light"
  },
  experienceText: {
    fontSize: 14,
    color: 'black',
    fontFamily:"Roboto-Light"
  },
  sectionTitle: {
    fontSize: 14,
    color: '#206C00',
    fontWeight: '600',
    fontFamily:"Roboto-Light"
  },
  skillText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
    fontFamily:"Roboto-Light"
  },
  receivedFilesText: {
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 10,
    fontFamily:"Roboto-Light"
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  fileImage: {
    width: 35,
    height: 35,
  },
  fileInfo: {
    marginLeft: 5,
  },
  fileName: {
    color: '#206C00',
    fontFamily:"Roboto-Light"
  },
  fileSize: {
    fontSize: 10,
    color: '#A0AEC0',
    fontFamily:"Roboto-Light"
  },
});

export default MyComponent;
