import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  Animated,
  input, Pressable
} from "react-native";
import { useFonts } from "expo-font";
import { useTranslation } from "react-i18next";
import OpenModal from './IndividualorList';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ServiceCard({ title, description, isStartPressed, activeCard, setActiveCard }) {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeCard === title; // Check if the card is active

    // Create an animated value for width
    const animatedWidth = new Animated.Value(isStartPressed ? 360 : 560); // Adjust initial width

    // Animate width change when isStartPressed changes
    useEffect(() => {
      Animated.timing(animatedWidth, {
        toValue: isStartPressed ? 360 : 560, // Set to smaller width when pressed
        duration: 300, // Duration of the animation
        useNativeDriver: false, // Disable native driver for width
      }).start();
    }, [isStartPressed]); // Re-run the animation when isStartPressed changes

    return (
      <Animated.View
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
          style={[
            styles.serviceCard,
            (isHovered || isActive) && styles.hoverCard
        ]}
      >
        <Text
          style={[
            styles.serviceTitle,
            (isHovered || isActive) && styles.hoverTitle, // Apply hoverTitle for hover or active
          ]}
        >
          {title}
        </Text>
      </Animated.View>
  );
}

function AngleQuestPage({ onClose }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [ModalVisible, setModalVisible] = useState(false);
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [activeCard, setActiveCard] = useState('Non-Disclosure agreement');

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const handleChooseImage = (event) => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setProfileImage(imageUrl);
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const saveSelectedSupport = async (selectedText) => {
    try {
      await AsyncStorage.setItem('selectedSupport', selectedText);
      console.log('Saved successfully:', selectedText);
    } catch (error) {
      console.error('Error saving to AsyncStorage:', error);
    }
  };
  
  const steps = [
    {
      heading: t(" "),
      content: (
        <View style={styles.uploadContainer}>
          <Text style={styles.mainHeading2}>
            {t("Non-Disclosure Agreement")}
          </Text>
          <Text style={styles.subHeading2}>
            {t("Upload Non-Disclosure Agreement to protect your employees")}
          </Text>
          <View style={styles.input}>
            <input type="file" accept="image/*" onChange={handleChooseImage} />
          </View>
          <Text style={styles.uploadInfo}>
            {t("Max File Size: 250MB, File type: pdf or word")}
          </Text>
          <TouchableOpacity style={styles.buttonsave}>
            <Text style={styles.buttonsaveText}>{t("Save")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttondone}>
            <Text style={styles.buttonsaveText2}>{t("Submit")}</Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      heading: t("AngleQuest Agreement"),
      content: (
        <View>
          <Text style={styles.subHeading}>
            {t("Create your members individually or simply upload an excel document to add all members at once.")}
          </Text>


        </View>
      ),
    },
    {
      heading: t("Service level Agreement"),
      content: (
        <View>
          <Text style={styles.subHeading}>
            {t("Welcome to Service level Agreement")}
          </Text>


        </View>
      ),
    },
    {
      heading: t(
        "Orchestrate your team members performance and growth using these services...",
      ),
      content: (
        <View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=gcYV3SPHW03K&format=png&color=000000",
                }}
                style={{
                  width: 70,
                  height: 70,
                  marginTop: 20,
                  marginBottom: 5,
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  textAlign: "center",
                  width: 300,
                }}
              >
                Work Delivery Support
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  width: 250,
                  height: 70,
                  marginTop: 5,
                }}
              >
                Improve your employee's performance by 50% using AngleQuest Work
                Delivery support to quickly deliver excellent result
              </Text>
              <TouchableOpacity
                onPress={() => {
                  saveSelectedSupport('Work Delivery Support');
                   setCurrentStep(0);
                  handleOpenPress();
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{t('Subscribe Employee')}</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "column",
                marginLeft: 10,
                justifyContent: "center",
                alignItems: "center",
                
              }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=pF2OfcFGInLa&format=png&color=000000",
                }}
                style={{
                  width: 70,
                  height: 70,
                  marginTop: 20,
                  marginBottom: 5,
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  textAlign: "center",
                  width: 300,
                }}
              >
                Career Growth Support
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  width: 250,
                   height: 70,
                  marginTop: 5,
                }}
              >
                Provide hyper career growth support to your employees to grow
                from a level to another in a specified time.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  saveSelectedSupport('Career Growth Support');
                   setCurrentStep(0);
                  handleOpenPress();
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{t('Subscribe Employee')}</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=GhVeCGvvJ9sM&format=png&color=000000",
                }}
                style={{
                  width: 70,
                  height: 70,
                  marginTop: 20,
                  marginBottom: 5,
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  textAlign: "center",
                  width: 300,
                }}
              >
                Work Delivery Support
              </Text>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  textAlign: "center",
                  width: 300,
                }}
              >
                +
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  textAlign: "center",
                  width: 300,
                   height: 45,
                }}
              >
                Career Growth Support
              </Text>
              <TouchableOpacity
                onPress={() => {
                  saveSelectedSupport('Work Delivery Support and Career Growth Support');
                  setCurrentStep(0);
                  handleOpenPress();
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{t('Subscribe Employee')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
      ),
    },
    
   
  ];

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const services = [
    {
      title: t("Non-Disclosure agreement"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
    },
    {
      title: t("AngleQuest Agreement"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
    },
    {
      title: t("Service level Agreement"),
      icon: "https://img.icons8.com/?size=100&id=48354&format=png&color=000000",
    },
    {
      title: t("Subscriptions"),
      icon: "https://img.icons8.com/?size=100&id=SazSfIWdDmr2&format=png&color=000000",
    },
  ];

  return (
    <View style={styles.container}>
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&",
              }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>
              {t("Agreements & Subscription")}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
            

            
            <View style={styles.servicesContainer}>
              {services.map((service, index) => (
                // Only render services that are visible
                service.visible !== false && (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setCurrentStep(index);
                      setActiveCard(service.title); 
                    }}
                  >
                    <ServiceCard title={service.title} isStartPressed={isStartPressed} 
                      activeCard={activeCard}
                      setActiveCard={setActiveCard}/>
                  </TouchableOpacity>
                )
              ))}
            </View>

            <View style={styles.content}>
              <Text style={styles.mainHeading}>
                {steps[currentStep].heading}
              </Text>
              {steps[currentStep].content}
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
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  overlay: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  greenBox: {
    width: 1200,
    height: "90%",
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
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
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
    marginTop: 10,
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    color: "black",
    marginBottom: 30,
    marginLeft: 100,
    marginRight: 100,
  },
  mainHeading2: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    textAlign: "flex-start",
    marginBottom: 10,
    marginLeft: 10,
  },
  subHeading2: {
    fontSize: 16,
    textAlign: "flex-start",
    color: "black",
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 100,
  },
  servicesContainer: {
    flexDirection: "row",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
     backgroundColor: "white",
    marginBottom: 10,
    shadowColor: '#000',
      shadowOffset: { width: 0, height: 2, }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84,
       elevation: 5, 
  },
  startPressed: {
    width: 360,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgreen",
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
  },
  serviceCard: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  hoverCard: {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
borderRadius: 30
  },
  serviceTitle: {
    fontSize: 14,
    textAlign: "center",
  },
  hoverTitle: {
    color: "black",
    fontSize: 14,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#3F5637",
  },
  hoverDescription: {
    color: "white",
    fontSize: 16,
  },
  uploadInfo: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: 200,
    borderRadius: 5,
    marginTop: 30,
    elevation: 5,
  },
  buttonsave: {
    backgroundColor: "darkgreen",
    padding: 10,
    width: 100,
    marginLeft: 10,
    borderRadius: 5,
    marginTop: 20,
    elevation: 5,
  },
  buttondone: {
    backgroundColor: "#F8F8F8",
    padding: 10,
    width: 100,
    marginLeft: 1000,
    borderRadius: 5,
    marginTop: 100,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsaveText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsaveText2: {
    color: "#F8F8F8",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 45,
    width: 350,
    backgroundColor: "white",
    borderColor: "#206C00",
    borderWidth: 1,
    color: "black",
    fontSize: 14,
    marginLeft: 10,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  buttonind: {
    backgroundColor: "white",
    borderColor: "#206C00",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 10,
    width: 350,
    marginTop: 20,
    marginLeft: 10,
    height: 45,
    borderRadius: 5,
  },
  buttontextind: {
color: 'black',
    textAlign: 'center'
  },
});

export default AngleQuestPage;
