import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';

const BillingSettingsPage = () => {
  const navigation = useNavigation(); // Moved inside the component

  const goToAccountSettings = () => {
    navigation.navigate('Account Settings');
  };

  const goToResetPassword = () => {
    navigation.navigate('Reset Password');
  };

  const goToNotificationSettings = () => {
    navigation.navigate('Notification Settings');
  };

  const goToBillingsAndPayment = () => {
    navigation.navigate('Billings and Payment');
  };

  const [currentPlan] = useState('Standard');
  const [amount] = useState('$29.00');
  const [renewalDate] = useState('April 30, 2024');
  const [paymentMethod] = useState('•••• 1234');
  const [expiryDate] = useState('Expires 06/2024');
  const [billingHistory] = useState([
    { date: 'April 1, 2024', amount: '$29.00' },
    { date: 'March 1, 2024', amount: '$29.00' },
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

  return (
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.container}>
              <Text style={styles.sectionTitlefirst}>CURRENT PLAN</Text>
              <View style={styles.divider} />
              <Text style={styles.planText}>{currentPlan} PLAN</Text>
              <Text style={styles.amountText}>{amount} per month</Text>
              <Text style={styles.renewalDateText}>Your plan renews on: {renewalDate}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCancelPlan}>
                  <Text style={styles.buttonText}>Cancel Plan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#206c00' }]} onPress={handleUpgradePlan}>
                  <Text style={styles.buttonText}>Upgrade Plan</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
              <View style={styles.divider} />
              <View style={styles.paymentMethodContainer}>
                <Text style={styles.paymentMethodType}>VISA</Text>
                <Text style={styles.paymentMethodText}>{paymentMethod}</Text>
                <Text style={styles.expiryDateText}>{expiryDate}</Text>
              </View>
              <TouchableOpacity onPress={handleAddPaymentMethod}>
                <Text style={styles.addPaymentMethodText}>+ Add Payment Method</Text>
              </TouchableOpacity>

              <Text style={styles.sectionTitle}>BILLING HISTORY</Text>
              <View style={styles.divider} />
              {billingHistory.map((entry, index) => (
                <View key={index} style={styles.historyEntry}>
                  <Text>Date: {entry.date}</Text>
                  <Text>Amount: {entry.amount}</Text>
                </View>
              ))}
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.cardContent}>
                <TouchableOpacity onPress={goToAccountSettings}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9b7a3a6d0178d9e4654db03454de5de060a67e4b91a6fe4d31a059874d384eb2?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5 }} />
                    <Text style={{ fontSize: 12, color: 'black' }}>Account Settings</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToResetPassword}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d2d638a18c02206d9cb09092e754e29b9e7fcec759c21615164f9508890194ba?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
                    <Text style={{ fontSize: 12, color: 'black', marginTop: 15 }}>Password</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToNotificationSettings}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/17d8150403f80380e2928ef1b9db06fb8c60a50c487a2172f5699a0eb5f88b6d?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
                    <Text style={{ fontSize: 12, color: 'black', marginTop: 15 }}>Notification Settings</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToBillingsAndPayment}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d71eb11f8b49b8dc89ac885de39244967a9d43ca35a783ff2b5c8a9c872d336c?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
                    <Text style={{ fontSize: 12, color: 'coral', marginTop: 15, fontWeight: 'bold' }}>Billings & Payment </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 230,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 50,
    marginBottom: 5,
    color: 'black',
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
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 3,
  },
  amountText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  renewalDateText: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: 'coral',
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodType: {
    fontSize: 14,
    color: 'white',
    marginTop: 15,
    backgroundColor: 'blue',
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
  },
  addPaymentMethodText: {
    fontSize: 12,
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
});

export default BillingSettingsPage;
