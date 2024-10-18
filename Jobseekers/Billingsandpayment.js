import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';
import Title from '../components/Title';


const BillingSettingsPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
const [selectedDate, setSelectedDate] = useState(new Date()); 

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
      source={require('../assets/backgroundimg2.png')}
      style={{ height: '100%', width: '100%', flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <TopBar /> {/* Top navigation bar */}
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Sidebar /> {/* Sidebar for navigation */}
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}>
            <View style={styles.container}>
              <Text style={styles.Title}>
                This plan covers HUB SESSIONS, COURSES, SKILL ANALYSIS SESSIONS, GROWTH PLANS AND INTERVIEW SESSIONS
              </Text>

              {/* Payment information with white background and shadow */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Payment Details</Text>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentText}>Payment Type: {paymentData.payment_option}</Text>
                  <Text style={styles.paymentText}>
                    Payment Status: 
                    <Text
                      style={[
                        styles.paymentText,
                        { marginLeft: 5, color: paymentData.payment_status === 'pending' ? 'pink' : '#63EC55' }
                      ]}
                    >
                      {paymentData.payment_status}
                    </Text>
                  </Text>
                  <Text style={styles.paymentText}>
                    {paymentData.payment_option === 'full'
                      ? `Payment Date: ${paymentData.payment_date1}`
                      : `Installment Dates: ${paymentData.payment_date1}, ${paymentData.payment_date2 || 'Pending'}`}
                  </Text>
                </View>
              </View>

              {/* Account details with white background and shadow */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Ready to make a new payment?</Text>
                <View style={styles.paymentAction}>
                  <Text style={styles.paymentText}>Bank Name: Revolut Bank UAB</Text>
                  <Text style={styles.paymentText}>IBAN/Account Number: NL18REVO2553615475REVONL22</Text>
                  <Text style={styles.paymentText}>Account Name: Oluwayemisi Akingbade</Text>
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
    paddingTop: 20,
    marginLeft: 230
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    fontFamily: "Roboto-Light",
  },
Title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    fontFamily: "Roboto-Light",
  },
  card: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
  paymentInfo: {
    marginBottom: 10,
  },
  paymentAction: {
    marginBottom: 20,
  },
  paymentText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    fontFamily: "Roboto-Light",
  },
});

export default BillingSettingsPage;
