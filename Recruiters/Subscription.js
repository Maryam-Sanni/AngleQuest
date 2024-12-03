import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ImageBackground, Modal } from 'react-native';
import Topbar from '../components/Recruiterstopbar';
import Sidebar from '../components/Recruiterssidebar';
import { useNavigate } from 'react-router-dom';
import { BlurView } from 'expo-blur';
import ManageEmployees from './EmployeesPaymentSub';
import OpenModal from './AddSubCard';

import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';
function MyComponent() {
  const navigate = useNavigate();
    const [isInterviewHovered, setIsInterviewHovered] = useState(false);
    const [selectedSection, setSelectedSection] = useState('Standard');
    const [isPressed, setIsPressed] = useState(false);
    const [ModalVisible, setModalVisible] = useState(false);

    const handleOpenPress = () => {
        setModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
        onClose();
      };

    const handleSectionPress = (sectionName) => {
        setSelectedSection(sectionName);
    };

    const handlePurchasePress = (sectionName) => {
        if (sectionName === 'Standard' || sectionName === 'Pro') {
           navigate('/business-subscription');
        } else {
           navigate('/business-subscription');
        }
    };

    const handleTogglePress = () => {
        setIsPressed(!isPressed); // Toggle the pressed state
      };

      
  const [fontsLoaded]=useFonts({
"Roboto-Light":require("../assets/fonts/Roboto-Light.ttf")
  })
  const {t}=useTranslation()


    return (
        <ImageBackground
            source={require('../assets/Background.png')}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <Topbar />
                <View style={styles.content}>
                    <Sidebar />
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={{ marginLeft: 270}}>
                    <View style={styles.header}>
          <TouchableHighlight>
                                <View style={styles.item}>
                                <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4b274aadb26c96bd1bf3bcc2196a290c8aa4dd6f8bea63a98f9be3ea6a8bdec9?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                                    <Text style={[styles.headertext, isInterviewHovered && { color: 'coral' }]}>{t("Subscription Settings")}</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableOpacity onPress={handleOpenPress} style={{ position: 'absolute', right: 5, flexDirection: 'row'}}>
                            <Image
  source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4b274aadb26c96bd1bf3bcc2196a290c8aa4dd6f8bea63a98f9be3ea6a8bdec9?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
  style={styles.image}
/>
                            <Text style={{fontSize: 14, fontWeight: '500', marginTop: 5, color: '#666', width: 200,fontFamily:"Roboto-Light" }}>{t("Payment Details")}</Text>
     </TouchableOpacity>
                        </View>
                        {/* Sections */}
                        <View style={styles.sectionsContainer}>
                             {/* Basic Section */}
        <TouchableOpacity onPress={() => handleSectionPress('Basic')} style={{ flex: 1, marginHorizontal: 5, marginVertical: 10, marginRight: 10, backgroundColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: selectedSection === 'Basic' ? '#63EC55' : 'transparent', borderWidth: selectedSection === 'Basic' ? 2 : 0 }}>
          <View style={{ paddingHorizontal: 6, paddingVertical: 7, backgroundColor: '#f7fff4', borderRadius: 10, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10,fontFamily:"Roboto-Light" }}>{t("Basic")}</Text>
            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#206C00',fontFamily:"Roboto-Light"}}>$80</Text>
              <Text style={{ alignSelf: 'center', fontSize: 16, color: 'black',fontFamily:"Roboto-Light" }}>{t("USD /Under 10 Users")} </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
            <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontFamily:"Roboto-Light" }}>{t("Growth Plans, Interviews and Advice Sessions")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontFamily:"Roboto-Light" }}>{t("Hubs and Hubs Sessions")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontFamily:"Roboto-Light" }}>{t("Feedbacks and Reviews")}</Text>
              </View>
            <TouchableOpacity onPress={handlePurchasePress} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, paddingVertical: 2.5, marginTop: 25, marginBottom: 10, backgroundColor: 'grey', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white',fontFamily:"Roboto-Light" }}>{t("Current Plan")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

          {/* Standard Section */}
        <TouchableOpacity onPress={() => handleSectionPress('Standard')} style={{ flex: 1, marginHorizontal: 5, marginVertical: 10, marginRight: 10, borderRadius: 12, backgroundColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderColor: selectedSection === 'Standard' ? '#63EC55' : 'transparent', borderWidth: selectedSection === 'Standard' ? 2 : 0 }}>
          <View style={{ paddingHorizontal: 6, paddingVertical: 7, backgroundColor: '#f7fff4', borderRadius: 10, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)',fontFamily:"Roboto-Light" }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 10, fontFamily:"Roboto-Light" }}>{t("Standard")}</Text>
            <Text style={{ justifyContent: 'center', paddingHorizontal: 4, paddingVertical: 0.5, marginTop: 1, marginRight: 120, fontSize: 12, fontWeight: 'bold', color: '#206C00', backgroundColor: 'rgba(100, 255, 100, 0.5)', borderRadius: 3,fontFamily:"Roboto-Light" }}>{t("Most Popular")}</Text>
            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#206C00',fontFamily:"Roboto-Light" }}>$70</Text>
              <Text style={{ alignSelf: 'center', fontSize: 16, color: 'black',fontFamily:"Roboto-Light" }}>{t("USD /Under 20 Users")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
            <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontFamily:"Roboto-Light" }}>{t("Growth Plans, Interviews and Advice Sessions")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontFamily:"Roboto-Light" }}>{t("Hubs and Hubs Sessions")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontFamily:"Roboto-Light" }}>{t("Feedbacks and Reviews")}</Text>
              </View>
              
            <TouchableOpacity onPress={() => handlePurchasePress('Standard')} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, paddingVertical: 2.5, marginTop: 15, marginBottom: 10, backgroundColor: '#228B22', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', fontFamily:"Roboto-Light" }}>{t("Change Plan")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>


        {/* Pro Section */}
        <TouchableOpacity onPress={() => handleSectionPress('Pro')} style={{ flex: 1, marginHorizontal: 5, marginVertical: 10, backgroundColor: 'transparent', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, borderRadius: 12, borderColor: selectedSection === 'Pro' ? '#63EC55' : 'transparent', borderWidth: selectedSection === 'Pro' ? 2 : 0 }}>
          <View style={{ paddingHorizontal: 6, paddingVertical: 7, backgroundColor: '#f7fff4', borderRadius: 10, borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black', marginTop: 10,  fontFamily:"Roboto-Light"}}>{t("Professional")}</Text>
            <Text style={{ justifyContent: 'center', paddingHorizontal: 4, marginRight: 150, paddingVertical: 0.5, marginTop: 1, fontSize: 12, fontWeight: 'bold', color: '#206C00', backgroundColor: 'rgba(100, 255, 100, 0.5)', borderRadius: 3 }}>{t("Save $10 per User")}</Text>
            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#206C00', fontFamily:"Roboto-Light" }}>$60</Text>
              <Text style={{ alignSelf: 'center', fontSize: 16, color: 'black', fontFamily:"Roboto-Light" }}>{t("USD /21+ Users")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text  style={{  fontFamily:"Roboto-Light" }}>{t("Growth Plans, Interviews and Advice Sessions")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text  style={{  fontFamily:"Roboto-Light" }}>{t("Hubs and Hubs Sessions")}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccb4e9d11761a733c7f0b31358f0adde0677991513c5c76300ef8731486bdcd9?apiKey=7b9918e68d9b487793009b3aea5b1a32' }}
                style={{ width: 24, height: 24, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text  style={{  fontFamily:"Roboto-Light" }}>{t("Feedbacks and Reviews")}</Text>
            </View>
            <TouchableOpacity onPress={() => handlePurchasePress('Pro')} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, paddingVertical: 2.5, marginTop: 15, marginBottom: 10, backgroundColor: '#228B22', borderRadius: 5, marginRight: 15, marginLeft: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white',fontFamily:"Roboto-Light" }}>{t("Change Plan")}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        </View>

        <View style={styles.BoxesContainer}>
        <View style={styles.box2}>
      <BlurView intensity={100} style={styles.blurBackground}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10, marginBottom: 10, color: '#63EC55',fontFamily:"Roboto-Light"}}>{t("Current Plan Details")}</Text>
      <View style={styles.cell}>
     <Text style={{ fontSize: 16, marginLeft: 10, marginRight: 200, color: 'black',fontFamily:"Roboto-Light" }}>{t("Current Number of Employees")}     8 x $80 = $640</Text>
     </View>
     <View style={styles.cell2}>
     <Text style={{ fontSize: 16, marginLeft: 10, marginRight: 200, color: 'black',fontFamily:"Roboto-Light"}}>{t("Current Plan: Basic Plan")}</Text>
     </View>
     <View style={styles.cell}>
     <Text style={{ fontSize: 16, color: "black", marginLeft: 10, marginRight: 200, fontFamily:"Roboto-Light"}}>{t("Amount due on next payment")}: $640</Text>
     </View>
      </BlurView>
      </View>

      <View style={styles.box2}>
      <BlurView intensity={100} style={styles.blurBackground}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10, color: '#63EC55',fontFamily:"Roboto-Light"}}>{t("Renewal Decision")}</Text>
     <Text style={{ fontSize: 15, color: "black", marginTop: 10, marginLeft: 10, marginRight: 200, color: 'black', fontWeight: '500',fontFamily:"Roboto-Light" }}>{t("Your employees were signed up at different times, should we auto renew when due?")}</Text>
     <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
     <TouchableOpacity
              style={{ height: 18, width: 18, borderRadius: 15, borderWidth: 2, borderColor: "black", marginTop: 10, backgroundColor: 'lightgrey' }}
              onPressIn={handleTogglePress}  // Triggered when pressing down
              onPressOut={handleTogglePress} // Triggered when releasing
            />
            <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 10, color: 'black',fontFamily:"Roboto-Light"}}>{t("Auto Renew")}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
     <TouchableOpacity
              style={{ height: 18, width: 18, borderRadius: 15, borderWidth: 2, borderColor: "black", marginTop: 10, backgroundColor: 'none' }}
              onPressIn={handleTogglePress}  // Triggered when pressing down
              onPressOut={handleTogglePress} // Triggered when releasing
            />
            <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 10, color: 'black',fontFamily:"Roboto-Light"}}>{t("Do not auto-renew")}</Text>
          </View>
      </BlurView>
      </View>

      <ManageEmployees />

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
        </View>
        </View>
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    backgroundImage: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    container: {
        flex: 1,
    },
    content: {
        flexDirection: 'row',
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        maxHeight: 500,
    },
    header: {
        marginLeft: -60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        backgroundColor: '#f7fff4',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      },
      headertext: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '500',
        marginTop: 5,
        color: '#666',
        fontFamily:"Roboto-Light"
      },
      image: {
        width: 21,
        height: 21,
        marginRight: 5,
        marginTop: 5,
        marginLeft: 100
      },
      icon: {
        width: 25,
        height: 25,
        marginRight: 5,
        marginTop: 5,
        marginLeft: 10
      },
    sectionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 50,
        marginRight: 100,
        marginTop: 30
    },
    sectionButton: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 10,
        marginRight: 10,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 12,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    purchaseButton: {
        backgroundColor: 'coral',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    purchaseButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
box2: {
  backgroundColor: 'rgba(125,125,125,0.3)',
  borderRadius: 20,
  width: "85%",
  height: 180,
  marginTop: 30,
  marginLeft: 50,
  borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)',
},
blurBackground: {
    flex: 1, 
    borderRadius: 20, 
    padding: 10,
  },
  BoxesContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  cell: {
    flex: 1,
   backgroundColor: '#f7fff4',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
   backgroundColor: 'none',
    padding: 10, 
    alignItems: 'flex-start',
  },
});

export default MyComponent;
