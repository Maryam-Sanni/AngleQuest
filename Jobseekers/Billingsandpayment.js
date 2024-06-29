import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';

const BillingSettingsPage = () => {
  const navigation = useNavigation(); // Moved inside the component


  const [currentPlan] = useState('Standard');
  const [amount] = useState('$80.00');
  const [renewalDateG] = useState('April 30, 2024');
  const [renewalDateA] = useState('July 26, 2025');
  const [renewalDateH] = useState('December 17, 2024');
  const [renewalDateI] = useState('August 01, 2025');
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

  return (
    <View style={{backgroundColor: '#f7fff4', flex: 1}}>
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        
   
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.container}>
              <Text style={styles.sectionTitle}>CURRENT PLANS</Text>
              <View style={styles.divider} />
              <Text style={styles.planText}>Growth Plan</Text>
              <Text style={styles.amountText}>{amount} per month</Text>
              <Text style={styles.renewalDateText}>Your plan renews on: {renewalDateG}</Text>
              <Text style={styles.planText}>Advice Sessions</Text>
              <Text style={styles.amountText}>{amount} per month</Text>
              <Text style={styles.renewalDateText}>Your plan renews on: {renewalDateA}</Text>
              <Text style={styles.planText}>Hubs</Text>
              <Text style={styles.amountText}>{amount} per month</Text>
              <Text style={styles.renewalDateText}>Your plan renews on: {renewalDateH}</Text>
              <Text style={styles.planText}>Interview Session</Text>
              <Text style={styles.amountText}>{amount} per month</Text>
              <Text style={styles.renewalDateText}>Your plan renews on: {renewalDateI}</Text>
              

              <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
              <View style={styles.divider} />
              <View style={styles.paymentMethodContainer}>
                <Text style={styles.paymentMethodType}>VISA</Text>
                <Text style={styles.paymentMethodText}>{paymentMethod}</Text>
                <Text style={styles.expiryDateText}>{expiryDate}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonadd} onPress={handleCancelPlan}>
                  <Text style={styles.buttonText}>+ Add Payment Method</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'darkred' }]} onPress={handleUpgradePlan}>
                  <Text style={styles.buttonText}>Delete Card</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionTitle}>BILLING HISTORY</Text>
              <View style={styles.divider} />
              {billingHistory.map((entry, index) => (
                <View key={index} style={styles.historyEntry}>
                  <Text>Date: {entry.date}</Text>
                  <Text>Amount: {entry.amount}</Text>
                </View>
              ))}
            </View>
           
              
          </View>
        </ScrollView>
      </View>
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
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 5,
    color: '#206C00',
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
});

export default BillingSettingsPage;
