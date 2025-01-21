import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

  const PayToBankAccount = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentAuth = () => {
    setIsLoading(true);

    // Simulate a delay for the API call (later you will implement actual API call)
    setTimeout(() => {
      // Simulate API response, set isLoading to false when finished
      setIsLoading(false);
      // Handle actual API logic here
    }, 3000); // Simulating a 3-second delay for the API call
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
      
      {/* Bank Account Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ready to make a new payment?</Text>
          <View style={styles.paymentAction}>
            <Text style={styles.paymentText}>Bank Name: Revolut Bank UAB</Text>
            <Text style={styles.paymentText}>IBAN/Account Number: NL18REVO2553615475REVONL22</Text>
            <Text style={styles.paymentText}>Account Name: Oluwayemisi Akingbade</Text>
          </View>
        </View>

      {/* Already Made Payment Button */}
      <TouchableOpacity style={styles.paymentButton} onPress={handlePaymentAuth}>
        <Text style={styles.buttonText}>I have already made this payment</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#206C00" />
          <Text style={styles.authenticatingText}>We are waiting to receive your bank transfer. This may take a while. We'll complete your transaction automatically once we confirm your transfer.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    height: 550
  },
  card: {
    backgroundColor: '#8FBF8F',
    alignSelf: 'center',
    marginTop: 100,
    borderRadius: 15,
    width: '90%',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentAction: {
    marginTop: 10,
  },
  paymentText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  paymentup: {
    color: '#fff',
    fontSize: 16,
    position: 'absolute',
    right: 20
  },
  paymentText2: {
    color: '#fff',
    fontSize: 16,
  },
  paymentButton: {
    backgroundColor: '#206C00',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  authenticatingText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    width: 400
  },
  closeButton: {
    position: "absolute",
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#3F5637",
    fontWeight: "bold",
  },
});

export default PayToBankAccount;
