import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Picker, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentComponent = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [paymentOption, setPaymentOption] = useState('full');
  const [paymentDate1, setPaymentDate1] = useState('');
  const [paymentDate2, setPaymentDate2] = useState('');
  const [paymentStatus] = useState('pending');

  const accountDetails = {
    accountNumber: 'NL18REVO2553615475REVONL22',
    bankName: 'Revolut Bank UAB',
    accountName: 'Oluwayemisi Akingbade',
  };

  const handleSavePayment = async () => {
    if (paymentOption === 'full' && !paymentDate1) {
      alert(t("Please provide the payment date."));
    } else if (paymentOption === 'installments' && (!paymentDate1 || !paymentDate2)) {
      alert(t("Please provide both payment dates."));
    } else {
      try {
        // Get token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          alert(t("User token not found!"));
          return;
        }

        // Construct API request data
        const requestData = {
          payment_option: paymentOption,
          payment_date1: paymentDate1,
          payment_date2: paymentOption === 'installments' ? paymentDate2 : null,
          payment_status: paymentStatus,
        };

        // Make the API call
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.post(
          `${apiUrl}/api/expert/create-payment`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set token in the header
            },
          }
        );

        if (response.status === 201) {
          console.log("Payment Saved", response.data);
          // Navigate to the skill analysis sessions page after saving payment
         navigate('/skill-analysis-sessions');
        } else {
          alert(t("Failed to save payment details. Please try again."));
        }
      } catch (error) {
        console.error("Error saving payment", error);
        alert(t("An error occurred while saving the payment. Please try again later."));
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
        <View style={styles.greenBox}>
        <View style={styles.header}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1f2d38e99b0016f2bd167d2cfd38ff0d43c9f94a93c84b4e04a02d32658fb401?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
              style={styles.logo}
            />
            <Text style={styles.headerText}>{t("Payment Options")}</Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={{ fontSize: 18, color: '#3F5637', fontWeight: 'bold', fontFamily: "Roboto-Light" }}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 30}}>{t("Program Costs: €500")}</Text>
            <Text style={{fontSize: 12, fontStyle: 'italic', fontFamily: 'Roboto-Light', marginBottom: 30}}>{t("Kindly send the payment screenshot to")}
            <Text style={{fontSize: 12, fontStyle: 'italic', fontFamily: 'Roboto-Light', marginBottom: 30, color: 'green'}}>{t(" ask@anglequest.com")}
            <Text style={{fontSize: 12, fontStyle: 'italic', fontFamily: 'Roboto-Light',  marginBottom: 30, color: 'black'}}>{t(" for confirmation")}</Text></Text></Text>

            <View style={styles.inputContainer}>
            <View style={[styles.cell, { flex: 1}]}>
              <Text style={styles.label}>{t("Select Payment Option")}</Text>
              </View>
              <View style={[styles.cell, { flex: 2}]}>
              <Picker
                selectedValue={paymentOption}
                style={styles.picker}
                onValueChange={(itemValue) => setPaymentOption(itemValue)}
              >
                <Picker.Item label={t("Full Payment")} value="full" />
                <Picker.Item label={t("Two Installments")} value="installments" />
              </Picker>
              </View>
              </View>
            </View>
          </View>

          {paymentOption === 'full' && (
            <View style={styles.inputContainer}>
                <View style={[styles.cell, { flex: 1}]}>
              <Text style={styles.label}>{t("Payment Date")}</Text>
              </View>
              <View style={[styles.cell, { flex: 2}]}>
              <View Style ={{flexDirection: 'column'}}>
              <TextInput
                style={styles.input}
                placeholder={t("Date: 2024-01-12")}
                value={paymentDate1}
                onChangeText={setPaymentDate1}
              />
             <Text style={{fontSize: 12, fontStyle: 'italic'}}>{t("Enter the date when payment will be made")}</Text>
            </View>
            </View>
            </View>
          )}

          {paymentOption === 'installments' && (
            <View>
              <View style={styles.inputContainer}>
              <View style={[styles.cell, { flex: 1}]}>
                <Text style={styles.label}>{t("Payment Date 1")}</Text>
                </View>
                <View style={[styles.cell, { flex: 2}]}>
                <View Style ={{flexDirection: 'column'}}>
                <TextInput
                  style={styles.input}
                  placeholder={t("Date: 2024-01-12")}
                  value={paymentDate1}
                  onChangeText={setPaymentDate1}
                />
                <Text style={{fontSize: 12, fontStyle: 'italic'}}>{t("Enter the date when first payment will be made")}</Text>
              </View>
              </View>
              </View>
              <View style={styles.inputContainer}>
              <View style={[styles.cell, { flex: 1}]}>
                <Text style={styles.label}>{t("Payment Date 2")}</Text>
                </View>
                <View style={[styles.cell, { flex: 2}]}>
                <View Style ={{flexDirection: 'column'}}>
                <TextInput
                  style={styles.input}
                  placeholder={t("Date: 2024-01-12")}
                  value={paymentDate2}
                  onChangeText={setPaymentDate2}
                />
               <Text style={{fontSize: 12, fontStyle: 'italic'}}>{t("Enter the date when second payment will be made")}</Text>
              </View>
              </View>
              </View>
            </View>
          )}

          <View style={styles.accountDetailsContainer}>
            <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 20}}>{t("Account Details")}</Text>
            <Text style={styles.detail}>{t("Bank Name")}: {accountDetails.bankName}</Text>
            <Text style={styles.detail}>{t("IBAN/Account Number")}: {accountDetails.accountNumber}</Text>
            <Text style={styles.detail}>{t("Account Name")}: {accountDetails.accountName}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSavePayment}>
            <Text style={styles.buttonText}>{t("Complete & Start")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 920,
    backgroundColor: 'white',
    flex: 1,
  },
  greenBox: {
    backgroundColor: 'white',
    width: 920,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  picker: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingLeft: 5,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginRight: 20,
    fontFamily: 'Roboto-Light',
    width: 200
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 0.5,
    paddingLeft: 10,
    fontFamily: 'Roboto-Light',
    borderRadius: 5,
  },
  accountDetailsContainer: {
    marginTop: 20,
    padding: 10,
    marginTop: 50,
    borderRadius: 5,
    marginLeft: 300
  },
  detail: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'Roboto-Light',
  },
  button: {
    backgroundColor: 'coral',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: 200,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F5637',
    fontFamily: 'Roboto-Light',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#3F5637',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5,
  },
});

export default PaymentComponent;
