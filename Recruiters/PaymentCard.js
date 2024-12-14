import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, CheckBox, Image, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';

function PaymentForm({ onClose }) {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

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
        <TouchableOpacity style={[styles.button, styles.selectedButton]}>
          <Image
            source={{ uri: 'https://img.icons8.com/?size=100&id=83205&format=png&color=206C00' }}
            style={{width: 20, height: 20, alignSelf: 'flex-end', marginTop: -10}}
          />
          <Image
            source={{ uri: 'https://img.icons8.com/?size=100&id=22128&format=png&color=000000' }}
            style={{width: 50, height: 50, alignSelf: 'center'}}
          />
          <Text style={styles.buttonText}>Credit Or Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={{ uri: 'https://img.icons8.com/?size=100&id=59872&format=png&color=000000' }}
            style={{width: 50, height: 50, alignSelf: 'center', marginTop: 10}}
          />
          <Text style={styles.buttonText}>Change Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
       <View style={styles.formcontainer}>
      <Text style={styles.label}>Cardholder Name (exactly as printed on card)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., John Doe"
        value={cardName}
        onChangeText={setCardName}
      />

      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={styles.input}
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        placeholder="123"
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
          value={expMonth}
          onChangeText={setExpMonth}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.smallInput]}
          placeholder="YY"
          value={expYear}
          onChangeText={setExpYear}
          keyboardType="numeric"
        />
      </View>

       </View>
      
      {/* Checkbox */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={useExistingAddress}
          onValueChange={setUseExistingAddress}
        />
        <Text style={styles.checkboxText}>Use the existing address for this payment method</Text>
      </View>

        <View style={styles.checkboxContainer}>
          <Switch
            value={isRecurring}
            onValueChange={(value) => setIsRecurring(value)}
          />
          <Text style={styles.checkboxText}>Make this payment recurring</Text>
        </View>

      {/* Captcha */}
      <View style={styles.captchaContainer}>
        <Image
          source={{ uri: 'https://www.gstatic.com/recaptcha/api2/logo_48.png' }}
          style={styles.captchaImage}
        />
        <Text style={styles.captchaText}>Privacy - Terms</Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
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
    backgroundColor: '#3F5637',
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
