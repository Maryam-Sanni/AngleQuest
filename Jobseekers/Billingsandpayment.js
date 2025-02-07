import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';

const PaymentHistoryPage = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/expert/payment-history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPaymentHistory(response.data.payments || []);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color="#206C00" />;
  }

  return (
    <ImageBackground source={require('../assets/backgroundimg2.png')} style={styles.background}>
      <View style={{ flex: 1 }}>
        <TopBar />
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Sidebar />
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Payment History</Text>
              {paymentHistory.length === 0 ? (
                <Text style={styles.noPayments}>No payment history found.</Text>
              ) : (
                paymentHistory.map((payment, index) => (
                  <View key={index} style={styles.card}>
                    <Text style={styles.paymentText}>Payment Type: {payment.payment_option || 'N/A'}</Text>
                    <Text style={styles.paymentText}>Amount: {payment.amount || 'N/A'}</Text>
                    <Text style={styles.paymentText}>Status: {payment.status || 'N/A'}</Text>
                    <Text style={styles.paymentText}>Date: {payment.date || 'N/A'}</Text>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    marginLeft: 230,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    fontFamily: "Roboto-Light",
  },
  noPayments: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
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
    elevation: 5,
  },
  paymentText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    fontFamily: "Roboto-Light",
  },
});

export default PaymentHistoryPage;