import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, TouchableOpacity, Modal, ScrollView, StyleSheet, Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GetStartedInd from './GetStartedInd';
import { useFonts } from "expo-font";
import { useTranslation } from 'react-i18next';

function PaymentDetails({ onClose, onPaymentSuccess }) {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const { t } = useTranslation();
  const apiUrl = process.env.REACT_APP_API_URL;

  const openModal = () => {
    setShowSubscribeModal(true);
  };

  const closeModal = () => {
    setShowSubscribeModal(false);
  };
  
  // Fetch payment details when the component mounts
  useEffect(() => {
    fetchPaymentDetails();
  }, []); // Empty dependency array to only run once on mount
  
  const fetchPaymentDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await fetch(`${apiUrl}/api/jobseeker/get-paystack-payment-details`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log("API Response:", data); // Log the full response

      if (data?.PaystackDetail?.card_detail) {
        try {
          if (typeof data.PaystackDetail.card_detail === "string") {
            data.PaystackDetail.card_detail = JSON.parse(data.PaystackDetail.card_detail);
          }
          console.log("Parsed Card Details:", data.PaystackDetail.card_detail);
        } catch (error) {
          console.error("Error parsing card details:", error);
          data.PaystackDetail.card_detail = [];
        }
      }

      setPaymentDetails(data?.PaystackDetail);
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };


  const initiatePayment = async () => {
    try {
      setLoading(true);

      const values = await AsyncStorage.multiGet(['first_name', 'last_name', 'email']);
      const firstName = values.find(item => item[0] === 'first_name')[1];
      const lastName = values.find(item => item[0] === 'last_name')[1];
      const email = values.find(item => item[0] === 'email')[1];

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Authorization token not found.");
        setLoading(false);
        return;
      }

      const cardDetails = paymentDetails?.card_detail || [];
      console.log("Card Details:", cardDetails); // Debugging

      const paymentPayload = {
        email: email,
        plan: paymentDetails?.plan || 'Pay as you go',
        amount: 40,
        card_number: cardDetails.length > 0 ? cardDetails[0].cardnumber : '',
        cvv: cardDetails.length > 0 ? cardDetails[0].cvv : '',
        expiry_month: cardDetails.length > 0 ? cardDetails[0].exp_date.split('/')[0] : '',
        expiry_year: cardDetails.length > 0 ? cardDetails[0].exp_date.split('/')[1] : '',
      };

      console.log("Payment Payload:", paymentPayload); // Debugging

      const paymentResponse = await axios.post(`${apiUrl}/api/jobseeker/charge-card`, paymentPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Payment Response:", paymentResponse.data);

      if (paymentResponse?.data?.message === "Charge successful") {
        Alert.alert("Success", "Payment initiated successfully!");
        onPaymentSuccess({ success: true, data: paymentResponse.data });
      } else {
        Alert.alert("Error", "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Error", "Payment could not be processed.");
    } finally {
      setLoading(false);
    }
  };


  return (
        <View style={styles.greenBox}>
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://img.icons8.com/?size=100&id=84025&format=png&color=000000' }} 
              style={styles.logo} 
            />
            <Text style={styles.headerText}>{t("Pay as you go")}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.section}>
                <Text style={styles.description}>
                  {t("You are not a subscribed user")}
                </Text>
                <Text style={styles.description}>{t("")}</Text>
              </View>

              <TouchableOpacity 
                style={styles.saveButton1} 
                onPress={() => setShowSubscribeModal(true)}
              >
                <Text style={styles.saveButtonText}>{t(" Switch to subscription")}</Text>
              </TouchableOpacity>
 
              <TouchableOpacity 
                style={[styles.saveButton, loading && { opacity: 0.6 }]} 
                onPress={initiatePayment}
                disabled={loading}
              >
                <Text style={styles.saveButtonText}>
                  {loading ? t("Processing...") : t("Costs $40")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        <Modal
          visible={showSubscribeModal}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
            <View style={styles.modalContent}>
              <GetStartedInd onClose={closeModal} />
          </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  greenBox: {
    width: 600,
    marginTop: 40,
    height: 400,
    backgroundColor: '#F5F5F5',
    alignSelf: 'center'
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
  },
  closeText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8A09A',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    marginLeft: 50,
    marginRight: 50
  },
  content: {
    paddingHorizontal: 8,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: "black",
    marginBottom: 30,
    textAlign: 'center',
  },
  saveButton1: {
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E8A09A',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});

export default PaymentDetails;
