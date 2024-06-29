import React, { useState } from 'react';
import { View, Text, Image, CheckBox, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';

function MyComponent() {
  const navigation = useNavigation();
  const [isNewsChecked, setIsNewsChecked] = useState(false);
  const [isTipsChecked, setIsTipsChecked] = useState(false);
  const [isMessagesChecked, setIsMessagesChecked] = useState(false);
  const [isFeedbacksChecked, setIsFeedbacksChecked] = useState(false);
  const [isRemindersChecked, setIsRemindersChecked] = useState(false);
  const [isPushFeedbacksChecked, setIsPushFeedbacksChecked] = useState(false);
  const [isPushRemindersChecked, setIsPushRemindersChecked] = useState(false);


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
    navigation.navigate('Earnings');
  };

  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 20, backgroundColor: 'white', marginLeft: 230 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <View style={{ flex: 1, marginRight: 5, maxWidth: '70%' }}>
              <View>
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#206C00', marginBottom: 20 }}>Notification Settings</Text>
              </View>
              <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                <View>
                  <Text style={{ fontSize: 15, color: '#206C00', fontWeight: '500' }}>Email notifications</Text>
                  <Text style={{ fontSize: 12, color: 'black', marginBottom: 20 }}>Get emails to find out what’s going on when you’re not online. You can turn these off.</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>News and updates</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, color: 'black' }}>Receive the latest news about products and feature updates.</Text>
                    <CheckBox
        style={{ marginRight: 10}}
        value={isNewsChecked}
        onValueChange={setIsNewsChecked}
      />
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>Tips and tutorials</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, color: 'black' }}>Tips on getting more out of our services.</Text>
                    <CheckBox
        style={{ marginRight: 10}}
        value={isTipsChecked}
        onValueChange={setIsTipsChecked}
      />
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>Messages</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, color: 'black' }}>Message notifications relating to career advice sent to email.</Text>
                    <CheckBox
        style={{ marginRight: 10}}
        value={isMessagesChecked}
        onValueChange={setIsMessagesChecked}
      />
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>Feedbacks</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, color: 'black' }}>Feedbacks on interview sessions and career advoces.</Text>
                    <CheckBox
        style={{ marginRight: 10}}
        value={isFeedbacksChecked}
        onValueChange={setIsFeedbacksChecked}
      />
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>Reminders</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, color: 'black' }}>These are notifications to remind you of updates you might have missed.</Text>
                    <CheckBox
        style={{ marginRight: 10}}
        value={isRemindersChecked}
        onValueChange={setIsRemindersChecked}
      />
                  </View>
                </View>
              </View>

              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 30, marginLeft: 10, marginRight: 50 }} />

              <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                <View>
                  <Text style={{ fontSize: 15, color: '#206C00', fontWeight: '500', marginTop: 30 }}>Push notifications</Text>
                  <Text style={{ fontSize: 12, color: 'black' }}>Get push notifications to find out what’s going on when you’re online. </Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>Reminders</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: 'black' }}>These are notifications to remind you of updates you might have missed.</Text>
                  <CheckBox
        style={{ marginRight: 10}}
        value={isPushFeedbacksChecked}
        onValueChange={setIsPushFeedbacksChecked}
      />
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>Feedbacks</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: 'black' }}>Feedbacks on interview sessions and career advoces.</Text>
                  <CheckBox
        style={{ marginRight: 10}}
        value={isPushRemindersChecked}
        onValueChange={setIsPushRemindersChecked}
      />
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
                    <Text style={{ fontSize: 12, color: 'coral', marginTop: 15, fontWeight: '500' }}>Notification Settings</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToBillingsAndPayment}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d71eb11f8b49b8dc89ac885de39244967a9d43ca35a783ff2b5c8a9c872d336c?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }} style={{ width: 15, height: 15, marginRight: 5, marginTop: 15 }} />
                    <Text style={{ fontSize: 12, color: 'black', marginTop: 15 }}>Payment</Text>
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
    marginRight: 10,
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
