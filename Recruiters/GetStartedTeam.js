import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import OpenModal from './NDASetup';

function ServiceCard({ title, description }) {
  const [isHovered, setIsHovered] = useState(false);
 
  
  return (
    <Animated.View
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={[
        styles.serviceCard,
        isHovered && styles.hoverCard,
      ]}
    >
      <Text style={[styles.serviceTitle, isHovered && styles.hoverTitle]}>{title}</Text>
      <Text style={[styles.serviceDescription, isHovered && styles.hoverDescription]}>{description}</Text>
    </Animated.View>
  );
}

function AngleQuestPage({ onClose }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const { t } = useTranslation();
  const [ModalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
     onClose();
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const services = [
    { title: t("Professional Support"), description: t("We provide tailored professional support to help employees thrive in their current roles. From skill-building workshops to mentorship programs, our experts are here to empower your workforce.") },
    { title: t("Career Transitions"), description: t("Our career transition services are designed to guide employees through changes in their career paths. Whether it's upskilling, reskilling, or preparing for a new opportunity, we've got it covered.") },
    { title: t("Professional Support & Career Transition"), description: t("Why choose when you can have both? We offer a holistic approach that combines professional support and career transition to ensure your employees achieve their full potential.") },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <View style={styles.greenBox}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
            <View style={styles.header}>
              <Image
                source={{
                  uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&',
                }}
                style={styles.logo}
              />
              <Text style={styles.headerText}>{t("Welcome to AngleQuest")}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <Text style={styles.mainHeading}>{t("Empowering Your Employee's Career Journey")}</Text>
              <Text style={styles.subHeading}>
                {t("At AngleQuest, we provide tailored professional support & smooth career transitions for your employees. Work alongside industry leaders who understand your unique challenges and offer practical solutions.")}
              </Text>

              <View style={styles.servicesContainer}>
                {services.map((service, index) => (
                  <ServiceCard key={index} title={service.title} description={service.description} />
                ))}
              </View>

              <TouchableOpacity onPress={handleOpenPress} style={styles.button}>
                <Text style={styles.buttonText}>{t("Lets proceed!")}</Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={ModalVisible}
              onRequestClose={handleCloseModal}
            >
              <View style={styles.modalContent}>
                <OpenModal onClose={handleCloseModal} />
              </View>
            </Modal>
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  greenBox: {
    width: "80%",
    height: "90%",
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    padding: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  closeButton: {
    position: "absolute",
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#3F5637",
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,

  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
    marginBottom: 30,
    marginLeft: 100, marginRight: 100
  },
  servicesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  serviceCard: {
    width: "47%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    transition: "all 0.3s ease-in-out", // for web
  },
  hoverCard: {
    backgroundColor: "#206C00",
    transform: [{ scale: 1.05 }],
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#206C00",
    transition: "all 0.3s ease-in-out", // for web
  },
  hoverTitle: {
    color: "white",
    fontSize: 20,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#3F5637",
    transition: "all 0.3s ease-in-out", // for web
  },
  hoverDescription: {
    color: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: "coral",
    padding: 10,
    width: 150,
    borderRadius: 5,
    marginTop: 40,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AngleQuestPage;
