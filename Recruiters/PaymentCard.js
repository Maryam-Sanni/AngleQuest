import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, CheckBox, Image, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function PaymentForm({ onClose }) {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [selectedOption, setSelectedOption] = useState('CreditOrDebitCard');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  const initiatePayment = async () => {
    try {
      setIsLoading(true); // Start loading state
  
      // Retrieve values from AsyncStorage
      const values = await AsyncStorage.multiGet(['first_name', 'last_name', 'email']);
      const firstName = values.find(item => item[0] === 'first_name')?.[1] || "";
      const lastName = values.find(item => item[0] === 'last_name')?.[1] || "";
      const email = values.find(item => item[0] === 'email')?.[1] || "";
      const selectedPlanData = JSON.parse(await AsyncStorage.getItem("selectedPlan"));
      const selectedPlanType = selectedPlanData?.[0]?.type || ""; // Extract only the type      
      const selectedPlanCost = JSON.parse(await AsyncStorage.getItem("selectedPlanCost")) || 0;
  
      // Combine first and last name
      const fullName = `${firstName} ${lastName}`;
  
      // Set state with the retrieved values
      setFullName(fullName);
      setEmail(email);
  
      // Get token from AsyncStorage for authorization
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Authorization token not found.");
        setIsLoading(false);
        return;
      }
  
      // Define the payload to be sent to the backend
      const paymentPayload = {
        email: email,
        plan: selectedPlanType,
        amount: selectedPlanCost,
        card_number: cardNumber,
        cvv: cvv,
        expiry_month: expMonth,
        expiry_year: expYear,
      };
  
      // Make the payment request to the backend
      const paymentResponse = await axios.post(`${apiUrl}/api/jobseeker/charge-card`, paymentPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Check if the charge was successful
      if (paymentResponse?.data?.message === "Charge successful") {
        Alert.alert("Success", "Payment initiated successfully!");
        
        // You can navigate the user instead of reloading the app
        // Example: navigation.navigate("SuccessScreen");
  
      } else {
        Alert.alert("Error", "Payment initiation failed. Please check card details.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Alert.alert("An error occurred", error.response?.data?.message || "Please try again.");
    } finally {
      setIsLoading(false); // End loading state
      window.location.reload();
    }
  };
  



  // Payment success callback
  const handlePaymentSuccess = (transaction) => {
    console.log('Payment Successful:', transaction);
    Alert.alert('Payment Successful', `Transaction Reference: ${transaction.reference}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
          ✕
        </Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Payment Method</Text>
          <Text style={styles.subHeaderText}>
            This is the primary payment method that will be charged.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {/* Credit or Debit Card Option */}
          <TouchableOpacity
            style={[styles.button, selectedOption === 'CreditOrDebitCard' && styles.selectedButton]}
            onPress={() => setSelectedOption('CreditOrDebitCard')}
          >
            {selectedOption === 'CreditOrDebitCard' && (
              <Image
                source={{
                  uri: 'https://img.icons8.com/?size=100&id=83205&format=png&color=206C00',
                }}
                style={{ width: 20, height: 20, alignSelf: 'flex-end', marginTop: -10 }}
              />
            )}
            <Image
              source={{
                uri: 'https://img.icons8.com/?size=100&id=22128&format=png&color=000000',
              }}
              style={{ width: 50, height: 50, alignSelf: 'center' }}
            />
            <Text style={styles.buttonText}>Credit Or Debit Card</Text>
          </TouchableOpacity>


        </View>

        {/* Conditionally Render Form Fields */}
        {selectedOption === 'CreditOrDebitCard' ? (
          <View style={styles.formcontainer}>
            <Text style={styles.label}>Cardholder Name (exactly as printed on card)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., John Doe"
              placeholderTextColor="grey"
              value={cardName}
              onChangeText={setCardName}
            />

            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
               placeholderTextColor="grey"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
            />

            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
               placeholderTextColor="grey"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
            />

            {/* Expiration Date */}
            <Text style={styles.label}>Expiration Date</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="MM"
                 placeholderTextColor="grey"
                value={expMonth}
                onChangeText={setExpMonth}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.smallInput]}
                placeholder="YY"
                 placeholderTextColor="grey"
                value={expYear}
                onChangeText={setExpYear}
                keyboardType="numeric"
              />
            </View>
          </View>
        ) : (
          <View style={styles.formcontainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., John Doe"
               placeholderTextColor="grey"
              value={fullName}
              onChangeText={setFullName}
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., +1 123 456 7890"
               placeholderTextColor="grey"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., john.doe@example.com"
               placeholderTextColor="grey"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Billing Address</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 123 Main St, City, State"
               placeholderTextColor="grey"
              value={billingAddress}
              onChangeText={setBillingAddress}
            />
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity onPress={initiatePayment} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    marginTop: 40,
    width: 700
  },
  formcontainer: {
    backgroundColor: '#F8F8F8',
    padding: 30,
    marginTop: 30,
    marginBottom: 30
  },
  header: {
    marginBottom: 10,
    marginTop: 10
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    padding: 20,
    marginRight: 10,
    backgroundColor: 'none',
    borderRadius: 10,
    width: 180,
    borderColor: 'lightgrey',
    borderWidth: 2,
    marginRight: 20
  },
  selectedButton: {
    backgroundColor: 'none',
    borderColor: 'green',
    borderWidth: 3,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#DDD',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    width: '45%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  captchaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  captchaImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  captchaText: {
    fontSize: 12,
    color: '#555',
  },
  submitButton: {
    backgroundColor: '#206C00',
    padding: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default PaymentForm;
