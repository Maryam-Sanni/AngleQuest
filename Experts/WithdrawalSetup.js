import React from 'react';
import { View, Text, Image, CheckBox, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';

function MyComponent() {
  const navigation = useNavigation();
  const handleBalancePress = () => {
    navigation.navigate('RequestPayout'); // Navigate to Requestpayout screen
  };

  const goToAccountSettings = () => {
    navigation.navigate('Account Setup');
  };

  const goToResetPassword = () => {
    navigation.navigate('Password');
  };

  const goToNotificationSettings = () => {
    navigation.navigate('Notification Setup');
  };

  const goToBillingsAndPayment = () => {
    navigation.navigate('Withdrawal Setup');
  };

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 20, backgroundColor: 'white', marginLeft: 230 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <View style={{ flex: 1, marginRight: 5, maxWidth: '70%' }}>
               <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#206C00', marginBottom: 20, marginTop: 10 }}>Add a withdrawal method</Text>
                <View style={{ alignItems: 'flex-end', marginLeft: 450 }}>
              <Text style={{ fontSize: 14, fontWeight: '600',  }}>Available balance</Text>

              <TouchableOpacity style={styles.button} onPress={handleBalancePress}>
      <Text style={styles.text}>$1,234.00</Text>
    </TouchableOpacity>
            </View>
              </View>
              <View style={{ marginBottom: 10, marginTop: 30 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Recommended method for you</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ca5a7febc964f7c0b83704af79ecc3672f36012e048830bcf05e2a3d4c39b03d?' }}
                style={{ width: 35, height: 35, marginRight: 95, marginTop: -20 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 5 }}>Local Bank</Text>
                <Text style={{ fontSize: 13, marginBottom: 5 }}>• $0.99 USD per withdrawal</Text>
                <Text style={{ fontSize: 13, marginBottom: 5 }}>• Withdraw funds directly into your local bank</Text>
              </View>
            
            <TouchableOpacity style={{ alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 8, backgroundColor: 'coral', borderRadius: 5 }}>
              <Text style={{ color: 'white', fontSize: 14 }}>Set up</Text>
            </TouchableOpacity>
          </View>
              
               <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 30, marginLeft: 5, marginRight: 20 }} />   
               
               <View style={{ marginTop: 20, marginHorizontal: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bd6743481c726e33bcb35466888d1e3911e6448a2e87aa46de6fd902c814c762?' }}
              style={{ width: 80, height: 20, marginRight: 50, marginTop: -40 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 10 }}>Paypal</Text>
               <Text style={{ fontSize: 13, marginBottom: 5 }}>$2.00 USD per withdrawal</Text>
               <Text style={{ fontSize: 13, marginBottom: 5 }}>Paypal may charge additional fee per transaction (sending and withdrawing)</Text>
            </View>
            <TouchableOpacity style={{ alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -10 }}>
              <Text style={{ color: 'coral', fontSize: 14 }}>Set up</Text>
            </TouchableOpacity>
          </View>
        </View>
             <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image
             source={require('../assets/payoneerlogo.png')}
              style={{ width: 110, height: 21, marginRight: 25, marginTop: -40 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600' }}>Payoneer</Text>
              <Text style={{ fontSize: 13, marginBottom: 5 }}>$2.00 USD per withdrawal</Text>
              <Text style={{ fontSize: 13, marginBottom: 5 }}>Payoneer charges additional fees to withdraw funds. Create a Payoneer account <TouchableOpacity style={{ color: '#32CD32' }}>here</TouchableOpacity></Text>
            </View>
            <TouchableOpacity style={{ alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -5 }}>
              <Text style={{ color: 'coral', fontSize: 14  }}>Set up</Text>
            </TouchableOpacity>
          </View>
        </View>   
               <View style={{ marginTop: 8, marginHorizontal: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f8fcfecb3d17bd589f01cbad97bd1c71693401d4530ffd86ee9536cd1effb618?' }}
              style={{ width: 35, height: 35, marginRight: 95, marginTop: -20 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 5 }}>Wire Transfer</Text>
               <Text style={{ fontSize: 13, marginBottom: 5 }}>$25.00 USD per wire to any bank</Text>
             <Text style={{ fontSize: 13, marginBottom: 5 }}>Up to 7 business days to receive funds</Text>
            </View>
            <TouchableOpacity style={{  alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 8,  borderRadius: 5, borderWidth: 1, borderColor: "coral", marginRight: -10 }}>
              <Text style={{ color: 'coral', fontSize: 14  }}>Set up</Text>
            </TouchableOpacity>
          </View>
        </View>       
              </View>

            {/* Card on the right */}
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
                <Text style={{ fontSize: 12, color: 'coral', fontWeight: 'bold', marginTop: 15 }}>Payment</Text>
              </View>
              </TouchableOpacity>
            </View>
          </View>
              </View>
            </View>
          </View>
        </View>
  );
}

export default MyComponent;

const styles = StyleSheet.create({
  cardContainer: {
    width: '16%',
    height: 180, 
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 30,
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
    marginBottom: 5
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
  text: {
    fontSize: 17,
    color: '#206C00',
    fontWeight: '600',
  },
});
