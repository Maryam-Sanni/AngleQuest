import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';

const PaymentWithdrawalPage = () => {
  const [activeTab, setActiveTab] = useState('balance'); // Default active tab
  const [balance, setBalance] = useState(0);
  const [payments, setPayments] = useState([]);
  const [latestPayment, setLatestPayment] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
   const [withdrawalDetails, setWithdrawalDetails] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    // Function to fetch balance data with token from AsyncStorage
    const fetchBalance = async () => {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        // Make API request with token in headers
        const response = await fetch(`${apiUrl}/api/expert/get-balance`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.status === "success" && data.bal) {
          setBalance(data.bal.total_balance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);
  
  const fetchPaymentData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/api/jobseeker/get-payment-details`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const { PaymentDetail } = response.data;

        // Get the latest payment detail based on `created_at`
        if (PaymentDetail && PaymentDetail.length > 0) {
          const latestPayment = PaymentDetail.reduce((latest, current) =>
            new Date(latest.created_at) > new Date(current.created_at) ? latest : current
          );
          setLatestPayment(latestPayment);
        }
      } else {
        console.error('Failed to fetch payment data');
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };


  const handleWithdrawal = async () => {
    if (!withdrawalAmount) {
      Alert.alert('Please enter an amount to withdraw.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('No token found');
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/jobseeker/withdrawal-details`,
        { amount: withdrawalAmount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        Alert.alert('Withdrawal request submitted successfully!');
        setWithdrawalAmount('');
        fetchPaymentData(); // Refresh data after withdrawal
      } else {
        Alert.alert('Failed to submit withdrawal request.');
      }
    } catch (error) {
      console.error('Error submitting withdrawal request:', error);
      Alert.alert('An error occurred while submitting your withdrawal request.');
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const [paymentData, setPaymentData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Months
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 3, 5, 0, 0].map(sessions => sessions * 20), // Number of sessions * $20
        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // orange
        strokeWidth: 2,
      },
    ],
  });
  
  const renderBalanceSection = () => (
    <View>
      <Text style={styles.balance}>Total Balance: ${balance.toFixed(2)}</Text>
      <View style={styles.analyticsSection}>
        <BarChart
          data={paymentData}
          width={700} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff', // light green background gradient
            backgroundGradientTo: '#fff', // slightly darker green gradient
            decimalScale: 2,
            color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // forest green for the bars
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#388e3c', // dark green for dots
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );

  const renderPaymentsSection = () => (
    <View>
      <Text style={styles.subHeader}>Payments Received</Text>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.paymentItem}>
            <Text>{item.payerName} paid ${item.amount} for {item.description}</Text>
          </View>
        )}
      />
    </View>
  );

    const renderWithdrawalSection = () => (
      <View>
        <Text style={styles.subHeader}>Request a Withdrawal</Text>
        <TextInput
          style={styles.input}
          value={withdrawalAmount}
          onChangeText={setWithdrawalAmount}
          placeholder="Enter amount in USD"
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleWithdrawal} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Withdraw</Text>
        </TouchableOpacity>

        {/* Display Withdrawal Details */}


            {latestPayment && (
              <View style={styles.paymentDetails}>
                 <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 10, marginBottom: 10}}>Your Withdrawal Details</Text>
                <View style={styles.detailItem}>
                  <Image 
                    source={{ uri: 'https://img.icons8.com/material/24/000000/bank-building.png' }} 
                    style={styles.icon} 
                  />
                  <Text style={styles.detailText}>Bank Name: {latestPayment.bank_name}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Image 
                    source={{ uri: 'https://img.icons8.com/material/24/000000/barcode.png' }} 
                    style={styles.icon} 
                  />
                  <Text style={styles.detailText}>Sort Code: {latestPayment.sort_code}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Image 
                    source={{ uri: 'https://img.icons8.com/material/24/000000/card-in-use.png' }} 
                    style={styles.icon} 
                  />
                  <Text style={styles.detailText}>Account Number: {latestPayment.acc_num}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Image 
                    source={{ uri: 'https://img.icons8.com/material/24/000000/phone.png' }} 
                    style={styles.icon} 
                  />
                  <Text style={styles.detailText}>Mobile Number: {latestPayment.mobile_num}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Image 
                    source={{ uri: 'https://img.icons8.com/material/24/000000/worldwide-location.png' }} 
                    style={styles.icon} 
                  />
                  <Text style={styles.detailText}>Country: {latestPayment.country}</Text>
                </View>
              </View>
            )}
     

      </View>
  );

  const renderWithdrawalHistorySection = () => (
    <View>
      <Text style={styles.subHeader}>Withdrawal History</Text>
       <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 10}}>0 withdrawals this month</Text>
      <FlatList
        data={withdrawalHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.withdrawalItem}>
            <Text>Amount: ${item.amount}</Text>
            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
  
  return (
    <ScrollView style={styles.container}>


      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('balance')} style={[styles.tab, activeTab === 'balance' && styles.activeTab]}>
          <Text  style={[styles.tabText, activeTab === 'balance' && styles.activeTabtext]}>Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('payments')} style={[styles.tab, activeTab === 'payments' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'payments' && styles.activeTabtext]}>Payments</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('withdrawal')} style={[styles.tab, activeTab === 'withdrawal' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'withdrawal' && styles.activeTabtext]}>Withdrawal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('withdrawalHistory')} style={[styles.tab, activeTab === 'withdrawalHistory' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'withdrawalHistory' && styles.activeTabtext]}>Withdrawal History</Text>
        </TouchableOpacity>
      </View>

      {/* Render the active section based on the selected tab */}
      {activeTab === 'balance' && renderBalanceSection()}
      {activeTab === 'payments' && renderPaymentsSection()}
      {activeTab === 'withdrawal' && renderWithdrawalSection()}
      {activeTab === 'withdrawalHistory' && renderWithdrawalHistorySection()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    backgroundColor: 'white',
    marginRight: 50
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balance: {
    fontSize: 20,
    marginBottom: 20,
     fontWeight: '500',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 10,
  },
  paymentItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: 'coral',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
    width: 120
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginRight: 20
  },
  activeTab: {
    backgroundColor: '#206C00',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabtext: {
    fontSize: 16,
    color: 'white',
  },
  analyticsSection: {
    marginTop: 20,
    padding: 20,
    width: 740,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  analyticsHeader: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#CCC',  // Optional: apply color
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  paymentDetails: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default PaymentWithdrawalPage;
