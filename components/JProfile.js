import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

  function MyComponent({ onClose }) {
    const [fontsLoaded] = useFonts({
      'Roboto-Light': require("../assets/fonts/Roboto-Light.ttf"),
    });
    const { t } = useTranslation();
    const [expertName, setExpertName] = useState('');
     const [expertCategory, setExpertCategory] = useState('');

    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const storedFirstName = await AsyncStorage.getItem('selectedUserFirstName');
          const storedLastName = await AsyncStorage.getItem('selectedUserLastName');
          const storedCategory = await AsyncStorage.getItem('selectedUserCategory');

          if (storedFirstName && storedLastName) {
            setExpertName(`${storedFirstName} ${storedLastName}`);
          }
          if (storedCategory) {
            setExpertCategory(storedCategory);
          }
        } catch (error) {
          console.error('Failed to fetch expert details from AsyncStorage', error);
        }
      };

      fetchDetails();
    }, []);

    if (!fontsLoaded) {
      return null; // Prevent rendering until fonts are loaded
    }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Image
            source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/96214782d7fee94659d7d6b5a7efe737b14e6f05a42e18dc902e7cdc60b0a37b" }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{expertName || t("Expert Name")}</Text>
          <Text style={styles.expertText}>{t("Expert in")} {expertCategory || t("Not Available")}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.email}>joopmelcher47@gmail.com</Text>
          <Text style={styles.experienceText}>{t("15 years of experience")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("Skills")}</Text>
          <Text style={styles.skillText}>• {t("Responsive Design")}</Text>
          <Text style={styles.skillText}>• React, Node.js, Python</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("Location")}</Text>
          <Text style={styles.skillText}>• {t("United Kingdom")}</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 300,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 20,
    color: '#A0AEC0',
    fontFamily: "Roboto-Light",
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: "Roboto-Light",
  },
  expertText: {
    fontSize: 14,
    color: '#A0AEC0',
    fontFamily: "Roboto-Light",
  },
  infoSection: {
    marginVertical: 15,
    alignItems: 'center',
  },
  email: {
    fontSize: 14,
    color: '#206C00',
    fontFamily: "Roboto-Light",
  },
  experienceText: {
    fontSize: 12,
    color: '#333',
    fontFamily: "Roboto-Light",
  },
  section: {
    marginVertical: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#206C00',
    marginBottom: 5,
    fontFamily: "Roboto-Light",
  },
  skillText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
    fontFamily: "Roboto-Light",
  },
});

export default MyComponent;
