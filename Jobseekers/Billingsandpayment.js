import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';
import { BlurView } from 'expo-blur';


const BillingSettingsPage = () => {
  const navigation = useNavigation(); // Moved inside the component


  const [currentPlan] = useState('Standard');
  const [amount] = useState('$1250.00');
  const [amount2] = useState('$50.00');
  const [amount3] = useState('$65.00');
  const [renewalDateG] = useState('Dec 30, 2024');
  const [renewalDateA] = useState('Sep 16, 2025');
  const [renewalDateH] = useState('Apr 30, 2025');
  const [paymentMethod] = useState('•••• 1234');
  const [expiryDate] = useState('Expires 06/2024');
  const [billingHistory] = useState([
    { date: 'April 1, 2024', amount: '$80.00' },
    { date: 'March 1, 2024', amount: '$800.00' },
    { date: 'March 1, 2024', amount: '$95.00' },
    { date: 'March 1, 2024', amount: '$80.00' },
    // Add more billing history entries as needed
  ]);

  const handleCancelPlan = () => {
    // Implement cancel plan functionality here
  };

  const handleUpgradePlan = () => {
    // Implement upgrade plan functionality here
  };

  const handleAddPaymentMethod = () => {
    // Implement add payment method functionality here
  };
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
      const {t}=useTranslation()

  return (
    <ImageBackground
        source={require ('../assets/backgroundimg2.png') }
      style={{ height: '100%', width: '100%',flex: 1}}
    >
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        
   
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.container}>
              <Text style={styles.sectionTitle}>{t("CURRENT PLANS")}</Text>
              <View style={styles.divider} />
               <View style={styles.greenBox}>
                  <BlurView intensity={50} style={styles.blurBackground}>
              <Text style={styles.planText}>{t("This plan covers HUB SESSIONS, COURSES, SKILL ANALYSIS SESSIONS, GROWTH PLANS AND INTERVIEW SESSIONS")}</Text>
              <Text style={styles.amountText}>{amount} <Text style={styles.smallamountText}>{t("per year")}</Text></Text>
              <Text style={styles.renewalDateText}>{t("Your plan renews on")}: {renewalDateA}</Text>
              
              <Text style={styles.planText}>Microsoft Mayhem Hub</Text>
              <Text style={styles.amountText}>{amount2} <Text style={styles.smallamountText}>{t("per month")}</Text></Text>
              <Text style={styles.renewalDateText}>{t("Your plan renews on")}: {renewalDateG}</Text>
              <Text style={styles.planText}>SAP Friends</Text>
              <Text style={styles.amountText}>{amount3} <Text style={styles.smallamountText}>{t("per month")}</Text></Text>
              <Text style={styles.renewalDateText}>{t("Your plan renews on")}: {renewalDateH}</Text>
                  </BlurView>
               </View>

              <Text style={styles.sectionTitle}>{t("PAYMENT METHOD")}</Text>
              <View style={styles.divider} />
              <View style={styles.greenBox}>
                <BlurView intensity={50} style={styles.blurBackground}>
              <View style={styles.paymentMethodContainer}>
                <Text style={styles.paymentMethodType}>VISA</Text>
                <Text style={styles.paymentMethodText}>{paymentMethod}</Text>
                <Text style={styles.expiryDateText}>{expiryDate}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonadd} onPress={handleCancelPlan}>
                  <Text style={styles.buttonText}>+ {t("Add Payment Method")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'darkred' }]} onPress={handleUpgradePlan}>
                  <Text style={styles.buttonText}>{t("Delete Card")}</Text>
                </TouchableOpacity>
              </View>
                </BlurView>
              </View>
              <Text style={styles.sectionTitle}>{t("BILLING HISTORY")}</Text>
              <View style={styles.divider} />
              <View style={styles.greenBox}>
                <BlurView intensity={50} style={styles.blurBackground}>
              {billingHistory.map((entry, index) => (
                <View key={index} style={styles.historyEntry}>
                  <Text style={{fontFamily:"Roboto-Light"}}>{t("Date")}: {entry.date}</Text>
                  <Text style={{fontFamily:"Roboto-Light"}}>{t("Amount")}: {entry.amount}</Text>
                </View>
              ))}
                </BlurView>
              </View>
            </View>
           
              
          </View>
        </ScrollView>
      </View>
    </View>
     </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 230,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 5,
    color: 'white',
    fontFamily:"Roboto-Light"
  },
  sectionTitlefirst: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: 'black',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 3,
    marginBottom: 10,
  },
  planText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 3,
    fontFamily:"Roboto-Light"
  },
  amountText: {
    fontSize: 24,
    color: 'black',
    fontWeight: '400',
    fontFamily:"Roboto-Light"
  },
  smallamountText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
    fontFamily:"Roboto-Light"
  },
  renewalDateText: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
    marginBottom: 20,
    fontFamily:"Roboto-Light"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 40,
  },
  button: {
    backgroundColor: 'coral',
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    width: 150
  },
  buttonadd: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
    width: 250,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily:"Roboto-Light"
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodType: {
    fontSize: 16,
    color: 'white',
    marginTop: 15,
    backgroundColor: 'blue',
    fontFamily:"Roboto-Light"
  },
  paymentMethodText: {
    fontSize: 14,
    color: 'black',
    marginTop: 15,
    marginLeft: 10,
  },
  expiryDateText: {
    fontSize: 14,
    color: 'black',
    marginTop: 15,
    marginLeft: 10,
    fontFamily:"Roboto-Light"
  },
  addPaymentMethodText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginTop: 25,
  },
  historyEntry: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  cardContainer: {
    width: '13%',
    height: 180, 
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 30,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    marginBottom: 5,
  },
  greenBox: {
   width: "90%",
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(225,255,212,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 20,    
  },
  blurBackground: {
    flex: 1, 
    borderRadius: 20, 
    padding: 20
  },
});

export default BillingSettingsPage;
