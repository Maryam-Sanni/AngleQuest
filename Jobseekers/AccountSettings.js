
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, CheckBox, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';
import {useFonts} from "expo-font"
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const navigation = useNavigation();
  const [isCVChecked, setIsCVChecked] = useState(false);
  const [isInterviewResultsChecked, setIsInterviewResultsChecked] = useState(false);
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })
    const {t}=useTranslation()

  return (
    <View style={{backgroundColor: '#f7fff4', flex: 1}}>
    <View style={{ flex: 1 }}>
      <TopBar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500}}>
        <View style={{ backgroundColor: '#f7fff4', marginLeft: 230 }}>
          <Text style={{ fontSize: 18, color: '#206C00', fontWeight: 'bold', marginTop: 30, marginBottom: 10, marginLeft: 10,fontFamily:"Roboto-Light"
            
           }}>{t("Contact Information")}</Text>
          <View style={{ flexDirection: 'row', paddingHorizontal: 8, paddingTop: 8 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Text style={{ color: '#206C00', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("First Name")}</Text>
                <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#206C00',
                 marginLeft: 20,
                  borderRadius: 5,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholdertextColor: 'black',
                  fontFamily:"Roboto-Light"
                }}
                placeholder="John"
              />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Text style={{ color: '#206C00', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>{t("Last Name")}</Text>
                <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                 marginLeft: 20,
                  borderRadius: 5,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholdertextColor: 'black',
                  fontFamily:"Roboto-Light"
                }}
                placeholder="Smith"
              />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Text style={{ color: '#206C00', fontWeight: 'bold',fontFamily:"Roboto-Light"}}>{t("Email")}</Text>
                <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                 marginLeft: 50,
                  borderRadius: 5,
                 flex: 1,
                  padding: 10,
                  maxWidth: '100%',
                  marginTop: 5,
                  placeholdertextColor: 'black',
                  fontFamily:"Roboto-Light"
                }}
                placeholder="user@gmail.com"
              />
              </View>
                
              <View style={{ justifyContent: 'center', alignSelf: 'flex-end', paddingHorizontal: 10, paddingVertical: 8, marginTop: 20, backgroundColor: 'coral', borderRadius: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', textAlign: 'center',fontFamily:"Roboto-Light" }}>{t("Save Changes")}</Text>
              </View>
            </View>

            
          </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 20, marginLeft: 20, marginRight: 280 }} />




          <View style={{ paddingHorizontal: 8, marginTop: 10  }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#206C00', marginTop: 40,fontFamily:"Roboto-Light" }}>{t("Account Deactivation")}</Text>
            <View style={{ flexDirection: 'row', marginTop: - 20 }}>
              <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 230,fontFamily:"Roboto-Light" }}>{t("This is what happens when you deactivate your account")}</Text>
                <Text style={{ fontSize: 14, color: '#777', marginTop: 4, marginLeft: 240,fontFamily:"Roboto-Light" }}>• {t("Your profile will be permanently deleted from our server")}</Text>
                <Text style={{ fontSize: 14, color: '#777', marginTop: 2, marginLeft: 240,fontFamily:"Roboto-Light" }}>• {t("All Booked sessions will be cancelled")}</Text>
                <Text style={{ fontSize: 14, color: '#777', marginTop: 2, marginLeft: 240,fontFamily:"Roboto-Light" }}>• {t("Forwarded feedbacks retracted")}</Text>
                <Text style={{ fontSize: 14, color: '#777', marginTop: 2, marginLeft: 240,fontFamily:"Roboto-Light" }}>• {t("You won’t be able to reactivate your sessions")}</Text>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center', marginLeft: 250, width: 150, paddingHorizontal: 10, paddingVertical: 10, marginTop: 40, marginBottom: 50, backgroundColor: 'red', borderRadius: 5, }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', textAlign: 'center',fontFamily:"Roboto-Light" }}>{t("Deactivate account")}</Text>
          </View>
        </View>
        </ScrollView>
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