
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, CheckBox, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';

function MyComponent() {
  const navigation = useNavigation();
  const [isCVChecked, setIsCVChecked] = useState(false);
  const [isInterviewResultsChecked, setIsInterviewResultsChecked] = useState(false);

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

  return (
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <View style={{ flex: 1, backgroundColor: 'white', marginLeft: 230 }}>
          <Text style={{ fontSize: 18, color: '#206C00', fontWeight: 'bold', marginTop: 10, marginBottom: 10, marginLeft: 10 }}>Contact Information</Text>
          <View style={{ flexDirection: 'row', paddingHorizontal: 8, paddingTop: 8 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Text style={{ color: 'black', marginRight: 77 }}>Full Name</Text>
                <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                 marginLeft: 5,
                  borderRadius: 5,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholdertextColor: 'black'
                }}
                placeholder="Username"
              />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Text style={{ color: 'black', marginRight: 105 }}>Email</Text>
                <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                 marginLeft: 5,
                  borderRadius: 5,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholdertextColor: 'black'
                }}
                placeholder="user@gmail.com"
              />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Text style={{ color: 'black', marginRight: 42}}>Mobile Number</Text>
                <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                 marginLeft: 5,
                  borderRadius: 5,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholdertextColor: 'black'
                }}
                placeholder="+1 902 762 5422"
              />
              </View>
                
              <View style={{ justifyContent: 'center', alignSelf: 'flex-end', paddingHorizontal: 10, paddingVertical: 8, marginTop: 20, backgroundColor: 'coral', borderRadius: 5 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Save Changes</Text>
              </View>
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.cardContent}>
                <TouchableOpacity onPress={goToAccountSettings}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9b7a3a6d0178d9e4654db03454de5de060a67e4b91a6fe4d31a059874d384eb2?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5 }} />
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'coral' }}>Account Settings</Text>
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
                    <Text style={{ fontSize: 12, color: 'black', marginTop: 15 }}>Billings & Payment</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20, marginLeft: 20, marginRight: 280 }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
  <Text style={{ color: '#206C00', marginTop: 10, fontWeight: 'bold', fontSize: 14, marginLeft: 10 }}>Permissions</Text>
  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between', marginLeft: 150, marginTop: 30 }}>
    <View>
      <Text style={{ fontSize: 13, color: 'black', fontWeight: 'bold' }}>Share CV with Interviewer</Text>
      <Text style={{ fontSize: 11, color: '#777' }}>Automatically share your CV with interviewer after booking a session</Text>
      <CheckBox
        style={{ marginLeft: 400, marginTop: -15 }}
        value={isCVChecked}
        onValueChange={setIsCVChecked}
      />
    </View>
  </View>
</View>
<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 240 }}>
  <View>
    <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Share interview results with Recruiter</Text>
    <Text style={{ fontSize: 11, color: '#777' }}>Grant interviewers permission to share your interview results with recruiters</Text>
    <CheckBox
      style={{ marginLeft: 400, marginTop: -15 }}
      value={isInterviewResultsChecked}
      onValueChange={setIsInterviewResultsChecked}
    />
  </View>
</View>



          <View style={{ paddingHorizontal: 8, marginTop: 10  }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#206C00', marginTop: 40 }}>Account Deactivation</Text>
            <View style={{ flexDirection: 'row', marginTop: - 20 }}>
              <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 13, color: 'black', fontWeight: 'bold', marginLeft: 230 }}>This is what happens when you deactivate your account</Text>
                <Text style={{ fontSize: 11, color: '#777', marginTop: 4, marginLeft: 240 }}>• Your profile will be permanently deleted from our server</Text>
                <Text style={{ fontSize: 11, color: '#777', marginTop: 2, marginLeft: 240 }}>• Booked sessions will be cancelled</Text>
                <Text style={{ fontSize: 11, color: '#777', marginTop: 2, marginLeft: 240 }}>• Forwarded feedback to Recruiters will be retracted</Text>
                <Text style={{ fontSize: 11, color: '#777', marginTop: 2, marginLeft: 240 }}>• You won’t be able to reactivate booked sessions</Text>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignSelf: 'flex-end', paddingHorizontal: 8, paddingVertical: 8, marginTop: 15, backgroundColor: 'red', borderRadius: 5, marginRight: 210 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Deactivate account</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginLeft: 5,
  },
  cardContainer: {
    width: '16%',
    height: 180, 
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
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

export default MyComponent;