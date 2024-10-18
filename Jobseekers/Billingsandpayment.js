import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BlurView } from 'expo-blur';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';

const BillingSettingsPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage
        const response = await axios.get(`${apiUrl}/api/expert/get-payment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort paymentOption by created_at to get the latest payment
        const sortedPayments = response.data.paymentOption.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        const lastPayment = sortedPayments[0]; // Get the last payment
        setPaymentData(lastPayment);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment details:', error);
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color="#206C00" />;
  }

  return (
    <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
  style={{ height: '100%', width: '100%',flex: 1}}
>
    <View style={{ flex: 1 }}>
      <TopBar /> {/* Top navigation bar */}
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar /> {/* Sidebar for navigation */}
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}>
          <View style={styles.container}>
          <Text style={styles.sectionTitle}>This plan covers HUB SESSIONS, COURSES, SKILL ANALYSIS SESSIONS, GROWTH PLANS AND INTERVIEW SESSIONS</Text>

            {/* Blur view containing payment information */}
            <BlurView intensity={50} style={styles.blurBackground}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentText}>Payment Type: {paymentData.payment_option}</Text>
                {/* Conditionally styled payment status */}
                <Text style={styles.paymentText}>Payment Status: 
                <Text
                  style={[
                    styles.paymentText,
                    { marginLeft: 5, color: paymentData.payment_status === 'pending' ? 'pink' : '#63EC55' }
                  ]}
                >
               {paymentData.payment_status}
                </Text>  </Text>
                <Text style={styles.paymentText}>
                  {paymentData.payment_option === 'full'
                    ? `Payment Date: ${paymentData.payment_date1}`
                    : `Installment Dates: ${paymentData.payment_date1}, ${paymentData.payment_date2 || 'Pending'}`}
                </Text>
              </View>
            </BlurView>

            {/* Section for account details, no button */}

            <BlurView intensity={50} style={styles.blurBackground}>
            <Text style={styles.sectionTitle}>Ready to make new payment?</Text>
              <View style={styles.paymentAction}>
              <Text style={styles.paymentText}>Bank Name: Revolut Bank UAB</Text>
                <Text style={styles.paymentText}>IBAN/Account Number: NL18REVO2553615475REVONL22</Text>
                <Text style={styles.paymentText}>Account Name: Oluwayemisi Akingbade</Text>
              </View>
            </BlurView>
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
    paddingTop: 20,
    marginLeft: 230
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    fontFamily: "Roboto-Light",
  },
  blurBackground: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'rgba(225,255,212,0.1)',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  paymentInfo: {
    marginBottom: 10,
  },
  paymentAction: {
    marginBottom: 20,
  },
  paymentText: {
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
    fontFamily: "Roboto-Light",
  },
});

export default BillingSettingsPage;
