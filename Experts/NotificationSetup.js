import React, { useState } from 'react';
import { View, Text, Image, CheckBox, StyleSheet, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import { useFonts } from 'expo-font';
import { useTranslation } from 'react-i18next';


function MyComponent() {
  const navigate= useNavigate();
  const [isNewsChecked, setIsNewsChecked] = useState(false);
  const [isTipsChecked, setIsTipsChecked] = useState(false);
  const [isMessagesChecked, setIsMessagesChecked] = useState(false);
  const [isFeedbacksChecked, setIsFeedbacksChecked] = useState(false);
  const [isRemindersChecked, setIsRemindersChecked] = useState(false);
  const [isPushFeedbacksChecked, setIsPushFeedbacksChecked] = useState(false);
  const [isPushRemindersChecked, setIsPushRemindersChecked] = useState(false);
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
        })
        const {t}=useTranslation()


  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500  }}>
        <View style={{ flex: 1, paddingHorizontal: 8, paddingVertical: 20, backgroundColor: 'white', marginLeft: 230 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <View style={{ flex: 1, marginRight: 5, maxWidth: '70%' }}>
              <View>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>{t("Notification Settings")}</Text>
              </View>
              <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: 'bold'}}>{t("Email notifications")}</Text>
                  <Text style={{ fontSize: 14, color: 'black', marginBottom: 20, marginTop: 5}}>{t("Get emails to find out what’s going on when you’re not online. You can turn these off")}.</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>{t("News and updates")}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, color: 'black' }}>{t("Receive the latest news about products and feature updates")}.</Text>
                    <CheckBox
        style={{ marginRight: 10}}
        value={isNewsChecked}
        onValueChange={setIsNewsChecked}
      />
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>{t("Tips and tutorials")}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, color: 'black' }}>{t("Tips on getting more out of our services")}.</Text>
                    <CheckBox
        style={{ marginRight: 10}}
        value={isTipsChecked}
        onValueChange={setIsTipsChecked}
      />
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>{t("Messages")}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, color: 'black' }}>{t("Message notifications relating to career advice sent to email")}.</Text>
                    <CheckBox
        style={{ marginRight: 10}}
        value={isMessagesChecked}
        onValueChange={setIsMessagesChecked}
      />
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10}}>{t("Feedbacks")}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, color: 'black', }}>{t("Feedbacks on interview sessions and career advoces")}.</Text>
                    <CheckBox
        style={{ marginRight: 10}}
        value={isFeedbacksChecked}
        onValueChange={setIsFeedbacksChecked}
      />
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10}}>{t("Reminders")}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, color: 'black',fontFamily:'Roboto-Light' }}>{t("These are notifications to remind you of updates you might have missed")}.</Text>
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
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 30 }}>{t("Push notifications")}</Text>
                  <Text style={{ fontSize: 14, color: 'black', marginTop: 5}}>{t("Get push notifications to find out what’s going on when you’re online")}. </Text>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10}}>{t("Reminders")}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: 'black'}}>{t("These are notifications to remind you of updates you might have missed")}.</Text>
                  <CheckBox
        style={{ marginRight: 10}}
        value={isPushFeedbacksChecked}
        onValueChange={setIsPushFeedbacksChecked}
      />
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', marginTop: 10 }}>{t("Feedbacks")}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: 'black' }}>{t("Feedbacks on interview sessions and career advoces")}.</Text>
                  <CheckBox
        style={{ marginRight: 10}}
        value={isPushRemindersChecked}
        onValueChange={setIsPushRemindersChecked}
      />
                </View>
              </View>
            </View>

            </View>
            </View>
            </ScrollView>
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
