import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Picker, Image, TouchableOpacity, Alert, StyleSheet, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../components/CustomAlert';
import OpenModal from '../Experts/TourGuide';

const PaymentDetailsForm = ({ onClose }) => {
  const [bankName, setBankName] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [country, setCountry] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const handleSubmit = async () => {
    if (!bankName || !accountNumber || !mobileNumber || !country) {
      setAlertMessage('Fill required fields');
      setAlertVisible(true);
      return;
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('No token found');
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/jobseeker/payment-details`,
        {
          bank_name: bankName,
          sort_code: sortCode || 'Not Applicable',
          acc_num: accountNumber,
          mobile_num: mobileNumber,
          country: country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setAlertMessage('Payment details saved successfully');
      } else {
        setAlertMessage('Failed to save payment details');
      }
    } catch (error) {
      console.error('Error saving payment details:', error);
      setAlertMessage('An error occurred');
    }
     await AsyncStorage.setItem('formSubmitted', 'true');
    // Close the profile modal and open the TourGuide modal
    setAlertVisible(true);
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  // When the form is submitted, wait 3 seconds and then reopen the modal
  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => {
        setModalVisible(true); // Open the modal after 3 seconds
        setFormSubmitted(false); // Reset the form submission state
      }, 3000); // 3-second delay after form submission

      return () => clearTimeout(timer); // Cleanup timeout on unmount or if formSubmitted changes
    }
  }, [formSubmitted]); // This effect will run whenever formSubmitted is true


  const hideAlert = () => {
    setAlertVisible(false);
    setIsVisible(false);
    onClose();  
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const countries = [
    { label: ' ', value: ' ' },
    { label: 'Afghanistan', value: 'AF' },
    { label: 'Albania', value: 'AL' },
    { label: 'Algeria', value: 'DZ' },
    { label: 'Andorra', value: 'AD' },
    { label: 'Angola', value: 'AO' },
    { label: 'Antigua and Barbuda', value: 'AG' },
    { label: 'Argentina', value: 'AR' },
    { label: 'Armenia', value: 'AM' },
    { label: 'Australia', value: 'AU' },
    { label: 'Austria', value: 'AT' },
    { label: 'Azerbaijan', value: 'AZ' },
    { label: 'Bahamas', value: 'BS' },
    { label: 'Bahrain', value: 'BH' },
    { label: 'Bangladesh', value: 'BD' },
    { label: 'Barbados', value: 'BB' },
    { label: 'Belarus', value: 'BY' },
    { label: 'Belgium', value: 'BE' },
    { label: 'Belize', value: 'BZ' },
    { label: 'Benin', value: 'BJ' },
    { label: 'Bhutan', value: 'BT' },
    { label: 'Bolivia', value: 'BO' },
    { label: 'Bosnia and Herzegovina', value: 'BA' },
    { label: 'Botswana', value: 'BW' },
    { label: 'Brazil', value: 'BR' },
    { label: 'Brunei Darussalam', value: 'BN' },
    { label: 'Bulgaria', value: 'BG' },
    { label: 'Burkina Faso', value: 'BF' },
    { label: 'Burundi', value: 'BI' },
    { label: 'Cabo Verde', value: 'CV' },
    { label: 'Cambodia', value: 'KH' },
    { label: 'Cameroon', value: 'CM' },
    { label: 'Canada', value: 'CA' },
    { label: 'Central African Republic', value: 'CF' },
    { label: 'Chad', value: 'TD' },
    { label: 'Chile', value: 'CL' },
    { label: 'China', value: 'CN' },
    { label: 'Colombia', value: 'CO' },
    { label: 'Comoros', value: 'KM' },
    { label: 'Congo (Congo-Brazzaville)', value: 'CG' },
    { label: 'Congo (Democratic Republic)', value: 'CD' },
    { label: 'Costa Rica', value: 'CR' },
    { label: 'Croatia', value: 'HR' },
    { label: 'Cuba', value: 'CU' },
    { label: 'Cyprus', value: 'CY' },
    { label: 'Czechia (Czech Republic)', value: 'CZ' },
    { label: 'Denmark', value: 'DK' },
    { label: 'Djibouti', value: 'DJ' },
    { label: 'Dominica', value: 'DM' },
    { label: 'Dominican Republic', value: 'DO' },
    { label: 'Ecuador', value: 'EC' },
    { label: 'Egypt', value: 'EG' },
    { label: 'El Salvador', value: 'SV' },
    { label: 'Equatorial Guinea', value: 'GQ' },
    { label: 'Eritrea', value: 'ER' },
    { label: 'Estonia', value: 'EE' },
    { label: 'Eswatini (fmr. "Swaziland")', value: 'SZ' },
    { label: 'Ethiopia', value: 'ET' },
    { label: 'Fiji', value: 'FJ' },
    { label: 'Finland', value: 'FI' },
    { label: 'France', value: 'FR' },
    { label: 'Gabon', value: 'GA' },
    { label: 'Gambia', value: 'GM' },
    { label: 'Georgia', value: 'GE' },
    { label: 'Germany', value: 'DE' },
    { label: 'Ghana', value: 'GH' },
    { label: 'Greece', value: 'GR' },
    { label: 'Grenada', value: 'GD' },
    { label: 'Guatemala', value: 'GT' },
    { label: 'Guinea', value: 'GN' },
    { label: 'Guinea-Bissau', value: 'GW' },
    { label: 'Guyana', value: 'GY' },
    { label: 'Haiti', value: 'HT' },
    { label: 'Honduras', value: 'HN' },
    { label: 'Hungary', value: 'HU' },
    { label: 'Iceland', value: 'IS' },
    { label: 'India', value: 'IN' },
    { label: 'Indonesia', value: 'ID' },
    { label: 'Iran', value: 'IR' },
    { label: 'Iraq', value: 'IQ' },
    { label: 'Ireland', value: 'IE' },
    { label: 'Israel', value: 'IL' },
    { label: 'Italy', value: 'IT' },
    { label: 'Jamaica', value: 'JM' },
    { label: 'Japan', value: 'JP' },
    { label: 'Jordan', value: 'JO' },
    { label: 'Kazakhstan', value: 'KZ' },
    { label: 'Kenya', value: 'KE' },
    { label: 'Kiribati', value: 'KI' },
    { label: 'Korea, North', value: 'KP' },
    { label: 'Korea, South', value: 'KR' },
    { label: 'Kuwait', value: 'KW' },
    { label: 'Kyrgyzstan', value: 'KG' },
    { label: 'Laos', value: 'LA' },
    { label: 'Latvia', value: 'LV' },
    { label: 'Lebanon', value: 'LB' },
    { label: 'Lesotho', value: 'LS' },
    { label: 'Liberia', value: 'LR' },
    { label: 'Libya', value: 'LY' },
    { label: 'Liechtenstein', value: 'LI' },
    { label: 'Lithuania', value: 'LT' },
    { label: 'Luxembourg', value: 'LU' },
    { label: 'Madagascar', value: 'MG' },
    { label: 'Malawi', value: 'MW' },
    { label: 'Malaysia', value: 'MY' },
    { label: 'Maldives', value: 'MV' },
    { label: 'Mali', value: 'ML' },
    { label: 'Malta', value: 'MT' },
    { label: 'Marshall Islands', value: 'MH' },
    { label: 'Mauritania', value: 'MR' },
    { label: 'Mauritius', value: 'MU' },
    { label: 'Mexico', value: 'MX' },
    { label: 'Micronesia', value: 'FM' },
    { label: 'Moldova', value: 'MD' },
    { label: 'Monaco', value: 'MC' },
    { label: 'Mongolia', value: 'MN' },
    { label: 'Montenegro', value: 'ME' },
    { label: 'Morocco', value: 'MA' },
    { label: 'Mozambique', value: 'MZ' },
    { label: 'Myanmar', value: 'MM' },
    { label: 'Namibia', value: 'NA' },
    { label: 'Nauru', value: 'NR' },
    { label: 'Nepal', value: 'NP' },
    { label: 'Netherlands', value: 'NL' },
    { label: 'New Zealand', value: 'NZ' },
    { label: 'Nicaragua', value: 'NI' },
    { label: 'Niger', value: 'NE' },
    { label: 'Nigeria', value: 'NG' },
    { label: 'North Macedonia', value: 'MK' },
    { label: 'Norway', value: 'NO' },
    { label: 'Oman', value: 'OM' },
    { label: 'Pakistan', value: 'PK' },
    { label: 'Palau', value: 'PW' },
    { label: 'Panama', value: 'PA' },
    { label: 'Papua New Guinea', value: 'PG' },
    { label: 'Paraguay', value: 'PY' },
    { label: 'Peru', value: 'PE' },
    { label: 'Philippines', value: 'PH' },
    { label: 'Poland', value: 'PL' },
    { label: 'Portugal', value: 'PT' },
    { label: 'Qatar', value: 'QA' },
    { label: 'Romania', value: 'RO' },
    { label: 'Russia', value: 'RU' },
    { label: 'Rwanda', value: 'RW' },
    { label: 'Saint Kitts and Nevis', value: 'KN' },
    { label: 'Saint Lucia', value: 'LC' },
    { label: 'Saint Vincent and the Grenadines', value: 'VC' },
    { label: 'Samoa', value: 'WS' },
    { label: 'San Marino', value: 'SM' },
    { label: 'Sao Tome and Principe', value: 'ST' },
    { label: 'Saudi Arabia', value: 'SA' },
    { label: 'Senegal', value: 'SN' },
    { label: 'Serbia', value: 'RS' },
    { label: 'Seychelles', value: 'SC' },
    { label: 'Sierra Leone', value: 'SL' },
    { label: 'Singapore', value: 'SG' },
    { label: 'Slovakia', value: 'SK' },
    { label: 'Slovenia', value: 'SI' },
    { label: 'Solomon Islands', value: 'SB' },
    { label: 'Somalia', value: 'SO' },
    { label: 'South Africa', value: 'ZA' },
    { label: 'South Sudan', value: 'SS' },
    { label: 'Spain', value: 'ES' },
    { label: 'Sri Lanka', value: 'LK' },
    { label: 'Sudan', value: 'SD' },
    { label: 'Suriname', value: 'SR' },
    { label: 'Sweden', value: 'SE' },
    { label: 'Switzerland', value: 'CH' },
    { label: 'Syria', value: 'SY' },
    { label: 'Taiwan', value: 'TW' },
    { label: 'Tajikistan', value: 'TJ' },
    { label: 'Tanzania', value: 'TZ' },
    { label: 'Thailand', value: 'TH' },
    { label: 'Timor-Leste', value: 'TL' },
    { label: 'Togo', value: 'TG' },
    { label: 'Tonga', value: 'TO' },
    { label: 'Trinidad and Tobago', value: 'TT' },
    { label: 'Tunisia', value: 'TN' },
    { label: 'Turkey', value: 'TR' },
    { label: 'Turkmenistan', value: 'TM' },
    { label: 'Tuvalu', value: 'TV' },
    { label: 'Uganda', value: 'UG' },
    { label: 'Ukraine', value: 'UA' },
    { label: 'United Arab Emirates', value: 'AE' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'United States', value: 'US' },
    { label: 'Uruguay', value: 'UY' },
    { label: 'Uzbekistan', value: 'UZ' },
    { label: 'Vanuatu', value: 'VU' },
    { label: 'Vatican City', value: 'VA' },
    { label: 'Venezuela', value: 'VE' },
    { label: 'Vietnam', value: 'VN' },
    { label: 'Yemen', value: 'YE' },
    { label: 'Zambia', value: 'ZM' },
    { label: 'Zimbabwe', value: 'ZW' }
  ];
  
  return (
    <View style={styles.container}>
       <ScrollView contentContainerStyle={{maxHeight: 500}}>

         <Text style={styles.title}>Provide Bank Details (For Withdrawal)</Text>
         <Text style={styles.description}>
           Ensure you provide accurate details to avoid delays or issues during the withdrawal process.
         </Text>

         
      <Text style={styles.label}>Bank Name</Text>
      <TextInput
        style={styles.input}
        value={bankName}
        onChangeText={setBankName}
        placeholder="Enter bank name"
        placeholderTextColor="grey"
      />

          <Text style={styles.label}>Bank Account Name</Text>
          <TextInput
            style={styles.input}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Alex Ander"
            keyboardType="numeric"
            placeholderTextColor="grey"
          />
         
      <Text style={styles.label}>Bank Account Number</Text>
      <TextInput
        style={styles.input}
        value={accountNumber}
        onChangeText={setAccountNumber}
        placeholder="XXXXXXXXXX"  // 10-digit placeholder for account number
        keyboardType="numeric"
        placeholderTextColor="grey"
      />

         <Text style={styles.label}>Sort/Swift Code (If applicable)</Text>
         <TextInput
           style={styles.input}
           value={sortCode}
           onChangeText={setSortCode}
           placeholder="Enter sort code"
           keyboardType="numeric"
           placeholderTextColor="grey"
         />

      <Text style={styles.label}>Country</Text>
         <Picker
           selectedValue={country}
           style={styles.input}
           onValueChange={(itemValue) => setCountry(itemValue)}
         >
           {countries.map((country) => (
             <Picker.Item key={country.value} label={country.label} value={country.value} />
           ))}
         </Picker>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <CustomAlert
        visible={alertVisible}
        title={'Notification'}
        message={alertMessage}
        onConfirm={hideAlert}
      />
       </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal/>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginLeft: 150, marginRight: 150,
    marginTop: 30
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: 150
  },
  submitButtonText: {
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    width: 800,
    alignSelf: 'center'
  },
});

export default PaymentDetailsForm;
